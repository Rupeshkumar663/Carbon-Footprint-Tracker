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
      const res=await api.post("/api/ai/insight",{question});
      setResponse(res.data.insight);
    } catch(error:unknown){
         console.log(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <section className="text-white">
    <div className="w-full max-w-[280px] sm:max-w-md md:max-w-xl mx-auto text-center px-2">
        <div className="inline-flex px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] mb-3">🤖 AI Sustainability Assistant</div>
       <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">Ask Carbon AI</h2>
        <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">Carbon intelligence, powered by AI.</p>
        <div className="mt-6 sm:mt-8 rounded-xl border border-white/10 bg-[#0B0B0B] p-3 sm:p-4 md:p-6">
          <textarea
          
            placeholder="How can I reduce flight emissions?"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
         className="w-full h-12 sm:h-16 md:h-20 overflow-y-auto bg-black border border-white/10 rounded-lg p-2 text-xs sm:text-sm outline-none text-white resize-none placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
          />
           {!response && !loading && (
           <p className="mt-4 text-sm text-gray-500 leading-relaxed">Ask about emissions, sustainability, flights, vehicles, or carbon reduction.</p>
          )}
          <button
          
            onClick={askAI}
            disabled={loading || !question.trim()}
          className="mt-4 w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-green-500 text-black font-semibold whitespace-nowrap hover:bg-green-400 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300">
            { loading ?"Generating AI Insight...":"Generate AI Insight"}
          </button>
          {response && (
           <>
           <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-[2px] text-green-500 text-left">AI Insight</div>

           <div className="text-left bg-[#070707] rounded-xl border border-white/10 p-3 sm:p-4 md:p-5 text-gray-200 text-xs sm:text-sm md:text-base leading-5 whitespace-pre-wrap break-words overflow-y-auto touch-pan-y overscroll-contain max-h-[100px] sm:max-h-[150px] md:max-h-[220px]">{response}</div>
          </>
         )
        }
       </div>
      </div>
    </section>
     );
}