"use strict";
(() => {
var exports = {};
exports.id = 2101;
exports.ids = [2101];
exports.modules = {

/***/ 93646:
/***/ ((module) => {

module.exports = import("youtubei.js/web");;

/***/ }),

/***/ 65599:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   video: () => (/* binding */ video)
/* harmony export */ });
/* harmony import */ var youtubei_js_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93646);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([youtubei_js_web__WEBPACK_IMPORTED_MODULE_0__]);
youtubei_js_web__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const video = async (req, res)=>{
    try {
        const youtube = await youtubei_js_web__WEBPACK_IMPORTED_MODULE_0__.Innertube.create();
        const result = await youtube.search("abcd");
        res.status(200).json({
            result: "ok"
        });
    } catch (e) {
        res.status(400).json({
            result: "error"
        });
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(65599));
module.exports = __webpack_exports__;

})();