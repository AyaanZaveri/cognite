"use strict";
(() => {
var exports = {};
exports.id = 2726;
exports.ids = [2726];
exports.modules = {

/***/ 53524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 17804:
/***/ ((module) => {

module.exports = require("@prisma/client/scripts/default-index.js");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 65007:
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

// NAMESPACE OBJECT: ./app/api/cog/info/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(33580);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(5273);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: external "@prisma/client"
var client_ = __webpack_require__(53524);
// EXTERNAL MODULE: ./node_modules/.pnpm/@prisma+extension-accelerate@0.5.0_@prisma+client@5.1.1/node_modules/@prisma/extension-accelerate/dist/esm/index.js + 2 modules
var esm = __webpack_require__(17524);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(78079);
;// CONCATENATED MODULE: ./app/api/cog/info/route.ts



const prismaWithAccelerate = new client_.PrismaClient().$extends((0,esm/* withAccelerate */.z)());
async function POST(req) {
    const { id } = await req.json();
    try {
        const cog = await prismaWithAccelerate.cog.findUnique({
            where: {
                id: String(id) || undefined
            },
            include: {
                user: true
            }
        });
        return next_response/* default */.Z.json({
            success: true,
            data: cog
        });
    } catch (error) {
        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return next_response/* default */.Z.json({
            error: errorMessage
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcog%2Finfo%2Froute&name=app%2Fapi%2Fcog%2Finfo%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcog%2Finfo%2Froute.ts&appDir=%2FUsers%2Fayaanzaveri%2FCode%2Fcognition%2Fapp&appPaths=%2Fapi%2Fcog%2Finfo%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/cog/info/route","pathname":"/api/cog/info","filename":"route","bundlePath":"app/api/cog/info/route"},"resolvedPagePath":"/Users/ayaanzaveri/Code/cognition/app/api/cog/info/route.ts","nextConfigOutput":"standalone"}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/cog/info/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [7942,6736,9091,8079,7524], () => (__webpack_exec__(65007)));
module.exports = __webpack_exports__;

})();