(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [301],
  {
    4777: function (s, e, a) {
      Promise.resolve().then(a.bind(a, 3862));
    },
    3862: function (s, e, a) {
      "use strict";
      a.r(e);
      var t = a(7437),
        r = a(2943),
        n = a(8676),
        i = a(7598);
      a(8574), a(860);
      var l = a(108),
        o = a(2651),
        c = a(2265);
      e.default = () => {
        let s = (0, l.o)((s) => s.searchDisplay),
          e = (0, l.o)((s) => s.setSearchDisplay);
        return (
          (0, c.useEffect)(() => {
            e(!1);
          }, []),
          (0, t.jsx)(t.Fragment, {
            children: s
              ? (0, t.jsx)(o.default, {})
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(r.Z, {}),
                    (0, t.jsxs)("section", {
                      id: "about",
                      className: "main",
                      children: [
                        (0, t.jsx)("h1", { children: "About" }),
                        (0, t.jsx)(i.Z, {}),
                        (0, t.jsxs)("article", {
                          className: "flex column alignItems",
                          children: [
                            (0, t.jsx)("p", {
                              children:
                                "Music is unique in the sense that it brings all sorts of people together, regardless of language barriers and culture differences.  EchoStream strives to do the same as an audio sharing web application that allows authenticated users to search for songs posted by all users and listen to various song tracks.",
                            }),
                            (0, t.jsx)("p", {
                              children:
                                "Users are also able to create playlists, add/remove songs to those playlists.",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)(n.Z, {}),
                  ],
                }),
          })
        );
      };
    },
  },
  function (s) {
    s.O(0, [650, 199, 184, 998, 971, 472, 744], function () {
      return s((s.s = 4777));
    }),
      (_N_E = s.O());
  },
]);
