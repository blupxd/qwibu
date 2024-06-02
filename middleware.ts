import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth((req) => {
  const token = req.nextauth.token;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/moj-profil")) {
    if (!token?.name)
      return NextResponse.redirect(new URL("/podesavanje-profila", req.url));
  }

  if (path.startsWith("/podesavanje-profila")) {
    if (token?.name)
      return NextResponse.redirect(new URL("/moj-profil", req.url));
  }
  if (path.startsWith("/otvaranje-radnje")) {
    if (token?.role !== "prodavac")
      return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next()
});

export const config = {
  matcher: [
    "/podesavanje-profila",
    "/moj-profil",
    "/pregled-zakazanih",
    "/otvaranje-radnje"
  ],
};
