import{ao as q,p as F,I as w,b7 as L,a2 as T,L as S,bk as G,a0 as K,bl as J,a1 as Q,aB as B,l as O,y as b,d as R,f as X,v as I,a3 as ee,m as oe,af as te,bm as ne,r as p,bn as le,bo as ae,T as se,R as ue,s as ce,D as ie,a8 as P}from"./index-zCZRYDTo.js";import{P as k}from"./vnode-Dy4NM1xu.js";import{t as de,U as A,u as D}from"./el-button-feFDLJ41.js";import{g as re}from"./el-table-column-YrvKGUHw.js";import{i as fe}from"./el-popover-_8Ap7mUU.js";const ye=(e,o={})=>{q(e)||de("[useLockscreen]","You need to pass a ref param to this function");const a=o.ns||F("popup"),c=w(()=>a.bm("parent","hidden"));if(!L||T(document.body,c.value))return;let n=0,s=!1,t="0";const d=()=>{setTimeout(()=>{typeof document>"u"||(Q(document==null?void 0:document.body,c.value),s&&document&&(document.body.style.width=t))},200)};S(e,r=>{if(!r){d();return}s=!T(document.body,c.value),s&&(t=document.body.style.width),n=re(a.namespace.value);const u=document.documentElement.clientHeight<document.body.scrollHeight,f=G(document.body,"overflowY");n>0&&(u||f==="scroll")&&s&&(document.body.style.width=`calc(100% - ${n}px)`),K(document.body,c.value)}),J(()=>d())},me=e=>{if(!e)return{onClick:B,onMousedown:B,onMouseup:B};let o=!1,a=!1;return{onClick:t=>{o&&a&&e(t),o=a=!1},onMousedown:t=>{o=t.target===t.currentTarget},onMouseup:t=>{a=t.target===t.currentTarget}}},ve=O({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:b([String,Array,Object])},zIndex:{type:b([String,Number])}}),pe={click:e=>e instanceof MouseEvent},be="overlay";var Ce=R({name:"ElOverlay",props:ve,emits:pe,setup(e,{slots:o,emit:a}){const c=F(be),n=r=>{a("click",r)},{onClick:s,onMousedown:t,onMouseup:d}=me(e.customMaskEvent?void 0:n);return()=>e.mask?X("div",{class:[c.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:s,onMousedown:t,onMouseup:d},[I(o,"default")],k.STYLE|k.CLASS|k.PROPS,["onClick","onMouseup","onMousedown"]):ee("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[I(o,"default")])}});const Se=Ce,ge=O({center:Boolean,alignCenter:Boolean,closeIcon:{type:oe},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),Oe={close:()=>!0},Ee=O({...ge,appendToBody:Boolean,appendTo:{type:b([String,Object]),default:"body"},beforeClose:{type:b(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),Me={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[A]:e=>te(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Te=(e,o)=>{var a;const n=ie().emit,{nextZIndex:s}=ne();let t="";const d=D(),r=D(),u=p(!1),f=p(!1),v=p(!1),C=p((a=e.zIndex)!=null?a:s());let y,m;const N=le("namespace",ae),z=w(()=>{const l={},i=`--${N.value}-dialog`;return e.fullscreen||(e.top&&(l[`${i}-margin-top`]=e.top),e.width&&(l[`${i}-width`]=se(e.width))),l}),V=w(()=>e.alignCenter?{display:"flex"}:{});function H(){n("opened")}function U(){n("closed"),n(A,!1),e.destroyOnClose&&(v.value=!1)}function Y(){n("close")}function E(){m==null||m(),y==null||y(),e.openDelay&&e.openDelay>0?{stop:y}=P(()=>M(),e.openDelay):M()}function g(){y==null||y(),m==null||m(),e.closeDelay&&e.closeDelay>0?{stop:m}=P(()=>x(),e.closeDelay):x()}function h(){function l(i){i||(f.value=!0,u.value=!1)}e.beforeClose?e.beforeClose(l):g()}function _(){e.closeOnClickModal&&h()}function M(){L&&(u.value=!0)}function x(){u.value=!1}function $(){n("openAutoFocus")}function W(){n("closeAutoFocus")}function j(l){var i;((i=l.detail)==null?void 0:i.focusReason)==="pointer"&&l.preventDefault()}e.lockScroll&&ye(u);function Z(){e.closeOnPressEscape&&h()}return S(()=>e.modelValue,l=>{l?(f.value=!1,E(),v.value=!0,C.value=fe(e.zIndex)?s():C.value++,ue(()=>{n("open"),o.value&&(o.value.scrollTop=0)})):u.value&&g()}),S(()=>e.fullscreen,l=>{o.value&&(l?(t=o.value.style.transform,o.value.style.transform=""):o.value.style.transform=t)}),ce(()=>{e.modelValue&&(u.value=!0,v.value=!0,E())}),{afterEnter:H,afterLeave:U,beforeLeave:Y,handleClose:h,onModalClick:_,close:g,doClose:x,onOpenAutoFocus:$,onCloseAutoFocus:W,onCloseRequested:Z,onFocusoutPrevented:j,titleId:d,bodyId:r,closed:f,style:z,overlayDialogStyle:V,rendered:v,visible:u,zIndex:C}};export{Se as E,Me as a,ge as b,Oe as c,Ee as d,me as e,Te as u};