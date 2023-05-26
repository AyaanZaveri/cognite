"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  ChatVectorDBQAChain,
  ConversationalRetrievalQAChain,
} from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");

  const basePromptPrefix =
    "Give me a random unique question based on the following material which may be my study notes, exam review, etc to help me practice for my upcoming test based on this information (try to be random with your question but of course relevant to the content provided, but you should try to think random as assume I have already asked you to give me a question and you have given me one and of course I wouldn't want the same question twice). Your question can be regarding any content I'll attach, any fact, statement, stat, etc; assume to ace my exam I must be able to cover literally anything from the material provided. When you generate your questions you should just give me the question and nothing else. Don't ask me for two things in one (so don't use the word and in your question) I just want one question. Analyze every word in the material I will give you, you can quiz me on literally any of the material, do not limit yourself. I'm talking who, what, when, where, why, how questions on literally any of the content you analyze. Do not use the word and! Do not ask me a question you've already asked. Don't overcomplicate the question, keep it short, sweet, and simple. Never ask me a question you've already asked me, and don't phrase it differently either. Assume I need to be quizzed on literally eery single line, sentence, or point in the attached material. Do not leave out anything. One last thing: at the end of the provided material, check what I have in the brackets (). Whatever is in the brackets () is the type of question I am looking for. For example, if I have (mc) I'm looking for multiple choice. Also! If needed, space out the question onto different lines for clarity! For example your question is multiple choice, you should put each option on a seperate line! Here is the material:";

  const model = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 50,
  });

  const getChatCompletionStream = async (prompt: string) => {
    setIsNotesLoading(true);
    setQuestion("");

    const doc = new Document({
      pageContent: notesText,
      metadata: {
        source: "youtube",
        type: "youtube-video",
        author: "author",
        youtubeId: "youtubeVideoId",
      },
    });

    const docs = await splitter.splitDocuments([doc]);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
    });

    const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever()
    );

    const response = await chain.call({
      question: `You are a helpful chatbot that answers questions based on the users requests.
          Answer the following question: What is the capital of France?,
      `,
      chat_history: [],
    });

    console.log(response);

    setIsNotesLoading(false);

    // try {
    //   const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content: `You are ChatGPT, a large language model trained by OpenAI. Carefully heed the user's instructions. ${basePromptPrefix}`,
    //       },
    //       { role: "user", content: prompt },
    //     ],
    //   });
    //   console.log(completion.data.choices[0].message.content);
    //   setQuestion(completion.data.choices[0].message.content);
    //   setIsNotesLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <main className={inter.className}>
      <div className="p-8 flex flex-col gap-20 justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl select-none font-bold mt-10 py-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
            Cognition
          </h1>
          <span className="font-medium select-none">
            Study. Faster. <span className="text-orange-500">Smarter.</span>
          </span>
        </div>
        <div className="flex flex-row gap-6 w-full">
          <div className="flex flex-col gap-3 w-full">
            <textarea
              name=""
              id=""
              rows={10}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Paste your study notes 📝"
              className="ring-1 resize-none w-full p-4 ring-slate-200 hover:ring-slate-300 focus:ring-orange-500 focus:ring-2 outline-none transition-all duration-300 rounded-lg shadow-sm"
            ></textarea>
            {/* make a black button that says make question */}
            <button
              className="bg-slate-900 font-medium text-white px-6 py-2 w-max rounded-md shadow-sm hover:bg-slate-800 focus:ring-orange-500 focus:ring active:ring active:ring-orange-500 transition-all duration-300"
              onClick={() => getChatCompletionStream(notesText)}
            >
              {isNotesLoading ? (
                <span className="inline-flex gap-2 animate-pulse">
                  Thinking <p>🧠</p>
                </span>
              ) : (
                "Quiz Me"
              )}
            </button>
          </div>
          <div className="flex flex-col gap-3 items-end justify-end w-full">
            <textarea
              name=""
              id=""
              rows={10}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer 👍"
              className="ring-1 resize-none w-full p-4 ring-slate-200 hover:ring-slate-300 focus:ring-orange-500 focus:ring-2 outline-none transition-all duration-300 rounded-lg shadow-sm"
            ></textarea>
            <button
              className="bg-slate-900 font-medium text-white px-6 py-2 w-max rounded-md shadow-sm hover:bg-slate-800 focus:ring-orange-500 focus:ring active:ring active:ring-orange-500 transition-all duration-300"
              onClick={() => getChatCompletionStream(notesText)}
            >
              {isNotesLoading ? (
                <span className="inline-flex gap-2 animate-pulse">
                  Thinking <p>🧠</p>
                </span>
              ) : (
                "Quiz Me"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex flex-col gap-3 text-center w-9/12">
          <p className="text-2xl font-semibold text-slate-800">{question}</p>
        </div>
      </div>
    </main>
  );
}
