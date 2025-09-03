import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await (await draftMode()).disable();

  // This works because request.nextUrl is already a URL
  return NextResponse.redirect(new URL("/", request.url));
}
