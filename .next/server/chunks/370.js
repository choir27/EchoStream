"use strict";
(exports.id = 370),
  (exports.ids = [370]),
  (exports.modules = {
    9176: (e, a, t) => {
      e.exports = {
        parallel: t(2922),
        serial: t(3154),
        serialOrdered: t(9365),
      };
    },
    2982: (e) => {
      e.exports = function (e) {
        Object.keys(e.jobs).forEach(a.bind(e)), (e.jobs = {});
      };
      function a(e) {
        "function" == typeof this.jobs[e] && this.jobs[e]();
      }
    },
    2871: (e, a, t) => {
      var i = t(7528);
      e.exports = function (e) {
        var a = !1;
        return (
          i(function () {
            a = !0;
          }),
          function (t, p) {
            a
              ? e(t, p)
              : i(function () {
                  e(t, p);
                });
          }
        );
      };
    },
    7528: (e) => {
      e.exports = function (e) {
        var a =
          "function" == typeof setImmediate
            ? setImmediate
            : "object" == typeof process &&
                "function" == typeof process.nextTick
              ? process.nextTick
              : null;
        a ? a(e) : setTimeout(e, 0);
      };
    },
    7486: (e, a, t) => {
      var i = t(2871),
        p = t(2982);
      e.exports = function (e, a, t, n) {
        var o,
          r,
          s = t.keyedList ? t.keyedList[t.index] : t.index;
        t.jobs[s] =
          ((o = e[s]),
          (r = function (e, a) {
            s in t.jobs &&
              (delete t.jobs[s],
              e ? p(t) : (t.results[s] = a),
              n(e, t.results));
          }),
          2 == a.length ? a(o, i(r)) : a(o, s, i(r)));
      };
    },
    4161: (e) => {
      e.exports = function (e, a) {
        var t = !Array.isArray(e),
          i = {
            index: 0,
            keyedList: t || a ? Object.keys(e) : null,
            jobs: {},
            results: t ? {} : [],
            size: t ? Object.keys(e).length : e.length,
          };
        return (
          a &&
            i.keyedList.sort(
              t
                ? a
                : function (t, i) {
                    return a(e[t], e[i]);
                  },
            ),
          i
        );
      };
    },
    1724: (e, a, t) => {
      var i = t(2982),
        p = t(2871);
      e.exports = function (e) {
        Object.keys(this.jobs).length &&
          ((this.index = this.size), i(this), p(e)(null, this.results));
      };
    },
    2922: (e, a, t) => {
      var i = t(7486),
        p = t(4161),
        n = t(1724);
      e.exports = function (e, a, t) {
        for (var o = p(e); o.index < (o.keyedList || e).length; )
          i(e, a, o, function (e, a) {
            if (e) {
              t(e, a);
              return;
            }
            if (0 === Object.keys(o.jobs).length) {
              t(null, o.results);
              return;
            }
          }),
            o.index++;
        return n.bind(o, t);
      };
    },
    3154: (e, a, t) => {
      var i = t(9365);
      e.exports = function (e, a, t) {
        return i(e, a, null, t);
      };
    },
    9365: (e, a, t) => {
      var i = t(7486),
        p = t(4161),
        n = t(1724);
      function o(e, a) {
        return e < a ? -1 : e > a ? 1 : 0;
      }
      (e.exports = function (e, a, t, o) {
        var r = p(e, t);
        return (
          i(e, a, r, function t(p, n) {
            if (p) {
              o(p, n);
              return;
            }
            if ((r.index++, r.index < (r.keyedList || e).length)) {
              i(e, a, r, t);
              return;
            }
            o(null, r.results);
          }),
          n.bind(r, o)
        );
      }),
        (e.exports.ascending = o),
        (e.exports.descending = function (e, a) {
          return -1 * o(e, a);
        });
    },
    6986: (e, a, t) => {
      var i = t(3837),
        p = t(2781).Stream,
        n = t(2994);
      function o() {
        (this.writable = !1),
          (this.readable = !0),
          (this.dataSize = 0),
          (this.maxDataSize = 2097152),
          (this.pauseStreams = !0),
          (this._released = !1),
          (this._streams = []),
          (this._currentStream = null),
          (this._insideLoop = !1),
          (this._pendingNext = !1);
      }
      (e.exports = o),
        i.inherits(o, p),
        (o.create = function (e) {
          var a = new this();
          for (var t in (e = e || {})) a[t] = e[t];
          return a;
        }),
        (o.isStreamLike = function (e) {
          return (
            "function" != typeof e &&
            "string" != typeof e &&
            "boolean" != typeof e &&
            "number" != typeof e &&
            !Buffer.isBuffer(e)
          );
        }),
        (o.prototype.append = function (e) {
          if (o.isStreamLike(e)) {
            if (!(e instanceof n)) {
              var a = n.create(e, {
                maxDataSize: 1 / 0,
                pauseStream: this.pauseStreams,
              });
              e.on("data", this._checkDataSize.bind(this)), (e = a);
            }
            this._handleErrors(e), this.pauseStreams && e.pause();
          }
          return this._streams.push(e), this;
        }),
        (o.prototype.pipe = function (e, a) {
          return p.prototype.pipe.call(this, e, a), this.resume(), e;
        }),
        (o.prototype._getNext = function () {
          if (((this._currentStream = null), this._insideLoop)) {
            this._pendingNext = !0;
            return;
          }
          this._insideLoop = !0;
          try {
            do (this._pendingNext = !1), this._realGetNext();
            while (this._pendingNext);
          } finally {
            this._insideLoop = !1;
          }
        }),
        (o.prototype._realGetNext = function () {
          var e = this._streams.shift();
          if (void 0 === e) {
            this.end();
            return;
          }
          if ("function" != typeof e) {
            this._pipeNext(e);
            return;
          }
          e(
            function (e) {
              o.isStreamLike(e) &&
                (e.on("data", this._checkDataSize.bind(this)),
                this._handleErrors(e)),
                this._pipeNext(e);
            }.bind(this),
          );
        }),
        (o.prototype._pipeNext = function (e) {
          if (((this._currentStream = e), o.isStreamLike(e))) {
            e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
            return;
          }
          this.write(e), this._getNext();
        }),
        (o.prototype._handleErrors = function (e) {
          var a = this;
          e.on("error", function (e) {
            a._emitError(e);
          });
        }),
        (o.prototype.write = function (e) {
          this.emit("data", e);
        }),
        (o.prototype.pause = function () {
          this.pauseStreams &&
            (this.pauseStreams &&
              this._currentStream &&
              "function" == typeof this._currentStream.pause &&
              this._currentStream.pause(),
            this.emit("pause"));
        }),
        (o.prototype.resume = function () {
          this._released ||
            ((this._released = !0), (this.writable = !0), this._getNext()),
            this.pauseStreams &&
              this._currentStream &&
              "function" == typeof this._currentStream.resume &&
              this._currentStream.resume(),
            this.emit("resume");
        }),
        (o.prototype.end = function () {
          this._reset(), this.emit("end");
        }),
        (o.prototype.destroy = function () {
          this._reset(), this.emit("close");
        }),
        (o.prototype._reset = function () {
          (this.writable = !1),
            (this._streams = []),
            (this._currentStream = null);
        }),
        (o.prototype._checkDataSize = function () {
          if ((this._updateDataSize(), !(this.dataSize <= this.maxDataSize))) {
            var e =
              "DelayedStream#maxDataSize of " +
              this.maxDataSize +
              " bytes exceeded.";
            this._emitError(Error(e));
          }
        }),
        (o.prototype._updateDataSize = function () {
          this.dataSize = 0;
          var e = this;
          this._streams.forEach(function (a) {
            a.dataSize && (e.dataSize += a.dataSize);
          }),
            this._currentStream &&
              this._currentStream.dataSize &&
              (this.dataSize += this._currentStream.dataSize);
        }),
        (o.prototype._emitError = function (e) {
          this._reset(), this.emit("error", e);
        });
    },
    1068: (e, a, t) => {
      let i = t(7962),
        p = i.default || i,
        n = function (e, a) {
          return /^\/\//.test(e) && (e = "https:" + e), p.call(this, e, a);
        };
      (n.ponyfill = !0),
        (e.exports = a = n),
        (a.fetch = n),
        (a.Headers = i.Headers),
        (a.Request = i.Request),
        (a.Response = i.Response),
        (a.default = n);
    },
    2994: (e, a, t) => {
      var i = t(2781).Stream,
        p = t(3837);
      function n() {
        (this.source = null),
          (this.dataSize = 0),
          (this.maxDataSize = 1048576),
          (this.pauseStream = !0),
          (this._maxDataSizeExceeded = !1),
          (this._released = !1),
          (this._bufferedEvents = []);
      }
      (e.exports = n),
        p.inherits(n, i),
        (n.create = function (e, a) {
          var t = new this();
          for (var i in (a = a || {})) t[i] = a[i];
          t.source = e;
          var p = e.emit;
          return (
            (e.emit = function () {
              return t._handleEmit(arguments), p.apply(e, arguments);
            }),
            e.on("error", function () {}),
            t.pauseStream && e.pause(),
            t
          );
        }),
        Object.defineProperty(n.prototype, "readable", {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return this.source.readable;
          },
        }),
        (n.prototype.setEncoding = function () {
          return this.source.setEncoding.apply(this.source, arguments);
        }),
        (n.prototype.resume = function () {
          this._released || this.release(), this.source.resume();
        }),
        (n.prototype.pause = function () {
          this.source.pause();
        }),
        (n.prototype.release = function () {
          (this._released = !0),
            this._bufferedEvents.forEach(
              function (e) {
                this.emit.apply(this, e);
              }.bind(this),
            ),
            (this._bufferedEvents = []);
        }),
        (n.prototype.pipe = function () {
          var e = i.prototype.pipe.apply(this, arguments);
          return this.resume(), e;
        }),
        (n.prototype._handleEmit = function (e) {
          if (this._released) {
            this.emit.apply(this, e);
            return;
          }
          "data" === e[0] &&
            ((this.dataSize += e[1].length),
            this._checkIfMaxDataSizeExceeded()),
            this._bufferedEvents.push(e);
        }),
        (n.prototype._checkIfMaxDataSizeExceeded = function () {
          if (
            !this._maxDataSizeExceeded &&
            !(this.dataSize <= this.maxDataSize)
          ) {
            this._maxDataSizeExceeded = !0;
            var e =
              "DelayedStream#maxDataSize of " +
              this.maxDataSize +
              " bytes exceeded.";
            this.emit("error", Error(e));
          }
        });
    },
    5306: (e, a, t) => {
      var i;
      e.exports = function () {
        if (!i) {
          try {
            i = t(1825)("follow-redirects");
          } catch (e) {}
          "function" != typeof i && (i = function () {});
        }
        i.apply(null, arguments);
      };
    },
    1540: (e, a, t) => {
      var i = t(7310),
        URL = i.URL,
        p = t(3685),
        n = t(5687),
        o = t(2781).Writable,
        r = t(9491),
        s = t(5306),
        d = ["abort", "aborted", "connect", "error", "socket", "timeout"],
        l = Object.create(null);
      d.forEach(function (e) {
        l[e] = function (a, t, i) {
          this._redirectable.emit(e, a, t, i);
        };
      });
      var c = w("ERR_INVALID_URL", "Invalid URL", TypeError),
        u = w("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"),
        m = w(
          "ERR_FR_TOO_MANY_REDIRECTS",
          "Maximum number of redirects exceeded",
        ),
        f = w(
          "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
          "Request body larger than maxBodyLength limit",
        ),
        v = w("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        h = o.prototype.destroy || x;
      function g(e, a) {
        o.call(this),
          this._sanitizeOptions(e),
          (this._options = e),
          (this._ended = !1),
          (this._ending = !1),
          (this._redirectCount = 0),
          (this._redirects = []),
          (this._requestBodyLength = 0),
          (this._requestBodyBuffers = []),
          a && this.on("response", a);
        var t = this;
        (this._onNativeResponse = function (e) {
          t._processResponse(e);
        }),
          this._performRequest();
      }
      function b(e) {
        var a = { maxRedirects: 21, maxBodyLength: 10485760 },
          t = {};
        return (
          Object.keys(e).forEach(function (p) {
            var n = p + ":",
              o = (t[n] = e[p]),
              d = (a[p] = Object.create(o));
            Object.defineProperties(d, {
              request: {
                value: function (e, p, o) {
                  if (E(e)) {
                    var d;
                    try {
                      d = _(new URL(e));
                    } catch (a) {
                      d = i.parse(e);
                    }
                    if (!E(d.protocol)) throw new c({ input: e });
                    e = d;
                  } else
                    URL && e instanceof URL
                      ? (e = _(e))
                      : ((o = p), (p = e), (e = { protocol: n }));
                  return (
                    T(p) && ((o = p), (p = null)),
                    ((p = Object.assign(
                      {
                        maxRedirects: a.maxRedirects,
                        maxBodyLength: a.maxBodyLength,
                      },
                      e,
                      p,
                    )).nativeProtocols = t),
                    E(p.host) || E(p.hostname) || (p.hostname = "::1"),
                    r.equal(p.protocol, n, "protocol mismatch"),
                    s("options", p),
                    new g(p, o)
                  );
                },
                configurable: !0,
                enumerable: !0,
                writable: !0,
              },
              get: {
                value: function (e, a, t) {
                  var i = d.request(e, a, t);
                  return i.end(), i;
                },
                configurable: !0,
                enumerable: !0,
                writable: !0,
              },
            });
          }),
          a
        );
      }
      function x() {}
      function _(e) {
        var a = {
          protocol: e.protocol,
          hostname: e.hostname.startsWith("[")
            ? e.hostname.slice(1, -1)
            : e.hostname,
          hash: e.hash,
          search: e.search,
          pathname: e.pathname,
          path: e.pathname + e.search,
          href: e.href,
        };
        return "" !== e.port && (a.port = Number(e.port)), a;
      }
      function y(e, a) {
        var t;
        for (var i in a) e.test(i) && ((t = a[i]), delete a[i]);
        return null == t ? void 0 : String(t).trim();
      }
      function w(e, a, t) {
        function i(t) {
          Error.captureStackTrace(this, this.constructor),
            Object.assign(this, t || {}),
            (this.code = e),
            (this.message = this.cause ? a + ": " + this.cause.message : a);
        }
        return (
          (i.prototype = new (t || Error)()),
          (i.prototype.constructor = i),
          (i.prototype.name = "Error [" + e + "]"),
          i
        );
      }
      function S(e, a) {
        for (var t of d) e.removeListener(t, l[t]);
        e.on("error", x), e.destroy(a);
      }
      function E(e) {
        return "string" == typeof e || e instanceof String;
      }
      function T(e) {
        return "function" == typeof e;
      }
      (g.prototype = Object.create(o.prototype)),
        (g.prototype.abort = function () {
          S(this._currentRequest),
            this._currentRequest.abort(),
            this.emit("abort");
        }),
        (g.prototype.destroy = function (e) {
          return S(this._currentRequest, e), h.call(this, e), this;
        }),
        (g.prototype.write = function (e, a, t) {
          if (this._ending) throw new v();
          if (!E(e) && !("object" == typeof e && "length" in e))
            throw TypeError("data should be a string, Buffer or Uint8Array");
          if ((T(a) && ((t = a), (a = null)), 0 === e.length)) {
            t && t();
            return;
          }
          this._requestBodyLength + e.length <= this._options.maxBodyLength
            ? ((this._requestBodyLength += e.length),
              this._requestBodyBuffers.push({ data: e, encoding: a }),
              this._currentRequest.write(e, a, t))
            : (this.emit("error", new f()), this.abort());
        }),
        (g.prototype.end = function (e, a, t) {
          if (
            (T(e) ? ((t = e), (e = a = null)) : T(a) && ((t = a), (a = null)),
            e)
          ) {
            var i = this,
              p = this._currentRequest;
            this.write(e, a, function () {
              (i._ended = !0), p.end(null, null, t);
            }),
              (this._ending = !0);
          } else
            (this._ended = this._ending = !0),
              this._currentRequest.end(null, null, t);
        }),
        (g.prototype.setHeader = function (e, a) {
          (this._options.headers[e] = a), this._currentRequest.setHeader(e, a);
        }),
        (g.prototype.removeHeader = function (e) {
          delete this._options.headers[e], this._currentRequest.removeHeader(e);
        }),
        (g.prototype.setTimeout = function (e, a) {
          var t = this;
          function i(a) {
            a.setTimeout(e),
              a.removeListener("timeout", a.destroy),
              a.addListener("timeout", a.destroy);
          }
          function p(a) {
            t._timeout && clearTimeout(t._timeout),
              (t._timeout = setTimeout(function () {
                t.emit("timeout"), n();
              }, e)),
              i(a);
          }
          function n() {
            t._timeout && (clearTimeout(t._timeout), (t._timeout = null)),
              t.removeListener("abort", n),
              t.removeListener("error", n),
              t.removeListener("response", n),
              t.removeListener("close", n),
              a && t.removeListener("timeout", a),
              t.socket || t._currentRequest.removeListener("socket", p);
          }
          return (
            a && this.on("timeout", a),
            this.socket
              ? p(this.socket)
              : this._currentRequest.once("socket", p),
            this.on("socket", i),
            this.on("abort", n),
            this.on("error", n),
            this.on("response", n),
            this.on("close", n),
            this
          );
        }),
        [
          "flushHeaders",
          "getHeader",
          "setNoDelay",
          "setSocketKeepAlive",
        ].forEach(function (e) {
          g.prototype[e] = function (a, t) {
            return this._currentRequest[e](a, t);
          };
        }),
        ["aborted", "connection", "socket"].forEach(function (e) {
          Object.defineProperty(g.prototype, e, {
            get: function () {
              return this._currentRequest[e];
            },
          });
        }),
        (g.prototype._sanitizeOptions = function (e) {
          if (
            (e.headers || (e.headers = {}),
            e.host && (e.hostname || (e.hostname = e.host), delete e.host),
            !e.pathname && e.path)
          ) {
            var a = e.path.indexOf("?");
            a < 0
              ? (e.pathname = e.path)
              : ((e.pathname = e.path.substring(0, a)),
                (e.search = e.path.substring(a)));
          }
        }),
        (g.prototype._performRequest = function () {
          var e = this._options.protocol,
            a = this._options.nativeProtocols[e];
          if (!a) {
            this.emit("error", TypeError("Unsupported protocol " + e));
            return;
          }
          if (this._options.agents) {
            var t = e.slice(0, -1);
            this._options.agent = this._options.agents[t];
          }
          var p = (this._currentRequest = a.request(
            this._options,
            this._onNativeResponse,
          ));
          for (var n of ((p._redirectable = this), d)) p.on(n, l[n]);
          if (
            ((this._currentUrl = /^\//.test(this._options.path)
              ? i.format(this._options)
              : this._options.path),
            this._isRedirect)
          ) {
            var o = 0,
              r = this,
              s = this._requestBodyBuffers;
            !(function e(a) {
              if (p === r._currentRequest) {
                if (a) r.emit("error", a);
                else if (o < s.length) {
                  var t = s[o++];
                  p.finished || p.write(t.data, t.encoding, e);
                } else r._ended && p.end();
              }
            })();
          }
        }),
        (g.prototype._processResponse = function (e) {
          var a,
            t,
            p,
            n,
            o = e.statusCode;
          this._options.trackRedirects &&
            this._redirects.push({
              url: this._currentUrl,
              headers: e.headers,
              statusCode: o,
            });
          var d = e.headers.location;
          if (
            !d ||
            !1 === this._options.followRedirects ||
            o < 300 ||
            o >= 400
          ) {
            (e.responseUrl = this._currentUrl),
              (e.redirects = this._redirects),
              this.emit("response", e),
              (this._requestBodyBuffers = []);
            return;
          }
          if (
            (S(this._currentRequest),
            e.destroy(),
            ++this._redirectCount > this._options.maxRedirects)
          ) {
            this.emit("error", new m());
            return;
          }
          var l = this._options.beforeRedirect;
          l &&
            (p = Object.assign(
              { Host: e.req.getHeader("host") },
              this._options.headers,
            ));
          var c = this._options.method;
          (((301 !== o && 302 !== o) || "POST" !== this._options.method) &&
            (303 !== o || /^(?:GET|HEAD)$/.test(this._options.method))) ||
            ((this._options.method = "GET"),
            (this._requestBodyBuffers = []),
            y(/^content-/i, this._options.headers));
          var f = y(/^host$/i, this._options.headers),
            v = i.parse(this._currentUrl),
            h = f || v.host,
            g = /^\w+:/.test(d)
              ? this._currentUrl
              : i.format(Object.assign(v, { host: h }));
          try {
            n = i.resolve(g, d);
          } catch (e) {
            this.emit("error", new u({ cause: e }));
            return;
          }
          s("redirecting to", n), (this._isRedirect = !0);
          var b = i.parse(n);
          if (
            (Object.assign(this._options, b),
            ((b.protocol === v.protocol || "https:" === b.protocol) &&
              (b.host === h ||
                (r(E((a = b.host)) && E(h)),
                (t = a.length - h.length - 1) > 0 &&
                  "." === a[t] &&
                  a.endsWith(h)))) ||
              y(/^(?:authorization|cookie)$/i, this._options.headers),
            T(l))
          ) {
            var x = { headers: e.headers, statusCode: o },
              _ = { url: g, method: c, headers: p };
            try {
              l(this._options, x, _);
            } catch (e) {
              this.emit("error", e);
              return;
            }
            this._sanitizeOptions(this._options);
          }
          try {
            this._performRequest();
          } catch (e) {
            this.emit("error", new u({ cause: e }));
          }
        }),
        (e.exports = b({ http: p, https: n })),
        (e.exports.wrap = b);
    },
    4080: (e, a, t) => {
      var i = t(6986),
        p = t(3837),
        n = t(1017),
        o = t(3685),
        r = t(5687),
        s = t(7310).parse,
        d = t(7147),
        l = t(2781).Stream,
        c = t(5864),
        u = t(9176),
        m = t(6424);
      function FormData(e) {
        if (!(this instanceof FormData)) return new FormData(e);
        for (var a in ((this._overheadLength = 0),
        (this._valueLength = 0),
        (this._valuesToMeasure = []),
        i.call(this),
        (e = e || {})))
          this[a] = e[a];
      }
      (e.exports = FormData),
        p.inherits(FormData, i),
        (FormData.LINE_BREAK = "\r\n"),
        (FormData.DEFAULT_CONTENT_TYPE = "application/octet-stream"),
        (FormData.prototype.append = function (e, a, t) {
          "string" == typeof (t = t || {}) && (t = { filename: t });
          var n = i.prototype.append.bind(this);
          if (("number" == typeof a && (a = "" + a), p.isArray(a))) {
            this._error(Error("Arrays are not supported."));
            return;
          }
          var o = this._multiPartHeader(e, a, t),
            r = this._multiPartFooter();
          n(o), n(a), n(r), this._trackLength(o, a, t);
        }),
        (FormData.prototype._trackLength = function (e, a, t) {
          var i = 0;
          null != t.knownLength
            ? (i += +t.knownLength)
            : Buffer.isBuffer(a)
              ? (i = a.length)
              : "string" == typeof a && (i = Buffer.byteLength(a)),
            (this._valueLength += i),
            (this._overheadLength +=
              Buffer.byteLength(e) + FormData.LINE_BREAK.length),
            a &&
              (a.path ||
                (a.readable && a.hasOwnProperty("httpVersion")) ||
                a instanceof l) &&
              (t.knownLength || this._valuesToMeasure.push(a));
        }),
        (FormData.prototype._lengthRetriever = function (e, a) {
          e.hasOwnProperty("fd")
            ? void 0 != e.end && e.end != 1 / 0 && void 0 != e.start
              ? a(null, e.end + 1 - (e.start ? e.start : 0))
              : d.stat(e.path, function (t, i) {
                  if (t) {
                    a(t);
                    return;
                  }
                  a(null, i.size - (e.start ? e.start : 0));
                })
            : e.hasOwnProperty("httpVersion")
              ? a(null, +e.headers["content-length"])
              : e.hasOwnProperty("httpModule")
                ? (e.on("response", function (t) {
                    e.pause(), a(null, +t.headers["content-length"]);
                  }),
                  e.resume())
                : a("Unknown stream");
        }),
        (FormData.prototype._multiPartHeader = function (e, a, t) {
          if ("string" == typeof t.header) return t.header;
          var i,
            p = this._getContentDisposition(a, t),
            n = this._getContentType(a, t),
            o = "",
            r = {
              "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(
                p || [],
              ),
              "Content-Type": [].concat(n || []),
            };
          for (var s in ("object" == typeof t.header && m(r, t.header), r))
            if (r.hasOwnProperty(s)) {
              if (null == (i = r[s])) continue;
              Array.isArray(i) || (i = [i]),
                i.length &&
                  (o += s + ": " + i.join("; ") + FormData.LINE_BREAK);
            }
          return (
            "--" +
            this.getBoundary() +
            FormData.LINE_BREAK +
            o +
            FormData.LINE_BREAK
          );
        }),
        (FormData.prototype._getContentDisposition = function (e, a) {
          var t, i;
          return (
            "string" == typeof a.filepath
              ? (t = n.normalize(a.filepath).replace(/\\/g, "/"))
              : a.filename || e.name || e.path
                ? (t = n.basename(a.filename || e.name || e.path))
                : e.readable &&
                  e.hasOwnProperty("httpVersion") &&
                  (t = n.basename(e.client._httpMessage.path || "")),
            t && (i = 'filename="' + t + '"'),
            i
          );
        }),
        (FormData.prototype._getContentType = function (e, a) {
          var t = a.contentType;
          return (
            !t && e.name && (t = c.lookup(e.name)),
            !t && e.path && (t = c.lookup(e.path)),
            !t &&
              e.readable &&
              e.hasOwnProperty("httpVersion") &&
              (t = e.headers["content-type"]),
            !t &&
              (a.filepath || a.filename) &&
              (t = c.lookup(a.filepath || a.filename)),
            t || "object" != typeof e || (t = FormData.DEFAULT_CONTENT_TYPE),
            t
          );
        }),
        (FormData.prototype._multiPartFooter = function () {
          return function (e) {
            var a = FormData.LINE_BREAK;
            0 === this._streams.length && (a += this._lastBoundary()), e(a);
          }.bind(this);
        }),
        (FormData.prototype._lastBoundary = function () {
          return "--" + this.getBoundary() + "--" + FormData.LINE_BREAK;
        }),
        (FormData.prototype.getHeaders = function (e) {
          var a,
            t = {
              "content-type":
                "multipart/form-data; boundary=" + this.getBoundary(),
            };
          for (a in e) e.hasOwnProperty(a) && (t[a.toLowerCase()] = e[a]);
          return t;
        }),
        (FormData.prototype.setBoundary = function (e) {
          this._boundary = e;
        }),
        (FormData.prototype.getBoundary = function () {
          return this._boundary || this._generateBoundary(), this._boundary;
        }),
        (FormData.prototype.getBuffer = function () {
          for (
            var e = new Buffer.alloc(0),
              a = this.getBoundary(),
              t = 0,
              i = this._streams.length;
            t < i;
            t++
          )
            "function" != typeof this._streams[t] &&
              ((e = Buffer.isBuffer(this._streams[t])
                ? Buffer.concat([e, this._streams[t]])
                : Buffer.concat([e, Buffer.from(this._streams[t])])),
              ("string" != typeof this._streams[t] ||
                this._streams[t].substring(2, a.length + 2) !== a) &&
                (e = Buffer.concat([e, Buffer.from(FormData.LINE_BREAK)])));
          return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
        }),
        (FormData.prototype._generateBoundary = function () {
          for (var e = "--------------------------", a = 0; a < 24; a++)
            e += Math.floor(10 * Math.random()).toString(16);
          this._boundary = e;
        }),
        (FormData.prototype.getLengthSync = function () {
          var e = this._overheadLength + this._valueLength;
          return (
            this._streams.length && (e += this._lastBoundary().length),
            this.hasKnownLength() ||
              this._error(
                Error("Cannot calculate proper length in synchronous way."),
              ),
            e
          );
        }),
        (FormData.prototype.hasKnownLength = function () {
          var e = !0;
          return this._valuesToMeasure.length && (e = !1), e;
        }),
        (FormData.prototype.getLength = function (e) {
          var a = this._overheadLength + this._valueLength;
          if (
            (this._streams.length && (a += this._lastBoundary().length),
            !this._valuesToMeasure.length)
          ) {
            process.nextTick(e.bind(this, null, a));
            return;
          }
          u.parallel(
            this._valuesToMeasure,
            this._lengthRetriever,
            function (t, i) {
              if (t) {
                e(t);
                return;
              }
              i.forEach(function (e) {
                a += e;
              }),
                e(null, a);
            },
          );
        }),
        (FormData.prototype.submit = function (e, a) {
          var t,
            i,
            p = { method: "post" };
          return (
            "string" == typeof e
              ? (i = m(
                  {
                    port: (e = s(e)).port,
                    path: e.pathname,
                    host: e.hostname,
                    protocol: e.protocol,
                  },
                  p,
                ))
              : (i = m(e, p)).port ||
                (i.port = "https:" == i.protocol ? 443 : 80),
            (i.headers = this.getHeaders(e.headers)),
            (t = "https:" == i.protocol ? r.request(i) : o.request(i)),
            this.getLength(
              function (e, i) {
                if (e && "Unknown stream" !== e) {
                  this._error(e);
                  return;
                }
                if ((i && t.setHeader("Content-Length", i), this.pipe(t), a)) {
                  var p,
                    n = function (e, i) {
                      return (
                        t.removeListener("error", n),
                        t.removeListener("response", p),
                        a.call(this, e, i)
                      );
                    };
                  (p = n.bind(this, null)),
                    t.on("error", n),
                    t.on("response", p);
                }
              }.bind(this),
            ),
            t
          );
        }),
        (FormData.prototype._error = function (e) {
          this.error || ((this.error = e), this.pause(), this.emit("error", e));
        }),
        (FormData.prototype.toString = function () {
          return "[object FormData]";
        });
    },
    6424: (e) => {
      e.exports = function (e, a) {
        return (
          Object.keys(a).forEach(function (t) {
            e[t] = e[t] || a[t];
          }),
          e
        );
      };
    },
    5586: (e, a, t) => {
      global.FormData = t(9415);
    },
    9415: (e, a, t) => {
      var i = t(6986),
        p = t(3837),
        n = t(1017),
        o = t(3685),
        r = t(5687),
        s = t(7310).parse,
        d = t(7147),
        l = t(5864),
        c = t(9176),
        u = t(6685);
      function FormData(e) {
        if (!(this instanceof FormData)) return new FormData();
        for (var a in ((this._overheadLength = 0),
        (this._valueLength = 0),
        (this._valuesToMeasure = []),
        i.call(this),
        (e = e || {})))
          this[a] = e[a];
      }
      (e.exports = FormData),
        p.inherits(FormData, i),
        (FormData.LINE_BREAK = "\r\n"),
        (FormData.DEFAULT_CONTENT_TYPE = "application/octet-stream"),
        (FormData.prototype.append = function (e, a, t) {
          "string" == typeof (t = t || {}) && (t = { filename: t });
          var n = i.prototype.append.bind(this);
          if (("number" == typeof a && (a = "" + a), p.isArray(a))) {
            this._error(Error("Arrays are not supported."));
            return;
          }
          var o = this._multiPartHeader(e, a, t),
            r = this._multiPartFooter();
          n(o), n(a), n(r), this._trackLength(o, a, t);
        }),
        (FormData.prototype._trackLength = function (e, a, t) {
          var i = 0;
          null != t.knownLength
            ? (i += +t.knownLength)
            : Buffer.isBuffer(a)
              ? (i = a.length)
              : "string" == typeof a && (i = Buffer.byteLength(a)),
            (this._valueLength += i),
            (this._overheadLength +=
              Buffer.byteLength(e) + FormData.LINE_BREAK.length),
            a &&
              (a.path || (a.readable && a.hasOwnProperty("httpVersion"))) &&
              (t.knownLength || this._valuesToMeasure.push(a));
        }),
        (FormData.prototype._lengthRetriever = function (e, a) {
          e.hasOwnProperty("fd")
            ? void 0 != e.end && e.end != 1 / 0 && void 0 != e.start
              ? a(null, e.end + 1 - (e.start ? e.start : 0))
              : d.stat(e.path, function (t, i) {
                  if (t) {
                    a(t);
                    return;
                  }
                  a(null, i.size - (e.start ? e.start : 0));
                })
            : e.hasOwnProperty("httpVersion")
              ? a(null, +e.headers["content-length"])
              : e.hasOwnProperty("httpModule")
                ? (e.on("response", function (t) {
                    e.pause(), a(null, +t.headers["content-length"]);
                  }),
                  e.resume())
                : a("Unknown stream");
        }),
        (FormData.prototype._multiPartHeader = function (e, a, t) {
          if ("string" == typeof t.header) return t.header;
          var i,
            p = this._getContentDisposition(a, t),
            n = this._getContentType(a, t),
            o = "",
            r = {
              "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(
                p || [],
              ),
              "Content-Type": [].concat(n || []),
            };
          for (var s in ("object" == typeof t.header && u(r, t.header), r))
            if (r.hasOwnProperty(s)) {
              if (null == (i = r[s])) continue;
              Array.isArray(i) || (i = [i]),
                i.length &&
                  (o += s + ": " + i.join("; ") + FormData.LINE_BREAK);
            }
          return (
            "--" +
            this.getBoundary() +
            FormData.LINE_BREAK +
            o +
            FormData.LINE_BREAK
          );
        }),
        (FormData.prototype._getContentDisposition = function (e, a) {
          var t, i;
          return (
            "string" == typeof a.filepath
              ? (t = n.normalize(a.filepath).replace(/\\/g, "/"))
              : a.filename || e.name || e.path
                ? (t = n.basename(a.filename || e.name || e.path))
                : e.readable &&
                  e.hasOwnProperty("httpVersion") &&
                  (t = n.basename(e.client._httpMessage.path || "")),
            t && (i = 'filename="' + t + '"'),
            i
          );
        }),
        (FormData.prototype._getContentType = function (e, a) {
          var t = a.contentType;
          return (
            !t && e.name && (t = l.lookup(e.name)),
            !t && e.path && (t = l.lookup(e.path)),
            !t &&
              e.readable &&
              e.hasOwnProperty("httpVersion") &&
              (t = e.headers["content-type"]),
            !t &&
              (a.filepath || a.filename) &&
              (t = l.lookup(a.filepath || a.filename)),
            t || "object" != typeof e || (t = FormData.DEFAULT_CONTENT_TYPE),
            t
          );
        }),
        (FormData.prototype._multiPartFooter = function () {
          return function (e) {
            var a = FormData.LINE_BREAK;
            0 === this._streams.length && (a += this._lastBoundary()), e(a);
          }.bind(this);
        }),
        (FormData.prototype._lastBoundary = function () {
          return "--" + this.getBoundary() + "--" + FormData.LINE_BREAK;
        }),
        (FormData.prototype.getHeaders = function (e) {
          var a,
            t = {
              "content-type":
                "multipart/form-data; boundary=" + this.getBoundary(),
            };
          for (a in e) e.hasOwnProperty(a) && (t[a.toLowerCase()] = e[a]);
          return t;
        }),
        (FormData.prototype.getBoundary = function () {
          return this._boundary || this._generateBoundary(), this._boundary;
        }),
        (FormData.prototype.getBuffer = function () {
          for (
            var e = new Buffer.alloc(0),
              a = this.getBoundary(),
              t = 0,
              i = this._streams.length;
            t < i;
            t++
          )
            "function" != typeof this._streams[t] &&
              ((e = Buffer.isBuffer(this._streams[t])
                ? Buffer.concat([e, this._streams[t]])
                : Buffer.concat([e, Buffer.from(this._streams[t])])),
              ("string" != typeof this._streams[t] ||
                this._streams[t].substring(2, a.length + 2) !== a) &&
                (e = Buffer.concat([e, Buffer.from(FormData.LINE_BREAK)])));
          return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
        }),
        (FormData.prototype._generateBoundary = function () {
          for (var e = "--------------------------", a = 0; a < 24; a++)
            e += Math.floor(10 * Math.random()).toString(16);
          this._boundary = e;
        }),
        (FormData.prototype.getLengthSync = function () {
          var e = this._overheadLength + this._valueLength;
          return (
            this._streams.length && (e += this._lastBoundary().length),
            this.hasKnownLength() ||
              this._error(
                Error("Cannot calculate proper length in synchronous way."),
              ),
            e
          );
        }),
        (FormData.prototype.hasKnownLength = function () {
          var e = !0;
          return this._valuesToMeasure.length && (e = !1), e;
        }),
        (FormData.prototype.getLength = function (e) {
          var a = this._overheadLength + this._valueLength;
          if (
            (this._streams.length && (a += this._lastBoundary().length),
            !this._valuesToMeasure.length)
          ) {
            process.nextTick(e.bind(this, null, a));
            return;
          }
          c.parallel(
            this._valuesToMeasure,
            this._lengthRetriever,
            function (t, i) {
              if (t) {
                e(t);
                return;
              }
              i.forEach(function (e) {
                a += e;
              }),
                e(null, a);
            },
          );
        }),
        (FormData.prototype.submit = function (e, a) {
          var t,
            i,
            p = { method: "post" };
          return (
            "string" == typeof e
              ? (i = u(
                  {
                    port: (e = s(e)).port,
                    path: e.pathname,
                    host: e.hostname,
                    protocol: e.protocol,
                  },
                  p,
                ))
              : (i = u(e, p)).port ||
                (i.port = "https:" == i.protocol ? 443 : 80),
            (i.headers = this.getHeaders(e.headers)),
            (t = "https:" == i.protocol ? r.request(i) : o.request(i)),
            this.getLength(
              function (e, i) {
                if (e) {
                  this._error(e);
                  return;
                }
                t.setHeader("Content-Length", i),
                  this.pipe(t),
                  a && (t.on("error", a), t.on("response", a.bind(this, null)));
              }.bind(this),
            ),
            t
          );
        }),
        (FormData.prototype._error = function (e) {
          this.error || ((this.error = e), this.pause(), this.emit("error", e));
        }),
        (FormData.prototype.toString = function () {
          return "[object FormData]";
        });
    },
    6685: (e) => {
      e.exports = function (e, a) {
        return (
          Object.keys(a).forEach(function (t) {
            e[t] = e[t] || a[t];
          }),
          e
        );
      };
    },
    9273: (e, a, t) => {
      /*!
       * mime-db
       * Copyright(c) 2014 Jonathan Ong
       * Copyright(c) 2015-2022 Douglas Christopher Wilson
       * MIT Licensed
       */ e.exports = t(572);
    },
    5864: (e, a, t) => {
      /*!
       * mime-types
       * Copyright(c) 2014 Jonathan Ong
       * Copyright(c) 2015 Douglas Christopher Wilson
       * MIT Licensed
       */ var i = t(9273),
        p = t(1017).extname,
        n = /^\s*([^;\s]*)(?:;|\s|$)/,
        o = /^text\//i;
      function r(e) {
        if (!e || "string" != typeof e) return !1;
        var a = n.exec(e),
          t = a && i[a[1].toLowerCase()];
        return t && t.charset ? t.charset : !!(a && o.test(a[1])) && "UTF-8";
      }
      (a.charset = r),
        (a.charsets = { lookup: r }),
        (a.contentType = function (e) {
          if (!e || "string" != typeof e) return !1;
          var t = -1 === e.indexOf("/") ? a.lookup(e) : e;
          if (!t) return !1;
          if (-1 === t.indexOf("charset")) {
            var i = a.charset(t);
            i && (t += "; charset=" + i.toLowerCase());
          }
          return t;
        }),
        (a.extension = function (e) {
          if (!e || "string" != typeof e) return !1;
          var t = n.exec(e),
            i = t && a.extensions[t[1].toLowerCase()];
          return !!i && !!i.length && i[0];
        }),
        (a.extensions = Object.create(null)),
        (a.lookup = function (e) {
          if (!e || "string" != typeof e) return !1;
          var t = p("x." + e)
            .toLowerCase()
            .substr(1);
          return !!t && (a.types[t] || !1);
        }),
        (a.types = Object.create(null)),
        (function (e, a) {
          var t = ["nginx", "apache", void 0, "iana"];
          Object.keys(i).forEach(function (p) {
            var n = i[p],
              o = n.extensions;
            if (o && o.length) {
              e[p] = o;
              for (var r = 0; r < o.length; r++) {
                var s = o[r];
                if (a[s]) {
                  var d = t.indexOf(i[a[s]].source),
                    l = t.indexOf(n.source);
                  if (
                    "application/octet-stream" !== a[s] &&
                    (d > l ||
                      (d === l && "application/" === a[s].substr(0, 12)))
                  )
                    continue;
                }
                a[s] = p;
              }
            }
          });
        })(a.extensions, a.types);
    },
    216: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "addBasePath", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = t(1124),
        p = t(2038);
      function n(e, a) {
        return (0, p.normalizePathTrailingSlash)((0, i.addPathPrefix)(e, ""));
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5922: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "addLocale", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        t(2038);
      let i = function (e) {
        for (
          var a = arguments.length, t = Array(a > 1 ? a - 1 : 0), i = 1;
          i < a;
          i++
        )
          t[i - 1] = arguments[i];
        return e;
      };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    2377: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "callServer", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(3579);
      async function p(e, a) {
        let t = (0, i.getServerActionDispatcher)();
        if (!t) throw Error("Invariant: missing action dispatcher.");
        return new Promise((i, p) => {
          t({ actionId: e, actionArgs: a, resolve: i, reject: p });
        });
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    2438: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "AppRouterAnnouncer", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let i = t(4218),
        p = t(3638),
        n = "next-route-announcer";
      function o(e) {
        let { tree: a } = e,
          [t, o] = (0, i.useState)(null);
        (0, i.useEffect)(() => {
          let e = (function () {
            var e;
            let a = document.getElementsByName(n)[0];
            if (
              null == a
                ? void 0
                : null == (e = a.shadowRoot)
                  ? void 0
                  : e.childNodes[0]
            )
              return a.shadowRoot.childNodes[0];
            {
              let e = document.createElement(n);
              e.style.cssText = "position:absolute";
              let a = document.createElement("div");
              (a.ariaLive = "assertive"),
                (a.id = "__next-route-announcer__"),
                (a.role = "alert"),
                (a.style.cssText =
                  "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal");
              let t = e.attachShadow({ mode: "open" });
              return t.appendChild(a), document.body.appendChild(e), a;
            }
          })();
          return (
            o(e),
            () => {
              let e = document.getElementsByTagName(n)[0];
              (null == e ? void 0 : e.isConnected) &&
                document.body.removeChild(e);
            }
          );
        }, []);
        let [r, s] = (0, i.useState)(""),
          d = (0, i.useRef)();
        return (
          (0, i.useEffect)(() => {
            let e = "";
            if (document.title) e = document.title;
            else {
              let a = document.querySelector("h1");
              a && (e = a.innerText || a.textContent || "");
            }
            void 0 !== d.current && d.current !== e && s(e), (d.current = e);
          }, [a]),
          t ? (0, p.createPortal)(r, t) : null
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    7328: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          RSC_HEADER: function () {
            return t;
          },
          ACTION: function () {
            return i;
          },
          NEXT_ROUTER_STATE_TREE: function () {
            return p;
          },
          NEXT_ROUTER_PREFETCH_HEADER: function () {
            return n;
          },
          NEXT_URL: function () {
            return o;
          },
          RSC_CONTENT_TYPE_HEADER: function () {
            return r;
          },
          RSC_VARY_HEADER: function () {
            return s;
          },
          FLIGHT_PARAMETERS: function () {
            return d;
          },
          NEXT_RSC_UNION_QUERY: function () {
            return l;
          },
        });
      let t = "RSC",
        i = "Next-Action",
        p = "Next-Router-State-Tree",
        n = "Next-Router-Prefetch",
        o = "Next-Url",
        r = "text/x-component",
        s = t + ", " + p + ", " + n + ", " + o,
        d = [[t], [p], [n]],
        l = "_rsc";
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3579: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          getServerActionDispatcher: function () {
            return S;
          },
          urlToUrlWithoutFlightMarker: function () {
            return T;
          },
          createEmptyCacheNode: function () {
            return O;
          },
          default: function () {
            return j;
          },
        });
      let i = t(2212),
        p = i._(t(4218)),
        n = t(9236),
        o = t(2247),
        r = t(9286),
        s = t(5075),
        d = t(6320),
        l = t(619),
        c = t(3980),
        u = t(6040),
        m = t(216),
        f = t(2438),
        v = t(3825),
        h = t(8281),
        g = t(6631),
        b = t(7328),
        x = t(8128),
        _ = t(8423),
        y = null,
        w = null;
      function S() {
        return w;
      }
      let E = {};
      function T(e) {
        let a = new URL(e, location.origin);
        return a.searchParams.delete(b.NEXT_RSC_UNION_QUERY), a;
      }
      function N(e) {
        return e.origin !== window.location.origin;
      }
      function R(e) {
        let { tree: a, pushRef: t, canonicalUrl: i, sync: n } = e;
        return (
          (0, p.useInsertionEffect)(() => {
            let e = { __NA: !0, tree: a };
            t.pendingPush &&
            (0, r.createHrefFromUrl)(new URL(window.location.href)) !== i
              ? ((t.pendingPush = !1), window.history.pushState(e, "", i))
              : window.history.replaceState(e, "", i),
              n();
          }, [a, t, i, n]),
          null
        );
      }
      let O = () => ({
        status: n.CacheStates.LAZY_INITIALIZED,
        data: null,
        subTreeData: null,
        parallelRoutes: new Map(),
      });
      function P(e) {
        let {
            buildId: a,
            initialHead: t,
            initialTree: i,
            initialCanonicalUrl: r,
            children: l,
            assetPrefix: b,
          } = e,
          S = (0, p.useMemo)(
            () =>
              (0, c.createInitialRouterState)({
                buildId: a,
                children: l,
                initialCanonicalUrl: r,
                initialTree: i,
                initialParallelRoutes: y,
                isServer: !0,
                location: null,
                initialHead: t,
              }),
            [a, l, r, i, t],
          ),
          [T, P, j] = (0, d.useReducerWithReduxDevtools)(S);
        (0, p.useEffect)(() => {
          y = null;
        }, []);
        let { canonicalUrl: D } = (0, d.useUnwrapState)(T),
          { searchParams: A, pathname: C } = (0, p.useMemo)(() => {
            let e = new URL(D, "http://n");
            return {
              searchParams: e.searchParams,
              pathname: (0, _.hasBasePath)(e.pathname)
                ? (0, x.removeBasePath)(e.pathname)
                : e.pathname,
            };
          }, [D]),
          M = (0, p.useCallback)(
            (e, a, t) => {
              (0, p.startTransition)(() => {
                P({
                  type: o.ACTION_SERVER_PATCH,
                  flightData: a,
                  previousTree: e,
                  overrideCanonicalUrl: t,
                  cache: O(),
                  mutable: {},
                });
              });
            },
            [P],
          ),
          I = (0, p.useCallback)(
            (e, a, t, i) => {
              let p = new URL((0, m.addBasePath)(e), location.href);
              return P({
                type: o.ACTION_NAVIGATE,
                url: p,
                isExternalUrl: N(p),
                locationSearch: location.search,
                forceOptimisticNavigation: t,
                shouldScroll: null == i || i,
                navigateType: a,
                cache: O(),
                mutable: {},
              });
            },
            [P],
          );
        !(function (e) {
          let a = (0, p.useCallback)(
            (a) => {
              (0, p.startTransition)(() => {
                e({
                  ...a,
                  type: o.ACTION_SERVER_ACTION,
                  mutable: {},
                  cache: O(),
                });
              });
            },
            [e],
          );
          w = a;
        })(P);
        let k = (0, p.useMemo)(() => {
          let e = {
            back: () => window.history.back(),
            forward: () => window.history.forward(),
            prefetch: (e, a) => {
              if ((0, u.isBot)(window.navigator.userAgent)) return;
              let t = new URL((0, m.addBasePath)(e), location.href);
              N(t) ||
                (0, p.startTransition)(() => {
                  var e;
                  P({
                    type: o.ACTION_PREFETCH,
                    url: t,
                    kind:
                      null != (e = null == a ? void 0 : a.kind)
                        ? e
                        : o.PrefetchKind.FULL,
                  });
                });
            },
            replace: (e, a) => {
              void 0 === a && (a = {}),
                (0, p.startTransition)(() => {
                  var t;
                  I(
                    e,
                    "replace",
                    !!a.forceOptimisticNavigation,
                    null == (t = a.scroll) || t,
                  );
                });
            },
            push: (e, a) => {
              void 0 === a && (a = {}),
                (0, p.startTransition)(() => {
                  var t;
                  I(
                    e,
                    "push",
                    !!a.forceOptimisticNavigation,
                    null == (t = a.scroll) || t,
                  );
                });
            },
            refresh: () => {
              (0, p.startTransition)(() => {
                P({
                  type: o.ACTION_REFRESH,
                  cache: O(),
                  mutable: {},
                  origin: window.location.origin,
                });
              });
            },
            fastRefresh: () => {
              throw Error(
                "fastRefresh can only be used in development mode. Please use refresh instead.",
              );
            },
          };
          return e;
        }, [P, I]);
        (0, p.useEffect)(() => {
          window.next && (window.next.router = k);
        }, [k]),
          (0, p.useEffect)(() => {
            function e(e) {
              var a;
              e.persisted &&
                (null == (a = window.history.state) ? void 0 : a.tree) &&
                P({
                  type: o.ACTION_RESTORE,
                  url: new URL(window.location.href),
                  tree: window.history.state.tree,
                });
            }
            return (
              window.addEventListener("pageshow", e),
              () => {
                window.removeEventListener("pageshow", e);
              }
            );
          }, [P]);
        let { pushRef: V } = (0, d.useUnwrapState)(T);
        if (V.mpaNavigation) {
          if (E.pendingMpaPath !== D) {
            let e = window.location;
            V.pendingPush ? e.assign(D) : e.replace(D), (E.pendingMpaPath = D);
          }
          (0, p.use)((0, g.createInfinitePromise)());
        }
        let L = (0, p.useCallback)(
          (e) => {
            let { state: a } = e;
            if (a) {
              if (!a.__NA) {
                window.location.reload();
                return;
              }
              (0, p.startTransition)(() => {
                P({
                  type: o.ACTION_RESTORE,
                  url: new URL(window.location.href),
                  tree: a.tree,
                });
              });
            }
          },
          [P],
        );
        (0, p.useEffect)(
          () => (
            window.addEventListener("popstate", L),
            () => {
              window.removeEventListener("popstate", L);
            }
          ),
          [L],
        );
        let {
            cache: U,
            tree: B,
            nextUrl: F,
            focusAndScrollRef: q,
          } = (0, d.useUnwrapState)(T),
          z = (0, p.useMemo)(() => (0, h.findHeadInCache)(U, B[1]), [U, B]),
          H = p.default.createElement(
            v.RedirectBoundary,
            null,
            z,
            U.subTreeData,
            p.default.createElement(f.AppRouterAnnouncer, { tree: B }),
          );
        return p.default.createElement(
          p.default.Fragment,
          null,
          p.default.createElement(R, {
            tree: B,
            pushRef: V,
            canonicalUrl: D,
            sync: j,
          }),
          p.default.createElement(
            s.PathnameContext.Provider,
            { value: C },
            p.default.createElement(
              s.SearchParamsContext.Provider,
              { value: A },
              p.default.createElement(
                n.GlobalLayoutRouterContext.Provider,
                {
                  value: {
                    buildId: a,
                    changeByServerResponse: M,
                    tree: B,
                    focusAndScrollRef: q,
                    nextUrl: F,
                  },
                },
                p.default.createElement(
                  n.AppRouterContext.Provider,
                  { value: k },
                  p.default.createElement(
                    n.LayoutRouterContext.Provider,
                    {
                      value: { childNodes: U.parallelRoutes, tree: B, url: D },
                    },
                    H,
                  ),
                ),
              ),
            ),
          ),
        );
      }
      function j(e) {
        let { globalErrorComponent: a, ...t } = e;
        return p.default.createElement(
          l.ErrorBoundary,
          { errorComponent: a },
          p.default.createElement(P, t),
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    1720: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "bailoutToClientRendering", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = t(5158),
        p = t(4749);
      function n() {
        let e = p.staticGenerationAsyncStorage.getStore();
        return (
          (null != e && !!e.forceStatic) ||
          ((null == e ? void 0 : e.isStaticGeneration) &&
            (0, i.throwWithNoSSR)(),
          !1)
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5523: (e, a, t) => {
      function i(e) {}
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "clientHookInServerComponentError", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        t(143),
        t(4218),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    619: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          ErrorBoundaryHandler: function () {
            return s;
          },
          GlobalError: function () {
            return d;
          },
          default: function () {
            return l;
          },
          ErrorBoundary: function () {
            return c;
          },
        });
      let i = t(143),
        p = i._(t(4218)),
        n = t(7804),
        o = {
          error: {
            fontFamily:
              'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          text: {
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "28px",
            margin: "0 8px",
          },
        };
      function r(e) {
        let { error: a } = e;
        if ("function" == typeof fetch.__nextGetStaticStore) {
          var t;
          let e =
            null == (t = fetch.__nextGetStaticStore()) ? void 0 : t.getStore();
          if (
            (null == e ? void 0 : e.isRevalidate) ||
            (null == e ? void 0 : e.isStaticGeneration)
          )
            throw (console.error(a), a);
        }
        return null;
      }
      class s extends p.default.Component {
        static getDerivedStateFromError(e) {
          return { error: e };
        }
        static getDerivedStateFromProps(e, a) {
          return e.pathname !== a.previousPathname && a.error
            ? { error: null, previousPathname: e.pathname }
            : { error: a.error, previousPathname: e.pathname };
        }
        render() {
          return this.state.error
            ? p.default.createElement(
                p.default.Fragment,
                null,
                p.default.createElement(r, { error: this.state.error }),
                this.props.errorStyles,
                this.props.errorScripts,
                p.default.createElement(this.props.errorComponent, {
                  error: this.state.error,
                  reset: this.reset,
                }),
              )
            : this.props.children;
        }
        constructor(e) {
          super(e),
            (this.reset = () => {
              this.setState({ error: null });
            }),
            (this.state = {
              error: null,
              previousPathname: this.props.pathname,
            });
        }
      }
      function d(e) {
        let { error: a } = e,
          t = null == a ? void 0 : a.digest;
        return p.default.createElement(
          "html",
          { id: "__next_error__" },
          p.default.createElement("head", null),
          p.default.createElement(
            "body",
            null,
            p.default.createElement(r, { error: a }),
            p.default.createElement(
              "div",
              { style: o.error },
              p.default.createElement(
                "div",
                null,
                p.default.createElement(
                  "h2",
                  { style: o.text },
                  "Application error: a " +
                    (t ? "server" : "client") +
                    "-side exception has occurred (see the " +
                    (t ? "server logs" : "browser console") +
                    " for more information).",
                ),
                t
                  ? p.default.createElement(
                      "p",
                      { style: o.text },
                      "Digest: " + t,
                    )
                  : null,
              ),
            ),
          ),
        );
      }
      let l = d;
      function c(e) {
        let {
            errorComponent: a,
            errorStyles: t,
            errorScripts: i,
            children: o,
          } = e,
          r = (0, n.usePathname)();
        return a
          ? p.default.createElement(
              s,
              {
                pathname: r,
                errorComponent: a,
                errorStyles: t,
                errorScripts: i,
              },
              o,
            )
          : p.default.createElement(p.default.Fragment, null, o);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5432: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          DYNAMIC_ERROR_CODE: function () {
            return t;
          },
          DynamicServerError: function () {
            return i;
          },
        });
      let t = "DYNAMIC_SERVER_USAGE";
      class i extends Error {
        constructor(e) {
          super("Dynamic server usage: " + e), (this.digest = t);
        }
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    6631: (e, a) => {
      let t;
      function i() {
        return t || (t = new Promise(() => {})), t;
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createInfinitePromise", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    1459: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "default", {
          enumerable: !0,
          get: function () {
            return w;
          },
        }),
        t(143);
      let i = t(2212),
        p = i._(t(4218));
      t(3638);
      let n = t(9236),
        o = t(5400),
        r = t(6631),
        s = t(619),
        d = t(765),
        l = t(5244),
        c = t(3825),
        u = t(3456),
        m = t(2888),
        f = t(3075),
        v = t(3142),
        h = ["bottom", "height", "left", "right", "top", "width", "x", "y"];
      function g(e, a) {
        let t = e.getBoundingClientRect();
        return t.top >= 0 && t.top <= a;
      }
      class b extends p.default.Component {
        componentDidMount() {
          this.handlePotentialScroll();
        }
        componentDidUpdate() {
          this.props.focusAndScrollRef.apply && this.handlePotentialScroll();
        }
        render() {
          return this.props.children;
        }
        constructor(...e) {
          super(...e),
            (this.handlePotentialScroll = () => {
              let { focusAndScrollRef: e, segmentPath: a } = this.props;
              if (e.apply) {
                if (
                  0 !== e.segmentPaths.length &&
                  !e.segmentPaths.some((e) =>
                    a.every((a, t) => (0, d.matchSegment)(a, e[t])),
                  )
                )
                  return;
                let t = null,
                  i = e.hashFragment;
                if (
                  (i &&
                    (t = (function (e) {
                      var a;
                      return "top" === e
                        ? document.body
                        : null != (a = document.getElementById(e))
                          ? a
                          : document.getElementsByName(e)[0];
                    })(i)),
                  !t && (t = null),
                  !(t instanceof Element))
                )
                  return;
                for (
                  ;
                  !(t instanceof HTMLElement) ||
                  (function (e) {
                    if (
                      ["sticky", "fixed"].includes(getComputedStyle(e).position)
                    )
                      return !0;
                    let a = e.getBoundingClientRect();
                    return h.every((e) => 0 === a[e]);
                  })(t);

                ) {
                  if (null === t.nextElementSibling) return;
                  t = t.nextElementSibling;
                }
                (e.apply = !1),
                  (e.hashFragment = null),
                  (e.segmentPaths = []),
                  (0, l.handleSmoothScroll)(
                    () => {
                      if (i) {
                        t.scrollIntoView();
                        return;
                      }
                      let e = document.documentElement,
                        a = e.clientHeight;
                      !g(t, a) &&
                        ((e.scrollTop = 0), g(t, a) || t.scrollIntoView());
                    },
                    { dontForceLayout: !0, onlyHashChange: e.onlyHashChange },
                  ),
                  (e.onlyHashChange = !1),
                  t.focus();
              }
            });
        }
      }
      function x(e) {
        let { segmentPath: a, children: t } = e,
          i = (0, p.useContext)(n.GlobalLayoutRouterContext);
        if (!i) throw Error("invariant global layout router not mounted");
        return p.default.createElement(
          b,
          { segmentPath: a, focusAndScrollRef: i.focusAndScrollRef },
          t,
        );
      }
      function _(e) {
        let {
            parallelRouterKey: a,
            url: t,
            childNodes: i,
            childProp: s,
            segmentPath: l,
            tree: c,
            cacheKey: u,
          } = e,
          m = (0, p.useContext)(n.GlobalLayoutRouterContext);
        if (!m) throw Error("invariant global layout router not mounted");
        let { buildId: f, changeByServerResponse: h, tree: g } = m,
          b = i.get(u);
        if (
          (s &&
            null !== s.current &&
            (b
              ? b.status === n.CacheStates.LAZY_INITIALIZED &&
                ((b.status = n.CacheStates.READY), (b.subTreeData = s.current))
              : ((b = {
                  status: n.CacheStates.READY,
                  data: null,
                  subTreeData: s.current,
                  parallelRoutes: new Map(),
                }),
                i.set(u, b))),
          !b || b.status === n.CacheStates.LAZY_INITIALIZED)
        ) {
          let e = (function e(a, t) {
            if (a) {
              let [i, p] = a,
                n = 2 === a.length;
              if ((0, d.matchSegment)(t[0], i) && t[1].hasOwnProperty(p)) {
                if (n) {
                  let a = e(void 0, t[1][p]);
                  return [
                    t[0],
                    { ...t[1], [p]: [a[0], a[1], a[2], "refetch"] },
                  ];
                }
                return [t[0], { ...t[1], [p]: e(a.slice(2), t[1][p]) }];
              }
            }
            return t;
          })(["", ...l], g);
          (b = {
            status: n.CacheStates.DATA_FETCH,
            data: (0, v.createRecordFromThenable)(
              (0, o.fetchServerResponse)(
                new URL(t, location.origin),
                e,
                m.nextUrl,
                f,
              ),
            ),
            subTreeData: null,
            head:
              b && b.status === n.CacheStates.LAZY_INITIALIZED
                ? b.head
                : void 0,
            parallelRoutes:
              b && b.status === n.CacheStates.LAZY_INITIALIZED
                ? b.parallelRoutes
                : new Map(),
          }),
            i.set(u, b);
        }
        if (!b) throw Error("Child node should always exist");
        if (b.subTreeData && b.data)
          throw Error("Child node should not have both subTreeData and data");
        if (b.data) {
          let [e, a] = (0, p.use)(b.data);
          (b.data = null),
            setTimeout(() => {
              (0, p.startTransition)(() => {
                h(g, e, a);
              });
            }),
            (0, p.use)((0, r.createInfinitePromise)());
        }
        b.subTreeData || (0, p.use)((0, r.createInfinitePromise)());
        let x = p.default.createElement(
          n.LayoutRouterContext.Provider,
          { value: { tree: c[1][a], childNodes: b.parallelRoutes, url: t } },
          b.subTreeData,
        );
        return x;
      }
      function y(e) {
        let {
          children: a,
          loading: t,
          loadingStyles: i,
          loadingScripts: n,
          hasLoading: o,
        } = e;
        return o
          ? p.default.createElement(
              p.Suspense,
              {
                fallback: p.default.createElement(
                  p.default.Fragment,
                  null,
                  i,
                  n,
                  t,
                ),
              },
              a,
            )
          : p.default.createElement(p.default.Fragment, null, a);
      }
      function w(e) {
        let {
            parallelRouterKey: a,
            segmentPath: t,
            childProp: i,
            error: o,
            errorStyles: r,
            errorScripts: l,
            templateStyles: v,
            templateScripts: h,
            loading: g,
            loadingStyles: b,
            loadingScripts: w,
            hasLoading: S,
            template: E,
            notFound: T,
            notFoundStyles: N,
            styles: R,
          } = e,
          O = (0, p.useContext)(n.LayoutRouterContext);
        if (!O) throw Error("invariant expected layout router to be mounted");
        let { childNodes: P, tree: j, url: D } = O,
          A = P.get(a);
        A || ((A = new Map()), P.set(a, A));
        let C = j[1][a][0],
          M = i.segment,
          I = (0, m.getSegmentValue)(C),
          k = [C];
        return p.default.createElement(
          p.default.Fragment,
          null,
          R,
          k.map((e) => {
            let R = (0, d.matchSegment)(e, M),
              O = (0, m.getSegmentValue)(e),
              P = (0, f.createRouterCacheKey)(e);
            return p.default.createElement(
              n.TemplateContext.Provider,
              {
                key: (0, f.createRouterCacheKey)(e, !0),
                value: p.default.createElement(
                  x,
                  { segmentPath: t },
                  p.default.createElement(
                    s.ErrorBoundary,
                    { errorComponent: o, errorStyles: r, errorScripts: l },
                    p.default.createElement(
                      y,
                      {
                        hasLoading: S,
                        loading: g,
                        loadingStyles: b,
                        loadingScripts: w,
                      },
                      p.default.createElement(
                        u.NotFoundBoundary,
                        { notFound: T, notFoundStyles: N },
                        p.default.createElement(
                          c.RedirectBoundary,
                          null,
                          p.default.createElement(_, {
                            parallelRouterKey: a,
                            url: D,
                            tree: j,
                            childNodes: A,
                            childProp: R ? i : null,
                            segmentPath: t,
                            cacheKey: P,
                            isActive: I === O,
                          }),
                        ),
                      ),
                    ),
                  ),
                ),
              },
              v,
              h,
              E,
            );
          }),
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    765: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          matchSegment: function () {
            return p;
          },
          canSegmentBeOverridden: function () {
            return n;
          },
        });
      let i = t(799),
        p = (e, a) =>
          "string" == typeof e
            ? "string" == typeof a && e === a
            : "string" != typeof a && e[0] === a[0] && e[1] === a[1],
        n = (e, a) => {
          var t;
          return (
            !Array.isArray(e) &&
            !!Array.isArray(a) &&
            (null == (t = (0, i.getSegmentParam)(e)) ? void 0 : t.param) ===
              a[0]
          );
        };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    9686: (e, a) => {
      function t(e, a) {
        if (e.isStaticGeneration && e.experimental.ppr) {
          if (!e.postpone)
            throw Error(
              "Invariant: PPR is enabled but the postpone API is unavailable",
            );
          (e.postponeWasTriggered = !0),
            e.postpone(
              "This page needs to bail out of prerendering at this point because it used " +
                a +
                ". React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error",
            );
        }
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "maybePostpone", {
          enumerable: !0,
          get: function () {
            return t;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    7804: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          ReadonlyURLSearchParams: function () {
            return m;
          },
          useSearchParams: function () {
            return f;
          },
          usePathname: function () {
            return v;
          },
          ServerInsertedHTMLContext: function () {
            return s.ServerInsertedHTMLContext;
          },
          useServerInsertedHTML: function () {
            return s.useServerInsertedHTML;
          },
          useRouter: function () {
            return h;
          },
          useParams: function () {
            return g;
          },
          useSelectedLayoutSegments: function () {
            return b;
          },
          useSelectedLayoutSegment: function () {
            return x;
          },
          redirect: function () {
            return d.redirect;
          },
          permanentRedirect: function () {
            return d.permanentRedirect;
          },
          RedirectType: function () {
            return d.RedirectType;
          },
          notFound: function () {
            return l.notFound;
          },
        });
      let i = t(4218),
        p = t(9236),
        n = t(5075),
        o = t(5523),
        r = t(2888),
        s = t(5853),
        d = t(976),
        l = t(7265),
        c = Symbol("internal for urlsearchparams readonly");
      function u() {
        return Error("ReadonlyURLSearchParams cannot be modified");
      }
      class m {
        [Symbol.iterator]() {
          return this[c][Symbol.iterator]();
        }
        append() {
          throw u();
        }
        delete() {
          throw u();
        }
        set() {
          throw u();
        }
        sort() {
          throw u();
        }
        constructor(e) {
          (this[c] = e),
            (this.entries = e.entries.bind(e)),
            (this.forEach = e.forEach.bind(e)),
            (this.get = e.get.bind(e)),
            (this.getAll = e.getAll.bind(e)),
            (this.has = e.has.bind(e)),
            (this.keys = e.keys.bind(e)),
            (this.values = e.values.bind(e)),
            (this.toString = e.toString.bind(e)),
            (this.size = e.size);
        }
      }
      function f() {
        (0, o.clientHookInServerComponentError)("useSearchParams");
        let e = (0, i.useContext)(n.SearchParamsContext),
          a = (0, i.useMemo)(() => (e ? new m(e) : null), [e]);
        {
          let { bailoutToClientRendering: e } = t(1720);
          e();
        }
        return a;
      }
      function v() {
        return (
          (0, o.clientHookInServerComponentError)("usePathname"),
          (0, i.useContext)(n.PathnameContext)
        );
      }
      function h() {
        (0, o.clientHookInServerComponentError)("useRouter");
        let e = (0, i.useContext)(p.AppRouterContext);
        if (null === e)
          throw Error("invariant expected app router to be mounted");
        return e;
      }
      function g() {
        (0, o.clientHookInServerComponentError)("useParams");
        let e = (0, i.useContext)(p.GlobalLayoutRouterContext),
          a = (0, i.useContext)(n.PathParamsContext);
        return (0, i.useMemo)(
          () =>
            (null == e ? void 0 : e.tree)
              ? (function e(a, t) {
                  void 0 === t && (t = {});
                  let i = a[1];
                  for (let a of Object.values(i)) {
                    let i = a[0],
                      p = Array.isArray(i),
                      n = p ? i[1] : i;
                    if (!n || n.startsWith("__PAGE__")) continue;
                    let o = p && ("c" === i[2] || "oc" === i[2]);
                    o ? (t[i[0]] = i[1].split("/")) : p && (t[i[0]] = i[1]),
                      (t = e(a, t));
                  }
                  return t;
                })(e.tree)
              : a,
          [null == e ? void 0 : e.tree, a],
        );
      }
      function b(e) {
        void 0 === e && (e = "children"),
          (0, o.clientHookInServerComponentError)("useSelectedLayoutSegments");
        let { tree: a } = (0, i.useContext)(p.LayoutRouterContext);
        return (function e(a, t, i, p) {
          let n;
          if ((void 0 === i && (i = !0), void 0 === p && (p = []), i))
            n = a[1][t];
          else {
            var o;
            let e = a[1];
            n = null != (o = e.children) ? o : Object.values(e)[0];
          }
          if (!n) return p;
          let s = n[0],
            d = (0, r.getSegmentValue)(s);
          return !d || d.startsWith("__PAGE__")
            ? p
            : (p.push(d), e(n, t, !1, p));
        })(a, e);
      }
      function x(e) {
        void 0 === e && (e = "children"),
          (0, o.clientHookInServerComponentError)("useSelectedLayoutSegment");
        let a = b(e);
        return 0 === a.length ? null : a[0];
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3456: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "NotFoundBoundary", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      let i = t(143),
        p = i._(t(4218)),
        n = t(7804);
      class o extends p.default.Component {
        static getDerivedStateFromError(e) {
          if ((null == e ? void 0 : e.digest) === "NEXT_NOT_FOUND")
            return { notFoundTriggered: !0 };
          throw e;
        }
        static getDerivedStateFromProps(e, a) {
          return e.pathname !== a.previousPathname && a.notFoundTriggered
            ? { notFoundTriggered: !1, previousPathname: e.pathname }
            : {
                notFoundTriggered: a.notFoundTriggered,
                previousPathname: e.pathname,
              };
        }
        render() {
          return this.state.notFoundTriggered
            ? p.default.createElement(
                p.default.Fragment,
                null,
                p.default.createElement("meta", {
                  name: "robots",
                  content: "noindex",
                }),
                !1,
                this.props.notFoundStyles,
                this.props.notFound,
              )
            : this.props.children;
        }
        constructor(e) {
          super(e),
            (this.state = {
              notFoundTriggered: !!e.asNotFound,
              previousPathname: e.pathname,
            });
        }
      }
      function r(e) {
        let { notFound: a, notFoundStyles: t, asNotFound: i, children: r } = e,
          s = (0, n.usePathname)();
        return a
          ? p.default.createElement(
              o,
              { pathname: s, notFound: a, notFoundStyles: t, asNotFound: i },
              r,
            )
          : p.default.createElement(p.default.Fragment, null, r);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    7265: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          notFound: function () {
            return i;
          },
          isNotFoundError: function () {
            return p;
          },
        });
      let t = "NEXT_NOT_FOUND";
      function i() {
        let e = Error(t);
        throw ((e.digest = t), e);
      }
      function p(e) {
        return (null == e ? void 0 : e.digest) === t;
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    527: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "PromiseQueue", {
          enumerable: !0,
          get: function () {
            return d;
          },
        });
      let i = t(51),
        p = t(2581);
      var n = p._("_maxConcurrency"),
        o = p._("_runningCount"),
        r = p._("_queue"),
        s = p._("_processNext");
      class d {
        enqueue(e) {
          let a, t;
          let p = new Promise((e, i) => {
              (a = e), (t = i);
            }),
            n = async () => {
              try {
                i._(this, o)[o]++;
                let t = await e();
                a(t);
              } catch (e) {
                t(e);
              } finally {
                i._(this, o)[o]--, i._(this, s)[s]();
              }
            };
          return (
            i._(this, r)[r].push({ promiseFn: p, task: n }),
            i._(this, s)[s](),
            p
          );
        }
        bump(e) {
          let a = i._(this, r)[r].findIndex((a) => a.promiseFn === e);
          if (a > -1) {
            let e = i._(this, r)[r].splice(a, 1)[0];
            i._(this, r)[r].unshift(e), i._(this, s)[s](!0);
          }
        }
        constructor(e = 5) {
          Object.defineProperty(this, s, { value: l }),
            Object.defineProperty(this, n, { writable: !0, value: void 0 }),
            Object.defineProperty(this, o, { writable: !0, value: void 0 }),
            Object.defineProperty(this, r, { writable: !0, value: void 0 }),
            (i._(this, n)[n] = e),
            (i._(this, o)[o] = 0),
            (i._(this, r)[r] = []);
        }
      }
      function l(e) {
        if (
          (void 0 === e && (e = !1),
          (i._(this, o)[o] < i._(this, n)[n] || e) &&
            i._(this, r)[r].length > 0)
        ) {
          var a;
          null == (a = i._(this, r)[r].shift()) || a.task();
        }
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3825: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          RedirectErrorBoundary: function () {
            return s;
          },
          RedirectBoundary: function () {
            return d;
          },
        });
      let i = t(2212),
        p = i._(t(4218)),
        n = t(7804),
        o = t(976);
      function r(e) {
        let { redirect: a, reset: t, redirectType: i } = e,
          r = (0, n.useRouter)();
        return (
          (0, p.useEffect)(() => {
            p.default.startTransition(() => {
              i === o.RedirectType.push ? r.push(a, {}) : r.replace(a, {}), t();
            });
          }, [a, i, t, r]),
          null
        );
      }
      class s extends p.default.Component {
        static getDerivedStateFromError(e) {
          if ((0, o.isRedirectError)(e)) {
            let a = (0, o.getURLFromRedirectError)(e),
              t = (0, o.getRedirectTypeFromError)(e);
            return { redirect: a, redirectType: t };
          }
          throw e;
        }
        render() {
          let { redirect: e, redirectType: a } = this.state;
          return null !== e && null !== a
            ? p.default.createElement(r, {
                redirect: e,
                redirectType: a,
                reset: () => this.setState({ redirect: null }),
              })
            : this.props.children;
        }
        constructor(e) {
          super(e), (this.state = { redirect: null, redirectType: null });
        }
      }
      function d(e) {
        let { children: a } = e,
          t = (0, n.useRouter)();
        return p.default.createElement(s, { router: t }, a);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    976: (e, a, t) => {
      var i;
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          RedirectType: function () {
            return i;
          },
          getRedirectError: function () {
            return o;
          },
          redirect: function () {
            return r;
          },
          permanentRedirect: function () {
            return s;
          },
          isRedirectError: function () {
            return d;
          },
          getURLFromRedirectError: function () {
            return l;
          },
          getRedirectTypeFromError: function () {
            return c;
          },
        });
      let p = t(5403),
        n = "NEXT_REDIRECT";
      function o(e, a, t) {
        void 0 === t && (t = !1);
        let i = Error(n);
        i.digest = n + ";" + a + ";" + e + ";" + t;
        let o = p.requestAsyncStorage.getStore();
        return o && (i.mutableCookies = o.mutableCookies), i;
      }
      function r(e, a) {
        throw (void 0 === a && (a = "replace"), o(e, a, !1));
      }
      function s(e, a) {
        throw (void 0 === a && (a = "replace"), o(e, a, !0));
      }
      function d(e) {
        if ("string" != typeof (null == e ? void 0 : e.digest)) return !1;
        let [a, t, i, p] = e.digest.split(";", 4);
        return (
          a === n &&
          ("replace" === t || "push" === t) &&
          "string" == typeof i &&
          ("true" === p || "false" === p)
        );
      }
      function l(e) {
        return d(e) ? e.digest.split(";", 3)[2] : null;
      }
      function c(e) {
        if (!d(e)) throw Error("Not a redirect error");
        return e.digest.split(";", 2)[1];
      }
      (function (e) {
        (e.push = "push"), (e.replace = "replace");
      })(i || (i = {})),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    847: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "default", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let i = t(2212),
        p = i._(t(4218)),
        n = t(9236);
      function o() {
        let e = (0, p.useContext)(n.TemplateContext);
        return p.default.createElement(p.default.Fragment, null, e);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8994: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "applyFlightData", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let i = t(9236),
        p = t(5601),
        n = t(6800);
      function o(e, a, t, o) {
        void 0 === o && (o = !1);
        let [r, s, d] = t.slice(-3);
        return (
          null !== s &&
          (3 === t.length
            ? ((a.status = i.CacheStates.READY),
              (a.subTreeData = s),
              (0, p.fillLazyItemsTillLeafWithHead)(a, e, r, d, o))
            : ((a.status = i.CacheStates.READY),
              (a.subTreeData = e.subTreeData),
              (a.parallelRoutes = new Map(e.parallelRoutes)),
              (0, n.fillCacheWithNewSubTreeData)(a, e, t, o)),
          !0)
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    1155: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "applyRouterStatePatchToTree", {
          enumerable: !0,
          get: function () {
            return function e(a, t, n) {
              let o;
              let [r, s, , , d] = t;
              if (1 === a.length) {
                let e = p(t, n);
                return e;
              }
              let [l, c] = a;
              if (!(0, i.matchSegment)(l, r)) return null;
              let u = 2 === a.length;
              if (u) o = p(s[c], n);
              else if (null === (o = e(a.slice(2), s[c], n))) return null;
              let m = [a[0], { ...s, [c]: o }];
              return d && (m[4] = !0), m;
            };
          },
        });
      let i = t(765);
      function p(e, a) {
        let [t, n] = e,
          [o, r] = a;
        if ("__DEFAULT__" === o && "__DEFAULT__" !== t) return e;
        if ((0, i.matchSegment)(t, o)) {
          let a = {};
          for (let e in n) {
            let t = void 0 !== r[e];
            t ? (a[e] = p(n[e], r[e])) : (a[e] = n[e]);
          }
          for (let e in r) a[e] || (a[e] = r[e]);
          let i = [t, a];
          return (
            e[2] && (i[2] = e[2]),
            e[3] && (i[3] = e[3]),
            e[4] && (i[4] = e[4]),
            i
          );
        }
        return a;
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    1705: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          extractPathFromFlightRouterState: function () {
            return d;
          },
          computeChangedPath: function () {
            return l;
          },
        });
      let i = t(5513),
        p = t(1516),
        n = t(765),
        o = (e) => ("/" === e[0] ? e.slice(1) : e),
        r = (e) => ("string" == typeof e ? e : e[1]);
      function s(e) {
        return (
          e.reduce(
            (e, a) =>
              "" === (a = o(a)) || (0, p.isGroupSegment)(a) ? e : e + "/" + a,
            "",
          ) || "/"
        );
      }
      function d(e) {
        var a;
        let t = Array.isArray(e[0]) ? e[0][1] : e[0];
        if (
          "__DEFAULT__" === t ||
          i.INTERCEPTION_ROUTE_MARKERS.some((e) => t.startsWith(e))
        )
          return;
        if (t.startsWith("__PAGE__")) return "";
        let p = [t],
          n = null != (a = e[1]) ? a : {},
          o = n.children ? d(n.children) : void 0;
        if (void 0 !== o) p.push(o);
        else
          for (let [e, a] of Object.entries(n)) {
            if ("children" === e) continue;
            let t = d(a);
            void 0 !== t && p.push(t);
          }
        return s(p);
      }
      function l(e, a) {
        let t = (function e(a, t) {
          let [p, o] = a,
            [s, l] = t,
            c = r(p),
            u = r(s);
          if (
            i.INTERCEPTION_ROUTE_MARKERS.some(
              (e) => c.startsWith(e) || u.startsWith(e),
            )
          )
            return "";
          if (!(0, n.matchSegment)(p, s)) {
            var m;
            return null != (m = d(t)) ? m : "";
          }
          for (let a in o)
            if (l[a]) {
              let t = e(o[a], l[a]);
              if (null !== t) return r(s) + "/" + t;
            }
          return null;
        })(e, a);
        return null == t || "/" === t ? t : s(t.split("/"));
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    9286: (e, a) => {
      function t(e, a) {
        return (
          void 0 === a && (a = !0), e.pathname + e.search + (a ? e.hash : "")
        );
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createHrefFromUrl", {
          enumerable: !0,
          get: function () {
            return t;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    3980: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createInitialRouterState", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      let i = t(9236),
        p = t(9286),
        n = t(5601),
        o = t(1705);
      function r(e) {
        var a;
        let {
            buildId: t,
            initialTree: r,
            children: s,
            initialCanonicalUrl: d,
            initialParallelRoutes: l,
            isServer: c,
            location: u,
            initialHead: m,
          } = e,
          f = {
            status: i.CacheStates.READY,
            data: null,
            subTreeData: s,
            parallelRoutes: c ? new Map() : l,
          };
        return (
          (null === l || 0 === l.size) &&
            (0, n.fillLazyItemsTillLeafWithHead)(f, void 0, r, m),
          {
            buildId: t,
            tree: r,
            cache: f,
            prefetchCache: new Map(),
            pushRef: { pendingPush: !1, mpaNavigation: !1 },
            focusAndScrollRef: {
              apply: !1,
              onlyHashChange: !1,
              hashFragment: null,
              segmentPaths: [],
            },
            canonicalUrl: u ? (0, p.createHrefFromUrl)(u) : d,
            nextUrl:
              null !=
              (a =
                (0, o.extractPathFromFlightRouterState)(r) ||
                (null == u ? void 0 : u.pathname))
                ? a
                : null,
          }
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    9756: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createOptimisticTree", {
          enumerable: !0,
          get: function () {
            return function e(a, t, p) {
              let n;
              let [o, r, s, d, l] = t || [null, {}],
                c = a[0],
                u = 1 === a.length,
                m = null !== o && (0, i.matchSegment)(o, c),
                f = Object.keys(r).length > 1,
                v = !t || !m || f,
                h = {};
              if ((null !== o && m && (h = r), !u && !f)) {
                let t = e(a.slice(1), h ? h.children : null, p || v);
                n = t;
              }
              let g = [c, { ...h, ...(n ? { children: n } : {}) }];
              return (
                s && (g[2] = s),
                !p && v ? (g[3] = "refetch") : m && d && (g[3] = d),
                m && l && (g[4] = l),
                g
              );
            };
          },
        });
      let i = t(765);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3142: (e, a) => {
      function t(e) {
        return (
          (e.status = "pending"),
          e.then(
            (a) => {
              "pending" === e.status &&
                ((e.status = "fulfilled"), (e.value = a));
            },
            (a) => {
              "pending" === e.status &&
                ((e.status = "rejected"), (e.reason = a));
            },
          ),
          e
        );
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createRecordFromThenable", {
          enumerable: !0,
          get: function () {
            return t;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    3075: (e, a) => {
      function t(e, a) {
        return (
          void 0 === a && (a = !1),
          Array.isArray(e)
            ? (e[0] + "|" + e[1] + "|" + e[2]).toLowerCase()
            : a && e.startsWith("__PAGE__")
              ? "__PAGE__"
              : e
        );
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createRouterCacheKey", {
          enumerable: !0,
          get: function () {
            return t;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    5400: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "fetchServerResponse", {
          enumerable: !0,
          get: function () {
            return c;
          },
        });
      let i = t(7328),
        p = t(3579),
        n = t(2377),
        o = t(2247),
        r = t(2948),
        s = t(8130),
        { createFromFetch: d } = t(9530);
      function l(e) {
        return [(0, p.urlToUrlWithoutFlightMarker)(e).toString(), void 0];
      }
      async function c(e, a, t, c, u) {
        let m = {
          [i.RSC_HEADER]: "1",
          [i.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(JSON.stringify(a)),
        };
        u === o.PrefetchKind.AUTO && (m[i.NEXT_ROUTER_PREFETCH_HEADER] = "1"),
          t && (m[i.NEXT_URL] = t);
        let f = (0, r.hexHash)(
          [
            m[i.NEXT_ROUTER_PREFETCH_HEADER] || "0",
            m[i.NEXT_ROUTER_STATE_TREE],
            m[i.NEXT_URL],
          ].join(","),
        );
        try {
          let a = new URL(e);
          a.searchParams.set(i.NEXT_RSC_UNION_QUERY, f);
          let t = await fetch(a, { credentials: "same-origin", headers: m }),
            o = (0, p.urlToUrlWithoutFlightMarker)(t.url),
            r = t.redirected ? o : void 0,
            u = t.headers.get("content-type") || "",
            v = !!t.headers.get(s.NEXT_DID_POSTPONE_HEADER);
          if (u !== i.RSC_CONTENT_TYPE_HEADER || !t.ok)
            return e.hash && (o.hash = e.hash), l(o.toString());
          let [h, g] = await d(Promise.resolve(t), {
            callServer: n.callServer,
          });
          if (c !== h) return l(t.url);
          return [g, r, v];
        } catch (a) {
          return (
            console.error(
              "Failed to fetch RSC payload for " +
                e +
                ". Falling back to browser navigation.",
              a,
            ),
            [e.toString(), void 0]
          );
        }
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5474: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "fillCacheWithDataProperty", {
          enumerable: !0,
          get: function () {
            return function e(a, t, n, o, r) {
              void 0 === r && (r = !1);
              let s = n.length <= 2,
                [d, l] = n,
                c = (0, p.createRouterCacheKey)(l),
                u = t.parallelRoutes.get(d);
              if (!u || (r && t.parallelRoutes.size > 1))
                return { bailOptimistic: !0 };
              let m = a.parallelRoutes.get(d);
              (m && m !== u) || ((m = new Map(u)), a.parallelRoutes.set(d, m));
              let f = u.get(c),
                v = m.get(c);
              if (s) {
                (v && v.data && v !== f) ||
                  m.set(c, {
                    status: i.CacheStates.DATA_FETCH,
                    data: o(),
                    subTreeData: null,
                    parallelRoutes: new Map(),
                  });
                return;
              }
              if (!v || !f) {
                v ||
                  m.set(c, {
                    status: i.CacheStates.DATA_FETCH,
                    data: o(),
                    subTreeData: null,
                    parallelRoutes: new Map(),
                  });
                return;
              }
              return (
                v === f &&
                  ((v = {
                    status: v.status,
                    data: v.data,
                    subTreeData: v.subTreeData,
                    parallelRoutes: new Map(v.parallelRoutes),
                  }),
                  m.set(c, v)),
                e(v, f, n.slice(2), o)
              );
            };
          },
        });
      let i = t(9236),
        p = t(3075);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    6800: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "fillCacheWithNewSubTreeData", {
          enumerable: !0,
          get: function () {
            return function e(a, t, r, s) {
              let d = r.length <= 5,
                [l, c] = r,
                u = (0, o.createRouterCacheKey)(c),
                m = t.parallelRoutes.get(l);
              if (!m) return;
              let f = a.parallelRoutes.get(l);
              (f && f !== m) || ((f = new Map(m)), a.parallelRoutes.set(l, f));
              let v = m.get(u),
                h = f.get(u);
              if (d) {
                (h && h.data && h !== v) ||
                  ((h = {
                    status: i.CacheStates.READY,
                    data: null,
                    subTreeData: r[3],
                    parallelRoutes: v ? new Map(v.parallelRoutes) : new Map(),
                  }),
                  v && (0, p.invalidateCacheByRouterState)(h, v, r[2]),
                  (0, n.fillLazyItemsTillLeafWithHead)(h, v, r[2], r[4], s),
                  f.set(u, h));
                return;
              }
              h &&
                v &&
                (h === v &&
                  ((h = {
                    status: h.status,
                    data: h.data,
                    subTreeData: h.subTreeData,
                    parallelRoutes: new Map(h.parallelRoutes),
                  }),
                  f.set(u, h)),
                e(h, v, r.slice(2), s));
            };
          },
        });
      let i = t(9236),
        p = t(8131),
        n = t(5601),
        o = t(3075);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5601: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "fillLazyItemsTillLeafWithHead", {
          enumerable: !0,
          get: function () {
            return function e(a, t, n, o, r) {
              let s = 0 === Object.keys(n[1]).length;
              if (s) {
                a.head = o;
                return;
              }
              for (let s in n[1]) {
                let d = n[1][s],
                  l = d[0],
                  c = (0, p.createRouterCacheKey)(l);
                if (t) {
                  let p = t.parallelRoutes.get(s);
                  if (p) {
                    let t = new Map(p),
                      n = t.get(c),
                      l =
                        r && n
                          ? {
                              status: n.status,
                              data: n.data,
                              subTreeData: n.subTreeData,
                              parallelRoutes: new Map(n.parallelRoutes),
                            }
                          : {
                              status: i.CacheStates.LAZY_INITIALIZED,
                              data: null,
                              subTreeData: null,
                              parallelRoutes: new Map(
                                null == n ? void 0 : n.parallelRoutes,
                              ),
                            };
                    t.set(c, l), e(l, n, d, o, r), a.parallelRoutes.set(s, t);
                    continue;
                  }
                }
                let u = {
                    status: i.CacheStates.LAZY_INITIALIZED,
                    data: null,
                    subTreeData: null,
                    parallelRoutes: new Map(),
                  },
                  m = a.parallelRoutes.get(s);
                m ? m.set(c, u) : a.parallelRoutes.set(s, new Map([[c, u]])),
                  e(u, void 0, d, o, r);
              }
            };
          },
        });
      let i = t(9236),
        p = t(3075);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3933: (e, a) => {
      var t;
      function i(e) {
        let { kind: a, prefetchTime: t, lastUsedTime: i } = e;
        return Date.now() < (null != i ? i : t) + 3e4
          ? i
            ? "reusable"
            : "fresh"
          : "auto" === a && Date.now() < t + 3e5
            ? "stale"
            : "full" === a && Date.now() < t + 3e5
              ? "reusable"
              : "expired";
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          PrefetchCacheEntryStatus: function () {
            return t;
          },
          getPrefetchEntryCacheStatus: function () {
            return i;
          },
        }),
        (function (e) {
          (e.fresh = "fresh"),
            (e.reusable = "reusable"),
            (e.expired = "expired"),
            (e.stale = "stale");
        })(t || (t = {})),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    8974: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "handleMutable", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(1705);
      function p(e, a) {
        var t, p, n, o;
        let r = null == (p = a.shouldScroll) || p;
        return {
          buildId: e.buildId,
          canonicalUrl:
            null != a.canonicalUrl
              ? a.canonicalUrl === e.canonicalUrl
                ? e.canonicalUrl
                : a.canonicalUrl
              : e.canonicalUrl,
          pushRef: {
            pendingPush:
              null != a.pendingPush ? a.pendingPush : e.pushRef.pendingPush,
            mpaNavigation:
              null != a.mpaNavigation
                ? a.mpaNavigation
                : e.pushRef.mpaNavigation,
          },
          focusAndScrollRef: {
            apply:
              !!r &&
              ((null == a ? void 0 : a.scrollableSegments) !== void 0 ||
                e.focusAndScrollRef.apply),
            onlyHashChange:
              !!a.hashFragment &&
              e.canonicalUrl.split("#", 1)[0] ===
                (null == (t = a.canonicalUrl) ? void 0 : t.split("#", 1)[0]),
            hashFragment: r
              ? a.hashFragment && "" !== a.hashFragment
                ? decodeURIComponent(a.hashFragment.slice(1))
                : e.focusAndScrollRef.hashFragment
              : null,
            segmentPaths: r
              ? null != (n = null == a ? void 0 : a.scrollableSegments)
                ? n
                : e.focusAndScrollRef.segmentPaths
              : [],
          },
          cache: a.cache ? a.cache : e.cache,
          prefetchCache: a.prefetchCache ? a.prefetchCache : e.prefetchCache,
          tree: void 0 !== a.patchedTree ? a.patchedTree : e.tree,
          nextUrl:
            void 0 !== a.patchedTree
              ? null != (o = (0, i.computeChangedPath)(e.tree, a.patchedTree))
                ? o
                : e.canonicalUrl
              : e.nextUrl,
        };
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    6241: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "invalidateCacheBelowFlightSegmentPath", {
          enumerable: !0,
          get: function () {
            return function e(a, t, p) {
              let n = p.length <= 2,
                [o, r] = p,
                s = (0, i.createRouterCacheKey)(r),
                d = t.parallelRoutes.get(o);
              if (!d) return;
              let l = a.parallelRoutes.get(o);
              if (
                ((l && l !== d) ||
                  ((l = new Map(d)), a.parallelRoutes.set(o, l)),
                n)
              ) {
                l.delete(s);
                return;
              }
              let c = d.get(s),
                u = l.get(s);
              u &&
                c &&
                (u === c &&
                  ((u = {
                    status: u.status,
                    data: u.data,
                    subTreeData: u.subTreeData,
                    parallelRoutes: new Map(u.parallelRoutes),
                  }),
                  l.set(s, u)),
                e(u, c, p.slice(2)));
            };
          },
        });
      let i = t(3075);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8131: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "invalidateCacheByRouterState", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(3075);
      function p(e, a, t) {
        for (let p in t[1]) {
          let n = t[1][p][0],
            o = (0, i.createRouterCacheKey)(n),
            r = a.parallelRoutes.get(p);
          if (r) {
            let a = new Map(r);
            a.delete(o), e.parallelRoutes.set(p, a);
          }
        }
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3534: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "isNavigatingToNewRootLayout", {
          enumerable: !0,
          get: function () {
            return function e(a, t) {
              let i = a[0],
                p = t[0];
              if (Array.isArray(i) && Array.isArray(p)) {
                if (i[0] !== p[0] || i[2] !== p[2]) return !0;
              } else if (i !== p) return !0;
              if (a[4]) return !t[4];
              if (t[4]) return !0;
              let n = Object.values(a[1])[0],
                o = Object.values(t[1])[0];
              return !n || !o || e(n, o);
            };
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    2877: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "fastRefreshReducer", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        t(5400),
        t(3142),
        t(9286),
        t(1155),
        t(3534),
        t(8024),
        t(8974),
        t(8994);
      let i = function (e, a) {
        return e;
      };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8281: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "findHeadInCache", {
          enumerable: !0,
          get: function () {
            return function e(a, t) {
              let p = 0 === Object.keys(t).length;
              if (p) return a.head;
              for (let p in t) {
                let [n, o] = t[p],
                  r = a.parallelRoutes.get(p);
                if (!r) continue;
                let s = (0, i.createRouterCacheKey)(n),
                  d = r.get(s);
                if (!d) continue;
                let l = e(d, o);
                if (l) return l;
              }
            };
          },
        });
      let i = t(3075);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    2888: (e, a) => {
      function t(e) {
        return Array.isArray(e) ? e[1] : e;
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "getSegmentValue", {
          enumerable: !0,
          get: function () {
            return t;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    8024: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          handleExternalUrl: function () {
            return x;
          },
          navigateReducer: function () {
            return y;
          },
        });
      let i = t(9236),
        p = t(5400),
        n = t(3142),
        o = t(9286),
        r = t(6241),
        s = t(5474),
        d = t(9756),
        l = t(1155),
        c = t(1151),
        u = t(3534),
        m = t(2247),
        f = t(8974),
        v = t(8994),
        h = t(3933),
        g = t(3732),
        b = t(7003);
      function x(e, a, t, i) {
        return (
          (a.previousTree = e.tree),
          (a.mpaNavigation = !0),
          (a.canonicalUrl = t),
          (a.pendingPush = i),
          (a.scrollableSegments = void 0),
          (0, f.handleMutable)(e, a)
        );
      }
      function _(e) {
        let a = [],
          [t, i] = e;
        if (0 === Object.keys(i).length) return [[t]];
        for (let [e, p] of Object.entries(i))
          for (let i of _(p))
            "" === t ? a.push([e, ...i]) : a.push([t, e, ...i]);
        return a;
      }
      function y(e, a) {
        let {
            url: t,
            isExternalUrl: y,
            navigateType: w,
            cache: S,
            mutable: E,
            forceOptimisticNavigation: T,
            shouldScroll: N,
          } = a,
          { pathname: R, hash: O } = t,
          P = (0, o.createHrefFromUrl)(t),
          j = "push" === w;
        (0, g.prunePrefetchCache)(e.prefetchCache);
        let D = JSON.stringify(E.previousTree) === JSON.stringify(e.tree);
        if (D) return (0, f.handleMutable)(e, E);
        if (y) return x(e, E, t.toString(), j);
        let A = e.prefetchCache.get((0, o.createHrefFromUrl)(t, !1));
        if (T && (null == A ? void 0 : A.kind) !== m.PrefetchKind.TEMPORARY) {
          let a = R.split("/");
          a.push("__PAGE__");
          let r = (0, d.createOptimisticTree)(a, e.tree, !1),
            l = { ...S };
          (l.status = i.CacheStates.READY),
            (l.subTreeData = e.cache.subTreeData),
            (l.parallelRoutes = new Map(e.cache.parallelRoutes));
          let c = null,
            u = a
              .slice(1)
              .map((e) => ["children", e])
              .flat(),
            v = (0, s.fillCacheWithDataProperty)(
              l,
              e.cache,
              u,
              () => (
                c ||
                  (c = (0, n.createRecordFromThenable)(
                    (0, p.fetchServerResponse)(t, r, e.nextUrl, e.buildId),
                  )),
                c
              ),
              !0,
            );
          if (!(null == v ? void 0 : v.bailOptimistic))
            return (
              (E.previousTree = e.tree),
              (E.patchedTree = r),
              (E.pendingPush = j),
              (E.hashFragment = O),
              (E.shouldScroll = N),
              (E.scrollableSegments = []),
              (E.cache = l),
              (E.canonicalUrl = P),
              e.prefetchCache.set((0, o.createHrefFromUrl)(t, !1), {
                data: c
                  ? (0, n.createRecordFromThenable)(Promise.resolve(c))
                  : null,
                kind: m.PrefetchKind.TEMPORARY,
                prefetchTime: Date.now(),
                treeAtTimeOfPrefetch: e.tree,
                lastUsedTime: Date.now(),
              }),
              (0, f.handleMutable)(e, E)
            );
        }
        if (!A) {
          let a = (0, n.createRecordFromThenable)(
              (0, p.fetchServerResponse)(
                t,
                e.tree,
                e.nextUrl,
                e.buildId,
                void 0,
              ),
            ),
            i = {
              data: (0, n.createRecordFromThenable)(Promise.resolve(a)),
              kind: m.PrefetchKind.TEMPORARY,
              prefetchTime: Date.now(),
              treeAtTimeOfPrefetch: e.tree,
              lastUsedTime: null,
            };
          e.prefetchCache.set((0, o.createHrefFromUrl)(t, !1), i), (A = i);
        }
        let C = (0, h.getPrefetchEntryCacheStatus)(A),
          { treeAtTimeOfPrefetch: M, data: I } = A;
        return (
          b.prefetchQueue.bump(I),
          I.then(
            (a) => {
              let [d, m, g] = a;
              if (
                (A && !A.lastUsedTime && (A.lastUsedTime = Date.now()),
                "string" == typeof d)
              )
                return x(e, E, d, j);
              let b = e.tree,
                y = e.cache,
                w = [];
              for (let a of d) {
                let o = a.slice(0, -4),
                  d = a.slice(-3)[0],
                  m = ["", ...o],
                  f = (0, l.applyRouterStatePatchToTree)(m, b, d);
                if (
                  (null === f &&
                    (f = (0, l.applyRouterStatePatchToTree)(m, M, d)),
                  null !== f)
                ) {
                  if ((0, u.isNavigatingToNewRootLayout)(b, f))
                    return x(e, E, P, j);
                  let l = (0, v.applyFlightData)(
                    y,
                    S,
                    a,
                    (null == A ? void 0 : A.kind) === "auto" &&
                      C === h.PrefetchCacheEntryStatus.reusable,
                  );
                  ((!l && C === h.PrefetchCacheEntryStatus.stale) || g) &&
                    (l = (function (e, a, t, p, n) {
                      let o = !1;
                      (e.status = i.CacheStates.READY),
                        (e.subTreeData = a.subTreeData),
                        (e.parallelRoutes = new Map(a.parallelRoutes));
                      let r = _(p).map((e) => [...t, ...e]);
                      for (let t of r) {
                        let i = (0, s.fillCacheWithDataProperty)(e, a, t, n);
                        (null == i ? void 0 : i.bailOptimistic) || (o = !0);
                      }
                      return o;
                    })(S, y, o, d, () =>
                      (0, n.createRecordFromThenable)(
                        (0, p.fetchServerResponse)(t, b, e.nextUrl, e.buildId),
                      ),
                    ));
                  let T = (0, c.shouldHardNavigate)(m, b);
                  for (let e of (T
                    ? ((S.status = i.CacheStates.READY),
                      (S.subTreeData = y.subTreeData),
                      (0, r.invalidateCacheBelowFlightSegmentPath)(S, y, o),
                      (E.cache = S))
                    : l && (E.cache = S),
                  (y = S),
                  (b = f),
                  _(d))) {
                    let a = [...o, ...e];
                    "__DEFAULT__" !== a[a.length - 1] && w.push(a);
                  }
                }
              }
              return (
                (E.previousTree = e.tree),
                (E.patchedTree = b),
                (E.canonicalUrl = m ? (0, o.createHrefFromUrl)(m) : P),
                (E.pendingPush = j),
                (E.scrollableSegments = w),
                (E.hashFragment = O),
                (E.shouldScroll = N),
                (0, f.handleMutable)(e, E)
              );
            },
            () => e,
          )
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    7003: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          prefetchQueue: function () {
            return l;
          },
          prefetchReducer: function () {
            return c;
          },
        });
      let i = t(9286),
        p = t(5400),
        n = t(2247),
        o = t(3142),
        r = t(3732),
        s = t(7328),
        d = t(527),
        l = new d.PromiseQueue(5);
      function c(e, a) {
        (0, r.prunePrefetchCache)(e.prefetchCache);
        let { url: t } = a;
        t.searchParams.delete(s.NEXT_RSC_UNION_QUERY);
        let d = (0, i.createHrefFromUrl)(t, !1),
          c = e.prefetchCache.get(d);
        if (
          c &&
          (c.kind === n.PrefetchKind.TEMPORARY &&
            e.prefetchCache.set(d, { ...c, kind: a.kind }),
          !(c.kind === n.PrefetchKind.AUTO && a.kind === n.PrefetchKind.FULL))
        )
          return e;
        let u = (0, o.createRecordFromThenable)(
          l.enqueue(() =>
            (0, p.fetchServerResponse)(t, e.tree, e.nextUrl, e.buildId, a.kind),
          ),
        );
        return (
          e.prefetchCache.set(d, {
            treeAtTimeOfPrefetch: e.tree,
            data: u,
            kind: a.kind,
            prefetchTime: Date.now(),
            lastUsedTime: null,
          }),
          e
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3732: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "prunePrefetchCache", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(3933);
      function p(e) {
        for (let [a, t] of e)
          (0, i.getPrefetchEntryCacheStatus)(t) ===
            i.PrefetchCacheEntryStatus.expired && e.delete(a);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8929: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "refreshReducer", {
          enumerable: !0,
          get: function () {
            return u;
          },
        });
      let i = t(5400),
        p = t(3142),
        n = t(9286),
        o = t(1155),
        r = t(3534),
        s = t(8024),
        d = t(8974),
        l = t(9236),
        c = t(5601);
      function u(e, a) {
        let { cache: t, mutable: u, origin: m } = a,
          f = e.canonicalUrl,
          v = e.tree,
          h = JSON.stringify(u.previousTree) === JSON.stringify(v);
        return h
          ? (0, d.handleMutable)(e, u)
          : (t.data ||
              (t.data = (0, p.createRecordFromThenable)(
                (0, i.fetchServerResponse)(
                  new URL(f, m),
                  [v[0], v[1], v[2], "refetch"],
                  e.nextUrl,
                  e.buildId,
                ),
              )),
            t.data.then(
              (a) => {
                let [i, p] = a;
                if ("string" == typeof i)
                  return (0, s.handleExternalUrl)(
                    e,
                    u,
                    i,
                    e.pushRef.pendingPush,
                  );
                for (let a of ((t.data = null), i)) {
                  if (3 !== a.length) return console.log("REFRESH FAILED"), e;
                  let [i] = a,
                    d = (0, o.applyRouterStatePatchToTree)([""], v, i);
                  if (null === d) throw Error("SEGMENT MISMATCH");
                  if ((0, r.isNavigatingToNewRootLayout)(v, d))
                    return (0, s.handleExternalUrl)(
                      e,
                      u,
                      f,
                      e.pushRef.pendingPush,
                    );
                  let m = p ? (0, n.createHrefFromUrl)(p) : void 0;
                  p && (u.canonicalUrl = m);
                  let [h, g] = a.slice(-2);
                  null !== h &&
                    ((t.status = l.CacheStates.READY),
                    (t.subTreeData = h),
                    (0, c.fillLazyItemsTillLeafWithHead)(t, void 0, i, g),
                    (u.cache = t),
                    (u.prefetchCache = new Map())),
                    (u.previousTree = v),
                    (u.patchedTree = d),
                    (u.canonicalUrl = f),
                    (v = d);
                }
                return (0, d.handleMutable)(e, u);
              },
              () => e,
            ));
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8333: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "restoreReducer", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(9286);
      function p(e, a) {
        let { url: t, tree: p } = a,
          n = (0, i.createHrefFromUrl)(t);
        return {
          buildId: e.buildId,
          canonicalUrl: n,
          pushRef: e.pushRef,
          focusAndScrollRef: e.focusAndScrollRef,
          cache: e.cache,
          prefetchCache: e.prefetchCache,
          tree: p,
          nextUrl: t.pathname,
        };
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    7023: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "serverActionReducer", {
          enumerable: !0,
          get: function () {
            return g;
          },
        });
      let i = t(2377),
        p = t(7328),
        n = t(3142),
        o = t(216),
        r = t(9286),
        s = t(8024),
        d = t(1155),
        l = t(3534),
        c = t(9236),
        u = t(8974),
        m = t(5601),
        { createFromFetch: f, encodeReply: v } = t(9530);
      async function h(e, a) {
        let t,
          { actionId: n, actionArgs: r } = a,
          s = await v(r),
          d = await fetch("", {
            method: "POST",
            headers: {
              Accept: p.RSC_CONTENT_TYPE_HEADER,
              [p.ACTION]: n,
              [p.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(
                JSON.stringify(e.tree),
              ),
              ...(e.nextUrl ? { [p.NEXT_URL]: e.nextUrl } : {}),
            },
            body: s,
          }),
          l = d.headers.get("x-action-redirect");
        try {
          let e = JSON.parse(
            d.headers.get("x-action-revalidated") || "[[],0,0]",
          );
          t = { paths: e[0] || [], tag: !!e[1], cookie: e[2] };
        } catch (e) {
          t = { paths: [], tag: !1, cookie: !1 };
        }
        let c = l
          ? new URL(
              (0, o.addBasePath)(l),
              new URL(e.canonicalUrl, window.location.href),
            )
          : void 0;
        if (d.headers.get("content-type") === p.RSC_CONTENT_TYPE_HEADER) {
          let e = await f(Promise.resolve(d), { callServer: i.callServer });
          if (l) {
            let [, a] = null != e ? e : [];
            return {
              actionFlightData: a,
              redirectLocation: c,
              revalidatedParts: t,
            };
          }
          let [a, [, p]] = null != e ? e : [];
          return {
            actionResult: a,
            actionFlightData: p,
            redirectLocation: c,
            revalidatedParts: t,
          };
        }
        return { redirectLocation: c, revalidatedParts: t };
      }
      function g(e, a) {
        let { mutable: t, cache: i, resolve: p, reject: o } = a,
          f = e.canonicalUrl,
          v = e.tree,
          g = JSON.stringify(t.previousTree) === JSON.stringify(v);
        return g
          ? (0, u.handleMutable)(e, t)
          : ((t.inFlightServerAction = (0, n.createRecordFromThenable)(
              h(e, a),
            )),
            t.inFlightServerAction.then(
              (a) => {
                let {
                  actionResult: n,
                  actionFlightData: o,
                  redirectLocation: h,
                } = a;
                if (
                  (h && ((e.pushRef.pendingPush = !0), (t.pendingPush = !0)),
                  (t.previousTree = e.tree),
                  !o)
                )
                  return (t.actionResultResolved ||
                    (p(n), (t.actionResultResolved = !0)),
                  h)
                    ? (0, s.handleExternalUrl)(
                        e,
                        t,
                        h.href,
                        e.pushRef.pendingPush,
                      )
                    : e;
                if ("string" == typeof o)
                  return (0, s.handleExternalUrl)(
                    e,
                    t,
                    o,
                    e.pushRef.pendingPush,
                  );
                for (let a of ((t.inFlightServerAction = null), o)) {
                  if (3 !== a.length)
                    return console.log("SERVER ACTION APPLY FAILED"), e;
                  let [p] = a,
                    n = (0, d.applyRouterStatePatchToTree)([""], v, p);
                  if (null === n) throw Error("SEGMENT MISMATCH");
                  if ((0, l.isNavigatingToNewRootLayout)(v, n))
                    return (0, s.handleExternalUrl)(
                      e,
                      t,
                      f,
                      e.pushRef.pendingPush,
                    );
                  let [o, r] = a.slice(-2);
                  null !== o &&
                    ((i.status = c.CacheStates.READY),
                    (i.subTreeData = o),
                    (0, m.fillLazyItemsTillLeafWithHead)(i, void 0, p, r),
                    (t.cache = i),
                    (t.prefetchCache = new Map())),
                    (t.previousTree = v),
                    (t.patchedTree = n),
                    (t.canonicalUrl = f),
                    (v = n);
                }
                if (h) {
                  let e = (0, r.createHrefFromUrl)(h, !1);
                  t.canonicalUrl = e;
                }
                return (
                  t.actionResultResolved ||
                    (p(n), (t.actionResultResolved = !0)),
                  (0, u.handleMutable)(e, t)
                );
              },
              (a) => {
                if ("rejected" === a.status)
                  return (
                    t.actionResultResolved ||
                      (o(a.reason), (t.actionResultResolved = !0)),
                    e
                  );
                throw a;
              },
            ));
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    507: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "serverPatchReducer", {
          enumerable: !0,
          get: function () {
            return d;
          },
        });
      let i = t(9286),
        p = t(1155),
        n = t(3534),
        o = t(8024),
        r = t(8994),
        s = t(8974);
      function d(e, a) {
        let {
            flightData: t,
            previousTree: d,
            overrideCanonicalUrl: l,
            cache: c,
            mutable: u,
          } = a,
          m = JSON.stringify(d) === JSON.stringify(e.tree);
        if (!m) return console.log("TREE MISMATCH"), e;
        if (u.previousTree) return (0, s.handleMutable)(e, u);
        if ("string" == typeof t)
          return (0, o.handleExternalUrl)(e, u, t, e.pushRef.pendingPush);
        let f = e.tree,
          v = e.cache;
        for (let a of t) {
          let t = a.slice(0, -4),
            [s] = a.slice(-3, -2),
            d = (0, p.applyRouterStatePatchToTree)(["", ...t], f, s);
          if (null === d) throw Error("SEGMENT MISMATCH");
          if ((0, n.isNavigatingToNewRootLayout)(f, d))
            return (0, o.handleExternalUrl)(
              e,
              u,
              e.canonicalUrl,
              e.pushRef.pendingPush,
            );
          let m = l ? (0, i.createHrefFromUrl)(l) : void 0;
          m && (u.canonicalUrl = m),
            (0, r.applyFlightData)(v, c, a),
            (u.previousTree = f),
            (u.patchedTree = d),
            (u.cache = c),
            (v = c),
            (f = d);
        }
        return (0, s.handleMutable)(e, u);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    2247: (e, a) => {
      var t;
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          PrefetchKind: function () {
            return t;
          },
          ACTION_REFRESH: function () {
            return i;
          },
          ACTION_NAVIGATE: function () {
            return p;
          },
          ACTION_RESTORE: function () {
            return n;
          },
          ACTION_SERVER_PATCH: function () {
            return o;
          },
          ACTION_PREFETCH: function () {
            return r;
          },
          ACTION_FAST_REFRESH: function () {
            return s;
          },
          ACTION_SERVER_ACTION: function () {
            return d;
          },
          isThenable: function () {
            return l;
          },
        });
      let i = "refresh",
        p = "navigate",
        n = "restore",
        o = "server-patch",
        r = "prefetch",
        s = "fast-refresh",
        d = "server-action";
      function l(e) {
        return (
          e &&
          ("object" == typeof e || "function" == typeof e) &&
          "function" == typeof e.then
        );
      }
      (function (e) {
        (e.AUTO = "auto"), (e.FULL = "full"), (e.TEMPORARY = "temporary");
      })(t || (t = {})),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    9474: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "reducer", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        t(2247),
        t(8024),
        t(507),
        t(8333),
        t(8929),
        t(7003),
        t(2877),
        t(7023);
      let i = function (e, a) {
        return e;
      };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    1151: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "shouldHardNavigate", {
          enumerable: !0,
          get: function () {
            return function e(a, t) {
              let [p, n] = t,
                [o, r] = a;
              if (!(0, i.matchSegment)(o, p)) return !!Array.isArray(o);
              let s = a.length <= 2;
              return !s && e(a.slice(2), n[r]);
            };
          },
        });
      let i = t(765);
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5318: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createSearchParamsBailoutProxy", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(8608);
      function p() {
        return new Proxy(
          {},
          {
            get(e, a) {
              "string" == typeof a &&
                (0, i.staticGenerationBailout)("searchParams." + a);
            },
          },
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8608: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "staticGenerationBailout", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let i = t(5432),
        p = t(9686),
        n = t(4749);
      class o extends Error {
        constructor(...e) {
          super(...e), (this.code = "NEXT_STATIC_GEN_BAILOUT");
        }
      }
      function r(e, a) {
        let { dynamic: t, link: i } = a || {};
        return (
          "Page" +
          (t ? ' with `dynamic = "' + t + '"`' : "") +
          " couldn't be rendered statically because it used `" +
          e +
          "`." +
          (i ? " See more info here: " + i : "")
        );
      }
      let s = (e, a) => {
        let t = n.staticGenerationAsyncStorage.getStore();
        if (!t) return !1;
        if (t.forceStatic) return !0;
        if (t.dynamicShouldError) {
          var s;
          throw new o(
            r(e, {
              ...a,
              dynamic:
                null != (s = null == a ? void 0 : a.dynamic) ? s : "error",
            }),
          );
        }
        let d = r(e, {
          ...a,
          link: "https://nextjs.org/docs/messages/dynamic-server-error",
        });
        if (
          ((0, p.maybePostpone)(t, e),
          (t.revalidate = 0),
          (null == a ? void 0 : a.dynamic) || (t.staticPrefetchBailout = !0),
          t.isStaticGeneration)
        ) {
          let a = new i.DynamicServerError(d);
          throw (
            ((t.dynamicUsageDescription = e),
            (t.dynamicUsageStack = a.stack),
            a)
          );
        }
        return !1;
      };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    7303: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "default", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let i = t(143),
        p = i._(t(4218)),
        n = t(5318);
      function o(e) {
        let { Component: a, propsForComponent: t, isStaticGeneration: i } = e;
        if (i) {
          let e = (0, n.createSearchParamsBailoutProxy)();
          return p.default.createElement(a, { searchParams: e, ...t });
        }
        return p.default.createElement(a, t);
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    6320: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          useUnwrapState: function () {
            return r;
          },
          useReducerWithReduxDevtools: function () {
            return s;
          },
        });
      let i = t(2212),
        p = i._(t(4218)),
        n = t(2247);
      function o(e) {
        if (e instanceof Map) {
          let a = {};
          for (let [t, i] of e.entries()) {
            if ("function" == typeof i) {
              a[t] = "fn()";
              continue;
            }
            if ("object" == typeof i && null !== i) {
              if (i.$$typeof) {
                a[t] = i.$$typeof.toString();
                continue;
              }
              if (i._bundlerConfig) {
                a[t] = "FlightData";
                continue;
              }
            }
            a[t] = o(i);
          }
          return a;
        }
        if ("object" == typeof e && null !== e) {
          let a = {};
          for (let t in e) {
            let i = e[t];
            if ("function" == typeof i) {
              a[t] = "fn()";
              continue;
            }
            if ("object" == typeof i && null !== i) {
              if (i.$$typeof) {
                a[t] = i.$$typeof.toString();
                continue;
              }
              if (i.hasOwnProperty("_bundlerConfig")) {
                a[t] = "FlightData";
                continue;
              }
            }
            a[t] = o(i);
          }
          return a;
        }
        return Array.isArray(e) ? e.map(o) : e;
      }
      function r(e) {
        if ((0, n.isThenable)(e)) {
          let a = (0, p.use)(e);
          return a;
        }
        return e;
      }
      t(7485);
      let s = function (e) {
        return [e, () => {}, () => {}];
      };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8475: (e, a, t) => {
      function i(e, a, t, i) {
        return !1;
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "getDomainLocale", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        t(2038),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    8423: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "hasBasePath", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(8869);
      function p(e) {
        return (0, i.pathHasPrefix)(e, "");
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8534: (e, a) => {
      let t;
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          DOMAttributeNames: function () {
            return i;
          },
          isEqualNode: function () {
            return n;
          },
          default: function () {
            return o;
          },
        });
      let i = {
        acceptCharset: "accept-charset",
        className: "class",
        htmlFor: "for",
        httpEquiv: "http-equiv",
        noModule: "noModule",
      };
      function p(e) {
        let { type: a, props: t } = e,
          p = document.createElement(a);
        for (let e in t) {
          if (
            !t.hasOwnProperty(e) ||
            "children" === e ||
            "dangerouslySetInnerHTML" === e ||
            void 0 === t[e]
          )
            continue;
          let n = i[e] || e.toLowerCase();
          "script" === a && ("async" === n || "defer" === n || "noModule" === n)
            ? (p[n] = !!t[e])
            : p.setAttribute(n, t[e]);
        }
        let { children: n, dangerouslySetInnerHTML: o } = t;
        return (
          o
            ? (p.innerHTML = o.__html || "")
            : n &&
              (p.textContent =
                "string" == typeof n ? n : Array.isArray(n) ? n.join("") : ""),
          p
        );
      }
      function n(e, a) {
        if (e instanceof HTMLElement && a instanceof HTMLElement) {
          let t = a.getAttribute("nonce");
          if (t && !e.getAttribute("nonce")) {
            let i = a.cloneNode(!0);
            return (
              i.setAttribute("nonce", ""),
              (i.nonce = t),
              t === e.nonce && e.isEqualNode(i)
            );
          }
        }
        return e.isEqualNode(a);
      }
      function o() {
        return {
          mountedInstances: new Set(),
          updateHead: (e) => {
            let a = {};
            e.forEach((e) => {
              if ("link" === e.type && e.props["data-optimized-fonts"]) {
                if (
                  document.querySelector(
                    'style[data-href="' + e.props["data-href"] + '"]',
                  )
                )
                  return;
                (e.props.href = e.props["data-href"]),
                  (e.props["data-href"] = void 0);
              }
              let t = a[e.type] || [];
              t.push(e), (a[e.type] = t);
            });
            let i = a.title ? a.title[0] : null,
              p = "";
            if (i) {
              let { children: e } = i.props;
              p = "string" == typeof e ? e : Array.isArray(e) ? e.join("") : "";
            }
            p !== document.title && (document.title = p),
              ["meta", "base", "link", "style", "script"].forEach((e) => {
                t(e, a[e] || []);
              });
          },
        };
      }
      (t = (e, a) => {
        let t = document.getElementsByTagName("head")[0],
          i = t.querySelector("meta[name=next-head-count]"),
          o = Number(i.content),
          r = [];
        for (
          let a = 0, t = i.previousElementSibling;
          a < o;
          a++, t = (null == t ? void 0 : t.previousElementSibling) || null
        ) {
          var s;
          (null == t
            ? void 0
            : null == (s = t.tagName)
              ? void 0
              : s.toLowerCase()) === e && r.push(t);
        }
        let d = a.map(p).filter((e) => {
          for (let a = 0, t = r.length; a < t; a++) {
            let t = r[a];
            if (n(t, e)) return r.splice(a, 1), !1;
          }
          return !0;
        });
        r.forEach((e) => {
          var a;
          return null == (a = e.parentNode) ? void 0 : a.removeChild(e);
        }),
          d.forEach((e) => t.insertBefore(e, i)),
          (i.content = (o - r.length + d.length).toString());
      }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    7490: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "default", {
          enumerable: !0,
          get: function () {
            return b;
          },
        });
      let i = t(143),
        p = i._(t(4218)),
        n = t(9377),
        o = t(9677),
        r = t(7860),
        s = t(703),
        d = t(5922),
        l = t(3102),
        c = t(9236),
        u = t(3582),
        m = t(8475),
        f = t(216),
        v = t(2247);
      function h(e) {
        return "string" == typeof e ? e : (0, r.formatUrl)(e);
      }
      let g = p.default.forwardRef(function (e, a) {
          let t, i;
          let {
            href: r,
            as: g,
            children: b,
            prefetch: x = null,
            passHref: _,
            replace: y,
            shallow: w,
            scroll: S,
            locale: E,
            onClick: T,
            onMouseEnter: N,
            onTouchStart: R,
            legacyBehavior: O = !1,
            ...P
          } = e;
          (t = b),
            O &&
              ("string" == typeof t || "number" == typeof t) &&
              (t = p.default.createElement("a", null, t));
          let j = p.default.useContext(l.RouterContext),
            D = p.default.useContext(c.AppRouterContext),
            A = null != j ? j : D,
            C = !j,
            M = !1 !== x,
            I = null === x ? v.PrefetchKind.AUTO : v.PrefetchKind.FULL,
            { href: k, as: V } = p.default.useMemo(() => {
              if (!j) {
                let e = h(r);
                return { href: e, as: g ? h(g) : e };
              }
              let [e, a] = (0, n.resolveHref)(j, r, !0);
              return { href: e, as: g ? (0, n.resolveHref)(j, g) : a || e };
            }, [j, r, g]),
            L = p.default.useRef(k),
            U = p.default.useRef(V);
          O && (i = p.default.Children.only(t));
          let B = O ? i && "object" == typeof i && i.ref : a,
            [F, q, z] = (0, u.useIntersection)({ rootMargin: "200px" }),
            H = p.default.useCallback(
              (e) => {
                (U.current !== V || L.current !== k) &&
                  (z(), (U.current = V), (L.current = k)),
                  F(e),
                  B &&
                    ("function" == typeof B
                      ? B(e)
                      : "object" == typeof B && (B.current = e));
              },
              [V, B, k, z, F],
            );
          p.default.useEffect(() => {}, [
            V,
            k,
            q,
            E,
            M,
            null == j ? void 0 : j.locale,
            A,
            C,
            I,
          ]);
          let G = {
            ref: H,
            onClick(e) {
              O || "function" != typeof T || T(e),
                O &&
                  i.props &&
                  "function" == typeof i.props.onClick &&
                  i.props.onClick(e),
                A &&
                  !e.defaultPrevented &&
                  (function (e, a, t, i, n, r, s, d, l, c) {
                    let { nodeName: u } = e.currentTarget,
                      m = "A" === u.toUpperCase();
                    if (
                      m &&
                      ((function (e) {
                        let a = e.currentTarget,
                          t = a.getAttribute("target");
                        return (
                          (t && "_self" !== t) ||
                          e.metaKey ||
                          e.ctrlKey ||
                          e.shiftKey ||
                          e.altKey ||
                          (e.nativeEvent && 2 === e.nativeEvent.which)
                        );
                      })(e) ||
                        (!l && !(0, o.isLocalURL)(t)))
                    )
                      return;
                    e.preventDefault();
                    let f = () => {
                      let e = null == s || s;
                      "beforePopState" in a
                        ? a[n ? "replace" : "push"](t, i, {
                            shallow: r,
                            locale: d,
                            scroll: e,
                          })
                        : a[n ? "replace" : "push"](i || t, {
                            forceOptimisticNavigation: !c,
                            scroll: e,
                          });
                    };
                    l ? p.default.startTransition(f) : f();
                  })(e, A, k, V, y, w, S, E, C, M);
            },
            onMouseEnter(e) {
              O || "function" != typeof N || N(e),
                O &&
                  i.props &&
                  "function" == typeof i.props.onMouseEnter &&
                  i.props.onMouseEnter(e);
            },
            onTouchStart(e) {
              O || "function" != typeof R || R(e),
                O &&
                  i.props &&
                  "function" == typeof i.props.onTouchStart &&
                  i.props.onTouchStart(e);
            },
          };
          if ((0, s.isAbsoluteUrl)(V)) G.href = V;
          else if (!O || _ || ("a" === i.type && !("href" in i.props))) {
            let e = void 0 !== E ? E : null == j ? void 0 : j.locale,
              a =
                (null == j ? void 0 : j.isLocaleDomain) &&
                (0, m.getDomainLocale)(
                  V,
                  e,
                  null == j ? void 0 : j.locales,
                  null == j ? void 0 : j.domainLocales,
                );
            G.href =
              a ||
              (0, f.addBasePath)(
                (0, d.addLocale)(V, e, null == j ? void 0 : j.defaultLocale),
              );
          }
          return O
            ? p.default.cloneElement(i, G)
            : p.default.createElement("a", { ...P, ...G }, t);
        }),
        b = g;
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    2038: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "normalizePathTrailingSlash", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = t(4538),
        p = t(1242),
        n = (e) => {
          if (!e.startsWith("/")) return e;
          let { pathname: a, query: t, hash: n } = (0, p.parsePath)(e);
          return "" + (0, i.removeTrailingSlash)(a) + t + n;
        };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8128: (e, a, t) => {
      function i(e) {
        return e;
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "removeBasePath", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }),
        t(8423),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    2295: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          requestIdleCallback: function () {
            return t;
          },
          cancelIdleCallback: function () {
            return i;
          },
        });
      let t =
          ("undefined" != typeof self &&
            self.requestIdleCallback &&
            self.requestIdleCallback.bind(window)) ||
          function (e) {
            let a = Date.now();
            return self.setTimeout(function () {
              e({
                didTimeout: !1,
                timeRemaining: function () {
                  return Math.max(0, 50 - (Date.now() - a));
                },
              });
            }, 1);
          },
        i =
          ("undefined" != typeof self &&
            self.cancelIdleCallback &&
            self.cancelIdleCallback.bind(window)) ||
          function (e) {
            return clearTimeout(e);
          };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    9377: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "resolveHref", {
          enumerable: !0,
          get: function () {
            return c;
          },
        });
      let i = t(95),
        p = t(7860),
        n = t(3302),
        o = t(703),
        r = t(2038),
        s = t(9677),
        d = t(6553),
        l = t(2157);
      function c(e, a, t) {
        let c;
        let u = "string" == typeof a ? a : (0, p.formatWithValidation)(a),
          m = u.match(/^[a-zA-Z]{1,}:\/\//),
          f = m ? u.slice(m[0].length) : u,
          v = f.split("?", 1);
        if ((v[0] || "").match(/(\/\/|\\)/)) {
          console.error(
            "Invalid href '" +
              u +
              "' passed to next/router in page: '" +
              e.pathname +
              "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.",
          );
          let a = (0, o.normalizeRepeatedSlashes)(f);
          u = (m ? m[0] : "") + a;
        }
        if (!(0, s.isLocalURL)(u)) return t ? [u] : u;
        try {
          c = new URL(u.startsWith("#") ? e.asPath : e.pathname, "http://n");
        } catch (e) {
          c = new URL("/", "http://n");
        }
        try {
          let e = new URL(u, c);
          e.pathname = (0, r.normalizePathTrailingSlash)(e.pathname);
          let a = "";
          if ((0, d.isDynamicRoute)(e.pathname) && e.searchParams && t) {
            let t = (0, i.searchParamsToUrlQuery)(e.searchParams),
              { result: o, params: r } = (0, l.interpolateAs)(
                e.pathname,
                e.pathname,
                t,
              );
            o &&
              (a = (0, p.formatWithValidation)({
                pathname: o,
                hash: e.hash,
                query: (0, n.omit)(t, r),
              }));
          }
          let o =
            e.origin === c.origin ? e.href.slice(e.origin.length) : e.href;
          return t ? [o, a || o] : o;
        } catch (e) {
          return t ? [u] : u;
        }
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    233: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          handleClientScriptLoad: function () {
            return v;
          },
          initScriptLoader: function () {
            return h;
          },
          default: function () {
            return b;
          },
        });
      let i = t(143),
        p = t(2212),
        n = i._(t(3638)),
        o = p._(t(4218)),
        r = t(4004),
        s = t(8534),
        d = t(2295),
        l = new Map(),
        c = new Set(),
        u = [
          "onLoad",
          "onReady",
          "dangerouslySetInnerHTML",
          "children",
          "onError",
          "strategy",
          "stylesheets",
        ],
        m = (e) => {
          if (n.default.preinit) {
            e.forEach((e) => {
              n.default.preinit(e, { as: "style" });
            });
            return;
          }
        },
        f = (e) => {
          let {
              src: a,
              id: t,
              onLoad: i = () => {},
              onReady: p = null,
              dangerouslySetInnerHTML: n,
              children: o = "",
              strategy: r = "afterInteractive",
              onError: d,
              stylesheets: f,
            } = e,
            v = t || a;
          if (v && c.has(v)) return;
          if (l.has(a)) {
            c.add(v), l.get(a).then(i, d);
            return;
          }
          let h = () => {
              p && p(), c.add(v);
            },
            g = document.createElement("script"),
            b = new Promise((e, a) => {
              g.addEventListener("load", function (a) {
                e(), i && i.call(this, a), h();
              }),
                g.addEventListener("error", function (e) {
                  a(e);
                });
            }).catch(function (e) {
              d && d(e);
            });
          for (let [t, i] of (n
            ? ((g.innerHTML = n.__html || ""), h())
            : o
              ? ((g.textContent =
                  "string" == typeof o
                    ? o
                    : Array.isArray(o)
                      ? o.join("")
                      : ""),
                h())
              : a && ((g.src = a), l.set(a, b)),
          Object.entries(e))) {
            if (void 0 === i || u.includes(t)) continue;
            let e = s.DOMAttributeNames[t] || t.toLowerCase();
            g.setAttribute(e, i);
          }
          "worker" === r && g.setAttribute("type", "text/partytown"),
            g.setAttribute("data-nscript", r),
            f && m(f),
            document.body.appendChild(g);
        };
      function v(e) {
        let { strategy: a = "afterInteractive" } = e;
        "lazyOnload" === a
          ? window.addEventListener("load", () => {
              (0, d.requestIdleCallback)(() => f(e));
            })
          : f(e);
      }
      function h(e) {
        e.forEach(v),
          (function () {
            let e = [
              ...document.querySelectorAll(
                '[data-nscript="beforeInteractive"]',
              ),
              ...document.querySelectorAll('[data-nscript="beforePageRender"]'),
            ];
            e.forEach((e) => {
              let a = e.id || e.getAttribute("src");
              c.add(a);
            });
          })();
      }
      function g(e) {
        let {
            id: a,
            src: t = "",
            onLoad: i = () => {},
            onReady: p = null,
            strategy: s = "afterInteractive",
            onError: l,
            stylesheets: u,
            ...m
          } = e,
          {
            updateScripts: v,
            scripts: h,
            getIsSsr: g,
            appDir: b,
            nonce: x,
          } = (0, o.useContext)(r.HeadManagerContext),
          _ = (0, o.useRef)(!1);
        (0, o.useEffect)(() => {
          let e = a || t;
          _.current || (p && e && c.has(e) && p(), (_.current = !0));
        }, [p, a, t]);
        let y = (0, o.useRef)(!1);
        if (
          ((0, o.useEffect)(() => {
            !y.current &&
              ("afterInteractive" === s
                ? f(e)
                : "lazyOnload" === s &&
                  ("complete" === document.readyState
                    ? (0, d.requestIdleCallback)(() => f(e))
                    : window.addEventListener("load", () => {
                        (0, d.requestIdleCallback)(() => f(e));
                      })),
              (y.current = !0));
          }, [e, s]),
          ("beforeInteractive" === s || "worker" === s) &&
            (v
              ? ((h[s] = (h[s] || []).concat([
                  { id: a, src: t, onLoad: i, onReady: p, onError: l, ...m },
                ])),
                v(h))
              : g && g()
                ? c.add(a || t)
                : g && !g() && f(e)),
          b)
        ) {
          if (
            (u &&
              u.forEach((e) => {
                n.default.preinit(e, { as: "style" });
              }),
            "beforeInteractive" === s)
          )
            return t
              ? (n.default.preload(
                  t,
                  m.integrity
                    ? { as: "script", integrity: m.integrity }
                    : { as: "script" },
                ),
                o.default.createElement("script", {
                  nonce: x,
                  dangerouslySetInnerHTML: {
                    __html:
                      "(self.__next_s=self.__next_s||[]).push(" +
                      JSON.stringify([t]) +
                      ")",
                  },
                }))
              : (m.dangerouslySetInnerHTML &&
                  ((m.children = m.dangerouslySetInnerHTML.__html),
                  delete m.dangerouslySetInnerHTML),
                o.default.createElement("script", {
                  nonce: x,
                  dangerouslySetInnerHTML: {
                    __html:
                      "(self.__next_s=self.__next_s||[]).push(" +
                      JSON.stringify([0, { ...m }]) +
                      ")",
                  },
                }));
          "afterInteractive" === s &&
            t &&
            n.default.preload(
              t,
              m.integrity
                ? { as: "script", integrity: m.integrity }
                : { as: "script" },
            );
        }
        return null;
      }
      Object.defineProperty(g, "__nextScript", { value: !0 });
      let b = g;
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3582: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "useIntersection", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let i = t(4218),
        p = t(2295),
        n = "function" == typeof IntersectionObserver,
        o = new Map(),
        r = [];
      function s(e) {
        let { rootRef: a, rootMargin: t, disabled: s } = e,
          d = s || !n,
          [l, c] = (0, i.useState)(!1),
          u = (0, i.useRef)(null),
          m = (0, i.useCallback)((e) => {
            u.current = e;
          }, []);
        (0, i.useEffect)(() => {
          if (n) {
            if (d || l) return;
            let e = u.current;
            if (e && e.tagName) {
              let i = (function (e, a, t) {
                let {
                  id: i,
                  observer: p,
                  elements: n,
                } = (function (e) {
                  let a;
                  let t = { root: e.root || null, margin: e.rootMargin || "" },
                    i = r.find(
                      (e) => e.root === t.root && e.margin === t.margin,
                    );
                  if (i && (a = o.get(i))) return a;
                  let p = new Map(),
                    n = new IntersectionObserver((e) => {
                      e.forEach((e) => {
                        let a = p.get(e.target),
                          t = e.isIntersecting || e.intersectionRatio > 0;
                        a && t && a(t);
                      });
                    }, e);
                  return (
                    (a = { id: t, observer: n, elements: p }),
                    r.push(t),
                    o.set(t, a),
                    a
                  );
                })(t);
                return (
                  n.set(e, a),
                  p.observe(e),
                  function () {
                    if ((n.delete(e), p.unobserve(e), 0 === n.size)) {
                      p.disconnect(), o.delete(i);
                      let e = r.findIndex(
                        (e) => e.root === i.root && e.margin === i.margin,
                      );
                      e > -1 && r.splice(e, 1);
                    }
                  }
                );
              })(e, (e) => e && c(e), {
                root: null == a ? void 0 : a.current,
                rootMargin: t,
              });
              return i;
            }
          } else if (!l) {
            let e = (0, p.requestIdleCallback)(() => c(!0));
            return () => (0, p.cancelIdleCallback)(e);
          }
        }, [d, t, a, l, u.current]);
        let f = (0, i.useCallback)(() => {
          c(!1);
        }, []);
        return [m, l, f];
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8130: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          NEXT_QUERY_PARAM_PREFIX: function () {
            return t;
          },
          PRERENDER_REVALIDATE_HEADER: function () {
            return i;
          },
          PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function () {
            return p;
          },
          NEXT_DID_POSTPONE_HEADER: function () {
            return n;
          },
          RSC_PREFETCH_SUFFIX: function () {
            return o;
          },
          RSC_SUFFIX: function () {
            return r;
          },
          NEXT_CACHE_TAGS_HEADER: function () {
            return s;
          },
          NEXT_CACHE_SOFT_TAGS_HEADER: function () {
            return d;
          },
          NEXT_CACHE_REVALIDATED_TAGS_HEADER: function () {
            return l;
          },
          NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function () {
            return c;
          },
          NEXT_CACHE_TAG_MAX_LENGTH: function () {
            return u;
          },
          NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function () {
            return m;
          },
          NEXT_CACHE_IMPLICIT_TAG_ID: function () {
            return f;
          },
          CACHE_ONE_YEAR: function () {
            return v;
          },
          MIDDLEWARE_FILENAME: function () {
            return h;
          },
          MIDDLEWARE_LOCATION_REGEXP: function () {
            return g;
          },
          INSTRUMENTATION_HOOK_FILENAME: function () {
            return b;
          },
          PAGES_DIR_ALIAS: function () {
            return x;
          },
          DOT_NEXT_ALIAS: function () {
            return _;
          },
          ROOT_DIR_ALIAS: function () {
            return y;
          },
          APP_DIR_ALIAS: function () {
            return w;
          },
          RSC_MOD_REF_PROXY_ALIAS: function () {
            return S;
          },
          RSC_ACTION_VALIDATE_ALIAS: function () {
            return E;
          },
          RSC_ACTION_PROXY_ALIAS: function () {
            return T;
          },
          RSC_ACTION_ENCRYPTION_ALIAS: function () {
            return N;
          },
          RSC_ACTION_CLIENT_WRAPPER_ALIAS: function () {
            return R;
          },
          PUBLIC_DIR_MIDDLEWARE_CONFLICT: function () {
            return O;
          },
          SSG_GET_INITIAL_PROPS_CONFLICT: function () {
            return P;
          },
          SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function () {
            return j;
          },
          SERVER_PROPS_SSG_CONFLICT: function () {
            return D;
          },
          STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function () {
            return A;
          },
          SERVER_PROPS_EXPORT_ERROR: function () {
            return C;
          },
          GSP_NO_RETURNED_VALUE: function () {
            return M;
          },
          GSSP_NO_RETURNED_VALUE: function () {
            return I;
          },
          UNSTABLE_REVALIDATE_RENAME_ERROR: function () {
            return k;
          },
          GSSP_COMPONENT_MEMBER_ERROR: function () {
            return V;
          },
          NON_STANDARD_NODE_ENV: function () {
            return L;
          },
          SSG_FALLBACK_EXPORT_ERROR: function () {
            return U;
          },
          ESLINT_DEFAULT_DIRS: function () {
            return B;
          },
          ESLINT_PROMPT_VALUES: function () {
            return F;
          },
          SERVER_RUNTIME: function () {
            return q;
          },
          WEBPACK_LAYERS: function () {
            return H;
          },
          WEBPACK_RESOURCE_QUERIES: function () {
            return G;
          },
        });
      let t = "nxtP",
        i = "x-prerender-revalidate",
        p = "x-prerender-revalidate-if-generated",
        n = "x-nextjs-postponed",
        o = ".prefetch.rsc",
        r = ".rsc",
        s = "x-next-cache-tags",
        d = "x-next-cache-soft-tags",
        l = "x-next-revalidated-tags",
        c = "x-next-revalidate-tag-token",
        u = 256,
        m = 1024,
        f = "_N_T_",
        v = 31536e3,
        h = "middleware",
        g = `(?:src/)?${h}`,
        b = "instrumentation",
        x = "private-next-pages",
        _ = "private-dot-next",
        y = "private-next-root-dir",
        w = "private-next-app-dir",
        S = "private-next-rsc-mod-ref-proxy",
        E = "private-next-rsc-action-validate",
        T = "private-next-rsc-action-proxy",
        N = "private-next-rsc-action-encryption",
        R = "private-next-rsc-action-client-wrapper",
        O =
          "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict",
        P =
          "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps",
        j =
          "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.",
        D =
          "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps",
        A =
          "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props",
        C =
          "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export",
        M =
          "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?",
        I =
          "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?",
        k =
          "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.",
        V =
          "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member",
        L =
          'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env',
        U =
          "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export",
        B = ["app", "pages", "components", "lib", "src"],
        F = [
          {
            title: "Strict",
            recommended: !0,
            config: { extends: "next/core-web-vitals" },
          },
          { title: "Base", config: { extends: "next" } },
          { title: "Cancel", config: null },
        ],
        q = {
          edge: "edge",
          experimentalEdge: "experimental-edge",
          nodejs: "nodejs",
        },
        z = {
          shared: "shared",
          reactServerComponents: "rsc",
          serverSideRendering: "ssr",
          actionBrowser: "action-browser",
          api: "api",
          middleware: "middleware",
          edgeAsset: "edge-asset",
          appPagesBrowser: "app-pages-browser",
          appMetadataRoute: "app-metadata-route",
          appRouteHandler: "app-route-handler",
        },
        H = {
          ...z,
          GROUP: {
            server: [
              z.reactServerComponents,
              z.actionBrowser,
              z.appMetadataRoute,
              z.appRouteHandler,
            ],
            nonClientServerTarget: [z.middleware, z.api],
            app: [
              z.reactServerComponents,
              z.actionBrowser,
              z.appMetadataRoute,
              z.appRouteHandler,
              z.serverSideRendering,
              z.appPagesBrowser,
            ],
          },
        },
        G = {
          edgeSSREntry: "__next_edge_ssr_entry__",
          metadata: "__next_metadata__",
          metadataRoute: "__next_metadata_route__",
          metadataImageMeta: "__next_metadata_image_meta__",
        };
    },
    799: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "getSegmentParam", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(5513);
      function p(e) {
        let a = i.INTERCEPTION_ROUTE_MARKERS.find((a) => e.startsWith(a));
        return (a && (e = e.slice(a.length)),
        e.startsWith("[[...") && e.endsWith("]]"))
          ? { type: "optional-catchall", param: e.slice(5, -2) }
          : e.startsWith("[...") && e.endsWith("]")
            ? { type: "catchall", param: e.slice(4, -1) }
            : e.startsWith("[") && e.endsWith("]")
              ? { type: "dynamic", param: e.slice(1, -1) }
              : null;
      }
    },
    5513: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          INTERCEPTION_ROUTE_MARKERS: function () {
            return p;
          },
          isInterceptionRouteAppPath: function () {
            return n;
          },
          extractInterceptionRouteInformation: function () {
            return o;
          },
        });
      let i = t(1356),
        p = ["(..)(..)", "(.)", "(..)", "(...)"];
      function n(e) {
        return (
          void 0 !== e.split("/").find((e) => p.find((a) => e.startsWith(a)))
        );
      }
      function o(e) {
        let a, t, n;
        for (let i of e.split("/"))
          if ((t = p.find((e) => i.startsWith(e)))) {
            [a, n] = e.split(t, 2);
            break;
          }
        if (!a || !t || !n)
          throw Error(
            `Invalid interception route: ${e}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`,
          );
        switch (((a = (0, i.normalizeAppPath)(a)), t)) {
          case "(.)":
            n = "/" === a ? `/${n}` : a + "/" + n;
            break;
          case "(..)":
            if ("/" === a)
              throw Error(
                `Invalid interception route: ${e}. Cannot use (..) marker at the root level, use (.) instead.`,
              );
            n = a.split("/").slice(0, -1).concat(n).join("/");
            break;
          case "(...)":
            n = "/" + n;
            break;
          case "(..)(..)":
            let o = a.split("/");
            if (o.length <= 2)
              throw Error(
                `Invalid interception route: ${e}. Cannot use (..)(..) marker at the root level or one level up.`,
              );
            n = o.slice(0, -2).concat(n).join("/");
            break;
          default:
            throw Error("Invariant: unexpected marker");
        }
        return { interceptingRoute: a, interceptedRoute: n };
      }
    },
    2337: (e, a, t) => {
      e.exports = t(399);
    },
    9236: (e, a, t) => {
      e.exports = t(2337).vendored.contexts.AppRouterContext;
    },
    4004: (e, a, t) => {
      e.exports = t(2337).vendored.contexts.HeadManagerContext;
    },
    5075: (e, a, t) => {
      e.exports = t(2337).vendored.contexts.HooksClientContext;
    },
    3102: (e, a, t) => {
      e.exports = t(2337).vendored.contexts.RouterContext;
    },
    5853: (e, a, t) => {
      e.exports = t(2337).vendored.contexts.ServerInsertedHtml;
    },
    3638: (e, a, t) => {
      e.exports = t(2337).vendored["react-ssr"].ReactDOM;
    },
    3854: (e, a, t) => {
      e.exports = t(2337).vendored["react-ssr"].ReactJsxRuntime;
    },
    9530: (e, a, t) => {
      e.exports = t(2337).vendored["react-ssr"].ReactServerDOMWebpackClientEdge;
    },
    4218: (e, a, t) => {
      e.exports = t(2337).vendored["react-ssr"].React;
    },
    9743: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "escapeStringRegexp", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let t = /[|\\{}()[\]^$+*?.-]/,
        i = /[|\\{}()[\]^$+*?.-]/g;
      function p(e) {
        return t.test(e) ? e.replace(i, "\\$&") : e;
      }
    },
    2948: (e, a) => {
      function t(e) {
        let a = 5381;
        for (let t = 0; t < e.length; t++) {
          let i = e.charCodeAt(t);
          a = ((a << 5) + a + i) & 4294967295;
        }
        return a >>> 0;
      }
      function i(e) {
        return t(e).toString(36).slice(0, 5);
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          djb2Hash: function () {
            return t;
          },
          hexHash: function () {
            return i;
          },
        });
    },
    5158: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          NEXT_DYNAMIC_NO_SSR_CODE: function () {
            return t;
          },
          throwWithNoSSR: function () {
            return i;
          },
        });
      let t = "NEXT_DYNAMIC_NO_SSR_CODE";
      function i() {
        let e = Error(t);
        throw ((e.digest = t), e);
      }
    },
    8755: (e, a) => {
      function t(e) {
        return e.startsWith("/") ? e : "/" + e;
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "ensureLeadingSlash", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    7485: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          ActionQueueContext: function () {
            return s;
          },
          createMutableActionQueue: function () {
            return c;
          },
        });
      let i = t(2212),
        p = t(2247),
        n = t(9474),
        o = i._(t(4218)),
        r = t(3579),
        s = o.default.createContext(null);
      function d(e, a) {
        null !== e.pending &&
          ((e.pending = e.pending.next),
          null !== e.pending &&
            l({ actionQueue: e, action: e.pending, setState: a }));
      }
      async function l(e) {
        let { actionQueue: a, action: t, setState: i } = e,
          n = a.state;
        if (!n) throw Error("Invariant: Router state not initialized");
        (a.pending = t), (a.last = t);
        let o = t.payload,
          s = a.action(n, o);
        function l(e) {
          if (t.discarded) {
            a.needsRefresh &&
              null === a.pending &&
              ((a.needsRefresh = !1),
              a.dispatch(
                {
                  type: p.ACTION_REFRESH,
                  cache: (0, r.createEmptyCacheNode)(),
                  mutable: {},
                  origin: window.location.origin,
                },
                i,
              ));
            return;
          }
          (a.state = e),
            a.devToolsInstance && a.devToolsInstance.send(o, e),
            d(a, i),
            t.resolve(e);
        }
        (0, p.isThenable)(s)
          ? s.then(l, (e) => {
              d(a, i), t.reject(e);
            })
          : l(s);
      }
      function c() {
        let e = {
          state: null,
          dispatch: (a, t) =>
            (function (e, a, t) {
              let i;
              let n = new Promise((e, a) => {
                  i = { resolve: e, reject: a };
                }),
                r = {
                  payload: a,
                  next: null,
                  resolve: i.resolve,
                  reject: i.reject,
                };
              (0, o.startTransition)(() => {
                t(n);
              }),
                null === e.pending
                  ? l({ actionQueue: e, action: r, setState: t })
                  : a.type === p.ACTION_NAVIGATE
                    ? ((e.pending.discarded = !0),
                      e.pending.payload.type === p.ACTION_SERVER_ACTION &&
                        (e.needsRefresh = !0),
                      l({ actionQueue: e, action: r, setState: t }))
                    : (null !== e.last && (e.last.next = r), (e.last = r));
            })(e, a, t),
          action: async (e, a) => {
            if (null === e)
              throw Error("Invariant: Router state not initialized");
            let t = (0, n.reducer)(e, a);
            return t;
          },
          pending: null,
          last: null,
        };
        return e;
      }
    },
    1124: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "addPathPrefix", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(1242);
      function p(e, a) {
        if (!e.startsWith("/") || !a) return e;
        let { pathname: t, query: p, hash: n } = (0, i.parsePath)(e);
        return "" + a + t + p + n;
      }
    },
    1356: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          normalizeAppPath: function () {
            return n;
          },
          normalizeRscURL: function () {
            return o;
          },
        });
      let i = t(8755),
        p = t(1516);
      function n(e) {
        return (0, i.ensureLeadingSlash)(
          e
            .split("/")
            .reduce(
              (e, a, t, i) =>
                !a ||
                (0, p.isGroupSegment)(a) ||
                "@" === a[0] ||
                (("page" === a || "route" === a) && t === i.length - 1)
                  ? e
                  : e + "/" + a,
              "",
            ),
        );
      }
      function o(e) {
        return e.replace(/\.rsc($|\?)/, "$1");
      }
    },
    7860: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          formatUrl: function () {
            return o;
          },
          urlObjectKeys: function () {
            return r;
          },
          formatWithValidation: function () {
            return s;
          },
        });
      let i = t(2212),
        p = i._(t(95)),
        n = /https?|ftp|gopher|file/;
      function o(e) {
        let { auth: a, hostname: t } = e,
          i = e.protocol || "",
          o = e.pathname || "",
          r = e.hash || "",
          s = e.query || "",
          d = !1;
        (a = a ? encodeURIComponent(a).replace(/%3A/i, ":") + "@" : ""),
          e.host
            ? (d = a + e.host)
            : t &&
              ((d = a + (~t.indexOf(":") ? "[" + t + "]" : t)),
              e.port && (d += ":" + e.port)),
          s &&
            "object" == typeof s &&
            (s = String(p.urlQueryToSearchParams(s)));
        let l = e.search || (s && "?" + s) || "";
        return (
          i && !i.endsWith(":") && (i += ":"),
          e.slashes || ((!i || n.test(i)) && !1 !== d)
            ? ((d = "//" + (d || "")), o && "/" !== o[0] && (o = "/" + o))
            : d || (d = ""),
          r && "#" !== r[0] && (r = "#" + r),
          l && "?" !== l[0] && (l = "?" + l),
          "" +
            i +
            d +
            (o = o.replace(/[?#]/g, encodeURIComponent)) +
            (l = l.replace("#", "%23")) +
            r
        );
      }
      let r = [
        "auth",
        "hash",
        "host",
        "hostname",
        "href",
        "path",
        "pathname",
        "port",
        "protocol",
        "query",
        "search",
        "slashes",
      ];
      function s(e) {
        return o(e);
      }
    },
    5244: (e, a) => {
      function t(e, a) {
        if ((void 0 === a && (a = {}), a.onlyHashChange)) {
          e();
          return;
        }
        let t = document.documentElement,
          i = t.style.scrollBehavior;
        (t.style.scrollBehavior = "auto"),
          a.dontForceLayout || t.getClientRects(),
          e(),
          (t.style.scrollBehavior = i);
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "handleSmoothScroll", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    6553: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          getSortedRoutes: function () {
            return i.getSortedRoutes;
          },
          isDynamicRoute: function () {
            return p.isDynamicRoute;
          },
        });
      let i = t(6760),
        p = t(6537);
    },
    2157: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "interpolateAs", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = t(2413),
        p = t(745);
      function n(e, a, t) {
        let n = "",
          o = (0, p.getRouteRegex)(e),
          r = o.groups,
          s = (a !== e ? (0, i.getRouteMatcher)(o)(a) : "") || t;
        n = e;
        let d = Object.keys(r);
        return (
          d.every((e) => {
            let a = s[e] || "",
              { repeat: t, optional: i } = r[e],
              p = "[" + (t ? "..." : "") + e + "]";
            return (
              i && (p = (a ? "" : "/") + "[" + p + "]"),
              t && !Array.isArray(a) && (a = [a]),
              (i || e in s) &&
                (n =
                  n.replace(
                    p,
                    t
                      ? a.map((e) => encodeURIComponent(e)).join("/")
                      : encodeURIComponent(a),
                  ) || "/")
            );
          }) || (n = ""),
          { params: d, result: n }
        );
      }
    },
    6040: (e, a) => {
      function t(e) {
        return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(
          e,
        );
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "isBot", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    6537: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "isDynamicRoute", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = t(5513),
        p = /\/\[[^/]+?\](?=\/|$)/;
      function n(e) {
        return (
          (0, i.isInterceptionRouteAppPath)(e) &&
            (e = (0, i.extractInterceptionRouteInformation)(
              e,
            ).interceptedRoute),
          p.test(e)
        );
      }
    },
    9677: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "isLocalURL", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = t(703),
        p = t(8423);
      function n(e) {
        if (!(0, i.isAbsoluteUrl)(e)) return !0;
        try {
          let a = (0, i.getLocationOrigin)(),
            t = new URL(e, a);
          return t.origin === a && (0, p.hasBasePath)(t.pathname);
        } catch (e) {
          return !1;
        }
      }
    },
    3302: (e, a) => {
      function t(e, a) {
        let t = {};
        return (
          Object.keys(e).forEach((i) => {
            a.includes(i) || (t[i] = e[i]);
          }),
          t
        );
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "omit", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    1242: (e, a) => {
      function t(e) {
        let a = e.indexOf("#"),
          t = e.indexOf("?"),
          i = t > -1 && (a < 0 || t < a);
        return i || a > -1
          ? {
              pathname: e.substring(0, i ? t : a),
              query: i ? e.substring(t, a > -1 ? a : void 0) : "",
              hash: a > -1 ? e.slice(a) : "",
            }
          : { pathname: e, query: "", hash: "" };
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "parsePath", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    8869: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "pathHasPrefix", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(1242);
      function p(e, a) {
        if ("string" != typeof e) return !1;
        let { pathname: t } = (0, i.parsePath)(e);
        return t === a || t.startsWith(a + "/");
      }
    },
    95: (e, a) => {
      function t(e) {
        let a = {};
        return (
          e.forEach((e, t) => {
            void 0 === a[t]
              ? (a[t] = e)
              : Array.isArray(a[t])
                ? a[t].push(e)
                : (a[t] = [a[t], e]);
          }),
          a
        );
      }
      function i(e) {
        return "string" != typeof e &&
          ("number" != typeof e || isNaN(e)) &&
          "boolean" != typeof e
          ? ""
          : String(e);
      }
      function p(e) {
        let a = new URLSearchParams();
        return (
          Object.entries(e).forEach((e) => {
            let [t, p] = e;
            Array.isArray(p)
              ? p.forEach((e) => a.append(t, i(e)))
              : a.set(t, i(p));
          }),
          a
        );
      }
      function n(e) {
        for (
          var a = arguments.length, t = Array(a > 1 ? a - 1 : 0), i = 1;
          i < a;
          i++
        )
          t[i - 1] = arguments[i];
        return (
          t.forEach((a) => {
            Array.from(a.keys()).forEach((a) => e.delete(a)),
              a.forEach((a, t) => e.append(t, a));
          }),
          e
        );
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          searchParamsToUrlQuery: function () {
            return t;
          },
          urlQueryToSearchParams: function () {
            return p;
          },
          assign: function () {
            return n;
          },
        });
    },
    4538: (e, a) => {
      function t(e) {
        return e.replace(/\/$/, "") || "/";
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "removeTrailingSlash", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    2413: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "getRouteMatcher", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(703);
      function p(e) {
        let { re: a, groups: t } = e;
        return (e) => {
          let p = a.exec(e);
          if (!p) return !1;
          let n = (e) => {
              try {
                return decodeURIComponent(e);
              } catch (e) {
                throw new i.DecodeError("failed to decode param");
              }
            },
            o = {};
          return (
            Object.keys(t).forEach((e) => {
              let a = t[e],
                i = p[a.pos];
              void 0 !== i &&
                (o[e] = ~i.indexOf("/")
                  ? i.split("/").map((e) => n(e))
                  : a.repeat
                    ? [n(i)]
                    : n(i));
            }),
            o
          );
        };
      }
    },
    745: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          getRouteRegex: function () {
            return s;
          },
          getNamedRouteRegex: function () {
            return c;
          },
          getNamedMiddlewareRegex: function () {
            return u;
          },
        });
      let i = t(5513),
        p = t(9743),
        n = t(4538);
      function o(e) {
        let a = e.startsWith("[") && e.endsWith("]");
        a && (e = e.slice(1, -1));
        let t = e.startsWith("...");
        return t && (e = e.slice(3)), { key: e, repeat: t, optional: a };
      }
      function r(e) {
        let a = (0, n.removeTrailingSlash)(e).slice(1).split("/"),
          t = {},
          r = 1;
        return {
          parameterizedRoute: a
            .map((e) => {
              let a = i.INTERCEPTION_ROUTE_MARKERS.find((a) => e.startsWith(a)),
                n = e.match(/\[((?:\[.*\])|.+)\]/);
              if (a && n) {
                let { key: e, optional: i, repeat: s } = o(n[1]);
                return (
                  (t[e] = { pos: r++, repeat: s, optional: i }),
                  "/" + (0, p.escapeStringRegexp)(a) + "([^/]+?)"
                );
              }
              if (!n) return "/" + (0, p.escapeStringRegexp)(e);
              {
                let { key: e, repeat: a, optional: i } = o(n[1]);
                return (
                  (t[e] = { pos: r++, repeat: a, optional: i }),
                  a ? (i ? "(?:/(.+?))?" : "/(.+?)") : "/([^/]+?)"
                );
              }
            })
            .join(""),
          groups: t,
        };
      }
      function s(e) {
        let { parameterizedRoute: a, groups: t } = r(e);
        return { re: RegExp("^" + a + "(?:/)?$"), groups: t };
      }
      function d(e) {
        let { getSafeRouteKey: a, segment: t, routeKeys: i, keyPrefix: p } = e,
          { key: n, optional: r, repeat: s } = o(t),
          d = n.replace(/\W/g, "");
        p && (d = "" + p + d);
        let l = !1;
        return (
          (0 === d.length || d.length > 30) && (l = !0),
          isNaN(parseInt(d.slice(0, 1))) || (l = !0),
          l && (d = a()),
          p ? (i[d] = "" + p + n) : (i[d] = "" + n),
          s
            ? r
              ? "(?:/(?<" + d + ">.+?))?"
              : "/(?<" + d + ">.+?)"
            : "/(?<" + d + ">[^/]+?)"
        );
      }
      function l(e, a) {
        let t;
        let o = (0, n.removeTrailingSlash)(e).slice(1).split("/"),
          r =
            ((t = 0),
            () => {
              let e = "",
                a = ++t;
              for (; a > 0; )
                (e += String.fromCharCode(97 + ((a - 1) % 26))),
                  (a = Math.floor((a - 1) / 26));
              return e;
            }),
          s = {};
        return {
          namedParameterizedRoute: o
            .map((e) => {
              let t = i.INTERCEPTION_ROUTE_MARKERS.some((a) => e.startsWith(a)),
                n = e.match(/\[((?:\[.*\])|.+)\]/);
              return t && n
                ? d({
                    getSafeRouteKey: r,
                    segment: n[1],
                    routeKeys: s,
                    keyPrefix: a ? "nxtI" : void 0,
                  })
                : n
                  ? d({
                      getSafeRouteKey: r,
                      segment: n[1],
                      routeKeys: s,
                      keyPrefix: a ? "nxtP" : void 0,
                    })
                  : "/" + (0, p.escapeStringRegexp)(e);
            })
            .join(""),
          routeKeys: s,
        };
      }
      function c(e, a) {
        let t = l(e, a);
        return {
          ...s(e),
          namedRegex: "^" + t.namedParameterizedRoute + "(?:/)?$",
          routeKeys: t.routeKeys,
        };
      }
      function u(e, a) {
        let { parameterizedRoute: t } = r(e),
          { catchAll: i = !0 } = a;
        if ("/" === t) return { namedRegex: "^/" + (i ? ".*" : "") + "$" };
        let { namedParameterizedRoute: p } = l(e, !1);
        return { namedRegex: "^" + p + (i ? "(?:(/.*)?)" : "") + "$" };
      }
    },
    6760: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "getSortedRoutes", {
          enumerable: !0,
          get: function () {
            return i;
          },
        });
      class t {
        insert(e) {
          this._insert(e.split("/").filter(Boolean), [], !1);
        }
        smoosh() {
          return this._smoosh();
        }
        _smoosh(e) {
          void 0 === e && (e = "/");
          let a = [...this.children.keys()].sort();
          null !== this.slugName && a.splice(a.indexOf("[]"), 1),
            null !== this.restSlugName && a.splice(a.indexOf("[...]"), 1),
            null !== this.optionalRestSlugName &&
              a.splice(a.indexOf("[[...]]"), 1);
          let t = a
            .map((a) => this.children.get(a)._smoosh("" + e + a + "/"))
            .reduce((e, a) => [...e, ...a], []);
          if (
            (null !== this.slugName &&
              t.push(
                ...this.children
                  .get("[]")
                  ._smoosh(e + "[" + this.slugName + "]/"),
              ),
            !this.placeholder)
          ) {
            let a = "/" === e ? "/" : e.slice(0, -1);
            if (null != this.optionalRestSlugName)
              throw Error(
                'You cannot define a route with the same specificity as a optional catch-all route ("' +
                  a +
                  '" and "' +
                  a +
                  "[[..." +
                  this.optionalRestSlugName +
                  ']]").',
              );
            t.unshift(a);
          }
          return (
            null !== this.restSlugName &&
              t.push(
                ...this.children
                  .get("[...]")
                  ._smoosh(e + "[..." + this.restSlugName + "]/"),
              ),
            null !== this.optionalRestSlugName &&
              t.push(
                ...this.children
                  .get("[[...]]")
                  ._smoosh(e + "[[..." + this.optionalRestSlugName + "]]/"),
              ),
            t
          );
        }
        _insert(e, a, i) {
          if (0 === e.length) {
            this.placeholder = !1;
            return;
          }
          if (i) throw Error("Catch-all must be the last part of the URL.");
          let p = e[0];
          if (p.startsWith("[") && p.endsWith("]")) {
            let t = p.slice(1, -1),
              o = !1;
            if (
              (t.startsWith("[") &&
                t.endsWith("]") &&
                ((t = t.slice(1, -1)), (o = !0)),
              t.startsWith("...") && ((t = t.substring(3)), (i = !0)),
              t.startsWith("[") || t.endsWith("]"))
            )
              throw Error(
                "Segment names may not start or end with extra brackets ('" +
                  t +
                  "').",
              );
            if (t.startsWith("."))
              throw Error(
                "Segment names may not start with erroneous periods ('" +
                  t +
                  "').",
              );
            function n(e, t) {
              if (null !== e && e !== t)
                throw Error(
                  "You cannot use different slug names for the same dynamic path ('" +
                    e +
                    "' !== '" +
                    t +
                    "').",
                );
              a.forEach((e) => {
                if (e === t)
                  throw Error(
                    'You cannot have the same slug name "' +
                      t +
                      '" repeat within a single dynamic path',
                  );
                if (e.replace(/\W/g, "") === p.replace(/\W/g, ""))
                  throw Error(
                    'You cannot have the slug names "' +
                      e +
                      '" and "' +
                      t +
                      '" differ only by non-word symbols within a single dynamic path',
                  );
              }),
                a.push(t);
            }
            if (i) {
              if (o) {
                if (null != this.restSlugName)
                  throw Error(
                    'You cannot use both an required and optional catch-all route at the same level ("[...' +
                      this.restSlugName +
                      ']" and "' +
                      e[0] +
                      '" ).',
                  );
                n(this.optionalRestSlugName, t),
                  (this.optionalRestSlugName = t),
                  (p = "[[...]]");
              } else {
                if (null != this.optionalRestSlugName)
                  throw Error(
                    'You cannot use both an optional and required catch-all route at the same level ("[[...' +
                      this.optionalRestSlugName +
                      ']]" and "' +
                      e[0] +
                      '").',
                  );
                n(this.restSlugName, t), (this.restSlugName = t), (p = "[...]");
              }
            } else {
              if (o)
                throw Error(
                  'Optional route parameters are not yet supported ("' +
                    e[0] +
                    '").',
                );
              n(this.slugName, t), (this.slugName = t), (p = "[]");
            }
          }
          this.children.has(p) || this.children.set(p, new t()),
            this.children.get(p)._insert(e.slice(1), a, i);
        }
        constructor() {
          (this.placeholder = !0),
            (this.children = new Map()),
            (this.slugName = null),
            (this.restSlugName = null),
            (this.optionalRestSlugName = null);
        }
      }
      function i(e) {
        let a = new t();
        return e.forEach((e) => a.insert(e)), a.smoosh();
      }
    },
    1516: (e, a) => {
      function t(e) {
        return "(" === e[0] && e.endsWith(")");
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "isGroupSegment", {
          enumerable: !0,
          get: function () {
            return t;
          },
        });
    },
    703: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          WEB_VITALS: function () {
            return t;
          },
          execOnce: function () {
            return i;
          },
          isAbsoluteUrl: function () {
            return n;
          },
          getLocationOrigin: function () {
            return o;
          },
          getURL: function () {
            return r;
          },
          getDisplayName: function () {
            return s;
          },
          isResSent: function () {
            return d;
          },
          normalizeRepeatedSlashes: function () {
            return l;
          },
          loadGetInitialProps: function () {
            return c;
          },
          SP: function () {
            return u;
          },
          ST: function () {
            return m;
          },
          DecodeError: function () {
            return f;
          },
          NormalizeError: function () {
            return v;
          },
          PageNotFoundError: function () {
            return h;
          },
          MissingStaticPage: function () {
            return g;
          },
          MiddlewareNotFoundError: function () {
            return b;
          },
          stringifyError: function () {
            return x;
          },
        });
      let t = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];
      function i(e) {
        let a,
          t = !1;
        return function () {
          for (var i = arguments.length, p = Array(i), n = 0; n < i; n++)
            p[n] = arguments[n];
          return t || ((t = !0), (a = e(...p))), a;
        };
      }
      let p = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
        n = (e) => p.test(e);
      function o() {
        let { protocol: e, hostname: a, port: t } = window.location;
        return e + "//" + a + (t ? ":" + t : "");
      }
      function r() {
        let { href: e } = window.location,
          a = o();
        return e.substring(a.length);
      }
      function s(e) {
        return "string" == typeof e ? e : e.displayName || e.name || "Unknown";
      }
      function d(e) {
        return e.finished || e.headersSent;
      }
      function l(e) {
        let a = e.split("?"),
          t = a[0];
        return (
          t.replace(/\\/g, "/").replace(/\/\/+/g, "/") +
          (a[1] ? "?" + a.slice(1).join("?") : "")
        );
      }
      async function c(e, a) {
        let t = a.res || (a.ctx && a.ctx.res);
        if (!e.getInitialProps)
          return a.ctx && a.Component
            ? { pageProps: await c(a.Component, a.ctx) }
            : {};
        let i = await e.getInitialProps(a);
        if (t && d(t)) return i;
        if (!i) {
          let a =
            '"' +
            s(e) +
            '.getInitialProps()" should resolve to an object. But found "' +
            i +
            '" instead.';
          throw Error(a);
        }
        return i;
      }
      let u = "undefined" != typeof performance,
        m =
          u &&
          ["mark", "measure", "getEntriesByName"].every(
            (e) => "function" == typeof performance[e],
          );
      class f extends Error {}
      class v extends Error {}
      class h extends Error {
        constructor(e) {
          super(),
            (this.code = "ENOENT"),
            (this.name = "PageNotFoundError"),
            (this.message = "Cannot find module for page: " + e);
        }
      }
      class g extends Error {
        constructor(e, a) {
          super(),
            (this.message =
              "Failed to load static file for page: " + e + " " + a);
        }
      }
      class b extends Error {
        constructor() {
          super(),
            (this.code = "ENOENT"),
            (this.message = "Cannot find the middleware module");
        }
      }
      function x(e) {
        return JSON.stringify({ message: e.message, stack: e.stack });
      }
    },
    5548: (e, a, t) => {
      e.exports = t(7490);
    },
    283: (e, a, t) => {
      e.exports = t(233);
    },
    3632: (e, a, t) => {
      var i = t(7310).parse,
        p = { ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443 },
        n =
          String.prototype.endsWith ||
          function (e) {
            return (
              e.length <= this.length &&
              -1 !== this.indexOf(e, this.length - e.length)
            );
          };
      function o(e) {
        return (
          process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || ""
        );
      }
      a.j = function (e) {
        var a,
          t,
          r,
          s = "string" == typeof e ? i(e) : e || {},
          d = s.protocol,
          l = s.host,
          c = s.port;
        if (
          "string" != typeof l ||
          !l ||
          "string" != typeof d ||
          ((d = d.split(":", 1)[0]),
          (a = l = l.replace(/:\d*$/, "")),
          (t = c = parseInt(c) || p[d] || 0),
          !(
            !(r = (o("npm_config_no_proxy") || o("no_proxy")).toLowerCase()) ||
            ("*" !== r &&
              r.split(/[,\s]/).every(function (e) {
                if (!e) return !0;
                var i = e.match(/^(.+):(\d+)$/),
                  p = i ? i[1] : e,
                  o = i ? parseInt(i[2]) : 0;
                return (
                  (!!o && o !== t) ||
                  (/^[.*]/.test(p)
                    ? ("*" === p.charAt(0) && (p = p.slice(1)), !n.call(a, p))
                    : a !== p)
                );
              }))
          ))
        )
          return "";
        var u =
          o("npm_config_" + d + "_proxy") ||
          o(d + "_proxy") ||
          o("npm_config_proxy") ||
          o("all_proxy");
        return u && -1 === u.indexOf("://") && (u = d + "://" + u), u;
      };
    },
    6677: (e, a, t) => {
      var i = t(5477),
        p = t(1841),
        n = { TRANSITIONAL: 0, NONTRANSITIONAL: 1 };
      function o(e) {
        return e
          .split("\x00")
          .map(function (e) {
            return e.normalize("NFC");
          })
          .join("\x00");
      }
      function r(e) {
        for (var a = 0, t = p.length - 1; a <= t; ) {
          var i = Math.floor((a + t) / 2),
            n = p[i];
          if (n[0][0] <= e && n[0][1] >= e) return n;
          n[0][0] > e ? (t = i - 1) : (a = i + 1);
        }
        return null;
      }
      var s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      function d(e) {
        return e.replace(s, "_").length;
      }
      var l =
        /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDE2C-\uDE37\uDEDF-\uDEEA\uDF01-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDE30-\uDE40\uDEAB-\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]/;
      function c(e, a, t) {
        var p = (function (e, a, t) {
          for (var i = !1, p = "", o = d(e), s = 0; s < o; ++s) {
            var l = e.codePointAt(s),
              c = r(l);
            switch (c[1]) {
              case "disallowed":
                (i = !0), (p += String.fromCodePoint(l));
                break;
              case "ignored":
                break;
              case "mapped":
                p += String.fromCodePoint.apply(String, c[2]);
                break;
              case "deviation":
                t === n.TRANSITIONAL
                  ? (p += String.fromCodePoint.apply(String, c[2]))
                  : (p += String.fromCodePoint(l));
                break;
              case "valid":
                p += String.fromCodePoint(l);
                break;
              case "disallowed_STD3_mapped":
                a
                  ? ((i = !0), (p += String.fromCodePoint(l)))
                  : (p += String.fromCodePoint.apply(String, c[2]));
                break;
              case "disallowed_STD3_valid":
                a && (i = !0), (p += String.fromCodePoint(l));
            }
          }
          return { string: p, error: i };
        })(e, a, t);
        p.string = o(p.string);
        for (var s = p.string.split("."), u = 0; u < s.length; ++u)
          try {
            var m = (function (e, a) {
              "xn--" === e.substr(0, 4) &&
                ((e = i.toUnicode(e)), n.NONTRANSITIONAL);
              var t = !1;
              (o(e) !== e ||
                ("-" === e[3] && "-" === e[4]) ||
                "-" === e[0] ||
                "-" === e[e.length - 1] ||
                -1 !== e.indexOf(".") ||
                0 === e.search(l)) &&
                (t = !0);
              for (var p = d(e), s = 0; s < p; ++s) {
                var u = r(e.codePointAt(s));
                if (
                  (c === n.TRANSITIONAL && "valid" !== u[1]) ||
                  (c === n.NONTRANSITIONAL &&
                    "valid" !== u[1] &&
                    "deviation" !== u[1])
                ) {
                  t = !0;
                  break;
                }
              }
              return { label: e, error: t };
            })(s[u]);
            (s[u] = m.label), (p.error = p.error || m.error);
          } catch (e) {
            p.error = !0;
          }
        return { string: s.join("."), error: p.error };
      }
      (e.exports.toASCII = function (e, a, t, p) {
        var n = c(e, a, t),
          o = n.string.split(".");
        if (
          ((o = o.map(function (e) {
            try {
              return i.toASCII(e);
            } catch (a) {
              return (n.error = !0), e;
            }
          })),
          p)
        ) {
          var r = o.slice(0, o.length - 1).join(".").length;
          (r.length > 253 || 0 === r.length) && (n.error = !0);
          for (var s = 0; s < o.length; ++s)
            if (o.length > 63 || 0 === o.length) {
              n.error = !0;
              break;
            }
        }
        return n.error ? null : o.join(".");
      }),
        (e.exports.toUnicode = function (e, a) {
          var t = c(e, a, n.NONTRANSITIONAL);
          return { domain: t.string, error: t.error };
        }),
        (e.exports.PROCESSING_OPTIONS = n);
    },
    5397: (e, a, t) => {
      /**
       * @license React
       * use-sync-external-store-shim.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var i = t(4218);
      "function" == typeof Object.is && Object.is,
        i.useState,
        i.useEffect,
        i.useLayoutEffect,
        i.useDebugValue,
        (a.useSyncExternalStore =
          void 0 !== i.useSyncExternalStore
            ? i.useSyncExternalStore
            : function (e, a) {
                return a();
              });
    },
    4403: (e, a, t) => {
      /**
       * @license React
       * use-sync-external-store-shim/with-selector.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var i = t(4218),
        p = t(1913),
        n =
          "function" == typeof Object.is
            ? Object.is
            : function (e, a) {
                return (
                  (e === a && (0 !== e || 1 / e == 1 / a)) || (e != e && a != a)
                );
              },
        o = p.useSyncExternalStore,
        r = i.useRef,
        s = i.useEffect,
        d = i.useMemo,
        l = i.useDebugValue;
      a.useSyncExternalStoreWithSelector = function (e, a, t, i, p) {
        var c = r(null);
        if (null === c.current) {
          var u = { hasValue: !1, value: null };
          c.current = u;
        } else u = c.current;
        var m = o(
          e,
          (c = d(
            function () {
              function e(e) {
                if (!s) {
                  if (
                    ((s = !0), (o = e), (e = i(e)), void 0 !== p && u.hasValue)
                  ) {
                    var a = u.value;
                    if (p(a, e)) return (r = a);
                  }
                  return (r = e);
                }
                if (((a = r), n(o, e))) return a;
                var t = i(e);
                return void 0 !== p && p(a, t) ? a : ((o = e), (r = t));
              }
              var o,
                r,
                s = !1,
                d = void 0 === t ? null : t;
              return [
                function () {
                  return e(a());
                },
                null === d
                  ? void 0
                  : function () {
                      return e(d());
                    },
              ];
            },
            [a, t, i, p],
          ))[0],
          c[1],
        );
        return (
          s(
            function () {
              (u.hasValue = !0), (u.value = m);
            },
            [m],
          ),
          l(m),
          m
        );
      };
    },
    1913: (e, a, t) => {
      e.exports = t(5397);
    },
    7359: (e, a, t) => {
      e.exports = t(4403);
    },
    8567: (e) => {
      var a = {};
      function t(e, a) {
        !a.unsigned && --e;
        let t = a.unsigned ? 0 : -Math.pow(2, e),
          i = Math.pow(2, e) - 1,
          p = a.moduloBitLength
            ? Math.pow(2, a.moduloBitLength)
            : Math.pow(2, e),
          n = a.moduloBitLength
            ? Math.pow(2, a.moduloBitLength - 1)
            : Math.pow(2, e - 1);
        return function (e, o) {
          o || (o = {});
          let r = +e;
          if (o.enforceRange) {
            if (!Number.isFinite(r))
              throw TypeError("Argument is not a finite number");
            if ((r = (r < 0 ? -1 : 1) * Math.floor(Math.abs(r))) < t || r > i)
              throw TypeError("Argument is not in byte range");
            return r;
          }
          if (!isNaN(r) && o.clamp) {
            var s;
            return (
              (r =
                (s = r) % 1 == 0.5 && (1 & s) == 0
                  ? Math.floor(s)
                  : Math.round(s)) < t && (r = t),
              r > i && (r = i),
              r
            );
          }
          if (!Number.isFinite(r) || 0 === r) return 0;
          if (
            ((r = ((r < 0 ? -1 : 1) * Math.floor(Math.abs(r))) % p),
            !a.unsigned && r >= n)
          )
            return r - p;
          if (a.unsigned) {
            if (r < 0) r += p;
            else if (-0 === r) return 0;
          }
          return r;
        };
      }
      (e.exports = a),
        (a.void = function () {}),
        (a.boolean = function (e) {
          return !!e;
        }),
        (a.byte = t(8, { unsigned: !1 })),
        (a.octet = t(8, { unsigned: !0 })),
        (a.short = t(16, { unsigned: !1 })),
        (a["unsigned short"] = t(16, { unsigned: !0 })),
        (a.long = t(32, { unsigned: !1 })),
        (a["unsigned long"] = t(32, { unsigned: !0 })),
        (a["long long"] = t(32, { unsigned: !1, moduloBitLength: 64 })),
        (a["unsigned long long"] = t(32, {
          unsigned: !0,
          moduloBitLength: 64,
        })),
        (a.double = function (e) {
          let a = +e;
          if (!Number.isFinite(a))
            throw TypeError("Argument is not a finite floating-point value");
          return a;
        }),
        (a["unrestricted double"] = function (e) {
          let a = +e;
          if (isNaN(a)) throw TypeError("Argument is NaN");
          return a;
        }),
        (a.float = a.double),
        (a["unrestricted float"] = a["unrestricted double"]),
        (a.DOMString = function (e, a) {
          return (a || (a = {}), a.treatNullAsEmptyString && null === e)
            ? ""
            : String(e);
        }),
        (a.ByteString = function (e, a) {
          let t;
          let i = String(e);
          for (let e = 0; void 0 !== (t = i.codePointAt(e)); ++e)
            if (t > 255) throw TypeError("Argument is not a valid bytestring");
          return i;
        }),
        (a.USVString = function (e) {
          let a = String(e),
            t = a.length,
            i = [];
          for (let e = 0; e < t; ++e) {
            let p = a.charCodeAt(e);
            if (p < 55296 || p > 57343) i.push(String.fromCodePoint(p));
            else if (56320 <= p && p <= 57343)
              i.push(String.fromCodePoint(65533));
            else if (e === t - 1) i.push(String.fromCodePoint(65533));
            else {
              let t = a.charCodeAt(e + 1);
              if (56320 <= t && t <= 57343) {
                let a = 1023 & p,
                  n = 1023 & t;
                i.push(String.fromCodePoint(65536 + 1024 * a + n)), ++e;
              } else i.push(String.fromCodePoint(65533));
            }
          }
          return i.join("");
        }),
        (a.Date = function (e, a) {
          if (!(e instanceof Date))
            throw TypeError("Argument is not a Date object");
          if (!isNaN(e)) return e;
        }),
        (a.RegExp = function (e, a) {
          return e instanceof RegExp || (e = new RegExp(e)), e;
        });
    },
    1716: (e, a, t) => {
      let i = t(9746);
      a.implementation = class {
        constructor(e) {
          let a = e[0],
            t = e[1],
            p = null;
          if (void 0 !== t && "failure" === (p = i.basicURLParse(t)))
            throw TypeError("Invalid base URL");
          let n = i.basicURLParse(a, { baseURL: p });
          if ("failure" === n) throw TypeError("Invalid URL");
          this._url = n;
        }
        get href() {
          return i.serializeURL(this._url);
        }
        set href(e) {
          let a = i.basicURLParse(e);
          if ("failure" === a) throw TypeError("Invalid URL");
          this._url = a;
        }
        get origin() {
          return i.serializeURLOrigin(this._url);
        }
        get protocol() {
          return this._url.scheme + ":";
        }
        set protocol(e) {
          i.basicURLParse(e + ":", {
            url: this._url,
            stateOverride: "scheme start",
          });
        }
        get username() {
          return this._url.username;
        }
        set username(e) {
          i.cannotHaveAUsernamePasswordPort(this._url) ||
            i.setTheUsername(this._url, e);
        }
        get password() {
          return this._url.password;
        }
        set password(e) {
          i.cannotHaveAUsernamePasswordPort(this._url) ||
            i.setThePassword(this._url, e);
        }
        get host() {
          let e = this._url;
          return null === e.host
            ? ""
            : null === e.port
              ? i.serializeHost(e.host)
              : i.serializeHost(e.host) + ":" + i.serializeInteger(e.port);
        }
        set host(e) {
          this._url.cannotBeABaseURL ||
            i.basicURLParse(e, { url: this._url, stateOverride: "host" });
        }
        get hostname() {
          return null === this._url.host ? "" : i.serializeHost(this._url.host);
        }
        set hostname(e) {
          this._url.cannotBeABaseURL ||
            i.basicURLParse(e, { url: this._url, stateOverride: "hostname" });
        }
        get port() {
          return null === this._url.port
            ? ""
            : i.serializeInteger(this._url.port);
        }
        set port(e) {
          i.cannotHaveAUsernamePasswordPort(this._url) ||
            ("" === e
              ? (this._url.port = null)
              : i.basicURLParse(e, { url: this._url, stateOverride: "port" }));
        }
        get pathname() {
          return this._url.cannotBeABaseURL
            ? this._url.path[0]
            : 0 === this._url.path.length
              ? ""
              : "/" + this._url.path.join("/");
        }
        set pathname(e) {
          this._url.cannotBeABaseURL ||
            ((this._url.path = []),
            i.basicURLParse(e, {
              url: this._url,
              stateOverride: "path start",
            }));
        }
        get search() {
          return null === this._url.query || "" === this._url.query
            ? ""
            : "?" + this._url.query;
        }
        set search(e) {
          let a = this._url;
          if ("" === e) {
            a.query = null;
            return;
          }
          let t = "?" === e[0] ? e.substring(1) : e;
          (a.query = ""),
            i.basicURLParse(t, { url: a, stateOverride: "query" });
        }
        get hash() {
          return null === this._url.fragment || "" === this._url.fragment
            ? ""
            : "#" + this._url.fragment;
        }
        set hash(e) {
          if ("" === e) {
            this._url.fragment = null;
            return;
          }
          let a = "#" === e[0] ? e.substring(1) : e;
          (this._url.fragment = ""),
            i.basicURLParse(a, { url: this._url, stateOverride: "fragment" });
        }
        toJSON() {
          return this.href;
        }
      };
    },
    8653: (e, a, t) => {
      let i = t(8567),
        p = t(5429),
        n = t(1716),
        o = p.implSymbol;
      function URL(a) {
        if (!this || this[o] || !(this instanceof URL))
          throw TypeError(
            "Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.",
          );
        if (arguments.length < 1)
          throw TypeError(
            "Failed to construct 'URL': 1 argument required, but only " +
              arguments.length +
              " present.",
          );
        let t = [];
        for (let e = 0; e < arguments.length && e < 2; ++e) t[e] = arguments[e];
        (t[0] = i.USVString(t[0])),
          void 0 !== t[1] && (t[1] = i.USVString(t[1])),
          e.exports.setup(this, t);
      }
      (URL.prototype.toJSON = function () {
        if (!this || !e.exports.is(this)) throw TypeError("Illegal invocation");
        let a = [];
        for (let e = 0; e < arguments.length && e < 0; ++e) a[e] = arguments[e];
        return this[o].toJSON.apply(this[o], a);
      }),
        Object.defineProperty(URL.prototype, "href", {
          get() {
            return this[o].href;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].href = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (URL.prototype.toString = function () {
          if (!this || !e.exports.is(this))
            throw TypeError("Illegal invocation");
          return this.href;
        }),
        Object.defineProperty(URL.prototype, "origin", {
          get() {
            return this[o].origin;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "protocol", {
          get() {
            return this[o].protocol;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].protocol = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "username", {
          get() {
            return this[o].username;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].username = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "password", {
          get() {
            return this[o].password;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].password = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "host", {
          get() {
            return this[o].host;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].host = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "hostname", {
          get() {
            return this[o].hostname;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].hostname = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "port", {
          get() {
            return this[o].port;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].port = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "pathname", {
          get() {
            return this[o].pathname;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].pathname = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "search", {
          get() {
            return this[o].search;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].search = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(URL.prototype, "hash", {
          get() {
            return this[o].hash;
          },
          set(e) {
            (e = i.USVString(e)), (this[o].hash = e);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.exports = {
          is: (e) => !!e && e[o] instanceof n.implementation,
          create(e, a) {
            let t = Object.create(URL.prototype);
            return this.setup(t, e, a), t;
          },
          setup(e, a, t) {
            t || (t = {}),
              (t.wrapper = e),
              (e[o] = new n.implementation(a, t)),
              (e[o][p.wrapperSymbol] = e);
          },
          interface: URL,
          expose: { Window: { URL: URL }, Worker: { URL: URL } },
        });
    },
    9854: (e, a, t) => {
      (a.URL = t(8653).interface),
        t(9746).serializeURL,
        t(9746).serializeURLOrigin,
        t(9746).basicURLParse,
        t(9746).setTheUsername,
        t(9746).setThePassword,
        t(9746).serializeHost,
        t(9746).serializeInteger,
        t(9746).parseURL;
    },
    9746: (e, a, t) => {
      let i = t(5477),
        p = t(6677),
        n = {
          ftp: 21,
          file: null,
          gopher: 70,
          http: 80,
          https: 443,
          ws: 80,
          wss: 443,
        },
        o = Symbol("failure");
      function r(e) {
        return i.ucs2.decode(e).length;
      }
      function s(e, a) {
        let t = e[a];
        return isNaN(t) ? void 0 : String.fromCodePoint(t);
      }
      function d(e) {
        return e >= 48 && e <= 57;
      }
      function l(e) {
        return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
      }
      function c(e) {
        return d(e) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102);
      }
      function u(e) {
        return "." === e || "%2e" === e.toLowerCase();
      }
      function m(e) {
        return (
          2 === e.length &&
          l(e.codePointAt(0)) &&
          (":" === e[1] || "|" === e[1])
        );
      }
      function f(e) {
        return void 0 !== n[e];
      }
      function v(e) {
        return f(e.scheme);
      }
      function h(e) {
        let a = e.toString(16).toUpperCase();
        return 1 === a.length && (a = "0" + a), "%" + a;
      }
      function g(e) {
        return e <= 31 || e > 126;
      }
      let b = new Set([32, 34, 35, 60, 62, 63, 96, 123, 125]);
      function x(e) {
        return g(e) || b.has(e);
      }
      let _ = new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);
      function y(e) {
        return x(e) || _.has(e);
      }
      function w(e, a) {
        let t = String.fromCodePoint(e);
        return a(e)
          ? (function (e) {
              let a = new Buffer(e),
                t = "";
              for (let e = 0; e < a.length; ++e) t += h(a[e]);
              return t;
            })(t)
          : t;
      }
      function S(e, a) {
        if ("[" === e[0])
          return "]" !== e[e.length - 1]
            ? o
            : (function (e) {
                let a = [0, 0, 0, 0, 0, 0, 0, 0],
                  t = 0,
                  p = null,
                  n = 0;
                if (58 === (e = i.ucs2.decode(e))[n]) {
                  if (58 !== e[n + 1]) return o;
                  (n += 2), (p = ++t);
                }
                for (; n < e.length; ) {
                  if (8 === t) return o;
                  if (58 === e[n]) {
                    if (null !== p) return o;
                    ++n, (p = ++t);
                    continue;
                  }
                  let i = 0,
                    r = 0;
                  for (; r < 4 && c(e[n]); )
                    (i = 16 * i + parseInt(s(e, n), 16)), ++n, ++r;
                  if (46 === e[n]) {
                    if (0 === r || ((n -= r), t > 6)) return o;
                    let i = 0;
                    for (; void 0 !== e[n]; ) {
                      let p = null;
                      if (i > 0) {
                        if (46 !== e[n] || !(i < 4)) return o;
                        ++n;
                      }
                      if (!d(e[n])) return o;
                      for (; d(e[n]); ) {
                        let a = parseInt(s(e, n));
                        if (null === p) p = a;
                        else {
                          if (0 === p) return o;
                          p = 10 * p + a;
                        }
                        if (p > 255) return o;
                        ++n;
                      }
                      (a[t] = 256 * a[t] + p), (2 == ++i || 4 === i) && ++t;
                    }
                    if (4 !== i) return o;
                    break;
                  }
                  if (58 === e[n]) {
                    if (void 0 === e[++n]) return o;
                  } else if (void 0 !== e[n]) return o;
                  (a[t] = i), ++t;
                }
                if (null !== p) {
                  let e = t - p;
                  for (t = 7; 0 !== t && e > 0; ) {
                    let i = a[p + e - 1];
                    (a[p + e - 1] = a[t]), (a[t] = i), --t, --e;
                  }
                } else if (null === p && 8 !== t) return o;
                return a;
              })(e.substring(1, e.length - 1));
        if (!a)
          return (function (e) {
            if (
              -1 !==
              e.search(
                /\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/,
              )
            )
              return o;
            let a = "",
              t = i.ucs2.decode(e);
            for (let e = 0; e < t.length; ++e) a += w(t[e], g);
            return a;
          })(e);
        let t = (function (e) {
            let a = new Buffer(e),
              t = [];
            for (let e = 0; e < a.length; ++e)
              37 !== a[e]
                ? t.push(a[e])
                : 37 === a[e] && c(a[e + 1]) && c(a[e + 2])
                  ? (t.push(parseInt(a.slice(e + 1, e + 3).toString(), 16)),
                    (e += 2))
                  : t.push(a[e]);
            return new Buffer(t).toString();
          })(e),
          n = p.toASCII(t, !1, p.PROCESSING_OPTIONS.NONTRANSITIONAL, !1);
        if (
          null === n ||
          -1 !==
            n.search(
              /\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/,
            )
        )
          return o;
        let r = (function (e) {
          let a = e.split(".");
          if (("" === a[a.length - 1] && a.length > 1 && a.pop(), a.length > 4))
            return e;
          let t = [];
          for (let i of a) {
            if ("" === i) return e;
            let a = (function (e) {
              let a = 10;
              if (
                (e.length >= 2 &&
                "0" === e.charAt(0) &&
                "x" === e.charAt(1).toLowerCase()
                  ? ((e = e.substring(2)), (a = 16))
                  : e.length >= 2 &&
                    "0" === e.charAt(0) &&
                    ((e = e.substring(1)), (a = 8)),
                "" === e)
              )
                return 0;
              let t =
                10 === a ? /[^0-9]/ : 16 === a ? /[^0-9A-Fa-f]/ : /[^0-7]/;
              return t.test(e) ? o : parseInt(e, a);
            })(i);
            if (a === o) return e;
            t.push(a);
          }
          for (let e = 0; e < t.length - 1; ++e) if (t[e] > 255) return o;
          if (t[t.length - 1] >= Math.pow(256, 5 - t.length)) return o;
          let i = t.pop(),
            p = 0;
          for (let e of t) (i += e * Math.pow(256, 3 - p)), ++p;
          return i;
        })(n);
        return "number" == typeof r || r === o ? r : n;
      }
      function E(e) {
        return "number" == typeof e
          ? (function (e) {
              let a = "",
                t = e;
              for (let e = 1; e <= 4; ++e)
                (a = String(t % 256) + a),
                  4 !== e && (a = "." + a),
                  (t = Math.floor(t / 256));
              return a;
            })(e)
          : e instanceof Array
            ? "[" +
              (function (e) {
                let a = "",
                  t = (function (e) {
                    let a = null,
                      t = 1,
                      i = null,
                      p = 0;
                    for (let n = 0; n < e.length; ++n)
                      0 !== e[n]
                        ? (p > t && ((a = i), (t = p)), (i = null), (p = 0))
                        : (null === i && (i = n), ++p);
                    return p > t && ((a = i), (t = p)), { idx: a, len: t };
                  })(e),
                  i = t.idx,
                  p = !1;
                for (let t = 0; t <= 7; ++t)
                  if (!p || 0 !== e[t]) {
                    if ((p && (p = !1), i === t)) {
                      let e = 0 === t ? "::" : ":";
                      (a += e), (p = !0);
                      continue;
                    }
                    (a += e[t].toString(16)), 7 !== t && (a += ":");
                  }
                return a;
              })(e) +
              "]"
            : e;
      }
      function T(e) {
        var a;
        let t = e.path;
        !(
          0 === t.length ||
          ("file" === e.scheme &&
            1 === t.length &&
            ((a = t[0]), /^[A-Za-z]:$/.test(a)))
        ) && t.pop();
      }
      function N(e) {
        return "" !== e.username || "" !== e.password;
      }
      function R(e, a, t, p, n) {
        if (
          ((this.pointer = 0),
          (this.input = e),
          (this.base = a || null),
          (this.encodingOverride = t || "utf-8"),
          (this.stateOverride = n),
          (this.url = p),
          (this.failure = !1),
          (this.parseError = !1),
          !this.url)
        ) {
          this.url = {
            scheme: "",
            username: "",
            password: "",
            host: null,
            port: null,
            path: [],
            query: null,
            fragment: null,
            cannotBeABaseURL: !1,
          };
          let e = this.input.replace(
            /^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g,
            "",
          );
          e !== this.input && (this.parseError = !0), (this.input = e);
        }
        let r = this.input.replace(/\u0009|\u000A|\u000D/g, "");
        for (
          r !== this.input && (this.parseError = !0),
            this.input = r,
            this.state = n || "scheme start",
            this.buffer = "",
            this.atFlag = !1,
            this.arrFlag = !1,
            this.passwordTokenSeenFlag = !1,
            this.input = i.ucs2.decode(this.input);
          this.pointer <= this.input.length;
          ++this.pointer
        ) {
          let e = this.input[this.pointer],
            a = isNaN(e) ? void 0 : String.fromCodePoint(e),
            t = this["parse " + this.state](e, a);
          if (t) {
            if (t === o) {
              this.failure = !0;
              break;
            }
          } else break;
        }
      }
      (R.prototype["parse scheme start"] = function (e, a) {
        if (l(e)) (this.buffer += a.toLowerCase()), (this.state = "scheme");
        else {
          if (this.stateOverride) return (this.parseError = !0), o;
          (this.state = "no scheme"), --this.pointer;
        }
        return !0;
      }),
        (R.prototype["parse scheme"] = function (e, a) {
          if (l(e) || d(e) || 43 === e || 45 === e || 46 === e)
            this.buffer += a.toLowerCase();
          else if (58 === e) {
            if (
              (this.stateOverride &&
                ((v(this.url) && !f(this.buffer)) ||
                  (!v(this.url) && f(this.buffer)) ||
                  ((N(this.url) || null !== this.url.port) &&
                    "file" === this.buffer) ||
                  ("file" === this.url.scheme &&
                    ("" === this.url.host || null === this.url.host)))) ||
              ((this.url.scheme = this.buffer),
              (this.buffer = ""),
              this.stateOverride)
            )
              return !1;
            "file" === this.url.scheme
              ? ((47 !== this.input[this.pointer + 1] ||
                  47 !== this.input[this.pointer + 2]) &&
                  (this.parseError = !0),
                (this.state = "file"))
              : v(this.url) &&
                  null !== this.base &&
                  this.base.scheme === this.url.scheme
                ? (this.state = "special relative or authority")
                : v(this.url)
                  ? (this.state = "special authority slashes")
                  : 47 === this.input[this.pointer + 1]
                    ? ((this.state = "path or authority"), ++this.pointer)
                    : ((this.url.cannotBeABaseURL = !0),
                      this.url.path.push(""),
                      (this.state = "cannot-be-a-base-URL path"));
          } else {
            if (this.stateOverride) return (this.parseError = !0), o;
            (this.buffer = ""), (this.state = "no scheme"), (this.pointer = -1);
          }
          return !0;
        }),
        (R.prototype["parse no scheme"] = function (e) {
          return null === this.base || (this.base.cannotBeABaseURL && 35 !== e)
            ? o
            : (this.base.cannotBeABaseURL && 35 === e
                ? ((this.url.scheme = this.base.scheme),
                  (this.url.path = this.base.path.slice()),
                  (this.url.query = this.base.query),
                  (this.url.fragment = ""),
                  (this.url.cannotBeABaseURL = !0),
                  (this.state = "fragment"))
                : ("file" === this.base.scheme
                    ? (this.state = "file")
                    : (this.state = "relative"),
                  --this.pointer),
              !0);
        }),
        (R.prototype["parse special relative or authority"] = function (e) {
          return (
            47 === e && 47 === this.input[this.pointer + 1]
              ? ((this.state = "special authority ignore slashes"),
                ++this.pointer)
              : ((this.parseError = !0),
                (this.state = "relative"),
                --this.pointer),
            !0
          );
        }),
        (R.prototype["parse path or authority"] = function (e) {
          return (
            47 === e
              ? (this.state = "authority")
              : ((this.state = "path"), --this.pointer),
            !0
          );
        }),
        (R.prototype["parse relative"] = function (e) {
          return (
            (this.url.scheme = this.base.scheme),
            isNaN(e)
              ? ((this.url.username = this.base.username),
                (this.url.password = this.base.password),
                (this.url.host = this.base.host),
                (this.url.port = this.base.port),
                (this.url.path = this.base.path.slice()),
                (this.url.query = this.base.query))
              : 47 === e
                ? (this.state = "relative slash")
                : 63 === e
                  ? ((this.url.username = this.base.username),
                    (this.url.password = this.base.password),
                    (this.url.host = this.base.host),
                    (this.url.port = this.base.port),
                    (this.url.path = this.base.path.slice()),
                    (this.url.query = ""),
                    (this.state = "query"))
                  : 35 === e
                    ? ((this.url.username = this.base.username),
                      (this.url.password = this.base.password),
                      (this.url.host = this.base.host),
                      (this.url.port = this.base.port),
                      (this.url.path = this.base.path.slice()),
                      (this.url.query = this.base.query),
                      (this.url.fragment = ""),
                      (this.state = "fragment"))
                    : v(this.url) && 92 === e
                      ? ((this.parseError = !0),
                        (this.state = "relative slash"))
                      : ((this.url.username = this.base.username),
                        (this.url.password = this.base.password),
                        (this.url.host = this.base.host),
                        (this.url.port = this.base.port),
                        (this.url.path = this.base.path.slice(
                          0,
                          this.base.path.length - 1,
                        )),
                        (this.state = "path"),
                        --this.pointer),
            !0
          );
        }),
        (R.prototype["parse relative slash"] = function (e) {
          return (
            v(this.url) && (47 === e || 92 === e)
              ? (92 === e && (this.parseError = !0),
                (this.state = "special authority ignore slashes"))
              : 47 === e
                ? (this.state = "authority")
                : ((this.url.username = this.base.username),
                  (this.url.password = this.base.password),
                  (this.url.host = this.base.host),
                  (this.url.port = this.base.port),
                  (this.state = "path"),
                  --this.pointer),
            !0
          );
        }),
        (R.prototype["parse special authority slashes"] = function (e) {
          return (
            47 === e && 47 === this.input[this.pointer + 1]
              ? ((this.state = "special authority ignore slashes"),
                ++this.pointer)
              : ((this.parseError = !0),
                (this.state = "special authority ignore slashes"),
                --this.pointer),
            !0
          );
        }),
        (R.prototype["parse special authority ignore slashes"] = function (e) {
          return (
            47 !== e && 92 !== e
              ? ((this.state = "authority"), --this.pointer)
              : (this.parseError = !0),
            !0
          );
        }),
        (R.prototype["parse authority"] = function (e, a) {
          if (64 === e) {
            (this.parseError = !0),
              this.atFlag && (this.buffer = "%40" + this.buffer),
              (this.atFlag = !0);
            let e = r(this.buffer);
            for (let a = 0; a < e; ++a) {
              let e = this.buffer.codePointAt(a);
              if (58 === e && !this.passwordTokenSeenFlag) {
                this.passwordTokenSeenFlag = !0;
                continue;
              }
              let t = w(e, y);
              this.passwordTokenSeenFlag
                ? (this.url.password += t)
                : (this.url.username += t);
            }
            this.buffer = "";
          } else if (
            isNaN(e) ||
            47 === e ||
            63 === e ||
            35 === e ||
            (v(this.url) && 92 === e)
          ) {
            if (this.atFlag && "" === this.buffer)
              return (this.parseError = !0), o;
            (this.pointer -= r(this.buffer) + 1),
              (this.buffer = ""),
              (this.state = "host");
          } else this.buffer += a;
          return !0;
        }),
        (R.prototype["parse hostname"] = R.prototype["parse host"] =
          function (e, a) {
            if (this.stateOverride && "file" === this.url.scheme)
              --this.pointer, (this.state = "file host");
            else if (58 !== e || this.arrFlag) {
              if (
                isNaN(e) ||
                47 === e ||
                63 === e ||
                35 === e ||
                (v(this.url) && 92 === e)
              ) {
                if ((--this.pointer, v(this.url) && "" === this.buffer))
                  return (this.parseError = !0), o;
                if (
                  this.stateOverride &&
                  "" === this.buffer &&
                  (N(this.url) || null !== this.url.port)
                )
                  return (this.parseError = !0), !1;
                let e = S(this.buffer, v(this.url));
                if (e === o) return o;
                if (
                  ((this.url.host = e),
                  (this.buffer = ""),
                  (this.state = "path start"),
                  this.stateOverride)
                )
                  return !1;
              } else
                91 === e
                  ? (this.arrFlag = !0)
                  : 93 === e && (this.arrFlag = !1),
                  (this.buffer += a);
            } else {
              if ("" === this.buffer) return (this.parseError = !0), o;
              let e = S(this.buffer, v(this.url));
              if (e === o) return o;
              if (
                ((this.url.host = e),
                (this.buffer = ""),
                (this.state = "port"),
                "hostname" === this.stateOverride)
              )
                return !1;
            }
            return !0;
          }),
        (R.prototype["parse port"] = function (e, a) {
          if (d(e)) this.buffer += a;
          else {
            if (
              !(
                isNaN(e) ||
                47 === e ||
                63 === e ||
                35 === e ||
                (v(this.url) && 92 === e)
              ) &&
              !this.stateOverride
            )
              return (this.parseError = !0), o;
            if ("" !== this.buffer) {
              let e = parseInt(this.buffer);
              if (e > 65535) return (this.parseError = !0), o;
              (this.url.port = e === n[this.url.scheme] ? null : e),
                (this.buffer = "");
            }
            if (this.stateOverride) return !1;
            (this.state = "path start"), --this.pointer;
          }
          return !0;
        });
      let O = new Set([47, 92, 63, 35]);
      (R.prototype["parse file"] = function (e) {
        if (((this.url.scheme = "file"), 47 === e || 92 === e))
          92 === e && (this.parseError = !0), (this.state = "file slash");
        else if (null !== this.base && "file" === this.base.scheme) {
          if (isNaN(e))
            (this.url.host = this.base.host),
              (this.url.path = this.base.path.slice()),
              (this.url.query = this.base.query);
          else if (63 === e)
            (this.url.host = this.base.host),
              (this.url.path = this.base.path.slice()),
              (this.url.query = ""),
              (this.state = "query");
          else if (35 === e)
            (this.url.host = this.base.host),
              (this.url.path = this.base.path.slice()),
              (this.url.query = this.base.query),
              (this.url.fragment = ""),
              (this.state = "fragment");
          else {
            var a;
            this.input.length - this.pointer - 1 != 0 &&
            ((a = this.input[this.pointer + 1]),
            l(e) && (58 === a || 124 === a)) &&
            (!(this.input.length - this.pointer - 1 >= 2) ||
              O.has(this.input[this.pointer + 2]))
              ? (this.parseError = !0)
              : ((this.url.host = this.base.host),
                (this.url.path = this.base.path.slice()),
                T(this.url)),
              (this.state = "path"),
              --this.pointer;
          }
        } else (this.state = "path"), --this.pointer;
        return !0;
      }),
        (R.prototype["parse file slash"] = function (e) {
          if (47 === e || 92 === e)
            92 === e && (this.parseError = !0), (this.state = "file host");
          else {
            if (null !== this.base && "file" === this.base.scheme) {
              var a;
              2 === (a = this.base.path[0]).length &&
              l(a.codePointAt(0)) &&
              ":" === a[1]
                ? this.url.path.push(this.base.path[0])
                : (this.url.host = this.base.host);
            }
            (this.state = "path"), --this.pointer;
          }
          return !0;
        }),
        (R.prototype["parse file host"] = function (e, a) {
          if (isNaN(e) || 47 === e || 92 === e || 63 === e || 35 === e) {
            if ((--this.pointer, !this.stateOverride && m(this.buffer)))
              (this.parseError = !0), (this.state = "path");
            else if ("" === this.buffer) {
              if (((this.url.host = ""), this.stateOverride)) return !1;
              this.state = "path start";
            } else {
              let e = S(this.buffer, v(this.url));
              if (e === o) return o;
              if (
                ("localhost" === e && (e = ""),
                (this.url.host = e),
                this.stateOverride)
              )
                return !1;
              (this.buffer = ""), (this.state = "path start");
            }
          } else this.buffer += a;
          return !0;
        }),
        (R.prototype["parse path start"] = function (e) {
          return (
            v(this.url)
              ? (92 === e && (this.parseError = !0),
                (this.state = "path"),
                47 !== e && 92 !== e && --this.pointer)
              : this.stateOverride || 63 !== e
                ? this.stateOverride || 35 !== e
                  ? void 0 !== e &&
                    ((this.state = "path"), 47 !== e && --this.pointer)
                  : ((this.url.fragment = ""), (this.state = "fragment"))
                : ((this.url.query = ""), (this.state = "query")),
            !0
          );
        }),
        (R.prototype["parse path"] = function (e) {
          if (
            isNaN(e) ||
            47 === e ||
            (v(this.url) && 92 === e) ||
            (!this.stateOverride && (63 === e || 35 === e))
          ) {
            var a;
            if (
              ((v(this.url) && 92 === e && (this.parseError = !0),
              ".." === (a = (a = this.buffer).toLowerCase()) ||
                "%2e." === a ||
                ".%2e" === a ||
                "%2e%2e" === a)
                ? (T(this.url),
                  47 === e ||
                    (v(this.url) && 92 === e) ||
                    this.url.path.push(""))
                : u(this.buffer) && 47 !== e && !(v(this.url) && 92 === e)
                  ? this.url.path.push("")
                  : u(this.buffer) ||
                    ("file" === this.url.scheme &&
                      0 === this.url.path.length &&
                      m(this.buffer) &&
                      ("" !== this.url.host &&
                        null !== this.url.host &&
                        ((this.parseError = !0), (this.url.host = "")),
                      (this.buffer = this.buffer[0] + ":")),
                    this.url.path.push(this.buffer)),
              (this.buffer = ""),
              "file" === this.url.scheme &&
                (void 0 === e || 63 === e || 35 === e))
            )
              for (; this.url.path.length > 1 && "" === this.url.path[0]; )
                (this.parseError = !0), this.url.path.shift();
            63 === e && ((this.url.query = ""), (this.state = "query")),
              35 === e && ((this.url.fragment = ""), (this.state = "fragment"));
          } else
            37 !== e ||
              (c(this.input[this.pointer + 1]) &&
                c(this.input[this.pointer + 2])) ||
              (this.parseError = !0),
              (this.buffer += w(e, x));
          return !0;
        }),
        (R.prototype["parse cannot-be-a-base-URL path"] = function (e) {
          return (
            63 === e
              ? ((this.url.query = ""), (this.state = "query"))
              : 35 === e
                ? ((this.url.fragment = ""), (this.state = "fragment"))
                : (isNaN(e) || 37 === e || (this.parseError = !0),
                  37 !== e ||
                    (c(this.input[this.pointer + 1]) &&
                      c(this.input[this.pointer + 2])) ||
                    (this.parseError = !0),
                  isNaN(e) || (this.url.path[0] = this.url.path[0] + w(e, g))),
            !0
          );
        }),
        (R.prototype["parse query"] = function (e, a) {
          if (isNaN(e) || (!this.stateOverride && 35 === e)) {
            (v(this.url) &&
              "ws" !== this.url.scheme &&
              "wss" !== this.url.scheme) ||
              (this.encodingOverride = "utf-8");
            let a = new Buffer(this.buffer);
            for (let e = 0; e < a.length; ++e)
              a[e] < 33 ||
              a[e] > 126 ||
              34 === a[e] ||
              35 === a[e] ||
              60 === a[e] ||
              62 === a[e]
                ? (this.url.query += h(a[e]))
                : (this.url.query += String.fromCodePoint(a[e]));
            (this.buffer = ""),
              35 === e && ((this.url.fragment = ""), (this.state = "fragment"));
          } else
            37 !== e ||
              (c(this.input[this.pointer + 1]) &&
                c(this.input[this.pointer + 2])) ||
              (this.parseError = !0),
              (this.buffer += a);
          return !0;
        }),
        (R.prototype["parse fragment"] = function (e) {
          return (
            isNaN(e) ||
              (0 === e
                ? (this.parseError = !0)
                : (37 !== e ||
                    (c(this.input[this.pointer + 1]) &&
                      c(this.input[this.pointer + 2])) ||
                    (this.parseError = !0),
                  (this.url.fragment += w(e, g)))),
            !0
          );
        }),
        (e.exports.serializeURL = function (e, a) {
          let t = e.scheme + ":";
          if (
            (null !== e.host
              ? ((t += "//"),
                ("" !== e.username || "" !== e.password) &&
                  ((t += e.username),
                  "" !== e.password && (t += ":" + e.password),
                  (t += "@")),
                (t += E(e.host)),
                null !== e.port && (t += ":" + e.port))
              : null === e.host && "file" === e.scheme && (t += "//"),
            e.cannotBeABaseURL)
          )
            t += e.path[0];
          else for (let a of e.path) t += "/" + a;
          return (
            null !== e.query && (t += "?" + e.query),
            a || null === e.fragment || (t += "#" + e.fragment),
            t
          );
        }),
        (e.exports.serializeURLOrigin = function (a) {
          switch (a.scheme) {
            case "blob":
              try {
                return e.exports.serializeURLOrigin(
                  e.exports.parseURL(a.path[0]),
                );
              } catch (e) {
                return "null";
              }
            case "ftp":
            case "gopher":
            case "http":
            case "https":
            case "ws":
            case "wss":
              var t;
              let i;
              return (
                (i =
                  (t = { scheme: a.scheme, host: a.host, port: a.port })
                    .scheme +
                  "://" +
                  E(t.host)),
                null !== t.port && (i += ":" + t.port),
                i
              );
            case "file":
              return "file://";
            default:
              return "null";
          }
        }),
        (e.exports.basicURLParse = function (e, a) {
          void 0 === a && (a = {});
          let t = new R(
            e,
            a.baseURL,
            a.encodingOverride,
            a.url,
            a.stateOverride,
          );
          return t.failure ? "failure" : t.url;
        }),
        (e.exports.setTheUsername = function (e, a) {
          e.username = "";
          let t = i.ucs2.decode(a);
          for (let a = 0; a < t.length; ++a) e.username += w(t[a], y);
        }),
        (e.exports.setThePassword = function (e, a) {
          e.password = "";
          let t = i.ucs2.decode(a);
          for (let a = 0; a < t.length; ++a) e.password += w(t[a], y);
        }),
        (e.exports.serializeHost = E),
        (e.exports.cannotHaveAUsernamePasswordPort = function (e) {
          return (
            null === e.host ||
            "" === e.host ||
            e.cannotBeABaseURL ||
            "file" === e.scheme
          );
        }),
        (e.exports.serializeInteger = function (e) {
          return String(e);
        }),
        (e.exports.parseURL = function (a, t) {
          return (
            void 0 === t && (t = {}),
            e.exports.basicURLParse(a, {
              baseURL: t.baseURL,
              encodingOverride: t.encodingOverride,
            })
          );
        });
    },
    5429: (e) => {
      (e.exports.mixin = function (e, a) {
        let t = Object.getOwnPropertyNames(a);
        for (let i = 0; i < t.length; ++i)
          Object.defineProperty(
            e,
            t[i],
            Object.getOwnPropertyDescriptor(a, t[i]),
          );
      }),
        (e.exports.wrapperSymbol = Symbol("wrapper")),
        (e.exports.implSymbol = Symbol("impl")),
        (e.exports.wrapperForImpl = function (a) {
          return a[e.exports.wrapperSymbol];
        }),
        (e.exports.implForWrapper = function (a) {
          return a[e.exports.implSymbol];
        });
    },
    8775: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          prefixes: function () {
            return p;
          },
          bootstrap: function () {
            return r;
          },
          wait: function () {
            return s;
          },
          error: function () {
            return d;
          },
          warn: function () {
            return l;
          },
          ready: function () {
            return c;
          },
          info: function () {
            return u;
          },
          event: function () {
            return m;
          },
          trace: function () {
            return f;
          },
          warnOnce: function () {
            return h;
          },
        });
      let i = t(6106),
        p = {
          wait: (0, i.white)((0, i.bold)("○")),
          error: (0, i.red)((0, i.bold)("⨯")),
          warn: (0, i.yellow)((0, i.bold)("⚠")),
          ready: "▲",
          info: (0, i.white)((0, i.bold)(" ")),
          event: (0, i.green)((0, i.bold)("✓")),
          trace: (0, i.magenta)((0, i.bold)("\xbb")),
        },
        n = { log: "log", warn: "warn", error: "error" };
      function o(e, ...a) {
        ("" === a[0] || void 0 === a[0]) && 1 === a.length && a.shift();
        let t = e in n ? n[e] : "log",
          i = p[e];
        0 === a.length ? console[t]("") : console[t](" " + i, ...a);
      }
      function r(...e) {
        console.log(" ", ...e);
      }
      function s(...e) {
        o("wait", ...e);
      }
      function d(...e) {
        o("error", ...e);
      }
      function l(...e) {
        o("warn", ...e);
      }
      function c(...e) {
        o("ready", ...e);
      }
      function u(...e) {
        o("info", ...e);
      }
      function m(...e) {
        o("event", ...e);
      }
      function f(...e) {
        o("trace", ...e);
      }
      let v = new Set();
      function h(...e) {
        v.has(e[0]) || (v.add(e.join(" ")), l(...e));
      }
    },
    5153: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createProxy", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(5951),
        p = i.createClientModuleProxy;
    },
    8730: (e, a, t) => {
      let { createProxy: i } = t(5153);
      e.exports = i(
        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\node_modules\\next\\dist\\client\\components\\app-router.js",
      );
    },
    7284: (e, a, t) => {
      let { createProxy: i } = t(5153);
      e.exports = i(
        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\node_modules\\next\\dist\\client\\components\\error-boundary.js",
      );
    },
    9195: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          DYNAMIC_ERROR_CODE: function () {
            return t;
          },
          DynamicServerError: function () {
            return i;
          },
        });
      let t = "DYNAMIC_SERVER_USAGE";
      class i extends Error {
        constructor(e) {
          super("Dynamic server usage: " + e), (this.digest = t);
        }
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    8165: (e, a, t) => {
      let { createProxy: i } = t(5153);
      e.exports = i(
        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\node_modules\\next\\dist\\client\\components\\layout-router.js",
      );
    },
    2236: (e, a) => {
      function t(e, a) {
        if (e.isStaticGeneration && e.experimental.ppr) {
          if (!e.postpone)
            throw Error(
              "Invariant: PPR is enabled but the postpone API is unavailable",
            );
          (e.postponeWasTriggered = !0),
            e.postpone(
              "This page needs to bail out of prerendering at this point because it used " +
                a +
                ". React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error",
            );
        }
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "maybePostpone", {
          enumerable: !0,
          get: function () {
            return t;
          },
        }),
        ("function" == typeof a.default ||
          ("object" == typeof a.default && null !== a.default)) &&
          void 0 === a.default.__esModule &&
          (Object.defineProperty(a.default, "__esModule", { value: !0 }),
          Object.assign(a.default, a),
          (e.exports = a.default));
    },
    4009: (e, a, t) => {
      let { createProxy: i } = t(5153);
      e.exports = i(
        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\node_modules\\next\\dist\\client\\components\\not-found-boundary.js",
      );
    },
    9291: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "default", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let i = t(5196),
        p = i._(t(3542)),
        n = {
          error: {
            fontFamily:
              'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          desc: { display: "inline-block" },
          h1: {
            display: "inline-block",
            margin: "0 20px 0 0",
            padding: "0 23px 0 0",
            fontSize: 24,
            fontWeight: 500,
            verticalAlign: "top",
            lineHeight: "49px",
          },
          h2: { fontSize: 14, fontWeight: 400, lineHeight: "49px", margin: 0 },
        };
      function o() {
        return p.default.createElement(
          p.default.Fragment,
          null,
          p.default.createElement(
            "title",
            null,
            "404: This page could not be found.",
          ),
          p.default.createElement(
            "div",
            { style: n.error },
            p.default.createElement(
              "div",
              null,
              p.default.createElement("style", {
                dangerouslySetInnerHTML: {
                  __html:
                    "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}",
                },
              }),
              p.default.createElement(
                "h1",
                { className: "next-error-h1", style: n.h1 },
                "404",
              ),
              p.default.createElement(
                "div",
                { style: n.desc },
                p.default.createElement(
                  "h2",
                  { style: n.h2 },
                  "This page could not be found.",
                ),
              ),
            ),
          ),
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    5676: (e, a, t) => {
      let { createProxy: i } = t(5153);
      e.exports = i(
        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\node_modules\\next\\dist\\client\\components\\render-from-template-context.js",
      );
    },
    1263: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "createSearchParamsBailoutProxy", {
          enumerable: !0,
          get: function () {
            return p;
          },
        });
      let i = t(3657);
      function p() {
        return new Proxy(
          {},
          {
            get(e, a) {
              "string" == typeof a &&
                (0, i.staticGenerationBailout)("searchParams." + a);
            },
          },
        );
      }
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    3657: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        Object.defineProperty(a, "staticGenerationBailout", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let i = t(9195),
        p = t(2236),
        n = t(5319);
      class o extends Error {
        constructor(...e) {
          super(...e), (this.code = "NEXT_STATIC_GEN_BAILOUT");
        }
      }
      function r(e, a) {
        let { dynamic: t, link: i } = a || {};
        return (
          "Page" +
          (t ? ' with `dynamic = "' + t + '"`' : "") +
          " couldn't be rendered statically because it used `" +
          e +
          "`." +
          (i ? " See more info here: " + i : "")
        );
      }
      let s = (e, a) => {
        let t = n.staticGenerationAsyncStorage.getStore();
        if (!t) return !1;
        if (t.forceStatic) return !0;
        if (t.dynamicShouldError) {
          var s;
          throw new o(
            r(e, {
              ...a,
              dynamic:
                null != (s = null == a ? void 0 : a.dynamic) ? s : "error",
            }),
          );
        }
        let d = r(e, {
          ...a,
          link: "https://nextjs.org/docs/messages/dynamic-server-error",
        });
        if (
          ((0, p.maybePostpone)(t, e),
          (t.revalidate = 0),
          (null == a ? void 0 : a.dynamic) || (t.staticPrefetchBailout = !0),
          t.isStaticGeneration)
        ) {
          let a = new i.DynamicServerError(d);
          throw (
            ((t.dynamicUsageDescription = e),
            (t.dynamicUsageStack = a.stack),
            a)
          );
        }
        return !1;
      };
      ("function" == typeof a.default ||
        ("object" == typeof a.default && null !== a.default)) &&
        void 0 === a.default.__esModule &&
        (Object.defineProperty(a.default, "__esModule", { value: !0 }),
        Object.assign(a.default, a),
        (e.exports = a.default));
    },
    7701: (e, a, t) => {
      let { createProxy: i } = t(5153);
      e.exports = i(
        "C:\\Users\\richa\\OneDrive\\Documents\\Next EchoStream\\node_modules\\next\\dist\\client\\components\\static-generation-searchparams-bailout-provider.js",
      );
    },
    4389: (e) => {
      (() => {
        var a = {
            491: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.ContextAPI = void 0);
              let i = t(223),
                p = t(172),
                n = t(930),
                o = "context",
                r = new i.NoopContextManager();
              class s {
                constructor() {}
                static getInstance() {
                  return (
                    this._instance || (this._instance = new s()), this._instance
                  );
                }
                setGlobalContextManager(e) {
                  return (0, p.registerGlobal)(o, e, n.DiagAPI.instance());
                }
                active() {
                  return this._getContextManager().active();
                }
                with(e, a, t, ...i) {
                  return this._getContextManager().with(e, a, t, ...i);
                }
                bind(e, a) {
                  return this._getContextManager().bind(e, a);
                }
                _getContextManager() {
                  return (0, p.getGlobal)(o) || r;
                }
                disable() {
                  this._getContextManager().disable(),
                    (0, p.unregisterGlobal)(o, n.DiagAPI.instance());
                }
              }
              a.ContextAPI = s;
            },
            930: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.DiagAPI = void 0);
              let i = t(56),
                p = t(912),
                n = t(957),
                o = t(172);
              class r {
                constructor() {
                  function e(e) {
                    return function (...a) {
                      let t = (0, o.getGlobal)("diag");
                      if (t) return t[e](...a);
                    };
                  }
                  let a = this;
                  (a.setLogger = (e, t = { logLevel: n.DiagLogLevel.INFO }) => {
                    var i, r, s;
                    if (e === a) {
                      let e = Error(
                        "Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation",
                      );
                      return (
                        a.error(
                          null !== (i = e.stack) && void 0 !== i
                            ? i
                            : e.message,
                        ),
                        !1
                      );
                    }
                    "number" == typeof t && (t = { logLevel: t });
                    let d = (0, o.getGlobal)("diag"),
                      l = (0, p.createLogLevelDiagLogger)(
                        null !== (r = t.logLevel) && void 0 !== r
                          ? r
                          : n.DiagLogLevel.INFO,
                        e,
                      );
                    if (d && !t.suppressOverrideMessage) {
                      let e =
                        null !== (s = Error().stack) && void 0 !== s
                          ? s
                          : "<failed to generate stacktrace>";
                      d.warn(`Current logger will be overwritten from ${e}`),
                        l.warn(
                          `Current logger will overwrite one already registered from ${e}`,
                        );
                    }
                    return (0, o.registerGlobal)("diag", l, a, !0);
                  }),
                    (a.disable = () => {
                      (0, o.unregisterGlobal)("diag", a);
                    }),
                    (a.createComponentLogger = (e) =>
                      new i.DiagComponentLogger(e)),
                    (a.verbose = e("verbose")),
                    (a.debug = e("debug")),
                    (a.info = e("info")),
                    (a.warn = e("warn")),
                    (a.error = e("error"));
                }
                static instance() {
                  return (
                    this._instance || (this._instance = new r()), this._instance
                  );
                }
              }
              a.DiagAPI = r;
            },
            653: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.MetricsAPI = void 0);
              let i = t(660),
                p = t(172),
                n = t(930),
                o = "metrics";
              class r {
                constructor() {}
                static getInstance() {
                  return (
                    this._instance || (this._instance = new r()), this._instance
                  );
                }
                setGlobalMeterProvider(e) {
                  return (0, p.registerGlobal)(o, e, n.DiagAPI.instance());
                }
                getMeterProvider() {
                  return (0, p.getGlobal)(o) || i.NOOP_METER_PROVIDER;
                }
                getMeter(e, a, t) {
                  return this.getMeterProvider().getMeter(e, a, t);
                }
                disable() {
                  (0, p.unregisterGlobal)(o, n.DiagAPI.instance());
                }
              }
              a.MetricsAPI = r;
            },
            181: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.PropagationAPI = void 0);
              let i = t(172),
                p = t(874),
                n = t(194),
                o = t(277),
                r = t(369),
                s = t(930),
                d = "propagation",
                l = new p.NoopTextMapPropagator();
              class c {
                constructor() {
                  (this.createBaggage = r.createBaggage),
                    (this.getBaggage = o.getBaggage),
                    (this.getActiveBaggage = o.getActiveBaggage),
                    (this.setBaggage = o.setBaggage),
                    (this.deleteBaggage = o.deleteBaggage);
                }
                static getInstance() {
                  return (
                    this._instance || (this._instance = new c()), this._instance
                  );
                }
                setGlobalPropagator(e) {
                  return (0, i.registerGlobal)(d, e, s.DiagAPI.instance());
                }
                inject(e, a, t = n.defaultTextMapSetter) {
                  return this._getGlobalPropagator().inject(e, a, t);
                }
                extract(e, a, t = n.defaultTextMapGetter) {
                  return this._getGlobalPropagator().extract(e, a, t);
                }
                fields() {
                  return this._getGlobalPropagator().fields();
                }
                disable() {
                  (0, i.unregisterGlobal)(d, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                  return (0, i.getGlobal)(d) || l;
                }
              }
              a.PropagationAPI = c;
            },
            997: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.TraceAPI = void 0);
              let i = t(172),
                p = t(846),
                n = t(139),
                o = t(607),
                r = t(930),
                s = "trace";
              class d {
                constructor() {
                  (this._proxyTracerProvider = new p.ProxyTracerProvider()),
                    (this.wrapSpanContext = n.wrapSpanContext),
                    (this.isSpanContextValid = n.isSpanContextValid),
                    (this.deleteSpan = o.deleteSpan),
                    (this.getSpan = o.getSpan),
                    (this.getActiveSpan = o.getActiveSpan),
                    (this.getSpanContext = o.getSpanContext),
                    (this.setSpan = o.setSpan),
                    (this.setSpanContext = o.setSpanContext);
                }
                static getInstance() {
                  return (
                    this._instance || (this._instance = new d()), this._instance
                  );
                }
                setGlobalTracerProvider(e) {
                  let a = (0, i.registerGlobal)(
                    s,
                    this._proxyTracerProvider,
                    r.DiagAPI.instance(),
                  );
                  return a && this._proxyTracerProvider.setDelegate(e), a;
                }
                getTracerProvider() {
                  return (0, i.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, a) {
                  return this.getTracerProvider().getTracer(e, a);
                }
                disable() {
                  (0, i.unregisterGlobal)(s, r.DiagAPI.instance()),
                    (this._proxyTracerProvider = new p.ProxyTracerProvider());
                }
              }
              a.TraceAPI = d;
            },
            277: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.deleteBaggage =
                  a.setBaggage =
                  a.getActiveBaggage =
                  a.getBaggage =
                    void 0);
              let i = t(491),
                p = t(780),
                n = (0, p.createContextKey)("OpenTelemetry Baggage Key");
              function o(e) {
                return e.getValue(n) || void 0;
              }
              (a.getBaggage = o),
                (a.getActiveBaggage = function () {
                  return o(i.ContextAPI.getInstance().active());
                }),
                (a.setBaggage = function (e, a) {
                  return e.setValue(n, a);
                }),
                (a.deleteBaggage = function (e) {
                  return e.deleteValue(n);
                });
            },
            993: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.BaggageImpl = void 0);
              class t {
                constructor(e) {
                  this._entries = e ? new Map(e) : new Map();
                }
                getEntry(e) {
                  let a = this._entries.get(e);
                  if (a) return Object.assign({}, a);
                }
                getAllEntries() {
                  return Array.from(this._entries.entries()).map(([e, a]) => [
                    e,
                    a,
                  ]);
                }
                setEntry(e, a) {
                  let i = new t(this._entries);
                  return i._entries.set(e, a), i;
                }
                removeEntry(e) {
                  let a = new t(this._entries);
                  return a._entries.delete(e), a;
                }
                removeEntries(...e) {
                  let a = new t(this._entries);
                  for (let t of e) a._entries.delete(t);
                  return a;
                }
                clear() {
                  return new t();
                }
              }
              a.BaggageImpl = t;
            },
            830: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.baggageEntryMetadataSymbol = void 0),
                (a.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata"));
            },
            369: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.baggageEntryMetadataFromString = a.createBaggage = void 0);
              let i = t(930),
                p = t(993),
                n = t(830),
                o = i.DiagAPI.instance();
              (a.createBaggage = function (e = {}) {
                return new p.BaggageImpl(new Map(Object.entries(e)));
              }),
                (a.baggageEntryMetadataFromString = function (e) {
                  return (
                    "string" != typeof e &&
                      (o.error(
                        `Cannot create baggage metadata from unknown type: ${typeof e}`,
                      ),
                      (e = "")),
                    {
                      __TYPE__: n.baggageEntryMetadataSymbol,
                      toString: () => e,
                    }
                  );
                });
            },
            67: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.context = void 0);
              let i = t(491);
              a.context = i.ContextAPI.getInstance();
            },
            223: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.NoopContextManager = void 0);
              let i = t(780);
              class p {
                active() {
                  return i.ROOT_CONTEXT;
                }
                with(e, a, t, ...i) {
                  return a.call(t, ...i);
                }
                bind(e, a) {
                  return a;
                }
                enable() {
                  return this;
                }
                disable() {
                  return this;
                }
              }
              a.NoopContextManager = p;
            },
            780: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.ROOT_CONTEXT = a.createContextKey = void 0),
                (a.createContextKey = function (e) {
                  return Symbol.for(e);
                });
              class t {
                constructor(e) {
                  let a = this;
                  (a._currentContext = e ? new Map(e) : new Map()),
                    (a.getValue = (e) => a._currentContext.get(e)),
                    (a.setValue = (e, i) => {
                      let p = new t(a._currentContext);
                      return p._currentContext.set(e, i), p;
                    }),
                    (a.deleteValue = (e) => {
                      let i = new t(a._currentContext);
                      return i._currentContext.delete(e), i;
                    });
                }
              }
              a.ROOT_CONTEXT = new t();
            },
            506: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.diag = void 0);
              let i = t(930);
              a.diag = i.DiagAPI.instance();
            },
            56: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.DiagComponentLogger = void 0);
              let i = t(172);
              class p {
                constructor(e) {
                  this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                  return n("debug", this._namespace, e);
                }
                error(...e) {
                  return n("error", this._namespace, e);
                }
                info(...e) {
                  return n("info", this._namespace, e);
                }
                warn(...e) {
                  return n("warn", this._namespace, e);
                }
                verbose(...e) {
                  return n("verbose", this._namespace, e);
                }
              }
              function n(e, a, t) {
                let p = (0, i.getGlobal)("diag");
                if (p) return t.unshift(a), p[e](...t);
              }
              a.DiagComponentLogger = p;
            },
            972: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.DiagConsoleLogger = void 0);
              let t = [
                { n: "error", c: "error" },
                { n: "warn", c: "warn" },
                { n: "info", c: "info" },
                { n: "debug", c: "debug" },
                { n: "verbose", c: "trace" },
              ];
              class i {
                constructor() {
                  for (let e = 0; e < t.length; e++)
                    this[t[e].n] = (function (e) {
                      return function (...a) {
                        if (console) {
                          let t = console[e];
                          if (
                            ("function" != typeof t && (t = console.log),
                            "function" == typeof t)
                          )
                            return t.apply(console, a);
                        }
                      };
                    })(t[e].c);
                }
              }
              a.DiagConsoleLogger = i;
            },
            912: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.createLogLevelDiagLogger = void 0);
              let i = t(957);
              a.createLogLevelDiagLogger = function (e, a) {
                function t(t, i) {
                  let p = a[t];
                  return "function" == typeof p && e >= i
                    ? p.bind(a)
                    : function () {};
                }
                return (
                  e < i.DiagLogLevel.NONE
                    ? (e = i.DiagLogLevel.NONE)
                    : e > i.DiagLogLevel.ALL && (e = i.DiagLogLevel.ALL),
                  (a = a || {}),
                  {
                    error: t("error", i.DiagLogLevel.ERROR),
                    warn: t("warn", i.DiagLogLevel.WARN),
                    info: t("info", i.DiagLogLevel.INFO),
                    debug: t("debug", i.DiagLogLevel.DEBUG),
                    verbose: t("verbose", i.DiagLogLevel.VERBOSE),
                  }
                );
              };
            },
            957: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.DiagLogLevel = void 0),
                (function (e) {
                  (e[(e.NONE = 0)] = "NONE"),
                    (e[(e.ERROR = 30)] = "ERROR"),
                    (e[(e.WARN = 50)] = "WARN"),
                    (e[(e.INFO = 60)] = "INFO"),
                    (e[(e.DEBUG = 70)] = "DEBUG"),
                    (e[(e.VERBOSE = 80)] = "VERBOSE"),
                    (e[(e.ALL = 9999)] = "ALL");
                })(a.DiagLogLevel || (a.DiagLogLevel = {}));
            },
            172: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.unregisterGlobal = a.getGlobal = a.registerGlobal = void 0);
              let i = t(200),
                p = t(521),
                n = t(130),
                o = p.VERSION.split(".")[0],
                r = Symbol.for(`opentelemetry.js.api.${o}`),
                s = i._globalThis;
              (a.registerGlobal = function (e, a, t, i = !1) {
                var n;
                let o = (s[r] =
                  null !== (n = s[r]) && void 0 !== n
                    ? n
                    : { version: p.VERSION });
                if (!i && o[e]) {
                  let a = Error(
                    `@opentelemetry/api: Attempted duplicate registration of API: ${e}`,
                  );
                  return t.error(a.stack || a.message), !1;
                }
                if (o.version !== p.VERSION) {
                  let a = Error(
                    `@opentelemetry/api: Registration of version v${o.version} for ${e} does not match previously registered API v${p.VERSION}`,
                  );
                  return t.error(a.stack || a.message), !1;
                }
                return (
                  (o[e] = a),
                  t.debug(
                    `@opentelemetry/api: Registered a global for ${e} v${p.VERSION}.`,
                  ),
                  !0
                );
              }),
                (a.getGlobal = function (e) {
                  var a, t;
                  let i =
                    null === (a = s[r]) || void 0 === a ? void 0 : a.version;
                  if (i && (0, n.isCompatible)(i))
                    return null === (t = s[r]) || void 0 === t ? void 0 : t[e];
                }),
                (a.unregisterGlobal = function (e, a) {
                  a.debug(
                    `@opentelemetry/api: Unregistering a global for ${e} v${p.VERSION}.`,
                  );
                  let t = s[r];
                  t && delete t[e];
                });
            },
            130: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.isCompatible = a._makeCompatibilityCheck = void 0);
              let i = t(521),
                p = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
              function n(e) {
                let a = new Set([e]),
                  t = new Set(),
                  i = e.match(p);
                if (!i) return () => !1;
                let n = {
                  major: +i[1],
                  minor: +i[2],
                  patch: +i[3],
                  prerelease: i[4],
                };
                if (null != n.prerelease)
                  return function (a) {
                    return a === e;
                  };
                function o(e) {
                  return t.add(e), !1;
                }
                return function (e) {
                  if (a.has(e)) return !0;
                  if (t.has(e)) return !1;
                  let i = e.match(p);
                  if (!i) return o(e);
                  let r = {
                    major: +i[1],
                    minor: +i[2],
                    patch: +i[3],
                    prerelease: i[4],
                  };
                  return null != r.prerelease || n.major !== r.major
                    ? o(e)
                    : 0 === n.major
                      ? n.minor === r.minor && n.patch <= r.patch
                        ? (a.add(e), !0)
                        : o(e)
                      : n.minor <= r.minor
                        ? (a.add(e), !0)
                        : o(e);
                };
              }
              (a._makeCompatibilityCheck = n), (a.isCompatible = n(i.VERSION));
            },
            886: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.metrics = void 0);
              let i = t(653);
              a.metrics = i.MetricsAPI.getInstance();
            },
            901: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.ValueType = void 0),
                (function (e) {
                  (e[(e.INT = 0)] = "INT"), (e[(e.DOUBLE = 1)] = "DOUBLE");
                })(a.ValueType || (a.ValueType = {}));
            },
            102: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.createNoopMeter =
                  a.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
                  a.NOOP_OBSERVABLE_GAUGE_METRIC =
                  a.NOOP_OBSERVABLE_COUNTER_METRIC =
                  a.NOOP_UP_DOWN_COUNTER_METRIC =
                  a.NOOP_HISTOGRAM_METRIC =
                  a.NOOP_COUNTER_METRIC =
                  a.NOOP_METER =
                  a.NoopObservableUpDownCounterMetric =
                  a.NoopObservableGaugeMetric =
                  a.NoopObservableCounterMetric =
                  a.NoopObservableMetric =
                  a.NoopHistogramMetric =
                  a.NoopUpDownCounterMetric =
                  a.NoopCounterMetric =
                  a.NoopMetric =
                  a.NoopMeter =
                    void 0);
              class t {
                constructor() {}
                createHistogram(e, t) {
                  return a.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, t) {
                  return a.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, t) {
                  return a.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, t) {
                  return a.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, t) {
                  return a.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, t) {
                  return a.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, a) {}
                removeBatchObservableCallback(e) {}
              }
              a.NoopMeter = t;
              class i {}
              a.NoopMetric = i;
              class p extends i {
                add(e, a) {}
              }
              a.NoopCounterMetric = p;
              class n extends i {
                add(e, a) {}
              }
              a.NoopUpDownCounterMetric = n;
              class o extends i {
                record(e, a) {}
              }
              a.NoopHistogramMetric = o;
              class r {
                addCallback(e) {}
                removeCallback(e) {}
              }
              a.NoopObservableMetric = r;
              class s extends r {}
              a.NoopObservableCounterMetric = s;
              class d extends r {}
              a.NoopObservableGaugeMetric = d;
              class l extends r {}
              (a.NoopObservableUpDownCounterMetric = l),
                (a.NOOP_METER = new t()),
                (a.NOOP_COUNTER_METRIC = new p()),
                (a.NOOP_HISTOGRAM_METRIC = new o()),
                (a.NOOP_UP_DOWN_COUNTER_METRIC = new n()),
                (a.NOOP_OBSERVABLE_COUNTER_METRIC = new s()),
                (a.NOOP_OBSERVABLE_GAUGE_METRIC = new d()),
                (a.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new l()),
                (a.createNoopMeter = function () {
                  return a.NOOP_METER;
                });
            },
            660: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.NOOP_METER_PROVIDER = a.NoopMeterProvider = void 0);
              let i = t(102);
              class p {
                getMeter(e, a, t) {
                  return i.NOOP_METER;
                }
              }
              (a.NoopMeterProvider = p), (a.NOOP_METER_PROVIDER = new p());
            },
            200: function (e, a, t) {
              var i =
                  (this && this.__createBinding) ||
                  (Object.create
                    ? function (e, a, t, i) {
                        void 0 === i && (i = t),
                          Object.defineProperty(e, i, {
                            enumerable: !0,
                            get: function () {
                              return a[t];
                            },
                          });
                      }
                    : function (e, a, t, i) {
                        void 0 === i && (i = t), (e[i] = a[t]);
                      }),
                p =
                  (this && this.__exportStar) ||
                  function (e, a) {
                    for (var t in e)
                      "default" === t ||
                        Object.prototype.hasOwnProperty.call(a, t) ||
                        i(a, e, t);
                  };
              Object.defineProperty(a, "__esModule", { value: !0 }),
                p(t(46), a);
            },
            651: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a._globalThis = void 0),
                (a._globalThis =
                  "object" == typeof globalThis ? globalThis : global);
            },
            46: function (e, a, t) {
              var i =
                  (this && this.__createBinding) ||
                  (Object.create
                    ? function (e, a, t, i) {
                        void 0 === i && (i = t),
                          Object.defineProperty(e, i, {
                            enumerable: !0,
                            get: function () {
                              return a[t];
                            },
                          });
                      }
                    : function (e, a, t, i) {
                        void 0 === i && (i = t), (e[i] = a[t]);
                      }),
                p =
                  (this && this.__exportStar) ||
                  function (e, a) {
                    for (var t in e)
                      "default" === t ||
                        Object.prototype.hasOwnProperty.call(a, t) ||
                        i(a, e, t);
                  };
              Object.defineProperty(a, "__esModule", { value: !0 }),
                p(t(651), a);
            },
            939: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.propagation = void 0);
              let i = t(181);
              a.propagation = i.PropagationAPI.getInstance();
            },
            874: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.NoopTextMapPropagator = void 0);
              class t {
                inject(e, a) {}
                extract(e, a) {
                  return e;
                }
                fields() {
                  return [];
                }
              }
              a.NoopTextMapPropagator = t;
            },
            194: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.defaultTextMapSetter = a.defaultTextMapGetter = void 0),
                (a.defaultTextMapGetter = {
                  get(e, a) {
                    if (null != e) return e[a];
                  },
                  keys: (e) => (null == e ? [] : Object.keys(e)),
                }),
                (a.defaultTextMapSetter = {
                  set(e, a, t) {
                    null != e && (e[a] = t);
                  },
                });
            },
            845: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.trace = void 0);
              let i = t(997);
              a.trace = i.TraceAPI.getInstance();
            },
            403: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.NonRecordingSpan = void 0);
              let i = t(476);
              class p {
                constructor(e = i.INVALID_SPAN_CONTEXT) {
                  this._spanContext = e;
                }
                spanContext() {
                  return this._spanContext;
                }
                setAttribute(e, a) {
                  return this;
                }
                setAttributes(e) {
                  return this;
                }
                addEvent(e, a) {
                  return this;
                }
                setStatus(e) {
                  return this;
                }
                updateName(e) {
                  return this;
                }
                end(e) {}
                isRecording() {
                  return !1;
                }
                recordException(e, a) {}
              }
              a.NonRecordingSpan = p;
            },
            614: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.NoopTracer = void 0);
              let i = t(491),
                p = t(607),
                n = t(403),
                o = t(139),
                r = i.ContextAPI.getInstance();
              class s {
                startSpan(e, a, t = r.active()) {
                  let i = !!(null == a ? void 0 : a.root);
                  if (i) return new n.NonRecordingSpan();
                  let s = t && (0, p.getSpanContext)(t);
                  return "object" == typeof s &&
                    "string" == typeof s.spanId &&
                    "string" == typeof s.traceId &&
                    "number" == typeof s.traceFlags &&
                    (0, o.isSpanContextValid)(s)
                    ? new n.NonRecordingSpan(s)
                    : new n.NonRecordingSpan();
                }
                startActiveSpan(e, a, t, i) {
                  let n, o, s;
                  if (arguments.length < 2) return;
                  2 == arguments.length
                    ? (s = a)
                    : 3 == arguments.length
                      ? ((n = a), (s = t))
                      : ((n = a), (o = t), (s = i));
                  let d = null != o ? o : r.active(),
                    l = this.startSpan(e, n, d),
                    c = (0, p.setSpan)(d, l);
                  return r.with(c, s, void 0, l);
                }
              }
              a.NoopTracer = s;
            },
            124: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.NoopTracerProvider = void 0);
              let i = t(614);
              class p {
                getTracer(e, a, t) {
                  return new i.NoopTracer();
                }
              }
              a.NoopTracerProvider = p;
            },
            125: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.ProxyTracer = void 0);
              let i = t(614),
                p = new i.NoopTracer();
              class n {
                constructor(e, a, t, i) {
                  (this._provider = e),
                    (this.name = a),
                    (this.version = t),
                    (this.options = i);
                }
                startSpan(e, a, t) {
                  return this._getTracer().startSpan(e, a, t);
                }
                startActiveSpan(e, a, t, i) {
                  let p = this._getTracer();
                  return Reflect.apply(p.startActiveSpan, p, arguments);
                }
                _getTracer() {
                  if (this._delegate) return this._delegate;
                  let e = this._provider.getDelegateTracer(
                    this.name,
                    this.version,
                    this.options,
                  );
                  return e ? ((this._delegate = e), this._delegate) : p;
                }
              }
              a.ProxyTracer = n;
            },
            846: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.ProxyTracerProvider = void 0);
              let i = t(125),
                p = t(124),
                n = new p.NoopTracerProvider();
              class o {
                getTracer(e, a, t) {
                  var p;
                  return null !== (p = this.getDelegateTracer(e, a, t)) &&
                    void 0 !== p
                    ? p
                    : new i.ProxyTracer(this, e, a, t);
                }
                getDelegate() {
                  var e;
                  return null !== (e = this._delegate) && void 0 !== e ? e : n;
                }
                setDelegate(e) {
                  this._delegate = e;
                }
                getDelegateTracer(e, a, t) {
                  var i;
                  return null === (i = this._delegate) || void 0 === i
                    ? void 0
                    : i.getTracer(e, a, t);
                }
              }
              a.ProxyTracerProvider = o;
            },
            996: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.SamplingDecision = void 0),
                (function (e) {
                  (e[(e.NOT_RECORD = 0)] = "NOT_RECORD"),
                    (e[(e.RECORD = 1)] = "RECORD"),
                    (e[(e.RECORD_AND_SAMPLED = 2)] = "RECORD_AND_SAMPLED");
                })(a.SamplingDecision || (a.SamplingDecision = {}));
            },
            607: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.getSpanContext =
                  a.setSpanContext =
                  a.deleteSpan =
                  a.setSpan =
                  a.getActiveSpan =
                  a.getSpan =
                    void 0);
              let i = t(780),
                p = t(403),
                n = t(491),
                o = (0, i.createContextKey)("OpenTelemetry Context Key SPAN");
              function r(e) {
                return e.getValue(o) || void 0;
              }
              function s(e, a) {
                return e.setValue(o, a);
              }
              (a.getSpan = r),
                (a.getActiveSpan = function () {
                  return r(n.ContextAPI.getInstance().active());
                }),
                (a.setSpan = s),
                (a.deleteSpan = function (e) {
                  return e.deleteValue(o);
                }),
                (a.setSpanContext = function (e, a) {
                  return s(e, new p.NonRecordingSpan(a));
                }),
                (a.getSpanContext = function (e) {
                  var a;
                  return null === (a = r(e)) || void 0 === a
                    ? void 0
                    : a.spanContext();
                });
            },
            325: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.TraceStateImpl = void 0);
              let i = t(564);
              class p {
                constructor(e) {
                  (this._internalState = new Map()), e && this._parse(e);
                }
                set(e, a) {
                  let t = this._clone();
                  return (
                    t._internalState.has(e) && t._internalState.delete(e),
                    t._internalState.set(e, a),
                    t
                  );
                }
                unset(e) {
                  let a = this._clone();
                  return a._internalState.delete(e), a;
                }
                get(e) {
                  return this._internalState.get(e);
                }
                serialize() {
                  return this._keys()
                    .reduce((e, a) => (e.push(a + "=" + this.get(a)), e), [])
                    .join(",");
                }
                _parse(e) {
                  !(e.length > 512) &&
                    ((this._internalState = e
                      .split(",")
                      .reverse()
                      .reduce((e, a) => {
                        let t = a.trim(),
                          p = t.indexOf("=");
                        if (-1 !== p) {
                          let n = t.slice(0, p),
                            o = t.slice(p + 1, a.length);
                          (0, i.validateKey)(n) &&
                            (0, i.validateValue)(o) &&
                            e.set(n, o);
                        }
                        return e;
                      }, new Map())),
                    this._internalState.size > 32 &&
                      (this._internalState = new Map(
                        Array.from(this._internalState.entries())
                          .reverse()
                          .slice(0, 32),
                      )));
                }
                _keys() {
                  return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                  let e = new p();
                  return (e._internalState = new Map(this._internalState)), e;
                }
              }
              a.TraceStateImpl = p;
            },
            564: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.validateValue = a.validateKey = void 0);
              let t = "[_0-9a-z-*/]",
                i = `[a-z]${t}{0,255}`,
                p = `[a-z0-9]${t}{0,240}@[a-z]${t}{0,13}`,
                n = RegExp(`^(?:${i}|${p})$`),
                o = /^[ -~]{0,255}[!-~]$/,
                r = /,|=/;
              (a.validateKey = function (e) {
                return n.test(e);
              }),
                (a.validateValue = function (e) {
                  return o.test(e) && !r.test(e);
                });
            },
            98: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.createTraceState = void 0);
              let i = t(325);
              a.createTraceState = function (e) {
                return new i.TraceStateImpl(e);
              };
            },
            476: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.INVALID_SPAN_CONTEXT =
                  a.INVALID_TRACEID =
                  a.INVALID_SPANID =
                    void 0);
              let i = t(475);
              (a.INVALID_SPANID = "0000000000000000"),
                (a.INVALID_TRACEID = "00000000000000000000000000000000"),
                (a.INVALID_SPAN_CONTEXT = {
                  traceId: a.INVALID_TRACEID,
                  spanId: a.INVALID_SPANID,
                  traceFlags: i.TraceFlags.NONE,
                });
            },
            357: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.SpanKind = void 0),
                (function (e) {
                  (e[(e.INTERNAL = 0)] = "INTERNAL"),
                    (e[(e.SERVER = 1)] = "SERVER"),
                    (e[(e.CLIENT = 2)] = "CLIENT"),
                    (e[(e.PRODUCER = 3)] = "PRODUCER"),
                    (e[(e.CONSUMER = 4)] = "CONSUMER");
                })(a.SpanKind || (a.SpanKind = {}));
            },
            139: (e, a, t) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.wrapSpanContext =
                  a.isSpanContextValid =
                  a.isValidSpanId =
                  a.isValidTraceId =
                    void 0);
              let i = t(476),
                p = t(403),
                n = /^([0-9a-f]{32})$/i,
                o = /^[0-9a-f]{16}$/i;
              function r(e) {
                return n.test(e) && e !== i.INVALID_TRACEID;
              }
              function s(e) {
                return o.test(e) && e !== i.INVALID_SPANID;
              }
              (a.isValidTraceId = r),
                (a.isValidSpanId = s),
                (a.isSpanContextValid = function (e) {
                  return r(e.traceId) && s(e.spanId);
                }),
                (a.wrapSpanContext = function (e) {
                  return new p.NonRecordingSpan(e);
                });
            },
            847: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.SpanStatusCode = void 0),
                (function (e) {
                  (e[(e.UNSET = 0)] = "UNSET"),
                    (e[(e.OK = 1)] = "OK"),
                    (e[(e.ERROR = 2)] = "ERROR");
                })(a.SpanStatusCode || (a.SpanStatusCode = {}));
            },
            475: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.TraceFlags = void 0),
                (function (e) {
                  (e[(e.NONE = 0)] = "NONE"), (e[(e.SAMPLED = 1)] = "SAMPLED");
                })(a.TraceFlags || (a.TraceFlags = {}));
            },
            521: (e, a) => {
              Object.defineProperty(a, "__esModule", { value: !0 }),
                (a.VERSION = void 0),
                (a.VERSION = "1.6.0");
            },
          },
          t = {};
        function i(e) {
          var p = t[e];
          if (void 0 !== p) return p.exports;
          var n = (t[e] = { exports: {} }),
            o = !0;
          try {
            a[e].call(n.exports, n, n.exports, i), (o = !1);
          } finally {
            o && delete t[e];
          }
          return n.exports;
        }
        i.ab = __dirname + "/";
        var p = {};
        (() => {
          Object.defineProperty(p, "__esModule", { value: !0 }),
            (p.trace =
              p.propagation =
              p.metrics =
              p.diag =
              p.context =
              p.INVALID_SPAN_CONTEXT =
              p.INVALID_TRACEID =
              p.INVALID_SPANID =
              p.isValidSpanId =
              p.isValidTraceId =
              p.isSpanContextValid =
              p.createTraceState =
              p.TraceFlags =
              p.SpanStatusCode =
              p.SpanKind =
              p.SamplingDecision =
              p.ProxyTracerProvider =
              p.ProxyTracer =
              p.defaultTextMapSetter =
              p.defaultTextMapGetter =
              p.ValueType =
              p.createNoopMeter =
              p.DiagLogLevel =
              p.DiagConsoleLogger =
              p.ROOT_CONTEXT =
              p.createContextKey =
              p.baggageEntryMetadataFromString =
                void 0);
          var e = i(369);
          Object.defineProperty(p, "baggageEntryMetadataFromString", {
            enumerable: !0,
            get: function () {
              return e.baggageEntryMetadataFromString;
            },
          });
          var a = i(780);
          Object.defineProperty(p, "createContextKey", {
            enumerable: !0,
            get: function () {
              return a.createContextKey;
            },
          }),
            Object.defineProperty(p, "ROOT_CONTEXT", {
              enumerable: !0,
              get: function () {
                return a.ROOT_CONTEXT;
              },
            });
          var t = i(972);
          Object.defineProperty(p, "DiagConsoleLogger", {
            enumerable: !0,
            get: function () {
              return t.DiagConsoleLogger;
            },
          });
          var n = i(957);
          Object.defineProperty(p, "DiagLogLevel", {
            enumerable: !0,
            get: function () {
              return n.DiagLogLevel;
            },
          });
          var o = i(102);
          Object.defineProperty(p, "createNoopMeter", {
            enumerable: !0,
            get: function () {
              return o.createNoopMeter;
            },
          });
          var r = i(901);
          Object.defineProperty(p, "ValueType", {
            enumerable: !0,
            get: function () {
              return r.ValueType;
            },
          });
          var s = i(194);
          Object.defineProperty(p, "defaultTextMapGetter", {
            enumerable: !0,
            get: function () {
              return s.defaultTextMapGetter;
            },
          }),
            Object.defineProperty(p, "defaultTextMapSetter", {
              enumerable: !0,
              get: function () {
                return s.defaultTextMapSetter;
              },
            });
          var d = i(125);
          Object.defineProperty(p, "ProxyTracer", {
            enumerable: !0,
            get: function () {
              return d.ProxyTracer;
            },
          });
          var l = i(846);
          Object.defineProperty(p, "ProxyTracerProvider", {
            enumerable: !0,
            get: function () {
              return l.ProxyTracerProvider;
            },
          });
          var c = i(996);
          Object.defineProperty(p, "SamplingDecision", {
            enumerable: !0,
            get: function () {
              return c.SamplingDecision;
            },
          });
          var u = i(357);
          Object.defineProperty(p, "SpanKind", {
            enumerable: !0,
            get: function () {
              return u.SpanKind;
            },
          });
          var m = i(847);
          Object.defineProperty(p, "SpanStatusCode", {
            enumerable: !0,
            get: function () {
              return m.SpanStatusCode;
            },
          });
          var f = i(475);
          Object.defineProperty(p, "TraceFlags", {
            enumerable: !0,
            get: function () {
              return f.TraceFlags;
            },
          });
          var v = i(98);
          Object.defineProperty(p, "createTraceState", {
            enumerable: !0,
            get: function () {
              return v.createTraceState;
            },
          });
          var h = i(139);
          Object.defineProperty(p, "isSpanContextValid", {
            enumerable: !0,
            get: function () {
              return h.isSpanContextValid;
            },
          }),
            Object.defineProperty(p, "isValidTraceId", {
              enumerable: !0,
              get: function () {
                return h.isValidTraceId;
              },
            }),
            Object.defineProperty(p, "isValidSpanId", {
              enumerable: !0,
              get: function () {
                return h.isValidSpanId;
              },
            });
          var g = i(476);
          Object.defineProperty(p, "INVALID_SPANID", {
            enumerable: !0,
            get: function () {
              return g.INVALID_SPANID;
            },
          }),
            Object.defineProperty(p, "INVALID_TRACEID", {
              enumerable: !0,
              get: function () {
                return g.INVALID_TRACEID;
              },
            }),
            Object.defineProperty(p, "INVALID_SPAN_CONTEXT", {
              enumerable: !0,
              get: function () {
                return g.INVALID_SPAN_CONTEXT;
              },
            });
          let b = i(67);
          Object.defineProperty(p, "context", {
            enumerable: !0,
            get: function () {
              return b.context;
            },
          });
          let x = i(506);
          Object.defineProperty(p, "diag", {
            enumerable: !0,
            get: function () {
              return x.diag;
            },
          });
          let _ = i(886);
          Object.defineProperty(p, "metrics", {
            enumerable: !0,
            get: function () {
              return _.metrics;
            },
          });
          let y = i(939);
          Object.defineProperty(p, "propagation", {
            enumerable: !0,
            get: function () {
              return y.propagation;
            },
          });
          let w = i(845);
          Object.defineProperty(p, "trace", {
            enumerable: !0,
            get: function () {
              return w.trace;
            },
          }),
            (p.default = {
              context: b.context,
              diag: x.diag,
              metrics: _.metrics,
              propagation: y.propagation,
              trace: w.trace,
            });
        })(),
          (e.exports = p);
      })();
    },
    9368: (e, a) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          NEXT_QUERY_PARAM_PREFIX: function () {
            return t;
          },
          PRERENDER_REVALIDATE_HEADER: function () {
            return i;
          },
          PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function () {
            return p;
          },
          NEXT_DID_POSTPONE_HEADER: function () {
            return n;
          },
          RSC_PREFETCH_SUFFIX: function () {
            return o;
          },
          RSC_SUFFIX: function () {
            return r;
          },
          NEXT_CACHE_TAGS_HEADER: function () {
            return s;
          },
          NEXT_CACHE_SOFT_TAGS_HEADER: function () {
            return d;
          },
          NEXT_CACHE_REVALIDATED_TAGS_HEADER: function () {
            return l;
          },
          NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function () {
            return c;
          },
          NEXT_CACHE_TAG_MAX_LENGTH: function () {
            return u;
          },
          NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function () {
            return m;
          },
          NEXT_CACHE_IMPLICIT_TAG_ID: function () {
            return f;
          },
          CACHE_ONE_YEAR: function () {
            return v;
          },
          MIDDLEWARE_FILENAME: function () {
            return h;
          },
          MIDDLEWARE_LOCATION_REGEXP: function () {
            return g;
          },
          INSTRUMENTATION_HOOK_FILENAME: function () {
            return b;
          },
          PAGES_DIR_ALIAS: function () {
            return x;
          },
          DOT_NEXT_ALIAS: function () {
            return _;
          },
          ROOT_DIR_ALIAS: function () {
            return y;
          },
          APP_DIR_ALIAS: function () {
            return w;
          },
          RSC_MOD_REF_PROXY_ALIAS: function () {
            return S;
          },
          RSC_ACTION_VALIDATE_ALIAS: function () {
            return E;
          },
          RSC_ACTION_PROXY_ALIAS: function () {
            return T;
          },
          RSC_ACTION_ENCRYPTION_ALIAS: function () {
            return N;
          },
          RSC_ACTION_CLIENT_WRAPPER_ALIAS: function () {
            return R;
          },
          PUBLIC_DIR_MIDDLEWARE_CONFLICT: function () {
            return O;
          },
          SSG_GET_INITIAL_PROPS_CONFLICT: function () {
            return P;
          },
          SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function () {
            return j;
          },
          SERVER_PROPS_SSG_CONFLICT: function () {
            return D;
          },
          STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function () {
            return A;
          },
          SERVER_PROPS_EXPORT_ERROR: function () {
            return C;
          },
          GSP_NO_RETURNED_VALUE: function () {
            return M;
          },
          GSSP_NO_RETURNED_VALUE: function () {
            return I;
          },
          UNSTABLE_REVALIDATE_RENAME_ERROR: function () {
            return k;
          },
          GSSP_COMPONENT_MEMBER_ERROR: function () {
            return V;
          },
          NON_STANDARD_NODE_ENV: function () {
            return L;
          },
          SSG_FALLBACK_EXPORT_ERROR: function () {
            return U;
          },
          ESLINT_DEFAULT_DIRS: function () {
            return B;
          },
          ESLINT_PROMPT_VALUES: function () {
            return F;
          },
          SERVER_RUNTIME: function () {
            return q;
          },
          WEBPACK_LAYERS: function () {
            return H;
          },
          WEBPACK_RESOURCE_QUERIES: function () {
            return G;
          },
        });
      let t = "nxtP",
        i = "x-prerender-revalidate",
        p = "x-prerender-revalidate-if-generated",
        n = "x-nextjs-postponed",
        o = ".prefetch.rsc",
        r = ".rsc",
        s = "x-next-cache-tags",
        d = "x-next-cache-soft-tags",
        l = "x-next-revalidated-tags",
        c = "x-next-revalidate-tag-token",
        u = 256,
        m = 1024,
        f = "_N_T_",
        v = 31536e3,
        h = "middleware",
        g = `(?:src/)?${h}`,
        b = "instrumentation",
        x = "private-next-pages",
        _ = "private-dot-next",
        y = "private-next-root-dir",
        w = "private-next-app-dir",
        S = "next/dist/build/webpack/loaders/next-flight-loader/module-proxy",
        E = "private-next-rsc-action-validate",
        T = "private-next-rsc-action-proxy",
        N = "private-next-rsc-action-encryption",
        R = "private-next-rsc-action-client-wrapper",
        O =
          "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict",
        P =
          "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps",
        j =
          "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.",
        D =
          "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps",
        A =
          "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props",
        C =
          "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export",
        M =
          "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?",
        I =
          "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?",
        k =
          "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.",
        V =
          "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member",
        L =
          'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env',
        U =
          "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export",
        B = ["app", "pages", "components", "lib", "src"],
        F = [
          {
            title: "Strict",
            recommended: !0,
            config: { extends: "next/core-web-vitals" },
          },
          { title: "Base", config: { extends: "next" } },
          { title: "Cancel", config: null },
        ],
        q = {
          edge: "edge",
          experimentalEdge: "experimental-edge",
          nodejs: "nodejs",
        },
        z = {
          shared: "shared",
          reactServerComponents: "rsc",
          serverSideRendering: "ssr",
          actionBrowser: "action-browser",
          api: "api",
          middleware: "middleware",
          edgeAsset: "edge-asset",
          appPagesBrowser: "app-pages-browser",
          appMetadataRoute: "app-metadata-route",
          appRouteHandler: "app-route-handler",
        },
        H = {
          ...z,
          GROUP: {
            server: [
              z.reactServerComponents,
              z.actionBrowser,
              z.appMetadataRoute,
              z.appRouteHandler,
            ],
            nonClientServerTarget: [z.middleware, z.api],
            app: [
              z.reactServerComponents,
              z.actionBrowser,
              z.appMetadataRoute,
              z.appRouteHandler,
              z.serverSideRendering,
              z.appPagesBrowser,
            ],
          },
        },
        G = {
          edgeSSREntry: "__next_edge_ssr_entry__",
          metadata: "__next_metadata__",
          metadataRoute: "__next_metadata_route__",
          metadataImageMeta: "__next_metadata_image_meta__",
        };
    },
    6106: (e, a) => {
      var t;
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          reset: function () {
            return s;
          },
          bold: function () {
            return d;
          },
          dim: function () {
            return l;
          },
          italic: function () {
            return c;
          },
          underline: function () {
            return u;
          },
          inverse: function () {
            return m;
          },
          hidden: function () {
            return f;
          },
          strikethrough: function () {
            return v;
          },
          black: function () {
            return h;
          },
          red: function () {
            return g;
          },
          green: function () {
            return b;
          },
          yellow: function () {
            return x;
          },
          blue: function () {
            return _;
          },
          magenta: function () {
            return y;
          },
          purple: function () {
            return w;
          },
          cyan: function () {
            return S;
          },
          white: function () {
            return E;
          },
          gray: function () {
            return T;
          },
          bgBlack: function () {
            return N;
          },
          bgRed: function () {
            return R;
          },
          bgGreen: function () {
            return O;
          },
          bgYellow: function () {
            return P;
          },
          bgBlue: function () {
            return j;
          },
          bgMagenta: function () {
            return D;
          },
          bgCyan: function () {
            return A;
          },
          bgWhite: function () {
            return C;
          },
        });
      let { env: i, stdout: p } =
          (null == (t = globalThis) ? void 0 : t.process) ?? {},
        n =
          i &&
          !i.NO_COLOR &&
          (i.FORCE_COLOR ||
            ((null == p ? void 0 : p.isTTY) && !i.CI && "dumb" !== i.TERM)),
        o = (e, a, t, i) => {
          let p = e.substring(0, i) + t,
            n = e.substring(i + a.length),
            r = n.indexOf(a);
          return ~r ? p + o(n, a, t, r) : p + n;
        },
        r =
          (e, a, t = e) =>
          (i) => {
            let p = "" + i,
              n = p.indexOf(a, e.length);
            return ~n ? e + o(p, a, t, n) + a : e + p + a;
          },
        s = n ? (e) => `\x1b[0m${e}\x1b[0m` : String,
        d = n ? r("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m") : String,
        l = n ? r("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m") : String,
        c = n ? r("\x1b[3m", "\x1b[23m") : String,
        u = n ? r("\x1b[4m", "\x1b[24m") : String,
        m = n ? r("\x1b[7m", "\x1b[27m") : String,
        f = n ? r("\x1b[8m", "\x1b[28m") : String,
        v = n ? r("\x1b[9m", "\x1b[29m") : String,
        h = n ? r("\x1b[30m", "\x1b[39m") : String,
        g = n ? r("\x1b[31m", "\x1b[39m") : String,
        b = n ? r("\x1b[32m", "\x1b[39m") : String,
        x = n ? r("\x1b[33m", "\x1b[39m") : String,
        _ = n ? r("\x1b[34m", "\x1b[39m") : String,
        y = n ? r("\x1b[35m", "\x1b[39m") : String,
        w = n ? r("\x1b[38;2;173;127;168m", "\x1b[39m") : String,
        S = n ? r("\x1b[36m", "\x1b[39m") : String,
        E = n ? r("\x1b[37m", "\x1b[39m") : String,
        T = n ? r("\x1b[90m", "\x1b[39m") : String,
        N = n ? r("\x1b[40m", "\x1b[49m") : String,
        R = n ? r("\x1b[41m", "\x1b[49m") : String,
        O = n ? r("\x1b[42m", "\x1b[49m") : String,
        P = n ? r("\x1b[43m", "\x1b[49m") : String,
        j = n ? r("\x1b[44m", "\x1b[49m") : String,
        D = n ? r("\x1b[45m", "\x1b[49m") : String,
        A = n ? r("\x1b[46m", "\x1b[49m") : String,
        C = n ? r("\x1b[47m", "\x1b[49m") : String;
    },
    2564: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          renderToReadableStream: function () {
            return i.renderToReadableStream;
          },
          decodeReply: function () {
            return i.decodeReply;
          },
          decodeAction: function () {
            return i.decodeAction;
          },
          decodeFormState: function () {
            return i.decodeFormState;
          },
          AppRouter: function () {
            return p.default;
          },
          LayoutRouter: function () {
            return n.default;
          },
          RenderFromTemplateContext: function () {
            return o.default;
          },
          staticGenerationAsyncStorage: function () {
            return r.staticGenerationAsyncStorage;
          },
          requestAsyncStorage: function () {
            return s.requestAsyncStorage;
          },
          actionAsyncStorage: function () {
            return d.actionAsyncStorage;
          },
          staticGenerationBailout: function () {
            return l.staticGenerationBailout;
          },
          createSearchParamsBailoutProxy: function () {
            return u.createSearchParamsBailoutProxy;
          },
          serverHooks: function () {
            return m;
          },
          preloadStyle: function () {
            return v.preloadStyle;
          },
          preloadFont: function () {
            return v.preloadFont;
          },
          preconnect: function () {
            return v.preconnect;
          },
          taintObjectReference: function () {
            return h.taintObjectReference;
          },
          StaticGenerationSearchParamsBailoutProvider: function () {
            return c.default;
          },
          NotFoundBoundary: function () {
            return x;
          },
          patchFetch: function () {
            return _;
          },
        });
      let i = t(5951),
        p = g(t(8730)),
        n = g(t(8165)),
        o = g(t(5676)),
        r = t(5319),
        s = t(1877),
        d = t(5528),
        l = t(3657),
        c = g(t(7701)),
        u = t(1263),
        m = (function (e, a) {
          if (!a && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var t = b(a);
          if (t && t.has(e)) return t.get(e);
          var i = {},
            p = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var n in e)
            if ("default" !== n && Object.prototype.hasOwnProperty.call(e, n)) {
              var o = p ? Object.getOwnPropertyDescriptor(e, n) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(i, n, o)
                : (i[n] = e[n]);
            }
          return (i.default = e), t && t.set(e, i), i;
        })(t(9195)),
        f = t(1040),
        v = t(8483),
        h = t(3369);
      function g(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function b(e) {
        if ("function" != typeof WeakMap) return null;
        var a = new WeakMap(),
          t = new WeakMap();
        return (b = function (e) {
          return e ? t : a;
        })(e);
      }
      let { NotFoundBoundary: x } = t(4009);
      function _() {
        return (0, f.patchFetch)({
          serverHooks: m,
          staticGenerationAsyncStorage: r.staticGenerationAsyncStorage,
        });
      }
    },
    8483: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          preloadStyle: function () {
            return p;
          },
          preloadFont: function () {
            return n;
          },
          preconnect: function () {
            return o;
          },
        });
      let i = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(t(8337));
      function p(e, a) {
        let t = { as: "style" };
        "string" == typeof a && (t.crossOrigin = a), i.default.preload(e, t);
      }
      function n(e, a, t) {
        let p = { as: "font", type: a };
        "string" == typeof t && (p.crossOrigin = t), i.default.preload(e, p);
      }
      function o(e, a) {
        i.default.preconnect(
          e,
          "string" == typeof a ? { crossOrigin: a } : void 0,
        );
      }
    },
    3369: (e, a, t) => {
      function i() {
        throw Error("Taint can only be used with the taint flag.");
      }
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          taintObjectReference: function () {
            return p;
          },
          taintUniqueValue: function () {
            return n;
          },
        }),
        t(3542);
      let p = i,
        n = i;
    },
    6132: (e, a) => {
      var t;
      Object.defineProperty(a, "x", {
        enumerable: !0,
        get: function () {
          return t;
        },
      }),
        (function (e) {
          (e.PAGES = "PAGES"),
            (e.PAGES_API = "PAGES_API"),
            (e.APP_PAGE = "APP_PAGE"),
            (e.APP_ROUTE = "APP_ROUTE");
        })(t || (t = {}));
    },
    7096: (e, a, t) => {
      e.exports = t(399);
    },
    8337: (e, a, t) => {
      e.exports = t(7096).vendored["react-rsc"].ReactDOM;
    },
    5951: (e, a, t) => {
      e.exports = t(7096).vendored["react-rsc"].ReactServerDOMWebpackServerEdge;
    },
    3542: (e, a, t) => {
      e.exports = t(7096).vendored["react-rsc"].React;
    },
    1040: (e, a, t) => {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          validateTags: function () {
            return d;
          },
          addImplicitTags: function () {
            return c;
          },
          patchFetch: function () {
            return m;
          },
        });
      let i = t(4875),
        p = t(4640),
        n = t(9368),
        o = (function (e, a) {
          if (!a && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var t = s(a);
          if (t && t.has(e)) return t.get(e);
          var i = {},
            p = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var n in e)
            if ("default" !== n && Object.prototype.hasOwnProperty.call(e, n)) {
              var o = p ? Object.getOwnPropertyDescriptor(e, n) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(i, n, o)
                : (i[n] = e[n]);
            }
          return (i.default = e), t && t.set(e, i), i;
        })(t(8775)),
        r = t(2236);
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var a = new WeakMap(),
          t = new WeakMap();
        return (s = function (e) {
          return e ? t : a;
        })(e);
      }
      function d(e, a) {
        let t = [],
          i = [];
        for (let a of e)
          "string" != typeof a
            ? i.push({ tag: a, reason: "invalid type, must be a string" })
            : a.length > n.NEXT_CACHE_TAG_MAX_LENGTH
              ? i.push({
                  tag: a,
                  reason: `exceeded max length of ${n.NEXT_CACHE_TAG_MAX_LENGTH}`,
                })
              : t.push(a);
        if (i.length > 0)
          for (let { tag: e, reason: t } of (console.warn(
            `Warning: invalid tags passed to ${a}: `,
          ),
          i))
            console.log(`tag: "${e}" ${t}`);
        return t;
      }
      let l = (e) => {
        let a = ["/layout"];
        if (e.startsWith("/")) {
          let t = e.split("/");
          for (let e = 1; e < t.length + 1; e++) {
            let i = t.slice(0, e).join("/");
            i &&
              (i.endsWith("/page") ||
                i.endsWith("/route") ||
                (i = `${i}${i.endsWith("/") ? "" : "/"}layout`),
              a.push(i));
          }
        }
        return a;
      };
      function c(e) {
        var a, t;
        let i = [],
          { pagePath: p, urlPathname: o } = e;
        if ((Array.isArray(e.tags) || (e.tags = []), p)) {
          let t = l(p);
          for (let p of t)
            (p = `${n.NEXT_CACHE_IMPLICIT_TAG_ID}${p}`),
              (null == (a = e.tags) ? void 0 : a.includes(p)) || e.tags.push(p),
              i.push(p);
        }
        if (o) {
          let a = new URL(o, "http://n").pathname,
            p = `${n.NEXT_CACHE_IMPLICIT_TAG_ID}${a}`;
          (null == (t = e.tags) ? void 0 : t.includes(p)) || e.tags.push(p),
            i.push(p);
        }
        return i;
      }
      function u(e, a) {
        if (!e) return;
        e.fetchMetrics || (e.fetchMetrics = []);
        let t = ["url", "status", "method"];
        e.fetchMetrics.some((e) => t.every((t) => e[t] === a[t])) ||
          e.fetchMetrics.push({
            url: a.url,
            cacheStatus: a.cacheStatus,
            cacheReason: a.cacheReason,
            status: a.status,
            method: a.method,
            start: a.start,
            end: Date.now(),
            idx: e.nextFetchId || 0,
          });
      }
      function m({ serverHooks: e, staticGenerationAsyncStorage: a }) {
        if (
          (globalThis._nextOriginalFetch ||
            (globalThis._nextOriginalFetch = globalThis.fetch),
          globalThis.fetch.__nextPatched)
        )
          return;
        let { DynamicServerError: t } = e,
          s = globalThis._nextOriginalFetch;
        (globalThis.fetch = async (e, l) => {
          var m, f;
          let v;
          try {
            ((v = new URL(e instanceof Request ? e.url : e)).username = ""),
              (v.password = "");
          } catch {
            v = void 0;
          }
          let h = (null == v ? void 0 : v.href) ?? "",
            g = Date.now(),
            b =
              (null == l
                ? void 0
                : null == (m = l.method)
                  ? void 0
                  : m.toUpperCase()) || "GET",
            x =
              (null == (f = null == l ? void 0 : l.next)
                ? void 0
                : f.internal) === !0;
          return await (0, p.getTracer)().trace(
            x ? i.NextNodeServerSpan.internalFetch : i.AppRenderSpan.fetch,
            {
              kind: p.SpanKind.CLIENT,
              spanName: ["fetch", b, h].filter(Boolean).join(" "),
              attributes: {
                "http.url": h,
                "http.method": b,
                "net.peer.name": null == v ? void 0 : v.hostname,
                "net.peer.port": (null == v ? void 0 : v.port) || void 0,
              },
            },
            async () => {
              var i;
              let p, m, f;
              let v =
                  a.getStore() ||
                  (null == fetch.__nextGetStaticStore
                    ? void 0
                    : fetch.__nextGetStaticStore.call(fetch)),
                b = e && "object" == typeof e && "string" == typeof e.method,
                _ = (a) => (b ? e[a] : null) || (null == l ? void 0 : l[a]);
              if (!v || x || v.isDraftMode) return s(e, l);
              let y = (a) => {
                  var t, i, p;
                  return void 0 !==
                    (null == l ? void 0 : null == (t = l.next) ? void 0 : t[a])
                    ? null == l
                      ? void 0
                      : null == (i = l.next)
                        ? void 0
                        : i[a]
                    : b
                      ? null == (p = e.next)
                        ? void 0
                        : p[a]
                      : void 0;
                },
                w = y("revalidate"),
                S = d(y("tags") || [], `fetch ${e.toString()}`);
              if (Array.isArray(S))
                for (let e of (v.tags || (v.tags = []), S))
                  v.tags.includes(e) || v.tags.push(e);
              let E = c(v),
                T = "only-cache" === v.fetchCache,
                N = "force-cache" === v.fetchCache,
                R = "default-cache" === v.fetchCache,
                O = "default-no-store" === v.fetchCache,
                P = "only-no-store" === v.fetchCache,
                j = "force-no-store" === v.fetchCache,
                D = _("cache"),
                A = "";
              "string" == typeof D &&
                void 0 !== w &&
                (o.warn(
                  `fetch for ${h} on ${v.urlPathname} specified "cache: ${D}" and "revalidate: ${w}", only one should be specified.`,
                ),
                (D = void 0)),
                "force-cache" === D
                  ? (w = !1)
                  : ("no-cache" === D || "no-store" === D || j || P) && (w = 0),
                ("no-cache" === D || "no-store" === D) && (A = `cache: ${D}`),
                ("number" == typeof w || !1 === w) && (f = w);
              let C = _("headers"),
                M =
                  "function" == typeof (null == C ? void 0 : C.get)
                    ? C
                    : new Headers(C || {}),
                I = M.get("authorization") || M.get("cookie"),
                k = !["get", "head"].includes(
                  (null == (i = _("method")) ? void 0 : i.toLowerCase()) ||
                    "get",
                ),
                V = (I || k) && 0 === v.revalidate;
              if ((j && (A = "fetchCache = force-no-store"), P)) {
                if (
                  "force-cache" === D ||
                  (void 0 !== f && (!1 === f || f > 0))
                )
                  throw Error(
                    `cache: 'force-cache' used on fetch for ${h} with 'export const fetchCache = 'only-no-store'`,
                  );
                A = "fetchCache = only-no-store";
              }
              if (T && "no-store" === D)
                throw Error(
                  `cache: 'no-store' used on fetch for ${h} with 'export const fetchCache = 'only-cache'`,
                );
              N &&
                (void 0 === w || 0 === w) &&
                ((A = "fetchCache = force-cache"), (f = !1)),
                void 0 === f
                  ? R
                    ? ((f = !1), (A = "fetchCache = default-cache"))
                    : V
                      ? ((f = 0), (A = "auto no cache"))
                      : O
                        ? ((f = 0), (A = "fetchCache = default-no-store"))
                        : ((A = "auto cache"),
                          (f =
                            "boolean" != typeof v.revalidate &&
                            void 0 !== v.revalidate &&
                            v.revalidate))
                  : A || (A = `revalidate: ${f}`),
                !V &&
                  (void 0 === v.revalidate ||
                    ("number" == typeof f &&
                      (!1 === v.revalidate ||
                        ("number" == typeof v.revalidate &&
                          f < v.revalidate)))) &&
                  (0 === f && (0, r.maybePostpone)(v, "revalidate: 0"),
                  (v.revalidate = f));
              let L = ("number" == typeof f && f > 0) || !1 === f;
              if (v.incrementalCache && L)
                try {
                  p = await v.incrementalCache.fetchCacheKey(h, b ? e : l);
                } catch (a) {
                  console.error("Failed to generate cache key for", e);
                }
              let U = v.nextFetchId ?? 1;
              v.nextFetchId = U + 1;
              let B = "number" != typeof f ? n.CACHE_ONE_YEAR : f,
                F = async (a, t) => {
                  let i = [
                    "cache",
                    "credentials",
                    "headers",
                    "integrity",
                    "keepalive",
                    "method",
                    "mode",
                    "redirect",
                    "referrer",
                    "referrerPolicy",
                    "window",
                    "duplex",
                    ...(a ? [] : ["signal"]),
                  ];
                  if (b) {
                    let a = e,
                      t = { body: a._ogBody || a.body };
                    for (let e of i) t[e] = a[e];
                    e = new Request(a.url, t);
                  } else if (l) {
                    let e = l;
                    for (let a of ((l = { body: l._ogBody || l.body }), i))
                      l[a] = e[a];
                  }
                  let n = {
                    ...l,
                    next: {
                      ...(null == l ? void 0 : l.next),
                      fetchType: "origin",
                      fetchIdx: U,
                    },
                  };
                  return s(e, n).then(async (i) => {
                    if (
                      (a ||
                        u(v, {
                          start: g,
                          url: h,
                          cacheReason: t || A,
                          cacheStatus: 0 === f || t ? "skip" : "miss",
                          status: i.status,
                          method: n.method || "GET",
                        }),
                      200 === i.status && v.incrementalCache && p && L)
                    ) {
                      let a = Buffer.from(await i.arrayBuffer());
                      try {
                        await v.incrementalCache.set(
                          p,
                          {
                            kind: "FETCH",
                            data: {
                              headers: Object.fromEntries(i.headers.entries()),
                              body: a.toString("base64"),
                              status: i.status,
                              url: i.url,
                            },
                            revalidate: B,
                          },
                          {
                            fetchCache: !0,
                            revalidate: f,
                            fetchUrl: h,
                            fetchIdx: U,
                            tags: S,
                          },
                        );
                      } catch (a) {
                        console.warn("Failed to set fetch cache", e, a);
                      }
                      let t = new Response(a, {
                        headers: new Headers(i.headers),
                        status: i.status,
                      });
                      return (
                        Object.defineProperty(t, "url", { value: i.url }), t
                      );
                    }
                    return i;
                  });
                },
                q = () => Promise.resolve();
              if (p && v.incrementalCache) {
                q = await v.incrementalCache.lock(p);
                let e = v.isOnDemandRevalidate
                  ? null
                  : await v.incrementalCache.get(p, {
                      kindHint: "fetch",
                      revalidate: f,
                      fetchUrl: h,
                      fetchIdx: U,
                      tags: S,
                      softTags: E,
                    });
                if (
                  (e
                    ? await q()
                    : (m = "cache-control: no-cache (hard refresh)"),
                  (null == e ? void 0 : e.value) &&
                    "FETCH" === e.value.kind &&
                    !(v.isRevalidate && e.isStale))
                ) {
                  e.isStale &&
                    (v.pendingRevalidates || (v.pendingRevalidates = []),
                    v.pendingRevalidates.push(F(!0).catch(console.error)));
                  let a = e.value.data;
                  u(v, {
                    start: g,
                    url: h,
                    cacheReason: A,
                    cacheStatus: "hit",
                    status: a.status || 200,
                    method: (null == l ? void 0 : l.method) || "GET",
                  });
                  let t = new Response(Buffer.from(a.body, "base64"), {
                    headers: a.headers,
                    status: a.status,
                  });
                  return (
                    Object.defineProperty(t, "url", {
                      value: e.value.data.url,
                    }),
                    t
                  );
                }
              }
              if (v.isStaticGeneration && l && "object" == typeof l) {
                let { cache: a } = l;
                if ("no-store" === a) {
                  let a = `no-store fetch ${e}${
                      v.urlPathname ? ` ${v.urlPathname}` : ""
                    }`,
                    i = new t(a);
                  (v.dynamicUsageErr = i),
                    (v.dynamicUsageStack = i.stack),
                    (v.dynamicUsageDescription = a),
                    (0, r.maybePostpone)(v, a),
                    (v.revalidate = 0);
                }
                let i = "next" in l,
                  { next: p = {} } = l;
                if (
                  "number" == typeof p.revalidate &&
                  (void 0 === v.revalidate ||
                    ("number" == typeof v.revalidate &&
                      p.revalidate < v.revalidate))
                ) {
                  let a = v.forceDynamic;
                  if (!a && 0 === p.revalidate) {
                    let a = `revalidate: 0 fetch ${e}${
                        v.urlPathname ? ` ${v.urlPathname}` : ""
                      }`,
                      i = new t(a);
                    (v.dynamicUsageErr = i),
                      (v.dynamicUsageStack = i.stack),
                      (v.dynamicUsageDescription = a),
                      (0, r.maybePostpone)(v, a);
                  }
                  (a && 0 === p.revalidate) || (v.revalidate = p.revalidate);
                }
                i && delete l.next;
              }
              return F(!1, m).finally(q);
            },
          );
        }),
          (globalThis.fetch.__nextGetStaticStore = () => a),
          (globalThis.fetch.__nextPatched = !0);
      }
    },
    4875: (e, a) => {
      var t, i, p, n, o, r, s, d, l, c, u;
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          NextVanillaSpanAllowlist: function () {
            return m;
          },
          BaseServerSpan: function () {
            return t;
          },
          LoadComponentsSpan: function () {
            return i;
          },
          NextServerSpan: function () {
            return p;
          },
          NextNodeServerSpan: function () {
            return n;
          },
          StartServerSpan: function () {
            return o;
          },
          RenderSpan: function () {
            return r;
          },
          RouterSpan: function () {
            return d;
          },
          AppRenderSpan: function () {
            return s;
          },
          NodeSpan: function () {
            return l;
          },
          AppRouteRouteHandlersSpan: function () {
            return c;
          },
          ResolveMetadataSpan: function () {
            return u;
          },
        }),
        (function (e) {
          (e.handleRequest = "BaseServer.handleRequest"),
            (e.run = "BaseServer.run"),
            (e.pipe = "BaseServer.pipe"),
            (e.getStaticHTML = "BaseServer.getStaticHTML"),
            (e.render = "BaseServer.render"),
            (e.renderToResponseWithComponents =
              "BaseServer.renderToResponseWithComponents"),
            (e.renderToResponse = "BaseServer.renderToResponse"),
            (e.renderToHTML = "BaseServer.renderToHTML"),
            (e.renderError = "BaseServer.renderError"),
            (e.renderErrorToResponse = "BaseServer.renderErrorToResponse"),
            (e.renderErrorToHTML = "BaseServer.renderErrorToHTML"),
            (e.render404 = "BaseServer.render404");
        })(t || (t = {})),
        (function (e) {
          (e.loadDefaultErrorComponents =
            "LoadComponents.loadDefaultErrorComponents"),
            (e.loadComponents = "LoadComponents.loadComponents");
        })(i || (i = {})),
        (function (e) {
          (e.getRequestHandler = "NextServer.getRequestHandler"),
            (e.getServer = "NextServer.getServer"),
            (e.getServerRequestHandler = "NextServer.getServerRequestHandler"),
            (e.createServer = "createServer.createServer");
        })(p || (p = {})),
        (function (e) {
          (e.compression = "NextNodeServer.compression"),
            (e.getBuildId = "NextNodeServer.getBuildId"),
            (e.generateStaticRoutes = "NextNodeServer.generateStaticRoutes"),
            (e.generateFsStaticRoutes =
              "NextNodeServer.generateFsStaticRoutes"),
            (e.generatePublicRoutes = "NextNodeServer.generatePublicRoutes"),
            (e.generateImageRoutes =
              "NextNodeServer.generateImageRoutes.route"),
            (e.sendRenderResult = "NextNodeServer.sendRenderResult"),
            (e.proxyRequest = "NextNodeServer.proxyRequest"),
            (e.runApi = "NextNodeServer.runApi"),
            (e.render = "NextNodeServer.render"),
            (e.renderHTML = "NextNodeServer.renderHTML"),
            (e.imageOptimizer = "NextNodeServer.imageOptimizer"),
            (e.getPagePath = "NextNodeServer.getPagePath"),
            (e.getRoutesManifest = "NextNodeServer.getRoutesManifest"),
            (e.findPageComponents = "NextNodeServer.findPageComponents"),
            (e.getFontManifest = "NextNodeServer.getFontManifest"),
            (e.getServerComponentManifest =
              "NextNodeServer.getServerComponentManifest"),
            (e.getRequestHandler = "NextNodeServer.getRequestHandler"),
            (e.renderToHTML = "NextNodeServer.renderToHTML"),
            (e.renderError = "NextNodeServer.renderError"),
            (e.renderErrorToHTML = "NextNodeServer.renderErrorToHTML"),
            (e.render404 = "NextNodeServer.render404"),
            (e.route = "route"),
            (e.onProxyReq = "onProxyReq"),
            (e.apiResolver = "apiResolver"),
            (e.internalFetch = "internalFetch");
        })(n || (n = {})),
        ((o || (o = {})).startServer = "startServer.startServer"),
        (function (e) {
          (e.getServerSideProps = "Render.getServerSideProps"),
            (e.getStaticProps = "Render.getStaticProps"),
            (e.renderToString = "Render.renderToString"),
            (e.renderDocument = "Render.renderDocument"),
            (e.createBodyResult = "Render.createBodyResult");
        })(r || (r = {})),
        (function (e) {
          (e.renderToString = "AppRender.renderToString"),
            (e.renderToReadableStream = "AppRender.renderToReadableStream"),
            (e.getBodyResult = "AppRender.getBodyResult"),
            (e.fetch = "AppRender.fetch");
        })(s || (s = {})),
        ((d || (d = {})).executeRoute = "Router.executeRoute"),
        ((l || (l = {})).runHandler = "Node.runHandler"),
        ((c || (c = {})).runHandler = "AppRouteRouteHandlers.runHandler"),
        (function (e) {
          (e.generateMetadata = "ResolveMetadata.generateMetadata"),
            (e.generateViewport = "ResolveMetadata.generateViewport");
        })(u || (u = {}));
      let m = [
        "BaseServer.handleRequest",
        "Render.getServerSideProps",
        "Render.getStaticProps",
        "AppRender.fetch",
        "AppRender.getBodyResult",
        "Render.renderDocument",
        "Node.runHandler",
        "AppRouteRouteHandlers.runHandler",
        "ResolveMetadata.generateMetadata",
        "ResolveMetadata.generateViewport",
      ];
    },
    4640: (e, a, t) => {
      let i;
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (function (e, a) {
          for (var t in a)
            Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
        })(a, {
          getTracer: function () {
            return b;
          },
          SpanStatusCode: function () {
            return s;
          },
          SpanKind: function () {
            return d;
          },
        });
      let p = t(4875);
      try {
        i = t(4389);
      } catch (e) {
        i = t(4389);
      }
      let {
          context: n,
          propagation: o,
          trace: r,
          SpanStatusCode: s,
          SpanKind: d,
          ROOT_CONTEXT: l,
        } = i,
        c = (e) =>
          null !== e && "object" == typeof e && "function" == typeof e.then,
        u = (e, a) => {
          (null == a ? void 0 : a.bubble) === !0
            ? e.setAttribute("next.bubble", !0)
            : (a && e.recordException(a),
              e.setStatus({
                code: s.ERROR,
                message: null == a ? void 0 : a.message,
              })),
            e.end();
        },
        m = new Map(),
        f = i.createContextKey("next.rootSpanId"),
        v = 0,
        h = () => v++;
      class g {
        getTracerInstance() {
          return r.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return n;
        }
        getActiveScopeSpan() {
          return r.getSpan(null == n ? void 0 : n.active());
        }
        withPropagatedContext(e, a) {
          if (n.active() !== l) return a();
          let t = o.extract(l, e.headers);
          return n.with(t, a);
        }
        trace(...e) {
          var a;
          let [t, i, o] = e,
            { fn: s, options: d } =
              "function" == typeof i
                ? { fn: i, options: {} }
                : { fn: o, options: { ...i } };
          if (
            (!p.NextVanillaSpanAllowlist.includes(t) &&
              "1" !== process.env.NEXT_OTEL_VERBOSE) ||
            d.hideSpan
          )
            return s();
          let v = d.spanName ?? t,
            g = this.getSpanContext(
              (null == d ? void 0 : d.parentSpan) ?? this.getActiveScopeSpan(),
            ),
            b = !1;
          g
            ? (null == (a = r.getSpanContext(g)) ? void 0 : a.isRemote) &&
              (b = !0)
            : ((g = l), (b = !0));
          let x = h();
          return (
            (d.attributes = {
              "next.span_name": v,
              "next.span_type": t,
              ...d.attributes,
            }),
            n.with(g.setValue(f, x), () =>
              this.getTracerInstance().startActiveSpan(v, d, (e) => {
                let a = () => {
                  m.delete(x);
                };
                b && m.set(x, new Map(Object.entries(d.attributes ?? {})));
                try {
                  if (s.length > 1) return s(e, (a) => u(e, a));
                  let t = s(e);
                  return (
                    c(t)
                      ? t
                          .then(
                            () => e.end(),
                            (a) => u(e, a),
                          )
                          .finally(a)
                      : (e.end(), a()),
                    t
                  );
                } catch (t) {
                  throw (u(e, t), a(), t);
                }
              }),
            )
          );
        }
        wrap(...e) {
          let a = this,
            [t, i, o] = 3 === e.length ? e : [e[0], {}, e[1]];
          return p.NextVanillaSpanAllowlist.includes(t) ||
            "1" === process.env.NEXT_OTEL_VERBOSE
            ? function () {
                let e = i;
                "function" == typeof e &&
                  "function" == typeof o &&
                  (e = e.apply(this, arguments));
                let p = arguments.length - 1,
                  r = arguments[p];
                if ("function" != typeof r)
                  return a.trace(t, e, () => o.apply(this, arguments));
                {
                  let i = a.getContext().bind(n.active(), r);
                  return a.trace(
                    t,
                    e,
                    (e, a) => (
                      (arguments[p] = function (e) {
                        return null == a || a(e), i.apply(this, arguments);
                      }),
                      o.apply(this, arguments)
                    ),
                  );
                }
              }
            : o;
        }
        startSpan(...e) {
          let [a, t] = e,
            i = this.getSpanContext(
              (null == t ? void 0 : t.parentSpan) ?? this.getActiveScopeSpan(),
            );
          return this.getTracerInstance().startSpan(a, t, i);
        }
        getSpanContext(e) {
          let a = e ? r.setSpan(n.active(), e) : void 0;
          return a;
        }
        getRootSpanAttributes() {
          let e = n.active().getValue(f);
          return m.get(e);
        }
      }
      let b = (() => {
        let e = new g();
        return () => e;
      })();
    },
    51: (e, a, t) => {
      function i(e, a) {
        if (!Object.prototype.hasOwnProperty.call(e, a))
          throw TypeError("attempted to use private field on non-instance");
        return e;
      }
      t.r(a), t.d(a, { _: () => i, _class_private_field_loose_base: () => i });
    },
    2581: (e, a, t) => {
      t.r(a), t.d(a, { _: () => p, _class_private_field_loose_key: () => p });
      var i = 0;
      function p(e) {
        return "__private_" + i++ + "_" + e;
      }
    },
    143: (e, a, t) => {
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.r(a), t.d(a, { _: () => i, _interop_require_default: () => i });
    },
    2212: (e, a, t) => {
      function i(e) {
        if ("function" != typeof WeakMap) return null;
        var a = new WeakMap(),
          t = new WeakMap();
        return (i = function (e) {
          return e ? t : a;
        })(e);
      }
      function p(e, a) {
        if (!a && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var t = i(a);
        if (t && t.has(e)) return t.get(e);
        var p = {},
          n = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var r = n ? Object.getOwnPropertyDescriptor(e, o) : null;
            r && (r.get || r.set)
              ? Object.defineProperty(p, o, r)
              : (p[o] = e[o]);
          }
        return (p.default = e), t && t.set(e, p), p;
      }
      t.r(a), t.d(a, { _: () => p, _interop_require_wildcard: () => p });
    },
    8073: (e, a, t) => {
      t.d(a, {
        ID: () => m,
        KU: () => s,
        Ke: () => Storage,
        Lg: () => l,
        mR: () => d,
        uU: () => u,
        y3: () => c,
      }),
        t(5586);
      var i = t(1068);
      function p(e, a, t, i) {
        return new (t || (t = Promise))(function (p, n) {
          function o(e) {
            try {
              s(i.next(e));
            } catch (e) {
              n(e);
            }
          }
          function r(e) {
            try {
              s(i.throw(e));
            } catch (e) {
              n(e);
            }
          }
          function s(e) {
            var a;
            e.done
              ? p(e.value)
              : ((a = e.value) instanceof t
                  ? a
                  : new t(function (e) {
                      e(a);
                    })
                ).then(o, r);
          }
          s((i = i.apply(e, a || [])).next());
        });
      }
      class n {
        constructor(e) {
          this.client = e;
        }
        static flatten(e, a = "") {
          let t = {};
          for (let i in e) {
            let p = e[i],
              n = a ? `${a}[${i}]` : i;
            Array.isArray(p)
              ? (t = Object.assign(t, this.flatten(p, n)))
              : (t[n] = p);
          }
          return t;
        }
      }
      n.CHUNK_SIZE = 5242880;
      class o {}
      (o.equal = (e, a) => o.addQuery(e, "equal", a)),
        (o.notEqual = (e, a) => o.addQuery(e, "notEqual", a)),
        (o.lessThan = (e, a) => o.addQuery(e, "lessThan", a)),
        (o.lessThanEqual = (e, a) => o.addQuery(e, "lessThanEqual", a)),
        (o.greaterThan = (e, a) => o.addQuery(e, "greaterThan", a)),
        (o.greaterThanEqual = (e, a) => o.addQuery(e, "greaterThanEqual", a)),
        (o.isNull = (e) => `isNull("${e}")`),
        (o.isNotNull = (e) => `isNotNull("${e}")`),
        (o.between = (e, a, t) =>
          `between("${e}", [${o.parseValues(a)},${o.parseValues(t)}])`),
        (o.startsWith = (e, a) => o.addQuery(e, "startsWith", a)),
        (o.endsWith = (e, a) => o.addQuery(e, "endsWith", a)),
        (o.select = (e) => `select([${e.map((e) => `"${e}"`).join(",")}])`),
        (o.search = (e, a) => o.addQuery(e, "search", a)),
        (o.orderDesc = (e) => `orderDesc("${e}")`),
        (o.orderAsc = (e) => `orderAsc("${e}")`),
        (o.cursorAfter = (e) => `cursorAfter("${e}")`),
        (o.cursorBefore = (e) => `cursorBefore("${e}")`),
        (o.limit = (e) => `limit(${e})`),
        (o.offset = (e) => `offset(${e})`),
        (o.addQuery = (e, a, t) =>
          t instanceof Array
            ? `${a}("${e}", [${t.map((e) => o.parseValues(e)).join(",")}])`
            : `${a}("${e}", [${o.parseValues(t)}])`),
        (o.parseValues = (e) =>
          "string" == typeof e || e instanceof String ? `"${e}"` : `${e}`);
      class r extends Error {
        constructor(e, a = 0, t = "", i = "") {
          super(e),
            (this.name = "AppwriteException"),
            (this.message = e),
            (this.code = a),
            (this.type = t),
            (this.response = i);
        }
      }
      class s {
        constructor() {
          (this.config = {
            endpoint: "https://HOSTNAME/v1",
            endpointRealtime: "",
            project: "",
            jwt: "",
            locale: "",
          }),
            (this.headers = {
              "x-sdk-name": "Web",
              "x-sdk-platform": "client",
              "x-sdk-language": "web",
              "x-sdk-version": "13.0.0",
              "X-Appwrite-Response-Format": "1.4.0",
            }),
            (this.realtime = {
              socket: void 0,
              timeout: void 0,
              url: "",
              channels: new Set(),
              subscriptions: new Map(),
              subscriptionsCounter: 0,
              reconnect: !0,
              reconnectAttempts: 0,
              lastMessage: void 0,
              connect: () => {
                clearTimeout(this.realtime.timeout),
                  (this.realtime.timeout =
                    null == window
                      ? void 0
                      : window.setTimeout(() => {
                          this.realtime.createSocket();
                        }, 50));
              },
              getTimeout: () => {
                switch (!0) {
                  case this.realtime.reconnectAttempts < 5:
                    return 1e3;
                  case this.realtime.reconnectAttempts < 15:
                    return 5e3;
                  case this.realtime.reconnectAttempts < 100:
                    return 1e4;
                  default:
                    return 6e4;
                }
              },
              createSocket: () => {
                var e, a;
                if (this.realtime.channels.size < 1) return;
                let t = new URLSearchParams();
                t.set("project", this.config.project),
                  this.realtime.channels.forEach((e) => {
                    t.append("channels[]", e);
                  });
                let i =
                  this.config.endpointRealtime + "/realtime?" + t.toString();
                (i !== this.realtime.url ||
                  !this.realtime.socket ||
                  (null === (e = this.realtime.socket) || void 0 === e
                    ? void 0
                    : e.readyState) > WebSocket.OPEN) &&
                  (this.realtime.socket &&
                    (null === (a = this.realtime.socket) || void 0 === a
                      ? void 0
                      : a.readyState) < WebSocket.CLOSING &&
                    ((this.realtime.reconnect = !1),
                    this.realtime.socket.close()),
                  (this.realtime.url = i),
                  (this.realtime.socket = new WebSocket(i)),
                  this.realtime.socket.addEventListener(
                    "message",
                    this.realtime.onMessage,
                  ),
                  this.realtime.socket.addEventListener("open", (e) => {
                    this.realtime.reconnectAttempts = 0;
                  }),
                  this.realtime.socket.addEventListener("close", (e) => {
                    var a, t, i;
                    if (
                      !this.realtime.reconnect ||
                      ((null ===
                        (t =
                          null === (a = this.realtime) || void 0 === a
                            ? void 0
                            : a.lastMessage) || void 0 === t
                        ? void 0
                        : t.type) === "error" &&
                        1008 ===
                          (null === (i = this.realtime) || void 0 === i
                            ? void 0
                            : i.lastMessage.data
                          ).code)
                    ) {
                      this.realtime.reconnect = !0;
                      return;
                    }
                    let p = this.realtime.getTimeout();
                    console.error(
                      `Realtime got disconnected. Reconnect will be attempted in ${
                        p / 1e3
                      } seconds.`,
                      e.reason,
                    ),
                      setTimeout(() => {
                        this.realtime.reconnectAttempts++,
                          this.realtime.createSocket();
                      }, p);
                  }));
              },
              onMessage: (e) => {
                var a, t;
                try {
                  let i = JSON.parse(e.data);
                  switch (((this.realtime.lastMessage = i), i.type)) {
                    case "connected":
                      let p = JSON.parse(
                          null !==
                            (a =
                              window.localStorage.getItem("cookieFallback")) &&
                            void 0 !== a
                            ? a
                            : "{}",
                        ),
                        n =
                          null == p
                            ? void 0
                            : p[`a_session_${this.config.project}`],
                        o = i.data;
                      n &&
                        !o.user &&
                        (null === (t = this.realtime.socket) ||
                          void 0 === t ||
                          t.send(
                            JSON.stringify({
                              type: "authentication",
                              data: { session: n },
                            }),
                          ));
                      break;
                    case "event":
                      let r = i.data;
                      if (null == r ? void 0 : r.channels) {
                        let e = r.channels.some((e) =>
                          this.realtime.channels.has(e),
                        );
                        if (!e) return;
                        this.realtime.subscriptions.forEach((e) => {
                          r.channels.some((a) => e.channels.includes(a)) &&
                            setTimeout(() => e.callback(r));
                        });
                      }
                      break;
                    case "error":
                      throw i.data;
                  }
                } catch (e) {
                  console.error(e);
                }
              },
              cleanUp: (e) => {
                this.realtime.channels.forEach((a) => {
                  e.includes(a) &&
                    !Array.from(this.realtime.subscriptions).some(([e, t]) =>
                      t.channels.includes(a),
                    ) &&
                    this.realtime.channels.delete(a);
                });
              },
            });
        }
        setEndpoint(e) {
          return (
            (this.config.endpoint = e),
            (this.config.endpointRealtime =
              this.config.endpointRealtime ||
              this.config.endpoint
                .replace("https://", "wss://")
                .replace("http://", "ws://")),
            this
          );
        }
        setEndpointRealtime(e) {
          return (this.config.endpointRealtime = e), this;
        }
        setProject(e) {
          return (
            (this.headers["X-Appwrite-Project"] = e),
            (this.config.project = e),
            this
          );
        }
        setJWT(e) {
          return (
            (this.headers["X-Appwrite-JWT"] = e), (this.config.jwt = e), this
          );
        }
        setLocale(e) {
          return (
            (this.headers["X-Appwrite-Locale"] = e),
            (this.config.locale = e),
            this
          );
        }
        subscribe(e, a) {
          let t = "string" == typeof e ? [e] : e;
          t.forEach((e) => this.realtime.channels.add(e));
          let i = this.realtime.subscriptionsCounter++;
          return (
            this.realtime.subscriptions.set(i, { channels: t, callback: a }),
            this.realtime.connect(),
            () => {
              this.realtime.subscriptions.delete(i),
                this.realtime.cleanUp(t),
                this.realtime.connect();
            }
          );
        }
        call(e, a, t = {}, o = {}) {
          var s;
          return p(this, void 0, void 0, function* () {
            (e = e.toUpperCase()), (t = Object.assign({}, this.headers, t));
            let p = { method: e, headers: t, credentials: "include" };
            if ("GET" === e)
              for (let [e, t] of Object.entries(n.flatten(o)))
                a.searchParams.append(e, t);
            else
              switch (t["content-type"]) {
                case "application/json":
                  p.body = JSON.stringify(o);
                  break;
                case "multipart/form-data":
                  let d = new FormData();
                  for (let e in o)
                    Array.isArray(o[e])
                      ? o[e].forEach((a) => {
                          d.append(e + "[]", a);
                        })
                      : d.append(e, o[e]);
                  (p.body = d), delete t["content-type"];
              }
            try {
              let e = null,
                t = yield (0, i.fetch)(a.toString(), p);
              if (
                ((e = (
                  null === (s = t.headers.get("content-type")) || void 0 === s
                    ? void 0
                    : s.includes("application/json")
                )
                  ? yield t.json()
                  : { message: yield t.text() }),
                400 <= t.status)
              )
                throw new r(
                  null == e ? void 0 : e.message,
                  t.status,
                  null == e ? void 0 : e.type,
                  e,
                );
              return t.headers.get("X-Fallback-Cookies"), e;
            } catch (e) {
              if (e instanceof r) throw e;
              throw new r(e.message);
            }
          });
        }
      }
      class d extends n {
        constructor(e) {
          super(e);
        }
        get() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(this.client.config.endpoint + "/account");
            return yield this.client.call(
              "get",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        create(e, a, t, i) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "email"');
            if (void 0 === t)
              throw new r('Missing required parameter: "password"');
            let p = {};
            void 0 !== e && (p.userId = e),
              void 0 !== a && (p.email = a),
              void 0 !== t && (p.password = t),
              void 0 !== i && (p.name = i);
            let n = new URL(this.client.config.endpoint + "/account");
            return yield this.client.call(
              "post",
              n,
              { "content-type": "application/json" },
              p,
            );
          });
        }
        updateEmail(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "email"');
            if (void 0 === a)
              throw new r('Missing required parameter: "password"');
            let t = {};
            void 0 !== e && (t.email = e), void 0 !== a && (t.password = a);
            let i = new URL(this.client.config.endpoint + "/account/email");
            return yield this.client.call(
              "patch",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        listIdentities(e) {
          return p(this, void 0, void 0, function* () {
            let a = {};
            void 0 !== e && (a.queries = e);
            let t = new URL(
              this.client.config.endpoint + "/account/identities",
            );
            return yield this.client.call(
              "get",
              t,
              { "content-type": "application/json" },
              a,
            );
          });
        }
        deleteIdentity(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "identityId"');
            let a = "/account/identities/{identityId}".replace(
                "{identityId}",
                e,
              ),
              t = new URL(this.client.config.endpoint + a);
            return yield this.client.call(
              "delete",
              t,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        createJWT() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(this.client.config.endpoint + "/account/jwt");
            return yield this.client.call(
              "post",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        listLogs(e) {
          return p(this, void 0, void 0, function* () {
            let a = {};
            void 0 !== e && (a.queries = e);
            let t = new URL(this.client.config.endpoint + "/account/logs");
            return yield this.client.call(
              "get",
              t,
              { "content-type": "application/json" },
              a,
            );
          });
        }
        updateName(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e) throw new r('Missing required parameter: "name"');
            let a = {};
            void 0 !== e && (a.name = e);
            let t = new URL(this.client.config.endpoint + "/account/name");
            return yield this.client.call(
              "patch",
              t,
              { "content-type": "application/json" },
              a,
            );
          });
        }
        updatePassword(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "password"');
            let t = {};
            void 0 !== e && (t.password = e),
              void 0 !== a && (t.oldPassword = a);
            let i = new URL(this.client.config.endpoint + "/account/password");
            return yield this.client.call(
              "patch",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        updatePhone(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "phone"');
            if (void 0 === a)
              throw new r('Missing required parameter: "password"');
            let t = {};
            void 0 !== e && (t.phone = e), void 0 !== a && (t.password = a);
            let i = new URL(this.client.config.endpoint + "/account/phone");
            return yield this.client.call(
              "patch",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        getPrefs() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(this.client.config.endpoint + "/account/prefs");
            return yield this.client.call(
              "get",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        updatePrefs(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "prefs"');
            let a = {};
            void 0 !== e && (a.prefs = e);
            let t = new URL(this.client.config.endpoint + "/account/prefs");
            return yield this.client.call(
              "patch",
              t,
              { "content-type": "application/json" },
              a,
            );
          });
        }
        createRecovery(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "email"');
            if (void 0 === a) throw new r('Missing required parameter: "url"');
            let t = {};
            void 0 !== e && (t.email = e), void 0 !== a && (t.url = a);
            let i = new URL(this.client.config.endpoint + "/account/recovery");
            return yield this.client.call(
              "post",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        updateRecovery(e, a, t, i) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "secret"');
            if (void 0 === t)
              throw new r('Missing required parameter: "password"');
            if (void 0 === i)
              throw new r('Missing required parameter: "passwordAgain"');
            let p = {};
            void 0 !== e && (p.userId = e),
              void 0 !== a && (p.secret = a),
              void 0 !== t && (p.password = t),
              void 0 !== i && (p.passwordAgain = i);
            let n = new URL(this.client.config.endpoint + "/account/recovery");
            return yield this.client.call(
              "put",
              n,
              { "content-type": "application/json" },
              p,
            );
          });
        }
        listSessions() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(this.client.config.endpoint + "/account/sessions");
            return yield this.client.call(
              "get",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        deleteSessions() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(this.client.config.endpoint + "/account/sessions");
            return yield this.client.call(
              "delete",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        createAnonymousSession() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(
              this.client.config.endpoint + "/account/sessions/anonymous",
            );
            return yield this.client.call(
              "post",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        createEmailSession(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "email"');
            if (void 0 === a)
              throw new r('Missing required parameter: "password"');
            let t = {};
            void 0 !== e && (t.email = e), void 0 !== a && (t.password = a);
            let i = new URL(
              this.client.config.endpoint + "/account/sessions/email",
            );
            return yield this.client.call(
              "post",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        createMagicURLSession(e, a, t) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "email"');
            let i = {};
            void 0 !== e && (i.userId = e),
              void 0 !== a && (i.email = a),
              void 0 !== t && (i.url = t);
            let p = new URL(
              this.client.config.endpoint + "/account/sessions/magic-url",
            );
            return yield this.client.call(
              "post",
              p,
              { "content-type": "application/json" },
              i,
            );
          });
        }
        updateMagicURLSession(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "secret"');
            let t = {};
            void 0 !== e && (t.userId = e), void 0 !== a && (t.secret = a);
            let i = new URL(
              this.client.config.endpoint + "/account/sessions/magic-url",
            );
            return yield this.client.call(
              "put",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        createOAuth2Session(e, a, t, i) {
          if (void 0 === e)
            throw new r('Missing required parameter: "provider"');
          let p = "/account/sessions/oauth2/{provider}".replace(
              "{provider}",
              e,
            ),
            o = {};
          void 0 !== a && (o.success = a),
            void 0 !== t && (o.failure = t),
            void 0 !== i && (o.scopes = i);
          let s = new URL(this.client.config.endpoint + p);
          for (let [e, a] of ((o.project = this.client.config.project),
          Object.entries(n.flatten(o))))
            s.searchParams.append(e, a);
          return s;
        }
        createPhoneSession(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "phone"');
            let t = {};
            void 0 !== e && (t.userId = e), void 0 !== a && (t.phone = a);
            let i = new URL(
              this.client.config.endpoint + "/account/sessions/phone",
            );
            return yield this.client.call(
              "post",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        updatePhoneSession(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "secret"');
            let t = {};
            void 0 !== e && (t.userId = e), void 0 !== a && (t.secret = a);
            let i = new URL(
              this.client.config.endpoint + "/account/sessions/phone",
            );
            return yield this.client.call(
              "put",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        getSession(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "sessionId"');
            let a = "/account/sessions/{sessionId}".replace("{sessionId}", e),
              t = new URL(this.client.config.endpoint + a);
            return yield this.client.call(
              "get",
              t,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        updateSession(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "sessionId"');
            let a = "/account/sessions/{sessionId}".replace("{sessionId}", e),
              t = new URL(this.client.config.endpoint + a);
            return yield this.client.call(
              "patch",
              t,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        deleteSession(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "sessionId"');
            let a = "/account/sessions/{sessionId}".replace("{sessionId}", e),
              t = new URL(this.client.config.endpoint + a);
            return yield this.client.call(
              "delete",
              t,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        updateStatus() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(this.client.config.endpoint + "/account/status");
            return yield this.client.call(
              "patch",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        createVerification(e) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e) throw new r('Missing required parameter: "url"');
            let a = {};
            void 0 !== e && (a.url = e);
            let t = new URL(
              this.client.config.endpoint + "/account/verification",
            );
            return yield this.client.call(
              "post",
              t,
              { "content-type": "application/json" },
              a,
            );
          });
        }
        updateVerification(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "secret"');
            let t = {};
            void 0 !== e && (t.userId = e), void 0 !== a && (t.secret = a);
            let i = new URL(
              this.client.config.endpoint + "/account/verification",
            );
            return yield this.client.call(
              "put",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
        createPhoneVerification() {
          return p(this, void 0, void 0, function* () {
            let e = new URL(
              this.client.config.endpoint + "/account/verification/phone",
            );
            return yield this.client.call(
              "post",
              e,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        updatePhoneVerification(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "userId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "secret"');
            let t = {};
            void 0 !== e && (t.userId = e), void 0 !== a && (t.secret = a);
            let i = new URL(
              this.client.config.endpoint + "/account/verification/phone",
            );
            return yield this.client.call(
              "put",
              i,
              { "content-type": "application/json" },
              t,
            );
          });
        }
      }
      class l extends n {
        constructor(e) {
          super(e);
        }
        listDocuments(e, a, t) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "databaseId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "collectionId"');
            let i =
                "/databases/{databaseId}/collections/{collectionId}/documents"
                  .replace("{databaseId}", e)
                  .replace("{collectionId}", a),
              p = {};
            void 0 !== t && (p.queries = t);
            let n = new URL(this.client.config.endpoint + i);
            return yield this.client.call(
              "get",
              n,
              { "content-type": "application/json" },
              p,
            );
          });
        }
        createDocument(e, a, t, i, n) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "databaseId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "collectionId"');
            if (void 0 === t)
              throw new r('Missing required parameter: "documentId"');
            if (void 0 === i) throw new r('Missing required parameter: "data"');
            let p =
                "/databases/{databaseId}/collections/{collectionId}/documents"
                  .replace("{databaseId}", e)
                  .replace("{collectionId}", a),
              o = {};
            void 0 !== t && (o.documentId = t),
              void 0 !== i && (o.data = i),
              void 0 !== n && (o.permissions = n);
            let s = new URL(this.client.config.endpoint + p);
            return yield this.client.call(
              "post",
              s,
              { "content-type": "application/json" },
              o,
            );
          });
        }
        getDocument(e, a, t, i) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "databaseId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "collectionId"');
            if (void 0 === t)
              throw new r('Missing required parameter: "documentId"');
            let p =
                "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}"
                  .replace("{databaseId}", e)
                  .replace("{collectionId}", a)
                  .replace("{documentId}", t),
              n = {};
            void 0 !== i && (n.queries = i);
            let o = new URL(this.client.config.endpoint + p);
            return yield this.client.call(
              "get",
              o,
              { "content-type": "application/json" },
              n,
            );
          });
        }
        updateDocument(e, a, t, i, n) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "databaseId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "collectionId"');
            if (void 0 === t)
              throw new r('Missing required parameter: "documentId"');
            let p =
                "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}"
                  .replace("{databaseId}", e)
                  .replace("{collectionId}", a)
                  .replace("{documentId}", t),
              o = {};
            void 0 !== i && (o.data = i), void 0 !== n && (o.permissions = n);
            let s = new URL(this.client.config.endpoint + p);
            return yield this.client.call(
              "patch",
              s,
              { "content-type": "application/json" },
              o,
            );
          });
        }
        deleteDocument(e, a, t) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "databaseId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "collectionId"');
            if (void 0 === t)
              throw new r('Missing required parameter: "documentId"');
            let i =
                "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}"
                  .replace("{databaseId}", e)
                  .replace("{collectionId}", a)
                  .replace("{documentId}", t),
              p = new URL(this.client.config.endpoint + i);
            return yield this.client.call(
              "delete",
              p,
              { "content-type": "application/json" },
              {},
            );
          });
        }
      }
      class Storage extends n {
        constructor(e) {
          super(e);
        }
        listFiles(e, a, t) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "bucketId"');
            let i = "/storage/buckets/{bucketId}/files".replace(
                "{bucketId}",
                e,
              ),
              p = {};
            void 0 !== a && (p.queries = a), void 0 !== t && (p.search = t);
            let n = new URL(this.client.config.endpoint + i);
            return yield this.client.call(
              "get",
              n,
              { "content-type": "application/json" },
              p,
            );
          });
        }
        createFile(e, a, t, i, o = (e) => {}) {
          return p(this, void 0, void 0, function* () {
            let p;
            if (void 0 === e)
              throw new r('Missing required parameter: "bucketId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "fileId"');
            if (void 0 === t) throw new r('Missing required parameter: "file"');
            let s = "/storage/buckets/{bucketId}/files".replace(
                "{bucketId}",
                e,
              ),
              d = {};
            void 0 !== a && (d.fileId = a),
              void 0 !== t && (d.file = t),
              void 0 !== i && (d.permissions = i);
            let l = new URL(this.client.config.endpoint + s);
            if (!(t instanceof File))
              throw new r('Parameter "file" has to be a File.');
            let c = t.size;
            if (c <= n.CHUNK_SIZE)
              return yield this.client.call(
                "post",
                l,
                { "content-type": "multipart/form-data" },
                d,
              );
            let u = { "content-type": "multipart/form-data" },
              m = 0;
            if ("unique()" != a)
              try {
                m =
                  (p = yield this.client.call(
                    "GET",
                    new URL(this.client.config.endpoint + s + "/" + a),
                    u,
                  )).chunksUploaded * n.CHUNK_SIZE;
              } catch (e) {}
            for (; m < c; ) {
              let e = Math.min(m + n.CHUNK_SIZE - 1, c - 1);
              (u["content-range"] = "bytes " + m + "-" + e + "/" + c),
                p && p.$id && (u["x-appwrite-id"] = p.$id);
              let a = t.slice(m, e + 1);
              (d.file = new File([a], t.name)),
                (p = yield this.client.call("post", l, u, d)),
                o &&
                  o({
                    $id: p.$id,
                    progress: (m / c) * 100,
                    sizeUploaded: m,
                    chunksTotal: p.chunksTotal,
                    chunksUploaded: p.chunksUploaded,
                  }),
                (m += n.CHUNK_SIZE);
            }
            return p;
          });
        }
        getFile(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "bucketId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "fileId"');
            let t = "/storage/buckets/{bucketId}/files/{fileId}"
                .replace("{bucketId}", e)
                .replace("{fileId}", a),
              i = new URL(this.client.config.endpoint + t);
            return yield this.client.call(
              "get",
              i,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        updateFile(e, a, t, i) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "bucketId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "fileId"');
            let p = "/storage/buckets/{bucketId}/files/{fileId}"
                .replace("{bucketId}", e)
                .replace("{fileId}", a),
              n = {};
            void 0 !== t && (n.name = t), void 0 !== i && (n.permissions = i);
            let o = new URL(this.client.config.endpoint + p);
            return yield this.client.call(
              "put",
              o,
              { "content-type": "application/json" },
              n,
            );
          });
        }
        deleteFile(e, a) {
          return p(this, void 0, void 0, function* () {
            if (void 0 === e)
              throw new r('Missing required parameter: "bucketId"');
            if (void 0 === a)
              throw new r('Missing required parameter: "fileId"');
            let t = "/storage/buckets/{bucketId}/files/{fileId}"
                .replace("{bucketId}", e)
                .replace("{fileId}", a),
              i = new URL(this.client.config.endpoint + t);
            return yield this.client.call(
              "delete",
              i,
              { "content-type": "application/json" },
              {},
            );
          });
        }
        getFileDownload(e, a) {
          if (void 0 === e)
            throw new r('Missing required parameter: "bucketId"');
          if (void 0 === a) throw new r('Missing required parameter: "fileId"');
          let t = "/storage/buckets/{bucketId}/files/{fileId}/download"
              .replace("{bucketId}", e)
              .replace("{fileId}", a),
            i = {},
            p = new URL(this.client.config.endpoint + t);
          for (let [e, a] of ((i.project = this.client.config.project),
          Object.entries(n.flatten(i))))
            p.searchParams.append(e, a);
          return p;
        }
        getFilePreview(e, a, t, i, p, o, s, d, l, c, u, m, f) {
          if (void 0 === e)
            throw new r('Missing required parameter: "bucketId"');
          if (void 0 === a) throw new r('Missing required parameter: "fileId"');
          let v = "/storage/buckets/{bucketId}/files/{fileId}/preview"
              .replace("{bucketId}", e)
              .replace("{fileId}", a),
            h = {};
          void 0 !== t && (h.width = t),
            void 0 !== i && (h.height = i),
            void 0 !== p && (h.gravity = p),
            void 0 !== o && (h.quality = o),
            void 0 !== s && (h.borderWidth = s),
            void 0 !== d && (h.borderColor = d),
            void 0 !== l && (h.borderRadius = l),
            void 0 !== c && (h.opacity = c),
            void 0 !== u && (h.rotation = u),
            void 0 !== m && (h.background = m),
            void 0 !== f && (h.output = f);
          let g = new URL(this.client.config.endpoint + v);
          for (let [e, a] of ((h.project = this.client.config.project),
          Object.entries(n.flatten(h))))
            g.searchParams.append(e, a);
          return g;
        }
        getFileView(e, a) {
          if (void 0 === e)
            throw new r('Missing required parameter: "bucketId"');
          if (void 0 === a) throw new r('Missing required parameter: "fileId"');
          let t = "/storage/buckets/{bucketId}/files/{fileId}/view"
              .replace("{bucketId}", e)
              .replace("{fileId}", a),
            i = {},
            p = new URL(this.client.config.endpoint + t);
          for (let [e, a] of ((i.project = this.client.config.project),
          Object.entries(n.flatten(i))))
            p.searchParams.append(e, a);
          return p;
        }
      }
      class c {}
      (c.read = (e) => `read("${e}")`),
        (c.write = (e) => `write("${e}")`),
        (c.create = (e) => `create("${e}")`),
        (c.update = (e) => `update("${e}")`),
        (c.delete = (e) => `delete("${e}")`);
      class u {
        static any() {
          return "any";
        }
        static user(e, a = "") {
          return "" === a ? `user:${e}` : `user:${e}/${a}`;
        }
        static users(e = "") {
          return "" === e ? "users" : `users/${e}`;
        }
        static guests() {
          return "guests";
        }
        static team(e, a = "") {
          return "" === a ? `team:${e}` : `team:${e}/${a}`;
        }
        static member(e) {
          return `member:${e}`;
        }
        static label(e) {
          return `label:${e}`;
        }
      }
      class m {
        static custom(e) {
          return e;
        }
        static unique() {
          return "unique()";
        }
      }
    },
    3847: (e, a, t) => {
      t.d(a, { Z: () => ag });
      var i,
        p,
        n,
        o = {};
      function r(e, a) {
        return function () {
          return e.apply(a, arguments);
        };
      }
      t.r(o),
        t.d(o, {
          hasBrowserEnv: () => ep,
          hasStandardBrowserEnv: () => en,
          hasStandardBrowserWebWorkerEnv: () => eo,
        });
      let { toString: s } = Object.prototype,
        { getPrototypeOf: d } = Object,
        l =
          ((i = Object.create(null)),
          (e) => {
            let a = s.call(e);
            return i[a] || (i[a] = a.slice(8, -1).toLowerCase());
          }),
        c = (e) => ((e = e.toLowerCase()), (a) => l(a) === e),
        u = (e) => (a) => typeof a === e,
        { isArray: m } = Array,
        f = u("undefined"),
        v = c("ArrayBuffer"),
        h = u("string"),
        g = u("function"),
        b = u("number"),
        x = (e) => null !== e && "object" == typeof e,
        _ = (e) => {
          if ("object" !== l(e)) return !1;
          let a = d(e);
          return (
            (null === a ||
              a === Object.prototype ||
              null === Object.getPrototypeOf(a)) &&
            !(Symbol.toStringTag in e) &&
            !(Symbol.iterator in e)
          );
        },
        y = c("Date"),
        w = c("File"),
        S = c("Blob"),
        E = c("FileList"),
        T = c("URLSearchParams");
      function N(e, a, { allOwnKeys: t = !1 } = {}) {
        let i, p;
        if (null != e) {
          if (("object" != typeof e && (e = [e]), m(e)))
            for (i = 0, p = e.length; i < p; i++) a.call(null, e[i], i, e);
          else {
            let p;
            let n = t ? Object.getOwnPropertyNames(e) : Object.keys(e),
              o = n.length;
            for (i = 0; i < o; i++) (p = n[i]), a.call(null, e[p], p, e);
          }
        }
      }
      function R(e, a) {
        let t;
        a = a.toLowerCase();
        let i = Object.keys(e),
          p = i.length;
        for (; p-- > 0; ) if (a === (t = i[p]).toLowerCase()) return t;
        return null;
      }
      let O =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : global,
        P = (e) => !f(e) && e !== O,
        j =
          ((p = "undefined" != typeof Uint8Array && d(Uint8Array)),
          (e) => p && e instanceof p),
        D = c("HTMLFormElement"),
        A = (
          ({ hasOwnProperty: e }) =>
          (a, t) =>
            e.call(a, t)
        )(Object.prototype),
        C = c("RegExp"),
        M = (e, a) => {
          let t = Object.getOwnPropertyDescriptors(e),
            i = {};
          N(t, (t, p) => {
            let n;
            !1 !== (n = a(t, p, e)) && (i[p] = n || t);
          }),
            Object.defineProperties(e, i);
        },
        I = "abcdefghijklmnopqrstuvwxyz",
        k = "0123456789",
        V = { DIGIT: k, ALPHA: I, ALPHA_DIGIT: I + I.toUpperCase() + k },
        L = c("AsyncFunction"),
        U = {
          isArray: m,
          isArrayBuffer: v,
          isBuffer: function (e) {
            return (
              null !== e &&
              !f(e) &&
              null !== e.constructor &&
              !f(e.constructor) &&
              g(e.constructor.isBuffer) &&
              e.constructor.isBuffer(e)
            );
          },
          isFormData: (e) => {
            let a;
            return (
              e &&
              (("function" == typeof FormData && e instanceof FormData) ||
                (g(e.append) &&
                  ("formdata" === (a = l(e)) ||
                    ("object" === a &&
                      g(e.toString) &&
                      "[object FormData]" === e.toString()))))
            );
          },
          isArrayBufferView: function (e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(e)
              : e && e.buffer && v(e.buffer);
          },
          isString: h,
          isNumber: b,
          isBoolean: (e) => !0 === e || !1 === e,
          isObject: x,
          isPlainObject: _,
          isUndefined: f,
          isDate: y,
          isFile: w,
          isBlob: S,
          isRegExp: C,
          isFunction: g,
          isStream: (e) => x(e) && g(e.pipe),
          isURLSearchParams: T,
          isTypedArray: j,
          isFileList: E,
          forEach: N,
          merge: function e() {
            let { caseless: a } = (P(this) && this) || {},
              t = {},
              i = (i, p) => {
                let n = (a && R(t, p)) || p;
                _(t[n]) && _(i)
                  ? (t[n] = e(t[n], i))
                  : _(i)
                    ? (t[n] = e({}, i))
                    : m(i)
                      ? (t[n] = i.slice())
                      : (t[n] = i);
              };
            for (let e = 0, a = arguments.length; e < a; e++)
              arguments[e] && N(arguments[e], i);
            return t;
          },
          extend: (e, a, t, { allOwnKeys: i } = {}) => (
            N(
              a,
              (a, i) => {
                t && g(a) ? (e[i] = r(a, t)) : (e[i] = a);
              },
              { allOwnKeys: i },
            ),
            e
          ),
          trim: (e) =>
            e.trim
              ? e.trim()
              : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
          stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
          inherits: (e, a, t, i) => {
            (e.prototype = Object.create(a.prototype, i)),
              (e.prototype.constructor = e),
              Object.defineProperty(e, "super", { value: a.prototype }),
              t && Object.assign(e.prototype, t);
          },
          toFlatObject: (e, a, t, i) => {
            let p, n, o;
            let r = {};
            if (((a = a || {}), null == e)) return a;
            do {
              for (n = (p = Object.getOwnPropertyNames(e)).length; n-- > 0; )
                (o = p[n]),
                  (!i || i(o, e, a)) && !r[o] && ((a[o] = e[o]), (r[o] = !0));
              e = !1 !== t && d(e);
            } while (e && (!t || t(e, a)) && e !== Object.prototype);
            return a;
          },
          kindOf: l,
          kindOfTest: c,
          endsWith: (e, a, t) => {
            (e = String(e)),
              (void 0 === t || t > e.length) && (t = e.length),
              (t -= a.length);
            let i = e.indexOf(a, t);
            return -1 !== i && i === t;
          },
          toArray: (e) => {
            if (!e) return null;
            if (m(e)) return e;
            let a = e.length;
            if (!b(a)) return null;
            let t = Array(a);
            for (; a-- > 0; ) t[a] = e[a];
            return t;
          },
          forEachEntry: (e, a) => {
            let t;
            let i = e && e[Symbol.iterator],
              p = i.call(e);
            for (; (t = p.next()) && !t.done; ) {
              let i = t.value;
              a.call(e, i[0], i[1]);
            }
          },
          matchAll: (e, a) => {
            let t;
            let i = [];
            for (; null !== (t = e.exec(a)); ) i.push(t);
            return i;
          },
          isHTMLForm: D,
          hasOwnProperty: A,
          hasOwnProp: A,
          reduceDescriptors: M,
          freezeMethods: (e) => {
            M(e, (a, t) => {
              if (g(e) && -1 !== ["arguments", "caller", "callee"].indexOf(t))
                return !1;
              let i = e[t];
              if (g(i)) {
                if (((a.enumerable = !1), "writable" in a)) {
                  a.writable = !1;
                  return;
                }
                a.set ||
                  (a.set = () => {
                    throw Error("Can not rewrite read-only method '" + t + "'");
                  });
              }
            });
          },
          toObjectSet: (e, a) => {
            let t = {};
            return (
              ((e) => {
                e.forEach((e) => {
                  t[e] = !0;
                });
              })(m(e) ? e : String(e).split(a)),
              t
            );
          },
          toCamelCase: (e) =>
            e
              .toLowerCase()
              .replace(/[-_\s]([a-z\d])(\w*)/g, function (e, a, t) {
                return a.toUpperCase() + t;
              }),
          noop: () => {},
          toFiniteNumber: (e, a) => (Number.isFinite((e = +e)) ? e : a),
          findKey: R,
          global: O,
          isContextDefined: P,
          ALPHABET: V,
          generateString: (e = 16, a = V.ALPHA_DIGIT) => {
            let t = "",
              { length: i } = a;
            for (; e--; ) t += a[(Math.random() * i) | 0];
            return t;
          },
          isSpecCompliantForm: function (e) {
            return !!(
              e &&
              g(e.append) &&
              "FormData" === e[Symbol.toStringTag] &&
              e[Symbol.iterator]
            );
          },
          toJSONObject: (e) => {
            let a = Array(10),
              t = (e, i) => {
                if (x(e)) {
                  if (a.indexOf(e) >= 0) return;
                  if (!("toJSON" in e)) {
                    a[i] = e;
                    let p = m(e) ? [] : {};
                    return (
                      N(e, (e, a) => {
                        let n = t(e, i + 1);
                        f(n) || (p[a] = n);
                      }),
                      (a[i] = void 0),
                      p
                    );
                  }
                }
                return e;
              };
            return t(e, 0);
          },
          isAsyncFn: L,
          isThenable: (e) => e && (x(e) || g(e)) && g(e.then) && g(e.catch),
        };
      function B(e, a, t, i, p) {
        Error.call(this),
          Error.captureStackTrace
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = Error().stack),
          (this.message = e),
          (this.name = "AxiosError"),
          a && (this.code = a),
          t && (this.config = t),
          i && (this.request = i),
          p && (this.response = p);
      }
      U.inherits(B, Error, {
        toJSON: function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: U.toJSONObject(this.config),
            code: this.code,
            status:
              this.response && this.response.status
                ? this.response.status
                : null,
          };
        },
      });
      let F = B.prototype,
        q = {};
      [
        "ERR_BAD_OPTION_VALUE",
        "ERR_BAD_OPTION",
        "ECONNABORTED",
        "ETIMEDOUT",
        "ERR_NETWORK",
        "ERR_FR_TOO_MANY_REDIRECTS",
        "ERR_DEPRECATED",
        "ERR_BAD_RESPONSE",
        "ERR_BAD_REQUEST",
        "ERR_CANCELED",
        "ERR_NOT_SUPPORT",
        "ERR_INVALID_URL",
      ].forEach((e) => {
        q[e] = { value: e };
      }),
        Object.defineProperties(B, q),
        Object.defineProperty(F, "isAxiosError", { value: !0 }),
        (B.from = (e, a, t, i, p, n) => {
          let o = Object.create(F);
          return (
            U.toFlatObject(
              e,
              o,
              function (e) {
                return e !== Error.prototype;
              },
              (e) => "isAxiosError" !== e,
            ),
            B.call(o, e.message, a, t, i, p),
            (o.cause = e),
            (o.name = e.name),
            n && Object.assign(o, n),
            o
          );
        });
      var z = t(4080);
      function H(e) {
        return U.isPlainObject(e) || U.isArray(e);
      }
      function G(e) {
        return U.endsWith(e, "[]") ? e.slice(0, -2) : e;
      }
      function $(e, a, t) {
        return e
          ? e
              .concat(a)
              .map(function (e, a) {
                return (e = G(e)), !t && a ? "[" + e + "]" : e;
              })
              .join(t ? "." : "")
          : a;
      }
      let W = U.toFlatObject(U, {}, null, function (e) {
          return /^is[A-Z]/.test(e);
        }),
        K = function (e, a, t) {
          if (!U.isObject(e)) throw TypeError("target must be an object");
          (a = a || new (z || FormData)()),
            (t = U.toFlatObject(
              t,
              { metaTokens: !0, dots: !1, indexes: !1 },
              !1,
              function (e, a) {
                return !U.isUndefined(a[e]);
              },
            ));
          let i = t.metaTokens,
            p = t.visitor || l,
            n = t.dots,
            o = t.indexes,
            r = t.Blob || ("undefined" != typeof Blob && Blob),
            s = r && U.isSpecCompliantForm(a);
          if (!U.isFunction(p)) throw TypeError("visitor must be a function");
          function d(e) {
            if (null === e) return "";
            if (U.isDate(e)) return e.toISOString();
            if (!s && U.isBlob(e))
              throw new B("Blob is not supported. Use a Buffer instead.");
            return U.isArrayBuffer(e) || U.isTypedArray(e)
              ? s && "function" == typeof Blob
                ? new Blob([e])
                : Buffer.from(e)
              : e;
          }
          function l(e, t, p) {
            let r = e;
            if (e && !p && "object" == typeof e) {
              if (U.endsWith(t, "{}"))
                (t = i ? t : t.slice(0, -2)), (e = JSON.stringify(e));
              else {
                var s;
                if (
                  (U.isArray(e) && ((s = e), U.isArray(s) && !s.some(H))) ||
                  ((U.isFileList(e) || U.endsWith(t, "[]")) &&
                    (r = U.toArray(e)))
                )
                  return (
                    (t = G(t)),
                    r.forEach(function (e, i) {
                      U.isUndefined(e) ||
                        null === e ||
                        a.append(
                          !0 === o ? $([t], i, n) : null === o ? t : t + "[]",
                          d(e),
                        );
                    }),
                    !1
                  );
              }
            }
            return !!H(e) || (a.append($(p, t, n), d(e)), !1);
          }
          let c = [],
            u = Object.assign(W, {
              defaultVisitor: l,
              convertValue: d,
              isVisitable: H,
            });
          if (!U.isObject(e)) throw TypeError("data must be an object");
          return (
            (function e(t, i) {
              if (!U.isUndefined(t)) {
                if (-1 !== c.indexOf(t))
                  throw Error("Circular reference detected in " + i.join("."));
                c.push(t),
                  U.forEach(t, function (t, n) {
                    let o =
                      !(U.isUndefined(t) || null === t) &&
                      p.call(a, t, U.isString(n) ? n.trim() : n, i, u);
                    !0 === o && e(t, i ? i.concat(n) : [n]);
                  }),
                  c.pop();
              }
            })(e),
            a
          );
        };
      function X(e) {
        let a = {
          "!": "%21",
          "'": "%27",
          "(": "%28",
          ")": "%29",
          "~": "%7E",
          "%20": "+",
          "%00": "\x00",
        };
        return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
          return a[e];
        });
      }
      function Y(e, a) {
        (this._pairs = []), e && K(e, this, a);
      }
      let J = Y.prototype;
      function Q(e) {
        return encodeURIComponent(e)
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%20/g, "+")
          .replace(/%5B/gi, "[")
          .replace(/%5D/gi, "]");
      }
      function Z(e, a, t) {
        let i;
        if (!a) return e;
        let p = (t && t.encode) || Q,
          n = t && t.serialize;
        if (
          (i = n
            ? n(a, t)
            : U.isURLSearchParams(a)
              ? a.toString()
              : new Y(a, t).toString(p))
        ) {
          let a = e.indexOf("#");
          -1 !== a && (e = e.slice(0, a)),
            (e += (-1 === e.indexOf("?") ? "?" : "&") + i);
        }
        return e;
      }
      (J.append = function (e, a) {
        this._pairs.push([e, a]);
      }),
        (J.toString = function (e) {
          let a = e
            ? function (a) {
                return e.call(this, a, X);
              }
            : X;
          return this._pairs
            .map(function (e) {
              return a(e[0]) + "=" + a(e[1]);
            }, "")
            .join("&");
        });
      class ee {
        constructor() {
          this.handlers = [];
        }
        use(e, a, t) {
          return (
            this.handlers.push({
              fulfilled: e,
              rejected: a,
              synchronous: !!t && t.synchronous,
              runWhen: t ? t.runWhen : null,
            }),
            this.handlers.length - 1
          );
        }
        eject(e) {
          this.handlers[e] && (this.handlers[e] = null);
        }
        clear() {
          this.handlers && (this.handlers = []);
        }
        forEach(e) {
          U.forEach(this.handlers, function (a) {
            null !== a && e(a);
          });
        }
      }
      let ea = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1,
      };
      var et = t(7310);
      let URLSearchParams = et.URLSearchParams,
        ei = {
          isNode: !0,
          classes: {
            URLSearchParams: URLSearchParams,
            FormData: z,
            Blob: ("undefined" != typeof Blob && Blob) || null,
          },
          protocols: ["http", "https", "file", "data"],
        },
        ep = !1,
        en =
          ((n = "undefined" != typeof navigator && navigator.product),
          ep && 0 > ["ReactNative", "NativeScript", "NS"].indexOf(n)),
        eo =
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          "function" == typeof self.importScripts,
        er = { ...o, ...ei },
        es = function (e) {
          if (U.isFormData(e) && U.isFunction(e.entries)) {
            let a = {};
            return (
              U.forEachEntry(e, (e, t) => {
                !(function e(a, t, i, p) {
                  let n = a[p++],
                    o = Number.isFinite(+n),
                    r = p >= a.length;
                  if (((n = !n && U.isArray(i) ? i.length : n), r))
                    return (
                      U.hasOwnProp(i, n) ? (i[n] = [i[n], t]) : (i[n] = t), !o
                    );
                  (i[n] && U.isObject(i[n])) || (i[n] = []);
                  let s = e(a, t, i[n], p);
                  return (
                    s &&
                      U.isArray(i[n]) &&
                      (i[n] = (function (e) {
                        let a, t;
                        let i = {},
                          p = Object.keys(e),
                          n = p.length;
                        for (a = 0; a < n; a++) i[(t = p[a])] = e[t];
                        return i;
                      })(i[n])),
                    !o
                  );
                })(
                  U.matchAll(/\w+|\[(\w*)]/g, e).map((e) =>
                    "[]" === e[0] ? "" : e[1] || e[0],
                  ),
                  t,
                  a,
                  0,
                );
              }),
              a
            );
          }
          return null;
        },
        ed = {
          transitional: ea,
          adapter: ["xhr", "http"],
          transformRequest: [
            function (e, a) {
              let t;
              let i = a.getContentType() || "",
                p = i.indexOf("application/json") > -1,
                n = U.isObject(e);
              n && U.isHTMLForm(e) && (e = new FormData(e));
              let o = U.isFormData(e);
              if (o) return p && p ? JSON.stringify(es(e)) : e;
              if (
                U.isArrayBuffer(e) ||
                U.isBuffer(e) ||
                U.isStream(e) ||
                U.isFile(e) ||
                U.isBlob(e)
              )
                return e;
              if (U.isArrayBufferView(e)) return e.buffer;
              if (U.isURLSearchParams(e))
                return (
                  a.setContentType(
                    "application/x-www-form-urlencoded;charset=utf-8",
                    !1,
                  ),
                  e.toString()
                );
              if (n) {
                if (i.indexOf("application/x-www-form-urlencoded") > -1) {
                  var r, s;
                  return ((r = e),
                  (s = this.formSerializer),
                  K(
                    r,
                    new er.classes.URLSearchParams(),
                    Object.assign(
                      {
                        visitor: function (e, a, t, i) {
                          return er.isNode && U.isBuffer(e)
                            ? (this.append(a, e.toString("base64")), !1)
                            : i.defaultVisitor.apply(this, arguments);
                        },
                      },
                      s,
                    ),
                  )).toString();
                }
                if (
                  (t = U.isFileList(e)) ||
                  i.indexOf("multipart/form-data") > -1
                ) {
                  let a = this.env && this.env.FormData;
                  return K(
                    t ? { "files[]": e } : e,
                    a && new a(),
                    this.formSerializer,
                  );
                }
              }
              return n || p
                ? (a.setContentType("application/json", !1),
                  (function (e, a, t) {
                    if (U.isString(e))
                      try {
                        return (0, JSON.parse)(e), U.trim(e);
                      } catch (e) {
                        if ("SyntaxError" !== e.name) throw e;
                      }
                    return (0, JSON.stringify)(e);
                  })(e))
                : e;
            },
          ],
          transformResponse: [
            function (e) {
              let a = this.transitional || ed.transitional,
                t = a && a.forcedJSONParsing,
                i = "json" === this.responseType;
              if (e && U.isString(e) && ((t && !this.responseType) || i)) {
                let t = a && a.silentJSONParsing;
                try {
                  return JSON.parse(e);
                } catch (e) {
                  if (!t && i) {
                    if ("SyntaxError" === e.name)
                      throw B.from(
                        e,
                        B.ERR_BAD_RESPONSE,
                        this,
                        null,
                        this.response,
                      );
                    throw e;
                  }
                }
              }
              return e;
            },
          ],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          env: { FormData: er.classes.FormData, Blob: er.classes.Blob },
          validateStatus: function (e) {
            return e >= 200 && e < 300;
          },
          headers: {
            common: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": void 0,
            },
          },
        };
      U.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
        ed.headers[e] = {};
      });
      let el = U.toObjectSet([
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent",
        ]),
        ec = (e) => {
          let a, t, i;
          let p = {};
          return (
            e &&
              e.split("\n").forEach(function (e) {
                (i = e.indexOf(":")),
                  (a = e.substring(0, i).trim().toLowerCase()),
                  (t = e.substring(i + 1).trim()),
                  !a ||
                    (p[a] && el[a]) ||
                    ("set-cookie" === a
                      ? p[a]
                        ? p[a].push(t)
                        : (p[a] = [t])
                      : (p[a] = p[a] ? p[a] + ", " + t : t));
              }),
            p
          );
        },
        eu = Symbol("internals");
      function em(e) {
        return e && String(e).trim().toLowerCase();
      }
      function ef(e) {
        return !1 === e || null == e ? e : U.isArray(e) ? e.map(ef) : String(e);
      }
      let ev = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
      function eh(e, a, t, i, p) {
        if (U.isFunction(i)) return i.call(this, a, t);
        if ((p && (a = t), U.isString(a))) {
          if (U.isString(i)) return -1 !== a.indexOf(i);
          if (U.isRegExp(i)) return i.test(a);
        }
      }
      class eg {
        constructor(e) {
          e && this.set(e);
        }
        set(e, a, t) {
          let i = this;
          function p(e, a, t) {
            let p = em(a);
            if (!p) throw Error("header name must be a non-empty string");
            let n = U.findKey(i, p);
            (n &&
              void 0 !== i[n] &&
              !0 !== t &&
              (void 0 !== t || !1 === i[n])) ||
              (i[n || a] = ef(e));
          }
          let n = (e, a) => U.forEach(e, (e, t) => p(e, t, a));
          return (
            U.isPlainObject(e) || e instanceof this.constructor
              ? n(e, a)
              : U.isString(e) && (e = e.trim()) && !ev(e)
                ? n(ec(e), a)
                : null != e && p(a, e, t),
            this
          );
        }
        get(e, a) {
          if ((e = em(e))) {
            let t = U.findKey(this, e);
            if (t) {
              let e = this[t];
              if (!a) return e;
              if (!0 === a)
                return (function (e) {
                  let a;
                  let t = Object.create(null),
                    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                  for (; (a = i.exec(e)); ) t[a[1]] = a[2];
                  return t;
                })(e);
              if (U.isFunction(a)) return a.call(this, e, t);
              if (U.isRegExp(a)) return a.exec(e);
              throw TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(e, a) {
          if ((e = em(e))) {
            let t = U.findKey(this, e);
            return !!(
              t &&
              void 0 !== this[t] &&
              (!a || eh(this, this[t], t, a))
            );
          }
          return !1;
        }
        delete(e, a) {
          let t = this,
            i = !1;
          function p(e) {
            if ((e = em(e))) {
              let p = U.findKey(t, e);
              p && (!a || eh(t, t[p], p, a)) && (delete t[p], (i = !0));
            }
          }
          return U.isArray(e) ? e.forEach(p) : p(e), i;
        }
        clear(e) {
          let a = Object.keys(this),
            t = a.length,
            i = !1;
          for (; t--; ) {
            let p = a[t];
            (!e || eh(this, this[p], p, e, !0)) && (delete this[p], (i = !0));
          }
          return i;
        }
        normalize(e) {
          let a = this,
            t = {};
          return (
            U.forEach(this, (i, p) => {
              let n = U.findKey(t, p);
              if (n) {
                (a[n] = ef(i)), delete a[p];
                return;
              }
              let o = e
                ? p
                    .trim()
                    .toLowerCase()
                    .replace(
                      /([a-z\d])(\w*)/g,
                      (e, a, t) => a.toUpperCase() + t,
                    )
                : String(p).trim();
              o !== p && delete a[p], (a[o] = ef(i)), (t[o] = !0);
            }),
            this
          );
        }
        concat(...e) {
          return this.constructor.concat(this, ...e);
        }
        toJSON(e) {
          let a = Object.create(null);
          return (
            U.forEach(this, (t, i) => {
              null != t &&
                !1 !== t &&
                (a[i] = e && U.isArray(t) ? t.join(", ") : t);
            }),
            a
          );
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON())
            .map(([e, a]) => e + ": " + a)
            .join("\n");
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(e) {
          return e instanceof this ? e : new this(e);
        }
        static concat(e, ...a) {
          let t = new this(e);
          return a.forEach((e) => t.set(e)), t;
        }
        static accessor(e) {
          let a = (this[eu] = this[eu] = { accessors: {} }),
            t = a.accessors,
            i = this.prototype;
          function p(e) {
            let a = em(e);
            t[a] ||
              ((function (e, a) {
                let t = U.toCamelCase(" " + a);
                ["get", "set", "has"].forEach((i) => {
                  Object.defineProperty(e, i + t, {
                    value: function (e, t, p) {
                      return this[i].call(this, a, e, t, p);
                    },
                    configurable: !0,
                  });
                });
              })(i, e),
              (t[a] = !0));
          }
          return U.isArray(e) ? e.forEach(p) : p(e), this;
        }
      }
      function eb(e, a) {
        let t = this || ed,
          i = a || t,
          p = eg.from(i.headers),
          n = i.data;
        return (
          U.forEach(e, function (e) {
            n = e.call(t, n, p.normalize(), a ? a.status : void 0);
          }),
          p.normalize(),
          n
        );
      }
      function ex(e) {
        return !!(e && e.__CANCEL__);
      }
      function e_(e, a, t) {
        B.call(this, null == e ? "canceled" : e, B.ERR_CANCELED, a, t),
          (this.name = "CanceledError");
      }
      function ey(e, a, t) {
        let i = t.config.validateStatus;
        !t.status || !i || i(t.status)
          ? e(t)
          : a(
              new B(
                "Request failed with status code " + t.status,
                [B.ERR_BAD_REQUEST, B.ERR_BAD_RESPONSE][
                  Math.floor(t.status / 100) - 4
                ],
                t.config,
                t.request,
                t,
              ),
            );
      }
      function ew(e, a) {
        return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(a)
          ? a
            ? e.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, "")
            : e
          : a;
      }
      eg.accessor([
        "Content-Type",
        "Content-Length",
        "Accept",
        "Accept-Encoding",
        "User-Agent",
        "Authorization",
      ]),
        U.reduceDescriptors(eg.prototype, ({ value: e }, a) => {
          let t = a[0].toUpperCase() + a.slice(1);
          return {
            get: () => e,
            set(e) {
              this[t] = e;
            },
          };
        }),
        U.freezeMethods(eg),
        U.inherits(e_, B, { __CANCEL__: !0 });
      var eS = t(3632),
        eE = t(3685),
        eT = t(5687),
        eN = t(3837),
        eR = t(1540),
        eO = t(9796);
      let eP = "1.6.1";
      function ej(e) {
        let a = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
        return (a && a[1]) || "";
      }
      let eD = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
      var eA = t(2781);
      let eC = function (e, a) {
          let t = 0,
            i = 1e3 / a,
            p = null;
          return function (a, n) {
            let o = Date.now();
            if (a || o - t > i)
              return (
                p && (clearTimeout(p), (p = null)), (t = o), e.apply(null, n)
              );
            p ||
              (p = setTimeout(
                () => ((p = null), (t = Date.now()), e.apply(null, n)),
                i - (o - t),
              ));
          };
        },
        eM = function (e, a) {
          let t;
          e = e || 10;
          let i = Array(e),
            p = Array(e),
            n = 0,
            o = 0;
          return (
            (a = void 0 !== a ? a : 1e3),
            function (r) {
              let s = Date.now(),
                d = p[o];
              t || (t = s), (i[n] = r), (p[n] = s);
              let l = o,
                c = 0;
              for (; l !== n; ) (c += i[l++]), (l %= e);
              if (((n = (n + 1) % e) === o && (o = (o + 1) % e), s - t < a))
                return;
              let u = d && s - d;
              return u ? Math.round((1e3 * c) / u) : void 0;
            }
          );
        },
        eI = Symbol("internals");
      class ek extends eA.Transform {
        constructor(e) {
          super({
            readableHighWaterMark: (e = U.toFlatObject(
              e,
              {
                maxRate: 0,
                chunkSize: 65536,
                minChunkSize: 100,
                timeWindow: 500,
                ticksRate: 2,
                samplesCount: 15,
              },
              null,
              (e, a) => !U.isUndefined(a[e]),
            )).chunkSize,
          });
          let a = this,
            t = (this[eI] = {
              length: e.length,
              timeWindow: e.timeWindow,
              ticksRate: e.ticksRate,
              chunkSize: e.chunkSize,
              maxRate: e.maxRate,
              minChunkSize: e.minChunkSize,
              bytesSeen: 0,
              isCaptured: !1,
              notifiedBytesLoaded: 0,
              ts: Date.now(),
              bytes: 0,
              onReadCallback: null,
            }),
            i = eM(t.ticksRate * e.samplesCount, t.timeWindow);
          this.on("newListener", (e) => {
            "progress" !== e || t.isCaptured || (t.isCaptured = !0);
          });
          let p = 0;
          t.updateProgress = eC(function () {
            let e = t.length,
              n = t.bytesSeen,
              o = n - p;
            if (!o || a.destroyed) return;
            let r = i(o);
            (p = n),
              process.nextTick(() => {
                a.emit("progress", {
                  loaded: n,
                  total: e,
                  progress: e ? n / e : void 0,
                  bytes: o,
                  rate: r || void 0,
                  estimated: r && e && n <= e ? (e - n) / r : void 0,
                });
              });
          }, t.ticksRate);
          let n = () => {
            t.updateProgress(!0);
          };
          this.once("end", n), this.once("error", n);
        }
        _read(e) {
          let a = this[eI];
          return a.onReadCallback && a.onReadCallback(), super._read(e);
        }
        _transform(e, a, t) {
          let i = this,
            p = this[eI],
            n = p.maxRate,
            o = this.readableHighWaterMark,
            r = p.timeWindow,
            s = n / (1e3 / r),
            d = !1 !== p.minChunkSize ? Math.max(p.minChunkSize, 0.01 * s) : 0,
            l = (e, a) => {
              let t;
              let l = Buffer.byteLength(e),
                c = null,
                u = o,
                m = 0;
              if (n) {
                let e = Date.now();
                (!p.ts || (m = e - p.ts) >= r) &&
                  ((p.ts = e),
                  (t = s - p.bytes),
                  (p.bytes = t < 0 ? -t : 0),
                  (m = 0)),
                  (t = s - p.bytes);
              }
              if (n) {
                if (t <= 0)
                  return setTimeout(() => {
                    a(null, e);
                  }, r - m);
                t < u && (u = t);
              }
              u &&
                l > u &&
                l - u > d &&
                ((c = e.subarray(u)), (e = e.subarray(0, u))),
                (function (e, a) {
                  let t = Buffer.byteLength(e);
                  (p.bytesSeen += t),
                    (p.bytes += t),
                    p.isCaptured && p.updateProgress(),
                    i.push(e)
                      ? process.nextTick(a)
                      : (p.onReadCallback = () => {
                          (p.onReadCallback = null), process.nextTick(a);
                        });
                })(
                  e,
                  c
                    ? () => {
                        process.nextTick(a, null, c);
                      }
                    : a,
                );
            };
          l(e, function e(a, i) {
            if (a) return t(a);
            i ? l(i, e) : t(null);
          });
        }
        setLength(e) {
          return (this[eI].length = +e), this;
        }
      }
      var eV = t(2361);
      let { asyncIterator: eL } = Symbol,
        eU = async function* (e) {
          e.stream
            ? yield* e.stream()
            : e.arrayBuffer
              ? yield await e.arrayBuffer()
              : e[eL]
                ? yield* e[eL]()
                : yield e;
        },
        eB = U.ALPHABET.ALPHA_DIGIT + "-_",
        eF = new eN.TextEncoder(),
        eq = eF.encode("\r\n");
      class ez {
        constructor(e, a) {
          let { escapeName: t } = this.constructor,
            i = U.isString(a),
            p = `Content-Disposition: form-data; name="${t(e)}"${
              !i && a.name ? `; filename="${t(a.name)}"` : ""
            }\r
`;
          i
            ? (a = eF.encode(String(a).replace(/\r?\n|\r\n?/g, "\r\n")))
            : (p += `Content-Type: ${a.type || "application/octet-stream"}\r
`),
            (this.headers = eF.encode(p + "\r\n")),
            (this.contentLength = i ? a.byteLength : a.size),
            (this.size = this.headers.byteLength + this.contentLength + 2),
            (this.name = e),
            (this.value = a);
        }
        async *encode() {
          yield this.headers;
          let { value: e } = this;
          U.isTypedArray(e) ? yield e : yield* eU(e), yield eq;
        }
        static escapeName(e) {
          return String(e).replace(
            /[\r\n"]/g,
            (e) => ({ "\r": "%0D", "\n": "%0A", '"': "%22" })[e],
          );
        }
      }
      let eH = (e, a, t) => {
        let {
          tag: i = "form-data-boundary",
          size: p = 25,
          boundary: n = i + "-" + U.generateString(p, eB),
        } = t || {};
        if (!U.isFormData(e)) throw TypeError("FormData instance required");
        if (n.length < 1 || n.length > 70)
          throw Error("boundary must be 10-70 characters long");
        let o = eF.encode("--" + n + "\r\n"),
          r = eF.encode("--" + n + "--\r\n\r\n"),
          s = r.byteLength,
          d = Array.from(e.entries()).map(([e, a]) => {
            let t = new ez(e, a);
            return (s += t.size), t;
          });
        (s += o.byteLength * d.length), (s = U.toFiniteNumber(s));
        let l = { "Content-Type": `multipart/form-data; boundary=${n}` };
        return (
          Number.isFinite(s) && (l["Content-Length"] = s),
          a && a(l),
          eA.Readable.from(
            (async function* () {
              for (let e of d) yield o, yield* e.encode();
              yield r;
            })(),
          )
        );
      };
      class eG extends eA.Transform {
        __transform(e, a, t) {
          this.push(e), t();
        }
        _transform(e, a, t) {
          if (
            0 !== e.length &&
            ((this._transform = this.__transform), 120 !== e[0])
          ) {
            let e = Buffer.alloc(2);
            (e[0] = 120), (e[1] = 156), this.push(e, a);
          }
          this.__transform(e, a, t);
        }
      }
      let e$ = (e, a) =>
          U.isAsyncFn(e)
            ? function (...t) {
                let i = t.pop();
                e.apply(this, t).then((e) => {
                  try {
                    a ? i(null, ...a(e)) : i(null, e);
                  } catch (e) {
                    i(e);
                  }
                }, i);
              }
            : e,
        eW = {
          flush: eO.constants.Z_SYNC_FLUSH,
          finishFlush: eO.constants.Z_SYNC_FLUSH,
        },
        eK = {
          flush: eO.constants.BROTLI_OPERATION_FLUSH,
          finishFlush: eO.constants.BROTLI_OPERATION_FLUSH,
        },
        eX = U.isFunction(eO.createBrotliDecompress),
        { http: eY, https: eJ } = eR,
        eQ = /https:?/,
        eZ = er.protocols.map((e) => e + ":");
      function e1(e) {
        e.beforeRedirects.proxy && e.beforeRedirects.proxy(e),
          e.beforeRedirects.config && e.beforeRedirects.config(e);
      }
      let e2 = "undefined" != typeof process && "process" === U.kindOf(process),
        e0 = (e) =>
          new Promise((a, t) => {
            let i, p;
            let n = (e, a) => {
                !p && ((p = !0), i && i(e, a));
              },
              o = (e) => {
                n(e, !0), t(e);
              };
            e(
              (e) => {
                n(e), a(e);
              },
              o,
              (e) => (i = e),
            ).catch(o);
          }),
        e6 = ({ address: e, family: a }) => {
          if (!U.isString(e)) throw TypeError("address must be a string");
          return { address: e, family: a || (0 > e.indexOf(".") ? 6 : 4) };
        },
        e4 = (e, a) => e6(U.isObject(e) ? e : { address: e, family: a }),
        e3 =
          e2 &&
          function (e) {
            return e0(async function (a, t, i) {
              let p,
                n,
                o,
                r,
                s,
                d,
                l,
                { data: c, lookup: u, family: m } = e,
                { responseType: f, responseEncoding: v } = e,
                h = e.method.toUpperCase(),
                g = !1;
              if (u) {
                let e = e$(u, (e) => (U.isArray(e) ? e : [e]));
                u = (a, t, i) => {
                  e(a, t, (e, a, p) => {
                    let n = U.isArray(a) ? a.map((e) => e4(e)) : [e4(a, p)];
                    t.all ? i(e, n) : i(e, n[0].address, n[0].family);
                  });
                };
              }
              let b = new eV(),
                x = () => {
                  e.cancelToken && e.cancelToken.unsubscribe(_),
                    e.signal && e.signal.removeEventListener("abort", _),
                    b.removeAllListeners();
                };
              function _(a) {
                b.emit("abort", !a || a.type ? new e_(null, e, s) : a);
              }
              i((e, a) => {
                (r = !0), a && ((g = !0), x());
              }),
                b.once("abort", t),
                (e.cancelToken || e.signal) &&
                  (e.cancelToken && e.cancelToken.subscribe(_),
                  e.signal &&
                    (e.signal.aborted
                      ? _()
                      : e.signal.addEventListener("abort", _)));
              let y = ew(e.baseURL, e.url),
                w = new URL(y, "http://localhost"),
                S = w.protocol || eZ[0];
              if ("data:" === S) {
                let i;
                if ("GET" !== h)
                  return ey(a, t, {
                    status: 405,
                    statusText: "method not allowed",
                    headers: {},
                    config: e,
                  });
                try {
                  i = (function (e, a, t) {
                    let i = (t && t.Blob) || er.classes.Blob,
                      p = ej(e);
                    if ((void 0 === a && i && (a = !0), "data" === p)) {
                      e = p.length ? e.slice(p.length + 1) : e;
                      let t = eD.exec(e);
                      if (!t) throw new B("Invalid URL", B.ERR_INVALID_URL);
                      let n = t[1],
                        o = t[2],
                        r = t[3],
                        s = Buffer.from(
                          decodeURIComponent(r),
                          o ? "base64" : "utf8",
                        );
                      if (a) {
                        if (!i)
                          throw new B(
                            "Blob is not supported",
                            B.ERR_NOT_SUPPORT,
                          );
                        return new i([s], { type: n });
                      }
                      return s;
                    }
                    throw new B("Unsupported protocol " + p, B.ERR_NOT_SUPPORT);
                  })(e.url, "blob" === f, { Blob: e.env && e.env.Blob });
                } catch (a) {
                  throw B.from(a, B.ERR_BAD_REQUEST, e);
                }
                return (
                  "text" === f
                    ? ((i = i.toString(v)),
                      (v && "utf8" !== v) || (i = U.stripBOM(i)))
                    : "stream" === f && (i = eA.Readable.from(i)),
                  ey(a, t, {
                    data: i,
                    status: 200,
                    statusText: "OK",
                    headers: new eg(),
                    config: e,
                  })
                );
              }
              if (-1 === eZ.indexOf(S))
                return t(
                  new B("Unsupported protocol " + S, B.ERR_BAD_REQUEST, e),
                );
              let E = eg.from(e.headers).normalize();
              E.set("User-Agent", "axios/" + eP, !1);
              let T = e.onDownloadProgress,
                N = e.onUploadProgress,
                R = e.maxRate;
              if (U.isSpecCompliantForm(c)) {
                let e = E.getContentType(/boundary=([-_\w\d]{10,70})/i);
                c = eH(
                  c,
                  (e) => {
                    E.set(e);
                  },
                  {
                    tag: `axios-${eP}-boundary`,
                    boundary: (e && e[1]) || void 0,
                  },
                );
              } else if (U.isFormData(c) && U.isFunction(c.getHeaders)) {
                if ((E.set(c.getHeaders()), !E.hasContentLength()))
                  try {
                    let e = await eN.promisify(c.getLength).call(c);
                    Number.isFinite(e) && e >= 0 && E.setContentLength(e);
                  } catch (e) {}
              } else if (U.isBlob(c))
                c.size &&
                  E.setContentType(c.type || "application/octet-stream"),
                  E.setContentLength(c.size || 0),
                  (c = eA.Readable.from(eU(c)));
              else if (c && !U.isStream(c)) {
                if (Buffer.isBuffer(c));
                else if (U.isArrayBuffer(c)) c = Buffer.from(new Uint8Array(c));
                else {
                  if (!U.isString(c))
                    return t(
                      new B(
                        "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
                        B.ERR_BAD_REQUEST,
                        e,
                      ),
                    );
                  c = Buffer.from(c, "utf-8");
                }
                if (
                  (E.setContentLength(c.length, !1),
                  e.maxBodyLength > -1 && c.length > e.maxBodyLength)
                )
                  return t(
                    new B(
                      "Request body larger than maxBodyLength limit",
                      B.ERR_BAD_REQUEST,
                      e,
                    ),
                  );
              }
              let O = U.toFiniteNumber(E.getContentLength());
              if (
                (U.isArray(R) ? ((p = R[0]), (n = R[1])) : (p = n = R),
                c &&
                  (N || p) &&
                  (U.isStream(c) ||
                    (c = eA.Readable.from(c, { objectMode: !1 })),
                  (c = eA.pipeline(
                    [c, new ek({ length: O, maxRate: U.toFiniteNumber(p) })],
                    U.noop,
                  )),
                  N &&
                    c.on("progress", (e) => {
                      N(Object.assign(e, { upload: !0 }));
                    })),
                e.auth)
              ) {
                let a = e.auth.username || "",
                  t = e.auth.password || "";
                o = a + ":" + t;
              }
              if (!o && w.username) {
                let e = w.username,
                  a = w.password;
                o = e + ":" + a;
              }
              o && E.delete("authorization");
              try {
                d = Z(
                  w.pathname + w.search,
                  e.params,
                  e.paramsSerializer,
                ).replace(/^\?/, "");
              } catch (i) {
                let a = Error(i.message);
                return (a.config = e), (a.url = e.url), (a.exists = !0), t(a);
              }
              E.set(
                "Accept-Encoding",
                "gzip, compress, deflate" + (eX ? ", br" : ""),
                !1,
              );
              let P = {
                path: d,
                method: h,
                headers: E.toJSON(),
                agents: { http: e.httpAgent, https: e.httpsAgent },
                auth: o,
                protocol: S,
                family: m,
                beforeRedirect: e1,
                beforeRedirects: {},
              };
              U.isUndefined(u) || (P.lookup = u),
                e.socketPath
                  ? (P.socketPath = e.socketPath)
                  : ((P.hostname = w.hostname),
                    (P.port = w.port),
                    (function e(a, t, i) {
                      let p = t;
                      if (!p && !1 !== p) {
                        let e = (0, eS.j)(i);
                        e && (p = new URL(e));
                      }
                      if (p) {
                        if (
                          (p.username &&
                            (p.auth =
                              (p.username || "") + ":" + (p.password || "")),
                          p.auth)
                        ) {
                          (p.auth.username || p.auth.password) &&
                            (p.auth =
                              (p.auth.username || "") +
                              ":" +
                              (p.auth.password || ""));
                          let e = Buffer.from(p.auth, "utf8").toString(
                            "base64",
                          );
                          a.headers["Proxy-Authorization"] = "Basic " + e;
                        }
                        a.headers.host =
                          a.hostname + (a.port ? ":" + a.port : "");
                        let e = p.hostname || p.host;
                        (a.hostname = e),
                          (a.host = e),
                          (a.port = p.port),
                          (a.path = i),
                          p.protocol &&
                            (a.protocol = p.protocol.includes(":")
                              ? p.protocol
                              : `${p.protocol}:`);
                      }
                      a.beforeRedirects.proxy = function (a) {
                        e(a, t, a.href);
                      };
                    })(
                      P,
                      e.proxy,
                      S +
                        "//" +
                        w.hostname +
                        (w.port ? ":" + w.port : "") +
                        P.path,
                    ));
              let j = eQ.test(P.protocol);
              if (
                ((P.agent = j ? e.httpsAgent : e.httpAgent),
                e.transport
                  ? (l = e.transport)
                  : 0 === e.maxRedirects
                    ? (l = j ? eT : eE)
                    : (e.maxRedirects && (P.maxRedirects = e.maxRedirects),
                      e.beforeRedirect &&
                        (P.beforeRedirects.config = e.beforeRedirect),
                      (l = j ? eJ : eY)),
                e.maxBodyLength > -1
                  ? (P.maxBodyLength = e.maxBodyLength)
                  : (P.maxBodyLength = 1 / 0),
                e.insecureHTTPParser &&
                  (P.insecureHTTPParser = e.insecureHTTPParser),
                (s = l.request(P, function (i) {
                  if (s.destroyed) return;
                  let p = [i],
                    o = +i.headers["content-length"];
                  if (T) {
                    let e = new ek({
                      length: U.toFiniteNumber(o),
                      maxRate: U.toFiniteNumber(n),
                    });
                    T &&
                      e.on("progress", (e) => {
                        T(Object.assign(e, { download: !0 }));
                      }),
                      p.push(e);
                  }
                  let r = i,
                    d = i.req || s;
                  if (!1 !== e.decompress && i.headers["content-encoding"])
                    switch (
                      (("HEAD" === h || 204 === i.statusCode) &&
                        delete i.headers["content-encoding"],
                      (i.headers["content-encoding"] || "").toLowerCase())
                    ) {
                      case "gzip":
                      case "x-gzip":
                      case "compress":
                      case "x-compress":
                        p.push(eO.createUnzip(eW)),
                          delete i.headers["content-encoding"];
                        break;
                      case "deflate":
                        p.push(new eG()),
                          p.push(eO.createUnzip(eW)),
                          delete i.headers["content-encoding"];
                        break;
                      case "br":
                        eX &&
                          (p.push(eO.createBrotliDecompress(eK)),
                          delete i.headers["content-encoding"]);
                    }
                  r = p.length > 1 ? eA.pipeline(p, U.noop) : p[0];
                  let l = eA.finished(r, () => {
                      l(), x();
                    }),
                    c = {
                      status: i.statusCode,
                      statusText: i.statusMessage,
                      headers: new eg(i.headers),
                      config: e,
                      request: d,
                    };
                  if ("stream" === f) (c.data = r), ey(a, t, c);
                  else {
                    let i = [],
                      p = 0;
                    r.on("data", function (a) {
                      i.push(a),
                        (p += a.length),
                        e.maxContentLength > -1 &&
                          p > e.maxContentLength &&
                          ((g = !0),
                          r.destroy(),
                          t(
                            new B(
                              "maxContentLength size of " +
                                e.maxContentLength +
                                " exceeded",
                              B.ERR_BAD_RESPONSE,
                              e,
                              d,
                            ),
                          ));
                    }),
                      r.on("aborted", function () {
                        if (g) return;
                        let a = new B(
                          "maxContentLength size of " +
                            e.maxContentLength +
                            " exceeded",
                          B.ERR_BAD_RESPONSE,
                          e,
                          d,
                        );
                        r.destroy(a), t(a);
                      }),
                      r.on("error", function (a) {
                        s.destroyed || t(B.from(a, null, e, d));
                      }),
                      r.on("end", function () {
                        try {
                          let e = 1 === i.length ? i[0] : Buffer.concat(i);
                          "arraybuffer" === f ||
                            ((e = e.toString(v)),
                            (v && "utf8" !== v) || (e = U.stripBOM(e))),
                            (c.data = e);
                        } catch (a) {
                          return t(B.from(a, null, e, c.request, c));
                        }
                        ey(a, t, c);
                      });
                  }
                  b.once("abort", (e) => {
                    r.destroyed || (r.emit("error", e), r.destroy());
                  });
                })),
                b.once("abort", (e) => {
                  t(e), s.destroy(e);
                }),
                s.on("error", function (a) {
                  t(B.from(a, null, e, s));
                }),
                s.on("socket", function (e) {
                  e.setKeepAlive(!0, 6e4);
                }),
                e.timeout)
              ) {
                let a = parseInt(e.timeout, 10);
                if (Number.isNaN(a)) {
                  t(
                    new B(
                      "error trying to parse `config.timeout` to int",
                      B.ERR_BAD_OPTION_VALUE,
                      e,
                      s,
                    ),
                  );
                  return;
                }
                s.setTimeout(a, function () {
                  if (r) return;
                  let a = e.timeout
                      ? "timeout of " + e.timeout + "ms exceeded"
                      : "timeout exceeded",
                    i = e.transitional || ea;
                  e.timeoutErrorMessage && (a = e.timeoutErrorMessage),
                    t(
                      new B(
                        a,
                        i.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
                        e,
                        s,
                      ),
                    ),
                    _();
                });
              }
              if (U.isStream(c)) {
                let a = !1,
                  t = !1;
                c.on("end", () => {
                  a = !0;
                }),
                  c.once("error", (e) => {
                    (t = !0), s.destroy(e);
                  }),
                  c.on("close", () => {
                    a ||
                      t ||
                      _(new e_("Request stream has been aborted", e, s));
                  }),
                  c.pipe(s);
              } else s.end(c);
            });
          },
        e9 = er.hasStandardBrowserEnv
          ? {
              write: function (e, a, t, i, p, n) {
                let o = [];
                o.push(e + "=" + encodeURIComponent(a)),
                  U.isNumber(t) &&
                    o.push("expires=" + new Date(t).toGMTString()),
                  U.isString(i) && o.push("path=" + i),
                  U.isString(p) && o.push("domain=" + p),
                  !0 === n && o.push("secure"),
                  (document.cookie = o.join("; "));
              },
              read: function (e) {
                let a = document.cookie.match(
                  RegExp("(^|;\\s*)(" + e + ")=([^;]*)"),
                );
                return a ? decodeURIComponent(a[3]) : null;
              },
              remove: function (e) {
                this.write(e, "", Date.now() - 864e5);
              },
            }
          : {
              write: function () {},
              read: function () {
                return null;
              },
              remove: function () {},
            },
        e5 = er.hasStandardBrowserEnv
          ? (function () {
              let e;
              let a = /(msie|trident)/i.test(navigator.userAgent),
                t = document.createElement("a");
              function i(e) {
                let i = e;
                return (
                  a && (t.setAttribute("href", i), (i = t.href)),
                  t.setAttribute("href", i),
                  {
                    href: t.href,
                    protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
                    host: t.host,
                    search: t.search ? t.search.replace(/^\?/, "") : "",
                    hash: t.hash ? t.hash.replace(/^#/, "") : "",
                    hostname: t.hostname,
                    port: t.port,
                    pathname:
                      "/" === t.pathname.charAt(0)
                        ? t.pathname
                        : "/" + t.pathname,
                  }
                );
              }
              return (
                (e = i(window.location.href)),
                function (a) {
                  let t = U.isString(a) ? i(a) : a;
                  return t.protocol === e.protocol && t.host === e.host;
                }
              );
            })()
          : function () {
              return !0;
            };
      function e8(e, a) {
        let t = 0,
          i = eM(50, 250);
        return (p) => {
          let n = p.loaded,
            o = p.lengthComputable ? p.total : void 0,
            r = n - t,
            s = i(r);
          t = n;
          let d = {
            loaded: n,
            total: o,
            progress: o ? n / o : void 0,
            bytes: r,
            rate: s || void 0,
            estimated: s && o && n <= o ? (o - n) / s : void 0,
            event: p,
          };
          (d[a ? "download" : "upload"] = !0), e(d);
        };
      }
      let e7 = "undefined" != typeof XMLHttpRequest,
        ae =
          e7 &&
          function (e) {
            return new Promise(function (a, t) {
              let i,
                p,
                n = e.data,
                o = eg.from(e.headers).normalize(),
                r = e.responseType;
              function s() {
                e.cancelToken && e.cancelToken.unsubscribe(i),
                  e.signal && e.signal.removeEventListener("abort", i);
              }
              if (U.isFormData(n)) {
                if (
                  er.hasStandardBrowserEnv ||
                  er.hasStandardBrowserWebWorkerEnv
                )
                  o.setContentType(!1);
                else if (!1 !== (p = o.getContentType())) {
                  let [e, ...a] = p
                    ? p
                        .split(";")
                        .map((e) => e.trim())
                        .filter(Boolean)
                    : [];
                  o.setContentType(
                    [e || "multipart/form-data", ...a].join("; "),
                  );
                }
              }
              let d = new XMLHttpRequest();
              if (e.auth) {
                let a = e.auth.username || "",
                  t = e.auth.password
                    ? unescape(encodeURIComponent(e.auth.password))
                    : "";
                o.set("Authorization", "Basic " + btoa(a + ":" + t));
              }
              let l = ew(e.baseURL, e.url);
              function c() {
                if (!d) return;
                let i = eg.from(
                    "getAllResponseHeaders" in d && d.getAllResponseHeaders(),
                  ),
                  p =
                    r && "text" !== r && "json" !== r
                      ? d.response
                      : d.responseText,
                  n = {
                    data: p,
                    status: d.status,
                    statusText: d.statusText,
                    headers: i,
                    config: e,
                    request: d,
                  };
                ey(
                  function (e) {
                    a(e), s();
                  },
                  function (e) {
                    t(e), s();
                  },
                  n,
                ),
                  (d = null);
              }
              if (
                (d.open(
                  e.method.toUpperCase(),
                  Z(l, e.params, e.paramsSerializer),
                  !0,
                ),
                (d.timeout = e.timeout),
                "onloadend" in d
                  ? (d.onloadend = c)
                  : (d.onreadystatechange = function () {
                      d &&
                        4 === d.readyState &&
                        (0 !== d.status ||
                          (d.responseURL &&
                            0 === d.responseURL.indexOf("file:"))) &&
                        setTimeout(c);
                    }),
                (d.onabort = function () {
                  d &&
                    (t(new B("Request aborted", B.ECONNABORTED, e, d)),
                    (d = null));
                }),
                (d.onerror = function () {
                  t(new B("Network Error", B.ERR_NETWORK, e, d)), (d = null);
                }),
                (d.ontimeout = function () {
                  let a = e.timeout
                      ? "timeout of " + e.timeout + "ms exceeded"
                      : "timeout exceeded",
                    i = e.transitional || ea;
                  e.timeoutErrorMessage && (a = e.timeoutErrorMessage),
                    t(
                      new B(
                        a,
                        i.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
                        e,
                        d,
                      ),
                    ),
                    (d = null);
                }),
                er.hasStandardBrowserEnv)
              ) {
                let a = e5(l) && e.xsrfCookieName && e9.read(e.xsrfCookieName);
                a && o.set(e.xsrfHeaderName, a);
              }
              void 0 === n && o.setContentType(null),
                "setRequestHeader" in d &&
                  U.forEach(o.toJSON(), function (e, a) {
                    d.setRequestHeader(a, e);
                  }),
                U.isUndefined(e.withCredentials) ||
                  (d.withCredentials = !!e.withCredentials),
                r && "json" !== r && (d.responseType = e.responseType),
                "function" == typeof e.onDownloadProgress &&
                  d.addEventListener("progress", e8(e.onDownloadProgress, !0)),
                "function" == typeof e.onUploadProgress &&
                  d.upload &&
                  d.upload.addEventListener("progress", e8(e.onUploadProgress)),
                (e.cancelToken || e.signal) &&
                  ((i = (a) => {
                    d &&
                      (t(!a || a.type ? new e_(null, e, d) : a),
                      d.abort(),
                      (d = null));
                  }),
                  e.cancelToken && e.cancelToken.subscribe(i),
                  e.signal &&
                    (e.signal.aborted
                      ? i()
                      : e.signal.addEventListener("abort", i)));
              let u = ej(l);
              if (u && -1 === er.protocols.indexOf(u)) {
                t(
                  new B(
                    "Unsupported protocol " + u + ":",
                    B.ERR_BAD_REQUEST,
                    e,
                  ),
                );
                return;
              }
              d.send(n || null);
            });
          },
        aa = { http: e3, xhr: ae };
      U.forEach(aa, (e, a) => {
        if (e) {
          try {
            Object.defineProperty(e, "name", { value: a });
          } catch (e) {}
          Object.defineProperty(e, "adapterName", { value: a });
        }
      });
      let at = (e) => `- ${e}`,
        ai = (e) => U.isFunction(e) || null === e || !1 === e,
        ap = {
          getAdapter: (e) => {
            let a, t;
            e = U.isArray(e) ? e : [e];
            let { length: i } = e,
              p = {};
            for (let n = 0; n < i; n++) {
              let i;
              if (
                ((t = a = e[n]),
                !ai(a) && void 0 === (t = aa[(i = String(a)).toLowerCase()]))
              )
                throw new B(`Unknown adapter '${i}'`);
              if (t) break;
              p[i || "#" + n] = t;
            }
            if (!t) {
              let e = Object.entries(p).map(
                ([e, a]) =>
                  `adapter ${e} ` +
                  (!1 === a
                    ? "is not supported by the environment"
                    : "is not available in the build"),
              );
              throw new B(
                "There is no suitable adapter to dispatch the request " +
                  (i
                    ? e.length > 1
                      ? "since :\n" + e.map(at).join("\n")
                      : " " + at(e[0])
                    : "as no adapter specified"),
                "ERR_NOT_SUPPORT",
              );
            }
            return t;
          },
          adapters: aa,
        };
      function an(e) {
        if (
          (e.cancelToken && e.cancelToken.throwIfRequested(),
          e.signal && e.signal.aborted)
        )
          throw new e_(null, e);
      }
      function ao(e) {
        an(e),
          (e.headers = eg.from(e.headers)),
          (e.data = eb.call(e, e.transformRequest)),
          -1 !== ["post", "put", "patch"].indexOf(e.method) &&
            e.headers.setContentType("application/x-www-form-urlencoded", !1);
        let a = ap.getAdapter(e.adapter || ed.adapter);
        return a(e).then(
          function (a) {
            return (
              an(e),
              (a.data = eb.call(e, e.transformResponse, a)),
              (a.headers = eg.from(a.headers)),
              a
            );
          },
          function (a) {
            return (
              !ex(a) &&
                (an(e),
                a &&
                  a.response &&
                  ((a.response.data = eb.call(
                    e,
                    e.transformResponse,
                    a.response,
                  )),
                  (a.response.headers = eg.from(a.response.headers)))),
              Promise.reject(a)
            );
          },
        );
      }
      let ar = (e) => (e instanceof eg ? e.toJSON() : e);
      function as(e, a) {
        a = a || {};
        let t = {};
        function i(e, a, t) {
          return U.isPlainObject(e) && U.isPlainObject(a)
            ? U.merge.call({ caseless: t }, e, a)
            : U.isPlainObject(a)
              ? U.merge({}, a)
              : U.isArray(a)
                ? a.slice()
                : a;
        }
        function p(e, a, t) {
          return U.isUndefined(a)
            ? U.isUndefined(e)
              ? void 0
              : i(void 0, e, t)
            : i(e, a, t);
        }
        function n(e, a) {
          if (!U.isUndefined(a)) return i(void 0, a);
        }
        function o(e, a) {
          return U.isUndefined(a)
            ? U.isUndefined(e)
              ? void 0
              : i(void 0, e)
            : i(void 0, a);
        }
        function r(t, p, n) {
          return n in a ? i(t, p) : n in e ? i(void 0, t) : void 0;
        }
        let s = {
          url: n,
          method: n,
          data: n,
          baseURL: o,
          transformRequest: o,
          transformResponse: o,
          paramsSerializer: o,
          timeout: o,
          timeoutMessage: o,
          withCredentials: o,
          adapter: o,
          responseType: o,
          xsrfCookieName: o,
          xsrfHeaderName: o,
          onUploadProgress: o,
          onDownloadProgress: o,
          decompress: o,
          maxContentLength: o,
          maxBodyLength: o,
          beforeRedirect: o,
          transport: o,
          httpAgent: o,
          httpsAgent: o,
          cancelToken: o,
          socketPath: o,
          responseEncoding: o,
          validateStatus: r,
          headers: (e, a) => p(ar(e), ar(a), !0),
        };
        return (
          U.forEach(Object.keys(Object.assign({}, e, a)), function (i) {
            let n = s[i] || p,
              o = n(e[i], a[i], i);
            (U.isUndefined(o) && n !== r) || (t[i] = o);
          }),
          t
        );
      }
      let ad = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach(
        (e, a) => {
          ad[e] = function (t) {
            return typeof t === e || "a" + (a < 1 ? "n " : " ") + e;
          };
        },
      );
      let al = {};
      ad.transitional = function (e, a, t) {
        function i(e, a) {
          return (
            "[Axios v" +
            eP +
            "] Transitional option '" +
            e +
            "'" +
            a +
            (t ? ". " + t : "")
          );
        }
        return (t, p, n) => {
          if (!1 === e)
            throw new B(
              i(p, " has been removed" + (a ? " in " + a : "")),
              B.ERR_DEPRECATED,
            );
          return (
            a &&
              !al[p] &&
              ((al[p] = !0),
              console.warn(
                i(
                  p,
                  " has been deprecated since v" +
                    a +
                    " and will be removed in the near future",
                ),
              )),
            !e || e(t, p, n)
          );
        };
      };
      let ac = {
          assertOptions: function (e, a, t) {
            if ("object" != typeof e)
              throw new B("options must be an object", B.ERR_BAD_OPTION_VALUE);
            let i = Object.keys(e),
              p = i.length;
            for (; p-- > 0; ) {
              let n = i[p],
                o = a[n];
              if (o) {
                let a = e[n],
                  t = void 0 === a || o(a, n, e);
                if (!0 !== t)
                  throw new B(
                    "option " + n + " must be " + t,
                    B.ERR_BAD_OPTION_VALUE,
                  );
                continue;
              }
              if (!0 !== t)
                throw new B("Unknown option " + n, B.ERR_BAD_OPTION);
            }
          },
          validators: ad,
        },
        au = ac.validators;
      class am {
        constructor(e) {
          (this.defaults = e),
            (this.interceptors = { request: new ee(), response: new ee() });
        }
        request(e, a) {
          let t, i;
          "string" == typeof e ? ((a = a || {}).url = e) : (a = e || {}),
            (a = as(this.defaults, a));
          let { transitional: p, paramsSerializer: n, headers: o } = a;
          void 0 !== p &&
            ac.assertOptions(
              p,
              {
                silentJSONParsing: au.transitional(au.boolean),
                forcedJSONParsing: au.transitional(au.boolean),
                clarifyTimeoutError: au.transitional(au.boolean),
              },
              !1,
            ),
            null != n &&
              (U.isFunction(n)
                ? (a.paramsSerializer = { serialize: n })
                : ac.assertOptions(
                    n,
                    { encode: au.function, serialize: au.function },
                    !0,
                  )),
            (a.method = (
              a.method ||
              this.defaults.method ||
              "get"
            ).toLowerCase());
          let r = o && U.merge(o.common, o[a.method]);
          o &&
            U.forEach(
              ["delete", "get", "head", "post", "put", "patch", "common"],
              (e) => {
                delete o[e];
              },
            ),
            (a.headers = eg.concat(r, o));
          let s = [],
            d = !0;
          this.interceptors.request.forEach(function (e) {
            ("function" != typeof e.runWhen || !1 !== e.runWhen(a)) &&
              ((d = d && e.synchronous), s.unshift(e.fulfilled, e.rejected));
          });
          let l = [];
          this.interceptors.response.forEach(function (e) {
            l.push(e.fulfilled, e.rejected);
          });
          let c = 0;
          if (!d) {
            let e = [ao.bind(this), void 0];
            for (
              e.unshift.apply(e, s),
                e.push.apply(e, l),
                i = e.length,
                t = Promise.resolve(a);
              c < i;

            )
              t = t.then(e[c++], e[c++]);
            return t;
          }
          i = s.length;
          let u = a;
          for (c = 0; c < i; ) {
            let e = s[c++],
              a = s[c++];
            try {
              u = e(u);
            } catch (e) {
              a.call(this, e);
              break;
            }
          }
          try {
            t = ao.call(this, u);
          } catch (e) {
            return Promise.reject(e);
          }
          for (c = 0, i = l.length; c < i; ) t = t.then(l[c++], l[c++]);
          return t;
        }
        getUri(e) {
          e = as(this.defaults, e);
          let a = ew(e.baseURL, e.url);
          return Z(a, e.params, e.paramsSerializer);
        }
      }
      U.forEach(["delete", "get", "head", "options"], function (e) {
        am.prototype[e] = function (a, t) {
          return this.request(
            as(t || {}, { method: e, url: a, data: (t || {}).data }),
          );
        };
      }),
        U.forEach(["post", "put", "patch"], function (e) {
          function a(a) {
            return function (t, i, p) {
              return this.request(
                as(p || {}, {
                  method: e,
                  headers: a ? { "Content-Type": "multipart/form-data" } : {},
                  url: t,
                  data: i,
                }),
              );
            };
          }
          (am.prototype[e] = a()), (am.prototype[e + "Form"] = a(!0));
        });
      class af {
        constructor(e) {
          let a;
          if ("function" != typeof e)
            throw TypeError("executor must be a function.");
          this.promise = new Promise(function (e) {
            a = e;
          });
          let t = this;
          this.promise.then((e) => {
            if (!t._listeners) return;
            let a = t._listeners.length;
            for (; a-- > 0; ) t._listeners[a](e);
            t._listeners = null;
          }),
            (this.promise.then = (e) => {
              let a;
              let i = new Promise((e) => {
                t.subscribe(e), (a = e);
              }).then(e);
              return (
                (i.cancel = function () {
                  t.unsubscribe(a);
                }),
                i
              );
            }),
            e(function (e, i, p) {
              t.reason || ((t.reason = new e_(e, i, p)), a(t.reason));
            });
        }
        throwIfRequested() {
          if (this.reason) throw this.reason;
        }
        subscribe(e) {
          if (this.reason) {
            e(this.reason);
            return;
          }
          this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
        }
        unsubscribe(e) {
          if (!this._listeners) return;
          let a = this._listeners.indexOf(e);
          -1 !== a && this._listeners.splice(a, 1);
        }
        static source() {
          let e;
          let a = new af(function (a) {
            e = a;
          });
          return { token: a, cancel: e };
        }
      }
      let av = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511,
      };
      Object.entries(av).forEach(([e, a]) => {
        av[a] = e;
      });
      let ah = (function e(a) {
        let t = new am(a),
          i = r(am.prototype.request, t);
        return (
          U.extend(i, am.prototype, t, { allOwnKeys: !0 }),
          U.extend(i, t, null, { allOwnKeys: !0 }),
          (i.create = function (t) {
            return e(as(a, t));
          }),
          i
        );
      })(ed);
      (ah.Axios = am),
        (ah.CanceledError = e_),
        (ah.CancelToken = af),
        (ah.isCancel = ex),
        (ah.VERSION = eP),
        (ah.toFormData = K),
        (ah.AxiosError = B),
        (ah.Cancel = ah.CanceledError),
        (ah.all = function (e) {
          return Promise.all(e);
        }),
        (ah.spread = function (e) {
          return function (a) {
            return e.apply(null, a);
          };
        }),
        (ah.isAxiosError = function (e) {
          return U.isObject(e) && !0 === e.isAxiosError;
        }),
        (ah.mergeConfig = as),
        (ah.AxiosHeaders = eg),
        (ah.formToJSON = (e) => es(U.isHTMLForm(e) ? new FormData(e) : e)),
        (ah.getAdapter = ap.getAdapter),
        (ah.HttpStatusCode = av),
        (ah.default = ah);
      let ag = ah;
    },
    9206: (e, a, t) => {
      t.d(a, { Uy: () => z });
      var i,
        p = Symbol.for("immer-nothing"),
        n = Symbol.for("immer-draftable"),
        o = Symbol.for("immer-state");
      function r(e, ...a) {
        throw Error(
          `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
        );
      }
      var s = Object.getPrototypeOf;
      function d(e) {
        return !!e && !!e[o];
      }
      function l(e) {
        return (
          !!e &&
          (u(e) ||
            Array.isArray(e) ||
            !!e[n] ||
            !!e.constructor?.[n] ||
            g(e) ||
            b(e))
        );
      }
      var c = Object.prototype.constructor.toString();
      function u(e) {
        if (!e || "object" != typeof e) return !1;
        let a = s(e);
        if (null === a) return !0;
        let t = Object.hasOwnProperty.call(a, "constructor") && a.constructor;
        return (
          t === Object ||
          ("function" == typeof t && Function.toString.call(t) === c)
        );
      }
      function m(e, a) {
        0 === f(e)
          ? Object.entries(e).forEach(([t, i]) => {
              a(t, i, e);
            })
          : e.forEach((t, i) => a(i, t, e));
      }
      function f(e) {
        let a = e[o];
        return a ? a.type_ : Array.isArray(e) ? 1 : g(e) ? 2 : b(e) ? 3 : 0;
      }
      function v(e, a) {
        return 2 === f(e)
          ? e.has(a)
          : Object.prototype.hasOwnProperty.call(e, a);
      }
      function h(e, a, t) {
        let i = f(e);
        2 === i ? e.set(a, t) : 3 === i ? e.add(t) : (e[a] = t);
      }
      function g(e) {
        return e instanceof Map;
      }
      function b(e) {
        return e instanceof Set;
      }
      function x(e) {
        return e.copy_ || e.base_;
      }
      function _(e, a) {
        if (g(e)) return new Map(e);
        if (b(e)) return new Set(e);
        if (Array.isArray(e)) return Array.prototype.slice.call(e);
        if (!a && u(e)) {
          if (!s(e)) {
            let a = Object.create(null);
            return Object.assign(a, e);
          }
          return { ...e };
        }
        let t = Object.getOwnPropertyDescriptors(e);
        delete t[o];
        let i = Reflect.ownKeys(t);
        for (let a = 0; a < i.length; a++) {
          let p = i[a],
            n = t[p];
          !1 === n.writable && ((n.writable = !0), (n.configurable = !0)),
            (n.get || n.set) &&
              (t[p] = {
                configurable: !0,
                writable: !0,
                enumerable: n.enumerable,
                value: e[p],
              });
        }
        return Object.create(s(e), t);
      }
      function y(e, a = !1) {
        return (
          S(e) ||
            d(e) ||
            !l(e) ||
            (f(e) > 1 && (e.set = e.add = e.clear = e.delete = w),
            Object.freeze(e),
            a && m(e, (e, a) => y(a, !0), !0)),
          e
        );
      }
      function w() {
        r(2);
      }
      function S(e) {
        return Object.isFrozen(e);
      }
      var E = {};
      function T(e) {
        let a = E[e];
        return a || r(0, e), a;
      }
      function N(e, a) {
        a &&
          (T("Patches"),
          (e.patches_ = []),
          (e.inversePatches_ = []),
          (e.patchListener_ = a));
      }
      function R(e) {
        O(e), e.drafts_.forEach(j), (e.drafts_ = null);
      }
      function O(e) {
        e === i && (i = e.parent_);
      }
      function P(e) {
        return (i = {
          drafts_: [],
          parent_: i,
          immer_: e,
          canAutoFreeze_: !0,
          unfinalizedDrafts_: 0,
        });
      }
      function j(e) {
        let a = e[o];
        0 === a.type_ || 1 === a.type_ ? a.revoke_() : (a.revoked_ = !0);
      }
      function D(e, a) {
        a.unfinalizedDrafts_ = a.drafts_.length;
        let t = a.drafts_[0],
          i = void 0 !== e && e !== t;
        return (
          i
            ? (t[o].modified_ && (R(a), r(4)),
              l(e) && ((e = A(a, e)), a.parent_ || M(a, e)),
              a.patches_ &&
                T("Patches").generateReplacementPatches_(
                  t[o].base_,
                  e,
                  a.patches_,
                  a.inversePatches_,
                ))
            : (e = A(a, t, [])),
          R(a),
          a.patches_ && a.patchListener_(a.patches_, a.inversePatches_),
          e !== p ? e : void 0
        );
      }
      function A(e, a, t) {
        if (S(a)) return a;
        let i = a[o];
        if (!i) return m(a, (p, n) => C(e, i, a, p, n, t), !0), a;
        if (i.scope_ !== e) return a;
        if (!i.modified_) return M(e, i.base_, !0), i.base_;
        if (!i.finalized_) {
          (i.finalized_ = !0), i.scope_.unfinalizedDrafts_--;
          let a = i.copy_,
            p = a,
            n = !1;
          3 === i.type_ && ((p = new Set(a)), a.clear(), (n = !0)),
            m(p, (p, o) => C(e, i, a, p, o, t, n)),
            M(e, a, !1),
            t &&
              e.patches_ &&
              T("Patches").generatePatches_(
                i,
                t,
                e.patches_,
                e.inversePatches_,
              );
        }
        return i.copy_;
      }
      function C(e, a, t, i, p, n, o) {
        if (d(p)) {
          let o =
              n && a && 3 !== a.type_ && !v(a.assigned_, i)
                ? n.concat(i)
                : void 0,
            r = A(e, p, o);
          if ((h(t, i, r), !d(r))) return;
          e.canAutoFreeze_ = !1;
        } else o && t.add(p);
        if (l(p) && !S(p)) {
          if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
          A(e, p), (a && a.scope_.parent_) || M(e, p);
        }
      }
      function M(e, a, t = !1) {
        !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && y(a, t);
      }
      var I = {
          get(e, a) {
            if (a === o) return e;
            let t = x(e);
            if (!v(t, a))
              return (function (e, a, t) {
                let i = L(a, t);
                return i
                  ? "value" in i
                    ? i.value
                    : i.get?.call(e.draft_)
                  : void 0;
              })(e, t, a);
            let i = t[a];
            return e.finalized_ || !l(i)
              ? i
              : i === V(e.base_, a)
                ? (B(e), (e.copy_[a] = F(i, e)))
                : i;
          },
          has: (e, a) => a in x(e),
          ownKeys: (e) => Reflect.ownKeys(x(e)),
          set(e, a, t) {
            let i = L(x(e), a);
            if (i?.set) return i.set.call(e.draft_, t), !0;
            if (!e.modified_) {
              let i = V(x(e), a),
                p = i?.[o];
              if (p && p.base_ === t)
                return (e.copy_[a] = t), (e.assigned_[a] = !1), !0;
              if (
                (t === i ? 0 !== t || 1 / t == 1 / i : t != t && i != i) &&
                (void 0 !== t || v(e.base_, a))
              )
                return !0;
              B(e), U(e);
            }
            return (
              !!(
                (e.copy_[a] === t && (void 0 !== t || a in e.copy_)) ||
                (Number.isNaN(t) && Number.isNaN(e.copy_[a]))
              ) || ((e.copy_[a] = t), (e.assigned_[a] = !0), !0)
            );
          },
          deleteProperty: (e, a) => (
            void 0 !== V(e.base_, a) || a in e.base_
              ? ((e.assigned_[a] = !1), B(e), U(e))
              : delete e.assigned_[a],
            e.copy_ && delete e.copy_[a],
            !0
          ),
          getOwnPropertyDescriptor(e, a) {
            let t = x(e),
              i = Reflect.getOwnPropertyDescriptor(t, a);
            return i
              ? {
                  writable: !0,
                  configurable: 1 !== e.type_ || "length" !== a,
                  enumerable: i.enumerable,
                  value: t[a],
                }
              : i;
          },
          defineProperty() {
            r(11);
          },
          getPrototypeOf: (e) => s(e.base_),
          setPrototypeOf() {
            r(12);
          },
        },
        k = {};
      function V(e, a) {
        let t = e[o],
          i = t ? x(t) : e;
        return i[a];
      }
      function L(e, a) {
        if (!(a in e)) return;
        let t = s(e);
        for (; t; ) {
          let e = Object.getOwnPropertyDescriptor(t, a);
          if (e) return e;
          t = s(t);
        }
      }
      function U(e) {
        !e.modified_ && ((e.modified_ = !0), e.parent_ && U(e.parent_));
      }
      function B(e) {
        e.copy_ ||
          (e.copy_ = _(e.base_, e.scope_.immer_.useStrictShallowCopy_));
      }
      function F(e, a) {
        let t = g(e)
            ? T("MapSet").proxyMap_(e, a)
            : b(e)
              ? T("MapSet").proxySet_(e, a)
              : (function (e, a) {
                  let t = Array.isArray(e),
                    p = {
                      type_: t ? 1 : 0,
                      scope_: a ? a.scope_ : i,
                      modified_: !1,
                      finalized_: !1,
                      assigned_: {},
                      parent_: a,
                      base_: e,
                      draft_: null,
                      copy_: null,
                      revoke_: null,
                      isManual_: !1,
                    },
                    n = p,
                    o = I;
                  t && ((n = [p]), (o = k));
                  let { revoke: r, proxy: s } = Proxy.revocable(n, o);
                  return (p.draft_ = s), (p.revoke_ = r), s;
                })(e, a),
          p = a ? a.scope_ : i;
        return p.drafts_.push(t), t;
      }
      m(I, (e, a) => {
        k[e] = function () {
          return (arguments[0] = arguments[0][0]), a.apply(this, arguments);
        };
      }),
        (k.deleteProperty = function (e, a) {
          return k.set.call(this, e, a, void 0);
        }),
        (k.set = function (e, a, t) {
          return I.set.call(this, e[0], a, t, e[0]);
        });
      var q = new (class {
          constructor(e) {
            (this.autoFreeze_ = !0),
              (this.useStrictShallowCopy_ = !1),
              (this.produce = (e, a, t) => {
                let i;
                if ("function" == typeof e && "function" != typeof a) {
                  let t = a;
                  a = e;
                  let i = this;
                  return function (e = t, ...p) {
                    return i.produce(e, (e) => a.call(this, e, ...p));
                  };
                }
                if (
                  ("function" != typeof a && r(6),
                  void 0 !== t && "function" != typeof t && r(7),
                  l(e))
                ) {
                  let p = P(this),
                    n = F(e, void 0),
                    o = !0;
                  try {
                    (i = a(n)), (o = !1);
                  } finally {
                    o ? R(p) : O(p);
                  }
                  return N(p, t), D(i, p);
                }
                if (e && "object" == typeof e) r(1, e);
                else {
                  if (
                    (void 0 === (i = a(e)) && (i = e),
                    i === p && (i = void 0),
                    this.autoFreeze_ && y(i, !0),
                    t)
                  ) {
                    let a = [],
                      p = [];
                    T("Patches").generateReplacementPatches_(e, i, a, p),
                      t(a, p);
                  }
                  return i;
                }
              }),
              (this.produceWithPatches = (e, a) => {
                let t, i;
                if ("function" == typeof e)
                  return (a, ...t) =>
                    this.produceWithPatches(a, (a) => e(a, ...t));
                let p = this.produce(e, a, (e, a) => {
                  (t = e), (i = a);
                });
                return [p, t, i];
              }),
              "boolean" == typeof e?.autoFreeze &&
                this.setAutoFreeze(e.autoFreeze),
              "boolean" == typeof e?.useStrictShallowCopy &&
                this.setUseStrictShallowCopy(e.useStrictShallowCopy);
          }
          createDraft(e) {
            var a;
            l(e) || r(8),
              d(e) &&
                (d((a = e)) || r(10, a),
                (e = (function e(a) {
                  let t;
                  if (!l(a) || S(a)) return a;
                  let i = a[o];
                  if (i) {
                    if (!i.modified_) return i.base_;
                    (i.finalized_ = !0),
                      (t = _(a, i.scope_.immer_.useStrictShallowCopy_));
                  } else t = _(a, !0);
                  return (
                    m(t, (a, i) => {
                      h(t, a, e(i));
                    }),
                    i && (i.finalized_ = !1),
                    t
                  );
                })(a)));
            let t = P(this),
              i = F(e, void 0);
            return (i[o].isManual_ = !0), O(t), i;
          }
          finishDraft(e, a) {
            let t = e && e[o];
            (t && t.isManual_) || r(9);
            let { scope_: i } = t;
            return N(i, a), D(void 0, i);
          }
          setAutoFreeze(e) {
            this.autoFreeze_ = e;
          }
          setUseStrictShallowCopy(e) {
            this.useStrictShallowCopy_ = e;
          }
          applyPatches(e, a) {
            let t;
            for (t = a.length - 1; t >= 0; t--) {
              let i = a[t];
              if (0 === i.path.length && "replace" === i.op) {
                e = i.value;
                break;
              }
            }
            t > -1 && (a = a.slice(t + 1));
            let i = T("Patches").applyPatches_;
            return d(e) ? i(e, a) : this.produce(e, (e) => i(e, a));
          }
        })(),
        z = q.produce;
      q.produceWithPatches.bind(q),
        q.setAutoFreeze.bind(q),
        q.setUseStrictShallowCopy.bind(q),
        q.applyPatches.bind(q),
        q.createDraft.bind(q),
        q.finishDraft.bind(q);
    },
    7962: (e, a, t) => {
      let i;
      t.r(a),
        t.d(a, {
          FetchError: () => m,
          Headers: () => Headers,
          Request: () => Request,
          Response: () => Response,
          default: () => $,
        });
      var p = t(2781),
        n = t(3685),
        o = t(7310),
        r = t(9854),
        s = t(5687),
        d = t(9796);
      let l = p.Readable,
        c = Symbol("buffer"),
        u = Symbol("type");
      class Blob {
        constructor() {
          this[u] = "";
          let e = arguments[0],
            a = arguments[1],
            t = [];
          if (e) {
            let a = Number(e.length);
            for (let i = 0; i < a; i++) {
              let a;
              let p = e[i];
              (a =
                p instanceof Buffer
                  ? p
                  : ArrayBuffer.isView(p)
                    ? Buffer.from(p.buffer, p.byteOffset, p.byteLength)
                    : p instanceof ArrayBuffer
                      ? Buffer.from(p)
                      : p instanceof Blob
                        ? p[c]
                        : Buffer.from("string" == typeof p ? p : String(p)))
                .length,
                t.push(a);
            }
          }
          this[c] = Buffer.concat(t);
          let i = a && void 0 !== a.type && String(a.type).toLowerCase();
          i && !/[^\u0020-\u007E]/.test(i) && (this[u] = i);
        }
        get size() {
          return this[c].length;
        }
        get type() {
          return this[u];
        }
        text() {
          return Promise.resolve(this[c].toString());
        }
        arrayBuffer() {
          let e = this[c],
            a = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
          return Promise.resolve(a);
        }
        stream() {
          let e = new l();
          return (e._read = function () {}), e.push(this[c]), e.push(null), e;
        }
        toString() {
          return "[object Blob]";
        }
        slice() {
          let e, a;
          let t = this.size,
            i = arguments[0],
            p = arguments[1];
          (e = void 0 === i ? 0 : i < 0 ? Math.max(t + i, 0) : Math.min(i, t)),
            (a =
              void 0 === p ? t : p < 0 ? Math.max(t + p, 0) : Math.min(p, t));
          let n = Math.max(a - e, 0),
            o = this[c],
            r = o.slice(e, e + n),
            s = new Blob([], { type: arguments[2] });
          return (s[c] = r), s;
        }
      }
      function m(e, a, t) {
        Error.call(this, e),
          (this.message = e),
          (this.type = a),
          t && (this.code = this.errno = t.code),
          Error.captureStackTrace(this, this.constructor);
      }
      Object.defineProperties(Blob.prototype, {
        size: { enumerable: !0 },
        type: { enumerable: !0 },
        slice: { enumerable: !0 },
      }),
        Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
          value: "Blob",
          writable: !1,
          enumerable: !1,
          configurable: !0,
        }),
        (m.prototype = Object.create(Error.prototype)),
        (m.prototype.constructor = m),
        (m.prototype.name = "FetchError");
      try {
        i = require("encoding").convert;
      } catch (e) {}
      let f = Symbol("Body internals"),
        v = p.PassThrough;
      function h(e) {
        var a = this,
          t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = t.size,
          n = t.timeout;
        null == e
          ? (e = null)
          : b(e)
            ? (e = Buffer.from(e.toString()))
            : x(e) ||
              Buffer.isBuffer(e) ||
              ("[object ArrayBuffer]" === Object.prototype.toString.call(e)
                ? (e = Buffer.from(e))
                : ArrayBuffer.isView(e)
                  ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
                  : e instanceof p || (e = Buffer.from(String(e)))),
          (this[f] = { body: e, disturbed: !1, error: null }),
          (this.size = void 0 === i ? 0 : i),
          (this.timeout = void 0 === n ? 0 : n),
          e instanceof p &&
            e.on("error", function (e) {
              let t =
                "AbortError" === e.name
                  ? e
                  : new m(
                      `Invalid response body while trying to fetch ${a.url}: ${e.message}`,
                      "system",
                      e,
                    );
              a[f].error = t;
            });
      }
      function g() {
        var e = this;
        if (this[f].disturbed)
          return h.Promise.reject(
            TypeError(`body used already for: ${this.url}`),
          );
        if (((this[f].disturbed = !0), this[f].error))
          return h.Promise.reject(this[f].error);
        let a = this.body;
        if (null === a) return h.Promise.resolve(Buffer.alloc(0));
        if ((x(a) && (a = a.stream()), Buffer.isBuffer(a)))
          return h.Promise.resolve(a);
        if (!(a instanceof p)) return h.Promise.resolve(Buffer.alloc(0));
        let t = [],
          i = 0,
          n = !1;
        return new h.Promise(function (p, o) {
          let r;
          e.timeout &&
            (r = setTimeout(function () {
              (n = !0),
                o(
                  new m(
                    `Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,
                    "body-timeout",
                  ),
                );
            }, e.timeout)),
            a.on("error", function (a) {
              "AbortError" === a.name
                ? ((n = !0), o(a))
                : o(
                    new m(
                      `Invalid response body while trying to fetch ${e.url}: ${a.message}`,
                      "system",
                      a,
                    ),
                  );
            }),
            a.on("data", function (a) {
              if (!n && null !== a) {
                if (e.size && i + a.length > e.size) {
                  (n = !0),
                    o(
                      new m(
                        `content size at ${e.url} over limit: ${e.size}`,
                        "max-size",
                      ),
                    );
                  return;
                }
                (i += a.length), t.push(a);
              }
            }),
            a.on("end", function () {
              if (!n) {
                clearTimeout(r);
                try {
                  p(Buffer.concat(t, i));
                } catch (a) {
                  o(
                    new m(
                      `Could not create Buffer from response body for ${e.url}: ${a.message}`,
                      "system",
                      a,
                    ),
                  );
                }
              }
            });
        });
      }
      function b(e) {
        return (
          "object" == typeof e &&
          "function" == typeof e.append &&
          "function" == typeof e.delete &&
          "function" == typeof e.get &&
          "function" == typeof e.getAll &&
          "function" == typeof e.has &&
          "function" == typeof e.set &&
          ("URLSearchParams" === e.constructor.name ||
            "[object URLSearchParams]" === Object.prototype.toString.call(e) ||
            "function" == typeof e.sort)
        );
      }
      function x(e) {
        return (
          "object" == typeof e &&
          "function" == typeof e.arrayBuffer &&
          "string" == typeof e.type &&
          "function" == typeof e.stream &&
          "function" == typeof e.constructor &&
          "string" == typeof e.constructor.name &&
          /^(Blob|File)$/.test(e.constructor.name) &&
          /^(Blob|File)$/.test(e[Symbol.toStringTag])
        );
      }
      function _(e) {
        let a, t;
        let i = e.body;
        if (e.bodyUsed) throw Error("cannot clone body after it is used");
        return (
          i instanceof p &&
            "function" != typeof i.getBoundary &&
            ((a = new v()),
            (t = new v()),
            i.pipe(a),
            i.pipe(t),
            (e[f].body = a),
            (i = t)),
          i
        );
      }
      function y(e) {
        if (null === e) return null;
        if ("string" == typeof e) return "text/plain;charset=UTF-8";
        if (b(e)) return "application/x-www-form-urlencoded;charset=UTF-8";
        if (x(e)) return e.type || null;
        if (Buffer.isBuffer(e)) return null;
        if ("[object ArrayBuffer]" === Object.prototype.toString.call(e))
          return null;
        if (ArrayBuffer.isView(e)) return null;
        else if ("function" == typeof e.getBoundary)
          return `multipart/form-data;boundary=${e.getBoundary()}`;
        else if (e instanceof p) return null;
        else return "text/plain;charset=UTF-8";
      }
      function w(e) {
        let a = e.body;
        return null === a
          ? 0
          : x(a)
            ? a.size
            : Buffer.isBuffer(a)
              ? a.length
              : a &&
                  "function" == typeof a.getLengthSync &&
                  ((a._lengthRetrievers && 0 == a._lengthRetrievers.length) ||
                    (a.hasKnownLength && a.hasKnownLength()))
                ? a.getLengthSync()
                : null;
      }
      (h.prototype = {
        get body() {
          return this[f].body;
        },
        get bodyUsed() {
          return this[f].disturbed;
        },
        arrayBuffer() {
          return g.call(this).then(function (e) {
            return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
          });
        },
        blob() {
          let e = (this.headers && this.headers.get("content-type")) || "";
          return g.call(this).then(function (a) {
            return Object.assign(new Blob([], { type: e.toLowerCase() }), {
              [c]: a,
            });
          });
        },
        json() {
          var e = this;
          return g.call(this).then(function (a) {
            try {
              return JSON.parse(a.toString());
            } catch (a) {
              return h.Promise.reject(
                new m(
                  `invalid json response body at ${e.url} reason: ${a.message}`,
                  "invalid-json",
                ),
              );
            }
          });
        },
        text() {
          return g.call(this).then(function (e) {
            return e.toString();
          });
        },
        buffer() {
          return g.call(this);
        },
        textConverted() {
          var e = this;
          return g.call(this).then(function (a) {
            return (function (e, a) {
              let t, p;
              if ("function" != typeof i)
                throw Error(
                  "The package `encoding` must be installed to use the textConverted() function",
                );
              let n = a.get("content-type"),
                o = "utf-8";
              return (
                n && (t = /charset=([^;]*)/i.exec(n)),
                (p = e.slice(0, 1024).toString()),
                !t && p && (t = /<meta.+?charset=(['"])(.+?)\1/i.exec(p)),
                !t &&
                  p &&
                  (!(t =
                    /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(
                      p,
                    )) &&
                    (t =
                      /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(
                        p,
                      )) &&
                    t.pop(),
                  t && (t = /charset=(.*)/i.exec(t.pop()))),
                !t && p && (t = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(p)),
                t &&
                  ("gb2312" === (o = t.pop()) || "gbk" === o) &&
                  (o = "gb18030"),
                i(e, "UTF-8", o).toString()
              );
            })(a, e.headers);
          });
        },
      }),
        Object.defineProperties(h.prototype, {
          body: { enumerable: !0 },
          bodyUsed: { enumerable: !0 },
          arrayBuffer: { enumerable: !0 },
          blob: { enumerable: !0 },
          json: { enumerable: !0 },
          text: { enumerable: !0 },
        }),
        (h.mixIn = function (e) {
          for (let a of Object.getOwnPropertyNames(h.prototype))
            if (!(a in e)) {
              let t = Object.getOwnPropertyDescriptor(h.prototype, a);
              Object.defineProperty(e, a, t);
            }
        }),
        (h.Promise = global.Promise);
      let S = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
        E = /[^\t\x20-\x7e\x80-\xff]/;
      function T(e) {
        if (((e = `${e}`), S.test(e) || "" === e))
          throw TypeError(`${e} is not a legal HTTP header name`);
      }
      function N(e) {
        if (((e = `${e}`), E.test(e)))
          throw TypeError(`${e} is not a legal HTTP header value`);
      }
      function R(e, a) {
        for (let t in ((a = a.toLowerCase()), e))
          if (t.toLowerCase() === a) return t;
      }
      let O = Symbol("map");
      class Headers {
        constructor() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : void 0;
          if (((this[O] = Object.create(null)), e instanceof Headers)) {
            let a = e.raw(),
              t = Object.keys(a);
            for (let e of t) for (let t of a[e]) this.append(e, t);
            return;
          }
          if (null == e);
          else if ("object" == typeof e) {
            let a = e[Symbol.iterator];
            if (null != a) {
              if ("function" != typeof a)
                throw TypeError("Header pairs must be iterable");
              let t = [];
              for (let a of e) {
                if (
                  "object" != typeof a ||
                  "function" != typeof a[Symbol.iterator]
                )
                  throw TypeError("Each header pair must be iterable");
                t.push(Array.from(a));
              }
              for (let e of t) {
                if (2 !== e.length)
                  throw TypeError(
                    "Each header pair must be a name/value tuple",
                  );
                this.append(e[0], e[1]);
              }
            } else
              for (let a of Object.keys(e)) {
                let t = e[a];
                this.append(a, t);
              }
          } else throw TypeError("Provided initializer must be an object");
        }
        get(e) {
          T((e = `${e}`));
          let a = R(this[O], e);
          return void 0 === a ? null : this[O][a].join(", ");
        }
        forEach(e) {
          let a =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : void 0,
            t = P(this),
            i = 0;
          for (; i < t.length; ) {
            var p = t[i];
            let n = p[0],
              o = p[1];
            e.call(a, o, n, this), (t = P(this)), i++;
          }
        }
        set(e, a) {
          (e = `${e}`), (a = `${a}`), T(e), N(a);
          let t = R(this[O], e);
          this[O][void 0 !== t ? t : e] = [a];
        }
        append(e, a) {
          (e = `${e}`), (a = `${a}`), T(e), N(a);
          let t = R(this[O], e);
          void 0 !== t ? this[O][t].push(a) : (this[O][e] = [a]);
        }
        has(e) {
          return T((e = `${e}`)), void 0 !== R(this[O], e);
        }
        delete(e) {
          T((e = `${e}`));
          let a = R(this[O], e);
          void 0 !== a && delete this[O][a];
        }
        raw() {
          return this[O];
        }
        keys() {
          return D(this, "key");
        }
        values() {
          return D(this, "value");
        }
        [Symbol.iterator]() {
          return D(this, "key+value");
        }
      }
      function P(e) {
        let a =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "key+value",
          t = Object.keys(e[O]).sort();
        return t.map(
          "key" === a
            ? function (e) {
                return e.toLowerCase();
              }
            : "value" === a
              ? function (a) {
                  return e[O][a].join(", ");
                }
              : function (a) {
                  return [a.toLowerCase(), e[O][a].join(", ")];
                },
        );
      }
      (Headers.prototype.entries = Headers.prototype[Symbol.iterator]),
        Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
          value: "Headers",
          writable: !1,
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperties(Headers.prototype, {
          get: { enumerable: !0 },
          forEach: { enumerable: !0 },
          set: { enumerable: !0 },
          append: { enumerable: !0 },
          has: { enumerable: !0 },
          delete: { enumerable: !0 },
          keys: { enumerable: !0 },
          values: { enumerable: !0 },
          entries: { enumerable: !0 },
        });
      let j = Symbol("internal");
      function D(e, a) {
        let t = Object.create(A);
        return (t[j] = { target: e, kind: a, index: 0 }), t;
      }
      let A = Object.setPrototypeOf(
        {
          next() {
            if (!this || Object.getPrototypeOf(this) !== A)
              throw TypeError("Value of `this` is not a HeadersIterator");
            var e = this[j];
            let a = e.target,
              t = e.kind,
              i = e.index,
              p = P(a, t),
              n = p.length;
            return i >= n
              ? { value: void 0, done: !0 }
              : ((this[j].index = i + 1), { value: p[i], done: !1 });
          },
        },
        Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())),
      );
      Object.defineProperty(A, Symbol.toStringTag, {
        value: "HeadersIterator",
        writable: !1,
        enumerable: !1,
        configurable: !0,
      });
      let C = Symbol("Response internals"),
        M = n.STATUS_CODES;
      class Response {
        constructor() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null,
            a =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          h.call(this, e, a);
          let t = a.status || 200,
            i = new Headers(a.headers);
          if (null != e && !i.has("Content-Type")) {
            let a = y(e);
            a && i.append("Content-Type", a);
          }
          this[C] = {
            url: a.url,
            status: t,
            statusText: a.statusText || M[t],
            headers: i,
            counter: a.counter,
          };
        }
        get url() {
          return this[C].url || "";
        }
        get status() {
          return this[C].status;
        }
        get ok() {
          return this[C].status >= 200 && this[C].status < 300;
        }
        get redirected() {
          return this[C].counter > 0;
        }
        get statusText() {
          return this[C].statusText;
        }
        get headers() {
          return this[C].headers;
        }
        clone() {
          return new Response(_(this), {
            url: this.url,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            ok: this.ok,
            redirected: this.redirected,
          });
        }
      }
      h.mixIn(Response.prototype),
        Object.defineProperties(Response.prototype, {
          url: { enumerable: !0 },
          status: { enumerable: !0 },
          ok: { enumerable: !0 },
          redirected: { enumerable: !0 },
          statusText: { enumerable: !0 },
          headers: { enumerable: !0 },
          clone: { enumerable: !0 },
        }),
        Object.defineProperty(Response.prototype, Symbol.toStringTag, {
          value: "Response",
          writable: !1,
          enumerable: !1,
          configurable: !0,
        });
      let I = Symbol("Request internals"),
        URL = o.URL || r.URL,
        k = o.parse,
        V = o.format;
      function L(e) {
        return (
          /^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(e) && (e = new URL(e).toString()),
          k(e)
        );
      }
      let U = "destroy" in p.Readable.prototype;
      function B(e) {
        return "object" == typeof e && "object" == typeof e[I];
      }
      class Request {
        constructor(e) {
          let a,
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          B(e)
            ? (a = L(e.url))
            : ((a = e && e.href ? L(e.href) : L(`${e}`)), (e = {}));
          let i = t.method || e.method || "GET";
          if (
            ((i = i.toUpperCase()),
            (null != t.body || (B(e) && null !== e.body)) &&
              ("GET" === i || "HEAD" === i))
          )
            throw TypeError("Request with GET/HEAD method cannot have body");
          let p =
            null != t.body ? t.body : B(e) && null !== e.body ? _(e) : null;
          h.call(this, p, {
            timeout: t.timeout || e.timeout || 0,
            size: t.size || e.size || 0,
          });
          let n = new Headers(t.headers || e.headers || {});
          if (null != p && !n.has("Content-Type")) {
            let e = y(p);
            e && n.append("Content-Type", e);
          }
          let o = B(e) ? e.signal : null;
          if (
            ("signal" in t && (o = t.signal),
            null != o &&
              !(function (e) {
                let a = e && "object" == typeof e && Object.getPrototypeOf(e);
                return !!(a && "AbortSignal" === a.constructor.name);
              })(o))
          )
            throw TypeError("Expected signal to be an instanceof AbortSignal");
          (this[I] = {
            method: i,
            redirect: t.redirect || e.redirect || "follow",
            headers: n,
            parsedURL: a,
            signal: o,
          }),
            (this.follow =
              void 0 !== t.follow
                ? t.follow
                : void 0 !== e.follow
                  ? e.follow
                  : 20),
            (this.compress =
              void 0 !== t.compress
                ? t.compress
                : void 0 === e.compress || e.compress),
            (this.counter = t.counter || e.counter || 0),
            (this.agent = t.agent || e.agent);
        }
        get method() {
          return this[I].method;
        }
        get url() {
          return V(this[I].parsedURL);
        }
        get headers() {
          return this[I].headers;
        }
        get redirect() {
          return this[I].redirect;
        }
        get signal() {
          return this[I].signal;
        }
        clone() {
          return new Request(this);
        }
      }
      function F(e) {
        Error.call(this, e),
          (this.type = "aborted"),
          (this.message = e),
          Error.captureStackTrace(this, this.constructor);
      }
      h.mixIn(Request.prototype),
        Object.defineProperty(Request.prototype, Symbol.toStringTag, {
          value: "Request",
          writable: !1,
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperties(Request.prototype, {
          method: { enumerable: !0 },
          url: { enumerable: !0 },
          headers: { enumerable: !0 },
          redirect: { enumerable: !0 },
          clone: { enumerable: !0 },
          signal: { enumerable: !0 },
        }),
        (F.prototype = Object.create(Error.prototype)),
        (F.prototype.constructor = F),
        (F.prototype.name = "AbortError");
      let q = o.URL || r.URL,
        z = p.PassThrough,
        H = function (e, a) {
          let t = new q(a).hostname,
            i = new q(e).hostname;
          return (
            t === i || ("." === t[t.length - i.length - 1] && t.endsWith(i))
          );
        };
      function G(e, a) {
        if (!G.Promise)
          throw Error(
            "native promise missing, set fetch.Promise to your favorite alternative",
          );
        return (
          (h.Promise = G.Promise),
          new G.Promise(function (t, i) {
            let o;
            let r = new Request(e, a),
              l = (function (e) {
                let a = e[I].parsedURL,
                  t = new Headers(e[I].headers);
                if (
                  (t.has("Accept") || t.set("Accept", "*/*"),
                  !a.protocol || !a.hostname)
                )
                  throw TypeError("Only absolute URLs are supported");
                if (!/^https?:$/.test(a.protocol))
                  throw TypeError("Only HTTP(S) protocols are supported");
                if (e.signal && e.body instanceof p.Readable && !U)
                  throw Error(
                    "Cancellation of streamed requests with AbortSignal is not supported in node < 8",
                  );
                let i = null;
                if (
                  (null == e.body &&
                    /^(POST|PUT)$/i.test(e.method) &&
                    (i = "0"),
                  null != e.body)
                ) {
                  let a = w(e);
                  "number" == typeof a && (i = String(a));
                }
                i && t.set("Content-Length", i),
                  t.has("User-Agent") ||
                    t.set(
                      "User-Agent",
                      "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
                    ),
                  e.compress &&
                    !t.has("Accept-Encoding") &&
                    t.set("Accept-Encoding", "gzip,deflate");
                let n = e.agent;
                return (
                  "function" == typeof n && (n = n(a)),
                  t.has("Connection") || n || t.set("Connection", "close"),
                  Object.assign({}, a, {
                    method: e.method,
                    headers: (function (e) {
                      let a = Object.assign({ __proto__: null }, e[O]),
                        t = R(e[O], "Host");
                      return void 0 !== t && (a[t] = a[t][0]), a;
                    })(t),
                    agent: n,
                  })
                );
              })(r),
              c = ("https:" === l.protocol ? s : n).request,
              u = r.signal,
              f = null,
              v = function () {
                let e = new F("The user aborted a request.");
                i(e),
                  r.body && r.body instanceof p.Readable && r.body.destroy(e),
                  f && f.body && f.body.emit("error", e);
              };
            if (u && u.aborted) {
              v();
              return;
            }
            let h = function () {
                v(), b();
              },
              g = c(l);
            function b() {
              g.abort(),
                u && u.removeEventListener("abort", h),
                clearTimeout(o);
            }
            u && u.addEventListener("abort", h),
              r.timeout &&
                g.once("socket", function (e) {
                  o = setTimeout(function () {
                    i(new m(`network timeout at: ${r.url}`, "request-timeout")),
                      b();
                  }, r.timeout);
                }),
              g.on("error", function (e) {
                i(
                  new m(
                    `request to ${r.url} failed, reason: ${e.message}`,
                    "system",
                    e,
                  ),
                ),
                  b();
              }),
              g.on("response", function (e) {
                clearTimeout(o);
                let a = (function (e) {
                  let a = new Headers();
                  for (let t of Object.keys(e))
                    if (!S.test(t)) {
                      if (Array.isArray(e[t]))
                        for (let i of e[t])
                          E.test(i) ||
                            (void 0 === a[O][t]
                              ? (a[O][t] = [i])
                              : a[O][t].push(i));
                      else E.test(e[t]) || (a[O][t] = [e[t]]);
                    }
                  return a;
                })(e.headers);
                if (G.isRedirect(e.statusCode)) {
                  let p = a.get("Location"),
                    n = null;
                  try {
                    n = null === p ? null : new q(p, r.url).toString();
                  } catch (e) {
                    if ("manual" !== r.redirect) {
                      i(
                        new m(
                          `uri requested responds with an invalid redirect URL: ${p}`,
                          "invalid-redirect",
                        ),
                      ),
                        b();
                      return;
                    }
                  }
                  switch (r.redirect) {
                    case "error":
                      i(
                        new m(
                          `uri requested responds with a redirect, redirect mode is set to error: ${r.url}`,
                          "no-redirect",
                        ),
                      ),
                        b();
                      return;
                    case "manual":
                      if (null !== n)
                        try {
                          a.set("Location", n);
                        } catch (e) {
                          i(e);
                        }
                      break;
                    case "follow":
                      if (null === n) break;
                      if (r.counter >= r.follow) {
                        i(
                          new m(
                            `maximum redirect reached at: ${r.url}`,
                            "max-redirect",
                          ),
                        ),
                          b();
                        return;
                      }
                      let o = {
                        headers: new Headers(r.headers),
                        follow: r.follow,
                        counter: r.counter + 1,
                        agent: r.agent,
                        compress: r.compress,
                        method: r.method,
                        body: r.body,
                        signal: r.signal,
                        timeout: r.timeout,
                        size: r.size,
                      };
                      if (!H(r.url, n))
                        for (let e of [
                          "authorization",
                          "www-authenticate",
                          "cookie",
                          "cookie2",
                        ])
                          o.headers.delete(e);
                      if (303 !== e.statusCode && r.body && null === w(r)) {
                        i(
                          new m(
                            "Cannot follow redirect with body being a readable stream",
                            "unsupported-redirect",
                          ),
                        ),
                          b();
                        return;
                      }
                      (303 === e.statusCode ||
                        ((301 === e.statusCode || 302 === e.statusCode) &&
                          "POST" === r.method)) &&
                        ((o.method = "GET"),
                        (o.body = void 0),
                        o.headers.delete("content-length")),
                        t(G(new Request(n, o))),
                        b();
                      return;
                  }
                }
                e.once("end", function () {
                  u && u.removeEventListener("abort", h);
                });
                let p = e.pipe(new z()),
                  n = {
                    url: r.url,
                    status: e.statusCode,
                    statusText: e.statusMessage,
                    headers: a,
                    size: r.size,
                    timeout: r.timeout,
                    counter: r.counter,
                  },
                  s = a.get("Content-Encoding");
                if (
                  !r.compress ||
                  "HEAD" === r.method ||
                  null === s ||
                  204 === e.statusCode ||
                  304 === e.statusCode
                ) {
                  t((f = new Response(p, n)));
                  return;
                }
                let l = { flush: d.Z_SYNC_FLUSH, finishFlush: d.Z_SYNC_FLUSH };
                if ("gzip" == s || "x-gzip" == s) {
                  t((f = new Response((p = p.pipe(d.createGunzip(l))), n)));
                  return;
                }
                if ("deflate" == s || "x-deflate" == s) {
                  let a = e.pipe(new z());
                  a.once("data", function (e) {
                    t(
                      (f = new Response(
                        (p =
                          (15 & e[0]) == 8
                            ? p.pipe(d.createInflate())
                            : p.pipe(d.createInflateRaw())),
                        n,
                      )),
                    );
                  });
                  return;
                }
                if (
                  "br" == s &&
                  "function" == typeof d.createBrotliDecompress
                ) {
                  t(
                    (f = new Response(
                      (p = p.pipe(d.createBrotliDecompress())),
                      n,
                    )),
                  );
                  return;
                }
                t((f = new Response(p, n)));
              }),
              (function (e, a) {
                let t = a.body;
                null === t
                  ? e.end()
                  : x(t)
                    ? t.stream().pipe(e)
                    : Buffer.isBuffer(t)
                      ? (e.write(t), e.end())
                      : t.pipe(e);
              })(g, r);
          })
        );
      }
      (G.isRedirect = function (e) {
        return 301 === e || 302 === e || 303 === e || 307 === e || 308 === e;
      }),
        (G.Promise = global.Promise);
      let $ = G;
    },
    4012: (e, a, t) => {
      t.d(a, { Ue: () => c });
      let i = (e) => {
          let a;
          let t = new Set(),
            i = (e, i) => {
              let p = "function" == typeof e ? e(a) : e;
              if (!Object.is(p, a)) {
                let e = a;
                (a = (null != i ? i : "object" != typeof p)
                  ? p
                  : Object.assign({}, a, p)),
                  t.forEach((t) => t(a, e));
              }
            },
            p = () => a,
            n = {
              setState: i,
              getState: p,
              subscribe: (e) => (t.add(e), () => t.delete(e)),
              destroy: () => {
                console.warn(
                  "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
                ),
                  t.clear();
              },
            };
          return (a = e(i, p, n)), n;
        },
        p = (e) => (e ? i(e) : i);
      var n = t(4218),
        o = t(7359);
      let { useDebugValue: r } = n,
        { useSyncExternalStoreWithSelector: s } = o,
        d = !1,
        l = (e) => {
          "function" != typeof e &&
            console.warn(
              "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
            );
          let a = "function" == typeof e ? p(e) : e,
            t = (e, t) =>
              (function (e, a = e.getState, t) {
                t &&
                  !d &&
                  (console.warn(
                    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
                  ),
                  (d = !0));
                let i = s(
                  e.subscribe,
                  e.getState,
                  e.getServerState || e.getState,
                  a,
                  t,
                );
                return r(i), i;
              })(a, e, t);
          return Object.assign(t, a), t;
        },
        c = (e) => (e ? l(e) : l);
    },
    5196: (e, a, t) => {
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.r(a), t.d(a, { _: () => i, _interop_require_default: () => i });
    },
    572: (e) => {
      e.exports = JSON.parse(
        '{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}',
      );
    },
    1841: (e) => {
      e.exports = JSON.parse(
        '[[[0,44],"disallowed_STD3_valid"],[[45,46],"valid"],[[47,47],"disallowed_STD3_valid"],[[48,57],"valid"],[[58,64],"disallowed_STD3_valid"],[[65,65],"mapped",[97]],[[66,66],"mapped",[98]],[[67,67],"mapped",[99]],[[68,68],"mapped",[100]],[[69,69],"mapped",[101]],[[70,70],"mapped",[102]],[[71,71],"mapped",[103]],[[72,72],"mapped",[104]],[[73,73],"mapped",[105]],[[74,74],"mapped",[106]],[[75,75],"mapped",[107]],[[76,76],"mapped",[108]],[[77,77],"mapped",[109]],[[78,78],"mapped",[110]],[[79,79],"mapped",[111]],[[80,80],"mapped",[112]],[[81,81],"mapped",[113]],[[82,82],"mapped",[114]],[[83,83],"mapped",[115]],[[84,84],"mapped",[116]],[[85,85],"mapped",[117]],[[86,86],"mapped",[118]],[[87,87],"mapped",[119]],[[88,88],"mapped",[120]],[[89,89],"mapped",[121]],[[90,90],"mapped",[122]],[[91,96],"disallowed_STD3_valid"],[[97,122],"valid"],[[123,127],"disallowed_STD3_valid"],[[128,159],"disallowed"],[[160,160],"disallowed_STD3_mapped",[32]],[[161,167],"valid",[],"NV8"],[[168,168],"disallowed_STD3_mapped",[32,776]],[[169,169],"valid",[],"NV8"],[[170,170],"mapped",[97]],[[171,172],"valid",[],"NV8"],[[173,173],"ignored"],[[174,174],"valid",[],"NV8"],[[175,175],"disallowed_STD3_mapped",[32,772]],[[176,177],"valid",[],"NV8"],[[178,178],"mapped",[50]],[[179,179],"mapped",[51]],[[180,180],"disallowed_STD3_mapped",[32,769]],[[181,181],"mapped",[956]],[[182,182],"valid",[],"NV8"],[[183,183],"valid"],[[184,184],"disallowed_STD3_mapped",[32,807]],[[185,185],"mapped",[49]],[[186,186],"mapped",[111]],[[187,187],"valid",[],"NV8"],[[188,188],"mapped",[49,8260,52]],[[189,189],"mapped",[49,8260,50]],[[190,190],"mapped",[51,8260,52]],[[191,191],"valid",[],"NV8"],[[192,192],"mapped",[224]],[[193,193],"mapped",[225]],[[194,194],"mapped",[226]],[[195,195],"mapped",[227]],[[196,196],"mapped",[228]],[[197,197],"mapped",[229]],[[198,198],"mapped",[230]],[[199,199],"mapped",[231]],[[200,200],"mapped",[232]],[[201,201],"mapped",[233]],[[202,202],"mapped",[234]],[[203,203],"mapped",[235]],[[204,204],"mapped",[236]],[[205,205],"mapped",[237]],[[206,206],"mapped",[238]],[[207,207],"mapped",[239]],[[208,208],"mapped",[240]],[[209,209],"mapped",[241]],[[210,210],"mapped",[242]],[[211,211],"mapped",[243]],[[212,212],"mapped",[244]],[[213,213],"mapped",[245]],[[214,214],"mapped",[246]],[[215,215],"valid",[],"NV8"],[[216,216],"mapped",[248]],[[217,217],"mapped",[249]],[[218,218],"mapped",[250]],[[219,219],"mapped",[251]],[[220,220],"mapped",[252]],[[221,221],"mapped",[253]],[[222,222],"mapped",[254]],[[223,223],"deviation",[115,115]],[[224,246],"valid"],[[247,247],"valid",[],"NV8"],[[248,255],"valid"],[[256,256],"mapped",[257]],[[257,257],"valid"],[[258,258],"mapped",[259]],[[259,259],"valid"],[[260,260],"mapped",[261]],[[261,261],"valid"],[[262,262],"mapped",[263]],[[263,263],"valid"],[[264,264],"mapped",[265]],[[265,265],"valid"],[[266,266],"mapped",[267]],[[267,267],"valid"],[[268,268],"mapped",[269]],[[269,269],"valid"],[[270,270],"mapped",[271]],[[271,271],"valid"],[[272,272],"mapped",[273]],[[273,273],"valid"],[[274,274],"mapped",[275]],[[275,275],"valid"],[[276,276],"mapped",[277]],[[277,277],"valid"],[[278,278],"mapped",[279]],[[279,279],"valid"],[[280,280],"mapped",[281]],[[281,281],"valid"],[[282,282],"mapped",[283]],[[283,283],"valid"],[[284,284],"mapped",[285]],[[285,285],"valid"],[[286,286],"mapped",[287]],[[287,287],"valid"],[[288,288],"mapped",[289]],[[289,289],"valid"],[[290,290],"mapped",[291]],[[291,291],"valid"],[[292,292],"mapped",[293]],[[293,293],"valid"],[[294,294],"mapped",[295]],[[295,295],"valid"],[[296,296],"mapped",[297]],[[297,297],"valid"],[[298,298],"mapped",[299]],[[299,299],"valid"],[[300,300],"mapped",[301]],[[301,301],"valid"],[[302,302],"mapped",[303]],[[303,303],"valid"],[[304,304],"mapped",[105,775]],[[305,305],"valid"],[[306,307],"mapped",[105,106]],[[308,308],"mapped",[309]],[[309,309],"valid"],[[310,310],"mapped",[311]],[[311,312],"valid"],[[313,313],"mapped",[314]],[[314,314],"valid"],[[315,315],"mapped",[316]],[[316,316],"valid"],[[317,317],"mapped",[318]],[[318,318],"valid"],[[319,320],"mapped",[108,183]],[[321,321],"mapped",[322]],[[322,322],"valid"],[[323,323],"mapped",[324]],[[324,324],"valid"],[[325,325],"mapped",[326]],[[326,326],"valid"],[[327,327],"mapped",[328]],[[328,328],"valid"],[[329,329],"mapped",[700,110]],[[330,330],"mapped",[331]],[[331,331],"valid"],[[332,332],"mapped",[333]],[[333,333],"valid"],[[334,334],"mapped",[335]],[[335,335],"valid"],[[336,336],"mapped",[337]],[[337,337],"valid"],[[338,338],"mapped",[339]],[[339,339],"valid"],[[340,340],"mapped",[341]],[[341,341],"valid"],[[342,342],"mapped",[343]],[[343,343],"valid"],[[344,344],"mapped",[345]],[[345,345],"valid"],[[346,346],"mapped",[347]],[[347,347],"valid"],[[348,348],"mapped",[349]],[[349,349],"valid"],[[350,350],"mapped",[351]],[[351,351],"valid"],[[352,352],"mapped",[353]],[[353,353],"valid"],[[354,354],"mapped",[355]],[[355,355],"valid"],[[356,356],"mapped",[357]],[[357,357],"valid"],[[358,358],"mapped",[359]],[[359,359],"valid"],[[360,360],"mapped",[361]],[[361,361],"valid"],[[362,362],"mapped",[363]],[[363,363],"valid"],[[364,364],"mapped",[365]],[[365,365],"valid"],[[366,366],"mapped",[367]],[[367,367],"valid"],[[368,368],"mapped",[369]],[[369,369],"valid"],[[370,370],"mapped",[371]],[[371,371],"valid"],[[372,372],"mapped",[373]],[[373,373],"valid"],[[374,374],"mapped",[375]],[[375,375],"valid"],[[376,376],"mapped",[255]],[[377,377],"mapped",[378]],[[378,378],"valid"],[[379,379],"mapped",[380]],[[380,380],"valid"],[[381,381],"mapped",[382]],[[382,382],"valid"],[[383,383],"mapped",[115]],[[384,384],"valid"],[[385,385],"mapped",[595]],[[386,386],"mapped",[387]],[[387,387],"valid"],[[388,388],"mapped",[389]],[[389,389],"valid"],[[390,390],"mapped",[596]],[[391,391],"mapped",[392]],[[392,392],"valid"],[[393,393],"mapped",[598]],[[394,394],"mapped",[599]],[[395,395],"mapped",[396]],[[396,397],"valid"],[[398,398],"mapped",[477]],[[399,399],"mapped",[601]],[[400,400],"mapped",[603]],[[401,401],"mapped",[402]],[[402,402],"valid"],[[403,403],"mapped",[608]],[[404,404],"mapped",[611]],[[405,405],"valid"],[[406,406],"mapped",[617]],[[407,407],"mapped",[616]],[[408,408],"mapped",[409]],[[409,411],"valid"],[[412,412],"mapped",[623]],[[413,413],"mapped",[626]],[[414,414],"valid"],[[415,415],"mapped",[629]],[[416,416],"mapped",[417]],[[417,417],"valid"],[[418,418],"mapped",[419]],[[419,419],"valid"],[[420,420],"mapped",[421]],[[421,421],"valid"],[[422,422],"mapped",[640]],[[423,423],"mapped",[424]],[[424,424],"valid"],[[425,425],"mapped",[643]],[[426,427],"valid"],[[428,428],"mapped",[429]],[[429,429],"valid"],[[430,430],"mapped",[648]],[[431,431],"mapped",[432]],[[432,432],"valid"],[[433,433],"mapped",[650]],[[434,434],"mapped",[651]],[[435,435],"mapped",[436]],[[436,436],"valid"],[[437,437],"mapped",[438]],[[438,438],"valid"],[[439,439],"mapped",[658]],[[440,440],"mapped",[441]],[[441,443],"valid"],[[444,444],"mapped",[445]],[[445,451],"valid"],[[452,454],"mapped",[100,382]],[[455,457],"mapped",[108,106]],[[458,460],"mapped",[110,106]],[[461,461],"mapped",[462]],[[462,462],"valid"],[[463,463],"mapped",[464]],[[464,464],"valid"],[[465,465],"mapped",[466]],[[466,466],"valid"],[[467,467],"mapped",[468]],[[468,468],"valid"],[[469,469],"mapped",[470]],[[470,470],"valid"],[[471,471],"mapped",[472]],[[472,472],"valid"],[[473,473],"mapped",[474]],[[474,474],"valid"],[[475,475],"mapped",[476]],[[476,477],"valid"],[[478,478],"mapped",[479]],[[479,479],"valid"],[[480,480],"mapped",[481]],[[481,481],"valid"],[[482,482],"mapped",[483]],[[483,483],"valid"],[[484,484],"mapped",[485]],[[485,485],"valid"],[[486,486],"mapped",[487]],[[487,487],"valid"],[[488,488],"mapped",[489]],[[489,489],"valid"],[[490,490],"mapped",[491]],[[491,491],"valid"],[[492,492],"mapped",[493]],[[493,493],"valid"],[[494,494],"mapped",[495]],[[495,496],"valid"],[[497,499],"mapped",[100,122]],[[500,500],"mapped",[501]],[[501,501],"valid"],[[502,502],"mapped",[405]],[[503,503],"mapped",[447]],[[504,504],"mapped",[505]],[[505,505],"valid"],[[506,506],"mapped",[507]],[[507,507],"valid"],[[508,508],"mapped",[509]],[[509,509],"valid"],[[510,510],"mapped",[511]],[[511,511],"valid"],[[512,512],"mapped",[513]],[[513,513],"valid"],[[514,514],"mapped",[515]],[[515,515],"valid"],[[516,516],"mapped",[517]],[[517,517],"valid"],[[518,518],"mapped",[519]],[[519,519],"valid"],[[520,520],"mapped",[521]],[[521,521],"valid"],[[522,522],"mapped",[523]],[[523,523],"valid"],[[524,524],"mapped",[525]],[[525,525],"valid"],[[526,526],"mapped",[527]],[[527,527],"valid"],[[528,528],"mapped",[529]],[[529,529],"valid"],[[530,530],"mapped",[531]],[[531,531],"valid"],[[532,532],"mapped",[533]],[[533,533],"valid"],[[534,534],"mapped",[535]],[[535,535],"valid"],[[536,536],"mapped",[537]],[[537,537],"valid"],[[538,538],"mapped",[539]],[[539,539],"valid"],[[540,540],"mapped",[541]],[[541,541],"valid"],[[542,542],"mapped",[543]],[[543,543],"valid"],[[544,544],"mapped",[414]],[[545,545],"valid"],[[546,546],"mapped",[547]],[[547,547],"valid"],[[548,548],"mapped",[549]],[[549,549],"valid"],[[550,550],"mapped",[551]],[[551,551],"valid"],[[552,552],"mapped",[553]],[[553,553],"valid"],[[554,554],"mapped",[555]],[[555,555],"valid"],[[556,556],"mapped",[557]],[[557,557],"valid"],[[558,558],"mapped",[559]],[[559,559],"valid"],[[560,560],"mapped",[561]],[[561,561],"valid"],[[562,562],"mapped",[563]],[[563,563],"valid"],[[564,566],"valid"],[[567,569],"valid"],[[570,570],"mapped",[11365]],[[571,571],"mapped",[572]],[[572,572],"valid"],[[573,573],"mapped",[410]],[[574,574],"mapped",[11366]],[[575,576],"valid"],[[577,577],"mapped",[578]],[[578,578],"valid"],[[579,579],"mapped",[384]],[[580,580],"mapped",[649]],[[581,581],"mapped",[652]],[[582,582],"mapped",[583]],[[583,583],"valid"],[[584,584],"mapped",[585]],[[585,585],"valid"],[[586,586],"mapped",[587]],[[587,587],"valid"],[[588,588],"mapped",[589]],[[589,589],"valid"],[[590,590],"mapped",[591]],[[591,591],"valid"],[[592,680],"valid"],[[681,685],"valid"],[[686,687],"valid"],[[688,688],"mapped",[104]],[[689,689],"mapped",[614]],[[690,690],"mapped",[106]],[[691,691],"mapped",[114]],[[692,692],"mapped",[633]],[[693,693],"mapped",[635]],[[694,694],"mapped",[641]],[[695,695],"mapped",[119]],[[696,696],"mapped",[121]],[[697,705],"valid"],[[706,709],"valid",[],"NV8"],[[710,721],"valid"],[[722,727],"valid",[],"NV8"],[[728,728],"disallowed_STD3_mapped",[32,774]],[[729,729],"disallowed_STD3_mapped",[32,775]],[[730,730],"disallowed_STD3_mapped",[32,778]],[[731,731],"disallowed_STD3_mapped",[32,808]],[[732,732],"disallowed_STD3_mapped",[32,771]],[[733,733],"disallowed_STD3_mapped",[32,779]],[[734,734],"valid",[],"NV8"],[[735,735],"valid",[],"NV8"],[[736,736],"mapped",[611]],[[737,737],"mapped",[108]],[[738,738],"mapped",[115]],[[739,739],"mapped",[120]],[[740,740],"mapped",[661]],[[741,745],"valid",[],"NV8"],[[746,747],"valid",[],"NV8"],[[748,748],"valid"],[[749,749],"valid",[],"NV8"],[[750,750],"valid"],[[751,767],"valid",[],"NV8"],[[768,831],"valid"],[[832,832],"mapped",[768]],[[833,833],"mapped",[769]],[[834,834],"valid"],[[835,835],"mapped",[787]],[[836,836],"mapped",[776,769]],[[837,837],"mapped",[953]],[[838,846],"valid"],[[847,847],"ignored"],[[848,855],"valid"],[[856,860],"valid"],[[861,863],"valid"],[[864,865],"valid"],[[866,866],"valid"],[[867,879],"valid"],[[880,880],"mapped",[881]],[[881,881],"valid"],[[882,882],"mapped",[883]],[[883,883],"valid"],[[884,884],"mapped",[697]],[[885,885],"valid"],[[886,886],"mapped",[887]],[[887,887],"valid"],[[888,889],"disallowed"],[[890,890],"disallowed_STD3_mapped",[32,953]],[[891,893],"valid"],[[894,894],"disallowed_STD3_mapped",[59]],[[895,895],"mapped",[1011]],[[896,899],"disallowed"],[[900,900],"disallowed_STD3_mapped",[32,769]],[[901,901],"disallowed_STD3_mapped",[32,776,769]],[[902,902],"mapped",[940]],[[903,903],"mapped",[183]],[[904,904],"mapped",[941]],[[905,905],"mapped",[942]],[[906,906],"mapped",[943]],[[907,907],"disallowed"],[[908,908],"mapped",[972]],[[909,909],"disallowed"],[[910,910],"mapped",[973]],[[911,911],"mapped",[974]],[[912,912],"valid"],[[913,913],"mapped",[945]],[[914,914],"mapped",[946]],[[915,915],"mapped",[947]],[[916,916],"mapped",[948]],[[917,917],"mapped",[949]],[[918,918],"mapped",[950]],[[919,919],"mapped",[951]],[[920,920],"mapped",[952]],[[921,921],"mapped",[953]],[[922,922],"mapped",[954]],[[923,923],"mapped",[955]],[[924,924],"mapped",[956]],[[925,925],"mapped",[957]],[[926,926],"mapped",[958]],[[927,927],"mapped",[959]],[[928,928],"mapped",[960]],[[929,929],"mapped",[961]],[[930,930],"disallowed"],[[931,931],"mapped",[963]],[[932,932],"mapped",[964]],[[933,933],"mapped",[965]],[[934,934],"mapped",[966]],[[935,935],"mapped",[967]],[[936,936],"mapped",[968]],[[937,937],"mapped",[969]],[[938,938],"mapped",[970]],[[939,939],"mapped",[971]],[[940,961],"valid"],[[962,962],"deviation",[963]],[[963,974],"valid"],[[975,975],"mapped",[983]],[[976,976],"mapped",[946]],[[977,977],"mapped",[952]],[[978,978],"mapped",[965]],[[979,979],"mapped",[973]],[[980,980],"mapped",[971]],[[981,981],"mapped",[966]],[[982,982],"mapped",[960]],[[983,983],"valid"],[[984,984],"mapped",[985]],[[985,985],"valid"],[[986,986],"mapped",[987]],[[987,987],"valid"],[[988,988],"mapped",[989]],[[989,989],"valid"],[[990,990],"mapped",[991]],[[991,991],"valid"],[[992,992],"mapped",[993]],[[993,993],"valid"],[[994,994],"mapped",[995]],[[995,995],"valid"],[[996,996],"mapped",[997]],[[997,997],"valid"],[[998,998],"mapped",[999]],[[999,999],"valid"],[[1000,1000],"mapped",[1001]],[[1001,1001],"valid"],[[1002,1002],"mapped",[1003]],[[1003,1003],"valid"],[[1004,1004],"mapped",[1005]],[[1005,1005],"valid"],[[1006,1006],"mapped",[1007]],[[1007,1007],"valid"],[[1008,1008],"mapped",[954]],[[1009,1009],"mapped",[961]],[[1010,1010],"mapped",[963]],[[1011,1011],"valid"],[[1012,1012],"mapped",[952]],[[1013,1013],"mapped",[949]],[[1014,1014],"valid",[],"NV8"],[[1015,1015],"mapped",[1016]],[[1016,1016],"valid"],[[1017,1017],"mapped",[963]],[[1018,1018],"mapped",[1019]],[[1019,1019],"valid"],[[1020,1020],"valid"],[[1021,1021],"mapped",[891]],[[1022,1022],"mapped",[892]],[[1023,1023],"mapped",[893]],[[1024,1024],"mapped",[1104]],[[1025,1025],"mapped",[1105]],[[1026,1026],"mapped",[1106]],[[1027,1027],"mapped",[1107]],[[1028,1028],"mapped",[1108]],[[1029,1029],"mapped",[1109]],[[1030,1030],"mapped",[1110]],[[1031,1031],"mapped",[1111]],[[1032,1032],"mapped",[1112]],[[1033,1033],"mapped",[1113]],[[1034,1034],"mapped",[1114]],[[1035,1035],"mapped",[1115]],[[1036,1036],"mapped",[1116]],[[1037,1037],"mapped",[1117]],[[1038,1038],"mapped",[1118]],[[1039,1039],"mapped",[1119]],[[1040,1040],"mapped",[1072]],[[1041,1041],"mapped",[1073]],[[1042,1042],"mapped",[1074]],[[1043,1043],"mapped",[1075]],[[1044,1044],"mapped",[1076]],[[1045,1045],"mapped",[1077]],[[1046,1046],"mapped",[1078]],[[1047,1047],"mapped",[1079]],[[1048,1048],"mapped",[1080]],[[1049,1049],"mapped",[1081]],[[1050,1050],"mapped",[1082]],[[1051,1051],"mapped",[1083]],[[1052,1052],"mapped",[1084]],[[1053,1053],"mapped",[1085]],[[1054,1054],"mapped",[1086]],[[1055,1055],"mapped",[1087]],[[1056,1056],"mapped",[1088]],[[1057,1057],"mapped",[1089]],[[1058,1058],"mapped",[1090]],[[1059,1059],"mapped",[1091]],[[1060,1060],"mapped",[1092]],[[1061,1061],"mapped",[1093]],[[1062,1062],"mapped",[1094]],[[1063,1063],"mapped",[1095]],[[1064,1064],"mapped",[1096]],[[1065,1065],"mapped",[1097]],[[1066,1066],"mapped",[1098]],[[1067,1067],"mapped",[1099]],[[1068,1068],"mapped",[1100]],[[1069,1069],"mapped",[1101]],[[1070,1070],"mapped",[1102]],[[1071,1071],"mapped",[1103]],[[1072,1103],"valid"],[[1104,1104],"valid"],[[1105,1116],"valid"],[[1117,1117],"valid"],[[1118,1119],"valid"],[[1120,1120],"mapped",[1121]],[[1121,1121],"valid"],[[1122,1122],"mapped",[1123]],[[1123,1123],"valid"],[[1124,1124],"mapped",[1125]],[[1125,1125],"valid"],[[1126,1126],"mapped",[1127]],[[1127,1127],"valid"],[[1128,1128],"mapped",[1129]],[[1129,1129],"valid"],[[1130,1130],"mapped",[1131]],[[1131,1131],"valid"],[[1132,1132],"mapped",[1133]],[[1133,1133],"valid"],[[1134,1134],"mapped",[1135]],[[1135,1135],"valid"],[[1136,1136],"mapped",[1137]],[[1137,1137],"valid"],[[1138,1138],"mapped",[1139]],[[1139,1139],"valid"],[[1140,1140],"mapped",[1141]],[[1141,1141],"valid"],[[1142,1142],"mapped",[1143]],[[1143,1143],"valid"],[[1144,1144],"mapped",[1145]],[[1145,1145],"valid"],[[1146,1146],"mapped",[1147]],[[1147,1147],"valid"],[[1148,1148],"mapped",[1149]],[[1149,1149],"valid"],[[1150,1150],"mapped",[1151]],[[1151,1151],"valid"],[[1152,1152],"mapped",[1153]],[[1153,1153],"valid"],[[1154,1154],"valid",[],"NV8"],[[1155,1158],"valid"],[[1159,1159],"valid"],[[1160,1161],"valid",[],"NV8"],[[1162,1162],"mapped",[1163]],[[1163,1163],"valid"],[[1164,1164],"mapped",[1165]],[[1165,1165],"valid"],[[1166,1166],"mapped",[1167]],[[1167,1167],"valid"],[[1168,1168],"mapped",[1169]],[[1169,1169],"valid"],[[1170,1170],"mapped",[1171]],[[1171,1171],"valid"],[[1172,1172],"mapped",[1173]],[[1173,1173],"valid"],[[1174,1174],"mapped",[1175]],[[1175,1175],"valid"],[[1176,1176],"mapped",[1177]],[[1177,1177],"valid"],[[1178,1178],"mapped",[1179]],[[1179,1179],"valid"],[[1180,1180],"mapped",[1181]],[[1181,1181],"valid"],[[1182,1182],"mapped",[1183]],[[1183,1183],"valid"],[[1184,1184],"mapped",[1185]],[[1185,1185],"valid"],[[1186,1186],"mapped",[1187]],[[1187,1187],"valid"],[[1188,1188],"mapped",[1189]],[[1189,1189],"valid"],[[1190,1190],"mapped",[1191]],[[1191,1191],"valid"],[[1192,1192],"mapped",[1193]],[[1193,1193],"valid"],[[1194,1194],"mapped",[1195]],[[1195,1195],"valid"],[[1196,1196],"mapped",[1197]],[[1197,1197],"valid"],[[1198,1198],"mapped",[1199]],[[1199,1199],"valid"],[[1200,1200],"mapped",[1201]],[[1201,1201],"valid"],[[1202,1202],"mapped",[1203]],[[1203,1203],"valid"],[[1204,1204],"mapped",[1205]],[[1205,1205],"valid"],[[1206,1206],"mapped",[1207]],[[1207,1207],"valid"],[[1208,1208],"mapped",[1209]],[[1209,1209],"valid"],[[1210,1210],"mapped",[1211]],[[1211,1211],"valid"],[[1212,1212],"mapped",[1213]],[[1213,1213],"valid"],[[1214,1214],"mapped",[1215]],[[1215,1215],"valid"],[[1216,1216],"disallowed"],[[1217,1217],"mapped",[1218]],[[1218,1218],"valid"],[[1219,1219],"mapped",[1220]],[[1220,1220],"valid"],[[1221,1221],"mapped",[1222]],[[1222,1222],"valid"],[[1223,1223],"mapped",[1224]],[[1224,1224],"valid"],[[1225,1225],"mapped",[1226]],[[1226,1226],"valid"],[[1227,1227],"mapped",[1228]],[[1228,1228],"valid"],[[1229,1229],"mapped",[1230]],[[1230,1230],"valid"],[[1231,1231],"valid"],[[1232,1232],"mapped",[1233]],[[1233,1233],"valid"],[[1234,1234],"mapped",[1235]],[[1235,1235],"valid"],[[1236,1236],"mapped",[1237]],[[1237,1237],"valid"],[[1238,1238],"mapped",[1239]],[[1239,1239],"valid"],[[1240,1240],"mapped",[1241]],[[1241,1241],"valid"],[[1242,1242],"mapped",[1243]],[[1243,1243],"valid"],[[1244,1244],"mapped",[1245]],[[1245,1245],"valid"],[[1246,1246],"mapped",[1247]],[[1247,1247],"valid"],[[1248,1248],"mapped",[1249]],[[1249,1249],"valid"],[[1250,1250],"mapped",[1251]],[[1251,1251],"valid"],[[1252,1252],"mapped",[1253]],[[1253,1253],"valid"],[[1254,1254],"mapped",[1255]],[[1255,1255],"valid"],[[1256,1256],"mapped",[1257]],[[1257,1257],"valid"],[[1258,1258],"mapped",[1259]],[[1259,1259],"valid"],[[1260,1260],"mapped",[1261]],[[1261,1261],"valid"],[[1262,1262],"mapped",[1263]],[[1263,1263],"valid"],[[1264,1264],"mapped",[1265]],[[1265,1265],"valid"],[[1266,1266],"mapped",[1267]],[[1267,1267],"valid"],[[1268,1268],"mapped",[1269]],[[1269,1269],"valid"],[[1270,1270],"mapped",[1271]],[[1271,1271],"valid"],[[1272,1272],"mapped",[1273]],[[1273,1273],"valid"],[[1274,1274],"mapped",[1275]],[[1275,1275],"valid"],[[1276,1276],"mapped",[1277]],[[1277,1277],"valid"],[[1278,1278],"mapped",[1279]],[[1279,1279],"valid"],[[1280,1280],"mapped",[1281]],[[1281,1281],"valid"],[[1282,1282],"mapped",[1283]],[[1283,1283],"valid"],[[1284,1284],"mapped",[1285]],[[1285,1285],"valid"],[[1286,1286],"mapped",[1287]],[[1287,1287],"valid"],[[1288,1288],"mapped",[1289]],[[1289,1289],"valid"],[[1290,1290],"mapped",[1291]],[[1291,1291],"valid"],[[1292,1292],"mapped",[1293]],[[1293,1293],"valid"],[[1294,1294],"mapped",[1295]],[[1295,1295],"valid"],[[1296,1296],"mapped",[1297]],[[1297,1297],"valid"],[[1298,1298],"mapped",[1299]],[[1299,1299],"valid"],[[1300,1300],"mapped",[1301]],[[1301,1301],"valid"],[[1302,1302],"mapped",[1303]],[[1303,1303],"valid"],[[1304,1304],"mapped",[1305]],[[1305,1305],"valid"],[[1306,1306],"mapped",[1307]],[[1307,1307],"valid"],[[1308,1308],"mapped",[1309]],[[1309,1309],"valid"],[[1310,1310],"mapped",[1311]],[[1311,1311],"valid"],[[1312,1312],"mapped",[1313]],[[1313,1313],"valid"],[[1314,1314],"mapped",[1315]],[[1315,1315],"valid"],[[1316,1316],"mapped",[1317]],[[1317,1317],"valid"],[[1318,1318],"mapped",[1319]],[[1319,1319],"valid"],[[1320,1320],"mapped",[1321]],[[1321,1321],"valid"],[[1322,1322],"mapped",[1323]],[[1323,1323],"valid"],[[1324,1324],"mapped",[1325]],[[1325,1325],"valid"],[[1326,1326],"mapped",[1327]],[[1327,1327],"valid"],[[1328,1328],"disallowed"],[[1329,1329],"mapped",[1377]],[[1330,1330],"mapped",[1378]],[[1331,1331],"mapped",[1379]],[[1332,1332],"mapped",[1380]],[[1333,1333],"mapped",[1381]],[[1334,1334],"mapped",[1382]],[[1335,1335],"mapped",[1383]],[[1336,1336],"mapped",[1384]],[[1337,1337],"mapped",[1385]],[[1338,1338],"mapped",[1386]],[[1339,1339],"mapped",[1387]],[[1340,1340],"mapped",[1388]],[[1341,1341],"mapped",[1389]],[[1342,1342],"mapped",[1390]],[[1343,1343],"mapped",[1391]],[[1344,1344],"mapped",[1392]],[[1345,1345],"mapped",[1393]],[[1346,1346],"mapped",[1394]],[[1347,1347],"mapped",[1395]],[[1348,1348],"mapped",[1396]],[[1349,1349],"mapped",[1397]],[[1350,1350],"mapped",[1398]],[[1351,1351],"mapped",[1399]],[[1352,1352],"mapped",[1400]],[[1353,1353],"mapped",[1401]],[[1354,1354],"mapped",[1402]],[[1355,1355],"mapped",[1403]],[[1356,1356],"mapped",[1404]],[[1357,1357],"mapped",[1405]],[[1358,1358],"mapped",[1406]],[[1359,1359],"mapped",[1407]],[[1360,1360],"mapped",[1408]],[[1361,1361],"mapped",[1409]],[[1362,1362],"mapped",[1410]],[[1363,1363],"mapped",[1411]],[[1364,1364],"mapped",[1412]],[[1365,1365],"mapped",[1413]],[[1366,1366],"mapped",[1414]],[[1367,1368],"disallowed"],[[1369,1369],"valid"],[[1370,1375],"valid",[],"NV8"],[[1376,1376],"disallowed"],[[1377,1414],"valid"],[[1415,1415],"mapped",[1381,1410]],[[1416,1416],"disallowed"],[[1417,1417],"valid",[],"NV8"],[[1418,1418],"valid",[],"NV8"],[[1419,1420],"disallowed"],[[1421,1422],"valid",[],"NV8"],[[1423,1423],"valid",[],"NV8"],[[1424,1424],"disallowed"],[[1425,1441],"valid"],[[1442,1442],"valid"],[[1443,1455],"valid"],[[1456,1465],"valid"],[[1466,1466],"valid"],[[1467,1469],"valid"],[[1470,1470],"valid",[],"NV8"],[[1471,1471],"valid"],[[1472,1472],"valid",[],"NV8"],[[1473,1474],"valid"],[[1475,1475],"valid",[],"NV8"],[[1476,1476],"valid"],[[1477,1477],"valid"],[[1478,1478],"valid",[],"NV8"],[[1479,1479],"valid"],[[1480,1487],"disallowed"],[[1488,1514],"valid"],[[1515,1519],"disallowed"],[[1520,1524],"valid"],[[1525,1535],"disallowed"],[[1536,1539],"disallowed"],[[1540,1540],"disallowed"],[[1541,1541],"disallowed"],[[1542,1546],"valid",[],"NV8"],[[1547,1547],"valid",[],"NV8"],[[1548,1548],"valid",[],"NV8"],[[1549,1551],"valid",[],"NV8"],[[1552,1557],"valid"],[[1558,1562],"valid"],[[1563,1563],"valid",[],"NV8"],[[1564,1564],"disallowed"],[[1565,1565],"disallowed"],[[1566,1566],"valid",[],"NV8"],[[1567,1567],"valid",[],"NV8"],[[1568,1568],"valid"],[[1569,1594],"valid"],[[1595,1599],"valid"],[[1600,1600],"valid",[],"NV8"],[[1601,1618],"valid"],[[1619,1621],"valid"],[[1622,1624],"valid"],[[1625,1630],"valid"],[[1631,1631],"valid"],[[1632,1641],"valid"],[[1642,1645],"valid",[],"NV8"],[[1646,1647],"valid"],[[1648,1652],"valid"],[[1653,1653],"mapped",[1575,1652]],[[1654,1654],"mapped",[1608,1652]],[[1655,1655],"mapped",[1735,1652]],[[1656,1656],"mapped",[1610,1652]],[[1657,1719],"valid"],[[1720,1721],"valid"],[[1722,1726],"valid"],[[1727,1727],"valid"],[[1728,1742],"valid"],[[1743,1743],"valid"],[[1744,1747],"valid"],[[1748,1748],"valid",[],"NV8"],[[1749,1756],"valid"],[[1757,1757],"disallowed"],[[1758,1758],"valid",[],"NV8"],[[1759,1768],"valid"],[[1769,1769],"valid",[],"NV8"],[[1770,1773],"valid"],[[1774,1775],"valid"],[[1776,1785],"valid"],[[1786,1790],"valid"],[[1791,1791],"valid"],[[1792,1805],"valid",[],"NV8"],[[1806,1806],"disallowed"],[[1807,1807],"disallowed"],[[1808,1836],"valid"],[[1837,1839],"valid"],[[1840,1866],"valid"],[[1867,1868],"disallowed"],[[1869,1871],"valid"],[[1872,1901],"valid"],[[1902,1919],"valid"],[[1920,1968],"valid"],[[1969,1969],"valid"],[[1970,1983],"disallowed"],[[1984,2037],"valid"],[[2038,2042],"valid",[],"NV8"],[[2043,2047],"disallowed"],[[2048,2093],"valid"],[[2094,2095],"disallowed"],[[2096,2110],"valid",[],"NV8"],[[2111,2111],"disallowed"],[[2112,2139],"valid"],[[2140,2141],"disallowed"],[[2142,2142],"valid",[],"NV8"],[[2143,2207],"disallowed"],[[2208,2208],"valid"],[[2209,2209],"valid"],[[2210,2220],"valid"],[[2221,2226],"valid"],[[2227,2228],"valid"],[[2229,2274],"disallowed"],[[2275,2275],"valid"],[[2276,2302],"valid"],[[2303,2303],"valid"],[[2304,2304],"valid"],[[2305,2307],"valid"],[[2308,2308],"valid"],[[2309,2361],"valid"],[[2362,2363],"valid"],[[2364,2381],"valid"],[[2382,2382],"valid"],[[2383,2383],"valid"],[[2384,2388],"valid"],[[2389,2389],"valid"],[[2390,2391],"valid"],[[2392,2392],"mapped",[2325,2364]],[[2393,2393],"mapped",[2326,2364]],[[2394,2394],"mapped",[2327,2364]],[[2395,2395],"mapped",[2332,2364]],[[2396,2396],"mapped",[2337,2364]],[[2397,2397],"mapped",[2338,2364]],[[2398,2398],"mapped",[2347,2364]],[[2399,2399],"mapped",[2351,2364]],[[2400,2403],"valid"],[[2404,2405],"valid",[],"NV8"],[[2406,2415],"valid"],[[2416,2416],"valid",[],"NV8"],[[2417,2418],"valid"],[[2419,2423],"valid"],[[2424,2424],"valid"],[[2425,2426],"valid"],[[2427,2428],"valid"],[[2429,2429],"valid"],[[2430,2431],"valid"],[[2432,2432],"valid"],[[2433,2435],"valid"],[[2436,2436],"disallowed"],[[2437,2444],"valid"],[[2445,2446],"disallowed"],[[2447,2448],"valid"],[[2449,2450],"disallowed"],[[2451,2472],"valid"],[[2473,2473],"disallowed"],[[2474,2480],"valid"],[[2481,2481],"disallowed"],[[2482,2482],"valid"],[[2483,2485],"disallowed"],[[2486,2489],"valid"],[[2490,2491],"disallowed"],[[2492,2492],"valid"],[[2493,2493],"valid"],[[2494,2500],"valid"],[[2501,2502],"disallowed"],[[2503,2504],"valid"],[[2505,2506],"disallowed"],[[2507,2509],"valid"],[[2510,2510],"valid"],[[2511,2518],"disallowed"],[[2519,2519],"valid"],[[2520,2523],"disallowed"],[[2524,2524],"mapped",[2465,2492]],[[2525,2525],"mapped",[2466,2492]],[[2526,2526],"disallowed"],[[2527,2527],"mapped",[2479,2492]],[[2528,2531],"valid"],[[2532,2533],"disallowed"],[[2534,2545],"valid"],[[2546,2554],"valid",[],"NV8"],[[2555,2555],"valid",[],"NV8"],[[2556,2560],"disallowed"],[[2561,2561],"valid"],[[2562,2562],"valid"],[[2563,2563],"valid"],[[2564,2564],"disallowed"],[[2565,2570],"valid"],[[2571,2574],"disallowed"],[[2575,2576],"valid"],[[2577,2578],"disallowed"],[[2579,2600],"valid"],[[2601,2601],"disallowed"],[[2602,2608],"valid"],[[2609,2609],"disallowed"],[[2610,2610],"valid"],[[2611,2611],"mapped",[2610,2620]],[[2612,2612],"disallowed"],[[2613,2613],"valid"],[[2614,2614],"mapped",[2616,2620]],[[2615,2615],"disallowed"],[[2616,2617],"valid"],[[2618,2619],"disallowed"],[[2620,2620],"valid"],[[2621,2621],"disallowed"],[[2622,2626],"valid"],[[2627,2630],"disallowed"],[[2631,2632],"valid"],[[2633,2634],"disallowed"],[[2635,2637],"valid"],[[2638,2640],"disallowed"],[[2641,2641],"valid"],[[2642,2648],"disallowed"],[[2649,2649],"mapped",[2582,2620]],[[2650,2650],"mapped",[2583,2620]],[[2651,2651],"mapped",[2588,2620]],[[2652,2652],"valid"],[[2653,2653],"disallowed"],[[2654,2654],"mapped",[2603,2620]],[[2655,2661],"disallowed"],[[2662,2676],"valid"],[[2677,2677],"valid"],[[2678,2688],"disallowed"],[[2689,2691],"valid"],[[2692,2692],"disallowed"],[[2693,2699],"valid"],[[2700,2700],"valid"],[[2701,2701],"valid"],[[2702,2702],"disallowed"],[[2703,2705],"valid"],[[2706,2706],"disallowed"],[[2707,2728],"valid"],[[2729,2729],"disallowed"],[[2730,2736],"valid"],[[2737,2737],"disallowed"],[[2738,2739],"valid"],[[2740,2740],"disallowed"],[[2741,2745],"valid"],[[2746,2747],"disallowed"],[[2748,2757],"valid"],[[2758,2758],"disallowed"],[[2759,2761],"valid"],[[2762,2762],"disallowed"],[[2763,2765],"valid"],[[2766,2767],"disallowed"],[[2768,2768],"valid"],[[2769,2783],"disallowed"],[[2784,2784],"valid"],[[2785,2787],"valid"],[[2788,2789],"disallowed"],[[2790,2799],"valid"],[[2800,2800],"valid",[],"NV8"],[[2801,2801],"valid",[],"NV8"],[[2802,2808],"disallowed"],[[2809,2809],"valid"],[[2810,2816],"disallowed"],[[2817,2819],"valid"],[[2820,2820],"disallowed"],[[2821,2828],"valid"],[[2829,2830],"disallowed"],[[2831,2832],"valid"],[[2833,2834],"disallowed"],[[2835,2856],"valid"],[[2857,2857],"disallowed"],[[2858,2864],"valid"],[[2865,2865],"disallowed"],[[2866,2867],"valid"],[[2868,2868],"disallowed"],[[2869,2869],"valid"],[[2870,2873],"valid"],[[2874,2875],"disallowed"],[[2876,2883],"valid"],[[2884,2884],"valid"],[[2885,2886],"disallowed"],[[2887,2888],"valid"],[[2889,2890],"disallowed"],[[2891,2893],"valid"],[[2894,2901],"disallowed"],[[2902,2903],"valid"],[[2904,2907],"disallowed"],[[2908,2908],"mapped",[2849,2876]],[[2909,2909],"mapped",[2850,2876]],[[2910,2910],"disallowed"],[[2911,2913],"valid"],[[2914,2915],"valid"],[[2916,2917],"disallowed"],[[2918,2927],"valid"],[[2928,2928],"valid",[],"NV8"],[[2929,2929],"valid"],[[2930,2935],"valid",[],"NV8"],[[2936,2945],"disallowed"],[[2946,2947],"valid"],[[2948,2948],"disallowed"],[[2949,2954],"valid"],[[2955,2957],"disallowed"],[[2958,2960],"valid"],[[2961,2961],"disallowed"],[[2962,2965],"valid"],[[2966,2968],"disallowed"],[[2969,2970],"valid"],[[2971,2971],"disallowed"],[[2972,2972],"valid"],[[2973,2973],"disallowed"],[[2974,2975],"valid"],[[2976,2978],"disallowed"],[[2979,2980],"valid"],[[2981,2983],"disallowed"],[[2984,2986],"valid"],[[2987,2989],"disallowed"],[[2990,2997],"valid"],[[2998,2998],"valid"],[[2999,3001],"valid"],[[3002,3005],"disallowed"],[[3006,3010],"valid"],[[3011,3013],"disallowed"],[[3014,3016],"valid"],[[3017,3017],"disallowed"],[[3018,3021],"valid"],[[3022,3023],"disallowed"],[[3024,3024],"valid"],[[3025,3030],"disallowed"],[[3031,3031],"valid"],[[3032,3045],"disallowed"],[[3046,3046],"valid"],[[3047,3055],"valid"],[[3056,3058],"valid",[],"NV8"],[[3059,3066],"valid",[],"NV8"],[[3067,3071],"disallowed"],[[3072,3072],"valid"],[[3073,3075],"valid"],[[3076,3076],"disallowed"],[[3077,3084],"valid"],[[3085,3085],"disallowed"],[[3086,3088],"valid"],[[3089,3089],"disallowed"],[[3090,3112],"valid"],[[3113,3113],"disallowed"],[[3114,3123],"valid"],[[3124,3124],"valid"],[[3125,3129],"valid"],[[3130,3132],"disallowed"],[[3133,3133],"valid"],[[3134,3140],"valid"],[[3141,3141],"disallowed"],[[3142,3144],"valid"],[[3145,3145],"disallowed"],[[3146,3149],"valid"],[[3150,3156],"disallowed"],[[3157,3158],"valid"],[[3159,3159],"disallowed"],[[3160,3161],"valid"],[[3162,3162],"valid"],[[3163,3167],"disallowed"],[[3168,3169],"valid"],[[3170,3171],"valid"],[[3172,3173],"disallowed"],[[3174,3183],"valid"],[[3184,3191],"disallowed"],[[3192,3199],"valid",[],"NV8"],[[3200,3200],"disallowed"],[[3201,3201],"valid"],[[3202,3203],"valid"],[[3204,3204],"disallowed"],[[3205,3212],"valid"],[[3213,3213],"disallowed"],[[3214,3216],"valid"],[[3217,3217],"disallowed"],[[3218,3240],"valid"],[[3241,3241],"disallowed"],[[3242,3251],"valid"],[[3252,3252],"disallowed"],[[3253,3257],"valid"],[[3258,3259],"disallowed"],[[3260,3261],"valid"],[[3262,3268],"valid"],[[3269,3269],"disallowed"],[[3270,3272],"valid"],[[3273,3273],"disallowed"],[[3274,3277],"valid"],[[3278,3284],"disallowed"],[[3285,3286],"valid"],[[3287,3293],"disallowed"],[[3294,3294],"valid"],[[3295,3295],"disallowed"],[[3296,3297],"valid"],[[3298,3299],"valid"],[[3300,3301],"disallowed"],[[3302,3311],"valid"],[[3312,3312],"disallowed"],[[3313,3314],"valid"],[[3315,3328],"disallowed"],[[3329,3329],"valid"],[[3330,3331],"valid"],[[3332,3332],"disallowed"],[[3333,3340],"valid"],[[3341,3341],"disallowed"],[[3342,3344],"valid"],[[3345,3345],"disallowed"],[[3346,3368],"valid"],[[3369,3369],"valid"],[[3370,3385],"valid"],[[3386,3386],"valid"],[[3387,3388],"disallowed"],[[3389,3389],"valid"],[[3390,3395],"valid"],[[3396,3396],"valid"],[[3397,3397],"disallowed"],[[3398,3400],"valid"],[[3401,3401],"disallowed"],[[3402,3405],"valid"],[[3406,3406],"valid"],[[3407,3414],"disallowed"],[[3415,3415],"valid"],[[3416,3422],"disallowed"],[[3423,3423],"valid"],[[3424,3425],"valid"],[[3426,3427],"valid"],[[3428,3429],"disallowed"],[[3430,3439],"valid"],[[3440,3445],"valid",[],"NV8"],[[3446,3448],"disallowed"],[[3449,3449],"valid",[],"NV8"],[[3450,3455],"valid"],[[3456,3457],"disallowed"],[[3458,3459],"valid"],[[3460,3460],"disallowed"],[[3461,3478],"valid"],[[3479,3481],"disallowed"],[[3482,3505],"valid"],[[3506,3506],"disallowed"],[[3507,3515],"valid"],[[3516,3516],"disallowed"],[[3517,3517],"valid"],[[3518,3519],"disallowed"],[[3520,3526],"valid"],[[3527,3529],"disallowed"],[[3530,3530],"valid"],[[3531,3534],"disallowed"],[[3535,3540],"valid"],[[3541,3541],"disallowed"],[[3542,3542],"valid"],[[3543,3543],"disallowed"],[[3544,3551],"valid"],[[3552,3557],"disallowed"],[[3558,3567],"valid"],[[3568,3569],"disallowed"],[[3570,3571],"valid"],[[3572,3572],"valid",[],"NV8"],[[3573,3584],"disallowed"],[[3585,3634],"valid"],[[3635,3635],"mapped",[3661,3634]],[[3636,3642],"valid"],[[3643,3646],"disallowed"],[[3647,3647],"valid",[],"NV8"],[[3648,3662],"valid"],[[3663,3663],"valid",[],"NV8"],[[3664,3673],"valid"],[[3674,3675],"valid",[],"NV8"],[[3676,3712],"disallowed"],[[3713,3714],"valid"],[[3715,3715],"disallowed"],[[3716,3716],"valid"],[[3717,3718],"disallowed"],[[3719,3720],"valid"],[[3721,3721],"disallowed"],[[3722,3722],"valid"],[[3723,3724],"disallowed"],[[3725,3725],"valid"],[[3726,3731],"disallowed"],[[3732,3735],"valid"],[[3736,3736],"disallowed"],[[3737,3743],"valid"],[[3744,3744],"disallowed"],[[3745,3747],"valid"],[[3748,3748],"disallowed"],[[3749,3749],"valid"],[[3750,3750],"disallowed"],[[3751,3751],"valid"],[[3752,3753],"disallowed"],[[3754,3755],"valid"],[[3756,3756],"disallowed"],[[3757,3762],"valid"],[[3763,3763],"mapped",[3789,3762]],[[3764,3769],"valid"],[[3770,3770],"disallowed"],[[3771,3773],"valid"],[[3774,3775],"disallowed"],[[3776,3780],"valid"],[[3781,3781],"disallowed"],[[3782,3782],"valid"],[[3783,3783],"disallowed"],[[3784,3789],"valid"],[[3790,3791],"disallowed"],[[3792,3801],"valid"],[[3802,3803],"disallowed"],[[3804,3804],"mapped",[3755,3737]],[[3805,3805],"mapped",[3755,3745]],[[3806,3807],"valid"],[[3808,3839],"disallowed"],[[3840,3840],"valid"],[[3841,3850],"valid",[],"NV8"],[[3851,3851],"valid"],[[3852,3852],"mapped",[3851]],[[3853,3863],"valid",[],"NV8"],[[3864,3865],"valid"],[[3866,3871],"valid",[],"NV8"],[[3872,3881],"valid"],[[3882,3892],"valid",[],"NV8"],[[3893,3893],"valid"],[[3894,3894],"valid",[],"NV8"],[[3895,3895],"valid"],[[3896,3896],"valid",[],"NV8"],[[3897,3897],"valid"],[[3898,3901],"valid",[],"NV8"],[[3902,3906],"valid"],[[3907,3907],"mapped",[3906,4023]],[[3908,3911],"valid"],[[3912,3912],"disallowed"],[[3913,3916],"valid"],[[3917,3917],"mapped",[3916,4023]],[[3918,3921],"valid"],[[3922,3922],"mapped",[3921,4023]],[[3923,3926],"valid"],[[3927,3927],"mapped",[3926,4023]],[[3928,3931],"valid"],[[3932,3932],"mapped",[3931,4023]],[[3933,3944],"valid"],[[3945,3945],"mapped",[3904,4021]],[[3946,3946],"valid"],[[3947,3948],"valid"],[[3949,3952],"disallowed"],[[3953,3954],"valid"],[[3955,3955],"mapped",[3953,3954]],[[3956,3956],"valid"],[[3957,3957],"mapped",[3953,3956]],[[3958,3958],"mapped",[4018,3968]],[[3959,3959],"mapped",[4018,3953,3968]],[[3960,3960],"mapped",[4019,3968]],[[3961,3961],"mapped",[4019,3953,3968]],[[3962,3968],"valid"],[[3969,3969],"mapped",[3953,3968]],[[3970,3972],"valid"],[[3973,3973],"valid",[],"NV8"],[[3974,3979],"valid"],[[3980,3983],"valid"],[[3984,3986],"valid"],[[3987,3987],"mapped",[3986,4023]],[[3988,3989],"valid"],[[3990,3990],"valid"],[[3991,3991],"valid"],[[3992,3992],"disallowed"],[[3993,3996],"valid"],[[3997,3997],"mapped",[3996,4023]],[[3998,4001],"valid"],[[4002,4002],"mapped",[4001,4023]],[[4003,4006],"valid"],[[4007,4007],"mapped",[4006,4023]],[[4008,4011],"valid"],[[4012,4012],"mapped",[4011,4023]],[[4013,4013],"valid"],[[4014,4016],"valid"],[[4017,4023],"valid"],[[4024,4024],"valid"],[[4025,4025],"mapped",[3984,4021]],[[4026,4028],"valid"],[[4029,4029],"disallowed"],[[4030,4037],"valid",[],"NV8"],[[4038,4038],"valid"],[[4039,4044],"valid",[],"NV8"],[[4045,4045],"disallowed"],[[4046,4046],"valid",[],"NV8"],[[4047,4047],"valid",[],"NV8"],[[4048,4049],"valid",[],"NV8"],[[4050,4052],"valid",[],"NV8"],[[4053,4056],"valid",[],"NV8"],[[4057,4058],"valid",[],"NV8"],[[4059,4095],"disallowed"],[[4096,4129],"valid"],[[4130,4130],"valid"],[[4131,4135],"valid"],[[4136,4136],"valid"],[[4137,4138],"valid"],[[4139,4139],"valid"],[[4140,4146],"valid"],[[4147,4149],"valid"],[[4150,4153],"valid"],[[4154,4159],"valid"],[[4160,4169],"valid"],[[4170,4175],"valid",[],"NV8"],[[4176,4185],"valid"],[[4186,4249],"valid"],[[4250,4253],"valid"],[[4254,4255],"valid",[],"NV8"],[[4256,4293],"disallowed"],[[4294,4294],"disallowed"],[[4295,4295],"mapped",[11559]],[[4296,4300],"disallowed"],[[4301,4301],"mapped",[11565]],[[4302,4303],"disallowed"],[[4304,4342],"valid"],[[4343,4344],"valid"],[[4345,4346],"valid"],[[4347,4347],"valid",[],"NV8"],[[4348,4348],"mapped",[4316]],[[4349,4351],"valid"],[[4352,4441],"valid",[],"NV8"],[[4442,4446],"valid",[],"NV8"],[[4447,4448],"disallowed"],[[4449,4514],"valid",[],"NV8"],[[4515,4519],"valid",[],"NV8"],[[4520,4601],"valid",[],"NV8"],[[4602,4607],"valid",[],"NV8"],[[4608,4614],"valid"],[[4615,4615],"valid"],[[4616,4678],"valid"],[[4679,4679],"valid"],[[4680,4680],"valid"],[[4681,4681],"disallowed"],[[4682,4685],"valid"],[[4686,4687],"disallowed"],[[4688,4694],"valid"],[[4695,4695],"disallowed"],[[4696,4696],"valid"],[[4697,4697],"disallowed"],[[4698,4701],"valid"],[[4702,4703],"disallowed"],[[4704,4742],"valid"],[[4743,4743],"valid"],[[4744,4744],"valid"],[[4745,4745],"disallowed"],[[4746,4749],"valid"],[[4750,4751],"disallowed"],[[4752,4782],"valid"],[[4783,4783],"valid"],[[4784,4784],"valid"],[[4785,4785],"disallowed"],[[4786,4789],"valid"],[[4790,4791],"disallowed"],[[4792,4798],"valid"],[[4799,4799],"disallowed"],[[4800,4800],"valid"],[[4801,4801],"disallowed"],[[4802,4805],"valid"],[[4806,4807],"disallowed"],[[4808,4814],"valid"],[[4815,4815],"valid"],[[4816,4822],"valid"],[[4823,4823],"disallowed"],[[4824,4846],"valid"],[[4847,4847],"valid"],[[4848,4878],"valid"],[[4879,4879],"valid"],[[4880,4880],"valid"],[[4881,4881],"disallowed"],[[4882,4885],"valid"],[[4886,4887],"disallowed"],[[4888,4894],"valid"],[[4895,4895],"valid"],[[4896,4934],"valid"],[[4935,4935],"valid"],[[4936,4954],"valid"],[[4955,4956],"disallowed"],[[4957,4958],"valid"],[[4959,4959],"valid"],[[4960,4960],"valid",[],"NV8"],[[4961,4988],"valid",[],"NV8"],[[4989,4991],"disallowed"],[[4992,5007],"valid"],[[5008,5017],"valid",[],"NV8"],[[5018,5023],"disallowed"],[[5024,5108],"valid"],[[5109,5109],"valid"],[[5110,5111],"disallowed"],[[5112,5112],"mapped",[5104]],[[5113,5113],"mapped",[5105]],[[5114,5114],"mapped",[5106]],[[5115,5115],"mapped",[5107]],[[5116,5116],"mapped",[5108]],[[5117,5117],"mapped",[5109]],[[5118,5119],"disallowed"],[[5120,5120],"valid",[],"NV8"],[[5121,5740],"valid"],[[5741,5742],"valid",[],"NV8"],[[5743,5750],"valid"],[[5751,5759],"valid"],[[5760,5760],"disallowed"],[[5761,5786],"valid"],[[5787,5788],"valid",[],"NV8"],[[5789,5791],"disallowed"],[[5792,5866],"valid"],[[5867,5872],"valid",[],"NV8"],[[5873,5880],"valid"],[[5881,5887],"disallowed"],[[5888,5900],"valid"],[[5901,5901],"disallowed"],[[5902,5908],"valid"],[[5909,5919],"disallowed"],[[5920,5940],"valid"],[[5941,5942],"valid",[],"NV8"],[[5943,5951],"disallowed"],[[5952,5971],"valid"],[[5972,5983],"disallowed"],[[5984,5996],"valid"],[[5997,5997],"disallowed"],[[5998,6000],"valid"],[[6001,6001],"disallowed"],[[6002,6003],"valid"],[[6004,6015],"disallowed"],[[6016,6067],"valid"],[[6068,6069],"disallowed"],[[6070,6099],"valid"],[[6100,6102],"valid",[],"NV8"],[[6103,6103],"valid"],[[6104,6107],"valid",[],"NV8"],[[6108,6108],"valid"],[[6109,6109],"valid"],[[6110,6111],"disallowed"],[[6112,6121],"valid"],[[6122,6127],"disallowed"],[[6128,6137],"valid",[],"NV8"],[[6138,6143],"disallowed"],[[6144,6149],"valid",[],"NV8"],[[6150,6150],"disallowed"],[[6151,6154],"valid",[],"NV8"],[[6155,6157],"ignored"],[[6158,6158],"disallowed"],[[6159,6159],"disallowed"],[[6160,6169],"valid"],[[6170,6175],"disallowed"],[[6176,6263],"valid"],[[6264,6271],"disallowed"],[[6272,6313],"valid"],[[6314,6314],"valid"],[[6315,6319],"disallowed"],[[6320,6389],"valid"],[[6390,6399],"disallowed"],[[6400,6428],"valid"],[[6429,6430],"valid"],[[6431,6431],"disallowed"],[[6432,6443],"valid"],[[6444,6447],"disallowed"],[[6448,6459],"valid"],[[6460,6463],"disallowed"],[[6464,6464],"valid",[],"NV8"],[[6465,6467],"disallowed"],[[6468,6469],"valid",[],"NV8"],[[6470,6509],"valid"],[[6510,6511],"disallowed"],[[6512,6516],"valid"],[[6517,6527],"disallowed"],[[6528,6569],"valid"],[[6570,6571],"valid"],[[6572,6575],"disallowed"],[[6576,6601],"valid"],[[6602,6607],"disallowed"],[[6608,6617],"valid"],[[6618,6618],"valid",[],"XV8"],[[6619,6621],"disallowed"],[[6622,6623],"valid",[],"NV8"],[[6624,6655],"valid",[],"NV8"],[[6656,6683],"valid"],[[6684,6685],"disallowed"],[[6686,6687],"valid",[],"NV8"],[[6688,6750],"valid"],[[6751,6751],"disallowed"],[[6752,6780],"valid"],[[6781,6782],"disallowed"],[[6783,6793],"valid"],[[6794,6799],"disallowed"],[[6800,6809],"valid"],[[6810,6815],"disallowed"],[[6816,6822],"valid",[],"NV8"],[[6823,6823],"valid"],[[6824,6829],"valid",[],"NV8"],[[6830,6831],"disallowed"],[[6832,6845],"valid"],[[6846,6846],"valid",[],"NV8"],[[6847,6911],"disallowed"],[[6912,6987],"valid"],[[6988,6991],"disallowed"],[[6992,7001],"valid"],[[7002,7018],"valid",[],"NV8"],[[7019,7027],"valid"],[[7028,7036],"valid",[],"NV8"],[[7037,7039],"disallowed"],[[7040,7082],"valid"],[[7083,7085],"valid"],[[7086,7097],"valid"],[[7098,7103],"valid"],[[7104,7155],"valid"],[[7156,7163],"disallowed"],[[7164,7167],"valid",[],"NV8"],[[7168,7223],"valid"],[[7224,7226],"disallowed"],[[7227,7231],"valid",[],"NV8"],[[7232,7241],"valid"],[[7242,7244],"disallowed"],[[7245,7293],"valid"],[[7294,7295],"valid",[],"NV8"],[[7296,7359],"disallowed"],[[7360,7367],"valid",[],"NV8"],[[7368,7375],"disallowed"],[[7376,7378],"valid"],[[7379,7379],"valid",[],"NV8"],[[7380,7410],"valid"],[[7411,7414],"valid"],[[7415,7415],"disallowed"],[[7416,7417],"valid"],[[7418,7423],"disallowed"],[[7424,7467],"valid"],[[7468,7468],"mapped",[97]],[[7469,7469],"mapped",[230]],[[7470,7470],"mapped",[98]],[[7471,7471],"valid"],[[7472,7472],"mapped",[100]],[[7473,7473],"mapped",[101]],[[7474,7474],"mapped",[477]],[[7475,7475],"mapped",[103]],[[7476,7476],"mapped",[104]],[[7477,7477],"mapped",[105]],[[7478,7478],"mapped",[106]],[[7479,7479],"mapped",[107]],[[7480,7480],"mapped",[108]],[[7481,7481],"mapped",[109]],[[7482,7482],"mapped",[110]],[[7483,7483],"valid"],[[7484,7484],"mapped",[111]],[[7485,7485],"mapped",[547]],[[7486,7486],"mapped",[112]],[[7487,7487],"mapped",[114]],[[7488,7488],"mapped",[116]],[[7489,7489],"mapped",[117]],[[7490,7490],"mapped",[119]],[[7491,7491],"mapped",[97]],[[7492,7492],"mapped",[592]],[[7493,7493],"mapped",[593]],[[7494,7494],"mapped",[7426]],[[7495,7495],"mapped",[98]],[[7496,7496],"mapped",[100]],[[7497,7497],"mapped",[101]],[[7498,7498],"mapped",[601]],[[7499,7499],"mapped",[603]],[[7500,7500],"mapped",[604]],[[7501,7501],"mapped",[103]],[[7502,7502],"valid"],[[7503,7503],"mapped",[107]],[[7504,7504],"mapped",[109]],[[7505,7505],"mapped",[331]],[[7506,7506],"mapped",[111]],[[7507,7507],"mapped",[596]],[[7508,7508],"mapped",[7446]],[[7509,7509],"mapped",[7447]],[[7510,7510],"mapped",[112]],[[7511,7511],"mapped",[116]],[[7512,7512],"mapped",[117]],[[7513,7513],"mapped",[7453]],[[7514,7514],"mapped",[623]],[[7515,7515],"mapped",[118]],[[7516,7516],"mapped",[7461]],[[7517,7517],"mapped",[946]],[[7518,7518],"mapped",[947]],[[7519,7519],"mapped",[948]],[[7520,7520],"mapped",[966]],[[7521,7521],"mapped",[967]],[[7522,7522],"mapped",[105]],[[7523,7523],"mapped",[114]],[[7524,7524],"mapped",[117]],[[7525,7525],"mapped",[118]],[[7526,7526],"mapped",[946]],[[7527,7527],"mapped",[947]],[[7528,7528],"mapped",[961]],[[7529,7529],"mapped",[966]],[[7530,7530],"mapped",[967]],[[7531,7531],"valid"],[[7532,7543],"valid"],[[7544,7544],"mapped",[1085]],[[7545,7578],"valid"],[[7579,7579],"mapped",[594]],[[7580,7580],"mapped",[99]],[[7581,7581],"mapped",[597]],[[7582,7582],"mapped",[240]],[[7583,7583],"mapped",[604]],[[7584,7584],"mapped",[102]],[[7585,7585],"mapped",[607]],[[7586,7586],"mapped",[609]],[[7587,7587],"mapped",[613]],[[7588,7588],"mapped",[616]],[[7589,7589],"mapped",[617]],[[7590,7590],"mapped",[618]],[[7591,7591],"mapped",[7547]],[[7592,7592],"mapped",[669]],[[7593,7593],"mapped",[621]],[[7594,7594],"mapped",[7557]],[[7595,7595],"mapped",[671]],[[7596,7596],"mapped",[625]],[[7597,7597],"mapped",[624]],[[7598,7598],"mapped",[626]],[[7599,7599],"mapped",[627]],[[7600,7600],"mapped",[628]],[[7601,7601],"mapped",[629]],[[7602,7602],"mapped",[632]],[[7603,7603],"mapped",[642]],[[7604,7604],"mapped",[643]],[[7605,7605],"mapped",[427]],[[7606,7606],"mapped",[649]],[[7607,7607],"mapped",[650]],[[7608,7608],"mapped",[7452]],[[7609,7609],"mapped",[651]],[[7610,7610],"mapped",[652]],[[7611,7611],"mapped",[122]],[[7612,7612],"mapped",[656]],[[7613,7613],"mapped",[657]],[[7614,7614],"mapped",[658]],[[7615,7615],"mapped",[952]],[[7616,7619],"valid"],[[7620,7626],"valid"],[[7627,7654],"valid"],[[7655,7669],"valid"],[[7670,7675],"disallowed"],[[7676,7676],"valid"],[[7677,7677],"valid"],[[7678,7679],"valid"],[[7680,7680],"mapped",[7681]],[[7681,7681],"valid"],[[7682,7682],"mapped",[7683]],[[7683,7683],"valid"],[[7684,7684],"mapped",[7685]],[[7685,7685],"valid"],[[7686,7686],"mapped",[7687]],[[7687,7687],"valid"],[[7688,7688],"mapped",[7689]],[[7689,7689],"valid"],[[7690,7690],"mapped",[7691]],[[7691,7691],"valid"],[[7692,7692],"mapped",[7693]],[[7693,7693],"valid"],[[7694,7694],"mapped",[7695]],[[7695,7695],"valid"],[[7696,7696],"mapped",[7697]],[[7697,7697],"valid"],[[7698,7698],"mapped",[7699]],[[7699,7699],"valid"],[[7700,7700],"mapped",[7701]],[[7701,7701],"valid"],[[7702,7702],"mapped",[7703]],[[7703,7703],"valid"],[[7704,7704],"mapped",[7705]],[[7705,7705],"valid"],[[7706,7706],"mapped",[7707]],[[7707,7707],"valid"],[[7708,7708],"mapped",[7709]],[[7709,7709],"valid"],[[7710,7710],"mapped",[7711]],[[7711,7711],"valid"],[[7712,7712],"mapped",[7713]],[[7713,7713],"valid"],[[7714,7714],"mapped",[7715]],[[7715,7715],"valid"],[[7716,7716],"mapped",[7717]],[[7717,7717],"valid"],[[7718,7718],"mapped",[7719]],[[7719,7719],"valid"],[[7720,7720],"mapped",[7721]],[[7721,7721],"valid"],[[7722,7722],"mapped",[7723]],[[7723,7723],"valid"],[[7724,7724],"mapped",[7725]],[[7725,7725],"valid"],[[7726,7726],"mapped",[7727]],[[7727,7727],"valid"],[[7728,7728],"mapped",[7729]],[[7729,7729],"valid"],[[7730,7730],"mapped",[7731]],[[7731,7731],"valid"],[[7732,7732],"mapped",[7733]],[[7733,7733],"valid"],[[7734,7734],"mapped",[7735]],[[7735,7735],"valid"],[[7736,7736],"mapped",[7737]],[[7737,7737],"valid"],[[7738,7738],"mapped",[7739]],[[7739,7739],"valid"],[[7740,7740],"mapped",[7741]],[[7741,7741],"valid"],[[7742,7742],"mapped",[7743]],[[7743,7743],"valid"],[[7744,7744],"mapped",[7745]],[[7745,7745],"valid"],[[7746,7746],"mapped",[7747]],[[7747,7747],"valid"],[[7748,7748],"mapped",[7749]],[[7749,7749],"valid"],[[7750,7750],"mapped",[7751]],[[7751,7751],"valid"],[[7752,7752],"mapped",[7753]],[[7753,7753],"valid"],[[7754,7754],"mapped",[7755]],[[7755,7755],"valid"],[[7756,7756],"mapped",[7757]],[[7757,7757],"valid"],[[7758,7758],"mapped",[7759]],[[7759,7759],"valid"],[[7760,7760],"mapped",[7761]],[[7761,7761],"valid"],[[7762,7762],"mapped",[7763]],[[7763,7763],"valid"],[[7764,7764],"mapped",[7765]],[[7765,7765],"valid"],[[7766,7766],"mapped",[7767]],[[7767,7767],"valid"],[[7768,7768],"mapped",[7769]],[[7769,7769],"valid"],[[7770,7770],"mapped",[7771]],[[7771,7771],"valid"],[[7772,7772],"mapped",[7773]],[[7773,7773],"valid"],[[7774,7774],"mapped",[7775]],[[7775,7775],"valid"],[[7776,7776],"mapped",[7777]],[[7777,7777],"valid"],[[7778,7778],"mapped",[7779]],[[7779,7779],"valid"],[[7780,7780],"mapped",[7781]],[[7781,7781],"valid"],[[7782,7782],"mapped",[7783]],[[7783,7783],"valid"],[[7784,7784],"mapped",[7785]],[[7785,7785],"valid"],[[7786,7786],"mapped",[7787]],[[7787,7787],"valid"],[[7788,7788],"mapped",[7789]],[[7789,7789],"valid"],[[7790,7790],"mapped",[7791]],[[7791,7791],"valid"],[[7792,7792],"mapped",[7793]],[[7793,7793],"valid"],[[7794,7794],"mapped",[7795]],[[7795,7795],"valid"],[[7796,7796],"mapped",[7797]],[[7797,7797],"valid"],[[7798,7798],"mapped",[7799]],[[7799,7799],"valid"],[[7800,7800],"mapped",[7801]],[[7801,7801],"valid"],[[7802,7802],"mapped",[7803]],[[7803,7803],"valid"],[[7804,7804],"mapped",[7805]],[[7805,7805],"valid"],[[7806,7806],"mapped",[7807]],[[7807,7807],"valid"],[[7808,7808],"mapped",[7809]],[[7809,7809],"valid"],[[7810,7810],"mapped",[7811]],[[7811,7811],"valid"],[[7812,7812],"mapped",[7813]],[[7813,7813],"valid"],[[7814,7814],"mapped",[7815]],[[7815,7815],"valid"],[[7816,7816],"mapped",[7817]],[[7817,7817],"valid"],[[7818,7818],"mapped",[7819]],[[7819,7819],"valid"],[[7820,7820],"mapped",[7821]],[[7821,7821],"valid"],[[7822,7822],"mapped",[7823]],[[7823,7823],"valid"],[[7824,7824],"mapped",[7825]],[[7825,7825],"valid"],[[7826,7826],"mapped",[7827]],[[7827,7827],"valid"],[[7828,7828],"mapped",[7829]],[[7829,7833],"valid"],[[7834,7834],"mapped",[97,702]],[[7835,7835],"mapped",[7777]],[[7836,7837],"valid"],[[7838,7838],"mapped",[115,115]],[[7839,7839],"valid"],[[7840,7840],"mapped",[7841]],[[7841,7841],"valid"],[[7842,7842],"mapped",[7843]],[[7843,7843],"valid"],[[7844,7844],"mapped",[7845]],[[7845,7845],"valid"],[[7846,7846],"mapped",[7847]],[[7847,7847],"valid"],[[7848,7848],"mapped",[7849]],[[7849,7849],"valid"],[[7850,7850],"mapped",[7851]],[[7851,7851],"valid"],[[7852,7852],"mapped",[7853]],[[7853,7853],"valid"],[[7854,7854],"mapped",[7855]],[[7855,7855],"valid"],[[7856,7856],"mapped",[7857]],[[7857,7857],"valid"],[[7858,7858],"mapped",[7859]],[[7859,7859],"valid"],[[7860,7860],"mapped",[7861]],[[7861,7861],"valid"],[[7862,7862],"mapped",[7863]],[[7863,7863],"valid"],[[7864,7864],"mapped",[7865]],[[7865,7865],"valid"],[[7866,7866],"mapped",[7867]],[[7867,7867],"valid"],[[7868,7868],"mapped",[7869]],[[7869,7869],"valid"],[[7870,7870],"mapped",[7871]],[[7871,7871],"valid"],[[7872,7872],"mapped",[7873]],[[7873,7873],"valid"],[[7874,7874],"mapped",[7875]],[[7875,7875],"valid"],[[7876,7876],"mapped",[7877]],[[7877,7877],"valid"],[[7878,7878],"mapped",[7879]],[[7879,7879],"valid"],[[7880,7880],"mapped",[7881]],[[7881,7881],"valid"],[[7882,7882],"mapped",[7883]],[[7883,7883],"valid"],[[7884,7884],"mapped",[7885]],[[7885,7885],"valid"],[[7886,7886],"mapped",[7887]],[[7887,7887],"valid"],[[7888,7888],"mapped",[7889]],[[7889,7889],"valid"],[[7890,7890],"mapped",[7891]],[[7891,7891],"valid"],[[7892,7892],"mapped",[7893]],[[7893,7893],"valid"],[[7894,7894],"mapped",[7895]],[[7895,7895],"valid"],[[7896,7896],"mapped",[7897]],[[7897,7897],"valid"],[[7898,7898],"mapped",[7899]],[[7899,7899],"valid"],[[7900,7900],"mapped",[7901]],[[7901,7901],"valid"],[[7902,7902],"mapped",[7903]],[[7903,7903],"valid"],[[7904,7904],"mapped",[7905]],[[7905,7905],"valid"],[[7906,7906],"mapped",[7907]],[[7907,7907],"valid"],[[7908,7908],"mapped",[7909]],[[7909,7909],"valid"],[[7910,7910],"mapped",[7911]],[[7911,7911],"valid"],[[7912,7912],"mapped",[7913]],[[7913,7913],"valid"],[[7914,7914],"mapped",[7915]],[[7915,7915],"valid"],[[7916,7916],"mapped",[7917]],[[7917,7917],"valid"],[[7918,7918],"mapped",[7919]],[[7919,7919],"valid"],[[7920,7920],"mapped",[7921]],[[7921,7921],"valid"],[[7922,7922],"mapped",[7923]],[[7923,7923],"valid"],[[7924,7924],"mapped",[7925]],[[7925,7925],"valid"],[[7926,7926],"mapped",[7927]],[[7927,7927],"valid"],[[7928,7928],"mapped",[7929]],[[7929,7929],"valid"],[[7930,7930],"mapped",[7931]],[[7931,7931],"valid"],[[7932,7932],"mapped",[7933]],[[7933,7933],"valid"],[[7934,7934],"mapped",[7935]],[[7935,7935],"valid"],[[7936,7943],"valid"],[[7944,7944],"mapped",[7936]],[[7945,7945],"mapped",[7937]],[[7946,7946],"mapped",[7938]],[[7947,7947],"mapped",[7939]],[[7948,7948],"mapped",[7940]],[[7949,7949],"mapped",[7941]],[[7950,7950],"mapped",[7942]],[[7951,7951],"mapped",[7943]],[[7952,7957],"valid"],[[7958,7959],"disallowed"],[[7960,7960],"mapped",[7952]],[[7961,7961],"mapped",[7953]],[[7962,7962],"mapped",[7954]],[[7963,7963],"mapped",[7955]],[[7964,7964],"mapped",[7956]],[[7965,7965],"mapped",[7957]],[[7966,7967],"disallowed"],[[7968,7975],"valid"],[[7976,7976],"mapped",[7968]],[[7977,7977],"mapped",[7969]],[[7978,7978],"mapped",[7970]],[[7979,7979],"mapped",[7971]],[[7980,7980],"mapped",[7972]],[[7981,7981],"mapped",[7973]],[[7982,7982],"mapped",[7974]],[[7983,7983],"mapped",[7975]],[[7984,7991],"valid"],[[7992,7992],"mapped",[7984]],[[7993,7993],"mapped",[7985]],[[7994,7994],"mapped",[7986]],[[7995,7995],"mapped",[7987]],[[7996,7996],"mapped",[7988]],[[7997,7997],"mapped",[7989]],[[7998,7998],"mapped",[7990]],[[7999,7999],"mapped",[7991]],[[8000,8005],"valid"],[[8006,8007],"disallowed"],[[8008,8008],"mapped",[8000]],[[8009,8009],"mapped",[8001]],[[8010,8010],"mapped",[8002]],[[8011,8011],"mapped",[8003]],[[8012,8012],"mapped",[8004]],[[8013,8013],"mapped",[8005]],[[8014,8015],"disallowed"],[[8016,8023],"valid"],[[8024,8024],"disallowed"],[[8025,8025],"mapped",[8017]],[[8026,8026],"disallowed"],[[8027,8027],"mapped",[8019]],[[8028,8028],"disallowed"],[[8029,8029],"mapped",[8021]],[[8030,8030],"disallowed"],[[8031,8031],"mapped",[8023]],[[8032,8039],"valid"],[[8040,8040],"mapped",[8032]],[[8041,8041],"mapped",[8033]],[[8042,8042],"mapped",[8034]],[[8043,8043],"mapped",[8035]],[[8044,8044],"mapped",[8036]],[[8045,8045],"mapped",[8037]],[[8046,8046],"mapped",[8038]],[[8047,8047],"mapped",[8039]],[[8048,8048],"valid"],[[8049,8049],"mapped",[940]],[[8050,8050],"valid"],[[8051,8051],"mapped",[941]],[[8052,8052],"valid"],[[8053,8053],"mapped",[942]],[[8054,8054],"valid"],[[8055,8055],"mapped",[943]],[[8056,8056],"valid"],[[8057,8057],"mapped",[972]],[[8058,8058],"valid"],[[8059,8059],"mapped",[973]],[[8060,8060],"valid"],[[8061,8061],"mapped",[974]],[[8062,8063],"disallowed"],[[8064,8064],"mapped",[7936,953]],[[8065,8065],"mapped",[7937,953]],[[8066,8066],"mapped",[7938,953]],[[8067,8067],"mapped",[7939,953]],[[8068,8068],"mapped",[7940,953]],[[8069,8069],"mapped",[7941,953]],[[8070,8070],"mapped",[7942,953]],[[8071,8071],"mapped",[7943,953]],[[8072,8072],"mapped",[7936,953]],[[8073,8073],"mapped",[7937,953]],[[8074,8074],"mapped",[7938,953]],[[8075,8075],"mapped",[7939,953]],[[8076,8076],"mapped",[7940,953]],[[8077,8077],"mapped",[7941,953]],[[8078,8078],"mapped",[7942,953]],[[8079,8079],"mapped",[7943,953]],[[8080,8080],"mapped",[7968,953]],[[8081,8081],"mapped",[7969,953]],[[8082,8082],"mapped",[7970,953]],[[8083,8083],"mapped",[7971,953]],[[8084,8084],"mapped",[7972,953]],[[8085,8085],"mapped",[7973,953]],[[8086,8086],"mapped",[7974,953]],[[8087,8087],"mapped",[7975,953]],[[8088,8088],"mapped",[7968,953]],[[8089,8089],"mapped",[7969,953]],[[8090,8090],"mapped",[7970,953]],[[8091,8091],"mapped",[7971,953]],[[8092,8092],"mapped",[7972,953]],[[8093,8093],"mapped",[7973,953]],[[8094,8094],"mapped",[7974,953]],[[8095,8095],"mapped",[7975,953]],[[8096,8096],"mapped",[8032,953]],[[8097,8097],"mapped",[8033,953]],[[8098,8098],"mapped",[8034,953]],[[8099,8099],"mapped",[8035,953]],[[8100,8100],"mapped",[8036,953]],[[8101,8101],"mapped",[8037,953]],[[8102,8102],"mapped",[8038,953]],[[8103,8103],"mapped",[8039,953]],[[8104,8104],"mapped",[8032,953]],[[8105,8105],"mapped",[8033,953]],[[8106,8106],"mapped",[8034,953]],[[8107,8107],"mapped",[8035,953]],[[8108,8108],"mapped",[8036,953]],[[8109,8109],"mapped",[8037,953]],[[8110,8110],"mapped",[8038,953]],[[8111,8111],"mapped",[8039,953]],[[8112,8113],"valid"],[[8114,8114],"mapped",[8048,953]],[[8115,8115],"mapped",[945,953]],[[8116,8116],"mapped",[940,953]],[[8117,8117],"disallowed"],[[8118,8118],"valid"],[[8119,8119],"mapped",[8118,953]],[[8120,8120],"mapped",[8112]],[[8121,8121],"mapped",[8113]],[[8122,8122],"mapped",[8048]],[[8123,8123],"mapped",[940]],[[8124,8124],"mapped",[945,953]],[[8125,8125],"disallowed_STD3_mapped",[32,787]],[[8126,8126],"mapped",[953]],[[8127,8127],"disallowed_STD3_mapped",[32,787]],[[8128,8128],"disallowed_STD3_mapped",[32,834]],[[8129,8129],"disallowed_STD3_mapped",[32,776,834]],[[8130,8130],"mapped",[8052,953]],[[8131,8131],"mapped",[951,953]],[[8132,8132],"mapped",[942,953]],[[8133,8133],"disallowed"],[[8134,8134],"valid"],[[8135,8135],"mapped",[8134,953]],[[8136,8136],"mapped",[8050]],[[8137,8137],"mapped",[941]],[[8138,8138],"mapped",[8052]],[[8139,8139],"mapped",[942]],[[8140,8140],"mapped",[951,953]],[[8141,8141],"disallowed_STD3_mapped",[32,787,768]],[[8142,8142],"disallowed_STD3_mapped",[32,787,769]],[[8143,8143],"disallowed_STD3_mapped",[32,787,834]],[[8144,8146],"valid"],[[8147,8147],"mapped",[912]],[[8148,8149],"disallowed"],[[8150,8151],"valid"],[[8152,8152],"mapped",[8144]],[[8153,8153],"mapped",[8145]],[[8154,8154],"mapped",[8054]],[[8155,8155],"mapped",[943]],[[8156,8156],"disallowed"],[[8157,8157],"disallowed_STD3_mapped",[32,788,768]],[[8158,8158],"disallowed_STD3_mapped",[32,788,769]],[[8159,8159],"disallowed_STD3_mapped",[32,788,834]],[[8160,8162],"valid"],[[8163,8163],"mapped",[944]],[[8164,8167],"valid"],[[8168,8168],"mapped",[8160]],[[8169,8169],"mapped",[8161]],[[8170,8170],"mapped",[8058]],[[8171,8171],"mapped",[973]],[[8172,8172],"mapped",[8165]],[[8173,8173],"disallowed_STD3_mapped",[32,776,768]],[[8174,8174],"disallowed_STD3_mapped",[32,776,769]],[[8175,8175],"disallowed_STD3_mapped",[96]],[[8176,8177],"disallowed"],[[8178,8178],"mapped",[8060,953]],[[8179,8179],"mapped",[969,953]],[[8180,8180],"mapped",[974,953]],[[8181,8181],"disallowed"],[[8182,8182],"valid"],[[8183,8183],"mapped",[8182,953]],[[8184,8184],"mapped",[8056]],[[8185,8185],"mapped",[972]],[[8186,8186],"mapped",[8060]],[[8187,8187],"mapped",[974]],[[8188,8188],"mapped",[969,953]],[[8189,8189],"disallowed_STD3_mapped",[32,769]],[[8190,8190],"disallowed_STD3_mapped",[32,788]],[[8191,8191],"disallowed"],[[8192,8202],"disallowed_STD3_mapped",[32]],[[8203,8203],"ignored"],[[8204,8205],"deviation",[]],[[8206,8207],"disallowed"],[[8208,8208],"valid",[],"NV8"],[[8209,8209],"mapped",[8208]],[[8210,8214],"valid",[],"NV8"],[[8215,8215],"disallowed_STD3_mapped",[32,819]],[[8216,8227],"valid",[],"NV8"],[[8228,8230],"disallowed"],[[8231,8231],"valid",[],"NV8"],[[8232,8238],"disallowed"],[[8239,8239],"disallowed_STD3_mapped",[32]],[[8240,8242],"valid",[],"NV8"],[[8243,8243],"mapped",[8242,8242]],[[8244,8244],"mapped",[8242,8242,8242]],[[8245,8245],"valid",[],"NV8"],[[8246,8246],"mapped",[8245,8245]],[[8247,8247],"mapped",[8245,8245,8245]],[[8248,8251],"valid",[],"NV8"],[[8252,8252],"disallowed_STD3_mapped",[33,33]],[[8253,8253],"valid",[],"NV8"],[[8254,8254],"disallowed_STD3_mapped",[32,773]],[[8255,8262],"valid",[],"NV8"],[[8263,8263],"disallowed_STD3_mapped",[63,63]],[[8264,8264],"disallowed_STD3_mapped",[63,33]],[[8265,8265],"disallowed_STD3_mapped",[33,63]],[[8266,8269],"valid",[],"NV8"],[[8270,8274],"valid",[],"NV8"],[[8275,8276],"valid",[],"NV8"],[[8277,8278],"valid",[],"NV8"],[[8279,8279],"mapped",[8242,8242,8242,8242]],[[8280,8286],"valid",[],"NV8"],[[8287,8287],"disallowed_STD3_mapped",[32]],[[8288,8288],"ignored"],[[8289,8291],"disallowed"],[[8292,8292],"ignored"],[[8293,8293],"disallowed"],[[8294,8297],"disallowed"],[[8298,8303],"disallowed"],[[8304,8304],"mapped",[48]],[[8305,8305],"mapped",[105]],[[8306,8307],"disallowed"],[[8308,8308],"mapped",[52]],[[8309,8309],"mapped",[53]],[[8310,8310],"mapped",[54]],[[8311,8311],"mapped",[55]],[[8312,8312],"mapped",[56]],[[8313,8313],"mapped",[57]],[[8314,8314],"disallowed_STD3_mapped",[43]],[[8315,8315],"mapped",[8722]],[[8316,8316],"disallowed_STD3_mapped",[61]],[[8317,8317],"disallowed_STD3_mapped",[40]],[[8318,8318],"disallowed_STD3_mapped",[41]],[[8319,8319],"mapped",[110]],[[8320,8320],"mapped",[48]],[[8321,8321],"mapped",[49]],[[8322,8322],"mapped",[50]],[[8323,8323],"mapped",[51]],[[8324,8324],"mapped",[52]],[[8325,8325],"mapped",[53]],[[8326,8326],"mapped",[54]],[[8327,8327],"mapped",[55]],[[8328,8328],"mapped",[56]],[[8329,8329],"mapped",[57]],[[8330,8330],"disallowed_STD3_mapped",[43]],[[8331,8331],"mapped",[8722]],[[8332,8332],"disallowed_STD3_mapped",[61]],[[8333,8333],"disallowed_STD3_mapped",[40]],[[8334,8334],"disallowed_STD3_mapped",[41]],[[8335,8335],"disallowed"],[[8336,8336],"mapped",[97]],[[8337,8337],"mapped",[101]],[[8338,8338],"mapped",[111]],[[8339,8339],"mapped",[120]],[[8340,8340],"mapped",[601]],[[8341,8341],"mapped",[104]],[[8342,8342],"mapped",[107]],[[8343,8343],"mapped",[108]],[[8344,8344],"mapped",[109]],[[8345,8345],"mapped",[110]],[[8346,8346],"mapped",[112]],[[8347,8347],"mapped",[115]],[[8348,8348],"mapped",[116]],[[8349,8351],"disallowed"],[[8352,8359],"valid",[],"NV8"],[[8360,8360],"mapped",[114,115]],[[8361,8362],"valid",[],"NV8"],[[8363,8363],"valid",[],"NV8"],[[8364,8364],"valid",[],"NV8"],[[8365,8367],"valid",[],"NV8"],[[8368,8369],"valid",[],"NV8"],[[8370,8373],"valid",[],"NV8"],[[8374,8376],"valid",[],"NV8"],[[8377,8377],"valid",[],"NV8"],[[8378,8378],"valid",[],"NV8"],[[8379,8381],"valid",[],"NV8"],[[8382,8382],"valid",[],"NV8"],[[8383,8399],"disallowed"],[[8400,8417],"valid",[],"NV8"],[[8418,8419],"valid",[],"NV8"],[[8420,8426],"valid",[],"NV8"],[[8427,8427],"valid",[],"NV8"],[[8428,8431],"valid",[],"NV8"],[[8432,8432],"valid",[],"NV8"],[[8433,8447],"disallowed"],[[8448,8448],"disallowed_STD3_mapped",[97,47,99]],[[8449,8449],"disallowed_STD3_mapped",[97,47,115]],[[8450,8450],"mapped",[99]],[[8451,8451],"mapped",[176,99]],[[8452,8452],"valid",[],"NV8"],[[8453,8453],"disallowed_STD3_mapped",[99,47,111]],[[8454,8454],"disallowed_STD3_mapped",[99,47,117]],[[8455,8455],"mapped",[603]],[[8456,8456],"valid",[],"NV8"],[[8457,8457],"mapped",[176,102]],[[8458,8458],"mapped",[103]],[[8459,8462],"mapped",[104]],[[8463,8463],"mapped",[295]],[[8464,8465],"mapped",[105]],[[8466,8467],"mapped",[108]],[[8468,8468],"valid",[],"NV8"],[[8469,8469],"mapped",[110]],[[8470,8470],"mapped",[110,111]],[[8471,8472],"valid",[],"NV8"],[[8473,8473],"mapped",[112]],[[8474,8474],"mapped",[113]],[[8475,8477],"mapped",[114]],[[8478,8479],"valid",[],"NV8"],[[8480,8480],"mapped",[115,109]],[[8481,8481],"mapped",[116,101,108]],[[8482,8482],"mapped",[116,109]],[[8483,8483],"valid",[],"NV8"],[[8484,8484],"mapped",[122]],[[8485,8485],"valid",[],"NV8"],[[8486,8486],"mapped",[969]],[[8487,8487],"valid",[],"NV8"],[[8488,8488],"mapped",[122]],[[8489,8489],"valid",[],"NV8"],[[8490,8490],"mapped",[107]],[[8491,8491],"mapped",[229]],[[8492,8492],"mapped",[98]],[[8493,8493],"mapped",[99]],[[8494,8494],"valid",[],"NV8"],[[8495,8496],"mapped",[101]],[[8497,8497],"mapped",[102]],[[8498,8498],"disallowed"],[[8499,8499],"mapped",[109]],[[8500,8500],"mapped",[111]],[[8501,8501],"mapped",[1488]],[[8502,8502],"mapped",[1489]],[[8503,8503],"mapped",[1490]],[[8504,8504],"mapped",[1491]],[[8505,8505],"mapped",[105]],[[8506,8506],"valid",[],"NV8"],[[8507,8507],"mapped",[102,97,120]],[[8508,8508],"mapped",[960]],[[8509,8510],"mapped",[947]],[[8511,8511],"mapped",[960]],[[8512,8512],"mapped",[8721]],[[8513,8516],"valid",[],"NV8"],[[8517,8518],"mapped",[100]],[[8519,8519],"mapped",[101]],[[8520,8520],"mapped",[105]],[[8521,8521],"mapped",[106]],[[8522,8523],"valid",[],"NV8"],[[8524,8524],"valid",[],"NV8"],[[8525,8525],"valid",[],"NV8"],[[8526,8526],"valid"],[[8527,8527],"valid",[],"NV8"],[[8528,8528],"mapped",[49,8260,55]],[[8529,8529],"mapped",[49,8260,57]],[[8530,8530],"mapped",[49,8260,49,48]],[[8531,8531],"mapped",[49,8260,51]],[[8532,8532],"mapped",[50,8260,51]],[[8533,8533],"mapped",[49,8260,53]],[[8534,8534],"mapped",[50,8260,53]],[[8535,8535],"mapped",[51,8260,53]],[[8536,8536],"mapped",[52,8260,53]],[[8537,8537],"mapped",[49,8260,54]],[[8538,8538],"mapped",[53,8260,54]],[[8539,8539],"mapped",[49,8260,56]],[[8540,8540],"mapped",[51,8260,56]],[[8541,8541],"mapped",[53,8260,56]],[[8542,8542],"mapped",[55,8260,56]],[[8543,8543],"mapped",[49,8260]],[[8544,8544],"mapped",[105]],[[8545,8545],"mapped",[105,105]],[[8546,8546],"mapped",[105,105,105]],[[8547,8547],"mapped",[105,118]],[[8548,8548],"mapped",[118]],[[8549,8549],"mapped",[118,105]],[[8550,8550],"mapped",[118,105,105]],[[8551,8551],"mapped",[118,105,105,105]],[[8552,8552],"mapped",[105,120]],[[8553,8553],"mapped",[120]],[[8554,8554],"mapped",[120,105]],[[8555,8555],"mapped",[120,105,105]],[[8556,8556],"mapped",[108]],[[8557,8557],"mapped",[99]],[[8558,8558],"mapped",[100]],[[8559,8559],"mapped",[109]],[[8560,8560],"mapped",[105]],[[8561,8561],"mapped",[105,105]],[[8562,8562],"mapped",[105,105,105]],[[8563,8563],"mapped",[105,118]],[[8564,8564],"mapped",[118]],[[8565,8565],"mapped",[118,105]],[[8566,8566],"mapped",[118,105,105]],[[8567,8567],"mapped",[118,105,105,105]],[[8568,8568],"mapped",[105,120]],[[8569,8569],"mapped",[120]],[[8570,8570],"mapped",[120,105]],[[8571,8571],"mapped",[120,105,105]],[[8572,8572],"mapped",[108]],[[8573,8573],"mapped",[99]],[[8574,8574],"mapped",[100]],[[8575,8575],"mapped",[109]],[[8576,8578],"valid",[],"NV8"],[[8579,8579],"disallowed"],[[8580,8580],"valid"],[[8581,8584],"valid",[],"NV8"],[[8585,8585],"mapped",[48,8260,51]],[[8586,8587],"valid",[],"NV8"],[[8588,8591],"disallowed"],[[8592,8682],"valid",[],"NV8"],[[8683,8691],"valid",[],"NV8"],[[8692,8703],"valid",[],"NV8"],[[8704,8747],"valid",[],"NV8"],[[8748,8748],"mapped",[8747,8747]],[[8749,8749],"mapped",[8747,8747,8747]],[[8750,8750],"valid",[],"NV8"],[[8751,8751],"mapped",[8750,8750]],[[8752,8752],"mapped",[8750,8750,8750]],[[8753,8799],"valid",[],"NV8"],[[8800,8800],"disallowed_STD3_valid"],[[8801,8813],"valid",[],"NV8"],[[8814,8815],"disallowed_STD3_valid"],[[8816,8945],"valid",[],"NV8"],[[8946,8959],"valid",[],"NV8"],[[8960,8960],"valid",[],"NV8"],[[8961,8961],"valid",[],"NV8"],[[8962,9000],"valid",[],"NV8"],[[9001,9001],"mapped",[12296]],[[9002,9002],"mapped",[12297]],[[9003,9082],"valid",[],"NV8"],[[9083,9083],"valid",[],"NV8"],[[9084,9084],"valid",[],"NV8"],[[9085,9114],"valid",[],"NV8"],[[9115,9166],"valid",[],"NV8"],[[9167,9168],"valid",[],"NV8"],[[9169,9179],"valid",[],"NV8"],[[9180,9191],"valid",[],"NV8"],[[9192,9192],"valid",[],"NV8"],[[9193,9203],"valid",[],"NV8"],[[9204,9210],"valid",[],"NV8"],[[9211,9215],"disallowed"],[[9216,9252],"valid",[],"NV8"],[[9253,9254],"valid",[],"NV8"],[[9255,9279],"disallowed"],[[9280,9290],"valid",[],"NV8"],[[9291,9311],"disallowed"],[[9312,9312],"mapped",[49]],[[9313,9313],"mapped",[50]],[[9314,9314],"mapped",[51]],[[9315,9315],"mapped",[52]],[[9316,9316],"mapped",[53]],[[9317,9317],"mapped",[54]],[[9318,9318],"mapped",[55]],[[9319,9319],"mapped",[56]],[[9320,9320],"mapped",[57]],[[9321,9321],"mapped",[49,48]],[[9322,9322],"mapped",[49,49]],[[9323,9323],"mapped",[49,50]],[[9324,9324],"mapped",[49,51]],[[9325,9325],"mapped",[49,52]],[[9326,9326],"mapped",[49,53]],[[9327,9327],"mapped",[49,54]],[[9328,9328],"mapped",[49,55]],[[9329,9329],"mapped",[49,56]],[[9330,9330],"mapped",[49,57]],[[9331,9331],"mapped",[50,48]],[[9332,9332],"disallowed_STD3_mapped",[40,49,41]],[[9333,9333],"disallowed_STD3_mapped",[40,50,41]],[[9334,9334],"disallowed_STD3_mapped",[40,51,41]],[[9335,9335],"disallowed_STD3_mapped",[40,52,41]],[[9336,9336],"disallowed_STD3_mapped",[40,53,41]],[[9337,9337],"disallowed_STD3_mapped",[40,54,41]],[[9338,9338],"disallowed_STD3_mapped",[40,55,41]],[[9339,9339],"disallowed_STD3_mapped",[40,56,41]],[[9340,9340],"disallowed_STD3_mapped",[40,57,41]],[[9341,9341],"disallowed_STD3_mapped",[40,49,48,41]],[[9342,9342],"disallowed_STD3_mapped",[40,49,49,41]],[[9343,9343],"disallowed_STD3_mapped",[40,49,50,41]],[[9344,9344],"disallowed_STD3_mapped",[40,49,51,41]],[[9345,9345],"disallowed_STD3_mapped",[40,49,52,41]],[[9346,9346],"disallowed_STD3_mapped",[40,49,53,41]],[[9347,9347],"disallowed_STD3_mapped",[40,49,54,41]],[[9348,9348],"disallowed_STD3_mapped",[40,49,55,41]],[[9349,9349],"disallowed_STD3_mapped",[40,49,56,41]],[[9350,9350],"disallowed_STD3_mapped",[40,49,57,41]],[[9351,9351],"disallowed_STD3_mapped",[40,50,48,41]],[[9352,9371],"disallowed"],[[9372,9372],"disallowed_STD3_mapped",[40,97,41]],[[9373,9373],"disallowed_STD3_mapped",[40,98,41]],[[9374,9374],"disallowed_STD3_mapped",[40,99,41]],[[9375,9375],"disallowed_STD3_mapped",[40,100,41]],[[9376,9376],"disallowed_STD3_mapped",[40,101,41]],[[9377,9377],"disallowed_STD3_mapped",[40,102,41]],[[9378,9378],"disallowed_STD3_mapped",[40,103,41]],[[9379,9379],"disallowed_STD3_mapped",[40,104,41]],[[9380,9380],"disallowed_STD3_mapped",[40,105,41]],[[9381,9381],"disallowed_STD3_mapped",[40,106,41]],[[9382,9382],"disallowed_STD3_mapped",[40,107,41]],[[9383,9383],"disallowed_STD3_mapped",[40,108,41]],[[9384,9384],"disallowed_STD3_mapped",[40,109,41]],[[9385,9385],"disallowed_STD3_mapped",[40,110,41]],[[9386,9386],"disallowed_STD3_mapped",[40,111,41]],[[9387,9387],"disallowed_STD3_mapped",[40,112,41]],[[9388,9388],"disallowed_STD3_mapped",[40,113,41]],[[9389,9389],"disallowed_STD3_mapped",[40,114,41]],[[9390,9390],"disallowed_STD3_mapped",[40,115,41]],[[9391,9391],"disallowed_STD3_mapped",[40,116,41]],[[9392,9392],"disallowed_STD3_mapped",[40,117,41]],[[9393,9393],"disallowed_STD3_mapped",[40,118,41]],[[9394,9394],"disallowed_STD3_mapped",[40,119,41]],[[9395,9395],"disallowed_STD3_mapped",[40,120,41]],[[9396,9396],"disallowed_STD3_mapped",[40,121,41]],[[9397,9397],"disallowed_STD3_mapped",[40,122,41]],[[9398,9398],"mapped",[97]],[[9399,9399],"mapped",[98]],[[9400,9400],"mapped",[99]],[[9401,9401],"mapped",[100]],[[9402,9402],"mapped",[101]],[[9403,9403],"mapped",[102]],[[9404,9404],"mapped",[103]],[[9405,9405],"mapped",[104]],[[9406,9406],"mapped",[105]],[[9407,9407],"mapped",[106]],[[9408,9408],"mapped",[107]],[[9409,9409],"mapped",[108]],[[9410,9410],"mapped",[109]],[[9411,9411],"mapped",[110]],[[9412,9412],"mapped",[111]],[[9413,9413],"mapped",[112]],[[9414,9414],"mapped",[113]],[[9415,9415],"mapped",[114]],[[9416,9416],"mapped",[115]],[[9417,9417],"mapped",[116]],[[9418,9418],"mapped",[117]],[[9419,9419],"mapped",[118]],[[9420,9420],"mapped",[119]],[[9421,9421],"mapped",[120]],[[9422,9422],"mapped",[121]],[[9423,9423],"mapped",[122]],[[9424,9424],"mapped",[97]],[[9425,9425],"mapped",[98]],[[9426,9426],"mapped",[99]],[[9427,9427],"mapped",[100]],[[9428,9428],"mapped",[101]],[[9429,9429],"mapped",[102]],[[9430,9430],"mapped",[103]],[[9431,9431],"mapped",[104]],[[9432,9432],"mapped",[105]],[[9433,9433],"mapped",[106]],[[9434,9434],"mapped",[107]],[[9435,9435],"mapped",[108]],[[9436,9436],"mapped",[109]],[[9437,9437],"mapped",[110]],[[9438,9438],"mapped",[111]],[[9439,9439],"mapped",[112]],[[9440,9440],"mapped",[113]],[[9441,9441],"mapped",[114]],[[9442,9442],"mapped",[115]],[[9443,9443],"mapped",[116]],[[9444,9444],"mapped",[117]],[[9445,9445],"mapped",[118]],[[9446,9446],"mapped",[119]],[[9447,9447],"mapped",[120]],[[9448,9448],"mapped",[121]],[[9449,9449],"mapped",[122]],[[9450,9450],"mapped",[48]],[[9451,9470],"valid",[],"NV8"],[[9471,9471],"valid",[],"NV8"],[[9472,9621],"valid",[],"NV8"],[[9622,9631],"valid",[],"NV8"],[[9632,9711],"valid",[],"NV8"],[[9712,9719],"valid",[],"NV8"],[[9720,9727],"valid",[],"NV8"],[[9728,9747],"valid",[],"NV8"],[[9748,9749],"valid",[],"NV8"],[[9750,9751],"valid",[],"NV8"],[[9752,9752],"valid",[],"NV8"],[[9753,9753],"valid",[],"NV8"],[[9754,9839],"valid",[],"NV8"],[[9840,9841],"valid",[],"NV8"],[[9842,9853],"valid",[],"NV8"],[[9854,9855],"valid",[],"NV8"],[[9856,9865],"valid",[],"NV8"],[[9866,9873],"valid",[],"NV8"],[[9874,9884],"valid",[],"NV8"],[[9885,9885],"valid",[],"NV8"],[[9886,9887],"valid",[],"NV8"],[[9888,9889],"valid",[],"NV8"],[[9890,9905],"valid",[],"NV8"],[[9906,9906],"valid",[],"NV8"],[[9907,9916],"valid",[],"NV8"],[[9917,9919],"valid",[],"NV8"],[[9920,9923],"valid",[],"NV8"],[[9924,9933],"valid",[],"NV8"],[[9934,9934],"valid",[],"NV8"],[[9935,9953],"valid",[],"NV8"],[[9954,9954],"valid",[],"NV8"],[[9955,9955],"valid",[],"NV8"],[[9956,9959],"valid",[],"NV8"],[[9960,9983],"valid",[],"NV8"],[[9984,9984],"valid",[],"NV8"],[[9985,9988],"valid",[],"NV8"],[[9989,9989],"valid",[],"NV8"],[[9990,9993],"valid",[],"NV8"],[[9994,9995],"valid",[],"NV8"],[[9996,10023],"valid",[],"NV8"],[[10024,10024],"valid",[],"NV8"],[[10025,10059],"valid",[],"NV8"],[[10060,10060],"valid",[],"NV8"],[[10061,10061],"valid",[],"NV8"],[[10062,10062],"valid",[],"NV8"],[[10063,10066],"valid",[],"NV8"],[[10067,10069],"valid",[],"NV8"],[[10070,10070],"valid",[],"NV8"],[[10071,10071],"valid",[],"NV8"],[[10072,10078],"valid",[],"NV8"],[[10079,10080],"valid",[],"NV8"],[[10081,10087],"valid",[],"NV8"],[[10088,10101],"valid",[],"NV8"],[[10102,10132],"valid",[],"NV8"],[[10133,10135],"valid",[],"NV8"],[[10136,10159],"valid",[],"NV8"],[[10160,10160],"valid",[],"NV8"],[[10161,10174],"valid",[],"NV8"],[[10175,10175],"valid",[],"NV8"],[[10176,10182],"valid",[],"NV8"],[[10183,10186],"valid",[],"NV8"],[[10187,10187],"valid",[],"NV8"],[[10188,10188],"valid",[],"NV8"],[[10189,10189],"valid",[],"NV8"],[[10190,10191],"valid",[],"NV8"],[[10192,10219],"valid",[],"NV8"],[[10220,10223],"valid",[],"NV8"],[[10224,10239],"valid",[],"NV8"],[[10240,10495],"valid",[],"NV8"],[[10496,10763],"valid",[],"NV8"],[[10764,10764],"mapped",[8747,8747,8747,8747]],[[10765,10867],"valid",[],"NV8"],[[10868,10868],"disallowed_STD3_mapped",[58,58,61]],[[10869,10869],"disallowed_STD3_mapped",[61,61]],[[10870,10870],"disallowed_STD3_mapped",[61,61,61]],[[10871,10971],"valid",[],"NV8"],[[10972,10972],"mapped",[10973,824]],[[10973,11007],"valid",[],"NV8"],[[11008,11021],"valid",[],"NV8"],[[11022,11027],"valid",[],"NV8"],[[11028,11034],"valid",[],"NV8"],[[11035,11039],"valid",[],"NV8"],[[11040,11043],"valid",[],"NV8"],[[11044,11084],"valid",[],"NV8"],[[11085,11087],"valid",[],"NV8"],[[11088,11092],"valid",[],"NV8"],[[11093,11097],"valid",[],"NV8"],[[11098,11123],"valid",[],"NV8"],[[11124,11125],"disallowed"],[[11126,11157],"valid",[],"NV8"],[[11158,11159],"disallowed"],[[11160,11193],"valid",[],"NV8"],[[11194,11196],"disallowed"],[[11197,11208],"valid",[],"NV8"],[[11209,11209],"disallowed"],[[11210,11217],"valid",[],"NV8"],[[11218,11243],"disallowed"],[[11244,11247],"valid",[],"NV8"],[[11248,11263],"disallowed"],[[11264,11264],"mapped",[11312]],[[11265,11265],"mapped",[11313]],[[11266,11266],"mapped",[11314]],[[11267,11267],"mapped",[11315]],[[11268,11268],"mapped",[11316]],[[11269,11269],"mapped",[11317]],[[11270,11270],"mapped",[11318]],[[11271,11271],"mapped",[11319]],[[11272,11272],"mapped",[11320]],[[11273,11273],"mapped",[11321]],[[11274,11274],"mapped",[11322]],[[11275,11275],"mapped",[11323]],[[11276,11276],"mapped",[11324]],[[11277,11277],"mapped",[11325]],[[11278,11278],"mapped",[11326]],[[11279,11279],"mapped",[11327]],[[11280,11280],"mapped",[11328]],[[11281,11281],"mapped",[11329]],[[11282,11282],"mapped",[11330]],[[11283,11283],"mapped",[11331]],[[11284,11284],"mapped",[11332]],[[11285,11285],"mapped",[11333]],[[11286,11286],"mapped",[11334]],[[11287,11287],"mapped",[11335]],[[11288,11288],"mapped",[11336]],[[11289,11289],"mapped",[11337]],[[11290,11290],"mapped",[11338]],[[11291,11291],"mapped",[11339]],[[11292,11292],"mapped",[11340]],[[11293,11293],"mapped",[11341]],[[11294,11294],"mapped",[11342]],[[11295,11295],"mapped",[11343]],[[11296,11296],"mapped",[11344]],[[11297,11297],"mapped",[11345]],[[11298,11298],"mapped",[11346]],[[11299,11299],"mapped",[11347]],[[11300,11300],"mapped",[11348]],[[11301,11301],"mapped",[11349]],[[11302,11302],"mapped",[11350]],[[11303,11303],"mapped",[11351]],[[11304,11304],"mapped",[11352]],[[11305,11305],"mapped",[11353]],[[11306,11306],"mapped",[11354]],[[11307,11307],"mapped",[11355]],[[11308,11308],"mapped",[11356]],[[11309,11309],"mapped",[11357]],[[11310,11310],"mapped",[11358]],[[11311,11311],"disallowed"],[[11312,11358],"valid"],[[11359,11359],"disallowed"],[[11360,11360],"mapped",[11361]],[[11361,11361],"valid"],[[11362,11362],"mapped",[619]],[[11363,11363],"mapped",[7549]],[[11364,11364],"mapped",[637]],[[11365,11366],"valid"],[[11367,11367],"mapped",[11368]],[[11368,11368],"valid"],[[11369,11369],"mapped",[11370]],[[11370,11370],"valid"],[[11371,11371],"mapped",[11372]],[[11372,11372],"valid"],[[11373,11373],"mapped",[593]],[[11374,11374],"mapped",[625]],[[11375,11375],"mapped",[592]],[[11376,11376],"mapped",[594]],[[11377,11377],"valid"],[[11378,11378],"mapped",[11379]],[[11379,11379],"valid"],[[11380,11380],"valid"],[[11381,11381],"mapped",[11382]],[[11382,11383],"valid"],[[11384,11387],"valid"],[[11388,11388],"mapped",[106]],[[11389,11389],"mapped",[118]],[[11390,11390],"mapped",[575]],[[11391,11391],"mapped",[576]],[[11392,11392],"mapped",[11393]],[[11393,11393],"valid"],[[11394,11394],"mapped",[11395]],[[11395,11395],"valid"],[[11396,11396],"mapped",[11397]],[[11397,11397],"valid"],[[11398,11398],"mapped",[11399]],[[11399,11399],"valid"],[[11400,11400],"mapped",[11401]],[[11401,11401],"valid"],[[11402,11402],"mapped",[11403]],[[11403,11403],"valid"],[[11404,11404],"mapped",[11405]],[[11405,11405],"valid"],[[11406,11406],"mapped",[11407]],[[11407,11407],"valid"],[[11408,11408],"mapped",[11409]],[[11409,11409],"valid"],[[11410,11410],"mapped",[11411]],[[11411,11411],"valid"],[[11412,11412],"mapped",[11413]],[[11413,11413],"valid"],[[11414,11414],"mapped",[11415]],[[11415,11415],"valid"],[[11416,11416],"mapped",[11417]],[[11417,11417],"valid"],[[11418,11418],"mapped",[11419]],[[11419,11419],"valid"],[[11420,11420],"mapped",[11421]],[[11421,11421],"valid"],[[11422,11422],"mapped",[11423]],[[11423,11423],"valid"],[[11424,11424],"mapped",[11425]],[[11425,11425],"valid"],[[11426,11426],"mapped",[11427]],[[11427,11427],"valid"],[[11428,11428],"mapped",[11429]],[[11429,11429],"valid"],[[11430,11430],"mapped",[11431]],[[11431,11431],"valid"],[[11432,11432],"mapped",[11433]],[[11433,11433],"valid"],[[11434,11434],"mapped",[11435]],[[11435,11435],"valid"],[[11436,11436],"mapped",[11437]],[[11437,11437],"valid"],[[11438,11438],"mapped",[11439]],[[11439,11439],"valid"],[[11440,11440],"mapped",[11441]],[[11441,11441],"valid"],[[11442,11442],"mapped",[11443]],[[11443,11443],"valid"],[[11444,11444],"mapped",[11445]],[[11445,11445],"valid"],[[11446,11446],"mapped",[11447]],[[11447,11447],"valid"],[[11448,11448],"mapped",[11449]],[[11449,11449],"valid"],[[11450,11450],"mapped",[11451]],[[11451,11451],"valid"],[[11452,11452],"mapped",[11453]],[[11453,11453],"valid"],[[11454,11454],"mapped",[11455]],[[11455,11455],"valid"],[[11456,11456],"mapped",[11457]],[[11457,11457],"valid"],[[11458,11458],"mapped",[11459]],[[11459,11459],"valid"],[[11460,11460],"mapped",[11461]],[[11461,11461],"valid"],[[11462,11462],"mapped",[11463]],[[11463,11463],"valid"],[[11464,11464],"mapped",[11465]],[[11465,11465],"valid"],[[11466,11466],"mapped",[11467]],[[11467,11467],"valid"],[[11468,11468],"mapped",[11469]],[[11469,11469],"valid"],[[11470,11470],"mapped",[11471]],[[11471,11471],"valid"],[[11472,11472],"mapped",[11473]],[[11473,11473],"valid"],[[11474,11474],"mapped",[11475]],[[11475,11475],"valid"],[[11476,11476],"mapped",[11477]],[[11477,11477],"valid"],[[11478,11478],"mapped",[11479]],[[11479,11479],"valid"],[[11480,11480],"mapped",[11481]],[[11481,11481],"valid"],[[11482,11482],"mapped",[11483]],[[11483,11483],"valid"],[[11484,11484],"mapped",[11485]],[[11485,11485],"valid"],[[11486,11486],"mapped",[11487]],[[11487,11487],"valid"],[[11488,11488],"mapped",[11489]],[[11489,11489],"valid"],[[11490,11490],"mapped",[11491]],[[11491,11492],"valid"],[[11493,11498],"valid",[],"NV8"],[[11499,11499],"mapped",[11500]],[[11500,11500],"valid"],[[11501,11501],"mapped",[11502]],[[11502,11505],"valid"],[[11506,11506],"mapped",[11507]],[[11507,11507],"valid"],[[11508,11512],"disallowed"],[[11513,11519],"valid",[],"NV8"],[[11520,11557],"valid"],[[11558,11558],"disallowed"],[[11559,11559],"valid"],[[11560,11564],"disallowed"],[[11565,11565],"valid"],[[11566,11567],"disallowed"],[[11568,11621],"valid"],[[11622,11623],"valid"],[[11624,11630],"disallowed"],[[11631,11631],"mapped",[11617]],[[11632,11632],"valid",[],"NV8"],[[11633,11646],"disallowed"],[[11647,11647],"valid"],[[11648,11670],"valid"],[[11671,11679],"disallowed"],[[11680,11686],"valid"],[[11687,11687],"disallowed"],[[11688,11694],"valid"],[[11695,11695],"disallowed"],[[11696,11702],"valid"],[[11703,11703],"disallowed"],[[11704,11710],"valid"],[[11711,11711],"disallowed"],[[11712,11718],"valid"],[[11719,11719],"disallowed"],[[11720,11726],"valid"],[[11727,11727],"disallowed"],[[11728,11734],"valid"],[[11735,11735],"disallowed"],[[11736,11742],"valid"],[[11743,11743],"disallowed"],[[11744,11775],"valid"],[[11776,11799],"valid",[],"NV8"],[[11800,11803],"valid",[],"NV8"],[[11804,11805],"valid",[],"NV8"],[[11806,11822],"valid",[],"NV8"],[[11823,11823],"valid"],[[11824,11824],"valid",[],"NV8"],[[11825,11825],"valid",[],"NV8"],[[11826,11835],"valid",[],"NV8"],[[11836,11842],"valid",[],"NV8"],[[11843,11903],"disallowed"],[[11904,11929],"valid",[],"NV8"],[[11930,11930],"disallowed"],[[11931,11934],"valid",[],"NV8"],[[11935,11935],"mapped",[27597]],[[11936,12018],"valid",[],"NV8"],[[12019,12019],"mapped",[40863]],[[12020,12031],"disallowed"],[[12032,12032],"mapped",[19968]],[[12033,12033],"mapped",[20008]],[[12034,12034],"mapped",[20022]],[[12035,12035],"mapped",[20031]],[[12036,12036],"mapped",[20057]],[[12037,12037],"mapped",[20101]],[[12038,12038],"mapped",[20108]],[[12039,12039],"mapped",[20128]],[[12040,12040],"mapped",[20154]],[[12041,12041],"mapped",[20799]],[[12042,12042],"mapped",[20837]],[[12043,12043],"mapped",[20843]],[[12044,12044],"mapped",[20866]],[[12045,12045],"mapped",[20886]],[[12046,12046],"mapped",[20907]],[[12047,12047],"mapped",[20960]],[[12048,12048],"mapped",[20981]],[[12049,12049],"mapped",[20992]],[[12050,12050],"mapped",[21147]],[[12051,12051],"mapped",[21241]],[[12052,12052],"mapped",[21269]],[[12053,12053],"mapped",[21274]],[[12054,12054],"mapped",[21304]],[[12055,12055],"mapped",[21313]],[[12056,12056],"mapped",[21340]],[[12057,12057],"mapped",[21353]],[[12058,12058],"mapped",[21378]],[[12059,12059],"mapped",[21430]],[[12060,12060],"mapped",[21448]],[[12061,12061],"mapped",[21475]],[[12062,12062],"mapped",[22231]],[[12063,12063],"mapped",[22303]],[[12064,12064],"mapped",[22763]],[[12065,12065],"mapped",[22786]],[[12066,12066],"mapped",[22794]],[[12067,12067],"mapped",[22805]],[[12068,12068],"mapped",[22823]],[[12069,12069],"mapped",[22899]],[[12070,12070],"mapped",[23376]],[[12071,12071],"mapped",[23424]],[[12072,12072],"mapped",[23544]],[[12073,12073],"mapped",[23567]],[[12074,12074],"mapped",[23586]],[[12075,12075],"mapped",[23608]],[[12076,12076],"mapped",[23662]],[[12077,12077],"mapped",[23665]],[[12078,12078],"mapped",[24027]],[[12079,12079],"mapped",[24037]],[[12080,12080],"mapped",[24049]],[[12081,12081],"mapped",[24062]],[[12082,12082],"mapped",[24178]],[[12083,12083],"mapped",[24186]],[[12084,12084],"mapped",[24191]],[[12085,12085],"mapped",[24308]],[[12086,12086],"mapped",[24318]],[[12087,12087],"mapped",[24331]],[[12088,12088],"mapped",[24339]],[[12089,12089],"mapped",[24400]],[[12090,12090],"mapped",[24417]],[[12091,12091],"mapped",[24435]],[[12092,12092],"mapped",[24515]],[[12093,12093],"mapped",[25096]],[[12094,12094],"mapped",[25142]],[[12095,12095],"mapped",[25163]],[[12096,12096],"mapped",[25903]],[[12097,12097],"mapped",[25908]],[[12098,12098],"mapped",[25991]],[[12099,12099],"mapped",[26007]],[[12100,12100],"mapped",[26020]],[[12101,12101],"mapped",[26041]],[[12102,12102],"mapped",[26080]],[[12103,12103],"mapped",[26085]],[[12104,12104],"mapped",[26352]],[[12105,12105],"mapped",[26376]],[[12106,12106],"mapped",[26408]],[[12107,12107],"mapped",[27424]],[[12108,12108],"mapped",[27490]],[[12109,12109],"mapped",[27513]],[[12110,12110],"mapped",[27571]],[[12111,12111],"mapped",[27595]],[[12112,12112],"mapped",[27604]],[[12113,12113],"mapped",[27611]],[[12114,12114],"mapped",[27663]],[[12115,12115],"mapped",[27668]],[[12116,12116],"mapped",[27700]],[[12117,12117],"mapped",[28779]],[[12118,12118],"mapped",[29226]],[[12119,12119],"mapped",[29238]],[[12120,12120],"mapped",[29243]],[[12121,12121],"mapped",[29247]],[[12122,12122],"mapped",[29255]],[[12123,12123],"mapped",[29273]],[[12124,12124],"mapped",[29275]],[[12125,12125],"mapped",[29356]],[[12126,12126],"mapped",[29572]],[[12127,12127],"mapped",[29577]],[[12128,12128],"mapped",[29916]],[[12129,12129],"mapped",[29926]],[[12130,12130],"mapped",[29976]],[[12131,12131],"mapped",[29983]],[[12132,12132],"mapped",[29992]],[[12133,12133],"mapped",[30000]],[[12134,12134],"mapped",[30091]],[[12135,12135],"mapped",[30098]],[[12136,12136],"mapped",[30326]],[[12137,12137],"mapped",[30333]],[[12138,12138],"mapped",[30382]],[[12139,12139],"mapped",[30399]],[[12140,12140],"mapped",[30446]],[[12141,12141],"mapped",[30683]],[[12142,12142],"mapped",[30690]],[[12143,12143],"mapped",[30707]],[[12144,12144],"mapped",[31034]],[[12145,12145],"mapped",[31160]],[[12146,12146],"mapped",[31166]],[[12147,12147],"mapped",[31348]],[[12148,12148],"mapped",[31435]],[[12149,12149],"mapped",[31481]],[[12150,12150],"mapped",[31859]],[[12151,12151],"mapped",[31992]],[[12152,12152],"mapped",[32566]],[[12153,12153],"mapped",[32593]],[[12154,12154],"mapped",[32650]],[[12155,12155],"mapped",[32701]],[[12156,12156],"mapped",[32769]],[[12157,12157],"mapped",[32780]],[[12158,12158],"mapped",[32786]],[[12159,12159],"mapped",[32819]],[[12160,12160],"mapped",[32895]],[[12161,12161],"mapped",[32905]],[[12162,12162],"mapped",[33251]],[[12163,12163],"mapped",[33258]],[[12164,12164],"mapped",[33267]],[[12165,12165],"mapped",[33276]],[[12166,12166],"mapped",[33292]],[[12167,12167],"mapped",[33307]],[[12168,12168],"mapped",[33311]],[[12169,12169],"mapped",[33390]],[[12170,12170],"mapped",[33394]],[[12171,12171],"mapped",[33400]],[[12172,12172],"mapped",[34381]],[[12173,12173],"mapped",[34411]],[[12174,12174],"mapped",[34880]],[[12175,12175],"mapped",[34892]],[[12176,12176],"mapped",[34915]],[[12177,12177],"mapped",[35198]],[[12178,12178],"mapped",[35211]],[[12179,12179],"mapped",[35282]],[[12180,12180],"mapped",[35328]],[[12181,12181],"mapped",[35895]],[[12182,12182],"mapped",[35910]],[[12183,12183],"mapped",[35925]],[[12184,12184],"mapped",[35960]],[[12185,12185],"mapped",[35997]],[[12186,12186],"mapped",[36196]],[[12187,12187],"mapped",[36208]],[[12188,12188],"mapped",[36275]],[[12189,12189],"mapped",[36523]],[[12190,12190],"mapped",[36554]],[[12191,12191],"mapped",[36763]],[[12192,12192],"mapped",[36784]],[[12193,12193],"mapped",[36789]],[[12194,12194],"mapped",[37009]],[[12195,12195],"mapped",[37193]],[[12196,12196],"mapped",[37318]],[[12197,12197],"mapped",[37324]],[[12198,12198],"mapped",[37329]],[[12199,12199],"mapped",[38263]],[[12200,12200],"mapped",[38272]],[[12201,12201],"mapped",[38428]],[[12202,12202],"mapped",[38582]],[[12203,12203],"mapped",[38585]],[[12204,12204],"mapped",[38632]],[[12205,12205],"mapped",[38737]],[[12206,12206],"mapped",[38750]],[[12207,12207],"mapped",[38754]],[[12208,12208],"mapped",[38761]],[[12209,12209],"mapped",[38859]],[[12210,12210],"mapped",[38893]],[[12211,12211],"mapped",[38899]],[[12212,12212],"mapped",[38913]],[[12213,12213],"mapped",[39080]],[[12214,12214],"mapped",[39131]],[[12215,12215],"mapped",[39135]],[[12216,12216],"mapped",[39318]],[[12217,12217],"mapped",[39321]],[[12218,12218],"mapped",[39340]],[[12219,12219],"mapped",[39592]],[[12220,12220],"mapped",[39640]],[[12221,12221],"mapped",[39647]],[[12222,12222],"mapped",[39717]],[[12223,12223],"mapped",[39727]],[[12224,12224],"mapped",[39730]],[[12225,12225],"mapped",[39740]],[[12226,12226],"mapped",[39770]],[[12227,12227],"mapped",[40165]],[[12228,12228],"mapped",[40565]],[[12229,12229],"mapped",[40575]],[[12230,12230],"mapped",[40613]],[[12231,12231],"mapped",[40635]],[[12232,12232],"mapped",[40643]],[[12233,12233],"mapped",[40653]],[[12234,12234],"mapped",[40657]],[[12235,12235],"mapped",[40697]],[[12236,12236],"mapped",[40701]],[[12237,12237],"mapped",[40718]],[[12238,12238],"mapped",[40723]],[[12239,12239],"mapped",[40736]],[[12240,12240],"mapped",[40763]],[[12241,12241],"mapped",[40778]],[[12242,12242],"mapped",[40786]],[[12243,12243],"mapped",[40845]],[[12244,12244],"mapped",[40860]],[[12245,12245],"mapped",[40864]],[[12246,12271],"disallowed"],[[12272,12283],"disallowed"],[[12284,12287],"disallowed"],[[12288,12288],"disallowed_STD3_mapped",[32]],[[12289,12289],"valid",[],"NV8"],[[12290,12290],"mapped",[46]],[[12291,12292],"valid",[],"NV8"],[[12293,12295],"valid"],[[12296,12329],"valid",[],"NV8"],[[12330,12333],"valid"],[[12334,12341],"valid",[],"NV8"],[[12342,12342],"mapped",[12306]],[[12343,12343],"valid",[],"NV8"],[[12344,12344],"mapped",[21313]],[[12345,12345],"mapped",[21316]],[[12346,12346],"mapped",[21317]],[[12347,12347],"valid",[],"NV8"],[[12348,12348],"valid"],[[12349,12349],"valid",[],"NV8"],[[12350,12350],"valid",[],"NV8"],[[12351,12351],"valid",[],"NV8"],[[12352,12352],"disallowed"],[[12353,12436],"valid"],[[12437,12438],"valid"],[[12439,12440],"disallowed"],[[12441,12442],"valid"],[[12443,12443],"disallowed_STD3_mapped",[32,12441]],[[12444,12444],"disallowed_STD3_mapped",[32,12442]],[[12445,12446],"valid"],[[12447,12447],"mapped",[12424,12426]],[[12448,12448],"valid",[],"NV8"],[[12449,12542],"valid"],[[12543,12543],"mapped",[12467,12488]],[[12544,12548],"disallowed"],[[12549,12588],"valid"],[[12589,12589],"valid"],[[12590,12592],"disallowed"],[[12593,12593],"mapped",[4352]],[[12594,12594],"mapped",[4353]],[[12595,12595],"mapped",[4522]],[[12596,12596],"mapped",[4354]],[[12597,12597],"mapped",[4524]],[[12598,12598],"mapped",[4525]],[[12599,12599],"mapped",[4355]],[[12600,12600],"mapped",[4356]],[[12601,12601],"mapped",[4357]],[[12602,12602],"mapped",[4528]],[[12603,12603],"mapped",[4529]],[[12604,12604],"mapped",[4530]],[[12605,12605],"mapped",[4531]],[[12606,12606],"mapped",[4532]],[[12607,12607],"mapped",[4533]],[[12608,12608],"mapped",[4378]],[[12609,12609],"mapped",[4358]],[[12610,12610],"mapped",[4359]],[[12611,12611],"mapped",[4360]],[[12612,12612],"mapped",[4385]],[[12613,12613],"mapped",[4361]],[[12614,12614],"mapped",[4362]],[[12615,12615],"mapped",[4363]],[[12616,12616],"mapped",[4364]],[[12617,12617],"mapped",[4365]],[[12618,12618],"mapped",[4366]],[[12619,12619],"mapped",[4367]],[[12620,12620],"mapped",[4368]],[[12621,12621],"mapped",[4369]],[[12622,12622],"mapped",[4370]],[[12623,12623],"mapped",[4449]],[[12624,12624],"mapped",[4450]],[[12625,12625],"mapped",[4451]],[[12626,12626],"mapped",[4452]],[[12627,12627],"mapped",[4453]],[[12628,12628],"mapped",[4454]],[[12629,12629],"mapped",[4455]],[[12630,12630],"mapped",[4456]],[[12631,12631],"mapped",[4457]],[[12632,12632],"mapped",[4458]],[[12633,12633],"mapped",[4459]],[[12634,12634],"mapped",[4460]],[[12635,12635],"mapped",[4461]],[[12636,12636],"mapped",[4462]],[[12637,12637],"mapped",[4463]],[[12638,12638],"mapped",[4464]],[[12639,12639],"mapped",[4465]],[[12640,12640],"mapped",[4466]],[[12641,12641],"mapped",[4467]],[[12642,12642],"mapped",[4468]],[[12643,12643],"mapped",[4469]],[[12644,12644],"disallowed"],[[12645,12645],"mapped",[4372]],[[12646,12646],"mapped",[4373]],[[12647,12647],"mapped",[4551]],[[12648,12648],"mapped",[4552]],[[12649,12649],"mapped",[4556]],[[12650,12650],"mapped",[4558]],[[12651,12651],"mapped",[4563]],[[12652,12652],"mapped",[4567]],[[12653,12653],"mapped",[4569]],[[12654,12654],"mapped",[4380]],[[12655,12655],"mapped",[4573]],[[12656,12656],"mapped",[4575]],[[12657,12657],"mapped",[4381]],[[12658,12658],"mapped",[4382]],[[12659,12659],"mapped",[4384]],[[12660,12660],"mapped",[4386]],[[12661,12661],"mapped",[4387]],[[12662,12662],"mapped",[4391]],[[12663,12663],"mapped",[4393]],[[12664,12664],"mapped",[4395]],[[12665,12665],"mapped",[4396]],[[12666,12666],"mapped",[4397]],[[12667,12667],"mapped",[4398]],[[12668,12668],"mapped",[4399]],[[12669,12669],"mapped",[4402]],[[12670,12670],"mapped",[4406]],[[12671,12671],"mapped",[4416]],[[12672,12672],"mapped",[4423]],[[12673,12673],"mapped",[4428]],[[12674,12674],"mapped",[4593]],[[12675,12675],"mapped",[4594]],[[12676,12676],"mapped",[4439]],[[12677,12677],"mapped",[4440]],[[12678,12678],"mapped",[4441]],[[12679,12679],"mapped",[4484]],[[12680,12680],"mapped",[4485]],[[12681,12681],"mapped",[4488]],[[12682,12682],"mapped",[4497]],[[12683,12683],"mapped",[4498]],[[12684,12684],"mapped",[4500]],[[12685,12685],"mapped",[4510]],[[12686,12686],"mapped",[4513]],[[12687,12687],"disallowed"],[[12688,12689],"valid",[],"NV8"],[[12690,12690],"mapped",[19968]],[[12691,12691],"mapped",[20108]],[[12692,12692],"mapped",[19977]],[[12693,12693],"mapped",[22235]],[[12694,12694],"mapped",[19978]],[[12695,12695],"mapped",[20013]],[[12696,12696],"mapped",[19979]],[[12697,12697],"mapped",[30002]],[[12698,12698],"mapped",[20057]],[[12699,12699],"mapped",[19993]],[[12700,12700],"mapped",[19969]],[[12701,12701],"mapped",[22825]],[[12702,12702],"mapped",[22320]],[[12703,12703],"mapped",[20154]],[[12704,12727],"valid"],[[12728,12730],"valid"],[[12731,12735],"disallowed"],[[12736,12751],"valid",[],"NV8"],[[12752,12771],"valid",[],"NV8"],[[12772,12783],"disallowed"],[[12784,12799],"valid"],[[12800,12800],"disallowed_STD3_mapped",[40,4352,41]],[[12801,12801],"disallowed_STD3_mapped",[40,4354,41]],[[12802,12802],"disallowed_STD3_mapped",[40,4355,41]],[[12803,12803],"disallowed_STD3_mapped",[40,4357,41]],[[12804,12804],"disallowed_STD3_mapped",[40,4358,41]],[[12805,12805],"disallowed_STD3_mapped",[40,4359,41]],[[12806,12806],"disallowed_STD3_mapped",[40,4361,41]],[[12807,12807],"disallowed_STD3_mapped",[40,4363,41]],[[12808,12808],"disallowed_STD3_mapped",[40,4364,41]],[[12809,12809],"disallowed_STD3_mapped",[40,4366,41]],[[12810,12810],"disallowed_STD3_mapped",[40,4367,41]],[[12811,12811],"disallowed_STD3_mapped",[40,4368,41]],[[12812,12812],"disallowed_STD3_mapped",[40,4369,41]],[[12813,12813],"disallowed_STD3_mapped",[40,4370,41]],[[12814,12814],"disallowed_STD3_mapped",[40,44032,41]],[[12815,12815],"disallowed_STD3_mapped",[40,45208,41]],[[12816,12816],"disallowed_STD3_mapped",[40,45796,41]],[[12817,12817],"disallowed_STD3_mapped",[40,46972,41]],[[12818,12818],"disallowed_STD3_mapped",[40,47560,41]],[[12819,12819],"disallowed_STD3_mapped",[40,48148,41]],[[12820,12820],"disallowed_STD3_mapped",[40,49324,41]],[[12821,12821],"disallowed_STD3_mapped",[40,50500,41]],[[12822,12822],"disallowed_STD3_mapped",[40,51088,41]],[[12823,12823],"disallowed_STD3_mapped",[40,52264,41]],[[12824,12824],"disallowed_STD3_mapped",[40,52852,41]],[[12825,12825],"disallowed_STD3_mapped",[40,53440,41]],[[12826,12826],"disallowed_STD3_mapped",[40,54028,41]],[[12827,12827],"disallowed_STD3_mapped",[40,54616,41]],[[12828,12828],"disallowed_STD3_mapped",[40,51452,41]],[[12829,12829],"disallowed_STD3_mapped",[40,50724,51204,41]],[[12830,12830],"disallowed_STD3_mapped",[40,50724,54980,41]],[[12831,12831],"disallowed"],[[12832,12832],"disallowed_STD3_mapped",[40,19968,41]],[[12833,12833],"disallowed_STD3_mapped",[40,20108,41]],[[12834,12834],"disallowed_STD3_mapped",[40,19977,41]],[[12835,12835],"disallowed_STD3_mapped",[40,22235,41]],[[12836,12836],"disallowed_STD3_mapped",[40,20116,41]],[[12837,12837],"disallowed_STD3_mapped",[40,20845,41]],[[12838,12838],"disallowed_STD3_mapped",[40,19971,41]],[[12839,12839],"disallowed_STD3_mapped",[40,20843,41]],[[12840,12840],"disallowed_STD3_mapped",[40,20061,41]],[[12841,12841],"disallowed_STD3_mapped",[40,21313,41]],[[12842,12842],"disallowed_STD3_mapped",[40,26376,41]],[[12843,12843],"disallowed_STD3_mapped",[40,28779,41]],[[12844,12844],"disallowed_STD3_mapped",[40,27700,41]],[[12845,12845],"disallowed_STD3_mapped",[40,26408,41]],[[12846,12846],"disallowed_STD3_mapped",[40,37329,41]],[[12847,12847],"disallowed_STD3_mapped",[40,22303,41]],[[12848,12848],"disallowed_STD3_mapped",[40,26085,41]],[[12849,12849],"disallowed_STD3_mapped",[40,26666,41]],[[12850,12850],"disallowed_STD3_mapped",[40,26377,41]],[[12851,12851],"disallowed_STD3_mapped",[40,31038,41]],[[12852,12852],"disallowed_STD3_mapped",[40,21517,41]],[[12853,12853],"disallowed_STD3_mapped",[40,29305,41]],[[12854,12854],"disallowed_STD3_mapped",[40,36001,41]],[[12855,12855],"disallowed_STD3_mapped",[40,31069,41]],[[12856,12856],"disallowed_STD3_mapped",[40,21172,41]],[[12857,12857],"disallowed_STD3_mapped",[40,20195,41]],[[12858,12858],"disallowed_STD3_mapped",[40,21628,41]],[[12859,12859],"disallowed_STD3_mapped",[40,23398,41]],[[12860,12860],"disallowed_STD3_mapped",[40,30435,41]],[[12861,12861],"disallowed_STD3_mapped",[40,20225,41]],[[12862,12862],"disallowed_STD3_mapped",[40,36039,41]],[[12863,12863],"disallowed_STD3_mapped",[40,21332,41]],[[12864,12864],"disallowed_STD3_mapped",[40,31085,41]],[[12865,12865],"disallowed_STD3_mapped",[40,20241,41]],[[12866,12866],"disallowed_STD3_mapped",[40,33258,41]],[[12867,12867],"disallowed_STD3_mapped",[40,33267,41]],[[12868,12868],"mapped",[21839]],[[12869,12869],"mapped",[24188]],[[12870,12870],"mapped",[25991]],[[12871,12871],"mapped",[31631]],[[12872,12879],"valid",[],"NV8"],[[12880,12880],"mapped",[112,116,101]],[[12881,12881],"mapped",[50,49]],[[12882,12882],"mapped",[50,50]],[[12883,12883],"mapped",[50,51]],[[12884,12884],"mapped",[50,52]],[[12885,12885],"mapped",[50,53]],[[12886,12886],"mapped",[50,54]],[[12887,12887],"mapped",[50,55]],[[12888,12888],"mapped",[50,56]],[[12889,12889],"mapped",[50,57]],[[12890,12890],"mapped",[51,48]],[[12891,12891],"mapped",[51,49]],[[12892,12892],"mapped",[51,50]],[[12893,12893],"mapped",[51,51]],[[12894,12894],"mapped",[51,52]],[[12895,12895],"mapped",[51,53]],[[12896,12896],"mapped",[4352]],[[12897,12897],"mapped",[4354]],[[12898,12898],"mapped",[4355]],[[12899,12899],"mapped",[4357]],[[12900,12900],"mapped",[4358]],[[12901,12901],"mapped",[4359]],[[12902,12902],"mapped",[4361]],[[12903,12903],"mapped",[4363]],[[12904,12904],"mapped",[4364]],[[12905,12905],"mapped",[4366]],[[12906,12906],"mapped",[4367]],[[12907,12907],"mapped",[4368]],[[12908,12908],"mapped",[4369]],[[12909,12909],"mapped",[4370]],[[12910,12910],"mapped",[44032]],[[12911,12911],"mapped",[45208]],[[12912,12912],"mapped",[45796]],[[12913,12913],"mapped",[46972]],[[12914,12914],"mapped",[47560]],[[12915,12915],"mapped",[48148]],[[12916,12916],"mapped",[49324]],[[12917,12917],"mapped",[50500]],[[12918,12918],"mapped",[51088]],[[12919,12919],"mapped",[52264]],[[12920,12920],"mapped",[52852]],[[12921,12921],"mapped",[53440]],[[12922,12922],"mapped",[54028]],[[12923,12923],"mapped",[54616]],[[12924,12924],"mapped",[52280,44256]],[[12925,12925],"mapped",[51452,51032]],[[12926,12926],"mapped",[50864]],[[12927,12927],"valid",[],"NV8"],[[12928,12928],"mapped",[19968]],[[12929,12929],"mapped",[20108]],[[12930,12930],"mapped",[19977]],[[12931,12931],"mapped",[22235]],[[12932,12932],"mapped",[20116]],[[12933,12933],"mapped",[20845]],[[12934,12934],"mapped",[19971]],[[12935,12935],"mapped",[20843]],[[12936,12936],"mapped",[20061]],[[12937,12937],"mapped",[21313]],[[12938,12938],"mapped",[26376]],[[12939,12939],"mapped",[28779]],[[12940,12940],"mapped",[27700]],[[12941,12941],"mapped",[26408]],[[12942,12942],"mapped",[37329]],[[12943,12943],"mapped",[22303]],[[12944,12944],"mapped",[26085]],[[12945,12945],"mapped",[26666]],[[12946,12946],"mapped",[26377]],[[12947,12947],"mapped",[31038]],[[12948,12948],"mapped",[21517]],[[12949,12949],"mapped",[29305]],[[12950,12950],"mapped",[36001]],[[12951,12951],"mapped",[31069]],[[12952,12952],"mapped",[21172]],[[12953,12953],"mapped",[31192]],[[12954,12954],"mapped",[30007]],[[12955,12955],"mapped",[22899]],[[12956,12956],"mapped",[36969]],[[12957,12957],"mapped",[20778]],[[12958,12958],"mapped",[21360]],[[12959,12959],"mapped",[27880]],[[12960,12960],"mapped",[38917]],[[12961,12961],"mapped",[20241]],[[12962,12962],"mapped",[20889]],[[12963,12963],"mapped",[27491]],[[12964,12964],"mapped",[19978]],[[12965,12965],"mapped",[20013]],[[12966,12966],"mapped",[19979]],[[12967,12967],"mapped",[24038]],[[12968,12968],"mapped",[21491]],[[12969,12969],"mapped",[21307]],[[12970,12970],"mapped",[23447]],[[12971,12971],"mapped",[23398]],[[12972,12972],"mapped",[30435]],[[12973,12973],"mapped",[20225]],[[12974,12974],"mapped",[36039]],[[12975,12975],"mapped",[21332]],[[12976,12976],"mapped",[22812]],[[12977,12977],"mapped",[51,54]],[[12978,12978],"mapped",[51,55]],[[12979,12979],"mapped",[51,56]],[[12980,12980],"mapped",[51,57]],[[12981,12981],"mapped",[52,48]],[[12982,12982],"mapped",[52,49]],[[12983,12983],"mapped",[52,50]],[[12984,12984],"mapped",[52,51]],[[12985,12985],"mapped",[52,52]],[[12986,12986],"mapped",[52,53]],[[12987,12987],"mapped",[52,54]],[[12988,12988],"mapped",[52,55]],[[12989,12989],"mapped",[52,56]],[[12990,12990],"mapped",[52,57]],[[12991,12991],"mapped",[53,48]],[[12992,12992],"mapped",[49,26376]],[[12993,12993],"mapped",[50,26376]],[[12994,12994],"mapped",[51,26376]],[[12995,12995],"mapped",[52,26376]],[[12996,12996],"mapped",[53,26376]],[[12997,12997],"mapped",[54,26376]],[[12998,12998],"mapped",[55,26376]],[[12999,12999],"mapped",[56,26376]],[[13000,13000],"mapped",[57,26376]],[[13001,13001],"mapped",[49,48,26376]],[[13002,13002],"mapped",[49,49,26376]],[[13003,13003],"mapped",[49,50,26376]],[[13004,13004],"mapped",[104,103]],[[13005,13005],"mapped",[101,114,103]],[[13006,13006],"mapped",[101,118]],[[13007,13007],"mapped",[108,116,100]],[[13008,13008],"mapped",[12450]],[[13009,13009],"mapped",[12452]],[[13010,13010],"mapped",[12454]],[[13011,13011],"mapped",[12456]],[[13012,13012],"mapped",[12458]],[[13013,13013],"mapped",[12459]],[[13014,13014],"mapped",[12461]],[[13015,13015],"mapped",[12463]],[[13016,13016],"mapped",[12465]],[[13017,13017],"mapped",[12467]],[[13018,13018],"mapped",[12469]],[[13019,13019],"mapped",[12471]],[[13020,13020],"mapped",[12473]],[[13021,13021],"mapped",[12475]],[[13022,13022],"mapped",[12477]],[[13023,13023],"mapped",[12479]],[[13024,13024],"mapped",[12481]],[[13025,13025],"mapped",[12484]],[[13026,13026],"mapped",[12486]],[[13027,13027],"mapped",[12488]],[[13028,13028],"mapped",[12490]],[[13029,13029],"mapped",[12491]],[[13030,13030],"mapped",[12492]],[[13031,13031],"mapped",[12493]],[[13032,13032],"mapped",[12494]],[[13033,13033],"mapped",[12495]],[[13034,13034],"mapped",[12498]],[[13035,13035],"mapped",[12501]],[[13036,13036],"mapped",[12504]],[[13037,13037],"mapped",[12507]],[[13038,13038],"mapped",[12510]],[[13039,13039],"mapped",[12511]],[[13040,13040],"mapped",[12512]],[[13041,13041],"mapped",[12513]],[[13042,13042],"mapped",[12514]],[[13043,13043],"mapped",[12516]],[[13044,13044],"mapped",[12518]],[[13045,13045],"mapped",[12520]],[[13046,13046],"mapped",[12521]],[[13047,13047],"mapped",[12522]],[[13048,13048],"mapped",[12523]],[[13049,13049],"mapped",[12524]],[[13050,13050],"mapped",[12525]],[[13051,13051],"mapped",[12527]],[[13052,13052],"mapped",[12528]],[[13053,13053],"mapped",[12529]],[[13054,13054],"mapped",[12530]],[[13055,13055],"disallowed"],[[13056,13056],"mapped",[12450,12497,12540,12488]],[[13057,13057],"mapped",[12450,12523,12501,12449]],[[13058,13058],"mapped",[12450,12531,12506,12450]],[[13059,13059],"mapped",[12450,12540,12523]],[[13060,13060],"mapped",[12452,12491,12531,12464]],[[13061,13061],"mapped",[12452,12531,12481]],[[13062,13062],"mapped",[12454,12457,12531]],[[13063,13063],"mapped",[12456,12473,12463,12540,12489]],[[13064,13064],"mapped",[12456,12540,12459,12540]],[[13065,13065],"mapped",[12458,12531,12473]],[[13066,13066],"mapped",[12458,12540,12512]],[[13067,13067],"mapped",[12459,12452,12522]],[[13068,13068],"mapped",[12459,12521,12483,12488]],[[13069,13069],"mapped",[12459,12525,12522,12540]],[[13070,13070],"mapped",[12460,12525,12531]],[[13071,13071],"mapped",[12460,12531,12510]],[[13072,13072],"mapped",[12462,12460]],[[13073,13073],"mapped",[12462,12491,12540]],[[13074,13074],"mapped",[12461,12517,12522,12540]],[[13075,13075],"mapped",[12462,12523,12480,12540]],[[13076,13076],"mapped",[12461,12525]],[[13077,13077],"mapped",[12461,12525,12464,12521,12512]],[[13078,13078],"mapped",[12461,12525,12513,12540,12488,12523]],[[13079,13079],"mapped",[12461,12525,12527,12483,12488]],[[13080,13080],"mapped",[12464,12521,12512]],[[13081,13081],"mapped",[12464,12521,12512,12488,12531]],[[13082,13082],"mapped",[12463,12523,12476,12452,12525]],[[13083,13083],"mapped",[12463,12525,12540,12493]],[[13084,13084],"mapped",[12465,12540,12473]],[[13085,13085],"mapped",[12467,12523,12490]],[[13086,13086],"mapped",[12467,12540,12509]],[[13087,13087],"mapped",[12469,12452,12463,12523]],[[13088,13088],"mapped",[12469,12531,12481,12540,12512]],[[13089,13089],"mapped",[12471,12522,12531,12464]],[[13090,13090],"mapped",[12475,12531,12481]],[[13091,13091],"mapped",[12475,12531,12488]],[[13092,13092],"mapped",[12480,12540,12473]],[[13093,13093],"mapped",[12487,12471]],[[13094,13094],"mapped",[12489,12523]],[[13095,13095],"mapped",[12488,12531]],[[13096,13096],"mapped",[12490,12494]],[[13097,13097],"mapped",[12494,12483,12488]],[[13098,13098],"mapped",[12495,12452,12484]],[[13099,13099],"mapped",[12497,12540,12475,12531,12488]],[[13100,13100],"mapped",[12497,12540,12484]],[[13101,13101],"mapped",[12496,12540,12524,12523]],[[13102,13102],"mapped",[12500,12450,12473,12488,12523]],[[13103,13103],"mapped",[12500,12463,12523]],[[13104,13104],"mapped",[12500,12467]],[[13105,13105],"mapped",[12499,12523]],[[13106,13106],"mapped",[12501,12449,12521,12483,12489]],[[13107,13107],"mapped",[12501,12451,12540,12488]],[[13108,13108],"mapped",[12502,12483,12471,12455,12523]],[[13109,13109],"mapped",[12501,12521,12531]],[[13110,13110],"mapped",[12504,12463,12479,12540,12523]],[[13111,13111],"mapped",[12506,12477]],[[13112,13112],"mapped",[12506,12491,12498]],[[13113,13113],"mapped",[12504,12523,12484]],[[13114,13114],"mapped",[12506,12531,12473]],[[13115,13115],"mapped",[12506,12540,12472]],[[13116,13116],"mapped",[12505,12540,12479]],[[13117,13117],"mapped",[12509,12452,12531,12488]],[[13118,13118],"mapped",[12508,12523,12488]],[[13119,13119],"mapped",[12507,12531]],[[13120,13120],"mapped",[12509,12531,12489]],[[13121,13121],"mapped",[12507,12540,12523]],[[13122,13122],"mapped",[12507,12540,12531]],[[13123,13123],"mapped",[12510,12452,12463,12525]],[[13124,13124],"mapped",[12510,12452,12523]],[[13125,13125],"mapped",[12510,12483,12495]],[[13126,13126],"mapped",[12510,12523,12463]],[[13127,13127],"mapped",[12510,12531,12471,12519,12531]],[[13128,13128],"mapped",[12511,12463,12525,12531]],[[13129,13129],"mapped",[12511,12522]],[[13130,13130],"mapped",[12511,12522,12496,12540,12523]],[[13131,13131],"mapped",[12513,12460]],[[13132,13132],"mapped",[12513,12460,12488,12531]],[[13133,13133],"mapped",[12513,12540,12488,12523]],[[13134,13134],"mapped",[12516,12540,12489]],[[13135,13135],"mapped",[12516,12540,12523]],[[13136,13136],"mapped",[12518,12450,12531]],[[13137,13137],"mapped",[12522,12483,12488,12523]],[[13138,13138],"mapped",[12522,12521]],[[13139,13139],"mapped",[12523,12500,12540]],[[13140,13140],"mapped",[12523,12540,12502,12523]],[[13141,13141],"mapped",[12524,12512]],[[13142,13142],"mapped",[12524,12531,12488,12466,12531]],[[13143,13143],"mapped",[12527,12483,12488]],[[13144,13144],"mapped",[48,28857]],[[13145,13145],"mapped",[49,28857]],[[13146,13146],"mapped",[50,28857]],[[13147,13147],"mapped",[51,28857]],[[13148,13148],"mapped",[52,28857]],[[13149,13149],"mapped",[53,28857]],[[13150,13150],"mapped",[54,28857]],[[13151,13151],"mapped",[55,28857]],[[13152,13152],"mapped",[56,28857]],[[13153,13153],"mapped",[57,28857]],[[13154,13154],"mapped",[49,48,28857]],[[13155,13155],"mapped",[49,49,28857]],[[13156,13156],"mapped",[49,50,28857]],[[13157,13157],"mapped",[49,51,28857]],[[13158,13158],"mapped",[49,52,28857]],[[13159,13159],"mapped",[49,53,28857]],[[13160,13160],"mapped",[49,54,28857]],[[13161,13161],"mapped",[49,55,28857]],[[13162,13162],"mapped",[49,56,28857]],[[13163,13163],"mapped",[49,57,28857]],[[13164,13164],"mapped",[50,48,28857]],[[13165,13165],"mapped",[50,49,28857]],[[13166,13166],"mapped",[50,50,28857]],[[13167,13167],"mapped",[50,51,28857]],[[13168,13168],"mapped",[50,52,28857]],[[13169,13169],"mapped",[104,112,97]],[[13170,13170],"mapped",[100,97]],[[13171,13171],"mapped",[97,117]],[[13172,13172],"mapped",[98,97,114]],[[13173,13173],"mapped",[111,118]],[[13174,13174],"mapped",[112,99]],[[13175,13175],"mapped",[100,109]],[[13176,13176],"mapped",[100,109,50]],[[13177,13177],"mapped",[100,109,51]],[[13178,13178],"mapped",[105,117]],[[13179,13179],"mapped",[24179,25104]],[[13180,13180],"mapped",[26157,21644]],[[13181,13181],"mapped",[22823,27491]],[[13182,13182],"mapped",[26126,27835]],[[13183,13183],"mapped",[26666,24335,20250,31038]],[[13184,13184],"mapped",[112,97]],[[13185,13185],"mapped",[110,97]],[[13186,13186],"mapped",[956,97]],[[13187,13187],"mapped",[109,97]],[[13188,13188],"mapped",[107,97]],[[13189,13189],"mapped",[107,98]],[[13190,13190],"mapped",[109,98]],[[13191,13191],"mapped",[103,98]],[[13192,13192],"mapped",[99,97,108]],[[13193,13193],"mapped",[107,99,97,108]],[[13194,13194],"mapped",[112,102]],[[13195,13195],"mapped",[110,102]],[[13196,13196],"mapped",[956,102]],[[13197,13197],"mapped",[956,103]],[[13198,13198],"mapped",[109,103]],[[13199,13199],"mapped",[107,103]],[[13200,13200],"mapped",[104,122]],[[13201,13201],"mapped",[107,104,122]],[[13202,13202],"mapped",[109,104,122]],[[13203,13203],"mapped",[103,104,122]],[[13204,13204],"mapped",[116,104,122]],[[13205,13205],"mapped",[956,108]],[[13206,13206],"mapped",[109,108]],[[13207,13207],"mapped",[100,108]],[[13208,13208],"mapped",[107,108]],[[13209,13209],"mapped",[102,109]],[[13210,13210],"mapped",[110,109]],[[13211,13211],"mapped",[956,109]],[[13212,13212],"mapped",[109,109]],[[13213,13213],"mapped",[99,109]],[[13214,13214],"mapped",[107,109]],[[13215,13215],"mapped",[109,109,50]],[[13216,13216],"mapped",[99,109,50]],[[13217,13217],"mapped",[109,50]],[[13218,13218],"mapped",[107,109,50]],[[13219,13219],"mapped",[109,109,51]],[[13220,13220],"mapped",[99,109,51]],[[13221,13221],"mapped",[109,51]],[[13222,13222],"mapped",[107,109,51]],[[13223,13223],"mapped",[109,8725,115]],[[13224,13224],"mapped",[109,8725,115,50]],[[13225,13225],"mapped",[112,97]],[[13226,13226],"mapped",[107,112,97]],[[13227,13227],"mapped",[109,112,97]],[[13228,13228],"mapped",[103,112,97]],[[13229,13229],"mapped",[114,97,100]],[[13230,13230],"mapped",[114,97,100,8725,115]],[[13231,13231],"mapped",[114,97,100,8725,115,50]],[[13232,13232],"mapped",[112,115]],[[13233,13233],"mapped",[110,115]],[[13234,13234],"mapped",[956,115]],[[13235,13235],"mapped",[109,115]],[[13236,13236],"mapped",[112,118]],[[13237,13237],"mapped",[110,118]],[[13238,13238],"mapped",[956,118]],[[13239,13239],"mapped",[109,118]],[[13240,13240],"mapped",[107,118]],[[13241,13241],"mapped",[109,118]],[[13242,13242],"mapped",[112,119]],[[13243,13243],"mapped",[110,119]],[[13244,13244],"mapped",[956,119]],[[13245,13245],"mapped",[109,119]],[[13246,13246],"mapped",[107,119]],[[13247,13247],"mapped",[109,119]],[[13248,13248],"mapped",[107,969]],[[13249,13249],"mapped",[109,969]],[[13250,13250],"disallowed"],[[13251,13251],"mapped",[98,113]],[[13252,13252],"mapped",[99,99]],[[13253,13253],"mapped",[99,100]],[[13254,13254],"mapped",[99,8725,107,103]],[[13255,13255],"disallowed"],[[13256,13256],"mapped",[100,98]],[[13257,13257],"mapped",[103,121]],[[13258,13258],"mapped",[104,97]],[[13259,13259],"mapped",[104,112]],[[13260,13260],"mapped",[105,110]],[[13261,13261],"mapped",[107,107]],[[13262,13262],"mapped",[107,109]],[[13263,13263],"mapped",[107,116]],[[13264,13264],"mapped",[108,109]],[[13265,13265],"mapped",[108,110]],[[13266,13266],"mapped",[108,111,103]],[[13267,13267],"mapped",[108,120]],[[13268,13268],"mapped",[109,98]],[[13269,13269],"mapped",[109,105,108]],[[13270,13270],"mapped",[109,111,108]],[[13271,13271],"mapped",[112,104]],[[13272,13272],"disallowed"],[[13273,13273],"mapped",[112,112,109]],[[13274,13274],"mapped",[112,114]],[[13275,13275],"mapped",[115,114]],[[13276,13276],"mapped",[115,118]],[[13277,13277],"mapped",[119,98]],[[13278,13278],"mapped",[118,8725,109]],[[13279,13279],"mapped",[97,8725,109]],[[13280,13280],"mapped",[49,26085]],[[13281,13281],"mapped",[50,26085]],[[13282,13282],"mapped",[51,26085]],[[13283,13283],"mapped",[52,26085]],[[13284,13284],"mapped",[53,26085]],[[13285,13285],"mapped",[54,26085]],[[13286,13286],"mapped",[55,26085]],[[13287,13287],"mapped",[56,26085]],[[13288,13288],"mapped",[57,26085]],[[13289,13289],"mapped",[49,48,26085]],[[13290,13290],"mapped",[49,49,26085]],[[13291,13291],"mapped",[49,50,26085]],[[13292,13292],"mapped",[49,51,26085]],[[13293,13293],"mapped",[49,52,26085]],[[13294,13294],"mapped",[49,53,26085]],[[13295,13295],"mapped",[49,54,26085]],[[13296,13296],"mapped",[49,55,26085]],[[13297,13297],"mapped",[49,56,26085]],[[13298,13298],"mapped",[49,57,26085]],[[13299,13299],"mapped",[50,48,26085]],[[13300,13300],"mapped",[50,49,26085]],[[13301,13301],"mapped",[50,50,26085]],[[13302,13302],"mapped",[50,51,26085]],[[13303,13303],"mapped",[50,52,26085]],[[13304,13304],"mapped",[50,53,26085]],[[13305,13305],"mapped",[50,54,26085]],[[13306,13306],"mapped",[50,55,26085]],[[13307,13307],"mapped",[50,56,26085]],[[13308,13308],"mapped",[50,57,26085]],[[13309,13309],"mapped",[51,48,26085]],[[13310,13310],"mapped",[51,49,26085]],[[13311,13311],"mapped",[103,97,108]],[[13312,19893],"valid"],[[19894,19903],"disallowed"],[[19904,19967],"valid",[],"NV8"],[[19968,40869],"valid"],[[40870,40891],"valid"],[[40892,40899],"valid"],[[40900,40907],"valid"],[[40908,40908],"valid"],[[40909,40917],"valid"],[[40918,40959],"disallowed"],[[40960,42124],"valid"],[[42125,42127],"disallowed"],[[42128,42145],"valid",[],"NV8"],[[42146,42147],"valid",[],"NV8"],[[42148,42163],"valid",[],"NV8"],[[42164,42164],"valid",[],"NV8"],[[42165,42176],"valid",[],"NV8"],[[42177,42177],"valid",[],"NV8"],[[42178,42180],"valid",[],"NV8"],[[42181,42181],"valid",[],"NV8"],[[42182,42182],"valid",[],"NV8"],[[42183,42191],"disallowed"],[[42192,42237],"valid"],[[42238,42239],"valid",[],"NV8"],[[42240,42508],"valid"],[[42509,42511],"valid",[],"NV8"],[[42512,42539],"valid"],[[42540,42559],"disallowed"],[[42560,42560],"mapped",[42561]],[[42561,42561],"valid"],[[42562,42562],"mapped",[42563]],[[42563,42563],"valid"],[[42564,42564],"mapped",[42565]],[[42565,42565],"valid"],[[42566,42566],"mapped",[42567]],[[42567,42567],"valid"],[[42568,42568],"mapped",[42569]],[[42569,42569],"valid"],[[42570,42570],"mapped",[42571]],[[42571,42571],"valid"],[[42572,42572],"mapped",[42573]],[[42573,42573],"valid"],[[42574,42574],"mapped",[42575]],[[42575,42575],"valid"],[[42576,42576],"mapped",[42577]],[[42577,42577],"valid"],[[42578,42578],"mapped",[42579]],[[42579,42579],"valid"],[[42580,42580],"mapped",[42581]],[[42581,42581],"valid"],[[42582,42582],"mapped",[42583]],[[42583,42583],"valid"],[[42584,42584],"mapped",[42585]],[[42585,42585],"valid"],[[42586,42586],"mapped",[42587]],[[42587,42587],"valid"],[[42588,42588],"mapped",[42589]],[[42589,42589],"valid"],[[42590,42590],"mapped",[42591]],[[42591,42591],"valid"],[[42592,42592],"mapped",[42593]],[[42593,42593],"valid"],[[42594,42594],"mapped",[42595]],[[42595,42595],"valid"],[[42596,42596],"mapped",[42597]],[[42597,42597],"valid"],[[42598,42598],"mapped",[42599]],[[42599,42599],"valid"],[[42600,42600],"mapped",[42601]],[[42601,42601],"valid"],[[42602,42602],"mapped",[42603]],[[42603,42603],"valid"],[[42604,42604],"mapped",[42605]],[[42605,42607],"valid"],[[42608,42611],"valid",[],"NV8"],[[42612,42619],"valid"],[[42620,42621],"valid"],[[42622,42622],"valid",[],"NV8"],[[42623,42623],"valid"],[[42624,42624],"mapped",[42625]],[[42625,42625],"valid"],[[42626,42626],"mapped",[42627]],[[42627,42627],"valid"],[[42628,42628],"mapped",[42629]],[[42629,42629],"valid"],[[42630,42630],"mapped",[42631]],[[42631,42631],"valid"],[[42632,42632],"mapped",[42633]],[[42633,42633],"valid"],[[42634,42634],"mapped",[42635]],[[42635,42635],"valid"],[[42636,42636],"mapped",[42637]],[[42637,42637],"valid"],[[42638,42638],"mapped",[42639]],[[42639,42639],"valid"],[[42640,42640],"mapped",[42641]],[[42641,42641],"valid"],[[42642,42642],"mapped",[42643]],[[42643,42643],"valid"],[[42644,42644],"mapped",[42645]],[[42645,42645],"valid"],[[42646,42646],"mapped",[42647]],[[42647,42647],"valid"],[[42648,42648],"mapped",[42649]],[[42649,42649],"valid"],[[42650,42650],"mapped",[42651]],[[42651,42651],"valid"],[[42652,42652],"mapped",[1098]],[[42653,42653],"mapped",[1100]],[[42654,42654],"valid"],[[42655,42655],"valid"],[[42656,42725],"valid"],[[42726,42735],"valid",[],"NV8"],[[42736,42737],"valid"],[[42738,42743],"valid",[],"NV8"],[[42744,42751],"disallowed"],[[42752,42774],"valid",[],"NV8"],[[42775,42778],"valid"],[[42779,42783],"valid"],[[42784,42785],"valid",[],"NV8"],[[42786,42786],"mapped",[42787]],[[42787,42787],"valid"],[[42788,42788],"mapped",[42789]],[[42789,42789],"valid"],[[42790,42790],"mapped",[42791]],[[42791,42791],"valid"],[[42792,42792],"mapped",[42793]],[[42793,42793],"valid"],[[42794,42794],"mapped",[42795]],[[42795,42795],"valid"],[[42796,42796],"mapped",[42797]],[[42797,42797],"valid"],[[42798,42798],"mapped",[42799]],[[42799,42801],"valid"],[[42802,42802],"mapped",[42803]],[[42803,42803],"valid"],[[42804,42804],"mapped",[42805]],[[42805,42805],"valid"],[[42806,42806],"mapped",[42807]],[[42807,42807],"valid"],[[42808,42808],"mapped",[42809]],[[42809,42809],"valid"],[[42810,42810],"mapped",[42811]],[[42811,42811],"valid"],[[42812,42812],"mapped",[42813]],[[42813,42813],"valid"],[[42814,42814],"mapped",[42815]],[[42815,42815],"valid"],[[42816,42816],"mapped",[42817]],[[42817,42817],"valid"],[[42818,42818],"mapped",[42819]],[[42819,42819],"valid"],[[42820,42820],"mapped",[42821]],[[42821,42821],"valid"],[[42822,42822],"mapped",[42823]],[[42823,42823],"valid"],[[42824,42824],"mapped",[42825]],[[42825,42825],"valid"],[[42826,42826],"mapped",[42827]],[[42827,42827],"valid"],[[42828,42828],"mapped",[42829]],[[42829,42829],"valid"],[[42830,42830],"mapped",[42831]],[[42831,42831],"valid"],[[42832,42832],"mapped",[42833]],[[42833,42833],"valid"],[[42834,42834],"mapped",[42835]],[[42835,42835],"valid"],[[42836,42836],"mapped",[42837]],[[42837,42837],"valid"],[[42838,42838],"mapped",[42839]],[[42839,42839],"valid"],[[42840,42840],"mapped",[42841]],[[42841,42841],"valid"],[[42842,42842],"mapped",[42843]],[[42843,42843],"valid"],[[42844,42844],"mapped",[42845]],[[42845,42845],"valid"],[[42846,42846],"mapped",[42847]],[[42847,42847],"valid"],[[42848,42848],"mapped",[42849]],[[42849,42849],"valid"],[[42850,42850],"mapped",[42851]],[[42851,42851],"valid"],[[42852,42852],"mapped",[42853]],[[42853,42853],"valid"],[[42854,42854],"mapped",[42855]],[[42855,42855],"valid"],[[42856,42856],"mapped",[42857]],[[42857,42857],"valid"],[[42858,42858],"mapped",[42859]],[[42859,42859],"valid"],[[42860,42860],"mapped",[42861]],[[42861,42861],"valid"],[[42862,42862],"mapped",[42863]],[[42863,42863],"valid"],[[42864,42864],"mapped",[42863]],[[42865,42872],"valid"],[[42873,42873],"mapped",[42874]],[[42874,42874],"valid"],[[42875,42875],"mapped",[42876]],[[42876,42876],"valid"],[[42877,42877],"mapped",[7545]],[[42878,42878],"mapped",[42879]],[[42879,42879],"valid"],[[42880,42880],"mapped",[42881]],[[42881,42881],"valid"],[[42882,42882],"mapped",[42883]],[[42883,42883],"valid"],[[42884,42884],"mapped",[42885]],[[42885,42885],"valid"],[[42886,42886],"mapped",[42887]],[[42887,42888],"valid"],[[42889,42890],"valid",[],"NV8"],[[42891,42891],"mapped",[42892]],[[42892,42892],"valid"],[[42893,42893],"mapped",[613]],[[42894,42894],"valid"],[[42895,42895],"valid"],[[42896,42896],"mapped",[42897]],[[42897,42897],"valid"],[[42898,42898],"mapped",[42899]],[[42899,42899],"valid"],[[42900,42901],"valid"],[[42902,42902],"mapped",[42903]],[[42903,42903],"valid"],[[42904,42904],"mapped",[42905]],[[42905,42905],"valid"],[[42906,42906],"mapped",[42907]],[[42907,42907],"valid"],[[42908,42908],"mapped",[42909]],[[42909,42909],"valid"],[[42910,42910],"mapped",[42911]],[[42911,42911],"valid"],[[42912,42912],"mapped",[42913]],[[42913,42913],"valid"],[[42914,42914],"mapped",[42915]],[[42915,42915],"valid"],[[42916,42916],"mapped",[42917]],[[42917,42917],"valid"],[[42918,42918],"mapped",[42919]],[[42919,42919],"valid"],[[42920,42920],"mapped",[42921]],[[42921,42921],"valid"],[[42922,42922],"mapped",[614]],[[42923,42923],"mapped",[604]],[[42924,42924],"mapped",[609]],[[42925,42925],"mapped",[620]],[[42926,42927],"disallowed"],[[42928,42928],"mapped",[670]],[[42929,42929],"mapped",[647]],[[42930,42930],"mapped",[669]],[[42931,42931],"mapped",[43859]],[[42932,42932],"mapped",[42933]],[[42933,42933],"valid"],[[42934,42934],"mapped",[42935]],[[42935,42935],"valid"],[[42936,42998],"disallowed"],[[42999,42999],"valid"],[[43000,43000],"mapped",[295]],[[43001,43001],"mapped",[339]],[[43002,43002],"valid"],[[43003,43007],"valid"],[[43008,43047],"valid"],[[43048,43051],"valid",[],"NV8"],[[43052,43055],"disallowed"],[[43056,43065],"valid",[],"NV8"],[[43066,43071],"disallowed"],[[43072,43123],"valid"],[[43124,43127],"valid",[],"NV8"],[[43128,43135],"disallowed"],[[43136,43204],"valid"],[[43205,43213],"disallowed"],[[43214,43215],"valid",[],"NV8"],[[43216,43225],"valid"],[[43226,43231],"disallowed"],[[43232,43255],"valid"],[[43256,43258],"valid",[],"NV8"],[[43259,43259],"valid"],[[43260,43260],"valid",[],"NV8"],[[43261,43261],"valid"],[[43262,43263],"disallowed"],[[43264,43309],"valid"],[[43310,43311],"valid",[],"NV8"],[[43312,43347],"valid"],[[43348,43358],"disallowed"],[[43359,43359],"valid",[],"NV8"],[[43360,43388],"valid",[],"NV8"],[[43389,43391],"disallowed"],[[43392,43456],"valid"],[[43457,43469],"valid",[],"NV8"],[[43470,43470],"disallowed"],[[43471,43481],"valid"],[[43482,43485],"disallowed"],[[43486,43487],"valid",[],"NV8"],[[43488,43518],"valid"],[[43519,43519],"disallowed"],[[43520,43574],"valid"],[[43575,43583],"disallowed"],[[43584,43597],"valid"],[[43598,43599],"disallowed"],[[43600,43609],"valid"],[[43610,43611],"disallowed"],[[43612,43615],"valid",[],"NV8"],[[43616,43638],"valid"],[[43639,43641],"valid",[],"NV8"],[[43642,43643],"valid"],[[43644,43647],"valid"],[[43648,43714],"valid"],[[43715,43738],"disallowed"],[[43739,43741],"valid"],[[43742,43743],"valid",[],"NV8"],[[43744,43759],"valid"],[[43760,43761],"valid",[],"NV8"],[[43762,43766],"valid"],[[43767,43776],"disallowed"],[[43777,43782],"valid"],[[43783,43784],"disallowed"],[[43785,43790],"valid"],[[43791,43792],"disallowed"],[[43793,43798],"valid"],[[43799,43807],"disallowed"],[[43808,43814],"valid"],[[43815,43815],"disallowed"],[[43816,43822],"valid"],[[43823,43823],"disallowed"],[[43824,43866],"valid"],[[43867,43867],"valid",[],"NV8"],[[43868,43868],"mapped",[42791]],[[43869,43869],"mapped",[43831]],[[43870,43870],"mapped",[619]],[[43871,43871],"mapped",[43858]],[[43872,43875],"valid"],[[43876,43877],"valid"],[[43878,43887],"disallowed"],[[43888,43888],"mapped",[5024]],[[43889,43889],"mapped",[5025]],[[43890,43890],"mapped",[5026]],[[43891,43891],"mapped",[5027]],[[43892,43892],"mapped",[5028]],[[43893,43893],"mapped",[5029]],[[43894,43894],"mapped",[5030]],[[43895,43895],"mapped",[5031]],[[43896,43896],"mapped",[5032]],[[43897,43897],"mapped",[5033]],[[43898,43898],"mapped",[5034]],[[43899,43899],"mapped",[5035]],[[43900,43900],"mapped",[5036]],[[43901,43901],"mapped",[5037]],[[43902,43902],"mapped",[5038]],[[43903,43903],"mapped",[5039]],[[43904,43904],"mapped",[5040]],[[43905,43905],"mapped",[5041]],[[43906,43906],"mapped",[5042]],[[43907,43907],"mapped",[5043]],[[43908,43908],"mapped",[5044]],[[43909,43909],"mapped",[5045]],[[43910,43910],"mapped",[5046]],[[43911,43911],"mapped",[5047]],[[43912,43912],"mapped",[5048]],[[43913,43913],"mapped",[5049]],[[43914,43914],"mapped",[5050]],[[43915,43915],"mapped",[5051]],[[43916,43916],"mapped",[5052]],[[43917,43917],"mapped",[5053]],[[43918,43918],"mapped",[5054]],[[43919,43919],"mapped",[5055]],[[43920,43920],"mapped",[5056]],[[43921,43921],"mapped",[5057]],[[43922,43922],"mapped",[5058]],[[43923,43923],"mapped",[5059]],[[43924,43924],"mapped",[5060]],[[43925,43925],"mapped",[5061]],[[43926,43926],"mapped",[5062]],[[43927,43927],"mapped",[5063]],[[43928,43928],"mapped",[5064]],[[43929,43929],"mapped",[5065]],[[43930,43930],"mapped",[5066]],[[43931,43931],"mapped",[5067]],[[43932,43932],"mapped",[5068]],[[43933,43933],"mapped",[5069]],[[43934,43934],"mapped",[5070]],[[43935,43935],"mapped",[5071]],[[43936,43936],"mapped",[5072]],[[43937,43937],"mapped",[5073]],[[43938,43938],"mapped",[5074]],[[43939,43939],"mapped",[5075]],[[43940,43940],"mapped",[5076]],[[43941,43941],"mapped",[5077]],[[43942,43942],"mapped",[5078]],[[43943,43943],"mapped",[5079]],[[43944,43944],"mapped",[5080]],[[43945,43945],"mapped",[5081]],[[43946,43946],"mapped",[5082]],[[43947,43947],"mapped",[5083]],[[43948,43948],"mapped",[5084]],[[43949,43949],"mapped",[5085]],[[43950,43950],"mapped",[5086]],[[43951,43951],"mapped",[5087]],[[43952,43952],"mapped",[5088]],[[43953,43953],"mapped",[5089]],[[43954,43954],"mapped",[5090]],[[43955,43955],"mapped",[5091]],[[43956,43956],"mapped",[5092]],[[43957,43957],"mapped",[5093]],[[43958,43958],"mapped",[5094]],[[43959,43959],"mapped",[5095]],[[43960,43960],"mapped",[5096]],[[43961,43961],"mapped",[5097]],[[43962,43962],"mapped",[5098]],[[43963,43963],"mapped",[5099]],[[43964,43964],"mapped",[5100]],[[43965,43965],"mapped",[5101]],[[43966,43966],"mapped",[5102]],[[43967,43967],"mapped",[5103]],[[43968,44010],"valid"],[[44011,44011],"valid",[],"NV8"],[[44012,44013],"valid"],[[44014,44015],"disallowed"],[[44016,44025],"valid"],[[44026,44031],"disallowed"],[[44032,55203],"valid"],[[55204,55215],"disallowed"],[[55216,55238],"valid",[],"NV8"],[[55239,55242],"disallowed"],[[55243,55291],"valid",[],"NV8"],[[55292,55295],"disallowed"],[[55296,57343],"disallowed"],[[57344,63743],"disallowed"],[[63744,63744],"mapped",[35912]],[[63745,63745],"mapped",[26356]],[[63746,63746],"mapped",[36554]],[[63747,63747],"mapped",[36040]],[[63748,63748],"mapped",[28369]],[[63749,63749],"mapped",[20018]],[[63750,63750],"mapped",[21477]],[[63751,63752],"mapped",[40860]],[[63753,63753],"mapped",[22865]],[[63754,63754],"mapped",[37329]],[[63755,63755],"mapped",[21895]],[[63756,63756],"mapped",[22856]],[[63757,63757],"mapped",[25078]],[[63758,63758],"mapped",[30313]],[[63759,63759],"mapped",[32645]],[[63760,63760],"mapped",[34367]],[[63761,63761],"mapped",[34746]],[[63762,63762],"mapped",[35064]],[[63763,63763],"mapped",[37007]],[[63764,63764],"mapped",[27138]],[[63765,63765],"mapped",[27931]],[[63766,63766],"mapped",[28889]],[[63767,63767],"mapped",[29662]],[[63768,63768],"mapped",[33853]],[[63769,63769],"mapped",[37226]],[[63770,63770],"mapped",[39409]],[[63771,63771],"mapped",[20098]],[[63772,63772],"mapped",[21365]],[[63773,63773],"mapped",[27396]],[[63774,63774],"mapped",[29211]],[[63775,63775],"mapped",[34349]],[[63776,63776],"mapped",[40478]],[[63777,63777],"mapped",[23888]],[[63778,63778],"mapped",[28651]],[[63779,63779],"mapped",[34253]],[[63780,63780],"mapped",[35172]],[[63781,63781],"mapped",[25289]],[[63782,63782],"mapped",[33240]],[[63783,63783],"mapped",[34847]],[[63784,63784],"mapped",[24266]],[[63785,63785],"mapped",[26391]],[[63786,63786],"mapped",[28010]],[[63787,63787],"mapped",[29436]],[[63788,63788],"mapped",[37070]],[[63789,63789],"mapped",[20358]],[[63790,63790],"mapped",[20919]],[[63791,63791],"mapped",[21214]],[[63792,63792],"mapped",[25796]],[[63793,63793],"mapped",[27347]],[[63794,63794],"mapped",[29200]],[[63795,63795],"mapped",[30439]],[[63796,63796],"mapped",[32769]],[[63797,63797],"mapped",[34310]],[[63798,63798],"mapped",[34396]],[[63799,63799],"mapped",[36335]],[[63800,63800],"mapped",[38706]],[[63801,63801],"mapped",[39791]],[[63802,63802],"mapped",[40442]],[[63803,63803],"mapped",[30860]],[[63804,63804],"mapped",[31103]],[[63805,63805],"mapped",[32160]],[[63806,63806],"mapped",[33737]],[[63807,63807],"mapped",[37636]],[[63808,63808],"mapped",[40575]],[[63809,63809],"mapped",[35542]],[[63810,63810],"mapped",[22751]],[[63811,63811],"mapped",[24324]],[[63812,63812],"mapped",[31840]],[[63813,63813],"mapped",[32894]],[[63814,63814],"mapped",[29282]],[[63815,63815],"mapped",[30922]],[[63816,63816],"mapped",[36034]],[[63817,63817],"mapped",[38647]],[[63818,63818],"mapped",[22744]],[[63819,63819],"mapped",[23650]],[[63820,63820],"mapped",[27155]],[[63821,63821],"mapped",[28122]],[[63822,63822],"mapped",[28431]],[[63823,63823],"mapped",[32047]],[[63824,63824],"mapped",[32311]],[[63825,63825],"mapped",[38475]],[[63826,63826],"mapped",[21202]],[[63827,63827],"mapped",[32907]],[[63828,63828],"mapped",[20956]],[[63829,63829],"mapped",[20940]],[[63830,63830],"mapped",[31260]],[[63831,63831],"mapped",[32190]],[[63832,63832],"mapped",[33777]],[[63833,63833],"mapped",[38517]],[[63834,63834],"mapped",[35712]],[[63835,63835],"mapped",[25295]],[[63836,63836],"mapped",[27138]],[[63837,63837],"mapped",[35582]],[[63838,63838],"mapped",[20025]],[[63839,63839],"mapped",[23527]],[[63840,63840],"mapped",[24594]],[[63841,63841],"mapped",[29575]],[[63842,63842],"mapped",[30064]],[[63843,63843],"mapped",[21271]],[[63844,63844],"mapped",[30971]],[[63845,63845],"mapped",[20415]],[[63846,63846],"mapped",[24489]],[[63847,63847],"mapped",[19981]],[[63848,63848],"mapped",[27852]],[[63849,63849],"mapped",[25976]],[[63850,63850],"mapped",[32034]],[[63851,63851],"mapped",[21443]],[[63852,63852],"mapped",[22622]],[[63853,63853],"mapped",[30465]],[[63854,63854],"mapped",[33865]],[[63855,63855],"mapped",[35498]],[[63856,63856],"mapped",[27578]],[[63857,63857],"mapped",[36784]],[[63858,63858],"mapped",[27784]],[[63859,63859],"mapped",[25342]],[[63860,63860],"mapped",[33509]],[[63861,63861],"mapped",[25504]],[[63862,63862],"mapped",[30053]],[[63863,63863],"mapped",[20142]],[[63864,63864],"mapped",[20841]],[[63865,63865],"mapped",[20937]],[[63866,63866],"mapped",[26753]],[[63867,63867],"mapped",[31975]],[[63868,63868],"mapped",[33391]],[[63869,63869],"mapped",[35538]],[[63870,63870],"mapped",[37327]],[[63871,63871],"mapped",[21237]],[[63872,63872],"mapped",[21570]],[[63873,63873],"mapped",[22899]],[[63874,63874],"mapped",[24300]],[[63875,63875],"mapped",[26053]],[[63876,63876],"mapped",[28670]],[[63877,63877],"mapped",[31018]],[[63878,63878],"mapped",[38317]],[[63879,63879],"mapped",[39530]],[[63880,63880],"mapped",[40599]],[[63881,63881],"mapped",[40654]],[[63882,63882],"mapped",[21147]],[[63883,63883],"mapped",[26310]],[[63884,63884],"mapped",[27511]],[[63885,63885],"mapped",[36706]],[[63886,63886],"mapped",[24180]],[[63887,63887],"mapped",[24976]],[[63888,63888],"mapped",[25088]],[[63889,63889],"mapped",[25754]],[[63890,63890],"mapped",[28451]],[[63891,63891],"mapped",[29001]],[[63892,63892],"mapped",[29833]],[[63893,63893],"mapped",[31178]],[[63894,63894],"mapped",[32244]],[[63895,63895],"mapped",[32879]],[[63896,63896],"mapped",[36646]],[[63897,63897],"mapped",[34030]],[[63898,63898],"mapped",[36899]],[[63899,63899],"mapped",[37706]],[[63900,63900],"mapped",[21015]],[[63901,63901],"mapped",[21155]],[[63902,63902],"mapped",[21693]],[[63903,63903],"mapped",[28872]],[[63904,63904],"mapped",[35010]],[[63905,63905],"mapped",[35498]],[[63906,63906],"mapped",[24265]],[[63907,63907],"mapped",[24565]],[[63908,63908],"mapped",[25467]],[[63909,63909],"mapped",[27566]],[[63910,63910],"mapped",[31806]],[[63911,63911],"mapped",[29557]],[[63912,63912],"mapped",[20196]],[[63913,63913],"mapped",[22265]],[[63914,63914],"mapped",[23527]],[[63915,63915],"mapped",[23994]],[[63916,63916],"mapped",[24604]],[[63917,63917],"mapped",[29618]],[[63918,63918],"mapped",[29801]],[[63919,63919],"mapped",[32666]],[[63920,63920],"mapped",[32838]],[[63921,63921],"mapped",[37428]],[[63922,63922],"mapped",[38646]],[[63923,63923],"mapped",[38728]],[[63924,63924],"mapped",[38936]],[[63925,63925],"mapped",[20363]],[[63926,63926],"mapped",[31150]],[[63927,63927],"mapped",[37300]],[[63928,63928],"mapped",[38584]],[[63929,63929],"mapped",[24801]],[[63930,63930],"mapped",[20102]],[[63931,63931],"mapped",[20698]],[[63932,63932],"mapped",[23534]],[[63933,63933],"mapped",[23615]],[[63934,63934],"mapped",[26009]],[[63935,63935],"mapped",[27138]],[[63936,63936],"mapped",[29134]],[[63937,63937],"mapped",[30274]],[[63938,63938],"mapped",[34044]],[[63939,63939],"mapped",[36988]],[[63940,63940],"mapped",[40845]],[[63941,63941],"mapped",[26248]],[[63942,63942],"mapped",[38446]],[[63943,63943],"mapped",[21129]],[[63944,63944],"mapped",[26491]],[[63945,63945],"mapped",[26611]],[[63946,63946],"mapped",[27969]],[[63947,63947],"mapped",[28316]],[[63948,63948],"mapped",[29705]],[[63949,63949],"mapped",[30041]],[[63950,63950],"mapped",[30827]],[[63951,63951],"mapped",[32016]],[[63952,63952],"mapped",[39006]],[[63953,63953],"mapped",[20845]],[[63954,63954],"mapped",[25134]],[[63955,63955],"mapped",[38520]],[[63956,63956],"mapped",[20523]],[[63957,63957],"mapped",[23833]],[[63958,63958],"mapped",[28138]],[[63959,63959],"mapped",[36650]],[[63960,63960],"mapped",[24459]],[[63961,63961],"mapped",[24900]],[[63962,63962],"mapped",[26647]],[[63963,63963],"mapped",[29575]],[[63964,63964],"mapped",[38534]],[[63965,63965],"mapped",[21033]],[[63966,63966],"mapped",[21519]],[[63967,63967],"mapped",[23653]],[[63968,63968],"mapped",[26131]],[[63969,63969],"mapped",[26446]],[[63970,63970],"mapped",[26792]],[[63971,63971],"mapped",[27877]],[[63972,63972],"mapped",[29702]],[[63973,63973],"mapped",[30178]],[[63974,63974],"mapped",[32633]],[[63975,63975],"mapped",[35023]],[[63976,63976],"mapped",[35041]],[[63977,63977],"mapped",[37324]],[[63978,63978],"mapped",[38626]],[[63979,63979],"mapped",[21311]],[[63980,63980],"mapped",[28346]],[[63981,63981],"mapped",[21533]],[[63982,63982],"mapped",[29136]],[[63983,63983],"mapped",[29848]],[[63984,63984],"mapped",[34298]],[[63985,63985],"mapped",[38563]],[[63986,63986],"mapped",[40023]],[[63987,63987],"mapped",[40607]],[[63988,63988],"mapped",[26519]],[[63989,63989],"mapped",[28107]],[[63990,63990],"mapped",[33256]],[[63991,63991],"mapped",[31435]],[[63992,63992],"mapped",[31520]],[[63993,63993],"mapped",[31890]],[[63994,63994],"mapped",[29376]],[[63995,63995],"mapped",[28825]],[[63996,63996],"mapped",[35672]],[[63997,63997],"mapped",[20160]],[[63998,63998],"mapped",[33590]],[[63999,63999],"mapped",[21050]],[[64000,64000],"mapped",[20999]],[[64001,64001],"mapped",[24230]],[[64002,64002],"mapped",[25299]],[[64003,64003],"mapped",[31958]],[[64004,64004],"mapped",[23429]],[[64005,64005],"mapped",[27934]],[[64006,64006],"mapped",[26292]],[[64007,64007],"mapped",[36667]],[[64008,64008],"mapped",[34892]],[[64009,64009],"mapped",[38477]],[[64010,64010],"mapped",[35211]],[[64011,64011],"mapped",[24275]],[[64012,64012],"mapped",[20800]],[[64013,64013],"mapped",[21952]],[[64014,64015],"valid"],[[64016,64016],"mapped",[22618]],[[64017,64017],"valid"],[[64018,64018],"mapped",[26228]],[[64019,64020],"valid"],[[64021,64021],"mapped",[20958]],[[64022,64022],"mapped",[29482]],[[64023,64023],"mapped",[30410]],[[64024,64024],"mapped",[31036]],[[64025,64025],"mapped",[31070]],[[64026,64026],"mapped",[31077]],[[64027,64027],"mapped",[31119]],[[64028,64028],"mapped",[38742]],[[64029,64029],"mapped",[31934]],[[64030,64030],"mapped",[32701]],[[64031,64031],"valid"],[[64032,64032],"mapped",[34322]],[[64033,64033],"valid"],[[64034,64034],"mapped",[35576]],[[64035,64036],"valid"],[[64037,64037],"mapped",[36920]],[[64038,64038],"mapped",[37117]],[[64039,64041],"valid"],[[64042,64042],"mapped",[39151]],[[64043,64043],"mapped",[39164]],[[64044,64044],"mapped",[39208]],[[64045,64045],"mapped",[40372]],[[64046,64046],"mapped",[37086]],[[64047,64047],"mapped",[38583]],[[64048,64048],"mapped",[20398]],[[64049,64049],"mapped",[20711]],[[64050,64050],"mapped",[20813]],[[64051,64051],"mapped",[21193]],[[64052,64052],"mapped",[21220]],[[64053,64053],"mapped",[21329]],[[64054,64054],"mapped",[21917]],[[64055,64055],"mapped",[22022]],[[64056,64056],"mapped",[22120]],[[64057,64057],"mapped",[22592]],[[64058,64058],"mapped",[22696]],[[64059,64059],"mapped",[23652]],[[64060,64060],"mapped",[23662]],[[64061,64061],"mapped",[24724]],[[64062,64062],"mapped",[24936]],[[64063,64063],"mapped",[24974]],[[64064,64064],"mapped",[25074]],[[64065,64065],"mapped",[25935]],[[64066,64066],"mapped",[26082]],[[64067,64067],"mapped",[26257]],[[64068,64068],"mapped",[26757]],[[64069,64069],"mapped",[28023]],[[64070,64070],"mapped",[28186]],[[64071,64071],"mapped",[28450]],[[64072,64072],"mapped",[29038]],[[64073,64073],"mapped",[29227]],[[64074,64074],"mapped",[29730]],[[64075,64075],"mapped",[30865]],[[64076,64076],"mapped",[31038]],[[64077,64077],"mapped",[31049]],[[64078,64078],"mapped",[31048]],[[64079,64079],"mapped",[31056]],[[64080,64080],"mapped",[31062]],[[64081,64081],"mapped",[31069]],[[64082,64082],"mapped",[31117]],[[64083,64083],"mapped",[31118]],[[64084,64084],"mapped",[31296]],[[64085,64085],"mapped",[31361]],[[64086,64086],"mapped",[31680]],[[64087,64087],"mapped",[32244]],[[64088,64088],"mapped",[32265]],[[64089,64089],"mapped",[32321]],[[64090,64090],"mapped",[32626]],[[64091,64091],"mapped",[32773]],[[64092,64092],"mapped",[33261]],[[64093,64094],"mapped",[33401]],[[64095,64095],"mapped",[33879]],[[64096,64096],"mapped",[35088]],[[64097,64097],"mapped",[35222]],[[64098,64098],"mapped",[35585]],[[64099,64099],"mapped",[35641]],[[64100,64100],"mapped",[36051]],[[64101,64101],"mapped",[36104]],[[64102,64102],"mapped",[36790]],[[64103,64103],"mapped",[36920]],[[64104,64104],"mapped",[38627]],[[64105,64105],"mapped",[38911]],[[64106,64106],"mapped",[38971]],[[64107,64107],"mapped",[24693]],[[64108,64108],"mapped",[148206]],[[64109,64109],"mapped",[33304]],[[64110,64111],"disallowed"],[[64112,64112],"mapped",[20006]],[[64113,64113],"mapped",[20917]],[[64114,64114],"mapped",[20840]],[[64115,64115],"mapped",[20352]],[[64116,64116],"mapped",[20805]],[[64117,64117],"mapped",[20864]],[[64118,64118],"mapped",[21191]],[[64119,64119],"mapped",[21242]],[[64120,64120],"mapped",[21917]],[[64121,64121],"mapped",[21845]],[[64122,64122],"mapped",[21913]],[[64123,64123],"mapped",[21986]],[[64124,64124],"mapped",[22618]],[[64125,64125],"mapped",[22707]],[[64126,64126],"mapped",[22852]],[[64127,64127],"mapped",[22868]],[[64128,64128],"mapped",[23138]],[[64129,64129],"mapped",[23336]],[[64130,64130],"mapped",[24274]],[[64131,64131],"mapped",[24281]],[[64132,64132],"mapped",[24425]],[[64133,64133],"mapped",[24493]],[[64134,64134],"mapped",[24792]],[[64135,64135],"mapped",[24910]],[[64136,64136],"mapped",[24840]],[[64137,64137],"mapped",[24974]],[[64138,64138],"mapped",[24928]],[[64139,64139],"mapped",[25074]],[[64140,64140],"mapped",[25140]],[[64141,64141],"mapped",[25540]],[[64142,64142],"mapped",[25628]],[[64143,64143],"mapped",[25682]],[[64144,64144],"mapped",[25942]],[[64145,64145],"mapped",[26228]],[[64146,64146],"mapped",[26391]],[[64147,64147],"mapped",[26395]],[[64148,64148],"mapped",[26454]],[[64149,64149],"mapped",[27513]],[[64150,64150],"mapped",[27578]],[[64151,64151],"mapped",[27969]],[[64152,64152],"mapped",[28379]],[[64153,64153],"mapped",[28363]],[[64154,64154],"mapped",[28450]],[[64155,64155],"mapped",[28702]],[[64156,64156],"mapped",[29038]],[[64157,64157],"mapped",[30631]],[[64158,64158],"mapped",[29237]],[[64159,64159],"mapped",[29359]],[[64160,64160],"mapped",[29482]],[[64161,64161],"mapped",[29809]],[[64162,64162],"mapped",[29958]],[[64163,64163],"mapped",[30011]],[[64164,64164],"mapped",[30237]],[[64165,64165],"mapped",[30239]],[[64166,64166],"mapped",[30410]],[[64167,64167],"mapped",[30427]],[[64168,64168],"mapped",[30452]],[[64169,64169],"mapped",[30538]],[[64170,64170],"mapped",[30528]],[[64171,64171],"mapped",[30924]],[[64172,64172],"mapped",[31409]],[[64173,64173],"mapped",[31680]],[[64174,64174],"mapped",[31867]],[[64175,64175],"mapped",[32091]],[[64176,64176],"mapped",[32244]],[[64177,64177],"mapped",[32574]],[[64178,64178],"mapped",[32773]],[[64179,64179],"mapped",[33618]],[[64180,64180],"mapped",[33775]],[[64181,64181],"mapped",[34681]],[[64182,64182],"mapped",[35137]],[[64183,64183],"mapped",[35206]],[[64184,64184],"mapped",[35222]],[[64185,64185],"mapped",[35519]],[[64186,64186],"mapped",[35576]],[[64187,64187],"mapped",[35531]],[[64188,64188],"mapped",[35585]],[[64189,64189],"mapped",[35582]],[[64190,64190],"mapped",[35565]],[[64191,64191],"mapped",[35641]],[[64192,64192],"mapped",[35722]],[[64193,64193],"mapped",[36104]],[[64194,64194],"mapped",[36664]],[[64195,64195],"mapped",[36978]],[[64196,64196],"mapped",[37273]],[[64197,64197],"mapped",[37494]],[[64198,64198],"mapped",[38524]],[[64199,64199],"mapped",[38627]],[[64200,64200],"mapped",[38742]],[[64201,64201],"mapped",[38875]],[[64202,64202],"mapped",[38911]],[[64203,64203],"mapped",[38923]],[[64204,64204],"mapped",[38971]],[[64205,64205],"mapped",[39698]],[[64206,64206],"mapped",[40860]],[[64207,64207],"mapped",[141386]],[[64208,64208],"mapped",[141380]],[[64209,64209],"mapped",[144341]],[[64210,64210],"mapped",[15261]],[[64211,64211],"mapped",[16408]],[[64212,64212],"mapped",[16441]],[[64213,64213],"mapped",[152137]],[[64214,64214],"mapped",[154832]],[[64215,64215],"mapped",[163539]],[[64216,64216],"mapped",[40771]],[[64217,64217],"mapped",[40846]],[[64218,64255],"disallowed"],[[64256,64256],"mapped",[102,102]],[[64257,64257],"mapped",[102,105]],[[64258,64258],"mapped",[102,108]],[[64259,64259],"mapped",[102,102,105]],[[64260,64260],"mapped",[102,102,108]],[[64261,64262],"mapped",[115,116]],[[64263,64274],"disallowed"],[[64275,64275],"mapped",[1396,1398]],[[64276,64276],"mapped",[1396,1381]],[[64277,64277],"mapped",[1396,1387]],[[64278,64278],"mapped",[1406,1398]],[[64279,64279],"mapped",[1396,1389]],[[64280,64284],"disallowed"],[[64285,64285],"mapped",[1497,1460]],[[64286,64286],"valid"],[[64287,64287],"mapped",[1522,1463]],[[64288,64288],"mapped",[1506]],[[64289,64289],"mapped",[1488]],[[64290,64290],"mapped",[1491]],[[64291,64291],"mapped",[1492]],[[64292,64292],"mapped",[1499]],[[64293,64293],"mapped",[1500]],[[64294,64294],"mapped",[1501]],[[64295,64295],"mapped",[1512]],[[64296,64296],"mapped",[1514]],[[64297,64297],"disallowed_STD3_mapped",[43]],[[64298,64298],"mapped",[1513,1473]],[[64299,64299],"mapped",[1513,1474]],[[64300,64300],"mapped",[1513,1468,1473]],[[64301,64301],"mapped",[1513,1468,1474]],[[64302,64302],"mapped",[1488,1463]],[[64303,64303],"mapped",[1488,1464]],[[64304,64304],"mapped",[1488,1468]],[[64305,64305],"mapped",[1489,1468]],[[64306,64306],"mapped",[1490,1468]],[[64307,64307],"mapped",[1491,1468]],[[64308,64308],"mapped",[1492,1468]],[[64309,64309],"mapped",[1493,1468]],[[64310,64310],"mapped",[1494,1468]],[[64311,64311],"disallowed"],[[64312,64312],"mapped",[1496,1468]],[[64313,64313],"mapped",[1497,1468]],[[64314,64314],"mapped",[1498,1468]],[[64315,64315],"mapped",[1499,1468]],[[64316,64316],"mapped",[1500,1468]],[[64317,64317],"disallowed"],[[64318,64318],"mapped",[1502,1468]],[[64319,64319],"disallowed"],[[64320,64320],"mapped",[1504,1468]],[[64321,64321],"mapped",[1505,1468]],[[64322,64322],"disallowed"],[[64323,64323],"mapped",[1507,1468]],[[64324,64324],"mapped",[1508,1468]],[[64325,64325],"disallowed"],[[64326,64326],"mapped",[1510,1468]],[[64327,64327],"mapped",[1511,1468]],[[64328,64328],"mapped",[1512,1468]],[[64329,64329],"mapped",[1513,1468]],[[64330,64330],"mapped",[1514,1468]],[[64331,64331],"mapped",[1493,1465]],[[64332,64332],"mapped",[1489,1471]],[[64333,64333],"mapped",[1499,1471]],[[64334,64334],"mapped",[1508,1471]],[[64335,64335],"mapped",[1488,1500]],[[64336,64337],"mapped",[1649]],[[64338,64341],"mapped",[1659]],[[64342,64345],"mapped",[1662]],[[64346,64349],"mapped",[1664]],[[64350,64353],"mapped",[1658]],[[64354,64357],"mapped",[1663]],[[64358,64361],"mapped",[1657]],[[64362,64365],"mapped",[1700]],[[64366,64369],"mapped",[1702]],[[64370,64373],"mapped",[1668]],[[64374,64377],"mapped",[1667]],[[64378,64381],"mapped",[1670]],[[64382,64385],"mapped",[1671]],[[64386,64387],"mapped",[1677]],[[64388,64389],"mapped",[1676]],[[64390,64391],"mapped",[1678]],[[64392,64393],"mapped",[1672]],[[64394,64395],"mapped",[1688]],[[64396,64397],"mapped",[1681]],[[64398,64401],"mapped",[1705]],[[64402,64405],"mapped",[1711]],[[64406,64409],"mapped",[1715]],[[64410,64413],"mapped",[1713]],[[64414,64415],"mapped",[1722]],[[64416,64419],"mapped",[1723]],[[64420,64421],"mapped",[1728]],[[64422,64425],"mapped",[1729]],[[64426,64429],"mapped",[1726]],[[64430,64431],"mapped",[1746]],[[64432,64433],"mapped",[1747]],[[64434,64449],"valid",[],"NV8"],[[64450,64466],"disallowed"],[[64467,64470],"mapped",[1709]],[[64471,64472],"mapped",[1735]],[[64473,64474],"mapped",[1734]],[[64475,64476],"mapped",[1736]],[[64477,64477],"mapped",[1735,1652]],[[64478,64479],"mapped",[1739]],[[64480,64481],"mapped",[1733]],[[64482,64483],"mapped",[1737]],[[64484,64487],"mapped",[1744]],[[64488,64489],"mapped",[1609]],[[64490,64491],"mapped",[1574,1575]],[[64492,64493],"mapped",[1574,1749]],[[64494,64495],"mapped",[1574,1608]],[[64496,64497],"mapped",[1574,1735]],[[64498,64499],"mapped",[1574,1734]],[[64500,64501],"mapped",[1574,1736]],[[64502,64504],"mapped",[1574,1744]],[[64505,64507],"mapped",[1574,1609]],[[64508,64511],"mapped",[1740]],[[64512,64512],"mapped",[1574,1580]],[[64513,64513],"mapped",[1574,1581]],[[64514,64514],"mapped",[1574,1605]],[[64515,64515],"mapped",[1574,1609]],[[64516,64516],"mapped",[1574,1610]],[[64517,64517],"mapped",[1576,1580]],[[64518,64518],"mapped",[1576,1581]],[[64519,64519],"mapped",[1576,1582]],[[64520,64520],"mapped",[1576,1605]],[[64521,64521],"mapped",[1576,1609]],[[64522,64522],"mapped",[1576,1610]],[[64523,64523],"mapped",[1578,1580]],[[64524,64524],"mapped",[1578,1581]],[[64525,64525],"mapped",[1578,1582]],[[64526,64526],"mapped",[1578,1605]],[[64527,64527],"mapped",[1578,1609]],[[64528,64528],"mapped",[1578,1610]],[[64529,64529],"mapped",[1579,1580]],[[64530,64530],"mapped",[1579,1605]],[[64531,64531],"mapped",[1579,1609]],[[64532,64532],"mapped",[1579,1610]],[[64533,64533],"mapped",[1580,1581]],[[64534,64534],"mapped",[1580,1605]],[[64535,64535],"mapped",[1581,1580]],[[64536,64536],"mapped",[1581,1605]],[[64537,64537],"mapped",[1582,1580]],[[64538,64538],"mapped",[1582,1581]],[[64539,64539],"mapped",[1582,1605]],[[64540,64540],"mapped",[1587,1580]],[[64541,64541],"mapped",[1587,1581]],[[64542,64542],"mapped",[1587,1582]],[[64543,64543],"mapped",[1587,1605]],[[64544,64544],"mapped",[1589,1581]],[[64545,64545],"mapped",[1589,1605]],[[64546,64546],"mapped",[1590,1580]],[[64547,64547],"mapped",[1590,1581]],[[64548,64548],"mapped",[1590,1582]],[[64549,64549],"mapped",[1590,1605]],[[64550,64550],"mapped",[1591,1581]],[[64551,64551],"mapped",[1591,1605]],[[64552,64552],"mapped",[1592,1605]],[[64553,64553],"mapped",[1593,1580]],[[64554,64554],"mapped",[1593,1605]],[[64555,64555],"mapped",[1594,1580]],[[64556,64556],"mapped",[1594,1605]],[[64557,64557],"mapped",[1601,1580]],[[64558,64558],"mapped",[1601,1581]],[[64559,64559],"mapped",[1601,1582]],[[64560,64560],"mapped",[1601,1605]],[[64561,64561],"mapped",[1601,1609]],[[64562,64562],"mapped",[1601,1610]],[[64563,64563],"mapped",[1602,1581]],[[64564,64564],"mapped",[1602,1605]],[[64565,64565],"mapped",[1602,1609]],[[64566,64566],"mapped",[1602,1610]],[[64567,64567],"mapped",[1603,1575]],[[64568,64568],"mapped",[1603,1580]],[[64569,64569],"mapped",[1603,1581]],[[64570,64570],"mapped",[1603,1582]],[[64571,64571],"mapped",[1603,1604]],[[64572,64572],"mapped",[1603,1605]],[[64573,64573],"mapped",[1603,1609]],[[64574,64574],"mapped",[1603,1610]],[[64575,64575],"mapped",[1604,1580]],[[64576,64576],"mapped",[1604,1581]],[[64577,64577],"mapped",[1604,1582]],[[64578,64578],"mapped",[1604,1605]],[[64579,64579],"mapped",[1604,1609]],[[64580,64580],"mapped",[1604,1610]],[[64581,64581],"mapped",[1605,1580]],[[64582,64582],"mapped",[1605,1581]],[[64583,64583],"mapped",[1605,1582]],[[64584,64584],"mapped",[1605,1605]],[[64585,64585],"mapped",[1605,1609]],[[64586,64586],"mapped",[1605,1610]],[[64587,64587],"mapped",[1606,1580]],[[64588,64588],"mapped",[1606,1581]],[[64589,64589],"mapped",[1606,1582]],[[64590,64590],"mapped",[1606,1605]],[[64591,64591],"mapped",[1606,1609]],[[64592,64592],"mapped",[1606,1610]],[[64593,64593],"mapped",[1607,1580]],[[64594,64594],"mapped",[1607,1605]],[[64595,64595],"mapped",[1607,1609]],[[64596,64596],"mapped",[1607,1610]],[[64597,64597],"mapped",[1610,1580]],[[64598,64598],"mapped",[1610,1581]],[[64599,64599],"mapped",[1610,1582]],[[64600,64600],"mapped",[1610,1605]],[[64601,64601],"mapped",[1610,1609]],[[64602,64602],"mapped",[1610,1610]],[[64603,64603],"mapped",[1584,1648]],[[64604,64604],"mapped",[1585,1648]],[[64605,64605],"mapped",[1609,1648]],[[64606,64606],"disallowed_STD3_mapped",[32,1612,1617]],[[64607,64607],"disallowed_STD3_mapped",[32,1613,1617]],[[64608,64608],"disallowed_STD3_mapped",[32,1614,1617]],[[64609,64609],"disallowed_STD3_mapped",[32,1615,1617]],[[64610,64610],"disallowed_STD3_mapped",[32,1616,1617]],[[64611,64611],"disallowed_STD3_mapped",[32,1617,1648]],[[64612,64612],"mapped",[1574,1585]],[[64613,64613],"mapped",[1574,1586]],[[64614,64614],"mapped",[1574,1605]],[[64615,64615],"mapped",[1574,1606]],[[64616,64616],"mapped",[1574,1609]],[[64617,64617],"mapped",[1574,1610]],[[64618,64618],"mapped",[1576,1585]],[[64619,64619],"mapped",[1576,1586]],[[64620,64620],"mapped",[1576,1605]],[[64621,64621],"mapped",[1576,1606]],[[64622,64622],"mapped",[1576,1609]],[[64623,64623],"mapped",[1576,1610]],[[64624,64624],"mapped",[1578,1585]],[[64625,64625],"mapped",[1578,1586]],[[64626,64626],"mapped",[1578,1605]],[[64627,64627],"mapped",[1578,1606]],[[64628,64628],"mapped",[1578,1609]],[[64629,64629],"mapped",[1578,1610]],[[64630,64630],"mapped",[1579,1585]],[[64631,64631],"mapped",[1579,1586]],[[64632,64632],"mapped",[1579,1605]],[[64633,64633],"mapped",[1579,1606]],[[64634,64634],"mapped",[1579,1609]],[[64635,64635],"mapped",[1579,1610]],[[64636,64636],"mapped",[1601,1609]],[[64637,64637],"mapped",[1601,1610]],[[64638,64638],"mapped",[1602,1609]],[[64639,64639],"mapped",[1602,1610]],[[64640,64640],"mapped",[1603,1575]],[[64641,64641],"mapped",[1603,1604]],[[64642,64642],"mapped",[1603,1605]],[[64643,64643],"mapped",[1603,1609]],[[64644,64644],"mapped",[1603,1610]],[[64645,64645],"mapped",[1604,1605]],[[64646,64646],"mapped",[1604,1609]],[[64647,64647],"mapped",[1604,1610]],[[64648,64648],"mapped",[1605,1575]],[[64649,64649],"mapped",[1605,1605]],[[64650,64650],"mapped",[1606,1585]],[[64651,64651],"mapped",[1606,1586]],[[64652,64652],"mapped",[1606,1605]],[[64653,64653],"mapped",[1606,1606]],[[64654,64654],"mapped",[1606,1609]],[[64655,64655],"mapped",[1606,1610]],[[64656,64656],"mapped",[1609,1648]],[[64657,64657],"mapped",[1610,1585]],[[64658,64658],"mapped",[1610,1586]],[[64659,64659],"mapped",[1610,1605]],[[64660,64660],"mapped",[1610,1606]],[[64661,64661],"mapped",[1610,1609]],[[64662,64662],"mapped",[1610,1610]],[[64663,64663],"mapped",[1574,1580]],[[64664,64664],"mapped",[1574,1581]],[[64665,64665],"mapped",[1574,1582]],[[64666,64666],"mapped",[1574,1605]],[[64667,64667],"mapped",[1574,1607]],[[64668,64668],"mapped",[1576,1580]],[[64669,64669],"mapped",[1576,1581]],[[64670,64670],"mapped",[1576,1582]],[[64671,64671],"mapped",[1576,1605]],[[64672,64672],"mapped",[1576,1607]],[[64673,64673],"mapped",[1578,1580]],[[64674,64674],"mapped",[1578,1581]],[[64675,64675],"mapped",[1578,1582]],[[64676,64676],"mapped",[1578,1605]],[[64677,64677],"mapped",[1578,1607]],[[64678,64678],"mapped",[1579,1605]],[[64679,64679],"mapped",[1580,1581]],[[64680,64680],"mapped",[1580,1605]],[[64681,64681],"mapped",[1581,1580]],[[64682,64682],"mapped",[1581,1605]],[[64683,64683],"mapped",[1582,1580]],[[64684,64684],"mapped",[1582,1605]],[[64685,64685],"mapped",[1587,1580]],[[64686,64686],"mapped",[1587,1581]],[[64687,64687],"mapped",[1587,1582]],[[64688,64688],"mapped",[1587,1605]],[[64689,64689],"mapped",[1589,1581]],[[64690,64690],"mapped",[1589,1582]],[[64691,64691],"mapped",[1589,1605]],[[64692,64692],"mapped",[1590,1580]],[[64693,64693],"mapped",[1590,1581]],[[64694,64694],"mapped",[1590,1582]],[[64695,64695],"mapped",[1590,1605]],[[64696,64696],"mapped",[1591,1581]],[[64697,64697],"mapped",[1592,1605]],[[64698,64698],"mapped",[1593,1580]],[[64699,64699],"mapped",[1593,1605]],[[64700,64700],"mapped",[1594,1580]],[[64701,64701],"mapped",[1594,1605]],[[64702,64702],"mapped",[1601,1580]],[[64703,64703],"mapped",[1601,1581]],[[64704,64704],"mapped",[1601,1582]],[[64705,64705],"mapped",[1601,1605]],[[64706,64706],"mapped",[1602,1581]],[[64707,64707],"mapped",[1602,1605]],[[64708,64708],"mapped",[1603,1580]],[[64709,64709],"mapped",[1603,1581]],[[64710,64710],"mapped",[1603,1582]],[[64711,64711],"mapped",[1603,1604]],[[64712,64712],"mapped",[1603,1605]],[[64713,64713],"mapped",[1604,1580]],[[64714,64714],"mapped",[1604,1581]],[[64715,64715],"mapped",[1604,1582]],[[64716,64716],"mapped",[1604,1605]],[[64717,64717],"mapped",[1604,1607]],[[64718,64718],"mapped",[1605,1580]],[[64719,64719],"mapped",[1605,1581]],[[64720,64720],"mapped",[1605,1582]],[[64721,64721],"mapped",[1605,1605]],[[64722,64722],"mapped",[1606,1580]],[[64723,64723],"mapped",[1606,1581]],[[64724,64724],"mapped",[1606,1582]],[[64725,64725],"mapped",[1606,1605]],[[64726,64726],"mapped",[1606,1607]],[[64727,64727],"mapped",[1607,1580]],[[64728,64728],"mapped",[1607,1605]],[[64729,64729],"mapped",[1607,1648]],[[64730,64730],"mapped",[1610,1580]],[[64731,64731],"mapped",[1610,1581]],[[64732,64732],"mapped",[1610,1582]],[[64733,64733],"mapped",[1610,1605]],[[64734,64734],"mapped",[1610,1607]],[[64735,64735],"mapped",[1574,1605]],[[64736,64736],"mapped",[1574,1607]],[[64737,64737],"mapped",[1576,1605]],[[64738,64738],"mapped",[1576,1607]],[[64739,64739],"mapped",[1578,1605]],[[64740,64740],"mapped",[1578,1607]],[[64741,64741],"mapped",[1579,1605]],[[64742,64742],"mapped",[1579,1607]],[[64743,64743],"mapped",[1587,1605]],[[64744,64744],"mapped",[1587,1607]],[[64745,64745],"mapped",[1588,1605]],[[64746,64746],"mapped",[1588,1607]],[[64747,64747],"mapped",[1603,1604]],[[64748,64748],"mapped",[1603,1605]],[[64749,64749],"mapped",[1604,1605]],[[64750,64750],"mapped",[1606,1605]],[[64751,64751],"mapped",[1606,1607]],[[64752,64752],"mapped",[1610,1605]],[[64753,64753],"mapped",[1610,1607]],[[64754,64754],"mapped",[1600,1614,1617]],[[64755,64755],"mapped",[1600,1615,1617]],[[64756,64756],"mapped",[1600,1616,1617]],[[64757,64757],"mapped",[1591,1609]],[[64758,64758],"mapped",[1591,1610]],[[64759,64759],"mapped",[1593,1609]],[[64760,64760],"mapped",[1593,1610]],[[64761,64761],"mapped",[1594,1609]],[[64762,64762],"mapped",[1594,1610]],[[64763,64763],"mapped",[1587,1609]],[[64764,64764],"mapped",[1587,1610]],[[64765,64765],"mapped",[1588,1609]],[[64766,64766],"mapped",[1588,1610]],[[64767,64767],"mapped",[1581,1609]],[[64768,64768],"mapped",[1581,1610]],[[64769,64769],"mapped",[1580,1609]],[[64770,64770],"mapped",[1580,1610]],[[64771,64771],"mapped",[1582,1609]],[[64772,64772],"mapped",[1582,1610]],[[64773,64773],"mapped",[1589,1609]],[[64774,64774],"mapped",[1589,1610]],[[64775,64775],"mapped",[1590,1609]],[[64776,64776],"mapped",[1590,1610]],[[64777,64777],"mapped",[1588,1580]],[[64778,64778],"mapped",[1588,1581]],[[64779,64779],"mapped",[1588,1582]],[[64780,64780],"mapped",[1588,1605]],[[64781,64781],"mapped",[1588,1585]],[[64782,64782],"mapped",[1587,1585]],[[64783,64783],"mapped",[1589,1585]],[[64784,64784],"mapped",[1590,1585]],[[64785,64785],"mapped",[1591,1609]],[[64786,64786],"mapped",[1591,1610]],[[64787,64787],"mapped",[1593,1609]],[[64788,64788],"mapped",[1593,1610]],[[64789,64789],"mapped",[1594,1609]],[[64790,64790],"mapped",[1594,1610]],[[64791,64791],"mapped",[1587,1609]],[[64792,64792],"mapped",[1587,1610]],[[64793,64793],"mapped",[1588,1609]],[[64794,64794],"mapped",[1588,1610]],[[64795,64795],"mapped",[1581,1609]],[[64796,64796],"mapped",[1581,1610]],[[64797,64797],"mapped",[1580,1609]],[[64798,64798],"mapped",[1580,1610]],[[64799,64799],"mapped",[1582,1609]],[[64800,64800],"mapped",[1582,1610]],[[64801,64801],"mapped",[1589,1609]],[[64802,64802],"mapped",[1589,1610]],[[64803,64803],"mapped",[1590,1609]],[[64804,64804],"mapped",[1590,1610]],[[64805,64805],"mapped",[1588,1580]],[[64806,64806],"mapped",[1588,1581]],[[64807,64807],"mapped",[1588,1582]],[[64808,64808],"mapped",[1588,1605]],[[64809,64809],"mapped",[1588,1585]],[[64810,64810],"mapped",[1587,1585]],[[64811,64811],"mapped",[1589,1585]],[[64812,64812],"mapped",[1590,1585]],[[64813,64813],"mapped",[1588,1580]],[[64814,64814],"mapped",[1588,1581]],[[64815,64815],"mapped",[1588,1582]],[[64816,64816],"mapped",[1588,1605]],[[64817,64817],"mapped",[1587,1607]],[[64818,64818],"mapped",[1588,1607]],[[64819,64819],"mapped",[1591,1605]],[[64820,64820],"mapped",[1587,1580]],[[64821,64821],"mapped",[1587,1581]],[[64822,64822],"mapped",[1587,1582]],[[64823,64823],"mapped",[1588,1580]],[[64824,64824],"mapped",[1588,1581]],[[64825,64825],"mapped",[1588,1582]],[[64826,64826],"mapped",[1591,1605]],[[64827,64827],"mapped",[1592,1605]],[[64828,64829],"mapped",[1575,1611]],[[64830,64831],"valid",[],"NV8"],[[64832,64847],"disallowed"],[[64848,64848],"mapped",[1578,1580,1605]],[[64849,64850],"mapped",[1578,1581,1580]],[[64851,64851],"mapped",[1578,1581,1605]],[[64852,64852],"mapped",[1578,1582,1605]],[[64853,64853],"mapped",[1578,1605,1580]],[[64854,64854],"mapped",[1578,1605,1581]],[[64855,64855],"mapped",[1578,1605,1582]],[[64856,64857],"mapped",[1580,1605,1581]],[[64858,64858],"mapped",[1581,1605,1610]],[[64859,64859],"mapped",[1581,1605,1609]],[[64860,64860],"mapped",[1587,1581,1580]],[[64861,64861],"mapped",[1587,1580,1581]],[[64862,64862],"mapped",[1587,1580,1609]],[[64863,64864],"mapped",[1587,1605,1581]],[[64865,64865],"mapped",[1587,1605,1580]],[[64866,64867],"mapped",[1587,1605,1605]],[[64868,64869],"mapped",[1589,1581,1581]],[[64870,64870],"mapped",[1589,1605,1605]],[[64871,64872],"mapped",[1588,1581,1605]],[[64873,64873],"mapped",[1588,1580,1610]],[[64874,64875],"mapped",[1588,1605,1582]],[[64876,64877],"mapped",[1588,1605,1605]],[[64878,64878],"mapped",[1590,1581,1609]],[[64879,64880],"mapped",[1590,1582,1605]],[[64881,64882],"mapped",[1591,1605,1581]],[[64883,64883],"mapped",[1591,1605,1605]],[[64884,64884],"mapped",[1591,1605,1610]],[[64885,64885],"mapped",[1593,1580,1605]],[[64886,64887],"mapped",[1593,1605,1605]],[[64888,64888],"mapped",[1593,1605,1609]],[[64889,64889],"mapped",[1594,1605,1605]],[[64890,64890],"mapped",[1594,1605,1610]],[[64891,64891],"mapped",[1594,1605,1609]],[[64892,64893],"mapped",[1601,1582,1605]],[[64894,64894],"mapped",[1602,1605,1581]],[[64895,64895],"mapped",[1602,1605,1605]],[[64896,64896],"mapped",[1604,1581,1605]],[[64897,64897],"mapped",[1604,1581,1610]],[[64898,64898],"mapped",[1604,1581,1609]],[[64899,64900],"mapped",[1604,1580,1580]],[[64901,64902],"mapped",[1604,1582,1605]],[[64903,64904],"mapped",[1604,1605,1581]],[[64905,64905],"mapped",[1605,1581,1580]],[[64906,64906],"mapped",[1605,1581,1605]],[[64907,64907],"mapped",[1605,1581,1610]],[[64908,64908],"mapped",[1605,1580,1581]],[[64909,64909],"mapped",[1605,1580,1605]],[[64910,64910],"mapped",[1605,1582,1580]],[[64911,64911],"mapped",[1605,1582,1605]],[[64912,64913],"disallowed"],[[64914,64914],"mapped",[1605,1580,1582]],[[64915,64915],"mapped",[1607,1605,1580]],[[64916,64916],"mapped",[1607,1605,1605]],[[64917,64917],"mapped",[1606,1581,1605]],[[64918,64918],"mapped",[1606,1581,1609]],[[64919,64920],"mapped",[1606,1580,1605]],[[64921,64921],"mapped",[1606,1580,1609]],[[64922,64922],"mapped",[1606,1605,1610]],[[64923,64923],"mapped",[1606,1605,1609]],[[64924,64925],"mapped",[1610,1605,1605]],[[64926,64926],"mapped",[1576,1582,1610]],[[64927,64927],"mapped",[1578,1580,1610]],[[64928,64928],"mapped",[1578,1580,1609]],[[64929,64929],"mapped",[1578,1582,1610]],[[64930,64930],"mapped",[1578,1582,1609]],[[64931,64931],"mapped",[1578,1605,1610]],[[64932,64932],"mapped",[1578,1605,1609]],[[64933,64933],"mapped",[1580,1605,1610]],[[64934,64934],"mapped",[1580,1581,1609]],[[64935,64935],"mapped",[1580,1605,1609]],[[64936,64936],"mapped",[1587,1582,1609]],[[64937,64937],"mapped",[1589,1581,1610]],[[64938,64938],"mapped",[1588,1581,1610]],[[64939,64939],"mapped",[1590,1581,1610]],[[64940,64940],"mapped",[1604,1580,1610]],[[64941,64941],"mapped",[1604,1605,1610]],[[64942,64942],"mapped",[1610,1581,1610]],[[64943,64943],"mapped",[1610,1580,1610]],[[64944,64944],"mapped",[1610,1605,1610]],[[64945,64945],"mapped",[1605,1605,1610]],[[64946,64946],"mapped",[1602,1605,1610]],[[64947,64947],"mapped",[1606,1581,1610]],[[64948,64948],"mapped",[1602,1605,1581]],[[64949,64949],"mapped",[1604,1581,1605]],[[64950,64950],"mapped",[1593,1605,1610]],[[64951,64951],"mapped",[1603,1605,1610]],[[64952,64952],"mapped",[1606,1580,1581]],[[64953,64953],"mapped",[1605,1582,1610]],[[64954,64954],"mapped",[1604,1580,1605]],[[64955,64955],"mapped",[1603,1605,1605]],[[64956,64956],"mapped",[1604,1580,1605]],[[64957,64957],"mapped",[1606,1580,1581]],[[64958,64958],"mapped",[1580,1581,1610]],[[64959,64959],"mapped",[1581,1580,1610]],[[64960,64960],"mapped",[1605,1580,1610]],[[64961,64961],"mapped",[1601,1605,1610]],[[64962,64962],"mapped",[1576,1581,1610]],[[64963,64963],"mapped",[1603,1605,1605]],[[64964,64964],"mapped",[1593,1580,1605]],[[64965,64965],"mapped",[1589,1605,1605]],[[64966,64966],"mapped",[1587,1582,1610]],[[64967,64967],"mapped",[1606,1580,1610]],[[64968,64975],"disallowed"],[[64976,65007],"disallowed"],[[65008,65008],"mapped",[1589,1604,1746]],[[65009,65009],"mapped",[1602,1604,1746]],[[65010,65010],"mapped",[1575,1604,1604,1607]],[[65011,65011],"mapped",[1575,1603,1576,1585]],[[65012,65012],"mapped",[1605,1581,1605,1583]],[[65013,65013],"mapped",[1589,1604,1593,1605]],[[65014,65014],"mapped",[1585,1587,1608,1604]],[[65015,65015],"mapped",[1593,1604,1610,1607]],[[65016,65016],"mapped",[1608,1587,1604,1605]],[[65017,65017],"mapped",[1589,1604,1609]],[[65018,65018],"disallowed_STD3_mapped",[1589,1604,1609,32,1575,1604,1604,1607,32,1593,1604,1610,1607,32,1608,1587,1604,1605]],[[65019,65019],"disallowed_STD3_mapped",[1580,1604,32,1580,1604,1575,1604,1607]],[[65020,65020],"mapped",[1585,1740,1575,1604]],[[65021,65021],"valid",[],"NV8"],[[65022,65023],"disallowed"],[[65024,65039],"ignored"],[[65040,65040],"disallowed_STD3_mapped",[44]],[[65041,65041],"mapped",[12289]],[[65042,65042],"disallowed"],[[65043,65043],"disallowed_STD3_mapped",[58]],[[65044,65044],"disallowed_STD3_mapped",[59]],[[65045,65045],"disallowed_STD3_mapped",[33]],[[65046,65046],"disallowed_STD3_mapped",[63]],[[65047,65047],"mapped",[12310]],[[65048,65048],"mapped",[12311]],[[65049,65049],"disallowed"],[[65050,65055],"disallowed"],[[65056,65059],"valid"],[[65060,65062],"valid"],[[65063,65069],"valid"],[[65070,65071],"valid"],[[65072,65072],"disallowed"],[[65073,65073],"mapped",[8212]],[[65074,65074],"mapped",[8211]],[[65075,65076],"disallowed_STD3_mapped",[95]],[[65077,65077],"disallowed_STD3_mapped",[40]],[[65078,65078],"disallowed_STD3_mapped",[41]],[[65079,65079],"disallowed_STD3_mapped",[123]],[[65080,65080],"disallowed_STD3_mapped",[125]],[[65081,65081],"mapped",[12308]],[[65082,65082],"mapped",[12309]],[[65083,65083],"mapped",[12304]],[[65084,65084],"mapped",[12305]],[[65085,65085],"mapped",[12298]],[[65086,65086],"mapped",[12299]],[[65087,65087],"mapped",[12296]],[[65088,65088],"mapped",[12297]],[[65089,65089],"mapped",[12300]],[[65090,65090],"mapped",[12301]],[[65091,65091],"mapped",[12302]],[[65092,65092],"mapped",[12303]],[[65093,65094],"valid",[],"NV8"],[[65095,65095],"disallowed_STD3_mapped",[91]],[[65096,65096],"disallowed_STD3_mapped",[93]],[[65097,65100],"disallowed_STD3_mapped",[32,773]],[[65101,65103],"disallowed_STD3_mapped",[95]],[[65104,65104],"disallowed_STD3_mapped",[44]],[[65105,65105],"mapped",[12289]],[[65106,65106],"disallowed"],[[65107,65107],"disallowed"],[[65108,65108],"disallowed_STD3_mapped",[59]],[[65109,65109],"disallowed_STD3_mapped",[58]],[[65110,65110],"disallowed_STD3_mapped",[63]],[[65111,65111],"disallowed_STD3_mapped",[33]],[[65112,65112],"mapped",[8212]],[[65113,65113],"disallowed_STD3_mapped",[40]],[[65114,65114],"disallowed_STD3_mapped",[41]],[[65115,65115],"disallowed_STD3_mapped",[123]],[[65116,65116],"disallowed_STD3_mapped",[125]],[[65117,65117],"mapped",[12308]],[[65118,65118],"mapped",[12309]],[[65119,65119],"disallowed_STD3_mapped",[35]],[[65120,65120],"disallowed_STD3_mapped",[38]],[[65121,65121],"disallowed_STD3_mapped",[42]],[[65122,65122],"disallowed_STD3_mapped",[43]],[[65123,65123],"mapped",[45]],[[65124,65124],"disallowed_STD3_mapped",[60]],[[65125,65125],"disallowed_STD3_mapped",[62]],[[65126,65126],"disallowed_STD3_mapped",[61]],[[65127,65127],"disallowed"],[[65128,65128],"disallowed_STD3_mapped",[92]],[[65129,65129],"disallowed_STD3_mapped",[36]],[[65130,65130],"disallowed_STD3_mapped",[37]],[[65131,65131],"disallowed_STD3_mapped",[64]],[[65132,65135],"disallowed"],[[65136,65136],"disallowed_STD3_mapped",[32,1611]],[[65137,65137],"mapped",[1600,1611]],[[65138,65138],"disallowed_STD3_mapped",[32,1612]],[[65139,65139],"valid"],[[65140,65140],"disallowed_STD3_mapped",[32,1613]],[[65141,65141],"disallowed"],[[65142,65142],"disallowed_STD3_mapped",[32,1614]],[[65143,65143],"mapped",[1600,1614]],[[65144,65144],"disallowed_STD3_mapped",[32,1615]],[[65145,65145],"mapped",[1600,1615]],[[65146,65146],"disallowed_STD3_mapped",[32,1616]],[[65147,65147],"mapped",[1600,1616]],[[65148,65148],"disallowed_STD3_mapped",[32,1617]],[[65149,65149],"mapped",[1600,1617]],[[65150,65150],"disallowed_STD3_mapped",[32,1618]],[[65151,65151],"mapped",[1600,1618]],[[65152,65152],"mapped",[1569]],[[65153,65154],"mapped",[1570]],[[65155,65156],"mapped",[1571]],[[65157,65158],"mapped",[1572]],[[65159,65160],"mapped",[1573]],[[65161,65164],"mapped",[1574]],[[65165,65166],"mapped",[1575]],[[65167,65170],"mapped",[1576]],[[65171,65172],"mapped",[1577]],[[65173,65176],"mapped",[1578]],[[65177,65180],"mapped",[1579]],[[65181,65184],"mapped",[1580]],[[65185,65188],"mapped",[1581]],[[65189,65192],"mapped",[1582]],[[65193,65194],"mapped",[1583]],[[65195,65196],"mapped",[1584]],[[65197,65198],"mapped",[1585]],[[65199,65200],"mapped",[1586]],[[65201,65204],"mapped",[1587]],[[65205,65208],"mapped",[1588]],[[65209,65212],"mapped",[1589]],[[65213,65216],"mapped",[1590]],[[65217,65220],"mapped",[1591]],[[65221,65224],"mapped",[1592]],[[65225,65228],"mapped",[1593]],[[65229,65232],"mapped",[1594]],[[65233,65236],"mapped",[1601]],[[65237,65240],"mapped",[1602]],[[65241,65244],"mapped",[1603]],[[65245,65248],"mapped",[1604]],[[65249,65252],"mapped",[1605]],[[65253,65256],"mapped",[1606]],[[65257,65260],"mapped",[1607]],[[65261,65262],"mapped",[1608]],[[65263,65264],"mapped",[1609]],[[65265,65268],"mapped",[1610]],[[65269,65270],"mapped",[1604,1570]],[[65271,65272],"mapped",[1604,1571]],[[65273,65274],"mapped",[1604,1573]],[[65275,65276],"mapped",[1604,1575]],[[65277,65278],"disallowed"],[[65279,65279],"ignored"],[[65280,65280],"disallowed"],[[65281,65281],"disallowed_STD3_mapped",[33]],[[65282,65282],"disallowed_STD3_mapped",[34]],[[65283,65283],"disallowed_STD3_mapped",[35]],[[65284,65284],"disallowed_STD3_mapped",[36]],[[65285,65285],"disallowed_STD3_mapped",[37]],[[65286,65286],"disallowed_STD3_mapped",[38]],[[65287,65287],"disallowed_STD3_mapped",[39]],[[65288,65288],"disallowed_STD3_mapped",[40]],[[65289,65289],"disallowed_STD3_mapped",[41]],[[65290,65290],"disallowed_STD3_mapped",[42]],[[65291,65291],"disallowed_STD3_mapped",[43]],[[65292,65292],"disallowed_STD3_mapped",[44]],[[65293,65293],"mapped",[45]],[[65294,65294],"mapped",[46]],[[65295,65295],"disallowed_STD3_mapped",[47]],[[65296,65296],"mapped",[48]],[[65297,65297],"mapped",[49]],[[65298,65298],"mapped",[50]],[[65299,65299],"mapped",[51]],[[65300,65300],"mapped",[52]],[[65301,65301],"mapped",[53]],[[65302,65302],"mapped",[54]],[[65303,65303],"mapped",[55]],[[65304,65304],"mapped",[56]],[[65305,65305],"mapped",[57]],[[65306,65306],"disallowed_STD3_mapped",[58]],[[65307,65307],"disallowed_STD3_mapped",[59]],[[65308,65308],"disallowed_STD3_mapped",[60]],[[65309,65309],"disallowed_STD3_mapped",[61]],[[65310,65310],"disallowed_STD3_mapped",[62]],[[65311,65311],"disallowed_STD3_mapped",[63]],[[65312,65312],"disallowed_STD3_mapped",[64]],[[65313,65313],"mapped",[97]],[[65314,65314],"mapped",[98]],[[65315,65315],"mapped",[99]],[[65316,65316],"mapped",[100]],[[65317,65317],"mapped",[101]],[[65318,65318],"mapped",[102]],[[65319,65319],"mapped",[103]],[[65320,65320],"mapped",[104]],[[65321,65321],"mapped",[105]],[[65322,65322],"mapped",[106]],[[65323,65323],"mapped",[107]],[[65324,65324],"mapped",[108]],[[65325,65325],"mapped",[109]],[[65326,65326],"mapped",[110]],[[65327,65327],"mapped",[111]],[[65328,65328],"mapped",[112]],[[65329,65329],"mapped",[113]],[[65330,65330],"mapped",[114]],[[65331,65331],"mapped",[115]],[[65332,65332],"mapped",[116]],[[65333,65333],"mapped",[117]],[[65334,65334],"mapped",[118]],[[65335,65335],"mapped",[119]],[[65336,65336],"mapped",[120]],[[65337,65337],"mapped",[121]],[[65338,65338],"mapped",[122]],[[65339,65339],"disallowed_STD3_mapped",[91]],[[65340,65340],"disallowed_STD3_mapped",[92]],[[65341,65341],"disallowed_STD3_mapped",[93]],[[65342,65342],"disallowed_STD3_mapped",[94]],[[65343,65343],"disallowed_STD3_mapped",[95]],[[65344,65344],"disallowed_STD3_mapped",[96]],[[65345,65345],"mapped",[97]],[[65346,65346],"mapped",[98]],[[65347,65347],"mapped",[99]],[[65348,65348],"mapped",[100]],[[65349,65349],"mapped",[101]],[[65350,65350],"mapped",[102]],[[65351,65351],"mapped",[103]],[[65352,65352],"mapped",[104]],[[65353,65353],"mapped",[105]],[[65354,65354],"mapped",[106]],[[65355,65355],"mapped",[107]],[[65356,65356],"mapped",[108]],[[65357,65357],"mapped",[109]],[[65358,65358],"mapped",[110]],[[65359,65359],"mapped",[111]],[[65360,65360],"mapped",[112]],[[65361,65361],"mapped",[113]],[[65362,65362],"mapped",[114]],[[65363,65363],"mapped",[115]],[[65364,65364],"mapped",[116]],[[65365,65365],"mapped",[117]],[[65366,65366],"mapped",[118]],[[65367,65367],"mapped",[119]],[[65368,65368],"mapped",[120]],[[65369,65369],"mapped",[121]],[[65370,65370],"mapped",[122]],[[65371,65371],"disallowed_STD3_mapped",[123]],[[65372,65372],"disallowed_STD3_mapped",[124]],[[65373,65373],"disallowed_STD3_mapped",[125]],[[65374,65374],"disallowed_STD3_mapped",[126]],[[65375,65375],"mapped",[10629]],[[65376,65376],"mapped",[10630]],[[65377,65377],"mapped",[46]],[[65378,65378],"mapped",[12300]],[[65379,65379],"mapped",[12301]],[[65380,65380],"mapped",[12289]],[[65381,65381],"mapped",[12539]],[[65382,65382],"mapped",[12530]],[[65383,65383],"mapped",[12449]],[[65384,65384],"mapped",[12451]],[[65385,65385],"mapped",[12453]],[[65386,65386],"mapped",[12455]],[[65387,65387],"mapped",[12457]],[[65388,65388],"mapped",[12515]],[[65389,65389],"mapped",[12517]],[[65390,65390],"mapped",[12519]],[[65391,65391],"mapped",[12483]],[[65392,65392],"mapped",[12540]],[[65393,65393],"mapped",[12450]],[[65394,65394],"mapped",[12452]],[[65395,65395],"mapped",[12454]],[[65396,65396],"mapped",[12456]],[[65397,65397],"mapped",[12458]],[[65398,65398],"mapped",[12459]],[[65399,65399],"mapped",[12461]],[[65400,65400],"mapped",[12463]],[[65401,65401],"mapped",[12465]],[[65402,65402],"mapped",[12467]],[[65403,65403],"mapped",[12469]],[[65404,65404],"mapped",[12471]],[[65405,65405],"mapped",[12473]],[[65406,65406],"mapped",[12475]],[[65407,65407],"mapped",[12477]],[[65408,65408],"mapped",[12479]],[[65409,65409],"mapped",[12481]],[[65410,65410],"mapped",[12484]],[[65411,65411],"mapped",[12486]],[[65412,65412],"mapped",[12488]],[[65413,65413],"mapped",[12490]],[[65414,65414],"mapped",[12491]],[[65415,65415],"mapped",[12492]],[[65416,65416],"mapped",[12493]],[[65417,65417],"mapped",[12494]],[[65418,65418],"mapped",[12495]],[[65419,65419],"mapped",[12498]],[[65420,65420],"mapped",[12501]],[[65421,65421],"mapped",[12504]],[[65422,65422],"mapped",[12507]],[[65423,65423],"mapped",[12510]],[[65424,65424],"mapped",[12511]],[[65425,65425],"mapped",[12512]],[[65426,65426],"mapped",[12513]],[[65427,65427],"mapped",[12514]],[[65428,65428],"mapped",[12516]],[[65429,65429],"mapped",[12518]],[[65430,65430],"mapped",[12520]],[[65431,65431],"mapped",[12521]],[[65432,65432],"mapped",[12522]],[[65433,65433],"mapped",[12523]],[[65434,65434],"mapped",[12524]],[[65435,65435],"mapped",[12525]],[[65436,65436],"mapped",[12527]],[[65437,65437],"mapped",[12531]],[[65438,65438],"mapped",[12441]],[[65439,65439],"mapped",[12442]],[[65440,65440],"disallowed"],[[65441,65441],"mapped",[4352]],[[65442,65442],"mapped",[4353]],[[65443,65443],"mapped",[4522]],[[65444,65444],"mapped",[4354]],[[65445,65445],"mapped",[4524]],[[65446,65446],"mapped",[4525]],[[65447,65447],"mapped",[4355]],[[65448,65448],"mapped",[4356]],[[65449,65449],"mapped",[4357]],[[65450,65450],"mapped",[4528]],[[65451,65451],"mapped",[4529]],[[65452,65452],"mapped",[4530]],[[65453,65453],"mapped",[4531]],[[65454,65454],"mapped",[4532]],[[65455,65455],"mapped",[4533]],[[65456,65456],"mapped",[4378]],[[65457,65457],"mapped",[4358]],[[65458,65458],"mapped",[4359]],[[65459,65459],"mapped",[4360]],[[65460,65460],"mapped",[4385]],[[65461,65461],"mapped",[4361]],[[65462,65462],"mapped",[4362]],[[65463,65463],"mapped",[4363]],[[65464,65464],"mapped",[4364]],[[65465,65465],"mapped",[4365]],[[65466,65466],"mapped",[4366]],[[65467,65467],"mapped",[4367]],[[65468,65468],"mapped",[4368]],[[65469,65469],"mapped",[4369]],[[65470,65470],"mapped",[4370]],[[65471,65473],"disallowed"],[[65474,65474],"mapped",[4449]],[[65475,65475],"mapped",[4450]],[[65476,65476],"mapped",[4451]],[[65477,65477],"mapped",[4452]],[[65478,65478],"mapped",[4453]],[[65479,65479],"mapped",[4454]],[[65480,65481],"disallowed"],[[65482,65482],"mapped",[4455]],[[65483,65483],"mapped",[4456]],[[65484,65484],"mapped",[4457]],[[65485,65485],"mapped",[4458]],[[65486,65486],"mapped",[4459]],[[65487,65487],"mapped",[4460]],[[65488,65489],"disallowed"],[[65490,65490],"mapped",[4461]],[[65491,65491],"mapped",[4462]],[[65492,65492],"mapped",[4463]],[[65493,65493],"mapped",[4464]],[[65494,65494],"mapped",[4465]],[[65495,65495],"mapped",[4466]],[[65496,65497],"disallowed"],[[65498,65498],"mapped",[4467]],[[65499,65499],"mapped",[4468]],[[65500,65500],"mapped",[4469]],[[65501,65503],"disallowed"],[[65504,65504],"mapped",[162]],[[65505,65505],"mapped",[163]],[[65506,65506],"mapped",[172]],[[65507,65507],"disallowed_STD3_mapped",[32,772]],[[65508,65508],"mapped",[166]],[[65509,65509],"mapped",[165]],[[65510,65510],"mapped",[8361]],[[65511,65511],"disallowed"],[[65512,65512],"mapped",[9474]],[[65513,65513],"mapped",[8592]],[[65514,65514],"mapped",[8593]],[[65515,65515],"mapped",[8594]],[[65516,65516],"mapped",[8595]],[[65517,65517],"mapped",[9632]],[[65518,65518],"mapped",[9675]],[[65519,65528],"disallowed"],[[65529,65531],"disallowed"],[[65532,65532],"disallowed"],[[65533,65533],"disallowed"],[[65534,65535],"disallowed"],[[65536,65547],"valid"],[[65548,65548],"disallowed"],[[65549,65574],"valid"],[[65575,65575],"disallowed"],[[65576,65594],"valid"],[[65595,65595],"disallowed"],[[65596,65597],"valid"],[[65598,65598],"disallowed"],[[65599,65613],"valid"],[[65614,65615],"disallowed"],[[65616,65629],"valid"],[[65630,65663],"disallowed"],[[65664,65786],"valid"],[[65787,65791],"disallowed"],[[65792,65794],"valid",[],"NV8"],[[65795,65798],"disallowed"],[[65799,65843],"valid",[],"NV8"],[[65844,65846],"disallowed"],[[65847,65855],"valid",[],"NV8"],[[65856,65930],"valid",[],"NV8"],[[65931,65932],"valid",[],"NV8"],[[65933,65935],"disallowed"],[[65936,65947],"valid",[],"NV8"],[[65948,65951],"disallowed"],[[65952,65952],"valid",[],"NV8"],[[65953,65999],"disallowed"],[[66000,66044],"valid",[],"NV8"],[[66045,66045],"valid"],[[66046,66175],"disallowed"],[[66176,66204],"valid"],[[66205,66207],"disallowed"],[[66208,66256],"valid"],[[66257,66271],"disallowed"],[[66272,66272],"valid"],[[66273,66299],"valid",[],"NV8"],[[66300,66303],"disallowed"],[[66304,66334],"valid"],[[66335,66335],"valid"],[[66336,66339],"valid",[],"NV8"],[[66340,66351],"disallowed"],[[66352,66368],"valid"],[[66369,66369],"valid",[],"NV8"],[[66370,66377],"valid"],[[66378,66378],"valid",[],"NV8"],[[66379,66383],"disallowed"],[[66384,66426],"valid"],[[66427,66431],"disallowed"],[[66432,66461],"valid"],[[66462,66462],"disallowed"],[[66463,66463],"valid",[],"NV8"],[[66464,66499],"valid"],[[66500,66503],"disallowed"],[[66504,66511],"valid"],[[66512,66517],"valid",[],"NV8"],[[66518,66559],"disallowed"],[[66560,66560],"mapped",[66600]],[[66561,66561],"mapped",[66601]],[[66562,66562],"mapped",[66602]],[[66563,66563],"mapped",[66603]],[[66564,66564],"mapped",[66604]],[[66565,66565],"mapped",[66605]],[[66566,66566],"mapped",[66606]],[[66567,66567],"mapped",[66607]],[[66568,66568],"mapped",[66608]],[[66569,66569],"mapped",[66609]],[[66570,66570],"mapped",[66610]],[[66571,66571],"mapped",[66611]],[[66572,66572],"mapped",[66612]],[[66573,66573],"mapped",[66613]],[[66574,66574],"mapped",[66614]],[[66575,66575],"mapped",[66615]],[[66576,66576],"mapped",[66616]],[[66577,66577],"mapped",[66617]],[[66578,66578],"mapped",[66618]],[[66579,66579],"mapped",[66619]],[[66580,66580],"mapped",[66620]],[[66581,66581],"mapped",[66621]],[[66582,66582],"mapped",[66622]],[[66583,66583],"mapped",[66623]],[[66584,66584],"mapped",[66624]],[[66585,66585],"mapped",[66625]],[[66586,66586],"mapped",[66626]],[[66587,66587],"mapped",[66627]],[[66588,66588],"mapped",[66628]],[[66589,66589],"mapped",[66629]],[[66590,66590],"mapped",[66630]],[[66591,66591],"mapped",[66631]],[[66592,66592],"mapped",[66632]],[[66593,66593],"mapped",[66633]],[[66594,66594],"mapped",[66634]],[[66595,66595],"mapped",[66635]],[[66596,66596],"mapped",[66636]],[[66597,66597],"mapped",[66637]],[[66598,66598],"mapped",[66638]],[[66599,66599],"mapped",[66639]],[[66600,66637],"valid"],[[66638,66717],"valid"],[[66718,66719],"disallowed"],[[66720,66729],"valid"],[[66730,66815],"disallowed"],[[66816,66855],"valid"],[[66856,66863],"disallowed"],[[66864,66915],"valid"],[[66916,66926],"disallowed"],[[66927,66927],"valid",[],"NV8"],[[66928,67071],"disallowed"],[[67072,67382],"valid"],[[67383,67391],"disallowed"],[[67392,67413],"valid"],[[67414,67423],"disallowed"],[[67424,67431],"valid"],[[67432,67583],"disallowed"],[[67584,67589],"valid"],[[67590,67591],"disallowed"],[[67592,67592],"valid"],[[67593,67593],"disallowed"],[[67594,67637],"valid"],[[67638,67638],"disallowed"],[[67639,67640],"valid"],[[67641,67643],"disallowed"],[[67644,67644],"valid"],[[67645,67646],"disallowed"],[[67647,67647],"valid"],[[67648,67669],"valid"],[[67670,67670],"disallowed"],[[67671,67679],"valid",[],"NV8"],[[67680,67702],"valid"],[[67703,67711],"valid",[],"NV8"],[[67712,67742],"valid"],[[67743,67750],"disallowed"],[[67751,67759],"valid",[],"NV8"],[[67760,67807],"disallowed"],[[67808,67826],"valid"],[[67827,67827],"disallowed"],[[67828,67829],"valid"],[[67830,67834],"disallowed"],[[67835,67839],"valid",[],"NV8"],[[67840,67861],"valid"],[[67862,67865],"valid",[],"NV8"],[[67866,67867],"valid",[],"NV8"],[[67868,67870],"disallowed"],[[67871,67871],"valid",[],"NV8"],[[67872,67897],"valid"],[[67898,67902],"disallowed"],[[67903,67903],"valid",[],"NV8"],[[67904,67967],"disallowed"],[[67968,68023],"valid"],[[68024,68027],"disallowed"],[[68028,68029],"valid",[],"NV8"],[[68030,68031],"valid"],[[68032,68047],"valid",[],"NV8"],[[68048,68049],"disallowed"],[[68050,68095],"valid",[],"NV8"],[[68096,68099],"valid"],[[68100,68100],"disallowed"],[[68101,68102],"valid"],[[68103,68107],"disallowed"],[[68108,68115],"valid"],[[68116,68116],"disallowed"],[[68117,68119],"valid"],[[68120,68120],"disallowed"],[[68121,68147],"valid"],[[68148,68151],"disallowed"],[[68152,68154],"valid"],[[68155,68158],"disallowed"],[[68159,68159],"valid"],[[68160,68167],"valid",[],"NV8"],[[68168,68175],"disallowed"],[[68176,68184],"valid",[],"NV8"],[[68185,68191],"disallowed"],[[68192,68220],"valid"],[[68221,68223],"valid",[],"NV8"],[[68224,68252],"valid"],[[68253,68255],"valid",[],"NV8"],[[68256,68287],"disallowed"],[[68288,68295],"valid"],[[68296,68296],"valid",[],"NV8"],[[68297,68326],"valid"],[[68327,68330],"disallowed"],[[68331,68342],"valid",[],"NV8"],[[68343,68351],"disallowed"],[[68352,68405],"valid"],[[68406,68408],"disallowed"],[[68409,68415],"valid",[],"NV8"],[[68416,68437],"valid"],[[68438,68439],"disallowed"],[[68440,68447],"valid",[],"NV8"],[[68448,68466],"valid"],[[68467,68471],"disallowed"],[[68472,68479],"valid",[],"NV8"],[[68480,68497],"valid"],[[68498,68504],"disallowed"],[[68505,68508],"valid",[],"NV8"],[[68509,68520],"disallowed"],[[68521,68527],"valid",[],"NV8"],[[68528,68607],"disallowed"],[[68608,68680],"valid"],[[68681,68735],"disallowed"],[[68736,68736],"mapped",[68800]],[[68737,68737],"mapped",[68801]],[[68738,68738],"mapped",[68802]],[[68739,68739],"mapped",[68803]],[[68740,68740],"mapped",[68804]],[[68741,68741],"mapped",[68805]],[[68742,68742],"mapped",[68806]],[[68743,68743],"mapped",[68807]],[[68744,68744],"mapped",[68808]],[[68745,68745],"mapped",[68809]],[[68746,68746],"mapped",[68810]],[[68747,68747],"mapped",[68811]],[[68748,68748],"mapped",[68812]],[[68749,68749],"mapped",[68813]],[[68750,68750],"mapped",[68814]],[[68751,68751],"mapped",[68815]],[[68752,68752],"mapped",[68816]],[[68753,68753],"mapped",[68817]],[[68754,68754],"mapped",[68818]],[[68755,68755],"mapped",[68819]],[[68756,68756],"mapped",[68820]],[[68757,68757],"mapped",[68821]],[[68758,68758],"mapped",[68822]],[[68759,68759],"mapped",[68823]],[[68760,68760],"mapped",[68824]],[[68761,68761],"mapped",[68825]],[[68762,68762],"mapped",[68826]],[[68763,68763],"mapped",[68827]],[[68764,68764],"mapped",[68828]],[[68765,68765],"mapped",[68829]],[[68766,68766],"mapped",[68830]],[[68767,68767],"mapped",[68831]],[[68768,68768],"mapped",[68832]],[[68769,68769],"mapped",[68833]],[[68770,68770],"mapped",[68834]],[[68771,68771],"mapped",[68835]],[[68772,68772],"mapped",[68836]],[[68773,68773],"mapped",[68837]],[[68774,68774],"mapped",[68838]],[[68775,68775],"mapped",[68839]],[[68776,68776],"mapped",[68840]],[[68777,68777],"mapped",[68841]],[[68778,68778],"mapped",[68842]],[[68779,68779],"mapped",[68843]],[[68780,68780],"mapped",[68844]],[[68781,68781],"mapped",[68845]],[[68782,68782],"mapped",[68846]],[[68783,68783],"mapped",[68847]],[[68784,68784],"mapped",[68848]],[[68785,68785],"mapped",[68849]],[[68786,68786],"mapped",[68850]],[[68787,68799],"disallowed"],[[68800,68850],"valid"],[[68851,68857],"disallowed"],[[68858,68863],"valid",[],"NV8"],[[68864,69215],"disallowed"],[[69216,69246],"valid",[],"NV8"],[[69247,69631],"disallowed"],[[69632,69702],"valid"],[[69703,69709],"valid",[],"NV8"],[[69710,69713],"disallowed"],[[69714,69733],"valid",[],"NV8"],[[69734,69743],"valid"],[[69744,69758],"disallowed"],[[69759,69759],"valid"],[[69760,69818],"valid"],[[69819,69820],"valid",[],"NV8"],[[69821,69821],"disallowed"],[[69822,69825],"valid",[],"NV8"],[[69826,69839],"disallowed"],[[69840,69864],"valid"],[[69865,69871],"disallowed"],[[69872,69881],"valid"],[[69882,69887],"disallowed"],[[69888,69940],"valid"],[[69941,69941],"disallowed"],[[69942,69951],"valid"],[[69952,69955],"valid",[],"NV8"],[[69956,69967],"disallowed"],[[69968,70003],"valid"],[[70004,70005],"valid",[],"NV8"],[[70006,70006],"valid"],[[70007,70015],"disallowed"],[[70016,70084],"valid"],[[70085,70088],"valid",[],"NV8"],[[70089,70089],"valid",[],"NV8"],[[70090,70092],"valid"],[[70093,70093],"valid",[],"NV8"],[[70094,70095],"disallowed"],[[70096,70105],"valid"],[[70106,70106],"valid"],[[70107,70107],"valid",[],"NV8"],[[70108,70108],"valid"],[[70109,70111],"valid",[],"NV8"],[[70112,70112],"disallowed"],[[70113,70132],"valid",[],"NV8"],[[70133,70143],"disallowed"],[[70144,70161],"valid"],[[70162,70162],"disallowed"],[[70163,70199],"valid"],[[70200,70205],"valid",[],"NV8"],[[70206,70271],"disallowed"],[[70272,70278],"valid"],[[70279,70279],"disallowed"],[[70280,70280],"valid"],[[70281,70281],"disallowed"],[[70282,70285],"valid"],[[70286,70286],"disallowed"],[[70287,70301],"valid"],[[70302,70302],"disallowed"],[[70303,70312],"valid"],[[70313,70313],"valid",[],"NV8"],[[70314,70319],"disallowed"],[[70320,70378],"valid"],[[70379,70383],"disallowed"],[[70384,70393],"valid"],[[70394,70399],"disallowed"],[[70400,70400],"valid"],[[70401,70403],"valid"],[[70404,70404],"disallowed"],[[70405,70412],"valid"],[[70413,70414],"disallowed"],[[70415,70416],"valid"],[[70417,70418],"disallowed"],[[70419,70440],"valid"],[[70441,70441],"disallowed"],[[70442,70448],"valid"],[[70449,70449],"disallowed"],[[70450,70451],"valid"],[[70452,70452],"disallowed"],[[70453,70457],"valid"],[[70458,70459],"disallowed"],[[70460,70468],"valid"],[[70469,70470],"disallowed"],[[70471,70472],"valid"],[[70473,70474],"disallowed"],[[70475,70477],"valid"],[[70478,70479],"disallowed"],[[70480,70480],"valid"],[[70481,70486],"disallowed"],[[70487,70487],"valid"],[[70488,70492],"disallowed"],[[70493,70499],"valid"],[[70500,70501],"disallowed"],[[70502,70508],"valid"],[[70509,70511],"disallowed"],[[70512,70516],"valid"],[[70517,70783],"disallowed"],[[70784,70853],"valid"],[[70854,70854],"valid",[],"NV8"],[[70855,70855],"valid"],[[70856,70863],"disallowed"],[[70864,70873],"valid"],[[70874,71039],"disallowed"],[[71040,71093],"valid"],[[71094,71095],"disallowed"],[[71096,71104],"valid"],[[71105,71113],"valid",[],"NV8"],[[71114,71127],"valid",[],"NV8"],[[71128,71133],"valid"],[[71134,71167],"disallowed"],[[71168,71232],"valid"],[[71233,71235],"valid",[],"NV8"],[[71236,71236],"valid"],[[71237,71247],"disallowed"],[[71248,71257],"valid"],[[71258,71295],"disallowed"],[[71296,71351],"valid"],[[71352,71359],"disallowed"],[[71360,71369],"valid"],[[71370,71423],"disallowed"],[[71424,71449],"valid"],[[71450,71452],"disallowed"],[[71453,71467],"valid"],[[71468,71471],"disallowed"],[[71472,71481],"valid"],[[71482,71487],"valid",[],"NV8"],[[71488,71839],"disallowed"],[[71840,71840],"mapped",[71872]],[[71841,71841],"mapped",[71873]],[[71842,71842],"mapped",[71874]],[[71843,71843],"mapped",[71875]],[[71844,71844],"mapped",[71876]],[[71845,71845],"mapped",[71877]],[[71846,71846],"mapped",[71878]],[[71847,71847],"mapped",[71879]],[[71848,71848],"mapped",[71880]],[[71849,71849],"mapped",[71881]],[[71850,71850],"mapped",[71882]],[[71851,71851],"mapped",[71883]],[[71852,71852],"mapped",[71884]],[[71853,71853],"mapped",[71885]],[[71854,71854],"mapped",[71886]],[[71855,71855],"mapped",[71887]],[[71856,71856],"mapped",[71888]],[[71857,71857],"mapped",[71889]],[[71858,71858],"mapped",[71890]],[[71859,71859],"mapped",[71891]],[[71860,71860],"mapped",[71892]],[[71861,71861],"mapped",[71893]],[[71862,71862],"mapped",[71894]],[[71863,71863],"mapped",[71895]],[[71864,71864],"mapped",[71896]],[[71865,71865],"mapped",[71897]],[[71866,71866],"mapped",[71898]],[[71867,71867],"mapped",[71899]],[[71868,71868],"mapped",[71900]],[[71869,71869],"mapped",[71901]],[[71870,71870],"mapped",[71902]],[[71871,71871],"mapped",[71903]],[[71872,71913],"valid"],[[71914,71922],"valid",[],"NV8"],[[71923,71934],"disallowed"],[[71935,71935],"valid"],[[71936,72383],"disallowed"],[[72384,72440],"valid"],[[72441,73727],"disallowed"],[[73728,74606],"valid"],[[74607,74648],"valid"],[[74649,74649],"valid"],[[74650,74751],"disallowed"],[[74752,74850],"valid",[],"NV8"],[[74851,74862],"valid",[],"NV8"],[[74863,74863],"disallowed"],[[74864,74867],"valid",[],"NV8"],[[74868,74868],"valid",[],"NV8"],[[74869,74879],"disallowed"],[[74880,75075],"valid"],[[75076,77823],"disallowed"],[[77824,78894],"valid"],[[78895,82943],"disallowed"],[[82944,83526],"valid"],[[83527,92159],"disallowed"],[[92160,92728],"valid"],[[92729,92735],"disallowed"],[[92736,92766],"valid"],[[92767,92767],"disallowed"],[[92768,92777],"valid"],[[92778,92781],"disallowed"],[[92782,92783],"valid",[],"NV8"],[[92784,92879],"disallowed"],[[92880,92909],"valid"],[[92910,92911],"disallowed"],[[92912,92916],"valid"],[[92917,92917],"valid",[],"NV8"],[[92918,92927],"disallowed"],[[92928,92982],"valid"],[[92983,92991],"valid",[],"NV8"],[[92992,92995],"valid"],[[92996,92997],"valid",[],"NV8"],[[92998,93007],"disallowed"],[[93008,93017],"valid"],[[93018,93018],"disallowed"],[[93019,93025],"valid",[],"NV8"],[[93026,93026],"disallowed"],[[93027,93047],"valid"],[[93048,93052],"disallowed"],[[93053,93071],"valid"],[[93072,93951],"disallowed"],[[93952,94020],"valid"],[[94021,94031],"disallowed"],[[94032,94078],"valid"],[[94079,94094],"disallowed"],[[94095,94111],"valid"],[[94112,110591],"disallowed"],[[110592,110593],"valid"],[[110594,113663],"disallowed"],[[113664,113770],"valid"],[[113771,113775],"disallowed"],[[113776,113788],"valid"],[[113789,113791],"disallowed"],[[113792,113800],"valid"],[[113801,113807],"disallowed"],[[113808,113817],"valid"],[[113818,113819],"disallowed"],[[113820,113820],"valid",[],"NV8"],[[113821,113822],"valid"],[[113823,113823],"valid",[],"NV8"],[[113824,113827],"ignored"],[[113828,118783],"disallowed"],[[118784,119029],"valid",[],"NV8"],[[119030,119039],"disallowed"],[[119040,119078],"valid",[],"NV8"],[[119079,119080],"disallowed"],[[119081,119081],"valid",[],"NV8"],[[119082,119133],"valid",[],"NV8"],[[119134,119134],"mapped",[119127,119141]],[[119135,119135],"mapped",[119128,119141]],[[119136,119136],"mapped",[119128,119141,119150]],[[119137,119137],"mapped",[119128,119141,119151]],[[119138,119138],"mapped",[119128,119141,119152]],[[119139,119139],"mapped",[119128,119141,119153]],[[119140,119140],"mapped",[119128,119141,119154]],[[119141,119154],"valid",[],"NV8"],[[119155,119162],"disallowed"],[[119163,119226],"valid",[],"NV8"],[[119227,119227],"mapped",[119225,119141]],[[119228,119228],"mapped",[119226,119141]],[[119229,119229],"mapped",[119225,119141,119150]],[[119230,119230],"mapped",[119226,119141,119150]],[[119231,119231],"mapped",[119225,119141,119151]],[[119232,119232],"mapped",[119226,119141,119151]],[[119233,119261],"valid",[],"NV8"],[[119262,119272],"valid",[],"NV8"],[[119273,119295],"disallowed"],[[119296,119365],"valid",[],"NV8"],[[119366,119551],"disallowed"],[[119552,119638],"valid",[],"NV8"],[[119639,119647],"disallowed"],[[119648,119665],"valid",[],"NV8"],[[119666,119807],"disallowed"],[[119808,119808],"mapped",[97]],[[119809,119809],"mapped",[98]],[[119810,119810],"mapped",[99]],[[119811,119811],"mapped",[100]],[[119812,119812],"mapped",[101]],[[119813,119813],"mapped",[102]],[[119814,119814],"mapped",[103]],[[119815,119815],"mapped",[104]],[[119816,119816],"mapped",[105]],[[119817,119817],"mapped",[106]],[[119818,119818],"mapped",[107]],[[119819,119819],"mapped",[108]],[[119820,119820],"mapped",[109]],[[119821,119821],"mapped",[110]],[[119822,119822],"mapped",[111]],[[119823,119823],"mapped",[112]],[[119824,119824],"mapped",[113]],[[119825,119825],"mapped",[114]],[[119826,119826],"mapped",[115]],[[119827,119827],"mapped",[116]],[[119828,119828],"mapped",[117]],[[119829,119829],"mapped",[118]],[[119830,119830],"mapped",[119]],[[119831,119831],"mapped",[120]],[[119832,119832],"mapped",[121]],[[119833,119833],"mapped",[122]],[[119834,119834],"mapped",[97]],[[119835,119835],"mapped",[98]],[[119836,119836],"mapped",[99]],[[119837,119837],"mapped",[100]],[[119838,119838],"mapped",[101]],[[119839,119839],"mapped",[102]],[[119840,119840],"mapped",[103]],[[119841,119841],"mapped",[104]],[[119842,119842],"mapped",[105]],[[119843,119843],"mapped",[106]],[[119844,119844],"mapped",[107]],[[119845,119845],"mapped",[108]],[[119846,119846],"mapped",[109]],[[119847,119847],"mapped",[110]],[[119848,119848],"mapped",[111]],[[119849,119849],"mapped",[112]],[[119850,119850],"mapped",[113]],[[119851,119851],"mapped",[114]],[[119852,119852],"mapped",[115]],[[119853,119853],"mapped",[116]],[[119854,119854],"mapped",[117]],[[119855,119855],"mapped",[118]],[[119856,119856],"mapped",[119]],[[119857,119857],"mapped",[120]],[[119858,119858],"mapped",[121]],[[119859,119859],"mapped",[122]],[[119860,119860],"mapped",[97]],[[119861,119861],"mapped",[98]],[[119862,119862],"mapped",[99]],[[119863,119863],"mapped",[100]],[[119864,119864],"mapped",[101]],[[119865,119865],"mapped",[102]],[[119866,119866],"mapped",[103]],[[119867,119867],"mapped",[104]],[[119868,119868],"mapped",[105]],[[119869,119869],"mapped",[106]],[[119870,119870],"mapped",[107]],[[119871,119871],"mapped",[108]],[[119872,119872],"mapped",[109]],[[119873,119873],"mapped",[110]],[[119874,119874],"mapped",[111]],[[119875,119875],"mapped",[112]],[[119876,119876],"mapped",[113]],[[119877,119877],"mapped",[114]],[[119878,119878],"mapped",[115]],[[119879,119879],"mapped",[116]],[[119880,119880],"mapped",[117]],[[119881,119881],"mapped",[118]],[[119882,119882],"mapped",[119]],[[119883,119883],"mapped",[120]],[[119884,119884],"mapped",[121]],[[119885,119885],"mapped",[122]],[[119886,119886],"mapped",[97]],[[119887,119887],"mapped",[98]],[[119888,119888],"mapped",[99]],[[119889,119889],"mapped",[100]],[[119890,119890],"mapped",[101]],[[119891,119891],"mapped",[102]],[[119892,119892],"mapped",[103]],[[119893,119893],"disallowed"],[[119894,119894],"mapped",[105]],[[119895,119895],"mapped",[106]],[[119896,119896],"mapped",[107]],[[119897,119897],"mapped",[108]],[[119898,119898],"mapped",[109]],[[119899,119899],"mapped",[110]],[[119900,119900],"mapped",[111]],[[119901,119901],"mapped",[112]],[[119902,119902],"mapped",[113]],[[119903,119903],"mapped",[114]],[[119904,119904],"mapped",[115]],[[119905,119905],"mapped",[116]],[[119906,119906],"mapped",[117]],[[119907,119907],"mapped",[118]],[[119908,119908],"mapped",[119]],[[119909,119909],"mapped",[120]],[[119910,119910],"mapped",[121]],[[119911,119911],"mapped",[122]],[[119912,119912],"mapped",[97]],[[119913,119913],"mapped",[98]],[[119914,119914],"mapped",[99]],[[119915,119915],"mapped",[100]],[[119916,119916],"mapped",[101]],[[119917,119917],"mapped",[102]],[[119918,119918],"mapped",[103]],[[119919,119919],"mapped",[104]],[[119920,119920],"mapped",[105]],[[119921,119921],"mapped",[106]],[[119922,119922],"mapped",[107]],[[119923,119923],"mapped",[108]],[[119924,119924],"mapped",[109]],[[119925,119925],"mapped",[110]],[[119926,119926],"mapped",[111]],[[119927,119927],"mapped",[112]],[[119928,119928],"mapped",[113]],[[119929,119929],"mapped",[114]],[[119930,119930],"mapped",[115]],[[119931,119931],"mapped",[116]],[[119932,119932],"mapped",[117]],[[119933,119933],"mapped",[118]],[[119934,119934],"mapped",[119]],[[119935,119935],"mapped",[120]],[[119936,119936],"mapped",[121]],[[119937,119937],"mapped",[122]],[[119938,119938],"mapped",[97]],[[119939,119939],"mapped",[98]],[[119940,119940],"mapped",[99]],[[119941,119941],"mapped",[100]],[[119942,119942],"mapped",[101]],[[119943,119943],"mapped",[102]],[[119944,119944],"mapped",[103]],[[119945,119945],"mapped",[104]],[[119946,119946],"mapped",[105]],[[119947,119947],"mapped",[106]],[[119948,119948],"mapped",[107]],[[119949,119949],"mapped",[108]],[[119950,119950],"mapped",[109]],[[119951,119951],"mapped",[110]],[[119952,119952],"mapped",[111]],[[119953,119953],"mapped",[112]],[[119954,119954],"mapped",[113]],[[119955,119955],"mapped",[114]],[[119956,119956],"mapped",[115]],[[119957,119957],"mapped",[116]],[[119958,119958],"mapped",[117]],[[119959,119959],"mapped",[118]],[[119960,119960],"mapped",[119]],[[119961,119961],"mapped",[120]],[[119962,119962],"mapped",[121]],[[119963,119963],"mapped",[122]],[[119964,119964],"mapped",[97]],[[119965,119965],"disallowed"],[[119966,119966],"mapped",[99]],[[119967,119967],"mapped",[100]],[[119968,119969],"disallowed"],[[119970,119970],"mapped",[103]],[[119971,119972],"disallowed"],[[119973,119973],"mapped",[106]],[[119974,119974],"mapped",[107]],[[119975,119976],"disallowed"],[[119977,119977],"mapped",[110]],[[119978,119978],"mapped",[111]],[[119979,119979],"mapped",[112]],[[119980,119980],"mapped",[113]],[[119981,119981],"disallowed"],[[119982,119982],"mapped",[115]],[[119983,119983],"mapped",[116]],[[119984,119984],"mapped",[117]],[[119985,119985],"mapped",[118]],[[119986,119986],"mapped",[119]],[[119987,119987],"mapped",[120]],[[119988,119988],"mapped",[121]],[[119989,119989],"mapped",[122]],[[119990,119990],"mapped",[97]],[[119991,119991],"mapped",[98]],[[119992,119992],"mapped",[99]],[[119993,119993],"mapped",[100]],[[119994,119994],"disallowed"],[[119995,119995],"mapped",[102]],[[119996,119996],"disallowed"],[[119997,119997],"mapped",[104]],[[119998,119998],"mapped",[105]],[[119999,119999],"mapped",[106]],[[120000,120000],"mapped",[107]],[[120001,120001],"mapped",[108]],[[120002,120002],"mapped",[109]],[[120003,120003],"mapped",[110]],[[120004,120004],"disallowed"],[[120005,120005],"mapped",[112]],[[120006,120006],"mapped",[113]],[[120007,120007],"mapped",[114]],[[120008,120008],"mapped",[115]],[[120009,120009],"mapped",[116]],[[120010,120010],"mapped",[117]],[[120011,120011],"mapped",[118]],[[120012,120012],"mapped",[119]],[[120013,120013],"mapped",[120]],[[120014,120014],"mapped",[121]],[[120015,120015],"mapped",[122]],[[120016,120016],"mapped",[97]],[[120017,120017],"mapped",[98]],[[120018,120018],"mapped",[99]],[[120019,120019],"mapped",[100]],[[120020,120020],"mapped",[101]],[[120021,120021],"mapped",[102]],[[120022,120022],"mapped",[103]],[[120023,120023],"mapped",[104]],[[120024,120024],"mapped",[105]],[[120025,120025],"mapped",[106]],[[120026,120026],"mapped",[107]],[[120027,120027],"mapped",[108]],[[120028,120028],"mapped",[109]],[[120029,120029],"mapped",[110]],[[120030,120030],"mapped",[111]],[[120031,120031],"mapped",[112]],[[120032,120032],"mapped",[113]],[[120033,120033],"mapped",[114]],[[120034,120034],"mapped",[115]],[[120035,120035],"mapped",[116]],[[120036,120036],"mapped",[117]],[[120037,120037],"mapped",[118]],[[120038,120038],"mapped",[119]],[[120039,120039],"mapped",[120]],[[120040,120040],"mapped",[121]],[[120041,120041],"mapped",[122]],[[120042,120042],"mapped",[97]],[[120043,120043],"mapped",[98]],[[120044,120044],"mapped",[99]],[[120045,120045],"mapped",[100]],[[120046,120046],"mapped",[101]],[[120047,120047],"mapped",[102]],[[120048,120048],"mapped",[103]],[[120049,120049],"mapped",[104]],[[120050,120050],"mapped",[105]],[[120051,120051],"mapped",[106]],[[120052,120052],"mapped",[107]],[[120053,120053],"mapped",[108]],[[120054,120054],"mapped",[109]],[[120055,120055],"mapped",[110]],[[120056,120056],"mapped",[111]],[[120057,120057],"mapped",[112]],[[120058,120058],"mapped",[113]],[[120059,120059],"mapped",[114]],[[120060,120060],"mapped",[115]],[[120061,120061],"mapped",[116]],[[120062,120062],"mapped",[117]],[[120063,120063],"mapped",[118]],[[120064,120064],"mapped",[119]],[[120065,120065],"mapped",[120]],[[120066,120066],"mapped",[121]],[[120067,120067],"mapped",[122]],[[120068,120068],"mapped",[97]],[[120069,120069],"mapped",[98]],[[120070,120070],"disallowed"],[[120071,120071],"mapped",[100]],[[120072,120072],"mapped",[101]],[[120073,120073],"mapped",[102]],[[120074,120074],"mapped",[103]],[[120075,120076],"disallowed"],[[120077,120077],"mapped",[106]],[[120078,120078],"mapped",[107]],[[120079,120079],"mapped",[108]],[[120080,120080],"mapped",[109]],[[120081,120081],"mapped",[110]],[[120082,120082],"mapped",[111]],[[120083,120083],"mapped",[112]],[[120084,120084],"mapped",[113]],[[120085,120085],"disallowed"],[[120086,120086],"mapped",[115]],[[120087,120087],"mapped",[116]],[[120088,120088],"mapped",[117]],[[120089,120089],"mapped",[118]],[[120090,120090],"mapped",[119]],[[120091,120091],"mapped",[120]],[[120092,120092],"mapped",[121]],[[120093,120093],"disallowed"],[[120094,120094],"mapped",[97]],[[120095,120095],"mapped",[98]],[[120096,120096],"mapped",[99]],[[120097,120097],"mapped",[100]],[[120098,120098],"mapped",[101]],[[120099,120099],"mapped",[102]],[[120100,120100],"mapped",[103]],[[120101,120101],"mapped",[104]],[[120102,120102],"mapped",[105]],[[120103,120103],"mapped",[106]],[[120104,120104],"mapped",[107]],[[120105,120105],"mapped",[108]],[[120106,120106],"mapped",[109]],[[120107,120107],"mapped",[110]],[[120108,120108],"mapped",[111]],[[120109,120109],"mapped",[112]],[[120110,120110],"mapped",[113]],[[120111,120111],"mapped",[114]],[[120112,120112],"mapped",[115]],[[120113,120113],"mapped",[116]],[[120114,120114],"mapped",[117]],[[120115,120115],"mapped",[118]],[[120116,120116],"mapped",[119]],[[120117,120117],"mapped",[120]],[[120118,120118],"mapped",[121]],[[120119,120119],"mapped",[122]],[[120120,120120],"mapped",[97]],[[120121,120121],"mapped",[98]],[[120122,120122],"disallowed"],[[120123,120123],"mapped",[100]],[[120124,120124],"mapped",[101]],[[120125,120125],"mapped",[102]],[[120126,120126],"mapped",[103]],[[120127,120127],"disallowed"],[[120128,120128],"mapped",[105]],[[120129,120129],"mapped",[106]],[[120130,120130],"mapped",[107]],[[120131,120131],"mapped",[108]],[[120132,120132],"mapped",[109]],[[120133,120133],"disallowed"],[[120134,120134],"mapped",[111]],[[120135,120137],"disallowed"],[[120138,120138],"mapped",[115]],[[120139,120139],"mapped",[116]],[[120140,120140],"mapped",[117]],[[120141,120141],"mapped",[118]],[[120142,120142],"mapped",[119]],[[120143,120143],"mapped",[120]],[[120144,120144],"mapped",[121]],[[120145,120145],"disallowed"],[[120146,120146],"mapped",[97]],[[120147,120147],"mapped",[98]],[[120148,120148],"mapped",[99]],[[120149,120149],"mapped",[100]],[[120150,120150],"mapped",[101]],[[120151,120151],"mapped",[102]],[[120152,120152],"mapped",[103]],[[120153,120153],"mapped",[104]],[[120154,120154],"mapped",[105]],[[120155,120155],"mapped",[106]],[[120156,120156],"mapped",[107]],[[120157,120157],"mapped",[108]],[[120158,120158],"mapped",[109]],[[120159,120159],"mapped",[110]],[[120160,120160],"mapped",[111]],[[120161,120161],"mapped",[112]],[[120162,120162],"mapped",[113]],[[120163,120163],"mapped",[114]],[[120164,120164],"mapped",[115]],[[120165,120165],"mapped",[116]],[[120166,120166],"mapped",[117]],[[120167,120167],"mapped",[118]],[[120168,120168],"mapped",[119]],[[120169,120169],"mapped",[120]],[[120170,120170],"mapped",[121]],[[120171,120171],"mapped",[122]],[[120172,120172],"mapped",[97]],[[120173,120173],"mapped",[98]],[[120174,120174],"mapped",[99]],[[120175,120175],"mapped",[100]],[[120176,120176],"mapped",[101]],[[120177,120177],"mapped",[102]],[[120178,120178],"mapped",[103]],[[120179,120179],"mapped",[104]],[[120180,120180],"mapped",[105]],[[120181,120181],"mapped",[106]],[[120182,120182],"mapped",[107]],[[120183,120183],"mapped",[108]],[[120184,120184],"mapped",[109]],[[120185,120185],"mapped",[110]],[[120186,120186],"mapped",[111]],[[120187,120187],"mapped",[112]],[[120188,120188],"mapped",[113]],[[120189,120189],"mapped",[114]],[[120190,120190],"mapped",[115]],[[120191,120191],"mapped",[116]],[[120192,120192],"mapped",[117]],[[120193,120193],"mapped",[118]],[[120194,120194],"mapped",[119]],[[120195,120195],"mapped",[120]],[[120196,120196],"mapped",[121]],[[120197,120197],"mapped",[122]],[[120198,120198],"mapped",[97]],[[120199,120199],"mapped",[98]],[[120200,120200],"mapped",[99]],[[120201,120201],"mapped",[100]],[[120202,120202],"mapped",[101]],[[120203,120203],"mapped",[102]],[[120204,120204],"mapped",[103]],[[120205,120205],"mapped",[104]],[[120206,120206],"mapped",[105]],[[120207,120207],"mapped",[106]],[[120208,120208],"mapped",[107]],[[120209,120209],"mapped",[108]],[[120210,120210],"mapped",[109]],[[120211,120211],"mapped",[110]],[[120212,120212],"mapped",[111]],[[120213,120213],"mapped",[112]],[[120214,120214],"mapped",[113]],[[120215,120215],"mapped",[114]],[[120216,120216],"mapped",[115]],[[120217,120217],"mapped",[116]],[[120218,120218],"mapped",[117]],[[120219,120219],"mapped",[118]],[[120220,120220],"mapped",[119]],[[120221,120221],"mapped",[120]],[[120222,120222],"mapped",[121]],[[120223,120223],"mapped",[122]],[[120224,120224],"mapped",[97]],[[120225,120225],"mapped",[98]],[[120226,120226],"mapped",[99]],[[120227,120227],"mapped",[100]],[[120228,120228],"mapped",[101]],[[120229,120229],"mapped",[102]],[[120230,120230],"mapped",[103]],[[120231,120231],"mapped",[104]],[[120232,120232],"mapped",[105]],[[120233,120233],"mapped",[106]],[[120234,120234],"mapped",[107]],[[120235,120235],"mapped",[108]],[[120236,120236],"mapped",[109]],[[120237,120237],"mapped",[110]],[[120238,120238],"mapped",[111]],[[120239,120239],"mapped",[112]],[[120240,120240],"mapped",[113]],[[120241,120241],"mapped",[114]],[[120242,120242],"mapped",[115]],[[120243,120243],"mapped",[116]],[[120244,120244],"mapped",[117]],[[120245,120245],"mapped",[118]],[[120246,120246],"mapped",[119]],[[120247,120247],"mapped",[120]],[[120248,120248],"mapped",[121]],[[120249,120249],"mapped",[122]],[[120250,120250],"mapped",[97]],[[120251,120251],"mapped",[98]],[[120252,120252],"mapped",[99]],[[120253,120253],"mapped",[100]],[[120254,120254],"mapped",[101]],[[120255,120255],"mapped",[102]],[[120256,120256],"mapped",[103]],[[120257,120257],"mapped",[104]],[[120258,120258],"mapped",[105]],[[120259,120259],"mapped",[106]],[[120260,120260],"mapped",[107]],[[120261,120261],"mapped",[108]],[[120262,120262],"mapped",[109]],[[120263,120263],"mapped",[110]],[[120264,120264],"mapped",[111]],[[120265,120265],"mapped",[112]],[[120266,120266],"mapped",[113]],[[120267,120267],"mapped",[114]],[[120268,120268],"mapped",[115]],[[120269,120269],"mapped",[116]],[[120270,120270],"mapped",[117]],[[120271,120271],"mapped",[118]],[[120272,120272],"mapped",[119]],[[120273,120273],"mapped",[120]],[[120274,120274],"mapped",[121]],[[120275,120275],"mapped",[122]],[[120276,120276],"mapped",[97]],[[120277,120277],"mapped",[98]],[[120278,120278],"mapped",[99]],[[120279,120279],"mapped",[100]],[[120280,120280],"mapped",[101]],[[120281,120281],"mapped",[102]],[[120282,120282],"mapped",[103]],[[120283,120283],"mapped",[104]],[[120284,120284],"mapped",[105]],[[120285,120285],"mapped",[106]],[[120286,120286],"mapped",[107]],[[120287,120287],"mapped",[108]],[[120288,120288],"mapped",[109]],[[120289,120289],"mapped",[110]],[[120290,120290],"mapped",[111]],[[120291,120291],"mapped",[112]],[[120292,120292],"mapped",[113]],[[120293,120293],"mapped",[114]],[[120294,120294],"mapped",[115]],[[120295,120295],"mapped",[116]],[[120296,120296],"mapped",[117]],[[120297,120297],"mapped",[118]],[[120298,120298],"mapped",[119]],[[120299,120299],"mapped",[120]],[[120300,120300],"mapped",[121]],[[120301,120301],"mapped",[122]],[[120302,120302],"mapped",[97]],[[120303,120303],"mapped",[98]],[[120304,120304],"mapped",[99]],[[120305,120305],"mapped",[100]],[[120306,120306],"mapped",[101]],[[120307,120307],"mapped",[102]],[[120308,120308],"mapped",[103]],[[120309,120309],"mapped",[104]],[[120310,120310],"mapped",[105]],[[120311,120311],"mapped",[106]],[[120312,120312],"mapped",[107]],[[120313,120313],"mapped",[108]],[[120314,120314],"mapped",[109]],[[120315,120315],"mapped",[110]],[[120316,120316],"mapped",[111]],[[120317,120317],"mapped",[112]],[[120318,120318],"mapped",[113]],[[120319,120319],"mapped",[114]],[[120320,120320],"mapped",[115]],[[120321,120321],"mapped",[116]],[[120322,120322],"mapped",[117]],[[120323,120323],"mapped",[118]],[[120324,120324],"mapped",[119]],[[120325,120325],"mapped",[120]],[[120326,120326],"mapped",[121]],[[120327,120327],"mapped",[122]],[[120328,120328],"mapped",[97]],[[120329,120329],"mapped",[98]],[[120330,120330],"mapped",[99]],[[120331,120331],"mapped",[100]],[[120332,120332],"mapped",[101]],[[120333,120333],"mapped",[102]],[[120334,120334],"mapped",[103]],[[120335,120335],"mapped",[104]],[[120336,120336],"mapped",[105]],[[120337,120337],"mapped",[106]],[[120338,120338],"mapped",[107]],[[120339,120339],"mapped",[108]],[[120340,120340],"mapped",[109]],[[120341,120341],"mapped",[110]],[[120342,120342],"mapped",[111]],[[120343,120343],"mapped",[112]],[[120344,120344],"mapped",[113]],[[120345,120345],"mapped",[114]],[[120346,120346],"mapped",[115]],[[120347,120347],"mapped",[116]],[[120348,120348],"mapped",[117]],[[120349,120349],"mapped",[118]],[[120350,120350],"mapped",[119]],[[120351,120351],"mapped",[120]],[[120352,120352],"mapped",[121]],[[120353,120353],"mapped",[122]],[[120354,120354],"mapped",[97]],[[120355,120355],"mapped",[98]],[[120356,120356],"mapped",[99]],[[120357,120357],"mapped",[100]],[[120358,120358],"mapped",[101]],[[120359,120359],"mapped",[102]],[[120360,120360],"mapped",[103]],[[120361,120361],"mapped",[104]],[[120362,120362],"mapped",[105]],[[120363,120363],"mapped",[106]],[[120364,120364],"mapped",[107]],[[120365,120365],"mapped",[108]],[[120366,120366],"mapped",[109]],[[120367,120367],"mapped",[110]],[[120368,120368],"mapped",[111]],[[120369,120369],"mapped",[112]],[[120370,120370],"mapped",[113]],[[120371,120371],"mapped",[114]],[[120372,120372],"mapped",[115]],[[120373,120373],"mapped",[116]],[[120374,120374],"mapped",[117]],[[120375,120375],"mapped",[118]],[[120376,120376],"mapped",[119]],[[120377,120377],"mapped",[120]],[[120378,120378],"mapped",[121]],[[120379,120379],"mapped",[122]],[[120380,120380],"mapped",[97]],[[120381,120381],"mapped",[98]],[[120382,120382],"mapped",[99]],[[120383,120383],"mapped",[100]],[[120384,120384],"mapped",[101]],[[120385,120385],"mapped",[102]],[[120386,120386],"mapped",[103]],[[120387,120387],"mapped",[104]],[[120388,120388],"mapped",[105]],[[120389,120389],"mapped",[106]],[[120390,120390],"mapped",[107]],[[120391,120391],"mapped",[108]],[[120392,120392],"mapped",[109]],[[120393,120393],"mapped",[110]],[[120394,120394],"mapped",[111]],[[120395,120395],"mapped",[112]],[[120396,120396],"mapped",[113]],[[120397,120397],"mapped",[114]],[[120398,120398],"mapped",[115]],[[120399,120399],"mapped",[116]],[[120400,120400],"mapped",[117]],[[120401,120401],"mapped",[118]],[[120402,120402],"mapped",[119]],[[120403,120403],"mapped",[120]],[[120404,120404],"mapped",[121]],[[120405,120405],"mapped",[122]],[[120406,120406],"mapped",[97]],[[120407,120407],"mapped",[98]],[[120408,120408],"mapped",[99]],[[120409,120409],"mapped",[100]],[[120410,120410],"mapped",[101]],[[120411,120411],"mapped",[102]],[[120412,120412],"mapped",[103]],[[120413,120413],"mapped",[104]],[[120414,120414],"mapped",[105]],[[120415,120415],"mapped",[106]],[[120416,120416],"mapped",[107]],[[120417,120417],"mapped",[108]],[[120418,120418],"mapped",[109]],[[120419,120419],"mapped",[110]],[[120420,120420],"mapped",[111]],[[120421,120421],"mapped",[112]],[[120422,120422],"mapped",[113]],[[120423,120423],"mapped",[114]],[[120424,120424],"mapped",[115]],[[120425,120425],"mapped",[116]],[[120426,120426],"mapped",[117]],[[120427,120427],"mapped",[118]],[[120428,120428],"mapped",[119]],[[120429,120429],"mapped",[120]],[[120430,120430],"mapped",[121]],[[120431,120431],"mapped",[122]],[[120432,120432],"mapped",[97]],[[120433,120433],"mapped",[98]],[[120434,120434],"mapped",[99]],[[120435,120435],"mapped",[100]],[[120436,120436],"mapped",[101]],[[120437,120437],"mapped",[102]],[[120438,120438],"mapped",[103]],[[120439,120439],"mapped",[104]],[[120440,120440],"mapped",[105]],[[120441,120441],"mapped",[106]],[[120442,120442],"mapped",[107]],[[120443,120443],"mapped",[108]],[[120444,120444],"mapped",[109]],[[120445,120445],"mapped",[110]],[[120446,120446],"mapped",[111]],[[120447,120447],"mapped",[112]],[[120448,120448],"mapped",[113]],[[120449,120449],"mapped",[114]],[[120450,120450],"mapped",[115]],[[120451,120451],"mapped",[116]],[[120452,120452],"mapped",[117]],[[120453,120453],"mapped",[118]],[[120454,120454],"mapped",[119]],[[120455,120455],"mapped",[120]],[[120456,120456],"mapped",[121]],[[120457,120457],"mapped",[122]],[[120458,120458],"mapped",[97]],[[120459,120459],"mapped",[98]],[[120460,120460],"mapped",[99]],[[120461,120461],"mapped",[100]],[[120462,120462],"mapped",[101]],[[120463,120463],"mapped",[102]],[[120464,120464],"mapped",[103]],[[120465,120465],"mapped",[104]],[[120466,120466],"mapped",[105]],[[120467,120467],"mapped",[106]],[[120468,120468],"mapped",[107]],[[120469,120469],"mapped",[108]],[[120470,120470],"mapped",[109]],[[120471,120471],"mapped",[110]],[[120472,120472],"mapped",[111]],[[120473,120473],"mapped",[112]],[[120474,120474],"mapped",[113]],[[120475,120475],"mapped",[114]],[[120476,120476],"mapped",[115]],[[120477,120477],"mapped",[116]],[[120478,120478],"mapped",[117]],[[120479,120479],"mapped",[118]],[[120480,120480],"mapped",[119]],[[120481,120481],"mapped",[120]],[[120482,120482],"mapped",[121]],[[120483,120483],"mapped",[122]],[[120484,120484],"mapped",[305]],[[120485,120485],"mapped",[567]],[[120486,120487],"disallowed"],[[120488,120488],"mapped",[945]],[[120489,120489],"mapped",[946]],[[120490,120490],"mapped",[947]],[[120491,120491],"mapped",[948]],[[120492,120492],"mapped",[949]],[[120493,120493],"mapped",[950]],[[120494,120494],"mapped",[951]],[[120495,120495],"mapped",[952]],[[120496,120496],"mapped",[953]],[[120497,120497],"mapped",[954]],[[120498,120498],"mapped",[955]],[[120499,120499],"mapped",[956]],[[120500,120500],"mapped",[957]],[[120501,120501],"mapped",[958]],[[120502,120502],"mapped",[959]],[[120503,120503],"mapped",[960]],[[120504,120504],"mapped",[961]],[[120505,120505],"mapped",[952]],[[120506,120506],"mapped",[963]],[[120507,120507],"mapped",[964]],[[120508,120508],"mapped",[965]],[[120509,120509],"mapped",[966]],[[120510,120510],"mapped",[967]],[[120511,120511],"mapped",[968]],[[120512,120512],"mapped",[969]],[[120513,120513],"mapped",[8711]],[[120514,120514],"mapped",[945]],[[120515,120515],"mapped",[946]],[[120516,120516],"mapped",[947]],[[120517,120517],"mapped",[948]],[[120518,120518],"mapped",[949]],[[120519,120519],"mapped",[950]],[[120520,120520],"mapped",[951]],[[120521,120521],"mapped",[952]],[[120522,120522],"mapped",[953]],[[120523,120523],"mapped",[954]],[[120524,120524],"mapped",[955]],[[120525,120525],"mapped",[956]],[[120526,120526],"mapped",[957]],[[120527,120527],"mapped",[958]],[[120528,120528],"mapped",[959]],[[120529,120529],"mapped",[960]],[[120530,120530],"mapped",[961]],[[120531,120532],"mapped",[963]],[[120533,120533],"mapped",[964]],[[120534,120534],"mapped",[965]],[[120535,120535],"mapped",[966]],[[120536,120536],"mapped",[967]],[[120537,120537],"mapped",[968]],[[120538,120538],"mapped",[969]],[[120539,120539],"mapped",[8706]],[[120540,120540],"mapped",[949]],[[120541,120541],"mapped",[952]],[[120542,120542],"mapped",[954]],[[120543,120543],"mapped",[966]],[[120544,120544],"mapped",[961]],[[120545,120545],"mapped",[960]],[[120546,120546],"mapped",[945]],[[120547,120547],"mapped",[946]],[[120548,120548],"mapped",[947]],[[120549,120549],"mapped",[948]],[[120550,120550],"mapped",[949]],[[120551,120551],"mapped",[950]],[[120552,120552],"mapped",[951]],[[120553,120553],"mapped",[952]],[[120554,120554],"mapped",[953]],[[120555,120555],"mapped",[954]],[[120556,120556],"mapped",[955]],[[120557,120557],"mapped",[956]],[[120558,120558],"mapped",[957]],[[120559,120559],"mapped",[958]],[[120560,120560],"mapped",[959]],[[120561,120561],"mapped",[960]],[[120562,120562],"mapped",[961]],[[120563,120563],"mapped",[952]],[[120564,120564],"mapped",[963]],[[120565,120565],"mapped",[964]],[[120566,120566],"mapped",[965]],[[120567,120567],"mapped",[966]],[[120568,120568],"mapped",[967]],[[120569,120569],"mapped",[968]],[[120570,120570],"mapped",[969]],[[120571,120571],"mapped",[8711]],[[120572,120572],"mapped",[945]],[[120573,120573],"mapped",[946]],[[120574,120574],"mapped",[947]],[[120575,120575],"mapped",[948]],[[120576,120576],"mapped",[949]],[[120577,120577],"mapped",[950]],[[120578,120578],"mapped",[951]],[[120579,120579],"mapped",[952]],[[120580,120580],"mapped",[953]],[[120581,120581],"mapped",[954]],[[120582,120582],"mapped",[955]],[[120583,120583],"mapped",[956]],[[120584,120584],"mapped",[957]],[[120585,120585],"mapped",[958]],[[120586,120586],"mapped",[959]],[[120587,120587],"mapped",[960]],[[120588,120588],"mapped",[961]],[[120589,120590],"mapped",[963]],[[120591,120591],"mapped",[964]],[[120592,120592],"mapped",[965]],[[120593,120593],"mapped",[966]],[[120594,120594],"mapped",[967]],[[120595,120595],"mapped",[968]],[[120596,120596],"mapped",[969]],[[120597,120597],"mapped",[8706]],[[120598,120598],"mapped",[949]],[[120599,120599],"mapped",[952]],[[120600,120600],"mapped",[954]],[[120601,120601],"mapped",[966]],[[120602,120602],"mapped",[961]],[[120603,120603],"mapped",[960]],[[120604,120604],"mapped",[945]],[[120605,120605],"mapped",[946]],[[120606,120606],"mapped",[947]],[[120607,120607],"mapped",[948]],[[120608,120608],"mapped",[949]],[[120609,120609],"mapped",[950]],[[120610,120610],"mapped",[951]],[[120611,120611],"mapped",[952]],[[120612,120612],"mapped",[953]],[[120613,120613],"mapped",[954]],[[120614,120614],"mapped",[955]],[[120615,120615],"mapped",[956]],[[120616,120616],"mapped",[957]],[[120617,120617],"mapped",[958]],[[120618,120618],"mapped",[959]],[[120619,120619],"mapped",[960]],[[120620,120620],"mapped",[961]],[[120621,120621],"mapped",[952]],[[120622,120622],"mapped",[963]],[[120623,120623],"mapped",[964]],[[120624,120624],"mapped",[965]],[[120625,120625],"mapped",[966]],[[120626,120626],"mapped",[967]],[[120627,120627],"mapped",[968]],[[120628,120628],"mapped",[969]],[[120629,120629],"mapped",[8711]],[[120630,120630],"mapped",[945]],[[120631,120631],"mapped",[946]],[[120632,120632],"mapped",[947]],[[120633,120633],"mapped",[948]],[[120634,120634],"mapped",[949]],[[120635,120635],"mapped",[950]],[[120636,120636],"mapped",[951]],[[120637,120637],"mapped",[952]],[[120638,120638],"mapped",[953]],[[120639,120639],"mapped",[954]],[[120640,120640],"mapped",[955]],[[120641,120641],"mapped",[956]],[[120642,120642],"mapped",[957]],[[120643,120643],"mapped",[958]],[[120644,120644],"mapped",[959]],[[120645,120645],"mapped",[960]],[[120646,120646],"mapped",[961]],[[120647,120648],"mapped",[963]],[[120649,120649],"mapped",[964]],[[120650,120650],"mapped",[965]],[[120651,120651],"mapped",[966]],[[120652,120652],"mapped",[967]],[[120653,120653],"mapped",[968]],[[120654,120654],"mapped",[969]],[[120655,120655],"mapped",[8706]],[[120656,120656],"mapped",[949]],[[120657,120657],"mapped",[952]],[[120658,120658],"mapped",[954]],[[120659,120659],"mapped",[966]],[[120660,120660],"mapped",[961]],[[120661,120661],"mapped",[960]],[[120662,120662],"mapped",[945]],[[120663,120663],"mapped",[946]],[[120664,120664],"mapped",[947]],[[120665,120665],"mapped",[948]],[[120666,120666],"mapped",[949]],[[120667,120667],"mapped",[950]],[[120668,120668],"mapped",[951]],[[120669,120669],"mapped",[952]],[[120670,120670],"mapped",[953]],[[120671,120671],"mapped",[954]],[[120672,120672],"mapped",[955]],[[120673,120673],"mapped",[956]],[[120674,120674],"mapped",[957]],[[120675,120675],"mapped",[958]],[[120676,120676],"mapped",[959]],[[120677,120677],"mapped",[960]],[[120678,120678],"mapped",[961]],[[120679,120679],"mapped",[952]],[[120680,120680],"mapped",[963]],[[120681,120681],"mapped",[964]],[[120682,120682],"mapped",[965]],[[120683,120683],"mapped",[966]],[[120684,120684],"mapped",[967]],[[120685,120685],"mapped",[968]],[[120686,120686],"mapped",[969]],[[120687,120687],"mapped",[8711]],[[120688,120688],"mapped",[945]],[[120689,120689],"mapped",[946]],[[120690,120690],"mapped",[947]],[[120691,120691],"mapped",[948]],[[120692,120692],"mapped",[949]],[[120693,120693],"mapped",[950]],[[120694,120694],"mapped",[951]],[[120695,120695],"mapped",[952]],[[120696,120696],"mapped",[953]],[[120697,120697],"mapped",[954]],[[120698,120698],"mapped",[955]],[[120699,120699],"mapped",[956]],[[120700,120700],"mapped",[957]],[[120701,120701],"mapped",[958]],[[120702,120702],"mapped",[959]],[[120703,120703],"mapped",[960]],[[120704,120704],"mapped",[961]],[[120705,120706],"mapped",[963]],[[120707,120707],"mapped",[964]],[[120708,120708],"mapped",[965]],[[120709,120709],"mapped",[966]],[[120710,120710],"mapped",[967]],[[120711,120711],"mapped",[968]],[[120712,120712],"mapped",[969]],[[120713,120713],"mapped",[8706]],[[120714,120714],"mapped",[949]],[[120715,120715],"mapped",[952]],[[120716,120716],"mapped",[954]],[[120717,120717],"mapped",[966]],[[120718,120718],"mapped",[961]],[[120719,120719],"mapped",[960]],[[120720,120720],"mapped",[945]],[[120721,120721],"mapped",[946]],[[120722,120722],"mapped",[947]],[[120723,120723],"mapped",[948]],[[120724,120724],"mapped",[949]],[[120725,120725],"mapped",[950]],[[120726,120726],"mapped",[951]],[[120727,120727],"mapped",[952]],[[120728,120728],"mapped",[953]],[[120729,120729],"mapped",[954]],[[120730,120730],"mapped",[955]],[[120731,120731],"mapped",[956]],[[120732,120732],"mapped",[957]],[[120733,120733],"mapped",[958]],[[120734,120734],"mapped",[959]],[[120735,120735],"mapped",[960]],[[120736,120736],"mapped",[961]],[[120737,120737],"mapped",[952]],[[120738,120738],"mapped",[963]],[[120739,120739],"mapped",[964]],[[120740,120740],"mapped",[965]],[[120741,120741],"mapped",[966]],[[120742,120742],"mapped",[967]],[[120743,120743],"mapped",[968]],[[120744,120744],"mapped",[969]],[[120745,120745],"mapped",[8711]],[[120746,120746],"mapped",[945]],[[120747,120747],"mapped",[946]],[[120748,120748],"mapped",[947]],[[120749,120749],"mapped",[948]],[[120750,120750],"mapped",[949]],[[120751,120751],"mapped",[950]],[[120752,120752],"mapped",[951]],[[120753,120753],"mapped",[952]],[[120754,120754],"mapped",[953]],[[120755,120755],"mapped",[954]],[[120756,120756],"mapped",[955]],[[120757,120757],"mapped",[956]],[[120758,120758],"mapped",[957]],[[120759,120759],"mapped",[958]],[[120760,120760],"mapped",[959]],[[120761,120761],"mapped",[960]],[[120762,120762],"mapped",[961]],[[120763,120764],"mapped",[963]],[[120765,120765],"mapped",[964]],[[120766,120766],"mapped",[965]],[[120767,120767],"mapped",[966]],[[120768,120768],"mapped",[967]],[[120769,120769],"mapped",[968]],[[120770,120770],"mapped",[969]],[[120771,120771],"mapped",[8706]],[[120772,120772],"mapped",[949]],[[120773,120773],"mapped",[952]],[[120774,120774],"mapped",[954]],[[120775,120775],"mapped",[966]],[[120776,120776],"mapped",[961]],[[120777,120777],"mapped",[960]],[[120778,120779],"mapped",[989]],[[120780,120781],"disallowed"],[[120782,120782],"mapped",[48]],[[120783,120783],"mapped",[49]],[[120784,120784],"mapped",[50]],[[120785,120785],"mapped",[51]],[[120786,120786],"mapped",[52]],[[120787,120787],"mapped",[53]],[[120788,120788],"mapped",[54]],[[120789,120789],"mapped",[55]],[[120790,120790],"mapped",[56]],[[120791,120791],"mapped",[57]],[[120792,120792],"mapped",[48]],[[120793,120793],"mapped",[49]],[[120794,120794],"mapped",[50]],[[120795,120795],"mapped",[51]],[[120796,120796],"mapped",[52]],[[120797,120797],"mapped",[53]],[[120798,120798],"mapped",[54]],[[120799,120799],"mapped",[55]],[[120800,120800],"mapped",[56]],[[120801,120801],"mapped",[57]],[[120802,120802],"mapped",[48]],[[120803,120803],"mapped",[49]],[[120804,120804],"mapped",[50]],[[120805,120805],"mapped",[51]],[[120806,120806],"mapped",[52]],[[120807,120807],"mapped",[53]],[[120808,120808],"mapped",[54]],[[120809,120809],"mapped",[55]],[[120810,120810],"mapped",[56]],[[120811,120811],"mapped",[57]],[[120812,120812],"mapped",[48]],[[120813,120813],"mapped",[49]],[[120814,120814],"mapped",[50]],[[120815,120815],"mapped",[51]],[[120816,120816],"mapped",[52]],[[120817,120817],"mapped",[53]],[[120818,120818],"mapped",[54]],[[120819,120819],"mapped",[55]],[[120820,120820],"mapped",[56]],[[120821,120821],"mapped",[57]],[[120822,120822],"mapped",[48]],[[120823,120823],"mapped",[49]],[[120824,120824],"mapped",[50]],[[120825,120825],"mapped",[51]],[[120826,120826],"mapped",[52]],[[120827,120827],"mapped",[53]],[[120828,120828],"mapped",[54]],[[120829,120829],"mapped",[55]],[[120830,120830],"mapped",[56]],[[120831,120831],"mapped",[57]],[[120832,121343],"valid",[],"NV8"],[[121344,121398],"valid"],[[121399,121402],"valid",[],"NV8"],[[121403,121452],"valid"],[[121453,121460],"valid",[],"NV8"],[[121461,121461],"valid"],[[121462,121475],"valid",[],"NV8"],[[121476,121476],"valid"],[[121477,121483],"valid",[],"NV8"],[[121484,121498],"disallowed"],[[121499,121503],"valid"],[[121504,121504],"disallowed"],[[121505,121519],"valid"],[[121520,124927],"disallowed"],[[124928,125124],"valid"],[[125125,125126],"disallowed"],[[125127,125135],"valid",[],"NV8"],[[125136,125142],"valid"],[[125143,126463],"disallowed"],[[126464,126464],"mapped",[1575]],[[126465,126465],"mapped",[1576]],[[126466,126466],"mapped",[1580]],[[126467,126467],"mapped",[1583]],[[126468,126468],"disallowed"],[[126469,126469],"mapped",[1608]],[[126470,126470],"mapped",[1586]],[[126471,126471],"mapped",[1581]],[[126472,126472],"mapped",[1591]],[[126473,126473],"mapped",[1610]],[[126474,126474],"mapped",[1603]],[[126475,126475],"mapped",[1604]],[[126476,126476],"mapped",[1605]],[[126477,126477],"mapped",[1606]],[[126478,126478],"mapped",[1587]],[[126479,126479],"mapped",[1593]],[[126480,126480],"mapped",[1601]],[[126481,126481],"mapped",[1589]],[[126482,126482],"mapped",[1602]],[[126483,126483],"mapped",[1585]],[[126484,126484],"mapped",[1588]],[[126485,126485],"mapped",[1578]],[[126486,126486],"mapped",[1579]],[[126487,126487],"mapped",[1582]],[[126488,126488],"mapped",[1584]],[[126489,126489],"mapped",[1590]],[[126490,126490],"mapped",[1592]],[[126491,126491],"mapped",[1594]],[[126492,126492],"mapped",[1646]],[[126493,126493],"mapped",[1722]],[[126494,126494],"mapped",[1697]],[[126495,126495],"mapped",[1647]],[[126496,126496],"disallowed"],[[126497,126497],"mapped",[1576]],[[126498,126498],"mapped",[1580]],[[126499,126499],"disallowed"],[[126500,126500],"mapped",[1607]],[[126501,126502],"disallowed"],[[126503,126503],"mapped",[1581]],[[126504,126504],"disallowed"],[[126505,126505],"mapped",[1610]],[[126506,126506],"mapped",[1603]],[[126507,126507],"mapped",[1604]],[[126508,126508],"mapped",[1605]],[[126509,126509],"mapped",[1606]],[[126510,126510],"mapped",[1587]],[[126511,126511],"mapped",[1593]],[[126512,126512],"mapped",[1601]],[[126513,126513],"mapped",[1589]],[[126514,126514],"mapped",[1602]],[[126515,126515],"disallowed"],[[126516,126516],"mapped",[1588]],[[126517,126517],"mapped",[1578]],[[126518,126518],"mapped",[1579]],[[126519,126519],"mapped",[1582]],[[126520,126520],"disallowed"],[[126521,126521],"mapped",[1590]],[[126522,126522],"disallowed"],[[126523,126523],"mapped",[1594]],[[126524,126529],"disallowed"],[[126530,126530],"mapped",[1580]],[[126531,126534],"disallowed"],[[126535,126535],"mapped",[1581]],[[126536,126536],"disallowed"],[[126537,126537],"mapped",[1610]],[[126538,126538],"disallowed"],[[126539,126539],"mapped",[1604]],[[126540,126540],"disallowed"],[[126541,126541],"mapped",[1606]],[[126542,126542],"mapped",[1587]],[[126543,126543],"mapped",[1593]],[[126544,126544],"disallowed"],[[126545,126545],"mapped",[1589]],[[126546,126546],"mapped",[1602]],[[126547,126547],"disallowed"],[[126548,126548],"mapped",[1588]],[[126549,126550],"disallowed"],[[126551,126551],"mapped",[1582]],[[126552,126552],"disallowed"],[[126553,126553],"mapped",[1590]],[[126554,126554],"disallowed"],[[126555,126555],"mapped",[1594]],[[126556,126556],"disallowed"],[[126557,126557],"mapped",[1722]],[[126558,126558],"disallowed"],[[126559,126559],"mapped",[1647]],[[126560,126560],"disallowed"],[[126561,126561],"mapped",[1576]],[[126562,126562],"mapped",[1580]],[[126563,126563],"disallowed"],[[126564,126564],"mapped",[1607]],[[126565,126566],"disallowed"],[[126567,126567],"mapped",[1581]],[[126568,126568],"mapped",[1591]],[[126569,126569],"mapped",[1610]],[[126570,126570],"mapped",[1603]],[[126571,126571],"disallowed"],[[126572,126572],"mapped",[1605]],[[126573,126573],"mapped",[1606]],[[126574,126574],"mapped",[1587]],[[126575,126575],"mapped",[1593]],[[126576,126576],"mapped",[1601]],[[126577,126577],"mapped",[1589]],[[126578,126578],"mapped",[1602]],[[126579,126579],"disallowed"],[[126580,126580],"mapped",[1588]],[[126581,126581],"mapped",[1578]],[[126582,126582],"mapped",[1579]],[[126583,126583],"mapped",[1582]],[[126584,126584],"disallowed"],[[126585,126585],"mapped",[1590]],[[126586,126586],"mapped",[1592]],[[126587,126587],"mapped",[1594]],[[126588,126588],"mapped",[1646]],[[126589,126589],"disallowed"],[[126590,126590],"mapped",[1697]],[[126591,126591],"disallowed"],[[126592,126592],"mapped",[1575]],[[126593,126593],"mapped",[1576]],[[126594,126594],"mapped",[1580]],[[126595,126595],"mapped",[1583]],[[126596,126596],"mapped",[1607]],[[126597,126597],"mapped",[1608]],[[126598,126598],"mapped",[1586]],[[126599,126599],"mapped",[1581]],[[126600,126600],"mapped",[1591]],[[126601,126601],"mapped",[1610]],[[126602,126602],"disallowed"],[[126603,126603],"mapped",[1604]],[[126604,126604],"mapped",[1605]],[[126605,126605],"mapped",[1606]],[[126606,126606],"mapped",[1587]],[[126607,126607],"mapped",[1593]],[[126608,126608],"mapped",[1601]],[[126609,126609],"mapped",[1589]],[[126610,126610],"mapped",[1602]],[[126611,126611],"mapped",[1585]],[[126612,126612],"mapped",[1588]],[[126613,126613],"mapped",[1578]],[[126614,126614],"mapped",[1579]],[[126615,126615],"mapped",[1582]],[[126616,126616],"mapped",[1584]],[[126617,126617],"mapped",[1590]],[[126618,126618],"mapped",[1592]],[[126619,126619],"mapped",[1594]],[[126620,126624],"disallowed"],[[126625,126625],"mapped",[1576]],[[126626,126626],"mapped",[1580]],[[126627,126627],"mapped",[1583]],[[126628,126628],"disallowed"],[[126629,126629],"mapped",[1608]],[[126630,126630],"mapped",[1586]],[[126631,126631],"mapped",[1581]],[[126632,126632],"mapped",[1591]],[[126633,126633],"mapped",[1610]],[[126634,126634],"disallowed"],[[126635,126635],"mapped",[1604]],[[126636,126636],"mapped",[1605]],[[126637,126637],"mapped",[1606]],[[126638,126638],"mapped",[1587]],[[126639,126639],"mapped",[1593]],[[126640,126640],"mapped",[1601]],[[126641,126641],"mapped",[1589]],[[126642,126642],"mapped",[1602]],[[126643,126643],"mapped",[1585]],[[126644,126644],"mapped",[1588]],[[126645,126645],"mapped",[1578]],[[126646,126646],"mapped",[1579]],[[126647,126647],"mapped",[1582]],[[126648,126648],"mapped",[1584]],[[126649,126649],"mapped",[1590]],[[126650,126650],"mapped",[1592]],[[126651,126651],"mapped",[1594]],[[126652,126703],"disallowed"],[[126704,126705],"valid",[],"NV8"],[[126706,126975],"disallowed"],[[126976,127019],"valid",[],"NV8"],[[127020,127023],"disallowed"],[[127024,127123],"valid",[],"NV8"],[[127124,127135],"disallowed"],[[127136,127150],"valid",[],"NV8"],[[127151,127152],"disallowed"],[[127153,127166],"valid",[],"NV8"],[[127167,127167],"valid",[],"NV8"],[[127168,127168],"disallowed"],[[127169,127183],"valid",[],"NV8"],[[127184,127184],"disallowed"],[[127185,127199],"valid",[],"NV8"],[[127200,127221],"valid",[],"NV8"],[[127222,127231],"disallowed"],[[127232,127232],"disallowed"],[[127233,127233],"disallowed_STD3_mapped",[48,44]],[[127234,127234],"disallowed_STD3_mapped",[49,44]],[[127235,127235],"disallowed_STD3_mapped",[50,44]],[[127236,127236],"disallowed_STD3_mapped",[51,44]],[[127237,127237],"disallowed_STD3_mapped",[52,44]],[[127238,127238],"disallowed_STD3_mapped",[53,44]],[[127239,127239],"disallowed_STD3_mapped",[54,44]],[[127240,127240],"disallowed_STD3_mapped",[55,44]],[[127241,127241],"disallowed_STD3_mapped",[56,44]],[[127242,127242],"disallowed_STD3_mapped",[57,44]],[[127243,127244],"valid",[],"NV8"],[[127245,127247],"disallowed"],[[127248,127248],"disallowed_STD3_mapped",[40,97,41]],[[127249,127249],"disallowed_STD3_mapped",[40,98,41]],[[127250,127250],"disallowed_STD3_mapped",[40,99,41]],[[127251,127251],"disallowed_STD3_mapped",[40,100,41]],[[127252,127252],"disallowed_STD3_mapped",[40,101,41]],[[127253,127253],"disallowed_STD3_mapped",[40,102,41]],[[127254,127254],"disallowed_STD3_mapped",[40,103,41]],[[127255,127255],"disallowed_STD3_mapped",[40,104,41]],[[127256,127256],"disallowed_STD3_mapped",[40,105,41]],[[127257,127257],"disallowed_STD3_mapped",[40,106,41]],[[127258,127258],"disallowed_STD3_mapped",[40,107,41]],[[127259,127259],"disallowed_STD3_mapped",[40,108,41]],[[127260,127260],"disallowed_STD3_mapped",[40,109,41]],[[127261,127261],"disallowed_STD3_mapped",[40,110,41]],[[127262,127262],"disallowed_STD3_mapped",[40,111,41]],[[127263,127263],"disallowed_STD3_mapped",[40,112,41]],[[127264,127264],"disallowed_STD3_mapped",[40,113,41]],[[127265,127265],"disallowed_STD3_mapped",[40,114,41]],[[127266,127266],"disallowed_STD3_mapped",[40,115,41]],[[127267,127267],"disallowed_STD3_mapped",[40,116,41]],[[127268,127268],"disallowed_STD3_mapped",[40,117,41]],[[127269,127269],"disallowed_STD3_mapped",[40,118,41]],[[127270,127270],"disallowed_STD3_mapped",[40,119,41]],[[127271,127271],"disallowed_STD3_mapped",[40,120,41]],[[127272,127272],"disallowed_STD3_mapped",[40,121,41]],[[127273,127273],"disallowed_STD3_mapped",[40,122,41]],[[127274,127274],"mapped",[12308,115,12309]],[[127275,127275],"mapped",[99]],[[127276,127276],"mapped",[114]],[[127277,127277],"mapped",[99,100]],[[127278,127278],"mapped",[119,122]],[[127279,127279],"disallowed"],[[127280,127280],"mapped",[97]],[[127281,127281],"mapped",[98]],[[127282,127282],"mapped",[99]],[[127283,127283],"mapped",[100]],[[127284,127284],"mapped",[101]],[[127285,127285],"mapped",[102]],[[127286,127286],"mapped",[103]],[[127287,127287],"mapped",[104]],[[127288,127288],"mapped",[105]],[[127289,127289],"mapped",[106]],[[127290,127290],"mapped",[107]],[[127291,127291],"mapped",[108]],[[127292,127292],"mapped",[109]],[[127293,127293],"mapped",[110]],[[127294,127294],"mapped",[111]],[[127295,127295],"mapped",[112]],[[127296,127296],"mapped",[113]],[[127297,127297],"mapped",[114]],[[127298,127298],"mapped",[115]],[[127299,127299],"mapped",[116]],[[127300,127300],"mapped",[117]],[[127301,127301],"mapped",[118]],[[127302,127302],"mapped",[119]],[[127303,127303],"mapped",[120]],[[127304,127304],"mapped",[121]],[[127305,127305],"mapped",[122]],[[127306,127306],"mapped",[104,118]],[[127307,127307],"mapped",[109,118]],[[127308,127308],"mapped",[115,100]],[[127309,127309],"mapped",[115,115]],[[127310,127310],"mapped",[112,112,118]],[[127311,127311],"mapped",[119,99]],[[127312,127318],"valid",[],"NV8"],[[127319,127319],"valid",[],"NV8"],[[127320,127326],"valid",[],"NV8"],[[127327,127327],"valid",[],"NV8"],[[127328,127337],"valid",[],"NV8"],[[127338,127338],"mapped",[109,99]],[[127339,127339],"mapped",[109,100]],[[127340,127343],"disallowed"],[[127344,127352],"valid",[],"NV8"],[[127353,127353],"valid",[],"NV8"],[[127354,127354],"valid",[],"NV8"],[[127355,127356],"valid",[],"NV8"],[[127357,127358],"valid",[],"NV8"],[[127359,127359],"valid",[],"NV8"],[[127360,127369],"valid",[],"NV8"],[[127370,127373],"valid",[],"NV8"],[[127374,127375],"valid",[],"NV8"],[[127376,127376],"mapped",[100,106]],[[127377,127386],"valid",[],"NV8"],[[127387,127461],"disallowed"],[[127462,127487],"valid",[],"NV8"],[[127488,127488],"mapped",[12411,12363]],[[127489,127489],"mapped",[12467,12467]],[[127490,127490],"mapped",[12469]],[[127491,127503],"disallowed"],[[127504,127504],"mapped",[25163]],[[127505,127505],"mapped",[23383]],[[127506,127506],"mapped",[21452]],[[127507,127507],"mapped",[12487]],[[127508,127508],"mapped",[20108]],[[127509,127509],"mapped",[22810]],[[127510,127510],"mapped",[35299]],[[127511,127511],"mapped",[22825]],[[127512,127512],"mapped",[20132]],[[127513,127513],"mapped",[26144]],[[127514,127514],"mapped",[28961]],[[127515,127515],"mapped",[26009]],[[127516,127516],"mapped",[21069]],[[127517,127517],"mapped",[24460]],[[127518,127518],"mapped",[20877]],[[127519,127519],"mapped",[26032]],[[127520,127520],"mapped",[21021]],[[127521,127521],"mapped",[32066]],[[127522,127522],"mapped",[29983]],[[127523,127523],"mapped",[36009]],[[127524,127524],"mapped",[22768]],[[127525,127525],"mapped",[21561]],[[127526,127526],"mapped",[28436]],[[127527,127527],"mapped",[25237]],[[127528,127528],"mapped",[25429]],[[127529,127529],"mapped",[19968]],[[127530,127530],"mapped",[19977]],[[127531,127531],"mapped",[36938]],[[127532,127532],"mapped",[24038]],[[127533,127533],"mapped",[20013]],[[127534,127534],"mapped",[21491]],[[127535,127535],"mapped",[25351]],[[127536,127536],"mapped",[36208]],[[127537,127537],"mapped",[25171]],[[127538,127538],"mapped",[31105]],[[127539,127539],"mapped",[31354]],[[127540,127540],"mapped",[21512]],[[127541,127541],"mapped",[28288]],[[127542,127542],"mapped",[26377]],[[127543,127543],"mapped",[26376]],[[127544,127544],"mapped",[30003]],[[127545,127545],"mapped",[21106]],[[127546,127546],"mapped",[21942]],[[127547,127551],"disallowed"],[[127552,127552],"mapped",[12308,26412,12309]],[[127553,127553],"mapped",[12308,19977,12309]],[[127554,127554],"mapped",[12308,20108,12309]],[[127555,127555],"mapped",[12308,23433,12309]],[[127556,127556],"mapped",[12308,28857,12309]],[[127557,127557],"mapped",[12308,25171,12309]],[[127558,127558],"mapped",[12308,30423,12309]],[[127559,127559],"mapped",[12308,21213,12309]],[[127560,127560],"mapped",[12308,25943,12309]],[[127561,127567],"disallowed"],[[127568,127568],"mapped",[24471]],[[127569,127569],"mapped",[21487]],[[127570,127743],"disallowed"],[[127744,127776],"valid",[],"NV8"],[[127777,127788],"valid",[],"NV8"],[[127789,127791],"valid",[],"NV8"],[[127792,127797],"valid",[],"NV8"],[[127798,127798],"valid",[],"NV8"],[[127799,127868],"valid",[],"NV8"],[[127869,127869],"valid",[],"NV8"],[[127870,127871],"valid",[],"NV8"],[[127872,127891],"valid",[],"NV8"],[[127892,127903],"valid",[],"NV8"],[[127904,127940],"valid",[],"NV8"],[[127941,127941],"valid",[],"NV8"],[[127942,127946],"valid",[],"NV8"],[[127947,127950],"valid",[],"NV8"],[[127951,127955],"valid",[],"NV8"],[[127956,127967],"valid",[],"NV8"],[[127968,127984],"valid",[],"NV8"],[[127985,127991],"valid",[],"NV8"],[[127992,127999],"valid",[],"NV8"],[[128000,128062],"valid",[],"NV8"],[[128063,128063],"valid",[],"NV8"],[[128064,128064],"valid",[],"NV8"],[[128065,128065],"valid",[],"NV8"],[[128066,128247],"valid",[],"NV8"],[[128248,128248],"valid",[],"NV8"],[[128249,128252],"valid",[],"NV8"],[[128253,128254],"valid",[],"NV8"],[[128255,128255],"valid",[],"NV8"],[[128256,128317],"valid",[],"NV8"],[[128318,128319],"valid",[],"NV8"],[[128320,128323],"valid",[],"NV8"],[[128324,128330],"valid",[],"NV8"],[[128331,128335],"valid",[],"NV8"],[[128336,128359],"valid",[],"NV8"],[[128360,128377],"valid",[],"NV8"],[[128378,128378],"disallowed"],[[128379,128419],"valid",[],"NV8"],[[128420,128420],"disallowed"],[[128421,128506],"valid",[],"NV8"],[[128507,128511],"valid",[],"NV8"],[[128512,128512],"valid",[],"NV8"],[[128513,128528],"valid",[],"NV8"],[[128529,128529],"valid",[],"NV8"],[[128530,128532],"valid",[],"NV8"],[[128533,128533],"valid",[],"NV8"],[[128534,128534],"valid",[],"NV8"],[[128535,128535],"valid",[],"NV8"],[[128536,128536],"valid",[],"NV8"],[[128537,128537],"valid",[],"NV8"],[[128538,128538],"valid",[],"NV8"],[[128539,128539],"valid",[],"NV8"],[[128540,128542],"valid",[],"NV8"],[[128543,128543],"valid",[],"NV8"],[[128544,128549],"valid",[],"NV8"],[[128550,128551],"valid",[],"NV8"],[[128552,128555],"valid",[],"NV8"],[[128556,128556],"valid",[],"NV8"],[[128557,128557],"valid",[],"NV8"],[[128558,128559],"valid",[],"NV8"],[[128560,128563],"valid",[],"NV8"],[[128564,128564],"valid",[],"NV8"],[[128565,128576],"valid",[],"NV8"],[[128577,128578],"valid",[],"NV8"],[[128579,128580],"valid",[],"NV8"],[[128581,128591],"valid",[],"NV8"],[[128592,128639],"valid",[],"NV8"],[[128640,128709],"valid",[],"NV8"],[[128710,128719],"valid",[],"NV8"],[[128720,128720],"valid",[],"NV8"],[[128721,128735],"disallowed"],[[128736,128748],"valid",[],"NV8"],[[128749,128751],"disallowed"],[[128752,128755],"valid",[],"NV8"],[[128756,128767],"disallowed"],[[128768,128883],"valid",[],"NV8"],[[128884,128895],"disallowed"],[[128896,128980],"valid",[],"NV8"],[[128981,129023],"disallowed"],[[129024,129035],"valid",[],"NV8"],[[129036,129039],"disallowed"],[[129040,129095],"valid",[],"NV8"],[[129096,129103],"disallowed"],[[129104,129113],"valid",[],"NV8"],[[129114,129119],"disallowed"],[[129120,129159],"valid",[],"NV8"],[[129160,129167],"disallowed"],[[129168,129197],"valid",[],"NV8"],[[129198,129295],"disallowed"],[[129296,129304],"valid",[],"NV8"],[[129305,129407],"disallowed"],[[129408,129412],"valid",[],"NV8"],[[129413,129471],"disallowed"],[[129472,129472],"valid",[],"NV8"],[[129473,131069],"disallowed"],[[131070,131071],"disallowed"],[[131072,173782],"valid"],[[173783,173823],"disallowed"],[[173824,177972],"valid"],[[177973,177983],"disallowed"],[[177984,178205],"valid"],[[178206,178207],"disallowed"],[[178208,183969],"valid"],[[183970,194559],"disallowed"],[[194560,194560],"mapped",[20029]],[[194561,194561],"mapped",[20024]],[[194562,194562],"mapped",[20033]],[[194563,194563],"mapped",[131362]],[[194564,194564],"mapped",[20320]],[[194565,194565],"mapped",[20398]],[[194566,194566],"mapped",[20411]],[[194567,194567],"mapped",[20482]],[[194568,194568],"mapped",[20602]],[[194569,194569],"mapped",[20633]],[[194570,194570],"mapped",[20711]],[[194571,194571],"mapped",[20687]],[[194572,194572],"mapped",[13470]],[[194573,194573],"mapped",[132666]],[[194574,194574],"mapped",[20813]],[[194575,194575],"mapped",[20820]],[[194576,194576],"mapped",[20836]],[[194577,194577],"mapped",[20855]],[[194578,194578],"mapped",[132380]],[[194579,194579],"mapped",[13497]],[[194580,194580],"mapped",[20839]],[[194581,194581],"mapped",[20877]],[[194582,194582],"mapped",[132427]],[[194583,194583],"mapped",[20887]],[[194584,194584],"mapped",[20900]],[[194585,194585],"mapped",[20172]],[[194586,194586],"mapped",[20908]],[[194587,194587],"mapped",[20917]],[[194588,194588],"mapped",[168415]],[[194589,194589],"mapped",[20981]],[[194590,194590],"mapped",[20995]],[[194591,194591],"mapped",[13535]],[[194592,194592],"mapped",[21051]],[[194593,194593],"mapped",[21062]],[[194594,194594],"mapped",[21106]],[[194595,194595],"mapped",[21111]],[[194596,194596],"mapped",[13589]],[[194597,194597],"mapped",[21191]],[[194598,194598],"mapped",[21193]],[[194599,194599],"mapped",[21220]],[[194600,194600],"mapped",[21242]],[[194601,194601],"mapped",[21253]],[[194602,194602],"mapped",[21254]],[[194603,194603],"mapped",[21271]],[[194604,194604],"mapped",[21321]],[[194605,194605],"mapped",[21329]],[[194606,194606],"mapped",[21338]],[[194607,194607],"mapped",[21363]],[[194608,194608],"mapped",[21373]],[[194609,194611],"mapped",[21375]],[[194612,194612],"mapped",[133676]],[[194613,194613],"mapped",[28784]],[[194614,194614],"mapped",[21450]],[[194615,194615],"mapped",[21471]],[[194616,194616],"mapped",[133987]],[[194617,194617],"mapped",[21483]],[[194618,194618],"mapped",[21489]],[[194619,194619],"mapped",[21510]],[[194620,194620],"mapped",[21662]],[[194621,194621],"mapped",[21560]],[[194622,194622],"mapped",[21576]],[[194623,194623],"mapped",[21608]],[[194624,194624],"mapped",[21666]],[[194625,194625],"mapped",[21750]],[[194626,194626],"mapped",[21776]],[[194627,194627],"mapped",[21843]],[[194628,194628],"mapped",[21859]],[[194629,194630],"mapped",[21892]],[[194631,194631],"mapped",[21913]],[[194632,194632],"mapped",[21931]],[[194633,194633],"mapped",[21939]],[[194634,194634],"mapped",[21954]],[[194635,194635],"mapped",[22294]],[[194636,194636],"mapped",[22022]],[[194637,194637],"mapped",[22295]],[[194638,194638],"mapped",[22097]],[[194639,194639],"mapped",[22132]],[[194640,194640],"mapped",[20999]],[[194641,194641],"mapped",[22766]],[[194642,194642],"mapped",[22478]],[[194643,194643],"mapped",[22516]],[[194644,194644],"mapped",[22541]],[[194645,194645],"mapped",[22411]],[[194646,194646],"mapped",[22578]],[[194647,194647],"mapped",[22577]],[[194648,194648],"mapped",[22700]],[[194649,194649],"mapped",[136420]],[[194650,194650],"mapped",[22770]],[[194651,194651],"mapped",[22775]],[[194652,194652],"mapped",[22790]],[[194653,194653],"mapped",[22810]],[[194654,194654],"mapped",[22818]],[[194655,194655],"mapped",[22882]],[[194656,194656],"mapped",[136872]],[[194657,194657],"mapped",[136938]],[[194658,194658],"mapped",[23020]],[[194659,194659],"mapped",[23067]],[[194660,194660],"mapped",[23079]],[[194661,194661],"mapped",[23000]],[[194662,194662],"mapped",[23142]],[[194663,194663],"mapped",[14062]],[[194664,194664],"disallowed"],[[194665,194665],"mapped",[23304]],[[194666,194667],"mapped",[23358]],[[194668,194668],"mapped",[137672]],[[194669,194669],"mapped",[23491]],[[194670,194670],"mapped",[23512]],[[194671,194671],"mapped",[23527]],[[194672,194672],"mapped",[23539]],[[194673,194673],"mapped",[138008]],[[194674,194674],"mapped",[23551]],[[194675,194675],"mapped",[23558]],[[194676,194676],"disallowed"],[[194677,194677],"mapped",[23586]],[[194678,194678],"mapped",[14209]],[[194679,194679],"mapped",[23648]],[[194680,194680],"mapped",[23662]],[[194681,194681],"mapped",[23744]],[[194682,194682],"mapped",[23693]],[[194683,194683],"mapped",[138724]],[[194684,194684],"mapped",[23875]],[[194685,194685],"mapped",[138726]],[[194686,194686],"mapped",[23918]],[[194687,194687],"mapped",[23915]],[[194688,194688],"mapped",[23932]],[[194689,194689],"mapped",[24033]],[[194690,194690],"mapped",[24034]],[[194691,194691],"mapped",[14383]],[[194692,194692],"mapped",[24061]],[[194693,194693],"mapped",[24104]],[[194694,194694],"mapped",[24125]],[[194695,194695],"mapped",[24169]],[[194696,194696],"mapped",[14434]],[[194697,194697],"mapped",[139651]],[[194698,194698],"mapped",[14460]],[[194699,194699],"mapped",[24240]],[[194700,194700],"mapped",[24243]],[[194701,194701],"mapped",[24246]],[[194702,194702],"mapped",[24266]],[[194703,194703],"mapped",[172946]],[[194704,194704],"mapped",[24318]],[[194705,194706],"mapped",[140081]],[[194707,194707],"mapped",[33281]],[[194708,194709],"mapped",[24354]],[[194710,194710],"mapped",[14535]],[[194711,194711],"mapped",[144056]],[[194712,194712],"mapped",[156122]],[[194713,194713],"mapped",[24418]],[[194714,194714],"mapped",[24427]],[[194715,194715],"mapped",[14563]],[[194716,194716],"mapped",[24474]],[[194717,194717],"mapped",[24525]],[[194718,194718],"mapped",[24535]],[[194719,194719],"mapped",[24569]],[[194720,194720],"mapped",[24705]],[[194721,194721],"mapped",[14650]],[[194722,194722],"mapped",[14620]],[[194723,194723],"mapped",[24724]],[[194724,194724],"mapped",[141012]],[[194725,194725],"mapped",[24775]],[[194726,194726],"mapped",[24904]],[[194727,194727],"mapped",[24908]],[[194728,194728],"mapped",[24910]],[[194729,194729],"mapped",[24908]],[[194730,194730],"mapped",[24954]],[[194731,194731],"mapped",[24974]],[[194732,194732],"mapped",[25010]],[[194733,194733],"mapped",[24996]],[[194734,194734],"mapped",[25007]],[[194735,194735],"mapped",[25054]],[[194736,194736],"mapped",[25074]],[[194737,194737],"mapped",[25078]],[[194738,194738],"mapped",[25104]],[[194739,194739],"mapped",[25115]],[[194740,194740],"mapped",[25181]],[[194741,194741],"mapped",[25265]],[[194742,194742],"mapped",[25300]],[[194743,194743],"mapped",[25424]],[[194744,194744],"mapped",[142092]],[[194745,194745],"mapped",[25405]],[[194746,194746],"mapped",[25340]],[[194747,194747],"mapped",[25448]],[[194748,194748],"mapped",[25475]],[[194749,194749],"mapped",[25572]],[[194750,194750],"mapped",[142321]],[[194751,194751],"mapped",[25634]],[[194752,194752],"mapped",[25541]],[[194753,194753],"mapped",[25513]],[[194754,194754],"mapped",[14894]],[[194755,194755],"mapped",[25705]],[[194756,194756],"mapped",[25726]],[[194757,194757],"mapped",[25757]],[[194758,194758],"mapped",[25719]],[[194759,194759],"mapped",[14956]],[[194760,194760],"mapped",[25935]],[[194761,194761],"mapped",[25964]],[[194762,194762],"mapped",[143370]],[[194763,194763],"mapped",[26083]],[[194764,194764],"mapped",[26360]],[[194765,194765],"mapped",[26185]],[[194766,194766],"mapped",[15129]],[[194767,194767],"mapped",[26257]],[[194768,194768],"mapped",[15112]],[[194769,194769],"mapped",[15076]],[[194770,194770],"mapped",[20882]],[[194771,194771],"mapped",[20885]],[[194772,194772],"mapped",[26368]],[[194773,194773],"mapped",[26268]],[[194774,194774],"mapped",[32941]],[[194775,194775],"mapped",[17369]],[[194776,194776],"mapped",[26391]],[[194777,194777],"mapped",[26395]],[[194778,194778],"mapped",[26401]],[[194779,194779],"mapped",[26462]],[[194780,194780],"mapped",[26451]],[[194781,194781],"mapped",[144323]],[[194782,194782],"mapped",[15177]],[[194783,194783],"mapped",[26618]],[[194784,194784],"mapped",[26501]],[[194785,194785],"mapped",[26706]],[[194786,194786],"mapped",[26757]],[[194787,194787],"mapped",[144493]],[[194788,194788],"mapped",[26766]],[[194789,194789],"mapped",[26655]],[[194790,194790],"mapped",[26900]],[[194791,194791],"mapped",[15261]],[[194792,194792],"mapped",[26946]],[[194793,194793],"mapped",[27043]],[[194794,194794],"mapped",[27114]],[[194795,194795],"mapped",[27304]],[[194796,194796],"mapped",[145059]],[[194797,194797],"mapped",[27355]],[[194798,194798],"mapped",[15384]],[[194799,194799],"mapped",[27425]],[[194800,194800],"mapped",[145575]],[[194801,194801],"mapped",[27476]],[[194802,194802],"mapped",[15438]],[[194803,194803],"mapped",[27506]],[[194804,194804],"mapped",[27551]],[[194805,194805],"mapped",[27578]],[[194806,194806],"mapped",[27579]],[[194807,194807],"mapped",[146061]],[[194808,194808],"mapped",[138507]],[[194809,194809],"mapped",[146170]],[[194810,194810],"mapped",[27726]],[[194811,194811],"mapped",[146620]],[[194812,194812],"mapped",[27839]],[[194813,194813],"mapped",[27853]],[[194814,194814],"mapped",[27751]],[[194815,194815],"mapped",[27926]],[[194816,194816],"mapped",[27966]],[[194817,194817],"mapped",[28023]],[[194818,194818],"mapped",[27969]],[[194819,194819],"mapped",[28009]],[[194820,194820],"mapped",[28024]],[[194821,194821],"mapped",[28037]],[[194822,194822],"mapped",[146718]],[[194823,194823],"mapped",[27956]],[[194824,194824],"mapped",[28207]],[[194825,194825],"mapped",[28270]],[[194826,194826],"mapped",[15667]],[[194827,194827],"mapped",[28363]],[[194828,194828],"mapped",[28359]],[[194829,194829],"mapped",[147153]],[[194830,194830],"mapped",[28153]],[[194831,194831],"mapped",[28526]],[[194832,194832],"mapped",[147294]],[[194833,194833],"mapped",[147342]],[[194834,194834],"mapped",[28614]],[[194835,194835],"mapped",[28729]],[[194836,194836],"mapped",[28702]],[[194837,194837],"mapped",[28699]],[[194838,194838],"mapped",[15766]],[[194839,194839],"mapped",[28746]],[[194840,194840],"mapped",[28797]],[[194841,194841],"mapped",[28791]],[[194842,194842],"mapped",[28845]],[[194843,194843],"mapped",[132389]],[[194844,194844],"mapped",[28997]],[[194845,194845],"mapped",[148067]],[[194846,194846],"mapped",[29084]],[[194847,194847],"disallowed"],[[194848,194848],"mapped",[29224]],[[194849,194849],"mapped",[29237]],[[194850,194850],"mapped",[29264]],[[194851,194851],"mapped",[149000]],[[194852,194852],"mapped",[29312]],[[194853,194853],"mapped",[29333]],[[194854,194854],"mapped",[149301]],[[194855,194855],"mapped",[149524]],[[194856,194856],"mapped",[29562]],[[194857,194857],"mapped",[29579]],[[194858,194858],"mapped",[16044]],[[194859,194859],"mapped",[29605]],[[194860,194861],"mapped",[16056]],[[194862,194862],"mapped",[29767]],[[194863,194863],"mapped",[29788]],[[194864,194864],"mapped",[29809]],[[194865,194865],"mapped",[29829]],[[194866,194866],"mapped",[29898]],[[194867,194867],"mapped",[16155]],[[194868,194868],"mapped",[29988]],[[194869,194869],"mapped",[150582]],[[194870,194870],"mapped",[30014]],[[194871,194871],"mapped",[150674]],[[194872,194872],"mapped",[30064]],[[194873,194873],"mapped",[139679]],[[194874,194874],"mapped",[30224]],[[194875,194875],"mapped",[151457]],[[194876,194876],"mapped",[151480]],[[194877,194877],"mapped",[151620]],[[194878,194878],"mapped",[16380]],[[194879,194879],"mapped",[16392]],[[194880,194880],"mapped",[30452]],[[194881,194881],"mapped",[151795]],[[194882,194882],"mapped",[151794]],[[194883,194883],"mapped",[151833]],[[194884,194884],"mapped",[151859]],[[194885,194885],"mapped",[30494]],[[194886,194887],"mapped",[30495]],[[194888,194888],"mapped",[30538]],[[194889,194889],"mapped",[16441]],[[194890,194890],"mapped",[30603]],[[194891,194891],"mapped",[16454]],[[194892,194892],"mapped",[16534]],[[194893,194893],"mapped",[152605]],[[194894,194894],"mapped",[30798]],[[194895,194895],"mapped",[30860]],[[194896,194896],"mapped",[30924]],[[194897,194897],"mapped",[16611]],[[194898,194898],"mapped",[153126]],[[194899,194899],"mapped",[31062]],[[194900,194900],"mapped",[153242]],[[194901,194901],"mapped",[153285]],[[194902,194902],"mapped",[31119]],[[194903,194903],"mapped",[31211]],[[194904,194904],"mapped",[16687]],[[194905,194905],"mapped",[31296]],[[194906,194906],"mapped",[31306]],[[194907,194907],"mapped",[31311]],[[194908,194908],"mapped",[153980]],[[194909,194910],"mapped",[154279]],[[194911,194911],"disallowed"],[[194912,194912],"mapped",[16898]],[[194913,194913],"mapped",[154539]],[[194914,194914],"mapped",[31686]],[[194915,194915],"mapped",[31689]],[[194916,194916],"mapped",[16935]],[[194917,194917],"mapped",[154752]],[[194918,194918],"mapped",[31954]],[[194919,194919],"mapped",[17056]],[[194920,194920],"mapped",[31976]],[[194921,194921],"mapped",[31971]],[[194922,194922],"mapped",[32000]],[[194923,194923],"mapped",[155526]],[[194924,194924],"mapped",[32099]],[[194925,194925],"mapped",[17153]],[[194926,194926],"mapped",[32199]],[[194927,194927],"mapped",[32258]],[[194928,194928],"mapped",[32325]],[[194929,194929],"mapped",[17204]],[[194930,194930],"mapped",[156200]],[[194931,194931],"mapped",[156231]],[[194932,194932],"mapped",[17241]],[[194933,194933],"mapped",[156377]],[[194934,194934],"mapped",[32634]],[[194935,194935],"mapped",[156478]],[[194936,194936],"mapped",[32661]],[[194937,194937],"mapped",[32762]],[[194938,194938],"mapped",[32773]],[[194939,194939],"mapped",[156890]],[[194940,194940],"mapped",[156963]],[[194941,194941],"mapped",[32864]],[[194942,194942],"mapped",[157096]],[[194943,194943],"mapped",[32880]],[[194944,194944],"mapped",[144223]],[[194945,194945],"mapped",[17365]],[[194946,194946],"mapped",[32946]],[[194947,194947],"mapped",[33027]],[[194948,194948],"mapped",[17419]],[[194949,194949],"mapped",[33086]],[[194950,194950],"mapped",[23221]],[[194951,194951],"mapped",[157607]],[[194952,194952],"mapped",[157621]],[[194953,194953],"mapped",[144275]],[[194954,194954],"mapped",[144284]],[[194955,194955],"mapped",[33281]],[[194956,194956],"mapped",[33284]],[[194957,194957],"mapped",[36766]],[[194958,194958],"mapped",[17515]],[[194959,194959],"mapped",[33425]],[[194960,194960],"mapped",[33419]],[[194961,194961],"mapped",[33437]],[[194962,194962],"mapped",[21171]],[[194963,194963],"mapped",[33457]],[[194964,194964],"mapped",[33459]],[[194965,194965],"mapped",[33469]],[[194966,194966],"mapped",[33510]],[[194967,194967],"mapped",[158524]],[[194968,194968],"mapped",[33509]],[[194969,194969],"mapped",[33565]],[[194970,194970],"mapped",[33635]],[[194971,194971],"mapped",[33709]],[[194972,194972],"mapped",[33571]],[[194973,194973],"mapped",[33725]],[[194974,194974],"mapped",[33767]],[[194975,194975],"mapped",[33879]],[[194976,194976],"mapped",[33619]],[[194977,194977],"mapped",[33738]],[[194978,194978],"mapped",[33740]],[[194979,194979],"mapped",[33756]],[[194980,194980],"mapped",[158774]],[[194981,194981],"mapped",[159083]],[[194982,194982],"mapped",[158933]],[[194983,194983],"mapped",[17707]],[[194984,194984],"mapped",[34033]],[[194985,194985],"mapped",[34035]],[[194986,194986],"mapped",[34070]],[[194987,194987],"mapped",[160714]],[[194988,194988],"mapped",[34148]],[[194989,194989],"mapped",[159532]],[[194990,194990],"mapped",[17757]],[[194991,194991],"mapped",[17761]],[[194992,194992],"mapped",[159665]],[[194993,194993],"mapped",[159954]],[[194994,194994],"mapped",[17771]],[[194995,194995],"mapped",[34384]],[[194996,194996],"mapped",[34396]],[[194997,194997],"mapped",[34407]],[[194998,194998],"mapped",[34409]],[[194999,194999],"mapped",[34473]],[[195000,195000],"mapped",[34440]],[[195001,195001],"mapped",[34574]],[[195002,195002],"mapped",[34530]],[[195003,195003],"mapped",[34681]],[[195004,195004],"mapped",[34600]],[[195005,195005],"mapped",[34667]],[[195006,195006],"mapped",[34694]],[[195007,195007],"disallowed"],[[195008,195008],"mapped",[34785]],[[195009,195009],"mapped",[34817]],[[195010,195010],"mapped",[17913]],[[195011,195011],"mapped",[34912]],[[195012,195012],"mapped",[34915]],[[195013,195013],"mapped",[161383]],[[195014,195014],"mapped",[35031]],[[195015,195015],"mapped",[35038]],[[195016,195016],"mapped",[17973]],[[195017,195017],"mapped",[35066]],[[195018,195018],"mapped",[13499]],[[195019,195019],"mapped",[161966]],[[195020,195020],"mapped",[162150]],[[195021,195021],"mapped",[18110]],[[195022,195022],"mapped",[18119]],[[195023,195023],"mapped",[35488]],[[195024,195024],"mapped",[35565]],[[195025,195025],"mapped",[35722]],[[195026,195026],"mapped",[35925]],[[195027,195027],"mapped",[162984]],[[195028,195028],"mapped",[36011]],[[195029,195029],"mapped",[36033]],[[195030,195030],"mapped",[36123]],[[195031,195031],"mapped",[36215]],[[195032,195032],"mapped",[163631]],[[195033,195033],"mapped",[133124]],[[195034,195034],"mapped",[36299]],[[195035,195035],"mapped",[36284]],[[195036,195036],"mapped",[36336]],[[195037,195037],"mapped",[133342]],[[195038,195038],"mapped",[36564]],[[195039,195039],"mapped",[36664]],[[195040,195040],"mapped",[165330]],[[195041,195041],"mapped",[165357]],[[195042,195042],"mapped",[37012]],[[195043,195043],"mapped",[37105]],[[195044,195044],"mapped",[37137]],[[195045,195045],"mapped",[165678]],[[195046,195046],"mapped",[37147]],[[195047,195047],"mapped",[37432]],[[195048,195048],"mapped",[37591]],[[195049,195049],"mapped",[37592]],[[195050,195050],"mapped",[37500]],[[195051,195051],"mapped",[37881]],[[195052,195052],"mapped",[37909]],[[195053,195053],"mapped",[166906]],[[195054,195054],"mapped",[38283]],[[195055,195055],"mapped",[18837]],[[195056,195056],"mapped",[38327]],[[195057,195057],"mapped",[167287]],[[195058,195058],"mapped",[18918]],[[195059,195059],"mapped",[38595]],[[195060,195060],"mapped",[23986]],[[195061,195061],"mapped",[38691]],[[195062,195062],"mapped",[168261]],[[195063,195063],"mapped",[168474]],[[195064,195064],"mapped",[19054]],[[195065,195065],"mapped",[19062]],[[195066,195066],"mapped",[38880]],[[195067,195067],"mapped",[168970]],[[195068,195068],"mapped",[19122]],[[195069,195069],"mapped",[169110]],[[195070,195071],"mapped",[38923]],[[195072,195072],"mapped",[38953]],[[195073,195073],"mapped",[169398]],[[195074,195074],"mapped",[39138]],[[195075,195075],"mapped",[19251]],[[195076,195076],"mapped",[39209]],[[195077,195077],"mapped",[39335]],[[195078,195078],"mapped",[39362]],[[195079,195079],"mapped",[39422]],[[195080,195080],"mapped",[19406]],[[195081,195081],"mapped",[170800]],[[195082,195082],"mapped",[39698]],[[195083,195083],"mapped",[40000]],[[195084,195084],"mapped",[40189]],[[195085,195085],"mapped",[19662]],[[195086,195086],"mapped",[19693]],[[195087,195087],"mapped",[40295]],[[195088,195088],"mapped",[172238]],[[195089,195089],"mapped",[19704]],[[195090,195090],"mapped",[172293]],[[195091,195091],"mapped",[172558]],[[195092,195092],"mapped",[172689]],[[195093,195093],"mapped",[40635]],[[195094,195094],"mapped",[19798]],[[195095,195095],"mapped",[40697]],[[195096,195096],"mapped",[40702]],[[195097,195097],"mapped",[40709]],[[195098,195098],"mapped",[40719]],[[195099,195099],"mapped",[40726]],[[195100,195100],"mapped",[40763]],[[195101,195101],"mapped",[173568]],[[195102,196605],"disallowed"],[[196606,196607],"disallowed"],[[196608,262141],"disallowed"],[[262142,262143],"disallowed"],[[262144,327677],"disallowed"],[[327678,327679],"disallowed"],[[327680,393213],"disallowed"],[[393214,393215],"disallowed"],[[393216,458749],"disallowed"],[[458750,458751],"disallowed"],[[458752,524285],"disallowed"],[[524286,524287],"disallowed"],[[524288,589821],"disallowed"],[[589822,589823],"disallowed"],[[589824,655357],"disallowed"],[[655358,655359],"disallowed"],[[655360,720893],"disallowed"],[[720894,720895],"disallowed"],[[720896,786429],"disallowed"],[[786430,786431],"disallowed"],[[786432,851965],"disallowed"],[[851966,851967],"disallowed"],[[851968,917501],"disallowed"],[[917502,917503],"disallowed"],[[917504,917504],"disallowed"],[[917505,917505],"disallowed"],[[917506,917535],"disallowed"],[[917536,917631],"disallowed"],[[917632,917759],"disallowed"],[[917760,917999],"ignored"],[[918000,983037],"disallowed"],[[983038,983039],"disallowed"],[[983040,1048573],"disallowed"],[[1048574,1048575],"disallowed"],[[1048576,1114109],"disallowed"],[[1114110,1114111],"disallowed"]]',
      );
    },
  });
