"use strict";
(() => {
var exports = {};
exports.id = 892;
exports.ids = [892];
exports.modules = {

/***/ 6803:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ users),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./utils/sample-data.ts
var sample_data = __webpack_require__(1269);
// EXTERNAL MODULE: ./components/Layout.tsx
var Layout = __webpack_require__(1943);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./components/ListItem.tsx



const ListItem = ({ data  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
        href: "/users/[id]",
        as: `/users/${data.id}`,
        children: [
            data.id,
            ":",
            data.name
        ]
    });
/* harmony default export */ const components_ListItem = (ListItem);

;// CONCATENATED MODULE: ./components/List.tsx



const List = ({ items  })=>/*#__PURE__*/ jsx_runtime_.jsx("ul", {
        children: items.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_ListItem, {
                    data: item
                })
            }, item.id))
    });
/* harmony default export */ const components_List = (List);

;// CONCATENATED MODULE: ./pages/users/index.tsx





const WithStaticProps = ({ items  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
        title: "Users List | Next.js + TypeScript Example",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: "Users List"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Example fetching data from inside ",
                    /*#__PURE__*/ jsx_runtime_.jsx("code", {
                        children: "getStaticProps()"
                    }),
                    "."
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "You are currently on: /users"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_List, {
                items: items
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    children: "Go home"
                })
            })
        ]
    });
const getStaticProps = async ()=>{
    // Example for including static props in a Next.js function component page.
    // Don't forget to include the respective types for any props passed into
    // the component.
    const items = sample_data/* sampleUserData */.w;
    return {
        props: {
            items
        }
    };
};
/* harmony default export */ const users = (WithStaticProps);


/***/ }),

/***/ 1269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ sampleUserData)
/* harmony export */ });
/** Dummy user data. */ const sampleUserData = [
    {
        id: 101,
        name: "Alice"
    },
    {
        id: 102,
        name: "Bob"
    },
    {
        id: 103,
        name: "Caroline"
    },
    {
        id: 104,
        name: "Dave"
    }
];


/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [210,932,676,664,943], () => (__webpack_exec__(6803)));
module.exports = __webpack_exports__;

})();