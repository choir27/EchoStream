(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [90],
  {
    6648: function (e, t, n) {
      Promise.resolve().then(n.bind(n, 5083));
    },
    5083: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return v;
          },
        });
      var s = n(7437),
        a = n(2265),
        o = n(108),
        r = n(9211),
        i = n(6908),
        l = n(7614),
        c = n(4033);
      async function d(e, t, n) {
        try {
          let s = {
            playlistName: e,
            playlistSongs: t.playlistSongs,
            userID: n.$id,
            user: n.email,
          };
          await l.Z.updateDocument(
            "6543e6631929ba50ffd1",
            "6543e8ebf074d567b450",
            t.$id,
            s,
          ),
            window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }
      async function u(e, t, n) {
        try {
          let s = t.playlistSongs.map((e) => e),
            a = s.find((t) => {
              let n = JSON.parse(t);
              return n.$id === e;
            });
          s.splice(s.indexOf(a), 1);
          let o = {
            playlistName: t.playlistName,
            playlistSongs: s,
            userID: n.$id,
            user: n.email,
          };
          await l.Z.updateDocument(
            "6543e6631929ba50ffd1",
            "6543e8ebf074d567b450",
            t.$id,
            o,
          ),
            window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }
      async function h(e, t) {
        try {
          await l.Z.deleteDocument(
            "6543e6631929ba50ffd1",
            "6543e8ebf074d567b450",
            e.$id,
          ),
            localStorage.setItem("playlist", ""),
            t("/");
        } catch (e) {
          console.error(e);
        }
      }
      function f(e) {
        let t = (0, o.o)((e) => e.listOfSongs),
          n = (0, a.useContext)(r.S),
          [l, f] = (0, a.useState)(!1),
          [m, p] = (0, a.useState)(""),
          g = t.find((t) => t.$id === e.id),
          v = null == g ? void 0 : g.$updatedAt,
          y = new Date(v),
          { push: x } = (0, c.useRouter)(),
          E =
            null == g
              ? void 0
              : g.playlistSongs.map((e) => {
                  let t = JSON.parse(e);
                  return (0, s.jsxs)(
                    "tr",
                    {
                      children: [
                        (0, s.jsx)("td", { children: t.name }),
                        (0, s.jsx)("td", { children: t.artist }),
                        (0, s.jsx)("td", { children: t.genre }),
                        (0, s.jsx)("td", { children: t.user }),
                        (0, s.jsx)("td", {
                          children: (0, i.z)({
                            text: "",
                            className: "fa-solid fa-xmark button small",
                            onClick: (e) => {
                              e.preventDefault(), u(t.$id, g, n);
                            },
                          }),
                        }),
                      ],
                    },
                    t.$id,
                  );
                });
        return (0, s.jsxs)("div", {
          id: "tableContainer",
          children: [
            (0, s.jsx)("section", {
              children: l
                ? (0, s.jsxs)("form", {
                    className: "flex spaceEvenly",
                    children: [
                      (0, s.jsx)("h2", { children: "Edit Playlist Name" }),
                      (0, s.jsx)("input", {
                        type: "text",
                        onChange: (e) => p(e.target.value),
                      }),
                      (0, i.z)({
                        text: "",
                        className: "fa-solid fa-pen-to-square button",
                        onClick: (e) => {
                          e.preventDefault(), d(m, g, n);
                        },
                      }),
                      (0, i.z)({
                        text: "",
                        className: "fa-solid fa-right-from-bracket button",
                        onClick: (e) => {
                          e.preventDefault(), f(!1);
                        },
                      }),
                    ],
                  })
                : (0, s.jsxs)("div", {
                    className: "flex spaceEvenly",
                    children: [
                      (0, s.jsxs)("h2", {
                        children: [
                          "Playlist Name: ",
                          null == g ? void 0 : g.playlistName,
                        ],
                      }),
                      (0, i.z)({
                        text: "",
                        className: "fa-regular fa-pen-to-square button",
                        onClick: (e) => {
                          e.preventDefault(), f(!0);
                        },
                      }),
                      (0, i.z)({
                        text: "",
                        className: "fa-solid fa-trash-can button",
                        onClick: (e) => {
                          e.preventDefault(), h(g, x);
                        },
                      }),
                    ],
                  }),
            }),
            (0, s.jsxs)("h3", {
              children: [
                "Updated At: ",
                y.getMonth() + 1,
                "/",
                y.getDate(),
                "/",
                y.getFullYear(),
              ],
            }),
            (0, s.jsxs)("table", {
              children: [
                (0, s.jsx)("thead", {
                  children: (0, s.jsxs)("tr", {
                    children: [
                      (0, s.jsx)("th", { children: "Song Name" }),
                      (0, s.jsx)("th", { children: "Artist" }),
                      (0, s.jsx)("th", { children: "Genre" }),
                      (0, s.jsx)("th", { children: "User" }),
                      (0, s.jsx)("th", { children: "Remove" }),
                    ],
                  }),
                }),
                (0, s.jsx)("tbody", { children: E }),
              ],
            }),
          ],
        });
      }
      n(8574), n(860);
      var m = n(2943),
        p = n(8676),
        g = n(2651);
      function v(e) {
        let t = e.params,
          n = (0, o.o)((e) => e.searchDisplay),
          r = (0, o.o)((e) => e.setSearchDisplay);
        return (
          (0, a.useEffect)(() => {
            r(!1);
          }, []),
          (0, s.jsx)(s.Fragment, {
            children: n
              ? (0, s.jsx)(g.default, {})
              : (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsx)(m.Z, {}),
                    (0, s.jsx)("section", {
                      className: "main",
                      id: "home",
                      children: (0, s.jsxs)("section", {
                        children: [
                          (0, s.jsx)("h1", { children: "Edit Playlist" }),
                          (0, s.jsx)(f, { id: t.id }),
                        ],
                      }),
                    }),
                    (0, s.jsx)(p.Z, {}),
                  ],
                }),
          })
        );
      }
    },
    2651: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return u;
          },
        });
      var s = n(7437);
      n(8574), n(860);
      var a = n(108),
        o = n(70),
        r = n(6908),
        i = n(2943),
        l = n(8676),
        c = n(6650),
        d = n(9184);
      function u() {
        let e = (0, a.o)((e) => e.searchResults),
          t = (0, o.Z)("auth"),
          n = e.map((e, n) =>
            (0, s.jsxs)(
              "tr",
              {
                children: [
                  (0, s.jsx)("td", {
                    children: e.name ? e.name : e.playlistName,
                  }),
                  (0, s.jsx)("td", {
                    children: e.audio
                      ? (0, s.jsx)("button", {
                          className: "button small",
                          onClick: (t) => {
                            t.preventDefault(),
                              localStorage.setItem("song", e.$id),
                              window.location.reload();
                          },
                          children: "Play",
                        })
                      : "",
                  }),
                  (0, s.jsx)("td", {}),
                  (0, s.jsx)("td", { children: e.user }),
                  (0, s.jsx)("td", {
                    children: e.audio ? (0, s.jsx)(c.Z, { index: n }) : "  ",
                  }),
                  (0, s.jsx)("td", {
                    children:
                      (null == t ? void 0 : t.toLowerCase()) === e.user &&
                      e.audio
                        ? (0, r.z)({
                            text: "",
                            className: "fa-solid fa-trash button small",
                            onClick: (t) => (0, d.at)(e.$id, e.cloudinaryId),
                          })
                        : "",
                  }),
                ],
              },
              "".concat(e.$id, "-").concat(e.name),
            ),
          );
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(i.Z, {}),
            (0, s.jsx)("section", {
              id: "home",
              className: "main",
              children: (0, s.jsxs)("div", {
                id: "tableContainer",
                children: [
                  (0, s.jsx)("h2", { children: "Search Results" }),
                  e.length
                    ? (0, s.jsxs)("table", {
                        children: [
                          (0, s.jsx)("thead", {
                            children: (0, s.jsxs)("tr", {
                              children: [
                                (0, s.jsx)("th", { children: "Name" }),
                                (0, s.jsx)("th", { children: "Play" }),
                                (0, s.jsx)("th", {}),
                                (0, s.jsx)("th", { children: t ? "" : "User" }),
                                (0, s.jsx)("th", { children: "Playlist" }),
                                (0, s.jsx)("th", { children: "Delete" }),
                              ],
                            }),
                          }),
                          (0, s.jsx)("tbody", { children: n }),
                        ],
                      })
                    : (0, s.jsx)("h2", {
                        children: "No Results Match Your Search",
                      }),
                ],
              }),
            }),
            (0, s.jsx)(l.Z, {}),
          ],
        });
      }
    },
    8676: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return a;
        },
      });
      var s = n(7437);
      function a() {
        return (0, s.jsx)("footer", {
          className: "flex",
          children: (0, s.jsxs)("nav", {
            className: "flex",
            children: [
              (0, s.jsxs)("ul", {
                className: "flex icons",
                children: [
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)("a", {
                      rel: "noreferrer",
                      target: "_blank",
                      href: "https://twitter.com/choir241",
                      className: "fa-brands fa-twitter",
                      children: (0, s.jsx)("p", {
                        className: "hidden",
                        children: "Twitter",
                      }),
                    }),
                  }),
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)("a", {
                      rel: "noreferrer",
                      target: "_blank",
                      href: "https://www.linkedin.com/in/richard-choir/",
                      className: "fa-brands fa-linkedin",
                      children: (0, s.jsx)("p", {
                        className: "hidden",
                        children: "LinkedIn",
                      }),
                    }),
                  }),
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)("a", {
                      rel: "noreferrer",
                      target: "_blank",
                      href: "https://www.instagram.com/225kh_drw/?hl=en",
                      className: "fa-brands fa-instagram",
                      children: (0, s.jsx)("p", {
                        className: "hidden",
                        children: "Instagram",
                      }),
                    }),
                  }),
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)("a", {
                      rel: "noreferrer",
                      target: "_blank",
                      href: "https://github.com/choir27",
                      className: "fa-brands fa-github",
                      children: (0, s.jsx)("p", {
                        className: "hidden",
                        children: "Github",
                      }),
                    }),
                  }),
                ],
              }),
              (0, s.jsx)("small", {
                children: "EchoVerse \xa9 2023. All rights are reserved",
              }),
            ],
          }),
        });
      }
      n(2265);
    },
    2943: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return f;
        },
      });
      var s = n(7437),
        a = n(1396),
        o = n.n(a),
        r = n(7614),
        i = n(6908),
        l = n(108),
        c = n(171);
      function d() {
        let e = (0, l.o)((e) => e.searchValue),
          t = (0, l.o)((e) => e.setSearchValue),
          n = (0, l.o)((e) => e.setSearchResults),
          a = (0, l.o)((e) => e.song),
          o = (0, l.o)((e) => e.listOfSongs),
          r = (0, l.o)((e) => e.setSearchDisplay);
        return (0, s.jsxs)("form", {
          children: [
            (0, s.jsx)("input", {
              type: "search",
              onChange: (e) => t(e.target.value),
            }),
            (0, s.jsx)(i.z, {
              text: "",
              className: "fa-solid fa-magnifying-glass button",
              onClick: (t) => {
                t.preventDefault(),
                  (function () {
                    let t = [];
                    a.forEach((n) => {
                      var s, a, o;
                      ((null == n
                        ? void 0
                        : null === (s = n.audio) || void 0 === s
                          ? void 0
                          : s.toLowerCase().includes(e.toLowerCase())) ||
                        (null == n
                          ? void 0
                          : null === (a = n.name) || void 0 === a
                            ? void 0
                            : a.toLowerCase().includes(e.toLowerCase())) ||
                        (null == n
                          ? void 0
                          : null === (o = n.user) || void 0 === o
                            ? void 0
                            : o.toLowerCase().includes(e.toLowerCase()))) &&
                        t.push(n);
                    }),
                      o.forEach((n) => {
                        var s, a;
                        ((null == n
                          ? void 0
                          : null === (s = n.playlistName) || void 0 === s
                            ? void 0
                            : s.toLowerCase().includes(e.toLowerCase())) ||
                          (null == n
                            ? void 0
                            : null === (a = n.user) || void 0 === a
                              ? void 0
                              : a.toLowerCase().includes(e.toLowerCase()))) &&
                          t.push(n),
                          n.playlistSongs.forEach((s) => {
                            var a, o, r;
                            let i = JSON.parse(s);
                            ((null == i
                              ? void 0
                              : null === (a = i.audio) || void 0 === a
                                ? void 0
                                : a.toLowerCase().includes(e.toLowerCase())) ||
                              (null == i
                                ? void 0
                                : null === (o = i.name) || void 0 === o
                                  ? void 0
                                  : o
                                      .toLowerCase()
                                      .includes(e.toLowerCase())) ||
                              (null == i
                                ? void 0
                                : null === (r = i.user) || void 0 === r
                                  ? void 0
                                  : r
                                      .toLowerCase()
                                      .includes(e.toLowerCase()))) &&
                              t.push(n);
                          });
                      }),
                      t.length ||
                        (console.log("No Results Match Your Search"),
                        c.Am.error("No Results Match Your Search")),
                      n(t),
                      r(!0);
                  })();
              },
            }),
          ],
        });
      }
      var u = n(4033),
        h = n(70);
      function f() {
        async function e(e) {
          try {
            e.preventDefault(),
              sessionStorage.removeItem("auth"),
              await r.Z.deleteCurrentSession(),
              window.location.reload(),
              (0, u.redirect)("/");
          } catch (e) {
            console.error(e);
          }
        }
        let t = (0, l.o)((e) => e.setHeaderDisplay),
          n = (0, l.o)((e) => e.headerDisplay),
          a = (0, h.Z)("auth");
        return (0, s.jsxs)("header", {
          className: "flex column",
          id: "header",
          children: [
            (0, s.jsx)("div", {
              children: (0, s.jsx)(o(), {
                href: "/",
                children: (0, s.jsx)("h1", { children: "EchoStream" }),
              }),
            }),
            (0, i.z)({
              text: "",
              className: "".concat(
                "display" === n
                  ? "fa-solid fa-xmark button small hidden"
                  : "fa-solid fa-bars button small hidden",
              ),
              id: "menu",
              onClick: () =>
                void ("display" === n ? t("hidden") : t("display")),
            }),
            (0, s.jsx)("nav", {
              className: "flex column nav ".concat(n),
              children: (0, s.jsxs)("ul", {
                className: "flex navBar",
                children: [
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)(o(), { href: "/", children: "Home" }),
                  }),
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)(o(), {
                      href: "/about",
                      children: "About",
                    }),
                  }),
                  a
                    ? (0, s.jsx)("li", {
                        children: (0, s.jsx)(o(), {
                          href: "/account",
                          children: "Account",
                        }),
                      })
                    : "",
                  a
                    ? (0, s.jsx)("li", {
                        children: (0, s.jsx)(o(), {
                          href: "/addAudio",
                          children: "Add Audio",
                        }),
                      })
                    : "",
                  a
                    ? (0, s.jsx)("li", {
                        children: (0, s.jsx)(o(), {
                          href: "/",
                          onClick: (t) => e(t),
                          children: "Logout",
                        }),
                      })
                    : "",
                  a
                    ? ""
                    : (0, s.jsx)("li", {
                        children: (0, s.jsx)(o(), {
                          href: "/demo",
                          children: "Demo",
                        }),
                      }),
                  a
                    ? ""
                    : (0, s.jsx)("li", {
                        children: (0, s.jsx)(o(), {
                          href: "/login",
                          children: "Login/Register",
                        }),
                      }),
                  (0, s.jsx)("li", { children: (0, s.jsx)(d, {}) }),
                ],
              }),
            }),
          ],
        });
      }
    },
    8574: function () {},
    860: function () {},
    4033: function (e, t, n) {
      e.exports = n(94);
    },
    171: function (e, t, n) {
      "use strict";
      n.d(t, {
        Am: function () {
          return O;
        },
      });
      var s = n(2265),
        a = function () {
          for (var e, t, n = 0, s = ""; n < arguments.length; )
            (e = arguments[n++]) &&
              (t = (function e(t) {
                var n,
                  s,
                  a = "";
                if ("string" == typeof t || "number" == typeof t) a += t;
                else if ("object" == typeof t) {
                  if (Array.isArray(t))
                    for (n = 0; n < t.length; n++)
                      t[n] && (s = e(t[n])) && (a && (a += " "), (a += s));
                  else for (n in t) t[n] && (a && (a += " "), (a += n));
                }
                return a;
              })(e)) &&
              (s && (s += " "), (s += t));
          return s;
        };
      let o = (e) => "number" == typeof e && !isNaN(e),
        r = (e) => "string" == typeof e,
        i = (e) => "function" == typeof e,
        l = (e) => (r(e) || i(e) ? e : null),
        c = (e) => (0, s.isValidElement)(e) || r(e) || i(e) || o(e);
      function d(e) {
        let {
          enter: t,
          exit: n,
          appendPosition: a = !1,
          collapse: o = !0,
          collapseDuration: r = 300,
        } = e;
        return function (e) {
          let {
              children: i,
              position: l,
              preventExitTransition: c,
              done: d,
              nodeRef: u,
              isIn: h,
            } = e,
            f = a ? `${t}--${l}` : t,
            m = a ? `${n}--${l}` : n,
            p = (0, s.useRef)(0);
          return (
            (0, s.useLayoutEffect)(() => {
              let e = u.current,
                t = f.split(" "),
                n = (s) => {
                  s.target === u.current &&
                    (e.dispatchEvent(new Event("d")),
                    e.removeEventListener("animationend", n),
                    e.removeEventListener("animationcancel", n),
                    0 === p.current &&
                      "animationcancel" !== s.type &&
                      e.classList.remove(...t));
                };
              e.classList.add(...t),
                e.addEventListener("animationend", n),
                e.addEventListener("animationcancel", n);
            }, []),
            (0, s.useEffect)(() => {
              let e = u.current,
                t = () => {
                  e.removeEventListener("animationend", t),
                    o
                      ? (function (e, t, n) {
                          void 0 === n && (n = 300);
                          let { scrollHeight: s, style: a } = e;
                          requestAnimationFrame(() => {
                            (a.minHeight = "initial"),
                              (a.height = s + "px"),
                              (a.transition = `all ${n}ms`),
                              requestAnimationFrame(() => {
                                (a.height = "0"),
                                  (a.padding = "0"),
                                  (a.margin = "0"),
                                  setTimeout(t, n);
                              });
                          });
                        })(e, d, r)
                      : d();
                };
              h ||
                (c
                  ? t()
                  : ((p.current = 1),
                    (e.className += ` ${m}`),
                    e.addEventListener("animationend", t)));
            }, [h]),
            s.createElement(s.Fragment, null, i)
          );
        };
      }
      function u(e, t) {
        return null != e
          ? {
              content: e.content,
              containerId: e.props.containerId,
              id: e.props.toastId,
              theme: e.props.theme,
              type: e.props.type,
              data: e.props.data || {},
              isLoading: e.props.isLoading,
              icon: e.props.icon,
              status: t,
            }
          : {};
      }
      let h = {
          list: new Map(),
          emitQueue: new Map(),
          on(e, t) {
            return (
              this.list.has(e) || this.list.set(e, []),
              this.list.get(e).push(t),
              this
            );
          },
          off(e, t) {
            if (t) {
              let n = this.list.get(e).filter((e) => e !== t);
              return this.list.set(e, n), this;
            }
            return this.list.delete(e), this;
          },
          cancelEmit(e) {
            let t = this.emitQueue.get(e);
            return (
              t && (t.forEach(clearTimeout), this.emitQueue.delete(e)), this
            );
          },
          emit(e) {
            this.list.has(e) &&
              this.list.get(e).forEach((t) => {
                let n = setTimeout(() => {
                  t(...[].slice.call(arguments, 1));
                }, 0);
                this.emitQueue.has(e) || this.emitQueue.set(e, []),
                  this.emitQueue.get(e).push(n);
              });
          },
        },
        f = (e) => {
          let { theme: t, type: n, ...a } = e;
          return s.createElement("svg", {
            viewBox: "0 0 24 24",
            width: "100%",
            height: "100%",
            fill:
              "colored" === t
                ? "currentColor"
                : `var(--toastify-icon-color-${n})`,
            ...a,
          });
        },
        m = {
          info: function (e) {
            return s.createElement(
              f,
              { ...e },
              s.createElement("path", {
                d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
              }),
            );
          },
          warning: function (e) {
            return s.createElement(
              f,
              { ...e },
              s.createElement("path", {
                d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
              }),
            );
          },
          success: function (e) {
            return s.createElement(
              f,
              { ...e },
              s.createElement("path", {
                d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
              }),
            );
          },
          error: function (e) {
            return s.createElement(
              f,
              { ...e },
              s.createElement("path", {
                d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
              }),
            );
          },
          spinner: function () {
            return s.createElement("div", { className: "Toastify__spinner" });
          },
        };
      function p(e) {
        return e.targetTouches && e.targetTouches.length >= 1
          ? e.targetTouches[0].clientX
          : e.clientX;
      }
      function g(e) {
        return e.targetTouches && e.targetTouches.length >= 1
          ? e.targetTouches[0].clientY
          : e.clientY;
      }
      function v(e) {
        let { closeToast: t, theme: n, ariaLabel: a = "close" } = e;
        return s.createElement(
          "button",
          {
            className: `Toastify__close-button Toastify__close-button--${n}`,
            type: "button",
            onClick: (e) => {
              e.stopPropagation(), t(e);
            },
            "aria-label": a,
          },
          s.createElement(
            "svg",
            { "aria-hidden": "true", viewBox: "0 0 14 16" },
            s.createElement("path", {
              fillRule: "evenodd",
              d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
            }),
          ),
        );
      }
      function y(e) {
        let {
            delay: t,
            isRunning: n,
            closeToast: o,
            type: r = "default",
            hide: l,
            className: c,
            style: d,
            controlledProgress: u,
            progress: h,
            rtl: f,
            isIn: m,
            theme: p,
          } = e,
          g = l || (u && 0 === h),
          v = {
            ...d,
            animationDuration: `${t}ms`,
            animationPlayState: n ? "running" : "paused",
            opacity: g ? 0 : 1,
          };
        u && (v.transform = `scaleX(${h})`);
        let y = a(
            "Toastify__progress-bar",
            u
              ? "Toastify__progress-bar--controlled"
              : "Toastify__progress-bar--animated",
            `Toastify__progress-bar-theme--${p}`,
            `Toastify__progress-bar--${r}`,
            { "Toastify__progress-bar--rtl": f },
          ),
          x = i(c) ? c({ rtl: f, type: r, defaultClassName: y }) : a(y, c);
        return s.createElement("div", {
          role: "progressbar",
          "aria-hidden": g ? "true" : "false",
          "aria-label": "notification timer",
          className: x,
          style: v,
          [u && h >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
            u && h < 1
              ? null
              : () => {
                  m && o();
                },
        });
      }
      let x = (e) => {
          let {
              isRunning: t,
              preventExitTransition: n,
              toastRef: o,
              eventHandlers: r,
            } = (function (e) {
              let [t, n] = (0, s.useState)(!1),
                [a, o] = (0, s.useState)(!1),
                r = (0, s.useRef)(null),
                l = (0, s.useRef)({
                  start: 0,
                  x: 0,
                  y: 0,
                  delta: 0,
                  removalDistance: 0,
                  canCloseOnClick: !0,
                  canDrag: !1,
                  boundingRect: null,
                  didMove: !1,
                }).current,
                c = (0, s.useRef)(e),
                {
                  autoClose: d,
                  pauseOnHover: u,
                  closeToast: h,
                  onClick: f,
                  closeOnClick: m,
                } = e;
              function v(t) {
                if (e.draggable) {
                  "touchstart" === t.nativeEvent.type &&
                    t.nativeEvent.preventDefault(),
                    (l.didMove = !1),
                    document.addEventListener("mousemove", j),
                    document.addEventListener("mouseup", b),
                    document.addEventListener("touchmove", j),
                    document.addEventListener("touchend", b);
                  let n = r.current;
                  (l.canCloseOnClick = !0),
                    (l.canDrag = !0),
                    (l.boundingRect = n.getBoundingClientRect()),
                    (n.style.transition = ""),
                    (l.x = p(t.nativeEvent)),
                    (l.y = g(t.nativeEvent)),
                    "x" === e.draggableDirection
                      ? ((l.start = l.x),
                        (l.removalDistance =
                          n.offsetWidth * (e.draggablePercent / 100)))
                      : ((l.start = l.y),
                        (l.removalDistance =
                          n.offsetHeight *
                          (80 === e.draggablePercent
                            ? 1.5 * e.draggablePercent
                            : e.draggablePercent / 100)));
                }
              }
              function y(t) {
                if (l.boundingRect) {
                  let { top: n, bottom: s, left: a, right: o } = l.boundingRect;
                  "touchend" !== t.nativeEvent.type &&
                  e.pauseOnHover &&
                  l.x >= a &&
                  l.x <= o &&
                  l.y >= n &&
                  l.y <= s
                    ? E()
                    : x();
                }
              }
              function x() {
                n(!0);
              }
              function E() {
                n(!1);
              }
              function j(n) {
                let s = r.current;
                l.canDrag &&
                  s &&
                  ((l.didMove = !0),
                  t && E(),
                  (l.x = p(n)),
                  (l.y = g(n)),
                  (l.delta =
                    "x" === e.draggableDirection
                      ? l.x - l.start
                      : l.y - l.start),
                  l.start !== l.x && (l.canCloseOnClick = !1),
                  (s.style.transform = `translate${e.draggableDirection}(${l.delta}px)`),
                  (s.style.opacity =
                    "" + (1 - Math.abs(l.delta / l.removalDistance))));
              }
              function b() {
                document.removeEventListener("mousemove", j),
                  document.removeEventListener("mouseup", b),
                  document.removeEventListener("touchmove", j),
                  document.removeEventListener("touchend", b);
                let t = r.current;
                if (l.canDrag && l.didMove && t) {
                  if (((l.canDrag = !1), Math.abs(l.delta) > l.removalDistance))
                    return o(!0), void e.closeToast();
                  (t.style.transition = "transform 0.2s, opacity 0.2s"),
                    (t.style.transform = `translate${e.draggableDirection}(0)`),
                    (t.style.opacity = "1");
                }
              }
              (0, s.useEffect)(() => {
                c.current = e;
              }),
                (0, s.useEffect)(
                  () => (
                    r.current &&
                      r.current.addEventListener("d", x, { once: !0 }),
                    i(e.onOpen) &&
                      e.onOpen(
                        (0, s.isValidElement)(e.children) && e.children.props,
                      ),
                    () => {
                      let e = c.current;
                      i(e.onClose) &&
                        e.onClose(
                          (0, s.isValidElement)(e.children) && e.children.props,
                        );
                    }
                  ),
                  [],
                ),
                (0, s.useEffect)(
                  () => (
                    e.pauseOnFocusLoss &&
                      (document.hasFocus() || E(),
                      window.addEventListener("focus", x),
                      window.addEventListener("blur", E)),
                    () => {
                      e.pauseOnFocusLoss &&
                        (window.removeEventListener("focus", x),
                        window.removeEventListener("blur", E));
                    }
                  ),
                  [e.pauseOnFocusLoss],
                );
              let T = {
                onMouseDown: v,
                onTouchStart: v,
                onMouseUp: y,
                onTouchEnd: y,
              };
              return (
                d && u && ((T.onMouseEnter = E), (T.onMouseLeave = x)),
                m &&
                  (T.onClick = (e) => {
                    f && f(e), l.canCloseOnClick && h();
                  }),
                {
                  playToast: x,
                  pauseToast: E,
                  isRunning: t,
                  preventExitTransition: a,
                  toastRef: r,
                  eventHandlers: T,
                }
              );
            })(e),
            {
              closeButton: l,
              children: c,
              autoClose: d,
              onClick: u,
              type: h,
              hideProgressBar: f,
              closeToast: m,
              transition: x,
              position: E,
              className: j,
              style: b,
              bodyClassName: T,
              bodyStyle: C,
              progressClassName: N,
              progressStyle: w,
              updateId: L,
              role: _,
              progress: I,
              rtl: O,
              toastId: k,
              deleteToast: R,
              isIn: D,
              isLoading: S,
              iconOut: $,
              closeOnClick: A,
              theme: M,
            } = e,
            P = a(
              "Toastify__toast",
              `Toastify__toast-theme--${M}`,
              `Toastify__toast--${h}`,
              { "Toastify__toast--rtl": O },
              { "Toastify__toast--close-on-click": A },
            ),
            z = i(j)
              ? j({ rtl: O, position: E, type: h, defaultClassName: P })
              : a(P, j),
            B = !!I || !d,
            F = { closeToast: m, type: h, theme: M },
            Z = null;
          return (
            !1 === l ||
              (Z = i(l)
                ? l(F)
                : (0, s.isValidElement)(l)
                  ? (0, s.cloneElement)(l, F)
                  : v(F)),
            s.createElement(
              x,
              {
                isIn: D,
                done: R,
                position: E,
                preventExitTransition: n,
                nodeRef: o,
              },
              s.createElement(
                "div",
                { id: k, onClick: u, className: z, ...r, style: b, ref: o },
                s.createElement(
                  "div",
                  {
                    ...(D && { role: _ }),
                    className: i(T)
                      ? T({ type: h })
                      : a("Toastify__toast-body", T),
                    style: C,
                  },
                  null != $ &&
                    s.createElement(
                      "div",
                      {
                        className: a("Toastify__toast-icon", {
                          "Toastify--animate-icon Toastify__zoom-enter": !S,
                        }),
                      },
                      $,
                    ),
                  s.createElement("div", null, c),
                ),
                Z,
                s.createElement(y, {
                  ...(L && !B ? { key: `pb-${L}` } : {}),
                  rtl: O,
                  theme: M,
                  delay: d,
                  isRunning: t,
                  isIn: D,
                  closeToast: m,
                  hide: f,
                  type: h,
                  style: w,
                  className: N,
                  controlledProgress: B,
                  progress: I || 0,
                }),
              ),
            )
          );
        },
        E = function (e, t) {
          return (
            void 0 === t && (t = !1),
            {
              enter: `Toastify--animate Toastify__${e}-enter`,
              exit: `Toastify--animate Toastify__${e}-exit`,
              appendPosition: t,
            }
          );
        },
        j = d(E("bounce", !0)),
        b =
          (d(E("slide", !0)),
          d(E("zoom")),
          d(E("flip")),
          (0, s.forwardRef)((e, t) => {
            let {
                getToastToRender: n,
                containerRef: d,
                isToastActive: f,
              } = (function (e) {
                let [, t] = (0, s.useReducer)((e) => e + 1, 0),
                  [n, a] = (0, s.useState)([]),
                  d = (0, s.useRef)(null),
                  f = (0, s.useRef)(new Map()).current,
                  p = (e) => -1 !== n.indexOf(e),
                  g = (0, s.useRef)({
                    toastKey: 1,
                    displayedToast: 0,
                    count: 0,
                    queue: [],
                    props: e,
                    containerId: null,
                    isToastActive: p,
                    getToast: (e) => f.get(e),
                  }).current;
                function v(e) {
                  let { containerId: t } = e,
                    { limit: n } = g.props;
                  !n ||
                    (t && g.containerId !== t) ||
                    ((g.count -= g.queue.length), (g.queue = []));
                }
                function y(e) {
                  a((t) => (null == e ? [] : t.filter((t) => t !== e)));
                }
                function x() {
                  let {
                    toastContent: e,
                    toastProps: t,
                    staleId: n,
                  } = g.queue.shift();
                  j(e, t, n);
                }
                function E(e, n) {
                  var a, p;
                  let { delay: v, staleId: E, ...b } = n;
                  if (
                    !c(e) ||
                    !d.current ||
                    (g.props.enableMultiContainer &&
                      b.containerId !== g.props.containerId) ||
                    (f.has(b.toastId) && null == b.updateId)
                  )
                    return;
                  let { toastId: T, updateId: C, data: N } = b,
                    { props: w } = g,
                    L = () => y(T),
                    _ = null == C;
                  _ && g.count++;
                  let I = {
                    ...w,
                    style: w.toastStyle,
                    key: g.toastKey++,
                    ...Object.fromEntries(
                      Object.entries(b).filter((e) => {
                        let [t, n] = e;
                        return null != n;
                      }),
                    ),
                    toastId: T,
                    updateId: C,
                    data: N,
                    closeToast: L,
                    isIn: !1,
                    className: l(b.className || w.toastClassName),
                    bodyClassName: l(b.bodyClassName || w.bodyClassName),
                    progressClassName: l(
                      b.progressClassName || w.progressClassName,
                    ),
                    autoClose:
                      !b.isLoading &&
                      ((a = b.autoClose),
                      (p = w.autoClose),
                      !1 === a || (o(a) && a > 0) ? a : p),
                    deleteToast() {
                      let e = u(f.get(T), "removed");
                      f.delete(T), h.emit(4, e);
                      let n = g.queue.length;
                      if (
                        ((g.count =
                          null == T ? g.count - g.displayedToast : g.count - 1),
                        g.count < 0 && (g.count = 0),
                        n > 0)
                      ) {
                        let e = null == T ? g.props.limit : 1;
                        if (1 === n || 1 === e) g.displayedToast++, x();
                        else {
                          let t = e > n ? n : e;
                          g.displayedToast = t;
                          for (let e = 0; e < t; e++) x();
                        }
                      } else t();
                    },
                  };
                  (I.iconOut = (function (e) {
                    let { theme: t, type: n, isLoading: a, icon: l } = e,
                      c = null,
                      d = { theme: t, type: n };
                    return (
                      !1 === l ||
                        (i(l)
                          ? (c = l(d))
                          : (0, s.isValidElement)(l)
                            ? (c = (0, s.cloneElement)(l, d))
                            : r(l) || o(l)
                              ? (c = l)
                              : a
                                ? (c = m.spinner())
                                : n in m && (c = m[n](d))),
                      c
                    );
                  })(I)),
                    i(b.onOpen) && (I.onOpen = b.onOpen),
                    i(b.onClose) && (I.onClose = b.onClose),
                    (I.closeButton = w.closeButton),
                    !1 === b.closeButton || c(b.closeButton)
                      ? (I.closeButton = b.closeButton)
                      : !0 === b.closeButton &&
                        (I.closeButton = !c(w.closeButton) || w.closeButton);
                  let O = e;
                  (0, s.isValidElement)(e) && !r(e.type)
                    ? (O = (0, s.cloneElement)(e, {
                        closeToast: L,
                        toastProps: I,
                        data: N,
                      }))
                    : i(e) &&
                      (O = e({ closeToast: L, toastProps: I, data: N })),
                    w.limit && w.limit > 0 && g.count > w.limit && _
                      ? g.queue.push({
                          toastContent: O,
                          toastProps: I,
                          staleId: E,
                        })
                      : o(v)
                        ? setTimeout(() => {
                            j(O, I, E);
                          }, v)
                        : j(O, I, E);
                }
                function j(e, t, n) {
                  let { toastId: s } = t;
                  n && f.delete(n);
                  let o = { content: e, props: t };
                  f.set(s, o),
                    a((e) => [...e, s].filter((e) => e !== n)),
                    h.emit(
                      4,
                      u(o, null == o.props.updateId ? "added" : "updated"),
                    );
                }
                return (
                  (0, s.useEffect)(
                    () => (
                      (g.containerId = e.containerId),
                      h
                        .cancelEmit(3)
                        .on(0, E)
                        .on(1, (e) => d.current && y(e))
                        .on(5, v)
                        .emit(2, g),
                      () => {
                        f.clear(), h.emit(3, g);
                      }
                    ),
                    [],
                  ),
                  (0, s.useEffect)(() => {
                    (g.props = e),
                      (g.isToastActive = p),
                      (g.displayedToast = n.length);
                  }),
                  {
                    getToastToRender: function (t) {
                      let n = new Map(),
                        s = Array.from(f.values());
                      return (
                        e.newestOnTop && s.reverse(),
                        s.forEach((e) => {
                          let { position: t } = e.props;
                          n.has(t) || n.set(t, []), n.get(t).push(e);
                        }),
                        Array.from(n, (e) => t(e[0], e[1]))
                      );
                    },
                    containerRef: d,
                    isToastActive: p,
                  }
                );
              })(e),
              { className: p, style: g, rtl: v, containerId: y } = e;
            return (
              (0, s.useEffect)(() => {
                t && (t.current = d.current);
              }, []),
              s.createElement(
                "div",
                { ref: d, className: "Toastify", id: y },
                n((e, t) => {
                  let n = t.length ? { ...g } : { ...g, pointerEvents: "none" };
                  return s.createElement(
                    "div",
                    {
                      className: (function (e) {
                        let t = a(
                          "Toastify__toast-container",
                          `Toastify__toast-container--${e}`,
                          { "Toastify__toast-container--rtl": v },
                        );
                        return i(p)
                          ? p({ position: e, rtl: v, defaultClassName: t })
                          : a(t, l(p));
                      })(e),
                      style: n,
                      key: `container-${e}`,
                    },
                    t.map((e, n) => {
                      let { content: a, props: o } = e;
                      return s.createElement(
                        x,
                        {
                          ...o,
                          isIn: f(o.toastId),
                          style: {
                            ...o.style,
                            "--nth": n + 1,
                            "--len": t.length,
                          },
                          key: `toast-${o.key}`,
                        },
                        a,
                      );
                    }),
                  );
                }),
              )
            );
          }));
      (b.displayName = "ToastContainer"),
        (b.defaultProps = {
          position: "top-right",
          transition: j,
          autoClose: 5e3,
          closeButton: v,
          pauseOnHover: !0,
          pauseOnFocusLoss: !0,
          closeOnClick: !0,
          draggable: !0,
          draggablePercent: 80,
          draggableDirection: "x",
          role: "alert",
          theme: "light",
        });
      let T,
        C = new Map(),
        N = [],
        w = 1;
      function L(e, t) {
        return (
          C.size > 0 ? h.emit(0, e, t) : N.push({ content: e, options: t }),
          t.toastId
        );
      }
      function _(e, t) {
        return {
          ...t,
          type: (t && t.type) || e,
          toastId: t && (r(t.toastId) || o(t.toastId)) ? t.toastId : "" + w++,
        };
      }
      function I(e) {
        return (t, n) => L(t, _(e, n));
      }
      function O(e, t) {
        return L(e, _("default", t));
      }
      (O.loading = (e, t) =>
        L(
          e,
          _("default", {
            isLoading: !0,
            autoClose: !1,
            closeOnClick: !1,
            closeButton: !1,
            draggable: !1,
            ...t,
          }),
        )),
        (O.promise = function (e, t, n) {
          let s,
            { pending: a, error: o, success: l } = t;
          a &&
            (s = r(a) ? O.loading(a, n) : O.loading(a.render, { ...n, ...a }));
          let c = {
              isLoading: null,
              autoClose: null,
              closeOnClick: null,
              closeButton: null,
              draggable: null,
            },
            d = (e, t, a) => {
              if (null == t) return void O.dismiss(s);
              let o = { type: e, ...c, ...n, data: a },
                i = r(t) ? { render: t } : t;
              return (
                s ? O.update(s, { ...o, ...i }) : O(i.render, { ...o, ...i }), a
              );
            },
            u = i(e) ? e() : e;
          return (
            u.then((e) => d("success", l, e)).catch((e) => d("error", o, e)), u
          );
        }),
        (O.success = I("success")),
        (O.info = I("info")),
        (O.error = I("error")),
        (O.warning = I("warning")),
        (O.warn = O.warning),
        (O.dark = (e, t) => L(e, _("default", { theme: "dark", ...t }))),
        (O.dismiss = (e) => {
          C.size > 0
            ? h.emit(1, e)
            : (N = N.filter((t) => null != e && t.options.toastId !== e));
        }),
        (O.clearWaitingQueue = function (e) {
          return void 0 === e && (e = {}), h.emit(5, e);
        }),
        (O.isActive = (e) => {
          let t = !1;
          return (
            C.forEach((n) => {
              n.isToastActive && n.isToastActive(e) && (t = !0);
            }),
            t
          );
        }),
        (O.update = function (e, t) {
          void 0 === t && (t = {}),
            setTimeout(() => {
              let n = (function (e, t) {
                let { containerId: n } = t,
                  s = C.get(n || T);
                return s && s.getToast(e);
              })(e, t);
              if (n) {
                let { props: s, content: a } = n,
                  o = {
                    delay: 100,
                    ...s,
                    ...t,
                    toastId: t.toastId || e,
                    updateId: "" + w++,
                  };
                o.toastId !== e && (o.staleId = e);
                let r = o.render || a;
                delete o.render, L(r, o);
              }
            }, 0);
        }),
        (O.done = (e) => {
          O.update(e, { progress: 1 });
        }),
        (O.onChange = (e) => (
          h.on(4, e),
          () => {
            h.off(4, e);
          }
        )),
        (O.POSITION = {
          TOP_LEFT: "top-left",
          TOP_RIGHT: "top-right",
          TOP_CENTER: "top-center",
          BOTTOM_LEFT: "bottom-left",
          BOTTOM_RIGHT: "bottom-right",
          BOTTOM_CENTER: "bottom-center",
        }),
        (O.TYPE = {
          INFO: "info",
          SUCCESS: "success",
          WARNING: "warning",
          ERROR: "error",
          DEFAULT: "default",
        }),
        h
          .on(2, (e) => {
            (T = e.containerId || e),
              C.set(T, e),
              N.forEach((e) => {
                h.emit(0, e.content, e.options);
              }),
              (N = []);
          })
          .on(3, (e) => {
            C.delete(e.containerId || e),
              0 === C.size && h.off(0).off(1).off(5);
          });
    },
  },
  function (e) {
    e.O(0, [650, 184, 971, 472, 744], function () {
      return e((e.s = 6648));
    }),
      (_N_E = e.O());
  },
]);
