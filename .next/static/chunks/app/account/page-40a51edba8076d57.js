(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [346],
  {
    3381: function (e, t, s) {
      Promise.resolve().then(s.bind(s, 2687));
    },
    2687: function (e, t, s) {
      "use strict";
      s.r(t),
        s.d(t, {
          default: function () {
            return p;
          },
        });
      var a = s(7437),
        n = s(2265);
      s(8574), s(860);
      var l = s(2943),
        o = s(7598),
        i = s(8676),
        c = s(6908),
        r = s(7614),
        d = s(9211);
      function u() {
        let [e, t] = (0, n.useState)(""),
          [s, l] = (0, n.useState)(""),
          [o, i] = (0, n.useState)(""),
          [u, m] = (0, n.useState)(""),
          [x, h] = (0, n.useState)(""),
          p = (0, n.useContext)(d.S);
        async function g() {
          try {
            let t = await r.Z.updateAccountEmail(e, o);
            t && window.location.reload();
          } catch (e) {
            console.error(e);
          }
        }
        async function j() {
          try {
            let e = await r.Z.updateAccountPassword(u, o);
            e && window.location.reload();
          } catch (e) {
            console.error(e);
          }
        }
        async function w() {
          try {
            let e = await r.Z.updateAccountName(s);
            e && window.location.reload();
          } catch (e) {
            console.error(e);
          }
        }
        let y = (0, a.jsxs)("section", {
            className: "flex column",
            children: [
              (0, c.z)({
                text: "Change Name",
                onClick: (e) => h("name"),
                className: "button small",
              }),
              (0, c.z)({
                text: "Change Email",
                onClick: (e) => h("email"),
                className: "button small",
              }),
              (0, c.z)({
                text: "Change Password",
                onClick: (e) => h("password"),
                className: "button small",
              }),
            ],
          }),
          C = {
            name: (0, a.jsxs)("section", {
              className: "flex column alignItems",
              children: [
                (0, a.jsx)("input", {
                  type: "text",
                  name: "name",
                  placeholder: null == p ? void 0 : p.name,
                  id: "name",
                  onChange: (e) => l(e.target.value),
                }),
                (0, c.z)({
                  text: "Change Name",
                  onClick: (e) => w(),
                  className: "button small",
                }),
                (0, c.z)({
                  text: "Go Back",
                  onClick: (e) => h(""),
                  className: "button small",
                }),
              ],
            }),
            email: (0, a.jsxs)("section", {
              className: "flex column alignItems",
              children: [
                (0, a.jsx)("input", {
                  type: "text",
                  placeholder: null == p ? void 0 : p.email,
                  name: "email",
                  id: "email",
                  onChange: (e) => t(e.target.value),
                }),
                (0, a.jsx)("input", {
                  type: "password",
                  placeholder: "Input Password",
                  name: "password",
                  id: "password",
                  onChange: (e) => i(e.target.value),
                }),
                (0, c.z)({
                  text: "Change Email",
                  onClick: (e) => g(),
                  className: "button small",
                }),
                (0, c.z)({
                  text: "Go Back",
                  onClick: (e) => h(""),
                  className: "button small",
                }),
              ],
            }),
            password: (0, a.jsxs)("section", {
              className: "flex column alignItems",
              children: [
                (0, a.jsx)("input", {
                  placeholder: "Current Password",
                  type: "password",
                  name: "password",
                  id: "password",
                  onChange: (e) => i(e.target.value),
                }),
                (0, a.jsx)("input", {
                  placeholder: "New Password",
                  type: "password",
                  name: "newPassword",
                  id: "newPassword",
                  onChange: (e) => m(e.target.value),
                }),
                (0, c.z)({
                  text: "Change Password",
                  onClick: (e) => j(),
                  className: "button small",
                }),
                (0, c.z)({
                  text: "Go Back",
                  onClick: (e) => h(""),
                  className: "button small",
                }),
              ],
            }),
          };
        return x ? C[x] : y;
      }
      var m = s(108),
        x = s(2580),
        h = s(2651),
        p = () => {
          let e = (0, n.useContext)(d.S),
            [t, s] = (0, n.useState)(1),
            c = (0, m.o)((e) => e.listOfSongs),
            r = (0, m.o)((e) => e.songDisplay),
            p = (0, m.o)((e) => e.setSongDisplay),
            g = (0, m.o)((e) => e.song),
            j = (0, m.o)((e) => e.searchDisplay),
            w = (0, m.o)((e) => e.setSearchDisplay);
          return (
            (0, n.useEffect)(() => {
              w(!1);
            }, []),
            (0, a.jsx)(a.Fragment, {
              children: j
                ? (0, a.jsx)(h.default, {})
                : (0, a.jsxs)(a.Fragment, {
                    children: [
                      (0, a.jsx)(l.Z, {}),
                      (0, a.jsxs)("section", {
                        id: "account",
                        className: "main",
                        children: [
                          (0, a.jsxs)("h1", {
                            children: ["Welcome ", null == e ? void 0 : e.name],
                          }),
                          (0, a.jsx)(o.Z, {}),
                          (0, a.jsxs)("section", {
                            className: "flex alignItems spaceEvenly",
                            children: [
                              (0, a.jsx)("section", {
                                children: (0, a.jsx)(x.Z, {
                                  playlist: c,
                                  setSongDisplay: (e) => p(e),
                                  songDisplay: r,
                                  songs: g,
                                  currentPage: t,
                                  setCurrentPage: (e) => s(e),
                                }),
                              }),
                              (0, a.jsx)(u, {}),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsx)(i.Z, {}),
                    ],
                  }),
            })
          );
        };
    },
    2580: function (e, t, s) {
      "use strict";
      s.d(t, {
        Z: function () {
          return o;
        },
      });
      var a = s(7437),
        n = s(9184),
        l = s(6908);
      function o(e) {
        let t = (e.currentPage - 1) * 4,
          s = e.playlist.map((e) => {
            let t = e.playlistSongs.map((e) => {
              let t = JSON.parse(e);
              return t.audio;
            });
            return (0, a.jsxs)(
              "tr",
              {
                children: [
                  (0, a.jsx)("td", { children: e.playlistName }),
                  (0, a.jsx)("td", {
                    children: (0, a.jsx)("button", {
                      className: "button small",
                      onClick: (s) => {
                        s.preventDefault(),
                          localStorage.setItem(
                            "playlist",
                            JSON.stringify({ id: e.$id, song: t }),
                          ),
                          window.location.reload();
                      },
                      children: "Play",
                    }),
                  }),
                  (0, a.jsx)("td", {
                    children: (0, l.Z)({
                      text: "Edit",
                      className: "button",
                      domain: "/editPlaylist/".concat(e.$id),
                    }),
                  }),
                ],
              },
              e.$id,
            );
          });
        return (0, a.jsxs)("section", {
          children: [
            (0, l.z)({
              className: "button",
              text: "Song",
              onClick: (t) => {
                t.preventDefault(), e.setSongDisplay(!1);
              },
            }),
            (0, l.z)({
              className: "button",
              text: "Playlist",
              onClick: (t) => {
                t.preventDefault(), e.setSongDisplay(!0);
              },
            }),
            e.songDisplay
              ? (0, a.jsxs)("div", {
                  id: "tableContainer",
                  children: [
                    (0, a.jsx)("h2", { children: "Playlists" }),
                    (0, a.jsxs)("table", {
                      children: [
                        (0, a.jsx)("thead", {
                          children: (0, a.jsxs)("tr", {
                            children: [
                              (0, a.jsx)("th", { children: "Name" }),
                              (0, a.jsx)("th", { children: "Play" }),
                              (0, a.jsx)("th", { children: "Edit" }),
                            ],
                          }),
                        }),
                        (0, a.jsx)("tbody", { children: s }),
                      ],
                    }),
                  ],
                })
              : (0, a.jsx)(n.ZP, {
                  songs: e.songs,
                  check: !0,
                  startIndex: t,
                  endIndex: t + 4,
                  currentPage: e.currentPage,
                  setCurrentPage: (t) => e.setCurrentPage(t),
                  rowsPerPage: 4,
                }),
          ],
        });
      }
    },
  },
  function (e) {
    e.O(0, [650, 199, 184, 998, 971, 472, 744], function () {
      return e((e.s = 3381));
    }),
      (_N_E = e.O());
  },
]);
