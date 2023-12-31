(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    5375: function (e, s, t) {
      Promise.resolve().then(t.bind(t, 3356));
    },
    3356: function (e, s, t) {
      "use strict";
      t.r(s),
        t.d(s, {
          default: function () {
            return u;
          },
        });
      var n = t(7437),
        l = t(2265),
        i = t(2943);
      t(8574), t(860);
      var a = t(7598),
        r = t(8676),
        c = t(108),
        o = t(2580),
        d = t(2651);
      function u() {
        let [e, s] = (0, l.useState)(1),
          t = (0, c.o)((e) => e.listOfSongs),
          u = (0, c.o)((e) => e.songDisplay),
          h = (0, c.o)((e) => e.setSongDisplay),
          x = (0, c.o)((e) => e.song),
          g = (0, c.o)((e) => e.searchDisplay),
          j = (0, c.o)((e) => e.setSearchDisplay);
        return (
          (0, l.useEffect)(() => {
            j(!1);
          }, []),
          (0, n.jsx)(n.Fragment, {
            children: g
              ? (0, n.jsx)(d.default, {})
              : (0, n.jsxs)("main", {
                  className: "column flex",
                  children: [
                    (0, n.jsx)(i.Z, {}),
                    (0, n.jsxs)("section", {
                      className: "main",
                      children: [
                        (0, n.jsx)(a.Z, {}),
                        (0, n.jsx)("section", {
                          children: (0, n.jsx)(o.Z, {
                            playlist: t,
                            setSongDisplay: (e) => h(e),
                            songDisplay: u,
                            songs: x,
                            currentPage: e,
                            setCurrentPage: (e) => s(e),
                          }),
                        }),
                      ],
                    }),
                    (0, n.jsx)(r.Z, {}),
                  ],
                }),
          })
        );
      }
    },
    2580: function (e, s, t) {
      "use strict";
      t.d(s, {
        Z: function () {
          return a;
        },
      });
      var n = t(7437),
        l = t(9184),
        i = t(6908);
      function a(e) {
        let s = (e.currentPage - 1) * 4,
          t = e.playlist.map((e) => {
            let s = e.playlistSongs.map((e) => {
              let s = JSON.parse(e);
              return s.audio;
            });
            return (0, n.jsxs)(
              "tr",
              {
                children: [
                  (0, n.jsx)("td", { children: e.playlistName }),
                  (0, n.jsx)("td", {
                    children: (0, n.jsx)("button", {
                      className: "button small",
                      onClick: (t) => {
                        t.preventDefault(),
                          localStorage.setItem(
                            "playlist",
                            JSON.stringify({ id: e.$id, song: s }),
                          ),
                          window.location.reload();
                      },
                      children: "Play",
                    }),
                  }),
                  (0, n.jsx)("td", {
                    children: (0, i.Z)({
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
        return (0, n.jsxs)("section", {
          children: [
            (0, i.z)({
              className: "button",
              text: "Song",
              onClick: (s) => {
                s.preventDefault(), e.setSongDisplay(!1);
              },
            }),
            (0, i.z)({
              className: "button",
              text: "Playlist",
              onClick: (s) => {
                s.preventDefault(), e.setSongDisplay(!0);
              },
            }),
            e.songDisplay
              ? (0, n.jsxs)("div", {
                  id: "tableContainer",
                  children: [
                    (0, n.jsx)("h2", { children: "Playlists" }),
                    (0, n.jsxs)("table", {
                      children: [
                        (0, n.jsx)("thead", {
                          children: (0, n.jsxs)("tr", {
                            children: [
                              (0, n.jsx)("th", { children: "Name" }),
                              (0, n.jsx)("th", { children: "Play" }),
                              (0, n.jsx)("th", { children: "Edit" }),
                            ],
                          }),
                        }),
                        (0, n.jsx)("tbody", { children: t }),
                      ],
                    }),
                  ],
                })
              : (0, n.jsx)(l.ZP, {
                  songs: e.songs,
                  check: !0,
                  startIndex: s,
                  endIndex: s + 4,
                  currentPage: e.currentPage,
                  setCurrentPage: (s) => e.setCurrentPage(s),
                  rowsPerPage: 4,
                }),
          ],
        });
      }
    },
  },
  function (e) {
    e.O(0, [650, 199, 184, 998, 971, 472, 744], function () {
      return e((e.s = 5375));
    }),
      (_N_E = e.O());
  },
]);
