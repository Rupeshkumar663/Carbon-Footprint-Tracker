import Groq from "groq-sdk";
const groq=new Groq({
  apiKey:process.env.GROQ_API_KEY,
 });

export const generateCarbonInsight=async(question:string)=>{
  try {
    const chatCompletion=await groq.chat.completions.create({
        messages:[
          {
            role:"user",
            content:question,
          },
        ],
        model:"llama-3.3-70b-versatile",
        max_tokens:120,
      });
    return(chatCompletion.choices[0]?.message?.content || "No response");
  } catch(error:any){
    console.log(error);
    return "AI service unavailable";
  }
};