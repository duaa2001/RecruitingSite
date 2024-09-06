import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: `${process.env.OPENROUTER_API_KEY}`,
  });
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Customer Support AI for Tech Marketplace, respond with relevant details collected from person's profile",
      },
      ...data,
    ],
    model: "gpt-3.5-turbo"
  });
  return new NextResponse(completion.choices[0].message.content);
}