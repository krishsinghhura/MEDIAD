import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("inside post route");
        

        await connectDB(); 
        console.log("db connected");
        // Ensure database is connected

        const user = await User.findOne({ email : email}); // Fix missing await
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, "secret" , {
            expiresIn: "7d",
        });

        // Set Cookie
        await cookies().set("med_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
            path: "/",
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
