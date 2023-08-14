"use strict";
(() => {
var exports = {};
exports.id = 4075;
exports.ids = [4075];
exports.modules = {

/***/ 8048:
/***/ ((module) => {

module.exports = require("cheerio");

/***/ }),

/***/ 65198:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/extract.ts

const cheerio = __webpack_require__(8048);
async function handler(req, res) {
    const urls = req.body.urls;
    if (!urls || !Array.isArray(urls)) {
        res.status(400).json({
            error: "URLs array is required in the request body"
        });
        return;
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
            const response = await external_axios_default().get(url);
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
        res.status(200).json({
            extracted_text: combinedText
        });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while extracting text"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(65198));
module.exports = __webpack_exports__;

})();