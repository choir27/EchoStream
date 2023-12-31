(() => {
  var e = {};
  (e.id = 301),
    (e.ids = [301]),
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
      8460: (e, s, t) => {
        "use strict";
        t.r(s),
          t.d(s, {
            GlobalError: () => i.a,
            __next_app__: () => h,
            originalPathname: () => u,
            pages: () => d,
            routeModule: () => x,
            tree: () => c,
          });
        var r = t(7096),
          a = t(6132),
          n = t(7284),
          i = t.n(n),
          l = t(2564),
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
        t.d(s, o);
        let c = [
            "",
            {
              children: [
                "about",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(t.bind(t, 3801)),
                        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\about\\page.tsx",
                      ],
                    },
                  ],
                },
                {
                  layout: [
                    () => Promise.resolve().then(t.bind(t, 4933)),
                    "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\about\\layout.tsx",
                  ],
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(t.bind(t, 5345)),
                "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(t.t.bind(t, 9291, 23)),
                "next/dist/client/components/not-found-error",
              ],
            },
          ],
          d = [
            "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\about\\page.tsx",
          ],
          u = "/about/page",
          h = { require: t, loadChunk: () => Promise.resolve() },
          x = new r.AppPageRouteModule({
            definition: {
              kind: a.x.APP_PAGE,
              page: "/about/page",
              pathname: "/about",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      3793: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 4100));
      },
      5303: () => {},
      4100: (e, s, t) => {
        "use strict";
        t.r(s), t.d(s, { default: () => d });
        var r = t(3854),
          a = t(7868),
          n = t(1855),
          i = t(9918);
        t(910), t(4942);
        var l = t(9519),
          o = t(4755),
          c = t(4218);
        let d = () => {
          let e = (0, l.o)((e) => e.searchDisplay),
            s = (0, l.o)((e) => e.setSearchDisplay);
          return (
            (0, c.useEffect)(() => {
              s(!1);
            }, []),
            r.jsx(r.Fragment, {
              children: e
                ? r.jsx(o.default, {})
                : (0, r.jsxs)(r.Fragment, {
                    children: [
                      r.jsx(a.Z, {}),
                      (0, r.jsxs)("section", {
                        id: "about",
                        className: "main",
                        children: [
                          r.jsx("h1", { children: "About" }),
                          r.jsx(i.Z, {}),
                          (0, r.jsxs)("article", {
                            className: "flex column alignItems",
                            children: [
                              r.jsx("p", {
                                children:
                                  "Music is unique in the sense that it brings all sorts of people together, regardless of language barriers and culture differences.  EchoStream strives to do the same as an audio sharing web application that allows authenticated users to search for songs posted by all users and listen to various song tracks.",
                              }),
                              r.jsx("p", {
                                children:
                                  "Users are also able to create playlists, add/remove songs to those playlists.",
                              }),
                            ],
                          }),
                        ],
                      }),
                      r.jsx(n.Z, {}),
                    ],
                  }),
            })
          );
        };
      },
      4755: (e, s, t) => {
        "use strict";
        t.r(s), t.d(s, { default: () => u });
        var r = t(3854);
        t(910), t(4942);
        var a = t(9519),
          n = t(4808),
          i = t(3092),
          l = t(7868),
          o = t(1855),
          c = t(1759),
          d = t(642);
        function u() {
          let e = (0, a.o)((e) => e.searchResults),
            s = (0, n.Z)("auth"),
            t = e.map((e, t) =>
              (0, r.jsxs)(
                "tr",
                {
                  children: [
                    r.jsx("td", { children: e.name ? e.name : e.playlistName }),
                    r.jsx("td", {
                      children: e.audio
                        ? r.jsx("button", {
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
                    r.jsx("td", {}),
                    r.jsx("td", { children: e.user }),
                    r.jsx("td", {
                      children: e.audio ? r.jsx(c.Z, { index: t }) : "  ",
                    }),
                    r.jsx("td", {
                      children:
                        s?.toLowerCase() === e.user && e.audio
                          ? (0, i.z)({
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
          return (0, r.jsxs)(r.Fragment, {
            children: [
              r.jsx(l.Z, {}),
              r.jsx("section", {
                id: "home",
                className: "main",
                children: (0, r.jsxs)("div", {
                  id: "tableContainer",
                  children: [
                    r.jsx("h2", { children: "Search Results" }),
                    e.length
                      ? (0, r.jsxs)("table", {
                          children: [
                            r.jsx("thead", {
                              children: (0, r.jsxs)("tr", {
                                children: [
                                  r.jsx("th", { children: "Name" }),
                                  r.jsx("th", { children: "Play" }),
                                  r.jsx("th", {}),
                                  r.jsx("th", { children: s ? "" : "User" }),
                                  r.jsx("th", { children: "Playlist" }),
                                  r.jsx("th", { children: "Delete" }),
                                ],
                              }),
                            }),
                            r.jsx("tbody", { children: t }),
                          ],
                        })
                      : r.jsx("h2", {
                          children: "No Results Match Your Search",
                        }),
                  ],
                }),
              }),
              r.jsx(o.Z, {}),
            ],
          });
        }
      },
      1855: (e, s, t) => {
        "use strict";
        t.d(s, { Z: () => a });
        var r = t(3854);
        function a() {
          return r.jsx("footer", {
            className: "flex",
            children: (0, r.jsxs)("nav", {
              className: "flex",
              children: [
                (0, r.jsxs)("ul", {
                  className: "flex icons",
                  children: [
                    r.jsx("li", {
                      children: r.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://twitter.com/choir241",
                        className: "fa-brands fa-twitter",
                        children: r.jsx("p", {
                          className: "hidden",
                          children: "Twitter",
                        }),
                      }),
                    }),
                    r.jsx("li", {
                      children: r.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://www.linkedin.com/in/richard-choir/",
                        className: "fa-brands fa-linkedin",
                        children: r.jsx("p", {
                          className: "hidden",
                          children: "LinkedIn",
                        }),
                      }),
                    }),
                    r.jsx("li", {
                      children: r.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://www.instagram.com/225kh_drw/?hl=en",
                        className: "fa-brands fa-instagram",
                        children: r.jsx("p", {
                          className: "hidden",
                          children: "Instagram",
                        }),
                      }),
                    }),
                    r.jsx("li", {
                      children: r.jsx("a", {
                        rel: "noreferrer",
                        target: "_blank",
                        href: "https://github.com/choir27",
                        className: "fa-brands fa-github",
                        children: r.jsx("p", {
                          className: "hidden",
                          children: "Github",
                        }),
                      }),
                    }),
                  ],
                }),
                r.jsx("small", {
                  children: "EchoVerse \xa9 2023. All rights are reserved",
                }),
              ],
            }),
          });
        }
        t(4218);
      },
      7868: (e, s, t) => {
        "use strict";
        t.d(s, { Z: () => x });
        var r = t(3854),
          a = t(5548),
          n = t.n(a),
          i = t(440),
          l = t(3092),
          o = t(9519),
          c = t(5166);
        function d() {
          let e = (0, o.o)((e) => e.searchValue),
            s = (0, o.o)((e) => e.setSearchValue),
            t = (0, o.o)((e) => e.setSearchResults),
            a = (0, o.o)((e) => e.song),
            n = (0, o.o)((e) => e.listOfSongs),
            i = (0, o.o)((e) => e.setSearchDisplay);
          return (0, r.jsxs)("form", {
            children: [
              r.jsx("input", {
                type: "search",
                onChange: (e) => s(e.target.value),
              }),
              r.jsx(l.z, {
                text: "",
                className: "fa-solid fa-magnifying-glass button",
                onClick: (s) => {
                  s.preventDefault(),
                    (function () {
                      let s = [];
                      a.forEach((t) => {
                        (t?.audio?.toLowerCase().includes(e.toLowerCase()) ||
                          t?.name?.toLowerCase().includes(e.toLowerCase()) ||
                          t?.user?.toLowerCase().includes(e.toLowerCase())) &&
                          s.push(t);
                      }),
                        n.forEach((t) => {
                          (t?.playlistName
                            ?.toLowerCase()
                            .includes(e.toLowerCase()) ||
                            t?.user?.toLowerCase().includes(e.toLowerCase())) &&
                            s.push(t),
                            t.playlistSongs.forEach((r) => {
                              let a = JSON.parse(r);
                              (a?.audio
                                ?.toLowerCase()
                                .includes(e.toLowerCase()) ||
                                a?.name
                                  ?.toLowerCase()
                                  .includes(e.toLowerCase()) ||
                                a?.user
                                  ?.toLowerCase()
                                  .includes(e.toLowerCase())) &&
                                s.push(t);
                            });
                        }),
                        s.length ||
                          (console.log("No Results Match Your Search"),
                          c.Am.error("No Results Match Your Search")),
                        t(s),
                        i(!0);
                    })();
                },
              }),
            ],
          });
        }
        var u = t(1018),
          h = t(4808);
        function x() {
          async function e(e) {
            try {
              e.preventDefault(),
                sessionStorage.removeItem("auth"),
                await i.Z.deleteCurrentSession(),
                window.location.reload(),
                (0, u.redirect)("/");
            } catch (e) {
              console.error(e);
            }
          }
          let s = (0, o.o)((e) => e.setHeaderDisplay),
            t = (0, o.o)((e) => e.headerDisplay),
            a = (0, h.Z)("auth"),
            c = `${
              "display" === t
                ? "fa-solid fa-xmark button small hidden"
                : "fa-solid fa-bars button small hidden"
            }`;
          return (0, r.jsxs)("header", {
            className: "flex column",
            id: "header",
            children: [
              r.jsx("div", {
                children: r.jsx(n(), {
                  href: "/",
                  children: r.jsx("h1", { children: "EchoStream" }),
                }),
              }),
              (0, l.z)({
                text: "",
                className: c,
                id: "menu",
                onClick: () =>
                  void ("display" === t ? s("hidden") : s("display")),
              }),
              r.jsx("nav", {
                className: `flex column nav ${t}`,
                children: (0, r.jsxs)("ul", {
                  className: "flex navBar",
                  children: [
                    r.jsx("li", {
                      children: r.jsx(n(), { href: "/", children: "Home" }),
                    }),
                    r.jsx("li", {
                      children: r.jsx(n(), {
                        href: "/about",
                        children: "About",
                      }),
                    }),
                    a
                      ? r.jsx("li", {
                          children: r.jsx(n(), {
                            href: "/account",
                            children: "Account",
                          }),
                        })
                      : "",
                    a
                      ? r.jsx("li", {
                          children: r.jsx(n(), {
                            href: "/addAudio",
                            children: "Add Audio",
                          }),
                        })
                      : "",
                    a
                      ? r.jsx("li", {
                          children: r.jsx(n(), {
                            href: "/",
                            onClick: (s) => e(s),
                            children: "Logout",
                          }),
                        })
                      : "",
                    a
                      ? ""
                      : r.jsx("li", {
                          children: r.jsx(n(), {
                            href: "/demo",
                            children: "Demo",
                          }),
                        }),
                    a
                      ? ""
                      : r.jsx("li", {
                          children: r.jsx(n(), {
                            href: "/login",
                            children: "Login/Register",
                          }),
                        }),
                    r.jsx("li", { children: r.jsx(d, {}) }),
                  ],
                }),
              }),
            ],
          });
        }
      },
      9918: (e, s, t) => {
        "use strict";
        t.d(s, { Z: () => c });
        var r = t(3854),
          a = t(4218),
          n = t(8315);
        t(2052);
        var i = t(9519),
          l = t(3092);
        function o() {
          return (0, l.z)({
            text: "Shuffle",
            className: "button small",
            onClick: (e) =>
              (function () {
                let e = localStorage.getItem("playlist"),
                  s = JSON.parse(e),
                  t = s.song,
                  r = t.length,
                  a;
                for (; r > 0; )
                  (a = Math.floor(Math.random() * r)),
                    r--,
                    ([t[r], t[a]] = [t[a], t[r]]);
                localStorage.setItem(
                  "playlist",
                  JSON.stringify({ id: s.id, song: t }),
                ),
                  window.location.reload();
              })(),
          });
        }
        function c() {
          let [e, s] = (0, a.useState)(!1),
            [t, l] = (0, a.useState)(0),
            [c, d] = (0, a.useState)([]),
            [u, h] = (0, a.useState)(""),
            x = (0, i.o)((e) => e.song);
          (0, a.useEffect)(() => {
            try {
              if (x.length && !localStorage.getItem("playlist")) {
                let e = localStorage.getItem("song"),
                  s = JSON.parse(e),
                  t = x.filter((e) => e.audio === s[0]);
                d(t), h(s);
              } else if (localStorage.getItem("playlist")) {
                let e = [],
                  s = localStorage.getItem("playlist"),
                  t = JSON.parse(s),
                  r = new Map(x.map((e) => [e.audio, e]));
                t.song.forEach((s) => {
                  let t = r.get(s);
                  t && e.push(t);
                }),
                  d(e),
                  h(t.song);
              }
            } catch (e) {
              console.error(e);
            }
          }, [x]);
          let m = () => {
            l((e) => (e < u.length - 1 ? e + 1 : 0)), s(!0);
          };
          return (0, r.jsxs)("section", {
            id: "player",
            children: [
              r.jsx("section", {
                children: (0, r.jsxs)("section", {
                  className: "playerInfo",
                  children: [
                    r.jsx("h3", { children: "Currently Playing Song" }),
                    r.jsx("h2", {
                      children: c[t] ? c[t].name : "No music has been added",
                    }),
                    r.jsx(o, {}),
                  ],
                }),
              }),
              u.length > 0 &&
                r.jsx(
                  n.Z,
                  {
                    autoPlay: e,
                    onEnded: m,
                    showSkipControls: !0,
                    showJumpControls: !1,
                    src: u[t],
                    onClickPrevious: () => {
                      l((e) => (0 === e ? u.length - 1 : e - 1)), s(!0);
                    },
                    onClickNext: m,
                    timeFormat: "auto",
                  },
                  t,
                ),
            ],
          });
        }
      },
      4933: (e, s, t) => {
        "use strict";
        t.r(s), t.d(s, { default: () => a });
        var r = t(4656);
        function a({ children: e }) {
          return r.jsx("main", { className: "column flex", children: e });
        }
      },
      3801: (e, s, t) => {
        "use strict";
        t.r(s),
          t.d(s, { $$typeof: () => i, __esModule: () => n, default: () => o });
        var r = t(5153);
        let a = (0, r.createProxy)(
            String.raw`C:\Users\richa\OneDrive\Documents\Next EchoStream\app\about\page.tsx`,
          ),
          { __esModule: n, $$typeof: i } = a,
          l = a.default,
          o = l;
      },
      4656: (e, s, t) => {
        "use strict";
        e.exports = t(7096).vendored["react-rsc"].ReactJsxRuntime;
      },
      910: () => {},
      4942: () => {},
    });
  var s = require("../../webpack-runtime.js");
  s.C(e);
  var t = (e) => s((s.s = e)),
    r = s.X(0, [370, 686, 382, 657], () => t(8460));
  module.exports = r;
})();
