// src/components/AIChat.tsx

import { useState } from "react";
import api from "../../api/axios";


export default function AIChat() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await api.post("/ai/chat", { message: msg });
    setReply(res.data.reply);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <input
        className="border p-2 w-full"
        placeholder="Ask AI..."
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        className="bg-black text-white mt-2 px-4 py-2 rounded"
      >
        Ask
      </button>

      <p className="mt-4">{reply}</p>
    </div>
  );
}