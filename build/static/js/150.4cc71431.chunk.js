"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[150],{9458:function(e,s,i){i.d(s,{Z:function(){return r}});var r={BTS:i.p+"static/media/BTS.d12c829c0d046a1c7cba.jpg",Ailee:i.p+"static/media/Ailee.d7077f78836b448ad839.jpg",SNSD:i.p+"static/media/SNSD.54366d9d00acd7e3d212.jpg",loveBattery:i.p+"static/media/loveBattery.c246046ad271ec24d4ff.jpg",intoTheNewWorld:i.p+"static/media/intoTheNewWorld.e6f1795d6bd559d905d8.jpg",idol:i.p+"static/media/idol.ad19c7bd0db8cf51016d.jpg",iWillGoToYouLikeTheFirstSnow:i.p+"static/media/iWillGoToYouLikeTheFirstSnow.6f730da8cf2d3f3e65e0.jpg",tears:i.p+"static/media/tears.9f7ab1bf8ffc105950f7.jpg"}},816:function(e,s,i){var r=i(1087),a=i(184);s.Z=function(e){var s=e.domain,i=e.cname,n=e.size,l=e.text,t=e.onClick;return(0,a.jsx)(r.rU,{to:s,className:i+" "+n,onClick:t,children:l})}},642:function(e,s,i){var r=i(9439),a=i(2791),n=i(1243),l=i(8174),t=i(184),c=/^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/,o=/^[a-zA-Z]*$/;s.Z=function(){var e=(0,a.useState)(""),s=(0,r.Z)(e,2),i=s[0],d=s[1],h=(0,a.useState)(""),x=(0,r.Z)(h,2),j=x[0],m=x[1],u=(0,a.useState)(""),g=(0,r.Z)(u,2),f=g[0],p=g[1],N=(0,a.useCallback)((function(e){try{if(e.preventDefault(),!i||!j||!f)return void l.Am.error("Please Input All Fields");var s=c.test(j),r=o.test(i);if(!s)return void l.Am.error("Please Input Proper Email");if(!r)return void l.Am.error("Please Input Proper Name");var a=new URLSearchParams;a.append("name",i),a.append("email",j),a.append("message",f),n.Z.post("https://illya-site-backend-production.up.railway.app/sendMessage",a,{}).then((function(e){e&&(console.log(e),window.location.reload())})).catch((function(e){console.log(e)}))}catch(t){console.error(t)}}),[j,f,i]);return(0,t.jsxs)("footer",{id:"footer",children:[(0,t.jsx)("section",{children:(0,t.jsxs)("form",{onSubmit:N,children:[(0,t.jsxs)("div",{className:"fields",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Name"}),(0,t.jsx)("input",{placeholder:"Put your name here",type:"text",name:"name",onChange:function(e){return d(e.target.value)},value:i})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Email"}),(0,t.jsx)("input",{placeholder:"Put your email here",type:"text",name:"email",onChange:function(e){return m(e.target.value)},value:j})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Message"}),(0,t.jsx)("textarea",{placeholder:"Put your message here",name:"message",onChange:function(e){return p(e.target.value)},value:f})]})]}),(0,t.jsx)("input",{className:"button",type:"submit",value:"Send Message"})]})}),(0,t.jsxs)("section",{className:"split contact",children:[(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{children:"Email"}),(0,t.jsx)("p",{children:"richardchoi54@gmail.com"})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{children:"Social"}),(0,t.jsxs)("ul",{className:"icons alt",children:[(0,t.jsx)("li",{children:(0,t.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://twitter.com/choir241",className:"icon fa-twitter",children:(0,t.jsx)("p",{className:"hidden",children:"Twitter"})})}),(0,t.jsx)("li",{children:(0,t.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.linkedin.com/in/richard-choir/",className:"icon fa-linkedin",children:(0,t.jsx)("p",{className:"hidden",children:"LinkedIn"})})}),(0,t.jsx)("li",{children:(0,t.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.instagram.com/225kh_drw/?hl=en",className:"icon fa-instagram",children:(0,t.jsx)("p",{className:"hidden",children:"Instagram"})})}),(0,t.jsx)("li",{children:(0,t.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://github.com/choir27",className:"icon fa-github",children:(0,t.jsx)("p",{className:"hidden",children:"Github"})})})]})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{children:"Portfolio"}),(0,t.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://choir.netlify.app/",children:"My Portfolio"})]})]})]})}},7084:function(e,s,i){var r=i(1087),a=i(184);s.Z=function(e){var s=e.idName,i=e.id,n=e.setToggleClose,l=e.toggleClose,t=e.setToggleNav;return(0,a.jsxs)("header",{id:i,children:[l?(0,a.jsx)("i",{className:"fa-solid fa-x fa-2xl",id:"close",onClick:function(){n(!1),t(!0)}}):"",(0,a.jsx)("div",{id:"intro",children:(0,a.jsx)(r.rU,{to:"/",children:(0,a.jsx)("h1",{children:"K-pop Wired"})})}),(0,a.jsxs)("nav",{id:s,className:"className",children:[(0,a.jsxs)("ul",{className:"links",children:[(0,a.jsx)("li",{children:(0,a.jsx)(r.rU,{to:"/",children:"Home"})}),(0,a.jsx)("li",{children:(0,a.jsx)(r.rU,{to:"/about",children:"About"})}),(0,a.jsx)("li",{children:(0,a.jsx)(r.rU,{to:"/dashboard",children:"Dashboard"})}),(0,a.jsx)("li",{children:(0,a.jsx)(r.rU,{to:"/register",children:"Register"})}),(0,a.jsx)("li",{children:(0,a.jsx)(r.rU,{to:"/login",children:"Login"})})]}),(0,a.jsxs)("ul",{className:"icons alt",children:[(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://twitter.com/choir241",className:"icon fa-twitter",children:(0,a.jsx)("p",{className:"hidden",children:"Twitter"})})}),(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.linkedin.com/in/richard-choir/",className:"icon fa-linkedin",children:(0,a.jsx)("p",{className:"hidden",children:"LinkedIn"})})}),(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.instagram.com/225kh_drw/?hl=en",className:"icon fa-instagram",children:(0,a.jsx)("p",{className:"hidden",children:"Instagram"})})}),(0,a.jsx)("li",{children:(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://github.com/choir27",className:"icon fa-github",children:(0,a.jsx)("p",{className:"hidden",children:"Github"})})})]})]})]})}},2309:function(e,s,i){var r=i(9439),a=i(2791),n=i(7084),l=i(9966),t=i(184);s.Z=function(){var e=(0,a.useState)(!0),s=(0,r.Z)(e,2),i=s[0],c=s[1],o=(0,a.useState)(null),d=(0,r.Z)(o,2),h=d[0],x=d[1],j=(0,a.useState)(!0),m=(0,r.Z)(j,2),u=m[0],g=m[1];return(0,a.useMemo)((function(){localStorage.getItem("id")?x((0,t.jsx)(l.Z,{setToggleNav:c,toggleClose:u,setToggleClose:g,id:"panel",idName:"navPanel"})):x((0,t.jsx)(n.Z,{setToggleNav:c,toggleClose:u,setToggleClose:g,id:"panel",idName:"navPanel"}))}),[u]),i?(0,t.jsx)("section",{id:"menu",onClick:function(){c(!1),g(!0)},children:(0,t.jsxs)("div",{id:"menuBar",className:"flex justifyContent",children:[(0,t.jsx)("i",{className:"fa-solid fa-bars fa-2xl"}),(0,t.jsx)("span",{children:"Menu"})]})}):h}},9966:function(e,s,i){var r=i(7689),a=i(1087),n=i(2791),l=i(184);s.Z=function(e){var s=e.idName,i=e.id,t=e.setToggleClose,c=e.toggleClose,o=e.setToggleNav,d=(0,r.s0)(),h=(0,n.useCallback)((function(e){e.preventDefault(),localStorage.removeItem("id"),d("/"),localStorage.getItem("id")||window.location.reload()}),[d]);return(0,l.jsxs)("header",{id:i,children:[c?(0,l.jsx)("i",{className:"fa-solid fa-x fa-2xl",id:"close",onClick:function(){t(!1),o(!0)}}):"",(0,l.jsx)("div",{id:"intro",children:(0,l.jsx)(a.rU,{to:"/",children:(0,l.jsx)("h1",{children:"K-pop Wired"})})}),(0,l.jsxs)("nav",{id:s,children:[(0,l.jsxs)("ul",{className:"links",children:[(0,l.jsx)("li",{children:(0,l.jsx)(a.rU,{to:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.rU,{to:"/about",children:"About"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.rU,{to:"/dashboard",children:"Dashboard"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.rU,{to:"/account",children:"Account"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.rU,{to:"/addAudio",children:"Add Audio"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.rU,{to:"/",onClick:function(e){return h(e)},children:"Logout"})})]}),(0,l.jsxs)("ul",{className:"icons alt",children:[(0,l.jsx)("li",{children:(0,l.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://twitter.com/choir241",className:"icon fa-twitter",children:(0,l.jsx)("p",{className:"hidden",children:"Twitter"})})}),(0,l.jsx)("li",{children:(0,l.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.linkedin.com/in/richard-choir/",className:"icon fa-linkedin",children:(0,l.jsx)("p",{className:"hidden",children:"LinkedIn"})})}),(0,l.jsx)("li",{children:(0,l.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.instagram.com/225kh_drw/?hl=en",className:"icon fa-instagram",children:(0,l.jsx)("p",{className:"hidden",children:"Instagram"})})}),(0,l.jsx)("li",{children:(0,l.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://github.com/choir27",className:"icon fa-github",children:(0,l.jsx)("p",{className:"hidden",children:"Github"})})})]})]})]})}},8033:function(e,s,i){i.r(s),i.d(s,{default:function(){return g}});var r=i(1087),a=i(642),n=i(9458),l=i(816),t=i(7084),c=i(2309),o=i(184),d=function(){return(0,o.jsxs)("div",{id:"wrapper",children:[(0,o.jsx)(c.Z,{}),(0,o.jsx)(t.Z,{idName:"nav"}),(0,o.jsxs)("div",{id:"main",children:[(0,o.jsxs)("article",{className:"post featured",children:[(0,o.jsxs)("section",{className:"major",children:[(0,o.jsx)("h1",{className:"flex justifyContent",children:(0,o.jsx)(r.rU,{to:"/",children:"Welcome to K-pop Wired!"})}),(0,o.jsx)("p",{children:"A site dedicated to introducing the culture of the Korean Pop industry, giving users the opportunity to share their own favorite tunes and create unique playlists with varying music tracks!"})]}),(0,o.jsx)(r.rU,{to:"/register",className:"image main",children:(0,o.jsx)("img",{src:n.Z.SNSD,alt:"All members of the Korean Pop group Girls Generation wearing formal dresses posing",loading:"lazy"})}),(0,o.jsx)("ul",{className:"special",children:(0,o.jsx)("li",{children:(0,o.jsx)(l.Z,{domain:"/register",size:"large",cname:"button",text:"Register Here"})})})]}),(0,o.jsxs)("section",{className:"posts",children:[(0,o.jsxs)("article",{children:[(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:(0,o.jsx)(r.rU,{to:"/dashboard",children:"Users Content"})}),(0,o.jsx)(r.rU,{to:"/dashboard",className:"image main",children:(0,o.jsx)("img",{src:n.Z.BTS,alt:"All members of the Korean pop guy group Bangtan Boys (BTS) smiling",loading:"lazy"})}),(0,o.jsx)("p",{children:"See what content users have posted using accounts they have registered through this website."})]}),(0,o.jsx)("ul",{className:"special",children:(0,o.jsx)("li",{children:(0,o.jsx)(l.Z,{domain:"/dashboard",size:"large",cname:"button",text:"See Dashboard"})})})]}),(0,o.jsxs)("article",{children:[(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:(0,o.jsx)(r.rU,{to:"/about",children:"What is K-pop?"})}),(0,o.jsx)(r.rU,{to:"/about",className:"image main",children:(0,o.jsx)("img",{src:n.Z.Ailee,alt:"Korean Solo Artist Ailee smiling for her tenth anniversary",loading:"lazy"})}),(0,o.jsx)("p",{children:"Find out more about the culture of K-pop, the industry's history, and the many groups within."})]}),(0,o.jsx)("ul",{className:"special",children:(0,o.jsx)("li",{children:(0,o.jsx)(l.Z,{domain:"/about",size:"large",cname:"button",text:"Here for More"})})})]})]})]}),(0,o.jsx)(a.Z,{}),(0,o.jsx)("div",{id:"copyright",children:"\xa9 choir Design: HTML5 UP"})]})},h=i(9439),x=i(9966),j=i(318),m=i(2791),u=function(){var e=(0,m.useContext)(j.Iu),s=(0,m.useState)({}),i=(0,h.Z)(s,2),t=i[0],d=i[1];return(0,m.useEffect)((function(){e.then((function(e){d(e)}))}),[t,e]),(0,o.jsxs)("div",{id:"wrapper",children:[(0,o.jsx)(c.Z,{}),(0,o.jsx)(x.Z,{idName:"nav"}),(0,o.jsxs)("div",{id:"main",children:[(0,o.jsxs)("article",{className:"post featured",children:[(0,o.jsxs)("section",{className:"major",children:[(0,o.jsx)("h1",{className:"flex justifyContent",children:(0,o.jsxs)(r.rU,{to:"/",children:["Welcome ",t.userName," to K-pop Wired!"]})}),(0,o.jsx)("p",{children:"A wholesome site dedicated to the cutest student and sister servant Illyasviel Von Einzbern; with her cute design, voice, and outfits, this site introduces it all.  Add various content to your customized account!"})]}),(0,o.jsx)(r.rU,{to:"/account",className:"image main",children:(0,o.jsx)("img",{src:n.Z.SNSD,alt:"All members of the Korean Pop group Girls Generation wearing formal dresses posing",loading:"lazy"})}),(0,o.jsx)("ul",{className:"special",children:(0,o.jsx)("li",{children:(0,o.jsx)(l.Z,{domain:"/account",size:"large",cname:"button",text:"See Account"})})})]}),(0,o.jsxs)("section",{className:"posts",children:[(0,o.jsxs)("article",{children:[(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:(0,o.jsx)(r.rU,{to:"/dashboard",children:"Users Content"})}),(0,o.jsx)(r.rU,{to:"/dashboard",className:"image main",children:(0,o.jsx)("img",{src:n.Z.BTS,alt:"All members of the Korean pop guy group Bangtan Boys (BTS) smiling",loading:"lazy"})}),(0,o.jsx)("p",{children:"See what content users have posted using accounts they have registered through this website."})]}),(0,o.jsx)("ul",{className:"special",children:(0,o.jsx)("li",{children:(0,o.jsx)(l.Z,{domain:"/dashboard",size:"large",cname:"button",text:"See Dashboard"})})})]}),(0,o.jsxs)("article",{children:[(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:(0,o.jsx)(r.rU,{to:"/about",children:"Who is Illya?"})}),(0,o.jsx)(r.rU,{to:"/about",className:"image main",children:(0,o.jsx)("img",{src:n.Z.Ailee,alt:"Korean Solo Artist Ailee smiling for her tenth anniversary",loading:"lazy"})}),(0,o.jsx)("p",{children:"Find out more about the character Illya, as well as her many different variations that have been created over the years."})]}),(0,o.jsx)("ul",{className:"special",children:(0,o.jsx)("li",{children:(0,o.jsx)(l.Z,{domain:"/about",size:"large",cname:"button",text:"Here for More!"})})})]})]})]}),(0,o.jsx)(a.Z,{}),(0,o.jsx)("div",{id:"copyright",children:"\xa9 choir Design: HTML5 UP"})]})},g=function(){return localStorage.getItem("id")?(0,o.jsx)(u,{}):(0,o.jsx)(d,{})}}}]);
//# sourceMappingURL=150.4cc71431.chunk.js.map