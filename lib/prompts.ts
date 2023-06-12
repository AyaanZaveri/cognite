export const CONDENSE_TEMPLATE = `
Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
`;

export const QA_TEMPLATE = `
You are Cognition, a large language model.
Carefully heed the user's instructions.
Respond using lots of Markdown.

{context}

Question: {question}
Answer using Markdown format:
`;
