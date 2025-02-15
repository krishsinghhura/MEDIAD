
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    await cookies().delete("med_token"); 
    return NextResponse.json({message : "user logged out"});
    // Remove token
}
