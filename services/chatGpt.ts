import OpenAI from "openai";

export async function chatWithGPT(message: string) {
  console.log(process.env);
  const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: message }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response;
}
