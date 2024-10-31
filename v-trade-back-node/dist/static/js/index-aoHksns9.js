import{az as C,aA as h,a as Q,ar as be,N as Ue,r as i,O as Ce,ax as he,aB as Ee,f as p,s as J,y as t,k as o,av as U,w as l,h as S,g as _,P as w,j as H,p as Ve,F as xe,as as Ne,t as Re,a5 as Se,aw as k,E as Ae}from"./index-DpaPK14g.js";import{E as ze}from"./el-card-jy9cJqIZ.js";import{E as Ie,a as Te,b as qe,c as $e,e as Be}from"./el-table-column-Om27YJSB.js";import{E as He}from"./el-drawer-BQlwjc1B.js";import"./el-overlay-Bqy0qcE3.js";import{E as Pe,a as Fe}from"./el-form-item-Utq6rYWC.js";/* empty css                 */import{E as De}from"./el-pagination-gWFwAzPI.js";import{_ as Le,a as je}from"./edit-C5rcNmWR.js";import"./el-popover-B0UGxlQI.js";import{E as Me}from"./el-button-C3BECGQo.js";import{u as Oe,_ as Ge,a as Ke}from"./usereqUserInfo-sHpCtRMa.js";import{E as Xe}from"./index-CKDBud7m.js";import{_ as Je}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./vnode-wd0zXfV_.js";const Qe=(u,A,P)=>C.get(h.AUTH+`/admin/acl/user/${u}/${A}/?username=${P}`),We=u=>u.id?C.put(h.AUTH+"/admin/acl/user/update",u):C.post(h.AUTH+"/admin/acl/user/save",u),Ye=u=>C.get(h.AUTH+"/admin/acl/user/toAssign/"+u),Ze=u=>C.post(h.AUTH+"/admin/acl/user/doAssignRole",u),et=u=>C.delete(h.AUTH+"/admin/acl/user/remove/"+u),tt=u=>C.delete(h.AUTH+"/admin/acl/user/batchRemove",{data:u}),lt={class:"container"},at={class:"singe-line-elipsis",style:{width:"50px"}},nt=Q({name:"User"}),ot=Q({...nt,setup(u){const A=be(),P=Ue(),m=i(1),z=i(5),j=i(0),I=i([]),f=i(!1),y=i(!1),V=i("I am the title"),s=Ce({username:void 0,nickName:void 0,password:void 0}),T=i(!1),q=i(!1),b=i([]),E=i([]),v=i([]),F=i(),D=i(""),x=i("");function W(a,e,r){e.trim().length>=1?r():r(new Error("用户名字至少一位~"))}function Y(a,e,r){e.trim().length>=1?r():r(new Error("用户昵称至少一位~"))}function Z(a,e,r){e.trim().length>=6?r():r(new Error("用户密码至少六位~"))}const ee={username:[{required:!0,trigger:"change",validator:W}],nickName:[{required:!0,trigger:"change",validator:Y}],password:[{required:!0,trigger:"change",validator:Z}]};async function g(a=1){m.value=a;const e=await Qe(m.value,z.value,D.value);e.code===2e4&&(j.value=e.data.total,I.value=e.data.items)}async function te(){f.value=!0,V.value="添加用户"}async function le(a){f.value=!0,V.value="编辑用户",Se(()=>{Object.assign(s,{id:a.id,username:a.username,nickName:a.nickName})})}async function ae(){await F.value.validate(),(await We(s)).code===2e4?(Oe(()=>{g(s.id?m.value:1)}),f.value=!1,k.success(s.id?"更新成功~":"添加成功~")):(f.value=!1,k.success(s.id?"更新失败~":"添加失败~"))}async function ne(a){Object.assign(s,{id:a.id,username:a.username,nickName:a.nickName});const e=await Ye(s.id);if(e.code===2e4){E.value=e.data.allRolesList,b.value=e.data.assignRoles;const r=b.value.length;q.value=r>0&&r<E.value.length,y.value=!0,V.value="分配角色"}}const oe=a=>{b.value=a?E.value:[],q.value=!1},se=a=>{const e=a.length;T.value=e===E.value.length,q.value=e>0&&e<E.value.length};async function re(){let a={userId:s.id,roleIdList:b.value.map(r=>r.id)};(await Ze(a)).code===2e4?(k.success("分配职务成功~"),y.value=!1,g(m.value)):(k.error("分配职务失败~"),y.value=!1)}async function ie(a){(await et(a)).code===2e4?(k.success("删除成功~"),g(I.value.length>1?m.value:m.value-1)):k.error("删除失败~")}function ue(a){v.value=a}async function de(){const a=v.value.map(d=>d.id),e=await tt(a);let r=m.value;v.value.length>=I.value.length&&(r=m.value-1),e.code===2e4?(k.success("批量删除成功~"),g(r)):k.error("批量删除失败~")}function me(){D.value=x.value,g(),D.value="",x.value=""}function pe(){A.windowRefresh=!A.windowRefresh}function M(){var a;(a=F.value)==null||a.resetFields(),s.id=void 0,s.password=void 0}return he(()=>{g()}),(a,e)=>{const r=Ge,d=Me,c=Ie,ce=Ke,L=Ae,fe=Le,ve=je,ge=Te,_e=qe,we=De,$=Xe,N=Pe,O=Fe,G=He,K=$e,ke=Be,ye=ze,R=Ee("hasButton");return p(),J("div",lt,[t(r,{keyword:o(x),"onUpdate:keyword":e[0]||(e[0]=B=>U(x)?x.value=B:null),onSearch:me,onReset:pe},null,8,["keyword"]),t(ye,null,{default:l(()=>{var B;return[S((p(),_(d,{type:"primary",onClick:te},{default:l(()=>e[13]||(e[13]=[w("添加用户")])),_:1})),[[R,"btn.User.add:添加用户"]]),(B=o(P).$state.userInfo.buttons)!=null&&B.includes("btn.User.remove")?(p(),_(d,{key:0,type:o(v).length?"danger":"primary",plain:!o(v).length,onClick:de,disabled:!o(v).length},{default:l(()=>e[14]||(e[14]=[w("批量删除")])),_:1},8,["type","plain","disabled"])):S((p(),_(d,{key:1,type:o(v).length?"danger":"primary",plain:!o(v).length},{default:l(()=>e[15]||(e[15]=[w("批量删除")])),_:1},8,["type","plain"])),[[R,"btn.User.remove:批量删除用户"]]),t(_e,{style:{width:"100%","margin-top":"10px"},border:"",data:o(I),onSelectionChange:ue},{default:l(()=>[t(c,{type:"selection","min-width":"40",align:"center"}),t(c,{type:"index",label:"#","min-width":"40",align:"center"}),t(c,{prop:"id",label:"id","min-width":"100","show-overflow-tooltip":"",align:"center"}),t(c,{prop:"username",label:"用户名字","min-width":"100","show-overflow-tooltip":"",align:"center"}),t(c,{prop:"nickName",label:"用户名称","min-width":"100","show-overflow-tooltip":"",align:"center"}),t(c,{prop:"roleName",label:"用户角色","min-width":"100","show-overflow-tooltip":"",align:"center"}),t(c,{prop:"gmtCreate",label:"创建时间","min-width":"200",align:"center"}),t(c,{prop:"gmtModified",label:"更新时间","min-width":"200",align:"center"}),t(c,{width:"300",label:"操作",align:"center",fixed:"right"},{default:l(({row:n})=>[S((p(),_(d,{type:"primary",size:"small",onClick:X=>ne(n)},{default:l(()=>[t(L,null,{default:l(()=>[t(ce)]),_:1}),e[16]||(e[16]=H("span",null,"分配角色",-1))]),_:2},1032,["onClick"])),[[R,"btn.User.assgin:对用户分配角色"]]),S((p(),_(d,{type:"warning",size:"small",onClick:X=>le(n)},{default:l(()=>[t(L,null,{default:l(()=>[t(fe)]),_:1}),e[17]||(e[17]=H("span",null,"编辑",-1))]),_:2},1032,["onClick"])),[[R,"btn.User.update:编辑用户"]]),t(ge,{title:`你确定要删除${n.username}么?`,width:"260px",onConfirm:X=>ie(n.id)},{reference:l(()=>[S((p(),_(d,{type:"danger",size:"small"},{default:l(()=>[t(L,null,{default:l(()=>[t(ve)]),_:1}),e[18]||(e[18]=H("span",null,"删除",-1))]),_:1})),[[R,"btn.User.remove:删除用户"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),t(we,{"current-page":o(m),"onUpdate:currentPage":e[1]||(e[1]=n=>U(m)?m.value=n:null),"page-size":o(z),"onUpdate:pageSize":e[2]||(e[2]=n=>U(z)?z.value=n:null),"page-sizes":[3,5,10],size:"small",background:!0,layout:" prev, pager, next, jumper,->,sizes,total",total:o(j),onSizeChange:e[3]||(e[3]=n=>g()),onCurrentChange:g,style:{"margin-top":"10px"}},null,8,["current-page","page-size","total"]),t(G,{modelValue:o(f),"onUpdate:modelValue":e[8]||(e[8]=n=>U(f)?f.value=n:null),title:o(V),style:{"max-width":"500px"},size:"100%",onClosed:M},{footer:l(()=>[t(d,{type:"primary",onClick:ae},{default:l(()=>e[19]||(e[19]=[w("确定")])),_:1}),t(d,{onClick:e[7]||(e[7]=n=>f.value=!1)},{default:l(()=>e[20]||(e[20]=[w("取消")])),_:1})]),default:l(()=>[t(O,{"label-width":"80px",model:o(s),rules:ee,ref_key:"formRef",ref:F},{default:l(()=>[t(N,{label:"用户姓名",prop:"username"},{default:l(()=>[t($,{placeholder:"请填写用户名字",modelValue:o(s).username,"onUpdate:modelValue":e[4]||(e[4]=n=>o(s).username=n)},null,8,["modelValue"])]),_:1}),t(N,{label:"用户昵称",prop:"nickName"},{default:l(()=>[t($,{placeholder:"请填写用户昵称",modelValue:o(s).nickName,"onUpdate:modelValue":e[5]||(e[5]=n=>o(s).nickName=n)},null,8,["modelValue"])]),_:1}),o(s).id?Ve("",!0):(p(),_(N,{key:0,label:"用户密码",prop:"password"},{default:l(()=>[t($,{placeholder:"请填写用户密码",modelValue:o(s).password,"onUpdate:modelValue":e[6]||(e[6]=n=>o(s).password=n)},null,8,["modelValue"])]),_:1}))]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),t(G,{modelValue:o(y),"onUpdate:modelValue":e[12]||(e[12]=n=>U(y)?y.value=n:null),title:o(V),style:{"max-width":"500px"},size:"100%",onClosed:M},{footer:l(()=>[t(d,{type:"primary",onClick:re},{default:l(()=>e[22]||(e[22]=[w("确定")])),_:1}),t(d,{onClick:e[11]||(e[11]=n=>y.value=!1)},{default:l(()=>e[23]||(e[23]=[w("取消")])),_:1})]),default:l(()=>[t(O,{"label-width":"80px"},{default:l(()=>[t(N,{label:"用户姓名"},{default:l(()=>[t($,{disabled:"",placeholder:o(s).username},null,8,["placeholder"])]),_:1}),t(N,{label:"职位列表"},{default:l(()=>[t(K,{modelValue:o(T),"onUpdate:modelValue":e[9]||(e[9]=n=>U(T)?T.value=n:null),indeterminate:o(q),onChange:oe},{default:l(()=>e[21]||(e[21]=[w(" Check all ")])),_:1},8,["modelValue","indeterminate"]),t(ke,{modelValue:o(b),"onUpdate:modelValue":e[10]||(e[10]=n=>U(b)?b.value=n:null),onChange:se},{default:l(()=>[(p(!0),J(xe,null,Ne(o(E),n=>(p(),_(K,{key:n.id,value:n},{default:l(()=>[H("div",at,Re(n.roleName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])]}),_:1})])}}}),bt=Je(ot,[["__scopeId","data-v-cd99635c"]]);export{bt as default};
