(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [199],
  {
    9234: function () {},
    4033: function (e, t, n) {
      e.exports = n(94);
    },
    9485: function (e, t, n) {
      "use strict";
      let o;
      function r(e) {
        return (r =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function i(e, t, n) {
        var o;
        return (
          (o = (function (e, t) {
            if ("object" !== r(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var o = n.call(e, t || "default");
              if ("object" !== r(o)) return o;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
          })(t, "string")),
          (t = "symbol" === r(o) ? o : String(o)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      n.d(t, {
        Z: function () {
          return eR;
        },
      });
      var s,
        a = n(2265);
      let l = /^[a-z0-9]+(-[a-z0-9]+)*$/,
        u = (e, t, n, o = "") => {
          let r = e.split(":");
          if ("@" === e.slice(0, 1)) {
            if (r.length < 2 || r.length > 3) return null;
            o = r.shift().slice(1);
          }
          if (r.length > 3 || !r.length) return null;
          if (r.length > 1) {
            let e = r.pop(),
              n = r.pop(),
              i = { provider: r.length > 0 ? r[0] : o, prefix: n, name: e };
            return t && !d(i) ? null : i;
          }
          let i = r[0],
            s = i.split("-");
          if (s.length > 1) {
            let e = { provider: o, prefix: s.shift(), name: s.join("-") };
            return t && !d(e) ? null : e;
          }
          if (n && "" === o) {
            let e = { provider: o, prefix: "", name: i };
            return t && !d(e, n) ? null : e;
          }
          return null;
        },
        d = (e, t) =>
          !!e &&
          !!(
            ("" === e.provider || e.provider.match(l)) &&
            ((t && "" === e.prefix) || e.prefix.match(l)) &&
            e.name.match(l)
          ),
        c = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
        h = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
        p = Object.freeze({ ...c, ...h }),
        m = Object.freeze({ ...p, body: "", hidden: !1 });
      function f(e, t) {
        let n = (function (e, t) {
          let n = {};
          !e.hFlip != !t.hFlip && (n.hFlip = !0),
            !e.vFlip != !t.vFlip && (n.vFlip = !0);
          let o = ((e.rotate || 0) + (t.rotate || 0)) % 4;
          return o && (n.rotate = o), n;
        })(e, t);
        for (let o in m)
          o in h
            ? o in e && !(o in n) && (n[o] = h[o])
            : o in t
              ? (n[o] = t[o])
              : o in e && (n[o] = e[o]);
        return n;
      }
      function g(e, t) {
        let n = [];
        if ("object" != typeof e || "object" != typeof e.icons) return n;
        e.not_found instanceof Array &&
          e.not_found.forEach((e) => {
            t(e, null), n.push(e);
          });
        let o = (function (e, t) {
          let n = e.icons,
            o = e.aliases || Object.create(null),
            r = Object.create(null);
          return (
            Object.keys(n)
              .concat(Object.keys(o))
              .forEach(function e(t) {
                if (n[t]) return (r[t] = []);
                if (!(t in r)) {
                  r[t] = null;
                  let n = o[t] && o[t].parent,
                    i = n && e(n);
                  i && (r[t] = [n].concat(i));
                }
                return r[t];
              }),
            r
          );
        })(e);
        for (let r in o) {
          let i = o[r];
          i &&
            (t(
              r,
              (function (e, t, n) {
                let o = e.icons,
                  r = e.aliases || Object.create(null),
                  i = {};
                function s(e) {
                  i = f(o[e] || r[e], i);
                }
                return s(t), n.forEach(s), f(e, i);
              })(e, r, i),
            ),
            n.push(r));
        }
        return n;
      }
      let v = { provider: "", aliases: {}, not_found: {}, ...c };
      function y(e, t) {
        for (let n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
        return !0;
      }
      function E(e) {
        if (
          "object" != typeof e ||
          null === e ||
          "string" != typeof e.prefix ||
          !e.icons ||
          "object" != typeof e.icons ||
          !y(e, v)
        )
          return null;
        let t = e.icons;
        for (let e in t) {
          let n = t[e];
          if (!e.match(l) || "string" != typeof n.body || !y(n, m)) return null;
        }
        let n = e.aliases || Object.create(null);
        for (let e in n) {
          let o = n[e],
            r = o.parent;
          if (
            !e.match(l) ||
            "string" != typeof r ||
            (!t[r] && !n[r]) ||
            !y(o, m)
          )
            return null;
        }
        return e;
      }
      let b = Object.create(null);
      function T(e, t) {
        let n = b[e] || (b[e] = Object.create(null));
        return (
          n[t] ||
          (n[t] = {
            provider: e,
            prefix: t,
            icons: Object.create(null),
            missing: new Set(),
          })
        );
      }
      function w(e, t) {
        return E(t)
          ? g(t, (t, n) => {
              n ? (e.icons[t] = n) : e.missing.add(t);
            })
          : [];
      }
      let C = !1;
      function L(e) {
        return "boolean" == typeof e && (C = e), C;
      }
      let _ = Object.freeze({ width: null, height: null }),
        O = Object.freeze({ ..._, ...h }),
        M = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
        A = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
      function k(e, t, n) {
        if (1 === t) return e;
        if (((n = n || 100), "number" == typeof e))
          return Math.ceil(e * t * n) / n;
        if ("string" != typeof e) return e;
        let o = e.split(M);
        if (null === o || !o.length) return e;
        let r = [],
          i = o.shift(),
          s = A.test(i);
        for (;;) {
          if (s) {
            let e = parseFloat(i);
            isNaN(e) ? r.push(i) : r.push(Math.ceil(e * t * n) / n);
          } else r.push(i);
          if (void 0 === (i = o.shift())) return r.join("");
          s = !s;
        }
      }
      let S = (e) => "unset" === e || "undefined" === e || "none" === e,
        I = /\sid="(\S+)"/g,
        P =
          "IconifyId" +
          Date.now().toString(16) +
          ((16777216 * Math.random()) | 0).toString(16),
        x = 0,
        D = Object.create(null);
      function N(e) {
        return D[e] || D[""];
      }
      function R(e) {
        let t;
        if ("string" == typeof e.resources) t = [e.resources];
        else if (!((t = e.resources) instanceof Array) || !t.length)
          return null;
        let n = {
          resources: t,
          path: e.path || "/",
          maxURL: e.maxURL || 500,
          rotate: e.rotate || 750,
          timeout: e.timeout || 5e3,
          random: !0 === e.random,
          index: e.index || 0,
          dataAfterTimeout: !1 !== e.dataAfterTimeout,
        };
        return n;
      }
      let U = Object.create(null),
        F = ["https://api.simplesvg.com", "https://api.unisvg.com"],
        V = [];
      for (; F.length > 0; )
        1 === F.length
          ? V.push(F.shift())
          : Math.random() > 0.5
            ? V.push(F.shift())
            : V.push(F.pop());
      U[""] = R({ resources: ["https://api.iconify.design"].concat(V) });
      let j = (() => {
        let e;
        try {
          if (((e = fetch), "function" == typeof e)) return e;
        } catch (e) {}
      })();
      function B(e, t) {
        e.forEach((e) => {
          let n = e.loaderCallbacks;
          n && (e.loaderCallbacks = n.filter((e) => e.id !== t));
        });
      }
      let $ = 0;
      var z = {
        resources: [],
        index: 0,
        timeout: 2e3,
        rotate: 750,
        random: !1,
        dataAfterTimeout: !1,
      };
      function W(e) {
        let t = { ...z, ...e },
          n = [];
        function o() {
          n = n.filter((e) => "pending" === e().status);
        }
        return {
          query: function (e, r, i) {
            let s = (function (e, t, n, o) {
              let r, i;
              let s = e.resources.length,
                a = e.random ? Math.floor(Math.random() * s) : e.index;
              if (e.random) {
                let t = e.resources.slice(0);
                for (r = []; t.length > 1; ) {
                  let e = Math.floor(Math.random() * t.length);
                  r.push(t[e]), (t = t.slice(0, e).concat(t.slice(e + 1)));
                }
                r = r.concat(t);
              } else r = e.resources.slice(a).concat(e.resources.slice(0, a));
              let l = Date.now(),
                u = "pending",
                d = 0,
                c = null,
                h = [],
                p = [];
              function m() {
                c && (clearTimeout(c), (c = null));
              }
              function f() {
                "pending" === u && (u = "aborted"),
                  m(),
                  h.forEach((e) => {
                    "pending" === e.status && (e.status = "aborted");
                  }),
                  (h = []);
              }
              function g(e, t) {
                t && (p = []), "function" == typeof e && p.push(e);
              }
              function v() {
                (u = "failed"),
                  p.forEach((e) => {
                    e(void 0, i);
                  });
              }
              function y() {
                h.forEach((e) => {
                  "pending" === e.status && (e.status = "aborted");
                }),
                  (h = []);
              }
              return (
                "function" == typeof o && p.push(o),
                setTimeout(function o() {
                  if ("pending" !== u) return;
                  m();
                  let s = r.shift();
                  if (void 0 === s) {
                    if (h.length) {
                      c = setTimeout(() => {
                        m(), "pending" === u && (y(), v());
                      }, e.timeout);
                      return;
                    }
                    v();
                    return;
                  }
                  let a = {
                    status: "pending",
                    resource: s,
                    callback: (t, n) => {
                      !(function (t, n, s) {
                        let a = "success" !== n;
                        switch (((h = h.filter((e) => e !== t)), u)) {
                          case "pending":
                            break;
                          case "failed":
                            if (a || !e.dataAfterTimeout) return;
                            break;
                          default:
                            return;
                        }
                        if ("abort" === n) {
                          (i = s), v();
                          return;
                        }
                        if (a) {
                          (i = s), h.length || (r.length ? o() : v());
                          return;
                        }
                        if ((m(), y(), !e.random)) {
                          let n = e.resources.indexOf(t.resource);
                          -1 !== n && n !== e.index && (e.index = n);
                        }
                        (u = "completed"),
                          p.forEach((e) => {
                            e(s);
                          });
                      })(a, t, n);
                    },
                  };
                  h.push(a),
                    d++,
                    (c = setTimeout(o, e.rotate)),
                    n(s, t, a.callback);
                }),
                function () {
                  return {
                    startTime: l,
                    payload: t,
                    status: u,
                    queriesSent: d,
                    queriesPending: h.length,
                    subscribe: g,
                    abort: f,
                  };
                }
              );
            })(t, e, r, (e, t) => {
              o(), i && i(e, t);
            });
            return n.push(s), s;
          },
          find: function (e) {
            return n.find((t) => e(t)) || null;
          },
          setIndex: (e) => {
            t.index = e;
          },
          getIndex: () => t.index,
          cleanup: o,
        };
      }
      let H = Object.create(null),
        J = "iconify2",
        q = "iconify",
        G = q + "-count",
        Q = q + "-version";
      function K(e, t) {
        try {
          return e.getItem(t);
        } catch (e) {}
      }
      function X(e, t, n) {
        try {
          return e.setItem(t, n), !0;
        } catch (e) {}
      }
      function Y(e, t) {
        try {
          e.removeItem(t);
        } catch (e) {}
      }
      function Z(e, t) {
        return X(e, G, t.toString());
      }
      function ee(e) {
        return parseInt(K(e, G)) || 0;
      }
      let et = { local: !0, session: !0 },
        en = { local: new Set(), session: new Set() },
        eo = !1,
        er = "undefined" == typeof window ? {} : window;
      function ei(e) {
        let t = e + "Storage";
        try {
          if (er && er[t] && "number" == typeof er[t].length) return er[t];
        } catch (e) {}
        et[e] = !1;
      }
      function es(e, t) {
        let n = ei(e);
        if (!n) return;
        let o = K(n, Q);
        if (o !== J) {
          if (o) {
            let e = ee(n);
            for (let t = 0; t < e; t++) Y(n, q + t.toString());
          }
          X(n, Q, J), Z(n, 0);
          return;
        }
        let r = Math.floor(Date.now() / 36e5) - 168,
          i = (e) => {
            let o = q + e.toString(),
              i = K(n, o);
            if ("string" == typeof i) {
              try {
                let n = JSON.parse(i);
                if (
                  "object" == typeof n &&
                  "number" == typeof n.cached &&
                  n.cached > r &&
                  "string" == typeof n.provider &&
                  "object" == typeof n.data &&
                  "string" == typeof n.data.prefix &&
                  t(n, e)
                )
                  return !0;
              } catch (e) {}
              Y(n, o);
            }
          },
          s = ee(n);
        for (let t = s - 1; t >= 0; t--)
          i(t) || (t === s - 1 ? Z(n, --s) : en[e].add(t));
      }
      function ea() {
        if (!eo)
          for (let e in ((eo = !0), et))
            es(e, (e) => {
              let t = e.data,
                n = e.provider,
                o = t.prefix,
                r = T(n, o);
              if (!w(r, t).length) return !1;
              let i = t.lastModified || -1;
              return (
                (r.lastModifiedCached = r.lastModifiedCached
                  ? Math.min(r.lastModifiedCached, i)
                  : i),
                !0
              );
            });
      }
      function el() {}
      let eu = (e, t) => {
          let n, o;
          let r = (function (e, t = !0, n = !1) {
              let o = [];
              return (
                e.forEach((e) => {
                  let r = "string" == typeof e ? u(e, t, n) : e;
                  r && o.push(r);
                }),
                o
              );
            })(e, !0, L()),
            i = (function (e) {
              let t = { loaded: [], missing: [], pending: [] },
                n = Object.create(null);
              e.sort((e, t) =>
                e.provider !== t.provider
                  ? e.provider.localeCompare(t.provider)
                  : e.prefix !== t.prefix
                    ? e.prefix.localeCompare(t.prefix)
                    : e.name.localeCompare(t.name),
              );
              let o = { provider: "", prefix: "", name: "" };
              return (
                e.forEach((e) => {
                  if (
                    o.name === e.name &&
                    o.prefix === e.prefix &&
                    o.provider === e.provider
                  )
                    return;
                  o = e;
                  let r = e.provider,
                    i = e.prefix,
                    s = e.name,
                    a = n[r] || (n[r] = Object.create(null)),
                    l = a[i] || (a[i] = T(r, i));
                  (s in l.icons
                    ? t.loaded
                    : "" === i || l.missing.has(s)
                      ? t.missing
                      : t.pending
                  ).push({ provider: r, prefix: i, name: s });
                }),
                t
              );
            })(r);
          if (!i.pending.length) {
            let e = !0;
            return (
              t &&
                setTimeout(() => {
                  e && t(i.loaded, i.missing, i.pending, el);
                }),
              () => {
                e = !1;
              }
            );
          }
          let s = Object.create(null),
            a = [];
          return (
            i.pending.forEach((e) => {
              let { provider: t, prefix: r } = e;
              if (r === o && t === n) return;
              (n = t), (o = r), a.push(T(t, r));
              let i = s[t] || (s[t] = Object.create(null));
              i[r] || (i[r] = []);
            }),
            i.pending.forEach((e) => {
              let { provider: t, prefix: n, name: o } = e,
                r = T(t, n),
                i = r.pendingIcons || (r.pendingIcons = new Set());
              i.has(o) || (i.add(o), s[t][n].push(o));
            }),
            a.forEach((e) => {
              let { provider: t, prefix: n } = e;
              if (s[t][n].length) {
                var o;
                (o = s[t][n]),
                  e.iconsToLoad
                    ? (e.iconsToLoad = e.iconsToLoad.concat(o).sort())
                    : (e.iconsToLoad = o),
                  e.iconsQueueFlag ||
                    ((e.iconsQueueFlag = !0),
                    setTimeout(() => {
                      let t;
                      e.iconsQueueFlag = !1;
                      let { provider: n, prefix: o } = e,
                        r = e.iconsToLoad;
                      if ((delete e.iconsToLoad, !r || !(t = N(n)))) return;
                      let i = t.prepare(n, o, r);
                      i.forEach((t) => {
                        !(function (e, t, n) {
                          let o, r;
                          if ("string" == typeof e) {
                            let t = N(e);
                            if (!t) return n(void 0, 424);
                            r = t.send;
                            let i = (function (e) {
                              if (!H[e]) {
                                let t = U[e];
                                if (!t) return;
                                let n = W(t);
                                H[e] = { config: t, redundancy: n };
                              }
                              return H[e];
                            })(e);
                            i && (o = i.redundancy);
                          } else {
                            let t = R(e);
                            if (t) {
                              o = W(t);
                              let n = e.resources ? e.resources[0] : "",
                                i = N(n);
                              i && (r = i.send);
                            }
                          }
                          o && r ? o.query(t, r, n)().abort : n(void 0, 424);
                        })(n, t, (n) => {
                          if ("object" != typeof n)
                            t.icons.forEach((t) => {
                              e.missing.add(t);
                            });
                          else
                            try {
                              let t = w(e, n);
                              if (!t.length) return;
                              let o = e.pendingIcons;
                              o &&
                                t.forEach((e) => {
                                  o.delete(e);
                                }),
                                (function (e, t) {
                                  function n(n) {
                                    let o, r;
                                    if (!et[n] || !(o = ei(n))) return;
                                    let i = en[n];
                                    if (i.size)
                                      i.delete((r = Array.from(i).shift()));
                                    else if (((r = ee(o)), !Z(o, r + 1)))
                                      return;
                                    let s = {
                                      cached: Math.floor(Date.now() / 36e5),
                                      provider: e.provider,
                                      data: t,
                                    };
                                    return X(
                                      o,
                                      q + r.toString(),
                                      JSON.stringify(s),
                                    );
                                  }
                                  eo || ea(),
                                    (!t.lastModified ||
                                      (function (e, t) {
                                        let n = e.lastModifiedCached;
                                        if (n && n >= t) return n === t;
                                        if (((e.lastModifiedCached = t), n))
                                          for (let n in et)
                                            es(n, (n) => {
                                              let o = n.data;
                                              return (
                                                n.provider !== e.provider ||
                                                o.prefix !== e.prefix ||
                                                o.lastModified === t
                                              );
                                            });
                                        return !0;
                                      })(e, t.lastModified)) &&
                                      Object.keys(t.icons).length &&
                                      (t.not_found &&
                                        ((t = Object.assign({}, t)),
                                        delete t.not_found),
                                      n("local") || n("session"));
                                })(e, n);
                            } catch (e) {
                              console.error(e);
                            }
                          e.iconsLoaderFlag ||
                            ((e.iconsLoaderFlag = !0),
                            setTimeout(() => {
                              (e.iconsLoaderFlag = !1),
                                e.pendingCallbacksFlag ||
                                  ((e.pendingCallbacksFlag = !0),
                                  setTimeout(() => {
                                    e.pendingCallbacksFlag = !1;
                                    let t = e.loaderCallbacks
                                      ? e.loaderCallbacks.slice(0)
                                      : [];
                                    if (!t.length) return;
                                    let n = !1,
                                      o = e.provider,
                                      r = e.prefix;
                                    t.forEach((t) => {
                                      let i = t.icons,
                                        s = i.pending.length;
                                      (i.pending = i.pending.filter((t) => {
                                        if (t.prefix !== r) return !0;
                                        let s = t.name;
                                        if (e.icons[s])
                                          i.loaded.push({
                                            provider: o,
                                            prefix: r,
                                            name: s,
                                          });
                                        else {
                                          if (!e.missing.has(s))
                                            return (n = !0), !0;
                                          i.missing.push({
                                            provider: o,
                                            prefix: r,
                                            name: s,
                                          });
                                        }
                                        return !1;
                                      })),
                                        i.pending.length !== s &&
                                          (n || B([e], t.id),
                                          t.callback(
                                            i.loaded.slice(0),
                                            i.missing.slice(0),
                                            i.pending.slice(0),
                                            t.abort,
                                          ));
                                    });
                                  }));
                            }));
                        });
                      });
                    }));
              }
            }),
            t
              ? (function (e, t, n) {
                  let o = $++,
                    r = B.bind(null, n, o);
                  if (!t.pending.length) return r;
                  let i = { id: o, icons: t, callback: e, abort: r };
                  return (
                    n.forEach((e) => {
                      (e.loaderCallbacks || (e.loaderCallbacks = [])).push(i);
                    }),
                    r
                  );
                })(t, i, a)
              : el
          );
        },
        ed = /[\s,]+/,
        ec = { ...O, inline: !1 },
        eh = {
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          "aria-hidden": !0,
          role: "img",
        },
        ep = { display: "inline-block" },
        em = { backgroundColor: "currentColor" },
        ef = { backgroundColor: "transparent" },
        eg = { Image: "var(--svg)", Repeat: "no-repeat", Size: "100% 100%" },
        ev = { WebkitMask: em, mask: em, background: ef };
      for (let e in ev) {
        let t = ev[e];
        for (let n in eg) t[e + n] = eg[n];
      }
      let ey = { ...ec, inline: !0 };
      function eE(e) {
        return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
      }
      let eb = (e, t, n, r) => {
        let i = n ? ey : ec,
          s = (function (e, t) {
            let n = { ...e };
            for (let e in t) {
              let o = t[e],
                r = typeof o;
              e in _
                ? (null === o || (o && ("string" === r || "number" === r))) &&
                  (n[e] = o)
                : r === typeof n[e] && (n[e] = "rotate" === e ? o % 4 : o);
            }
            return n;
          })(i, t),
          l = t.mode || "svg",
          u = {},
          d = t.style || {},
          c = { ...("svg" === l ? eh : {}), ref: r };
        for (let e in t) {
          let n = t[e];
          if (void 0 !== n)
            switch (e) {
              case "icon":
              case "style":
              case "children":
              case "onLoad":
              case "mode":
              case "_ref":
              case "_inline":
                break;
              case "inline":
              case "hFlip":
              case "vFlip":
                s[e] = !0 === n || "true" === n || 1 === n;
                break;
              case "flip":
                "string" == typeof n &&
                  (function (e, t) {
                    t.split(ed).forEach((t) => {
                      let n = t.trim();
                      switch (n) {
                        case "horizontal":
                          e.hFlip = !0;
                          break;
                        case "vertical":
                          e.vFlip = !0;
                      }
                    });
                  })(s, n);
                break;
              case "color":
                u.color = n;
                break;
              case "rotate":
                "string" == typeof n
                  ? (s[e] = (function (e, t = 0) {
                      let n = e.replace(/^-?[0-9.]*/, "");
                      function o(e) {
                        for (; e < 0; ) e += 4;
                        return e % 4;
                      }
                      if ("" === n) {
                        let t = parseInt(e);
                        return isNaN(t) ? 0 : o(t);
                      }
                      if (n !== e) {
                        let t = 0;
                        switch (n) {
                          case "%":
                            t = 25;
                            break;
                          case "deg":
                            t = 90;
                        }
                        if (t) {
                          let r = parseFloat(e.slice(0, e.length - n.length));
                          return isNaN(r) ? 0 : (r /= t) % 1 == 0 ? o(r) : 0;
                        }
                      }
                      return t;
                    })(n))
                  : "number" == typeof n && (s[e] = n);
                break;
              case "ariaHidden":
              case "aria-hidden":
                !0 !== n && "true" !== n && delete c["aria-hidden"];
                break;
              default:
                void 0 === i[e] && (c[e] = n);
            }
        }
        let h = (function (e, t) {
            let n, o;
            let r = { ...p, ...e },
              i = { ...O, ...t },
              s = {
                left: r.left,
                top: r.top,
                width: r.width,
                height: r.height,
              },
              a = r.body;
            [r, i].forEach((e) => {
              let t;
              let n = [],
                o = e.hFlip,
                r = e.vFlip,
                i = e.rotate;
              switch (
                (o
                  ? r
                    ? (i += 2)
                    : (n.push(
                        "translate(" +
                          (s.width + s.left).toString() +
                          " " +
                          (0 - s.top).toString() +
                          ")",
                      ),
                      n.push("scale(-1 1)"),
                      (s.top = s.left = 0))
                  : r &&
                    (n.push(
                      "translate(" +
                        (0 - s.left).toString() +
                        " " +
                        (s.height + s.top).toString() +
                        ")",
                    ),
                    n.push("scale(1 -1)"),
                    (s.top = s.left = 0)),
                i < 0 && (i -= 4 * Math.floor(i / 4)),
                (i %= 4))
              ) {
                case 1:
                  n.unshift(
                    "rotate(90 " +
                      (t = s.height / 2 + s.top).toString() +
                      " " +
                      t.toString() +
                      ")",
                  );
                  break;
                case 2:
                  n.unshift(
                    "rotate(180 " +
                      (s.width / 2 + s.left).toString() +
                      " " +
                      (s.height / 2 + s.top).toString() +
                      ")",
                  );
                  break;
                case 3:
                  n.unshift(
                    "rotate(-90 " +
                      (t = s.width / 2 + s.left).toString() +
                      " " +
                      t.toString() +
                      ")",
                  );
              }
              i % 2 == 1 &&
                (s.left !== s.top &&
                  ((t = s.left), (s.left = s.top), (s.top = t)),
                s.width !== s.height &&
                  ((t = s.width), (s.width = s.height), (s.height = t))),
                n.length &&
                  (a = '<g transform="' + n.join(" ") + '">' + a + "</g>");
            });
            let l = i.width,
              u = i.height,
              d = s.width,
              c = s.height;
            null === l
              ? (n = k((o = null === u ? "1em" : "auto" === u ? c : u), d / c))
              : ((n = "auto" === l ? d : l),
                (o = null === u ? k(n, c / d) : "auto" === u ? c : u));
            let h = {},
              m = (e, t) => {
                S(t) || (h[e] = t.toString());
              };
            return (
              m("width", n),
              m("height", o),
              (h.viewBox =
                s.left.toString() +
                " " +
                s.top.toString() +
                " " +
                d.toString() +
                " " +
                c.toString()),
              { attributes: h, body: a }
            );
          })(e, s),
          m = h.attributes;
        if ((s.inline && (u.verticalAlign = "-0.125em"), "svg" === l)) {
          var f;
          (c.style = { ...u, ...d }), Object.assign(c, m);
          let e = 0,
            n = t.id;
          return (
            "string" == typeof n && (n = n.replace(/-/g, "_")),
            (c.dangerouslySetInnerHTML = {
              __html:
                ((f = (function (e, t = P) {
                  let n;
                  let o = [];
                  for (; (n = I.exec(e)); ) o.push(n[1]);
                  if (!o.length) return e;
                  let r =
                    "suffix" +
                    ((16777216 * Math.random()) | Date.now()).toString(16);
                  return (
                    o.forEach((n) => {
                      let o =
                          "function" == typeof t ? t(n) : t + (x++).toString(),
                        i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                      e = e.replace(
                        RegExp('([#;"])(' + i + ')([")]|\\.[a-z])', "g"),
                        "$1" + o + r + "$3",
                      );
                    }),
                    (e = e.replace(RegExp(r, "g"), ""))
                  );
                })(h.body, n ? () => n + "ID" + e++ : "iconifyReact")),
                void 0 === o &&
                  (function () {
                    try {
                      o = window.trustedTypes.createPolicy("iconify", {
                        createHTML: (e) => e,
                      });
                    } catch (e) {
                      o = null;
                    }
                  })(),
                o ? o.createHTML(f) : f),
            }),
            a.createElement("svg", c)
          );
        }
        let { body: g, width: v, height: y } = e,
          E = "mask" === l || ("bg" !== l && -1 !== g.indexOf("currentColor")),
          b = (function (e, t) {
            let n =
              -1 === e.indexOf("xlink:")
                ? ""
                : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
            for (let e in t) n += " " + e + '="' + t[e] + '"';
            return (
              '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>"
            );
          })(g, { ...m, width: v + "", height: y + "" });
        return (
          (c.style = {
            ...u,
            "--svg":
              'url("data:image/svg+xml,' +
              b
                .replace(/"/g, "'")
                .replace(/%/g, "%25")
                .replace(/#/g, "%23")
                .replace(/</g, "%3C")
                .replace(/>/g, "%3E")
                .replace(/\s+/g, " ") +
              '")',
            width: eE(m.width),
            height: eE(m.height),
            ...ep,
            ...(E ? em : ef),
            ...d,
          }),
          a.createElement("span", c)
        );
      };
      if (
        (L(!0),
        (D[""] = {
          prepare: (e, t, n) => {
            let o = [],
              r = (function (e, t) {
                let n;
                let o = U[e];
                if (!o) return 0;
                if (o.maxURL) {
                  let e = 0;
                  o.resources.forEach((t) => {
                    e = Math.max(e, t.length);
                  }),
                    (n =
                      o.maxURL -
                      e -
                      o.path.length -
                      (t + ".json?icons=").length);
                } else n = 0;
                return n;
              })(e, t),
              i = "icons",
              s = { type: i, provider: e, prefix: t, icons: [] },
              a = 0;
            return (
              n.forEach((n, l) => {
                (a += n.length + 1) >= r &&
                  l > 0 &&
                  (o.push(s),
                  (s = { type: i, provider: e, prefix: t, icons: [] }),
                  (a = n.length)),
                  s.icons.push(n);
              }),
              o.push(s),
              o
            );
          },
          send: (e, t, n) => {
            if (!j) {
              n("abort", 424);
              return;
            }
            let o = (function (e) {
              if ("string" == typeof e) {
                let t = U[e];
                if (t) return t.path;
              }
              return "/";
            })(t.provider);
            switch (t.type) {
              case "icons": {
                let e = t.prefix,
                  n = t.icons,
                  r = n.join(","),
                  i = new URLSearchParams({ icons: r });
                o += e + ".json?" + i.toString();
                break;
              }
              case "custom": {
                let e = t.uri;
                o += "/" === e.slice(0, 1) ? e.slice(1) : e;
                break;
              }
              default:
                n("abort", 400);
                return;
            }
            let r = 503;
            j(e + o)
              .then((e) => {
                let t = e.status;
                if (200 !== t) {
                  setTimeout(() => {
                    n(404 === t ? "abort" : "next", t);
                  });
                  return;
                }
                return (r = 501), e.json();
              })
              .then((e) => {
                if ("object" != typeof e || null === e) {
                  setTimeout(() => {
                    404 === e ? n("abort", e) : n("next", r);
                  });
                  return;
                }
                setTimeout(() => {
                  n("success", e);
                });
              })
              .catch(() => {
                n("next", r);
              });
          },
        }),
        "undefined" != typeof document && "undefined" != typeof window)
      ) {
        ea();
        let e = window;
        if (void 0 !== e.IconifyPreload) {
          let t = e.IconifyPreload,
            n = "Invalid IconifyPreload syntax.";
          "object" == typeof t &&
            null !== t &&
            (t instanceof Array ? t : [t]).forEach((e) => {
              try {
                ("object" != typeof e ||
                  null === e ||
                  e instanceof Array ||
                  "object" != typeof e.icons ||
                  "string" != typeof e.prefix ||
                  !(function (e, t) {
                    if ("object" != typeof e) return !1;
                    if (
                      ("string" != typeof t && (t = e.provider || ""),
                      C && !t && !e.prefix)
                    ) {
                      let t = !1;
                      return (
                        E(e) &&
                          ((e.prefix = ""),
                          g(e, (e, n) => {
                            n &&
                              (function (e, t) {
                                let n = u(e, !0, C);
                                if (!n) return !1;
                                let o = T(n.provider, n.prefix);
                                return (function (e, t, n) {
                                  try {
                                    if ("string" == typeof n.body)
                                      return (e.icons[t] = { ...n }), !0;
                                  } catch (e) {}
                                  return !1;
                                })(o, n.name, t);
                              })(e, n) &&
                              (t = !0);
                          })),
                        t
                      );
                    }
                    let n = e.prefix;
                    if (!d({ provider: t, prefix: n, name: "a" })) return !1;
                    let o = T(t, n);
                    return !!w(o, e);
                  })(e)) &&
                  console.error(n);
              } catch (e) {
                console.error(n);
              }
            });
        }
        if (void 0 !== e.IconifyProviders) {
          let t = e.IconifyProviders;
          if ("object" == typeof t && null !== t)
            for (let e in t) {
              let n = "IconifyProviders[" + e + "] is invalid.";
              try {
                let o = t[e];
                if ("object" != typeof o || !o || void 0 === o.resources)
                  continue;
                !(function (e, t) {
                  let n = R(t);
                  return null !== n && ((U[e] = n), !0);
                })(e, o) && console.error(n);
              } catch (e) {
                console.error(n);
              }
            }
        }
      }
      class eT extends a.Component {
        constructor(e) {
          super(e), (this.state = { icon: null });
        }
        _abortLoading() {
          this._loading && (this._loading.abort(), (this._loading = null));
        }
        _setData(e) {
          this.state.icon !== e && this.setState({ icon: e });
        }
        _checkIcon(e) {
          let t;
          let n = this.state,
            o = this.props.icon;
          if ("object" == typeof o && null !== o && "string" == typeof o.body) {
            (this._icon = ""),
              this._abortLoading(),
              (e || null === n.icon) && this._setData({ data: o });
            return;
          }
          if ("string" != typeof o || null === (t = u(o, !1, !0))) {
            this._abortLoading(), this._setData(null);
            return;
          }
          let r = (function (e) {
            let t = "string" == typeof e ? u(e, !0, C) : e;
            if (t) {
              let e = T(t.provider, t.prefix),
                n = t.name;
              return e.icons[n] || (e.missing.has(n) ? null : void 0);
            }
          })(t);
          if (!r) {
            (this._loading && this._loading.name === o) ||
              (this._abortLoading(),
              (this._icon = ""),
              this._setData(null),
              null !== r &&
                (this._loading = {
                  name: o,
                  abort: eu([t], this._checkIcon.bind(this, !1)),
                }));
            return;
          }
          if (this._icon !== o || null === n.icon) {
            this._abortLoading(), (this._icon = o);
            let e = ["iconify"];
            "" !== t.prefix && e.push("iconify--" + t.prefix),
              "" !== t.provider && e.push("iconify--" + t.provider),
              this._setData({ data: r, classes: e }),
              this.props.onLoad && this.props.onLoad(o);
          }
        }
        componentDidMount() {
          this._checkIcon(!1);
        }
        componentDidUpdate(e) {
          e.icon !== this.props.icon && this._checkIcon(!0);
        }
        componentWillUnmount() {
          this._abortLoading();
        }
        render() {
          let e = this.props,
            t = this.state.icon;
          if (null === t)
            return e.children ? e.children : a.createElement("span", {});
          let n = e;
          return (
            t.classes &&
              (n = {
                ...e,
                className:
                  ("string" == typeof e.className ? e.className + " " : "") +
                  t.classes.join(" "),
              }),
            eb({ ...p, ...t.data }, n, e._inline, e._ref)
          );
        }
      }
      let ew = a.forwardRef(function (e, t) {
        let n = { ...e, _ref: t, _inline: !1 };
        return a.createElement(eT, n);
      });
      function eC() {
        return (eC = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n)
                  Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
              }
              return e;
            }).apply(this, arguments);
      }
      a.forwardRef(function (e, t) {
        let n = { ...e, _ref: t, _inline: !0 };
        return a.createElement(eT, n);
      });
      let eL = (e) => {
          switch (e) {
            case "stacked":
            default:
              return "rhap_stacked";
            case "stacked-reverse":
              return "rhap_stacked-reverse";
            case "horizontal":
              return "rhap_horizontal";
            case "horizontal-reverse":
              return "rhap_horizontal-reverse";
          }
        },
        e_ = (e) =>
          e instanceof MouseEvent ? e.clientX : e.touches[0].clientX,
        eO = (e) => (e > 9 ? e.toString() : `0${e}`),
        eM = (e, t, n) => {
          if (!isFinite(e)) return null;
          let o = Math.floor(e / 60),
            r = eO(o),
            i = eO(Math.floor(e % 60)),
            s = eO(Math.floor(o % 60)),
            a = Math.floor(o / 60),
            l = `${r}:${i}`,
            u = `${a}:${s}:${i}`;
          return "auto" === n
            ? t >= 3600
              ? u
              : l
            : "mm:ss" === n
              ? l
              : "hh:mm:ss" === n
                ? u
                : void 0;
        };
      function eA(e, t) {
        let n = !1;
        return (o) => {
          n || (e(o), (n = !0), setTimeout(() => (n = !1), t));
        };
      }
      class ek extends a.Component {
        constructor() {
          super(...arguments),
            i(this, "audio", void 0),
            i(this, "timeOnMouseMove", 0),
            i(this, "hasAddedAudioEventListener", !1),
            i(this, "downloadProgressAnimationTimer", void 0),
            i(this, "state", {
              isDraggingProgress: !1,
              currentTimePos: "0%",
              hasDownloadProgressAnimation: !1,
              downloadProgressArr: [],
              waitingForSeekCallback: !1,
            }),
            i(this, "getCurrentProgress", (e) => {
              let { audio: t, progressBar: n } = this.props,
                o =
                  0 !== t.src.indexOf("blob:") &&
                  void 0 === this.props.srcDuration;
              if (o && (!t.src || !isFinite(t.currentTime) || !n.current))
                return { currentTime: 0, currentTimePos: "0%" };
              let r = n.current.getBoundingClientRect(),
                i = r.width,
                s = e_(e) - r.left;
              s < 0 ? (s = 0) : s > i && (s = i);
              let a = this.getDuration(),
                l = (a * s) / i;
              return {
                currentTime: l,
                currentTimePos: `${((s / i) * 100).toFixed(2)}%`,
              };
            }),
            i(this, "handleContextMenu", (e) => {
              e.preventDefault();
            }),
            i(this, "handleMouseDownOrTouchStartProgressBar", (e) => {
              e.stopPropagation();
              let { currentTime: t, currentTimePos: n } =
                this.getCurrentProgress(e.nativeEvent);
              isFinite(t) &&
                ((this.timeOnMouseMove = t),
                this.setState({ isDraggingProgress: !0, currentTimePos: n }),
                e.nativeEvent instanceof MouseEvent
                  ? (window.addEventListener(
                      "mousemove",
                      this.handleWindowMouseOrTouchMove,
                    ),
                    window.addEventListener(
                      "mouseup",
                      this.handleWindowMouseOrTouchUp,
                    ))
                  : (window.addEventListener(
                      "touchmove",
                      this.handleWindowMouseOrTouchMove,
                    ),
                    window.addEventListener(
                      "touchend",
                      this.handleWindowMouseOrTouchUp,
                    )));
            }),
            i(this, "handleWindowMouseOrTouchMove", (e) => {
              e instanceof MouseEvent && e.preventDefault(),
                e.stopPropagation();
              let t = window.getSelection();
              t && "Range" === t.type && t.empty();
              let { isDraggingProgress: n } = this.state;
              if (n) {
                let { currentTime: t, currentTimePos: n } =
                  this.getCurrentProgress(e);
                (this.timeOnMouseMove = t),
                  this.setState({ currentTimePos: n });
              }
            }),
            i(this, "handleWindowMouseOrTouchUp", (e) => {
              e.stopPropagation();
              let t = this.timeOnMouseMove,
                {
                  audio: n,
                  onChangeCurrentTimeError: o,
                  onSeek: r,
                } = this.props;
              if (r)
                this.setState(
                  { isDraggingProgress: !1, waitingForSeekCallback: !0 },
                  () => {
                    r(n, t).then(
                      () => this.setState({ waitingForSeekCallback: !1 }),
                      (e) => {
                        throw Error(e);
                      },
                    );
                  },
                );
              else {
                let e = { isDraggingProgress: !1 };
                n.readyState !== n.HAVE_NOTHING &&
                n.readyState !== n.HAVE_METADATA &&
                isFinite(t)
                  ? (n.currentTime = t)
                  : ((e.currentTimePos = "0%"), o && o()),
                  this.setState(e);
              }
              e instanceof MouseEvent
                ? (window.removeEventListener(
                    "mousemove",
                    this.handleWindowMouseOrTouchMove,
                  ),
                  window.removeEventListener(
                    "mouseup",
                    this.handleWindowMouseOrTouchUp,
                  ))
                : (window.removeEventListener(
                    "touchmove",
                    this.handleWindowMouseOrTouchMove,
                  ),
                  window.removeEventListener(
                    "touchend",
                    this.handleWindowMouseOrTouchUp,
                  ));
            }),
            i(
              this,
              "handleAudioTimeUpdate",
              eA((e) => {
                let { isDraggingProgress: t } = this.state,
                  n = e.target;
                if (t || !0 === this.state.waitingForSeekCallback) return;
                let { currentTime: o } = n,
                  r = this.getDuration();
                this.setState({
                  currentTimePos: `${((o / r) * 100 || 0).toFixed(2)}%`,
                });
              }, this.props.progressUpdateInterval),
            ),
            i(this, "handleAudioDownloadProgressUpdate", (e) => {
              let t = e.target,
                n = this.getDuration(),
                o = [];
              for (let e = 0; e < t.buffered.length; e++) {
                let r = t.buffered.start(e),
                  i = t.buffered.end(e);
                o.push({
                  left: `${Math.round((100 / n) * r) || 0}%`,
                  width: `${Math.round((100 / n) * (i - r)) || 0}%`,
                });
              }
              clearTimeout(this.downloadProgressAnimationTimer),
                this.setState({
                  downloadProgressArr: o,
                  hasDownloadProgressAnimation: !0,
                }),
                (this.downloadProgressAnimationTimer = setTimeout(() => {
                  this.setState({ hasDownloadProgressAnimation: !1 });
                }, 200));
            });
        }
        getDuration() {
          let { audio: e, srcDuration: t } = this.props;
          return void 0 === t ? e.duration : t;
        }
        componentDidUpdate() {
          let { audio: e } = this.props;
          e &&
            !this.hasAddedAudioEventListener &&
            ((this.audio = e),
            (this.hasAddedAudioEventListener = !0),
            e.addEventListener("timeupdate", this.handleAudioTimeUpdate),
            e.addEventListener(
              "progress",
              this.handleAudioDownloadProgressUpdate,
            ));
        }
        componentWillUnmount() {
          this.audio &&
            this.hasAddedAudioEventListener &&
            (this.audio.removeEventListener(
              "timeupdate",
              this.handleAudioTimeUpdate,
            ),
            this.audio.removeEventListener(
              "progress",
              this.handleAudioDownloadProgressUpdate,
            )),
            clearTimeout(this.downloadProgressAnimationTimer);
        }
        render() {
          let {
              showDownloadProgress: e,
              showFilledProgress: t,
              progressBar: n,
              i18nProgressBar: o,
            } = this.props,
            {
              currentTimePos: r,
              downloadProgressArr: i,
              hasDownloadProgressAnimation: s,
            } = this.state;
          return a.createElement(
            "div",
            {
              className: "rhap_progress-container",
              ref: n,
              "aria-label": o,
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": Number(r.split("%")[0]),
              tabIndex: 0,
              onMouseDown: this.handleMouseDownOrTouchStartProgressBar,
              onTouchStart: this.handleMouseDownOrTouchStartProgressBar,
              onContextMenu: this.handleContextMenu,
            },
            a.createElement(
              "div",
              {
                className: `rhap_progress-bar ${
                  e ? "rhap_progress-bar-show-download" : ""
                }`,
              },
              a.createElement("div", {
                className: "rhap_progress-indicator",
                style: { left: r },
              }),
              t &&
                a.createElement("div", {
                  className: "rhap_progress-filled",
                  style: { width: r },
                }),
              e &&
                i.map((e, t) => {
                  let { left: n, width: o } = e;
                  return a.createElement("div", {
                    key: t,
                    className: "rhap_download-progress",
                    style: {
                      left: n,
                      width: o,
                      transitionDuration: s ? ".2s" : "0s",
                    },
                  });
                }),
            ),
          );
        }
      }
      var eS = (0, a.forwardRef)((e, t) =>
        a.createElement(ek, eC({}, e, { progressBar: t })),
      );
      class eI extends a.PureComponent {
        constructor(e) {
          super(e),
            i(this, "audio", void 0),
            i(this, "hasAddedAudioEventListener", !1),
            i(this, "state", { currentTime: this.props.defaultCurrentTime }),
            i(this, "handleAudioCurrentTimeChange", (e) => {
              let t = e.target,
                {
                  isLeftTime: n,
                  timeFormat: o,
                  defaultCurrentTime: r,
                } = this.props;
              this.setState({
                currentTime:
                  eM(
                    n ? t.duration - t.currentTime : t.currentTime,
                    t.duration,
                    o,
                  ) || r,
              });
            }),
            i(this, "addAudioEventListeners", () => {
              let { audio: e } = this.props;
              e &&
                !this.hasAddedAudioEventListener &&
                ((this.audio = e),
                (this.hasAddedAudioEventListener = !0),
                e.addEventListener(
                  "timeupdate",
                  this.handleAudioCurrentTimeChange,
                ),
                e.addEventListener(
                  "loadedmetadata",
                  this.handleAudioCurrentTimeChange,
                ));
            });
          let {
              audio: t,
              defaultCurrentTime: n,
              isLeftTime: o,
              timeFormat: r,
            } = e,
            s = n;
          t &&
            (s = eM(
              o ? t.duration - t.currentTime : t.currentTime,
              t.duration,
              r,
            )),
            (this.state = { currentTime: s });
        }
        componentDidMount() {
          this.addAudioEventListeners();
        }
        componentDidUpdate() {
          this.addAudioEventListeners();
        }
        componentWillUnmount() {
          this.audio &&
            this.hasAddedAudioEventListener &&
            (this.audio.removeEventListener(
              "timeupdate",
              this.handleAudioCurrentTimeChange,
            ),
            this.audio.removeEventListener(
              "loadedmetadata",
              this.handleAudioCurrentTimeChange,
            ));
        }
        render() {
          return this.state.currentTime;
        }
      }
      class eP extends a.PureComponent {
        constructor(e) {
          super(e),
            i(this, "audio", void 0),
            i(this, "hasAddedAudioEventListener", !1),
            i(this, "state", {
              duration: this.props.audio
                ? eM(
                    this.props.audio.duration,
                    this.props.audio.duration,
                    this.props.timeFormat,
                  )
                : this.props.defaultDuration,
            }),
            i(this, "handleAudioDurationChange", (e) => {
              let t = e.target,
                { timeFormat: n, defaultDuration: o } = this.props;
              this.setState({ duration: eM(t.duration, t.duration, n) || o });
            }),
            i(this, "addAudioEventListeners", () => {
              let { audio: e } = this.props;
              e &&
                !this.hasAddedAudioEventListener &&
                ((this.audio = e),
                (this.hasAddedAudioEventListener = !0),
                e.addEventListener(
                  "durationchange",
                  this.handleAudioDurationChange,
                ),
                e.addEventListener("abort", this.handleAudioDurationChange));
            });
          let { audio: t, timeFormat: n, defaultDuration: o } = e;
          this.state = { duration: t ? eM(t.duration, t.duration, n) : o };
        }
        componentDidMount() {
          this.addAudioEventListeners();
        }
        componentDidUpdate() {
          this.addAudioEventListeners();
        }
        componentWillUnmount() {
          this.audio &&
            this.hasAddedAudioEventListener &&
            (this.audio.removeEventListener(
              "durationchange",
              this.handleAudioDurationChange,
            ),
            this.audio.removeEventListener(
              "abort",
              this.handleAudioDurationChange,
            ));
        }
        render() {
          return this.state.duration;
        }
      }
      class ex extends a.Component {
        constructor() {
          super(...arguments),
            i(this, "audio", void 0),
            i(this, "hasAddedAudioEventListener", !1),
            i(this, "volumeBar", (0, a.createRef)()),
            i(this, "volumeAnimationTimer", 0),
            i(this, "lastVolume", this.props.volume),
            i(this, "state", {
              currentVolumePos: `${((this.lastVolume / 1) * 100 || 0).toFixed(
                2,
              )}%`,
              hasVolumeAnimation: !1,
              isDraggingVolume: !1,
            }),
            i(this, "getCurrentVolume", (e) => {
              let t, n;
              let { audio: o } = this.props;
              if (!this.volumeBar.current)
                return {
                  currentVolume: o.volume,
                  currentVolumePos: this.state.currentVolumePos,
                };
              let r = this.volumeBar.current.getBoundingClientRect(),
                i = r.width,
                s = e_(e) - r.left;
              return (
                s < 0
                  ? ((t = 0), (n = "0%"))
                  : s > r.width
                    ? ((t = 1), (n = "100%"))
                    : ((t = s / i), (n = `${(s / i) * 100}%`)),
                { currentVolume: t, currentVolumePos: n }
              );
            }),
            i(this, "handleContextMenu", (e) => {
              e.preventDefault();
            }),
            i(this, "handleClickVolumeButton", () => {
              let { audio: e } = this.props;
              e.volume > 0
                ? ((this.lastVolume = e.volume), (e.volume = 0))
                : (e.volume = this.lastVolume);
            }),
            i(this, "handleVolumnControlMouseOrTouchDown", (e) => {
              e.stopPropagation();
              let { audio: t } = this.props,
                { currentVolume: n, currentVolumePos: o } =
                  this.getCurrentVolume(e.nativeEvent);
              (t.volume = n),
                this.setState({ isDraggingVolume: !0, currentVolumePos: o }),
                e.nativeEvent instanceof MouseEvent
                  ? (window.addEventListener(
                      "mousemove",
                      this.handleWindowMouseOrTouchMove,
                    ),
                    window.addEventListener(
                      "mouseup",
                      this.handleWindowMouseOrTouchUp,
                    ))
                  : (window.addEventListener(
                      "touchmove",
                      this.handleWindowMouseOrTouchMove,
                    ),
                    window.addEventListener(
                      "touchend",
                      this.handleWindowMouseOrTouchUp,
                    ));
            }),
            i(this, "handleWindowMouseOrTouchMove", (e) => {
              e instanceof MouseEvent && e.preventDefault(),
                e.stopPropagation();
              let { audio: t } = this.props,
                n = window.getSelection();
              n && "Range" === n.type && n.empty();
              let { isDraggingVolume: o } = this.state;
              if (o) {
                let { currentVolume: n, currentVolumePos: o } =
                  this.getCurrentVolume(e);
                (t.volume = n), this.setState({ currentVolumePos: o });
              }
            }),
            i(this, "handleWindowMouseOrTouchUp", (e) => {
              e.stopPropagation(),
                this.setState({ isDraggingVolume: !1 }),
                e instanceof MouseEvent
                  ? (window.removeEventListener(
                      "mousemove",
                      this.handleWindowMouseOrTouchMove,
                    ),
                    window.removeEventListener(
                      "mouseup",
                      this.handleWindowMouseOrTouchUp,
                    ))
                  : (window.removeEventListener(
                      "touchmove",
                      this.handleWindowMouseOrTouchMove,
                    ),
                    window.removeEventListener(
                      "touchend",
                      this.handleWindowMouseOrTouchUp,
                    ));
            }),
            i(this, "handleAudioVolumeChange", (e) => {
              let { isDraggingVolume: t } = this.state,
                { volume: n } = e.target;
              ((this.lastVolume > 0 && 0 === n) ||
                (0 === this.lastVolume && n > 0)) &&
                this.props.onMuteChange(),
                (this.lastVolume = n),
                t ||
                  (this.setState({
                    hasVolumeAnimation: !0,
                    currentVolumePos: `${((n / 1) * 100 || 0).toFixed(2)}%`,
                  }),
                  clearTimeout(this.volumeAnimationTimer),
                  (this.volumeAnimationTimer = setTimeout(() => {
                    this.setState({ hasVolumeAnimation: !1 });
                  }, 100)));
            });
        }
        componentDidUpdate() {
          let { audio: e } = this.props;
          e &&
            !this.hasAddedAudioEventListener &&
            ((this.audio = e),
            (this.hasAddedAudioEventListener = !0),
            e.addEventListener("volumechange", this.handleAudioVolumeChange));
        }
        componentWillUnmount() {
          this.audio &&
            this.hasAddedAudioEventListener &&
            this.audio.removeEventListener(
              "volumechange",
              this.handleAudioVolumeChange,
            ),
            clearTimeout(this.volumeAnimationTimer);
        }
        render() {
          let {
              audio: e,
              showFilledVolume: t,
              i18nVolumeControl: n,
            } = this.props,
            { currentVolumePos: o, hasVolumeAnimation: r } = this.state,
            { volume: i } = e || {};
          return a.createElement(
            "div",
            {
              ref: this.volumeBar,
              onMouseDown: this.handleVolumnControlMouseOrTouchDown,
              onTouchStart: this.handleVolumnControlMouseOrTouchDown,
              onContextMenu: this.handleContextMenu,
              role: "progressbar",
              "aria-label": n,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": Number((100 * i).toFixed(0)),
              tabIndex: 0,
              className: "rhap_volume-bar-area",
            },
            a.createElement(
              "div",
              { className: "rhap_volume-bar" },
              a.createElement("div", {
                className: "rhap_volume-indicator",
                style: { left: o, transitionDuration: r ? ".1s" : "0s" },
              }),
              t &&
                a.createElement("div", {
                  className: "rhap_volume-filled",
                  style: { width: o },
                }),
            ),
          );
        }
      }
      let eD =
        (((s = {}).CURRENT_TIME = "CURRENT_TIME"),
        (s.CURRENT_LEFT_TIME = "CURRENT_LEFT_TIME"),
        (s.PROGRESS_BAR = "PROGRESS_BAR"),
        (s.DURATION = "DURATION"),
        (s.ADDITIONAL_CONTROLS = "ADDITIONAL_CONTROLS"),
        (s.MAIN_CONTROLS = "MAIN_CONTROLS"),
        (s.VOLUME_CONTROLS = "VOLUME_CONTROLS"),
        (s.LOOP = "LOOP"),
        (s.VOLUME = "VOLUME"),
        s);
      class eN extends a.Component {
        constructor() {
          super(...arguments),
            i(this, "audio", (0, a.createRef)()),
            i(this, "progressBar", (0, a.createRef)()),
            i(this, "container", (0, a.createRef)()),
            i(this, "lastVolume", this.props.volume),
            i(this, "listenTracker", void 0),
            i(this, "volumeAnimationTimer", void 0),
            i(this, "downloadProgressAnimationTimer", void 0),
            i(this, "togglePlay", (e) => {
              e.stopPropagation();
              let t = this.audio.current;
              (t.paused || t.ended) && t.src
                ? this.playAudioPromise()
                : t.paused || t.pause();
            }),
            i(this, "playAudioPromise", () => {
              let e = this.audio.current.play();
              e
                ? e.then(null).catch((e) => {
                    let { onPlayError: t } = this.props;
                    t && t(Error(e));
                  })
                : this.forceUpdate();
            }),
            i(this, "isPlaying", () => {
              let e = this.audio.current;
              return !!e && !e.paused && !e.ended;
            }),
            i(this, "handlePlay", (e) => {
              this.forceUpdate(), this.props.onPlay && this.props.onPlay(e);
            }),
            i(this, "handlePause", (e) => {
              this.audio &&
                (this.forceUpdate(),
                this.props.onPause && this.props.onPause(e));
            }),
            i(this, "handleEnded", (e) => {
              this.audio &&
                (this.forceUpdate(),
                this.props.onEnded && this.props.onEnded(e));
            }),
            i(this, "handleAbort", (e) => {
              this.props.onAbort && this.props.onAbort(e);
            }),
            i(this, "handleClickVolumeButton", () => {
              let e = this.audio.current;
              e.volume > 0
                ? ((this.lastVolume = e.volume), (e.volume = 0))
                : (e.volume = this.lastVolume);
            }),
            i(this, "handleMuteChange", () => {
              this.forceUpdate();
            }),
            i(this, "handleClickLoopButton", () => {
              (this.audio.current.loop = !this.audio.current.loop),
                this.forceUpdate();
            }),
            i(this, "handleClickRewind", () => {
              let { progressJumpSteps: e, progressJumpStep: t } = this.props,
                n = e.backward || t;
              this.setJumpTime(-n);
            }),
            i(this, "handleClickForward", () => {
              let { progressJumpSteps: e, progressJumpStep: t } = this.props,
                n = e.forward || t;
              this.setJumpTime(n);
            }),
            i(this, "setJumpTime", (e) => {
              let t = this.audio.current,
                { duration: n, currentTime: o } = t;
              if (
                t.readyState === t.HAVE_NOTHING ||
                t.readyState === t.HAVE_METADATA ||
                !isFinite(n) ||
                !isFinite(o)
              )
                return (
                  this.props.onChangeCurrentTimeError &&
                  this.props.onChangeCurrentTimeError()
                );
              let r = o + e / 1e3;
              r < 0
                ? ((t.currentTime = 0), (r = 0))
                : r > n
                  ? ((t.currentTime = n), (r = n))
                  : (t.currentTime = r);
            }),
            i(this, "setJumpVolume", (e) => {
              let t = this.audio.current.volume + e;
              t < 0 ? (t = 0) : t > 1 && (t = 1),
                (this.audio.current.volume = t);
            }),
            i(this, "handleKeyDown", (e) => {
              if (this.props.hasDefaultKeyBindings)
                switch (e.key) {
                  case " ":
                    (e.target === this.container.current ||
                      e.target === this.progressBar.current) &&
                      (e.preventDefault(), this.togglePlay(e));
                    break;
                  case "ArrowLeft":
                    this.handleClickRewind();
                    break;
                  case "ArrowRight":
                    this.handleClickForward();
                    break;
                  case "ArrowUp":
                    e.preventDefault(),
                      this.setJumpVolume(this.props.volumeJumpStep);
                    break;
                  case "ArrowDown":
                    e.preventDefault(),
                      this.setJumpVolume(-this.props.volumeJumpStep);
                    break;
                  case "l":
                    this.handleClickLoopButton();
                    break;
                  case "m":
                    this.handleClickVolumeButton();
                }
            }),
            i(this, "renderUIModules", (e) =>
              e.map((e, t) => this.renderUIModule(e, t)),
            ),
            i(this, "renderUIModule", (e, t) => {
              let {
                defaultCurrentTime: n,
                progressUpdateInterval: o,
                showDownloadProgress: r,
                showFilledProgress: i,
                showFilledVolume: s,
                defaultDuration: l,
                customIcons: u,
                showSkipControls: d,
                onClickPrevious: c,
                onClickNext: h,
                onChangeCurrentTimeError: p,
                showJumpControls: m,
                customAdditionalControls: f,
                customVolumeControls: g,
                muted: v,
                timeFormat: y,
                volume: E,
                loop: b,
                mse: T,
                i18nAriaLabels: w,
              } = this.props;
              switch (e) {
                case eD.CURRENT_TIME:
                  return a.createElement(
                    "div",
                    {
                      key: t,
                      id: "rhap_current-time",
                      className: "rhap_time rhap_current-time",
                    },
                    a.createElement(eI, {
                      audio: this.audio.current,
                      isLeftTime: !1,
                      defaultCurrentTime: n,
                      timeFormat: y,
                    }),
                  );
                case eD.CURRENT_LEFT_TIME:
                  return a.createElement(
                    "div",
                    {
                      key: t,
                      id: "rhap_current-left-time",
                      className: "rhap_time rhap_current-left-time",
                    },
                    a.createElement(eI, {
                      audio: this.audio.current,
                      isLeftTime: !0,
                      defaultCurrentTime: n,
                      timeFormat: y,
                    }),
                  );
                case eD.PROGRESS_BAR:
                  return a.createElement(eS, {
                    key: t,
                    ref: this.progressBar,
                    audio: this.audio.current,
                    progressUpdateInterval: o,
                    showDownloadProgress: r,
                    showFilledProgress: i,
                    onSeek: T && T.onSeek,
                    onChangeCurrentTimeError: p,
                    srcDuration: T && T.srcDuration,
                    i18nProgressBar: w.progressControl,
                  });
                case eD.DURATION:
                  return a.createElement(
                    "div",
                    { key: t, className: "rhap_time rhap_total-time" },
                    T && T.srcDuration
                      ? eM(T.srcDuration, T.srcDuration, this.props.timeFormat)
                      : a.createElement(eP, {
                          audio: this.audio.current,
                          defaultDuration: l,
                          timeFormat: y,
                        }),
                  );
                case eD.ADDITIONAL_CONTROLS:
                  return a.createElement(
                    "div",
                    { key: t, className: "rhap_additional-controls" },
                    this.renderUIModules(f),
                  );
                case eD.MAIN_CONTROLS: {
                  let e;
                  let n = this.isPlaying();
                  return (
                    (e = n
                      ? u.pause
                        ? u.pause
                        : a.createElement(ew, { icon: "mdi:pause-circle" })
                      : u.play
                        ? u.play
                        : a.createElement(ew, { icon: "mdi:play-circle" })),
                    a.createElement(
                      "div",
                      { key: t, className: "rhap_main-controls" },
                      d &&
                        a.createElement(
                          "button",
                          {
                            "aria-label": w.previous,
                            className:
                              "rhap_button-clear rhap_main-controls-button rhap_skip-button",
                            type: "button",
                            onClick: c,
                          },
                          u.previous
                            ? u.previous
                            : a.createElement(ew, {
                                icon: "mdi:skip-previous",
                              }),
                        ),
                      m &&
                        a.createElement(
                          "button",
                          {
                            "aria-label": w.rewind,
                            className:
                              "rhap_button-clear rhap_main-controls-button rhap_rewind-button",
                            type: "button",
                            onClick: this.handleClickRewind,
                          },
                          u.rewind
                            ? u.rewind
                            : a.createElement(ew, { icon: "mdi:rewind" }),
                        ),
                      a.createElement(
                        "button",
                        {
                          "aria-label": n ? w.pause : w.play,
                          className:
                            "rhap_button-clear rhap_main-controls-button rhap_play-pause-button",
                          type: "button",
                          onClick: this.togglePlay,
                        },
                        e,
                      ),
                      m &&
                        a.createElement(
                          "button",
                          {
                            "aria-label": w.forward,
                            className:
                              "rhap_button-clear rhap_main-controls-button rhap_forward-button",
                            type: "button",
                            onClick: this.handleClickForward,
                          },
                          u.forward
                            ? u.forward
                            : a.createElement(ew, { icon: "mdi:fast-forward" }),
                        ),
                      d &&
                        a.createElement(
                          "button",
                          {
                            "aria-label": w.next,
                            className:
                              "rhap_button-clear rhap_main-controls-button rhap_skip-button",
                            type: "button",
                            onClick: h,
                          },
                          u.next
                            ? u.next
                            : a.createElement(ew, { icon: "mdi:skip-next" }),
                        ),
                    )
                  );
                }
                case eD.VOLUME_CONTROLS:
                  return a.createElement(
                    "div",
                    { key: t, className: "rhap_volume-controls" },
                    this.renderUIModules(g),
                  );
                case eD.LOOP: {
                  let e;
                  let n = this.audio.current ? this.audio.current.loop : b;
                  return (
                    (e = n
                      ? u.loop
                        ? u.loop
                        : a.createElement(ew, { icon: "mdi:repeat" })
                      : u.loopOff
                        ? u.loopOff
                        : a.createElement(ew, { icon: "mdi:repeat-off" })),
                    a.createElement(
                      "button",
                      {
                        key: t,
                        "aria-label": n ? w.loop : w.loopOff,
                        className: "rhap_button-clear rhap_repeat-button",
                        type: "button",
                        onClick: this.handleClickLoopButton,
                      },
                      e,
                    )
                  );
                }
                case eD.VOLUME: {
                  let e;
                  let { volume: n = v ? 0 : E } = this.audio.current || {};
                  return (
                    (e = n
                      ? u.volume
                        ? u.volume
                        : a.createElement(ew, { icon: "mdi:volume-high" })
                      : u.volume
                        ? u.volumeMute
                        : a.createElement(ew, { icon: "mdi:volume-mute" })),
                    a.createElement(
                      "div",
                      { key: t, className: "rhap_volume-container" },
                      a.createElement(
                        "button",
                        {
                          "aria-label": n ? w.volume : w.volumeMute,
                          onClick: this.handleClickVolumeButton,
                          type: "button",
                          className: "rhap_button-clear rhap_volume-button",
                        },
                        e,
                      ),
                      a.createElement(ex, {
                        audio: this.audio.current,
                        volume: n,
                        onMuteChange: this.handleMuteChange,
                        showFilledVolume: s,
                        i18nVolumeControl: w.volumeControl,
                      }),
                    )
                  );
                }
                default:
                  if (!(0, a.isValidElement)(e)) return null;
                  return e.key ? e : (0, a.cloneElement)(e, { key: t });
              }
            });
        }
        componentDidMount() {
          this.forceUpdate();
          let e = this.audio.current;
          this.props.muted ? (e.volume = 0) : (e.volume = this.lastVolume),
            e.addEventListener("error", (e) => {
              this.props.onError && this.props.onError(e);
            }),
            e.addEventListener("canplay", (e) => {
              this.props.onCanPlay && this.props.onCanPlay(e);
            }),
            e.addEventListener("canplaythrough", (e) => {
              this.props.onCanPlayThrough && this.props.onCanPlayThrough(e);
            }),
            e.addEventListener("play", this.handlePlay),
            e.addEventListener("abort", this.handleAbort),
            e.addEventListener("ended", this.handleEnded),
            e.addEventListener("playing", (e) => {
              this.props.onPlaying && this.props.onPlaying(e);
            }),
            e.addEventListener("seeking", (e) => {
              this.props.onSeeking && this.props.onSeeking(e);
            }),
            e.addEventListener("seeked", (e) => {
              this.props.onSeeked && this.props.onSeeked(e);
            }),
            e.addEventListener("waiting", (e) => {
              this.props.onWaiting && this.props.onWaiting(e);
            }),
            e.addEventListener("emptied", (e) => {
              this.props.onEmptied && this.props.onEmptied(e);
            }),
            e.addEventListener("stalled", (e) => {
              this.props.onStalled && this.props.onStalled(e);
            }),
            e.addEventListener("suspend", (e) => {
              this.props.onSuspend && this.props.onSuspend(e);
            }),
            e.addEventListener("loadstart", (e) => {
              this.props.onLoadStart && this.props.onLoadStart(e);
            }),
            e.addEventListener("loadedmetadata", (e) => {
              this.props.onLoadedMetaData && this.props.onLoadedMetaData(e);
            }),
            e.addEventListener("loadeddata", (e) => {
              this.props.onLoadedData && this.props.onLoadedData(e);
            }),
            e.addEventListener("pause", this.handlePause),
            e.addEventListener(
              "timeupdate",
              eA((e) => {
                this.props.onListen && this.props.onListen(e);
              }, this.props.listenInterval),
            ),
            e.addEventListener("volumechange", (e) => {
              this.props.onVolumeChange && this.props.onVolumeChange(e);
            }),
            e.addEventListener("encrypted", (e) => {
              let { mse: t } = this.props;
              t && t.onEcrypted && t.onEcrypted(e);
            });
        }
        componentDidUpdate(e) {
          let { src: t, autoPlayAfterSrcChange: n } = this.props;
          e.src !== t && (n ? this.playAudioPromise() : this.forceUpdate());
        }
        render() {
          let {
              className: e,
              src: t,
              loop: n,
              preload: o,
              autoPlay: r,
              crossOrigin: i,
              mediaGroup: s,
              header: l,
              footer: u,
              layout: d,
              customProgressBarSection: c,
              customControlsSection: h,
              children: p,
              style: m,
              i18nAriaLabels: f,
            } = this.props,
            g = this.audio.current ? this.audio.current.loop : n,
            v = g ? "rhap_loop--on" : "rhap_loop--off",
            y = this.isPlaying()
              ? "rhap_play-status--playing"
              : "rhap_play-status--paused";
          return a.createElement(
            "div",
            {
              role: "group",
              tabIndex: 0,
              "aria-label": f.player,
              className: `rhap_container ${v} ${y} ${e}`,
              onKeyDown: this.handleKeyDown,
              ref: this.container,
              style: m,
            },
            a.createElement(
              "audio",
              {
                src: t,
                controls: !1,
                loop: g,
                autoPlay: r,
                preload: o,
                crossOrigin: i,
                mediaGroup: s,
                ref: this.audio,
              },
              p,
            ),
            l && a.createElement("div", { className: "rhap_header" }, l),
            a.createElement(
              "div",
              { className: `rhap_main ${eL(d)}` },
              a.createElement(
                "div",
                { className: "rhap_progress-section" },
                this.renderUIModules(c),
              ),
              a.createElement(
                "div",
                { className: "rhap_controls-section" },
                this.renderUIModules(h),
              ),
            ),
            u && a.createElement("div", { className: "rhap_footer" }, u),
          );
        }
      }
      i(eN, "defaultProps", {
        autoPlay: !1,
        autoPlayAfterSrcChange: !0,
        listenInterval: 1e3,
        progressJumpStep: 5e3,
        progressJumpSteps: {},
        volumeJumpStep: 0.1,
        loop: !1,
        muted: !1,
        preload: "auto",
        progressUpdateInterval: 20,
        defaultCurrentTime: "--:--",
        defaultDuration: "--:--",
        timeFormat: "auto",
        volume: 1,
        className: "",
        showJumpControls: !0,
        showSkipControls: !1,
        showDownloadProgress: !0,
        showFilledProgress: !0,
        showFilledVolume: !1,
        customIcons: {},
        customProgressBarSection: [
          eD.CURRENT_TIME,
          eD.PROGRESS_BAR,
          eD.DURATION,
        ],
        customControlsSection: [
          eD.ADDITIONAL_CONTROLS,
          eD.MAIN_CONTROLS,
          eD.VOLUME_CONTROLS,
        ],
        customAdditionalControls: [eD.LOOP],
        customVolumeControls: [eD.VOLUME],
        layout: "stacked",
        hasDefaultKeyBindings: !0,
        i18nAriaLabels: {
          player: "Audio player",
          progressControl: "Audio progress control",
          volumeControl: "Volume control",
          play: "Play",
          pause: "Pause",
          rewind: "Rewind",
          forward: "Forward",
          previous: "Previous",
          next: "Skip",
          loop: "Disable loop",
          loopOff: "Enable loop",
          volume: "Mute",
          volumeMute: "Unmute",
        },
      });
      var eR = eN;
    },
    171: function (e, t, n) {
      "use strict";
      n.d(t, {
        Am: function () {
          return S;
        },
      });
      var o = n(2265),
        r = function () {
          for (var e, t, n = 0, o = ""; n < arguments.length; )
            (e = arguments[n++]) &&
              (t = (function e(t) {
                var n,
                  o,
                  r = "";
                if ("string" == typeof t || "number" == typeof t) r += t;
                else if ("object" == typeof t) {
                  if (Array.isArray(t))
                    for (n = 0; n < t.length; n++)
                      t[n] && (o = e(t[n])) && (r && (r += " "), (r += o));
                  else for (n in t) t[n] && (r && (r += " "), (r += n));
                }
                return r;
              })(e)) &&
              (o && (o += " "), (o += t));
          return o;
        };
      let i = (e) => "number" == typeof e && !isNaN(e),
        s = (e) => "string" == typeof e,
        a = (e) => "function" == typeof e,
        l = (e) => (s(e) || a(e) ? e : null),
        u = (e) => (0, o.isValidElement)(e) || s(e) || a(e) || i(e);
      function d(e) {
        let {
          enter: t,
          exit: n,
          appendPosition: r = !1,
          collapse: i = !0,
          collapseDuration: s = 300,
        } = e;
        return function (e) {
          let {
              children: a,
              position: l,
              preventExitTransition: u,
              done: d,
              nodeRef: c,
              isIn: h,
            } = e,
            p = r ? `${t}--${l}` : t,
            m = r ? `${n}--${l}` : n,
            f = (0, o.useRef)(0);
          return (
            (0, o.useLayoutEffect)(() => {
              let e = c.current,
                t = p.split(" "),
                n = (o) => {
                  o.target === c.current &&
                    (e.dispatchEvent(new Event("d")),
                    e.removeEventListener("animationend", n),
                    e.removeEventListener("animationcancel", n),
                    0 === f.current &&
                      "animationcancel" !== o.type &&
                      e.classList.remove(...t));
                };
              e.classList.add(...t),
                e.addEventListener("animationend", n),
                e.addEventListener("animationcancel", n);
            }, []),
            (0, o.useEffect)(() => {
              let e = c.current,
                t = () => {
                  e.removeEventListener("animationend", t),
                    i
                      ? (function (e, t, n) {
                          void 0 === n && (n = 300);
                          let { scrollHeight: o, style: r } = e;
                          requestAnimationFrame(() => {
                            (r.minHeight = "initial"),
                              (r.height = o + "px"),
                              (r.transition = `all ${n}ms`),
                              requestAnimationFrame(() => {
                                (r.height = "0"),
                                  (r.padding = "0"),
                                  (r.margin = "0"),
                                  setTimeout(t, n);
                              });
                          });
                        })(e, d, s)
                      : d();
                };
              h ||
                (u
                  ? t()
                  : ((f.current = 1),
                    (e.className += ` ${m}`),
                    e.addEventListener("animationend", t)));
            }, [h]),
            o.createElement(o.Fragment, null, a)
          );
        };
      }
      function c(e, t) {
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
        p = (e) => {
          let { theme: t, type: n, ...r } = e;
          return o.createElement("svg", {
            viewBox: "0 0 24 24",
            width: "100%",
            height: "100%",
            fill:
              "colored" === t
                ? "currentColor"
                : `var(--toastify-icon-color-${n})`,
            ...r,
          });
        },
        m = {
          info: function (e) {
            return o.createElement(
              p,
              { ...e },
              o.createElement("path", {
                d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
              }),
            );
          },
          warning: function (e) {
            return o.createElement(
              p,
              { ...e },
              o.createElement("path", {
                d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
              }),
            );
          },
          success: function (e) {
            return o.createElement(
              p,
              { ...e },
              o.createElement("path", {
                d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
              }),
            );
          },
          error: function (e) {
            return o.createElement(
              p,
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
      function f(e) {
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
        let { closeToast: t, theme: n, ariaLabel: r = "close" } = e;
        return o.createElement(
          "button",
          {
            className: `Toastify__close-button Toastify__close-button--${n}`,
            type: "button",
            onClick: (e) => {
              e.stopPropagation(), t(e);
            },
            "aria-label": r,
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
      function y(e) {
        let {
            delay: t,
            isRunning: n,
            closeToast: i,
            type: s = "default",
            hide: l,
            className: u,
            style: d,
            controlledProgress: c,
            progress: h,
            rtl: p,
            isIn: m,
            theme: f,
          } = e,
          g = l || (c && 0 === h),
          v = {
            ...d,
            animationDuration: `${t}ms`,
            animationPlayState: n ? "running" : "paused",
            opacity: g ? 0 : 1,
          };
        c && (v.transform = `scaleX(${h})`);
        let y = r(
            "Toastify__progress-bar",
            c
              ? "Toastify__progress-bar--controlled"
              : "Toastify__progress-bar--animated",
            `Toastify__progress-bar-theme--${f}`,
            `Toastify__progress-bar--${s}`,
            { "Toastify__progress-bar--rtl": p },
          ),
          E = a(u) ? u({ rtl: p, type: s, defaultClassName: y }) : r(y, u);
        return o.createElement("div", {
          role: "progressbar",
          "aria-hidden": g ? "true" : "false",
          "aria-label": "notification timer",
          className: E,
          style: v,
          [c && h >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
            c && h < 1
              ? null
              : () => {
                  m && i();
                },
        });
      }
      let E = (e) => {
          let {
              isRunning: t,
              preventExitTransition: n,
              toastRef: i,
              eventHandlers: s,
            } = (function (e) {
              let [t, n] = (0, o.useState)(!1),
                [r, i] = (0, o.useState)(!1),
                s = (0, o.useRef)(null),
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
                u = (0, o.useRef)(e),
                {
                  autoClose: d,
                  pauseOnHover: c,
                  closeToast: h,
                  onClick: p,
                  closeOnClick: m,
                } = e;
              function v(t) {
                if (e.draggable) {
                  "touchstart" === t.nativeEvent.type &&
                    t.nativeEvent.preventDefault(),
                    (l.didMove = !1),
                    document.addEventListener("mousemove", T),
                    document.addEventListener("mouseup", w),
                    document.addEventListener("touchmove", T),
                    document.addEventListener("touchend", w);
                  let n = s.current;
                  (l.canCloseOnClick = !0),
                    (l.canDrag = !0),
                    (l.boundingRect = n.getBoundingClientRect()),
                    (n.style.transition = ""),
                    (l.x = f(t.nativeEvent)),
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
                  let { top: n, bottom: o, left: r, right: i } = l.boundingRect;
                  "touchend" !== t.nativeEvent.type &&
                  e.pauseOnHover &&
                  l.x >= r &&
                  l.x <= i &&
                  l.y >= n &&
                  l.y <= o
                    ? b()
                    : E();
                }
              }
              function E() {
                n(!0);
              }
              function b() {
                n(!1);
              }
              function T(n) {
                let o = s.current;
                l.canDrag &&
                  o &&
                  ((l.didMove = !0),
                  t && b(),
                  (l.x = f(n)),
                  (l.y = g(n)),
                  (l.delta =
                    "x" === e.draggableDirection
                      ? l.x - l.start
                      : l.y - l.start),
                  l.start !== l.x && (l.canCloseOnClick = !1),
                  (o.style.transform = `translate${e.draggableDirection}(${l.delta}px)`),
                  (o.style.opacity =
                    "" + (1 - Math.abs(l.delta / l.removalDistance))));
              }
              function w() {
                document.removeEventListener("mousemove", T),
                  document.removeEventListener("mouseup", w),
                  document.removeEventListener("touchmove", T),
                  document.removeEventListener("touchend", w);
                let t = s.current;
                if (l.canDrag && l.didMove && t) {
                  if (((l.canDrag = !1), Math.abs(l.delta) > l.removalDistance))
                    return i(!0), void e.closeToast();
                  (t.style.transition = "transform 0.2s, opacity 0.2s"),
                    (t.style.transform = `translate${e.draggableDirection}(0)`),
                    (t.style.opacity = "1");
                }
              }
              (0, o.useEffect)(() => {
                u.current = e;
              }),
                (0, o.useEffect)(
                  () => (
                    s.current &&
                      s.current.addEventListener("d", E, { once: !0 }),
                    a(e.onOpen) &&
                      e.onOpen(
                        (0, o.isValidElement)(e.children) && e.children.props,
                      ),
                    () => {
                      let e = u.current;
                      a(e.onClose) &&
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
                      (document.hasFocus() || b(),
                      window.addEventListener("focus", E),
                      window.addEventListener("blur", b)),
                    () => {
                      e.pauseOnFocusLoss &&
                        (window.removeEventListener("focus", E),
                        window.removeEventListener("blur", b));
                    }
                  ),
                  [e.pauseOnFocusLoss],
                );
              let C = {
                onMouseDown: v,
                onTouchStart: v,
                onMouseUp: y,
                onTouchEnd: y,
              };
              return (
                d && c && ((C.onMouseEnter = b), (C.onMouseLeave = E)),
                m &&
                  (C.onClick = (e) => {
                    p && p(e), l.canCloseOnClick && h();
                  }),
                {
                  playToast: E,
                  pauseToast: b,
                  isRunning: t,
                  preventExitTransition: r,
                  toastRef: s,
                  eventHandlers: C,
                }
              );
            })(e),
            {
              closeButton: l,
              children: u,
              autoClose: d,
              onClick: c,
              type: h,
              hideProgressBar: p,
              closeToast: m,
              transition: E,
              position: b,
              className: T,
              style: w,
              bodyClassName: C,
              bodyStyle: L,
              progressClassName: _,
              progressStyle: O,
              updateId: M,
              role: A,
              progress: k,
              rtl: S,
              toastId: I,
              deleteToast: P,
              isIn: x,
              isLoading: D,
              iconOut: N,
              closeOnClick: R,
              theme: U,
            } = e,
            F = r(
              "Toastify__toast",
              `Toastify__toast-theme--${U}`,
              `Toastify__toast--${h}`,
              { "Toastify__toast--rtl": S },
              { "Toastify__toast--close-on-click": R },
            ),
            V = a(T)
              ? T({ rtl: S, position: b, type: h, defaultClassName: F })
              : r(F, T),
            j = !!k || !d,
            B = { closeToast: m, type: h, theme: U },
            $ = null;
          return (
            !1 === l ||
              ($ = a(l)
                ? l(B)
                : (0, o.isValidElement)(l)
                  ? (0, o.cloneElement)(l, B)
                  : v(B)),
            o.createElement(
              E,
              {
                isIn: x,
                done: P,
                position: b,
                preventExitTransition: n,
                nodeRef: i,
              },
              o.createElement(
                "div",
                { id: I, onClick: c, className: V, ...s, style: w, ref: i },
                o.createElement(
                  "div",
                  {
                    ...(x && { role: A }),
                    className: a(C)
                      ? C({ type: h })
                      : r("Toastify__toast-body", C),
                    style: L,
                  },
                  null != N &&
                    o.createElement(
                      "div",
                      {
                        className: r("Toastify__toast-icon", {
                          "Toastify--animate-icon Toastify__zoom-enter": !D,
                        }),
                      },
                      N,
                    ),
                  o.createElement("div", null, u),
                ),
                $,
                o.createElement(y, {
                  ...(M && !j ? { key: `pb-${M}` } : {}),
                  rtl: S,
                  theme: U,
                  delay: d,
                  isRunning: t,
                  isIn: x,
                  closeToast: m,
                  hide: p,
                  type: h,
                  style: O,
                  className: _,
                  controlledProgress: j,
                  progress: k || 0,
                }),
              ),
            )
          );
        },
        b = function (e, t) {
          return (
            void 0 === t && (t = !1),
            {
              enter: `Toastify--animate Toastify__${e}-enter`,
              exit: `Toastify--animate Toastify__${e}-exit`,
              appendPosition: t,
            }
          );
        },
        T = d(b("bounce", !0)),
        w =
          (d(b("slide", !0)),
          d(b("zoom")),
          d(b("flip")),
          (0, o.forwardRef)((e, t) => {
            let {
                getToastToRender: n,
                containerRef: d,
                isToastActive: p,
              } = (function (e) {
                let [, t] = (0, o.useReducer)((e) => e + 1, 0),
                  [n, r] = (0, o.useState)([]),
                  d = (0, o.useRef)(null),
                  p = (0, o.useRef)(new Map()).current,
                  f = (e) => -1 !== n.indexOf(e),
                  g = (0, o.useRef)({
                    toastKey: 1,
                    displayedToast: 0,
                    count: 0,
                    queue: [],
                    props: e,
                    containerId: null,
                    isToastActive: f,
                    getToast: (e) => p.get(e),
                  }).current;
                function v(e) {
                  let { containerId: t } = e,
                    { limit: n } = g.props;
                  !n ||
                    (t && g.containerId !== t) ||
                    ((g.count -= g.queue.length), (g.queue = []));
                }
                function y(e) {
                  r((t) => (null == e ? [] : t.filter((t) => t !== e)));
                }
                function E() {
                  let {
                    toastContent: e,
                    toastProps: t,
                    staleId: n,
                  } = g.queue.shift();
                  T(e, t, n);
                }
                function b(e, n) {
                  var r, f;
                  let { delay: v, staleId: b, ...w } = n;
                  if (
                    !u(e) ||
                    !d.current ||
                    (g.props.enableMultiContainer &&
                      w.containerId !== g.props.containerId) ||
                    (p.has(w.toastId) && null == w.updateId)
                  )
                    return;
                  let { toastId: C, updateId: L, data: _ } = w,
                    { props: O } = g,
                    M = () => y(C),
                    A = null == L;
                  A && g.count++;
                  let k = {
                    ...O,
                    style: O.toastStyle,
                    key: g.toastKey++,
                    ...Object.fromEntries(
                      Object.entries(w).filter((e) => {
                        let [t, n] = e;
                        return null != n;
                      }),
                    ),
                    toastId: C,
                    updateId: L,
                    data: _,
                    closeToast: M,
                    isIn: !1,
                    className: l(w.className || O.toastClassName),
                    bodyClassName: l(w.bodyClassName || O.bodyClassName),
                    progressClassName: l(
                      w.progressClassName || O.progressClassName,
                    ),
                    autoClose:
                      !w.isLoading &&
                      ((r = w.autoClose),
                      (f = O.autoClose),
                      !1 === r || (i(r) && r > 0) ? r : f),
                    deleteToast() {
                      let e = c(p.get(C), "removed");
                      p.delete(C), h.emit(4, e);
                      let n = g.queue.length;
                      if (
                        ((g.count =
                          null == C ? g.count - g.displayedToast : g.count - 1),
                        g.count < 0 && (g.count = 0),
                        n > 0)
                      ) {
                        let e = null == C ? g.props.limit : 1;
                        if (1 === n || 1 === e) g.displayedToast++, E();
                        else {
                          let t = e > n ? n : e;
                          g.displayedToast = t;
                          for (let e = 0; e < t; e++) E();
                        }
                      } else t();
                    },
                  };
                  (k.iconOut = (function (e) {
                    let { theme: t, type: n, isLoading: r, icon: l } = e,
                      u = null,
                      d = { theme: t, type: n };
                    return (
                      !1 === l ||
                        (a(l)
                          ? (u = l(d))
                          : (0, o.isValidElement)(l)
                            ? (u = (0, o.cloneElement)(l, d))
                            : s(l) || i(l)
                              ? (u = l)
                              : r
                                ? (u = m.spinner())
                                : n in m && (u = m[n](d))),
                      u
                    );
                  })(k)),
                    a(w.onOpen) && (k.onOpen = w.onOpen),
                    a(w.onClose) && (k.onClose = w.onClose),
                    (k.closeButton = O.closeButton),
                    !1 === w.closeButton || u(w.closeButton)
                      ? (k.closeButton = w.closeButton)
                      : !0 === w.closeButton &&
                        (k.closeButton = !u(O.closeButton) || O.closeButton);
                  let S = e;
                  (0, o.isValidElement)(e) && !s(e.type)
                    ? (S = (0, o.cloneElement)(e, {
                        closeToast: M,
                        toastProps: k,
                        data: _,
                      }))
                    : a(e) &&
                      (S = e({ closeToast: M, toastProps: k, data: _ })),
                    O.limit && O.limit > 0 && g.count > O.limit && A
                      ? g.queue.push({
                          toastContent: S,
                          toastProps: k,
                          staleId: b,
                        })
                      : i(v)
                        ? setTimeout(() => {
                            T(S, k, b);
                          }, v)
                        : T(S, k, b);
                }
                function T(e, t, n) {
                  let { toastId: o } = t;
                  n && p.delete(n);
                  let i = { content: e, props: t };
                  p.set(o, i),
                    r((e) => [...e, o].filter((e) => e !== n)),
                    h.emit(
                      4,
                      c(i, null == i.props.updateId ? "added" : "updated"),
                    );
                }
                return (
                  (0, o.useEffect)(
                    () => (
                      (g.containerId = e.containerId),
                      h
                        .cancelEmit(3)
                        .on(0, b)
                        .on(1, (e) => d.current && y(e))
                        .on(5, v)
                        .emit(2, g),
                      () => {
                        p.clear(), h.emit(3, g);
                      }
                    ),
                    [],
                  ),
                  (0, o.useEffect)(() => {
                    (g.props = e),
                      (g.isToastActive = f),
                      (g.displayedToast = n.length);
                  }),
                  {
                    getToastToRender: function (t) {
                      let n = new Map(),
                        o = Array.from(p.values());
                      return (
                        e.newestOnTop && o.reverse(),
                        o.forEach((e) => {
                          let { position: t } = e.props;
                          n.has(t) || n.set(t, []), n.get(t).push(e);
                        }),
                        Array.from(n, (e) => t(e[0], e[1]))
                      );
                    },
                    containerRef: d,
                    isToastActive: f,
                  }
                );
              })(e),
              { className: f, style: g, rtl: v, containerId: y } = e;
            return (
              (0, o.useEffect)(() => {
                t && (t.current = d.current);
              }, []),
              o.createElement(
                "div",
                { ref: d, className: "Toastify", id: y },
                n((e, t) => {
                  let n = t.length ? { ...g } : { ...g, pointerEvents: "none" };
                  return o.createElement(
                    "div",
                    {
                      className: (function (e) {
                        let t = r(
                          "Toastify__toast-container",
                          `Toastify__toast-container--${e}`,
                          { "Toastify__toast-container--rtl": v },
                        );
                        return a(f)
                          ? f({ position: e, rtl: v, defaultClassName: t })
                          : r(t, l(f));
                      })(e),
                      style: n,
                      key: `container-${e}`,
                    },
                    t.map((e, n) => {
                      let { content: r, props: i } = e;
                      return o.createElement(
                        E,
                        {
                          ...i,
                          isIn: p(i.toastId),
                          style: {
                            ...i.style,
                            "--nth": n + 1,
                            "--len": t.length,
                          },
                          key: `toast-${i.key}`,
                        },
                        r,
                      );
                    }),
                  );
                }),
              )
            );
          }));
      (w.displayName = "ToastContainer"),
        (w.defaultProps = {
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
      let C,
        L = new Map(),
        _ = [],
        O = 1;
      function M(e, t) {
        return (
          L.size > 0 ? h.emit(0, e, t) : _.push({ content: e, options: t }),
          t.toastId
        );
      }
      function A(e, t) {
        return {
          ...t,
          type: (t && t.type) || e,
          toastId: t && (s(t.toastId) || i(t.toastId)) ? t.toastId : "" + O++,
        };
      }
      function k(e) {
        return (t, n) => M(t, A(e, n));
      }
      function S(e, t) {
        return M(e, A("default", t));
      }
      (S.loading = (e, t) =>
        M(
          e,
          A("default", {
            isLoading: !0,
            autoClose: !1,
            closeOnClick: !1,
            closeButton: !1,
            draggable: !1,
            ...t,
          }),
        )),
        (S.promise = function (e, t, n) {
          let o,
            { pending: r, error: i, success: l } = t;
          r &&
            (o = s(r) ? S.loading(r, n) : S.loading(r.render, { ...n, ...r }));
          let u = {
              isLoading: null,
              autoClose: null,
              closeOnClick: null,
              closeButton: null,
              draggable: null,
            },
            d = (e, t, r) => {
              if (null == t) return void S.dismiss(o);
              let i = { type: e, ...u, ...n, data: r },
                a = s(t) ? { render: t } : t;
              return (
                o ? S.update(o, { ...i, ...a }) : S(a.render, { ...i, ...a }), r
              );
            },
            c = a(e) ? e() : e;
          return (
            c.then((e) => d("success", l, e)).catch((e) => d("error", i, e)), c
          );
        }),
        (S.success = k("success")),
        (S.info = k("info")),
        (S.error = k("error")),
        (S.warning = k("warning")),
        (S.warn = S.warning),
        (S.dark = (e, t) => M(e, A("default", { theme: "dark", ...t }))),
        (S.dismiss = (e) => {
          L.size > 0
            ? h.emit(1, e)
            : (_ = _.filter((t) => null != e && t.options.toastId !== e));
        }),
        (S.clearWaitingQueue = function (e) {
          return void 0 === e && (e = {}), h.emit(5, e);
        }),
        (S.isActive = (e) => {
          let t = !1;
          return (
            L.forEach((n) => {
              n.isToastActive && n.isToastActive(e) && (t = !0);
            }),
            t
          );
        }),
        (S.update = function (e, t) {
          void 0 === t && (t = {}),
            setTimeout(() => {
              let n = (function (e, t) {
                let { containerId: n } = t,
                  o = L.get(n || C);
                return o && o.getToast(e);
              })(e, t);
              if (n) {
                let { props: o, content: r } = n,
                  i = {
                    delay: 100,
                    ...o,
                    ...t,
                    toastId: t.toastId || e,
                    updateId: "" + O++,
                  };
                i.toastId !== e && (i.staleId = e);
                let s = i.render || r;
                delete i.render, M(s, i);
              }
            }, 0);
        }),
        (S.done = (e) => {
          S.update(e, { progress: 1 });
        }),
        (S.onChange = (e) => (
          h.on(4, e),
          () => {
            h.off(4, e);
          }
        )),
        (S.POSITION = {
          TOP_LEFT: "top-left",
          TOP_RIGHT: "top-right",
          TOP_CENTER: "top-center",
          BOTTOM_LEFT: "bottom-left",
          BOTTOM_RIGHT: "bottom-right",
          BOTTOM_CENTER: "bottom-center",
        }),
        (S.TYPE = {
          INFO: "info",
          SUCCESS: "success",
          WARNING: "warning",
          ERROR: "error",
          DEFAULT: "default",
        }),
        h
          .on(2, (e) => {
            (C = e.containerId || e),
              L.set(C, e),
              _.forEach((e) => {
                h.emit(0, e.content, e.options);
              }),
              (_ = []);
          })
          .on(3, (e) => {
            L.delete(e.containerId || e),
              0 === L.size && h.off(0).off(1).off(5);
          });
    },
  },
]);
