import React, { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("ask"); // Modes: ask, draft, image, video
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    console.log("Mode:", mode);
    console.log("User input:", input);

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    // Prepare payload safely
    let payload = {};
    let endpoint = "";

    if (mode === "ask") {
      payload = { question: input };
      endpoint = "ask";
    } else if (mode === "draft") {
      payload = { prompt: input };
      endpoint = "draft";
    } else if (mode === "image") {
      payload = { prompt: input };
      endpoint = "image";
    } else if (mode === "video") {
      payload = { prompt: input };
      endpoint = "video";
    } else {
      console.error("Invalid mode:", mode);
      return;
    }

    console.log("Payload:", payload);

    try {
      const res = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      let botReply = "";
      if (mode === "ask") {
        botReply = data.answer?.trim();
      } else if (mode === "draft") {
        botReply = data.draft?.trim();
      } else if (mode === "image") {
        botReply = `✅ Image generated! [${data.file}]`;
      } else if (mode === "video") {
        botReply = data.message?.trim();
      }

      console.log("Raw API data:", data);
      console.log("Bot reply:", botReply);

      setMessages((prev) => [
        ...prev,
        { sender: "Assistant", text: botReply || "No response." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "Assistant", text: "⚠️ Error reaching AI assistant." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen p-8 bg-[#f0f4f8] flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-[#005f73]">
        🌊 NGO AI Assistant
      </h1>

      <div className="flex flex-wrap mb-4">
        <button
          onClick={() => setMode("ask")}
          className={`px-4 py-2 mr-2 mb-2 rounded ${
            mode === "ask"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Q&A
        </button>
        <button
          onClick={() => setMode("draft")}
          className={`px-4 py-2 mr-2 mb-2 rounded ${
            mode === "draft"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Draft
        </button>
        <button
          onClick={() => setMode("image")}
          className={`px-4 py-2 mr-2 mb-2 rounded ${
            mode === "image"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Generate Image
        </button>
        <button
          onClick={() => setMode("video")}
          className={`px-4 py-2 mb-2 rounded ${
            mode === "video"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Generate Video
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 bg-white rounded p-4 shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "You" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "ask"
              ? "Ask a question..."
              : mode === "draft"
              ? "Enter a prompt for content..."
              : mode === "image"
              ? "Describe the image to generate..."
              : "Describe the video idea..."
          }
          className="flex-1 px-4 py-2 border rounded-l"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-[#0077b6] text-white rounded-r hover:bg-[#005f73]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
