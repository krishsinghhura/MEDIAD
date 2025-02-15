import { getCurrentUser } from "@/lib/helper";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await getCurrentUser();

    if(!user){
        return NextResponse.json({message : "User not logged in"} , {status : 401});
    }

    return NextResponse.json(user);
}