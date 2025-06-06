import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/signin", "/signin/verify"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (protectedRoutes.includes(request.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Bảo vệ tất cả route bắt đầu bằng /dashboard (kể cả /dashboard/employee...)
    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/signin", "/signin/verify", "/dashboard/:path*"],
};
