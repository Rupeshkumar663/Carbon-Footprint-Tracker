import { useState } from "react";
import api from "../../api/axios";
export default function AIAssistant(){
  const [question,setQuestion]=useState("");
  const [response,setResponse]=useState("");
  const [loading,setLoading]=useState(false);

  const askAI=async()=>{
    if(!question.trim())
       return;
    try {
      setLoading(true);
      const res=await api.post("/api/ai/insight",{question,});
      setResponse(res.data.insight);
    } catch(error){
         console.log(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">AI Sustainability Assistant</div>
        <h2 className="text-5xl font-bold tracking-[-2px]">Ask Carbon AI</h2>
        <p className="mt-5 text-gray-400 text-lg">AI-powered sustainability recommendationand carbon intelligence insights.</p>
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0B0B0B] p-6">
          <textarea
            placeholder="How can I reduce flight emissions?"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            className="w-full h-32 bg-black border border-white/10 rounded-2xl p-4 outline-none text-white"
          />
          <button
            onClick={askAI}
            className="mt-5 px-8 py-4 rounded-2xl bg-green-500 text-black font-semibold hover:bg-green-400 transition">
            {
              loading? "Analyzing...": "Generate AI Insight"
            }
          </button>
          {
            response && (<div className="mt-8 text-left bg-black rounded-2xl border border-white/10 p-6 text-gray-300 leading-relaxed whitespace-pre-wrap">{response}</div>
            )
          }
        </div>
      </div>
    </section>
     );
}