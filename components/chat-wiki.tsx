"use client";

import { useChat } from "ai/react";
import ChatBox from "./ChatBox";
import { FormEvent, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { ChatRequestOptions } from "ai";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "./ui/badge";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PluggableList } from "react-markdown/lib";
import { ComboboxPopover } from "./style-combobox";
import Style, { styles } from "@/lib/styles";
import { toast } from "./ui/use-toast";
// import { styles } from "@/lib/styles";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Chat({ article }: { article: string }) {
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<Style>(styles[0]);
  const [sourcesForMessages, setSourcesForMessages] = useState<Record<string, any>>({});

  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
    api: "/api/wiki/completions",
    body: {
      article: article,
      style: selectedStyle.prompt,
      init: false,
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while fetching the response",
        variant: "destructive",
      })
    },
    onResponse: (res) => {
      console.log("onRes", res);
      setIsStreaming(true);
      const sourcesHeader = res.headers.get("x-sources");
      const sources = sourcesHeader ? JSON.parse(atob(sourcesHeader)) : [];
      console.log("sources", sources);
      const messageIndexHeader = res.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({...sourcesForMessages, [messageIndexHeader]: sources});
      }
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
          <ComboboxPopover
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
          />
        </div>
      )}
      <div className={`flex w-full flex-col gap-5 px-8`}>
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
            <span
              className={`transition-all ${
                message.role === "assistant" && "prose dark:prose-invert"
              }`}
            >
              <Markdown remarkPlugins={[remarkGfm] as PluggableList}>
                {message.content}
              </Markdown>
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
