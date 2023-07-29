"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import { useChat } from "ai/react";
import ChatBox from "./ChatBox";
import { FormEvent, useState } from "react";
import { Inter } from "next/font/google";
import { ChatRequestOptions } from "ai";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Chat({ id }: { id: string }) {
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/cog/completions",
    body: {
      id: id,
    },
    onResponse: (res) => {
      setIsStreaming(true);
    },
    onFinish: (msg) => {
      setIsStreaming(false);
      setIsThinking(false);
    },
  });

  const handleThinking = (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => {
    setIsThinking(true);
    handleSubmit(e, chatRequestOptions);
  };

  return (
    <div className="pb-28">
      <div className="flex w-full flex-col gap-5">
        {messages.map((m) => (
          <>
            {m.role === "user" ? (
              <div key={m.id} className="flex w-full justify-end px-8">
                <div className="max-w-xl gap-3">
                  <div
                    className={`rounded-md bg-secondary px-4 py-3 ring-1 ring-secondary`}
                  >
                    <span className="prose transition-all duration-300">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex w-full px-8">
                <div className="max-w-xl gap-3">
                  <div
                    className={`rounded-md bg-accent px-4 py-3 ${
                      isStreaming ? "ring-2" : "ring-1"
                    } ring-muted ${inter.className}`}
                  >
                    <span className="prose transition-all duration-300">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="fixed bottom-6 w-full">
        <div className="flex w-full flex-row gap-6 px-8">
          <ChatBox
            input={input}
            handleInputChange={handleInputChange}
            handleThinking={handleThinking}
            isThinking={isThinking}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
