import { type NextRequest } from "next/server";
import { protectDashboardRoutes } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return protectDashboardRoutes(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};