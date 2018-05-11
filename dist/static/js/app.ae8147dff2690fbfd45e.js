webpackJsonp([1],{"1/oy":function(e,t){},"2hr2":function(e,t){},"73+L":function(e,t){},"9M+g":function(e,t){},Fggo:function(e,t){},H82Z:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("Jmt5"),n("9M+g");var a=n("7+uW"),r=n("wvfG"),o=n.n(r),c=n("e6fC"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},s,!1,function(e){n("ybpt")},null,null).exports,l=n("/ocq"),d=n("ytdl"),u=n.n(d),f=n("2fyi"),v=n.n(f),p={AUDIENCE:"http://conf-tracker.com",DOMAIN:"joel-1.auth0.com/",CLIENT_ID:"ccC8IhHJykDqboanH9D2a7dhZL28my96",CLIENT_DOMAIN:"",REDIRECT:location.origin+"/callback",SCOPE:""},b="id_token",m="access_token",_=p.CLIENT_ID,h=p.DOMAIN,k=p.REDIRECT,g=p.SCOPE,y=p.AUDIENCE,w=new v.a.WebAuth({clientID:_,domain:h});function C(){w.authorize({responseType:"token id_token",redirectUri:k,audience:y,scope:g})}var D=new l.a({mode:"history"});function x(){localStorage.removeItem(b),localStorage.removeItem(m),D.go("/")}function A(){return localStorage.getItem(b)}function T(e){return function(e){var t=u()(e);if(!t.exp)return null;var n=new Date(0);return n.setUTCSeconds(t.exp),n}(e)<new Date}function $(){var e=A();return!!e&&!T(e)}function M(e,t,n){$()?n():n({path:"/",query:{redirect:e.fullPath}})}function E(e){var t=RegExp("[#&]"+e+"=([^&]*)").exec(window.location.hash);return t&&decodeURIComponent(t[1].replace(/\+/g," "))}var S={name:"app-nav",methods:{handleLogin:function(){C()},handleLogout:function(){x()},isLoggedIn:function(){return $()}}},I={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"info"}},[n("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),e._v(" "),n("b-navbar-brand",{attrs:{href:"#"}},[e._v("ConfTracker")]),e._v(" "),n("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/conferences"}},[e._v("Conferences")]),e._v(" "),n("b-nav-item",{attrs:{to:"/talks"}},[e._v("My Talks")])],1),e._v(" "),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-form",[n("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"sm",type:"button"},on:{click:function(t){e.handleLogout()}}},[e._v("Logout")])],1)],1)],1)],1)},staticRenderFns:[]};var N=n("VU/8")(S,I,!1,function(e){n("a/70")},"data-v-748d8c98",null).exports,U={components:{AppNav:N},name:"Welcome",methods:{handleLogin:C},mounted:function(){$()&&this.$router.push("/conferences")}},R={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-jumbotron",{attrs:{header:"Welcome",lead:"The Ultimate Conference Tracker"}},[n("p",[e._v("Please login with your @auth0.com email account")]),e._v(" "),n("b-btn",{attrs:{variant:"primary"},on:{click:function(t){e.handleLogin()}}},[e._v("Login")])],1)],1)},staticRenderFns:[]};var F=n("VU/8")(U,R,!1,function(e){n("73+L")},"data-v-6151175f",null).exports,L=n("woOf"),j=n.n(L),q=n("mtWM"),O=n.n(q),P="http://localhost:3333";function Y(){var e=localStorage.getItem(m);return e?{headers:{Authorization:"Bearer "+e}}:{headers:{}}}function V(e){var t=P+"/api/conference/"+e;return O.a.get(t,Y()).then(function(e){return e.data})}function Z(){var e=P+"/api/talks";return O.a.get(e,Y()).then(function(e){return e.data})}function H(e){var t,n=P+"/api/talk";return e.userId=(t="sub",u()(A())[t]),O.a.post(n,e,Y()).then(function(e){return e.data})}var W={name:"conference-add-modal",data:function(){return{conference:{name:"",url:"",startDate:"",endDate:"",cfpUrl:"",cfpDate:"",city:"",state:"",country:"",twitter:""}}},methods:{handleOk:function(){var e,t,n=j()({},this.conference);n.startDate=new Date(this.conference.startDate).getTime(),n.endDate=new Date(this.conference.endDate).getTime(),n.cfpDate=new Date(this.conference.cfpDate).getTime(),e=n,t=P+"/api/conference",O.a.post(t,e,Y()).then(function(e){return e.data}),this.$emit("conferenceAdded",{})},onShown:function(){this.conference.name="",this.conference.url="",this.conference.startDate="",this.conference.endDate="",this.conference.cfpUrl="",this.conference.cfpDate="",this.conference.city="",this.conference.state="",this.conference.country="",this.conference.twitter=""},handleSubmit:function(){}}},z={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"text-left"},[n("b-btn",{directives:[{name:"b-modal",rawName:"v-b-modal.conferenceAddModal",modifiers:{conferenceAddModal:!0}}],staticClass:"btn btn-success"},[e._v("+ Add")]),e._v(" "),n("b-modal",{ref:"modal",attrs:{size:"lg",id:"conferenceAddModal",title:"Add Conference"},on:{ok:e.handleOk,show:e.onShown}},[n("b-form",[n("b-row",[n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"Conference Name","label-for":"name"}},[n("b-form-input",{attrs:{id:"name",type:"text",required:"",placeholder:"Conference X"},model:{value:e.conference.name,callback:function(t){e.$set(e.conference,"name",t)},expression:"conference.name"}})],1)],1),e._v(" "),n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"Website","label-for":"url"}},[n("b-form-input",{attrs:{id:"url",type:"text",required:"",placeholder:"https://www.example.com"},model:{value:e.conference.url,callback:function(t){e.$set(e.conference,"url",t)},expression:"conference.url"}})],1)],1)],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"Start Date","label-for":"startDate"}},[n("b-form-input",{attrs:{id:"startDate",type:"date",required:"",placeholder:"MM-DD-YYYY"},model:{value:e.conference.startDate,callback:function(t){e.$set(e.conference,"startDate",t)},expression:"conference.startDate"}})],1)],1),e._v(" "),n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"End Date","label-for":"endDate"}},[n("b-form-input",{attrs:{id:"endDate",type:"date",required:"",placeholder:"MM-DD-YYYY"},model:{value:e.conference.endDate,callback:function(t){e.$set(e.conference,"endDate",t)},expression:"conference.endDate"}})],1)],1)],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"CFP URL","label-for":"cfpUrl"}},[n("b-form-input",{attrs:{id:"cfpUrl",type:"text",required:"",placeholder:"https://www.example.com"},model:{value:e.conference.cfpUrl,callback:function(t){e.$set(e.conference,"cfpUrl",t)},expression:"conference.cfpUrl"}})],1)],1),e._v(" "),n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"CFP Close Date","label-for":"cfpDate"}},[n("b-form-input",{attrs:{id:"cfpDate",type:"date",required:"",placeholder:"MM-DD-YYYY"},model:{value:e.conference.cfpDate,callback:function(t){e.$set(e.conference,"cfpDate",t)},expression:"conference.cfpDate"}})],1)],1)],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"City","label-for":"city"}},[n("b-form-input",{attrs:{id:"city",type:"text",required:"",placeholder:"Ottawa"},model:{value:e.conference.city,callback:function(t){e.$set(e.conference,"city",t)},expression:"conference.city"}})],1)],1),e._v(" "),n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"State/Province","label-for":"state"}},[n("b-form-input",{attrs:{id:"state",type:"text",required:"",placeholder:"ON"},model:{value:e.conference.state,callback:function(t){e.$set(e.conference,"state",t)},expression:"conference.state"}})],1)],1)],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"Country","label-for":"country"}},[n("b-form-input",{attrs:{id:"country",type:"text",required:"",placeholder:"Canada"},model:{value:e.conference.country,callback:function(t){e.$set(e.conference,"country",t)},expression:"conference.country"}})],1)],1),e._v(" "),n("b-col",{attrs:{cols:"6"}})],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6"}},[n("b-form-group",{attrs:{label:"Twitter","label-for":"twitter"}},[n("b-form-input",{attrs:{id:"twitter",type:"text",required:"",placeholder:"@twitter"},model:{value:e.conference.twitter,callback:function(t){e.$set(e.conference,"twitter",t)},expression:"conference.twitter"}})],1)],1),e._v(" "),n("b-col",{attrs:{cols:"6"}})],1)],1)],1)],1)},staticRenderFns:[]};var B={components:{AppNav:N,ConferenceAddModal:n("VU/8")(W,z,!1,function(e){n("Z3cE")},"data-v-16431383",null).exports},name:"conferences",data:function(){return{conferences:[],now:(new Date).getTime()}},mounted:function(){this.getConferences()},methods:{getConferences:function(){var e,t=this;(e=P+"/api/conferences",O.a.get(e,Y()).then(function(e){return e.data})).then(function(e){t.conferences=e})},rejectConference:function(e){var t,n;(t=e,n=P+"/api/conference/"+t+"/rejected",O.a.post(n,{conferenceId:t},Y()).then(function(e){return e.data})).then(this.getConferences)}}},J={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"conferences"},[n("app-nav"),e._v(" "),n("b-row",[n("b-col",[e._v(" ")])],1),e._v(" "),n("h2",[e._v("Welcome to the great list of conferences")]),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-right"},[n("conference-add-modal",{on:{conferenceAdded:function(t){e.getConferences()}}})],1)],1),e._v(" "),n("b-row",[n("b-col")],1),e._v(" "),n("b-row",[n("b-col",[n("table",{staticClass:"table table-striped"},[n("thead",{staticClass:"thead-dark"},[n("tr",[n("th",{attrs:{scope:"col"}},[e._v("Conference Name")]),e._v(" "),n("th",{attrs:{scope:"col"}},[e._v("Submitted"),n("br"),e._v("Approved"),n("br"),e._v("Rejected")]),e._v(" "),n("th",{attrs:{scope:"col"}},[e._v("Status")]),e._v(" "),n("th",{attrs:{scope:"col"}},[e._v("Actions")])])]),e._v(" "),n("tbody",e._l(e.conferences,function(t){return n("tr",{key:t._id},[n("td",[n("router-link",{attrs:{to:"conference/"+t._id}},[e._v(e._s(t.name))]),e._v(" "),n("a",{attrs:{href:t.url,target:"_blank"}},[e._v("🔗")])],1),e._v(" "),n("td",[n("b-badge",{attrs:{pill:"",variant:"light"}},[e._v(e._s(t.mySubmissions))]),e._v(" "),n("b-badge",{attrs:{pill:"",variant:"success"}},[e._v(e._s(t.myApproved))]),e._v(" "),n("b-badge",{attrs:{pill:"",variant:"danger"}},[e._v(e._s(t.myRejected))])],1),e._v(" "),n("td",[t.mySubmissions||t.myApproved||t.myRejected?e._e():n("span",[e._v("N/A")]),e._v(" "),t.mySubmissions>0?n("span",[e._v("Submitted")]):e._e(),e._v(" "),t.myApproved?n("span",[e._v("Approved")]):e._e(),e._v(" "),!t.myApproved&&t.myRejected?n("span",[e._v("Rejected")]):e._e()]),e._v(" "),n("td",[n("ul",{staticClass:"list-inline"},[t.myApproved?n("li",{staticClass:"list-inline-item"},[e._v("\n                  👍 (details)\n                ")]):e._e(),e._v(" "),t.mySubmissions?n("li",{staticClass:"list-inline-item"},[n("router-link",{attrs:{to:"conferences/approved/"+t._id}},[n("b-btn",{staticClass:"btn-success",attrs:{variant:"sm"}},[e._v("Approved")])],1),e._v(" "),n("b-btn",{staticClass:"btn-danger",attrs:{variant:"sm"},on:{click:function(n){e.rejectConference(t._id)}}},[e._v("Rejected")])],1):e._e(),e._v(" "),t.mySubmissions||t.myApproved||t.myRejected?e._e():n("li",{staticClass:"list-inline-item"},[n("router-link",{attrs:{to:"conferences/submitted/"+t._id}},[e._v("\n                    Submit\n                  ")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.cfpUrl&&t.cfpEnd>e.now,expression:"conference.cfpUrl && conference.cfpEnd > now"}]},[e._v("\n                    ("),n("a",{attrs:{href:t.cfpUrl}},[e._v("CFP")]),e._v(")\n                  ")])],1)])])])}))])])],1)],1)},staticRenderFns:[]};var Q=n("VU/8")(B,J,!1,function(e){n("sNf8")},"data-v-2fed261a",null).exports;var G={components:{AppNav:N},name:"conferenceDetails",data:function(){return{conference:{}}},mounted:function(){this.getConference()},methods:{dateFormat:function(e){return function(e){return new Date(e).toLocaleString("en-US",{day:"numeric",month:"long",year:"numeric"})}(e)},getConference:function(){var e=this;V(this.$route.params.conferenceId).then(function(t){e.conference=t})}}},X={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"conference-details"},[n("app-nav"),e._v(" "),n("b-row",[n("b-col",[e._v(" ")])],1),e._v(" "),n("h2",[e._v(e._s(e.conference.name))]),e._v(" "),n("b-row",[n("b-col")],1),e._v(" "),n("b-row",[n("b-col",[e._v("\n      This event will be held in "+e._s(e.conference.city)+" from "+e._s(e.dateFormat(e.conference.startDate))+"\n      to "+e._s(e.dateFormat(e.conference.endDate))+".\n    ")])],1),e._v(" "),n("b-row",[n("b-col",[n("br")])],1),e._v(" "),n("b-row",[n("b-col",[n("h4",[e._v("Submissions")])])],1),e._v(" "),n("b-row",[n("b-col",[n("table",{staticClass:"table table-striped"},[n("thead",{staticClass:"thead-dark"},[n("tr",[n("th",{attrs:{scope:"col"}},[e._v("Talk")]),e._v(" "),n("th",{attrs:{scope:"col"}},[e._v("Presenter")])])]),e._v(" "),n("tbody",e._l(e.conference.submissions,function(t){return n("tr",{key:t._id},[n("td",[e._v(e._s(t.talk.title))]),e._v(" "),n("td",[e._v(e._s(t.user.name))])])}))])])],1)],1)},staticRenderFns:[]};var K=n("VU/8")(G,X,!1,function(e){n("2hr2")},"data-v-76d8bb88",null).exports,ee={name:"talk-add-modal",data:function(){return{talk:{title:""}}},methods:{handleOk:function(){var e=this;H(this.talk).then(function(){return e.$emit("talkAdded",{})})},onShown:function(){this.talk.title=""}}},te={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"text-left"},[n("b-btn",{directives:[{name:"b-modal",rawName:"v-b-modal.talkAddModal",modifiers:{talkAddModal:!0}}],staticClass:"btn btn-success"},[e._v("+ Add")]),e._v(" "),n("b-modal",{ref:"modal",attrs:{size:"lg",id:"talkAddModal",title:"Add Conference"},on:{ok:e.handleOk,show:e.onShown}},[n("b-form",[n("b-row",[n("b-col",[n("b-form-group",{attrs:{label:"Talk Title","label-for":"name"}},[n("b-form-input",{attrs:{id:"name",type:"text",required:"",placeholder:"Clickbait Title"},model:{value:e.talk.title,callback:function(t){e.$set(e.talk,"title",t)},expression:"talk.title"}})],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var ne=n("VU/8")(ee,te,!1,function(e){n("bOSZ")},"data-v-a12f28d6",null).exports,ae={name:"talks",components:{AppNav:N,TalkAddModal:ne},data:function(){return{talks:[]}},mounted:function(){this.getMyTalks()},methods:{getMyTalks:function(){var e=this;Z().then(function(t){e.talks=t})}}},re={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"talks"},[n("app-nav"),e._v(" "),n("b-row",[n("b-col",[e._v(" ")])],1),e._v(" "),n("h2",[e._v("My talks")]),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-right"},[n("talk-add-modal",{on:{talkAdded:function(t){e.getMyTalks()}}})],1)],1),e._v(" "),n("b-row",[n("b-col")],1),e._v(" "),n("b-row",[n("b-col",[n("table",{staticClass:"table table-striped"},[n("thead",{staticClass:"thead-dark"},[n("tr",[n("th",{attrs:{scope:"col"}},[e._v("Talk Title")]),e._v(" "),n("th",{attrs:{scope:"col"}},[e._v("Actions")])])]),e._v(" "),n("tbody",e._l(e.talks,function(t){return n("tr",{key:t.id},[n("td",[n("router-link",{attrs:{to:"talk/"+t._id}},[e._v(e._s(t.title))])],1),e._v(" "),n("td",[e._v("\n            N/A\n          ")])])}))])])],1)],1)},staticRenderFns:[]};var oe=n("VU/8")(ae,re,!1,function(e){n("Fggo")},"data-v-4b5cd487",null).exports,ce={name:"",mounted:function(){this.$nextTick(function(){var e,t;e=E("access_token"),localStorage.setItem(m,e),t=E("id_token"),localStorage.setItem(b,t);var n,a,r=u()(A());n={name:r.name,picture:r.picture},a=P+"/api/user",O.a.post(a,n,Y()).then(function(e){return e.data}),window.location.href="/conferences"})}},se={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n  Reticulating splines...\n")])},staticRenderFns:[]};var ie=n("VU/8")(ce,se,!1,function(e){n("Pdul")},"data-v-e1fb662a",null).exports,le={name:"submitted",components:{AppNav:N,TalkAddModal:ne},data:function(){return{talks:[],conference:{}}},mounted:function(){this.getMyTalks(),this.getConferenceDetails()},methods:{getMyTalks:function(){var e=this;Z().then(function(t){e.talks=t})},getConferenceDetails:function(){var e=this;V(this.$route.params.conferenceId).then(function(t){e.conference=t})},saveSubmissions:function(){var e,t,n,a=this,r=this.talks.filter(function(e){return e.submitted}).map(function(e){return{talkId:e._id}});(e=this.conference._id,t=r,n=P+"/api/conference/"+e+"/submissions",O.a.post(n,t,Y()).then(function(e){return e.data})).then(function(){return a.$router.push("/conferences")})}}},de={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"talks"},[n("app-nav"),e._v(" "),n("b-row",[n("b-col",[e._v(" ")])],1),e._v(" "),n("h2",[e._v("Talks Submissions to "+e._s(e.conference.name))]),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6",offset:"3"}},[n("p",[e._v("The CFP for "+e._s(e.conference.name)+" is opened until "+e._s(new Date(e.conference.cfpDate).toLocaleDateString())+".")]),e._v(" "),n("p",[e._v("You can submit your talks at "),n("a",{attrs:{href:e.conference.cfpUrl,target:"_blank"}},[e._v(e._s(e.conference.cfpUrl))]),e._v(". ")])])],1),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-right"},[n("talk-add-modal",{on:{talkAdded:function(t){e.getMyTalks()}}})],1)],1),e._v(" "),n("b-row",[n("b-col")],1),e._v(" "),e._l(e.talks,function(t){return n("b-row",{key:t.id},[n("b-col",{attrs:{cols:"6",offset:"3"}},[n("b-input-group",[n("b-input-group-prepend",{attrs:{"is-text":""}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.submitted,expression:"talk.submitted"}],attrs:{type:"checkbox","aria-label":"Checkbox if you submitted",id:"talk-"+t.id},domProps:{checked:Array.isArray(t.submitted)?e._i(t.submitted,null)>-1:t.submitted},on:{change:function(n){var a=t.submitted,r=n.target,o=!!r.checked;if(Array.isArray(a)){var c=e._i(a,null);r.checked?c<0&&e.$set(t,"submitted",a.concat([null])):c>-1&&e.$set(t,"submitted",a.slice(0,c).concat(a.slice(c+1)))}else e.$set(t,"submitted",o)}}})]),e._v(" "),n("b-form-input",{attrs:{type:"text","aria-label":"Title of talk",readonly:"",value:t.title}})],1)],1)],1)}),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-center"},[n("b-btn",{staticClass:"btn btn-info",on:{click:function(t){e.saveSubmissions()}}},[e._v("Save")])],1)],1)],2)},staticRenderFns:[]};var ue=n("VU/8")(le,de,!1,function(e){n("r9Hf")},"data-v-9f41d642",null).exports,fe={name:"submitted",components:{AppNav:N},data:function(){return{talks:[],conference:{}}},mounted:function(){this.getMySubmittedTalks(),this.getConferenceDetails()},methods:{getMySubmittedTalks:function(){var e,t,n=this;(e=this.$route.params.conferenceId,t=P+"/api/conference/"+e+"/submissions",O.a.get(t,Y()).then(function(e){return e.data})).then(function(e){n.talks=e})},getConferenceDetails:function(){var e=this;V(this.$route.params.conferenceId).then(function(t){e.conference=t})},saveApprovals:function(){var e=this,t=this.talks.filter(function(e){return e.approved}).map(function(e){return e._id});(function(e,t){var n=P+"/api/conference/"+e+"/approvals";return O.a.post(n,t,Y()).then(function(e){return e.data})})(this.$route.params.conferenceId,t).then(function(){return e.$router.push("/conferences")})}}},ve={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"approved"},[n("app-nav"),e._v(" "),n("b-row",[n("b-col",[e._v(" ")])],1),e._v(" "),n("h2",[e._v("🎉 Congratulations ! 🎉")]),e._v(" "),n("h3",[e._v(" You have been accepted to "+e._s(e.conference.name)+" ")]),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"6",offset:"3"}},[n("p",[e._v("Select the talk(s) that have been accepted.")]),e._v(" "),n("p",[e._v("All other talks will be marked as rejected.")])])],1),e._v(" "),e._l(e.talks,function(t){return n("b-row",{key:t.id},[n("b-col",{attrs:{cols:"6",offset:"3"}},[n("b-input-group",[n("b-input-group-prepend",{attrs:{"is-text":""}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.approved,expression:"talk.approved"}],attrs:{type:"checkbox","aria-label":"Checkbox if approved",id:"talk-"+t.id},domProps:{checked:Array.isArray(t.approved)?e._i(t.approved,null)>-1:t.approved},on:{change:function(n){var a=t.approved,r=n.target,o=!!r.checked;if(Array.isArray(a)){var c=e._i(a,null);r.checked?c<0&&e.$set(t,"approved",a.concat([null])):c>-1&&e.$set(t,"approved",a.slice(0,c).concat(a.slice(c+1)))}else e.$set(t,"approved",o)}}})]),e._v(" "),n("b-form-input",{attrs:{type:"text","aria-label":"Title of talk",readonly:"",value:t.title}})],1)],1)],1)}),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-center"},[n("b-btn",{staticClass:"btn btn-info",on:{click:function(t){e.saveApprovals()}}},[e._v("Save")])],1)],1)],2)},staticRenderFns:[]};var pe=n("VU/8")(fe,ve,!1,function(e){n("ZaQ1")},"data-v-a5ac12c0",null).exports,be={components:{Button:n("E8q/").a,AppNav:N},name:"Talk",data:function(){return{talk:{},editMode:!1}},mounted:function(){this.getTalk()},methods:{saveChanges:function(){var e,t,n,a=this;(e=this.$route.params.talkId,t=this.talk,n=P+"/api/talk/"+e,O.a.put(n,t,Y()).then(function(e){return e.data})).then(function(){a.editMode=!1})},cancelChanges:function(){this.getTalk(),this.editMode=!1},switchToEditMode:function(){this.editMode=!0},getTalk:function(){var e,t,n=this;(e=this.$route.params.talkId,t=P+"/api/talk/"+e,O.a.get(t,Y()).then(function(e){return e.data})).then(function(e){n.talk=e})}}},me={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"talk"},[n("app-nav"),e._v(" "),n("b-row",[n("b-col",[e._v(" ")])],1),e._v(" "),n("h2",[e._v(e._s(e.talk.title)+" "),n("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.talk.title,expression:"talk.title",arg:"copy"}],staticClass:"copyBtn"},[e._v("📋")])]),e._v(" "),n("b-row",[n("b-col")],1),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-right"},[e.editMode?e._e():n("b-btn",{staticClass:"btn btn-primary",on:{click:e.switchToEditMode}},[e._v("Edit")]),e._v(" "),e.editMode?n("b-btn",{staticClass:"btn btn-success",on:{click:e.saveChanges}},[e._v("Save")]):e._e(),e._v(" "),e.editMode?n("b-btn",{staticClass:"btn btn-danger",on:{click:e.cancelChanges}},[e._v("Cancel")]):e._e()],1)],1),e._v(" "),e.editMode?n("div",{staticClass:"talkForm"},[n("b-row",[n("b-col",[n("b-form",[n("b-form-group",{attrs:{id:"title",label:"Talk Title:","label-for":"title"}},[n("b-form-input",{attrs:{id:"title",type:"text"},model:{value:e.talk.title,callback:function(t){e.$set(e.talk,"title",t)},expression:"talk.title"}})],1),e._v(" "),n("b-form-group",{attrs:{id:"abstract",label:"Abstract:","label-for":"abstract"}},[n("b-form-textarea",{attrs:{id:"abstract",rows:6},model:{value:e.talk.abstract,callback:function(t){e.$set(e.talk,"abstract",t)},expression:"talk.abstract"}})],1),e._v(" "),n("b-form-group",{attrs:{id:"notes",label:"Notes:","label-for":"notes"}},[n("b-form-textarea",{attrs:{id:"notes",rows:6},model:{value:e.talk.notes,callback:function(t){e.$set(e.talk,"notes",t)},expression:"talk.notes"}})],1)],1)],1)],1)],1):e._e(),e._v(" "),e.editMode?e._e():n("div",{staticClass:"talkData"},[n("b-row",[n("b-col",[n("span",{staticClass:"label"},[e._v("Abstract")])])],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"11"}},[n("p",[e._v(e._s(e.talk.abstract))])]),e._v(" "),n("b-col",[n("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.talk.abstract,expression:"talk.abstract",arg:"copy"}],staticClass:"copyBtn"},[e._v("📋")])])],1),e._v(" "),n("b-row",[n("b-col",[n("span",{staticClass:"label"},[e._v("Notes")])])],1),e._v(" "),n("b-row",[n("b-col",{attrs:{cols:"11"}},[n("p",[e._v(e._s(e.talk.notes||"N/A"))])]),e._v(" "),n("b-col",[n("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.talk.notes,expression:"talk.notes",arg:"copy"}],staticClass:"copyBtn"},[e._v("📋")])])],1)],1)],1)},staticRenderFns:[]};var _e=n("VU/8")(be,me,!1,function(e){n("H82Z")},"data-v-176cae6a",null).exports;a.a.use(l.a);var he=new l.a({mode:"history",routes:[{path:"/",name:"Welcome",component:F},{path:"/conferences",name:"Conferences",component:Q,beforeEnter:M},{path:"/conference/:conferenceId",name:"ConferenceDetails",component:K,beforeEnter:M},{path:"/conferences/submitted/:conferenceId",name:"Submitted",component:ue,beforeEnter:M},{path:"/conferences/approved/:conferenceId",name:"Approved",component:pe,beforeEnter:M},{path:"/talks",name:"Talks",component:oe,beforeEnter:M},{path:"/talk/:talkId",name:"Talk",component:_e,beforeEnter:M},{path:"/callback",component:ie}]});a.a.use(c.a),a.a.use(o.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:he,components:{App:i},template:"<App/>"})},Pdul:function(e,t){},Z3cE:function(e,t){},ZaQ1:function(e,t){},"a/70":function(e,t){},bOSZ:function(e,t){},r9Hf:function(e,t){},sNf8:function(e,t){},ybpt:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.ae8147dff2690fbfd45e.js.map