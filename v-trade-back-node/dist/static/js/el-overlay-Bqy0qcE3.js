import{av as Z,S as A,c as B,D as F,ac as T,a1 as k,bp as G,aa as J,bq as K,ab as Q,aJ as S,b as O,d as b,a as X,y as R,q as P,ad as ee,i as oe,al as te,br as ne,r as p,bs as le,bt as ae,a7 as se,a5 as ue,o as ce,W as ie,A as I}from"./index-DpaPK14g.js";import{P as w}from"./vnode-wd0zXfV_.js";import{t as de,U as L,u as D}from"./el-button-C3BECGQo.js";import{g as re}from"./el-table-column-Om27YJSB.js";import{i as fe}from"./el-popover-B0UGxlQI.js";const ye=(e,o={})=>{Z(e)||de("[useLockscreen]","You need to pass a ref param to this function");const a=o.ns||A("popup"),c=B(()=>a.bm("parent","hidden"));if(!F||T(document.body,c.value))return;let n=0,s=!1,t="0";const d=()=>{setTimeout(()=>{typeof document>"u"||(Q(document==null?void 0:document.body,c.value),s&&document&&(document.body.style.width=t))},200)};k(e,r=>{if(!r){d();return}s=!T(document.body,c.value),s&&(t=document.body.style.width),n=re(a.namespace.value);const u=document.documentElement.clientHeight<document.body.scrollHeight,f=G(document.body,"overflowY");n>0&&(u||f==="scroll")&&s&&(document.body.style.width=`calc(100% - ${n}px)`),J(document.body,c.value)}),K(()=>d())},me=e=>{if(!e)return{onClick:S,onMousedown:S,onMouseup:S};let o=!1,a=!1;return{onClick:t=>{o&&a&&e(t),o=a=!1},onMousedown:t=>{o=t.target===t.currentTarget},onMouseup:t=>{a=t.target===t.currentTarget}}},ve=O({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:b([String,Array,Object])},zIndex:{type:b([String,Number])}}),pe={click:e=>e instanceof MouseEvent},be="overlay";var Ce=X({name:"ElOverlay",props:ve,emits:pe,setup(e,{slots:o,emit:a}){const c=A(be),n=r=>{a("click",r)},{onClick:s,onMousedown:t,onMouseup:d}=me(e.customMaskEvent?void 0:n);return()=>e.mask?R("div",{class:[c.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:s,onMousedown:t,onMouseup:d},[P(o,"default")],w.STYLE|w.CLASS|w.PROPS,["onClick","onMouseup","onMousedown"]):ee("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[P(o,"default")])}});const ke=Ce,ge=O({center:Boolean,alignCenter:Boolean,closeIcon:{type:oe},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),Oe={close:()=>!0},Ee=O({...ge,appendToBody:Boolean,appendTo:{type:b([String,Object]),default:"body"},beforeClose:{type:b(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),Me={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[L]:e=>te(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Te=(e,o)=>{var a;const n=ie().emit,{nextZIndex:s}=ne();let t="";const d=D(),r=D(),u=p(!1),f=p(!1),v=p(!1),C=p((a=e.zIndex)!=null?a:s());let y,m;const N=le("namespace",ae),z=B(()=>{const l={},i=`--${N.value}-dialog`;return e.fullscreen||(e.top&&(l[`${i}-margin-top`]=e.top),e.width&&(l[`${i}-width`]=se(e.width))),l}),V=B(()=>e.alignCenter?{display:"flex"}:{});function H(){n("opened")}function U(){n("closed"),n(L,!1),e.destroyOnClose&&(v.value=!1)}function W(){n("close")}function E(){m==null||m(),y==null||y(),e.openDelay&&e.openDelay>0?{stop:y}=I(()=>M(),e.openDelay):M()}function g(){y==null||y(),m==null||m(),e.closeDelay&&e.closeDelay>0?{stop:m}=I(()=>x(),e.closeDelay):x()}function h(){function l(i){i||(f.value=!0,u.value=!1)}e.beforeClose?e.beforeClose(l):g()}function Y(){e.closeOnClickModal&&h()}function M(){F&&(u.value=!0)}function x(){u.value=!1}function _(){n("openAutoFocus")}function $(){n("closeAutoFocus")}function q(l){var i;((i=l.detail)==null?void 0:i.focusReason)==="pointer"&&l.preventDefault()}e.lockScroll&&ye(u);function j(){e.closeOnPressEscape&&h()}return k(()=>e.modelValue,l=>{l?(f.value=!1,E(),v.value=!0,C.value=fe(e.zIndex)?s():C.value++,ue(()=>{n("open"),o.value&&(o.value.scrollTop=0)})):u.value&&g()}),k(()=>e.fullscreen,l=>{o.value&&(l?(t=o.value.style.transform,o.value.style.transform=""):o.value.style.transform=t)}),ce(()=>{e.modelValue&&(u.value=!0,v.value=!0,E())}),{afterEnter:H,afterLeave:U,beforeLeave:W,handleClose:h,onModalClick:Y,close:g,doClose:x,onOpenAutoFocus:_,onCloseAutoFocus:$,onCloseRequested:j,onFocusoutPrevented:q,titleId:d,bodyId:r,closed:f,style:z,overlayDialogStyle:V,rendered:v,visible:u,zIndex:C}};export{ke as E,Me as a,ge as b,Oe as c,Ee as d,me as e,Te as u};
