(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [990],
  {
    2651: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return d;
          },
        });
      var s = n(7437);
      n(8574), n(860);
      var o = n(108),
        a = n(70),
        r = n(6908),
        i = n(2943),
        l = n(8676),
        c = n(6650),
        u = n(9184);
      function d() {
        let e = (0, o.o)((e) => e.searchResults),
          t = (0, a.Z)("auth"),
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
                            onClick: (t) => (0, u.at)(e.$id, e.cloudinaryId),
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
          return o;
        },
      });
      var s = n(7437);
      function o() {
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
        o = n(1396),
        a = n.n(o),
        r = n(7614),
        i = n(6908),
        l = n(108),
        c = n(171);
      function u() {
        let e = (0, l.o)((e) => e.searchValue),
          t = (0, l.o)((e) => e.setSearchValue),
          n = (0, l.o)((e) => e.setSearchResults),
          o = (0, l.o)((e) => e.song),
          a = (0, l.o)((e) => e.listOfSongs),
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
                    o.forEach((n) => {
                      var s, o, a;
                      ((null == n
                        ? void 0
                        : null === (s = n.audio) || void 0 === s
                          ? void 0
                          : s.toLowerCase().includes(e.toLowerCase())) ||
                        (null == n
                          ? void 0
                          : null === (o = n.name) || void 0 === o
                            ? void 0
                            : o.toLowerCase().includes(e.toLowerCase())) ||
                        (null == n
                          ? void 0
                          : null === (a = n.user) || void 0 === a
                            ? void 0
                            : a.toLowerCase().includes(e.toLowerCase()))) &&
                        t.push(n);
                    }),
                      a.forEach((n) => {
                        var s, o;
                        ((null == n
                          ? void 0
                          : null === (s = n.playlistName) || void 0 === s
                            ? void 0
                            : s.toLowerCase().includes(e.toLowerCase())) ||
                          (null == n
                            ? void 0
                            : null === (o = n.user) || void 0 === o
                              ? void 0
                              : o.toLowerCase().includes(e.toLowerCase()))) &&
                          t.push(n),
                          n.playlistSongs.forEach((s) => {
                            var o, a, r;
                            let i = JSON.parse(s);
                            ((null == i
                              ? void 0
                              : null === (o = i.audio) || void 0 === o
                                ? void 0
                                : o.toLowerCase().includes(e.toLowerCase())) ||
                              (null == i
                                ? void 0
                                : null === (a = i.name) || void 0 === a
                                  ? void 0
                                  : a
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
      var d = n(4033),
        h = n(70);
      function f() {
        async function e(e) {
          try {
            e.preventDefault(),
              sessionStorage.removeItem("auth"),
              await r.Z.deleteCurrentSession(),
              window.location.reload(),
              (0, d.redirect)("/");
          } catch (e) {
            console.error(e);
          }
        }
        let t = (0, l.o)((e) => e.setHeaderDisplay),
          n = (0, l.o)((e) => e.headerDisplay),
          o = (0, h.Z)("auth");
        return (0, s.jsxs)("header", {
          className: "flex column",
          id: "header",
          children: [
            (0, s.jsx)("div", {
              children: (0, s.jsx)(a(), {
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
                    children: (0, s.jsx)(a(), { href: "/", children: "Home" }),
                  }),
                  (0, s.jsx)("li", {
                    children: (0, s.jsx)(a(), {
                      href: "/about",
                      children: "About",
                    }),
                  }),
                  o
                    ? (0, s.jsx)("li", {
                        children: (0, s.jsx)(a(), {
                          href: "/account",
                          children: "Account",
                        }),
                      })
                    : "",
                  o
                    ? (0, s.jsx)("li", {
                        children: (0, s.jsx)(a(), {
                          href: "/addAudio",
                          children: "Add Audio",
                        }),
                      })
                    : "",
                  o
                    ? (0, s.jsx)("li", {
                        children: (0, s.jsx)(a(), {
                          href: "/",
                          onClick: (t) => e(t),
                          children: "Logout",
                        }),
                      })
                    : "",
                  o
                    ? ""
                    : (0, s.jsx)("li", {
                        children: (0, s.jsx)(a(), {
                          href: "/demo",
                          children: "Demo",
                        }),
                      }),
                  o
                    ? ""
                    : (0, s.jsx)("li", {
                        children: (0, s.jsx)(a(), {
                          href: "/login",
                          children: "Login/Register",
                        }),
                      }),
                  (0, s.jsx)("li", { children: (0, s.jsx)(u, {}) }),
                ],
              }),
            }),
          ],
        });
      }
    },
    1836: function (e, t, n) {
      "use strict";
      n.d(t, {
        f: function () {
          return a;
        },
        j: function () {
          return r;
        },
      });
      var s = n(7332),
        o = n(7614);
      async function a(e, t, n, a) {
        try {
          let r = new s.KU(),
            i = new s.mR(r);
          r
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("64a0712c1618df1be9a2"),
            await i.create(s.ID.unique(), e, t, n),
            sessionStorage.setItem("auth", e),
            await o.Z.createSession(e, t),
            a("/");
        } catch (e) {
          console.error(e);
        }
      }
      async function r(e, t, n) {
        try {
          await o.Z.createSession(e, t),
            sessionStorage.setItem("auth", e),
            n("/");
        } catch (e) {
          console.error(e);
        }
      }
    },
    4946: function (e, t, n) {
      "use strict";
      var s = n(7437),
        o = n(4033),
        a = n(70);
      t.Z = (e) => {
        let t = (t) => {
          let n = (0, a.Z)("auth");
          if (!n) return (0, s.jsx)(e, { ...t });
          (0, o.redirect)("/");
        };
        return e.getInitialProps && (t.getInitialProps = e.getInitialProps), t;
      };
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
          return R;
        },
      });
      var s = n(2265),
        o = function () {
          for (var e, t, n = 0, s = ""; n < arguments.length; )
            (e = arguments[n++]) &&
              (t = (function e(t) {
                var n,
                  s,
                  o = "";
                if ("string" == typeof t || "number" == typeof t) o += t;
                else if ("object" == typeof t) {
                  if (Array.isArray(t))
                    for (n = 0; n < t.length; n++)
                      t[n] && (s = e(t[n])) && (o && (o += " "), (o += s));
                  else for (n in t) t[n] && (o && (o += " "), (o += n));
                }
                return o;
              })(e)) &&
              (s && (s += " "), (s += t));
          return s;
        };
      let a = (e) => "number" == typeof e && !isNaN(e),
        r = (e) => "string" == typeof e,
        i = (e) => "function" == typeof e,
        l = (e) => (r(e) || i(e) ? e : null),
        c = (e) => (0, s.isValidElement)(e) || r(e) || i(e) || a(e);
      function u(e) {
        let {
          enter: t,
          exit: n,
          appendPosition: o = !1,
          collapse: a = !0,
          collapseDuration: r = 300,
        } = e;
        return function (e) {
          let {
              children: i,
              position: l,
              preventExitTransition: c,
              done: u,
              nodeRef: d,
              isIn: h,
            } = e,
            f = o ? `${t}--${l}` : t,
            m = o ? `${n}--${l}` : n,
            p = (0, s.useRef)(0);
          return (
            (0, s.useLayoutEffect)(() => {
              let e = d.current,
                t = f.split(" "),
                n = (s) => {
                  s.target === d.current &&
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
              let e = d.current,
                t = () => {
                  e.removeEventListener("animationend", t),
                    a
                      ? (function (e, t, n) {
                          void 0 === n && (n = 300);
                          let { scrollHeight: s, style: o } = e;
                          requestAnimationFrame(() => {
                            (o.minHeight = "initial"),
                              (o.height = s + "px"),
                              (o.transition = `all ${n}ms`),
                              requestAnimationFrame(() => {
                                (o.height = "0"),
                                  (o.padding = "0"),
                                  (o.margin = "0"),
                                  setTimeout(t, n);
                              });
                          });
                        })(e, u, r)
                      : u();
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
      function d(e, t) {
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
          let { theme: t, type: n, ...o } = e;
          return s.createElement("svg", {
            viewBox: "0 0 24 24",
            width: "100%",
            height: "100%",
            fill:
              "colored" === t
                ? "currentColor"
                : `var(--toastify-icon-color-${n})`,
            ...o,
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
        let { closeToast: t, theme: n, ariaLabel: o = "close" } = e;
        return s.createElement(
          "button",
          {
            className: `Toastify__close-button Toastify__close-button--${n}`,
            type: "button",
            onClick: (e) => {
              e.stopPropagation(), t(e);
            },
            "aria-label": o,
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
            closeToast: a,
            type: r = "default",
            hide: l,
            className: c,
            style: u,
            controlledProgress: d,
            progress: h,
            rtl: f,
            isIn: m,
            theme: p,
          } = e,
          g = l || (d && 0 === h),
          v = {
            ...u,
            animationDuration: `${t}ms`,
            animationPlayState: n ? "running" : "paused",
            opacity: g ? 0 : 1,
          };
        d && (v.transform = `scaleX(${h})`);
        let y = o(
            "Toastify__progress-bar",
            d
              ? "Toastify__progress-bar--controlled"
              : "Toastify__progress-bar--animated",
            `Toastify__progress-bar-theme--${p}`,
            `Toastify__progress-bar--${r}`,
            { "Toastify__progress-bar--rtl": f },
          ),
          x = i(c) ? c({ rtl: f, type: r, defaultClassName: y }) : o(y, c);
        return s.createElement("div", {
          role: "progressbar",
          "aria-hidden": g ? "true" : "false",
          "aria-label": "notification timer",
          className: x,
          style: v,
          [d && h >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
            d && h < 1
              ? null
              : () => {
                  m && a();
                },
        });
      }
      let x = (e) => {
          let {
              isRunning: t,
              preventExitTransition: n,
              toastRef: a,
              eventHandlers: r,
            } = (function (e) {
              let [t, n] = (0, s.useState)(!1),
                [o, a] = (0, s.useState)(!1),
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
                  autoClose: u,
                  pauseOnHover: d,
                  closeToast: h,
                  onClick: f,
                  closeOnClick: m,
                } = e;
              function v(t) {
                if (e.draggable) {
                  "touchstart" === t.nativeEvent.type &&
                    t.nativeEvent.preventDefault(),
                    (l.didMove = !1),
                    document.addEventListener("mousemove", T),
                    document.addEventListener("mouseup", C),
                    document.addEventListener("touchmove", T),
                    document.addEventListener("touchend", C);
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
                  let { top: n, bottom: s, left: o, right: a } = l.boundingRect;
                  "touchend" !== t.nativeEvent.type &&
                  e.pauseOnHover &&
                  l.x >= o &&
                  l.x <= a &&
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
              function T(n) {
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
              function C() {
                document.removeEventListener("mousemove", T),
                  document.removeEventListener("mouseup", C),
                  document.removeEventListener("touchmove", T),
                  document.removeEventListener("touchend", C);
                let t = r.current;
                if (l.canDrag && l.didMove && t) {
                  if (((l.canDrag = !1), Math.abs(l.delta) > l.removalDistance))
                    return a(!0), void e.closeToast();
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
              let b = {
                onMouseDown: v,
                onTouchStart: v,
                onMouseUp: y,
                onTouchEnd: y,
              };
              return (
                u && d && ((b.onMouseEnter = E), (b.onMouseLeave = x)),
                m &&
                  (b.onClick = (e) => {
                    f && f(e), l.canCloseOnClick && h();
                  }),
                {
                  playToast: x,
                  pauseToast: E,
                  isRunning: t,
                  preventExitTransition: o,
                  toastRef: r,
                  eventHandlers: b,
                }
              );
            })(e),
            {
              closeButton: l,
              children: c,
              autoClose: u,
              onClick: d,
              type: h,
              hideProgressBar: f,
              closeToast: m,
              transition: x,
              position: E,
              className: T,
              style: C,
              bodyClassName: b,
              bodyStyle: j,
              progressClassName: w,
              progressStyle: N,
              updateId: I,
              role: L,
              progress: _,
              rtl: R,
              toastId: O,
              deleteToast: k,
              isIn: S,
              isLoading: D,
              iconOut: M,
              closeOnClick: P,
              theme: A,
            } = e,
            $ = o(
              "Toastify__toast",
              `Toastify__toast-theme--${A}`,
              `Toastify__toast--${h}`,
              { "Toastify__toast--rtl": R },
              { "Toastify__toast--close-on-click": P },
            ),
            B = i(T)
              ? T({ rtl: R, position: E, type: h, defaultClassName: $ })
              : o($, T),
            z = !!_ || !u,
            F = { closeToast: m, type: h, theme: A },
            H = null;
          return (
            !1 === l ||
              (H = i(l)
                ? l(F)
                : (0, s.isValidElement)(l)
                  ? (0, s.cloneElement)(l, F)
                  : v(F)),
            s.createElement(
              x,
              {
                isIn: S,
                done: k,
                position: E,
                preventExitTransition: n,
                nodeRef: a,
              },
              s.createElement(
                "div",
                { id: O, onClick: d, className: B, ...r, style: C, ref: a },
                s.createElement(
                  "div",
                  {
                    ...(S && { role: L }),
                    className: i(b)
                      ? b({ type: h })
                      : o("Toastify__toast-body", b),
                    style: j,
                  },
                  null != M &&
                    s.createElement(
                      "div",
                      {
                        className: o("Toastify__toast-icon", {
                          "Toastify--animate-icon Toastify__zoom-enter": !D,
                        }),
                      },
                      M,
                    ),
                  s.createElement("div", null, c),
                ),
                H,
                s.createElement(y, {
                  ...(I && !z ? { key: `pb-${I}` } : {}),
                  rtl: R,
                  theme: A,
                  delay: u,
                  isRunning: t,
                  isIn: S,
                  closeToast: m,
                  hide: f,
                  type: h,
                  style: N,
                  className: w,
                  controlledProgress: z,
                  progress: _ || 0,
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
        T = u(E("bounce", !0)),
        C =
          (u(E("slide", !0)),
          u(E("zoom")),
          u(E("flip")),
          (0, s.forwardRef)((e, t) => {
            let {
                getToastToRender: n,
                containerRef: u,
                isToastActive: f,
              } = (function (e) {
                let [, t] = (0, s.useReducer)((e) => e + 1, 0),
                  [n, o] = (0, s.useState)([]),
                  u = (0, s.useRef)(null),
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
                  o((t) => (null == e ? [] : t.filter((t) => t !== e)));
                }
                function x() {
                  let {
                    toastContent: e,
                    toastProps: t,
                    staleId: n,
                  } = g.queue.shift();
                  T(e, t, n);
                }
                function E(e, n) {
                  var o, p;
                  let { delay: v, staleId: E, ...C } = n;
                  if (
                    !c(e) ||
                    !u.current ||
                    (g.props.enableMultiContainer &&
                      C.containerId !== g.props.containerId) ||
                    (f.has(C.toastId) && null == C.updateId)
                  )
                    return;
                  let { toastId: b, updateId: j, data: w } = C,
                    { props: N } = g,
                    I = () => y(b),
                    L = null == j;
                  L && g.count++;
                  let _ = {
                    ...N,
                    style: N.toastStyle,
                    key: g.toastKey++,
                    ...Object.fromEntries(
                      Object.entries(C).filter((e) => {
                        let [t, n] = e;
                        return null != n;
                      }),
                    ),
                    toastId: b,
                    updateId: j,
                    data: w,
                    closeToast: I,
                    isIn: !1,
                    className: l(C.className || N.toastClassName),
                    bodyClassName: l(C.bodyClassName || N.bodyClassName),
                    progressClassName: l(
                      C.progressClassName || N.progressClassName,
                    ),
                    autoClose:
                      !C.isLoading &&
                      ((o = C.autoClose),
                      (p = N.autoClose),
                      !1 === o || (a(o) && o > 0) ? o : p),
                    deleteToast() {
                      let e = d(f.get(b), "removed");
                      f.delete(b), h.emit(4, e);
                      let n = g.queue.length;
                      if (
                        ((g.count =
                          null == b ? g.count - g.displayedToast : g.count - 1),
                        g.count < 0 && (g.count = 0),
                        n > 0)
                      ) {
                        let e = null == b ? g.props.limit : 1;
                        if (1 === n || 1 === e) g.displayedToast++, x();
                        else {
                          let t = e > n ? n : e;
                          g.displayedToast = t;
                          for (let e = 0; e < t; e++) x();
                        }
                      } else t();
                    },
                  };
                  (_.iconOut = (function (e) {
                    let { theme: t, type: n, isLoading: o, icon: l } = e,
                      c = null,
                      u = { theme: t, type: n };
                    return (
                      !1 === l ||
                        (i(l)
                          ? (c = l(u))
                          : (0, s.isValidElement)(l)
                            ? (c = (0, s.cloneElement)(l, u))
                            : r(l) || a(l)
                              ? (c = l)
                              : o
                                ? (c = m.spinner())
                                : n in m && (c = m[n](u))),
                      c
                    );
                  })(_)),
                    i(C.onOpen) && (_.onOpen = C.onOpen),
                    i(C.onClose) && (_.onClose = C.onClose),
                    (_.closeButton = N.closeButton),
                    !1 === C.closeButton || c(C.closeButton)
                      ? (_.closeButton = C.closeButton)
                      : !0 === C.closeButton &&
                        (_.closeButton = !c(N.closeButton) || N.closeButton);
                  let R = e;
                  (0, s.isValidElement)(e) && !r(e.type)
                    ? (R = (0, s.cloneElement)(e, {
                        closeToast: I,
                        toastProps: _,
                        data: w,
                      }))
                    : i(e) &&
                      (R = e({ closeToast: I, toastProps: _, data: w })),
                    N.limit && N.limit > 0 && g.count > N.limit && L
                      ? g.queue.push({
                          toastContent: R,
                          toastProps: _,
                          staleId: E,
                        })
                      : a(v)
                        ? setTimeout(() => {
                            T(R, _, E);
                          }, v)
                        : T(R, _, E);
                }
                function T(e, t, n) {
                  let { toastId: s } = t;
                  n && f.delete(n);
                  let a = { content: e, props: t };
                  f.set(s, a),
                    o((e) => [...e, s].filter((e) => e !== n)),
                    h.emit(
                      4,
                      d(a, null == a.props.updateId ? "added" : "updated"),
                    );
                }
                return (
                  (0, s.useEffect)(
                    () => (
                      (g.containerId = e.containerId),
                      h
                        .cancelEmit(3)
                        .on(0, E)
                        .on(1, (e) => u.current && y(e))
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
                    containerRef: u,
                    isToastActive: p,
                  }
                );
              })(e),
              { className: p, style: g, rtl: v, containerId: y } = e;
            return (
              (0, s.useEffect)(() => {
                t && (t.current = u.current);
              }, []),
              s.createElement(
                "div",
                { ref: u, className: "Toastify", id: y },
                n((e, t) => {
                  let n = t.length ? { ...g } : { ...g, pointerEvents: "none" };
                  return s.createElement(
                    "div",
                    {
                      className: (function (e) {
                        let t = o(
                          "Toastify__toast-container",
                          `Toastify__toast-container--${e}`,
                          { "Toastify__toast-container--rtl": v },
                        );
                        return i(p)
                          ? p({ position: e, rtl: v, defaultClassName: t })
                          : o(t, l(p));
                      })(e),
                      style: n,
                      key: `container-${e}`,
                    },
                    t.map((e, n) => {
                      let { content: o, props: a } = e;
                      return s.createElement(
                        x,
                        {
                          ...a,
                          isIn: f(a.toastId),
                          style: {
                            ...a.style,
                            "--nth": n + 1,
                            "--len": t.length,
                          },
                          key: `toast-${a.key}`,
                        },
                        o,
                      );
                    }),
                  );
                }),
              )
            );
          }));
      (C.displayName = "ToastContainer"),
        (C.defaultProps = {
          position: "top-right",
          transition: T,
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
      let b,
        j = new Map(),
        w = [],
        N = 1;
      function I(e, t) {
        return (
          j.size > 0 ? h.emit(0, e, t) : w.push({ content: e, options: t }),
          t.toastId
        );
      }
      function L(e, t) {
        return {
          ...t,
          type: (t && t.type) || e,
          toastId: t && (r(t.toastId) || a(t.toastId)) ? t.toastId : "" + N++,
        };
      }
      function _(e) {
        return (t, n) => I(t, L(e, n));
      }
      function R(e, t) {
        return I(e, L("default", t));
      }
      (R.loading = (e, t) =>
        I(
          e,
          L("default", {
            isLoading: !0,
            autoClose: !1,
            closeOnClick: !1,
            closeButton: !1,
            draggable: !1,
            ...t,
          }),
        )),
        (R.promise = function (e, t, n) {
          let s,
            { pending: o, error: a, success: l } = t;
          o &&
            (s = r(o) ? R.loading(o, n) : R.loading(o.render, { ...n, ...o }));
          let c = {
              isLoading: null,
              autoClose: null,
              closeOnClick: null,
              closeButton: null,
              draggable: null,
            },
            u = (e, t, o) => {
              if (null == t) return void R.dismiss(s);
              let a = { type: e, ...c, ...n, data: o },
                i = r(t) ? { render: t } : t;
              return (
                s ? R.update(s, { ...a, ...i }) : R(i.render, { ...a, ...i }), o
              );
            },
            d = i(e) ? e() : e;
          return (
            d.then((e) => u("success", l, e)).catch((e) => u("error", a, e)), d
          );
        }),
        (R.success = _("success")),
        (R.info = _("info")),
        (R.error = _("error")),
        (R.warning = _("warning")),
        (R.warn = R.warning),
        (R.dark = (e, t) => I(e, L("default", { theme: "dark", ...t }))),
        (R.dismiss = (e) => {
          j.size > 0
            ? h.emit(1, e)
            : (w = w.filter((t) => null != e && t.options.toastId !== e));
        }),
        (R.clearWaitingQueue = function (e) {
          return void 0 === e && (e = {}), h.emit(5, e);
        }),
        (R.isActive = (e) => {
          let t = !1;
          return (
            j.forEach((n) => {
              n.isToastActive && n.isToastActive(e) && (t = !0);
            }),
            t
          );
        }),
        (R.update = function (e, t) {
          void 0 === t && (t = {}),
            setTimeout(() => {
              let n = (function (e, t) {
                let { containerId: n } = t,
                  s = j.get(n || b);
                return s && s.getToast(e);
              })(e, t);
              if (n) {
                let { props: s, content: o } = n,
                  a = {
                    delay: 100,
                    ...s,
                    ...t,
                    toastId: t.toastId || e,
                    updateId: "" + N++,
                  };
                a.toastId !== e && (a.staleId = e);
                let r = a.render || o;
                delete a.render, I(r, a);
              }
            }, 0);
        }),
        (R.done = (e) => {
          R.update(e, { progress: 1 });
        }),
        (R.onChange = (e) => (
          h.on(4, e),
          () => {
            h.off(4, e);
          }
        )),
        (R.POSITION = {
          TOP_LEFT: "top-left",
          TOP_RIGHT: "top-right",
          TOP_CENTER: "top-center",
          BOTTOM_LEFT: "bottom-left",
          BOTTOM_RIGHT: "bottom-right",
          BOTTOM_CENTER: "bottom-center",
        }),
        (R.TYPE = {
          INFO: "info",
          SUCCESS: "success",
          WARNING: "warning",
          ERROR: "error",
          DEFAULT: "default",
        }),
        h
          .on(2, (e) => {
            (b = e.containerId || e),
              j.set(b, e),
              w.forEach((e) => {
                h.emit(0, e.content, e.options);
              }),
              (w = []);
          })
          .on(3, (e) => {
            j.delete(e.containerId || e),
              0 === j.size && h.off(0).off(1).off(5);
          });
    },
  },
]);
