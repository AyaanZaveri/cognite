# Cognite 🔥
The **open-source alternative** to OpenAI's GPT Store built w/ Next.js and LangChain.js

## 👇 Screenshots
![Homepage](https://github.com/AyaanZaveri/cognite/assets/63752541/5ffe48a3-6b03-4b9f-b1b1-52b3f19290e0)
![Chat](https://github.com/AyaanZaveri/cognite/assets/63752541/8ee93c37-a537-4f33-829c-1260361b4378)
![Create](https://github.com/AyaanZaveri/cognite/assets/63752541/1d1fa03a-1005-48c9-9c97-f65b9e1ec859)

## 🤔 What is it?
It's a fast and simple way to **share** and **create** chatbots with external knowledge such as a website or a document. This can be helpful for things like creating bots for knowing specific things, such as a research paper, a book, etc.

## 🥖 How do I use it?
- To find chatbots just start typing on the search bar on the homepage and find what you need
- To create a chatbot, head to the create page. Put in a name and give it some knowledge (website or PDF as of right now)

## 🌎 How does it work?
🦜 [LangChain.js](https://github.com/langchain-ai/langchainjs) for the AI backend such as the embeddings and chat  
<img src="https://cdn.simpleicons.org/nextdotjs/000/fff" alt="Next" width=16> [Next.js](https://github.com/vercel/next.js) as the full-stack framework  
<img src="https://cdn.simpleicons.org/prisma/000/fff" alt="Prisma" width=16> [Prisma](https://github.com/prisma/prisma) to interact with the database in an easier way  
<img src="https://cdn.simpleicons.org/tailwindcss/06B6D4/fff" alt="Tailwind" width=16> [shadcn-ui](https://ui.shadcn.com/) + [TailwindCSS](https://tailwindcss.com/) as the UI framework and CSS

**Embeddings**: It uses [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) to create embeddings for the knowledge provided.  
**LLM**: It currently uses `mistralai/Mixtral-8x7B-Instruct-v0.1`, but you can use whatever LangChain currently [supports](https://js.langchain.com/docs/integrations/chat/)

## 🏡 Run Locally
1. Clone the repo `git clone https://github.com/AyaanZaveri/cognite && cd cognite`
2. Install bun (if not installed already) `npm install -g bun`
3. Run `bun i` to install packages
4. Edit the `env` variables, if you want to use different models, check out LangChain's [supported list](https://js.langchain.com/docs/integrations/chat/)
5. Run `bun dev` to run the code
6. Start tinkering 🚀!

## License
Licensed under the [AGPL v3](https://www.gnu.org/licenses/agpl-3.0.en.html) license.
