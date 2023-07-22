"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import { useChat } from "ai/react";
import ChatBox from "./ChatBox";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Chat({ id }: { id: string }) {
  const [isStreaming, setIsStreaming] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/cog/completions",
    body: {
      id: id,
    },
    onResponse: (res) => {
      setIsStreaming(true);
      console.log(res);
    },
    onFinish: (msg) => {
      setIsStreaming(false);
      console.log(msg);
    },
  });

  return (
    <div className="pb-28">
      <div className="flex w-full flex-col gap-5">
        {messages.map((m) => (
          <div key={m.id} className="w-full px-8">
            {m.role === "user" ? (
              <div className="flex flex-row justify-end gap-3">
                <div
                  className={`rounded-md bg-orange-50 px-4 py-3 ring-1 ring-orange-100`}
                >
                  <span className="prose transition-all duration-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex max-w-xl flex-row justify-start gap-3">
                <div
                  className={`rounded-md bg-zinc-50 px-4 py-3 ${
                    isStreaming ? "ring-2" : "ring-1"
                  } ring-zinc-200 ${inter.className}`}
                >
                  <span className="prose transition-all duration-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-6 w-full">
        <div className="flex w-full flex-row gap-6 px-8">
          <ChatBox
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
