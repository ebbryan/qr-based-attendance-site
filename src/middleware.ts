import dayjs from "dayjs";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextResponse, NextRequest } from "next/server";

export const privateRoutes = [
  "/dashboard",
  "/registration",
  "/qr-registration",
];

export const publicRoutes = ["/", "/login"];

const isTokenValid = (token?: string): boolean => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = dayjs().unix();

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.warn("Token expired.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  const hasValidAccessToken = isTokenValid(accessToken);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPrivateRoute && !hasValidAccessToken) {
    const redirectTarget = accessToken ? "/login" : "/dashboard";
    console.log("Redirecting from private route >", redirectTarget);
    return NextResponse.redirect(new URL(redirectTarget, request.nextUrl));
  }

  if (isPublicRoute && hasValidAccessToken) {
    console.log("Already authenticated > Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/dashboard/:path*",
    "/qr-registration/:path*",
    "/registration/:path*",
    "/:path*",
  ],
};
