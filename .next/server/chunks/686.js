"use strict";
(exports.id = 686),
  (exports.ids = [686]),
  (exports.modules = {
    1018: (e, t, n) => {
      e.exports = n(7804);
    },
    5166: (e, t, n) => {
      n.d(t, { Am: () => w });
      var o = n(4218);
      let s = function () {
          for (var e, t, n = 0, o = ""; n < arguments.length; )
            (e = arguments[n++]) &&
              (t = (function e(t) {
                var n,
                  o,
                  s = "";
                if ("string" == typeof t || "number" == typeof t) s += t;
                else if ("object" == typeof t) {
                  if (Array.isArray(t))
                    for (n = 0; n < t.length; n++)
                      t[n] && (o = e(t[n])) && (s && (s += " "), (s += o));
                  else for (n in t) t[n] && (s && (s += " "), (s += n));
                }
                return s;
              })(e)) &&
              (o && (o += " "), (o += t));
          return o;
        },
        a = (e) => "number" == typeof e && !isNaN(e),
        r = (e) => "string" == typeof e,
        i = (e) => "function" == typeof e,
        l = (e) => (r(e) || i(e) ? e : null),
        c = (e) => (0, o.isValidElement)(e) || r(e) || i(e) || a(e);
      function u(e) {
        let {
          enter: t,
          exit: n,
          appendPosition: s = !1,
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
              isIn: p,
            } = e,
            m = s ? `${t}--${l}` : t,
            f = s ? `${n}--${l}` : n,
            g = (0, o.useRef)(0);
          return (
            (0, o.useLayoutEffect)(() => {
              let e = d.current,
                t = m.split(" "),
                n = (o) => {
                  o.target === d.current &&
                    (e.dispatchEvent(new Event("d")),
                    e.removeEventListener("animationend", n),
                    e.removeEventListener("animationcancel", n),
                    0 === g.current &&
                      "animationcancel" !== o.type &&
                      e.classList.remove(...t));
                };
              e.classList.add(...t),
                e.addEventListener("animationend", n),
                e.addEventListener("animationcancel", n);
            }, []),
            (0, o.useEffect)(() => {
              let e = d.current,
                t = () => {
                  e.removeEventListener("animationend", t),
                    a
                      ? (function (e, t, n) {
                          void 0 === n && (n = 300);
                          let { scrollHeight: o, style: s } = e;
                          requestAnimationFrame(() => {
                            (s.minHeight = "initial"),
                              (s.height = o + "px"),
                              (s.transition = `all ${n}ms`),
                              requestAnimationFrame(() => {
                                (s.height = "0"),
                                  (s.padding = "0"),
                                  (s.margin = "0"),
                                  setTimeout(t, n);
                              });
                          });
                        })(e, u, r)
                      : u();
                };
              p ||
                (c
                  ? t()
                  : ((g.current = 1),
                    (e.className += ` ${f}`),
                    e.addEventListener("animationend", t)));
            }, [p]),
            o.createElement(o.Fragment, null, i)
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
      let p = {
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
        m = (e) => {
          let { theme: t, type: n, ...s } = e;
          return o.createElement("svg", {
            viewBox: "0 0 24 24",
            width: "100%",
            height: "100%",
            fill:
              "colored" === t
                ? "currentColor"
                : `var(--toastify-icon-color-${n})`,
            ...s,
          });
        },
        f = {
          info: function (e) {
            return o.createElement(
              m,
              { ...e },
              o.createElement("path", {
                d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
              }),
            );
          },
          warning: function (e) {
            return o.createElement(
              m,
              { ...e },
              o.createElement("path", {
                d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
              }),
            );
          },
          success: function (e) {
            return o.createElement(
              m,
              { ...e },
              o.createElement("path", {
                d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
              }),
            );
          },
          error: function (e) {
            return o.createElement(
              m,
              { ...e },
              o.createElement("path", {
                d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
              }),
            );
          },
          spinner: function () {
            return o.createElement("div", { className: "Toastify__spinner" });
          },
        };
      function g(e) {
        return e.targetTouches && e.targetTouches.length >= 1
          ? e.targetTouches[0].clientX
          : e.clientX;
      }
      function h(e) {
        return e.targetTouches && e.targetTouches.length >= 1
          ? e.targetTouches[0].clientY
          : e.clientY;
      }
      function y(e) {
        let { closeToast: t, theme: n, ariaLabel: s = "close" } = e;
        return o.createElement(
          "button",
          {
            className: `Toastify__close-button Toastify__close-button--${n}`,
            type: "button",
            onClick: (e) => {
              e.stopPropagation(), t(e);
            },
            "aria-label": s,
          },
          o.createElement(
            "svg",
            { "aria-hidden": "true", viewBox: "0 0 14 16" },
            o.createElement("path", {
              fillRule: "evenodd",
              d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
            }),
          ),
        );
      }
      function v(e) {
        let {
            delay: t,
            isRunning: n,
            closeToast: a,
            type: r = "default",
            hide: l,
            className: c,
            style: u,
            controlledProgress: d,
            progress: p,
            rtl: m,
            isIn: f,
            theme: g,
          } = e,
          h = l || (d && 0 === p),
          y = {
            ...u,
            animationDuration: `${t}ms`,
            animationPlayState: n ? "running" : "paused",
            opacity: h ? 0 : 1,
          };
        d && (y.transform = `scaleX(${p})`);
        let v = s(
            "Toastify__progress-bar",
            d
              ? "Toastify__progress-bar--controlled"
              : "Toastify__progress-bar--animated",
            `Toastify__progress-bar-theme--${g}`,
            `Toastify__progress-bar--${r}`,
            { "Toastify__progress-bar--rtl": m },
          ),
          T = i(c) ? c({ rtl: m, type: r, defaultClassName: v }) : s(v, c);
        return o.createElement("div", {
          role: "progressbar",
          "aria-hidden": h ? "true" : "false",
          "aria-label": "notification timer",
          className: T,
          style: y,
          [d && p >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
            d && p < 1
              ? null
              : () => {
                  f && a();
                },
        });
      }
      let T = (e) => {
          let {
              isRunning: t,
              preventExitTransition: n,
              toastRef: a,
              eventHandlers: r,
            } = (function (e) {
              let [t, n] = (0, o.useState)(!1),
                [s, a] = (0, o.useState)(!1),
                r = (0, o.useRef)(null),
                l = (0, o.useRef)({
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
                c = (0, o.useRef)(e),
                {
                  autoClose: u,
                  pauseOnHover: d,
                  closeToast: p,
                  onClick: m,
                  closeOnClick: f,
                } = e;
              function y(t) {
                if (e.draggable) {
                  "touchstart" === t.nativeEvent.type &&
                    t.nativeEvent.preventDefault(),
                    (l.didMove = !1),
                    document.addEventListener("mousemove", C),
                    document.addEventListener("mouseup", b),
                    document.addEventListener("touchmove", C),
                    document.addEventListener("touchend", b);
                  let n = r.current;
                  (l.canCloseOnClick = !0),
                    (l.canDrag = !0),
                    (l.boundingRect = n.getBoundingClientRect()),
                    (n.style.transition = ""),
                    (l.x = g(t.nativeEvent)),
                    (l.y = h(t.nativeEvent)),
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
              function v(t) {
                if (l.boundingRect) {
                  let { top: n, bottom: o, left: s, right: a } = l.boundingRect;
                  "touchend" !== t.nativeEvent.type &&
                  e.pauseOnHover &&
                  l.x >= s &&
                  l.x <= a &&
                  l.y >= n &&
                  l.y <= o
                    ? E()
                    : T();
                }
              }
              function T() {
                n(!0);
              }
              function E() {
                n(!1);
              }
              function C(n) {
                let o = r.current;
                l.canDrag &&
                  o &&
                  ((l.didMove = !0),
                  t && E(),
                  (l.x = g(n)),
                  (l.y = h(n)),
                  (l.delta =
                    "x" === e.draggableDirection
                      ? l.x - l.start
                      : l.y - l.start),
                  l.start !== l.x && (l.canCloseOnClick = !1),
                  (o.style.transform = `translate${e.draggableDirection}(${l.delta}px)`),
                  (o.style.opacity =
                    "" + (1 - Math.abs(l.delta / l.removalDistance))));
              }
              function b() {
                document.removeEventListener("mousemove", C),
                  document.removeEventListener("mouseup", b),
                  document.removeEventListener("touchmove", C),
                  document.removeEventListener("touchend", b);
                let t = r.current;
                if (l.canDrag && l.didMove && t) {
                  if (((l.canDrag = !1), Math.abs(l.delta) > l.removalDistance))
                    return a(!0), void e.closeToast();
                  (t.style.transition = "transform 0.2s, opacity 0.2s"),
                    (t.style.transform = `translate${e.draggableDirection}(0)`),
                    (t.style.opacity = "1");
                }
              }
              (0, o.useEffect)(() => {
                c.current = e;
              }),
                (0, o.useEffect)(
                  () => (
                    r.current &&
                      r.current.addEventListener("d", T, { once: !0 }),
                    i(e.onOpen) &&
                      e.onOpen(
                        (0, o.isValidElement)(e.children) && e.children.props,
                      ),
                    () => {
                      let e = c.current;
                      i(e.onClose) &&
                        e.onClose(
                          (0, o.isValidElement)(e.children) && e.children.props,
                        );
                    }
                  ),
                  [],
                ),
                (0, o.useEffect)(
                  () => (
                    e.pauseOnFocusLoss &&
                      (document.hasFocus() || E(),
                      window.addEventListener("focus", T),
                      window.addEventListener("blur", E)),
                    () => {
                      e.pauseOnFocusLoss &&
                        (window.removeEventListener("focus", T),
                        window.removeEventListener("blur", E));
                    }
                  ),
                  [e.pauseOnFocusLoss],
                );
              let I = {
                onMouseDown: y,
                onTouchStart: y,
                onMouseUp: v,
                onTouchEnd: v,
              };
              return (
                u && d && ((I.onMouseEnter = E), (I.onMouseLeave = T)),
                f &&
                  (I.onClick = (e) => {
                    m && m(e), l.canCloseOnClick && p();
                  }),
                {
                  playToast: T,
                  pauseToast: E,
                  isRunning: t,
                  preventExitTransition: s,
                  toastRef: r,
                  eventHandlers: I,
                }
              );
            })(e),
            {
              closeButton: l,
              children: c,
              autoClose: u,
              onClick: d,
              type: p,
              hideProgressBar: m,
              closeToast: f,
              transition: T,
              position: E,
              className: C,
              style: b,
              bodyClassName: I,
              bodyStyle: _,
              progressClassName: L,
              progressStyle: O,
              updateId: N,
              role: R,
              progress: x,
              rtl: w,
              toastId: M,
              deleteToast: $,
              isIn: k,
              isLoading: P,
              iconOut: A,
              closeOnClick: B,
              theme: D,
            } = e,
            z = s(
              "Toastify__toast",
              `Toastify__toast-theme--${D}`,
              `Toastify__toast--${p}`,
              { "Toastify__toast--rtl": w },
              { "Toastify__toast--close-on-click": B },
            ),
            F = i(C)
              ? C({ rtl: w, position: E, type: p, defaultClassName: z })
              : s(z, C),
            S = !!x || !u,
            H = { closeToast: f, type: p, theme: D },
            q = null;
          return (
            !1 === l ||
              (q = i(l)
                ? l(H)
                : (0, o.isValidElement)(l)
                  ? (0, o.cloneElement)(l, H)
                  : y(H)),
            o.createElement(
              T,
              {
                isIn: k,
                done: $,
                position: E,
                preventExitTransition: n,
                nodeRef: a,
              },
              o.createElement(
                "div",
                { id: M, onClick: d, className: F, ...r, style: b, ref: a },
                o.createElement(
                  "div",
                  {
                    ...(k && { role: R }),
                    className: i(I)
                      ? I({ type: p })
                      : s("Toastify__toast-body", I),
                    style: _,
                  },
                  null != A &&
                    o.createElement(
                      "div",
                      {
                        className: s("Toastify__toast-icon", {
                          "Toastify--animate-icon Toastify__zoom-enter": !P,
                        }),
                      },
                      A,
                    ),
                  o.createElement("div", null, c),
                ),
                q,
                o.createElement(v, {
                  ...(N && !S ? { key: `pb-${N}` } : {}),
                  rtl: w,
                  theme: D,
                  delay: u,
                  isRunning: t,
                  isIn: k,
                  closeToast: f,
                  hide: m,
                  type: p,
                  style: O,
                  className: L,
                  controlledProgress: S,
                  progress: x || 0,
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
        C = u(E("bounce", !0)),
        b =
          (u(E("slide", !0)),
          u(E("zoom")),
          u(E("flip")),
          (0, o.forwardRef)((e, t) => {
            let {
                getToastToRender: n,
                containerRef: u,
                isToastActive: m,
              } = (function (e) {
                let [, t] = (0, o.useReducer)((e) => e + 1, 0),
                  [n, s] = (0, o.useState)([]),
                  u = (0, o.useRef)(null),
                  m = (0, o.useRef)(new Map()).current,
                  g = (e) => -1 !== n.indexOf(e),
                  h = (0, o.useRef)({
                    toastKey: 1,
                    displayedToast: 0,
                    count: 0,
                    queue: [],
                    props: e,
                    containerId: null,
                    isToastActive: g,
                    getToast: (e) => m.get(e),
                  }).current;
                function y(e) {
                  let { containerId: t } = e,
                    { limit: n } = h.props;
                  !n ||
                    (t && h.containerId !== t) ||
                    ((h.count -= h.queue.length), (h.queue = []));
                }
                function v(e) {
                  s((t) => (null == e ? [] : t.filter((t) => t !== e)));
                }
                function T() {
                  let {
                    toastContent: e,
                    toastProps: t,
                    staleId: n,
                  } = h.queue.shift();
                  C(e, t, n);
                }
                function E(e, n) {
                  var s, g;
                  let { delay: y, staleId: E, ...b } = n;
                  if (
                    !c(e) ||
                    !u.current ||
                    (h.props.enableMultiContainer &&
                      b.containerId !== h.props.containerId) ||
                    (m.has(b.toastId) && null == b.updateId)
                  )
                    return;
                  let { toastId: I, updateId: _, data: L } = b,
                    { props: O } = h,
                    N = () => v(I),
                    R = null == _;
                  R && h.count++;
                  let x = {
                    ...O,
                    style: O.toastStyle,
                    key: h.toastKey++,
                    ...Object.fromEntries(
                      Object.entries(b).filter((e) => {
                        let [t, n] = e;
                        return null != n;
                      }),
                    ),
                    toastId: I,
                    updateId: _,
                    data: L,
                    closeToast: N,
                    isIn: !1,
                    className: l(b.className || O.toastClassName),
                    bodyClassName: l(b.bodyClassName || O.bodyClassName),
                    progressClassName: l(
                      b.progressClassName || O.progressClassName,
                    ),
                    autoClose:
                      !b.isLoading &&
                      ((s = b.autoClose),
                      (g = O.autoClose),
                      !1 === s || (a(s) && s > 0) ? s : g),
                    deleteToast() {
                      let e = d(m.get(I), "removed");
                      m.delete(I), p.emit(4, e);
                      let n = h.queue.length;
                      if (
                        ((h.count =
                          null == I ? h.count - h.displayedToast : h.count - 1),
                        h.count < 0 && (h.count = 0),
                        n > 0)
                      ) {
                        let e = null == I ? h.props.limit : 1;
                        if (1 === n || 1 === e) h.displayedToast++, T();
                        else {
                          let t = e > n ? n : e;
                          h.displayedToast = t;
                          for (let e = 0; e < t; e++) T();
                        }
                      } else t();
                    },
                  };
                  (x.iconOut = (function (e) {
                    let { theme: t, type: n, isLoading: s, icon: l } = e,
                      c = null,
                      u = { theme: t, type: n };
                    return (
                      !1 === l ||
                        (i(l)
                          ? (c = l(u))
                          : (0, o.isValidElement)(l)
                            ? (c = (0, o.cloneElement)(l, u))
                            : r(l) || a(l)
                              ? (c = l)
                              : s
                                ? (c = f.spinner())
                                : n in f && (c = f[n](u))),
                      c
                    );
                  })(x)),
                    i(b.onOpen) && (x.onOpen = b.onOpen),
                    i(b.onClose) && (x.onClose = b.onClose),
                    (x.closeButton = O.closeButton),
                    !1 === b.closeButton || c(b.closeButton)
                      ? (x.closeButton = b.closeButton)
                      : !0 === b.closeButton &&
                        (x.closeButton = !c(O.closeButton) || O.closeButton);
                  let w = e;
                  (0, o.isValidElement)(e) && !r(e.type)
                    ? (w = (0, o.cloneElement)(e, {
                        closeToast: N,
                        toastProps: x,
                        data: L,
                      }))
                    : i(e) &&
                      (w = e({ closeToast: N, toastProps: x, data: L })),
                    O.limit && O.limit > 0 && h.count > O.limit && R
                      ? h.queue.push({
                          toastContent: w,
                          toastProps: x,
                          staleId: E,
                        })
                      : a(y)
                        ? setTimeout(() => {
                            C(w, x, E);
                          }, y)
                        : C(w, x, E);
                }
                function C(e, t, n) {
                  let { toastId: o } = t;
                  n && m.delete(n);
                  let a = { content: e, props: t };
                  m.set(o, a),
                    s((e) => [...e, o].filter((e) => e !== n)),
                    p.emit(
                      4,
                      d(a, null == a.props.updateId ? "added" : "updated"),
                    );
                }
                return (
                  (0, o.useEffect)(
                    () => (
                      (h.containerId = e.containerId),
                      p
                        .cancelEmit(3)
                        .on(0, E)
                        .on(1, (e) => u.current && v(e))
                        .on(5, y)
                        .emit(2, h),
                      () => {
                        m.clear(), p.emit(3, h);
                      }
                    ),
                    [],
                  ),
                  (0, o.useEffect)(() => {
                    (h.props = e),
                      (h.isToastActive = g),
                      (h.displayedToast = n.length);
                  }),
                  {
                    getToastToRender: function (t) {
                      let n = new Map(),
                        o = Array.from(m.values());
                      return (
                        e.newestOnTop && o.reverse(),
                        o.forEach((e) => {
                          let { position: t } = e.props;
                          n.has(t) || n.set(t, []), n.get(t).push(e);
                        }),
                        Array.from(n, (e) => t(e[0], e[1]))
                      );
                    },
                    containerRef: u,
                    isToastActive: g,
                  }
                );
              })(e),
              { className: g, style: h, rtl: y, containerId: v } = e;
            return (
              (0, o.useEffect)(() => {
                t && (t.current = u.current);
              }, []),
              o.createElement(
                "div",
                { ref: u, className: "Toastify", id: v },
                n((e, t) => {
                  let n = t.length ? { ...h } : { ...h, pointerEvents: "none" };
                  return o.createElement(
                    "div",
                    {
                      className: (function (e) {
                        let t = s(
                          "Toastify__toast-container",
                          `Toastify__toast-container--${e}`,
                          { "Toastify__toast-container--rtl": y },
                        );
                        return i(g)
                          ? g({ position: e, rtl: y, defaultClassName: t })
                          : s(t, l(g));
                      })(e),
                      style: n,
                      key: `container-${e}`,
                    },
                    t.map((e, n) => {
                      let { content: s, props: a } = e;
                      return o.createElement(
                        T,
                        {
                          ...a,
                          isIn: m(a.toastId),
                          style: {
                            ...a.style,
                            "--nth": n + 1,
                            "--len": t.length,
                          },
                          key: `toast-${a.key}`,
                        },
                        s,
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
          transition: C,
          autoClose: 5e3,
          closeButton: y,
          pauseOnHover: !0,
          pauseOnFocusLoss: !0,
          closeOnClick: !0,
          draggable: !0,
          draggablePercent: 80,
          draggableDirection: "x",
          role: "alert",
          theme: "light",
        });
      let I,
        _ = new Map(),
        L = [],
        O = 1;
      function N(e, t) {
        return (
          _.size > 0 ? p.emit(0, e, t) : L.push({ content: e, options: t }),
          t.toastId
        );
      }
      function R(e, t) {
        return {
          ...t,
          type: (t && t.type) || e,
          toastId: t && (r(t.toastId) || a(t.toastId)) ? t.toastId : "" + O++,
        };
      }
      function x(e) {
        return (t, n) => N(t, R(e, n));
      }
      function w(e, t) {
        return N(e, R("default", t));
      }
      (w.loading = (e, t) =>
        N(
          e,
          R("default", {
            isLoading: !0,
            autoClose: !1,
            closeOnClick: !1,
            closeButton: !1,
            draggable: !1,
            ...t,
          }),
        )),
        (w.promise = function (e, t, n) {
          let o,
            { pending: s, error: a, success: l } = t;
          s &&
            (o = r(s) ? w.loading(s, n) : w.loading(s.render, { ...n, ...s }));
          let c = {
              isLoading: null,
              autoClose: null,
              closeOnClick: null,
              closeButton: null,
              draggable: null,
            },
            u = (e, t, s) => {
              if (null == t) return void w.dismiss(o);
              let a = { type: e, ...c, ...n, data: s },
                i = r(t) ? { render: t } : t;
              return (
                o ? w.update(o, { ...a, ...i }) : w(i.render, { ...a, ...i }), s
              );
            },
            d = i(e) ? e() : e;
          return (
            d.then((e) => u("success", l, e)).catch((e) => u("error", a, e)), d
          );
        }),
        (w.success = x("success")),
        (w.info = x("info")),
        (w.error = x("error")),
        (w.warning = x("warning")),
        (w.warn = w.warning),
        (w.dark = (e, t) => N(e, R("default", { theme: "dark", ...t }))),
        (w.dismiss = (e) => {
          _.size > 0
            ? p.emit(1, e)
            : (L = L.filter((t) => null != e && t.options.toastId !== e));
        }),
        (w.clearWaitingQueue = function (e) {
          return void 0 === e && (e = {}), p.emit(5, e);
        }),
        (w.isActive = (e) => {
          let t = !1;
          return (
            _.forEach((n) => {
              n.isToastActive && n.isToastActive(e) && (t = !0);
            }),
            t
          );
        }),
        (w.update = function (e, t) {
          void 0 === t && (t = {}),
            setTimeout(() => {
              let n = (function (e, t) {
                let { containerId: n } = t,
                  o = _.get(n || I);
                return o && o.getToast(e);
              })(e, t);
              if (n) {
                let { props: o, content: s } = n,
                  a = {
                    delay: 100,
                    ...o,
                    ...t,
                    toastId: t.toastId || e,
                    updateId: "" + O++,
                  };
                a.toastId !== e && (a.staleId = e);
                let r = a.render || s;
                delete a.render, N(r, a);
              }
            }, 0);
        }),
        (w.done = (e) => {
          w.update(e, { progress: 1 });
        }),
        (w.onChange = (e) => (
          p.on(4, e),
          () => {
            p.off(4, e);
          }
        )),
        (w.POSITION = {
          TOP_LEFT: "top-left",
          TOP_RIGHT: "top-right",
          TOP_CENTER: "top-center",
          BOTTOM_LEFT: "bottom-left",
          BOTTOM_RIGHT: "bottom-right",
          BOTTOM_CENTER: "bottom-center",
        }),
        (w.TYPE = {
          INFO: "info",
          SUCCESS: "success",
          WARNING: "warning",
          ERROR: "error",
          DEFAULT: "default",
        }),
        p
          .on(2, (e) => {
            (I = e.containerId || e),
              _.set(I, e),
              L.forEach((e) => {
                p.emit(0, e.content, e.options);
              }),
              (L = []);
          })
          .on(3, (e) => {
            _.delete(e.containerId || e),
              0 === _.size && p.off(0).off(1).off(5);
          });
    },
  });
