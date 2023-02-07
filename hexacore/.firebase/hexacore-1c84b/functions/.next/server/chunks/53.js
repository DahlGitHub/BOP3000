"use strict";
exports.id = 53;
exports.ids = [53];
exports.modules = {

/***/ 7342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ LoginMail)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const LoginMail = ({ fill , size , height , width , ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
        width: size || width || 24,
        height: size || height || 24,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
            fill: "none",
            stroke: fill,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 1.5,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22"
                })
            ]
        })
    });
};


/***/ }),

/***/ 236:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LE": () => (/* binding */ logInWithEmailAndPassword),
/* harmony export */   "bE": () => (/* binding */ registerWithEmailAndPassword),
/* harmony export */   "g4": () => (/* binding */ signInWithMicrosoft),
/* harmony export */   "l2": () => (/* binding */ app),
/* harmony export */   "qj": () => (/* binding */ signInWithGoogle),
/* harmony export */   "x9": () => (/* binding */ sendPasswordReset)
/* harmony export */ });
/* unused harmony exports auth, db, logout */
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3773);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4826);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(741);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__, firebase_compat_auth__WEBPACK_IMPORTED_MODULE_3__, firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_4__]);
([firebase_auth__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__, firebase_compat_auth__WEBPACK_IMPORTED_MODULE_3__, firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Import the functions you need from the SDKs you need






// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq3uvuimLnuVrF-f3f1VaN3VD5qip2ChQ",
    authDomain: "hexacore-1c84b.firebaseapp.com",
    projectId: "hexacore-1c84b",
    storageBucket: "hexacore-1c84b.appspot.com",
    messagingSenderId: "1090430226645",
    appId: "1:1090430226645:web:b14a47eaf66fc1e9fc525c"
};
// Initialize Firebase
const app = firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__["default"].initializeApp(firebaseConfig);
const googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthProvider();
const microsoftProvider = new firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__["default"].auth.OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
    prompt: "consent",
    tenant: "52c4340a-af1c-4010-b7e4-08e63d51696f"
});
const auth = firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__["default"].auth();
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);
const signInWithGoogle = async ()=>{
    try {
        const res = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signInWithPopup)(auth, googleProvider);
        const user = res.user;
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, "users"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)("uid", "==", user.uid));
        const docs = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q);
        if (docs.docs.length === 0) {
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const signInWithMicrosoft = async ()=>{
    try {
        const res = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signInWithPopup)(auth, microsoftProvider);
        const user = res.user;
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, "users"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)("uid", "==", user.uid));
        const docs = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q);
        if (docs.docs.length === 0) {
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "microsoft",
                email: user.email
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logInWithEmailAndPassword = async (email, password)=>{
    try {
        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signInWithEmailAndPassword)(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (firstName, lastName, email, password)=>{
    try {
        const res = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.createUserWithEmailAndPassword)(auth, email, password);
        const user = res.user;
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, "users"), {
            uid: user.uid,
            firstName,
            lastName,
            authProvider: "local",
            email
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email)=>{
    try {
        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.sendPasswordResetEmail)(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = ()=>{
    signOut(auth);
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;