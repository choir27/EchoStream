(() => {
  var e = {};
  (e.id = 797),
    (e.ids = [797]),
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
      9400: (e, r, s) => {
        "use strict";
        s.r(r),
          s.d(r, {
            GlobalError: () => n.a,
            __next_app__: () => u,
            originalPathname: () => h,
            pages: () => d,
            routeModule: () => x,
            tree: () => c,
          });
        var t = s(7096),
          a = s(6132),
          i = s(7284),
          n = s.n(i),
          l = s(2564),
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
        s.d(r, o);
        let c = [
            "",
            {
              children: [
                "search",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(s.bind(s, 8976)),
                        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\search\\page.tsx",
                      ],
                    },
                  ],
                },
                {
                  layout: [
                    () => Promise.resolve().then(s.bind(s, 3950)),
                    "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\search\\layout.tsx",
                  ],
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(s.bind(s, 5345)),
                "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(s.t.bind(s, 9291, 23)),
                "next/dist/client/components/not-found-error",
              ],
            },
          ],
          d = [
            "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\search\\page.tsx",
          ],
          h = "/search/page",
          u = { require: s, loadChunk: () => Promise.resolve() },
          x = new t.AppPageRouteModule({
            definition: {
              kind: a.x.APP_PAGE,
              page: "/search/page",
              pathname: "/search",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      6791: (e, r, s) => {
        Promise.resolve().then(s.bind(s, 4755));
      },
      5303: () => {},
      4755: (e, r, s) => {
        "use strict";
        s.r(r), s.d(r, { default: () => h });
        var t = s(3854);
        s(910), s(4942);
        var a = s(9519),
          i = s(4808),
          n = s(3092),
          l = s(7868),
          o = s(1855),
          c = s(1759),
          d = s(642);
        function h() {
          let e = (0, a.o)((e) => e.searchResults),
            r = (0, i.Z)("auth"),
            s = e.map((e, s) =>
              (0, t.jsxs)(
                "tr",
                {
                  children: [
                    t.jsx("td", { children: e.name ? e.name : e.playlistName }),
                    t.jsx("td", {
                      children: e.audio
                        ? t.jsx("button", {
                            className: "button small",
                            onClick: (r) => {
                              r.preventDefault(),
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
                      children: e.audio ? t.jsx(c.Z, { index: s }) : "  ",
                    }),
                    t.jsx("td", {
                      children:
                        r?.toLowerCase() === e.user && e.audio
                          ? (0, n.z)({
                              text: "",
                              className: "fa-solid fa-trash button small",
                              onClick: (r) => (0, d.at)(e.$id, e.cloudinaryId),
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
                                  t.jsx("th", { children: r ? "" : "User" }),
                                  t.jsx("th", { children: "Playlist" }),
                                  t.jsx("th", { children: "Delete" }),
                                ],
                              }),
                            }),
                            t.jsx("tbody", { children: s }),
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
      1855: (e, r, s) => {
        "use strict";
        s.d(r, { Z: () => a });
        var t = s(3854);
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
        s(4218);
      },
      7868: (e, r, s) => {
        "use strict";
        s.d(r, { Z: () => x });
        var t = s(3854),
          a = s(5548),
          i = s.n(a),
          n = s(440),
          l = s(3092),
          o = s(9519),
          c = s(5166);
        function d() {
          let e = (0, o.o)((e) => e.searchValue),
            r = (0, o.o)((e) => e.setSearchValue),
            s = (0, o.o)((e) => e.setSearchResults),
            a = (0, o.o)((e) => e.song),
            i = (0, o.o)((e) => e.listOfSongs),
            n = (0, o.o)((e) => e.setSearchDisplay);
          return (0, t.jsxs)("form", {
            children: [
              t.jsx("input", {
                type: "search",
                onChange: (e) => r(e.target.value),
              }),
              t.jsx(l.z, {
                text: "",
                className: "fa-solid fa-magnifying-glass button",
                onClick: (r) => {
                  r.preventDefault(),
                    (function () {
                      let r = [];
                      a.forEach((s) => {
                        (s?.audio?.toLowerCase().includes(e.toLowerCase()) ||
                          s?.name?.toLowerCase().includes(e.toLowerCase()) ||
                          s?.user?.toLowerCase().includes(e.toLowerCase())) &&
                          r.push(s);
                      }),
                        i.forEach((s) => {
                          (s?.playlistName
                            ?.toLowerCase()
                            .includes(e.toLowerCase()) ||
                            s?.user?.toLowerCase().includes(e.toLowerCase())) &&
                            r.push(s),
                            s.playlistSongs.forEach((t) => {
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
                                r.push(s);
                            });
                        }),
                        r.length ||
                          (console.log("No Results Match Your Search"),
                          c.Am.error("No Results Match Your Search")),
                        s(r),
                        n(!0);
                    })();
                },
              }),
            ],
          });
        }
        var h = s(1018),
          u = s(4808);
        function x() {
          async function e(e) {
            try {
              e.preventDefault(),
                sessionStorage.removeItem("auth"),
                await n.Z.deleteCurrentSession(),
                window.location.reload(),
                (0, h.redirect)("/");
            } catch (e) {
              console.error(e);
            }
          }
          let r = (0, o.o)((e) => e.setHeaderDisplay),
            s = (0, o.o)((e) => e.headerDisplay),
            a = (0, u.Z)("auth"),
            c = `${
              "display" === s
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
                  void ("display" === s ? r("hidden") : r("display")),
              }),
              t.jsx("nav", {
                className: `flex column nav ${s}`,
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
                            onClick: (r) => e(r),
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
      3950: (e, r, s) => {
        "use strict";
        s.r(r), s.d(r, { default: () => a });
        var t = s(4656);
        function a({ children: e }) {
          return t.jsx("main", { className: "column flex", children: e });
        }
      },
      8976: (e, r, s) => {
        "use strict";
        s.r(r),
          s.d(r, { $$typeof: () => n, __esModule: () => i, default: () => o });
        var t = s(5153);
        let a = (0, t.createProxy)(
            String.raw`C:\Users\richa\OneDrive\Documents\Next EchoStream\app\search\page.tsx`,
          ),
          { __esModule: i, $$typeof: n } = a,
          l = a.default,
          o = l;
      },
      4656: (e, r, s) => {
        "use strict";
        e.exports = s(7096).vendored["react-rsc"].ReactJsxRuntime;
      },
      910: () => {},
      4942: () => {},
    });
  var r = require("../../webpack-runtime.js");
  r.C(e);
  var s = (e) => r((r.s = e)),
    t = r.X(0, [370, 686, 657], () => s(9400));
  module.exports = t;
})();
