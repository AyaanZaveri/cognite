"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataTree", {
    enumerable: true,
    get: function() {
        return MetadataTree;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _basic = require("./generate/basic");
const _alternate = require("./generate/alternate");
const _opengraph = require("./generate/opengraph");
const _icons = require("./generate/icons");
const _resolvemetadata = require("./resolve-metadata");
const _meta = require("./generate/meta");
const _defaultmetadata = require("./default-metadata");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function MetadataTree({ tree , pathname , searchParams , getDynamicParamFromSegment , appUsingSizeAdjust , errorType  }) {
    const metadataContext = {
        pathname
    };
    const resolvedMetadata = await (0, _resolvemetadata.resolveMetadata)({
        tree,
        parentParams: {},
        metadataItems: [],
        searchParams,
        getDynamicParamFromSegment,
        errorConvention: errorType === "redirect" ? undefined : errorType
    });
    let metadata = undefined;
    const defaultMetadata = (0, _defaultmetadata.createDefaultMetadata)();
    // Skip for redirect case as for the temporary redirect case we don't need the metadata on client
    if (errorType === "redirect") {
        metadata = defaultMetadata;
    } else {
        metadata = await (0, _resolvemetadata.accumulateMetadata)(resolvedMetadata, metadataContext);
    }
    const elements = (0, _meta.MetaFilter)([
        (0, _basic.BasicMetadata)({
            metadata
        }),
        (0, _alternate.AlternatesMetadata)({
            alternates: metadata.alternates
        }),
        (0, _basic.ItunesMeta)({
            itunes: metadata.itunes
        }),
        (0, _basic.FormatDetectionMeta)({
            formatDetection: metadata.formatDetection
        }),
        (0, _basic.VerificationMeta)({
            verification: metadata.verification
        }),
        (0, _basic.AppleWebAppMeta)({
            appleWebApp: metadata.appleWebApp
        }),
        (0, _opengraph.OpenGraphMetadata)({
            openGraph: metadata.openGraph
        }),
        (0, _opengraph.TwitterMetadata)({
            twitter: metadata.twitter
        }),
        (0, _opengraph.AppLinksMeta)({
            appLinks: metadata.appLinks
        }),
        (0, _icons.IconsMetadata)({
            icons: metadata.icons
        })
    ]);
    if (appUsingSizeAdjust) elements.push(/*#__PURE__*/ _react.default.createElement("meta", {
        name: "next-size-adjust"
    }));
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, elements.map((el, index)=>{
        return /*#__PURE__*/ _react.default.cloneElement(el, {
            key: index
        });
    }));
}

//# sourceMappingURL=metadata.js.map