// middleware.ts
import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, ev: NextFetchEvent) {
  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  const id = request.page.params?.id || "";

  // @ts-ignore
  if (!checkMongoIDRegExp.test(id)) {
    return new Response(JSON.stringify({ message: "id no valido" + "" + id }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //return NextResponse.redirect(new URL('/about-2', request.url))
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
