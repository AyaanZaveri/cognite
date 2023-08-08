"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import { useChat } from "ai/react";
import ChatBox from "./ChatBox";
import { FormEvent, useState } from "react";
import { Inter } from "next/font/google";
import { ChatRequestOptions } from "ai";
import { cn } from "@/lib/utils";

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
    onError: (err) => {
      console.log(err);
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
      <div className="flex w-full flex-col gap-5 px-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-4 py-3",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.content}
          </div>
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
