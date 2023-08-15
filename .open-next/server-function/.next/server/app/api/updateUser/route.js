"use strict";
(() => {
var exports = {};
exports.id = 456;
exports.ids = [456];
exports.modules = {

/***/ 53524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 17804:
/***/ ((module) => {

module.exports = require("@prisma/client/scripts/default-index.js");

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

/***/ 17806:
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

// NAMESPACE OBJECT: ./app/api/updateUser/route.ts
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
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(78079);
// EXTERNAL MODULE: ./lib/auth.ts
var auth = __webpack_require__(66298);
// EXTERNAL MODULE: ./node_modules/.pnpm/@prisma+extension-accelerate@0.5.0_@prisma+client@5.1.1/node_modules/@prisma/extension-accelerate/dist/esm/index.js + 2 modules
var esm = __webpack_require__(17524);
;// CONCATENATED MODULE: ./app/api/updateUser/route.ts




const prismaWithAccelerate = new client_.PrismaClient().$extends((0,esm/* withAccelerate */.z)());
async function POST(req) {
    const session = await (0,auth/* getAuthSession */.P)();
    if (!session?.user) {
        return new Response("Unauthorized", {
            status: 401
        });
    }
    const { id, username, bio } = await req.json();
    try {
        const user = await prismaWithAccelerate.user.update({
            where: {
                id: String(id)
            },
            data: {
                username: String(username),
                bio: String(bio)
            }
        });
        return next_response/* default */.Z.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        return next_response/* default */.Z.json({
            error: error
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2FupdateUser%2Froute&name=app%2Fapi%2FupdateUser%2Froute&pagePath=private-next-app-dir%2Fapi%2FupdateUser%2Froute.ts&appDir=%2FUsers%2Fayaanzaveri%2FCode%2Fcognition%2Fapp&appPaths=%2Fapi%2FupdateUser%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/updateUser/route","pathname":"/api/updateUser","filename":"route","bundlePath":"app/api/updateUser/route"},"resolvedPagePath":"/Users/ayaanzaveri/Code/cognition/app/api/updateUser/route.ts","nextConfigOutput":"standalone"}
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

    const originalPathname = "/api/updateUser/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [7942,8682,6736,9091,8079,7524,6298], () => (__webpack_exec__(17806)));
module.exports = __webpack_exports__;

})();