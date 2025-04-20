import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




export async function generateText(imageData : string) {
  const prompt = ""
  const result = await model.generateContent(prompt);
  return result.response.text();
}
