"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    console.log("inside");

    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Please format your response in clear bullet points:\n\n${input}` }),
      });

      const data = await response.json();
      console.log(data);

      if (data.response?.candidates?.length > 0) {
        let aiReply = data.response.candidates[0]?.content?.parts?.[0]?.text || "No response.";
  
        // Convert new lines into bullet points
        const formattedText = aiReply.split("\n").map((line, index) => (
          <p key={index} className="mb-1">{line.startsWith("-") ? line : `• ${line}`}</p>
        ));
  
        const botMessage = { text: formattedText, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 text-gray-800 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">
        Mental Health Chat
      </h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg my-2 w-fit max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md"
          placeholder="Talk to AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-sky-700 text-white rounded-r-md hover:bg-sky-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
