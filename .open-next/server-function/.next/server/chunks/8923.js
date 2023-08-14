"use strict";
exports.id = 8923;
exports.ids = [8923];
exports.modules = {

/***/ 33079:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function serialize(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookieString(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookieString(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookieString(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookieString(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>serialize(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>serialize(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = // @ts-expect-error See https://github.com/whatwg/fetch/issues/973
        (_c = (_b = (_a = responseHeaders.getAll) == null ? void 0 : _a.call(responseHeaders, "set-cookie")) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookieString(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this.set({
            name,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(serialize).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = serialize(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 69474:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;
(()=>{
    var i = {
        412: function(i, s) {
            /*!@license
 * UAParser.js v0.7.28
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */ (function(e, o) {
                "use strict";
                var r = "0.7.28", a = "", n = "?", t = "function", l = "undefined", w = "object", d = "string", b = "major", u = "model", c = "name", m = "type", p = "vendor", f = "version", h = "architecture", g = "console", v = "mobile", x = "tablet", k = "smarttv", _ = "wearable", y = "embedded", S = 255;
                var E = {
                    extend: function(i, s) {
                        var e = {};
                        for(var o in i){
                            if (s[o] && s[o].length % 2 === 0) {
                                e[o] = s[o].concat(i[o]);
                            } else {
                                e[o] = i[o];
                            }
                        }
                        return e;
                    },
                    has: function(i, s) {
                        return typeof i === d ? s.toLowerCase().indexOf(i.toLowerCase()) !== -1 : false;
                    },
                    lowerize: function(i) {
                        return i.toLowerCase();
                    },
                    major: function(i) {
                        return typeof i === d ? i.replace(/[^\d\.]/g, "").split(".")[0] : o;
                    },
                    trim: function(i, s) {
                        i = i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                        return typeof s === l ? i : i.substring(0, S);
                    }
                };
                var A = {
                    rgx: function(i, s) {
                        var e = 0, r, a, n, l, d, b;
                        while(e < s.length && !d){
                            var u = s[e], c = s[e + 1];
                            r = a = 0;
                            while(r < u.length && !d){
                                d = u[r++].exec(i);
                                if (!!d) {
                                    for(n = 0; n < c.length; n++){
                                        b = d[++a];
                                        l = c[n];
                                        if (typeof l === w && l.length > 0) {
                                            if (l.length == 2) {
                                                if (typeof l[1] == t) {
                                                    this[l[0]] = l[1].call(this, b);
                                                } else {
                                                    this[l[0]] = l[1];
                                                }
                                            } else if (l.length == 3) {
                                                if (typeof l[1] === t && !(l[1].exec && l[1].test)) {
                                                    this[l[0]] = b ? l[1].call(this, b, l[2]) : o;
                                                } else {
                                                    this[l[0]] = b ? b.replace(l[1], l[2]) : o;
                                                }
                                            } else if (l.length == 4) {
                                                this[l[0]] = b ? l[3].call(this, b.replace(l[1], l[2])) : o;
                                            }
                                        } else {
                                            this[l] = b ? b : o;
                                        }
                                    }
                                }
                            }
                            e += 2;
                        }
                    },
                    str: function(i, s) {
                        for(var e in s){
                            if (typeof s[e] === w && s[e].length > 0) {
                                for(var r = 0; r < s[e].length; r++){
                                    if (E.has(s[e][r], i)) {
                                        return e === n ? o : e;
                                    }
                                }
                            } else if (E.has(s[e], i)) {
                                return e === n ? o : e;
                            }
                        }
                        return i;
                    }
                };
                var N = {
                    browser: {
                        oldSafari: {
                            version: {
                                "1.0": "/8",
                                1.2: "/1",
                                1.3: "/3",
                                "2.0": "/412",
                                "2.0.2": "/416",
                                "2.0.3": "/417",
                                "2.0.4": "/419",
                                "?": "/"
                            }
                        },
                        oldEdge: {
                            version: {
                                .1: "12.",
                                21: "13.",
                                31: "14.",
                                39: "15.",
                                41: "16.",
                                42: "17.",
                                44: "18."
                            }
                        }
                    },
                    os: {
                        windows: {
                            version: {
                                ME: "4.90",
                                "NT 3.11": "NT3.51",
                                "NT 4.0": "NT4.0",
                                2e3: "NT 5.0",
                                XP: [
                                    "NT 5.1",
                                    "NT 5.2"
                                ],
                                Vista: "NT 6.0",
                                7: "NT 6.1",
                                8: "NT 6.2",
                                8.1: "NT 6.3",
                                10: [
                                    "NT 6.4",
                                    "NT 10.0"
                                ],
                                RT: "ARM"
                            }
                        }
                    }
                };
                var T = {
                    browser: [
                        [
                            /\b(?:crmo|crios)\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Chrome"
                            ]
                        ],
                        [
                            /edg(?:e|ios|a)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Edge"
                            ]
                        ],
                        [
                            /(opera\smini)\/([\w\.-]+)/i,
                            /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,
                            /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /opios[\/\s]+([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera Mini"
                            ]
                        ],
                        [
                            /\sopr\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera"
                            ]
                        ],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/\s]?([\w\.]+)/i,
                            /(?:ms|\()(ie)\s([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                            /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,
                            /(weibo)__([\d\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "UCBrowser"
                            ]
                        ],
                        [
                            /(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i
                        ],
                        [
                            f,
                            [
                                c,
                                "WeChat(Win) Desktop"
                            ]
                        ],
                        [
                            /micromessenger\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "WeChat"
                            ]
                        ],
                        [
                            /konqueror\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Konqueror"
                            ]
                        ],
                        [
                            /trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i
                        ],
                        [
                            f,
                            [
                                c,
                                "IE"
                            ]
                        ],
                        [
                            /yabrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Yandex"
                            ]
                        ],
                        [
                            /(avast|avg)\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                /(.+)/,
                                "$1 Secure Browser"
                            ],
                            f
                        ],
                        [
                            /focus\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Firefox Focus"
                            ]
                        ],
                        [
                            /opt\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera Touch"
                            ]
                        ],
                        [
                            /coc_coc_browser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Coc Coc"
                            ]
                        ],
                        [
                            /dolfin\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Dolphin"
                            ]
                        ],
                        [
                            /coast\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera Coast"
                            ]
                        ],
                        [
                            /xiaomi\/miuibrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "MIUI Browser"
                            ]
                        ],
                        [
                            /fxios\/([\w\.-]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Firefox"
                            ]
                        ],
                        [
                            /(qihu|qhbrowser|qihoobrowser|360browser)/i
                        ],
                        [
                            [
                                c,
                                "360 Browser"
                            ]
                        ],
                        [
                            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                /(.+)/,
                                "$1 Browser"
                            ],
                            f
                        ],
                        [
                            /(comodo_dragon)\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            f
                        ],
                        [
                            /\s(electron)\/([\w\.]+)\ssafari/i,
                            /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(MetaSr)[\/\s]?([\w\.]+)/i,
                            /(LBBROWSER)/i
                        ],
                        [
                            c
                        ],
                        [
                            /;fbav\/([\w\.]+);/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Facebook"
                            ]
                        ],
                        [
                            /FBAN\/FBIOS|FB_IAB\/FB4A/i
                        ],
                        [
                            [
                                c,
                                "Facebook"
                            ]
                        ],
                        [
                            /safari\s(line)\/([\w\.]+)/i,
                            /\b(line)\/([\w\.]+)\/iab/i,
                            /(chromium|instagram)[\/\s]([\w\.-]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /\bgsa\/([\w\.]+)\s.*safari\//i
                        ],
                        [
                            f,
                            [
                                c,
                                "GSA"
                            ]
                        ],
                        [
                            /headlesschrome(?:\/([\w\.]+)|\s)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Chrome Headless"
                            ]
                        ],
                        [
                            /\swv\).+(chrome)\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                "Chrome WebView"
                            ],
                            f
                        ],
                        [
                            /droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Android Browser"
                            ]
                        ],
                        [
                            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Mobile Safari"
                            ]
                        ],
                        [
                            /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i
                        ],
                        [
                            f,
                            c
                        ],
                        [
                            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i
                        ],
                        [
                            c,
                            [
                                f,
                                A.str,
                                N.browser.oldSafari.version
                            ]
                        ],
                        [
                            /(webkit|khtml)\/([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(navigator|netscape)\/([\w\.-]+)/i
                        ],
                        [
                            [
                                c,
                                "Netscape"
                            ],
                            f
                        ],
                        [
                            /ile\svr;\srv:([\w\.]+)\).+firefox/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Firefox Reality"
                            ]
                        ],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                            /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,
                            /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                            /(links)\s\(([\w\.]+)/i,
                            /(gobrowser)\/?([\w\.]*)/i,
                            /(ice\s?browser)\/v?([\w\._]+)/i,
                            /(mosaic)[\/\s]([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ]
                    ],
                    cpu: [
                        [
                            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "amd64"
                            ]
                        ],
                        [
                            /(ia32(?=;))/i
                        ],
                        [
                            [
                                h,
                                E.lowerize
                            ]
                        ],
                        [
                            /((?:i[346]|x)86)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "ia32"
                            ]
                        ],
                        [
                            /\b(aarch64|armv?8e?l?)\b/i
                        ],
                        [
                            [
                                h,
                                "arm64"
                            ]
                        ],
                        [
                            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                        ],
                        [
                            [
                                h,
                                "armhf"
                            ]
                        ],
                        [
                            /windows\s(ce|mobile);\sppc;/i
                        ],
                        [
                            [
                                h,
                                "arm"
                            ]
                        ],
                        [
                            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i
                        ],
                        [
                            [
                                h,
                                /ower/,
                                "",
                                E.lowerize
                            ]
                        ],
                        [
                            /(sun4\w)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "sparc"
                            ]
                        ],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                        ],
                        [
                            [
                                h,
                                E.lowerize
                            ]
                        ]
                    ],
                    device: [
                        [
                            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Samsung"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,
                            /\ssamsung[\s-]([\w-]+)/i,
                            /sec-(sgh\w+)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Samsung"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\((ip(?:hone|od)[\s\w]*);/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Apple"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\((ipad);[\w\s\),;-]+apple/i,
                            /applecoremedia\/[\w\.]+\s\((ipad)/i,
                            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Apple"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Huawei"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /d\/huawei([\w\s-]+)[;\)]/i,
                            /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,
                            /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Huawei"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\b(poco[\s\w]+)(?:\sbuild|\))/i,
                            /\b;\s(\w+)\sbuild\/hm\1/i,
                            /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,
                            /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,
                            /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                "Xiaomi"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                "Xiaomi"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /;\s(\w+)\sbuild.+\soppo/i,
                            /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i
                        ],
                        [
                            u,
                            [
                                p,
                                "OPPO"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\svivo\s(\w+)(?:\sbuild|\))/i,
                            /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Vivo"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(rmx[12]\d{3})(?:\sbuild|;)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Realme"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,
                            /\smot(?:orola)?[\s-](\w*)/i,
                            /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Motorola"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
                        ],
                        [
                            u,
                            [
                                p,
                                "Motorola"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "LG"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(lm-?f100[nv]?|nexus\s[45])/i,
                            /lg[e;\s\/-]+((?!browser|netcast)\w+)/i,
                            /\blg(\-?[\d\w]+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "LG"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(ideatab[\w\-\s]+)/i,
                            /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Lenovo"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(?:maemo|nokia).*(n900|lumia\s\d+)/i,
                            /nokia[\s_-]?([\w\.-]*)/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                "Nokia"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid.+;\s(pixel\sc)[\s)]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Sony"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /sony\stablet\s[ps]\sbuild\//i,
                            /(?:sony)?sgp\w+(?:\sbuild\/|\))/i
                        ],
                        [
                            [
                                u,
                                "Xperia Tablet"
                            ],
                            [
                                p,
                                "Sony"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(kb2005|in20[12]5|be20[12][59])\b/i,
                            /\ba000(1)\sbuild/i,
                            /\boneplus\s(a\d{4})[\s)]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "OnePlus"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(alexa)webm/i,
                            /(kf[a-z]{2}wi)(\sbuild\/|\))/i,
                            /(kf[a-z]+)(\sbuild\/|\)).+silk\//i
                        ],
                        [
                            u,
                            [
                                p,
                                "Amazon"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i
                        ],
                        [
                            [
                                u,
                                "Fire Phone"
                            ],
                            [
                                p,
                                "Amazon"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\((playbook);[\w\s\),;-]+(rim)/i
                        ],
                        [
                            u,
                            p,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /((?:bb[a-f]|st[hv])100-\d)/i,
                            /\(bb10;\s(\w+)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "BlackBerry"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ASUS"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ASUS"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(nexus\s9)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "HTC"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,
                            /(zte)-(\w*)/i,
                            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                        ],
                        [
                            p,
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Acer"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid.+;\s(m[1-5]\snote)\sbuild/i,
                            /\bmz-([\w-]{2,})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Meizu"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                            /(hp)\s([\w\s]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft);\s(lumia[\s\w]+)/i,
                            /(lenovo)[_\s-]?([\w-]+)/i,
                            /linux;.+(jolla);/i,
                            /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(archos)\s(gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /\s(nook)[\w\s]+build\/(\w+)/i,
                            /(dell)\s(strea[kpr\s\d]*[\dko])/i,
                            /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,
                            /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,
                            /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,
                            /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(surface\sduo)\s/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Microsoft"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(fp\du?)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Fairphone"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(u304aa)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "AT&T"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /sie-(\w*)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Siemens"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(rct\w+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "RCA"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/\s](venue[\d\s]{2,7})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Dell"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Verizon"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Barnes & Noble"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s(tm\d{3}\w+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "NuVision"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /;\s(k88)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ZTE"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /;\s(nx\d{3}j)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ZTE"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(gen\d{3})\sbuild.*49h/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Swiss"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(zur\d{3})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Swiss"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?((zeki)?tb.*\b)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zeki"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s([yr]\d{2})\sbuild/i,
                            /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i
                        ],
                        [
                            [
                                p,
                                "Dragon Touch"
                            ],
                            u,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(ns-?\w{0,9})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Insignia"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "NextBook"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i
                        ],
                        [
                            [
                                p,
                                "Voice"
                            ],
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i
                        ],
                        [
                            [
                                p,
                                "LvTel"
                            ],
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /;\s(ph-1)\s/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Essential"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Envizen"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "MachSpeed"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?tu_(1491)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Rotor"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(shield[\w\s]+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Nvidia"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(sprint)\s(\w+)/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(kin\.[onetw]{3})/i
                        ],
                        [
                            [
                                u,
                                /\./g,
                                " "
                            ],
                            [
                                p,
                                "Microsoft"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zebra"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zebra"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(ouya)\s/i,
                            /(nintendo)\s([wids3utch]+)/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /droid.+;\s(shield)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Nvidia"
                            ],
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /(playstation\s[345portablevi]+)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Sony"
                            ],
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Microsoft"
                            ],
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /smart-tv.+(samsung)/i
                        ],
                        [
                            p,
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /hbbtv.+maple;(\d+)/i
                        ],
                        [
                            [
                                u,
                                /^/,
                                "SmartTV"
                            ],
                            [
                                p,
                                "Samsung"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i
                        ],
                        [
                            [
                                p,
                                "LG"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /(apple)\s?tv/i
                        ],
                        [
                            p,
                            [
                                u,
                                "Apple TV"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /crkey/i
                        ],
                        [
                            [
                                u,
                                "Chromecast"
                            ],
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /droid.+aft([\w])(\sbuild\/|\))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Amazon"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /\(dtv[\);].+(aquos)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Sharp"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i
                        ],
                        [
                            [
                                p,
                                E.trim
                            ],
                            [
                                u,
                                E.trim
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i
                        ],
                        [
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /((pebble))app\/[\d\.]+\s/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                _
                            ]
                        ],
                        [
                            /droid.+;\s(glass)\s\d/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                _
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(wt63?0{2,3})\)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zebra"
                            ],
                            [
                                m,
                                _
                            ]
                        ],
                        [
                            /(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i
                        ],
                        [
                            p,
                            [
                                m,
                                y
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i
                        ],
                        [
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i
                        ],
                        [
                            u,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(tablet|tab)[;\/]/i,
                            /\s(mobile)(?:[;\/]|\ssafari)/i
                        ],
                        [
                            [
                                m,
                                E.lowerize
                            ]
                        ],
                        [
                            /(android[\w\.\s\-]{0,9});.+build/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Generic"
                            ]
                        ],
                        [
                            /(phone)/i
                        ],
                        [
                            [
                                m,
                                v
                            ]
                        ]
                    ],
                    engine: [
                        [
                            /windows.+\sedge\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "EdgeHTML"
                            ]
                        ],
                        [
                            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Blink"
                            ]
                        ],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                            /(icab)[\/\s]([23]\.[\d\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /rv\:([\w\.]{1,9})\b.+(gecko)/i
                        ],
                        [
                            f,
                            c
                        ]
                    ],
                    os: [
                        [
                            /microsoft\s(windows)\s(vista|xp)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(windows)\snt\s6\.2;\s(arm)/i,
                            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
                            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i
                        ],
                        [
                            c,
                            [
                                f,
                                A.str,
                                N.os.windows.version
                            ]
                        ],
                        [
                            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
                        ],
                        [
                            [
                                c,
                                "Windows"
                            ],
                            [
                                f,
                                A.str,
                                N.os.windows.version
                            ]
                        ],
                        [
                            /ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
                            /cfnetwork\/.+darwin/i
                        ],
                        [
                            [
                                f,
                                /_/g,
                                "."
                            ],
                            [
                                c,
                                "iOS"
                            ]
                        ],
                        [
                            /(mac\sos\sx)\s?([\w\s\.]*)/i,
                            /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i
                        ],
                        [
                            [
                                c,
                                "Mac OS"
                            ],
                            [
                                f,
                                /_/g,
                                "."
                            ]
                        ],
                        [
                            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/\s]([\w\.]+)/i,
                            /\((series40);/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /\(bb(10);/i
                        ],
                        [
                            f,
                            [
                                c,
                                "BlackBerry"
                            ]
                        ],
                        [
                            /(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Symbian"
                            ]
                        ],
                        [
                            /mozilla.+\(mobile;.+gecko.+firefox/i
                        ],
                        [
                            [
                                c,
                                "Firefox OS"
                            ]
                        ],
                        [
                            /web0s;.+rt(tv)/i,
                            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "webOS"
                            ]
                        ],
                        [
                            /crkey\/([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Chromecast"
                            ]
                        ],
                        [
                            /(cros)\s[\w]+\s([\w\.]+\w)/i
                        ],
                        [
                            [
                                c,
                                "Chromium OS"
                            ],
                            f
                        ],
                        [
                            /(nintendo|playstation)\s([wids345portablevuch]+)/i,
                            /(xbox);\s+xbox\s([^\);]+)/i,
                            /(mint)[\/\s\(\)]?(\w*)/i,
                            /(mageia|vectorlinux)[;\s]/i,
                            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,
                            /(hurd|linux)\s?([\w\.]*)/i,
                            /(gnu)\s?([\w\.]*)/i,
                            /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku)\s(\w+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(sunos)\s?([\w\.\d]*)/i
                        ],
                        [
                            [
                                c,
                                "Solaris"
                            ],
                            f
                        ],
                        [
                            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
                            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
                            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                            /(unix)\s?([\w\.]*)/i
                        ],
                        [
                            c,
                            f
                        ]
                    ]
                };
                var UAParser = function(i, s) {
                    if (typeof i === "object") {
                        s = i;
                        i = o;
                    }
                    if (!(this instanceof UAParser)) {
                        return new UAParser(i, s).getResult();
                    }
                    var r = i || (typeof e !== "undefined" && e.navigator && e.navigator.userAgent ? e.navigator.userAgent : a);
                    var n = s ? E.extend(T, s) : T;
                    this.getBrowser = function() {
                        var i = {
                            name: o,
                            version: o
                        };
                        A.rgx.call(i, r, n.browser);
                        i.major = E.major(i.version);
                        return i;
                    };
                    this.getCPU = function() {
                        var i = {
                            architecture: o
                        };
                        A.rgx.call(i, r, n.cpu);
                        return i;
                    };
                    this.getDevice = function() {
                        var i = {
                            vendor: o,
                            model: o,
                            type: o
                        };
                        A.rgx.call(i, r, n.device);
                        return i;
                    };
                    this.getEngine = function() {
                        var i = {
                            name: o,
                            version: o
                        };
                        A.rgx.call(i, r, n.engine);
                        return i;
                    };
                    this.getOS = function() {
                        var i = {
                            name: o,
                            version: o
                        };
                        A.rgx.call(i, r, n.os);
                        return i;
                    };
                    this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        };
                    };
                    this.getUA = function() {
                        return r;
                    };
                    this.setUA = function(i) {
                        r = typeof i === d && i.length > S ? E.trim(i, S) : i;
                        return this;
                    };
                    this.setUA(r);
                    return this;
                };
                UAParser.VERSION = r;
                UAParser.BROWSER = {
                    NAME: c,
                    MAJOR: b,
                    VERSION: f
                };
                UAParser.CPU = {
                    ARCHITECTURE: h
                };
                UAParser.DEVICE = {
                    MODEL: u,
                    VENDOR: p,
                    TYPE: m,
                    CONSOLE: g,
                    MOBILE: v,
                    SMARTTV: k,
                    TABLET: x,
                    WEARABLE: _,
                    EMBEDDED: y
                };
                UAParser.ENGINE = {
                    NAME: c,
                    VERSION: f
                };
                UAParser.OS = {
                    NAME: c,
                    VERSION: f
                };
                if (typeof s !== l) {
                    if ("object" !== l && i.exports) {
                        s = i.exports = UAParser;
                    }
                    s.UAParser = UAParser;
                } else {
                    if (true) {
                        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                            return UAParser;
                        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {}
                }
                var z = typeof e !== "undefined" && (e.jQuery || e.Zepto);
                if (z && !z.ua) {
                    var O = new UAParser;
                    z.ua = O.getResult();
                    z.ua.get = function() {
                        return O.getUA();
                    };
                    z.ua.set = function(i) {
                        O.setUA(i);
                        var s = O.getResult();
                        for(var e in s){
                            z.ua[e] = s[e];
                        }
                    };
                }
            })( false ? 0 : this);
        }
    };
    var s = {};
    function __nccwpck_require__(e) {
        var o = s[e];
        if (o !== undefined) {
            return o.exports;
        }
        var r = s[e] = {
            exports: {}
        };
        var a = true;
        try {
            i[e].call(r.exports, r, r.exports, __nccwpck_require__);
            a = false;
        } finally{
            if (a) delete s[e];
        }
        return r.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = __nccwpck_require__(412);
    module.exports = e;
})();


/***/ }),

/***/ 43992:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PageSignatureError: function() {
        return PageSignatureError;
    },
    RemovedPageError: function() {
        return RemovedPageError;
    },
    RemovedUAError: function() {
        return RemovedUAError;
    }
});
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map


/***/ }),

/***/ 24821:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "NextURL", ({
    enumerable: true,
    get: function() {
        return NextURL;
    }
}));
const _detectdomainlocale = __webpack_require__(55224);
const _formatnextpathnameinfo = __webpack_require__(68887);
const _gethostname = __webpack_require__(957);
const _getnextpathnameinfo = __webpack_require__(19579);
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|::1|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig, _this_Internal_options_nextConfig_i18n, _this_Internal_domainLocale, _this_Internal_options_nextConfig1, _this_Internal_options_nextConfig_i18n1;
        const info = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig, _this_Internal_options_nextConfig_i18n;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map


/***/ }),

/***/ 20736:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RequestCookies: function() {
        return _cookies.RequestCookies;
    },
    ResponseCookies: function() {
        return _cookies.ResponseCookies;
    }
});
const _cookies = __webpack_require__(33079); //# sourceMappingURL=cookies.js.map


/***/ }),

/***/ 41860:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "E", ({
    enumerable: true,
    get: function() {
        return ImageResponse;
    }
}));
class ImageResponse {
    static #_ = (()=>{
        this.displayName = "NextImageResponse";
    })();
    constructor(...args){
        // @ts-expect-error - process.turbopack is a custom property
        if (false) {} else {
            const readable = new ReadableStream({
                async start (controller) {
                    const OGImageResponse = // as the auto resolving is not working
                    (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 14021))).ImageResponse;
                    const imageResponse = new OGImageResponse(...args);
                    if (!imageResponse.body) {
                        return controller.close();
                    }
                    const reader = imageResponse.body.getReader();
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) {
                            return controller.close();
                        }
                        controller.enqueue(value);
                    }
                }
            });
            const options = args[1] || {};
            return new Response(readable, {
                headers: {
                    "content-type": "image/png",
                    "cache-control":  false ? 0 : "public, immutable, no-transform, max-age=31536000",
                    ...options.headers
                },
                status: options.status,
                statusText: options.statusText
            });
        }
    }
} //# sourceMappingURL=image-response.js.map


/***/ }),

/***/ 12724:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERNALS: function() {
        return INTERNALS;
    },
    NextRequest: function() {
        return NextRequest;
    }
});
const _nexturl = __webpack_require__(24821);
const _utils = __webpack_require__(44453);
const _error = __webpack_require__(43992);
const _cookies = __webpack_require__(20736);
const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        (0, _utils.validateURL)(url);
        super(url, init);
        const nextUrl = new _nexturl.NextURL(url, {
            headers: (0, _utils.toNodeOutgoingHttpHeaders)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _cookies.RequestCookies(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error.RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error.RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map


/***/ }),

/***/ 65999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "x", ({
    enumerable: true,
    get: function() {
        return NextResponse;
    }
}));
const _nexturl = __webpack_require__(24821);
const _utils = __webpack_require__(44453);
const _cookies = __webpack_require__(20736);
const INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[INTERNALS] = {
            cookies: new _cookies.ResponseCookies(this.headers),
            url: init.url ? new _nexturl.NextURL(init.url, {
                headers: (0, _utils.toNodeOutgoingHttpHeaders)(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        // @ts-expect-error This is not in lib/dom right now, and we can't augment it.
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", (0, _utils.validateURL)(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", (0, _utils.validateURL)(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map


/***/ }),

/***/ 9000:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isBot: function() {
        return isBot;
    },
    userAgentFromString: function() {
        return userAgentFromString;
    },
    userAgent: function() {
        return userAgent;
    }
});
const _uaparserjs = /*#__PURE__*/ _interop_require_default(__webpack_require__(69474));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...(0, _uaparserjs.default)(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers }) {
    return userAgentFromString(headers.get("user-agent") || undefined);
} //# sourceMappingURL=user-agent.js.map


/***/ }),

/***/ 44453:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fromNodeOutgoingHttpHeaders: function() {
        return fromNodeOutgoingHttpHeaders;
    },
    splitCookiesString: function() {
        return splitCookiesString;
    },
    toNodeOutgoingHttpHeaders: function() {
        return toNodeOutgoingHttpHeaders;
    },
    validateURL: function() {
        return validateURL;
    }
});
function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 957:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getHostname", ({
    enumerable: true,
    get: function() {
        return getHostname;
    }
}));
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":")[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map


/***/ }),

/***/ 55224:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "detectDomainLocale", ({
    enumerable: true,
    get: function() {
        return detectDomainLocale;
    }
}));
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":")[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map


/***/ }),

/***/ 75002:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "normalizeLocalePath", ({
    enumerable: true,
    get: function() {
        return normalizeLocalePath;
    }
}));
function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join("/") || "/";
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map


/***/ }),

/***/ 74570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addLocale", ({
    enumerable: true,
    get: function() {
        return addLocale;
    }
}));
const _addpathprefix = __webpack_require__(28253);
const _pathhasprefix = __webpack_require__(90182);
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/api")) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return (0, _addpathprefix.addPathPrefix)(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 28253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addPathPrefix", ({
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
}));
const _parsepath = __webpack_require__(85025);
function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map


/***/ }),

/***/ 37470:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addPathSuffix", ({
    enumerable: true,
    get: function() {
        return addPathSuffix;
    }
}));
const _parsepath = __webpack_require__(85025);
function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map


/***/ }),

/***/ 68887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "formatNextPathnameInfo", ({
    enumerable: true,
    get: function() {
        return formatNextPathnameInfo;
    }
}));
const _removetrailingslash = __webpack_require__(33602);
const _addpathprefix = __webpack_require__(28253);
const _addpathsuffix = __webpack_require__(37470);
const _addlocale = __webpack_require__(74570);
function formatNextPathnameInfo(info) {
    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
    }
    if (info.buildId) {
        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? (0, _addpathsuffix.addPathSuffix)(pathname, "/") : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map


/***/ }),

/***/ 19579:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getNextPathnameInfo", ({
    enumerable: true,
    get: function() {
        return getNextPathnameInfo;
    }
}));
const _normalizelocalepath = __webpack_require__(75002);
const _removepathprefix = __webpack_require__(59691);
const _pathhasprefix = __webpack_require__(90182);
function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname: pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
        info.basePath = basePath;
    }
    if (options.parseData === true && info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.pathname = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        info.buildId = buildId;
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (options.i18nProvider) {
        const result = options.i18nProvider.analyze(info.pathname);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
    } else if (i18n) {
        const pathLocale = (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
        info.locale = pathLocale.detectedLocale;
        var _pathLocale_pathname;
        info.pathname = (_pathLocale_pathname = pathLocale.pathname) != null ? _pathLocale_pathname : info.pathname;
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map


/***/ }),

/***/ 85025:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "parsePath", ({
    enumerable: true,
    get: function() {
        return parsePath;
    }
}));
function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map


/***/ }),

/***/ 90182:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "pathHasPrefix", ({
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
}));
const _parsepath = __webpack_require__(85025);
function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map


/***/ }),

/***/ 59691:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removePathPrefix", ({
    enumerable: true,
    get: function() {
        return removePathPrefix;
    }
}));
const _pathhasprefix = __webpack_require__(90182);
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map


/***/ }),

/***/ 33602:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removeTrailingSlash", ({
    enumerable: true,
    get: function() {
        return removeTrailingSlash;
    }
}));
function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
} //# sourceMappingURL=remove-trailing-slash.js.map


/***/ }),

/***/ 48923:
/***/ ((module, exports, __webpack_require__) => {


const serverExports = {
    NextRequest: (__webpack_require__(12724).NextRequest),
    NextResponse: (__webpack_require__(65999)/* .NextResponse */ .x),
    ImageResponse: (__webpack_require__(41860)/* .ImageResponse */ .E),
    userAgentFromString: (__webpack_require__(9000).userAgentFromString),
    userAgent: (__webpack_require__(9000).userAgent)
};
if (typeof URLPattern !== "undefined") {
    // eslint-disable-next-line no-undef
    serverExports.URLPattern = URLPattern;
}
// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = serverExports;
// make import { xxx } from 'next/server' work
exports.NextRequest = serverExports.NextRequest;
exports.NextResponse = serverExports.NextResponse;
exports.ImageResponse = serverExports.ImageResponse;
exports.userAgentFromString = serverExports.userAgentFromString;
exports.userAgent = serverExports.userAgent;
exports.URLPattern = serverExports.URLPattern;


/***/ })

};
;