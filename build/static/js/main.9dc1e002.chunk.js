(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(29)},23:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(16),r=a.n(l),c=a(34),o=a(33);a(23),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=a(8),m=a(2),u=a(3),d=a(5),h=a(4),p=a(6),b=a(32),f=a(12),E=a.n(f),g=a(14),v=a(31);function y(e){return s.a.createElement("div",{className:"padjust"},s.a.createElement("div",{className:"padding"}),e.children,s.a.createElement("div",{className:"padding"}))}function k(e){Object(n.useEffect)(function(){return document.addEventListener("click",t),function(){document.removeEventListener("click",t)}});var t=function t(a){if(!a.target.classList.contains("dropdown")&&!D(a.target,"dropdown")){if(!e.onDismount)return console.error("Dropdown onDismount not set");e.onDismount(),document.removeEventListener("click",t)}};return s.a.createElement("ul",{className:"dropdown"+(e.className?" "+e.className:""),style:e.style},e.children)}function O(e){return s.a.createElement("div",{className:"colorpreview"},s.a.createElement("div",{style:{backgroundColor:e.colors[0]},className:"main"}),s.a.createElement("div",{style:{backgroundColor:e.colors[1]},className:"secondary"}))}var C=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).clickLogout=function(){P.logout(),a.setState({redirect:"login"})},a.clickDelete=function(){if(a.state.deleteCounter>=a.state.deleteMessages.length-2)P.delete(function(){a.setState({redirect:"signup"})});else{var e=a.state.deleteCounter+1;a.setState({deleteCounter:e}),setTimeout(function(){a.state.deleteCounter===e&&a.setState({deleteCounter:0})},4600)}},a.clickTheme=function(e){e.stopPropagation(),e.preventDefault(),e.nativeEvent.stopImmediatePropagation(),a.setState({selectingTheme:!a.state.selectingTheme})},a.clickThemeOption=function(e){var t=Number(e.target.getAttribute("index"));a.setState({selectedTheme:t}),a.props.changeTheme(t)},a.renderThemeOptions=function(){for(var e=[],t=0;t<a.props.themes.length;t++)e.push(s.a.createElement("li",{key:t,index:t,onClick:a.clickThemeOption,className:a.state.selectedTheme===t?"selected":""},a.props.themes[t].name,s.a.createElement(O,{colors:a.props.themes[t].colorPreview})));return console.log(e),e},a.state={redirect:null,deleteCounter:0,deleteMessages:["Delete account","Are you sure?","Do you really wish to delete this account?","Deleting..."],selectingTheme:!1,selectedTheme:P.checkTheme()},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.redirect?s.a.createElement(b.a,{to:this.state.redirect}):this.state.selectingTheme?s.a.createElement(k,{onDismount:this.props.onDismount,className:"usercontrolls choose"},this.renderThemeOptions()):s.a.createElement(k,{onDismount:this.props.onDismount,className:"usercontrolls"},s.a.createElement(v.a,{to:"dashboard"},s.a.createElement("li",null,"Dashboard")),s.a.createElement("li",{onClick:this.clickTheme},"Change theme"),s.a.createElement("li",{onClick:this.clickLogout},"Log out"),s.a.createElement("li",{onClick:this.clickDelete},this.state.deleteMessages[this.state.deleteCounter]))}}]),t}(n.Component);function w(e){var t=Object(n.useState)(""),a=Object(i.a)(t,2),l=a[0],r=a[1],c=Object(n.useState)(""),o=Object(i.a)(c,2),m=o[0],u=o[1],d=Object(n.useState)(!1),h=Object(i.a)(d,2),p=h[0],b=h[1],f=[{name:"Royal",filename:"royal.css",colorPreview:["#ddc239","#331F26"]},{name:"One Dark",filename:"one_dark.css",colorPreview:["#61dafb","#282C34"]},{name:"Dracula",filename:"dracula.css",colorPreview:["#ff79c6","#282a36"]},{name:"Dawnbringer",filename:"db32.css",colorPreview:["#eec39a","#45283c"]},{name:"Greenstar",filename:"greenstar.css",colorPreview:["#ca7091","#6a7189"]},{name:"Gameboy",filename:"gameboy.css",colorPreview:["#5a3921","#ffffb5"]},{name:"Chocolate",filename:"chocolate.css",colorPreview:["#422936","#a9604c"]},{name:"Black",filename:"black.css",colorPreview:["#c3cfd2","#06080a"]},{name:"White",filename:"white.css",colorPreview:["#4a5266","#ffffff"]},{name:"Beach",filename:"beach.css",colorPreview:["palevioletred","papayawhip"]}];Object(n.useEffect)(function(){P.checkUsername(function(e){e&&r(e)})}),Object(n.useEffect)(function(){E(P.checkTheme())},[]),Object(n.useEffect)(function(){var e="";switch(window.location.pathname.replace(/^\//i,"")){case"home":case"":e="Home";break;case"login":e="Log in";break;case"signup":e="Sign up";break;case"dashboard":e="Dashboard";break;case"tablemissing":e="Table not found";break;case"table":var t=window.location.search.match(/t=(\d+)/i);if(!t||!t[1])break;j({method:"GET",reqtype:"table",tableID:t[1]},function(e){e&&e[0]&&u(e[0].name+(e[0].author_id!==P.checkAuth()?" [read-only]":""))});break;default:e=""}e&&u(e)},[window.location.pathname]);var E=function(e){var t=document.querySelector("head>link.theme")||document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("class","theme"),t.setAttribute("href",0!==e?"".concat("","/themes/").concat(f[e].filename):""),P.setTheme(e),document.head.appendChild(t)};return s.a.createElement("header",null,s.a.createElement("section",{className:"left"},s.a.createElement(v.a,{to:"/",className:"dash"},s.a.createElement("i",{className:"fas fa-home"})," Periodic Table Builder  "),e.left),s.a.createElement("section",{className:"center"},s.a.createElement("div",{className:"pagename"},m),e.center),s.a.createElement("section",{className:"right"},e.right,l&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"user",onClick:function(){b(!p)}},l),p&&s.a.createElement(C,{changeTheme:E,onDismount:function(){b(!1)},themes:f}))))}function N(e){var t=Object(n.useState)(e.checked||!1),a=Object(i.a)(t,2),l=a[0],r=a[1];return s.a.createElement("div",{className:"checkbox"+(l?" checked":""),onClick:function(t){var a=t.target,n=a.classList.contains("checkbox")?a:D(a,"checkbox"),s=n&&!n.classList.contains("checked");r(s),e.onChange(s)}},s.a.createElement("i",{className:"fa fa-check","aria-hidden":"true"}))}function D(e,t){for(;(e=e.parentElement)&&!e.classList.contains(t););return e}function j(e,t){return S.apply(this,arguments)}function S(){return(S=Object(g.a)(E.a.mark(function e(t,a){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(document.location.protocol,"//").concat(document.location.host,"/db"),{headers:{accepts:"application/json",data:JSON.stringify(t)}}).then(function(e){e.json().then(function(e){return a(e)})}).catch(function(e){return console.log(e)});case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function T(){if(!P.auth){var e=document.cookie.match(/auth\s*=\s*(\d+)/i);e&&(P.auth=Number(e[1]))}return P.auth}function I(){return(I=Object(g.a)(E.a.mark(function e(t){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(P.username){e.next=5;break}return e.next=3,j({method:"GET",reqtype:"username",authorID:T()},function(e){P.username=e&&e[0]&&e[0].name||"",t(P.username)});case 3:e.next=6;break;case 5:t(P.username);case 6:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var P={username:"",password:"",auth:0,themeIndex:0,authenticate:function(e,t){P.auth=e.auth;var a=new Date;a.setDate(a.getDate()+7),document.cookie="auth=".concat(e.auth,"; expires=").concat(a,"; path=/"),t()},setTheme:function(e){P.themeIndex=e;var t=new Date;t.setDate(t.getDate()+7),document.cookie="theme=".concat(e,"; expires=").concat(t,"; path=/")},checkAuth:T,checkTheme:function(){if(!P.themeIndex){var e=document.cookie.match(/theme\s*=\s*(\d+)/i);e&&(P.themeIndex=Number(e[1]))}return P.themeIndex},checkUsername:function(e){return I.apply(this,arguments)},logout:function(){document.cookie="auth=0;",P.auth=0,P.username="",P.password=""},delete:function(e){j({method:"DELETE",reqtype:"author",authorID:P.checkAuth()},function(t){P.logout(),e(t)})}},x=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleClick=function(){a.props.onSelect(a.state.elm)};var n=String(e.elm&&e.elm.electronegativity||"--"),s=String(e.elm&&e.elm.atomic_mass||"--");return"--"===n||~n.indexOf(".")||(n+=".0"),"--"===s||~s.indexOf(".")||(s="(".concat(s,")")),a.state={click:e.click||!1,elm:e.elm||!1,isUndef:a.props.elm&&e.elm.isDefault,elneg:n,mass:s},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("td",{symbol:this.state.elm?this.state.elm.symbol:void 0,className:(this.state.elm.slidedown?"slidedown":"element")+(this.state.elm?"":" hidden")+(this.state.click?" click":"")+(this.state.isUndef?" undef":"")+(this.state.elm.type_id?" type-"+this.state.elm.type_id:" type-11"),onClick:this.handleClick},s.a.createElement("span",{className:"anum"},this.state.elm&&!this.state.isUndef?this.state.elm.atom_number:void 0),s.a.createElement("div",{className:"symbol"},this.state.elm?this.state.elm.symbol:void 0),this.state.elm&&!this.state.isUndef&&s.a.createElement("span",{className:"mass"},s.a.createElement("span",null,this.state.mass)),this.state.elm&&!this.state.isUndef&&s.a.createElement("span",{className:"elneg"},s.a.createElement("span",null,this.state.elneg)))}}]),t}(n.Component),_=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).loadTable=function(){a.state.loaded&&a.setState({loaded:!1}),j({method:"GET",reqtype:"table_elements",table:a.state.tableID,authorID:P.checkAuth()},function(e){e.error?a.setState({redirect:"tablemissing"}):a.setState({loaded:!0,table:e.table,elements:e.elements})})},a.handleInspect=function(e){a.props.onInspect(e)},a.renderSpecialGroup=function(e,t){for(var n=57+32*e,l=a.state.def,r=[],c=0;c<3;c++)r.push(s.a.createElement(x,{onSelect:void 0,key:n-c-1,elm:void 0}));for(var o=function(e){var t=a.state.elements.find(function(t){return t.atom_number===e})||Object.assign({},l,{atom_number:e,symbol:e});r.push(s.a.createElement(x,{onSelect:a.handleInspect,key:e,elm:!t.hidden&&t}))},i=n;i<n+15;i++)o(i);return s.a.createElement("tr",{className:"group",key:8+e},r)},a.renderGroup=function(e,t){for(var n=[],l=e*a.state.width,r=a.state.def,c=function(t){var c=l+t,o=c+1-(c>1&&16)-(c>20&&10)-(c>38&&10)+(c>91&&14)+(c>110&&14),i=r;void 0!==(i=c>0&&c<17||c>19&&c<30||c>37&&c<48?Object.assign({},r,{atom_number:o,hidden:!0}):92===c?Object.assign({},r,{symbol:"57-71",slidedown:!0}):110===c?Object.assign({},r,{symbol:"89-103",slidedown:!0}):a.state.elements.find(function(e){return e.atom_number===o})||Object.assign({},r,{atom_number:o,symbol:o}))&&(0===e&&(c="string"+c),n.push(s.a.createElement(x,{onSelect:a.handleInspect,key:c,elm:!i.hidden&&i})))},o=0;o<t;o++)c(o);return s.a.createElement("tr",{className:"group",key:e},n)},a.state={loaded:!1,redirect:null,table:{},elements:[],width:18,tableID:e.tableID,reload:a.loadTable,def:{isDefault:!0,name:"",symbol:"",atom_number:void 0}},a.loadTable(),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){if(this.state.redirect)return s.a.createElement(b.a,{to:this.state.redirect});if(!this.state.tableID)return s.a.createElement(b.a,{to:"tablemissing"});var e=[];if(this.state.loaded){for(var t=0;t<7;t++)e.push(this.renderGroup(t,18));e.push(s.a.createElement("tr",{className:"spacing",key:7}),this.renderSpecialGroup(0),this.renderSpecialGroup(1))}return s.a.createElement("table",{className:"ptable"+(this.props.show?" show "+this.props.show:"")+(this.state.table&&this.state.table.author_id!==P.checkAuth()?" read-only":"")},s.a.createElement("tbody",null,e))}}]),t}(n.Component);function A(e){return s.a.createElement("div",{className:"button-x",onClick:e.onClick})}function L(e){return s.a.createElement("input",{type:"text",defaultValue:e.elm[e.name],name:e.name,onChange:e.onChange,onKeyPress:e.onKeyPress,maxLength:e.maxLength||45,readOnly:e.readOnly})}function K(e){return s.a.createElement("div",{className:"electronshell"},function(t){for(var a=s.a.createElement("div",{className:"core"},s.a.createElement("div",{className:"symbol"},e.elm.symbol)),n=0,l=1;l<t;l++){for(var r=[],c=Math.min(e.elm.anom-n,e.elecDist[l-1]),o=0;o<c;o++){var i=(o/c*(2*Math.PI)+1.5*Math.PI)%(2*Math.PI);r.push(s.a.createElement("div",{key:c-o-1,style:{left:"".concat(50*Math.cos(i)+50,"%"),top:"".concat(50*Math.sin(i)+50,"%")},className:"electron"})),n++}a=s.a.createElement("div",{className:"shell "+l+(r.length?"":" hidden")},a," ",r)}return a}(8))}var U=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).inputOnChange=function(e){var t=a.state.elm;t[e.target.name]=e.target.value,a.state.changed||a.props.onChange(),a.setState({elm:t,changed:!0})},a.handleDismount=function(){a.state.dismount()},a.dismount=function(){if(a.state.changed){var e=a.state.elm;j({method:a.state.method,reqtype:"element",table:a.state.tableID,symbol:e.symbol,anom:e.anom,name:e.name,amass:e.amass,eneg:e.eneg},function(e){console.log(e)})}else console.log("Did not apiFetch, because elm has not changed")},a.fetchElement=function(e){j({method:"GET",reqtype:"element",table:a.state.tableID,anom:e},function(t){if(t.length){var n=t[0];a.setState({loaded:!0,method:"UPDATE",elm:{symbol:n.symbol,anom:e,name:n.name,mass:n.atomic_mass,elneg:n.electronegativity}})}else a.setState({loaded:!0,method:"ADD",elm:{symbol:"",anom:e,name:""}})})},a.changeElement=function(e,t){a.elm[e]=t},a.handleClick=function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation()},a.delete=function(){if("ADD"===a.state.method)return a.setState({method:"don't touch it, you idiot"}),a.handleDismount();a.state.changed||a.props.onChange(),j({method:"DELETE",reqtype:"element",table:a.state.tableID,anom:a.state.elm.anom},function(){a.handleDismount()})},a.handleKeyPress=function(e){"Enter"===e.key&&a.handleDismount()};var n=!!e.elm.isDefault;return a.state={dismount:a.props.inspectorDismount,loaded:n,isUndef:n,method:n?"ADD":"not sure",changed:!1,elm:{symbol:n?"":null,anom:e.elm.atom_number,name:n?"":null,mass:null,elneg:null},tableID:e.tableID,elecDist:[2,8,8+Math.min(Math.max(e.elm.atom_number-20+(e.elm.atom_number>23)-(e.elm.atom_number>24),0),10),8+Math.min(Math.max(e.elm.atom_number-38+(e.elm.atom_number>40),0),10),8]},n||a.fetchElement(a.props.elm.atom_number),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement(y,null,s.a.createElement("div",{className:"card-holder"},s.a.createElement("div",{className:"card"+(this.props.dismounting?" fadeout":""),onClick:this.handleClick},s.a.createElement(A,{onClick:this.handleDismount}),s.a.createElement("div",{className:"data-input"},s.a.createElement("ul",null,s.a.createElement("li",null,"Symbol"),s.a.createElement("li",null,"Atomic Number"),s.a.createElement("li",null,"Name"),s.a.createElement("br",null),this.state.elm.mass&&s.a.createElement("li",null,"Atomic Mass"),this.state.elm.elneg&&s.a.createElement("li",null,"Electronegativity")),this.state.loaded&&s.a.createElement("form",{className:"datalist",method:"POST"},s.a.createElement(L,{name:"symbol",readOnly:this.props.readOnly,elm:this.state.elm,onChange:this.inputOnChange,className:"elm-symbol",maxLength:4}),s.a.createElement(L,{name:"anom",readOnly:this.props.readOnly,elm:this.state.elm,onChange:this.inputOnChange,className:"elm-anom"}),s.a.createElement(L,{name:"name",readOnly:this.props.readOnly,elm:this.state.elm,onChange:this.inputOnChange,className:"elm-name",onKeyPress:this.handleKeyPress}),s.a.createElement("br",null),this.state.elm.mass&&s.a.createElement(L,{name:"mass",readOnly:!0,elm:this.state.elm,onChange:null,className:"elm-mass",onKeyPress:null}),this.state.elm.elneg&&s.a.createElement(L,{name:"elneg",readOnly:!0,elm:this.state.elm,onChange:null,className:"elm-elneg",onKeyPress:null}))),!this.props.readOnly&&s.a.createElement("div",{className:"bottom-bar"},s.a.createElement("div",{className:"button delete"+("ADD"!==this.state.method||this.state.changed?"":" hidden"),onClick:this.delete},"ADD"===this.state.method?"Cancel":"Delete"),s.a.createElement("div",{className:"button add"+(this.state.changed?"":" hidden"),onClick:this.handleDismount},"ADD"===this.state.method?"Add":"Update")))),s.a.createElement(K,{elm:this.state.elm,elecDist:this.state.elecDist}))}}]),t}(n.Component),q=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).dismount=function(){a.state.dismounting||(a.setState({dismounting:!0}),a.refs.card.dismount(),a.props.blur(!1),setTimeout(function(){a.props.onDismount(a.state.changed)},200))},a.handleChange=function(){a.setState({changed:!0})},a.state={changed:!1,dismounting:!1},a.props.blur(!0),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"inspector"+(this.state.dismounting?" fadeout":""),onClick:this.dismount},s.a.createElement(U,{dismounting:this.state.dismounting,inspectorDismount:this.dismount,onChange:this.handleChange,elm:this.props.elm,ref:"card",tableID:this.props.tableID,readOnly:this.props.readOnly}))}}]),t}(n.Component);function G(e){var t=Object(n.useState)(!1),a=Object(i.a)(t,2),l=a[0],r=a[1],c=Object(n.useState)(e.options),o=Object(i.a)(c,2),m=o[0],u=o[1],d=["Show ","Hide "],h=function(t){var a=t.target.getAttribute("name"),n=m;n[a]=!n[a],u(n),e.onChange(m)};return s.a.createElement("div",{className:"tableoptions"},s.a.createElement("div",{className:"btn",onClick:function(){return r(!l)}},s.a.createElement("i",{className:"fas fa-cog"})),l&&s.a.createElement(k,{onDismount:function(){return r(!1)},className:"dropdown"},s.a.createElement("li",{name:"mass",onClick:h},d[Number(m.mass)],"atomic mass"),s.a.createElement("li",{name:"elneg",onClick:h},d[Number(m.elneg)],"electronegativity"),s.a.createElement("li",{name:"typeColors",onClick:h},d[Number(m.typeColors)],"type colors")))}var M=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).onInspectElement=function(e){a.setState({inspect:e})},a.onBlur=function(e){a.setState({blur:e})},a.onInspectEscape=function(e){a.setState({inspect:null}),e&&a.refs.table.state.reload()},a.tableOptionsChange=function(e){a.setState({options:e})};var n=new URL(document.location).searchParams.get("t");return a.state={inspect:null,blur:!1,tableID:n&&Number(n)||-1,options:{elneg:!1,mass:!1,typeColors:!1}},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return P.checkAuth()?s.a.createElement(s.a.Fragment,null,s.a.createElement(w,{right:s.a.createElement(G,{onChange:this.tableOptionsChange,options:this.state.options})}),s.a.createElement("div",{className:"ptabapp"},s.a.createElement("div",{className:this.state.blur?"content blur":"content"},s.a.createElement(y,null,s.a.createElement(_,{tableID:this.state.tableID,ref:"table",onInspect:this.onInspectElement,show:(this.state.options.elneg?"elneg":"")+(this.state.options.mass?" mass":"")+(this.state.options.typeColors?" tcolors":"")}))),this.state.inspect&&s.a.createElement(q,{elm:this.state.inspect,blur:this.onBlur,onDismount:this.onInspectEscape,tableID:this.state.tableID,readOnly:this.refs.table&&this.refs.table.state.table.author_id!==P.checkAuth()}))):s.a.createElement(b.a,{to:"login"})}}]),t}(n.Component),B=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){var t={changed:!0,error:!1};t[e.target.name]=e.target.value,a.setState(t)},a.handleKeyPress=function(e){"Enter"===e.key&&a.login()},a.login=function(){if(""===a.state.username||""===a.state.password)return a.setState({changed:!1,error:!0}),void console.log("Can't log in without a username or password");j({method:"LOGIN",reqtype:"login",username:a.state.username,password:a.state.password},function(e){var t=e&&e.length&&e[0].author_id||null;null!=t?P.authenticate({username:a.state.username,password:a.state.password,auth:t},function(){a.setState({auth:t,error:!1})}):a.setState({changed:!1,error:!0})})},a.state={changed:!1,username:"",password:"",auth:null,error:!1},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.auth?s.a.createElement(b.a,{to:"dashboard"}):s.a.createElement(s.a.Fragment,null,s.a.createElement(w,null),s.a.createElement(y,null,s.a.createElement("div",{className:"login"},s.a.createElement("div",{className:"field"},s.a.createElement("h1",null," Log in ")),s.a.createElement("div",{className:"field"+(this.state.error?" error":"")},s.a.createElement("div",null,"Username"),s.a.createElement("input",{name:"username",onKeyPress:this.handleKeyPress,onChange:this.handleChange})),s.a.createElement("div",{className:"field"+(this.state.error?" error":"")},s.a.createElement("div",null,"Password"),s.a.createElement("input",{name:"password",onKeyPress:this.handleKeyPress,onChange:this.handleChange,type:"password"})),s.a.createElement("div",{className:"field redirbar"},s.a.createElement("div",{className:"button",onClick:this.login}," Log in "),s.a.createElement("div",null,s.a.createElement(v.a,{className:"signup",to:"/signup"}," Create new user? "))))))}}]),t}(n.Component),F=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){var t={changed:!0};t[e.target.name]=e.target.value,a.setState(t)},a.handleKeyPress=function(e){"Enter"===e.key&&a.signup()},a.signup=function(){""!==a.state.username&&""!==a.state.password?j({method:"SIGNUP",reqtype:"signup",username:a.state.username,password:a.state.password},function(e){var t=e&&e.length&&e[0].author_id||null;null!=t?P.authenticate({username:a.state.username,password:a.state.password,auth:t},function(){a.setState({auth:t,error:!1})}):a.setState({changed:!1,error:!0})}):console.log("Can't sign up without a username or password")},a.state={changed:!1,username:"",password:"",auth:null},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.auth?s.a.createElement(b.a,{to:"dashboard"}):s.a.createElement(s.a.Fragment,null,s.a.createElement(w,null),s.a.createElement(y,null,s.a.createElement("div",{className:"login"},s.a.createElement("div",{className:"field"},s.a.createElement("div",null,s.a.createElement("h1",null," Sign up "),s.a.createElement("div",{className:"warning"},"(do not use your normal passwords; this website is not secure) "))),s.a.createElement("div",{className:"field"},s.a.createElement("div",null,"Username"),s.a.createElement("input",{name:"username",onKeyPress:this.handleKeyPress,onChange:this.handleChange})),s.a.createElement("div",{className:"field"},s.a.createElement("div",null,"Password"),s.a.createElement("input",{name:"password",onKeyPress:this.handleKeyPress,onChange:this.handleChange,type:"password"})),s.a.createElement("div",{className:"field redirbar"},s.a.createElement("div",{className:"button",onClick:this.signup}," Create "),s.a.createElement("div",null,s.a.createElement(v.a,{to:"/login"}," Log in instead? "))))))}}]),t}(n.Component),R=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"welcome"},s.a.createElement("h3",null,"Welcome, ",this.props.user))}}]),t}(n.Component),W=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleDeleteClick=function(){a.state.deleteClicks>=2&&a.props.delete(),a.setState({deleteClicks:a.state.deleteClicks+1})},a.handleEditClick=function(e){a.props.editTable(a.props.table),a.props.dismount()},a.handleRestoreClick=function(e){a.props.table.new=!0,a.props.table.changed=!0,a.props.editTable(a.props.table),a.props.dismount()},a.state={deleteClicks:0,deletemsgs:["Delete","Are you sure?","Do you really want to delete this table?","Fine."]},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement(k,{onDismount:this.props.dismount,style:{position:"absolute",left:this.props.x+"px",top:this.props.y+"px"}},s.a.createElement("li",{onClick:this.handleDeleteClick},this.state.deletemsgs[this.state.deleteClicks]),this.state.deleteClicks<this.state.deletemsgs.length-1?s.a.createElement("li",{onClick:this.handleEditClick},"Edit"):s.a.createElement("li",{onClick:this.handleRestoreClick},"Restore"))}}]),t}(n.Component),J=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).createDropdown=function(e){a.props.createDropdown(s.a.createElement(W,{x:e.pageX,y:e.pageY,delete:a.delete,editTable:a.props.editTable,dismount:a.props.destroyDropdown,table:a.props.table}))},a.handleClickOptions=function(e){e.stopPropagation(),e.preventDefault(),e.nativeEvent.stopImmediatePropagation(),a.createDropdown(e)},a.delete=function(){j({method:"DELETE",reqtype:"table",tableID:a.state.table.table_id},function(){a.setState({deleted:!0})})},a.state={deleted:!1,table:e.table},document.addEventListener("contextmenu",function(e){(e.target.classList.contains("table")||D(e.target,"table"))&&(e.preventDefault(),a.createDropdown(e))},!1),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.deleted?null:s.a.createElement(v.a,{to:"table?t=".concat(this.props.table.table_id)},s.a.createElement("div",{className:"table"},s.a.createElement("div",{className:"name"},this.props.table.name),s.a.createElement("div",{className:"note"},this.props.table.note),s.a.createElement("div",{className:"options",onClick:this.handleClickOptions},s.a.createElement("i",{className:"fas fa-cog"}))))}}]),t}(n.Component),V=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).handleClick=function(){a.props.onClick()},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"table last",onClick:this.handleClick},s.a.createElement("div",{className:"name"},"+ Create new table"))}}]),t}(n.Component),H=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).dismount=function(){a.props.onDismount()},a.handleClick=function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation()},a.handleInput=function(e){var t={changed:!0,table:a.state.table};t.table[e.target.name]=e.target.value,a.setState(t)},a.handleInputPublic=function(e){var t={changed:!0,table:a.state.table};t.table.public=e,a.setState(t)},a.createTable=function(){if(!a.state.table.name)return console.log("can't create table without a name");console.log("table is public: "+a.state.table.public),a.state.table.new?j({method:"ADD",reqtype:"table",name:a.state.table.name,note:a.state.table.note,public:a.state.table.public||!1,authorID:P.checkAuth()},function(){a.dismount()}):j({method:"UPDATE",reqtype:"table",name:a.state.table.name,note:a.state.table.note,public:a.state.table.public||!1,tableID:a.state.table.table_id},function(){a.dismount()})},a.state={dismounting:!1,changed:e.table.changed||!1,table:e.table},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"inspector"+(this.state.dismounting?" fadeout":""),onClick:this.dismount},s.a.createElement(y,null,s.a.createElement("div",{className:"card-holder"},s.a.createElement("div",{className:"card"+(this.props.dismounting?" fadeout":""),onClick:this.handleClick},s.a.createElement("div",{className:"button-x",onClick:this.dismount}),s.a.createElement("div",{className:"data-input"},s.a.createElement("ul",null,s.a.createElement("li",null,"Table name"),s.a.createElement("li",null,"Description"),s.a.createElement("li",null,"Public")),s.a.createElement("form",{className:"datalist",method:"POST"},s.a.createElement("input",{type:"text",defaultValue:this.state.table.name,name:"name",onChange:this.handleInput,maxLength:"45"}),s.a.createElement("input",{type:"text",defaultValue:this.state.table.note,name:"note",onChange:this.handleInput,maxLength:"256"}),s.a.createElement(N,{onChange:this.handleInputPublic,checked:this.state.table.public}))),s.a.createElement("div",{className:"bottom-bar"},s.a.createElement("div",{className:"button add"+(this.state.changed?"":" hidden"),onClick:this.createTable},this.state.table.new?"Create":"Update"))))))}}]),t}(n.Component),Y=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){P.checkUsername(function(e){a.setState({username:e})})},a.loadTables=function(){j({method:"GET",reqtype:"tables",authorID:P.checkAuth()},function(e){a.setState({tables:e})})},a.onClickNewTable=function(){a.setState({create:{new:!0,public:!1}})},a.editTable=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{new:!0,public:!1};a.setState({create:e})},a.renderTables=function(){var e=[],t=!0,n=!1,l=void 0;try{for(var r,c=a.state.tables[Symbol.iterator]();!(t=(r=c.next()).done);t=!0){var o=r.value;e.push(s.a.createElement(J,{key:o.table_id,table:o,createDropdown:a.createDropdown,destroyDropdown:a.destroyDropdown,editTable:a.editTable}))}}catch(i){n=!0,l=i}finally{try{t||null==c.return||c.return()}finally{if(n)throw l}}return e.push(s.a.createElement(V,{key:"+",onClick:a.onClickNewTable})),e},a.onInspectEscape=function(){a.setState({create:null}),P.checkAuth()&&a.loadTables()},a.createDropdown=function(e){a.setState({dropdown:e})},a.destroyDropdown=function(){a.setState({dropdown:null})},a.state={loaded:!1,tables:[],create:null,username:"",dropdown:null},P.checkAuth()&&a.loadTables(),document.addEventListener("click",a.cancelDropdown),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return P.checkAuth()?s.a.createElement("div",{className:"dashapp"},s.a.createElement(w,null),s.a.createElement("div",{className:"dashboard"+(this.state.create?" blur":"")},""!==this.state.username&&s.a.createElement(R,{user:this.state.username}),s.a.createElement("h1",null,"Your tables"),s.a.createElement("div",{className:"tablesection"},this.renderTables())),this.state.create&&s.a.createElement(H,{blur:this.onBlur,onDismount:this.onInspectEscape,table:this.state.create}),this.state.dropdown):s.a.createElement(b.a,{to:"login"})}}]),t}(n.Component);function X(e){var t=Object(n.useState)([]),a=Object(i.a)(t,2),l=a[0],r=a[1];Object(n.useEffect)(function(){j({method:"GET",reqtype:"public_tables"},function(e){r(e)})},[]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(w,null),s.a.createElement("div",{id:"home"},s.a.createElement("div",{className:"above"},s.a.createElement("h1",null,"Welcome to Periodic Table Builder"),s.a.createElement("div",{className:"undertitle"},"Build your very own periodic table of elements")),s.a.createElement("div",{className:"below"},s.a.createElement("div",{className:"content"},s.a.createElement("div",{className:"left"},s.a.createElement("div",{className:"dashboard"},s.a.createElement("div",{className:"title"},"Public tables created by our users"),s.a.createElement("div",{className:"tablesection"},function(){var e=[],t=!0,a=!1,n=void 0;try{for(var r,c=l[Symbol.iterator]();!(t=(r=c.next()).done);t=!0){var o=r.value;e.push(s.a.createElement(v.a,{key:o.table_id,to:"table?t=".concat(o.table_id)},s.a.createElement("div",{className:"table"},s.a.createElement("div",{className:"top"},s.a.createElement("div",{className:"name"},o.name),s.a.createElement("div",{className:"author"},"by ",o.author_name)),s.a.createElement("div",{className:"note"},o.note))))}}catch(i){a=!0,n=i}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}return e}(),s.a.createElement("div",{className:"pad"})))),s.a.createElement("div",{className:"right"},s.a.createElement("div",{className:"message"},s.a.createElement(v.a,{to:"login"},"Log in")," or ",s.a.createElement(v.a,{to:"signup"},"sign up")," to make your own periodic table of elements"))))))}r.a.render(s.a.createElement(c.a,null,s.a.createElement("div",null,s.a.createElement(o.a,{exact:!0,path:"/",component:X}),s.a.createElement(o.a,{path:"/home",component:X}),s.a.createElement(o.a,{path:"/login",component:B}),s.a.createElement(o.a,{path:"/dashboard",component:Y}),s.a.createElement(o.a,{path:"/table",component:M}),s.a.createElement(o.a,{path:"/signup",component:F}),s.a.createElement(o.a,{path:"/tablemissing",component:function(e){return s.a.createElement(s.a.Fragment,null,s.a.createElement(w,null),s.a.createElement("div",{className:"warning table-error"},s.a.createElement("div",{className:"ohno"},"Oh no"),"Looks like there either isn't a table here, or it's set to private.\xa0",s.a.createElement(v.a,{to:"login"},"Log in")," or ask the table owner to make it public."))}}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.9dc1e002.chunk.js.map