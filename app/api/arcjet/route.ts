import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"], // track requests by IP address
  rules: [
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      refillRate: 2, // refill 10 tokens per interval
      interval: 60, // 60 second interval
      capacity: 2, // bucket maximum capacity of 100 tokens
    }),
  ],
});

export async function POST(req: Request, res: Response) {
    const decision = await aj.protect(req, { requested: 1 });

    if(decision.isDenied()) {
        return NextResponse.json(
            {
              error: "Too Many Requests",
              reason: decision.reason,
            },
            {
              status: 429,
            }
        );
    }

    return NextResponse.json({
        message: "Hello world",
    });
}