exports.id = 3019;
exports.ids = [3019];
exports.modules = {

/***/ 87531:
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 87531;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 63019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetch: () => (/* binding */ fetch)
/* harmony export */ });
/**
 * Imitates `fetch` via `https` to only suit our needs, it does nothing more.
 * This is because we cannot bundle `node-fetch` as it uses many other Node.js
 * utilities, while also bloating our bundles. This approach is much leaner.
 * @param url
 * @param options
 * @returns
 */ async function fetch(url, options = {}) {
    const httpsOptions = buildOptions(options);
    const incomingData = new Array();
    const { origin } = new URL(url);
    const https = await facadeImport("node:https");
    return new Promise((resolve, reject)=>{
        // we execute the https request and build a fetch response out of it
        const request = https.request(url, httpsOptions, (response)=>{
            const { statusCode = 200, headers: { location } } = response;
            if (statusCode >= 301 && statusCode <= 399 && location) {
                if (location.startsWith("http") === false) {
                    resolve(fetch(`${origin}${location}`, options));
                } else {
                    resolve(fetch(location, options));
                }
            }
            response.on("data", (chunk)=>incomingData.push(chunk));
            response.on("end", ()=>resolve(buildResponse(incomingData, response)));
            response.on("error", reject);
        });
        request.on("error", reject);
        request.end(options.body ?? "");
    });
}
/**
 * Build http headers from fetch-like headers
 * @param options
 * @returns
 */ function buildHeaders(options) {
    return {
        ...options.headers,
        "Content-Type": "application/json"
    };
}
/**
 * Build http options from fetch-like options
 * @param options
 * @returns
 */ function buildOptions(options) {
    return {
        method: options.method,
        headers: buildHeaders(options)
    };
}
/**
 * Build a fetch-like response from an http response
 * @param incomingData
 * @param response
 * @returns
 */ function buildResponse(incomingData, response) {
    const { statusCode = 200, url, headers } = response;
    return {
        text: ()=>Promise.resolve(Buffer.concat(incomingData).toString()),
        json: ()=>Promise.resolve(JSON.parse(Buffer.concat(incomingData).toString())),
        ok: statusCode >= 200 && statusCode <= 299,
        status: statusCode,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        url: url,
        headers: new NodeHeaders(headers)
    };
}
class NodeHeaders {
    #headers;
    constructor(init = {}){
        this.#headers = new Map();
        for (const [key, value] of Object.entries(init)){
            if (typeof value === "string") {
                this.#headers.set(key, value);
            } else if (Array.isArray(value)) {
                for (const val of value){
                    this.#headers.set(key, val);
                }
            }
        }
    }
    append(name, value) {
        this.#headers.set(name, value);
    }
    delete(name) {
        this.#headers.delete(name);
    }
    get(name) {
        return this.#headers.get(name) ?? null;
    }
    has(name) {
        return this.#headers.has(name);
    }
    set(name, value) {
        this.#headers.set(name, value);
    }
    forEach(callbackfn, thisArg) {
        for (const [key, value] of this.#headers){
            callbackfn.call(thisArg, value, key, this);
        }
    }
}
/** This is needed to obfuscate the import from Cloudflare's bundling. */ function facadeImport(path) {
    return __webpack_require__(87531)(path);
}


/***/ })

};
;