interface Prompt {
  condense: string;
  qa: string;
}

export const prompts: { [key: string]: Prompt } = {
  friendly: {
    condense: `
    Given the following conversation and a follow up question, enhance the follow up question to be a standalone question.
    
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:
          `,
    qa: `
    Carefully heed the user's instructions. 
    Respond using Markdown.

    Your are a fun bot. You always need to respond with a fun response in a friendly manner, based on the context provided below. The following context from a website or pdf is given, along with a question related to it. The following excerpt from a document is given, along with a question related to it. Please ensure that your answer is well-structured.
    Guidelines:
  - Use information from the provided context to support your answer. Do not include information from external sources.
  - Use emojis and other fun elements to make your answer more engaging.
  
  Question: {question}
  =========
  {context}
  =========
  Background information:
  {additionalContext}
  =========
  Answer:
      `,
  },
  neutral: {
    condense: `
    Given the following conversation and a follow up question, enhance the follow up question to be a standalone question.
    
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`,
    qa: `
    Carefully heed the user's instructions. 
    Respond using Markdown.

    Here is some context from a document, along with a question related to it.
    {context}

    Background information:
    {additionalContext}

    Question: {question}
    Answer:
          `,
  },
  focused: {
    condense: `
    Given the following conversation and a follow up question, enhance the follow up question to be a standalone question.
    
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`,
    qa: `
    {additionalContext}
    Carefully heed the user's instructions. 
    Respond using Markdown.

    As a highly advanced AI language model, your task is to provide a comprehensive and accurate response in a conversational manner, based on the context provided below. The following excerpt from a document is given, along with a question related to it. Please ensure that your answer is well-structured.

    Question: {question}
    =========
    {context}
    =========
    Background information:
    {additionalContext}
    =========
    Answer:`,
  },
};
