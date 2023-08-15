"use strict";
(() => {
var exports = {};
exports.id = 7577;
exports.ids = [7577];
exports.modules = {

/***/ 53524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 41506:
/***/ ((module) => {

module.exports = require("@prisma/client/edge");

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

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

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

/***/ 75131:
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

// NAMESPACE OBJECT: ./app/api/cog/[cogId]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(53558);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(42003);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(124);
// EXTERNAL MODULE: ./lib/auth.ts
var auth = __webpack_require__(24154);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod@3.21.4/node_modules/zod/lib/index.mjs
var lib = __webpack_require__(70794);
// EXTERNAL MODULE: ./lib/prisma-edge.ts
var prisma_edge = __webpack_require__(50525);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(82374);
;// CONCATENATED MODULE: ./app/api/cog/[cogId]/route.ts




const routeContextSchema = lib/* object */.Ry({
    params: lib/* object */.Ry({
        cogId: lib/* string */.Z_()
    })
});
async function DELETE(req, context) {
    try {
        // Validate the route params.
        const { params } = routeContextSchema.parse(context);
        // Check if the user has access to this cog.
        if (!await verifyCurrentUserHasAccessToCog(params.cogId)) {
            return next_response/* default */.Z.json(null, {
                status: 403
            });
        }
        await prisma_edge/* default */.Z.embeddings.deleteMany({
            where: {
                cog_id: params.cogId
            }
        });
        // Delete the cog.
        await prisma_edge/* default */.Z.cog.delete({
            where: {
                id: params.cogId
            }
        });
        return next_response/* default */.Z.json(null, {
            status: 200
        });
    } catch (error) {
        if (error instanceof lib/* ZodError */.jm) {
            console.log("error", error);
            return next_response/* default */.Z.json(error.issues, {
                status: 422
            });
        }
        return next_response/* default */.Z.json(null, {
            status: 500
        });
    }
}
async function verifyCurrentUserHasAccessToCog(cogId) {
    const session = await (0,auth/* getAuthSession */.P)();
    const count = await prisma_edge/* default */.Z.cog.count({
        where: {
            id: cogId,
            userId: session?.user.id
        }
    });
    console.log("count", count);
    return count > 0;
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.15_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcog%2F%5BcogId%5D%2Froute&name=app%2Fapi%2Fcog%2F%5BcogId%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcog%2F%5BcogId%5D%2Froute.ts&appDir=%2FUsers%2Fayaanzaveri%2FCode%2Fcognition%2Fapp&appPaths=%2Fapi%2Fcog%2F%5BcogId%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/cog/[cogId]/route",
        pathname: "/api/cog/[cogId]",
        filename: "route",
        bundlePath: "app/api/cog/[cogId]/route"
    },
    resolvedPagePath: "/Users/ayaanzaveri/Code/cognition/app/api/cog/[cogId]/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/cog/[cogId]/route";


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ 50525:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _prisma_client_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41506);
/* harmony import */ var _prisma_client_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client_edge__WEBPACK_IMPORTED_MODULE_0__);

let prisma =  true ? new _prisma_client_edge__WEBPACK_IMPORTED_MODULE_0__.PrismaClient() : 0;
if (false) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2041,9311,7770,7568,2374,794,4154], () => (__webpack_exec__(75131)));
module.exports = __webpack_exports__;

})();