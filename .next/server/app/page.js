(() => {
  var e = {};
  (e.id = 931),
    (e.ids = [931]),
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
      1637: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => o.a,
            __next_app__: () => x,
            originalPathname: () => l,
            pages: () => p,
            routeModule: () => d,
            tree: () => c,
          });
        var s = r(7096),
          i = r(6132),
          n = r(7284),
          o = r.n(n),
          a = r(2564),
          u = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "originalPathname",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (u[e] = () => a[e]);
        r.d(t, u);
        let c = [
            "",
            {
              children: [
                "__PAGE__",
                {},
                {
                  page: [
                    () => Promise.resolve().then(r.bind(r, 3982)),
                    "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\page.tsx",
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
          p = [
            "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\app\\page.tsx",
          ],
          l = "/page",
          x = { require: r, loadChunk: () => Promise.resolve() },
          d = new s.AppPageRouteModule({
            definition: {
              kind: i.x.APP_PAGE,
              page: "/page",
              pathname: "/",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      3644: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 9431));
      },
      9431: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => l });
        var s = r(3854),
          i = r(4218),
          n = r(7868);
        r(910), r(4942);
        var o = r(9918),
          a = r(1855),
          u = r(9519),
          c = r(4334),
          p = r(4755);
        function l() {
          let [e, t] = (0, i.useState)(1),
            r = (0, u.o)((e) => e.listOfSongs),
            l = (0, u.o)((e) => e.songDisplay),
            x = (0, u.o)((e) => e.setSongDisplay),
            d = (0, u.o)((e) => e.song),
            m = (0, u.o)((e) => e.searchDisplay),
            g = (0, u.o)((e) => e.setSearchDisplay);
          return (
            (0, i.useEffect)(() => {
              g(!1);
            }, []),
            s.jsx(s.Fragment, {
              children: m
                ? s.jsx(p.default, {})
                : (0, s.jsxs)("main", {
                    className: "column flex",
                    children: [
                      s.jsx(n.Z, {}),
                      (0, s.jsxs)("section", {
                        className: "main",
                        children: [
                          s.jsx(o.Z, {}),
                          s.jsx("section", {
                            children: s.jsx(c.Z, {
                              playlist: r,
                              setSongDisplay: (e) => x(e),
                              songDisplay: l,
                              songs: d,
                              currentPage: e,
                              setCurrentPage: (e) => t(e),
                            }),
                          }),
                        ],
                      }),
                      s.jsx(a.Z, {}),
                    ],
                  }),
            })
          );
        }
      },
      3982: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { $$typeof: () => o, __esModule: () => n, default: () => u });
        var s = r(5153);
        let i = (0, s.createProxy)(
            String.raw`C:\Users\richa\OneDrive\Documents\Next EchoStream\app\page.tsx`,
          ),
          { __esModule: n, $$typeof: o } = i,
          a = i.default,
          u = a;
      },
    });
  var t = require("../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [370, 686, 382, 657, 283], () => r(1637));
  module.exports = s;
})();
