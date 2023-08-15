"use strict";
(() => {
var exports = {};
exports.id = 8039;
exports.ids = [8039];
exports.modules = {

/***/ 53524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

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

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

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

/***/ 88535:
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

// NAMESPACE OBJECT: ./app/api/cog/create/route.ts
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
// EXTERNAL MODULE: external "@prisma/client"
var client_ = __webpack_require__(53524);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/embeddings/openai.js + 3 modules
var openai = __webpack_require__(8189);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/vectorstores/prisma.js + 4 modules
var prisma = __webpack_require__(58636);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(82374);
// EXTERNAL MODULE: ./lib/prisma.ts
var lib_prisma = __webpack_require__(93017);
// EXTERNAL MODULE: ./lib/auth.ts
var auth = __webpack_require__(24154);
;// CONCATENATED MODULE: ./app/api/cog/create/route.ts






async function POST(req) {
    const session = await (0,auth/* getAuthSession */.P)();
    if (!session?.user) {
        return new Response("Unauthorized", {
            status: 401
        });
    }
    const { data } = await req.json();
    const { userId, name, description, slug, imgUrl, docs, tags, isPrivate } = data;
    if (!userId || !name || !slug || !docs) {
        return next_response/* default */.Z.error();
    }
    const cog = await lib_prisma/* default */.Z?.cog.create({
        data: {
            userId,
            name,
            description,
            slug,
            imgUrl,
            tags: {
                connectOrCreate: tags.map((tag)=>({
                        where: {
                            name: tag
                        },
                        create: {
                            name: tag
                        }
                    }))
            },
            private: isPrivate
        }
    }).catch((err)=>{
        console.log("Create Error", err, "Done!");
    });
    try {
        const embeddingsModel = new openai/* OpenAIEmbeddings */.V({
            openAIApiKey: "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",
            stripNewLines: true,
            verbose: true
        }, {
            basePath: "https://api.openai.com/v1"
        });
        console.log("Initalized Embeddings Model");
        const vectorStore = prisma/* PrismaVectorStore */.W.withModel(lib_prisma/* default */.Z).create(embeddingsModel, {
            prisma: client_.Prisma,
            tableName: "Embeddings",
            vectorColumnName: "embedding",
            columns: {
                id: prisma/* PrismaVectorStore */.W.IdColumn,
                content: prisma/* PrismaVectorStore */.W.ContentColumn
            }
        });
        console.log("Initalized Vector Store");
        if (docs) {
            await vectorStore.addModels(await lib_prisma/* default */.Z.$transaction(docs.map((content)=>lib_prisma/* default */.Z.embeddings.create({
                    data: {
                        content: content?.pageContent,
                        cog_id: cog?.id
                    }
                }))));
        }
        console.log("Added Models");
        return next_response/* default */.Z.json({
            success: true,
            cog
        });
    } catch (error) {
        console.log(error);
        return next_response/* default */.Z.json({
            error: error
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcog%2Fcreate%2Froute&name=app%2Fapi%2Fcog%2Fcreate%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcog%2Fcreate%2Froute.ts&appDir=%2FUsers%2Fayaanzaveri%2FCode%2Fcognition%2Fapp&appPaths=%2Fapi%2Fcog%2Fcreate%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/cog/create/route",
        pathname: "/api/cog/create",
        filename: "route",
        bundlePath: "app/api/cog/create/route"
    },
    resolvedPagePath: "/Users/ayaanzaveri/Code/cognition/app/api/cog/create/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/cog/create/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2041,9311,7770,7568,2374,2282,3635,4154], () => (__webpack_exec__(88535)));
module.exports = __webpack_exports__;

})();