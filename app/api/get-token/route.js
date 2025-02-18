import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("med_token")?.value;
  return NextResponse.json({ token });
}
