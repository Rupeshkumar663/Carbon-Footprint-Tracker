import Groq from "groq-sdk";
const groq=new Groq({apiKey:process.env.GROQ_API_KEY,});
export const generateCarbonAdvice=async(type:string,data:any)=>{
  try {
    const prompt=`Give only 3 short carbon reduction tips.
    Type:${type}
    Data:${JSON.stringify(data)}
    Rules:
     - Very short answers
     - Only important points
     - Return plain text
    `;
    const chatCompletion=await groq.chat.completions.create({
        messages:[
          {
            role:"user",
            content:prompt,
          },
        ],
        model:"llama-3.3-70b-versatile",
        max_tokens:100,
      });
    const response=chatCompletion.choices[0]?.message?.content || "";
    return response.split("\n").filter((item)=>item.trim()!=="");
  } catch(error:any){
    console.log("Groq AI Error:",error.message);
    return[
      "Reduce unnecessary flights",
      "Optimize fuel efficiency",
      "Track emissions regularly",
    ];
  }
};