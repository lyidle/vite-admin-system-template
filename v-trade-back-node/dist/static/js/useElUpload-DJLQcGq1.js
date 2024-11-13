import{l as H,y as m,d as A,p as q,I as E,au as Re,av as pe,aw as Le,ax as fe,ay as ve,az as ye,a4 as ee,o as g,c as $,x as v,g as e,h as N,Z as I,v as F,t as G,W as k,A as D,w as L,B as Ue,C as j,_ as K,F as ge,aA as me,ad as he,aa as Y,aB as C,n as Te,r as be,Y as De,am as Be,ai as ke,X as z,f as O,aC as Oe,aD as Ne,aE as Ae,aF as _e,z as Ie,aG as Z,aH as te,aI as je,aJ as Me,L as se,H as qe,q as ze,K as He,U as ae,V as oe,as as Ke,E as re}from"./index-zCZRYDTo.js";import{t as x,f as W,g as Ge}from"./el-button-feFDLJ41.js";import{b as We}from"./el-form-item-ndx7fGQi.js";import{i as Ve}from"./el-table-column-YrvKGUHw.js";var Xe=1,Je=4;function ne(a){return We(a,Xe|Je)}const Ye=H({type:{type:String,default:"line",values:["line","circle","dashboard"]},percentage:{type:Number,default:0,validator:a=>a>=0&&a<=100},status:{type:String,default:"",values:["","success","exception","warning"]},indeterminate:Boolean,duration:{type:Number,default:3},strokeWidth:{type:Number,default:6},strokeLinecap:{type:m(String),default:"round"},textInside:Boolean,width:{type:Number,default:126},showText:{type:Boolean,default:!0},color:{type:m([String,Array,Function]),default:""},striped:Boolean,stripedFlow:Boolean,format:{type:m(Function),default:a=>`${a}%`}}),Ze=A({name:"ElProgress"}),Qe=A({...Ze,props:Ye,setup(a){const s=a,o={success:"#13ce66",exception:"#ff4949",warning:"#e6a23c",default:"#20a0ff"},l=q("progress"),d=E(()=>{const n={width:`${s.percentage}%`,animationDuration:`${s.duration}s`},b=P(s.percentage);return b.includes("gradient")?n.background=b:n.backgroundColor=b,n}),c=E(()=>(s.strokeWidth/s.width*100).toFixed(1)),f=E(()=>["circle","dashboard"].includes(s.type)?Number.parseInt(`${50-Number.parseFloat(c.value)/2}`,10):0),w=E(()=>{const n=f.value,b=s.type==="dashboard";return`
          M 50 50
          m 0 ${b?"":"-"}${n}
          a ${n} ${n} 0 1 1 0 ${b?"-":""}${n*2}
          a ${n} ${n} 0 1 1 0 ${b?"":"-"}${n*2}
          `}),h=E(()=>2*Math.PI*f.value),S=E(()=>s.type==="dashboard"?.75:1),R=E(()=>`${-1*h.value*(1-S.value)/2}px`),y=E(()=>({strokeDasharray:`${h.value*S.value}px, ${h.value}px`,strokeDashoffset:R.value})),_=E(()=>({strokeDasharray:`${h.value*S.value*(s.percentage/100)}px, ${h.value}px`,strokeDashoffset:R.value,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"})),r=E(()=>{let n;return s.color?n=P(s.percentage):n=o[s.status]||o.default,n}),i=E(()=>s.status==="warning"?Re:s.type==="line"?s.status==="success"?pe:Le:s.status==="success"?fe:ve),t=E(()=>s.type==="line"?12+s.strokeWidth*.4:s.width*.111111+2),p=E(()=>s.format(s.percentage));function u(n){const b=100/n.length;return n.map((U,T)=>ee(U)?{color:U,percentage:(T+1)*b}:U).sort((U,T)=>U.percentage-T.percentage)}const P=n=>{var b;const{color:B}=s;if(ye(B))return B(n);if(ee(B))return B;{const U=u(B);for(const T of U)if(T.percentage>n)return T.color;return(b=U[U.length-1])==null?void 0:b.color}};return(n,b)=>(g(),$("div",{class:v([e(l).b(),e(l).m(n.type),e(l).is(n.status),{[e(l).m("without-text")]:!n.showText,[e(l).m("text-inside")]:n.textInside}]),role:"progressbar","aria-valuenow":n.percentage,"aria-valuemin":"0","aria-valuemax":"100"},[n.type==="line"?(g(),$("div",{key:0,class:v(e(l).b("bar"))},[N("div",{class:v(e(l).be("bar","outer")),style:I({height:`${n.strokeWidth}px`})},[N("div",{class:v([e(l).be("bar","inner"),{[e(l).bem("bar","inner","indeterminate")]:n.indeterminate},{[e(l).bem("bar","inner","striped")]:n.striped},{[e(l).bem("bar","inner","striped-flow")]:n.stripedFlow}]),style:I(e(d))},[(n.showText||n.$slots.default)&&n.textInside?(g(),$("div",{key:0,class:v(e(l).be("bar","innerText"))},[F(n.$slots,"default",{percentage:n.percentage},()=>[N("span",null,G(e(p)),1)])],2)):k("v-if",!0)],6)],6)],2)):(g(),$("div",{key:1,class:v(e(l).b("circle")),style:I({height:`${n.width}px`,width:`${n.width}px`})},[(g(),$("svg",{viewBox:"0 0 100 100"},[N("path",{class:v(e(l).be("circle","track")),d:e(w),stroke:`var(${e(l).cssVarName("fill-color-light")}, #e5e9f2)`,"stroke-linecap":n.strokeLinecap,"stroke-width":e(c),fill:"none",style:I(e(y))},null,14,["d","stroke","stroke-linecap","stroke-width"]),N("path",{class:v(e(l).be("circle","path")),d:e(w),stroke:e(r),fill:"none",opacity:n.percentage?1:0,"stroke-linecap":n.strokeLinecap,"stroke-width":e(c),style:I(e(_))},null,14,["d","stroke","opacity","stroke-linecap","stroke-width"])]))],6)),(n.showText||n.$slots.default)&&!n.textInside?(g(),$("div",{key:2,class:v(e(l).e("text")),style:I({fontSize:`${e(t)}px`})},[F(n.$slots,"default",{percentage:n.percentage},()=>[n.status?(g(),D(e(j),{key:1},{default:L(()=>[(g(),D(Ue(e(i))))]),_:1})):(g(),$("span",{key:0},G(e(p)),1))])],6)):k("v-if",!0)],10,["aria-valuenow"]))}});var xe=K(Qe,[["__file","progress.vue"]]);const et=ge(xe),$e=Symbol("uploadContextKey"),tt="ElUpload";class st extends Error{constructor(s,o,l,d){super(s),this.name="UploadAjaxError",this.status=o,this.method=l,this.url=d}}function le(a,s,o){let l;return o.response?l=`${o.response.error||o.response}`:o.responseText?l=`${o.responseText}`:l=`fail to ${s.method} ${a} ${o.status}`,new st(l,o.status,s.method,a)}function at(a){const s=a.responseText||a.response;if(!s)return s;try{return JSON.parse(s)}catch{return s}}const ot=a=>{typeof XMLHttpRequest>"u"&&x(tt,"XMLHttpRequest is undefined");const s=new XMLHttpRequest,o=a.action;s.upload&&s.upload.addEventListener("progress",c=>{const f=c;f.percent=c.total>0?c.loaded/c.total*100:0,a.onProgress(f)});const l=new FormData;if(a.data)for(const[c,f]of Object.entries(a.data))me(f)&&f.length?l.append(c,...f):l.append(c,f);l.append(a.filename,a.file,a.file.name),s.addEventListener("error",()=>{a.onError(le(o,a,s))}),s.addEventListener("load",()=>{if(s.status<200||s.status>=300)return a.onError(le(o,a,s));a.onSuccess(at(s))}),s.open(a.method,o,!0),a.withCredentials&&"withCredentials"in s&&(s.withCredentials=!0);const d=a.headers||{};if(d instanceof Headers)d.forEach((c,f)=>s.setRequestHeader(f,c));else for(const[c,f]of Object.entries(d))he(f)||s.setRequestHeader(c,String(f));return s.send(l),s},we=["text","picture","picture-card"];let rt=1;const Q=()=>Date.now()+rt++,Ee=H({action:{type:String,default:"#"},headers:{type:m(Object)},method:{type:String,default:"post"},data:{type:m([Object,Function,Promise]),default:()=>Y({})},multiple:Boolean,name:{type:String,default:"file"},drag:Boolean,withCredentials:Boolean,showFileList:{type:Boolean,default:!0},accept:{type:String,default:""},fileList:{type:m(Array),default:()=>Y([])},autoUpload:{type:Boolean,default:!0},listType:{type:String,values:we,default:"text"},httpRequest:{type:m(Function),default:ot},disabled:Boolean,limit:Number}),nt=H({...Ee,beforeUpload:{type:m(Function),default:C},beforeRemove:{type:m(Function)},onRemove:{type:m(Function),default:C},onChange:{type:m(Function),default:C},onPreview:{type:m(Function),default:C},onSuccess:{type:m(Function),default:C},onProgress:{type:m(Function),default:C},onError:{type:m(Function),default:C},onExceed:{type:m(Function),default:C},crossorigin:{type:m(String)}}),lt=H({files:{type:m(Array),default:()=>Y([])},disabled:{type:Boolean,default:!1},handlePreview:{type:m(Function),default:C},listType:{type:String,values:we,default:"text"},crossorigin:{type:m(String)}}),it={remove:a=>!!a},ut=A({name:"ElUploadList"}),dt=A({...ut,props:lt,emits:it,setup(a,{emit:s}){const o=a,{t:l}=Te(),d=q("upload"),c=q("icon"),f=q("list"),w=W(),h=be(!1),S=E(()=>[d.b("list"),d.bm("list",o.listType),d.is("disabled",o.disabled)]),R=y=>{s("remove",y)};return(y,_)=>(g(),D(_e,{tag:"ul",class:v(e(S)),name:e(f).b()},{default:L(()=>[(g(!0),$(De,null,Be(y.files,(r,i)=>(g(),$("li",{key:r.uid||r.name,class:v([e(d).be("list","item"),e(d).is(r.status),{focusing:h.value}]),tabindex:"0",onKeydown:ke(t=>!e(w)&&R(r),["delete"]),onFocus:t=>h.value=!0,onBlur:t=>h.value=!1,onClick:t=>h.value=!1},[F(y.$slots,"default",{file:r,index:i},()=>[y.listType==="picture"||r.status!=="uploading"&&y.listType==="picture-card"?(g(),$("img",{key:0,class:v(e(d).be("list","item-thumbnail")),src:r.url,crossorigin:y.crossorigin,alt:""},null,10,["src","crossorigin"])):k("v-if",!0),r.status==="uploading"||y.listType!=="picture-card"?(g(),$("div",{key:1,class:v(e(d).be("list","item-info"))},[N("a",{class:v(e(d).be("list","item-name")),onClick:z(t=>y.handlePreview(r),["prevent"])},[O(e(j),{class:v(e(c).m("document"))},{default:L(()=>[O(e(Oe))]),_:1},8,["class"]),N("span",{class:v(e(d).be("list","item-file-name")),title:r.name},G(r.name),11,["title"])],10,["onClick"]),r.status==="uploading"?(g(),D(e(et),{key:0,type:y.listType==="picture-card"?"circle":"line","stroke-width":y.listType==="picture-card"?6:2,percentage:Number(r.percentage),style:I(y.listType==="picture-card"?"":"margin-top: 0.5rem")},null,8,["type","stroke-width","percentage","style"])):k("v-if",!0)],2)):k("v-if",!0),N("label",{class:v(e(d).be("list","item-status-label"))},[y.listType==="text"?(g(),D(e(j),{key:0,class:v([e(c).m("upload-success"),e(c).m("circle-check")])},{default:L(()=>[O(e(pe))]),_:1},8,["class"])):["picture-card","picture"].includes(y.listType)?(g(),D(e(j),{key:1,class:v([e(c).m("upload-success"),e(c).m("check")])},{default:L(()=>[O(e(fe))]),_:1},8,["class"])):k("v-if",!0)],2),e(w)?k("v-if",!0):(g(),D(e(j),{key:2,class:v(e(c).m("close")),onClick:t=>R(r)},{default:L(()=>[O(e(ve))]),_:2},1032,["class","onClick"])),k(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),k(" This is a bug which needs to be fixed "),k(" TODO: Fix the incorrect navigation interaction "),e(w)?k("v-if",!0):(g(),$("i",{key:3,class:v(e(c).m("close-tip"))},G(e(l)("el.upload.deleteTip")),3)),y.listType==="picture-card"?(g(),$("span",{key:4,class:v(e(d).be("list","item-actions"))},[N("span",{class:v(e(d).be("list","item-preview")),onClick:t=>y.handlePreview(r)},[O(e(j),{class:v(e(c).m("zoom-in"))},{default:L(()=>[O(e(Ne))]),_:1},8,["class"])],10,["onClick"]),e(w)?k("v-if",!0):(g(),$("span",{key:0,class:v(e(d).be("list","item-delete")),onClick:t=>R(r)},[O(e(j),{class:v(e(c).m("delete"))},{default:L(()=>[O(e(Ae))]),_:1},8,["class"])],10,["onClick"]))],2)):k("v-if",!0)])],42,["onKeydown","onFocus","onBlur","onClick"]))),128)),F(y.$slots,"append")]),_:3},8,["class","name"]))}});var ie=K(dt,[["__file","upload-list.vue"]]);const ct=H({disabled:{type:Boolean,default:!1}}),pt={file:a=>me(a)},Ce="ElUploadDrag",ft=A({name:Ce}),vt=A({...ft,props:ct,emits:pt,setup(a,{emit:s}){Ie($e)||x(Ce,"usage: <el-upload><el-upload-dragger /></el-upload>");const l=q("upload"),d=be(!1),c=W(),f=h=>{if(c.value)return;d.value=!1,h.stopPropagation();const S=Array.from(h.dataTransfer.files);s("file",S)},w=()=>{c.value||(d.value=!0)};return(h,S)=>(g(),$("div",{class:v([e(l).b("dragger"),e(l).is("dragover",d.value)]),onDrop:z(f,["prevent"]),onDragover:z(w,["prevent"]),onDragleave:z(R=>d.value=!1,["prevent"])},[F(h.$slots,"default")],42,["onDrop","onDragover","onDragleave"]))}});var yt=K(vt,[["__file","upload-dragger.vue"]]);const gt=H({...Ee,beforeUpload:{type:m(Function),default:C},onRemove:{type:m(Function),default:C},onStart:{type:m(Function),default:C},onSuccess:{type:m(Function),default:C},onProgress:{type:m(Function),default:C},onError:{type:m(Function),default:C},onExceed:{type:m(Function),default:C}}),mt=A({name:"ElUploadContent",inheritAttrs:!1}),ht=A({...mt,props:gt,setup(a,{expose:s}){const o=a,l=q("upload"),d=W(),c=Z({}),f=Z(),w=t=>{if(t.length===0)return;const{autoUpload:p,limit:u,fileList:P,multiple:n,onStart:b,onExceed:B}=o;if(u&&P.length+t.length>u){B(t,P);return}n||(t=t.slice(0,1));for(const U of t){const T=U;T.uid=Q(),b(T),p&&h(T)}},h=async t=>{if(f.value.value="",!o.beforeUpload)return R(t);let p,u={};try{const n=o.data,b=o.beforeUpload(t);u=te(o.data)?ne(o.data):o.data,p=await b,te(o.data)&&Ve(n,u)&&(u=ne(o.data))}catch{p=!1}if(p===!1){o.onRemove(t);return}let P=t;p instanceof Blob&&(p instanceof File?P=p:P=new File([p],t.name,{type:t.type})),R(Object.assign(P,{uid:t.uid}),u)},S=async(t,p)=>ye(t)?t(p):t,R=async(t,p)=>{const{headers:u,data:P,method:n,withCredentials:b,name:B,action:U,onProgress:T,onSuccess:Se,onError:Pe,httpRequest:Fe}=o;try{p=await S(p??P,t)}catch{o.onRemove(t);return}const{uid:V}=t,X={headers:u||{},withCredentials:b,file:t,data:p,method:n,filename:B,action:U,onProgress:M=>{T(M,t)},onSuccess:M=>{Se(M,t),delete c.value[V]},onError:M=>{Pe(M,t),delete c.value[V]}},J=Fe(X);c.value[V]=J,J instanceof Promise&&J.then(X.onSuccess,X.onError)},y=t=>{const p=t.target.files;p&&w(Array.from(p))},_=()=>{d.value||(f.value.value="",f.value.click())},r=()=>{_()};return s({abort:t=>{je(c.value).filter(t?([u])=>String(t.uid)===u:()=>!0).forEach(([u,P])=>{P instanceof XMLHttpRequest&&P.abort(),delete c.value[u]})},upload:h}),(t,p)=>(g(),$("div",{class:v([e(l).b(),e(l).m(t.listType),e(l).is("drag",t.drag),e(l).is("disabled",e(d))]),tabindex:e(d)?"-1":"0",onClick:_,onKeydown:ke(z(r,["self"]),["enter","space"])},[t.drag?(g(),D(yt,{key:0,disabled:e(d),onFile:w},{default:L(()=>[F(t.$slots,"default")]),_:3},8,["disabled"])):F(t.$slots,"default",{key:1}),N("input",{ref_key:"inputRef",ref:f,class:v(e(l).e("input")),name:t.name,disabled:e(d),multiple:t.multiple,accept:t.accept,type:"file",onChange:y,onClick:z(()=>{},["stop"])},null,42,["name","disabled","multiple","accept","onClick"])],42,["tabindex","onKeydown"]))}});var ue=K(ht,[["__file","upload-content.vue"]]);const de="ElUpload",ce=a=>{var s;(s=a.url)!=null&&s.startsWith("blob:")&&URL.revokeObjectURL(a.url)},bt=(a,s)=>{const o=Me(a,"fileList",void 0,{passive:!0}),l=r=>o.value.find(i=>i.uid===r.uid);function d(r){var i;(i=s.value)==null||i.abort(r)}function c(r=["ready","uploading","success","fail"]){o.value=o.value.filter(i=>!r.includes(i.status))}function f(r){o.value=o.value.filter(i=>i!==r)}const w=(r,i)=>{const t=l(i);t&&(console.error(r),t.status="fail",f(t),a.onError(r,t,o.value),a.onChange(t,o.value))},h=(r,i)=>{const t=l(i);t&&(a.onProgress(r,t,o.value),t.status="uploading",t.percentage=Math.round(r.percent))},S=(r,i)=>{const t=l(i);t&&(t.status="success",t.response=r,a.onSuccess(r,t,o.value),a.onChange(t,o.value))},R=r=>{he(r.uid)&&(r.uid=Q());const i={name:r.name,percentage:0,status:"ready",size:r.size,raw:r,uid:r.uid};if(a.listType==="picture-card"||a.listType==="picture")try{i.url=URL.createObjectURL(r)}catch(t){Ge(de,t.message),a.onError(t,i,o.value)}o.value=[...o.value,i],a.onChange(i,o.value)},y=async r=>{const i=r instanceof File?l(r):r;i||x(de,"file to be removed not found");const t=p=>{d(p),f(p),a.onRemove(p,o.value),ce(p)};a.beforeRemove?await a.beforeRemove(i,o.value)!==!1&&t(i):t(i)};function _(){o.value.filter(({status:r})=>r==="ready").forEach(({raw:r})=>{var i;return r&&((i=s.value)==null?void 0:i.upload(r))})}return se(()=>a.listType,r=>{r!=="picture-card"&&r!=="picture"||(o.value=o.value.map(i=>{const{raw:t,url:p}=i;if(!p&&t)try{i.url=URL.createObjectURL(t)}catch(u){a.onError(u,i,o.value)}return i}))}),se(o,r=>{for(const i of r)i.uid||(i.uid=Q()),i.status||(i.status="success")},{immediate:!0,deep:!0}),{uploadFiles:o,abort:d,clearFiles:c,handleError:w,handleProgress:h,handleStart:R,handleSuccess:S,handleRemove:y,submit:_,revokeFileObjectURL:ce}},kt=A({name:"ElUpload"}),$t=A({...kt,props:nt,setup(a,{expose:s}){const o=a,l=W(),d=Z(),{abort:c,submit:f,clearFiles:w,uploadFiles:h,handleStart:S,handleError:R,handleRemove:y,handleSuccess:_,handleProgress:r,revokeFileObjectURL:i}=bt(o,d),t=E(()=>o.listType==="picture-card"),p=E(()=>({...o,fileList:h.value,onStart:S,onProgress:r,onSuccess:_,onError:R,onRemove:y}));return qe(()=>{h.value.forEach(i)}),ze($e,{accept:He(o,"accept")}),s({abort:c,submit:f,clearFiles:w,handleStart:S,handleRemove:y}),(u,P)=>(g(),$("div",null,[e(t)&&u.showFileList?(g(),D(ie,{key:0,disabled:e(l),"list-type":u.listType,files:e(h),crossorigin:u.crossorigin,"handle-preview":u.onPreview,onRemove:e(y)},ae({append:L(()=>[O(ue,oe({ref_key:"uploadRef",ref:d},e(p)),{default:L(()=>[u.$slots.trigger?F(u.$slots,"trigger",{key:0}):k("v-if",!0),!u.$slots.trigger&&u.$slots.default?F(u.$slots,"default",{key:1}):k("v-if",!0)]),_:3},16)]),_:2},[u.$slots.file?{name:"default",fn:L(({file:n,index:b})=>[F(u.$slots,"file",{file:n,index:b})])}:void 0]),1032,["disabled","list-type","files","crossorigin","handle-preview","onRemove"])):k("v-if",!0),!e(t)||e(t)&&!u.showFileList?(g(),D(ue,oe({key:1,ref_key:"uploadRef",ref:d},e(p)),{default:L(()=>[u.$slots.trigger?F(u.$slots,"trigger",{key:0}):k("v-if",!0),!u.$slots.trigger&&u.$slots.default?F(u.$slots,"default",{key:1}):k("v-if",!0)]),_:3},16)):k("v-if",!0),u.$slots.trigger?F(u.$slots,"default",{key:2}):k("v-if",!0),F(u.$slots,"tip"),!e(t)&&u.showFileList?(g(),D(ie,{key:3,disabled:e(l),"list-type":u.listType,files:e(h),crossorigin:u.crossorigin,"handle-preview":u.onPreview,onRemove:e(y)},ae({_:2},[u.$slots.file?{name:"default",fn:L(({file:n,index:b})=>[F(u.$slots,"file",{file:n,index:b})])}:void 0]),1032,["disabled","list-type","files","crossorigin","handle-preview","onRemove"])):k("v-if",!0)]))}});var wt=K($t,[["__file","upload.vue"]]);const Rt=ge(wt),Et=Ke.MANAGER+"/admin/product/fileUpload",Lt={fileUpload:Et};function Ut(){return{beforeUpload:s=>s.type==="image/png"||s.type==="image/jpeg"||s.type==="image/gif"?s.size/1024/1024<4?!0:(re.error("上传文件大小需要小于4M~"),!1):(re.error("上传文件格式需要是PNG|JPG|GIF~"),!1)}}export{Lt as A,Rt as E,Ut as u};