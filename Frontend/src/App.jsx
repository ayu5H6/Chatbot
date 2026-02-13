import { useEffect, useState } from "react";
import { api } from "./api";
import { v4 as uuid } from "uuid";

const sessionId =
  localStorage.getItem("sid") ||
  (() => {
    const id = uuid();
    localStorage.setItem("sid", id);
    return id;
  })();

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    api.get(`/chat/${sessionId}`).then((res) => setMessages(res.data));
  }, []);

  const send = async () => {
    if (!input.trim()) return;

    setMessages((m) => [...m, { role: "user", content: input }]);
    setTyping(true);

    const res = await api.post("/chat", {
      sessionId,
      message: input,
    });

    setMessages((m) => [...m, { role: "ai", content: res.data.reply }]);
    setTyping(false);
    setInput("");
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col p-4">
        <h1 className="text-xl font-semibold text-center mb-3">AI Chatbot</h1>

        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                m.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-900"
              }`}
            >
              {m.content}
            </div>
          ))}

          {typing && (
            <div className="mr-auto bg-gray-200 px-4 py-2 rounded-lg text-sm">
              AI is typing...
            </div>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
