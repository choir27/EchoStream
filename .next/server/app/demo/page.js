(() => {
  var e = {};
  (e.id = 298),
    (e.ids = [298]),
    (e.modules = {
      5403: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/request-async-storage.external");
      },
      4749: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/static-generation-async-storage.external");
      },
      399: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      5528: (e) => {
        "use strict";
        e.exports = require("next/dist\\client\\components\\action-async-storage.external.js");
      },
      1877: (e) => {
        "use strict";
        e.exports = require("next/dist\\client\\components\\request-async-storage.external.js");
      },
      5319: (e) => {
        "use strict";
        e.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");
      },
      9491: (e) => {
        "use strict";
        e.exports = require("assert");
      },
      2361: (e) => {
        "use strict";
        e.exports = require("events");
      },
      7147: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      3685: (e) => {
        "use strict";
        e.exports = require("http");
      },
      5687: (e) => {
        "use strict";
        e.exports = require("https");
      },
      1017: (e) => {
        "use strict";
        e.exports = require("path");
      },
      5477: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      2781: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      7310: (e) => {
        "use strict";
        e.exports = require("url");
      },
      3837: (e) => {
        "use strict";
        e.exports = require("util");
      },
      9796: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      9694: (e, s, r) => {
        "use strict";
        r.r(s),
          r.d(s, {
            GlobalError: () => n.a,
            __next_app__: () => h,
            originalPathname: () => u,
            pages: () => d,
            routeModule: () => x,
            tree: () => c,
          });
        var t = r(7096),
          a = r(6132),
          i = r(7284),
          n = r.n(i),
          l = r(2564),
          o = {};
        for (let e in l)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "originalPathname",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => l[e]);
        r.d(s, o);
        let c = [
            "",
            {
              children: [
                "demo",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(r.bind(r, 8782)),
                        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\demo\\page.tsx",
                      ],
                    },
                  ],
                },
                {
                  layout: [
                    () => Promise.resolve().then(r.bind(r, 4466)),
                    "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\demo\\layout.tsx",
                  ],
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(r.bind(r, 5345)),
                "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(r.t.bind(r, 9291, 23)),
                "next/dist/client/components/not-found-error",
              ],
            },
          ],
          d = [
            "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\demo\\page.tsx",
          ],
          u = "/demo/page",
          h = { require: r, loadChunk: () => Promise.resolve() },
          x = new t.AppPageRouteModule({
            definition: {
              kind: a.x.APP_PAGE,
              page: "/demo/page",
              pathname: "/demo",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      5975: (e, s, r) => {
        Promise.resolve().then(r.bind(r, 5930));
      },
      5303: () => {},
      5930: (e, s, r) => {
        "use strict";
        r.r(s), r.d(s, { default: () => h });
        var t = r(3854),
          a = r(4218);
        r(910), r(4942);
        var i = r(1018),
          n = r(7868),
          l = r(1855),
          o = r(9557),
          c = r(6438),
          d = r(9519),
          u = r(4755);
        let h = (0, c.Z)(() => {
          let { push: e } = (0, i.useRouter)(),
            s = (0, d.o)((e) => e.searchDisplay),
            r = (0, d.o)((e) => e.setSearchDisplay);
          return (
            (0, a.useEffect)(() => {
              r(!1);
            }, []),
            t.jsx(t.Fragment, {
              children: s
                ? t.jsx(u.default, {})
                : (0, t.jsxs)(t.Fragment, {
                    children: [
                      t.jsx(n.Z, {}),
                      (0, t.jsxs)("section", {
                        id: "auth",
                        className: "main",
                        children: [
                          t.jsx("h1", { children: "Login Demo" }),
                          (0, t.jsxs)("form", {
                            className: "flex column alignStart",
                            method: "POST",
                            action: "#",
                            id: "login",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "flex column",
                                children: [
                                  t.jsx("label", { children: "Email" }),
                                  t.jsx("input", {
                                    type: "text",
                                    name: "email",
                                    value: "bobThebuilder@gmail.com",
                                    disabled: !0,
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className: "flex column",
                                children: [
                                  t.jsx("label", { children: "Password" }),
                                  t.jsx("input", {
                                    type: "password",
                                    name: "password",
                                    value: "bobTheBuilder@123456",
                                    disabled: !0,
                                  }),
                                ],
                              }),
                              t.jsx("input", {
                                className: "button",
                                type: "submit",
                                value: "Login Here",
                                onClick: (s) => {
                                  s.preventDefault(),
                                    (0, o.j)(
                                      "bobThebuilder@gmail.com",
                                      "bobTheBuilder@123456",
                                      e,
                                    );
                                },
                              }),
                            ],
                          }),
                        ],
                      }),
                      t.jsx(l.Z, {}),
                    ],
                  }),
            })
          );
        });
      },
      4755: (e, s, r) => {
        "use strict";
        r.r(s), r.d(s, { default: () => u });
        var t = r(3854);
        r(910), r(4942);
        var a = r(9519),
          i = r(4808),
          n = r(3092),
          l = r(7868),
          o = r(1855),
          c = r(1759),
          d = r(642);
        function u() {
          let e = (0, a.o)((e) => e.searchResults),
            s = (0, i.Z)("auth"),
            r = e.map((e, r) =>
              (0, t.jsxs)(
                "tr",
                {
                  children: [
                    t.jsx("td", { children: e.name ? e.name : e.playlistName }),
                    t.jsx("td", {
                      children: e.audio
                        ? t.jsx("button", {
                            className: "button small",
                            onClick: (s) => {
                              s.preventDefault(),
                                localStorage.setItem("song", e.$id),
                                window.location.reload();
                            },
                            children: "Play",
                          })
                        : "",
                    }),
                    t.jsx("td", {}),
                    t.jsx("td", { children: e.user }),
                    t.jsx("td", {
                      children: e.audio ? t.jsx(c.Z, { index: r }) : "  ",
                    }),
                    t.jsx("td", {
                      children:
                        s?.toLowerCase() === e.user && e.audio
                          ? (0, n.z)({
                              text: "",
                              className: "fa-solid fa-trash button small",
                              onClick: (s) => (0, d.at)(e.$id, e.cloudinaryId),
                            })
                          : "",
                    }),
                  ],
                },
                `${e.$id}-${e.name}`,
              ),
            );
          return (0, t.jsxs)(t.Fragment, {
            children: [
              t.jsx(l.Z, {}),
              t.jsx("section", {
                id: "home",
                className: "main",
                children: (0, t.jsxs)("div", {
                  id: "tableContainer",
                  children: [
                    t.jsx("h2", { children: "Search Results" }),
                    e.length
                      ? (0, t.jsxs)("table", {
                          children: [
                            t.jsx("thead", {
                              children: (0, t.jsxs)("tr", {
                                children: [
                                  t.jsx("th", { children: "Name" }),
                                  t.jsx("th", { children: "Play" }),
                                  t.jsx("th", {}),
                                  t.jsx("th", { children: s ? "" : "User" }),
                                  t.jsx("th", { children: "Playlist" }),
                                  t.jsx("th", { children: "Delete" }),
                                ],
                              }),
                            }),
                            t.jsx("tbody", { children: r }),
                          ],
                        })
                      : t.jsx("h2", {
                          children: "No Results Match Your Search",
                        }),
                  ],
                }),
              }),
              t.jsx(o.Z, {}),
            ],
          });
        }
      },
      1855: (e, s, r) => {
        "use strict";
        r.d(s, { Z: () => a });
        var t = r(3854);
        function a() {
          return t.jsx("footer", {
            className: "flex",
            children: (0, t.jsxs)("nav", {
              className: "flex",
              children: [
                (0, t.jsxs)("ul", {
                  className: "flex icons",
                  children: [
                    t.jsx("li", {
                      children: t.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://twitter.com/choir241",
                        className: "fa-brands fa-twitter",
                        children: t.jsx("p", {
                          className: "hidden",
                          children: "Twitter",
                        }),
                      }),
                    }),
                    t.jsx("li", {
                      children: t.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://www.linkedin.com/in/richard-choir/",
                        className: "fa-brands fa-linkedin",
                        children: t.jsx("p", {
                          className: "hidden",
                          children: "LinkedIn",
                        }),
                      }),
                    }),
                    t.jsx("li", {
                      children: t.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://www.instagram.com/225kh_drw/?hl=en",
                        className: "fa-brands fa-instagram",
                        children: t.jsx("p", {
                          className: "hidden",
                          children: "Instagram",
                        }),
                      }),
                    }),
                    t.jsx("li", {
                      children: t.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://github.com/choir27",
                        className: "fa-brands fa-github",
                        children: t.jsx("p", {
                          className: "hidden",
                          children: "Github",
                        }),
                      }),
                    }),
                  ],
                }),
                t.jsx("small", {
                  children: "EchoVerse \xa9 2023. All rights are reserved",
                }),
              ],
            }),
          });
        }
        r(4218);
      },
      7868: (e, s, r) => {
        "use strict";
        r.d(s, { Z: () => x });
        var t = r(3854),
          a = r(5548),
          i = r.n(a),
          n = r(440),
          l = r(3092),
          o = r(9519),
          c = r(5166);
        function d() {
          let e = (0, o.o)((e) => e.searchValue),
            s = (0, o.o)((e) => e.setSearchValue),
            r = (0, o.o)((e) => e.setSearchResults),
            a = (0, o.o)((e) => e.song),
            i = (0, o.o)((e) => e.listOfSongs),
            n = (0, o.o)((e) => e.setSearchDisplay);
          return (0, t.jsxs)("form", {
            children: [
              t.jsx("input", {
                type: "search",
                onChange: (e) => s(e.target.value),
              }),
              t.jsx(l.z, {
                text: "",
                className: "fa-solid fa-magnifying-glass button",
                onClick: (s) => {
                  s.preventDefault(),
                    (function () {
                      let s = [];
                      a.forEach((r) => {
                        (r?.audio?.toLowerCase().includes(e.toLowerCase()) ||
                          r?.name?.toLowerCase().includes(e.toLowerCase()) ||
                          r?.user?.toLowerCase().includes(e.toLowerCase())) &&
                          s.push(r);
                      }),
                        i.forEach((r) => {
                          (r?.playlistName
                            ?.toLowerCase()
                            .includes(e.toLowerCase()) ||
                            r?.user?.toLowerCase().includes(e.toLowerCase())) &&
                            s.push(r),
                            r.playlistSongs.forEach((t) => {
                              let a = JSON.parse(t);
                              (a?.audio
                                ?.toLowerCase()
                                .includes(e.toLowerCase()) ||
                                a?.name
                                  ?.toLowerCase()
                                  .includes(e.toLowerCase()) ||
                                a?.user
                                  ?.toLowerCase()
                                  .includes(e.toLowerCase())) &&
                                s.push(r);
                            });
                        }),
                        s.length ||
                          (console.log("No Results Match Your Search"),
                          c.Am.error("No Results Match Your Search")),
                        r(s),
                        n(!0);
                    })();
                },
              }),
            ],
          });
        }
        var u = r(1018),
          h = r(4808);
        function x() {
          async function e(e) {
            try {
              e.preventDefault(),
                sessionStorage.removeItem("auth"),
                await n.Z.deleteCurrentSession(),
                window.location.reload(),
                (0, u.redirect)("/");
            } catch (e) {
              console.error(e);
            }
          }
          let s = (0, o.o)((e) => e.setHeaderDisplay),
            r = (0, o.o)((e) => e.headerDisplay),
            a = (0, h.Z)("auth"),
            c = `${
              "display" === r
                ? "fa-solid fa-xmark button small hidden"
                : "fa-solid fa-bars button small hidden"
            }`;
          return (0, t.jsxs)("header", {
            className: "flex column",
            id: "header",
            children: [
              t.jsx("div", {
                children: t.jsx(i(), {
                  href: "/",
                  children: t.jsx("h1", { children: "EchoStream" }),
                }),
              }),
              (0, l.z)({
                text: "",
                className: c,
                id: "menu",
                onClick: () =>
                  void ("display" === r ? s("hidden") : s("display")),
              }),
              t.jsx("nav", {
                className: `flex column nav ${r}`,
                children: (0, t.jsxs)("ul", {
                  className: "flex navBar",
                  children: [
                    t.jsx("li", {
                      children: t.jsx(i(), { href: "/", children: "Home" }),
                    }),
                    t.jsx("li", {
                      children: t.jsx(i(), {
                        href: "/about",
                        children: "About",
                      }),
                    }),
                    a
                      ? t.jsx("li", {
                          children: t.jsx(i(), {
                            href: "/account",
                            children: "Account",
                          }),
                        })
                      : "",
                    a
                      ? t.jsx("li", {
                          children: t.jsx(i(), {
                            href: "/addAudio",
                            children: "Add Audio",
                          }),
                        })
                      : "",
                    a
                      ? t.jsx("li", {
                          children: t.jsx(i(), {
                            href: "/",
                            onClick: (s) => e(s),
                            children: "Logout",
                          }),
                        })
                      : "",
                    a
                      ? ""
                      : t.jsx("li", {
                          children: t.jsx(i(), {
                            href: "/demo",
                            children: "Demo",
                          }),
                        }),
                    a
                      ? ""
                      : t.jsx("li", {
                          children: t.jsx(i(), {
                            href: "/login",
                            children: "Login/Register",
                          }),
                        }),
                    t.jsx("li", { children: t.jsx(d, {}) }),
                  ],
                }),
              }),
            ],
          });
        }
      },
      9557: (e, s, r) => {
        "use strict";
        r.d(s, { f: () => i, j: () => n });
        var t = r(8073),
          a = r(440);
        async function i(e, s, r, i) {
          try {
            let n = new t.KU(),
              l = new t.mR(n);
            n
              .setEndpoint("https://cloud.appwrite.io/v1")
              .setProject("64a0712c1618df1be9a2"),
              await l.create(t.ID.unique(), e, s, r),
              sessionStorage.setItem("auth", e),
              await a.Z.createSession(e, s),
              i("/");
          } catch (e) {
            console.error(e);
          }
        }
        async function n(e, s, r) {
          try {
            await a.Z.createSession(e, s),
              sessionStorage.setItem("auth", e),
              r("/");
          } catch (e) {
            console.error(e);
          }
        }
      },
      6438: (e, s, r) => {
        "use strict";
        r.d(s, { Z: () => n });
        var t = r(3854),
          a = r(1018),
          i = r(4808);
        let n = (e) => {
          let s = (s) => {
            let r = (0, i.Z)("auth");
            if (!r) return t.jsx(e, { ...s });
            (0, a.redirect)("/");
          };
          return (
            e.getInitialProps && (s.getInitialProps = e.getInitialProps), s
          );
        };
      },
      4466: (e, s, r) => {
        "use strict";
        r.r(s), r.d(s, { default: () => a });
        var t = r(4656);
        function a({ children: e }) {
          return t.jsx("main", { className: "column flex", children: e });
        }
      },
      8782: (e, s, r) => {
        "use strict";
        r.r(s),
          r.d(s, { $$typeof: () => n, __esModule: () => i, default: () => o });
        var t = r(5153);
        let a = (0, t.createProxy)(
            String.raw`C:\Users\richa\OneDrive\Documents\Next EchoStream\app\demo\page.tsx`,
          ),
          { __esModule: i, $$typeof: n } = a,
          l = a.default,
          o = l;
      },
      4656: (e, s, r) => {
        "use strict";
        e.exports = r(7096).vendored["react-rsc"].ReactJsxRuntime;
      },
      910: () => {},
      4942: () => {},
    });
  var s = require("../../webpack-runtime.js");
  s.C(e);
  var r = (e) => s((s.s = e)),
    t = s.X(0, [370, 686, 657], () => r(9694));
  module.exports = t;
})();
