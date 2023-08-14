exports.id = 7648;
exports.ids = [7648];
exports.modules = {

/***/ 32652:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Space_Grotesk_e75d16', '__Space_Grotesk_Fallback_e75d16'","fontStyle":"normal"},
	"className": "__className_e75d16"
};


/***/ }),

/***/ 20753:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Space_Grotesk_e75d16', '__Space_Grotesk_Fallback_e75d16'","fontStyle":"normal"},
	"className": "__className_e75d16"
};


/***/ }),

/***/ 71930:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(95618)


/***/ }),

/***/ 18424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(73346)


/***/ }),

/***/ 86434:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fC: () => (/* binding */ $6be4966fd9bbc698$export$be92b6f5f03c0fe9),
  bU: () => (/* binding */ $6be4966fd9bbc698$export$6521433ed15a34db)
});

// UNUSED EXPORTS: Switch, SwitchThumb, createSwitchScope

// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.22.6/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(94050);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+primitive@1.0.1/node_modules/@radix-ui/primitive/dist/index.mjs
var dist = __webpack_require__(14614);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-compose-refs@1.0.1_@types+react@18.2.6_react@18.2.0/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(7655);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-context@1.0.1_@types+react@18.2.6_react@18.2.0/node_modules/@radix-ui/react-context/dist/index.mjs
var react_context_dist = __webpack_require__(34288);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.0.1_@types+react@18.2.6_react@18.2.0/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var react_use_controllable_state_dist = __webpack_require__(65330);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@radix-ui+react-use-previous@1.0.1_@types+react@18.2.6_react@18.2.0/node_modules/@radix-ui/react-use-previous/dist/index.mjs



function $010c2913dbd2fe3d$export$5cae361ad82dce8b(value) {
    const ref = (0,react_.useRef)({
        value: value,
        previous: value
    }); // We compare values before making an update to ensure that
    // a change has been made. This ensures the previous value is
    // persisted correctly between renders.
    return (0,react_.useMemo)(()=>{
        if (ref.current.value !== value) {
            ref.current.previous = ref.current.value;
            ref.current.value = value;
        }
        return ref.current.previous;
    }, [
        value
    ]);
}





//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-use-size@1.0.1_@types+react@18.2.6_react@18.2.0/node_modules/@radix-ui/react-use-size/dist/index.mjs
var react_use_size_dist = __webpack_require__(90290);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-primitive@1.0.3_@types+react-dom@18.2.4_@types+react@18.2.6_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-primitive/dist/index.mjs
var react_primitive_dist = __webpack_require__(58767);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@radix-ui+react-switch@1.0.3_@types+react-dom@18.2.4_@types+react@18.2.6_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-switch/dist/index.mjs



















/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/ const $6be4966fd9bbc698$var$SWITCH_NAME = 'Switch';
const [$6be4966fd9bbc698$var$createSwitchContext, $6be4966fd9bbc698$export$cf7f5f17f69cbd43] = (0,react_context_dist/* createContextScope */.b)($6be4966fd9bbc698$var$SWITCH_NAME);
const [$6be4966fd9bbc698$var$SwitchProvider, $6be4966fd9bbc698$var$useSwitchContext] = $6be4966fd9bbc698$var$createSwitchContext($6be4966fd9bbc698$var$SWITCH_NAME);
const $6be4966fd9bbc698$export$b5d5cf8927ab7262 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeSwitch: __scopeSwitch , name: name , checked: checkedProp , defaultChecked: defaultChecked , required: required , disabled: disabled , value: value = 'on' , onCheckedChange: onCheckedChange , ...switchProps } = props;
    const [button, setButton] = (0,react_.useState)(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.e)(forwardedRef, (node)=>setButton(node)
    );
    const hasConsumerStoppedPropagationRef = (0,react_.useRef)(false); // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = button ? Boolean(button.closest('form')) : true;
    const [checked = false, setChecked] = (0,react_use_controllable_state_dist/* useControllableState */.T)({
        prop: checkedProp,
        defaultProp: defaultChecked,
        onChange: onCheckedChange
    });
    return /*#__PURE__*/ (0,react_.createElement)($6be4966fd9bbc698$var$SwitchProvider, {
        scope: __scopeSwitch,
        checked: checked,
        disabled: disabled
    }, /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.button, (0,esm_extends/* default */.Z)({
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-required": required,
        "data-state": $6be4966fd9bbc698$var$getState(checked),
        "data-disabled": disabled ? '' : undefined,
        disabled: disabled,
        value: value
    }, switchProps, {
        ref: composedRefs,
        onClick: (0,dist/* composeEventHandlers */.M)(props.onClick, (event)=>{
            setChecked((prevChecked)=>!prevChecked
            );
            if (isFormControl) {
                hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(); // if switch is in a form, stop propagation from the button so that we only propagate
                // one click event (from the input). We propagate changes from an input so that native
                // form validation works and form events reflect switch updates.
                if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
        })
    })), isFormControl && /*#__PURE__*/ (0,react_.createElement)($6be4966fd9bbc698$var$BubbleInput, {
        control: button,
        bubbles: !hasConsumerStoppedPropagationRef.current,
        name: name,
        value: value,
        checked: checked,
        required: required,
        disabled: disabled // We transform because the input is absolutely positioned but we have
        ,
        style: {
            transform: 'translateX(-100%)'
        }
    }));
});
/*#__PURE__*/ Object.assign($6be4966fd9bbc698$export$b5d5cf8927ab7262, {
    displayName: $6be4966fd9bbc698$var$SWITCH_NAME
});
/* -------------------------------------------------------------------------------------------------
 * SwitchThumb
 * -----------------------------------------------------------------------------------------------*/ const $6be4966fd9bbc698$var$THUMB_NAME = 'SwitchThumb';
const $6be4966fd9bbc698$export$4d07bf653ea69106 = /*#__PURE__*/ (0,react_.forwardRef)((props, forwardedRef)=>{
    const { __scopeSwitch: __scopeSwitch , ...thumbProps } = props;
    const context = $6be4966fd9bbc698$var$useSwitchContext($6be4966fd9bbc698$var$THUMB_NAME, __scopeSwitch);
    return /*#__PURE__*/ (0,react_.createElement)(react_primitive_dist/* Primitive */.WV.span, (0,esm_extends/* default */.Z)({
        "data-state": $6be4966fd9bbc698$var$getState(context.checked),
        "data-disabled": context.disabled ? '' : undefined
    }, thumbProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6be4966fd9bbc698$export$4d07bf653ea69106, {
    displayName: $6be4966fd9bbc698$var$THUMB_NAME
});
/* ---------------------------------------------------------------------------------------------- */ const $6be4966fd9bbc698$var$BubbleInput = (props)=>{
    const { control: control , checked: checked , bubbles: bubbles = true , ...inputProps } = props;
    const ref = (0,react_.useRef)(null);
    const prevChecked = $010c2913dbd2fe3d$export$5cae361ad82dce8b(checked);
    const controlSize = (0,react_use_size_dist/* useSize */.t)(control); // Bubble checked change to parents (e.g form change event)
    (0,react_.useEffect)(()=>{
        const input = ref.current;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked');
        const setChecked = descriptor.set;
        if (prevChecked !== checked && setChecked) {
            const event = new Event('click', {
                bubbles: bubbles
            });
            setChecked.call(input, checked);
            input.dispatchEvent(event);
        }
    }, [
        prevChecked,
        checked,
        bubbles
    ]);
    return /*#__PURE__*/ (0,react_.createElement)("input", (0,esm_extends/* default */.Z)({
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked
    }, inputProps, {
        tabIndex: -1,
        ref: ref,
        style: {
            ...props.style,
            ...controlSize,
            position: 'absolute',
            pointerEvents: 'none',
            opacity: 0,
            margin: 0
        }
    }));
};
function $6be4966fd9bbc698$var$getState(checked) {
    return checked ? 'checked' : 'unchecked';
}
const $6be4966fd9bbc698$export$be92b6f5f03c0fe9 = $6be4966fd9bbc698$export$b5d5cf8927ab7262;
const $6be4966fd9bbc698$export$6521433ed15a34db = $6be4966fd9bbc698$export$4d07bf653ea69106;





//# sourceMappingURL=index.mjs.map


/***/ })

};
;