"use strict";
(() => {
var exports = {};
exports.id = 4093;
exports.ids = [4093];
exports.modules = {

/***/ 38061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ embeddings)
});

;// CONCATENATED MODULE: external "langchain/embeddings/openai"
const openai_namespaceObject = require("langchain/embeddings/openai");
;// CONCATENATED MODULE: ./utils/embed.ts

const createEmbeddings = async (docs)=>{
    const embeddings = new openai_namespaceObject.OpenAIEmbeddings({
        openAIApiKey: "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",
        stripNewLines: true,
        verbose: true
    }, {
        basePath: "https://api.openai.com/v1"
    });
    const documentRes = await embeddings.embedDocuments(docs);
    return documentRes;
};

;// CONCATENATED MODULE: ./pages/api/embeddings.ts

const embedding = async (req, res)=>{
    const { docs } = req.body;
    const vectorStore = await createEmbeddings(docs);
    res.status(200).json(vectorStore);
};
/* harmony default export */ const embeddings = (embedding);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(38061));
module.exports = __webpack_exports__;

})();