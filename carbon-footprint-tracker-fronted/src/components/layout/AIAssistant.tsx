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
     <div className="w-full max-w-xl mx-auto text-center">
        <div className="inline-flex px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">🤖 AI Sustainability Assistant</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">Ask Carbon AI</h2>
        <p className="mt-5 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">Carbon intelligence, powered by AI.</p>
        <div className="mt-10 sm:mt-12 rounded-3xl border border-white/10 bg-[#0B0B0B] p-4 md:p-8 shadow-[0_0_40px_rgba(34,197,94,0.08)]">
          <textarea
          
            placeholder="How can I reduce flight emissions?"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            className="w-full h-32 md:h-36 bg-black border border-white/10 rounded-2xl p-4 outline-none text-white resize-none placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
          />
           {!response && !loading && (
           <p className="mt-6 text-sm text-gray-500 leading-relaxed">Ask about emissions, sustainability, flights, vehicles, or carbon reduction.</p>
          )}
          <button
          
            onClick={askAI}
            disabled={loading || !question.trim()}
          className="mt-5 w-full px-8 py-4 rounded-2xl bg-green-500 text-black font-semibold hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition">
            { loading ?"Generating AI Insight...":"Generate AI Insight"}
          </button>
          {response && (
           <>
           <div className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[4px] text-green-500 text-left">AI Insight</div>

           <div className="text-left bg-[#070707] rounded-2xl border border-white/10 p-4 md:p-6 text-gray-200 leading-relaxed whitespace-pre-wrap break-words overflow-auto max-h-[250px] md:max-h-[400px]">{response}</div>
          </>
         )
        }
       </div>
      </div>
    </section>
     );
}