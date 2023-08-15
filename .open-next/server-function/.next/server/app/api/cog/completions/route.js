"use strict";
(() => {
var exports = {};
exports.id = 2495;
exports.ids = [2495];
exports.modules = {

/***/ 41506:
/***/ ((module) => {

module.exports = require("@prisma/client/edge");

/***/ }),

/***/ 17804:
/***/ ((module) => {

module.exports = require("@prisma/client/scripts/default-index.js");

/***/ }),

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 90607:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/cog/completions/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(53558);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(42003);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(124);
// EXTERNAL MODULE: external "@prisma/client/edge"
var edge_ = __webpack_require__(41506);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/chains.js + 31 modules
var chains = __webpack_require__(30433);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/embeddings/openai.js + 3 modules
var openai = __webpack_require__(8189);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/vectorstores/prisma.js + 4 modules
var prisma = __webpack_require__(58636);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/chat_models/openai.js
var chat_models_openai = __webpack_require__(25932);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/prompts.js
var prompts = __webpack_require__(23955);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(82374);
// EXTERNAL MODULE: ./node_modules/.pnpm/ai@2.1.33_react@18.2.0_solid-js@1.7.8_svelte@4.1.1_vue@3.3.4/node_modules/ai/dist/index.mjs + 1 modules
var dist = __webpack_require__(74655);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/callbacks.js + 1 modules
var callbacks = __webpack_require__(43160);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/schema.js
var schema = __webpack_require__(23205);
// EXTERNAL MODULE: ./node_modules/.pnpm/@prisma+extension-accelerate@0.5.0_@prisma+client@5.1.1/node_modules/@prisma/extension-accelerate/dist/esm/index.js + 2 modules
var esm = __webpack_require__(95854);
;// CONCATENATED MODULE: ./lib/prompts.ts
const prompts_prompts = {
    friendly: {
        condense: `
      Your task as an AI language model is to create a clear and concise standalone question based on the given conversation history and a related follow-up question. Ensure that your rephrased question captures the essence of the follow-up question without relying on the context of the conversation.
      System message: Be friendly, funny, and engaging. You are Cognition, a large language model trained by OpenAI. Carefully heed the user's instructions. Use emojis and markdown to make your response more engaging.
      Conversation history:
      {chat_history}
      Related follow-up question: {question}
      Rephrased standalone question
          `,
        qa: `
      As a highly advanced friendly AI language model, your task is to provide a comprehensive, accurate, and fun response in a friendly manner, based on the context provided below. The following excerpt from a document is given, along with a question related to it. Please ensure that your answer is well-structured and directly addresses the question.
  Guidelines:
  - Use information from the provided context to support your answer. Do not include information from external sources.
  - Use emojis and other fun elements to make your answer more engaging.
  - If the question is exactly "tl;dr" try your hardest to summarize the document in 100 words or less.
  - If the question is unrelated to the context, kindly inform that your responses are limited to the information provided in the given context.
  
  
  Question: {question}
  =========
  {context}
  =========
  Answer in Markdown format:
      `
    },
    neutral: {
        condense: `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`,
        qa: `
    You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
    If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
    Use as much detail when as possible when responding.
    
    {context}
    
    Question: {question}
    Helpful answer in markdown format:
          `
    },
    focused: {
        condense: `Your task as an AI language model is to create a clear and concise standalone question based on the given conversation history and a related follow-up question. Ensure that your rephrased question captures the essence of the follow-up question without relying on the context of the conversation.
    System message: You are Cognition, a large language model trained by OpenAI. Carefully heed the user's instructions.
    Conversation history:
    {chat_history}
    Related follow-up question: {question}
    Rephrased standalone question:`,
        qa: `As a highly advanced AI language model, your task is to provide a comprehensive and accurate response in a conversational manner, based on the context provided below. The following excerpt from a document is given, along with a question related to it. Please ensure that your answer is well-structured and directly addresses the question.

    Question: {question}
    =========
    {context}
    =========
    Respond using lots of Markdown.
    Answer in Markdown format:`
    }
};

;// CONCATENATED MODULE: ./app/api/cog/completions/route.ts












const prismaWithAccelerate = new edge_.PrismaClient().$extends((0,esm/* withAccelerate */.z)());
async function POST(req) {
    try {
        const { id, messages, style } = await req.json();
        const { stream, handlers } = (0,dist/* LangChainStream */.Gn)();
        const embeddingsModel = new openai/* OpenAIEmbeddings */.V({
            openAIApiKey: "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",
            stripNewLines: true,
            verbose: true
        }, {
            basePath: "https://api.openai.com/v1"
        });
        const vectorStore = prisma/* PrismaVectorStore */.W.withModel(prismaWithAccelerate).create(embeddingsModel, {
            prisma: edge_.Prisma,
            tableName: "Embeddings",
            vectorColumnName: "embedding",
            columns: {
                id: prisma/* PrismaVectorStore */.W.IdColumn,
                content: prisma/* PrismaVectorStore */.W.ContentColumn
            },
            filter: {
                cog_id: {
                    equals: id
                }
            }
        });
        console.log("Created vector store");
        // teach me more
        // what is this
        // add recipe books
        // add menus
        // make create button big at top so people click it
        const streamingModel = new chat_models_openai/* ChatOpenAI */.z({
            streaming: true,
            callbackManager: callbacks/* CallbackManager */.Ye.fromHandlers(handlers),
            temperature: 0.7,
            modelName: "gpt-3.5-turbo-16k",
            openAIApiKey: "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"
        }, {
            basePath: "https://api.openai.com/v1"
        });
        const nonStreamingModel = new chat_models_openai/* ChatOpenAI */.z({
            temperature: 0.3,
            modelName: "gpt-3.5-turbo",
            openAIApiKey: "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"
        }, {
            basePath: "https://api.openai.com/v1"
        });
        console.log("Created models");
        console.log(prompts_prompts[style].qa, prompts_prompts[style].condense);
        const chain = chains/* ConversationalRetrievalQAChain */.kP.fromLLM(streamingModel, vectorStore.asRetriever(), {
            returnSourceDocuments: true,
            qaChainOptions: {
                type: "stuff",
                prompt: prompts/* PromptTemplate */.Pf.fromTemplate(prompts_prompts[style].qa)
            },
            questionGeneratorChainOptions: {
                template: prompts_prompts[style].condense,
                llm: nonStreamingModel
            }
        });
        console.log("Created chain");
        const stringifySources = (docs)=>{
            if (docs) {
                const stringifiedSources = JSON.stringify(docs.map((x)=>x.metadata));
                return stringifiedSources;
            }
            return "";
        };
        const history = messages.map((m)=>{
            return m.role === "user" ? new schema/* HumanMessage */.xk(m.content) : new schema/* AIMessage */.gY(m.content.split("\n__META_JSON__\n")[0]);
        });
        const prompt = history.pop().text.trim().replaceAll("\n", " ");
        console.log("Calling chain");
        chain.call({
            question: prompt,
            chat_history: history
        }).then((response)=>{
            const { sourceDocuments } = response;
        // console.log(sourceDocuments);
        });
        return new dist/* StreamingTextResponse */.wn(stream);
    // return stream as readable stream
    } catch (error) {
        // get the first 2000 characters of the error
        const errorString = error.toString().substring(0, 2000);
        console.log(errorString);
        return next_response/* default */.Z.json({
            error: errorString
        });
    }
// return NextResponse.json({
//   response: response,
// });
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcog%2Fcompletions%2Froute&name=app%2Fapi%2Fcog%2Fcompletions%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcog%2Fcompletions%2Froute.ts&appDir=%2FUsers%2Fayaanzaveri%2FCode%2Fcognition%2Fapp&appPaths=%2Fapi%2Fcog%2Fcompletions%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/cog/completions/route",
        pathname: "/api/cog/completions",
        filename: "route",
        bundlePath: "app/api/cog/completions/route"
    },
    resolvedPagePath: "/Users/ayaanzaveri/Code/cognition/app/api/cog/completions/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/cog/completions/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2041,7770,7568,2374,5854,2282,3635,9469], () => (__webpack_exec__(90607)));
module.exports = __webpack_exports__;

})();