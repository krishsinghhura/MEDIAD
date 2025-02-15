import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "./db";
import User from "@/models/User";

export async function getCurrentUser() {
    try {
        await connectDB();

        // Get the token from cookies
        const token = await cookies().get("med_token");

        if (!token) {
            return null; // No user logged in
        }

        // Verify and decode token
        const decoded = jwt.verify(token.value, "secret");
        if (!decoded || !decoded.userId) {
            return null;
        }

        // Fetch user from database
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password field

        return user || null;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}
