import React from "react";

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
      <input
        name=""
        id=""
        value={input}
        onChange={handleInputChange}
        placeholder="What would you like to cognite 🔥"
        className="w-full select-none resize-none rounded-md px-4 py-3 font-normal shadow-sm outline-none ring-1 ring-zinc-200 transition-all duration-300 placeholder:text-zinc-500/60 hover:bg-zinc-50 hover:ring-2 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500"
      ></input>
      {/* make a black button that says make question */}
      <button
        className="w-max select-none rounded-md bg-black px-8 py-2 font-medium text-white outline-none transition-all duration-300 hover:bg-zinc-800 hover:shadow-2xl hover:shadow-zinc-500/10 active:scale-[0.98]"
        type="submit"
        style={{
          marginRight: 240,
        }}
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
      </button>
    </form>
  );
};

export default ChatBox;
