"use strict";(self.webpackChunkechoverse=self.webpackChunkechoverse||[]).push([[522],{7121:function(e,n,t){t.d(n,{Z:function(){return r}});t(2791);var a=t(184);function r(){return(0,a.jsx)("footer",{className:"flex",children:(0,a.jsxs)("nav",{className:"flex",children:[(0,a.jsxs)("ul",{className:"flex icons",children:[(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://twitter.com/choir241",className:"fa-brands fa-twitter",children:(0,a.jsx)("p",{className:"hidden",children:"Twitter"})})}),(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.linkedin.com/in/richard-choir/",className:"fa-brands fa-linkedin",children:(0,a.jsx)("p",{className:"hidden",children:"LinkedIn"})})}),(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.instagram.com/225kh_drw/?hl=en",className:"fa-brands fa-instagram",children:(0,a.jsx)("p",{className:"hidden",children:"Instagram"})})}),(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://github.com/choir27",className:"fa-brands fa-github",children:(0,a.jsx)("p",{className:"hidden",children:"Github"})})})]}),(0,a.jsx)("small",{children:"EchoVerse \xa9 2023. All rights are reserved"})]})})}},541:function(e,n,t){t.d(n,{Z:function(){return c}});var a=t(2791),r=t(1087),s=t(7689),l=t(184);function c(e){var n=(0,s.s0)(),t=(0,a.useCallback)((function(e){e.preventDefault(),localStorage.removeItem("auth"),n("/"),localStorage.getItem("auth")||window.location.reload()}),[n]);return(0,a.useMemo)((function(){localStorage.getItem("auth")?e.setToggleNav(!0):e.setToggleNav(!1)}),[e]),(0,l.jsx)(l.Fragment,{children:localStorage.getItem("auth")?(0,l.jsxs)("header",{id:e.id,className:"flex column",children:[e.toggleClose?(0,l.jsx)("i",{className:"fa-solid fa-x fa-2xl",id:"close",onClick:function(){e.setToggleClose(!1),e.setToggleNav(!0)}}):"",(0,l.jsx)("div",{children:(0,l.jsx)(r.rU,{to:"/",children:(0,l.jsx)("h1",{children:"EchoVerse"})})}),(0,l.jsx)("nav",{id:e.idName,className:"flex column",children:(0,l.jsxs)("ul",{className:"flex navBar",children:[(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/about",children:"About"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/account",children:"Account"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/addAudio",children:"Add Audio"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/",onClick:function(e){return t(e)},children:"Logout"})})]})})]}):(0,l.jsxs)("header",{id:e.id,className:"flex column",children:[e.toggleClose?(0,l.jsx)("i",{className:"fa-solid fa-x fa-2xl",id:"close",onClick:function(){e.setToggleClose(!e.toggleClose),e.setToggleNav(!e.toggleNav)}}):"",(0,l.jsx)("div",{children:(0,l.jsx)(r.rU,{to:"/",children:(0,l.jsx)("h1",{children:"EchoVerse"})})}),(0,l.jsx)("nav",{id:e.idName,className:"flex column",children:(0,l.jsxs)("ul",{className:"flex navBar",children:[(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/about",children:"About"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/demo",children:"Demo"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{to:"/auth",children:"Register/Login"})})]})})]})})}},8954:function(e,n,t){var a=t(9439),r=t(2791),s=t(541),l=t(184);n.Z=function(){var e=(0,r.useState)(!0),n=(0,a.Z)(e,2),t=n[0],c=n[1],i=(0,r.useState)(!0),o=(0,a.Z)(i,2),u=o[0],d=o[1];return(0,l.jsx)(l.Fragment,{children:t?(0,l.jsx)("section",{id:"menu",className:"hidden",onClick:function(){c(!1),d(!0)},children:(0,l.jsxs)("div",{id:"menuBar",children:[(0,l.jsx)("i",{className:"fa-solid fa-bars fa-2xl"}),(0,l.jsx)("span",{children:"Menu"})]})}):(0,l.jsx)(s.Z,{toggleNav:t,toggleClose:u,setToggleClose:function(e){return d(e)},setToggleNav:function(e){return c(e)}})})}},2053:function(e,n,t){t.d(n,{j:function(){return u},f:function(){return i}});var a=t(4165),r=t(5861),s=t(8516),l={sdk:null,provider:function(){if(l.sdk)return l.sdk;var e=new s.KU;e.setEndpoint("https://cloud.appwrite.io/v1").setProject("64a0712c1618df1be9a2");var n=new s.mR(e),t=new s.Lg(e),a=new s.KU(e);return l.sdk={database:t,account:n,client:a},l.sdk},createAccount:function(e,n,t){return l.provider().account.create("unique()",e,n,t)},updateAccountName:function(e){return l.provider().account.updateName(e)},updateAccountPassword:function(e,n){return l.provider().account.updatePassword(e,n)},updateAccountEmail:function(e,n){return l.provider().account.updateEmail(e,n)},getAccount:function(){return l.provider().account.get()},createSession:function(e,n){return l.provider().account.createEmailSession(e,n)},deleteCurrentSession:function(){return l.provider().account.deleteSession("current")},createDocument:function(e,n,t,a){return l.provider().database.createDocument(e,n,"unique()",t,a)},listDocuments:function(e,n){return l.provider().database.listDocuments(e,n)},updateDocument:function(e,n,t,a){return l.provider().database.updateDocument(e,n,t,a)},deleteDocument:function(e,n,t){return l.provider().database.deleteDocument(e,n,t)}},c=l;function i(e,n,t){return o.apply(this,arguments)}function o(){return(o=(0,r.Z)((0,a.Z)().mark((function e(n,t,r){var l,c,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log(n),l=(new s.KU).setEndpoint("https://cloud.appwrite.io/v1").setProject("64a0712c1618df1be9a2"),c=new s.mR(l),e.next=6,c.create(s.ID.unique(),n,t,r);case 6:i=e.sent,console.log(i),i&&(localStorage.setItem("auth",n),window.location.reload()),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function u(e,n){return d.apply(this,arguments)}function d(){return(d=(0,r.Z)((0,a.Z)().mark((function e(n,t){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.createSession(n,t);case 3:return e.next=5,c.getAccount();case 5:(r=e.sent)&&(console.log(r),localStorage.setItem("auth",n),window.location.reload()),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}},3522:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var a=t(9439),r=t(2791),s=t(541),l=t(7121),c=t(8954),i=t(184);function o(e){return(0,i.jsx)("button",{className:e.className,onClick:function(n){return e.onClick(n)},children:e.text})}var u=t(2053),d=/^[a-zA-Z]*$/,h=/^[A-z][A-z0-9-_]{3,23}$/,x=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,m=/^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;function f(){var e=(0,r.useState)(""),n=(0,a.Z)(e,2),t=n[0],f=n[1],j=(0,r.useState)(!1),g=(0,a.Z)(j,2),p=g[0],v=g[1],N=(0,r.useState)(""),w=(0,a.Z)(N,2),b=w[0],C=w[1],k=(0,r.useState)(!1),Z=(0,a.Z)(k,2),S=Z[0],A=Z[1],y=(0,r.useState)(""),U=(0,a.Z)(y,2),D=U[0],T=U[1],E=(0,r.useState)(!1),I=(0,a.Z)(E,2),P=I[0],L=I[1],R=(0,r.useState)(""),$=(0,a.Z)(R,2),z=$[0],H=$[1],_=(0,r.useState)(!1),q=(0,a.Z)(_,2),B=q[0],F=q[1],K=(0,r.useState)(""),V=(0,a.Z)(K,2),M=V[0],G=V[1],O=(0,r.useState)(!1),J=(0,a.Z)(O,2),Q=J[0],W=J[1],X=(0,r.useState)(!1),Y=(0,a.Z)(X,2),ee=Y[0],ne=Y[1],te=(0,i.jsx)("i",{className:"fa-solid fa-check"}),ae=(0,i.jsx)("i",{className:"fa-solid fa-xmark"});return(0,i.jsx)(i.Fragment,{children:ee?(0,i.jsxs)("main",{className:"column flex",children:[(0,i.jsx)(c.Z,{}),(0,i.jsx)(s.Z,{setToggleNav:function(e){return""},setToggleClose:function(e){return""}}),(0,i.jsxs)("section",{id:"auth",className:"main",children:[(0,i.jsx)("h1",{children:"Login"}),(0,i.jsxs)("form",{className:"flex column justifyContent alignItems",method:"POST",action:"#",children:[(0,i.jsxs)("div",{className:"flex column",children:[(0,i.jsx)("label",{children:"Email"}),(0,i.jsx)("input",{placeholder:"Put your email here",type:"text",name:"email",value:D,onChange:function(e){return T(e.target.value)}})]}),(0,i.jsxs)("div",{className:"flex column",children:[(0,i.jsx)("label",{children:"Password"}),(0,i.jsx)("input",{placeholder:"Put your password here",type:"password",name:"password",value:z,onChange:function(e){return H(e.target.value)}})]}),(0,i.jsx)("input",{className:"button",type:"submit",value:"Login Here",onClick:function(e){e.preventDefault(),(0,u.j)(D,z)}}),(0,i.jsxs)("section",{className:"existingAccount flex column alignItems",children:[(0,i.jsx)("h2",{children:"Don't have an account?  Register below:"}),(0,i.jsx)(o,{className:"button",text:"Register Here",onClick:function(e){return ne(!ee)}})]})]})]}),(0,i.jsx)(l.Z,{})]}):(0,i.jsxs)("main",{className:"column flex",children:[(0,i.jsx)(c.Z,{}),(0,i.jsx)(s.Z,{setToggleNav:function(e){return""},setToggleClose:function(e){return""}}),(0,i.jsxs)("section",{id:"auth",className:"main flex column",children:[(0,i.jsx)("h1",{children:"Register Account"}),(0,i.jsxs)("section",{className:"authContainer",children:[(0,i.jsxs)("form",{children:[(0,i.jsxs)("div",{children:[(0,i.jsxs)("label",{children:[" Name ",t&&p?te:ae]}),(0,i.jsx)("input",{type:"text",name:"name",value:t,placeholder:"Enter your name",onChange:function(e){f(e.target.value),v(d.test(e.target.value))}})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("label",{children:["User Name ",S&&b?te:ae]}),(0,i.jsx)("input",{type:"text",name:"userName",value:b,placeholder:"Enter your username",onChange:function(e){C(e.target.value),A(h.test(e.target.value))}})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("label",{children:["Email",P&&D?te:ae]}),(0,i.jsx)("input",{type:"email",name:"email",value:D,placeholder:"Enter your email",onChange:function(e){T(e.target.value),L(m.test(e.target.value))}})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("label",{children:["Password",B&&z?te:ae]}),(0,i.jsx)("input",{type:"password",name:"password",value:z,placeholder:"Confirm password",onChange:function(e){H(e.target.value),F(x.test(e.target.value))}})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("label",{children:["Confirm Password",Q&&M?te:ae]}),(0,i.jsx)("input",{placeholder:"Confirm password here",name:"confirmPassword",type:"password",value:M,onChange:function(e){G(e.target.value),W(z===e.target.value)}})]}),(0,i.jsx)("input",{className:"button",type:"submit",value:"Register Here",onClick:function(e){e.preventDefault(),(0,u.f)(D,z,t)},disabled:!(P&&p&&S&&B&&Q)})]}),(0,i.jsxs)("section",{className:"existingAccount flex column alignItems",children:[(0,i.jsx)("h2",{children:"Already have an account?  Login below:"}),(0,i.jsx)(o,{className:"button",text:"Login Here",onClick:function(){return ne(!ee)}})]})]})]}),(0,i.jsx)(l.Z,{})]})})}}}]);
//# sourceMappingURL=522.8ed90a05.chunk.js.map