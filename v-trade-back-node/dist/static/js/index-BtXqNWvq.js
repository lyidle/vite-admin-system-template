import{o as m,c as p,d as h,r as x,u as N,a as C,b as I,e as S,f as o,w as t,g as s,h as a,t as U,i as q,E as d,j as L}from"./index-zCZRYDTo.js";import{E as R,a as H}from"./el-col-BVf82YNH.js";import{E as T,a as j}from"./el-form-item-ndx7fGQi.js";import{E as D}from"./el-button-feFDLJ41.js";/* empty css                 */import{g as J}from"./time-ChaK_OaL.js";import{_}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{E as M}from"./index-DlRGIAZ6.js";const O={},z={class:"i-ep-user"};function A(f,l){return m(),p("i",z)}const G=_(O,[["render",A]]),K={},P={class:"i-ep-lock"};function Q(f,l){return m(),p("i",P)}const W=_(K,[["render",Q]]),X={class:"login-container"},Y=h({name:"Login"}),Z=h({...Y,setup(f){let l=x();const v=N(),y=C(),g=I();let n=x(!1);const r=S({username:"admin",password:"111111"}),V="硅谷甄选运营平台",$={username:[{required:!0,min:5,message:"账号长度至少五位",trigger:"change"}],password:[{required:!0,min:6,message:"密码长度至少六位",trigger:"change"}]};async function k(){try{await l.value.validate()}catch{d.warning("请输入符合规则的信息~");return}n.value=!0;try{await g.userLogin(r),await g.userInfo(),v.push(`${y.query.redirect||"/"}`),L({type:"success",message:"欢迎回来",title:`Hi,${J()}好~`}),n.value=!1}catch(i){try{JSON.parse(i.message),d.error("请输入正确的信息~")}catch{d.error(i.message)}n.value=!1}}return(i,e)=>{const w=R,u=T,E=M,b=D,B=j,F=H;return m(),p("div",X,[o(F,null,{default:t(()=>[o(w,{span:12,xs:0}),o(w,{span:12,xs:24},{default:t(()=>[o(B,{class:"login-form",model:s(r),rules:$,ref_key:"loginForms",ref:l},{default:t(()=>[o(u),e[3]||(e[3]=a("h1",null,"Hello",-1)),a("h2",null,"欢迎来到"+U(s(V)),1),o(u,{prop:"username"},{default:t(()=>[o(E,{placeholder:"","prefix-icon":G,modelValue:s(r).username,"onUpdate:modelValue":e[0]||(e[0]=c=>s(r).username=c)},null,8,["modelValue"])]),_:1}),o(u,{prop:"password"},{default:t(()=>[o(E,{placeholder:"",type:"password","prefix-icon":W,modelValue:s(r).password,"onUpdate:modelValue":e[1]||(e[1]=c=>s(r).password=c),"show-password":""},null,8,["modelValue"])]),_:1}),o(u,null,{default:t(()=>[o(b,{loading:s(n),disabled:s(n),type:"primary",class:"login-submit",onClick:k},{default:t(()=>e[2]||(e[2]=[q("登录")])),_:1},8,["loading","disabled"])]),_:1})]),_:1},8,["model"])]),_:1})]),_:1}),e[4]||(e[4]=a("div",{class:"account"},[a("div",null,"username: admin"),a("div",{style:{"user-select":"none",height:"100%",width:"10px"}}),a("div",null,"password: 111111")],-1))])}}}),ie=_(Z,[["__scopeId","data-v-34f29636"]]);export{ie as default};