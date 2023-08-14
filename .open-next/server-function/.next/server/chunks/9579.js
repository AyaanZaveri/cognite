exports.id = 9579;
exports.ids = [9579];
exports.modules = {

/***/ 18853:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 71787, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 47004, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 96033, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 60057, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 12319, 23))

/***/ }),

/***/ 97149:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 82705, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 86292));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 95618, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 64456));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 61392));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 89376));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 47086))

/***/ }),

/***/ 28937:
/***/ (() => {



/***/ }),

/***/ 86292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignIn: () => (/* binding */ SignIn),
/* harmony export */   SignInSmaller: () => (/* binding */ SignInSmaller)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79271);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(326);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ SignIn,SignInSmaller auto */ 


function SignIn() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_1__/* .Button */ .z, {
        className: "mt-12",
        size: "lg",
        onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)(),
        children: "Sign In"
    });
}
function SignInSmaller() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_1__/* .Button */ .z, {
        variant: "outline",
        onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)(),
        children: "Sign In"
    });
}


/***/ }),

/***/ 64456:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModeToggle: () => (/* binding */ ModeToggle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39850);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56606);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79271);
/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51236);
/* __next_internal_client_entry_do_not_use__ ModeToggle auto */ 





function ModeToggle() {
    const { setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_2__/* .useTheme */ .F)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenu */ .h_, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuTrigger */ .$F, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                    variant: "outline",
                    size: "icon",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_5__/* .Sun */ .kOA, {
                            className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_5__/* .Moon */ .JFe, {
                            className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "sr-only",
                            children: "Toggle theme"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuContent */ .AW, {
                align: "end",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuItem */ .Xi, {
                        onClick: ()=>setTheme("light"),
                        children: "Light"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuItem */ .Xi, {
                        onClick: ()=>setTheme("dark"),
                        children: "Dark"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuItem */ .Xi, {
                        onClick: ()=>setTheme("system"),
                        children: "System"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 61392:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56606);
/* __next_internal_client_entry_do_not_use__ ThemeProvider auto */ 


function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_themes__WEBPACK_IMPORTED_MODULE_2__/* .ThemeProvider */ .f, {
        ...props,
        children: children
    });
}


/***/ }),

/***/ 79271:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ buttonVariants),
/* harmony export */   z: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(96004);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75237);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46006);





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition active:scale-[0.98] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-9 rounded-md px-3 text-sm",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .Slot */ .g7 : "button";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Comp, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button.displayName = "Button";



/***/ }),

/***/ 51236:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $F: () => (/* binding */ DropdownMenuTrigger),
/* harmony export */   AW: () => (/* binding */ DropdownMenuContent),
/* harmony export */   VD: () => (/* binding */ DropdownMenuSeparator),
/* harmony export */   Xi: () => (/* binding */ DropdownMenuItem),
/* harmony export */   h_: () => (/* binding */ DropdownMenu)
/* harmony export */ });
/* unused harmony exports DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25613);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39850);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46006);
/* __next_internal_client_entry_do_not_use__ DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuCheckboxItem,DropdownMenuRadioItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuGroup,DropdownMenuPortal,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuRadioGroup auto */ 




const DropdownMenu = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC;
const DropdownMenuTrigger = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .xz;
const DropdownMenuGroup = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .ZA;
const DropdownMenuPortal = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .Uv;
const DropdownMenuSub = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Sub */ .Tr;
const DropdownMenuRadioGroup = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .RadioGroup */ .Ee;
const DropdownMenuSubTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubTrigger */ .fF, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_4__/* .ChevronRight */ ._Qn, {
                className: "ml-auto h-4 w-4"
            })
        ]
    }));
DropdownMenuSubTrigger.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubTrigger */ .fF.displayName;
const DropdownMenuSubContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubContent */ .tu, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
        ...props
    }));
DropdownMenuSubContent.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubContent */ .tu.displayName;
const DropdownMenuContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .Uv, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .VY, {
            ref: ref,
            sideOffset: sideOffset,
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        })
    }));
DropdownMenuContent.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .VY.displayName;
const DropdownMenuItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, inset, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .ck, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className),
        ...props
    }));
DropdownMenuItem.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .ck.displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .CheckboxItem */ .oC, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .ItemIndicator */ .wU, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_4__/* .Check */ .JrY, {
                        className: "h-4 w-4"
                    })
                })
            }),
            children
        ]
    }));
DropdownMenuCheckboxItem.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .CheckboxItem */ .oC.displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .RadioItem */ .Rk, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .ItemIndicator */ .wU, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_4__/* .Circle */ .Cdc, {
                        className: "h-2 w-2 fill-current"
                    })
                })
            }),
            children
        ]
    }));
DropdownMenuRadioItem.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .RadioItem */ .Rk.displayName;
const DropdownMenuLabel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, inset, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .__, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
        ...props
    }));
DropdownMenuLabel.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .__.displayName;
const DropdownMenuSeparator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Separator */ .Z0, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }));
DropdownMenuSeparator.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Separator */ .Z0.displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("ml-auto text-xs tracking-widest opacity-60", className),
        ...props
    });
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";



/***/ }),

/***/ 27961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FN: () => (/* binding */ Toast),
/* harmony export */   Mi: () => (/* binding */ ToastTitle),
/* harmony export */   VW: () => (/* binding */ ToastProvider),
/* harmony export */   _i: () => (/* binding */ ToastViewport),
/* harmony export */   gD: () => (/* binding */ ToastAction),
/* harmony export */   lj: () => (/* binding */ ToastDescription),
/* harmony export */   sA: () => (/* binding */ ToastClose)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99782);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75237);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39850);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46006);






const ToastProvider = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Provider */ .zt;
const ToastViewport = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Viewport */ .l_, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }));
ToastViewport.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Viewport */ .l_.displayName;
const toastVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_4__/* .cva */ .j)("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(toastVariants({
            variant
        }), className),
        ...props
    });
});
Toast.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC.displayName;
const ToastAction = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Action */ .aU, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }));
ToastAction.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Action */ .aU.displayName;
const ToastClose = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_5__.X, {
            className: "h-4 w-4"
        })
    }));
ToastClose.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8.displayName;
const ToastTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Title */ .Dx, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm font-semibold", className),
        ...props
    }));
ToastTitle.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Title */ .Dx.displayName;
const ToastDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Description */ .dk, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm opacity-90", className),
        ...props
    }));
ToastDescription.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_2__/* .Description */ .dk.displayName;



/***/ }),

/***/ 89376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toaster: () => (/* binding */ Toaster)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ui_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27961);
/* harmony import */ var _components_ui_use_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57802);
/* __next_internal_client_entry_do_not_use__ Toaster auto */ 


function Toaster() {
    const { toasts } = (0,_components_ui_use_toast__WEBPACK_IMPORTED_MODULE_2__/* .useToast */ .pm)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_1__/* .ToastProvider */ .VW, {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN, {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_toast__WEBPACK_IMPORTED_MODULE_1__/* .ToastTitle */ .Mi, {
                                    children: title
                                }),
                                description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_toast__WEBPACK_IMPORTED_MODULE_1__/* .ToastDescription */ .lj, {
                                    children: description
                                })
                            ]
                        }),
                        action,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_toast__WEBPACK_IMPORTED_MODULE_1__/* .ToastClose */ .sA, {})
                    ]
                }, id);
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_toast__WEBPACK_IMPORTED_MODULE_1__/* .ToastViewport */ ._i, {})
        ]
    });
}


/***/ }),

/***/ 57802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Am: () => (/* binding */ toast),
/* harmony export */   pm: () => (/* binding */ useToast)
/* harmony export */ });
/* unused harmony export reducer */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// Inspired by react-hot-toast library

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(memoryState);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}



/***/ }),

/***/ 46006:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96925);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56497);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .m)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .W)(inputs));
}


/***/ }),

/***/ 26918:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ e1),
/* harmony export */   c: () => (/* binding */ e0)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1926);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/ayaanzaveri/Code/cognition/app/actions.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["SignIn"];

const e1 = proxy["SignInSmaller"];


/***/ }),

/***/ 42718:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(1469);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/font/google/target.css?{"path":"components/Sidebar.tsx","import":"Space_Grotesk","arguments":[{"subsets":["latin"],"weight":["300","400","500","600","700"]}],"variableName":"space_grotesk"}
var Sidebar_tsx_import_Space_Grotesk_arguments_subsets_latin_weight_300_400_500_600_700_variableName_space_grotesk_ = __webpack_require__(29169);
var Sidebar_tsx_import_Space_Grotesk_arguments_subsets_latin_weight_300_400_500_600_700_variableName_space_grotesk_default = /*#__PURE__*/__webpack_require__.n(Sidebar_tsx_import_Space_Grotesk_arguments_subsets_latin_weight_300_400_500_600_700_variableName_space_grotesk_);
// EXTERNAL MODULE: ./app/actions.tsx
var actions = __webpack_require__(26918);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/image.js
var next_image = __webpack_require__(75376);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/link.js
var next_link = __webpack_require__(33270);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-icons@4.10.1_react@18.2.0/node_modules/react-icons/tb/index.esm.js
var index_esm = __webpack_require__(39978);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1926);
;// CONCATENATED MODULE: ./components/ModeToggle.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/ayaanzaveri/Code/cognition/components/ModeToggle.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["ModeToggle"];

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.12_@babel+core@7.22.9_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(49994);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-slot@1.0.2_@types+react@18.2.6_react@18.2.0/node_modules/@radix-ui/react-slot/dist/index.mjs + 2 modules
var dist = __webpack_require__(48109);
// EXTERNAL MODULE: ./node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs
var class_variance_authority_dist = __webpack_require__(32420);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(90430);
;// CONCATENATED MODULE: ./components/ui/button.tsx





const buttonVariants = (0,class_variance_authority_dist/* cva */.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition active:scale-[0.98] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-9 rounded-md px-3 text-sm",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react_shared_subset.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? dist/* Slot */.g7 : "button";
    return /*#__PURE__*/ jsx_runtime_.jsx(Comp, {
        className: (0,utils.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button.displayName = "Button";


;// CONCATENATED MODULE: ./components/Sidebar.tsx








const Sidebar = ({ session })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `fixed z-20 h-full w-[240px] hidden md:block select-none border-r bg-accent/25`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: `/`,
                className: "absolute top-0 mx-3 my-4",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "group relative transition-all duration-1000 ease-in-out",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: "/fire_3d.png",
                            alt: "Cognition Logo",
                            width: 42,
                            height: 42,
                            unoptimized: true,
                            className: "block transition-all duration-1000 ease-in-out group-hover:hidden",
                            draggable: false
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: "/fire_animated.png",
                            alt: "Cognition Logo",
                            unoptimized: true,
                            width: 42,
                            height: 42,
                            className: "hidden transition-all duration-1000 ease-in-out group-hover:block",
                            draggable: false
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `mt-8 flex flex-col items-center justify-center gap-1 px-2 pt-16`,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/create",
                        className: "inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-muted hover:ring-1 hover:ring-accent active:scale-[0.98]",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* TbSquareRoundedPlus */.be$, {
                                className: "h-5 w-5"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: `${(Sidebar_tsx_import_Space_Grotesk_arguments_subsets_latin_weight_300_400_500_600_700_variableName_space_grotesk_default()).className} font-medium`,
                                children: "Create"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/explore",
                        className: "inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-muted hover:ring-1 hover:ring-muted active:scale-[0.98]",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* TbTelescope */.Mq6, {
                                className: "h-5 w-5"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: `${(Sidebar_tsx_import_Space_Grotesk_arguments_subsets_latin_weight_300_400_500_600_700_variableName_space_grotesk_default()).className} font-medium`,
                                children: "Explore"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/me",
                        className: "inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-muted hover:ring-1 hover:ring-accent active:scale-[0.98]",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* TbUserCircle */.Kam, {
                                className: "h-5 w-5"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: `${(Sidebar_tsx_import_Space_Grotesk_arguments_subsets_latin_weight_300_400_500_600_700_variableName_space_grotesk_default()).className} font-medium`,
                                children: "Me"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "absolute bottom-16 p-5",
                children: /*#__PURE__*/ jsx_runtime_.jsx(e0, {})
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "absolute bottom-0 w-full px-2 py-3",
                children: session ? /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                    variant: "outline",
                    className: "w-full rounded-full border-none hover:border-input",
                    asChild: true,
                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: `/profile`,
                        className: "self-start py-7 bg-transparent",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex w-full flex-row items-center gap-2 rounded-full",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "relative h-9 w-9",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        src: session?.user?.image,
                                        alt: "user",
                                        className: "rounded-full",
                                        unoptimized: true,
                                        fill: true
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "text-sm font-medium",
                                            children: ("@" + session?.user?.username) ?? session?.user?.email
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: `text-xs text-muted-foreground`,
                                            children: "Profile"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "p-2",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(actions/* SignInSmaller */.U, {})
                })
            })
        ]
    });
};
/* harmony default export */ const components_Sidebar = (Sidebar);

// EXTERNAL MODULE: ./lib/auth.ts
var auth = __webpack_require__(66298);
;// CONCATENATED MODULE: ./components/ui/toaster.tsx

const toaster_proxy = (0,module_proxy.createProxy)(String.raw`/Users/ayaanzaveri/Code/cognition/components/ui/toaster.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: toaster_esModule, $$typeof: toaster_$$typeof } = toaster_proxy;
const toaster_default_ = toaster_proxy.default;

const toaster_e0 = toaster_proxy["Toaster"];

// EXTERNAL MODULE: ./node_modules/.pnpm/@vercel+analytics@1.0.1/node_modules/@vercel/analytics/dist/react/index.js
var react = __webpack_require__(1114);
;// CONCATENATED MODULE: ./components/theme-provider.tsx

const theme_provider_proxy = (0,module_proxy.createProxy)(String.raw`/Users/ayaanzaveri/Code/cognition/components/theme-provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: theme_provider_esModule, $$typeof: theme_provider_$$typeof } = theme_provider_proxy;
const theme_provider_default_ = theme_provider_proxy.default;

const theme_provider_e0 = theme_provider_proxy["ThemeProvider"];

;// CONCATENATED MODULE: ./app/layout.tsx








const metadata = {
    title: "Cognition",
    description: "Chat with any website",
    icons: {
        icon: "/favicon.ico"
    },
    themeColor: [
        {
            media: "(prefers-color-scheme: light)",
            color: "white"
        },
        {
            media: "(prefers-color-scheme: dark)",
            color: "black"
        }
    ]
};
async function RootLayout({ children }) {
    const session = await (0,auth/* getAuthSession */.P)();
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(theme_provider_e0, {
                    attribute: "class",
                    defaultTheme: "system",
                    enableSystem: true,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components_Sidebar, {
                            session: session?.user ? session : null
                        }),
                        children
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(toaster_e0, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(react/* Analytics */.cp, {})
            ]
        })
    });
}


/***/ }),

/***/ 6788:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Loading() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "p-0 md:pl-[240px]",
        children: "Loading"
    });
}


/***/ }),

/***/ 90430:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19740);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35265);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .m)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .W)(inputs));
}


/***/ }),

/***/ 200:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86407);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 89876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86407);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/png","sizes":"160x160"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "icon.png")

    return [{
      ...imageData,
      url: imageUrl + "?12bf332cdaebd7ca",
    }]
  });

/***/ }),

/***/ 1469:
/***/ (() => {



/***/ })

};
;