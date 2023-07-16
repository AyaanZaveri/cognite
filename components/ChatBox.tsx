import React from "react";

const ChatBox = () => {
  return (
    <div
      className="fixed bottom-6 w-full"
      style={{
        paddingLeft: 240 / 2,
      }}
    >
      <div className="flex w-full flex-row gap-6 px-8">
        <form className="flex w-full flex-row gap-3">
          <input
            name=""
            id=""
            placeholder="What would you like to cognite 🔥"
            className="w-full select-none resize-none rounded-md px-4 py-3 font-normal shadow-sm outline-none ring-1 ring-zinc-200 transition-all duration-300 placeholder:text-zinc-500/60 hover:bg-zinc-50 hover:ring-2 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500"
          ></input>
          {/* make a black button that says make question */}
          <button
            className="w-max select-none rounded-md bg-black px-8 py-2 font-medium text-white outline-none transition-all duration-300 hover:bg-zinc-800 hover:shadow-2xl hover:shadow-zinc-500/10 active:scale-[0.98]"
            type="submit"
            style={{
              marginRight: 240 / 2,
            }}
          >
            {/* {isAnswerLoading ? (
                  <span className="inline-flex animate-pulse gap-2">
                    Thinking <p>🧠</p>
                  </span>
                ) : ( */}
            <span className="inline-flex gap-2">
              Cognite <p>🔥</p>
            </span>
            {/* )} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
