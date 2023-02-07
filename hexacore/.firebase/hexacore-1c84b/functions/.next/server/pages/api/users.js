"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 5307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ users)
});

;// CONCATENATED MODULE: ./utils/sample-data.ts
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

;// CONCATENATED MODULE: ./pages/api/users/index.ts

const handler = (_req, res)=>{
    try {
        if (!Array.isArray(sampleUserData)) {
            throw new Error("Cannot find user data");
        }
        res.status(200).json(sampleUserData);
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: err.message
        });
    }
};
/* harmony default export */ const users = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5307));
module.exports = __webpack_exports__;

})();