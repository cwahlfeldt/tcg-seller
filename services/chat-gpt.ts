import OpenAI from "openai";

export async function chatWithGPT(message: string) {
  console.log(process.env);
  const OPENAI_API_KEY = ""

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: message }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response;
}
