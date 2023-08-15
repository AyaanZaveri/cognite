"use strict";
exports.id = 5854;
exports.ids = [5854];
exports.modules = {

/***/ 95854:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  z: () => (/* binding */ withAccelerate)
});

// EXTERNAL MODULE: external "@prisma/client/scripts/default-index.js"
var default_index_js_ = __webpack_require__(17804);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@prisma+extension-accelerate@0.5.0_@prisma+client@5.1.1/node_modules/@prisma/extension-accelerate/dist/esm/semver.js
/**
 * Compares two SemVer strings.
 * @returns positive if b > a, negative if b < a, and 0 if versions are equal
 */ function compareSemVer(a, b) {
    const [major1 = 0, minor1 = 0, patch1 = 0] = a.split(".").map(Number);
    const [major2 = 0, minor2 = 0, patch2 = 0] = b.split(".").map(Number);
    const major = major2 - major1;
    const minor = minor2 - minor1;
    const patch = patch2 - patch1;
    return major || minor || patch;
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@prisma+extension-accelerate@0.5.0_@prisma+client@5.1.1/node_modules/@prisma/extension-accelerate/dist/esm/user-agent.js

/**
 * Generates a User-Agent string derived from the current execution environment.
 */ function getUserAgent() {
    const prismaVersion = default_index_js_.Prisma.prismaVersion;
    const parts = [
        getRuntimeSegment(),
        `PrismaEngine/${prismaVersion.engine}`,
        `PrismaClient/${prismaVersion.client}`
    ];
    return parts.join(" ");
}
/**
 * Generates a User-Agent segment for the JavaScript runtime environment.
 */ function getRuntimeSegment() {
    if (typeof navigator !== "undefined") {
        // Deno, Bun, Cloudflare Workers, general WinterCG compat
        return navigator.userAgent;
    } else if (typeof process !== "undefined" && typeof process.versions !== "undefined") {
        return `Node/${process.versions.node} (${process.platform}; ${process.arch})`;
    } else if ("EdgeRuntime" in globalThis) {
        return `Vercel-Edge-Runtime`;
    } else {
        return `UnknownRuntime`;
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@prisma+extension-accelerate@0.5.0_@prisma+client@5.1.1/node_modules/@prisma/extension-accelerate/dist/esm/index.js
/* eslint-disable @typescript-eslint/no-non-null-assertion */ /// <reference lib="dom" />
// importing default is needed for ESM compatibility
// default-index is a CJS file, so named exports are not resolved
// the types create a separate resolution issue, so they are still imported by name



const EXTENSION_NAME = "@prisma/extension-accelerate";
function makeWithCacheHeaders() {
    const userAgent = getUserAgent();
    let machineHint = undefined;
    async function getFetcher() {
        if (typeof globalThis?.fetch === "function") {
            return globalThis.fetch;
        } else {
            const { fetch } = await __webpack_require__.e(/* import() */ 4746).then(__webpack_require__.bind(__webpack_require__, 84746));
            return fetch;
        }
    }
    return async (params)=>{
        const { args } = params;
        const { cacheStrategy, __accelerateInfo = false, ...rest } = args;
        let info = null;
        const { __internalParams, query } = params;
        __internalParams.customDataProxyFetch = ()=>{
            return async (url, options)=>{
                const cacheControl = new Array();
                if (typeof cacheStrategy?.ttl === "number") {
                    cacheControl.push(`max-age=${cacheStrategy.ttl}`);
                }
                if (typeof cacheStrategy?.swr === "number") {
                    cacheControl.push(`stale-while-revalidate=${cacheStrategy.swr}`);
                }
                options.headers = {
                    ...options.headers,
                    "cache-control": cacheControl.length > 0 ? cacheControl.join(",") : `no-cache`,
                    "user-agent": userAgent
                };
                if (machineHint) {
                    options.headers["accelerate-query-engine-jwt"] = machineHint;
                }
                const fetch = await getFetcher();
                const response = await fetch(url, options);
                info = {
                    cacheStatus: response.headers.get("accelerate-cache-status"),
                    lastModified: new Date(response.headers.get("last-modified") ?? ""),
                    region: response.headers.get("cf-ray")?.split("-")[1] ?? "unspecified",
                    requestId: response.headers.get("cf-ray") ?? "unspecified",
                    signature: response.headers.get("accelerate-signature") ?? "unspecified"
                };
                machineHint = response.headers.get("accelerate-query-engine-jwt") ?? undefined;
                return response;
            };
        };
        if (__accelerateInfo) {
            const data = await query(rest, __internalParams);
            return {
                data,
                info
            };
        } else {
            return query(rest, __internalParams);
        }
    };
}
function withAccelerate() {
    // ctx.$parent was added in 5.1.0 to support iTx in extensions
    const enableCtxParent = compareSemVer("5.1.0", default_index_js_.Prisma.prismaVersion.client) >= 0;
    return default_index_js_.Prisma.defineExtension((client)=>{
        const withCacheHeaders = makeWithCacheHeaders();
        const xclient = client.$extends({
            name: EXTENSION_NAME,
            query: {
                $allModels: {
                    // also apply withCacheHeaders to mutations for machine hint benefit
                    $allOperations: withCacheHeaders
                }
            }
        });
        return xclient.$extends({
            name: EXTENSION_NAME,
            model: {
                $allModels: {
                    // TODO: these functions are repetitive. Is there a type we can use to generic this?
                    // TODO: can we define these in a map that ensures query and model overrides stay in sync/
                    aggregate (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.aggregate(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.aggregate({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    count (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.count(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.count({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    findFirst (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.findFirst(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.findFirst({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    findFirstOrThrow (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.findFirstOrThrow(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.findFirstOrThrow({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    findMany (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.findMany(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.findMany({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    findUnique (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.findUnique(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.findUnique({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    findUniqueOrThrow (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.findUniqueOrThrow(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.findUniqueOrThrow({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    },
                    groupBy (args) {
                        const ctx = default_index_js_.Prisma.getExtensionContext(this);
                        const model = enableCtxParent ? ctx.$parent[ctx.$name] : xclient[ctx.name];
                        const prismaPromise = model.groupBy(args);
                        return Object.assign(prismaPromise, {
                            withAccelerateInfo () {
                                return model.groupBy({
                                    ...args,
                                    __accelerateInfo: true
                                });
                            }
                        });
                    }
                }
            }
        });
    });
}


/***/ })

};
;