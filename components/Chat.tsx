"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import { useChat } from "ai/react";
import ChatBox from "./ChatBox";
import { FormEvent, useState } from "react";
import { Mulish, Space_Grotesk } from "next/font/google";
import { ChatRequestOptions } from "ai";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "./ui/badge";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

export default function Chat({ id }: { id: string }) {
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("neutral");

  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
    api: "/api/cog/completions",
    body: {
      id: id,
      style: selectedStyle,
    },
    onError: (err) => {
      console.log(err);
    },
    onResponse: (res) => {
      console.log("onRes", res);
      setIsStreaming(true);
    },
    onFinish: (msg) => {
      console.log("msg", msg);
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

  const styles = [
    {
      id: "friendly",
      name: "Friendly 👋",
      description: "A nice and friendly conversation style.",
    },
    {
      id: "neutral",
      name: "Neutral 🤔",
      description: "A casual and neutral conversation style.",
    },
    {
      id: "focused",
      name: "Focused 🧠",
      description: "A very precise and focused conversation style.",
    },
  ];

  console.log(messages[messages.length - 1]?.content);

  return (
    <div className="pb-28">
      {messages.length === 0 && (
        <div className={`mt-20 flex flex-col items-center gap-y-3`}>
          <div className={`${space_grotesk.className} space-x-1.5`}>
            <span className="font-medium">Pick a conversation style</span>
            <Badge
              variant={"secondary"}
              className="select-none text-accent-foreground/70"
            >
              BETA
            </Badge>
          </div>
          <Tabs defaultValue="neutral">
            <TabsList>
              {styles.map((style) => (
                <TabsTrigger
                  key={style.id}
                  value={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  {style.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}
      <div className={`flex w-full flex-col gap-5 px-8 ${mulish.className}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-2 rounded-lg px-4 py-3 lg:w-max lg:max-w-xl",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                : "bg-muted shadow-xl shadow-muted/20"
            )}
          >
            <span className="prose transition-all">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content.replace(/\\n/g, "\n").replace(/<\/s>/g, "")}
              </ReactMarkdown>
            </span>
          </div>
        ))}
      </div>
      <div className="absolute w-full">
        <div className="fixed bottom-6 flex w-full flex-row gap-6 px-8">
          <ChatBox
            input={input}
            handleInputChange={handleInputChange}
            handleThinking={handleThinking}
            isThinking={isThinking}
            isStreaming={isStreaming}
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
}
