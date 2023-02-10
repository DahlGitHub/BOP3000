"use strict";
exports.id = 487;
exports.ids = [487];
exports.modules = {

/***/ 5487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ app_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@nextui-org/react"
var react_ = __webpack_require__(6735);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./public/images/hexacore.png
/* harmony default export */ const hexacore = ({"src":"/_next/static/media/hexacore.235995b9.png","height":204,"width":213,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAkUlEQVR42mMwYjD2NXphlmuaajTT2NiIgcGYwXi+0X/tN4qJxnLG6cZAAR3jJQaXwreGz9GbaTzTWJ7B5L/2/7CVPn/8fvkvYNAx6WYweaj7z39H0JfQhz4TlQJMmhiMuE061IsDJ7of1Htv0mfIymDEYFRmLaPRqvfd+L9RoREDUMBY12iambVppNFqY0kjBgBHiS1URveEXgAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});
;// CONCATENATED MODULE: ./app/NavBar.tsx





const NavBar = ()=>{
    const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "Log Out"
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.Container, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Navbar, {
            isBordered: true,
            variant: "sticky",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Navbar.Toggle, {
                    showIn: "xs"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Navbar.Brand, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: hexacore,
                            alt: "Hexacore",
                            width: 35,
                            height: 35
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                            b: true,
                            color: "inherit",
                            hideIn: "xs",
                            children: "Hexacore"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Navbar.Content, {
                    hideIn: "xs",
                    variant: "underline",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Dropdown, {
                            isBordered: true,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Navbar.Item, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Button, {
                                        auto: true,
                                        css: {
                                            px: 0,
                                            dflex: "center"
                                        },
                                        ripple: false,
                                        children: "Features"
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Dropdown.Menu, {
                                    "aria-label": "ACME features",
                                    css: {
                                        $$dropdownMenuWidth: "340px",
                                        $$dropdownItemHeight: "70px",
                                        "& .nextui-dropdown-item": {
                                            py: "$4",
                                            // dropdown item left icon
                                            svg: {
                                                color: "$secondary",
                                                mr: "$4"
                                            },
                                            // dropdown item title
                                            "& .nextui-dropdown-item-content": {
                                                w: "100%",
                                                fontWeight: "$semibold"
                                            }
                                        }
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                            showFullDescription: true,
                                            description: "ACME scales apps to meet user demand, automagically, based on load.",
                                            children: "Autoscaling"
                                        }, "autoscaling"),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                            showFullDescription: true,
                                            description: "Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.",
                                            children: "Usage Metrics"
                                        }, "usage_metrics"),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                            showFullDescription: true,
                                            description: "ACME runs on ACME, join us and others serving requests at web scale.",
                                            children: "Production Ready"
                                        }, "production_ready"),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                            showFullDescription: true,
                                            description: "Applications stay on the grid with high availability and high uptime guarantees.",
                                            children: "+99% Uptime"
                                        }, "99_uptime"),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                            showFullDescription: true,
                                            description: "Overcome any challenge with a supporting team ready to respond.",
                                            children: "+Supreme Support"
                                        }, "supreme_support")
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "#",
                            children: "Customers"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/about",
                            children: "About"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "#",
                            children: "Company"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Navbar.Content, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Dropdown, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Trigger, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Navbar.Item, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Avatar, {
                                        bordered: true,
                                        as: "button",
                                        color: "secondary",
                                        size: "md",
                                        src: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Dropdown.Menu, {
                                "aria-label": "User menu actions",
                                color: "secondary",
                                onAction: (actionKey)=>console.log({
                                        actionKey
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Dropdown.Item, {
                                        css: {
                                            height: "$18"
                                        },
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                                b: true,
                                                color: "inherit",
                                                css: {
                                                    d: "flex"
                                                },
                                                children: "Signed in as"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                                b: true,
                                                color: "inherit",
                                                css: {
                                                    d: "flex"
                                                },
                                                children: "zoey@example.com"
                                            })
                                        ]
                                    }, "profile"),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                        withDivider: true,
                                        children: "My Settings"
                                    }, "settings"),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                        children: "Team Settings"
                                    }, "team_settings"),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Dropdown.Item, {
                                        withDivider: true,
                                        color: "error",
                                        children: "Log Out"
                                    }, "logout")
                                ]
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Navbar.Collapse, {
                    disableAnimation: true,
                    children: collapseItems.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx(react_.Navbar.CollapseItem, {
                            activeColor: "warning",
                            css: {
                                color: index === collapseItems.length - 1 ? "$error" : ""
                            },
                            isActive: index === 2,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                color: "inherit",
                                href: "#",
                                children: item
                            })
                        }, item))
                })
            ]
        })
    });
};
/* harmony default export */ const app_NavBar = (NavBar);

;// CONCATENATED MODULE: ./app/Footer.tsx


const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.Container, {
        className: "sticky top-[100vh]",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
            className: "p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "sm:flex sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                            href: "/",
                            className: "flex items-center mb-4 sm:mb-0",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "https://cdn.discordapp.com/attachments/1062428707639275650/1072126654366887986/Component_5.png",
                                    className: "h-8 mr-3",
                                    alt: "Flowbite Logo"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    className: "self-center text-2xl font-semibold whitespace-nowrap dark:text-white",
                                    children: "Hexacore"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        className: "mr-4 hover:underline md:mr-6 ",
                                        children: "About"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        className: "mr-4 hover:underline md:mr-6",
                                        children: "Privacy Policy"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        className: "mr-4 hover:underline md:mr-6 ",
                                        children: "Licensing"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        className: "hover:underline",
                                        children: "Contact"
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                    className: "my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: "block text-sm text-gray-500 sm:text-center dark:text-gray-400",
                    children: "\xa9 2023 Hexacore. All Rights Reserved."
                })
            ]
        })
    });
};
/* harmony default export */ const app_Footer = (Footer);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
;// CONCATENATED MODULE: ./app/HeadPage.tsx



const defaultDescription = "";
const defaultKeywords = "";
const defaultOGURL = "";
const defaultOGImage = "";
const Head = (props)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                charSet: "UTF-8"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: props.title || ""
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: props.description || defaultDescription
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "keywords",
                content: props.keywords || defaultKeywords
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/static/favicon-16x16.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/static/favicon-32x32.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "shortcut icon",
                href: "/static/favicon.ico"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/static/apple-touch-icon.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "mask-icon",
                href: "/static/favicon-mask.svg",
                color: "#000000"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:url",
                content: props.url || defaultOGURL
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:title",
                content: props.title || ""
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:description",
                content: props.description || defaultDescription
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:image",
                content: props.ogImage || defaultOGImage
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:image:width",
                content: "1200"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:image:height",
                content: "630"
            })
        ]
    });
Head.propTypes = {
    title: external_prop_types_.string,
    description: external_prop_types_.string,
    keywords: external_prop_types_.string,
    url: external_prop_types_.string,
    ogImage: external_prop_types_.string
};
/* harmony default export */ const HeadPage = (Head);

;// CONCATENATED MODULE: ./app/Layout.tsx





const Layout = ({ children , title ="Hexacore"  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(HeadPage, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("header", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(app_NavBar, {})
            }),
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(app_Footer, {})
        ]
    });
/* harmony default export */ const app_Layout = (Layout);


/***/ })

};
;