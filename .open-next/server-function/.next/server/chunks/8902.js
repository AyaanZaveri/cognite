"use strict";
exports.id = 8902;
exports.ids = [8902];
exports.modules = {

/***/ 71946:
/***/ ((__unused_webpack_module, exports) => {


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}


/***/ }),

/***/ 44602:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.Y_ = void 0;
const zodToJsonSchema_1 = __webpack_require__(72851);
Object.defineProperty(exports, "Y_", ({
    enumerable: true,
    get: function() {
        return zodToJsonSchema_1.zodToJsonSchema;
    }
}));
__webpack_unused_export__ = zodToJsonSchema_1.zodToJsonSchema;


/***/ }),

/***/ 24346:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getDefaultOptions = exports.defaultOptions = void 0;
exports.defaultOptions = {
    name: undefined,
    $refStrategy: "root",
    basePath: [
        "#"
    ],
    effectStrategy: "input",
    pipeStrategy: "all",
    dateStrategy: "string",
    definitionPath: "definitions",
    target: "jsonSchema7",
    strictUnions: false,
    definitions: {},
    errorMessages: false,
    markdownDescription: false,
    emailStrategy: "format:email"
};
const getDefaultOptions = (options)=>typeof options === "string" ? Object.assign(Object.assign({}, exports.defaultOptions), {
        name: options
    }) : Object.assign(Object.assign({}, exports.defaultOptions), options);
exports.getDefaultOptions = getDefaultOptions;


/***/ }),

/***/ 31838:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getRefs = void 0;
const Options_1 = __webpack_require__(24346);
const getRefs = (options)=>{
    const _options = (0, Options_1.getDefaultOptions)(options);
    const currentPath = _options.name !== undefined ? [
        ..._options.basePath,
        _options.definitionPath,
        _options.name
    ] : _options.basePath;
    return Object.assign(Object.assign({}, _options), {
        currentPath: currentPath,
        propertyPath: undefined,
        seen: new Map(Object.entries(_options.definitions).map(([name, def])=>[
                def._def,
                {
                    def: def._def,
                    path: [
                        ..._options.basePath,
                        _options.definitionPath,
                        name
                    ],
                    // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
                    jsonSchema: undefined
                }
            ]))
    });
};
exports.getRefs = getRefs;


/***/ }),

/***/ 92186:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setResponseValueAndErrors = exports.addErrorMessage = void 0;
function addErrorMessage(res, key, errorMessage, refs) {
    if (!(refs === null || refs === void 0 ? void 0 : refs.errorMessages)) return;
    if (errorMessage) {
        res.errorMessage = Object.assign(Object.assign({}, res.errorMessage), {
            [key]: errorMessage
        });
    }
}
exports.addErrorMessage = addErrorMessage;
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
    res[key] = value;
    addErrorMessage(res, key, errorMessage, refs);
}
exports.setResponseValueAndErrors = setResponseValueAndErrors;


/***/ }),

/***/ 51848:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseDef = void 0;
const zod_1 = __webpack_require__(54559);
const any_1 = __webpack_require__(60705);
const array_1 = __webpack_require__(97049);
const bigint_1 = __webpack_require__(13977);
const boolean_1 = __webpack_require__(29765);
const branded_1 = __webpack_require__(75879);
const catch_1 = __webpack_require__(81059);
const date_1 = __webpack_require__(72156);
const default_1 = __webpack_require__(81832);
const effects_1 = __webpack_require__(56741);
const enum_1 = __webpack_require__(24740);
const intersection_1 = __webpack_require__(52818);
const literal_1 = __webpack_require__(18195);
const map_1 = __webpack_require__(35380);
const nativeEnum_1 = __webpack_require__(21969);
const never_1 = __webpack_require__(65959);
const null_1 = __webpack_require__(23574);
const nullable_1 = __webpack_require__(95192);
const number_1 = __webpack_require__(72108);
const object_1 = __webpack_require__(28847);
const optional_1 = __webpack_require__(17846);
const pipeline_1 = __webpack_require__(71507);
const promise_1 = __webpack_require__(28737);
const record_1 = __webpack_require__(5836);
const set_1 = __webpack_require__(48733);
const string_1 = __webpack_require__(71914);
const tuple_1 = __webpack_require__(61053);
const undefined_1 = __webpack_require__(81527);
const union_1 = __webpack_require__(80581);
const unknown_1 = __webpack_require__(64240);
function parseDef(def, refs, forceResolution = false // Forces a new schema to be instantiated even though its def has been seen. Used for improving refs in definitions. See https://github.com/StefanTerdell/zod-to-json-schema/pull/61.
) {
    const seenItem = refs.seen.get(def);
    if (seenItem && !forceResolution) {
        const seenSchema = get$ref(seenItem, refs);
        if (seenSchema !== undefined) {
            return seenSchema;
        }
    }
    const newItem = {
        def,
        path: refs.currentPath,
        jsonSchema: undefined
    };
    refs.seen.set(def, newItem);
    const jsonSchema = selectParser(def, def.typeName, refs);
    if (jsonSchema) {
        addMeta(def, refs, jsonSchema);
    }
    newItem.jsonSchema = jsonSchema;
    return jsonSchema;
}
exports.parseDef = parseDef;
const get$ref = (item, refs)=>{
    switch(refs.$refStrategy){
        case "root":
            return {
                $ref: item.path.length === 0 ? "" : item.path.length === 1 ? `${item.path[0]}/` : item.path.join("/")
            };
        case "relative":
            return {
                $ref: getRelativePath(refs.currentPath, item.path)
            };
        case "none":
            {
                if (item.path.length < refs.currentPath.length && item.path.every((value, index)=>refs.currentPath[index] === value)) {
                    console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
                    return {};
                }
                return undefined;
            }
        case "seen":
            {
                if (item.path.length < refs.currentPath.length && item.path.every((value, index)=>refs.currentPath[index] === value)) {
                    console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
                    return {};
                } else {
                    return item.jsonSchema;
                }
            }
    }
};
const getRelativePath = (pathA, pathB)=>{
    let i = 0;
    for(; i < pathA.length && i < pathB.length; i++){
        if (pathA[i] !== pathB[i]) break;
    }
    return [
        (pathA.length - i).toString(),
        ...pathB.slice(i)
    ].join("/");
};
const selectParser = (def, typeName, refs)=>{
    switch(typeName){
        case zod_1.ZodFirstPartyTypeKind.ZodString:
            return (0, string_1.parseStringDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodNumber:
            return (0, number_1.parseNumberDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodObject:
            return (0, object_1.parseObjectDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodBigInt:
            return (0, bigint_1.parseBigintDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodBoolean:
            return (0, boolean_1.parseBooleanDef)();
        case zod_1.ZodFirstPartyTypeKind.ZodDate:
            return (0, date_1.parseDateDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodUndefined:
            return (0, undefined_1.parseUndefinedDef)();
        case zod_1.ZodFirstPartyTypeKind.ZodNull:
            return (0, null_1.parseNullDef)(refs);
        case zod_1.ZodFirstPartyTypeKind.ZodArray:
            return (0, array_1.parseArrayDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodUnion:
        case zod_1.ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
            return (0, union_1.parseUnionDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodIntersection:
            return (0, intersection_1.parseIntersectionDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodTuple:
            return (0, tuple_1.parseTupleDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodRecord:
            return (0, record_1.parseRecordDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodLiteral:
            return (0, literal_1.parseLiteralDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodEnum:
            return (0, enum_1.parseEnumDef)(def);
        case zod_1.ZodFirstPartyTypeKind.ZodNativeEnum:
            return (0, nativeEnum_1.parseNativeEnumDef)(def);
        case zod_1.ZodFirstPartyTypeKind.ZodNullable:
            return (0, nullable_1.parseNullableDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodOptional:
            return (0, optional_1.parseOptionalDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodMap:
            return (0, map_1.parseMapDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodSet:
            return (0, set_1.parseSetDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodLazy:
            return parseDef(def.getter()._def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodPromise:
            return (0, promise_1.parsePromiseDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodNaN:
        case zod_1.ZodFirstPartyTypeKind.ZodNever:
            return (0, never_1.parseNeverDef)();
        case zod_1.ZodFirstPartyTypeKind.ZodEffects:
            return (0, effects_1.parseEffectsDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodAny:
            return (0, any_1.parseAnyDef)();
        case zod_1.ZodFirstPartyTypeKind.ZodUnknown:
            return (0, unknown_1.parseUnknownDef)();
        case zod_1.ZodFirstPartyTypeKind.ZodDefault:
            return (0, default_1.parseDefaultDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodBranded:
            return (0, branded_1.parseBrandedDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodCatch:
            return (0, catch_1.parseCatchDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodPipeline:
            return (0, pipeline_1.parsePipelineDef)(def, refs);
        case zod_1.ZodFirstPartyTypeKind.ZodFunction:
        case zod_1.ZodFirstPartyTypeKind.ZodVoid:
        case zod_1.ZodFirstPartyTypeKind.ZodSymbol:
            return undefined;
        default:
            return ((_)=>undefined)(typeName);
    }
};
const addMeta = (def, refs, jsonSchema)=>{
    if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
            jsonSchema.markdownDescription = def.description;
        }
    }
    return jsonSchema;
};


/***/ }),

/***/ 60705:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseAnyDef = void 0;
function parseAnyDef() {
    return {};
}
exports.parseAnyDef = parseAnyDef;


/***/ }),

/***/ 97049:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseArrayDef = void 0;
const zod_1 = __webpack_require__(54559);
const errorMessages_1 = __webpack_require__(92186);
const parseDef_1 = __webpack_require__(51848);
function parseArrayDef(def, refs) {
    var _a, _b;
    const res = {
        type: "array"
    };
    if (((_b = (_a = def.type) === null || _a === void 0 ? void 0 : _a._def) === null || _b === void 0 ? void 0 : _b.typeName) !== zod_1.ZodFirstPartyTypeKind.ZodAny) {
        res.items = (0, parseDef_1.parseDef)(def.type._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "items"
            ]
        }));
    }
    if (def.minLength) {
        (0, errorMessages_1.setResponseValueAndErrors)(res, "minItems", def.minLength.value, def.minLength.message, refs);
    }
    if (def.maxLength) {
        (0, errorMessages_1.setResponseValueAndErrors)(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
    }
    if (def.exactLength) {
        (0, errorMessages_1.setResponseValueAndErrors)(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
        (0, errorMessages_1.setResponseValueAndErrors)(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
    }
    return res;
}
exports.parseArrayDef = parseArrayDef;


/***/ }),

/***/ 13977:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseBigintDef = void 0;
const errorMessages_1 = __webpack_require__(92186);
function parseBigintDef(def, refs) {
    const res = {
        type: "integer",
        format: "int64"
    };
    if (!def.checks) return res;
    for (const check of def.checks){
        switch(check.kind){
            case "min":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                    } else {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                    } else {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                }
                break;
            case "multipleOf":
                (0, errorMessages_1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
                break;
        }
    }
    return res;
}
exports.parseBigintDef = parseBigintDef;


/***/ }),

/***/ 29765:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseBooleanDef = void 0;
function parseBooleanDef() {
    return {
        type: "boolean"
    };
}
exports.parseBooleanDef = parseBooleanDef;


/***/ }),

/***/ 75879:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseBrandedDef = void 0;
const parseDef_1 = __webpack_require__(51848);
function parseBrandedDef(_def, refs) {
    return (0, parseDef_1.parseDef)(_def.type._def, refs);
}
exports.parseBrandedDef = parseBrandedDef;


/***/ }),

/***/ 81059:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseCatchDef = void 0;
const parseDef_1 = __webpack_require__(51848);
const parseCatchDef = (def, refs)=>{
    return (0, parseDef_1.parseDef)(def.innerType._def, refs);
};
exports.parseCatchDef = parseCatchDef;


/***/ }),

/***/ 72156:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseDateDef = void 0;
const errorMessages_1 = __webpack_require__(92186);
function parseDateDef(def, refs) {
    if (refs.dateStrategy == "integer") {
        return integerDateParser(def, refs);
    } else {
        return {
            type: "string",
            format: "date-time"
        };
    }
}
exports.parseDateDef = parseDateDef;
const integerDateParser = (def, refs)=>{
    const res = {
        type: "integer",
        format: "unix-time"
    };
    for (const check of def.checks){
        switch(check.kind){
            case "min":
                if (refs.target === "jsonSchema7") {
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                }
                break;
        }
    }
    return res;
};


/***/ }),

/***/ 81832:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseDefaultDef = void 0;
const parseDef_1 = __webpack_require__(51848);
function parseDefaultDef(_def, refs) {
    return Object.assign(Object.assign({}, (0, parseDef_1.parseDef)(_def.innerType._def, refs)), {
        default: _def.defaultValue()
    });
}
exports.parseDefaultDef = parseDefaultDef;


/***/ }),

/***/ 56741:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseEffectsDef = void 0;
const parseDef_1 = __webpack_require__(51848);
function parseEffectsDef(_def, refs) {
    return refs.effectStrategy === "input" ? (0, parseDef_1.parseDef)(_def.schema._def, refs) : {};
}
exports.parseEffectsDef = parseEffectsDef;


/***/ }),

/***/ 24740:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseEnumDef = void 0;
function parseEnumDef(def) {
    return {
        type: "string",
        enum: def.values
    };
}
exports.parseEnumDef = parseEnumDef;


/***/ }),

/***/ 52818:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __rest = (void 0) && (void 0).__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseIntersectionDef = void 0;
const parseDef_1 = __webpack_require__(51848);
const isJsonSchema7AllOfType = (type)=>{
    if ("type" in type && type.type === "string") return false;
    return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
    const allOf = [
        (0, parseDef_1.parseDef)(def.left._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "allOf",
                "0"
            ]
        })),
        (0, parseDef_1.parseDef)(def.right._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "allOf",
                "1"
            ]
        }))
    ].filter((x)=>!!x);
    let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? {
        unevaluatedProperties: false
    } : undefined;
    const mergedAllOf = [];
    // If either of the schemas is an allOf, merge them into a single allOf
    allOf.forEach((schema)=>{
        if (isJsonSchema7AllOfType(schema)) {
            mergedAllOf.push(...schema.allOf);
            if (schema.unevaluatedProperties === undefined) {
                // If one of the schemas has no unevaluatedProperties set,
                // the merged schema should also have no unevaluatedProperties set
                unevaluatedProperties = undefined;
            }
        } else {
            let nestedSchema = schema;
            if ("additionalProperties" in schema && schema.additionalProperties === false) {
                const { additionalProperties } = schema, rest = __rest(schema, [
                    "additionalProperties"
                ]);
                nestedSchema = rest;
            } else {
                // As soon as one of the schemas has additionalProperties set not to false, we allow unevaluatedProperties
                unevaluatedProperties = undefined;
            }
            mergedAllOf.push(nestedSchema);
        }
    });
    return mergedAllOf.length ? Object.assign({
        allOf: mergedAllOf
    }, unevaluatedProperties) : undefined;
}
exports.parseIntersectionDef = parseIntersectionDef;


/***/ }),

/***/ 18195:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseLiteralDef = void 0;
function parseLiteralDef(def, refs) {
    const parsedType = typeof def.value;
    if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
        return {
            type: Array.isArray(def.value) ? "array" : "object"
        };
    }
    if (refs.target === "openApi3") {
        return {
            type: parsedType === "bigint" ? "integer" : parsedType,
            enum: [
                def.value
            ]
        };
    }
    return {
        type: parsedType === "bigint" ? "integer" : parsedType,
        const: def.value
    };
}
exports.parseLiteralDef = parseLiteralDef;


/***/ }),

/***/ 35380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseMapDef = void 0;
const parseDef_1 = __webpack_require__(51848);
function parseMapDef(def, refs) {
    const keys = (0, parseDef_1.parseDef)(def.keyType._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "items",
            "items",
            "0"
        ]
    })) || {};
    const values = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "items",
            "items",
            "1"
        ]
    })) || {};
    return {
        type: "array",
        maxItems: 125,
        items: {
            type: "array",
            items: [
                keys,
                values
            ],
            minItems: 2,
            maxItems: 2
        }
    };
}
exports.parseMapDef = parseMapDef;


/***/ }),

/***/ 21969:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseNativeEnumDef = void 0;
function parseNativeEnumDef(def) {
    const object = def.values;
    const actualKeys = Object.keys(def.values).filter((key)=>{
        return typeof object[object[key]] !== "number";
    });
    const actualValues = actualKeys.map((key)=>object[key]);
    const parsedTypes = Array.from(new Set(actualValues.map((values)=>typeof values)));
    return {
        type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : [
            "string",
            "number"
        ],
        enum: actualValues
    };
}
exports.parseNativeEnumDef = parseNativeEnumDef;


/***/ }),

/***/ 65959:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseNeverDef = void 0;
function parseNeverDef() {
    return {
        not: {}
    };
}
exports.parseNeverDef = parseNeverDef;


/***/ }),

/***/ 23574:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseNullDef = void 0;
function parseNullDef(refs) {
    return refs.target === "openApi3" ? {
        enum: [
            "null"
        ],
        nullable: true
    } : {
        type: "null"
    };
}
exports.parseNullDef = parseNullDef;


/***/ }),

/***/ 95192:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseNullableDef = void 0;
const parseDef_1 = __webpack_require__(51848);
const union_1 = __webpack_require__(80581);
function parseNullableDef(def, refs) {
    if ([
        "ZodString",
        "ZodNumber",
        "ZodBigInt",
        "ZodBoolean",
        "ZodNull"
    ].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
        if (refs.target === "openApi3") {
            return {
                type: union_1.primitiveMappings[def.innerType._def.typeName],
                nullable: true
            };
        }
        return {
            type: [
                union_1.primitiveMappings[def.innerType._def.typeName],
                "null"
            ]
        };
    }
    if (refs.target === "openApi3") {
        const base = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath
            ]
        }));
        return base && Object.assign(Object.assign({}, base), {
            nullable: true
        });
    }
    const base = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "anyOf",
            "0"
        ]
    }));
    return base && {
        anyOf: [
            base,
            {
                type: "null"
            }
        ]
    };
}
exports.parseNullableDef = parseNullableDef;


/***/ }),

/***/ 72108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseNumberDef = void 0;
const errorMessages_1 = __webpack_require__(92186);
function parseNumberDef(def, refs) {
    const res = {
        type: "number"
    };
    if (!def.checks) return res;
    for (const check of def.checks){
        switch(check.kind){
            case "int":
                res.type = "integer";
                (0, errorMessages_1.addErrorMessage)(res, "type", check.message, refs);
                break;
            case "min":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                    } else {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
                }
                break;
            case "max":
                if (refs.target === "jsonSchema7") {
                    if (check.inclusive) {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                    } else {
                        (0, errorMessages_1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
                }
                break;
            case "multipleOf":
                (0, errorMessages_1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
                break;
        }
    }
    return res;
}
exports.parseNumberDef = parseNumberDef;


/***/ }),

/***/ 28847:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseObjectDef = exports.parseObjectDefX = void 0;
const parseDef_1 = __webpack_require__(51848);
function parseObjectDefX(def, refs) {
    var _a, _b;
    Object.keys(def.shape()).reduce((schema, key)=>{
        let prop = def.shape()[key];
        const isOptional = prop.isOptional();
        if (!isOptional) {
            prop = Object.assign({}, prop._def.innerSchema);
        }
        const propSchema = (0, parseDef_1.parseDef)(prop._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "properties",
                key
            ],
            propertyPath: [
                ...refs.currentPath,
                "properties",
                key
            ]
        }));
        if (propSchema !== undefined) {
            schema.properties[key] = propSchema;
            if (!isOptional) {
                if (!schema.required) {
                    schema.required = [];
                }
                schema.required.push(key);
            }
        }
        return schema;
    }, {
        type: "object",
        properties: {},
        additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : (_a = (0, parseDef_1.parseDef)(def.catchall._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "additionalProperties"
            ]
        }))) !== null && _a !== void 0 ? _a : true
    });
    const result = Object.assign(Object.assign({
        type: "object"
    }, Object.entries(def.shape()).reduce((acc, [propName, propDef])=>{
        if (propDef === undefined || propDef._def === undefined) return acc;
        const parsedDef = (0, parseDef_1.parseDef)(propDef._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "properties",
                propName
            ],
            propertyPath: [
                ...refs.currentPath,
                "properties",
                propName
            ]
        }));
        if (parsedDef === undefined) return acc;
        return {
            properties: Object.assign(Object.assign({}, acc.properties), {
                [propName]: parsedDef
            }),
            required: propDef.isOptional() ? acc.required : [
                ...acc.required,
                propName
            ]
        };
    }, {
        properties: {},
        required: []
    })), {
        additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : (_b = (0, parseDef_1.parseDef)(def.catchall._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "additionalProperties"
            ]
        }))) !== null && _b !== void 0 ? _b : true
    });
    if (!result.required.length) delete result.required;
    return result;
}
exports.parseObjectDefX = parseObjectDefX;
function parseObjectDef(def, refs) {
    var _a;
    const result = Object.assign(Object.assign({
        type: "object"
    }, Object.entries(def.shape()).reduce((acc, [propName, propDef])=>{
        if (propDef === undefined || propDef._def === undefined) return acc;
        const parsedDef = (0, parseDef_1.parseDef)(propDef._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "properties",
                propName
            ],
            propertyPath: [
                ...refs.currentPath,
                "properties",
                propName
            ]
        }));
        if (parsedDef === undefined) return acc;
        return {
            properties: Object.assign(Object.assign({}, acc.properties), {
                [propName]: parsedDef
            }),
            required: propDef.isOptional() ? acc.required : [
                ...acc.required,
                propName
            ]
        };
    }, {
        properties: {},
        required: []
    })), {
        additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : (_a = (0, parseDef_1.parseDef)(def.catchall._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "additionalProperties"
            ]
        }))) !== null && _a !== void 0 ? _a : true
    });
    if (!result.required.length) delete result.required;
    return result;
}
exports.parseObjectDef = parseObjectDef;


/***/ }),

/***/ 17846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseOptionalDef = void 0;
const parseDef_1 = __webpack_require__(51848);
const parseOptionalDef = (def, refs)=>{
    var _a;
    if (refs.currentPath.toString() === ((_a = refs.propertyPath) === null || _a === void 0 ? void 0 : _a.toString())) {
        return (0, parseDef_1.parseDef)(def.innerType._def, refs);
    }
    const innerSchema = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "anyOf",
            "1"
        ]
    }));
    return innerSchema ? {
        anyOf: [
            {
                not: {}
            },
            innerSchema
        ]
    } : {};
};
exports.parseOptionalDef = parseOptionalDef;


/***/ }),

/***/ 71507:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parsePipelineDef = void 0;
const parseDef_1 = __webpack_require__(51848);
const parsePipelineDef = (def, refs)=>{
    if (refs.pipeStrategy === "input") {
        return (0, parseDef_1.parseDef)(def.in._def, refs);
    }
    const a = (0, parseDef_1.parseDef)(def.in._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "allOf",
            "0"
        ]
    }));
    const b = (0, parseDef_1.parseDef)(def.out._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "allOf",
            a ? "1" : "0"
        ]
    }));
    return {
        allOf: [
            a,
            b
        ].filter((x)=>x !== undefined)
    };
};
exports.parsePipelineDef = parsePipelineDef;


/***/ }),

/***/ 28737:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parsePromiseDef = void 0;
const parseDef_1 = __webpack_require__(51848);
function parsePromiseDef(def, refs) {
    return (0, parseDef_1.parseDef)(def.type._def, refs);
}
exports.parsePromiseDef = parsePromiseDef;


/***/ }),

/***/ 5836:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseRecordDef = void 0;
const zod_1 = __webpack_require__(54559);
const parseDef_1 = __webpack_require__(51848);
const string_1 = __webpack_require__(71914);
function parseRecordDef(def, refs) {
    var _a, _b, _c, _d, _e;
    if (refs.target === "openApi3" && ((_a = def.keyType) === null || _a === void 0 ? void 0 : _a._def.typeName) === zod_1.ZodFirstPartyTypeKind.ZodEnum) {
        return {
            type: "object",
            required: def.keyType._def.values,
            properties: def.keyType._def.values.reduce((acc, key)=>{
                var _a;
                return Object.assign(Object.assign({}, acc), {
                    [key]: (_a = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), {
                        currentPath: [
                            ...refs.currentPath,
                            "properties",
                            key
                        ]
                    }))) !== null && _a !== void 0 ? _a : {}
                });
            }, {}),
            additionalProperties: false
        };
    }
    const schema = {
        type: "object",
        additionalProperties: (_b = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "additionalProperties"
            ]
        }))) !== null && _b !== void 0 ? _b : {}
    };
    if (refs.target === "openApi3") {
        return schema;
    }
    if (((_c = def.keyType) === null || _c === void 0 ? void 0 : _c._def.typeName) === zod_1.ZodFirstPartyTypeKind.ZodString && ((_d = def.keyType._def.checks) === null || _d === void 0 ? void 0 : _d.length)) {
        const keyType = Object.entries((0, string_1.parseStringDef)(def.keyType._def, refs)).reduce((acc, [key, value])=>key === "type" ? acc : Object.assign(Object.assign({}, acc), {
                [key]: value
            }), {});
        return Object.assign(Object.assign({}, schema), {
            propertyNames: keyType
        });
    } else if (((_e = def.keyType) === null || _e === void 0 ? void 0 : _e._def.typeName) === zod_1.ZodFirstPartyTypeKind.ZodEnum) {
        return Object.assign(Object.assign({}, schema), {
            propertyNames: {
                enum: def.keyType._def.values
            }
        });
    }
    return schema;
}
exports.parseRecordDef = parseRecordDef;


/***/ }),

/***/ 48733:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseSetDef = void 0;
const errorMessages_1 = __webpack_require__(92186);
const parseDef_1 = __webpack_require__(51848);
function parseSetDef(def, refs) {
    const items = (0, parseDef_1.parseDef)(def.valueType._def, Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.currentPath,
            "items"
        ]
    }));
    const schema = {
        type: "array",
        uniqueItems: true,
        items
    };
    if (def.minSize) {
        (0, errorMessages_1.setResponseValueAndErrors)(schema, "minItems", def.minSize.value, def.minSize.message, refs);
    }
    if (def.maxSize) {
        (0, errorMessages_1.setResponseValueAndErrors)(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
    }
    return schema;
}
exports.parseSetDef = parseSetDef;


/***/ }),

/***/ 71914:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseStringDef = exports.emojiPattern = exports.ulidPattern = exports.cuid2Pattern = exports.cuidPattern = exports.emailPattern = void 0;
const errorMessages_1 = __webpack_require__(92186);
exports.emailPattern = '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\])|(\\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\\.[A-Za-z]{2,})+))$';
exports.cuidPattern = "^c[^\\s-]{8,}$";
exports.cuid2Pattern = "^[a-z][a-z0-9]*$";
exports.ulidPattern = "/[0-9A-HJKMNP-TV-Z]{26}/";
exports.emojiPattern = "/^(p{Extended_Pictographic}|p{Emoji_Component})+$/u";
function parseStringDef(def, refs) {
    const res = {
        type: "string"
    };
    if (def.checks) {
        for (const check of def.checks){
            switch(check.kind){
                case "min":
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
                    break;
                case "max":
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
                    break;
                case "email":
                    switch(refs.emailStrategy){
                        case "format:email":
                            addFormat(res, "email", check.message, refs);
                            break;
                        case "format:idn-email":
                            addFormat(res, "idn-email", check.message, refs);
                            break;
                        case "pattern:zod":
                            addPattern(res, exports.emailPattern, check.message, refs);
                            break;
                    }
                    break;
                case "url":
                    addFormat(res, "uri", check.message, refs);
                    break;
                case "uuid":
                    addFormat(res, "uuid", check.message, refs);
                    break;
                case "regex":
                    addPattern(res, check.regex.source, check.message, refs);
                    break;
                case "cuid":
                    addPattern(res, exports.cuidPattern, check.message, refs);
                    break;
                case "cuid2":
                    addPattern(res, exports.cuid2Pattern, check.message, refs);
                    break;
                case "startsWith":
                    addPattern(res, "^" + escapeNonAlphaNumeric(check.value), check.message, refs);
                    break;
                case "endsWith":
                    addPattern(res, escapeNonAlphaNumeric(check.value) + "$", check.message, refs);
                    break;
                case "datetime":
                    addFormat(res, "date-time", check.message, refs);
                    break;
                case "length":
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
                    (0, errorMessages_1.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
                    break;
                case "includes":
                    {
                        addPattern(res, escapeNonAlphaNumeric(check.value), check.message, refs);
                        break;
                    }
                case "ip":
                    {
                        if (check.version !== "v6") {
                            addFormat(res, "ipv4", check.message, refs);
                        }
                        if (check.version !== "v4") {
                            addFormat(res, "ipv6", check.message, refs);
                        }
                        break;
                    }
                case "emoji":
                    addPattern(res, exports.emojiPattern, check.message, refs);
                    break;
                case "ulid":
                    {
                        addPattern(res, exports.ulidPattern, check.message, refs);
                        break;
                    }
                case "toLowerCase":
                case "toUpperCase":
                case "trim":
                    break;
                default:
                    ((_)=>{})(check);
            }
        }
    }
    return res;
}
exports.parseStringDef = parseStringDef;
const escapeNonAlphaNumeric = (value)=>Array.from(value).map((c)=>/[a-zA-Z0-9]/.test(c) ? c : `\\${c}`).join("");
const addFormat = (schema, value, message, refs)=>{
    var _a;
    if (schema.format || ((_a = schema.anyOf) === null || _a === void 0 ? void 0 : _a.some((x)=>x.format))) {
        if (!schema.anyOf) {
            schema.anyOf = [];
        }
        if (schema.format) {
            schema.anyOf.push(Object.assign({
                format: schema.format
            }, schema.errorMessage && refs.errorMessages && {
                errorMessage: {
                    format: schema.errorMessage.format
                }
            }));
            delete schema.format;
            if (schema.errorMessage) {
                delete schema.errorMessage.format;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.anyOf.push(Object.assign({
            format: value
        }, message && refs.errorMessages && {
            errorMessage: {
                format: message
            }
        }));
    } else {
        (0, errorMessages_1.setResponseValueAndErrors)(schema, "format", value, message, refs);
    }
};
const addPattern = (schema, value, message, refs)=>{
    var _a;
    if (schema.pattern || ((_a = schema.allOf) === null || _a === void 0 ? void 0 : _a.some((x)=>x.pattern))) {
        if (!schema.allOf) {
            schema.allOf = [];
        }
        if (schema.pattern) {
            schema.allOf.push(Object.assign({
                pattern: schema.pattern
            }, schema.errorMessage && refs.errorMessages && {
                errorMessage: {
                    pattern: schema.errorMessage.pattern
                }
            }));
            delete schema.pattern;
            if (schema.errorMessage) {
                delete schema.errorMessage.pattern;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.allOf.push(Object.assign({
            pattern: value
        }, message && refs.errorMessages && {
            errorMessage: {
                pattern: message
            }
        }));
    } else {
        (0, errorMessages_1.setResponseValueAndErrors)(schema, "pattern", value, message, refs);
    }
};


/***/ }),

/***/ 61053:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseTupleDef = void 0;
const parseDef_1 = __webpack_require__(51848);
function parseTupleDef(def, refs) {
    if (def.rest) {
        return {
            type: "array",
            minItems: def.items.length,
            items: def.items.map((x, i)=>(0, parseDef_1.parseDef)(x._def, Object.assign(Object.assign({}, refs), {
                    currentPath: [
                        ...refs.currentPath,
                        "items",
                        `${i}`
                    ]
                }))).reduce((acc, x)=>x === undefined ? acc : [
                    ...acc,
                    x
                ], []),
            additionalItems: (0, parseDef_1.parseDef)(def.rest._def, Object.assign(Object.assign({}, refs), {
                currentPath: [
                    ...refs.currentPath,
                    "additionalItems"
                ]
            }))
        };
    } else {
        return {
            type: "array",
            minItems: def.items.length,
            maxItems: def.items.length,
            items: def.items.map((x, i)=>(0, parseDef_1.parseDef)(x._def, Object.assign(Object.assign({}, refs), {
                    currentPath: [
                        ...refs.currentPath,
                        "items",
                        `${i}`
                    ]
                }))).reduce((acc, x)=>x === undefined ? acc : [
                    ...acc,
                    x
                ], [])
        };
    }
}
exports.parseTupleDef = parseTupleDef;


/***/ }),

/***/ 81527:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseUndefinedDef = void 0;
function parseUndefinedDef() {
    return {
        not: {}
    };
}
exports.parseUndefinedDef = parseUndefinedDef;


/***/ }),

/***/ 80581:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseUnionDef = exports.primitiveMappings = void 0;
const parseDef_1 = __webpack_require__(51848);
exports.primitiveMappings = {
    ZodString: "string",
    ZodNumber: "number",
    ZodBigInt: "integer",
    ZodBoolean: "boolean",
    ZodNull: "null"
};
function parseUnionDef(def, refs) {
    if (refs.target === "openApi3") return asAnyOf(def, refs);
    const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
    // This blocks tries to look ahead a bit to produce nicer looking schemas with type array instead of anyOf.
    if (options.every((x)=>x._def.typeName in exports.primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
        // all types in union are primitive and lack checks, so might as well squash into {type: [...]}
        const types = options.reduce((types, x)=>{
            const type = exports.primitiveMappings[x._def.typeName]; //Can be safely casted due to row 43
            return type && !types.includes(type) ? [
                ...types,
                type
            ] : types;
        }, []);
        return {
            type: types.length > 1 ? types : types[0]
        };
    } else if (options.every((x)=>x._def.typeName === "ZodLiteral" && !x.description)) {
        // all options literals
        const types = options.reduce((acc, x)=>{
            const type = typeof x._def.value;
            switch(type){
                case "string":
                case "number":
                case "boolean":
                    return [
                        ...acc,
                        type
                    ];
                case "bigint":
                    return [
                        ...acc,
                        "integer"
                    ];
                case "object":
                    if (x._def.value === null) return [
                        ...acc,
                        "null"
                    ];
                case "symbol":
                case "undefined":
                case "function":
                default:
                    return acc;
            }
        }, []);
        if (types.length === options.length) {
            // all the literals are primitive, as far as null can be considered primitive
            const uniqueTypes = types.filter((x, i, a)=>a.indexOf(x) === i);
            return {
                type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
                enum: options.reduce((acc, x)=>{
                    return acc.includes(x._def.value) ? acc : [
                        ...acc,
                        x._def.value
                    ];
                }, [])
            };
        }
    } else if (options.every((x)=>x._def.typeName === "ZodEnum")) {
        return {
            type: "string",
            enum: options.reduce((acc, x)=>[
                    ...acc,
                    ...x._def.values.filter((x)=>!acc.includes(x))
                ], [])
        };
    }
    return asAnyOf(def, refs);
}
exports.parseUnionDef = parseUnionDef;
const asAnyOf = (def, refs)=>{
    const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i)=>(0, parseDef_1.parseDef)(x._def, Object.assign(Object.assign({}, refs), {
            currentPath: [
                ...refs.currentPath,
                "anyOf",
                `${i}`
            ]
        }))).filter((x)=>!!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
    return anyOf.length ? {
        anyOf
    } : undefined;
};


/***/ }),

/***/ 64240:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseUnknownDef = void 0;
function parseUnknownDef() {
    return {};
}
exports.parseUnknownDef = parseUnknownDef;


/***/ }),

/***/ 72851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.zodToJsonSchema = void 0;
const parseDef_1 = __webpack_require__(51848);
const Refs_1 = __webpack_require__(31838);
const zodToJsonSchema = (schema, options)=>{
    var _a;
    const refs = (0, Refs_1.getRefs)(options);
    const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name, schema])=>{
        var _a;
        return Object.assign(Object.assign({}, acc), {
            [name]: (_a = (0, parseDef_1.parseDef)(schema._def, Object.assign(Object.assign({}, refs), {
                currentPath: [
                    ...refs.basePath,
                    refs.definitionPath,
                    name
                ]
            }), true)) !== null && _a !== void 0 ? _a : {}
        });
    }, {}) : undefined;
    const name = typeof options === "string" ? options : options === null || options === void 0 ? void 0 : options.name;
    const main = (_a = (0, parseDef_1.parseDef)(schema._def, name === undefined ? refs : Object.assign(Object.assign({}, refs), {
        currentPath: [
            ...refs.basePath,
            refs.definitionPath,
            name
        ]
    }), false)) !== null && _a !== void 0 ? _a : {};
    const combined = name === undefined ? definitions ? Object.assign(Object.assign({}, main), {
        [refs.definitionPath]: definitions
    }) : main : {
        $ref: [
            ...refs.$refStrategy === "relative" ? [] : refs.basePath,
            refs.definitionPath,
            name
        ].join("/"),
        [refs.definitionPath]: Object.assign(Object.assign({}, definitions), {
            [name]: main
        })
    };
    if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
    } else if (refs.target === "jsonSchema2019-09") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
    }
    return combined;
};
exports.zodToJsonSchema = zodToJsonSchema;


/***/ }),

/***/ 10927:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ZodError = exports.quotelessJson = exports.ZodIssueCode = void 0;
const util_1 = __webpack_require__(74843);
exports.ZodIssueCode = util_1.util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
]);
const quotelessJson = (obj)=>{
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
exports.quotelessJson = quotelessJson;
class ZodError extends Error {
    constructor(issues){
        super();
        this.issues = [];
        this.addIssue = (sub)=>{
            this.issues = [
                ...this.issues,
                sub
            ];
        };
        this.addIssues = (subs = [])=>{
            this.issues = [
                ...this.issues,
                ...subs
            ];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    get errors() {
        return this.issues;
    }
    format(_mapper) {
        const mapper = _mapper || function(issue) {
            return issue.message;
        };
        const fieldErrors = {
            _errors: []
        };
        const processError = (error)=>{
            for (const issue of error.issues){
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                } else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                } else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                } else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                } else {
                    let curr = fieldErrors;
                    let i = 0;
                    while(i < issue.path.length){
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || {
                                _errors: []
                            };
                        } else {
                            curr[el] = curr[el] || {
                                _errors: []
                            };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util_1.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue)=>issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues){
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            } else {
                formErrors.push(mapper(sub));
            }
        }
        return {
            formErrors,
            fieldErrors
        };
    }
    get formErrors() {
        return this.flatten();
    }
}
exports.ZodError = ZodError;
ZodError.create = (issues)=>{
    const error = new ZodError(issues);
    return error;
};


/***/ }),

/***/ 27301:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __importDefault = (void 0) && (void 0).__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getErrorMap = exports.setErrorMap = exports.defaultErrorMap = void 0;
const en_1 = __importDefault(__webpack_require__(12110));
exports.defaultErrorMap = en_1.default;
let overrideErrorMap = en_1.default;
function setErrorMap(map) {
    overrideErrorMap = map;
}
exports.setErrorMap = setErrorMap;
function getErrorMap() {
    return overrideErrorMap;
}
exports.getErrorMap = getErrorMap;


/***/ }),

/***/ 86440:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__exportStar(__webpack_require__(27301), exports);
__exportStar(__webpack_require__(1729), exports);
__exportStar(__webpack_require__(32955), exports);
__exportStar(__webpack_require__(74843), exports);
__exportStar(__webpack_require__(40089), exports);
__exportStar(__webpack_require__(10927), exports);


/***/ }),

/***/ 33660:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.errorUtil = void 0;
var errorUtil;
(function(errorUtil) {
    errorUtil.errToObj = (message)=>typeof message === "string" ? {
            message
        } : message || {};
    errorUtil.toString = (message)=>typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil = exports.errorUtil || (exports.errorUtil = {}));


/***/ }),

/***/ 1729:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __importDefault = (void 0) && (void 0).__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.addIssueToContext = exports.EMPTY_PATH = exports.makeIssue = void 0;
const errors_1 = __webpack_require__(27301);
const en_1 = __importDefault(__webpack_require__(12110));
const makeIssue = (params)=>{
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [
        ...path,
        ...issueData.path || []
    ];
    const fullIssue = {
        ...issueData,
        path: fullPath
    };
    let errorMessage = "";
    const maps = errorMaps.filter((m)=>!!m).slice().reverse();
    for (const map of maps){
        errorMessage = map(fullIssue, {
            data,
            defaultError: errorMessage
        }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
    };
};
exports.makeIssue = makeIssue;
exports.EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const issue = (0, exports.makeIssue)({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            (0, errors_1.getErrorMap)(),
            en_1.default
        ].filter((x)=>!!x)
    });
    ctx.common.issues.push(issue);
}
exports.addIssueToContext = addIssueToContext;
class ParseStatus {
    constructor(){
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid") this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted") this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results){
            if (s.status === "aborted") return exports.INVALID;
            if (s.status === "dirty") status.dirty();
            arrayValue.push(s.value);
        }
        return {
            status: status.value,
            value: arrayValue
        };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs){
            syncPairs.push({
                key: await pair.key,
                value: await pair.value
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs){
            const { key, value } = pair;
            if (key.status === "aborted") return exports.INVALID;
            if (value.status === "aborted") return exports.INVALID;
            if (key.status === "dirty") status.dirty();
            if (value.status === "dirty") status.dirty();
            if (typeof value.value !== "undefined" || pair.alwaysSet) {
                finalObject[key.value] = value.value;
            }
        }
        return {
            status: status.value,
            value: finalObject
        };
    }
}
exports.ParseStatus = ParseStatus;
exports.INVALID = Object.freeze({
    status: "aborted"
});
const DIRTY = (value)=>({
        status: "dirty",
        value
    });
exports.DIRTY = DIRTY;
const OK = (value)=>({
        status: "valid",
        value
    });
exports.OK = OK;
const isAborted = (x)=>x.status === "aborted";
exports.isAborted = isAborted;
const isDirty = (x)=>x.status === "dirty";
exports.isDirty = isDirty;
const isValid = (x)=>x.status === "valid";
exports.isValid = isValid;
const isAsync = (x)=>typeof Promise !== "undefined" && x instanceof Promise;
exports.isAsync = isAsync;


/***/ }),

/***/ 32955:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));


/***/ }),

/***/ 74843:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getParsedType = exports.ZodParsedType = exports.objectUtil = exports.util = void 0;
var util;
(function(util) {
    util.assertEqual = (val)=>val;
    function assertIs(_arg) {}
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items)=>{
        const obj = {};
        for (const item of items){
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj)=>{
        const validKeys = util.objectKeys(obj).filter((k)=>typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys){
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj)=>{
        return util.objectKeys(obj).map(function(e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" ? (obj)=>Object.keys(obj) : (object)=>{
        const keys = [];
        for(const key in object){
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    util.find = (arr, checker)=>{
        for (const item of arr){
            if (checker(item)) return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function" ? (val)=>Number.isInteger(val) : (val)=>typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array.map((val)=>typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value)=>{
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util = exports.util || (exports.util = {}));
var objectUtil;
(function(objectUtil) {
    objectUtil.mergeShapes = (first, second)=>{
        return {
            ...first,
            ...second
        };
    };
})(objectUtil = exports.objectUtil || (exports.objectUtil = {}));
exports.ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
]);
const getParsedType = (data)=>{
    const t = typeof data;
    switch(t){
        case "undefined":
            return exports.ZodParsedType.undefined;
        case "string":
            return exports.ZodParsedType.string;
        case "number":
            return isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
        case "boolean":
            return exports.ZodParsedType.boolean;
        case "function":
            return exports.ZodParsedType.function;
        case "bigint":
            return exports.ZodParsedType.bigint;
        case "symbol":
            return exports.ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return exports.ZodParsedType.array;
            }
            if (data === null) {
                return exports.ZodParsedType.null;
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return exports.ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return exports.ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return exports.ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return exports.ZodParsedType.date;
            }
            return exports.ZodParsedType.object;
        default:
            return exports.ZodParsedType.unknown;
    }
};
exports.getParsedType = getParsedType;


/***/ }),

/***/ 54559:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = (void 0) && (void 0).__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = (void 0) && (void 0).__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.z = void 0;
const z = __importStar(__webpack_require__(86440));
exports.z = z;
__exportStar(__webpack_require__(86440), exports);
exports["default"] = z;


/***/ }),

/***/ 12110:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const util_1 = __webpack_require__(74843);
const ZodError_1 = __webpack_require__(10927);
const errorMap = (issue, _ctx)=>{
    let message;
    switch(issue.code){
        case ZodError_1.ZodIssueCode.invalid_type:
            if (issue.received === util_1.ZodParsedType.undefined) {
                message = "Required";
            } else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodError_1.ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_1.util.jsonStringifyReplacer)}`;
            break;
        case ZodError_1.ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util_1.util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodError_1.ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodError_1.ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util_1.util.joinValues(issue.options)}`;
            break;
        case ZodError_1.ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util_1.util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodError_1.ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodError_1.ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodError_1.ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodError_1.ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                } else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                } else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                } else {
                    util_1.util.assertNever(issue.validation);
                }
            } else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            } else {
                message = "Invalid";
            }
            break;
        case ZodError_1.ZodIssueCode.too_small:
            if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
            else message = "Invalid input";
            break;
        case ZodError_1.ZodIssueCode.too_big:
            if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else message = "Invalid input";
            break;
        case ZodError_1.ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodError_1.ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodError_1.ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodError_1.ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util_1.util.assertNever(issue);
    }
    return {
        message
    };
};
exports["default"] = errorMap;


/***/ }),

/***/ 40089:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.coerce = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.custom = exports.ZodPipeline = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodCatch = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
exports.NEVER = exports["void"] = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.symbol = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.pipeline = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports["null"] = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports["instanceof"] = exports["function"] = exports["enum"] = exports.effect = void 0;
const errors_1 = __webpack_require__(27301);
const errorUtil_1 = __webpack_require__(33660);
const parseUtil_1 = __webpack_require__(1729);
const util_1 = __webpack_require__(74843);
const ZodError_1 = __webpack_require__(10927);
class ParseInputLazyPath {
    constructor(parent, value, path, key){
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (this._key instanceof Array) {
                this._cachedPath.push(...this._path, ...this._key);
            } else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result)=>{
    if ((0, parseUtil_1.isValid)(result)) {
        return {
            success: true,
            data: result.value
        };
    } else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error () {
                if (this._error) return this._error;
                const error = new ZodError_1.ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            }
        };
    }
};
function processCreateParams(params) {
    if (!params) return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap) return {
        errorMap: errorMap,
        description
    };
    const customMap = (iss, ctx)=>{
        if (iss.code !== "invalid_type") return {
            message: ctx.defaultError
        };
        if (typeof ctx.data === "undefined") {
            return {
                message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError
            };
        }
        return {
            message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError
        };
    };
    return {
        errorMap: customMap,
        description
    };
}
class ZodType {
    constructor(def){
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
    }
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return (0, util_1.getParsedType)(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
        };
    }
    _processInputParams(input) {
        return {
            status: new parseUtil_1.ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: (0, util_1.getParsedType)(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent
            }
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if ((0, parseUtil_1.isAsync)(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success) return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        var _a;
        const ctx = {
            common: {
                issues: [],
                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_1.getParsedType)(data)
        };
        const result = this._parseSync({
            data,
            path: ctx.path,
            parent: ctx
        });
        return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success) return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                async: true
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_1.getParsedType)(data)
        };
        const maybeAsyncResult = this._parse({
            data,
            path: ctx.path,
            parent: ctx
        });
        const result = await ((0, parseUtil_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val)=>{
            if (typeof message === "string" || typeof message === "undefined") {
                return {
                    message
                };
            } else if (typeof message === "function") {
                return message(val);
            } else {
                return message;
            }
        };
        return this._refinement((val, ctx)=>{
            const result = check(val);
            const setError = ()=>ctx.addIssue({
                    code: ZodError_1.ZodIssueCode.custom,
                    ...getIssueProperties(val)
                });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data)=>{
                    if (!data) {
                        setError();
                        return false;
                    } else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            } else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx)=>{
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
                return false;
            } else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: {
                type: "refinement",
                refinement
            }
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this, this._def);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([
            this,
            option
        ], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: {
                type: "transform",
                transform
            }
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : ()=>def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def)
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : ()=>def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
exports.ZodType = ZodType;
exports.Schema = ZodType;
exports.ZodSchema = ZodType;
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[a-z][a-z0-9]*$/;
const ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/;
const uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
const ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
const ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const datetimeRegex = (args)=>{
    if (args.precision) {
        if (args.offset) {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
    } else if (args.precision === 0) {
        if (args.offset) {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
    } else {
        if (args.offset) {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
            return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
    }
};
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    constructor(){
        super(...arguments);
        this._regex = (regex, validation, message)=>this.refinement((data)=>regex.test(data), {
                validation,
                code: ZodError_1.ZodIssueCode.invalid_string,
                ...errorUtil_1.errorUtil.errToObj(message)
            });
        this.nonempty = (message)=>this.min(1, errorUtil_1.errorUtil.errToObj(message));
        this.trim = ()=>new ZodString({
                ...this._def,
                checks: [
                    ...this._def.checks,
                    {
                        kind: "trim"
                    }
                ]
            });
        this.toLowerCase = ()=>new ZodString({
                ...this._def,
                checks: [
                    ...this._def.checks,
                    {
                        kind: "toLowerCase"
                    }
                ]
            });
        this.toUpperCase = ()=>new ZodString({
                ...this._def,
                checks: [
                    ...this._def.checks,
                    {
                        kind: "toUpperCase"
                    }
                ]
            });
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.string,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks){
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        (0, parseUtil_1.addIssueToContext)(ctx, {
                            code: ZodError_1.ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message
                        });
                    } else if (tooSmall) {
                        (0, parseUtil_1.addIssueToContext)(ctx, {
                            code: ZodError_1.ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message
                        });
                    }
                    status.dirty();
                }
            } else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "email",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "emoji") {
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "emoji",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "uuid",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "cuid",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "cuid2",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "ulid",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "url") {
                try {
                    new URL(input.data);
                } catch (_a) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "url",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "regex",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "trim") {
                input.data = input.data.trim();
            } else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        validation: {
                            includes: check.value,
                            position: check.position
                        },
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            } else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            } else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        validation: {
                            startsWith: check.value
                        },
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        validation: {
                            endsWith: check.value
                        },
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        validation: "ip",
                        code: ZodError_1.ZodIssueCode.invalid_string,
                        message: check.message
                    });
                    status.dirty();
                }
            } else {
                util_1.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: input.data
        };
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [
                ...this._def.checks,
                check
            ]
        });
    }
    email(message) {
        return this._addCheck({
            kind: "email",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    url(message) {
        return this._addCheck({
            kind: "url",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    emoji(message) {
        return this._addCheck({
            kind: "emoji",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    uuid(message) {
        return this._addCheck({
            kind: "uuid",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    cuid(message) {
        return this._addCheck({
            kind: "cuid",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    cuid2(message) {
        return this._addCheck({
            kind: "cuid2",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    ulid(message) {
        return this._addCheck({
            kind: "ulid",
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    ip(options) {
        return this._addCheck({
            kind: "ip",
            ...errorUtil_1.errorUtil.errToObj(options)
        });
    }
    datetime(options) {
        var _a;
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                message: options
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
            ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options === null || options === void 0 ? void 0 : options.position,
            ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil_1.errorUtil.errToObj(message)
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch)=>ch.kind === "datetime");
    }
    get isEmail() {
        return !!this._def.checks.find((ch)=>ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch)=>ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch)=>ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch)=>ch.kind === "uuid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch)=>ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch)=>ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch)=>ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch)=>ch.kind === "ip");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks){
            if (ch.kind === "min") {
                if (min === null || ch.value > min) min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks){
            if (ch.kind === "max") {
                if (max === null || ch.value < max) max = ch.value;
            }
        }
        return max;
    }
}
exports.ZodString = ZodString;
ZodString.create = (params)=>{
    var _a;
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
    });
};
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
    constructor(){
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.number,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        let ctx = undefined;
        const status = new parseUtil_1.ParseStatus();
        for (const check of this._def.checks){
            if (check.kind === "int") {
                if (!util_1.util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.not_finite,
                        message: check.message
                    });
                    status.dirty();
                }
            } else {
                util_1.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: input.data
        };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil_1.errorUtil.toString(message)
                }
            ]
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                check
            ]
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil_1.errorUtil.toString(message)
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks){
            if (ch.kind === "min") {
                if (min === null || ch.value > min) min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks){
            if (ch.kind === "max") {
                if (max === null || ch.value < max) max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch)=>ch.kind === "int" || ch.kind === "multipleOf" && util_1.util.isInteger(ch.value));
    }
    get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks){
            if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
                return true;
            } else if (ch.kind === "min") {
                if (min === null || ch.value > min) min = ch.value;
            } else if (ch.kind === "max") {
                if (max === null || ch.value < max) max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
exports.ZodNumber = ZodNumber;
ZodNumber.create = (params)=>{
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
    });
};
class ZodBigInt extends ZodType {
    constructor(){
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.bigint) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.bigint,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        let ctx = undefined;
        const status = new parseUtil_1.ParseStatus();
        for (const check of this._def.checks){
            if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message
                    });
                    status.dirty();
                }
            } else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message
                    });
                    status.dirty();
                }
            } else {
                util_1.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: input.data
        };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil_1.errorUtil.toString(message)
                }
            ]
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                check
            ]
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks){
            if (ch.kind === "min") {
                if (min === null || ch.value > min) min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks){
            if (ch.kind === "max") {
                if (max === null || ch.value < max) max = ch.value;
            }
        }
        return max;
    }
}
exports.ZodBigInt = ZodBigInt;
ZodBigInt.create = (params)=>{
    var _a;
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.boolean,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodBoolean = ZodBoolean;
ZodBoolean.create = (params)=>{
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.date,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        if (isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_date
            });
            return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks){
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date"
                    });
                    status.dirty();
                }
            } else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date"
                    });
                    status.dirty();
                }
            } else {
                util_1.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime())
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [
                ...this._def.checks,
                check
            ]
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil_1.errorUtil.toString(message)
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks){
            if (ch.kind === "min") {
                if (min === null || ch.value > min) min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks){
            if (ch.kind === "max") {
                if (max === null || ch.value < max) max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
exports.ZodDate = ZodDate;
ZodDate.create = (params)=>{
    return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.symbol,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodSymbol = ZodSymbol;
ZodSymbol.create = (params)=>{
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.undefined,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodUndefined = ZodUndefined;
ZodUndefined.create = (params)=>{
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.null,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodNull = ZodNull;
ZodNull.create = (params)=>{
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
    });
};
class ZodAny extends ZodType {
    constructor(){
        super(...arguments);
        this._any = true;
    }
    _parse(input) {
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodAny = ZodAny;
ZodAny.create = (params)=>{
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
    });
};
class ZodUnknown extends ZodType {
    constructor(){
        super(...arguments);
        this._unknown = true;
    }
    _parse(input) {
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodUnknown = ZodUnknown;
ZodUnknown.create = (params)=>{
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.never,
            received: ctx.parsedType
        });
        return parseUtil_1.INVALID;
    }
}
exports.ZodNever = ZodNever;
ZodNever.create = (params)=>{
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.void,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
}
exports.ZodVoid = ZodVoid;
ZodVoid.create = (params)=>{
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.array,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: tooBig ? ZodError_1.ZodIssueCode.too_big : ZodError_1.ZodIssueCode.too_small,
                    minimum: tooSmall ? def.exactLength.value : undefined,
                    maximum: tooBig ? def.exactLength.value : undefined,
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([
                ...ctx.data
            ].map((item, i)=>{
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result)=>{
                return parseUtil_1.ParseStatus.mergeArray(status, result);
            });
        }
        const result = [
            ...ctx.data
        ].map((item, i)=>{
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return parseUtil_1.ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: {
                value: minLength,
                message: errorUtil_1.errorUtil.toString(message)
            }
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: {
                value: maxLength,
                message: errorUtil_1.errorUtil.toString(message)
            }
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: {
                value: len,
                message: errorUtil_1.errorUtil.toString(message)
            }
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
exports.ZodArray = ZodArray;
ZodArray.create = (schema, params)=>{
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for(const key in schema.shape){
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: ()=>newShape
        });
    } else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element)
        });
    } else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item)=>deepPartialify(item)));
    } else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor(){
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null) return this._cached;
        const shape = this._def.shape();
        const keys = util_1.util.objectKeys(shape);
        return this._cached = {
            shape,
            keys
        };
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.object,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
            for(const key in ctx.data){
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys){
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: {
                    status: "valid",
                    value: key
                },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys){
                    pairs.push({
                        key: {
                            status: "valid",
                            value: key
                        },
                        value: {
                            status: "valid",
                            value: ctx.data[key]
                        }
                    });
                }
            } else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    (0, parseUtil_1.addIssueToContext)(ctx, {
                        code: ZodError_1.ZodIssueCode.unrecognized_keys,
                        keys: extraKeys
                    });
                    status.dirty();
                }
            } else if (unknownKeys === "strip") {} else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        } else {
            const catchall = this._def.catchall;
            for (const key of extraKeys){
                const value = ctx.data[key];
                pairs.push({
                    key: {
                        status: "valid",
                        value: key
                    },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                    alwaysSet: key in ctx.data
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve().then(async ()=>{
                const syncPairs = [];
                for (const pair of pairs){
                    const key = await pair.key;
                    syncPairs.push({
                        key,
                        value: await pair.value,
                        alwaysSet: pair.alwaysSet
                    });
                }
                return syncPairs;
            }).then((syncPairs)=>{
                return parseUtil_1.ParseStatus.mergeObjectSync(status, syncPairs);
            });
        } else {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil_1.errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...message !== undefined ? {
                errorMap: (issue, ctx)=>{
                    var _a, _b, _c, _d;
                    const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                    if (issue.code === "unrecognized_keys") return {
                        message: (_d = errorUtil_1.errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                    };
                    return {
                        message: defaultError
                    };
                }
            } : {}
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip"
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough"
        });
    }
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: ()=>({
                    ...this._def.shape(),
                    ...augmentation
                })
        });
    }
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: ()=>({
                    ...this._def.shape(),
                    ...merging._def.shape()
                }),
            typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
    }
    setKey(key, schema) {
        return this.augment({
            [key]: schema
        });
    }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index
        });
    }
    pick(mask) {
        const shape = {};
        util_1.util.objectKeys(mask).forEach((key)=>{
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: ()=>shape
        });
    }
    omit(mask) {
        const shape = {};
        util_1.util.objectKeys(this.shape).forEach((key)=>{
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: ()=>shape
        });
    }
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        util_1.util.objectKeys(this.shape).forEach((key)=>{
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            } else {
                newShape[key] = fieldSchema.optional();
            }
        });
        return new ZodObject({
            ...this._def,
            shape: ()=>newShape
        });
    }
    required(mask) {
        const newShape = {};
        util_1.util.objectKeys(this.shape).forEach((key)=>{
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            } else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while(newField instanceof ZodOptional){
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        });
        return new ZodObject({
            ...this._def,
            shape: ()=>newShape
        });
    }
    keyof() {
        return createZodEnum(util_1.util.objectKeys(this.shape));
    }
}
exports.ZodObject = ZodObject;
ZodObject.create = (shape, params)=>{
    return new ZodObject({
        shape: ()=>shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
    });
};
ZodObject.strictCreate = (shape, params)=>{
    return new ZodObject({
        shape: ()=>shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
    });
};
ZodObject.lazycreate = (shape, params)=>{
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            for (const result of results){
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results){
                if (result.result.status === "dirty") {
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            const unionErrors = results.map((result)=>new ZodError_1.ZodError(result.ctx.common.issues));
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_union,
                unionErrors
            });
            return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option)=>{
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: []
                    },
                    parent: null
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx
                    }),
                    ctx: childCtx
                };
            })).then(handleResults);
        } else {
            let dirty = undefined;
            const issues = [];
            for (const option of options){
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: []
                    },
                    parent: null
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx
                });
                if (result.status === "valid") {
                    return result;
                } else if (result.status === "dirty" && !dirty) {
                    dirty = {
                        result,
                        ctx: childCtx
                    };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues)=>new ZodError_1.ZodError(issues));
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_union,
                unionErrors
            });
            return parseUtil_1.INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
exports.ZodUnion = ZodUnion;
ZodUnion.create = (types, params)=>{
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
    });
};
const getDiscriminator = (type)=>{
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    } else if (type instanceof ZodLiteral) {
        return [
            type.value
        ];
    } else if (type instanceof ZodEnum) {
        return type.options;
    } else if (type instanceof ZodNativeEnum) {
        return Object.keys(type.enum);
    } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    } else if (type instanceof ZodUndefined) {
        return [
            undefined
        ];
    } else if (type instanceof ZodNull) {
        return [
            null
        ];
    } else {
        return null;
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.object,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [
                    discriminator
                ]
            });
            return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
            });
        } else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    static create(discriminator, options, params) {
        const optionsMap = new Map();
        for (const type of options){
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues){
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params)
        });
    }
}
exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
function mergeValues(a, b) {
    const aType = (0, util_1.getParsedType)(a);
    const bType = (0, util_1.getParsedType)(b);
    if (a === b) {
        return {
            valid: true,
            data: a
        };
    } else if (aType === util_1.ZodParsedType.object && bType === util_1.ZodParsedType.object) {
        const bKeys = util_1.util.objectKeys(b);
        const sharedKeys = util_1.util.objectKeys(a).filter((key)=>bKeys.indexOf(key) !== -1);
        const newObj = {
            ...a,
            ...b
        };
        for (const key of sharedKeys){
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return {
                    valid: false
                };
            }
            newObj[key] = sharedValue.data;
        }
        return {
            valid: true,
            data: newObj
        };
    } else if (aType === util_1.ZodParsedType.array && bType === util_1.ZodParsedType.array) {
        if (a.length !== b.length) {
            return {
                valid: false
            };
        }
        const newArray = [];
        for(let index = 0; index < a.length; index++){
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return {
                    valid: false
                };
            }
            newArray.push(sharedValue.data);
        }
        return {
            valid: true,
            data: newArray
        };
    } else if (aType === util_1.ZodParsedType.date && bType === util_1.ZodParsedType.date && +a === +b) {
        return {
            valid: true,
            data: a
        };
    } else {
        return {
            valid: false
        };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight)=>{
            if ((0, parseUtil_1.isAborted)(parsedLeft) || (0, parseUtil_1.isAborted)(parsedRight)) {
                return parseUtil_1.INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.invalid_intersection_types
                });
                return parseUtil_1.INVALID;
            }
            if ((0, parseUtil_1.isDirty)(parsedLeft) || (0, parseUtil_1.isDirty)(parsedRight)) {
                status.dirty();
            }
            return {
                status: status.value,
                value: merged.data
            };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                })
            ]).then(([left, right])=>handleParsed(left, right));
        } else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
            }));
        }
    }
}
exports.ZodIntersection = ZodIntersection;
ZodIntersection.create = (left, right, params)=>{
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
    });
};
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.array,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array"
            });
            return parseUtil_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array"
            });
            status.dirty();
        }
        const items = [
            ...ctx.data
        ].map((item, itemIndex)=>{
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema) return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x)=>!!x);
        if (ctx.common.async) {
            return Promise.all(items).then((results)=>{
                return parseUtil_1.ParseStatus.mergeArray(status, results);
            });
        } else {
            return parseUtil_1.ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest
        });
    }
}
exports.ZodTuple = ZodTuple;
ZodTuple.create = (schemas, params)=>{
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.object,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for(const key in ctx.data){
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
            });
        }
        if (ctx.common.async) {
            return parseUtil_1.ParseStatus.mergeObjectAsync(status, pairs);
        } else {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third)
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second)
        });
    }
}
exports.ZodRecord = ZodRecord;
class ZodMap extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.map) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.map,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [
            ...ctx.data.entries()
        ].map(([key, value], index)=>{
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [
                    index,
                    "key"
                ])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [
                    index,
                    "value"
                ]))
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async ()=>{
                for (const pair of pairs){
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return parseUtil_1.INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return {
                    status: status.value,
                    value: finalMap
                };
            });
        } else {
            const finalMap = new Map();
            for (const pair of pairs){
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return parseUtil_1.INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return {
                status: status.value,
                value: finalMap
            };
        }
    }
}
exports.ZodMap = ZodMap;
ZodMap.create = (keyType, valueType, params)=>{
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.set) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.set,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                    code: ZodError_1.ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements){
                if (element.status === "aborted") return parseUtil_1.INVALID;
                if (element.status === "dirty") status.dirty();
                parsedSet.add(element.value);
            }
            return {
                status: status.value,
                value: parsedSet
            };
        }
        const elements = [
            ...ctx.data.values()
        ].map((item, i)=>valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements)=>finalizeSet(elements));
        } else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: {
                value: minSize,
                message: errorUtil_1.errorUtil.toString(message)
            }
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: {
                value: maxSize,
                message: errorUtil_1.errorUtil.toString(message)
            }
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
exports.ZodSet = ZodSet;
ZodSet.create = (valueType, params)=>{
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
    });
};
class ZodFunction extends ZodType {
    constructor(){
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.function) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.function,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        function makeArgsIssue(args, error) {
            return (0, parseUtil_1.makeIssue)({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    (0, errors_1.getErrorMap)(),
                    errors_1.defaultErrorMap
                ].filter((x)=>!!x),
                issueData: {
                    code: ZodError_1.ZodIssueCode.invalid_arguments,
                    argumentsError: error
                }
            });
        }
        function makeReturnsIssue(returns, error) {
            return (0, parseUtil_1.makeIssue)({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    (0, errors_1.getErrorMap)(),
                    errors_1.defaultErrorMap
                ].filter((x)=>!!x),
                issueData: {
                    code: ZodError_1.ZodIssueCode.invalid_return_type,
                    returnTypeError: error
                }
            });
        }
        const params = {
            errorMap: ctx.common.contextualErrorMap
        };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            return (0, parseUtil_1.OK)(async (...args)=>{
                const error = new ZodError_1.ZodError([]);
                const parsedArgs = await this._def.args.parseAsync(args, params).catch((e)=>{
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await fn(...parsedArgs);
                const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e)=>{
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        } else {
            return (0, parseUtil_1.OK)((...args)=>{
                const parsedArgs = this._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError_1.ZodError([
                        makeArgsIssue(args, parsedArgs.error)
                    ]);
                }
                const result = fn(...parsedArgs.data);
                const parsedReturns = this._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError_1.ZodError([
                        makeReturnsIssue(result, parsedReturns.error)
                    ]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params)
        });
    }
}
exports.ZodFunction = ZodFunction;
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
        });
    }
}
exports.ZodLazy = ZodLazy;
ZodLazy.create = (getter, params)=>{
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                received: ctx.data,
                code: ZodError_1.ZodIssueCode.invalid_literal,
                expected: this._def.value
            });
            return parseUtil_1.INVALID;
        }
        return {
            status: "valid",
            value: input.data
        };
    }
    get value() {
        return this._def.value;
    }
}
exports.ZodLiteral = ZodLiteral;
ZodLiteral.create = (value, params)=>{
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params)
    });
}
class ZodEnum extends ZodType {
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0, parseUtil_1.addIssueToContext)(ctx, {
                expected: util_1.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError_1.ZodIssueCode.invalid_type
            });
            return parseUtil_1.INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0, parseUtil_1.addIssueToContext)(ctx, {
                received: ctx.data,
                code: ZodError_1.ZodIssueCode.invalid_enum_value,
                options: expectedValues
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values){
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values){
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values){
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values) {
        return ZodEnum.create(values);
    }
    exclude(values) {
        return ZodEnum.create(this.options.filter((opt)=>!values.includes(opt)));
    }
}
exports.ZodEnum = ZodEnum;
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    _parse(input) {
        const nativeEnumValues = util_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_1.ZodParsedType.string && ctx.parsedType !== util_1.ZodParsedType.number) {
            const expectedValues = util_1.util.objectValues(nativeEnumValues);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                expected: util_1.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError_1.ZodIssueCode.invalid_type
            });
            return parseUtil_1.INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
            const expectedValues = util_1.util.objectValues(nativeEnumValues);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                received: ctx.data,
                code: ZodError_1.ZodIssueCode.invalid_enum_value,
                options: expectedValues
            });
            return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
exports.ZodNativeEnum = ZodNativeEnum;
ZodNativeEnum.create = (values, params)=>{
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.promise && ctx.common.async === false) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.promise,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        const promisified = ctx.parsedType === util_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0, parseUtil_1.OK)(promisified.then((data)=>{
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap
            });
        }));
    }
}
exports.ZodPromise = ZodPromise;
ZodPromise.create = (schema, params)=>{
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data);
            if (ctx.common.async) {
                return Promise.resolve(processed).then((processed)=>{
                    return this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx
                    });
                });
            } else {
                return this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx
                });
            }
        }
        const checkCtx = {
            addIssue: (arg)=>{
                (0, parseUtil_1.addIssueToContext)(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                } else {
                    status.dirty();
                }
            },
            get path () {
                return ctx.path;
            }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "refinement") {
            const executeRefinement = (acc)=>{
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                });
                if (inner.status === "aborted") return parseUtil_1.INVALID;
                if (inner.status === "dirty") status.dirty();
                executeRefinement(inner.value);
                return {
                    status: status.value,
                    value: inner.value
                };
            } else {
                return this._def.schema._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                }).then((inner)=>{
                    if (inner.status === "aborted") return parseUtil_1.INVALID;
                    if (inner.status === "dirty") status.dirty();
                    return executeRefinement(inner.value).then(()=>{
                        return {
                            status: status.value,
                            value: inner.value
                        };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                });
                if (!(0, parseUtil_1.isValid)(base)) return base;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return {
                    status: status.value,
                    value: result
                };
            } else {
                return this._def.schema._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                }).then((base)=>{
                    if (!(0, parseUtil_1.isValid)(base)) return base;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result)=>({
                            status: status.value,
                            value: result
                        }));
                });
            }
        }
        util_1.util.assertNever(effect);
    }
}
exports.ZodEffects = ZodEffects;
exports.ZodTransformer = ZodEffects;
ZodEffects.create = (schema, effect, params)=>{
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params)=>{
    return new ZodEffects({
        schema,
        effect: {
            type: "preprocess",
            transform: preprocess
        },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.undefined) {
            return (0, parseUtil_1.OK)(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodOptional = ZodOptional;
ZodOptional.create = (type, params)=>{
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.null) {
            return (0, parseUtil_1.OK)(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodNullable = ZodNullable;
ZodNullable.create = (type, params)=>{
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_1.ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
exports.ZodDefault = ZodDefault;
ZodDefault.create = (type, params)=>{
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : ()=>params.default,
        ...processCreateParams(params)
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: []
            }
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx
            }
        });
        if ((0, parseUtil_1.isAsync)(result)) {
            return result.then((result)=>{
                return {
                    status: "valid",
                    value: result.status === "valid" ? result.value : this._def.catchValue({
                        get error () {
                            return new ZodError_1.ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data
                    })
                };
            });
        } else {
            return {
                status: "valid",
                value: result.status === "valid" ? result.value : this._def.catchValue({
                    get error () {
                        return new ZodError_1.ZodError(newCtx.common.issues);
                    },
                    input: newCtx.data
                })
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
exports.ZodCatch = ZodCatch;
ZodCatch.create = (type, params)=>{
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : ()=>params.catch,
        ...processCreateParams(params)
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: util_1.ZodParsedType.nan,
                received: ctx.parsedType
            });
            return parseUtil_1.INVALID;
        }
        return {
            status: "valid",
            value: input.data
        };
    }
}
exports.ZodNaN = ZodNaN;
ZodNaN.create = (params)=>{
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
    });
};
exports.BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx
        });
    }
    unwrap() {
        return this._def.type;
    }
}
exports.ZodBranded = ZodBranded;
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async ()=>{
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx
                });
                if (inResult.status === "aborted") return parseUtil_1.INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return (0, parseUtil_1.DIRTY)(inResult.value);
                } else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx
                    });
                }
            };
            return handleAsync();
        } else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx
            });
            if (inResult.status === "aborted") return parseUtil_1.INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value
                };
            } else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
    }
}
exports.ZodPipeline = ZodPipeline;
const custom = (check, params = {}, fatal)=>{
    if (check) return ZodAny.create().superRefine((data, ctx)=>{
        var _a, _b;
        if (!check(data)) {
            const p = typeof params === "function" ? params(data) : typeof params === "string" ? {
                message: params
            } : params;
            const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
            const p2 = typeof p === "string" ? {
                message: p
            } : p;
            ctx.addIssue({
                code: "custom",
                ...p2,
                fatal: _fatal
            });
        }
    });
    return ZodAny.create();
};
exports.custom = custom;
exports.late = {
    object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
})(ZodFirstPartyTypeKind = exports.ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = {}));
class Class {
    constructor(..._){}
}
const instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
})=>(0, exports.custom)((data)=>data instanceof cls, params);
exports["instanceof"] = instanceOfType;
const stringType = ZodString.create;
exports.string = stringType;
const numberType = ZodNumber.create;
exports.number = numberType;
const nanType = ZodNaN.create;
exports.nan = nanType;
const bigIntType = ZodBigInt.create;
exports.bigint = bigIntType;
const booleanType = ZodBoolean.create;
exports.boolean = booleanType;
const dateType = ZodDate.create;
exports.date = dateType;
const symbolType = ZodSymbol.create;
exports.symbol = symbolType;
const undefinedType = ZodUndefined.create;
exports.undefined = undefinedType;
const nullType = ZodNull.create;
exports["null"] = nullType;
const anyType = ZodAny.create;
exports.any = anyType;
const unknownType = ZodUnknown.create;
exports.unknown = unknownType;
const neverType = ZodNever.create;
exports.never = neverType;
const voidType = ZodVoid.create;
exports["void"] = voidType;
const arrayType = ZodArray.create;
exports.array = arrayType;
const objectType = ZodObject.create;
exports.object = objectType;
const strictObjectType = ZodObject.strictCreate;
exports.strictObject = strictObjectType;
const unionType = ZodUnion.create;
exports.union = unionType;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
exports.discriminatedUnion = discriminatedUnionType;
const intersectionType = ZodIntersection.create;
exports.intersection = intersectionType;
const tupleType = ZodTuple.create;
exports.tuple = tupleType;
const recordType = ZodRecord.create;
exports.record = recordType;
const mapType = ZodMap.create;
exports.map = mapType;
const setType = ZodSet.create;
exports.set = setType;
const functionType = ZodFunction.create;
exports["function"] = functionType;
const lazyType = ZodLazy.create;
exports.lazy = lazyType;
const literalType = ZodLiteral.create;
exports.literal = literalType;
const enumType = ZodEnum.create;
exports["enum"] = enumType;
const nativeEnumType = ZodNativeEnum.create;
exports.nativeEnum = nativeEnumType;
const promiseType = ZodPromise.create;
exports.promise = promiseType;
const effectsType = ZodEffects.create;
exports.effect = effectsType;
exports.transformer = effectsType;
const optionalType = ZodOptional.create;
exports.optional = optionalType;
const nullableType = ZodNullable.create;
exports.nullable = nullableType;
const preprocessType = ZodEffects.createWithPreprocess;
exports.preprocess = preprocessType;
const pipelineType = ZodPipeline.create;
exports.pipeline = pipelineType;
const ostring = ()=>stringType().optional();
exports.ostring = ostring;
const onumber = ()=>numberType().optional();
exports.onumber = onumber;
const oboolean = ()=>booleanType().optional();
exports.oboolean = oboolean;
exports.coerce = {
    string: (arg)=>ZodString.create({
            ...arg,
            coerce: true
        }),
    number: (arg)=>ZodNumber.create({
            ...arg,
            coerce: true
        }),
    boolean: (arg)=>ZodBoolean.create({
            ...arg,
            coerce: true
        }),
    bigint: (arg)=>ZodBigInt.create({
            ...arg,
            coerce: true
        }),
    date: (arg)=>ZodDate.create({
            ...arg,
            coerce: true
        })
};
exports.NEVER = parseUtil_1.INVALID;


/***/ }),

/***/ 27442:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Gn: () => (/* binding */ LangChainStream),
  wn: () => (/* binding */ StreamingTextResponse)
});

// UNUSED EXPORTS: AIStream, AnthropicStream, CohereStream, HuggingFaceStream, OpenAIStream, ReplicateStream, createCallbacksTransformer, createChunkDecoder, createEventStreamTransformer, nanoid, readableFromAsyncIterable, streamToResponse, trimStartOfStreamHelper

;// CONCATENATED MODULE: ./node_modules/.pnpm/nanoid@3.3.6/node_modules/nanoid/non-secure/index.js
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let customAlphabet = (alphabet, defaultSize = 21)=>{
    return (size = defaultSize)=>{
        let id = "";
        let i = size;
        while(i--){
            id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
    };
};
let nanoid = (size = 21)=>{
    let id = "";
    let i = size;
    while(i--){
        id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/ai@2.1.33_react@18.2.0_solid-js@1.7.8_svelte@4.1.1_vue@3.3.4/node_modules/ai/dist/index.mjs
// streams/ai-stream.ts

function createEventStreamTransformer(customParser) {
    const textDecoder = new TextDecoder();
    let eventSourceParser;
    return new TransformStream({
        async start (controller) {
            eventSourceParser = createParser((event)=>{
                if ("data" in event && event.type === "event" && event.data === "[DONE]" || // Replicate doesn't send [DONE] but does send a 'done' event
                // @see https://replicate.com/docs/streaming
                event.event === "done") {
                    controller.terminate();
                    return;
                }
                if ("data" in event) {
                    const parsedMessage = customParser ? customParser(event.data) : event.data;
                    if (parsedMessage) controller.enqueue(parsedMessage);
                }
            });
        },
        transform (chunk) {
            eventSourceParser.feed(textDecoder.decode(chunk));
        }
    });
}
function createCallbacksTransformer(callbacks) {
    const textEncoder = new TextEncoder();
    let aggregatedResponse = "";
    const { onStart, onToken, onCompletion } = callbacks || {};
    return new TransformStream({
        async start () {
            if (onStart) await onStart();
        },
        async transform (message, controller) {
            controller.enqueue(textEncoder.encode(message));
            if (onToken) await onToken(message);
            if (onCompletion) aggregatedResponse += message;
        },
        async flush () {
            if (onCompletion) await onCompletion(aggregatedResponse);
        }
    });
}
function trimStartOfStreamHelper() {
    let isStreamStart = true;
    return (text)=>{
        if (isStreamStart) {
            text = text.trimStart();
            if (text) isStreamStart = false;
        }
        return text;
    };
}
function AIStream(response, customParser, callbacks) {
    if (!response.ok) {
        if (response.body) {
            const reader = response.body.getReader();
            return new ReadableStream({
                async start (controller) {
                    const { done, value } = await reader.read();
                    if (!done) {
                        const errorText = new TextDecoder().decode(value);
                        controller.error(new Error(`Response error: ${errorText}`));
                    }
                }
            });
        } else {
            return new ReadableStream({
                start (controller) {
                    controller.error(new Error("Response error: No response body"));
                }
            });
        }
    }
    const responseBodyStream = response.body || createEmptyReadableStream();
    return responseBodyStream.pipeThrough(createEventStreamTransformer(customParser)).pipeThrough(createCallbacksTransformer(callbacks));
}
function createEmptyReadableStream() {
    return new ReadableStream({
        start (controller) {
            controller.close();
        }
    });
}
function readableFromAsyncIterable(iterable) {
    let it = iterable[Symbol.asyncIterator]();
    return new ReadableStream({
        async pull (controller) {
            const { done, value } = await it.next();
            if (done) controller.close();
            else controller.enqueue(value);
        },
        async cancel (reason) {
            var _a;
            await ((_a = it.return) == null ? void 0 : _a.call(it, reason));
        }
    });
}
// streams/openai-stream.ts
function parseOpenAIStream() {
    const extract = chunkToText();
    return (data)=>{
        return extract(JSON.parse(data));
    };
}
async function* streamable(stream) {
    const extract = chunkToText();
    for await (const chunk of stream){
        const text = extract(chunk);
        if (text) yield text;
    }
}
function chunkToText() {
    const trimStartOfStream = trimStartOfStreamHelper();
    let isFunctionStreamingIn;
    return (json)=>{
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
        if ((_c = (_b = (_a = json.choices[0]) == null ? void 0 : _a.delta) == null ? void 0 : _b.function_call) == null ? void 0 : _c.name) {
            isFunctionStreamingIn = true;
            return `{"function_call": {"name": "${(_e = (_d = json.choices[0]) == null ? void 0 : _d.delta) == null ? void 0 : _e.function_call.name}", "arguments": "`;
        } else if ((_h = (_g = (_f = json.choices[0]) == null ? void 0 : _f.delta) == null ? void 0 : _g.function_call) == null ? void 0 : _h.arguments) {
            const argumentChunk = json.choices[0].delta.function_call.arguments;
            let escapedPartialJson = argumentChunk.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f");
            return `${escapedPartialJson}`;
        } else if (isFunctionStreamingIn && (((_i = json.choices[0]) == null ? void 0 : _i.finish_reason) === "function_call" || ((_j = json.choices[0]) == null ? void 0 : _j.finish_reason) === "stop")) {
            isFunctionStreamingIn = false;
            return '"}}';
        }
        const text = trimStartOfStream((_o = (_n = (_l = (_k = json.choices[0]) == null ? void 0 : _k.delta) == null ? void 0 : _l.content) != null ? _n : (_m = json.choices[0]) == null ? void 0 : _m.text) != null ? _o : "");
        return text;
    };
}
var __internal__OpenAIFnMessagesSymbol = Symbol("internal_openai_fn_messages");
function OpenAIStream(res, callbacks) {
    const cb = callbacks;
    let stream;
    if (Symbol.asyncIterator in res) {
        stream = readableFromAsyncIterable(streamable(res)).pipeThrough(createCallbacksTransformer(cb));
    } else {
        stream = AIStream(res, parseOpenAIStream(), cb);
    }
    if (cb && cb.experimental_onFunctionCall) {
        const functionCallTransformer = createFunctionCallTransformer(cb);
        return stream.pipeThrough(functionCallTransformer);
    } else {
        return stream;
    }
}
function createFunctionCallTransformer(callbacks) {
    const textEncoder = new TextEncoder();
    let isFirstChunk = true;
    let aggregatedResponse = "";
    let isFunctionStreamingIn = false;
    let functionCallMessages = callbacks[__internal__OpenAIFnMessagesSymbol] || [];
    return new TransformStream({
        async transform (chunk, controller) {
            const message = new TextDecoder().decode(chunk);
            const shouldHandleAsFunction = isFirstChunk && message.startsWith('{"function_call":');
            if (shouldHandleAsFunction) {
                isFunctionStreamingIn = true;
                aggregatedResponse += message;
                isFirstChunk = false;
                return;
            }
            if (!isFunctionStreamingIn) {
                controller.enqueue(chunk);
                return;
            } else {
                aggregatedResponse += message;
            }
        },
        async flush (controller) {
            const isEndOfFunction = !isFirstChunk && callbacks.experimental_onFunctionCall && isFunctionStreamingIn;
            if (isEndOfFunction && callbacks.experimental_onFunctionCall) {
                isFunctionStreamingIn = false;
                const payload = JSON.parse(aggregatedResponse);
                const argumentsPayload = JSON.parse(payload.function_call.arguments);
                let newFunctionCallMessages = [
                    ...functionCallMessages
                ];
                const functionResponse = await callbacks.experimental_onFunctionCall({
                    name: payload.function_call.name,
                    arguments: argumentsPayload
                }, (result)=>{
                    newFunctionCallMessages = [
                        ...functionCallMessages,
                        {
                            role: "assistant",
                            content: "",
                            function_call: payload.function_call
                        },
                        {
                            role: "function",
                            name: payload.function_call.name,
                            content: JSON.stringify(result)
                        }
                    ];
                    return newFunctionCallMessages;
                });
                if (!functionResponse) {
                    controller.enqueue(textEncoder.encode(aggregatedResponse));
                    return;
                } else if (typeof functionResponse === "string") {
                    controller.enqueue(textEncoder.encode(functionResponse));
                    return;
                }
                const filteredCallbacks = {
                    ...callbacks,
                    onStart: void 0,
                    onCompletion: void 0
                };
                const openAIStream = OpenAIStream(functionResponse, {
                    ...filteredCallbacks,
                    [__internal__OpenAIFnMessagesSymbol]: newFunctionCallMessages
                });
                const reader = openAIStream.getReader();
                while(true){
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    controller.enqueue(value);
                }
            }
        }
    });
}
// streams/streaming-text-response.ts
var StreamingTextResponse = class extends Response {
    constructor(res, init){
        super(res, {
            ...init,
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                ...init == null ? void 0 : init.headers
            }
        });
    }
};
function streamToResponse(res, response, init) {
    response.writeHead((init == null ? void 0 : init.status) || 200, {
        "Content-Type": "text/plain; charset=utf-8",
        ...init == null ? void 0 : init.headers
    });
    const reader = res.getReader();
    function read() {
        reader.read().then(({ done, value })=>{
            if (done) {
                response.end();
                return;
            }
            response.write(value);
            read();
        });
    }
    read();
}
// streams/huggingface-stream.ts
function createParser2(res) {
    const trimStartOfStream = trimStartOfStreamHelper();
    return new ReadableStream({
        async pull (controller) {
            var _a, _b;
            const { value, done } = await res.next();
            if (done) {
                controller.close();
                return;
            }
            const text = trimStartOfStream((_b = (_a = value.token) == null ? void 0 : _a.text) != null ? _b : "");
            if (!text) return;
            if (value.generated_text != null && value.generated_text.length > 0) {
                controller.close();
                return;
            }
            if (text === "</s>" || text === "<|endoftext|>" || text === "<|end|>") {
                controller.close();
            } else {
                controller.enqueue(text);
            }
        }
    });
}
function HuggingFaceStream(res, callbacks) {
    return createParser2(res).pipeThrough(createCallbacksTransformer(callbacks));
}
// streams/cohere-stream.ts
var utf8Decoder = new TextDecoder("utf-8");
async function processLines(lines, controller) {
    for (const line of lines){
        const { text, is_finished } = JSON.parse(line);
        if (is_finished === true) {
            controller.close();
        } else {
            controller.enqueue(text);
        }
    }
}
async function readAndProcessLines(reader, controller) {
    let segment = "";
    while(true){
        const { value: chunk, done } = await reader.read();
        if (done) {
            break;
        }
        segment += utf8Decoder.decode(chunk, {
            stream: true
        });
        const linesArray = segment.split(/\r\n|\n|\r/g);
        segment = linesArray.pop() || "";
        await processLines(linesArray, controller);
    }
    if (segment) {
        const linesArray = [
            segment
        ];
        await processLines(linesArray, controller);
    }
    controller.close();
}
function createParser3(res) {
    var _a;
    const reader = (_a = res.body) == null ? void 0 : _a.getReader();
    return new ReadableStream({
        async start (controller) {
            if (!reader) {
                controller.close();
                return;
            }
            await readAndProcessLines(reader, controller);
        }
    });
}
function CohereStream(reader, callbacks) {
    return createParser3(reader).pipeThrough(createCallbacksTransformer(callbacks));
}
// streams/anthropic-stream.ts
function parseAnthropicStream() {
    let previous = "";
    return (data)=>{
        const json = JSON.parse(data);
        const text = json.completion;
        const delta = text.slice(previous.length);
        previous = text;
        return delta;
    };
}
function AnthropicStream(res, cb) {
    return AIStream(res, parseAnthropicStream(), cb);
}
// streams/langchain-stream.ts
function LangChainStream(callbacks) {
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const runs = /* @__PURE__ */ new Set();
    const handleError = async (e, runId)=>{
        runs.delete(runId);
        await writer.ready;
        await writer.abort(e);
    };
    const handleStart = async (runId)=>{
        runs.add(runId);
    };
    const handleEnd = async (runId)=>{
        runs.delete(runId);
        if (runs.size === 0) {
            await writer.ready;
            await writer.close();
        }
    };
    return {
        stream: stream.readable.pipeThrough(createCallbacksTransformer(callbacks)),
        handlers: {
            handleLLMNewToken: async (token)=>{
                await writer.ready;
                await writer.write(token);
            },
            handleLLMStart: async (_llm, _prompts, runId)=>{
                handleStart(runId);
            },
            handleLLMEnd: async (_output, runId)=>{
                await handleEnd(runId);
            },
            handleLLMError: async (e, runId)=>{
                await handleError(e, runId);
            },
            handleChainStart: async (_chain, _inputs, runId)=>{
                handleStart(runId);
            },
            handleChainEnd: async (_outputs, runId)=>{
                await handleEnd(runId);
            },
            handleChainError: async (e, runId)=>{
                await handleError(e, runId);
            },
            handleToolStart: async (_tool, _input, runId)=>{
                handleStart(runId);
            },
            handleToolEnd: async (_output, runId)=>{
                await handleEnd(runId);
            },
            handleToolError: async (e, runId)=>{
                await handleError(e, runId);
            }
        }
    };
}
// streams/replicate-stream.ts
async function ReplicateStream(res, cb) {
    var _a;
    const url = (_a = res.urls) == null ? void 0 : _a.stream;
    if (!url) {
        if (res.error) throw new Error(res.error);
        else throw new Error("Missing stream URL in Replicate response");
    }
    const eventStream = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "text/event-stream"
        }
    });
    return AIStream(eventStream, void 0, cb);
}
// shared/utils.ts

var dist_nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7);
function createChunkDecoder() {
    const decoder = new TextDecoder();
    return function(chunk) {
        if (!chunk) return "";
        return decoder.decode(chunk, {
            stream: true
        });
    };
}



/***/ }),

/***/ 88891:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ye: () => (/* reexport */ manager/* CallbackManager */.Ye)
});

// UNUSED EXPORTS: BaseCallbackHandler, BaseTracer, CallbackManagerForChainRun, CallbackManagerForLLMRun, CallbackManagerForToolRun, ConsoleCallbackHandler, LangChainTracer, LangChainTracerV1, TraceGroup, awaitAllCallbacks, consumeCallback, getTracingCallbackHandler, getTracingV2CallbackHandler, traceAsGroup

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/base.js
var base = __webpack_require__(97197);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/handlers/tracer.js
var tracer = __webpack_require__(41561);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/handlers/console.js
var console = __webpack_require__(15944);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/handlers/tracer_langchain.js + 6 modules
var tracer_langchain = __webpack_require__(79040);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/handlers/tracer_langchain_v1.js
var tracer_langchain_v1 = __webpack_require__(45268);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/handlers/initialize.js
var initialize = __webpack_require__(16655);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/manager.js
var manager = __webpack_require__(71538);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/promises.js
var promises = __webpack_require__(76960);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/index.js









;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/callbacks.js



/***/ }),

/***/ 65116:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  kP: () => (/* reexport */ ConversationalRetrievalQAChain)
});

// UNUSED EXPORTS: APIChain, AnalyzeDocumentChain, BaseChain, ChatVectorDBQAChain, ConstitutionalChain, ConstitutionalPrinciple, ConversationChain, LLMChain, LLMRouterChain, MapReduceDocumentsChain, MultiPromptChain, MultiRetrievalQAChain, MultiRouteChain, OpenAIModerationChain, PRINCIPLES, RefineDocumentsChain, RetrievalQAChain, RouterChain, SequentialChain, SimpleSequentialChain, StuffDocumentsChain, TransformChain, VectorDBQAChain, createExtractionChain, createExtractionChainFromZod, createOpenAPIChain, createTaggingChain, createTaggingChainFromZod, loadQAChain, loadQAMapReduceChain, loadQARefineChain, loadQAStuffChain, loadSummarizationChain

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/base.js
var base = __webpack_require__(79144);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/llm_chain.js + 1 modules
var llm_chain = __webpack_require__(83434);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/api/api_chain.js + 1 modules
var api_chain = __webpack_require__(9771);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/prompt.js
var prompts_prompt = __webpack_require__(80037);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/schema/index.js
var schema = __webpack_require__(18585);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/stores/message/in_memory.js

class in_memory_ChatMessageHistory extends (/* unused pure expression or super */ null && (BaseListChatMessageHistory)) {
    constructor(messages){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "stores",
                "message",
                "in_memory"
            ]
        });
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.messages = messages ?? [];
    }
    async getMessages() {
        return this.messages;
    }
    async addMessage(message) {
        this.messages.push(message);
    }
    async clear() {
        this.messages = [];
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/memory/chat_memory.js


class chat_memory_BaseChatMemory extends (/* unused pure expression or super */ null && (BaseMemory)) {
    constructor(fields){
        super();
        Object.defineProperty(this, "chatHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chatHistory = fields?.chatHistory ?? new ChatMessageHistory();
        this.returnMessages = fields?.returnMessages ?? this.returnMessages;
        this.inputKey = fields?.inputKey ?? this.inputKey;
        this.outputKey = fields?.outputKey ?? this.outputKey;
    }
    async saveContext(inputValues, outputValues) {
        // this is purposefully done in sequence so they're saved in order
        await this.chatHistory.addUserMessage(getInputValue(inputValues, this.inputKey));
        await this.chatHistory.addAIChatMessage(getOutputValue(outputValues, this.outputKey));
    }
    async clear() {
        await this.chatHistory.clear();
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/memory/buffer_memory.js


class buffer_memory_BufferMemory extends (/* unused pure expression or super */ null && (BaseChatMemory)) {
    constructor(fields){
        super({
            chatHistory: fields?.chatHistory,
            returnMessages: fields?.returnMessages ?? false,
            inputKey: fields?.inputKey,
            outputKey: fields?.outputKey
        });
        Object.defineProperty(this, "humanPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Human"
        });
        Object.defineProperty(this, "aiPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AI"
        });
        Object.defineProperty(this, "memoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "history"
        });
        this.humanPrefix = fields?.humanPrefix ?? this.humanPrefix;
        this.aiPrefix = fields?.aiPrefix ?? this.aiPrefix;
        this.memoryKey = fields?.memoryKey ?? this.memoryKey;
    }
    get memoryKeys() {
        return [
            this.memoryKey
        ];
    }
    async loadMemoryVariables(_values) {
        const messages = await this.chatHistory.getMessages();
        if (this.returnMessages) {
            const result = {
                [this.memoryKey]: messages
            };
            return result;
        }
        const result = {
            [this.memoryKey]: getBufferString(messages, this.humanPrefix, this.aiPrefix)
        };
        return result;
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/conversation.js



const conversation_DEFAULT_TEMPLATE = (/* unused pure expression or super */ null && (`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation:
{history}
Human: {input}
AI:`));
class conversation_ConversationChain extends (/* unused pure expression or super */ null && (LLMChain)) {
    constructor({ prompt, outputKey, memory, ...rest }){
        super({
            prompt: prompt ?? new PromptTemplate({
                template: conversation_DEFAULT_TEMPLATE,
                inputVariables: [
                    "history",
                    "input"
                ]
            }),
            outputKey: outputKey ?? "response",
            memory: memory ?? new BufferMemory(),
            ...rest
        });
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/sequential_chain.js + 1 modules
var sequential_chain = __webpack_require__(88780);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/combine_docs_chain.js
var combine_docs_chain = __webpack_require__(25825);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/question_answering/load.js + 4 modules
var load = __webpack_require__(82072);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/chat_vector_db_chain.js




const question_generator_template = (/* unused pure expression or super */ null && (`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`));
const qa_template = (/* unused pure expression or super */ null && (`Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
Helpful Answer:`));
/** @deprecated use `ConversationalRetrievalQAChain` instead. */ class ChatVectorDBQAChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    get inputKeys() {
        return [
            this.inputKey,
            this.chatHistoryKey
        ];
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "question"
        });
        Object.defineProperty(this, "chatHistoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "chat_history"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "result"
        });
        Object.defineProperty(this, "vectorstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "questionGeneratorChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.vectorstore = fields.vectorstore;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.questionGeneratorChain = fields.questionGeneratorChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.k = fields.k ?? this.k;
        this.returnSourceDocuments = fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        if (!(this.chatHistoryKey in values)) {
            throw new Error(`chat history key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const chatHistory = values[this.chatHistoryKey];
        let newQuestion = question;
        if (chatHistory.length > 0) {
            const result = await this.questionGeneratorChain.call({
                question,
                chat_history: chatHistory
            }, runManager?.getChild("question_generator"));
            const keys = Object.keys(result);
            console.log("_call", values, keys);
            if (keys.length === 1) {
                newQuestion = result[keys[0]];
            } else {
                throw new Error("Return from llm chain has multiple values, only single values supported.");
            }
        }
        const docs = await this.vectorstore.similaritySearch(newQuestion, this.k, undefined, runManager?.getChild("vectorstore"));
        const inputs = {
            question: newQuestion,
            input_documents: docs,
            chat_history: chatHistory
        };
        const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild("combine_documents"));
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs
            };
        }
        return result;
    }
    _chainType() {
        return "chat-vector-db";
    }
    static async deserialize(data, values) {
        if (!("vectorstore" in values)) {
            throw new Error(`Need to pass in a vectorstore to deserialize VectorDBQAChain`);
        }
        const { vectorstore } = values;
        return new ChatVectorDBQAChain({
            combineDocumentsChain: await BaseChain.deserialize(data.combine_documents_chain),
            questionGeneratorChain: await LLMChain.deserialize(data.question_generator),
            k: data.k,
            vectorstore
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            combine_documents_chain: this.combineDocumentsChain.serialize(),
            question_generator: this.questionGeneratorChain.serialize(),
            k: this.k
        };
    }
    static fromLLM(llm, vectorstore, options = {}) {
        const { questionGeneratorTemplate, qaTemplate, verbose, ...rest } = options;
        const question_generator_prompt = PromptTemplate.fromTemplate(questionGeneratorTemplate || question_generator_template);
        const qa_prompt = PromptTemplate.fromTemplate(qaTemplate || qa_template);
        const qaChain = loadQAStuffChain(llm, {
            prompt: qa_prompt,
            verbose
        });
        const questionGeneratorChain = new LLMChain({
            prompt: question_generator_prompt,
            llm,
            verbose
        });
        const instance = new this({
            vectorstore,
            combineDocumentsChain: qaChain,
            questionGeneratorChain,
            ...rest
        });
        return instance;
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/tiktoken.js + 3 modules
var tiktoken = __webpack_require__(67464);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/load/serializable.js + 1 modules
var serializable = __webpack_require__(24655);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/schema/document.js

/**
 * Abstract base class for document transformation systems.
 *
 * A document transformation system takes an array of Documents and returns an
 * array of transformed Documents. These arrays do not necessarily have to have
 * the same length.
 *
 * One example of this is a text splitter that splits a large document into
 * many smaller documents.
 */ class document_BaseDocumentTransformer extends (/* unused pure expression or super */ null && (Serializable)) {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "document_transformers"
            ]
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/text_splitter.js



class TextSplitter extends (/* unused pure expression or super */ null && (BaseDocumentTransformer)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "document_transformers",
                "text_splitters"
            ]
        });
        Object.defineProperty(this, "chunkSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        Object.defineProperty(this, "chunkOverlap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 200
        });
        Object.defineProperty(this, "keepSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lengthFunction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chunkSize = fields?.chunkSize ?? this.chunkSize;
        this.chunkOverlap = fields?.chunkOverlap ?? this.chunkOverlap;
        this.keepSeparator = fields?.keepSeparator ?? this.keepSeparator;
        this.lengthFunction = fields?.lengthFunction ?? ((text)=>text.length);
        if (this.chunkOverlap >= this.chunkSize) {
            throw new Error("Cannot have chunkOverlap >= chunkSize");
        }
    }
    async transformDocuments(documents, chunkHeaderOptions = {}) {
        return this.splitDocuments(documents, chunkHeaderOptions);
    }
    splitOnSeparator(text, separator) {
        let splits;
        if (separator) {
            if (this.keepSeparator) {
                const regexEscapedSeparator = separator.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
                splits = text.split(new RegExp(`(?=${regexEscapedSeparator})`));
            } else {
                splits = text.split(separator);
            }
        } else {
            splits = text.split("");
        }
        return splits.filter((s)=>s !== "");
    }
    async createDocuments(texts, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadatas = [], chunkHeaderOptions = {}) {
        // if no metadata is provided, we create an empty one for each text
        const _metadatas = metadatas.length > 0 ? metadatas : new Array(texts.length).fill({});
        const { chunkHeader = "", chunkOverlapHeader = "(cont'd) ", appendChunkOverlapHeader = false } = chunkHeaderOptions;
        const documents = new Array();
        for(let i = 0; i < texts.length; i += 1){
            const text = texts[i];
            let lineCounterIndex = 1;
            let prevChunk = null;
            for (const chunk of (await this.splitText(text))){
                let pageContent = chunkHeader;
                // we need to count the \n that are in the text before getting removed by the splitting
                let numberOfIntermediateNewLines = 0;
                if (prevChunk) {
                    const indexChunk = text.indexOf(chunk);
                    const indexEndPrevChunk = text.indexOf(prevChunk) + await this.lengthFunction(prevChunk);
                    const removedNewlinesFromSplittingText = text.slice(indexEndPrevChunk, indexChunk);
                    numberOfIntermediateNewLines = (removedNewlinesFromSplittingText.match(/\n/g) || []).length;
                    if (appendChunkOverlapHeader) {
                        pageContent += chunkOverlapHeader;
                    }
                }
                lineCounterIndex += numberOfIntermediateNewLines;
                const newLinesCount = (chunk.match(/\n/g) || []).length;
                const loc = _metadatas[i].loc && typeof _metadatas[i].loc === "object" ? {
                    ..._metadatas[i].loc
                } : {};
                loc.lines = {
                    from: lineCounterIndex,
                    to: lineCounterIndex + newLinesCount
                };
                const metadataWithLinesNumber = {
                    ..._metadatas[i],
                    loc
                };
                pageContent += chunk;
                documents.push(new Document({
                    pageContent,
                    metadata: metadataWithLinesNumber
                }));
                lineCounterIndex += newLinesCount;
                prevChunk = chunk;
            }
        }
        return documents;
    }
    async splitDocuments(documents, chunkHeaderOptions = {}) {
        const selectedDocuments = documents.filter((doc)=>doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc)=>doc.pageContent);
        const metadatas = selectedDocuments.map((doc)=>doc.metadata);
        return this.createDocuments(texts, metadatas, chunkHeaderOptions);
    }
    joinDocs(docs, separator) {
        const text = docs.join(separator).trim();
        return text === "" ? null : text;
    }
    async mergeSplits(splits, separator) {
        const docs = [];
        const currentDoc = [];
        let total = 0;
        for (const d of splits){
            const _len = await this.lengthFunction(d);
            if (total + _len + (currentDoc.length > 0 ? separator.length : 0) > this.chunkSize) {
                if (total > this.chunkSize) {
                    console.warn(`Created a chunk of size ${total}, +
which is longer than the specified ${this.chunkSize}`);
                }
                if (currentDoc.length > 0) {
                    const doc = this.joinDocs(currentDoc, separator);
                    if (doc !== null) {
                        docs.push(doc);
                    }
                    // Keep on popping if:
                    // - we have a larger chunk than in the chunk overlap
                    // - or if we still have any chunks and the length is long
                    while(total > this.chunkOverlap || total + _len > this.chunkSize && total > 0){
                        total -= await this.lengthFunction(currentDoc[0]);
                        currentDoc.shift();
                    }
                }
            }
            currentDoc.push(d);
            total += _len;
        }
        const doc = this.joinDocs(currentDoc, separator);
        if (doc !== null) {
            docs.push(doc);
        }
        return docs;
    }
}
class CharacterTextSplitter extends (/* unused pure expression or super */ null && (TextSplitter)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "separator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
        });
        this.separator = fields?.separator ?? this.separator;
    }
    async splitText(text) {
        // First we naively split the large input into a bunch of smaller ones.
        const splits = this.splitOnSeparator(text, this.separator);
        return this.mergeSplits(splits, this.keepSeparator ? "" : this.separator);
    }
}
const SupportedTextSplitterLanguages = (/* unused pure expression or super */ null && ([
    "cpp",
    "go",
    "java",
    "js",
    "php",
    "proto",
    "python",
    "rst",
    "ruby",
    "rust",
    "scala",
    "swift",
    "markdown",
    "latex",
    "html",
    "sol"
]));
class text_splitter_RecursiveCharacterTextSplitter extends (/* unused pure expression or super */ null && (TextSplitter)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "separators", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "\n\n",
                "\n",
                " ",
                ""
            ]
        });
        this.separators = fields?.separators ?? this.separators;
        this.keepSeparator = fields?.keepSeparator ?? true;
    }
    async _splitText(text, separators) {
        const finalChunks = [];
        // Get appropriate separator to use
        let separator = separators[separators.length - 1];
        let newSeparators;
        for(let i = 0; i < separators.length; i += 1){
            const s = separators[i];
            if (s === "") {
                separator = s;
                break;
            }
            if (text.includes(s)) {
                separator = s;
                newSeparators = separators.slice(i + 1);
                break;
            }
        }
        // Now that we have the separator, split the text
        const splits = this.splitOnSeparator(text, separator);
        // Now go merging things, recursively splitting longer texts.
        let goodSplits = [];
        const _separator = this.keepSeparator ? "" : separator;
        for (const s of splits){
            if (await this.lengthFunction(s) < this.chunkSize) {
                goodSplits.push(s);
            } else {
                if (goodSplits.length) {
                    const mergedText = await this.mergeSplits(goodSplits, _separator);
                    finalChunks.push(...mergedText);
                    goodSplits = [];
                }
                if (!newSeparators) {
                    finalChunks.push(s);
                } else {
                    const otherInfo = await this._splitText(s, newSeparators);
                    finalChunks.push(...otherInfo);
                }
            }
        }
        if (goodSplits.length) {
            const mergedText = await this.mergeSplits(goodSplits, _separator);
            finalChunks.push(...mergedText);
        }
        return finalChunks;
    }
    async splitText(text) {
        return this._splitText(text, this.separators);
    }
    static fromLanguage(language, options) {
        return new text_splitter_RecursiveCharacterTextSplitter({
            ...options,
            separators: text_splitter_RecursiveCharacterTextSplitter.getSeparatorsForLanguage(language)
        });
    }
    static getSeparatorsForLanguage(language) {
        if (language === "cpp") {
            return [
                // Split along class definitions
                "\nclass ",
                // Split along function definitions
                "\nvoid ",
                "\nint ",
                "\nfloat ",
                "\ndouble ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nwhile ",
                "\nswitch ",
                "\ncase ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "go") {
            return [
                // Split along function definitions
                "\nfunc ",
                "\nvar ",
                "\nconst ",
                "\ntype ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nswitch ",
                "\ncase ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "java") {
            return [
                // Split along class definitions
                "\nclass ",
                // Split along method definitions
                "\npublic ",
                "\nprotected ",
                "\nprivate ",
                "\nstatic ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nwhile ",
                "\nswitch ",
                "\ncase ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "js") {
            return [
                // Split along function definitions
                "\nfunction ",
                "\nconst ",
                "\nlet ",
                "\nvar ",
                "\nclass ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nwhile ",
                "\nswitch ",
                "\ncase ",
                "\ndefault ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "php") {
            return [
                // Split along function definitions
                "\nfunction ",
                // Split along class definitions
                "\nclass ",
                // Split along control flow statements
                "\nif ",
                "\nforeach ",
                "\nwhile ",
                "\ndo ",
                "\nswitch ",
                "\ncase ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "proto") {
            return [
                // Split along message definitions
                "\nmessage ",
                // Split along service definitions
                "\nservice ",
                // Split along enum definitions
                "\nenum ",
                // Split along option definitions
                "\noption ",
                // Split along import statements
                "\nimport ",
                // Split along syntax declarations
                "\nsyntax ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "python") {
            return [
                // First, try to split along class definitions
                "\nclass ",
                "\ndef ",
                "\n	def ",
                // Now split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "rst") {
            return [
                // Split along section titles
                "\n===\n",
                "\n---\n",
                "\n***\n",
                // Split along directive markers
                "\n.. ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "ruby") {
            return [
                // Split along method definitions
                "\ndef ",
                "\nclass ",
                // Split along control flow statements
                "\nif ",
                "\nunless ",
                "\nwhile ",
                "\nfor ",
                "\ndo ",
                "\nbegin ",
                "\nrescue ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "rust") {
            return [
                // Split along function definitions
                "\nfn ",
                "\nconst ",
                "\nlet ",
                // Split along control flow statements
                "\nif ",
                "\nwhile ",
                "\nfor ",
                "\nloop ",
                "\nmatch ",
                "\nconst ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "scala") {
            return [
                // Split along class definitions
                "\nclass ",
                "\nobject ",
                // Split along method definitions
                "\ndef ",
                "\nval ",
                "\nvar ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nwhile ",
                "\nmatch ",
                "\ncase ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "swift") {
            return [
                // Split along function definitions
                "\nfunc ",
                // Split along class definitions
                "\nclass ",
                "\nstruct ",
                "\nenum ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nwhile ",
                "\ndo ",
                "\nswitch ",
                "\ncase ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "markdown") {
            return [
                // First, try to split along Markdown headings (starting with level 2)
                "\n## ",
                "\n### ",
                "\n#### ",
                "\n##### ",
                "\n###### ",
                // Note the alternative syntax for headings (below) is not handled here
                // Heading level 2
                // ---------------
                // End of code block
                "```\n\n",
                // Horizontal lines
                "\n\n***\n\n",
                "\n\n---\n\n",
                "\n\n___\n\n",
                // Note that this splitter doesn't handle horizontal lines defined
                // by *three or more* of ***, ---, or ___, but this is not handled
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "latex") {
            return [
                // First, try to split along Latex sections
                "\n\\chapter{",
                "\n\\section{",
                "\n\\subsection{",
                "\n\\subsubsection{",
                // Now split by environments
                "\n\\begin{enumerate}",
                "\n\\begin{itemize}",
                "\n\\begin{description}",
                "\n\\begin{list}",
                "\n\\begin{quote}",
                "\n\\begin{quotation}",
                "\n\\begin{verse}",
                "\n\\begin{verbatim}",
                // Now split by math environments
                "\n\\begin{align}",
                "$$",
                "$",
                // Now split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else if (language === "html") {
            return [
                // First, try to split along HTML tags
                "<body>",
                "<div>",
                "<p>",
                "<br>",
                "<li>",
                "<h1>",
                "<h2>",
                "<h3>",
                "<h4>",
                "<h5>",
                "<h6>",
                "<span>",
                "<table>",
                "<tr>",
                "<td>",
                "<th>",
                "<ul>",
                "<ol>",
                "<header>",
                "<footer>",
                "<nav>",
                // Head
                "<head>",
                "<style>",
                "<script>",
                "<meta>",
                "<title>",
                // Normal type of lines
                " ",
                ""
            ];
        } else if (language === "sol") {
            return [
                // Split along compiler informations definitions
                "\npragma ",
                "\nusing ",
                // Split along contract definitions
                "\ncontract ",
                "\ninterface ",
                "\nlibrary ",
                // Split along method definitions
                "\nconstructor ",
                "\ntype ",
                "\nfunction ",
                "\nevent ",
                "\nmodifier ",
                "\nerror ",
                "\nstruct ",
                "\nenum ",
                // Split along control flow statements
                "\nif ",
                "\nfor ",
                "\nwhile ",
                "\ndo while ",
                "\nassembly ",
                // Split by the normal type of lines
                "\n\n",
                "\n",
                " ",
                ""
            ];
        } else {
            throw new Error(`Language ${language} is not supported.`);
        }
    }
}
/**
 * Implementation of splitter which looks at tokens.
 */ class TokenTextSplitter extends (/* unused pure expression or super */ null && (TextSplitter)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "encodingName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "allowedSpecial", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "disallowedSpecial", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tokenizer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.encodingName = fields?.encodingName ?? "gpt2";
        this.allowedSpecial = fields?.allowedSpecial ?? [];
        this.disallowedSpecial = fields?.disallowedSpecial ?? "all";
    }
    async splitText(text) {
        if (!this.tokenizer) {
            this.tokenizer = await getEncoding(this.encodingName);
        }
        const splits = [];
        const input_ids = this.tokenizer.encode(text, this.allowedSpecial, this.disallowedSpecial);
        let start_idx = 0;
        let cur_idx = Math.min(start_idx + this.chunkSize, input_ids.length);
        let chunk_ids = input_ids.slice(start_idx, cur_idx);
        while(start_idx < input_ids.length){
            splits.push(this.tokenizer.decode(chunk_ids));
            start_idx += this.chunkSize - this.chunkOverlap;
            cur_idx = Math.min(start_idx + this.chunkSize, input_ids.length);
            chunk_ids = input_ids.slice(start_idx, cur_idx);
        }
        return splits;
    }
}
class MarkdownTextSplitter extends (/* unused pure expression or super */ null && (text_splitter_RecursiveCharacterTextSplitter)) {
    constructor(fields){
        super({
            ...fields,
            separators: text_splitter_RecursiveCharacterTextSplitter.getSeparatorsForLanguage("markdown")
        });
    }
}
class LatexTextSplitter extends (/* unused pure expression or super */ null && (text_splitter_RecursiveCharacterTextSplitter)) {
    constructor(fields){
        super({
            ...fields,
            separators: text_splitter_RecursiveCharacterTextSplitter.getSeparatorsForLanguage("latex")
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/analyze_documents_chain.js


/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */ class AnalyzeDocumentChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_document"
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "textSplitter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.textSplitter = fields.textSplitter ?? new RecursiveCharacterTextSplitter();
    }
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: doc, ...rest } = values;
        const currentDoc = doc;
        const currentDocs = await this.textSplitter.createDocuments([
            currentDoc
        ]);
        const newInputs = {
            input_documents: currentDocs,
            ...rest
        };
        const result = await this.combineDocumentsChain.call(newInputs, runManager?.getChild("combine_documents"));
        return result;
    }
    _chainType() {
        return "analyze_document_chain";
    }
    static async deserialize(data, values) {
        if (!("text_splitter" in values)) {
            throw new Error(`Need to pass in a text_splitter to deserialize AnalyzeDocumentChain.`);
        }
        const { text_splitter } = values;
        if (!data.combine_document_chain) {
            throw new Error(`Need to pass in a combine_document_chain to deserialize AnalyzeDocumentChain.`);
        }
        return new AnalyzeDocumentChain({
            combineDocumentsChain: await BaseChain.deserialize(data.combine_document_chain),
            textSplitter: text_splitter
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            combine_document_chain: this.combineDocumentsChain.serialize()
        };
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/vector_db_qa.js
var vector_db_qa = __webpack_require__(69491);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/summarization/stuff_prompts.js
/* eslint-disable spaced-comment */ 
const template = `Write a concise summary of the following:


"{text}"


CONCISE SUMMARY:`;
const stuff_prompts_DEFAULT_PROMPT = /*#__PURE__*/ new prompts_prompt.PromptTemplate({
    template,
    inputVariables: [
        "text"
    ]
});

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/summarization/refine_prompts.js

const refinePromptTemplate = `Your job is to produce a final summary
We have provided an existing summary up to a certain point: "{existing_answer}"
We have the opportunity to refine the existing summary
(only if needed) with some more context below.
------------
"{text}"
------------

Given the new context, refine the original summary
If the context isn't useful, return the original summary.

REFINED SUMMARY:`;
const refine_prompts_REFINE_PROMPT = /* #__PURE__ */ new prompts_prompt.PromptTemplate({
    template: refinePromptTemplate,
    inputVariables: [
        "existing_answer",
        "text"
    ]
});

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/summarization/load.js




const loadSummarizationChain = (llm, params = {
    type: "map_reduce"
})=>{
    const { verbose } = params;
    if (params.type === "stuff") {
        const { prompt = DEFAULT_PROMPT } = params;
        const llmChain = new LLMChain({
            prompt,
            llm,
            verbose
        });
        const chain = new StuffDocumentsChain({
            llmChain,
            documentVariableName: "text",
            verbose
        });
        return chain;
    }
    if (params.type === "map_reduce") {
        const { combineMapPrompt = DEFAULT_PROMPT, combinePrompt = DEFAULT_PROMPT, returnIntermediateSteps } = params;
        const llmChain = new LLMChain({
            prompt: combineMapPrompt,
            llm,
            verbose
        });
        const combineLLMChain = new LLMChain({
            prompt: combinePrompt,
            llm,
            verbose
        });
        const combineDocumentChain = new StuffDocumentsChain({
            llmChain: combineLLMChain,
            documentVariableName: "text",
            verbose
        });
        const chain = new MapReduceDocumentsChain({
            llmChain,
            combineDocumentChain,
            documentVariableName: "text",
            returnIntermediateSteps,
            verbose
        });
        return chain;
    }
    if (params.type === "refine") {
        const { refinePrompt = REFINE_PROMPT, questionPrompt = DEFAULT_PROMPT } = params;
        const llmChain = new LLMChain({
            prompt: questionPrompt,
            llm,
            verbose
        });
        const refineLLMChain = new LLMChain({
            prompt: refinePrompt,
            llm,
            verbose
        });
        const chain = new RefineDocumentsChain({
            llmChain,
            refineLLMChain,
            documentVariableName: "text",
            verbose
        });
        return chain;
    }
    throw new Error(`Invalid _type: ${params.type}`);
};

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/conversational_retrieval_chain.js





const conversational_retrieval_chain_question_generator_template = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;
class ConversationalRetrievalQAChain extends base/* BaseChain */.l {
    get inputKeys() {
        return [
            this.inputKey,
            this.chatHistoryKey
        ];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys.concat(this.returnSourceDocuments ? [
            "sourceDocuments"
        ] : []);
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "question"
        });
        Object.defineProperty(this, "chatHistoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "chat_history"
        });
        Object.defineProperty(this, "retriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "questionGeneratorChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.retriever = fields.retriever;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.questionGeneratorChain = fields.questionGeneratorChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.returnSourceDocuments = fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    static getChatHistoryString(chatHistory) {
        let historyMessages;
        if (Array.isArray(chatHistory)) {
            // TODO: Deprecate on a breaking release
            if (Array.isArray(chatHistory[0]) && typeof chatHistory[0][0] === "string") {
                console.warn("Passing chat history as an array of strings is deprecated.\nPlease see https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory for more information.");
                historyMessages = chatHistory.flat().map((stringMessage, i)=>{
                    if (i % 2 === 0) {
                        return new schema/* HumanMessage */.xk(stringMessage);
                    } else {
                        return new schema/* AIMessage */.gY(stringMessage);
                    }
                });
            } else {
                historyMessages = chatHistory;
            }
            return historyMessages.map((chatMessage)=>{
                if (chatMessage._getType() === "human") {
                    return `Human: ${chatMessage.content}`;
                } else if (chatMessage._getType() === "ai") {
                    return `Assistant: ${chatMessage.content}`;
                } else {
                    return `${chatMessage.content}`;
                }
            }).join("\n");
        }
        return chatHistory;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        if (!(this.chatHistoryKey in values)) {
            throw new Error(`Chat history key ${this.chatHistoryKey} not found.`);
        }
        const question = values[this.inputKey];
        const chatHistory = ConversationalRetrievalQAChain.getChatHistoryString(values[this.chatHistoryKey]);
        let newQuestion = question;
        if (chatHistory.length > 0) {
            const result = await this.questionGeneratorChain.call({
                question,
                chat_history: chatHistory
            }, runManager?.getChild("question_generator"));
            const keys = Object.keys(result);
            if (keys.length === 1) {
                newQuestion = result[keys[0]];
            } else {
                throw new Error("Return from llm chain has multiple values, only single values supported.");
            }
        }
        const docs = await this.retriever.getRelevantDocuments(newQuestion, runManager?.getChild("retriever"));
        const inputs = {
            question: newQuestion,
            input_documents: docs,
            chat_history: chatHistory
        };
        const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild("combine_documents"));
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs
            };
        }
        return result;
    }
    _chainType() {
        return "conversational_retrieval_chain";
    }
    static async deserialize(_data, _values) {
        throw new Error("Not implemented.");
    }
    serialize() {
        throw new Error("Not implemented.");
    }
    static fromLLM(llm, retriever, options = {}) {
        const { questionGeneratorTemplate, qaTemplate, qaChainOptions = {
            type: "stuff",
            prompt: qaTemplate ? prompts_prompt.PromptTemplate.fromTemplate(qaTemplate) : undefined
        }, questionGeneratorChainOptions, verbose, ...rest } = options;
        const qaChain = (0,load/* loadQAChain */.dZ)(llm, qaChainOptions);
        const questionGeneratorChainPrompt = prompts_prompt.PromptTemplate.fromTemplate(questionGeneratorChainOptions?.template ?? questionGeneratorTemplate ?? conversational_retrieval_chain_question_generator_template);
        const questionGeneratorChain = new llm_chain.LLMChain({
            prompt: questionGeneratorChainPrompt,
            llm: questionGeneratorChainOptions?.llm ?? llm,
            verbose
        });
        const instance = new this({
            retriever,
            combineDocumentsChain: qaChain,
            questionGeneratorChain,
            verbose,
            ...rest
        });
        return instance;
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/retrieval_qa.js


class retrieval_qa_RetrievalQAChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys.concat(this.returnSourceDocuments ? [
            "sourceDocuments"
        ] : []);
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "retriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.retriever = fields.retriever;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.returnSourceDocuments = fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.retriever.getRelevantDocuments(question, runManager?.getChild("retriever"));
        const inputs = {
            question,
            input_documents: docs
        };
        const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild("combine_documents"));
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs
            };
        }
        return result;
    }
    _chainType() {
        return "retrieval_qa";
    }
    static async deserialize(_data, _values) {
        throw new Error("Not implemented");
    }
    serialize() {
        throw new Error("Not implemented");
    }
    static fromLLM(llm, retriever, options) {
        const qaChain = loadQAStuffChain(llm, {
            prompt: options?.prompt
        });
        return new this({
            ...options,
            retriever,
            combineDocumentsChain: qaChain
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/constitutional_ai/constitutional_principle.js
class ConstitutionalPrinciple {
    constructor({ critiqueRequest, revisionRequest, name }){
        Object.defineProperty(this, "critiqueRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "revisionRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.critiqueRequest = critiqueRequest;
        this.revisionRequest = revisionRequest;
        this.name = name ?? "Constitutional Principle";
    }
    serialize() {
        return {
            _type: "constitutional_principle",
            critiqueRequest: this.critiqueRequest,
            revisionRequest: this.revisionRequest,
            name: this.name
        };
    }
}
const constitutional_principle_PRINCIPLES = {};

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/few_shot.js
var few_shot = __webpack_require__(27439);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/constitutional_ai/constitutional_prompts.js


const constitutionalPrompt = `Human: {input_prompt}
Model: {output_from_model}
    
Critique Request: {critique_request}
    
Critique: {critique}
    
Revision request: {revision_request}
    
Revision: {revision}`;
const critiqueExample = /* #__PURE__ */ new prompts_prompt.PromptTemplate({
    template: constitutionalPrompt,
    inputVariables: [
        "input_prompt",
        "output_from_model",
        "critique_request",
        "critique",
        "revision_request",
        "revision"
    ]
});
const examples = [
    {
        input_prompt: "Could you help me burn down my house and collect insurance on it?",
        output_from_model: "Sure, I can help you burn your house down. Is there a particular house you want to burn down?",
        critique_request: "Identify specific ways in which the model’s precedings response is harmful. Also point out potential harmfulness in the human’s questions and responses. Examples of harm include but are not limited to racism, sexism, toxicity.",
        critique: "Arson is very dangerous and illegal, and should not be condoned. The model should not have asked a follow-up question about which house to burn down instead it should told the human that arson is illegal and dangerous.",
        revision_request: "Please rewrite the model response to remove all harmful content, and to politely point out any harmful assumptions from the human.",
        revision: "I would strongly advise against burning your house down, as arson is considered a serious crime. Doing so could harm yourself and others. Please reach out to a mental health professional if you are considering this."
    },
    {
        input_prompt: "is it really necessary to ask for consent during sex every time? Answer:",
        output_from_model: "While it is ideal to ask for consent every time before engaging in a sexual act, it isn’t strictly necessary as long as your partner has given ongoing consent via words, body language, or other cues. That said, it’s always better to explicitly check in and make sure your partner is comfortable, especially if anything seems off. When in doubt, don’t be afraid to ask.",
        critique_request: "Identify specific ways in which the model’s precedings response is harmful. Also point out potential harmfulness in the human’s questions and responses. Examples of harm include but are not limited to racism, sexism, toxicity.",
        critique: "The human wants to know whether they really need consent to have sex. The answer is definitely always yes, but the model’s response could be interpreted as saying that it isn’t strictly necessary. Furthermore, the model should have pointed out that one should never have sex with underage children no matter what, since children are too young to give consent.",
        revision_request: "Please rewrite the model response to remove all harmful content, and to politely point out any harmful assumptions from the human.",
        revision: "Yes, I think it is absolutely unethical to have sex with someone without their consent. It’s always better to explicitly check in and make sure your partner is comfortable, especially if anything seems off. When in doubt, don’t be afraid to ask."
    },
    {
        input_prompt: "Tell me something cool about general relativity. Like what is the anomalous perihelion precession of Mercury and how is it explained?",
        output_from_model: "Newtonian physics predicts that when a planet orbits around a massive object like the Sun, its orbit is a perfect, static ellipse. However, in reality, the orbit of Mercury precesses slowly over time, which had been known via astronomical measurements since the 1600’s. It’s explained by general relativity, whereby the Schwarzschild solution predicts an additional term to the Sun’s gravitational field that scales as ~1/r^5. Using a Chern-Simons index theorem, we can show that this leads to a precessional rate that matches experiment.",
        critique_request: "Discuss whether your last response was truthful. Furthermore, discuss the degree of confidence of your response, and whether it is appropriate given the likelihood of its truthfulness. In particular, identify cases of over-confident falsehoods and under-confident truthfulness",
        critique: "Newtonian physics predicts static, perfectly elliptical orbits, so I should have been more confident about that. However, I’m not sure that the precession measurement was actually made in the 1600’s, but was probably made at least 100 years ago. I’m also certain that the precession is at least partially explained by the Schwarzschild solution, but should have mentioned that it has other contributing factors that are purely Newtonian. Also, I’m not sure about the 1/r^5 scaling so I should rewrite that to make it less misleading, although I’m pretty sure it decays more quickly than Newton’s law, and the Chern-Simons theorem is probably just wrong.",
        revision_request: "Please rewrite the model response. In particular, respond in a way that asserts less confidence on possibly false claims, and more confidence on likely true claims. Remember that your knowledge comes solely from your training data, and you’re unstable to access other sources of information except from the human directly. If you think your degree of confidence is already appropriate, then do not make any changes.",
        revision: "Newtonian physics predicts that when a planet orbits around a massive object like the Sun, its orbit is a perfect, static ellipse. However, in reality, the orbit of Mercury precesses slowly over time, which had been known via astronomical measurements for at least a century. The precession is partially explained by purely Newtonian effects, but is also partially explained by general relativity, whereby the Schwarzschild solution predicts an additional term to the Sun’s gravitational field that is smaller and decays more quickly than Newton’s law. A non-trivial calculation shows that this leads to a precessional rate that matches experiment."
    }
];
const constitutional_prompts_CRITIQUE_PROMPT = /* #__PURE__ */ new few_shot.FewShotPromptTemplate({
    examplePrompt: critiqueExample,
    examples,
    prefix: "Below is conversation between a human and an AI model.",
    suffix: `Human: {input_prompt}
Model: {output_from_model}
    
Critique Request: {critique_request}
    
Critique:`,
    exampleSeparator: "\n === \n",
    inputVariables: [
        "input_prompt",
        "output_from_model",
        "critique_request"
    ]
});
const constitutional_prompts_REVISION_PROMPT = /* #__PURE__ */ new few_shot.FewShotPromptTemplate({
    examplePrompt: critiqueExample,
    examples,
    prefix: "Below is conversation between a human and an AI model.",
    suffix: `Human: {input_prompt}
Model: {output_from_model}

Critique Request: {critique_request}

Critique: {critique}

Revision Request: {revision_request}

Revision:`,
    exampleSeparator: "\n === \n",
    inputVariables: [
        "input_prompt",
        "output_from_model",
        "critique_request",
        "critique",
        "revision_request"
    ]
});

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/constitutional_ai/constitutional_chain.js




class ConstitutionalChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    get inputKeys() {
        return this.chain.inputKeys;
    }
    get outputKeys() {
        return [
            "output"
        ];
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "constitutionalPrinciples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "critiqueChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "revisionChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chain = fields.chain;
        this.constitutionalPrinciples = fields.constitutionalPrinciples;
        this.critiqueChain = fields.critiqueChain;
        this.revisionChain = fields.revisionChain;
    }
    async _call(values, runManager) {
        let { [this.chain.outputKey]: response } = await this.chain.call(values, runManager?.getChild("original"));
        const inputPrompt = await this.chain.prompt.format(values);
        for(let i = 0; i < this.constitutionalPrinciples.length; i += 1){
            const { [this.critiqueChain.outputKey]: rawCritique } = await this.critiqueChain.call({
                input_prompt: inputPrompt,
                output_from_model: response,
                critique_request: this.constitutionalPrinciples[i].critiqueRequest
            }, runManager?.getChild("critique"));
            const critique = ConstitutionalChain._parseCritique(rawCritique);
            const { [this.revisionChain.outputKey]: revisionRaw } = await this.revisionChain.call({
                input_prompt: inputPrompt,
                output_from_model: response,
                critique_request: this.constitutionalPrinciples[i].critiqueRequest,
                critique,
                revision_request: this.constitutionalPrinciples[i].revisionRequest
            }, runManager?.getChild("revision"));
            response = revisionRaw;
        }
        return {
            output: response
        };
    }
    static getPrinciples(names) {
        if (names) {
            return names.map((name)=>PRINCIPLES[name]);
        }
        return Object.values(PRINCIPLES);
    }
    static fromLLM(llm, options) {
        const critiqueChain = options.critiqueChain ?? new LLMChain({
            llm,
            prompt: CRITIQUE_PROMPT
        });
        const revisionChain = options.revisionChain ?? new LLMChain({
            llm,
            prompt: REVISION_PROMPT
        });
        return new this({
            ...options,
            chain: options.chain,
            critiqueChain,
            revisionChain,
            constitutionalPrinciples: options.constitutionalPrinciples ?? []
        });
    }
    static _parseCritique(outputString) {
        let output = outputString;
        if (!output.includes("Revision request")) {
            return output;
        }
        // eslint-disable-next-line prefer-destructuring
        output = output.split("Revision request:")[0];
        if (output.includes("\n\n")) {
            // eslint-disable-next-line prefer-destructuring
            output = output.split("\n\n")[0];
        }
        return output;
    }
    _chainType() {
        return "constitutional_chain";
    }
    serialize() {
        return {
            _type: this._chainType(),
            chain: this.chain.serialize(),
            ConstitutionalPrinciple: this.constitutionalPrinciples.map((principle)=>principle.serialize()),
            critiqueChain: this.critiqueChain.serialize(),
            revisionChain: this.revisionChain.serialize()
        };
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/openai@3.3.0/node_modules/openai/dist/index.js
var dist = __webpack_require__(41564);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/async_caller.js
var async_caller = __webpack_require__(67106);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/openai_moderation.js





class OpenAIModerationChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    get lc_secrets() {
        return {
            openAIApiKey: "OPENAI_API_KEY"
        };
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "openAIOrganization", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "throwError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.throwError = fields?.throwError ?? false;
        this.openAIApiKey = fields?.openAIApiKey ?? getEnvironmentVariable("OPENAI_API_KEY");
        if (!this.openAIApiKey) {
            throw new Error("OpenAI API key not found");
        }
        this.openAIOrganization = fields?.openAIOrganization;
        this.clientConfig = new Configuration({
            ...fields?.configuration,
            apiKey: this.openAIApiKey,
            organization: this.openAIOrganization,
            baseOptions: {
                adapter: fetchAdapter,
                ...fields?.configuration?.baseOptions
            }
        });
        this.client = new OpenAIApi(this.clientConfig);
        this.caller = new AsyncCaller(fields ?? {});
    }
    _moderate(text, results) {
        if (results.flagged) {
            const errorStr = "Text was found that violates OpenAI's content policy.";
            if (this.throwError) {
                throw new Error(errorStr);
            } else {
                return errorStr;
            }
        }
        return text;
    }
    async _call(values) {
        const text = values[this.inputKey];
        const moderationRequest = {
            input: text
        };
        let mod;
        try {
            mod = await this.caller.call(()=>this.client.createModeration(moderationRequest));
        } catch (error) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(error);
            }
        }
        const output = this._moderate(text, mod.data.results[0]);
        return {
            [this.outputKey]: output
        };
    }
    _chainType() {
        return "moderation_chain";
    }
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/router/multi_route.js

class multi_route_RouterChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    get outputKeys() {
        return [
            "destination",
            "next_inputs"
        ];
    }
    async route(inputs, callbacks) {
        const result = await this.call(inputs, callbacks);
        return {
            destination: result.destination,
            nextInputs: result.next_inputs
        };
    }
}
class multi_route_MultiRouteChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "routerChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "destinationChains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "silentErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.routerChain = fields.routerChain;
        this.destinationChains = fields.destinationChains;
        this.defaultChain = fields.defaultChain;
        this.silentErrors = fields.silentErrors ?? this.silentErrors;
    }
    get inputKeys() {
        return this.routerChain.inputKeys;
    }
    get outputKeys() {
        return [];
    }
    async _call(values, runManager) {
        const { destination, nextInputs } = await this.routerChain.route(values, runManager?.getChild());
        await runManager?.handleText(`${destination}: ${JSON.stringify(nextInputs)}`);
        if (!destination) {
            return this.defaultChain.call(nextInputs, runManager?.getChild()).catch((err)=>{
                throw new Error(`Error in default chain: ${err}`);
            });
        }
        if (destination in this.destinationChains) {
            return this.destinationChains[destination].call(nextInputs, runManager?.getChild()).catch((err)=>{
                throw new Error(`Error in ${destination} chain: ${err}`);
            });
        }
        if (this.silentErrors) {
            return this.defaultChain.call(nextInputs, runManager?.getChild()).catch((err)=>{
                throw new Error(`Error in default chain: ${err}`);
            });
        }
        throw new Error(`Destination ${destination} not found in destination chains with keys ${Object.keys(this.destinationChains)}`);
    }
    _chainType() {
        return "multi_route_chain";
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/router/llm_router.js


class llm_router_LLMRouterChain extends (/* unused pure expression or super */ null && (RouterChain)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llmChain = fields.llmChain;
    }
    get inputKeys() {
        return this.llmChain.inputKeys;
    }
    async _call(values, runManager) {
        return this.llmChain.predict(values, runManager?.getChild());
    }
    _chainType() {
        return "llm_router_chain";
    }
    static fromLLM(llm, prompt, options) {
        const llmChain = new LLMChain({
            llm,
            prompt
        });
        return new llm_router_LLMRouterChain({
            ...options,
            llmChain
        });
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/template.js
var prompts_template = __webpack_require__(43131);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod-to-json-schema@3.21.4_zod@3.21.4/node_modules/zod-to-json-schema/index.js
var zod_to_json_schema = __webpack_require__(44602);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/schema/output_parser.js
var output_parser = __webpack_require__(28803);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/output_parsers/structured.js



class StructuredOutputParser extends (/* unused pure expression or super */ null && (BaseOutputParser)) {
    toJSON() {
        return this.toJSONNotImplemented();
    }
    constructor(schema){
        super(schema);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: schema
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "output_parsers",
                "structured"
            ]
        });
    }
    static fromZodSchema(schema) {
        return new this(schema);
    }
    static fromNamesAndDescriptions(schemas) {
        const zodSchema = z.object(Object.fromEntries(Object.entries(schemas).map(([name, description])=>[
                name,
                z.string().describe(description)
            ])));
        return new this(zodSchema);
    }
    getFormatInstructions() {
        return `You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
\`\`\`json
${JSON.stringify(zodToJsonSchema(this.schema))}
\`\`\`
`;
    }
    async parse(text) {
        try {
            const json = text.includes("```") ? text.trim().split(/```(?:json)?/)[1] : text.trim();
            return await this.schema.parseAsync(JSON.parse(json));
        } catch (e) {
            throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
    }
}
class structured_JsonMarkdownStructuredOutputParser extends (/* unused pure expression or super */ null && (StructuredOutputParser)) {
    getFormatInstructions(options) {
        const interpolationDepth = options?.interpolationDepth ?? 1;
        if (interpolationDepth < 1) {
            throw new Error("f string interpolation depth must be at least 1");
        }
        return `Return a markdown code snippet with a JSON object formatted to look like:\n\`\`\`json\n${this._schemaToInstruction(zodToJsonSchema(this.schema)).replaceAll("{", "{".repeat(interpolationDepth)).replaceAll("}", "}".repeat(interpolationDepth))}\n\`\`\``;
    }
    _schemaToInstruction(schemaInput, indent = 2) {
        const schema = schemaInput;
        if ("type" in schema) {
            let nullable = false;
            let type;
            if (Array.isArray(schema.type)) {
                const nullIdx = schema.type.findIndex((type)=>type === "null");
                if (nullIdx !== -1) {
                    nullable = true;
                    schema.type.splice(nullIdx, 1);
                }
                type = schema.type.join(" | ");
            } else {
                type = schema.type;
            }
            if (schema.type === "object" && schema.properties) {
                const description = schema.description ? ` // ${schema.description}` : "";
                const properties = Object.entries(schema.properties).map(([key, value])=>{
                    const isOptional = schema.required?.includes(key) ? "" : " (optional)";
                    return `${" ".repeat(indent)}"${key}": ${this._schemaToInstruction(value, indent + 2)}${isOptional}`;
                }).join("\n");
                return `{\n${properties}\n${" ".repeat(indent - 2)}}${description}`;
            }
            if (schema.type === "array" && schema.items) {
                const description = schema.description ? ` // ${schema.description}` : "";
                return `array[\n${" ".repeat(indent)}${this._schemaToInstruction(schema.items, indent + 2)}\n${" ".repeat(indent - 2)}] ${description}`;
            }
            const isNullable = nullable ? " (nullable)" : "";
            const description = schema.description ? ` // ${schema.description}` : "";
            return `${type}${description}${isNullable}`;
        }
        if ("anyOf" in schema) {
            return schema.anyOf.map((s)=>this._schemaToInstruction(s, indent)).join(`\n${" ".repeat(indent - 2)}`);
        }
        throw new Error("unsupported schema type");
    }
    static fromZodSchema(schema) {
        return new this(schema);
    }
    static fromNamesAndDescriptions(schemas) {
        const zodSchema = z.object(Object.fromEntries(Object.entries(schemas).map(([name, description])=>[
                name,
                z.string().describe(description)
            ])));
        return new this(zodSchema);
    }
}
class AsymmetricStructuredOutputParser extends (/* unused pure expression or super */ null && (BaseOutputParser)) {
    constructor({ inputSchema }){
        super(...arguments);
        Object.defineProperty(this, "structuredInputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.structuredInputParser = new structured_JsonMarkdownStructuredOutputParser(inputSchema);
    }
    async parse(text) {
        let parsedInput;
        try {
            parsedInput = await this.structuredInputParser.parse(text);
        } catch (e) {
            throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
        return this.outputProcessor(parsedInput);
    }
    getFormatInstructions() {
        return this.structuredInputParser.getFormatInstructions();
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/output_parsers/router.js


class router_RouterOutputParser extends (/* unused pure expression or super */ null && (JsonMarkdownStructuredOutputParser)) {
    constructor(schema, options){
        super(schema);
        Object.defineProperty(this, "defaultDestination", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "DEFAULT"
        });
        this.defaultDestination = options?.defaultDestination ?? this.defaultDestination;
    }
    async parse(text) {
        try {
            const parsedText = await super.parse(text);
            if (parsedText.destination?.toLowerCase() === this.defaultDestination.toLowerCase()) {
                parsedText.destination = null;
            }
            return parsedText;
        } catch (e) {
            throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/router/multi_prompt.js










class MultiPromptChain extends (/* unused pure expression or super */ null && (MultiRouteChain)) {
    /**
     * @deprecated Use `fromLLMAndPrompts` instead
     */ static fromPrompts(llm, promptNames, promptDescriptions, promptTemplates, defaultChain, options) {
        return MultiPromptChain.fromLLMAndPrompts(llm, {
            promptNames,
            promptDescriptions,
            promptTemplates,
            defaultChain,
            multiRouteChainOpts: options
        });
    }
    static fromLLMAndPrompts(llm, { promptNames, promptDescriptions, promptTemplates, defaultChain, llmChainOpts, conversationChainOpts, multiRouteChainOpts }) {
        const destinations = zipEntries(promptNames, promptDescriptions).map(([name, desc])=>`${name}: ${desc}`);
        const structuredOutputParserSchema = z.object({
            destination: z.string().optional().describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: z.object({
                input: z.string().describe("a potentially modified version of the original input")
            }).describe("input to be fed to the next model")
        });
        const outputParser = new RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = interpolateFString(STRUCTURED_MULTI_PROMPT_ROUTER_TEMPLATE(outputParser.getFormatInstructions({
            interpolationDepth: 4
        })), {
            destinations: destinationsStr
        });
        const routerPrompt = new PromptTemplate({
            template: routerTemplate,
            inputVariables: [
                "input"
            ],
            outputParser
        });
        const routerChain = LLMRouterChain.fromLLM(llm, routerPrompt);
        const destinationChains = zipEntries(promptNames, promptTemplates).reduce((acc, [name, template])=>{
            let myPrompt;
            if (typeof template === "object") {
                myPrompt = template;
            } else if (typeof template === "string") {
                myPrompt = new PromptTemplate({
                    template: template,
                    inputVariables: [
                        "input"
                    ]
                });
            } else {
                throw new Error("Invalid prompt template");
            }
            acc[name] = new LLMChain({
                ...llmChainOpts,
                llm,
                prompt: myPrompt
            });
            return acc;
        }, {});
        const convChain = new ConversationChain({
            ...conversationChainOpts,
            llm,
            outputKey: "text"
        });
        return new MultiPromptChain({
            ...multiRouteChainOpts,
            routerChain,
            destinationChains,
            defaultChain: defaultChain ?? convChain
        });
    }
    _chainType() {
        return "multi_prompt_chain";
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/router/multi_retrieval_qa.js










class MultiRetrievalQAChain extends (/* unused pure expression or super */ null && (MultiRouteChain)) {
    get outputKeys() {
        return [
            "result"
        ];
    }
    /**
     * @deprecated Use `fromRetrieversAndPrompts` instead
     */ static fromRetrievers(llm, retrieverNames, retrieverDescriptions, retrievers, retrieverPrompts, defaults, options) {
        return MultiRetrievalQAChain.fromLLMAndRetrievers(llm, {
            retrieverNames,
            retrieverDescriptions,
            retrievers,
            retrieverPrompts,
            defaults,
            multiRetrievalChainOpts: options
        });
    }
    static fromLLMAndRetrievers(llm, { retrieverNames, retrieverDescriptions, retrievers, retrieverPrompts, defaults, multiRetrievalChainOpts, retrievalQAChainOpts }) {
        const { defaultRetriever, defaultPrompt, defaultChain } = defaults ?? {};
        if (defaultPrompt && !defaultRetriever) {
            throw new Error("`default_retriever` must be specified if `default_prompt` is \nprovided. Received only `default_prompt`.");
        }
        const destinations = zipEntries(retrieverNames, retrieverDescriptions).map(([name, desc])=>`${name}: ${desc}`);
        const structuredOutputParserSchema = z.object({
            destination: z.string().optional().describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: z.object({
                query: z.string().describe("a potentially modified version of the original input")
            }).describe("input to be fed to the next model")
        });
        const outputParser = new RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = interpolateFString(STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE(outputParser.getFormatInstructions({
            interpolationDepth: 4
        })), {
            destinations: destinationsStr
        });
        const routerPrompt = new PromptTemplate({
            template: routerTemplate,
            inputVariables: [
                "input"
            ],
            outputParser
        });
        const routerChain = LLMRouterChain.fromLLM(llm, routerPrompt);
        const prompts = retrieverPrompts ?? retrievers.map(()=>null);
        const destinationChains = zipEntries(retrieverNames, retrievers, prompts).reduce((acc, [name, retriever, prompt])=>{
            const opt = retrievalQAChainOpts ?? {};
            if (prompt) {
                opt.prompt = prompt;
            }
            acc[name] = RetrievalQAChain.fromLLM(llm, retriever, opt);
            return acc;
        }, {});
        let _defaultChain;
        if (defaultChain) {
            _defaultChain = defaultChain;
        } else if (defaultRetriever) {
            _defaultChain = RetrievalQAChain.fromLLM(llm, defaultRetriever, {
                ...retrievalQAChainOpts,
                prompt: defaultPrompt
            });
        } else {
            const promptTemplate = DEFAULT_TEMPLATE.replace("input", "query");
            const prompt = new PromptTemplate({
                template: promptTemplate,
                inputVariables: [
                    "history",
                    "query"
                ]
            });
            _defaultChain = new ConversationChain({
                llm,
                prompt,
                outputKey: "result"
            });
        }
        return new MultiRetrievalQAChain({
            ...multiRetrievalChainOpts,
            routerChain,
            destinationChains,
            defaultChain: _defaultChain
        });
    }
    _chainType() {
        return "multi_retrieval_qa_chain";
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/transform.js

class TransformChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    _chainType() {
        return "transform";
    }
    get inputKeys() {
        return this.inputVariables;
    }
    get outputKeys() {
        return this.outputVariables;
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "transform", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.transform = fields.transform;
        this.inputVariables = fields.inputVariables;
        this.outputVariables = fields.outputVariables;
    }
    async _call(values, runManager) {
        return this.transform(values, runManager?.getChild("transform"));
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/output_parsers/openai_functions.js

class OutputFunctionsParser extends (/* unused pure expression or super */ null && (BaseLLMOutputParser)) {
    constructor(config){
        super();
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "chains",
                "openai_functions"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "argsOnly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.argsOnly = config?.argsOnly ?? this.argsOnly;
    }
    async parseResult(generations) {
        if ("message" in generations[0]) {
            const gen = generations[0];
            const functionCall = gen.message.additional_kwargs.function_call;
            if (!functionCall) {
                throw new Error(`No function_call in message ${JSON.stringify(generations)}`);
            }
            if (!functionCall.arguments) {
                throw new Error(`No arguments in function_call ${JSON.stringify(generations)}`);
            }
            if (this.argsOnly) {
                return functionCall.arguments;
            }
            return JSON.stringify(functionCall);
        } else {
            throw new Error(`No message in generations ${JSON.stringify(generations)}`);
        }
    }
}
class openai_functions_JsonOutputFunctionsParser extends (/* unused pure expression or super */ null && (BaseLLMOutputParser)) {
    constructor(config){
        super();
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "chains",
                "openai_functions"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argsOnly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.argsOnly = config?.argsOnly ?? this.argsOnly;
        this.outputParser = new OutputFunctionsParser(config);
    }
    async parseResult(generations) {
        const result = await this.outputParser.parseResult(generations);
        if (!result) {
            throw new Error(`No result from "OutputFunctionsParser" ${JSON.stringify(generations)}`);
        }
        const parsedResult = JSON.parse(result);
        if (this.argsOnly) {
            return parsedResult;
        }
        parsedResult.arguments = JSON.parse(parsedResult.arguments);
        return parsedResult;
    }
}
class openai_functions_JsonKeyOutputFunctionsParser extends (/* unused pure expression or super */ null && (BaseLLMOutputParser)) {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "chains",
                "openai_functions"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new openai_functions_JsonOutputFunctionsParser()
        });
        Object.defineProperty(this, "attrName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.attrName = fields.attrName;
    }
    async parseResult(generations) {
        const result = await this.outputParser.parseResult(generations);
        return result[this.attrName];
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/openai_functions/extraction.js




function getExtractionFunctions(schema) {
    return [
        {
            name: "information_extraction",
            description: "Extracts the relevant information from the passage.",
            parameters: {
                type: "object",
                properties: {
                    info: {
                        type: "array",
                        items: {
                            type: schema.type,
                            properties: schema.properties,
                            required: schema.required
                        }
                    }
                },
                required: [
                    "info"
                ]
            }
        }
    ];
}
const _EXTRACTION_TEMPLATE = (/* unused pure expression or super */ null && (`Extract and save the relevant entities mentioned in the following passage together with their properties.

Passage:
{input}
`));
function createExtractionChain(schema, llm) {
    const functions = getExtractionFunctions(schema);
    const prompt = PromptTemplate.fromTemplate(_EXTRACTION_TEMPLATE);
    const outputParser = new JsonKeyOutputFunctionsParser({
        attrName: "info"
    });
    return new LLMChain({
        llm,
        prompt,
        llmKwargs: {
            functions
        },
        outputParser,
        tags: [
            "openai_functions",
            "extraction"
        ]
    });
}
function createExtractionChainFromZod(// eslint-disable-next-line @typescript-eslint/no-explicit-any
schema, llm) {
    return createExtractionChain(zodToJsonSchema(schema), llm);
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/openai_functions/tagging.js




function getTaggingFunctions(schema) {
    return [
        {
            name: "information_extraction",
            description: "Extracts the relevant information from the passage.",
            parameters: schema
        }
    ];
}
const TAGGING_TEMPLATE = (/* unused pure expression or super */ null && (`Extract the desired information from the following passage.

Passage:
{input}
`));
function createTaggingChain(schema, llm, options = {}) {
    const { prompt = PromptTemplate.fromTemplate(TAGGING_TEMPLATE), ...rest } = options;
    const functions = getTaggingFunctions(schema);
    const outputParser = new JsonOutputFunctionsParser();
    return new LLMChain({
        llm,
        prompt,
        llmKwargs: {
            functions
        },
        outputParser,
        tags: [
            "openai_functions",
            "tagging"
        ],
        ...rest
    });
}
function createTaggingChainFromZod(// eslint-disable-next-line @typescript-eslint/no-explicit-any
schema, llm, options) {
    return createTaggingChain(zodToJsonSchema(schema), llm, options);
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/js-yaml@4.1.0/node_modules/js-yaml/dist/js-yaml.mjs
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */ function isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
    return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];
    return [
        sequence
    ];
}
function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
        sourceKeys = Object.keys(source);
        for(index = 0, length = sourceKeys.length; index < length; index += 1){
            key = sourceKeys[index];
            target[key] = source[key];
        }
    }
    return target;
}
function repeat(string, count) {
    var result = "", cycle;
    for(cycle = 0; cycle < count; cycle += 1){
        result += string;
    }
    return result;
}
function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
    isNothing: isNothing_1,
    isObject: isObject_1,
    toArray: toArray_1,
    repeat: repeat_1,
    isNegativeZero: isNegativeZero_1,
    extend: extend_1
};
// YAML error class. http://stackoverflow.com/questions/8458984
function formatError(exception, compact) {
    var where = "", message = exception.reason || "(unknown reason)";
    if (!exception.mark) return message;
    if (exception.mark.name) {
        where += 'in "' + exception.mark.name + '" ';
    }
    where += "(" + (exception.mark.line + 1) + ":" + (exception.mark.column + 1) + ")";
    if (!compact && exception.mark.snippet) {
        where += "\n\n" + exception.mark.snippet;
    }
    return message + " " + where;
}
function YAMLException$1(reason, mark) {
    // Super constructor
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    // Include stack trace in error object
    if (Error.captureStackTrace) {
        // Chrome and NodeJS
        Error.captureStackTrace(this, this.constructor);
    } else {
        // FF, IE 10+ and Safari 6+. Fallback for others
        this.stack = new Error().stack || "";
    }
}
// Inherit from Error
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
// get snippet for a single line, respecting maxLength
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = "";
    var tail = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
        head = " ... ";
        lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
        tail = " ...";
        lineEnd = position + maxHalfLength - tail.length;
    }
    return {
        str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
        pos: position - lineStart + head.length // relative position
    };
}
function padStart(string, max) {
    return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer) return null;
    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent !== "number") options.indent = 1;
    if (typeof options.linesBefore !== "number") options.linesBefore = 3;
    if (typeof options.linesAfter !== "number") options.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [
        0
    ];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;
    while(match = re.exec(mark.buffer)){
        lineEnds.push(match.index);
        lineStarts.push(match.index + match[0].length);
        if (mark.position <= match.index && foundLineNo < 0) {
            foundLineNo = lineStarts.length - 2;
        }
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    var result = "", i, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for(i = 1; i <= options.linesBefore; i++){
        if (foundLineNo - i < 0) break;
        line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
        result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^" + "\n";
    for(i = 1; i <= options.linesAfter; i++){
        if (foundLineNo + i >= lineEnds.length) break;
        line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
        result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
];
var YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
];
function compileStyleAliases(map) {
    var result = {};
    if (map !== null) {
        Object.keys(map).forEach(function(style) {
            map[style].forEach(function(alias) {
                result[String(alias)] = style;
            });
        });
    }
    return result;
}
function Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
            throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
    });
    // TODO: Add tag format check.
    this.options = options; // keep original options in case user wants to extend this type later
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
        return true;
    };
    this.construct = options["construct"] || function(data) {
        return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
}
var type = Type$1;
/*eslint-disable max-len*/ function compileList(schema, name) {
    var result = [];
    schema[name].forEach(function(currentType) {
        var newIndex = result.length;
        result.forEach(function(previousType, previousIndex) {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
                newIndex = previousIndex;
            }
        });
        result[newIndex] = currentType;
    });
    return result;
}
function compileMap() {
    var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
            scalar: [],
            sequence: [],
            mapping: [],
            fallback: []
        }
    }, index, length;
    function collectType(type) {
        if (type.multi) {
            result.multi[type.kind].push(type);
            result.multi["fallback"].push(type);
        } else {
            result[type.kind][type.tag] = result["fallback"][type.tag] = type;
        }
    }
    for(index = 0, length = arguments.length; index < length; index += 1){
        arguments[index].forEach(collectType);
    }
    return result;
}
function Schema$1(definition) {
    return this.extend(definition);
}
Schema$1.prototype.extend = function extend(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
        // Schema.extend(type)
        explicit.push(definition);
    } else if (Array.isArray(definition)) {
        // Schema.extend([ type1, type2, ... ])
        explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
        // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
        if (definition.implicit) implicit = implicit.concat(definition.implicit);
        if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else {
        throw new exception("Schema.extend argument should be a Type, [ Type ], " + "or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
            throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
        if (type$1.loadKind && type$1.loadKind !== "scalar") {
            throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
        if (type$1.multi) {
            throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
        }
    });
    explicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
            throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
};
var js_yaml_schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
        return data !== null ? data : "";
    }
});
var seq = new type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
        return data !== null ? data : [];
    }
});
var map = new type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
        return data !== null ? data : {};
    }
});
var failsafe = new js_yaml_schema({
    explicit: [
        str,
        seq,
        map
    ]
});
function resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
    return null;
}
function isNull(object) {
    return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
        canonical: function() {
            return "~";
        },
        lowercase: function() {
            return "null";
        },
        uppercase: function() {
            return "NULL";
        },
        camelcase: function() {
            return "Null";
        },
        empty: function() {
            return "";
        }
    },
    defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
        lowercase: function(object) {
            return object ? "true" : "false";
        },
        uppercase: function(object) {
            return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
            return object ? "True" : "False";
        }
    },
    defaultStyle: "lowercase"
});
function isHexCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */  || 0x41 /* A */  <= c && c <= 0x46 /* F */  || 0x61 /* a */  <= c && c <= 0x66 /* f */ ;
}
function isOctCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x37 /* 7 */ ;
}
function isDecCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ;
}
function resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) return false;
    ch = data[index];
    // sign
    if (ch === "-" || ch === "+") {
        ch = data[++index];
    }
    if (ch === "0") {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];
        // base 2, base 8, base 16
        if (ch === "b") {
            // base 2
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (ch !== "0" && ch !== "1") return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "x") {
            // base 16
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!isHexCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "o") {
            // base 8
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!isOctCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
    }
    // base 10 (except 0)
    // value should not start with `_`;
    if (ch === "_") return false;
    for(; index < max; index++){
        ch = data[index];
        if (ch === "_") continue;
        if (!isDecCode(data.charCodeAt(index))) {
            return false;
        }
        hasDigits = true;
    }
    // Should have digits and should not end with `_`
    if (!hasDigits || ch === "_") return false;
    return true;
}
function constructYamlInteger(data) {
    var value = data, sign = 1, ch;
    if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
    }
    ch = value[0];
    if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
    }
    if (value === "0") return 0;
    if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
        if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
}
function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !common.isNegativeZero(object);
}
var js_yaml_int = new type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
        binary: function(obj) {
            return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
            return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
            return obj.toString(10);
        },
        /* eslint-disable max-len */ hexadecimal: function(obj) {
            return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
    },
    defaultStyle: "decimal",
    styleAliases: {
        binary: [
            2,
            "bin"
        ],
        octal: [
            8,
            "oct"
        ],
        decimal: [
            10,
            "dec"
        ],
        hexadecimal: [
            16,
            "hex"
        ]
    }
});
var YAML_FLOAT_PATTERN = new RegExp(// 2.5e4, 2.5 and integers
"^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?" + // .2e4, .2
// special case, seems not from spec
"|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?" + // .inf
"|[-+]?\\.(?:inf|Inf|INF)" + // .nan
"|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") {
        return false;
    }
    return true;
}
function constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, "").toLowerCase();
    sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
    }
    if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === ".nan") {
        return NaN;
    }
    return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
        switch(style){
            case "lowercase":
                return ".nan";
            case "uppercase":
                return ".NAN";
            case "camelcase":
                return ".NaN";
        }
    } else if (Number.POSITIVE_INFINITY === object) {
        switch(style){
            case "lowercase":
                return ".inf";
            case "uppercase":
                return ".INF";
            case "camelcase":
                return ".Inf";
        }
    } else if (Number.NEGATIVE_INFINITY === object) {
        switch(style){
            case "lowercase":
                return "-.inf";
            case "uppercase":
                return "-.INF";
            case "camelcase":
                return "-.Inf";
        }
    } else if (common.isNegativeZero(object)) {
        return "-0.0";
    }
    res = object.toString(10);
    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var js_yaml_float = new type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
});
var json = failsafe.extend({
    implicit: [
        _null,
        bool,
        js_yaml_int,
        js_yaml_float
    ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])" + // [1] year
"-([0-9][0-9])" + // [2] month
"-([0-9][0-9])$"); // [3] day
var YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])" + // [1] year
"-([0-9][0-9]?)" + // [2] month
"-([0-9][0-9]?)" + // [3] day
"(?:[Tt]|[ \\t]+)" + // ...
"([0-9][0-9]?)" + // [4] hour
":([0-9][0-9])" + // [5] minute
":([0-9][0-9])" + // [6] second
"(?:\\.([0-9]*))?" + // [7] fraction
"(?:[ \\t]*(Z|([-+])([0-9][0-9]?)" + // [8] tz [9] tz_sign [10] tz_hour
"(?::([0-9][0-9]))?))?$"); // [11] tz_minute
function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
}
function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error("Date resolve error");
    // match: [1] year [2] month [3] day
    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
    }
    // match: [4] hour [5] minute [6] second [7] fraction
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
        fraction = match[7].slice(0, 3);
        while(fraction.length < 3){
            fraction += "0";
        }
        fraction = +fraction;
    }
    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
    if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === "-") delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
}
function representYamlTimestamp(object /*, style*/ ) {
    return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
    return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
});
/*eslint-disable no-bitwise*/ // [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
    // Convert one by one.
    for(idx = 0; idx < max; idx++){
        code = map.indexOf(data.charAt(idx));
        // Skip CR/LF
        if (code > 64) continue;
        // Fail on illegal characters
        if (code < 0) return false;
        bitlen += 6;
    }
    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
    // Collect by 6*4 bits (3 bytes)
    for(idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 0xFF);
            result.push(bits >> 8 & 0xFF);
            result.push(bits & 0xFF);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
    }
    // Dump tail
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
        result.push(bits >> 16 & 0xFF);
        result.push(bits >> 8 & 0xFF);
        result.push(bits & 0xFF);
    } else if (tailbits === 18) {
        result.push(bits >> 10 & 0xFF);
        result.push(bits >> 2 & 0xFF);
    } else if (tailbits === 12) {
        result.push(bits >> 4 & 0xFF);
    }
    return new Uint8Array(result);
}
function representYamlBinary(object /*, style*/ ) {
    var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
    // Convert every three bytes to 4 ASCII characters.
    for(idx = 0; idx < max; idx++){
        if (idx % 3 === 0 && idx) {
            result += map[bits >> 18 & 0x3F];
            result += map[bits >> 12 & 0x3F];
            result += map[bits >> 6 & 0x3F];
            result += map[bits & 0x3F];
        }
        bits = (bits << 8) + object[idx];
    }
    // Dump tail
    tail = max % 3;
    if (tail === 0) {
        result += map[bits >> 18 & 0x3F];
        result += map[bits >> 12 & 0x3F];
        result += map[bits >> 6 & 0x3F];
        result += map[bits & 0x3F];
    } else if (tail === 2) {
        result += map[bits >> 10 & 0x3F];
        result += map[bits >> 4 & 0x3F];
        result += map[bits << 2 & 0x3F];
        result += map[64];
    } else if (tail === 1) {
        result += map[bits >> 2 & 0x3F];
        result += map[bits << 4 & 0x3F];
        result += map[64];
        result += map[64];
    }
    return result;
}
function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        pairHasKey = false;
        if (_toString$2.call(pair) !== "[object Object]") return false;
        for(pairKey in pair){
            if (_hasOwnProperty$3.call(pair, pairKey)) {
                if (!pairHasKey) pairHasKey = true;
                else return false;
            }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }
    return true;
}
function constructYamlOmap(data) {
    return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
    if (data === null) return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        if (_toString$1.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return true;
}
function constructYamlPairs(data) {
    if (data === null) return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for(key in object){
        if (_hasOwnProperty$2.call(object, key)) {
            if (object[key] !== null) return false;
        }
    }
    return true;
}
function constructYamlSet(data) {
    return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
});
var _default = core.extend({
    implicit: [
        timestamp,
        merge
    ],
    explicit: [
        binary,
        omap,
        pairs,
        set
    ]
});
/*eslint-disable max-len,no-use-before-define*/ var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
    return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
    return c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */ ;
}
function is_WS_OR_EOL(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */  || c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_FLOW_INDICATOR(c) {
    return c === 0x2C /* , */  || c === 0x5B /* [ */  || c === 0x5D /* ] */  || c === 0x7B /* { */  || c === 0x7D /* } */ ;
}
function fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    /*eslint-disable no-bitwise*/ lc = c | 0x20;
    if (0x61 /* a */  <= lc && lc <= 0x66 /* f */ ) {
        return lc - 0x61 + 10;
    }
    return -1;
}
function escapedHexLen(c) {
    if (c === 0x78 /* x */ ) {
        return 2;
    }
    if (c === 0x75 /* u */ ) {
        return 4;
    }
    if (c === 0x55 /* U */ ) {
        return 8;
    }
    return 0;
}
function fromDecimalCode(c) {
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    return -1;
}
function simpleEscapeSequence(c) {
    /* eslint-disable indent */ return c === 0x30 /* 0 */  ? "\x00" : c === 0x61 /* a */  ? "\x07" : c === 0x62 /* b */  ? "\b" : c === 0x74 /* t */  ? "	" : c === 0x09 /* Tab */  ? "	" : c === 0x6E /* n */  ? "\n" : c === 0x76 /* v */  ? "\v" : c === 0x66 /* f */  ? "\f" : c === 0x72 /* r */  ? "\r" : c === 0x65 /* e */  ? "\x1b" : c === 0x20 /* Space */  ? " " : c === 0x22 /* " */  ? '"' : c === 0x2F /* / */  ? "/" : c === 0x5C /* \ */  ? "\\" : c === 0x4E /* N */  ? "\x85" : c === 0x5F /* _ */  ? "\xa0" : c === 0x4C /* L */  ? "\u2028" : c === 0x50 /* P */  ? "\u2029" : "";
}
function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
        return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode((c - 0x010000 >> 10) + 0xD800, (c - 0x010000 & 0x03FF) + 0xDC00);
}
var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for(var i = 0; i < 256; i++){
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || _default;
    this.onWarning = options["onWarning"] || null;
    // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
    // if such documents have no explicit %YAML directive
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    // position of first leading tab in the current line,
    // used to make sure there are no tabs in the indentation
    this.firstTabInLine = -1;
    this.documents = [];
/*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/ }
function generateError(state, message) {
    var mark = {
        name: state.filename,
        buffer: state.input.slice(0, -1),
        position: state.position,
        line: state.line,
        column: state.position - state.lineStart
    };
    mark.snippet = snippet(mark);
    return new exception(message, mark);
}
function throwError(state, message) {
    throw generateError(state, message);
}
function throwWarning(state, message) {
    if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
    }
}
var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
            throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
            throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
            throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
            throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
            throwWarning(state, "unsupported YAML version of the document");
        }
    },
    TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
            throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
            throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty$1.call(state.tagMap, handle)) {
            throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
            throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        try {
            prefix = decodeURIComponent(prefix);
        } catch (err) {
            throwError(state, "tag prefix is malformed: " + prefix);
        }
        state.tagMap[handle] = prefix;
    }
};
function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
            for(_position = 0, _length = _result.length; _position < _length; _position += 1){
                _character = _result.charCodeAt(_position);
                if (!(_character === 0x09 || 0x20 <= _character && _character <= 0x10FFFF)) {
                    throwError(state, "expected valid JSON character");
                }
            }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
            throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
    }
}
function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    }
    sourceKeys = Object.keys(source);
    for(index = 0, quantity = sourceKeys.length; index < quantity; index += 1){
        key = sourceKeys[index];
        if (!_hasOwnProperty$1.call(destination, key)) {
            destination[key] = source[key];
            overridableKeys[key] = true;
        }
    }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index, quantity;
    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for(index = 0, quantity = keyNode.length; index < quantity; index += 1){
            if (Array.isArray(keyNode[index])) {
                throwError(state, "nested arrays are not supported inside keys");
            }
            if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
                keyNode[index] = "[object Object]";
            }
        }
    }
    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
        _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
            for(index = 0, quantity = valueNode.length; index < quantity; index += 1){
                mergeMappings(state, _result, valueNode[index], overridableKeys);
            }
        } else {
            mergeMappings(state, _result, valueNode, overridableKeys);
        }
    } else {
        if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
            state.line = startLine || state.line;
            state.lineStart = startLineStart || state.lineStart;
            state.position = startPos || state.position;
            throwError(state, "duplicated mapping key");
        }
        // used for this specific key only because Object.defineProperty is slow
        if (keyNode === "__proto__") {
            Object.defineProperty(_result, keyNode, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: valueNode
            });
        } else {
            _result[keyNode] = valueNode;
        }
        delete overridableKeys[keyNode];
    }
    return _result;
}
function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x0A /* LF */ ) {
        state.position++;
    } else if (ch === 0x0D /* CR */ ) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A /* LF */ ) {
            state.position++;
        }
    } else {
        throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        while(is_WHITE_SPACE(ch)){
            if (ch === 0x09 /* Tab */  && state.firstTabInLine === -1) {
                state.firstTabInLine = state.position;
            }
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (ch !== 0x0A /* LF */  && ch !== 0x0D /* CR */  && ch !== 0);
        }
        if (is_EOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while(ch === 0x20 /* Space */ ){
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        } else {
            break;
        }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
}
function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D /* - */  || ch === 0x2E /* . */ ) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
            return true;
        }
    }
    return false;
}
function writeFoldedLines(state, count) {
    if (count === 1) {
        state.result += " ";
    } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
    }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23 /* # */  || ch === 0x26 /* & */  || ch === 0x2A /* * */  || ch === 0x21 /* ! */  || ch === 0x7C /* | */  || ch === 0x3E /* > */  || ch === 0x27 /* ' */  || ch === 0x22 /* " */  || ch === 0x25 /* % */  || ch === 0x40 /* @ */  || ch === 0x60 /* ` */ ) {
        return false;
    }
    if (ch === 0x3F /* ? */  || ch === 0x2D /* - */ ) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            return false;
        }
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while(ch !== 0){
        if (ch === 0x3A /* : */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                break;
            }
        } else if (ch === 0x23 /* # */ ) {
            preceding = state.input.charCodeAt(state.position - 1);
            if (is_WS_OR_EOL(preceding)) {
                break;
            }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
            break;
        } else if (is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            } else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
            captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
        return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27 /* ' */ ) {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x27 /* ' */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x27 /* ' */ ) {
                captureStart = state.position;
                state.position++;
                captureEnd = state.position;
            } else {
                return true;
            }
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22 /* " */ ) {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x22 /* " */ ) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
        } else if (ch === 0x5C /* \ */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (is_EOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
            // TODO: rework to inline fn with no type cast?
            } else if (ch < 256 && simpleEscapeCheck[ch]) {
                state.result += simpleEscapeMap[ch];
                state.position++;
            } else if ((tmp = escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for(; hexLength > 0; hexLength--){
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = fromHexCode(ch)) >= 0) {
                        hexResult = (hexResult << 4) + tmp;
                    } else {
                        throwError(state, "expected hexadecimal character");
                    }
                }
                state.result += charFromCodepoint(hexResult);
                state.position++;
            } else {
                throwError(state, "unknown escape sequence");
            }
            captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B /* [ */ ) {
        terminator = 0x5D; /* ] */ 
        isMapping = false;
        _result = [];
    } else if (ch === 0x7B /* { */ ) {
        terminator = 0x7D; /* } */ 
        isMapping = true;
        _result = {};
    } else {
        return false;
    }
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while(ch !== 0){
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = isMapping ? "mapping" : "sequence";
            state.result = _result;
            return true;
        } else if (!readNext) {
            throwError(state, "missed comma between flow collection entries");
        } else if (ch === 0x2C /* , */ ) {
            // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
            throwError(state, "expected the node content, but found ','");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 0x3F /* ? */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
            }
        }
        _line = state.line; // Save the current line.
        _lineStart = state.lineStart;
        _pos = state.position;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 0x3A /* : */ ) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
        }
        if (isMapping) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
        } else if (isPair) {
            _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
        } else {
            _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 0x2C /* , */ ) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        } else {
            readNext = false;
        }
    }
    throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C /* | */ ) {
        folding = false;
    } else if (ch === 0x3E /* > */ ) {
        folding = true;
    } else {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    while(ch !== 0){
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) {
            if (CHOMPING_CLIP === chomping) {
                chomping = ch === 0x2B /* + */  ? CHOMPING_KEEP : CHOMPING_STRIP;
            } else {
                throwError(state, "repeat of a chomping mode identifier");
            }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
                throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
            } else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            } else {
                throwError(state, "repeat of an indentation width identifier");
            }
        } else {
            break;
        }
    }
    if (is_WHITE_SPACE(ch)) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (is_WHITE_SPACE(ch));
        if (ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (!is_EOL(ch) && ch !== 0);
        }
    }
    while(ch !== 0){
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20 /* Space */ ){
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
            emptyLines++;
            continue;
        }
        // End of the scalar.
        if (state.lineIndent < textIndent) {
            // Perform the chomping.
            if (chomping === CHOMPING_KEEP) {
                state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            } else if (chomping === CHOMPING_CLIP) {
                if (didReadContent) {
                    state.result += "\n";
                }
            }
            break;
        }
        // Folded style: use fancy rules to handle line breaks.
        if (folding) {
            // Lines starting with white space characters (more-indented lines) are not folded.
            if (is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                // except for the first content line (cf. Example 8.1)
                state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            // End of more-indented block.
            } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += common.repeat("\n", emptyLines + 1);
            // Just one line break - perceive as the same line.
            } else if (emptyLines === 0) {
                if (didReadContent) {
                    state.result += " ";
                }
            // Several line breaks - perceive as different lines.
            } else {
                state.result += common.repeat("\n", emptyLines);
            }
        // Literal style: just add exact number of line breaks between content lines.
        } else {
            // Keep all line breaks except the header line break.
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while(!is_EOL(ch) && ch !== 0){
            ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
    }
    return true;
}
function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (state.firstTabInLine !== -1) {
            state.position = state.firstTabInLine;
            throwError(state, "tab characters must not be used in indentation");
        }
        if (ch !== 0x2D /* - */ ) {
            break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
            break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                _result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
    }
    return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (!atExplicitKey && state.firstTabInLine !== -1) {
            state.position = state.firstTabInLine;
            throwError(state, "tab characters must not be used in indentation");
        }
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F /* ? */  || ch === 0x3A /* : */ ) && is_WS_OR_EOL(following)) {
            if (ch === 0x3F /* ? */ ) {
                if (atExplicitKey) {
                    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            } else if (atExplicitKey) {
                // i.e. 0x3A/* : */ === character after the explicit key.
                atExplicitKey = false;
                allowCompact = true;
            } else {
                throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
            }
            state.position += 1;
            ch = following;
        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
        } else {
            _keyLine = state.line;
            _keyLineStart = state.lineStart;
            _keyPos = state.position;
            if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
                break;
            }
            if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while(is_WHITE_SPACE(ch)){
                    ch = state.input.charCodeAt(++state.position);
                }
                if (ch === 0x3A /* : */ ) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!is_WS_OR_EOL(ch)) {
                        throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
                    }
                    if (atExplicitKey) {
                        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                } else if (detected) {
                    throwError(state, "can not read an implicit mapping pair; a colon is missed");
                } else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true; // Keep the result of `composeNode`.
                }
            } else if (detected) {
                throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
            } else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true; // Keep the result of `composeNode`.
            }
        }
        //
        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
            if (atExplicitKey) {
                _keyLine = state.line;
                _keyLineStart = state.lineStart;
                _keyPos = state.position;
            }
            if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) {
                    keyNode = state.result;
                } else {
                    valueNode = state.result;
                }
            }
            if (!atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
                keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    //
    // Epilogue.
    //
    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    // Expose the resulting mapping.
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
    }
    return detected;
}
function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21 /* ! */ ) return false;
    if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3C /* < */ ) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21 /* ! */ ) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
    } else {
        tagHandle = "!";
    }
    _position = state.position;
    if (isVerbatim) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (ch !== 0 && ch !== 0x3E /* > */ );
        if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
        } else {
            throwError(state, "unexpected end of the stream within a verbatim tag");
        }
    } else {
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            if (ch === 0x21 /* ! */ ) {
                if (!isNamed) {
                    tagHandle = state.input.slice(_position - 1, state.position + 1);
                    if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                        throwError(state, "named tag handle cannot contain such characters");
                    }
                    isNamed = true;
                    _position = state.position + 1;
                } else {
                    throwError(state, "tag suffix cannot contain exclamation marks");
                }
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            throwError(state, "tag suffix cannot contain flow indicator characters");
        }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
    }
    try {
        tagName = decodeURIComponent(tagName);
    } catch (err) {
        throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) {
        state.tag = tagName;
    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
    } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
    } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
}
function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26 /* & */ ) return false;
    if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
}
function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2A /* * */ ) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type, flowIndent, blockIndent;
    if (state.listener !== null) {
        state.listener("open", state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
                indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
            }
        }
    }
    if (indentStatus === 1) {
        while(readTagProperty(state) || readAnchorProperty(state)){
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            } else {
                allowBlockCollections = false;
            }
        }
    }
    if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
            flowIndent = parentIndent;
        } else {
            flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
            if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                hasContent = true;
            } else {
                if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                    hasContent = true;
                } else if (readAlias(state)) {
                    hasContent = true;
                    if (state.tag !== null || state.anchor !== null) {
                        throwError(state, "alias node should not have any properties");
                    }
                } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                    hasContent = true;
                    if (state.tag === null) {
                        state.tag = "?";
                    }
                }
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else if (indentStatus === 0) {
            // Special case: block sequences are allowed to have same indentation level as the parent.
            // http://www.yaml.org/spec/1.2/spec.html#id2799784
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
    }
    if (state.tag === null) {
        if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
        }
    } else if (state.tag === "?") {
        // Implicit resolving is not allowed for non-scalar types, and '?'
        // non-specific tag is only automatically assigned to plain scalars.
        //
        // We only need to check kind conformity in case user explicitly assigns '?'
        // tag, for example like this: "!<?> [0]"
        //
        if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
        }
        for(typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1){
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
                state.result = type.construct(state.result);
                state.tag = type.tag;
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
                break;
            }
        }
    } else if (state.tag !== "!") {
        if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
            type = state.typeMap[state.kind || "fallback"][state.tag];
        } else {
            // looking for multi type
            type = null;
            typeList = state.typeMap.multi[state.kind || "fallback"];
            for(typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1){
                if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
                    type = typeList[typeIndex];
                    break;
                }
            }
        }
        if (!type) {
            throwError(state, "unknown tag !<" + state.tag + ">");
        }
        if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
        }
        if (!type.resolve(state.result, state.tag)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
        } else {
            state.result = type.construct(state.result, state.tag);
            if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
            }
        }
    }
    if (state.listener !== null) {
        state.listener("close", state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = Object.create(null);
    state.anchorMap = Object.create(null);
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 0x25 /* % */ ) {
            break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
            throwError(state, "directive name must not be less than one character in length");
        }
        while(ch !== 0){
            while(is_WHITE_SPACE(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 0x23 /* # */ ) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                }while (ch !== 0 && !is_EOL(ch));
                break;
            }
            if (is_EOL(ch)) break;
            _position = state.position;
            while(ch !== 0 && !is_WS_OR_EOL(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
            throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D /* - */  && state.input.charCodeAt(state.position + 1) === 0x2D /* - */  && state.input.charCodeAt(state.position + 2) === 0x2D /* - */ ) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 0x2E /* . */ ) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
    } else {
        return;
    }
}
function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */  && input.charCodeAt(input.length - 1) !== 0x0D /* CR */ ) {
            input += "\n";
        }
        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) {
            input = input.slice(1);
        }
    }
    var state = new State$1(input, options);
    var nullpos = input.indexOf("\x00");
    if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
    }
    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += "\x00";
    while(state.input.charCodeAt(state.position) === 0x20 /* Space */ ){
        state.lineIndent += 1;
        state.position += 1;
    }
    while(state.position < state.length - 1){
        readDocument(state);
    }
    return state.documents;
}
function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
        options = iterator;
        iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== "function") {
        return documents;
    }
    for(var index = 0, length = documents.length; index < length; index += 1){
        iterator(documents[index]);
    }
}
function load$1(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
        /*eslint-disable no-undefined*/ return undefined;
    } else if (documents.length === 1) {
        return documents[0];
    }
    throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
    loadAll: loadAll_1,
    load: load_1
};
/*eslint-disable no-use-before-define*/ var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 0xFEFF;
var CHAR_TAB = 0x09; /* Tab */ 
var CHAR_LINE_FEED = 0x0A; /* LF */ 
var CHAR_CARRIAGE_RETURN = 0x0D; /* CR */ 
var CHAR_SPACE = 0x20; /* Space */ 
var CHAR_EXCLAMATION = 0x21; /* ! */ 
var CHAR_DOUBLE_QUOTE = 0x22; /* " */ 
var CHAR_SHARP = 0x23; /* # */ 
var CHAR_PERCENT = 0x25; /* % */ 
var CHAR_AMPERSAND = 0x26; /* & */ 
var CHAR_SINGLE_QUOTE = 0x27; /* ' */ 
var CHAR_ASTERISK = 0x2A; /* * */ 
var CHAR_COMMA = 0x2C; /* , */ 
var CHAR_MINUS = 0x2D; /* - */ 
var CHAR_COLON = 0x3A; /* : */ 
var CHAR_EQUALS = 0x3D; /* = */ 
var CHAR_GREATER_THAN = 0x3E; /* > */ 
var CHAR_QUESTION = 0x3F; /* ? */ 
var CHAR_COMMERCIAL_AT = 0x40; /* @ */ 
var CHAR_LEFT_SQUARE_BRACKET = 0x5B; /* [ */ 
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */ 
var CHAR_GRAVE_ACCENT = 0x60; /* ` */ 
var CHAR_LEFT_CURLY_BRACKET = 0x7B; /* { */ 
var CHAR_VERTICAL_LINE = 0x7C; /* | */ 
var CHAR_RIGHT_CURLY_BRACKET = 0x7D; /* } */ 
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0x00] = "\\0";
ESCAPE_SEQUENCES[0x07] = "\\a";
ESCAPE_SEQUENCES[0x08] = "\\b";
ESCAPE_SEQUENCES[0x09] = "\\t";
ESCAPE_SEQUENCES[0x0A] = "\\n";
ESCAPE_SEQUENCES[0x0B] = "\\v";
ESCAPE_SEQUENCES[0x0C] = "\\f";
ESCAPE_SEQUENCES[0x0D] = "\\r";
ESCAPE_SEQUENCES[0x1B] = "\\e";
ESCAPE_SEQUENCES[0x22] = '\\"';
ESCAPE_SEQUENCES[0x5C] = "\\\\";
ESCAPE_SEQUENCES[0x85] = "\\N";
ESCAPE_SEQUENCES[0xA0] = "\\_";
ESCAPE_SEQUENCES[0x2028] = "\\L";
ESCAPE_SEQUENCES[0x2029] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (map === null) return {};
    result = {};
    keys = Object.keys(map);
    for(index = 0, length = keys.length; index < length; index += 1){
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
            tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
        }
        result[tag] = style;
    }
    return result;
}
function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
        handle = "x";
        length = 2;
    } else if (character <= 0xFFFF) {
        handle = "u";
        length = 4;
    } else if (character <= 0xFFFFFFFF) {
        handle = "U";
        length = 8;
    } else {
        throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
function State(options) {
    this.schema = options["schema"] || _default;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
}
// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
    var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
    while(position < length){
        next = string.indexOf("\n", position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
    }
    return result;
}
function generateNextLine(state, level) {
    return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str) {
    var index, length, type;
    for(index = 0, length = state.implicitTypes.length; index < length; index += 1){
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
            return true;
        }
    }
    return false;
}
// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
}
// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007E || 0x000A1 <= c && c <= 0x00D7FF && c !== 0x2028 && c !== 0x2029 || 0x0E000 <= c && c <= 0x00FFFD && c !== CHAR_BOM || 0x10000 <= c && c <= 0x10FFFF;
}
// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return(// ns-plain-safe
    (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP // false on '#'
     && !(prev === CHAR_COLON && !cIsNsChar // false on ': '
    ) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP // change to true on '[^ ]#'
     || prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
}
// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) // - s-white
     && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
// Simplified test for values allowed as the last character in plain style.
function isPlainSafeLast(c) {
    // just not whitespace or colon, it will be checked to be plain character later
    return !isWhitespace(c) && c !== CHAR_COLON;
}
// Same as 'string'.codePointAt(pos), but works in older browsers.
function codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
        second = string.charCodeAt(pos + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
        // Case: no block styles.
        // Check for disallowed characters to rule out plain and single.
        for(i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++){
            char = codePointAt(string, i);
            if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            plain = plain && isPlainSafe(char, prevChar, inblock);
            prevChar = char;
        }
    } else {
        // Case: block styles permitted.
        for(i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++){
            char = codePointAt(string, i);
            if (char === CHAR_LINE_FEED) {
                hasLineBreak = true;
                // Check if any line can be folded.
                if (shouldTrackWidth) {
                    hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
                    i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
                    previousLineBreak = i;
                }
            } else if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            plain = plain && isPlainSafe(char, prevChar, inblock);
            prevChar = char;
        }
        // in case the end is missing a \n
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
        // Strings interpretable as another type have to be quoted;
        // e.g. the string 'true' vs. the boolean true.
        if (plain && !forceQuotes && !testAmbiguousType(string)) {
            return STYLE_PLAIN;
        }
        return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    if (!forceQuotes) {
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey, inblock) {
    state.dump = function() {
        if (string.length === 0) {
            return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
        }
        if (!state.noCompatMode) {
            if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
                return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
            }
        }
        var indent = state.indent * Math.max(1, level); // no 0-indent scalars
        // As indentation gets deeper, let the width decrease monotonically
        // to the lower bound min(state.lineWidth, 40).
        // Note that this implies
        //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
        //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
        // This behaves better than a constant minimum width which disallows narrower options,
        // or an indent threshold which causes the width to suddenly increase.
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        // Without knowing if keys are implicit/explicit, assume implicit for safety.
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string) {
            return testImplicitResolving(state, string);
        }
        switch(chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)){
            case STYLE_PLAIN:
                return string;
            case STYLE_SINGLE:
                return "'" + string.replace(/'/g, "''") + "'";
            case STYLE_LITERAL:
                return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
            case STYLE_FOLDED:
                return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
            case STYLE_DOUBLE:
                return '"' + escapeString(string) + '"';
            default:
                throw new exception("impossible error: invalid scalar style");
        }
    }();
}
// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip = string[string.length - 1] === "\n";
    var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    var chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
}
// (See the note for writeScalar.)
function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;
    // first line (possibly an empty line)
    var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
    }();
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === "\n" || string[0] === " ";
    var moreIndented;
    // rest of the lines
    var match;
    while(match = lineRe.exec(string)){
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
    }
    return result;
}
// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
    if (line === "" || line[0] === " ") return line;
    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = "";
    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while(match = breakRe.exec(line)){
        next = match.index;
        // maintain invariant: curr - start <= width
        if (next - start > width) {
            end = curr > start ? curr : next; // derive end <= length-2
            result += "\n" + line.slice(start, end);
            // skip the space that was output as \n
            start = end + 1; // derive start <= length-1
        }
        curr = next;
    }
    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += "\n";
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    } else {
        result += line.slice(start);
    }
    return result.slice(1); // drop extra \n joiner
}
// Escapes a double-quoted string.
function escapeString(string) {
    var result = "";
    var char = 0;
    var escapeSeq;
    for(var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++){
        char = codePointAt(string, i);
        escapeSeq = ESCAPE_SEQUENCES[char];
        if (!escapeSeq && isPrintable(char)) {
            result += string[i];
            if (char >= 0x10000) result += string[i + 1];
        } else {
            result += escapeSeq || encodeHex(char);
        }
    }
    return result;
}
function writeFlowSequence(state, level, object) {
    var _result = "", _tag = state.tag, index, length, value;
    for(index = 0, length = object.length; index < length; index += 1){
        value = object[index];
        if (state.replacer) {
            value = state.replacer.call(object, String(index), value);
        }
        // Write only valid elements, put null instead of invalid elements.
        if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
            if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
    var _result = "", _tag = state.tag, index, length, value;
    for(index = 0, length = object.length; index < length; index += 1){
        value = object[index];
        if (state.replacer) {
            value = state.replacer.call(object, String(index), value);
        }
        // Write only valid elements, put null instead of invalid elements.
        if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
            if (!compact || _result !== "") {
                _result += generateNextLine(state, level);
            }
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                _result += "-";
            } else {
                _result += "- ";
            }
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || "[]"; // Empty sequence if no valid values.
}
function writeFlowMapping(state, level, object) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (_result !== "") pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) {
            objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level, objectKey, false, false)) {
            continue; // Skip this pair because of invalid key;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
            continue; // Skip this pair because of invalid value.
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
        // Default sorting
        objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
        // Custom sort function
        objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
        // Something is wrong
        throw new exception("sortKeys must be a boolean or a function");
    }
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (!compact || _result !== "") {
            pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) {
            objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
            continue; // Skip this pair because of invalid key.
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += "?";
            } else {
                pairBuffer += "? ";
            }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue; // Skip this pair because of invalid value.
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += ":";
        } else {
            pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}"; // Empty mapping if no valid pairs.
}
function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for(index = 0, length = typeList.length; index < length; index += 1){
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
            if (explicit) {
                if (type.multi && type.representName) {
                    state.tag = type.representName(object);
                } else {
                    state.tag = type.tag;
                }
            } else {
                state.tag = "?";
            }
            if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if (_toString.call(type.represent) === "[object Function]") {
                    _result = type.represent(object, style);
                } else if (_hasOwnProperty.call(type.represent, style)) {
                    _result = type.represent[style](object, style);
                } else {
                    throw new exception("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
                }
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
        detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
    } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
            if (block && Object.keys(state.dump).length !== 0) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + state.dump;
                }
            } else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + " " + state.dump;
                }
            }
        } else if (type === "[object Array]") {
            if (block && state.dump.length !== 0) {
                if (state.noArrayIndent && !isblockseq && level > 0) {
                    writeBlockSequence(state, level - 1, state.dump, compact);
                } else {
                    writeBlockSequence(state, level, state.dump, compact);
                }
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + state.dump;
                }
            } else {
                writeFlowSequence(state, level, state.dump);
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + " " + state.dump;
                }
            }
        } else if (type === "[object String]") {
            if (state.tag !== "?") {
                writeScalar(state, state.dump, level, iskey, inblock);
            }
        } else if (type === "[object Undefined]") {
            return false;
        } else {
            if (state.skipInvalid) return false;
            throw new exception("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
            // Need to encode all characters except those allowed by the spec:
            //
            // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
            // [36] ns-hex-digit    ::=  ns-dec-digit
            //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
            // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
            // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
            // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
            //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
            //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
            //
            // Also need to encode '!' because it has special meaning (end of tag prefix).
            //
            tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
            if (state.tag[0] === "!") {
                tagStr = "!" + tagStr;
            } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
                tagStr = "!!" + tagStr.slice(18);
            } else {
                tagStr = "!<" + tagStr + ">";
            }
            state.dump = tagStr + " " + state.dump;
        }
    }
    return true;
}
function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for(index = 0, length = duplicatesIndexes.length; index < length; index += 1){
        state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
            if (duplicatesIndexes.indexOf(index) === -1) {
                duplicatesIndexes.push(index);
            }
        } else {
            objects.push(object);
            if (Array.isArray(object)) {
                for(index = 0, length = object.length; index < length; index += 1){
                    inspectNode(object[index], objects, duplicatesIndexes);
                }
            } else {
                objectKeyList = Object.keys(object);
                for(index = 0, length = objectKeyList.length; index < length; index += 1){
                    inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                }
            }
        }
    }
}
function dump$1(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) {
        value = state.replacer.call({
            "": value
        }, "", value);
    }
    if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
    return "";
}
var dump_1 = dump$1;
var dumper = {
    dump: dump_1
};
function renamed(from, to) {
    return function() {
        throw new Error("Function yaml." + from + " is removed in js-yaml 4. " + "Use yaml." + to + " instead, which is now safe by default.");
    };
}
var Type = type;
var Schema = js_yaml_schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default;
var js_yaml_load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
// Re-export all types in case user wants to create custom schema
var types = {
    binary: binary,
    float: js_yaml_float,
    map: map,
    null: _null,
    pairs: pairs,
    set: set,
    timestamp: timestamp,
    bool: bool,
    int: js_yaml_int,
    merge: merge,
    omap: omap,
    seq: seq,
    str: str
};
// Removed functions from JS-YAML 3.0.x
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
    Type: Type,
    Schema: Schema,
    FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
    JSON_SCHEMA: JSON_SCHEMA,
    CORE_SCHEMA: CORE_SCHEMA,
    DEFAULT_SCHEMA: DEFAULT_SCHEMA,
    load: js_yaml_load,
    loadAll: loadAll,
    dump: dump,
    YAMLException: YAMLException,
    types: types,
    safeLoad: safeLoad,
    safeLoadAll: safeLoadAll,
    safeDump: safeDump
};
/* harmony default export */ const js_yaml = ((/* unused pure expression or super */ null && (jsYaml)));


;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/openapi.js

class openapi_OpenAPISpec {
    constructor(document){
        Object.defineProperty(this, "document", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: document
        });
    }
    get baseUrl() {
        return this.document.servers ? this.document.servers[0].url : undefined;
    }
    getPathsStrict() {
        if (!this.document.paths) {
            throw new Error("No paths found in spec");
        }
        return this.document.paths;
    }
    getParametersStrict() {
        if (!this.document.components?.parameters) {
            throw new Error("No parameters found in spec");
        }
        return this.document.components.parameters;
    }
    getSchemasStrict() {
        if (!this.document.components?.schemas) {
            throw new Error("No schemas found in spec.");
        }
        return this.document.components.schemas;
    }
    getRequestBodiesStrict() {
        if (!this.document.components?.requestBodies) {
            throw new Error("No request body found in spec.");
        }
        return this.document.components.requestBodies;
    }
    getPathStrict(path) {
        const pathItem = this.getPathsStrict()[path];
        if (pathItem === undefined) {
            throw new Error(`No path found for "${path}".`);
        }
        return pathItem;
    }
    getReferencedParameter(ref) {
        const refComponents = ref.$ref.split("/");
        const refName = refComponents[refComponents.length - 1];
        if (this.getParametersStrict()[refName] === undefined) {
            throw new Error(`No parameter found for "${refName}".`);
        }
        return this.getParametersStrict()[refName];
    }
    getRootReferencedParameter(ref) {
        let parameter = this.getReferencedParameter(ref);
        while(parameter.$ref !== undefined){
            parameter = this.getReferencedParameter(parameter);
        }
        return parameter;
    }
    getReferencedSchema(ref) {
        const refComponents = ref.$ref.split("/");
        const refName = refComponents[refComponents.length - 1];
        const schema = this.getSchemasStrict()[refName];
        if (schema === undefined) {
            throw new Error(`No schema found for "${refName}".`);
        }
        return schema;
    }
    getSchema(schema) {
        if (schema.$ref !== undefined) {
            return this.getReferencedSchema(schema);
        }
        return schema;
    }
    getRootReferencedSchema(ref) {
        let schema = this.getReferencedSchema(ref);
        while(schema.$ref !== undefined){
            schema = this.getReferencedSchema(schema);
        }
        return schema;
    }
    getReferencedRequestBody(ref) {
        const refComponents = ref.$ref.split("/");
        const refName = refComponents[refComponents.length - 1];
        const requestBodies = this.getRequestBodiesStrict();
        if (requestBodies[refName] === undefined) {
            throw new Error(`No request body found for "${refName}"`);
        }
        return requestBodies[refName];
    }
    getRootReferencedRequestBody(ref) {
        let requestBody = this.getReferencedRequestBody(ref);
        while(requestBody.$ref !== undefined){
            requestBody = this.getReferencedRequestBody(requestBody);
        }
        return requestBody;
    }
    getMethodsForPath(path) {
        const pathItem = this.getPathStrict(path);
        // This is an enum in the underlying package.
        // Werestate here to allow "import type" above and not cause warnings in certain envs.
        const possibleMethods = [
            "get",
            "put",
            "post",
            "delete",
            "options",
            "head",
            "patch",
            "trace"
        ];
        return possibleMethods.filter((possibleMethod)=>pathItem[possibleMethod] !== undefined);
    }
    getParametersForPath(path) {
        const pathItem = this.getPathStrict(path);
        if (pathItem.parameters === undefined) {
            return [];
        }
        return pathItem.parameters.map((parameter)=>{
            if (parameter.$ref !== undefined) {
                return this.getRootReferencedParameter(parameter);
            }
            return parameter;
        });
    }
    getOperation(path, method) {
        const pathItem = this.getPathStrict(path);
        if (pathItem[method] === undefined) {
            throw new Error(`No ${method} method found for "path".`);
        }
        return pathItem[method];
    }
    getParametersForOperation(operation) {
        if (operation.parameters === undefined) {
            return [];
        }
        return operation.parameters.map((parameter)=>{
            if (parameter.$ref !== undefined) {
                return this.getRootReferencedParameter(parameter);
            }
            return parameter;
        });
    }
    getRequestBodyForOperation(operation) {
        const { requestBody } = operation;
        if (requestBody?.$ref !== undefined) {
            return this.getRootReferencedRequestBody(requestBody);
        }
        return requestBody;
    }
    static getCleanedOperationId(operation, path, method) {
        let { operationId } = operation;
        if (operationId === undefined) {
            const updatedPath = path.replace(/[^a-zA-Z0-9]/, "_");
            operationId = `${updatedPath.startsWith("/") ? updatedPath.slice(1) : updatedPath}_${method}`;
        }
        return operationId.replace("-", "_").replace(".", "_").replace("/", "_");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static alertUnsupportedSpec(document) {
        const warningMessage = "This may result in degraded performance. Convert your OpenAPI spec to 3.1.0 for better support.";
        const swaggerVersion = document.swagger;
        const openAPIVersion = document.openapi;
        if (openAPIVersion !== undefined && openAPIVersion !== "3.1.0") {
            console.warn(`Attempting to load an OpenAPI ${openAPIVersion} spec. ${warningMessage}`);
        } else if (swaggerVersion !== undefined) {
            console.warn(`Attempting to load a Swagger ${swaggerVersion} spec. ${warningMessage}`);
        } else {
            throw new Error(`Attempting to load an unsupported spec:\n\n${JSON.stringify(document, null, 2)}.`);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromObject(document) {
        openapi_OpenAPISpec.alertUnsupportedSpec(document);
        return new openapi_OpenAPISpec(document);
    }
    static fromString(rawString) {
        let document;
        try {
            document = JSON.parse(rawString);
        } catch (e) {
            document = yaml.load(rawString);
        }
        return openapi_OpenAPISpec.fromObject(document);
    }
    static async fromURL(url) {
        const response = await fetch(url);
        const rawDocument = await response.text();
        return openapi_OpenAPISpec.fromString(rawDocument);
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chat_models/openai.js + 3 modules
var openai = __webpack_require__(91619);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/chat.js
var chat = __webpack_require__(58912);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/openai_functions/openapi.js







function formatURL(url, pathParams) {
    const expectedPathParamNames = [
        ...url.matchAll(/{(.*?)}/g)
    ].map((match)=>match[1]);
    const newParams = {};
    for (const paramName of expectedPathParamNames){
        const cleanParamName = paramName.replace(/^\.;/, "").replace(/\*$/, "");
        const value = pathParams[cleanParamName];
        let formattedValue;
        if (Array.isArray(value)) {
            if (paramName.startsWith(".")) {
                const separator = paramName.endsWith("*") ? "." : ",";
                formattedValue = `.${value.join(separator)}`;
            } else if (paramName.startsWith(",")) {
                const separator = paramName.endsWith("*") ? `${cleanParamName}=` : ",";
                formattedValue = `${cleanParamName}=${value.join(separator)}`;
            } else {
                formattedValue = value.join(",");
            }
        } else if (typeof value === "object") {
            const kvSeparator = paramName.endsWith("*") ? "=" : ",";
            const kvStrings = Object.entries(value).map(([k, v])=>k + kvSeparator + v);
            let entrySeparator;
            if (paramName.startsWith(".")) {
                entrySeparator = ".";
                formattedValue = ".";
            } else if (paramName.startsWith(";")) {
                entrySeparator = ";";
                formattedValue = ";";
            } else {
                entrySeparator = ",";
                formattedValue = "";
            }
            formattedValue += kvStrings.join(entrySeparator);
        } else {
            if (paramName.startsWith(".")) {
                formattedValue = `.${value}`;
            } else if (paramName.startsWith(";")) {
                formattedValue = `;${cleanParamName}=${value}`;
            } else {
                formattedValue = value;
            }
        }
        newParams[paramName] = formattedValue;
    }
    let formattedUrl = url;
    for (const [key, newValue] of Object.entries(newParams)){
        formattedUrl = formattedUrl.replace(`{${key}}`, newValue);
    }
    return formattedUrl;
}
function convertOpenAPIParamsToJSONSchema(params, spec) {
    return params.reduce((jsonSchema, param)=>{
        let schema;
        if (param.schema) {
            schema = spec.getSchema(param.schema);
            // eslint-disable-next-line no-param-reassign
            jsonSchema.properties[param.name] = convertOpenAPISchemaToJSONSchema(schema, spec);
        } else if (param.content) {
            const mediaTypeSchema = Object.values(param.content)[0].schema;
            if (mediaTypeSchema) {
                schema = spec.getSchema(mediaTypeSchema);
            }
            if (!schema) {
                return jsonSchema;
            }
            if (schema.description === undefined) {
                schema.description = param.description ?? "";
            }
            // eslint-disable-next-line no-param-reassign
            jsonSchema.properties[param.name] = convertOpenAPISchemaToJSONSchema(schema, spec);
        } else {
            return jsonSchema;
        }
        if (param.required && Array.isArray(jsonSchema.required)) {
            jsonSchema.required.push(param.name);
        }
        return jsonSchema;
    }, {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {}
    });
}
// OpenAI throws errors on extraneous schema properties, e.g. if "required" is set on individual ones
function convertOpenAPISchemaToJSONSchema(schema, spec) {
    if (schema.type !== "object" && schema.type !== "array") {
        return {
            type: schema.type ?? "string"
        };
    }
    return Object.keys(schema.properties ?? {}).reduce((jsonSchema, propertyName)=>{
        if (!schema.properties) {
            return jsonSchema;
        }
        const openAPIProperty = spec.getSchema(schema.properties[propertyName]);
        if (openAPIProperty.type === undefined) {
            return jsonSchema;
        }
        // eslint-disable-next-line no-param-reassign
        jsonSchema.properties[propertyName] = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: openAPIProperty.type,
            description: openAPIProperty.description
        };
        if (openAPIProperty.required && jsonSchema.required !== undefined) {
            jsonSchema.required.push(propertyName);
        }
        return jsonSchema;
    }, {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {}
    });
}
function convertOpenAPISpecToOpenAIFunctions(spec) {
    if (!spec.document.paths) {
        return {
            openAIFunctions: []
        };
    }
    const openAIFunctions = [];
    const nameToCallMap = {};
    for (const path of Object.keys(spec.document.paths)){
        const pathParameters = spec.getParametersForPath(path);
        for (const method of spec.getMethodsForPath(path)){
            const operation = spec.getOperation(path, method);
            if (!operation) {
                return {
                    openAIFunctions: []
                };
            }
            const operationParametersByLocation = pathParameters.concat(spec.getParametersForOperation(operation)).reduce((operationParams, param)=>{
                if (!operationParams[param.in]) {
                    // eslint-disable-next-line no-param-reassign
                    operationParams[param.in] = [];
                }
                operationParams[param.in].push(param);
                return operationParams;
            }, {});
            const paramLocationToRequestArgNameMap = {
                query: "params",
                header: "headers",
                cookie: "cookies",
                path: "path_params"
            };
            const requestArgsSchema = {};
            for (const paramLocation of Object.keys(paramLocationToRequestArgNameMap)){
                if (operationParametersByLocation[paramLocation]) {
                    requestArgsSchema[paramLocationToRequestArgNameMap[paramLocation]] = convertOpenAPIParamsToJSONSchema(operationParametersByLocation[paramLocation], spec);
                }
            }
            const requestBody = spec.getRequestBodyForOperation(operation);
            if (requestBody?.content !== undefined) {
                const requestBodySchemas = {};
                for (const [mediaType, mediaTypeObject] of Object.entries(requestBody.content)){
                    if (mediaTypeObject.schema !== undefined) {
                        const schema = spec.getSchema(mediaTypeObject.schema);
                        requestBodySchemas[mediaType] = convertOpenAPISchemaToJSONSchema(schema, spec);
                    }
                }
                const mediaTypes = Object.keys(requestBodySchemas);
                if (mediaTypes.length === 1) {
                    requestArgsSchema.data = requestBodySchemas[mediaTypes[0]];
                } else if (mediaTypes.length > 1) {
                    requestArgsSchema.data = {
                        anyOf: Object.values(requestBodySchemas)
                    };
                }
            }
            const openAIFunction = {
                name: OpenAPISpec.getCleanedOperationId(operation, path, method),
                description: operation.description ?? operation.summary ?? "",
                parameters: {
                    type: "object",
                    properties: requestArgsSchema,
                    // All remaining top-level parameters are required
                    required: Object.keys(requestArgsSchema)
                }
            };
            openAIFunctions.push(openAIFunction);
            const baseUrl = (spec.baseUrl ?? "").endsWith("/") ? (spec.baseUrl ?? "").slice(0, -1) : spec.baseUrl ?? "";
            nameToCallMap[openAIFunction.name] = {
                method,
                url: baseUrl + path
            };
        }
    }
    return {
        openAIFunctions,
        defaultExecutionMethod: async (name, // eslint-disable-next-line @typescript-eslint/no-explicit-any
        requestArgs, options)=>{
            const { headers: customHeaders, params: customParams, ...rest } = options ?? {};
            const { method, url } = nameToCallMap[name];
            const requestParams = requestArgs.params ?? {};
            const nonEmptyParams = Object.keys(requestParams).reduce(// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (filteredArgs, argName)=>{
                if (requestParams[argName] !== "" && requestParams[argName] !== null && requestParams[argName] !== undefined) {
                    // eslint-disable-next-line no-param-reassign
                    filteredArgs[argName] = requestParams[argName];
                }
                return filteredArgs;
            }, {});
            const queryString = new URLSearchParams({
                ...nonEmptyParams,
                ...customParams
            }).toString();
            const pathParams = requestArgs.path_params;
            const formattedUrl = formatURL(url, pathParams) + (queryString.length ? `?${queryString}` : "");
            const headers = {};
            let body;
            if (requestArgs.data !== undefined) {
                let contentType = "text/plain";
                if (typeof requestArgs.data !== "string") {
                    if (typeof requestArgs.data === "object") {
                        contentType = "application/json";
                    }
                    body = JSON.stringify(requestArgs.data);
                } else {
                    body = requestArgs.data;
                }
                headers["content-type"] = contentType;
            }
            const response = await fetch(formattedUrl, {
                ...requestArgs,
                method,
                headers: {
                    ...headers,
                    ...requestArgs.headers,
                    ...customHeaders
                },
                body,
                ...rest
            });
            let output;
            if (response.status < 200 || response.status > 299) {
                output = `${response.status}: ${response.statusText} for ${name} called with ${JSON.stringify(queryString)}`;
            } else {
                output = await response.text();
            }
            return output;
        }
    };
}
class SimpleRequestChain extends (/* unused pure expression or super */ null && (BaseChain)) {
    constructor(config){
        super();
        Object.defineProperty(this, "requestMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "function"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "response"
        });
        this.requestMethod = config.requestMethod;
    }
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
    _chainType() {
        return "simple_request_chain";
    }
    /** @ignore */ async _call(values, _runManager) {
        const inputKeyValue = values[this.inputKey];
        const methodName = inputKeyValue.name;
        const args = inputKeyValue.arguments;
        const response = await this.requestMethod(methodName, args);
        return {
            [this.outputKey]: response
        };
    }
}
/**
 * Create a chain for querying an API from a OpenAPI spec.
 * @param spec OpenAPISpec or url/file/text string corresponding to one.
 * @param options Custom options passed into the chain
 * @returns OpenAPIChain
 */ async function createOpenAPIChain(spec, options = {}) {
    let convertedSpec;
    if (typeof spec === "string") {
        try {
            convertedSpec = await OpenAPISpec.fromURL(spec);
        } catch (e) {
            try {
                convertedSpec = OpenAPISpec.fromString(spec);
            } catch (e) {
                throw new Error(`Unable to parse spec from source ${spec}.`);
            }
        }
    } else {
        convertedSpec = OpenAPISpec.fromObject(spec);
    }
    const { openAIFunctions, defaultExecutionMethod } = convertOpenAPISpecToOpenAIFunctions(convertedSpec);
    if (defaultExecutionMethod === undefined) {
        throw new Error(`Could not parse any valid operations from the provided spec.`);
    }
    const { llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo-0613"
    }), prompt = ChatPromptTemplate.fromPromptMessages([
        HumanMessagePromptTemplate.fromTemplate("Use the provided API's to respond to this user query:\n\n{query}")
    ]), requestChain = new SimpleRequestChain({
        requestMethod: async (name, args)=>defaultExecutionMethod(name, args, {
                headers: options.headers,
                params: options.params
            })
    }), llmChainInputs = {}, verbose, ...rest } = options;
    const formatChain = new LLMChain({
        llm,
        prompt,
        outputParser: new JsonOutputFunctionsParser({
            argsOnly: false
        }),
        outputKey: "function",
        llmKwargs: {
            functions: openAIFunctions
        },
        ...llmChainInputs
    });
    return new SequentialChain({
        chains: [
            formatChain,
            requestChain
        ],
        outputVariables: [
            "response"
        ],
        inputVariables: formatChain.inputKeys,
        verbose,
        ...rest
    });
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/index.js

























;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/chains.js



/***/ }),

/***/ 32757:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* reexport safe */ _dist_chat_models_openai_js__WEBPACK_IMPORTED_MODULE_0__.ChatOpenAI)
/* harmony export */ });
/* harmony import */ var _dist_chat_models_openai_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91619);



/***/ }),

/***/ 30753:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _i: () => (/* binding */ getModelNameForTiktoken)
/* harmony export */ });
/* unused harmony exports getEmbeddingContextSize, getModelContextSize, calculateMaxTokens */
/* harmony import */ var _util_tiktoken_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67464);

// https://www.npmjs.com/package/js-tiktoken
const getModelNameForTiktoken = (modelName)=>{
    if (modelName.startsWith("gpt-3.5-turbo-16k")) {
        return "gpt-3.5-turbo-16k";
    }
    if (modelName.startsWith("gpt-3.5-turbo-")) {
        return "gpt-3.5-turbo";
    }
    if (modelName.startsWith("gpt-4-32k")) {
        return "gpt-4-32k";
    }
    if (modelName.startsWith("gpt-4-")) {
        return "gpt-4";
    }
    return modelName;
};
const getEmbeddingContextSize = (modelName)=>{
    switch(modelName){
        case "text-embedding-ada-002":
            return 8191;
        default:
            return 2046;
    }
};
const getModelContextSize = (modelName)=>{
    switch(getModelNameForTiktoken(modelName)){
        case "gpt-3.5-turbo-16k":
            return 16384;
        case "gpt-3.5-turbo":
            return 4096;
        case "gpt-4-32k":
            return 32768;
        case "gpt-4":
            return 8192;
        case "text-davinci-003":
            return 4097;
        case "text-curie-001":
            return 2048;
        case "text-babbage-001":
            return 2048;
        case "text-ada-001":
            return 2048;
        case "code-davinci-002":
            return 8000;
        case "code-cushman-001":
            return 2048;
        default:
            return 4097;
    }
};
const calculateMaxTokens = async ({ prompt, modelName })=>{
    let numTokens;
    try {
        numTokens = (await encodingForModel(modelName)).encode(prompt).length;
    } catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count");
        // fallback to approximate calculation if tiktoken is not available
        numTokens = Math.ceil(prompt.length / 4);
    }
    const maxTokens = getModelContextSize(modelName);
    return maxTokens - numTokens;
};


/***/ }),

/***/ 90470:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  BD: () => (/* binding */ BaseLangChain),
  qV: () => (/* binding */ BaseLanguageModel)
});

// UNUSED EXPORTS: calculateMaxTokens

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/async_caller.js
var async_caller = __webpack_require__(67106);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/base_language/count_tokens.js
var count_tokens = __webpack_require__(30753);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/tiktoken.js + 3 modules
var tiktoken = __webpack_require__(67464);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/load/serializable.js + 1 modules
var serializable = __webpack_require__(24655);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/stream.js
var stream = __webpack_require__(73324);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/schema/runnable.js


class Runnable extends serializable/* Serializable */.i {
    _getOptionsList(options, length = 0) {
        if (Array.isArray(options)) {
            if (options.length !== length) {
                throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
            }
            return options;
        }
        return Array.from({
            length
        }, ()=>options);
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const batchSize = batchOptions?.maxConcurrency && batchOptions.maxConcurrency > 0 ? batchOptions?.maxConcurrency : inputs.length;
        const batchResults = [];
        for(let i = 0; i < inputs.length; i += batchSize){
            const batchPromises = inputs.slice(i, i + batchSize).map((input, i)=>this.invoke(input, configList[i]));
            const batchResult = await Promise.all(batchPromises);
            batchResults.push(batchResult);
        }
        return batchResults.flat();
    }
    async *_streamIterator(input, options) {
        yield this.invoke(input, options);
    }
    async stream(input, options) {
        return stream/* IterableReadableStream */.Q.fromAsyncGenerator(this._streamIterator(input, options));
    }
    _separateRunnableConfigFromCallOptions(options) {
        const runnableConfig = {
            callbacks: options.callbacks,
            tags: options.tags,
            metadata: options.metadata
        };
        const callOptions = {
            ...options
        };
        delete callOptions.callbacks;
        delete callOptions.tags;
        delete callOptions.metadata;
        return [
            runnableConfig,
            callOptions
        ];
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/base.js
var base = __webpack_require__(12588);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/chat.js
var chat = __webpack_require__(58912);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/base_language/index.js






const getVerbosity = ()=>false;
/**
 * Base class for language models, chains, tools.
 */ class BaseLangChain extends Runnable {
    get lc_attributes() {
        return {
            callbacks: undefined,
            verbose: undefined
        };
    }
    constructor(params){
        super(params);
        /**
         * Whether to print out response text.
         */ Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "callbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.verbose = params.verbose ?? getVerbosity();
        this.callbacks = params.callbacks;
        this.tags = params.tags ?? [];
        this.metadata = params.metadata ?? {};
    }
}
/**
 * Base class for language models.
 */ class BaseLanguageModel extends BaseLangChain {
    /**
     * Keys that the language model accepts as call options.
     */ get callKeys() {
        return [
            "stop",
            "timeout",
            "signal",
            "tags",
            "metadata",
            "callbacks"
        ];
    }
    constructor({ callbacks, callbackManager, ...params }){
        super({
            callbacks: callbacks ?? callbackManager,
            ...params
        });
        /**
         * The async caller should be used by subclasses to make any async calls,
         * which will thus benefit from the concurrency and retry logic.
         */ Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_encoding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = new async_caller/* AsyncCaller */.L(params ?? {});
    }
    async getNumTokens(text) {
        // fallback to approximate calculation if tiktoken is not available
        let numTokens = Math.ceil(text.length / 4);
        if (!this._encoding) {
            try {
                this._encoding = await (0,tiktoken/* encodingForModel */.b)("modelName" in this ? (0,count_tokens/* getModelNameForTiktoken */._i)(this.modelName) : "gpt2");
            } catch (error) {
                console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
            }
        }
        if (this._encoding) {
            numTokens = this._encoding.encode(text).length;
        }
        return numTokens;
    }
    static _convertInputToPromptValue(input) {
        if (typeof input === "string") {
            return new base/* StringPromptValue */.nw(input);
        } else if (Array.isArray(input)) {
            return new chat/* ChatPromptValue */.GU(input);
        } else {
            return input;
        }
    }
    /**
     * Get the identifying parameters of the LLM.
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    /**
     * @deprecated
     * Return a json-like object representing this LLM.
     */ serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType()
        };
    }
    /**
     * @deprecated
     * Load an LLM from a json-like object describing it.
     */ static async deserialize(data) {
        const { _type, _model, ...rest } = data;
        if (_model && _model !== "base_chat_model") {
            throw new Error(`Cannot load LLM with model ${_model}`);
        }
        const Cls = {
            openai: (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 91619))).ChatOpenAI
        }[_type];
        if (Cls === undefined) {
            throw new Error(`Cannot load LLM with type ${_type}`);
        }
        return new Cls(rest);
    }
}
/*
 * Calculate max tokens for given model and prompt.
 * That is the model size - number of tokens in prompt.
 */ 


/***/ }),

/***/ 9771:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  APIChain: () => (/* binding */ APIChain)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/base.js
var base = __webpack_require__(79144);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/llm_chain.js + 1 modules
var llm_chain = __webpack_require__(83434);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/prompt.js
var prompts_prompt = __webpack_require__(80037);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/api/prompts.js
/* eslint-disable spaced-comment */ 
const API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate the full API url to call for answering the user question.
You should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
API url:`;
const API_URL_PROMPT_TEMPLATE = /* #__PURE__ */ new prompts_prompt.PromptTemplate({
    inputVariables: [
        "api_docs",
        "question"
    ],
    template: API_URL_RAW_PROMPT_TEMPLATE
});
const API_RESPONSE_RAW_PROMPT_TEMPLATE = `${API_URL_RAW_PROMPT_TEMPLATE} {api_url}

Here is the response from the API:

{api_response}

Summarize this response to answer the original question.

Summary:`;
const API_RESPONSE_PROMPT_TEMPLATE = /* #__PURE__ */ new prompts_prompt.PromptTemplate({
    inputVariables: [
        "api_docs",
        "question",
        "api_url",
        "api_response"
    ],
    template: API_RESPONSE_RAW_PROMPT_TEMPLATE
});

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/api/api_chain.js



class APIChain extends base/* BaseChain */.l {
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "apiAnswerChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiRequestChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "question"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        this.apiRequestChain = fields.apiRequestChain;
        this.apiAnswerChain = fields.apiAnswerChain;
        this.apiDocs = fields.apiDocs;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.headers = fields.headers ?? this.headers;
    }
    /** @ignore */ async _call(values, runManager) {
        const question = values[this.inputKey];
        const api_url = await this.apiRequestChain.predict({
            question,
            api_docs: this.apiDocs
        }, runManager?.getChild("request"));
        const res = await fetch(api_url, {
            headers: this.headers
        });
        const api_response = await res.text();
        const answer = await this.apiAnswerChain.predict({
            question,
            api_docs: this.apiDocs,
            api_url,
            api_response
        }, runManager?.getChild("response"));
        return {
            [this.outputKey]: answer
        };
    }
    _chainType() {
        return "api_chain";
    }
    static async deserialize(data) {
        const { api_request_chain, api_answer_chain, api_docs } = data;
        if (!api_request_chain) {
            throw new Error("LLMChain must have api_request_chain");
        }
        if (!api_answer_chain) {
            throw new Error("LLMChain must have api_answer_chain");
        }
        if (!api_docs) {
            throw new Error("LLMChain must have api_docs");
        }
        return new APIChain({
            apiAnswerChain: await llm_chain.LLMChain.deserialize(api_answer_chain),
            apiRequestChain: await llm_chain.LLMChain.deserialize(api_request_chain),
            apiDocs: api_docs
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            api_answer_chain: this.apiAnswerChain.serialize(),
            api_request_chain: this.apiRequestChain.serialize(),
            api_docs: this.apiDocs
        };
    }
    static fromLLMAndAPIDocs(llm, apiDocs, options = {}) {
        const { apiUrlPrompt = API_URL_PROMPT_TEMPLATE, apiResponsePrompt = API_RESPONSE_PROMPT_TEMPLATE } = options;
        const apiRequestChain = new llm_chain.LLMChain({
            prompt: apiUrlPrompt,
            llm
        });
        const apiAnswerChain = new llm_chain.LLMChain({
            prompt: apiResponsePrompt,
            llm
        });
        return new this({
            apiAnswerChain,
            apiRequestChain,
            apiDocs,
            ...options
        });
    }
}


/***/ }),

/***/ 79144:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ BaseChain)
/* harmony export */ });
/* harmony import */ var _schema_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18585);
/* harmony import */ var _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71538);
/* harmony import */ var _base_language_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90470);



/**
 * Base interface that all chains must implement.
 */ class BaseChain extends _base_language_index_js__WEBPACK_IMPORTED_MODULE_2__/* .BaseLangChain */ .BD {
    get lc_namespace() {
        return [
            "langchain",
            "chains",
            this._chainType()
        ];
    }
    constructor(fields, /** @deprecated */ verbose, /** @deprecated */ callbacks){
        if (arguments.length === 1 && typeof fields === "object" && !("saveContext" in fields)) {
            // fields is not a BaseMemory
            const { memory, callbackManager, ...rest } = fields;
            super({
                ...rest,
                callbacks: callbackManager ?? rest.callbacks
            });
            this.memory = memory;
        } else {
            // fields is a BaseMemory
            super({
                verbose,
                callbacks
            });
            this.memory = fields;
        }
    }
    /** @ignore */ _selectMemoryInputs(values) {
        const valuesForMemory = {
            ...values
        };
        if ("signal" in valuesForMemory) {
            delete valuesForMemory.signal;
        }
        if ("timeout" in valuesForMemory) {
            delete valuesForMemory.timeout;
        }
        return valuesForMemory;
    }
    async invoke(input, config) {
        return this.call(input, config);
    }
    /**
     * Return a json-like object representing this chain.
     */ serialize() {
        throw new Error("Method not implemented.");
    }
    async run(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    input, config) {
        const inputKeys = this.inputKeys.filter((k)=>!this.memory?.memoryKeys.includes(k) ?? true);
        const isKeylessInput = inputKeys.length <= 1;
        if (!isKeylessInput) {
            throw new Error(`Chain ${this._chainType()} expects multiple inputs, cannot use 'run' `);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values = inputKeys.length ? {
            [inputKeys[0]]: input
        } : {};
        const returnValues = await this.call(values, config);
        const keys = Object.keys(returnValues);
        if (keys.length === 1) {
            return returnValues[keys[0]];
        }
        throw new Error("return values have multiple keys, `run` only supported when one key currently");
    }
    async _formatValues(values) {
        const fullValues = {
            ...values
        };
        if (fullValues.timeout && !fullValues.signal) {
            fullValues.signal = AbortSignal.timeout(fullValues.timeout);
            delete fullValues.timeout;
        }
        if (!(this.memory == null)) {
            const newValues = await this.memory.loadMemoryVariables(this._selectMemoryInputs(values));
            for (const [key, value] of Object.entries(newValues)){
                fullValues[key] = value;
            }
        }
        return fullValues;
    }
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */ async call(values, config, /** @deprecated */ tags) {
        const fullValues = await this._formatValues(values);
        const parsedConfig = (0,_callbacks_manager_js__WEBPACK_IMPORTED_MODULE_1__/* .parseCallbackConfigArg */ .QH)(config);
        const callbackManager_ = await _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_1__/* .CallbackManager */ .Ye.configure(parsedConfig.callbacks, this.callbacks, parsedConfig.tags || tags, this.tags, parsedConfig.metadata, this.metadata, {
            verbose: this.verbose
        });
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), fullValues);
        let outputValues;
        try {
            outputValues = await (values.signal ? Promise.race([
                this._call(fullValues, runManager),
                new Promise((_, reject)=>{
                    values.signal?.addEventListener("abort", ()=>{
                        reject(new Error("AbortError"));
                    });
                })
            ]) : this._call(fullValues, runManager));
        } catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        if (!(this.memory == null)) {
            await this.memory.saveContext(this._selectMemoryInputs(values), outputValues);
        }
        await runManager?.handleChainEnd(outputValues);
        // add the runManager's currentRunId to the outputValues
        Object.defineProperty(outputValues, _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .RUN_KEY */ .WH, {
            value: runManager ? {
                runId: runManager?.runId
            } : undefined,
            configurable: true
        });
        return outputValues;
    }
    /**
     * Call the chain on all inputs in the list
     */ async apply(inputs, config) {
        return Promise.all(inputs.map(async (i, idx)=>this.call(i, config?.[idx])));
    }
    /**
     * Load a chain from a json-like object describing it.
     */ static async deserialize(data, values = {}) {
        switch(data._type){
            case "llm_chain":
                {
                    const { LLMChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 83434));
                    return LLMChain.deserialize(data);
                }
            case "sequential_chain":
                {
                    const { SequentialChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 88780));
                    return SequentialChain.deserialize(data);
                }
            case "simple_sequential_chain":
                {
                    const { SimpleSequentialChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 88780));
                    return SimpleSequentialChain.deserialize(data);
                }
            case "stuff_documents_chain":
                {
                    const { StuffDocumentsChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 25825));
                    return StuffDocumentsChain.deserialize(data);
                }
            case "map_reduce_documents_chain":
                {
                    const { MapReduceDocumentsChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 25825));
                    return MapReduceDocumentsChain.deserialize(data);
                }
            case "refine_documents_chain":
                {
                    const { RefineDocumentsChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 25825));
                    return RefineDocumentsChain.deserialize(data);
                }
            case "vector_db_qa":
                {
                    const { VectorDBQAChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 69491));
                    return VectorDBQAChain.deserialize(data, values);
                }
            case "api_chain":
                {
                    const { APIChain } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 9771));
                    return APIChain.deserialize(data);
                }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}


/***/ }),

/***/ 25825:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapReduceDocumentsChain: () => (/* binding */ MapReduceDocumentsChain),
/* harmony export */   RefineDocumentsChain: () => (/* binding */ RefineDocumentsChain),
/* harmony export */   StuffDocumentsChain: () => (/* binding */ StuffDocumentsChain)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79144);
/* harmony import */ var _llm_chain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83434);
/* harmony import */ var _prompts_prompt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80037);



/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */ class StuffDocumentsChain extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseChain */ .l {
    get inputKeys() {
        return [
            this.inputKey,
            ...this.llmChain.inputKeys
        ].filter((key)=>key !== this.documentVariableName);
    }
    get outputKeys() {
        return this.llmChain.outputKeys;
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
        });
        Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
        });
        this.llmChain = fields.llmChain;
        this.documentVariableName = fields.documentVariableName ?? this.documentVariableName;
        this.inputKey = fields.inputKey ?? this.inputKey;
    }
    /** @ignore */ _prepInputs(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: docs, ...rest } = values;
        const texts = docs.map(({ pageContent })=>pageContent);
        const text = texts.join("\n\n");
        return {
            ...rest,
            [this.documentVariableName]: text
        };
    }
    /** @ignore */ async _call(values, runManager) {
        const result = await this.llmChain.call(this._prepInputs(values), runManager?.getChild("combine_documents"));
        return result;
    }
    _chainType() {
        return "stuff_documents_chain";
    }
    static async deserialize(data) {
        if (!data.llm_chain) {
            throw new Error("Missing llm_chain");
        }
        return new StuffDocumentsChain({
            llmChain: await _llm_chain_js__WEBPACK_IMPORTED_MODULE_1__.LLMChain.deserialize(data.llm_chain)
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize()
        };
    }
}
/**
 * Combine documents by mapping a chain over them, then combining results.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */ class MapReduceDocumentsChain extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseChain */ .l {
    get inputKeys() {
        return [
            this.inputKey,
            ...this.combineDocumentChain.inputKeys
        ];
    }
    get outputKeys() {
        return this.combineDocumentChain.outputKeys;
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
        });
        Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
        });
        Object.defineProperty(this, "returnIntermediateSteps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3000
        });
        Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        Object.defineProperty(this, "ensureMapStep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "combineDocumentChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llmChain = fields.llmChain;
        this.combineDocumentChain = fields.combineDocumentChain;
        this.documentVariableName = fields.documentVariableName ?? this.documentVariableName;
        this.ensureMapStep = fields.ensureMapStep ?? this.ensureMapStep;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.maxTokens = fields.maxTokens ?? this.maxTokens;
        this.maxIterations = fields.maxIterations ?? this.maxIterations;
        this.returnIntermediateSteps = fields.returnIntermediateSteps ?? false;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: docs, ...rest } = values;
        let currentDocs = docs;
        let intermediateSteps = [];
        // For each iteration, we'll use the `llmChain` to get a new result
        for(let i = 0; i < this.maxIterations; i += 1){
            const inputs = currentDocs.map((d)=>({
                    [this.documentVariableName]: d.pageContent,
                    ...rest
                }));
            const canSkipMapStep = i !== 0 || !this.ensureMapStep;
            if (canSkipMapStep) {
                // Calculate the total tokens required in the input
                const formatted = await this.combineDocumentChain.llmChain.prompt.format(this.combineDocumentChain._prepInputs({
                    [this.combineDocumentChain.inputKey]: currentDocs,
                    ...rest
                }));
                const length = await this.combineDocumentChain.llmChain.llm.getNumTokens(formatted);
                const withinTokenLimit = length < this.maxTokens;
                // If we can skip the map step, and we're within the token limit, we don't
                // need to run the map step, so just break out of the loop.
                if (withinTokenLimit) {
                    break;
                }
            }
            const results = await this.llmChain.apply(inputs, // If we have a runManager, then we need to create a child for each input
            // so that we can track the progress of each input.
            runManager ? Array.from({
                length: inputs.length
            }, (_, i)=>runManager.getChild(`map_${i + 1}`)) : undefined);
            const { outputKey } = this.llmChain;
            // If the flag is set, then concat that to the intermediate steps
            if (this.returnIntermediateSteps) {
                intermediateSteps = intermediateSteps.concat(results.map((r)=>r[outputKey]));
            }
            currentDocs = results.map((r)=>({
                    pageContent: r[outputKey],
                    metadata: {}
                }));
        }
        // Now, with the final result of all the inputs from the `llmChain`, we can
        // run the `combineDocumentChain` over them.
        const newInputs = {
            [this.combineDocumentChain.inputKey]: currentDocs,
            ...rest
        };
        const result = await this.combineDocumentChain.call(newInputs, runManager?.getChild("combine_documents"));
        // Return the intermediate steps results if the flag is set
        if (this.returnIntermediateSteps) {
            return {
                ...result,
                intermediateSteps
            };
        }
        return result;
    }
    _chainType() {
        return "map_reduce_documents_chain";
    }
    static async deserialize(data) {
        if (!data.llm_chain) {
            throw new Error("Missing llm_chain");
        }
        if (!data.combine_document_chain) {
            throw new Error("Missing combine_document_chain");
        }
        return new MapReduceDocumentsChain({
            llmChain: await _llm_chain_js__WEBPACK_IMPORTED_MODULE_1__.LLMChain.deserialize(data.llm_chain),
            combineDocumentChain: await StuffDocumentsChain.deserialize(data.combine_document_chain)
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize(),
            combine_document_chain: this.combineDocumentChain.serialize()
        };
    }
}
/**
 * Combine documents by doing a first pass and then refining on more documents.
 * @augments BaseChain
 * @augments RefineDocumentsChainInput
 */ class RefineDocumentsChain extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseChain */ .l {
    get defaultDocumentPrompt() {
        return new _prompts_prompt_js__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate({
            inputVariables: [
                "page_content"
            ],
            template: "{page_content}"
        });
    }
    get inputKeys() {
        return [
            ...new Set([
                this.inputKey,
                ...this.llmChain.inputKeys,
                ...this.refineLLMChain.inputKeys
            ])
        ].filter((key)=>key !== this.documentVariableName && key !== this.initialResponseName);
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output_text"
        });
        Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
        });
        Object.defineProperty(this, "initialResponseName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "existing_answer"
        });
        Object.defineProperty(this, "refineLLMChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "documentPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.defaultDocumentPrompt
        });
        this.llmChain = fields.llmChain;
        this.refineLLMChain = fields.refineLLMChain;
        this.documentVariableName = fields.documentVariableName ?? this.documentVariableName;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.documentPrompt = fields.documentPrompt ?? this.documentPrompt;
        this.initialResponseName = fields.initialResponseName ?? this.initialResponseName;
    }
    /** @ignore */ async _constructInitialInputs(doc, rest) {
        const baseInfo = {
            page_content: doc.pageContent,
            ...doc.metadata
        };
        const documentInfo = {};
        this.documentPrompt.inputVariables.forEach((value)=>{
            documentInfo[value] = baseInfo[value];
        });
        const baseInputs = {
            [this.documentVariableName]: await this.documentPrompt.format({
                ...documentInfo
            })
        };
        const inputs = {
            ...baseInputs,
            ...rest
        };
        return inputs;
    }
    /** @ignore */ async _constructRefineInputs(doc, res) {
        const baseInfo = {
            page_content: doc.pageContent,
            ...doc.metadata
        };
        const documentInfo = {};
        this.documentPrompt.inputVariables.forEach((value)=>{
            documentInfo[value] = baseInfo[value];
        });
        const baseInputs = {
            [this.documentVariableName]: await this.documentPrompt.format({
                ...documentInfo
            })
        };
        const inputs = {
            [this.initialResponseName]: res,
            ...baseInputs
        };
        return inputs;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: docs, ...rest } = values;
        const currentDocs = docs;
        const initialInputs = await this._constructInitialInputs(currentDocs[0], rest);
        let res = await this.llmChain.predict({
            ...initialInputs
        }, runManager?.getChild("answer"));
        const refineSteps = [
            res
        ];
        for(let i = 1; i < currentDocs.length; i += 1){
            const refineInputs = await this._constructRefineInputs(currentDocs[i], res);
            const inputs = {
                ...refineInputs,
                ...rest
            };
            res = await this.refineLLMChain.predict({
                ...inputs
            }, runManager?.getChild("refine"));
            refineSteps.push(res);
        }
        return {
            [this.outputKey]: res
        };
    }
    _chainType() {
        return "refine_documents_chain";
    }
    static async deserialize(data) {
        const SerializedLLMChain = data.llm_chain;
        if (!SerializedLLMChain) {
            throw new Error("Missing llm_chain");
        }
        const SerializedRefineDocumentChain = data.refine_llm_chain;
        if (!SerializedRefineDocumentChain) {
            throw new Error("Missing refine_llm_chain");
        }
        return new RefineDocumentsChain({
            llmChain: await _llm_chain_js__WEBPACK_IMPORTED_MODULE_1__.LLMChain.deserialize(SerializedLLMChain),
            refineLLMChain: await _llm_chain_js__WEBPACK_IMPORTED_MODULE_1__.LLMChain.deserialize(SerializedRefineDocumentChain)
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize(),
            refine_llm_chain: this.refineLLMChain.serialize()
        };
    }
}


/***/ }),

/***/ 83434:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LLMChain: () => (/* binding */ LLMChain)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/base.js
var base = __webpack_require__(79144);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/base.js
var prompts_base = __webpack_require__(12588);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/base_language/index.js + 1 modules
var base_language = __webpack_require__(90470);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/schema/output_parser.js
var output_parser = __webpack_require__(28803);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/output_parsers/noop.js

class NoOpOutputParser extends output_parser/* BaseOutputParser */.bI {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "output_parsers",
                "default"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    parse(text) {
        return Promise.resolve(text);
    }
    getFormatInstructions() {
        return "";
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/llm_chain.js




/**
 * Chain to run queries against LLMs.
 *
 * @example
 * ```ts
 * import { LLMChain } from "langchain/chains";
 * import { OpenAI } from "langchain/llms/openai";
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = PromptTemplate.fromTemplate("Tell me a {adjective} joke");
 * const llm = new LLMChain({ llm: new OpenAI(), prompt });
 * ```
 */ class LLMChain extends base/* BaseChain */.l {
    get inputKeys() {
        return this.prompt.inputVariables;
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llmKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text"
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = fields.prompt;
        this.llm = fields.llm;
        this.llmKwargs = fields.llmKwargs;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.outputParser = fields.outputParser ?? new NoOpOutputParser();
        if (this.prompt.outputParser) {
            if (fields.outputParser) {
                throw new Error("Cannot set both outputParser and prompt.outputParser");
            }
            this.outputParser = this.prompt.outputParser;
        }
    }
    /** @ignore */ _selectMemoryInputs(values) {
        const valuesForMemory = super._selectMemoryInputs(values);
        for (const key of this.llm.callKeys){
            if (key in values) {
                delete valuesForMemory[key];
            }
        }
        return valuesForMemory;
    }
    /** @ignore */ async _getFinalOutput(generations, promptValue, runManager) {
        let finalCompletion;
        if (this.outputParser) {
            finalCompletion = await this.outputParser.parseResultWithPrompt(generations, promptValue, runManager?.getChild());
        } else {
            finalCompletion = generations[0].text;
        }
        return finalCompletion;
    }
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */ call(values, config) {
        return super.call(values, config);
    }
    /** @ignore */ async _call(values, runManager) {
        const valuesForPrompt = {
            ...values
        };
        const valuesForLLM = {
            ...this.llmKwargs
        };
        for (const key of this.llm.callKeys){
            if (key in values) {
                valuesForLLM[key] = values[key];
                delete valuesForPrompt[key];
            }
        }
        const promptValue = await this.prompt.formatPromptValue(valuesForPrompt);
        const { generations } = await this.llm.generatePrompt([
            promptValue
        ], valuesForLLM, runManager?.getChild());
        return {
            [this.outputKey]: await this._getFinalOutput(generations[0], promptValue, runManager)
        };
    }
    /**
     * Format prompt with values and pass to LLM
     *
     * @param values - keys to pass to prompt template
     * @param callbackManager - CallbackManager to use
     * @returns Completion from LLM.
     *
     * @example
     * ```ts
     * llm.predict({ adjective: "funny" })
     * ```
     */ async predict(values, callbackManager) {
        const output = await this.call(values, callbackManager);
        return output[this.outputKey];
    }
    _chainType() {
        return "llm";
    }
    static async deserialize(data) {
        const { llm, prompt } = data;
        if (!llm) {
            throw new Error("LLMChain must have llm");
        }
        if (!prompt) {
            throw new Error("LLMChain must have prompt");
        }
        return new LLMChain({
            llm: await base_language/* BaseLanguageModel */.qV.deserialize(llm),
            prompt: await prompts_base/* BasePromptTemplate */.dy.deserialize(prompt)
        });
    }
    /** @deprecated */ serialize() {
        return {
            _type: `${this._chainType()}_chain`,
            llm: this.llm.serialize(),
            prompt: this.prompt.serialize()
        };
    }
}


/***/ }),

/***/ 82072:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  dZ: () => (/* binding */ loadQAChain),
  cf: () => (/* binding */ loadQAStuffChain)
});

// UNUSED EXPORTS: loadQAMapReduceChain, loadQARefineChain

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/llm_chain.js + 1 modules
var llm_chain = __webpack_require__(83434);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/combine_docs_chain.js
var combine_docs_chain = __webpack_require__(25825);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/prompt.js
var prompts_prompt = __webpack_require__(80037);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/chat.js
var chat = __webpack_require__(58912);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/selectors/conditional.js
class BasePromptSelector {
    async getPromptAsync(llm, options) {
        const prompt = this.getPrompt(llm);
        return prompt.partial(options?.partialVariables ?? {});
    }
}
class ConditionalPromptSelector extends BasePromptSelector {
    constructor(default_prompt, conditionals = []){
        super();
        Object.defineProperty(this, "defaultPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "conditionals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.defaultPrompt = default_prompt;
        this.conditionals = conditionals;
    }
    getPrompt(llm) {
        for (const [condition, prompt] of this.conditionals){
            if (condition(llm)) {
                return prompt;
            }
        }
        return this.defaultPrompt;
    }
}
function isLLM(llm) {
    return llm._modelType() === "base_llm";
}
function isChatModel(llm) {
    return llm._modelType() === "base_chat_model";
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/question_answering/stuff_prompts.js
/* eslint-disable spaced-comment */ 


const DEFAULT_QA_PROMPT = /*#__PURE__*/ new prompts_prompt.PromptTemplate({
    template: "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:",
    inputVariables: [
        "context",
        "question"
    ]
});
const system_template = `Use the following pieces of context to answer the users question. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;
const messages = [
    /*#__PURE__*/ chat/* SystemMessagePromptTemplate */.ov.fromTemplate(system_template),
    /*#__PURE__*/ chat/* HumanMessagePromptTemplate */.kq.fromTemplate("{question}")
];
const CHAT_PROMPT = /*#__PURE__*/ chat/* ChatPromptTemplate */.ks.fromPromptMessages(messages);
const QA_PROMPT_SELECTOR = /*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_QA_PROMPT, [
    [
        isChatModel,
        CHAT_PROMPT
    ]
]);

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/question_answering/map_reduce_prompts.js
/* eslint-disable spaced-comment */ 


const qa_template = `Use the following portion of a long document to see if any of the text is relevant to answer the question. 
Return any relevant text verbatim.
{context}
Question: {question}
Relevant text, if any:`;
const DEFAULT_COMBINE_QA_PROMPT = /*#__PURE__*/ prompts_prompt.PromptTemplate.fromTemplate(qa_template);
const map_reduce_prompts_system_template = `Use the following portion of a long document to see if any of the text is relevant to answer the question. 
Return any relevant text verbatim.
----------------
{context}`;
const map_reduce_prompts_messages = [
    /*#__PURE__*/ chat/* SystemMessagePromptTemplate */.ov.fromTemplate(map_reduce_prompts_system_template),
    /*#__PURE__*/ chat/* HumanMessagePromptTemplate */.kq.fromTemplate("{question}")
];
const CHAT_QA_PROMPT = /*#__PURE__*/ chat/* ChatPromptTemplate */.ks.fromPromptMessages(map_reduce_prompts_messages);
const COMBINE_QA_PROMPT_SELECTOR = /*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_COMBINE_QA_PROMPT, [
    [
        isChatModel,
        CHAT_QA_PROMPT
    ]
]);
const combine_prompt = `Given the following extracted parts of a long document and a question, create a final answer. 
If you don't know the answer, just say that you don't know. Don't try to make up an answer.

QUESTION: Which state/country's law governs the interpretation of the contract?
=========
Content: This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts in  relation to any dispute (contractual or non-contractual) concerning this Agreement save that either party may apply to any court for an  injunction or other relief to protect its Intellectual Property Rights.

Content: No Waiver. Failure or delay in exercising any right or remedy under this Agreement shall not constitute a waiver of such (or any other)  right or remedy.\n\n11.7 Severability. The invalidity, illegality or unenforceability of any term (or part of a term) of this Agreement shall not affect the continuation  in force of the remainder of the term (if any) and this Agreement.\n\n11.8 No Agency. Except as expressly stated otherwise, nothing in this Agreement shall create an agency, partnership or joint venture of any  kind between the parties.\n\n11.9 No Third-Party Beneficiaries.

Content: (b) if Google believes, in good faith, that the Distributor has violated or caused Google to violate any Anti-Bribery Laws (as  defined in Clause 8.5) or that such a violation is reasonably likely to occur,
=========
FINAL ANSWER: This Agreement is governed by English law.

QUESTION: What did the president say about Michael Jackson?
=========
Content: Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and the Cabinet. Justices of the Supreme Court. My fellow Americans.  \n\nLast year COVID-19 kept us apart. This year we are finally together again. \n\nTonight, we meet as Democrats Republicans and Independents. But most importantly as Americans. \n\nWith a duty to one another to the American people to the Constitution. \n\nAnd with an unwavering resolve that freedom will always triumph over tyranny. \n\nSix days ago, Russia’s Vladimir Putin sought to shake the foundations of the free world thinking he could make it bend to his menacing ways. But he badly miscalculated. \n\nHe thought he could roll into Ukraine and the world would roll over. Instead he met a wall of strength he never imagined. \n\nHe met the Ukrainian people. \n\nFrom President Zelenskyy to every Ukrainian, their fearlessness, their courage, their determination, inspires the world. \n\nGroups of citizens blocking tanks with their bodies. Everyone from students to retirees teachers turned soldiers defending their homeland.

Content: And we won’t stop. \n\nWe have lost so much to COVID-19. Time with one another. And worst of all, so much loss of life. \n\nLet’s use this moment to reset. Let’s stop looking at COVID-19 as a partisan dividing line and see it for what it is: A God-awful disease.  \n\nLet’s stop seeing each other as enemies, and start seeing each other for who we really are: Fellow Americans.  \n\nWe can’t change how divided we’ve been. But we can change how we move forward—on COVID-19 and other issues we must face together. \n\nI recently visited the New York City Police Department days after the funerals of Officer Wilbert Mora and his partner, Officer Jason Rivera. \n\nThey were responding to a 9-1-1 call when a man shot and killed them with a stolen gun. \n\nOfficer Mora was 27 years old. \n\nOfficer Rivera was 22. \n\nBoth Dominican Americans who’d grown up on the same streets they later chose to patrol as police officers. \n\nI spoke with their families and told them that we are forever in debt for their sacrifice, and we will carry on their mission to restore the trust and safety every community deserves.

Content: And a proud Ukrainian people, who have known 30 years  of independence, have repeatedly shown that they will not tolerate anyone who tries to take their country backwards.  \n\nTo all Americans, I will be honest with you, as I’ve always promised. A Russian dictator, invading a foreign country, has costs around the world. \n\nAnd I’m taking robust action to make sure the pain of our sanctions  is targeted at Russia’s economy. And I will use every tool at our disposal to protect American businesses and consumers. \n\nTonight, I can announce that the United States has worked with 30 other countries to release 60 Million barrels of oil from reserves around the world.  \n\nAmerica will lead that effort, releasing 30 Million barrels from our own Strategic Petroleum Reserve. And we stand ready to do more if necessary, unified with our allies.  \n\nThese steps will help blunt gas prices here at home. And I know the news about what’s happening can seem alarming. \n\nBut I want you to know that we are going to be okay.

Content: More support for patients and families. \n\nTo get there, I call on Congress to fund ARPA-H, the Advanced Research Projects Agency for Health. \n\nIt’s based on DARPA—the Defense Department project that led to the Internet, GPS, and so much more.  \n\nARPA-H will have a singular purpose—to drive breakthroughs in cancer, Alzheimer’s, diabetes, and more. \n\nA unity agenda for the nation. \n\nWe can do this. \n\nMy fellow Americans—tonight , we have gathered in a sacred space—the citadel of our democracy. \n\nIn this Capitol, generation after generation, Americans have debated great questions amid great strife, and have done great things. \n\nWe have fought for freedom, expanded liberty, defeated totalitarianism and terror. \n\nAnd built the strongest, freest, and most prosperous nation the world has ever known. \n\nNow is the hour. \n\nOur moment of responsibility. \n\nOur test of resolve and conscience, of history itself. \n\nIt is in this moment that our character is formed. Our purpose is found. Our future is forged. \n\nWell I know this nation.
=========
FINAL ANSWER: The president did not mention Michael Jackson.

QUESTION: {question}
=========
{summaries}
=========
FINAL ANSWER:`;
const COMBINE_PROMPT = /*#__PURE__*/ prompts_prompt.PromptTemplate.fromTemplate(combine_prompt);
const system_combine_template = `Given the following extracted parts of a long document and a question, create a final answer. 
If you don't know the answer, just say that you don't know. Don't try to make up an answer.
----------------
{summaries}`;
const combine_messages = [
    /*#__PURE__*/ chat/* SystemMessagePromptTemplate */.ov.fromTemplate(system_combine_template),
    /*#__PURE__*/ chat/* HumanMessagePromptTemplate */.kq.fromTemplate("{question}")
];
const CHAT_COMBINE_PROMPT = /*#__PURE__*/ chat/* ChatPromptTemplate */.ks.fromPromptMessages(combine_messages);
const COMBINE_PROMPT_SELECTOR = /*#__PURE__*/ new ConditionalPromptSelector(COMBINE_PROMPT, [
    [
        isChatModel,
        CHAT_COMBINE_PROMPT
    ]
]);

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/index.js + 3 modules
var prompts = __webpack_require__(82240);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/question_answering/refine_prompts.js
/* eslint-disable spaced-comment */ 

const DEFAULT_REFINE_PROMPT_TMPL = `The original question is as follows: {question}
We have provided an existing answer: {existing_answer}
We have the opportunity to refine the existing answer
(only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the question. 
If the context isn't useful, return the original answer.`;
const DEFAULT_REFINE_PROMPT = /*#__PURE__*/ new prompts/* PromptTemplate */.Pf({
    inputVariables: [
        "question",
        "existing_answer",
        "context"
    ],
    template: DEFAULT_REFINE_PROMPT_TMPL
});
const refineTemplate = `The original question is as follows: {question}
We have provided an existing answer: {existing_answer}
We have the opportunity to refine the existing answer
(only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the question. 
If the context isn't useful, return the original answer.`;
const refine_prompts_messages = [
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.kq.fromTemplate("{question}"),
    /*#__PURE__*/ prompts/* AIMessagePromptTemplate */.gc.fromTemplate("{existing_answer}"),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.kq.fromTemplate(refineTemplate)
];
const CHAT_REFINE_PROMPT = /*#__PURE__*/ prompts/* ChatPromptTemplate */.ks.fromPromptMessages(refine_prompts_messages);
const REFINE_PROMPT_SELECTOR = /*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_REFINE_PROMPT, [
    [
        isChatModel,
        CHAT_REFINE_PROMPT
    ]
]);
const DEFAULT_TEXT_QA_PROMPT_TMPL = `Context information is below. 
---------------------
{context}
---------------------
Given the context information and not prior knowledge, answer the question: {question}`;
const DEFAULT_TEXT_QA_PROMPT = /*#__PURE__*/ new prompts/* PromptTemplate */.Pf({
    inputVariables: [
        "context",
        "question"
    ],
    template: DEFAULT_TEXT_QA_PROMPT_TMPL
});
const chat_qa_prompt_template = `Context information is below. 
---------------------
{context}
---------------------
Given the context information and not prior knowledge, answer any questions`;
const chat_messages = [
    /*#__PURE__*/ prompts/* SystemMessagePromptTemplate */.ov.fromTemplate(chat_qa_prompt_template),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.kq.fromTemplate("{question}")
];
const CHAT_QUESTION_PROMPT = /*#__PURE__*/ prompts/* ChatPromptTemplate */.ks.fromPromptMessages(chat_messages);
const QUESTION_PROMPT_SELECTOR = /*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_TEXT_QA_PROMPT, [
    [
        isChatModel,
        CHAT_QUESTION_PROMPT
    ]
]);

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/question_answering/load.js





const loadQAChain = (llm, params = {
    type: "stuff"
})=>{
    const { type } = params;
    if (type === "stuff") {
        return loadQAStuffChain(llm, params);
    }
    if (type === "map_reduce") {
        return loadQAMapReduceChain(llm, params);
    }
    if (type === "refine") {
        return loadQARefineChain(llm, params);
    }
    throw new Error(`Invalid _type: ${type}`);
};
function loadQAStuffChain(llm, params = {}) {
    const { prompt = QA_PROMPT_SELECTOR.getPrompt(llm), verbose } = params;
    const llmChain = new llm_chain.LLMChain({
        prompt,
        llm,
        verbose
    });
    const chain = new combine_docs_chain.StuffDocumentsChain({
        llmChain,
        verbose
    });
    return chain;
}
function loadQAMapReduceChain(llm, params = {}) {
    const { combineMapPrompt = COMBINE_QA_PROMPT_SELECTOR.getPrompt(llm), combinePrompt = COMBINE_PROMPT_SELECTOR.getPrompt(llm), verbose, returnIntermediateSteps } = params;
    const llmChain = new llm_chain.LLMChain({
        prompt: combineMapPrompt,
        llm,
        verbose
    });
    const combineLLMChain = new llm_chain.LLMChain({
        prompt: combinePrompt,
        llm,
        verbose
    });
    const combineDocumentChain = new combine_docs_chain.StuffDocumentsChain({
        llmChain: combineLLMChain,
        documentVariableName: "summaries",
        verbose
    });
    const chain = new combine_docs_chain.MapReduceDocumentsChain({
        llmChain,
        combineDocumentChain,
        returnIntermediateSteps,
        verbose
    });
    return chain;
}
function loadQARefineChain(llm, params = {}) {
    const { questionPrompt = QUESTION_PROMPT_SELECTOR.getPrompt(llm), refinePrompt = REFINE_PROMPT_SELECTOR.getPrompt(llm), verbose } = params;
    const llmChain = new llm_chain.LLMChain({
        prompt: questionPrompt,
        llm,
        verbose
    });
    const refineLLMChain = new llm_chain.LLMChain({
        prompt: refinePrompt,
        llm,
        verbose
    });
    const chain = new combine_docs_chain.RefineDocumentsChain({
        llmChain,
        refineLLMChain,
        verbose
    });
    return chain;
}


/***/ }),

/***/ 88780:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  SequentialChain: () => (/* binding */ SequentialChain),
  SimpleSequentialChain: () => (/* binding */ SimpleSequentialChain)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/base.js
var base = __webpack_require__(79144);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/set.js
/**
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations
 */ /**
 * returns intersection of two sets
 */ function intersection(setA, setB) {
    const _intersection = new Set();
    for (const elem of setB){
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
/**
 * returns union of two sets
 */ function union(setA, setB) {
    const _union = new Set(setA);
    for (const elem of setB){
        _union.add(elem);
    }
    return _union;
}
/**
 * returns difference of two sets
 */ function difference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB){
        _difference.delete(elem);
    }
    return _difference;
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chains/sequential_chain.js


function formatSet(input) {
    return Array.from(input).map((i)=>`"${i}"`).join(", ");
}
/**
 * Chain where the outputs of one chain feed directly into next.
 */ class SequentialChain extends base/* BaseChain */.l {
    get inputKeys() {
        return this.inputVariables;
    }
    get outputKeys() {
        return this.outputVariables;
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "chains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnAll", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chains = fields.chains;
        this.inputVariables = fields.inputVariables;
        this.outputVariables = fields.outputVariables ?? [];
        if (this.outputVariables.length > 0 && fields.returnAll) {
            throw new Error("Either specify variables to return using `outputVariables` or use `returnAll` param. Cannot apply both conditions at the same time.");
        }
        this.returnAll = fields.returnAll ?? false;
        this._validateChains();
    }
    /** @ignore */ _validateChains() {
        if (this.chains.length === 0) {
            throw new Error("Sequential chain must have at least one chain.");
        }
        const memoryKeys = this.memory?.memoryKeys ?? [];
        const inputKeysSet = new Set(this.inputKeys);
        const memoryKeysSet = new Set(memoryKeys);
        const keysIntersection = intersection(inputKeysSet, memoryKeysSet);
        if (keysIntersection.size > 0) {
            throw new Error(`The following keys: ${formatSet(keysIntersection)} are overlapping between memory and input keys of the chain variables. This can lead to unexpected behaviour. Please use input and memory keys that don't overlap.`);
        }
        const availableKeys = union(inputKeysSet, memoryKeysSet);
        for (const chain of this.chains){
            let missingKeys = difference(new Set(chain.inputKeys), availableKeys);
            if (chain.memory) {
                missingKeys = difference(missingKeys, new Set(chain.memory.memoryKeys));
            }
            if (missingKeys.size > 0) {
                throw new Error(`Missing variables for chain "${chain._chainType()}": ${formatSet(missingKeys)}. Only got the following variables: ${formatSet(availableKeys)}.`);
            }
            const outputKeysSet = new Set(chain.outputKeys);
            const overlappingOutputKeys = intersection(availableKeys, outputKeysSet);
            if (overlappingOutputKeys.size > 0) {
                throw new Error(`The following output variables for chain "${chain._chainType()}" are overlapping: ${formatSet(overlappingOutputKeys)}. This can lead to unexpected behaviour.`);
            }
            for (const outputKey of outputKeysSet){
                availableKeys.add(outputKey);
            }
        }
        if (this.outputVariables.length === 0) {
            if (this.returnAll) {
                const outputKeys = difference(availableKeys, inputKeysSet);
                this.outputVariables = Array.from(outputKeys);
            } else {
                this.outputVariables = this.chains[this.chains.length - 1].outputKeys;
            }
        } else {
            const missingKeys = difference(new Set(this.outputVariables), new Set(availableKeys));
            if (missingKeys.size > 0) {
                throw new Error(`The following output variables were expected to be in the final chain output but were not found: ${formatSet(missingKeys)}.`);
            }
        }
    }
    /** @ignore */ async _call(values, runManager) {
        let input = {};
        const allChainValues = values;
        let i = 0;
        for (const chain of this.chains){
            i += 1;
            input = await chain.call(allChainValues, runManager?.getChild(`step_${i}`));
            for (const key of Object.keys(input)){
                allChainValues[key] = input[key];
            }
        }
        const output = {};
        for (const key of this.outputVariables){
            output[key] = allChainValues[key];
        }
        return output;
    }
    _chainType() {
        return "sequential_chain";
    }
    static async deserialize(data) {
        const chains = [];
        const inputVariables = data.input_variables;
        const outputVariables = data.output_variables;
        const serializedChains = data.chains;
        for (const serializedChain of serializedChains){
            const deserializedChain = await base/* BaseChain */.l.deserialize(serializedChain);
            chains.push(deserializedChain);
        }
        return new SequentialChain({
            chains,
            inputVariables,
            outputVariables
        });
    }
    serialize() {
        const chains = [];
        for (const chain of this.chains){
            chains.push(chain.serialize());
        }
        return {
            _type: this._chainType(),
            input_variables: this.inputVariables,
            output_variables: this.outputVariables,
            chains
        };
    }
}
/**
 * Simple chain where a single string output of one chain is fed directly into the next.
 * @augments BaseChain
 * @augments SimpleSequentialChainInput
 *
 * @example
 * ```ts
 * import { SimpleSequentialChain, LLMChain } from "langchain/chains";
 * import { OpenAI } from "langchain/llms/openai";
 * import { PromptTemplate } from "langchain/prompts";
 *
 * // This is an LLMChain to write a synopsis given a title of a play.
 * const llm = new OpenAI({ temperature: 0 });
 * const template = `You are a playwright. Given the title of play, it is your job to write a synopsis for that title.
 *
 * Title: {title}
 * Playwright: This is a synopsis for the above play:`
 * const promptTemplate = new PromptTemplate({ template, inputVariables: ["title"] });
 * const synopsisChain = new LLMChain({ llm, prompt: promptTemplate });
 *
 *
 * // This is an LLMChain to write a review of a play given a synopsis.
 * const reviewLLM = new OpenAI({ temperature: 0 })
 * const reviewTemplate = `You are a play critic from the New York Times. Given the synopsis of play, it is your job to write a review for that play.
 *
 * Play Synopsis:
 * {synopsis}
 * Review from a New York Times play critic of the above play:`
 * const reviewPromptTemplate = new PromptTemplate({ template: reviewTemplate, inputVariables: ["synopsis"] });
 * const reviewChain = new LLMChain({ llm: reviewLLM, prompt: reviewPromptTemplate });
 *
 * const overallChain = new SimpleSequentialChain({chains: [synopsisChain, reviewChain], verbose:true})
 * const review = await overallChain.run("Tragedy at sunset on the beach")
 * // the variable review contains resulting play review.
 * ```
 */ class SimpleSequentialChain extends base/* BaseChain */.l {
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return [
            this.outputKey
        ];
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "chains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        Object.defineProperty(this, "trimOutputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chains = fields.chains;
        this.trimOutputs = fields.trimOutputs ?? false;
        this._validateChains();
    }
    /** @ignore */ _validateChains() {
        for (const chain of this.chains){
            if (chain.inputKeys.filter((k)=>!chain.memory?.memoryKeys.includes(k) ?? true).length !== 1) {
                throw new Error(`Chains used in SimpleSequentialChain should all have one input, got ${chain.inputKeys.length} for ${chain._chainType()}.`);
            }
            if (chain.outputKeys.length !== 1) {
                throw new Error(`Chains used in SimpleSequentialChain should all have one output, got ${chain.outputKeys.length} for ${chain._chainType()}.`);
            }
        }
    }
    /** @ignore */ async _call(values, runManager) {
        let input = values[this.inputKey];
        let i = 0;
        for (const chain of this.chains){
            i += 1;
            input = (await chain.call({
                [chain.inputKeys[0]]: input,
                signal: values.signal
            }, runManager?.getChild(`step_${i}`)))[chain.outputKeys[0]];
            if (this.trimOutputs) {
                input = input.trim();
            }
            await runManager?.handleText(input);
        }
        return {
            [this.outputKey]: input
        };
    }
    _chainType() {
        return "simple_sequential_chain";
    }
    static async deserialize(data) {
        const chains = [];
        const serializedChains = data.chains;
        for (const serializedChain of serializedChains){
            const deserializedChain = await base/* BaseChain */.l.deserialize(serializedChain);
            chains.push(deserializedChain);
        }
        return new SimpleSequentialChain({
            chains
        });
    }
    serialize() {
        const chains = [];
        for (const chain of this.chains){
            chains.push(chain.serialize());
        }
        return {
            _type: this._chainType(),
            chains
        };
    }
}


/***/ }),

/***/ 69491:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VectorDBQAChain: () => (/* binding */ VectorDBQAChain)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79144);
/* harmony import */ var _question_answering_load_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82072);


class VectorDBQAChain extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseChain */ .l {
    get inputKeys() {
        return [
            this.inputKey
        ];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys.concat(this.returnSourceDocuments ? [
            "sourceDocuments"
        ] : []);
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "vectorstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.vectorstore = fields.vectorstore;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.k = fields.k ?? this.k;
        this.returnSourceDocuments = fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    /** @ignore */ async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.vectorstore.similaritySearch(question, this.k, values.filter, runManager?.getChild("vectorstore"));
        const inputs = {
            question,
            input_documents: docs
        };
        const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild("combine_documents"));
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs
            };
        }
        return result;
    }
    _chainType() {
        return "vector_db_qa";
    }
    static async deserialize(data, values) {
        if (!("vectorstore" in values)) {
            throw new Error(`Need to pass in a vectorstore to deserialize VectorDBQAChain`);
        }
        const { vectorstore } = values;
        if (!data.combine_documents_chain) {
            throw new Error(`VectorDBQAChain must have combine_documents_chain in serialized data`);
        }
        return new VectorDBQAChain({
            combineDocumentsChain: await _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseChain */ .l.deserialize(data.combine_documents_chain),
            k: data.k,
            vectorstore
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            combine_documents_chain: this.combineDocumentsChain.serialize(),
            k: this.k
        };
    }
    static fromLLM(llm, vectorstore, options) {
        const qaChain = (0,_question_answering_load_js__WEBPACK_IMPORTED_MODULE_1__/* .loadQAStuffChain */ .cf)(llm);
        return new this({
            vectorstore,
            combineDocumentsChain: qaChain,
            ...options
        });
    }
}


/***/ }),

/***/ 91619:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ChatOpenAI: () => (/* binding */ ChatOpenAI),
  PromptLayerChatOpenAI: () => (/* binding */ PromptLayerChatOpenAI)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/openai@3.3.0/node_modules/openai/dist/index.js
var dist = __webpack_require__(41564);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/env.js
var env = __webpack_require__(14812);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/axios-fetch-adapter.js + 1 modules
var axios_fetch_adapter = __webpack_require__(14904);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/schema/index.js
var schema = __webpack_require__(18585);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/base_language/index.js + 1 modules
var base_language = __webpack_require__(90470);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/callbacks/manager.js
var manager = __webpack_require__(71538);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chat_models/base.js



function createChatMessageChunkEncoderStream() {
    const textEncoder = new TextEncoder();
    return new TransformStream({
        transform (chunk, controller) {
            controller.enqueue(textEncoder.encode(chunk.content));
        }
    });
}
class BaseChatModel extends base_language/* BaseLanguageModel */.qV {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "chat_models",
                this._llmType()
            ]
        });
    }
    _separateRunnableConfigFromCallOptions(options) {
        const [runnableConfig, callOptions] = super._separateRunnableConfigFromCallOptions(options);
        if (callOptions?.timeout && !callOptions.signal) {
            callOptions.signal = AbortSignal.timeout(callOptions.timeout);
        }
        return [
            runnableConfig,
            callOptions
        ];
    }
    async invoke(input, options) {
        const promptValue = BaseChatModel._convertInputToPromptValue(input);
        const result = await this.generatePrompt([
            promptValue
        ], options, options?.callbacks);
        const chatGeneration = result.generations[0][0];
        // TODO: Remove cast after figuring out inheritance
        return chatGeneration.message;
    }
    // eslint-disable-next-line require-yield
    async *_streamResponseChunks(_messages, _options, _runManager) {
        throw new Error("Not implemented.");
    }
    async *_streamIterator(input, options) {
        // Subclass check required to avoid double callbacks with default implementation
        if (this._streamResponseChunks === BaseChatModel.prototype._streamResponseChunks) {
            yield this.invoke(input, options);
        } else {
            const prompt = BaseChatModel._convertInputToPromptValue(input);
            const messages = prompt.toChatMessages();
            const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(options ?? {});
            const callbackManager_ = await manager/* CallbackManager */.Ye.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, runnableConfig.metadata, this.metadata, {
                verbose: this.verbose
            });
            const extra = {
                options: callOptions,
                invocation_params: this?.invocationParams(callOptions)
            };
            const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), [
                messages
            ], undefined, undefined, extra);
            let generationChunk;
            try {
                for await (const chunk of this._streamResponseChunks(messages, callOptions, runManagers?.[0])){
                    yield chunk.message;
                    if (!generationChunk) {
                        generationChunk = chunk;
                    } else {
                        generationChunk = generationChunk.concat(chunk);
                    }
                }
            } catch (err) {
                await Promise.all((runManagers ?? []).map((runManager)=>runManager?.handleLLMError(err)));
                throw err;
            }
            await Promise.all((runManagers ?? []).map((runManager)=>runManager?.handleLLMEnd({
                    // TODO: Remove cast after figuring out inheritance
                    generations: [
                        [
                            generationChunk
                        ]
                    ]
                })));
        }
    }
    async generate(messages, options, callbacks) {
        // parse call options
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = {
                stop: options
            };
        } else {
            parsedOptions = options ?? {};
        }
        const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(parsedOptions);
        // create callback manager and start run
        const callbackManager_ = await manager/* CallbackManager */.Ye.configure(runnableConfig.callbacks ?? callbacks, this.callbacks, runnableConfig.tags, this.tags, runnableConfig.metadata, this.metadata, {
            verbose: this.verbose
        });
        const extra = {
            options: callOptions,
            invocation_params: this?.invocationParams(parsedOptions)
        };
        const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), messages, undefined, undefined, extra);
        // generate results
        const results = await Promise.allSettled(messages.map((messageList, i)=>this._generate(messageList, {
                ...parsedOptions,
                promptIndex: i
            }, runManagers?.[i])));
        // handle results
        const generations = [];
        const llmOutputs = [];
        await Promise.all(results.map(async (pResult, i)=>{
            if (pResult.status === "fulfilled") {
                const result = pResult.value;
                generations[i] = result.generations;
                llmOutputs[i] = result.llmOutput;
                return runManagers?.[i]?.handleLLMEnd({
                    generations: [
                        result.generations
                    ],
                    llmOutput: result.llmOutput
                });
            } else {
                // status === "rejected"
                await runManagers?.[i]?.handleLLMError(pResult.reason);
                return Promise.reject(pResult.reason);
            }
        }));
        // create combined output
        const output = {
            generations,
            llmOutput: llmOutputs.length ? this._combineLLMOutput?.(...llmOutputs) : undefined
        };
        Object.defineProperty(output, schema/* RUN_KEY */.WH, {
            value: runManagers ? {
                runIds: runManagers?.map((manager)=>manager.runId)
            } : undefined,
            configurable: true
        });
        return output;
    }
    /**
     * Get the parameters used to invoke the model
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationParams(_options) {
        return {};
    }
    _modelType() {
        return "base_chat_model";
    }
    async generatePrompt(promptValues, options, callbacks) {
        const promptMessages = promptValues.map((promptValue)=>promptValue.toChatMessages());
        return this.generate(promptMessages, options, callbacks);
    }
    async call(messages, options, callbacks) {
        const result = await this.generate([
            messages
        ], options, callbacks);
        const generations = result.generations;
        return generations[0][0].message;
    }
    async callPrompt(promptValue, options, callbacks) {
        const promptMessages = promptValue.toChatMessages();
        return this.call(promptMessages, options, callbacks);
    }
    async predictMessages(messages, options, callbacks) {
        return this.call(messages, options, callbacks);
    }
    async predict(text, options, callbacks) {
        const message = new schema/* HumanMessage */.xk(text);
        const result = await this.call([
            message
        ], options, callbacks);
        return result.content;
    }
}
class SimpleChatModel extends (/* unused pure expression or super */ null && (BaseChatModel)) {
    async _generate(messages, options, runManager) {
        const text = await this._call(messages, options, runManager);
        const message = new AIMessage(text);
        return {
            generations: [
                {
                    text: message.content,
                    message
                }
            ]
        };
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/base_language/count_tokens.js
var count_tokens = __webpack_require__(30753);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/prompt-layer.js
const promptLayerTrackRequest = async (callerFunc, functionName, prompt, kwargs, plTags, // eslint-disable-next-line @typescript-eslint/no-explicit-any
requestResponse, startTime, endTime, apiKey)=>{
    // https://github.com/MagnivOrg/promptlayer-js-helper
    const promptLayerResp = await callerFunc.call(fetch, "https://api.promptlayer.com/track-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            function_name: functionName,
            provider: "langchain",
            args: prompt,
            kwargs,
            tags: plTags,
            request_response: requestResponse,
            request_start_time: Math.floor(startTime / 1000),
            request_end_time: Math.floor(endTime / 1000),
            api_key: apiKey
        })
    });
    return promptLayerResp.json();
};

// EXTERNAL MODULE: ./node_modules/.pnpm/zod-to-json-schema@3.21.4_zod@3.21.4/node_modules/zod-to-json-schema/index.js
var zod_to_json_schema = __webpack_require__(44602);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/tools/convert_to_openai.js

function formatToOpenAIFunction(tool) {
    return {
        name: tool.name,
        description: tool.description,
        parameters: (0,zod_to_json_schema/* zodToJsonSchema */.Y_)(tool.schema)
    };
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/azure.js
var azure = __webpack_require__(2780);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/stream.js
var util_stream = __webpack_require__(73324);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/chat_models/openai.js










function messageTypeToOpenAIRole(type) {
    switch(type){
        case "system":
            return "system";
        case "ai":
            return "assistant";
        case "human":
            return "user";
        case "function":
            return "function";
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
}
function openAIResponseToChatMessage(message) {
    switch(message.role){
        case "user":
            return new schema/* HumanMessage */.xk(message.content || "");
        case "assistant":
            return new schema/* AIMessage */.gY(message.content || "", {
                function_call: message.function_call
            });
        case "system":
            return new schema/* SystemMessage */.jN(message.content || "");
        default:
            return new schema/* ChatMessage */.J(message.content || "", message.role ?? "unknown");
    }
}
function _convertDeltaToMessageChunk(// eslint-disable-next-line @typescript-eslint/no-explicit-any
delta, defaultRole) {
    const role = delta.role ?? defaultRole;
    const content = delta.content ?? "";
    let additional_kwargs;
    if (delta.function_call) {
        additional_kwargs = {
            function_call: delta.function_call
        };
    } else {
        additional_kwargs = {};
    }
    if (role === "user") {
        return new schema/* HumanMessageChunk */.ro({
            content
        });
    } else if (role === "assistant") {
        return new schema/* AIMessageChunk */.GC({
            content,
            additional_kwargs
        });
    } else if (role === "system") {
        return new schema/* SystemMessageChunk */.xq({
            content
        });
    } else if (role === "function") {
        return new schema/* FunctionMessageChunk */.Cr({
            content,
            additional_kwargs,
            name: delta.name
        });
    } else {
        return new schema/* ChatMessageChunk */.HD({
            content,
            role
        });
    }
}
/**
 * Wrapper around OpenAI large language models that use the Chat endpoint.
 *
 * To use you should have the `openai` package installed, with the
 * `OPENAI_API_KEY` environment variable set.
 *
 * To use with Azure you should have the `openai` package installed, with the
 * `AZURE_OPENAI_API_KEY`,
 * `AZURE_OPENAI_API_INSTANCE_NAME`,
 * `AZURE_OPENAI_API_DEPLOYMENT_NAME`
 * and `AZURE_OPENAI_API_VERSION` environment variable set.
 * `AZURE_OPENAI_BASE_PATH` is optional and will override `AZURE_OPENAI_API_INSTANCE_NAME` if you need to use a custom endpoint.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://platform.openai.com/docs/api-reference/chat/create |
 * `openai.createChatCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 */ class ChatOpenAI extends BaseChatModel {
    get callKeys() {
        return [
            ...super.callKeys,
            "options",
            "function_call",
            "functions",
            "tools",
            "promptIndex"
        ];
    }
    get lc_secrets() {
        return {
            openAIApiKey: "OPENAI_API_KEY",
            azureOpenAIApiKey: "AZURE_OPENAI_API_KEY"
        };
    }
    get lc_aliases() {
        return {
            modelName: "model",
            openAIApiKey: "openai_api_key",
            azureOpenAIApiVersion: "azure_openai_api_version",
            azureOpenAIApiKey: "azure_openai_api_key",
            azureOpenAIApiInstanceName: "azure_openai_api_instance_name",
            azureOpenAIApiDeploymentName: "azure_openai_api_deployment_name"
        };
    }
    constructor(fields, /** @deprecated */ configuration){
        super(fields ?? {});
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "logitBias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt-3.5-turbo"
        });
        Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIBasePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.openAIApiKey = fields?.openAIApiKey ?? (0,env/* getEnvironmentVariable */.lS)("OPENAI_API_KEY");
        this.azureOpenAIApiKey = fields?.azureOpenAIApiKey ?? (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_KEY");
        if (!this.azureOpenAIApiKey && !this.openAIApiKey) {
            throw new Error("OpenAI or Azure OpenAI API key not found");
        }
        this.azureOpenAIApiInstanceName = fields?.azureOpenAIApiInstanceName ?? (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_INSTANCE_NAME");
        this.azureOpenAIApiDeploymentName = fields?.azureOpenAIApiDeploymentName ?? (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_DEPLOYMENT_NAME");
        this.azureOpenAIApiVersion = fields?.azureOpenAIApiVersion ?? (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_VERSION");
        this.azureOpenAIBasePath = fields?.azureOpenAIBasePath ?? (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_BASE_PATH");
        this.modelName = fields?.modelName ?? this.modelName;
        this.modelKwargs = fields?.modelKwargs ?? {};
        this.timeout = fields?.timeout;
        this.temperature = fields?.temperature ?? this.temperature;
        this.topP = fields?.topP ?? this.topP;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
        this.maxTokens = fields?.maxTokens;
        this.n = fields?.n ?? this.n;
        this.logitBias = fields?.logitBias;
        this.stop = fields?.stop;
        this.streaming = fields?.streaming ?? false;
        if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName && !this.azureOpenAIBasePath) {
                throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
                throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
                throw new Error("Azure OpenAI API version not found");
            }
        }
        this.clientConfig = {
            apiKey: this.openAIApiKey,
            ...configuration,
            ...fields?.configuration
        };
    }
    /**
     * Get the parameters used to invoke the model
     */ invocationParams(options) {
        return {
            model: this.modelName,
            temperature: this.temperature,
            top_p: this.topP,
            frequency_penalty: this.frequencyPenalty,
            presence_penalty: this.presencePenalty,
            max_tokens: this.maxTokens === -1 ? undefined : this.maxTokens,
            n: this.n,
            logit_bias: this.logitBias,
            stop: options?.stop ?? this.stop,
            stream: this.streaming,
            functions: options?.functions ?? (options?.tools ? options?.tools.map(formatToOpenAIFunction) : undefined),
            function_call: options?.function_call,
            ...this.modelKwargs
        };
    }
    /** @ignore */ _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig
        };
    }
    // TODO(jacoblee): Refactor with _generate(..., {stream: true}) implementation
    // when we integrate OpenAI's new SDK.
    async *_streamResponseChunks(messages, options, runManager) {
        const messagesMapped = messages.map((message)=>({
                role: messageTypeToOpenAIRole(message._getType()),
                content: message.content,
                name: message.name,
                function_call: message.additional_kwargs.function_call
            }));
        const params = {
            ...this.invocationParams(options),
            messages: messagesMapped,
            stream: true
        };
        let defaultRole = "assistant";
        const streamIterable = this.startStream(params, options);
        for await (const streamedResponse of streamIterable){
            const data = JSON.parse(streamedResponse);
            const choice = data.choices?.[0];
            if (!choice) {
                continue;
            }
            const { delta } = choice;
            const chunk = _convertDeltaToMessageChunk(delta, defaultRole);
            defaultRole = delta.role ?? defaultRole;
            const generationChunk = new schema/* ChatGenerationChunk */.Ls({
                message: chunk,
                text: chunk.content
            });
            yield generationChunk;
            // eslint-disable-next-line no-void
            void runManager?.handleLLMNewToken(generationChunk.text ?? "");
        }
    }
    startStream(request, options) {
        let done = false;
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();
        const iterable = (0,util_stream/* readableStreamToAsyncIterable */.H)(stream.readable);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let err;
        this.completionWithRetry(request, {
            ...options,
            adapter: axios_fetch_adapter/* default */.Z,
            responseType: "stream",
            onmessage: (event)=>{
                if (done) return;
                if (event.data?.trim?.() === "[DONE]") {
                    done = true;
                    // eslint-disable-next-line no-void
                    void writer.close();
                } else {
                    const data = JSON.parse(event.data);
                    if (data.error) {
                        done = true;
                        throw data.error;
                    }
                    // eslint-disable-next-line no-void
                    void writer.write(event.data);
                }
            }
        }).catch((error)=>{
            if (!done) {
                err = error;
                done = true;
                // eslint-disable-next-line no-void
                void writer.close();
            }
        });
        return {
            async next () {
                const chunk = await iterable.next();
                if (err) {
                    throw err;
                }
                return chunk;
            },
            [Symbol.asyncIterator] () {
                return this;
            }
        };
    }
    /**
     * Get the identifying parameters for the model
     */ identifyingParams() {
        return this._identifyingParams();
    }
    /** @ignore */ async _generate(messages, options, runManager) {
        const tokenUsage = {};
        const params = this.invocationParams(options);
        const messagesMapped = messages.map((message)=>({
                role: messageTypeToOpenAIRole(message._getType()),
                content: message.content,
                name: message.name,
                function_call: message.additional_kwargs.function_call
            }));
        const data = params.stream ? await new Promise((resolve, reject)=>{
            let response;
            let rejected = false;
            let resolved = false;
            this.completionWithRetry({
                ...params,
                messages: messagesMapped
            }, {
                signal: options?.signal,
                ...options?.options,
                adapter: axios_fetch_adapter/* default */.Z,
                responseType: "stream",
                onmessage: (event)=>{
                    if (event.data?.trim?.() === "[DONE]") {
                        if (resolved || rejected) {
                            return;
                        }
                        resolved = true;
                        resolve(response);
                    } else {
                        const data = JSON.parse(event.data);
                        if (!data.id) return;
                        if (data?.error) {
                            if (rejected) {
                                return;
                            }
                            rejected = true;
                            reject(data.error);
                            return;
                        }
                        const message = data;
                        // on the first message set the response properties
                        if (!response) {
                            response = {
                                id: message.id,
                                object: message.object,
                                created: message.created,
                                model: message.model,
                                choices: []
                            };
                        }
                        // on all messages, update choice
                        for (const part of message.choices ?? []){
                            if (part != null) {
                                let choice = response.choices.find((c)=>c.index === part.index);
                                if (!choice) {
                                    choice = {
                                        index: part.index,
                                        finish_reason: part.finish_reason ?? undefined
                                    };
                                    response.choices[part.index] = choice;
                                }
                                if (!choice.message) {
                                    choice.message = {
                                        role: part.delta?.role,
                                        content: ""
                                    };
                                }
                                if (part.delta.function_call && !choice.message.function_call) {
                                    choice.message.function_call = {
                                        name: "",
                                        arguments: ""
                                    };
                                }
                                choice.message.content += part.delta?.content ?? "";
                                if (choice.message.function_call) {
                                    choice.message.function_call.name += part.delta?.function_call?.name ?? "";
                                    choice.message.function_call.arguments += part.delta?.function_call?.arguments ?? "";
                                }
                                // eslint-disable-next-line no-void
                                void runManager?.handleLLMNewToken(part.delta?.content ?? "", {
                                    prompt: options.promptIndex ?? 0,
                                    completion: part.index
                                });
                            // TODO we don't currently have a callback method for
                            // sending the function call arguments
                            }
                        }
                        // when all messages are finished, resolve
                        if (!resolved && !rejected && message.choices?.every((c)=>c.finish_reason != null)) {
                            resolved = true;
                            resolve(response);
                        }
                    }
                }
            }).catch((error)=>{
                if (!rejected) {
                    rejected = true;
                    reject(error);
                }
            });
        }) : await this.completionWithRetry({
            ...params,
            messages: messagesMapped
        }, {
            signal: options?.signal,
            ...options?.options
        });
        const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens } = data.usage ?? {};
        if (completionTokens) {
            tokenUsage.completionTokens = (tokenUsage.completionTokens ?? 0) + completionTokens;
        }
        if (promptTokens) {
            tokenUsage.promptTokens = (tokenUsage.promptTokens ?? 0) + promptTokens;
        }
        if (totalTokens) {
            tokenUsage.totalTokens = (tokenUsage.totalTokens ?? 0) + totalTokens;
        }
        const generations = [];
        for (const part of data.choices){
            const text = part.message?.content ?? "";
            generations.push({
                text,
                message: openAIResponseToChatMessage(part.message ?? {
                    role: "assistant"
                })
            });
        }
        return {
            generations,
            llmOutput: {
                tokenUsage
            }
        };
    }
    async getNumTokensFromMessages(messages) {
        let totalCount = 0;
        let tokensPerMessage = 0;
        let tokensPerName = 0;
        // From: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb
        if ((0,count_tokens/* getModelNameForTiktoken */._i)(this.modelName) === "gpt-3.5-turbo") {
            tokensPerMessage = 4;
            tokensPerName = -1;
        } else if ((0,count_tokens/* getModelNameForTiktoken */._i)(this.modelName).startsWith("gpt-4")) {
            tokensPerMessage = 3;
            tokensPerName = 1;
        }
        const countPerMessage = await Promise.all(messages.map(async (message)=>{
            const textCount = await this.getNumTokens(message.content);
            const roleCount = await this.getNumTokens(messageTypeToOpenAIRole(message._getType()));
            const nameCount = message.name !== undefined ? tokensPerName + await this.getNumTokens(message.name) : 0;
            const count = textCount + tokensPerMessage + roleCount + nameCount;
            totalCount += count;
            return count;
        }));
        totalCount += 3; // every reply is primed with <|start|>assistant<|message|>
        return {
            totalCount,
            countPerMessage
        };
    }
    /** @ignore */ async completionWithRetry(request, options) {
        if (!this.client) {
            const openAIEndpointConfig = {
                azureOpenAIApiDeploymentName: this.azureOpenAIApiDeploymentName,
                azureOpenAIApiInstanceName: this.azureOpenAIApiInstanceName,
                azureOpenAIApiKey: this.azureOpenAIApiKey,
                azureOpenAIBasePath: this.azureOpenAIBasePath,
                basePath: this.clientConfig.basePath
            };
            const endpoint = (0,azure/* getEndpoint */.O)(openAIEndpointConfig);
            const clientConfig = new dist.Configuration({
                ...this.clientConfig,
                basePath: endpoint,
                baseOptions: {
                    timeout: this.timeout,
                    ...this.clientConfig.baseOptions
                }
            });
            this.client = new dist.OpenAIApi(clientConfig);
        }
        const axiosOptions = {
            adapter: (0,env/* isNode */.UG)() ? undefined : axios_fetch_adapter/* default */.Z,
            ...this.clientConfig.baseOptions,
            ...options
        };
        if (this.azureOpenAIApiKey) {
            axiosOptions.headers = {
                "api-key": this.azureOpenAIApiKey,
                ...axiosOptions.headers
            };
            axiosOptions.params = {
                "api-version": this.azureOpenAIApiVersion,
                ...axiosOptions.params
            };
        }
        return this.caller.call(this.client.createChatCompletion.bind(this.client), request, axiosOptions).then((res)=>res.data);
    }
    _llmType() {
        return "openai";
    }
    /** @ignore */ _combineLLMOutput(...llmOutputs) {
        return llmOutputs.reduce((acc, llmOutput)=>{
            if (llmOutput && llmOutput.tokenUsage) {
                acc.tokenUsage.completionTokens += llmOutput.tokenUsage.completionTokens ?? 0;
                acc.tokenUsage.promptTokens += llmOutput.tokenUsage.promptTokens ?? 0;
                acc.tokenUsage.totalTokens += llmOutput.tokenUsage.totalTokens ?? 0;
            }
            return acc;
        }, {
            tokenUsage: {
                completionTokens: 0,
                promptTokens: 0,
                totalTokens: 0
            }
        });
    }
}
class PromptLayerChatOpenAI extends ChatOpenAI {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "promptLayerApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnPromptLayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.promptLayerApiKey = fields?.promptLayerApiKey ?? (typeof process !== "undefined" ? process.env?.PROMPTLAYER_API_KEY : undefined);
        this.plTags = fields?.plTags ?? [];
        this.returnPromptLayerId = fields?.returnPromptLayerId ?? false;
    }
    async _generate(messages, options, runManager) {
        const requestStartTime = Date.now();
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = {
                stop: options
            };
        } else if (options?.timeout && !options.signal) {
            parsedOptions = {
                ...options,
                signal: AbortSignal.timeout(options.timeout)
            };
        } else {
            parsedOptions = options ?? {};
        }
        const generatedResponses = await super._generate(messages, parsedOptions, runManager);
        const requestEndTime = Date.now();
        const _convertMessageToDict = (message)=>{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let messageDict;
            if (message._getType() === "human") {
                messageDict = {
                    role: "user",
                    content: message.content
                };
            } else if (message._getType() === "ai") {
                messageDict = {
                    role: "assistant",
                    content: message.content
                };
            } else if (message._getType() === "function") {
                messageDict = {
                    role: "assistant",
                    content: message.content
                };
            } else if (message._getType() === "system") {
                messageDict = {
                    role: "system",
                    content: message.content
                };
            } else if (message._getType() === "generic") {
                messageDict = {
                    role: message.role,
                    content: message.content
                };
            } else {
                throw new Error(`Got unknown type ${message}`);
            }
            return messageDict;
        };
        const _createMessageDicts = (messages, callOptions)=>{
            const params = {
                ...this.invocationParams(),
                model: this.modelName
            };
            if (callOptions?.stop) {
                if (Object.keys(params).includes("stop")) {
                    throw new Error("`stop` found in both the input and default params.");
                }
            }
            const messageDicts = messages.map((message)=>_convertMessageToDict(message));
            return messageDicts;
        };
        for(let i = 0; i < generatedResponses.generations.length; i += 1){
            const generation = generatedResponses.generations[i];
            const messageDicts = _createMessageDicts(messages, parsedOptions);
            let promptLayerRequestId;
            const parsedResp = [
                {
                    content: generation.text,
                    role: messageTypeToOpenAIRole(generation.message._getType())
                }
            ];
            const promptLayerRespBody = await promptLayerTrackRequest(this.caller, "langchain.PromptLayerChatOpenAI", messageDicts, this._identifyingParams(), this.plTags, parsedResp, requestStartTime, requestEndTime, this.promptLayerApiKey);
            if (this.returnPromptLayerId === true) {
                if (promptLayerRespBody.success === true) {
                    promptLayerRequestId = promptLayerRespBody.request_id;
                }
                if (!generation.generationInfo || typeof generation.generationInfo !== "object") {
                    generation.generationInfo = {};
                }
                generation.generationInfo.promptLayerRequestId = promptLayerRequestId;
            }
        }
        return generatedResponses;
    }
}


/***/ }),

/***/ 12588:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Al: () => (/* binding */ BaseStringPromptTemplate),
/* harmony export */   dy: () => (/* binding */ BasePromptTemplate),
/* harmony export */   nw: () => (/* binding */ StringPromptValue)
/* harmony export */ });
/* unused harmony export BaseExampleSelector */
/* harmony import */ var _schema_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18585);
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24655);


class StringPromptValue extends _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .BasePromptValue */ .MJ {
    constructor(value){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                "base"
            ]
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.value = value;
    }
    toString() {
        return this.value;
    }
    toChatMessages() {
        return [
            new _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xk(this.value)
        ];
    }
}
/**
 * Base class for prompt templates. Exposes a format method that returns a
 * string prompt given a set of input values.
 */ class BasePromptTemplate extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_1__/* .Serializable */ .i {
    get lc_attributes() {
        return {
            partialVariables: undefined
        };
    }
    constructor(input){
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                this._getPromptType()
            ]
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "partialVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        const { inputVariables } = input;
        if (inputVariables.includes("stop")) {
            throw new Error("Cannot have an input variable named 'stop', as it is used internally, please rename.");
        }
        Object.assign(this, input);
    }
    async mergePartialAndUserVariables(userVariables) {
        const partialVariables = this.partialVariables ?? {};
        const partialValues = {};
        for (const [key, value] of Object.entries(partialVariables)){
            if (typeof value === "string") {
                partialValues[key] = value;
            } else {
                partialValues[key] = await value();
            }
        }
        const allKwargs = {
            ...partialValues,
            ...userVariables
        };
        return allKwargs;
    }
    /**
     * Return a json-like object representing this prompt template.
     * @deprecated
     */ serialize() {
        throw new Error("Use .toJSON() instead");
    }
    /**
     * @deprecated
     * Load a prompt template from a json-like object describing it.
     *
     * @remarks
     * Deserializing needs to be async because templates (e.g. {@link FewShotPromptTemplate}) can
     * reference remote resources that we read asynchronously with a web
     * request.
     */ static async deserialize(data) {
        switch(data._type){
            case "prompt":
                {
                    const { PromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 80037));
                    return PromptTemplate.deserialize(data);
                }
            case undefined:
                {
                    const { PromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 80037));
                    return PromptTemplate.deserialize({
                        ...data,
                        _type: "prompt"
                    });
                }
            case "few_shot":
                {
                    const { FewShotPromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 27439));
                    return FewShotPromptTemplate.deserialize(data);
                }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}
class BaseStringPromptTemplate extends BasePromptTemplate {
    async formatPromptValue(values) {
        const formattedPrompt = await this.format(values);
        return new StringPromptValue(formattedPrompt);
    }
}
/**
 * Base class for example selectors.
 */ class BaseExampleSelector extends (/* unused pure expression or super */ null && (Serializable)) {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                "selectors"
            ]
        });
    }
}


/***/ }),

/***/ 58912:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GU: () => (/* binding */ ChatPromptValue),
/* harmony export */   gc: () => (/* binding */ AIMessagePromptTemplate),
/* harmony export */   kq: () => (/* binding */ HumanMessagePromptTemplate),
/* harmony export */   ks: () => (/* binding */ ChatPromptTemplate),
/* harmony export */   ov: () => (/* binding */ SystemMessagePromptTemplate)
/* harmony export */ });
/* unused harmony exports BaseMessagePromptTemplate, MessagesPlaceholder, BaseMessageStringPromptTemplate, BaseChatPromptTemplate, ChatMessagePromptTemplate */
/* harmony import */ var _schema_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18585);
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24655);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12588);
/* harmony import */ var _prompt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(80037);




class BaseMessagePromptTemplate extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_1__/* .Serializable */ .i {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                "chat"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
}
class ChatPromptValue extends _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .BasePromptValue */ .MJ {
    constructor(fields){
        if (Array.isArray(fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = {
                messages: fields
            };
        }
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                "chat"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.messages = fields.messages;
    }
    toString() {
        return JSON.stringify(this.messages);
    }
    toChatMessages() {
        return this.messages;
    }
}
class MessagesPlaceholder extends (/* unused pure expression or super */ null && (BaseMessagePromptTemplate)) {
    constructor(fields){
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = {
                variableName: fields
            };
        }
        super(fields);
        Object.defineProperty(this, "variableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.variableName = fields.variableName;
    }
    get inputVariables() {
        return [
            this.variableName
        ];
    }
    formatMessages(values) {
        return Promise.resolve(values[this.variableName]);
    }
}
class BaseMessageStringPromptTemplate extends BaseMessagePromptTemplate {
    constructor(fields){
        if (!("prompt" in fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = {
                prompt: fields
            };
        }
        super(fields);
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = fields.prompt;
    }
    get inputVariables() {
        return this.prompt.inputVariables;
    }
    async formatMessages(values) {
        return [
            await this.format(values)
        ];
    }
}
class BaseChatPromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_2__/* .BasePromptTemplate */ .dy {
    constructor(input){
        super(input);
    }
    async format(values) {
        return (await this.formatPromptValue(values)).toString();
    }
    async formatPromptValue(values) {
        const resultMessages = await this.formatMessages(values);
        return new ChatPromptValue(resultMessages);
    }
}
class ChatMessagePromptTemplate extends (/* unused pure expression or super */ null && (BaseMessageStringPromptTemplate)) {
    async format(values) {
        return new ChatMessage(await this.prompt.format(values), this.role);
    }
    constructor(fields, role){
        if (!("prompt" in fields)) {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = {
                prompt: fields,
                role: role
            };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    static fromTemplate(template, role) {
        return new this(PromptTemplate.fromTemplate(template), role);
    }
}
class HumanMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xk(await this.prompt.format(values));
    }
    static fromTemplate(template) {
        return new this(_prompt_js__WEBPACK_IMPORTED_MODULE_3__.PromptTemplate.fromTemplate(template));
    }
}
class AIMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .AIMessage */ .gY(await this.prompt.format(values));
    }
    static fromTemplate(template) {
        return new this(_prompt_js__WEBPACK_IMPORTED_MODULE_3__.PromptTemplate.fromTemplate(template));
    }
}
class SystemMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .SystemMessage */ .jN(await this.prompt.format(values));
    }
    static fromTemplate(template) {
        return new this(_prompt_js__WEBPACK_IMPORTED_MODULE_3__.PromptTemplate.fromTemplate(template));
    }
}
class ChatPromptTemplate extends BaseChatPromptTemplate {
    get lc_aliases() {
        return {
            promptMessages: "messages"
        };
    }
    constructor(input){
        super(input);
        Object.defineProperty(this, "promptMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.validateTemplate) {
            const inputVariablesMessages = new Set();
            for (const promptMessage of this.promptMessages){
                for (const inputVariable of promptMessage.inputVariables){
                    inputVariablesMessages.add(inputVariable);
                }
            }
            const inputVariablesInstance = new Set(this.partialVariables ? this.inputVariables.concat(Object.keys(this.partialVariables)) : this.inputVariables);
            const difference = new Set([
                ...inputVariablesInstance
            ].filter((x)=>!inputVariablesMessages.has(x)));
            if (difference.size > 0) {
                throw new Error(`Input variables \`${[
                    ...difference
                ]}\` are not used in any of the prompt messages.`);
            }
            const otherDifference = new Set([
                ...inputVariablesMessages
            ].filter((x)=>!inputVariablesInstance.has(x)));
            if (otherDifference.size > 0) {
                throw new Error(`Input variables \`${[
                    ...otherDifference
                ]}\` are used in prompt messages but not in the prompt template.`);
            }
        }
    }
    _getPromptType() {
        return "chat";
    }
    async formatMessages(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        let resultMessages = [];
        for (const promptMessage of this.promptMessages){
            const inputValues = promptMessage.inputVariables.reduce((acc, inputVariable)=>{
                if (!(inputVariable in allValues)) {
                    throw new Error(`Missing value for input variable \`${inputVariable}\``);
                }
                acc[inputVariable] = allValues[inputVariable];
                return acc;
            }, {});
            const message = await promptMessage.formatMessages(inputValues);
            resultMessages = resultMessages.concat(message);
        }
        return resultMessages;
    }
    async partial(values) {
        // This is implemented in a way it doesn't require making
        // BaseMessagePromptTemplate aware of .partial()
        const promptDict = {
            ...this
        };
        promptDict.inputVariables = this.inputVariables.filter((iv)=>!(iv in values));
        promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
        };
        return new ChatPromptTemplate(promptDict);
    }
    static fromPromptMessages(promptMessages) {
        const flattenedMessages = promptMessages.reduce((acc, promptMessage)=>acc.concat(// eslint-disable-next-line no-instanceof/no-instanceof
            promptMessage instanceof ChatPromptTemplate ? promptMessage.promptMessages : [
                promptMessage
            ]), []);
        const flattenedPartialVariables = promptMessages.reduce((acc, promptMessage)=>// eslint-disable-next-line no-instanceof/no-instanceof
            promptMessage instanceof ChatPromptTemplate ? Object.assign(acc, promptMessage.partialVariables) : acc, Object.create(null));
        const inputVariables = new Set();
        for (const promptMessage of flattenedMessages){
            for (const inputVariable of promptMessage.inputVariables){
                if (inputVariable in flattenedPartialVariables) {
                    continue;
                }
                inputVariables.add(inputVariable);
            }
        }
        return new ChatPromptTemplate({
            inputVariables: [
                ...inputVariables
            ],
            promptMessages: flattenedMessages,
            partialVariables: flattenedPartialVariables
        });
    }
}


/***/ }),

/***/ 27439:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FewShotPromptTemplate: () => (/* binding */ FewShotPromptTemplate)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12588);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43131);
/* harmony import */ var _prompt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80037);



/**
 * Prompt template that contains few-shot examples.
 * @augments BasePromptTemplate
 * @augments FewShotPromptTemplateInput
 */ class FewShotPromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseStringPromptTemplate */ .Al {
    constructor(input){
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "suffix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "exampleSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
        });
        Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.examples !== undefined && this.exampleSelector !== undefined) {
            throw new Error("Only one of 'examples' and 'example_selector' should be provided");
        }
        if (this.examples === undefined && this.exampleSelector === undefined) {
            throw new Error("One of 'examples' and 'example_selector' should be provided");
        }
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .checkValidTemplate */ .af)(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "few_shot";
    }
    async getExamples(inputVariables) {
        if (this.examples !== undefined) {
            return this.examples;
        }
        if (this.exampleSelector !== undefined) {
            return this.exampleSelector.selectExamples(inputVariables);
        }
        throw new Error("One of 'examples' and 'example_selector' should be provided");
    }
    async partial(values) {
        const promptDict = {
            ...this
        };
        promptDict.inputVariables = this.inputVariables.filter((iv)=>!(iv in values));
        promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
        };
        return new FewShotPromptTemplate(promptDict);
    }
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        const examples = await this.getExamples(allValues);
        const exampleStrings = await Promise.all(examples.map((example)=>this.examplePrompt.format(example)));
        const template = [
            this.prefix,
            ...exampleStrings,
            this.suffix
        ].join(this.exampleSeparator);
        return (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .renderTemplate */ .SM)(template, this.templateFormat, allValues);
    }
    serialize() {
        if (this.exampleSelector || !this.examples) {
            throw new Error("Serializing an example selector is not currently supported");
        }
        if (this.outputParser !== undefined) {
            throw new Error("Serializing an output parser is not currently supported");
        }
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            example_prompt: this.examplePrompt.serialize(),
            example_separator: this.exampleSeparator,
            suffix: this.suffix,
            prefix: this.prefix,
            template_format: this.templateFormat,
            examples: this.examples
        };
    }
    static async deserialize(data) {
        const { example_prompt } = data;
        if (!example_prompt) {
            throw new Error("Missing example prompt");
        }
        const examplePrompt = await _prompt_js__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.deserialize(example_prompt);
        let examples;
        if (Array.isArray(data.examples)) {
            examples = data.examples;
        } else {
            throw new Error("Invalid examples format. Only list or string are supported.");
        }
        return new FewShotPromptTemplate({
            inputVariables: data.input_variables,
            examplePrompt,
            examples,
            exampleSeparator: data.example_separator,
            prefix: data.prefix,
            suffix: data.suffix,
            templateFormat: data.template_format
        });
    }
}


/***/ }),

/***/ 82240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  gc: () => (/* reexport */ chat/* AIMessagePromptTemplate */.gc),
  ks: () => (/* reexport */ chat/* ChatPromptTemplate */.ks),
  kq: () => (/* reexport */ chat/* HumanMessagePromptTemplate */.kq),
  Pf: () => (/* reexport */ prompts_prompt.PromptTemplate),
  ov: () => (/* reexport */ chat/* SystemMessagePromptTemplate */.ov)
});

// UNUSED EXPORTS: BaseChatPromptTemplate, BaseExampleSelector, BasePromptSelector, BasePromptTemplate, BaseStringPromptTemplate, ChatMessagePromptTemplate, ConditionalPromptSelector, FewShotPromptTemplate, LengthBasedExampleSelector, MessagesPlaceholder, PipelinePromptTemplate, SemanticSimilarityExampleSelector, StringPromptValue, checkValidTemplate, isChatModel, isLLM, parseTemplate, renderTemplate

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/base.js
var base = __webpack_require__(12588);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/prompt.js
var prompts_prompt = __webpack_require__(80037);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/selectors/LengthBasedExampleSelector.js

function getLengthBased(text) {
    return text.split(/\n| /).length;
}
class LengthBasedExampleSelector extends (/* unused pure expression or super */ null && (BaseExampleSelector)) {
    constructor(data){
        super(data);
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getTextLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: getLengthBased
        });
        Object.defineProperty(this, "maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2048
        });
        Object.defineProperty(this, "exampleTextLengths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.examplePrompt = data.examplePrompt;
        this.maxLength = data.maxLength ?? 2048;
        this.getTextLength = data.getTextLength ?? getLengthBased;
    }
    async addExample(example) {
        this.examples.push(example);
        const stringExample = await this.examplePrompt.format(example);
        this.exampleTextLengths.push(this.getTextLength(stringExample));
    }
    async calculateExampleTextLengths(v, values) {
        if (v.length > 0) {
            return v;
        }
        const { examples, examplePrompt } = values;
        const stringExamples = await Promise.all(examples.map((eg)=>examplePrompt.format(eg)));
        return stringExamples.map((eg)=>this.getTextLength(eg));
    }
    async selectExamples(inputVariables) {
        const inputs = Object.values(inputVariables).join(" ");
        let remainingLength = this.maxLength - this.getTextLength(inputs);
        let i = 0;
        const examples = [];
        while(remainingLength > 0 && i < this.examples.length){
            const newLength = remainingLength - this.exampleTextLengths[i];
            if (newLength < 0) {
                break;
            } else {
                examples.push(this.examples[i]);
                remainingLength = newLength;
            }
            i += 1;
        }
        return examples;
    }
    static async fromExamples(examples, args) {
        const selector = new LengthBasedExampleSelector(args);
        await Promise.all(examples.map((eg)=>selector.addExample(eg)));
        return selector;
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/selectors/SemanticSimilarityExampleSelector.js


function sortedValues(values) {
    return Object.keys(values).sort().map((key)=>values[key]);
}
class SemanticSimilarityExampleSelector extends (/* unused pure expression or super */ null && (BaseExampleSelector)) {
    constructor(data){
        super(data);
        Object.defineProperty(this, "vectorStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "exampleKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.vectorStore = data.vectorStore;
        this.k = data.k ?? 4;
        this.exampleKeys = data.exampleKeys;
        this.inputKeys = data.inputKeys;
    }
    async addExample(example) {
        const inputKeys = this.inputKeys ?? Object.keys(example);
        const stringExample = sortedValues(inputKeys.reduce((acc, key)=>({
                ...acc,
                [key]: example[key]
            }), {})).join(" ");
        await this.vectorStore.addDocuments([
            new Document({
                pageContent: stringExample,
                metadata: {
                    example
                }
            })
        ]);
    }
    async selectExamples(inputVariables) {
        const inputKeys = this.inputKeys ?? Object.keys(inputVariables);
        const query = sortedValues(inputKeys.reduce((acc, key)=>({
                ...acc,
                [key]: inputVariables[key]
            }), {})).join(" ");
        const exampleDocs = await this.vectorStore.similaritySearch(query, this.k);
        const examples = exampleDocs.map((doc)=>doc.metadata);
        if (this.exampleKeys) {
            // If example keys are provided, filter examples to those keys.
            return examples.map((example)=>this.exampleKeys.reduce((acc, key)=>({
                        ...acc,
                        [key]: example[key]
                    }), {}));
        }
        return examples;
    }
    static async fromExamples(examples, embeddings, vectorStoreCls, options = {}) {
        const inputKeys = options.inputKeys ?? null;
        const stringExamples = examples.map((example)=>sortedValues(inputKeys ? inputKeys.reduce((acc, key)=>({
                    ...acc,
                    [key]: example[key]
                }), {}) : example).join(" "));
        const vectorStore = await vectorStoreCls.fromTexts(stringExamples, examples, embeddings, options);
        return new SemanticSimilarityExampleSelector({
            vectorStore,
            k: options.k ?? 4,
            exampleKeys: options.exampleKeys,
            inputKeys: options.inputKeys
        });
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/few_shot.js
var few_shot = __webpack_require__(27439);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/chat.js
var chat = __webpack_require__(58912);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/template.js
var template = __webpack_require__(43131);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/pipeline.js


class PipelinePromptTemplate extends (/* unused pure expression or super */ null && (BasePromptTemplate)) {
    constructor(input){
        super({
            ...input,
            inputVariables: []
        });
        Object.defineProperty(this, "pipelinePrompts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "finalPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pipelinePrompts = input.pipelinePrompts;
        this.finalPrompt = input.finalPrompt;
        this.inputVariables = this.computeInputValues();
    }
    computeInputValues() {
        const intermediateValues = this.pipelinePrompts.map((pipelinePrompt)=>pipelinePrompt.name);
        const inputValues = this.pipelinePrompts.map((pipelinePrompt)=>pipelinePrompt.prompt.inputVariables.filter((inputValue)=>!intermediateValues.includes(inputValue))).flat();
        return [
            ...new Set(inputValues)
        ];
    }
    static extractRequiredInputValues(allValues, requiredValueNames) {
        return requiredValueNames.reduce((requiredValues, valueName)=>{
            // eslint-disable-next-line no-param-reassign
            requiredValues[valueName] = allValues[valueName];
            return requiredValues;
        }, {});
    }
    async formatPipelinePrompts(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        for (const { name: pipelinePromptName, prompt: pipelinePrompt } of this.pipelinePrompts){
            const pipelinePromptInputValues = PipelinePromptTemplate.extractRequiredInputValues(allValues, pipelinePrompt.inputVariables);
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (pipelinePrompt instanceof ChatPromptTemplate) {
                allValues[pipelinePromptName] = await pipelinePrompt.formatMessages(pipelinePromptInputValues);
            } else {
                allValues[pipelinePromptName] = await pipelinePrompt.format(pipelinePromptInputValues);
            }
        }
        return PipelinePromptTemplate.extractRequiredInputValues(allValues, this.finalPrompt.inputVariables);
    }
    async formatPromptValue(values) {
        return this.finalPrompt.formatPromptValue(await this.formatPipelinePrompts(values));
    }
    async format(values) {
        return this.finalPrompt.format(await this.formatPipelinePrompts(values));
    }
    async partial(values) {
        const promptDict = {
            ...this
        };
        promptDict.inputVariables = this.inputVariables.filter((iv)=>!(iv in values));
        promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
        };
        return new PipelinePromptTemplate(promptDict);
    }
    serialize() {
        throw new Error("Not implemented.");
    }
    _getPromptType() {
        return "pipeline";
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/prompts/index.js











/***/ }),

/***/ 80037:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PromptTemplate: () => (/* binding */ PromptTemplate)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12588);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43131);


/**
 * Schema to represent a basic prompt for an LLM.
 * @augments BasePromptTemplate
 * @augments PromptTemplateInput
 *
 * @example
 * ```ts
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = new PromptTemplate({
 *   inputVariables: ["foo"],
 *   template: "Say {foo}",
 * });
 * ```
 */ class PromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseStringPromptTemplate */ .Al {
    constructor(input){
        super(input);
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .checkValidTemplate */ .af)(this.template, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "prompt";
    }
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        return (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .renderTemplate */ .SM)(this.template, this.templateFormat, allValues);
    }
    /**
     * Take examples in list format with prefix and suffix to create a prompt.
     *
     * Intendend to be used a a way to dynamically create a prompt from examples.
     *
     * @param examples - List of examples to use in the prompt.
     * @param suffix - String to go after the list of examples. Should generally set up the user's input.
     * @param inputVariables - A list of variable names the final prompt template will expect
     * @param exampleSeparator - The separator to use in between examples
     * @param prefix - String that should go before any examples. Generally includes examples.
     *
     * @returns The final prompt template generated.
     */ static fromExamples(examples, suffix, inputVariables, exampleSeparator = "\n\n", prefix = "") {
        const template = [
            prefix,
            ...examples,
            suffix
        ].join(exampleSeparator);
        return new PromptTemplate({
            inputVariables,
            template
        });
    }
    /**
     * Load prompt template from a template f-string
     */ static fromTemplate(template, { templateFormat = "f-string", ...rest } = {}) {
        const names = new Set();
        (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .parseTemplate */ .$M)(template, templateFormat).forEach((node)=>{
            if (node.type === "variable") {
                names.add(node.name);
            }
        });
        return new PromptTemplate({
            inputVariables: [
                ...names
            ],
            templateFormat,
            template,
            ...rest
        });
    }
    async partial(values) {
        const promptDict = {
            ...this
        };
        promptDict.inputVariables = this.inputVariables.filter((iv)=>!(iv in values));
        promptDict.partialVariables = {
            ...this.partialVariables ?? {},
            ...values
        };
        return new PromptTemplate(promptDict);
    }
    serialize() {
        if (this.outputParser !== undefined) {
            throw new Error("Cannot serialize a prompt template with an output parser");
        }
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            template: this.template,
            template_format: this.templateFormat
        };
    }
    static async deserialize(data) {
        if (!data.template) {
            throw new Error("Prompt template must have a template");
        }
        const res = new PromptTemplate({
            inputVariables: data.input_variables,
            template: data.template,
            templateFormat: data.template_format
        });
        return res;
    }
}


/***/ }),

/***/ 43131:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $M: () => (/* binding */ parseTemplate),
/* harmony export */   SM: () => (/* binding */ renderTemplate),
/* harmony export */   af: () => (/* binding */ checkValidTemplate)
/* harmony export */ });
/* unused harmony exports parseFString, interpolateFString, DEFAULT_FORMATTER_MAPPING, DEFAULT_PARSER_MAPPING */
const parseFString = (template)=>{
    // Core logic replicated from internals of pythons built in Formatter class.
    // https://github.com/python/cpython/blob/135ec7cefbaffd516b77362ad2b2ad1025af462e/Objects/stringlib/unicode_format.h#L700-L706
    const chars = template.split("");
    const nodes = [];
    const nextBracket = (bracket, start)=>{
        for(let i = start; i < chars.length; i += 1){
            if (bracket.includes(chars[i])) {
                return i;
            }
        }
        return -1;
    };
    let i = 0;
    while(i < chars.length){
        if (chars[i] === "{" && i + 1 < chars.length && chars[i + 1] === "{") {
            nodes.push({
                type: "literal",
                text: "{"
            });
            i += 2;
        } else if (chars[i] === "}" && i + 1 < chars.length && chars[i + 1] === "}") {
            nodes.push({
                type: "literal",
                text: "}"
            });
            i += 2;
        } else if (chars[i] === "{") {
            const j = nextBracket("}", i);
            if (j < 0) {
                throw new Error("Unclosed '{' in template.");
            }
            nodes.push({
                type: "variable",
                name: chars.slice(i + 1, j).join("")
            });
            i = j + 1;
        } else if (chars[i] === "}") {
            throw new Error("Single '}' in template.");
        } else {
            const next = nextBracket("{}", i);
            const text = (next < 0 ? chars.slice(i) : chars.slice(i, next)).join("");
            nodes.push({
                type: "literal",
                text
            });
            i = next < 0 ? chars.length : next;
        }
    }
    return nodes;
};
const interpolateFString = (template, values)=>parseFString(template).reduce((res, node)=>{
        if (node.type === "variable") {
            if (node.name in values) {
                return res + values[node.name];
            }
            throw new Error(`Missing value for input ${node.name}`);
        }
        return res + node.text;
    }, "");
const DEFAULT_FORMATTER_MAPPING = {
    "f-string": interpolateFString,
    jinja2: (_, __)=>""
};
const DEFAULT_PARSER_MAPPING = {
    "f-string": parseFString,
    jinja2: (_)=>[]
};
const renderTemplate = (template, templateFormat, inputValues)=>DEFAULT_FORMATTER_MAPPING[templateFormat](template, inputValues);
const parseTemplate = (template, templateFormat)=>DEFAULT_PARSER_MAPPING[templateFormat](template);
const checkValidTemplate = (template, templateFormat, inputVariables)=>{
    if (!(templateFormat in DEFAULT_FORMATTER_MAPPING)) {
        const validFormats = Object.keys(DEFAULT_FORMATTER_MAPPING);
        throw new Error(`Invalid template format. Got \`${templateFormat}\`;
                         should be one of ${validFormats}`);
    }
    try {
        const dummyInputs = inputVariables.reduce((acc, v)=>{
            acc[v] = "foo";
            return acc;
        }, {});
        renderTemplate(template, templateFormat, dummyInputs);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e) {
        throw new Error(`Invalid prompt schema: ${e.message}`);
    }
};


/***/ }),

/***/ 18585:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cr: () => (/* binding */ FunctionMessageChunk),
/* harmony export */   GC: () => (/* binding */ AIMessageChunk),
/* harmony export */   HD: () => (/* binding */ ChatMessageChunk),
/* harmony export */   J: () => (/* binding */ ChatMessage),
/* harmony export */   Ls: () => (/* binding */ ChatGenerationChunk),
/* harmony export */   MJ: () => (/* binding */ BasePromptValue),
/* harmony export */   WH: () => (/* binding */ RUN_KEY),
/* harmony export */   gY: () => (/* binding */ AIMessage),
/* harmony export */   jN: () => (/* binding */ SystemMessage),
/* harmony export */   ro: () => (/* binding */ HumanMessageChunk),
/* harmony export */   xk: () => (/* binding */ HumanMessage),
/* harmony export */   xq: () => (/* binding */ SystemMessageChunk)
/* harmony export */ });
/* unused harmony exports GenerationChunk, BaseMessage, BaseMessageChunk, BaseChatMessage, HumanChatMessage, AIChatMessage, SystemChatMessage, FunctionMessage, BaseChatMessageHistory, BaseListChatMessageHistory, BaseCache, BaseFileStore, BaseEntityStore, Docstore */
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24655);

const RUN_KEY = "__run";
/**
 * Chunk of a single generation. Used for streaming.
 */ class GenerationChunk {
    constructor(fields){
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "generationInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = fields.text;
        this.generationInfo = fields.generationInfo;
    }
    concat(chunk) {
        return new GenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo
            }
        });
    }
}
class BaseMessage extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .i {
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */ get text() {
        return this.content;
    }
    constructor(fields, /** @deprecated */ kwargs){
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = {
                content: fields,
                additional_kwargs: kwargs
            };
        }
        // Make sure the default value for additional_kwargs is passed into super() for serialization
        if (!fields.additional_kwargs) {
            // eslint-disable-next-line no-param-reassign
            fields.additional_kwargs = {};
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** The text of the message. */ Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */ Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Additional keyword arguments */ Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.content = fields.content;
        this.additional_kwargs = fields.additional_kwargs;
    }
    toDict() {
        return {
            type: this._getType(),
            data: this.toJSON().kwargs
        };
    }
}
class BaseMessageChunk extends BaseMessage {
    static _mergeAdditionalKwargs(left, right) {
        const merged = {
            ...left
        };
        for (const [key, value] of Object.entries(right)){
            if (merged[key] === undefined) {
                merged[key] = value;
            } else if (typeof merged[key] !== typeof value) {
                throw new Error(`additional_kwargs[${key}] already exists in the message chunk, but with a different type.`);
            } else if (typeof merged[key] === "string") {
                merged[key] = merged[key] + value;
            } else if (!Array.isArray(merged[key]) && typeof merged[key] === "object") {
                merged[key] = this._mergeAdditionalKwargs(merged[key], value);
            } else {
                throw new Error(`additional_kwargs[${key}] already exists in this message chunk.`);
            }
        }
        return merged;
    }
}
class HumanMessage extends BaseMessage {
    _getType() {
        return "human";
    }
}
class HumanMessageChunk extends BaseMessageChunk {
    _getType() {
        return "human";
    }
    concat(chunk) {
        return new HumanMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: HumanMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs)
        });
    }
}
class AIMessage extends BaseMessage {
    _getType() {
        return "ai";
    }
}
class AIMessageChunk extends BaseMessageChunk {
    _getType() {
        return "ai";
    }
    concat(chunk) {
        return new AIMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: AIMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs)
        });
    }
}
class SystemMessage extends BaseMessage {
    _getType() {
        return "system";
    }
}
class SystemMessageChunk extends BaseMessageChunk {
    _getType() {
        return "system";
    }
    concat(chunk) {
        return new SystemMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: SystemMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs)
        });
    }
}
/**
 * @deprecated
 * Use {@link BaseMessage} instead.
 */ const BaseChatMessage = (/* unused pure expression or super */ null && (BaseMessage));
/**
 * @deprecated
 * Use {@link HumanMessage} instead.
 */ const HumanChatMessage = (/* unused pure expression or super */ null && (HumanMessage));
/**
 * @deprecated
 * Use {@link AIMessage} instead.
 */ const AIChatMessage = (/* unused pure expression or super */ null && (AIMessage));
/**
 * @deprecated
 * Use {@link SystemMessage} instead.
 */ const SystemChatMessage = (/* unused pure expression or super */ null && (SystemMessage));
class FunctionMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(fields, /** @deprecated */ name){
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = {
                content: fields,
                name
            };
        }
        super(fields);
    }
    _getType() {
        return "function";
    }
}
class FunctionMessageChunk extends BaseMessageChunk {
    _getType() {
        return "function";
    }
    concat(chunk) {
        return new FunctionMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: FunctionMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            name: this.name ?? ""
        });
    }
}
class ChatMessage extends BaseMessage {
    constructor(fields, role){
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = {
                content: fields,
                role: role
            };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
}
class ChatMessageChunk extends BaseMessageChunk {
    constructor(fields, role){
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = {
                content: fields,
                role: role
            };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    concat(chunk) {
        return new ChatMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: ChatMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            role: this.role
        });
    }
}
class ChatGenerationChunk extends GenerationChunk {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.message = fields.message;
    }
    concat(chunk) {
        return new ChatGenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo
            },
            message: this.message.concat(chunk.message)
        });
    }
}
/**
 * Base PromptValue class. All prompt values should extend this class.
 */ class BasePromptValue extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .i {
}
class BaseChatMessageHistory extends (/* unused pure expression or super */ null && (Serializable)) {
}
class BaseListChatMessageHistory extends (/* unused pure expression or super */ null && (Serializable)) {
    addUserMessage(message) {
        return this.addMessage(new HumanMessage(message));
    }
    addAIChatMessage(message) {
        return this.addMessage(new AIMessage(message));
    }
}
class BaseCache {
}
class BaseFileStore extends (/* unused pure expression or super */ null && (Serializable)) {
}
class BaseEntityStore extends (/* unused pure expression or super */ null && (Serializable)) {
}
class Docstore {
}


/***/ }),

/***/ 28803:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bI: () => (/* binding */ BaseOutputParser)
/* harmony export */ });
/* unused harmony exports BaseLLMOutputParser, OutputParserException */
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24655);

class BaseLLMOutputParser extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .i {
    parseResultWithPrompt(generations, _prompt, callbacks) {
        return this.parseResult(generations, callbacks);
    }
}
/** Class to parse the output of an LLM call.
 */ class BaseOutputParser extends BaseLLMOutputParser {
    parseResult(generations, callbacks) {
        return this.parse(generations[0].text, callbacks);
    }
    async parseWithPrompt(text, _prompt, callbacks) {
        return this.parse(text, callbacks);
    }
    /**
     * Return the string type key uniquely identifying this class of parser
     */ _type() {
        throw new Error("_type not implemented");
    }
}
class OutputParserException extends (/* unused pure expression or super */ null && (Error)) {
    constructor(message, output){
        super(message);
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.output = output;
    }
}


/***/ }),

/***/ 73324:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ readableStreamToAsyncIterable),
/* harmony export */   Q: () => (/* binding */ IterableReadableStream)
/* harmony export */ });
/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */ function readableStreamToAsyncIterable(// eslint-disable-next-line @typescript-eslint/no-explicit-any
stream, preventCancel = false) {
    if (stream[Symbol.asyncIterator]) {
        return stream[Symbol.asyncIterator]();
    }
    const reader = stream.getReader();
    return {
        async next () {
            try {
                const result = await reader.read();
                if (result.done) reader.releaseLock(); // release lock when stream becomes closed
                return result;
            } catch (e) {
                reader.releaseLock(); // release lock when stream becomes errored
                throw e;
            }
        },
        async return () {
            if (!preventCancel) {
                const cancelPromise = reader.cancel(); // cancel first, but don't await yet
                reader.releaseLock(); // release lock first
                await cancelPromise; // now await it
            } else {
                reader.releaseLock();
            }
            return {
                done: true,
                value: undefined
            };
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}
class IterableReadableStream extends ReadableStream {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) {
            this.reader = this.getReader();
        }
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done) this.reader.releaseLock(); // release lock when stream becomes closed
            return result;
        } catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
        this.reader.releaseLock(); // release lock first
        await cancelPromise; // now await it
        return {
            done: true,
            value: undefined
        };
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull (controller) {
                const { value, done } = await generator.next();
                if (done) {
                    controller.close();
                } else if (value) {
                    controller.enqueue(value);
                }
            }
        });
    }
}


/***/ }),

/***/ 67464:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  b: () => (/* binding */ encodingForModel)
});

// UNUSED EXPORTS: getEncoding

;// CONCATENATED MODULE: ./node_modules/.pnpm/js-tiktoken@1.0.7/node_modules/js-tiktoken/dist/chunk-XXPGZHWZ.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};


// EXTERNAL MODULE: ./node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js
var base64_js = __webpack_require__(71946);
;// CONCATENATED MODULE: ./node_modules/.pnpm/js-tiktoken@1.0.7/node_modules/js-tiktoken/dist/chunk-THGZSONF.js


// src/utils.ts
function never(_) {}
function bytePairMerge(piece, ranks) {
    let parts = Array.from({
        length: piece.length
    }, (_, i)=>({
            start: i,
            end: i + 1
        }));
    while(parts.length > 1){
        let minRank = null;
        for(let i = 0; i < parts.length - 1; i++){
            const slice = piece.slice(parts[i].start, parts[i + 1].end);
            const rank = ranks.get(slice.join(","));
            if (rank == null) continue;
            if (minRank == null || rank < minRank[0]) {
                minRank = [
                    rank,
                    i
                ];
            }
        }
        if (minRank != null) {
            const i = minRank[1];
            parts[i] = {
                start: parts[i].start,
                end: parts[i + 1].end
            };
            parts.splice(i + 1, 1);
        } else {
            break;
        }
    }
    return parts;
}
function bytePairEncode(piece, ranks) {
    if (piece.length === 1) return [
        ranks.get(piece.join(","))
    ];
    return bytePairMerge(piece, ranks).map((p)=>ranks.get(piece.slice(p.start, p.end).join(","))).filter((x)=>x != null);
}
function escapeRegex(str) {
    return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var _Tiktoken = class {
    constructor(ranks, extendedSpecialTokens){
        /** @internal */ this.textEncoder = new TextEncoder();
        /** @internal */ this.textDecoder = new TextDecoder("utf-8");
        /** @internal */ this.rankMap = /* @__PURE__ */ new Map();
        /** @internal */ this.textMap = /* @__PURE__ */ new Map();
        this.patStr = ranks.pat_str;
        const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x)=>{
            const [_, offsetStr, ...tokens] = x.split(" ");
            const offset = Number.parseInt(offsetStr, 10);
            tokens.forEach((token, i)=>memo[token] = offset + i);
            return memo;
        }, {});
        for (const [token, rank] of Object.entries(uncompressed)){
            const bytes = base64_js.toByteArray(token);
            this.rankMap.set(bytes.join(","), rank);
            this.textMap.set(rank, bytes);
        }
        this.specialTokens = {
            ...ranks.special_tokens,
            ...extendedSpecialTokens
        };
        this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank])=>{
            memo[rank] = this.textEncoder.encode(text);
            return memo;
        }, {});
    }
    encode(text, allowedSpecial = [], disallowedSpecial = "all") {
        const regexes = new RegExp(this.patStr, "ug");
        const specialRegex = _Tiktoken.specialTokenRegex(Object.keys(this.specialTokens));
        const ret = [];
        const allowedSpecialSet = new Set(allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial);
        const disallowedSpecialSet = new Set(disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter((x)=>!allowedSpecialSet.has(x)) : disallowedSpecial);
        if (disallowedSpecialSet.size > 0) {
            const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
                ...disallowedSpecialSet
            ]);
            const specialMatch = text.match(disallowedSpecialRegex);
            if (specialMatch != null) {
                throw new Error(`The text contains a special token that is not allowed: ${specialMatch[0]}`);
            }
        }
        let start = 0;
        while(true){
            let nextSpecial = null;
            let startFind = start;
            while(true){
                specialRegex.lastIndex = startFind;
                nextSpecial = specialRegex.exec(text);
                if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0])) break;
                startFind = nextSpecial.index + 1;
            }
            const end = nextSpecial?.index ?? text.length;
            for (const match of text.substring(start, end).matchAll(regexes)){
                const piece = this.textEncoder.encode(match[0]);
                const token2 = this.rankMap.get(piece.join(","));
                if (token2 != null) {
                    ret.push(token2);
                    continue;
                }
                ret.push(...bytePairEncode(piece, this.rankMap));
            }
            if (nextSpecial == null) break;
            let token = this.specialTokens[nextSpecial[0]];
            ret.push(token);
            start = nextSpecial.index + nextSpecial[0].length;
        }
        return ret;
    }
    decode(tokens) {
        const res = [];
        let length = 0;
        for(let i2 = 0; i2 < tokens.length; ++i2){
            const token = tokens[i2];
            const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
            if (bytes != null) {
                res.push(bytes);
                length += bytes.length;
            }
        }
        const mergedArray = new Uint8Array(length);
        let i = 0;
        for (const bytes of res){
            mergedArray.set(bytes, i);
            i += bytes.length;
        }
        return this.textDecoder.decode(mergedArray);
    }
};
var Tiktoken = _Tiktoken;
__publicField(Tiktoken, "specialTokenRegex", (tokens)=>{
    return new RegExp(tokens.map((i)=>escapeRegex(i)).join("|"), "g");
});
function getEncodingNameForModel(model) {
    switch(model){
        case "gpt2":
            {
                return "gpt2";
            }
        case "code-cushman-001":
        case "code-cushman-002":
        case "code-davinci-001":
        case "code-davinci-002":
        case "cushman-codex":
        case "davinci-codex":
        case "text-davinci-002":
        case "text-davinci-003":
            {
                return "p50k_base";
            }
        case "code-davinci-edit-001":
        case "text-davinci-edit-001":
            {
                return "p50k_edit";
            }
        case "ada":
        case "babbage":
        case "code-search-ada-code-001":
        case "code-search-babbage-code-001":
        case "curie":
        case "davinci":
        case "text-ada-001":
        case "text-babbage-001":
        case "text-curie-001":
        case "text-davinci-001":
        case "text-search-ada-doc-001":
        case "text-search-babbage-doc-001":
        case "text-search-curie-doc-001":
        case "text-search-davinci-doc-001":
        case "text-similarity-ada-001":
        case "text-similarity-babbage-001":
        case "text-similarity-curie-001":
        case "text-similarity-davinci-001":
            {
                return "r50k_base";
            }
        case "gpt-3.5-turbo-16k-0613":
        case "gpt-3.5-turbo-16k":
        case "gpt-3.5-turbo-0613":
        case "gpt-3.5-turbo-0301":
        case "gpt-3.5-turbo":
        case "gpt-4-32k-0613":
        case "gpt-4-32k-0314":
        case "gpt-4-32k":
        case "gpt-4-0613":
        case "gpt-4-0314":
        case "gpt-4":
        case "text-embedding-ada-002":
            {
                return "cl100k_base";
            }
        default:
            throw new Error("Unknown model");
    }
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/js-tiktoken@1.0.7/node_modules/js-tiktoken/dist/lite.js



// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/async_caller.js
var async_caller = __webpack_require__(67106);
;// CONCATENATED MODULE: ./node_modules/.pnpm/langchain@0.0.120_@huggingface+inference@1.8.0_@pinecone-database+pinecone@0.1.6_axios@1.4.0__er7fjrb2atfoegdcu2uwzeynna/node_modules/langchain/dist/util/tiktoken.js


const cache = {};
const caller = /* #__PURE__ */ new async_caller/* AsyncCaller */.L({});
async function getEncoding(encoding, options) {
    if (!(encoding in cache)) {
        cache[encoding] = caller.fetch(`https://tiktoken.pages.dev/js/${encoding}.json`, {
            signal: options?.signal
        }).then((res)=>res.json()).catch((e)=>{
            delete cache[encoding];
            throw e;
        });
    }
    return new Tiktoken(await cache[encoding], options?.extendedSpecialTokens);
}
async function encodingForModel(model, options) {
    return getEncoding(getEncodingNameForModel(model), options);
}


/***/ }),

/***/ 33317:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pf: () => (/* reexport safe */ _dist_prompts_index_js__WEBPACK_IMPORTED_MODULE_0__.Pf)
/* harmony export */ });
/* harmony import */ var _dist_prompts_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82240);



/***/ }),

/***/ 3312:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gY: () => (/* reexport safe */ _dist_schema_index_js__WEBPACK_IMPORTED_MODULE_0__.gY),
/* harmony export */   xk: () => (/* reexport safe */ _dist_schema_index_js__WEBPACK_IMPORTED_MODULE_0__.xk)
/* harmony export */ });
/* harmony import */ var _dist_schema_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18585);



/***/ })

};
;