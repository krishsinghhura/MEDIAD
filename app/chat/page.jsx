"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Sidebar from "@/components/Sidebar/page";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch("/api/get-token");
      const data = await res.json();
      const decoded = jwtDecode(data.token);
      setUserId(decoded.userId);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`/api/get-chats?userId=${userId}`);
        const data = await res.json();
        if (Array.isArray(data.chats)) setChats(data.chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    if (userId) fetchChats();
  }, [userId]);

  const handleSendMessage = async () => {
    if (!input.trim() || !userId) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const chatHistoryString = messages
        .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
        .join("\n");

      const fullMessage = `${chatHistoryString}\nUser: ${input}`;

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, chatId, message: fullMessage }),
      });

      const data = await response.json();

      if (data.chatId && !chatId) {
        setChatId(data.chatId);
        router.push(`/chat/${data.chatId}`);
      }

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot" },
        ]);
      } else {
        console.error("No valid AI response received:", data);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-100 text-gray-800">
      <Sidebar chats={chats} />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-sky-700 mb-6">
          Mental Health Chat
        </h1>

        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 h-96 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-md w-fit max-w-[80%] ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl flex items-center">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
