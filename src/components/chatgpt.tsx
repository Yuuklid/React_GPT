import { useState } from "react";
import React from "react";
import OpenAI from "openai";
import "./ChatInterface.css";


interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id: string;
}

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatInterface = ({ className }: { className?: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleMessage = async () => {
    try {
      if (!input.trim()) return;

      const userMessage: Message = {
        role: "user",
        content: input.trim(),
        id: crypto.randomUUID(),
      };
      setMessages((prev) => [...prev, userMessage]);

      const apiResponse = await apiRequest(messages, userMessage);

      const assistantMessage: Message = {
        role: "assistant",
        content:
          apiResponse.choices[0].message.content ??
          "Sorry, I couldn't process that request",
        id: crypto.randomUUID(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.log(e);
    }
  };

  const apiRequest = async (messages: Message[], userMessage: Message) => {
    const systemMessage: Message = {
      role: "system",
      content:
        "You are a very simple assistant. You only respond in 2 or 3 sentences. But they are short and to the point. ",
      id: crypto.randomUUID(),
    };

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages, userMessage],
    });
    return response;
  };

  return (
    <div className={className}>
      <div className="chat-container">
        <div className="message-wrapper">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.role == "user" ? "user-message" : "assistant-message"
              }`}
            >
              <div className="message-bubble text-black">{message.content}</div>
            </div>
          ))}
        </div>

        <div>
          <form>
            <input
              className="input-box dark:text-white dark:bg-black text-black bg-white"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleMessage();
                  setInput("");
                }
              }}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
