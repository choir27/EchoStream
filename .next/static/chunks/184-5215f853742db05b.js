"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [184],
  {
    7614: function (e, t, a) {
      var n = a(7332),
        s = a(2601);
      let r = {
        sdk: null,
        provider: () => {
          if (r.sdk) return r.sdk;
          let e = new n.KU();
          e.setEndpoint("https://cloud.appwrite.io/v1").setProject(
            "64a0712c1618df1be9a2",
          );
          let t = new n.mR(e),
            a = new n.Lg(e),
            s = new n.KU(e),
            l = new n.Ke(e);
          return (
            (r.sdk = { database: a, account: t, client: s, storage: l }), r.sdk
          );
        },
        createAccount: (e, t, a) =>
          r.provider().account.create("unique()", e, t, a),
        updateAccountName: (e) => r.provider().account.updateName(e),
        updateAccountPassword: (e, t) =>
          r.provider().account.updatePassword(e, t),
        updateAccountEmail: (e, t) => r.provider().account.updateEmail(e, t),
        getAccount: () => r.provider().account.get(),
        createSession: (e, t) => r.provider().account.createEmailSession(e, t),
        deleteCurrentSession: () =>
          r.provider().account.deleteSession("current"),
        deleteSessions: () => r.provider().account.deleteSessions(),
        createDocument: (e, t, a, n) =>
          r.provider().database.createDocument(e, t, "unique()", a, n),
        listDocuments: (e, t) => r.provider().database.listDocuments(e, t),
        updateDocument: (e, t, a, n) =>
          r.provider().database.updateDocument(e, t, a, n),
        deleteDocument: (e, t, a) =>
          r.provider().database.deleteDocument(e, t, a),
        uploadFile: (e, t) =>
          r.provider().storage.createFile(s.env.NEXT_PUBLIC_APP_SONGS, e, t),
        listFiles: () =>
          r.provider().storage.listFiles(s.env.NEXT_PUBLIC_APP_SONGS),
      };
      t.Z = r;
    },
    6908: function (e, t, a) {
      a.d(t, {
        Z: function () {
          return l;
        },
        z: function () {
          return o;
        },
      });
      var n = a(7437),
        s = a(1396),
        r = a.n(s);
      function l(e) {
        return (0, n.jsx)(r(), {
          href: e.domain,
          className: e.className,
          children: e.text,
        });
      }
      function o(e) {
        return (0, n.jsx)(
          "button",
          {
            id: e.id,
            className: e.className,
            onClick: (t) => e.onClick(t),
            children: e.text,
          },
          e.key,
        );
      }
      a(2265);
    },
    6650: function (e, t, a) {
      a.d(t, {
        u: function () {
          return h;
        },
        Z: function () {
          return f;
        },
      });
      var n = a(7437),
        s = a(2265),
        r = a(7332),
        l = a(7614),
        o = a(6908),
        i = a(108);
      async function c(e, t) {
        try {
          let a = localStorage.getItem("playlist"),
            n = JSON.parse(a);
          e.$id === n.id &&
            (n.song.push(t.$id),
            localStorage.setItem(
              "playlist",
              JSON.stringify({ id: e.$id, song: n.song }),
            ));
          let s = e.playlistSongs.map((e) => e);
          s.push(JSON.stringify(t)), (e.playlistSongs = s);
          let r = await l.Z.updateDocument(
            "6543e6631929ba50ffd1",
            "6543e8ebf074d567b450",
            e.$id,
            e,
          );
          r && window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }
      function u(e) {
        let t = (0, i.o)((e) => e.listOfSongs),
          a = (0, i.o)((e) => e.song),
          r = t.map((e, t) =>
            (0, n.jsx)("option", { value: t, children: e.playlistName }, e.$id),
          ),
          [l, o] = (0, s.useState)({
            $id: "",
            playlistName: "",
            playlistSongs: [""],
            userID: "",
            user: "",
          });
        return (0, n.jsxs)("section", {
          children: [
            (0, n.jsxs)("select", {
              onChange: (e) => {
                var a, n, s, r, l;
                return o({
                  $id:
                    null === (a = t[e.target.value]) || void 0 === a
                      ? void 0
                      : a.$id,
                  playlistName:
                    null === (n = t[e.target.value]) || void 0 === n
                      ? void 0
                      : n.playlistName,
                  playlistSongs:
                    null === (s = t[e.target.value]) || void 0 === s
                      ? void 0
                      : s.playlistSongs,
                  userID:
                    null === (r = t[e.target.value]) || void 0 === r
                      ? void 0
                      : r.userID,
                  user:
                    null === (l = t[e.target.value]) || void 0 === l
                      ? void 0
                      : l.user,
                });
              },
              children: [
                (0, n.jsx)("option", { children: "Choose Playlist" }, "0"),
                r,
              ],
            }),
            (0, n.jsx)("button", {
              className: "fa-solid fa-plus",
              onClick: (t) => {
                t.preventDefault(), c(l, a[e.index]);
              },
            }),
          ],
        });
      }
      var d = a(9211);
      async function h(e) {
        try {
          let t = await l.Z.listDocuments(
            "6543e6631929ba50ffd1",
            "6543e8ebf074d567b450",
          );
          e(t.documents);
        } catch (e) {
          console.error(e);
        }
      }
      function f(e) {
        let [t, a] = (0, s.useState)(!1),
          [i, c] = (0, s.useState)(""),
          h = (0, s.useContext)(d.S);
        return (0, n.jsxs)("section", {
          id: "playlist",
          children: [
            (0, n.jsx)("button", {
              className: "".concat(
                t ? "fa-solid fa-xmark black" : "fa-solid fa-plus",
                " button",
              ),
              onClick: (e) => {
                e.preventDefault(), a(!t);
              },
            }),
            t
              ? (function (e, t, a, s, i) {
                  async function c() {
                    try {
                      let t = await l.Z.createDocument(
                        "6543e6631929ba50ffd1",
                        "6543e8ebf074d567b450",
                        {
                          playlistName: e,
                          playlistSongs: [],
                          userID: a,
                          user: s,
                        },
                        [r.y3.read(r.uU.any())],
                      );
                      t && window.location.reload();
                    } catch (e) {
                      console.error(e);
                    }
                  }
                  return (0, n.jsxs)("form", {
                    className: "flex column alignStart",
                    children: [
                      (0, n.jsxs)("div", {
                        className: "flex alignItems justifyCenter",
                        children: [
                          (0, n.jsx)("input", {
                            type: "text",
                            onChange: (e) => t(e.target.value),
                            placeholder: "New Playlist Name",
                          }),
                          (0, o.z)({
                            text: "Create Playlist",
                            className: "",
                            onClick: (e) => {
                              e.preventDefault(), c();
                            },
                          }),
                        ],
                      }),
                      (0, n.jsx)(u, { index: i }),
                    ],
                  });
                })(
                  i,
                  (e) => c(e),
                  null == h ? void 0 : h.$id,
                  null == h ? void 0 : h.email,
                  e.index,
                )
              : "",
          ],
        });
      }
    },
    9184: function (e, t, a) {
      a.d(t, {
        AX: function () {
          return u;
        },
        ZP: function () {
          return h;
        },
        at: function () {
          return d;
        },
      });
      var n = a(7437);
      a(2265);
      var s = a(2173),
        r = a(7614),
        l = a(6908);
      function o(e) {
        let t = (t) => {
          e.setCurrentPage(t);
        };
        return (0, n.jsx)(
          "div",
          {
            className: e.className,
            children:
              Math.ceil(e.arrayLength / e.rowsPerPage) < e.currentPage + 1
                ? Array.from(
                    { length: Math.ceil(e.arrayLength / e.rowsPerPage) },
                    (e, a) =>
                      (0, l.z)({
                        onClick: (e) => {
                          t(a + 1);
                        },
                        text: "".concat(a + 1),
                        key: "button-".concat(a),
                        className: "button",
                      }),
                  )
                : Array.from(
                    { length: Math.ceil(e.arrayLength / e.rowsPerPage) },
                    (a, s) =>
                      s < e.currentPage - 2 && 0 !== s
                        ? (0, n.jsx)(
                            "h1",
                            { children: "..." },
                            "".concat(s, "-dots"),
                          )
                        : (!(s > e.currentPage + 1) && s < e.currentPage + 1) ||
                            s + 1 === Math.ceil(e.arrayLength / e.rowsPerPage)
                          ? (0, l.z)({
                              onClick: (e) => {
                                t(s + 1);
                              },
                              text: "".concat(s + 1),
                              key: "button-".concat(s),
                              className: "button",
                            })
                          : (0, n.jsx)(
                              "h1",
                              { children: "..." },
                              "".concat(s, "-dots"),
                            ),
                  ),
          },
          "buttons",
        );
      }
      var i = a(6650),
        c = a(70);
      async function u(e) {
        try {
          let t = await r.Z.listDocuments(
            "64a071efc39bca8c4bc0",
            "64a07cc02481a71b7da8",
          );
          t.documents.length && e(t.documents);
        } catch (e) {
          console.error(e);
        }
      }
      async function d(e, t) {
        try {
          let a = await s.Z.delete(
              "https://echoverse-backend.onrender.com/deleteAudio/".concat(t),
            ),
            n = await r.Z.deleteDocument(
              "64a071efc39bca8c4bc0",
              "64a07cc02481a71b7da8",
              e,
            );
          n && a && window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }
      function h(e) {
        let t = (0, c.Z)("auth"),
          a = e.songs.slice(e.startIndex, e.endIndex).map((e, a) =>
            e.user !== (null == t ? void 0 : t.toLowerCase())
              ? (0, n.jsxs)(
                  "tr",
                  {
                    children: [
                      (0, n.jsx)("td", { children: e.name }),
                      (0, n.jsx)("td", {
                        children: (0, n.jsx)("button", {
                          className: "button small",
                          onClick: (t) => {
                            t.preventDefault(),
                              localStorage.setItem(
                                "song",
                                JSON.stringify([e.audio]),
                              ),
                              localStorage.setItem("playlist", ""),
                              window.location.reload();
                          },
                          children: "Play",
                        }),
                      }),
                      (0, n.jsx)("td", {}),
                      (0, n.jsx)("td", { children: e.user }),
                      (0, n.jsx)("td", {
                        className: "playlist",
                        children: (0, n.jsx)(i.Z, { index: a }),
                      }),
                      (0, n.jsx)("td", {
                        children:
                          (null == t ? void 0 : t.toLowerCase()) === e.user
                            ? (0, l.z)({
                                text: "",
                                className: "fa-solid fa-trash button small",
                                onClick: (t) => d(e.$id, e.cloudinaryId),
                              })
                            : "",
                      }),
                    ],
                  },
                  e.$id,
                )
              : e.user === (null == t ? void 0 : t.toLowerCase())
                ? (0, n.jsxs)(
                    "tr",
                    {
                      children: [
                        (0, n.jsx)("td", { children: e.name }),
                        (0, n.jsx)("td", {
                          children: (0, n.jsx)("button", {
                            className: "button small",
                            onClick: (t) => {
                              t.preventDefault(),
                                localStorage.setItem(
                                  "song",
                                  JSON.stringify([e.audio]),
                                ),
                                localStorage.setItem("playlist", ""),
                                window.location.reload();
                            },
                            children: "Play",
                          }),
                        }),
                        (0, n.jsx)("td", {}),
                        (0, n.jsx)("td", {}),
                        (0, n.jsx)("td", {
                          className: "playlist",
                          children: (0, n.jsx)(i.Z, { index: a }),
                        }),
                        (0, n.jsx)("td", {
                          children: (0, l.z)({
                            text: "",
                            className: "fa-solid fa-trash button small",
                            onClick: (t) => d(e.$id, e.cloudinaryId),
                          }),
                        }),
                      ],
                    },
                    e.$id,
                  )
                : void 0,
          );
        return (0, n.jsx)("section", {
          children: (0, n.jsxs)("div", {
            id: "tableContainer",
            children: [
              (0, n.jsx)("h2", { children: "Song List" }),
              (0, n.jsxs)("table", {
                children: [
                  (0, n.jsx)("thead", {
                    children: (0, n.jsxs)("tr", {
                      children: [
                        (0, n.jsx)("th", { children: "Name" }),
                        (0, n.jsx)("th", { children: "Play" }),
                        (0, n.jsx)("th", {}),
                        (0, n.jsx)("th", { children: t ? "" : "User" }),
                        (0, n.jsx)("th", { children: "Playlist" }),
                        (0, n.jsx)("th", { children: "Delete" }),
                      ],
                    }),
                  }),
                  (0, n.jsx)("tbody", { children: a }),
                ],
              }),
              (0, n.jsx)(o, {
                currentPage: e.currentPage,
                setCurrentPage: (t) => e.setCurrentPage(t),
                rowsPerPage: e.rowsPerPage,
                arrayLength: e.songs.length,
              }),
            ],
          }),
        });
      }
    },
    9211: function (e, t, a) {
      a.d(t, {
        S: function () {
          return l;
        },
        Z: function () {
          return o;
        },
      });
      var n = a(7437),
        s = a(2265),
        r = a(7614);
      let l = (0, s.createContext)({});
      function o(e) {
        let { children: t } = e,
          [a, o] = (0, s.useState)();
        return (
          (0, s.useEffect)(() => {
            async function e() {
              let e = await r.Z.getAccount();
              o(e);
            }
            sessionStorage.getItem("auth") && e();
          }, []),
          (0, n.jsx)(l.Provider, { value: a, children: t })
        );
      }
    },
    70: function (e, t, a) {
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      var n = a(2265);
      function s(e) {
        let [t, a] = (0, n.useState)("");
        return (
          (0, n.useEffect)(() => {
            a(sessionStorage.getItem(e));
          }, []),
          t
        );
      }
    },
    108: function (e, t, a) {
      a.d(t, {
        o: function () {
          return r;
        },
      });
      var n = a(4660),
        s = a(7173);
      let r = (0, n.Ue)((e) => ({
        song: [],
        setSong: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.song = t;
            }),
          );
        },
        listOfSongs: [],
        setListOfSongs: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.listOfSongs = t;
            }),
          );
        },
        searchValue: "",
        setSearchValue: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.searchValue = t;
            }),
          );
        },
        searchResults: [],
        setSearchResults: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.searchResults = t;
            }),
          );
        },
        searchDisplay: !1,
        setSearchDisplay: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.searchDisplay = t;
            }),
          );
        },
        songDisplay: !1,
        setSongDisplay: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.songDisplay = t;
            }),
          );
        },
        headerDisplay: "",
        setHeaderDisplay: (t) => {
          e(
            (0, s.Uy)((e) => {
              e.headerDisplay = t;
            }),
          );
        },
      }));
    },
  },
]);
