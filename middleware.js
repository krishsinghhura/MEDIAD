import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard","/chat","/reports","/about","/contact"];

export async function middleware(req)  {
   const token = req.cookies.get("med_token");

   if(protectedRoutes.includes(req.nextUrl.pathname) && !token){
    return NextResponse.redirect(new URL("/login",req.url));
   }

   return NextResponse.next();
}

export const config = {
    matcher : "/:path*",
}