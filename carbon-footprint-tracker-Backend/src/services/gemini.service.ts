import axios from "axios";
import dotenv from "dotenv"
dotenv.config();
export const getAIExplanation = async(data:any)=>{

 const prompt = `
 Trees:${data.trees}
 Carbon:${data.carbon}

 Explain why this route is eco friendly
 `;

 const res = await axios.post(
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
  {
   contents:[
    {
     parts:[
      {text:prompt}
     ]
    }
   ]
  },
  {
   params:{
    key:process.env.GEMINI_API_KEY
   }
  }
 );

 return res.data.candidates[0].content.parts[0].text;

};