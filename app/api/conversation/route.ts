import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";  // Updated import based on latest usage

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Initialize OpenAI directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });
    if (!process.env.OPENAI_API_KEY)
      return new NextResponse("OpenAI API key not configured.", {
        status: 500,
      });

    if (!messages)
      return new NextResponse("Messages are required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    // Use createChatCompletion method
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (error: unknown) {
    console.error("[CONVERSATION_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}