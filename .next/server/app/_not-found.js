"use strict";
(() => {
  var e = {};
  (e.id = 165),
    (e.ids = [165]),
    (e.modules = {
      5403: (e) => {
        e.exports = require("next/dist/client/components/request-async-storage.external");
      },
      4749: (e) => {
        e.exports = require("next/dist/client/components/static-generation-async-storage.external");
      },
      399: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      5528: (e) => {
        e.exports = require("next/dist\\client\\components\\action-async-storage.external.js");
      },
      1877: (e) => {
        e.exports = require("next/dist\\client\\components\\request-async-storage.external.js");
      },
      5319: (e) => {
        e.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");
      },
      9491: (e) => {
        e.exports = require("assert");
      },
      2361: (e) => {
        e.exports = require("events");
      },
      7147: (e) => {
        e.exports = require("fs");
      },
      3685: (e) => {
        e.exports = require("http");
      },
      5687: (e) => {
        e.exports = require("https");
      },
      1017: (e) => {
        e.exports = require("path");
      },
      5477: (e) => {
        e.exports = require("punycode");
      },
      2781: (e) => {
        e.exports = require("stream");
      },
      7310: (e) => {
        e.exports = require("url");
      },
      3837: (e) => {
        e.exports = require("util");
      },
      9796: (e) => {
        e.exports = require("zlib");
      },
      1034: (e, r, t) => {
        t.r(r),
          t.d(r, {
            GlobalError: () => i.a,
            __next_app__: () => x,
            originalPathname: () => d,
            pages: () => l,
            routeModule: () => c,
            tree: () => u,
          });
        var n = t(7096),
          o = t(6132),
          s = t(7284),
          i = t.n(s),
          a = t(2564),
          p = {};
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
            ].indexOf(e) && (p[e] = () => a[e]);
        t.d(r, p);
        let u = [
            "",
            {
              children: [
                "__PAGE__",
                {},
                {
                  page: [
                    () => Promise.resolve().then(t.t.bind(t, 9291, 23)),
                    "next/dist/client/components/not-found-error",
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
          l = [],
          d = "/_not-found",
          x = { require: t, loadChunk: () => Promise.resolve() },
          c = new n.AppPageRouteModule({
            definition: {
              kind: o.x.APP_PAGE,
              page: "/_not-found",
              pathname: "/_not-found",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
    });
  var r = require("../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    n = r.X(0, [370, 657], () => t(1034));
  module.exports = n;
})();
