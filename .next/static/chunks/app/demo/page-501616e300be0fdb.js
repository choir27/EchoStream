(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [298],
  {
    4044: function (e, s, l) {
      Promise.resolve().then(l.bind(l, 9588));
    },
    9588: function (e, s, l) {
      "use strict";
      l.r(s);
      var a = l(7437),
        i = l(2265);
      l(8574), l(860);
      var n = l(4033),
        t = l(2943),
        r = l(8676),
        c = l(1836),
        u = l(4946),
        o = l(108),
        d = l(2651);
      s.default = (0, u.Z)(() => {
        let { push: e } = (0, n.useRouter)(),
          s = (0, o.o)((e) => e.searchDisplay),
          l = (0, o.o)((e) => e.setSearchDisplay);
        return (
          (0, i.useEffect)(() => {
            l(!1);
          }, []),
          (0, a.jsx)(a.Fragment, {
            children: s
              ? (0, a.jsx)(d.default, {})
              : (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsx)(t.Z, {}),
                    (0, a.jsxs)("section", {
                      id: "auth",
                      className: "main",
                      children: [
                        (0, a.jsx)("h1", { children: "Login Demo" }),
                        (0, a.jsxs)("form", {
                          className: "flex column alignStart",
                          method: "POST",
                          action: "#",
                          id: "login",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "flex column",
                              children: [
                                (0, a.jsx)("label", { children: "Email" }),
                                (0, a.jsx)("input", {
                                  type: "text",
                                  name: "email",
                                  value: "bobThebuilder@gmail.com",
                                  disabled: !0,
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className: "flex column",
                              children: [
                                (0, a.jsx)("label", { children: "Password" }),
                                (0, a.jsx)("input", {
                                  type: "password",
                                  name: "password",
                                  value: "bobTheBuilder@123456",
                                  disabled: !0,
                                }),
                              ],
                            }),
                            (0, a.jsx)("input", {
                              className: "button",
                              type: "submit",
                              value: "Login Here",
                              onClick: (s) => {
                                s.preventDefault(),
                                  (0, c.j)(
                                    "bobThebuilder@gmail.com",
                                    "bobTheBuilder@123456",
                                    e,
                                  );
                              },
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(r.Z, {}),
                  ],
                }),
          })
        );
      });
    },
  },
  function (e) {
    e.O(0, [650, 184, 990, 971, 472, 744], function () {
      return e((e.s = 4044));
    }),
      (_N_E = e.O());
  },
]);
