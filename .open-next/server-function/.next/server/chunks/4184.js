"use strict";
exports.id = 4184;
exports.ids = [4184];
exports.modules = {

/***/ 75215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ components_UserHoverCard)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-hover-card@1.0.6_@types+react-dom@18.2.4_@types+react@18.2.6_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-hover-card/dist/index.mjs
var dist = __webpack_require__(30405);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(46006);
;// CONCATENATED MODULE: ./components/ui/hover-card.tsx
/* __next_internal_client_entry_do_not_use__ HoverCard,HoverCardTrigger,HoverCardContent auto */ 



const HoverCard = dist/* Root */.fC;
const HoverCardTrigger = dist/* Trigger */.xz;
const HoverCardContent = /*#__PURE__*/ react_.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Content */.VY, {
        ref: ref,
        align: align,
        sideOffset: sideOffset,
        className: (0,utils.cn)("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
        ...props
    }));
HoverCardContent.displayName = dist/* Content */.VY.displayName;


// EXTERNAL MODULE: ./components/ui/avatar.tsx
var avatar = __webpack_require__(95741);
;// CONCATENATED MODULE: ./utils/timestampDate.ts
const timestampDate = (timestamp)=>{
    const date = new Date(timestamp);
    function formatDate(date) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    const formattedDate = formatDate(date);
    return formattedDate;
};
/* harmony default export */ const utils_timestampDate = (timestampDate);

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/link.js
var next_link = __webpack_require__(71930);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-markdown@8.0.7_@types+react@18.2.6_react@18.2.0/node_modules/react-markdown/lib/react-markdown.js + 108 modules
var react_markdown = __webpack_require__(77355);
// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.260.0_react@18.2.0/node_modules/lucide-react/dist/cjs/lucide-react.js
var lucide_react = __webpack_require__(39850);
;// CONCATENATED MODULE: ./components/UserHoverCard.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






const UserHoverCard = ({ user, nameClass })=>{
    const date = utils_timestampDate(user?.createdDate);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(HoverCard, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(HoverCardTrigger, {
                className: nameClass,
                asChild: true,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                    href: `/user/${user?.username}`,
                    children: [
                        "@",
                        user?.username
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(HoverCardContent, {
                className: "w-80 bg-background/75 backdrop-blur-md",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex space-x-4",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(avatar.Avatar, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(avatar.AvatarImage, {
                                    src: user?.image
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(avatar.AvatarFallback, {
                                    children: user?.username?.charAt(0).toUpperCase()
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "space-y-1 self-start",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                    className: "text-sm font-semibold",
                                    children: [
                                        "@",
                                        user?.username
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_markdown/* ReactMarkdown */.D, {
                                        children: user?.bio
                                    }) ?? "Cognite bio"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex items-center pt-2",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(lucide_react/* CalendarDays */.E_O, {
                                            className: "mr-2 h-4 w-4 opacity-70"
                                        }),
                                        " ",
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                "Joined ",
                                                date
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const components_UserHoverCard = (UserHoverCard);


/***/ }),

/***/ 37427:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports __esModule, $$typeof */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1926);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/ayaanzaveri/Code/cognite/components/UserHoverCard.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;