import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

let apiKey: string;
const generateData = async (prompt: string, token: string): Promise<string | undefined> => {
  console.log("token",token)
  // Replace with your actual API key
  if(token=== 'NIRAJ'){
    apiKey = "AIzaSyAVMzf2RvoQ27aTIGjAeZ-Tp-NC7O-N7iY";
  }else{
    apiKey= token;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model: GenerativeModel = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let attempts = 0;
  const maxRetries = 5;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  while (attempts < maxRetries) {
    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      console.log(text);
      return text;
    } catch (error: any) {
      if (error.status === 503) {
        console.log(`Service unavailable. Retrying (${attempts + 1}/${maxRetries})...`);
        attempts++;
        await delay(1000 * Math.pow(2, attempts)); // Exponential backoff
      } else {
        console.error("An error occurred:", error);
        return;
      }
    }
  }
  console.log("Failed after maximum retries. Please try again later.");
};

export { generateData };
