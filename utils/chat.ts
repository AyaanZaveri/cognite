const formatVercelMessages = (chatHistory: ChatItem[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content.replace(/\n/g, "")}`;
    } else if (message.role === "assistant") {
      console.log(`Assistant: ${message.content.replace(/\n/g, "")}`);
      return `Assistant: ${message.content.replace(/\n/g, "")}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });

  // console.log(formattedDialogueTurns);

  return formattedDialogueTurns.join("\n");
};

export function initializeChat(
  messages: ChatItem[],
  query: string,
  contextText: string,
  prompt: string
): { chatMessages: ChatItem[] } {
  // Here is some context from a document.
  // ${contextText}

  const previousMessages = messages.slice(0, -1);

  // Here is some context from a document, along with a question related to it.
  // <context>
  //   ${contextText}
  // </context>
  const finalQuery = `

  <context>
    ${contextText}
  </context>
  
  Question: ${query}
  ${formatVercelMessages(previousMessages)}
  Answer:
    `;

  // Remove the last message, which is the user query
  // and restructure the user query to include the instructions and context.
  // Add the system prompt as the first message of the array
  // and add the user query as the last message of the array.
  messages.pop();
  messages = [
    // { role: "system", content: prompt },
    ...(messages ?? []),
    { role: "user", content: finalQuery },
  ];

  console.log(messages);

  return { chatMessages: messages };
}

export interface ChatItem {
  role: "system" | "user" | "assistant" | "function";
  content: string;
}
