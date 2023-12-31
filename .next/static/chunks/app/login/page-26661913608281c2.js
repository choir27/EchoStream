(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [626],
  {
    5032: function (e, s, a) {
      Promise.resolve().then(a.bind(a, 8123));
    },
    8123: function (e, s, a) {
      "use strict";
      a.r(s);
      var t = a(7437),
        l = a(2265),
        n = a(4033);
      a(8574), a(860);
      var i = a(2943),
        r = a(8676),
        c = a(6908),
        u = a(1836),
        o = a(4946),
        d = a(2651),
        h = a(108);
      let x = /^[a-zA-Z]*$/,
        m = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
        j =
          /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
      s.default = (0, o.Z)(() => {
        let [e, s] = (0, l.useState)(""),
          [a, o] = (0, l.useState)(!1),
          [p, g] = (0, l.useState)(""),
          [v, f] = (0, l.useState)(!1),
          [N, b] = (0, l.useState)(""),
          [w, y] = (0, l.useState)(!1),
          [C, S] = (0, l.useState)(!1),
          k = (0, h.o)((e) => e.searchDisplay),
          Z = (0, h.o)((e) => e.setSearchDisplay);
        (0, l.useEffect)(() => {
          Z(!1);
        }, []);
        let A = (0, t.jsx)("i", { className: "fa-solid fa-check" }),
          E = (0, t.jsx)("i", { className: "fa-solid fa-xmark" }),
          { push: z } = (0, n.useRouter)();
        return (0, t.jsx)(t.Fragment, {
          children: k
            ? (0, t.jsx)(d.default, {})
            : C
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(i.Z, {}),
                    (0, t.jsxs)("section", {
                      id: "auth",
                      className: "main",
                      children: [
                        (0, t.jsx)("h1", { children: "Login" }),
                        (0, t.jsxs)("form", {
                          className: "flex column alignStart",
                          method: "POST",
                          action: "#",
                          id: "login",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "flex column",
                              children: [
                                (0, t.jsx)("label", { children: "Email" }),
                                (0, t.jsx)("input", {
                                  placeholder: "Put your email here",
                                  type: "text",
                                  name: "email",
                                  value: p,
                                  onChange: (e) => g(e.target.value),
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex column",
                              children: [
                                (0, t.jsx)("label", { children: "Password" }),
                                (0, t.jsx)("input", {
                                  placeholder: "Put your password here",
                                  type: "password",
                                  name: "password",
                                  value: N,
                                  onChange: (e) => b(e.target.value),
                                }),
                              ],
                            }),
                            (0, t.jsx)("input", {
                              className: "button",
                              type: "submit",
                              value: "Login Here",
                              onClick: (e) => {
                                e.preventDefault(), (0, u.j)(p, N, z);
                              },
                            }),
                            (0, t.jsxs)("section", {
                              className:
                                "existingAccount flex column alignStart",
                              children: [
                                (0, t.jsx)("h2", {
                                  children:
                                    "Don't have an account?  Register below:",
                                }),
                                (0, t.jsx)(c.z, {
                                  className: "button",
                                  text: "Register Here",
                                  onClick: (e) => S(!C),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)(r.Z, {}),
                  ],
                })
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(i.Z, {}),
                    (0, t.jsxs)("section", {
                      id: "auth",
                      className: "main",
                      children: [
                        (0, t.jsx)("h1", { children: "Register Account" }),
                        (0, t.jsxs)("section", {
                          className: "authContainer",
                          children: [
                            (0, t.jsxs)("form", {
                              children: [
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsxs)("label", {
                                      children: [" Name ", e && a ? A : E],
                                    }),
                                    (0, t.jsx)("input", {
                                      type: "text",
                                      name: "name",
                                      value: e,
                                      placeholder: "Enter your name",
                                      onChange: (e) => {
                                        s(e.target.value),
                                          o(x.test(e.target.value));
                                      },
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsxs)("label", {
                                      children: ["Email", v && p ? A : E],
                                    }),
                                    (0, t.jsx)("input", {
                                      type: "email",
                                      name: "email",
                                      value: p,
                                      placeholder: "Enter your email",
                                      onChange: (e) => {
                                        g(e.target.value),
                                          f(j.test(e.target.value));
                                      },
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsxs)("label", {
                                      children: ["Password", w && N ? A : E],
                                    }),
                                    (0, t.jsx)("input", {
                                      type: "password",
                                      name: "password",
                                      value: N,
                                      placeholder: "Confirm password",
                                      onChange: (e) => {
                                        b(e.target.value),
                                          y(m.test(e.target.value));
                                      },
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("input", {
                                  className: "button",
                                  type: "submit",
                                  value: "Register Here",
                                  onClick: (s) => {
                                    s.preventDefault(), (0, u.f)(p, N, e, z);
                                  },
                                  disabled: !v || !a || !w,
                                }),
                              ],
                            }),
                            (0, t.jsxs)("section", {
                              className:
                                "existingAccount flex column alignItems",
                              children: [
                                (0, t.jsx)("h2", {
                                  children:
                                    "Already have an account?  Login below:",
                                }),
                                (0, t.jsx)(c.z, {
                                  className: "button",
                                  text: "Login Here",
                                  onClick: () => S(!C),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)(r.Z, {}),
                  ],
                }),
        });
      });
    },
  },
  function (e) {
    e.O(0, [650, 184, 990, 971, 472, 744], function () {
      return e((e.s = 5032));
    }),
      (_N_E = e.O());
  },
]);
