import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ChatBoxProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isStreaming: boolean;
}

const ChatBox = ({
  input,
  handleInputChange,
  handleSubmit,
  isStreaming,
}: ChatBoxProps) => {
  return (
    <form className="flex w-full flex-row gap-3" onSubmit={handleSubmit}>
      <Input
        name=""
        id=""
        value={input}
        onChange={handleInputChange}
        placeholder="What would you like to cognite 🔥"
        className="h-12 text-base"
      />
      {/* make a black button that says make question */}
      <Button
        type="submit"
        style={{
          marginRight: 240,
        }}
        className="h-12 text-base px-6"
      >
        {isStreaming ? (
          <span className="inline-flex animate-pulse gap-2">
            Thinking <p>🧠</p>
          </span>
        ) : (
          <span className="inline-flex gap-2">
            Cognite <p>🔥</p>
          </span>
        )}
      </Button>
    </form>
  );
};

export default ChatBox;
