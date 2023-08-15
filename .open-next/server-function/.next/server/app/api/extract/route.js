"use strict";
(() => {
var exports = {};
exports.id = 1795;
exports.ids = [1795];
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

/***/ 37333:
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

// NAMESPACE OBJECT: ./app/api/extract/route.ts
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
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(82374);
// EXTERNAL MODULE: ./node_modules/.pnpm/axios@1.4.0/node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(82282);
// EXTERNAL MODULE: ./lib/auth.ts
var auth = __webpack_require__(24154);
;// CONCATENATED MODULE: ./app/api/extract/route.ts



const cheerio = __webpack_require__(81631);
async function POST(req) {
    const session = await (0,auth/* getAuthSession */.P)();
    if (!session?.user) {
        return new Response("Unauthorized", {
            status: 401
        });
    }
    const { urls } = await req.json();
    console.log("urls", urls);
    if (!urls || !Array.isArray(urls)) {
        console.log("URLs array is required in the request body");
        return next_response/* default */.Z.json({
            error: "URLs array is required in the request body",
            status: 400
        });
    }
    function extractText(element) {
        if (element.type === "text") {
            return element.data.trim();
        }
        if (element.type === "tag" || element.type === "root") {
            return element.children.map((child)=>extractText(child)).join(" ");
        }
        return "";
    }
    try {
        let combinedText = "";
        for (const url of urls){
            // Fetch the HTML content of the URL
            const response = await axios/* default */.Z.get(url);
            // Load the fetched HTML content with Cheerio
            const $ = cheerio.load(response.data);
            // Extract the title
            const title = $("title").text();
            // Extract the text content from the body
            let extractedText = extractText($("body")[0]);
            // Remove unnecessary white spaces, new line characters, and tab characters
            extractedText = extractedText.replace(/\s\s+/g, " ").replace(/\n/g, "").replace(/\t/g, "");
            combinedText += `${title}\n${extractedText}\n`;
        }
        return next_response/* default */.Z.json({
            extracted_text: combinedText,
            status: 200
        });
    } catch (error) {
        console.log("error is", error);
        return next_response/* default */.Z.error();
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fextract%2Froute&name=app%2Fapi%2Fextract%2Froute&pagePath=private-next-app-dir%2Fapi%2Fextract%2Froute.ts&appDir=%2FUsers%2Fayaanzaveri%2FCode%2Fcognition%2Fapp&appPaths=%2Fapi%2Fextract%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/extract/route",
        pathname: "/api/extract",
        filename: "route",
        bundlePath: "app/api/extract/route"
    },
    resolvedPagePath: "/Users/ayaanzaveri/Code/cognition/app/api/extract/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/extract/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2041,9311,7770,7568,2374,2282,1631,4154], () => (__webpack_exec__(37333)));
module.exports = __webpack_exports__;

})();