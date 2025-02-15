import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message } = await req.json(); // Ensure we extract the message correctly

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: `Please provide a structured response using bullet points:\n\n${message}` }]
                    }
                ] // Gemini API expects "prompt.text"
            }),
        });

        const data = await response.json();

        return NextResponse.json({ message: "done", response: data });
    } catch (error) {
        console.error("API Request Failed:", error);
        return NextResponse.json({ message: "error", error: error.message });
    }
}
