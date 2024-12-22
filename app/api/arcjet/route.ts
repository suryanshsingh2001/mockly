import arcjet, { slidingWindow } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"], // track requests by IP address
  rules: [
    slidingWindow({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      interval: 60, // 60 second sliding window
      max: 5, // allow a maximum of 100 requests
    }),
  ],
});

export async function POST(req: Request, res: Response) {
    const decision = await aj.protect(req);

    if(decision.isDenied()) {
        return NextResponse.json(
            {
              error: "Too Many Requests",
              reason: decision.reason,
            },
            {
              status: 429,
              
            },
          );
    }
    return NextResponse.json({
        message: "Hello world",
      });
}