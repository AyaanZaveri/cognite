import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Space_Grotesk } from "next/font/google";

interface ChatBoxProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleThinking: (e: React.FormEvent<HTMLFormElement>) => void;
  isThinking: boolean;
  isStreaming: boolean;
}

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const ChatBox = ({
  input,
  handleInputChange,
  handleThinking,
  isThinking,
  isStreaming,
}: ChatBoxProps) => {
  return (
    <form className="flex w-full flex-row gap-3" onSubmit={handleThinking}>
      <Input
        name=""
        id=""
        value={input}
        onChange={handleInputChange}
        placeholder="What would you like to cognite 🔥"
        className="h-12 bg-background/50 text-base backdrop-blur-md"
      />
      {/* make a black button that says make question */}
      <Button type="submit" className={`m-0 h-12 px-6 text-base md:mr-[240px] ${space_grotesk.className}`}>
        {isStreaming && isThinking ? (
          <span className="inline-flex animate-pulse gap-2">
            Going <p>🚀</p>
          </span>
        ) : isThinking && !isStreaming ? (
          <span className="inline-flex animate-pulse gap-2">
            Thinking <p>🧠</p>
          </span>
        ) : (
          <span className="inline-flex gap-2">Cognite <p>⚡️</p></span>
        )}
      </Button>
    </form>
  );
};

export default ChatBox;
