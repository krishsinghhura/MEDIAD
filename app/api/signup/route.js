import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const { fullName, email, age, contactNo, password, confirmPassword } = await req.json();

        // Check if passwords match
        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }


        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            age,
            contactNo,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message  }, { status: 500 });
    }
}
