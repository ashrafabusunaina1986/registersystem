import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.url;
  const token = req.cookies.get("token")?.value || "";
  const token_admin = req.cookies.get("token_admin")?.value || "";

  if (token && url.includes("/users")) return NextResponse.next();
  if (token_admin && url.includes("/admin")) return NextResponse.next();
  if (
    (!token && url.includes("/users") && !token_admin) ||
    (!token && url.includes("/admin") && !token_admin)
  )
    return NextResponse.redirect(new URL("/login", req.url));
  if (
    (!token && url.includes("/users") && token_admin) ||
    (token && url.includes("/admin") && !token_admin) ||
    (token && url.includes("/login") && !token_admin) ||
    (token && url.includes("/signup") && !token_admin) ||
    (!token && url.includes("/login") && token_admin) ||
    (!token && url.includes("/signup") && token_admin)
  )
    return NextResponse.redirect(new URL("/error", req.url));
  //   return NextResponse.json({ token, token_admin }, { status: 201 });
}

export const config = {
  // matcher: ["/:path*"],
};
