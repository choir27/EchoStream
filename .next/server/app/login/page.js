(() => {
  var e = {};
  (e.id = 626),
    (e.ids = [626]),
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
      7813: (e, s, t) => {
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
                "login",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(t.bind(t, 5004)),
                        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\login\\page.tsx",
                      ],
                    },
                  ],
                },
                {
                  layout: [
                    () => Promise.resolve().then(t.bind(t, 2472)),
                    "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\login\\layout.tsx",
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
            "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\login\\page.tsx",
          ],
          u = "/login/page",
          h = { require: t, loadChunk: () => Promise.resolve() },
          x = new r.AppPageRouteModule({
            definition: {
              kind: a.x.APP_PAGE,
              page: "/login/page",
              pathname: "/login",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      4959: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 109));
      },
      5303: () => {},
      109: (e, s, t) => {
        "use strict";
        t.r(s), t.d(s, { default: () => j });
        var r = t(3854),
          a = t(4218),
          n = t(1018);
        t(910), t(4942);
        var i = t(7868),
          l = t(1855),
          o = t(3092),
          c = t(9557),
          d = t(6438),
          u = t(4755),
          h = t(9519);
        let x = /^[a-zA-Z]*$/,
          m = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
          p =
            /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/,
          j = (0, d.Z)(() => {
            let [e, s] = (0, a.useState)(""),
              [t, d] = (0, a.useState)(!1),
              [j, f] = (0, a.useState)(""),
              [g, v] = (0, a.useState)(!1),
              [w, b] = (0, a.useState)(""),
              [y, N] = (0, a.useState)(!1),
              [C, S] = (0, a.useState)(!1),
              P = (0, h.o)((e) => e.searchDisplay),
              D = (0, h.o)((e) => e.setSearchDisplay);
            (0, a.useEffect)(() => {
              D(!1);
            }, []);
            let L = r.jsx("i", { className: "fa-solid fa-check" }),
              k = r.jsx("i", { className: "fa-solid fa-xmark" }),
              { push: q } = (0, n.useRouter)();
            return r.jsx(r.Fragment, {
              children: P
                ? r.jsx(u.default, {})
                : C
                  ? (0, r.jsxs)(r.Fragment, {
                      children: [
                        r.jsx(i.Z, {}),
                        (0, r.jsxs)("section", {
                          id: "auth",
                          className: "main",
                          children: [
                            r.jsx("h1", { children: "Login" }),
                            (0, r.jsxs)("form", {
                              className: "flex column alignStart",
                              method: "POST",
                              action: "#",
                              id: "login",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "flex column",
                                  children: [
                                    r.jsx("label", { children: "Email" }),
                                    r.jsx("input", {
                                      placeholder: "Put your email here",
                                      type: "text",
                                      name: "email",
                                      value: j,
                                      onChange: (e) => f(e.target.value),
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "flex column",
                                  children: [
                                    r.jsx("label", { children: "Password" }),
                                    r.jsx("input", {
                                      placeholder: "Put your password here",
                                      type: "password",
                                      name: "password",
                                      value: w,
                                      onChange: (e) => b(e.target.value),
                                    }),
                                  ],
                                }),
                                r.jsx("input", {
                                  className: "button",
                                  type: "submit",
                                  value: "Login Here",
                                  onClick: (e) => {
                                    e.preventDefault(), (0, c.j)(j, w, q);
                                  },
                                }),
                                (0, r.jsxs)("section", {
                                  className:
                                    "existingAccount flex column alignStart",
                                  children: [
                                    r.jsx("h2", {
                                      children:
                                        "Don't have an account?  Register below:",
                                    }),
                                    r.jsx(o.z, {
                                      className: "button",
                                      text: "Register Here",
                                      onClick: (e) => S(!C),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        r.jsx(l.Z, {}),
                      ],
                    })
                  : (0, r.jsxs)(r.Fragment, {
                      children: [
                        r.jsx(i.Z, {}),
                        (0, r.jsxs)("section", {
                          id: "auth",
                          className: "main",
                          children: [
                            r.jsx("h1", { children: "Register Account" }),
                            (0, r.jsxs)("section", {
                              className: "authContainer",
                              children: [
                                (0, r.jsxs)("form", {
                                  children: [
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsxs)("label", {
                                          children: [" Name ", e && t ? L : k],
                                        }),
                                        r.jsx("input", {
                                          type: "text",
                                          name: "name",
                                          value: e,
                                          placeholder: "Enter your name",
                                          onChange: (e) => {
                                            s(e.target.value),
                                              d(x.test(e.target.value));
                                          },
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsxs)("label", {
                                          children: ["Email", g && j ? L : k],
                                        }),
                                        r.jsx("input", {
                                          type: "email",
                                          name: "email",
                                          value: j,
                                          placeholder: "Enter your email",
                                          onChange: (e) => {
                                            f(e.target.value),
                                              v(p.test(e.target.value));
                                          },
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsxs)("label", {
                                          children: [
                                            "Password",
                                            y && w ? L : k,
                                          ],
                                        }),
                                        r.jsx("input", {
                                          type: "password",
                                          name: "password",
                                          value: w,
                                          placeholder: "Confirm password",
                                          onChange: (e) => {
                                            b(e.target.value),
                                              N(m.test(e.target.value));
                                          },
                                        }),
                                      ],
                                    }),
                                    r.jsx("input", {
                                      className: "button",
                                      type: "submit",
                                      value: "Register Here",
                                      onClick: (s) => {
                                        s.preventDefault(),
                                          (0, c.f)(j, w, e, q);
                                      },
                                      disabled: !g || !t || !y,
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("section", {
                                  className:
                                    "existingAccount flex column alignItems",
                                  children: [
                                    r.jsx("h2", {
                                      children:
                                        "Already have an account?  Login below:",
                                    }),
                                    r.jsx(o.z, {
                                      className: "button",
                                      text: "Login Here",
                                      onClick: () => S(!C),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        r.jsx(l.Z, {}),
                      ],
                    }),
            });
          });
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
      9557: (e, s, t) => {
        "use strict";
        t.d(s, { f: () => n, j: () => i });
        var r = t(8073),
          a = t(440);
        async function n(e, s, t, n) {
          try {
            let i = new r.KU(),
              l = new r.mR(i);
            i
              .setEndpoint("https://cloud.appwrite.io/v1")
              .setProject("64a0712c1618df1be9a2"),
              await l.create(r.ID.unique(), e, s, t),
              sessionStorage.setItem("auth", e),
              await a.Z.createSession(e, s),
              n("/");
          } catch (e) {
            console.error(e);
          }
        }
        async function i(e, s, t) {
          try {
            await a.Z.createSession(e, s),
              sessionStorage.setItem("auth", e),
              t("/");
          } catch (e) {
            console.error(e);
          }
        }
      },
      6438: (e, s, t) => {
        "use strict";
        t.d(s, { Z: () => i });
        var r = t(3854),
          a = t(1018),
          n = t(4808);
        let i = (e) => {
          let s = (s) => {
            let t = (0, n.Z)("auth");
            if (!t) return r.jsx(e, { ...s });
            (0, a.redirect)("/");
          };
          return (
            e.getInitialProps && (s.getInitialProps = e.getInitialProps), s
          );
        };
      },
      2472: (e, s, t) => {
        "use strict";
        t.r(s), t.d(s, { default: () => a });
        var r = t(4656);
        function a({ children: e }) {
          return r.jsx("main", { className: "column flex", children: e });
        }
      },
      5004: (e, s, t) => {
        "use strict";
        t.r(s),
          t.d(s, { $$typeof: () => i, __esModule: () => n, default: () => o });
        var r = t(5153);
        let a = (0, r.createProxy)(
            String.raw`C:\Users\richa\OneDrive\Documents\Next EchoStream\app\login\page.tsx`,
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
    r = s.X(0, [370, 686, 657], () => t(7813));
  module.exports = r;
})();
