import{ar as h,as as E,d as Y,al as _e,b as ke,r as i,e as ye,ap as be,at as Ue,o as p,c as X,f as l,g as o,ao as U,w as t,a5 as A,A as w,i as _,h as C,W as Ce,Y as he,am as Ee,t as Ve,R as xe,E as k,C as Re}from"./index-zCZRYDTo.js";import{E as Ne}from"./el-card-BkJPws7M.js";import{E as Se,a as Ae,b as ze,c as Ie,e as Te}from"./el-table-column-YrvKGUHw.js";import{E as qe}from"./el-drawer-D9P-AKto.js";import"./el-overlay-DpAhsVqO.js";import{E as $e,a as Be}from"./el-form-item-ndx7fGQi.js";/* empty css                 */import{E as He}from"./el-pagination-B65dXRP6.js";import"./el-select-CQH5Taqg.js";import"./el-popover-_8Ap7mUU.js";import{E as Pe}from"./el-button-feFDLJ41.js";import{u as Fe,_ as Le}from"./usereqUserInfo-C7WvJurb.js";import{E as De}from"./index-DlRGIAZ6.js";import{_ as Me}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./vnode-Dy4NM1xu.js";const je=(u,z,P)=>h.get(E.AUTH+`/admin/acl/user/${u}/${z}/?username=${P}`),Oe=u=>u.id?h.put(E.AUTH+"/admin/acl/user/update",u):h.post(E.AUTH+"/admin/acl/user/save",u),Ge=u=>h.get(E.AUTH+"/admin/acl/user/toAssign/"+u),Ke=u=>h.post(E.AUTH+"/admin/acl/user/doAssignRole",u),We=u=>h.delete(E.AUTH+"/admin/acl/user/remove/"+u),Xe=u=>h.delete(E.AUTH+"/admin/acl/user/batchRemove",{data:u}),Ye={class:"container"},Je={class:"singe-line-elipsis",style:{width:"50px"}},Qe=Y({name:"User"}),Ze=Y({...Qe,setup(u){const z=_e(),P=ke(),m=i(1),I=i(5),M=i(0),T=i([]),f=i(!1),y=i(!1),x=i("I am the title"),s=ye({username:void 0,nickName:void 0,password:void 0}),q=i(!1),$=i(!1),b=i([]),V=i([]),v=i([]),F=i(),L=i(""),R=i("");function J(a,e,r){e.trim().length>=1?r():r(new Error("用户名字至少一位~"))}function Q(a,e,r){e.trim().length>=1?r():r(new Error("用户昵称至少一位~"))}function Z(a,e,r){e.trim().length>=6?r():r(new Error("用户密码至少六位~"))}const ee={username:[{required:!0,trigger:"change",validator:J}],nickName:[{required:!0,trigger:"change",validator:Q}],password:[{required:!0,trigger:"change",validator:Z}]};async function g(a=1){m.value=a;const e=await je(m.value,I.value,L.value);e.code===2e4&&(M.value=e.data.total,T.value=e.data.items)}async function le(){f.value=!0,x.value="添加用户"}async function te(a){f.value=!0,x.value="编辑用户",xe(()=>{Object.assign(s,{id:a.id,username:a.username,nickName:a.nickName})})}async function ae(){await F.value.validate(),(await Oe(s)).code===2e4?(Fe(()=>{g(s.id?m.value:1)}),f.value=!1,k.success(s.id?"更新成功~":"添加成功~")):(f.value=!1,k.success(s.id?"更新失败~":"添加失败~"))}async function ne(a){Object.assign(s,{id:a.id,username:a.username,nickName:a.nickName});const e=await Ge(s.id);if(e.code===2e4){V.value=e.data.allRolesList,b.value=e.data.assignRoles;const r=b.value.length;$.value=r>0&&r<V.value.length,y.value=!0,x.value="分配角色"}}const oe=a=>{b.value=a?V.value:[],$.value=!1},se=a=>{const e=a.length;q.value=e===V.value.length,$.value=e>0&&e<V.value.length};async function re(){let a={userId:s.id,roleIdList:b.value.map(r=>r.id)};(await Ke(a)).code===2e4?(k.success("分配职务成功~"),y.value=!1,g(m.value)):(k.error("分配职务失败~"),y.value=!1)}async function ie(a){(await We(a)).code===2e4?(k.success("删除成功~"),g(T.value.length>1?m.value:m.value-1)):k.error("删除失败~")}function ue(a){v.value=a}async function de(){const a=v.value.map(d=>d.id),e=await Xe(a);let r=m.value;v.value.length>=T.value.length&&(r=m.value-1),e.code===2e4?(k.success("批量删除成功~"),g(r)):k.error("批量删除失败~")}function me(){L.value=R.value,g(),L.value="",R.value=""}function pe(){z.windowRefresh=!z.windowRefresh}function j(){var a;(a=F.value)==null||a.resetFields(),s.id=void 0,s.password=void 0}return be(()=>{g()}),(a,e)=>{const r=Le,d=Pe,c=Se,D=Re,ce=Ae,fe=ze,ve=He,B=De,N=$e,O=Be,G=qe,K=Ie,ge=Te,we=Ne,S=Ue("hasButton");return p(),X("div",Ye,[l(r,{keyword:o(R),"onUpdate:keyword":e[0]||(e[0]=H=>U(R)?R.value=H:null),onSearch:me,onReset:pe},null,8,["keyword"]),l(we,null,{default:t(()=>{var H;return[A((p(),w(d,{type:"primary",onClick:le},{default:t(()=>e[13]||(e[13]=[_("添加用户")])),_:1})),[[S,"btn.User.add:添加用户"]]),(H=o(P).$state.userInfo.buttons)!=null&&H.includes("btn.User.remove")?(p(),w(d,{key:0,type:o(v).length?"danger":"primary",plain:!o(v).length,onClick:de,disabled:!o(v).length},{default:t(()=>e[14]||(e[14]=[_("批量删除")])),_:1},8,["type","plain","disabled"])):A((p(),w(d,{key:1,type:o(v).length?"danger":"primary",plain:!o(v).length},{default:t(()=>e[15]||(e[15]=[_("批量删除")])),_:1},8,["type","plain"])),[[S,"btn.User.remove:批量删除用户"]]),l(fe,{style:{width:"100%","margin-top":"10px"},border:"",data:o(T),onSelectionChange:ue},{default:t(()=>[l(c,{type:"selection","min-width":"40",align:"center"}),l(c,{type:"index",label:"#","min-width":"40",align:"center"}),l(c,{prop:"id",label:"id","min-width":"100","show-overflow-tooltip":"",align:"center"}),l(c,{prop:"username",label:"用户名字","min-width":"100","show-overflow-tooltip":"",align:"center"}),l(c,{prop:"nickName",label:"用户名称","min-width":"100","show-overflow-tooltip":"",align:"center"}),l(c,{prop:"roleName",label:"用户角色","min-width":"100","show-overflow-tooltip":"",align:"center"}),l(c,{prop:"gmtCreate",label:"创建时间","min-width":"200",align:"center"}),l(c,{prop:"gmtModified",label:"更新时间","min-width":"200",align:"center"}),l(c,{width:"300",label:"操作",align:"center",fixed:"right"},{default:t(({row:n})=>[A((p(),w(d,{type:"primary",size:"small",onClick:W=>ne(n)},{default:t(()=>[l(D,null,{default:t(()=>e[16]||(e[16]=[C("i",{class:"i-ep-user"},null,-1)])),_:1}),e[17]||(e[17]=C("span",null,"分配角色",-1))]),_:2},1032,["onClick"])),[[S,"btn.User.assgin:对用户分配角色"]]),A((p(),w(d,{type:"warning",size:"small",onClick:W=>te(n)},{default:t(()=>[l(D,null,{default:t(()=>e[18]||(e[18]=[C("i",{class:"i-ep-edit"},null,-1)])),_:1}),e[19]||(e[19]=C("span",null,"编辑",-1))]),_:2},1032,["onClick"])),[[S,"btn.User.update:编辑用户"]]),l(ce,{title:`你确定要删除${n.username}么?`,width:"260px",onConfirm:W=>ie(n.id)},{reference:t(()=>[A((p(),w(d,{type:"danger",size:"small"},{default:t(()=>[l(D,null,{default:t(()=>e[20]||(e[20]=[C("i",{class:"i-ep-delete"},null,-1)])),_:1}),e[21]||(e[21]=C("span",null,"删除",-1))]),_:1})),[[S,"btn.User.remove:删除用户"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),l(ve,{"current-page":o(m),"onUpdate:currentPage":e[1]||(e[1]=n=>U(m)?m.value=n:null),"page-size":o(I),"onUpdate:pageSize":e[2]||(e[2]=n=>U(I)?I.value=n:null),"page-sizes":[3,5,10],size:"small",background:!0,layout:" prev, pager, next, jumper,->,sizes,total",total:o(M),onSizeChange:e[3]||(e[3]=n=>g()),onCurrentChange:g,style:{"margin-top":"10px"}},null,8,["current-page","page-size","total"]),l(G,{modelValue:o(f),"onUpdate:modelValue":e[8]||(e[8]=n=>U(f)?f.value=n:null),title:o(x),style:{"max-width":"500px"},size:"100%",onClosed:j},{footer:t(()=>[l(d,{type:"primary",onClick:ae},{default:t(()=>e[22]||(e[22]=[_("确定")])),_:1}),l(d,{onClick:e[7]||(e[7]=n=>f.value=!1)},{default:t(()=>e[23]||(e[23]=[_("取消")])),_:1})]),default:t(()=>[l(O,{"label-width":"80px",model:o(s),rules:ee,ref_key:"formRef",ref:F},{default:t(()=>[l(N,{label:"用户姓名",prop:"username"},{default:t(()=>[l(B,{placeholder:"请填写用户名字",modelValue:o(s).username,"onUpdate:modelValue":e[4]||(e[4]=n=>o(s).username=n)},null,8,["modelValue"])]),_:1}),l(N,{label:"用户昵称",prop:"nickName"},{default:t(()=>[l(B,{placeholder:"请填写用户昵称",modelValue:o(s).nickName,"onUpdate:modelValue":e[5]||(e[5]=n=>o(s).nickName=n)},null,8,["modelValue"])]),_:1}),o(s).id?Ce("",!0):(p(),w(N,{key:0,label:"用户密码",prop:"password"},{default:t(()=>[l(B,{placeholder:"请填写用户密码",modelValue:o(s).password,"onUpdate:modelValue":e[6]||(e[6]=n=>o(s).password=n)},null,8,["modelValue"])]),_:1}))]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),l(G,{modelValue:o(y),"onUpdate:modelValue":e[12]||(e[12]=n=>U(y)?y.value=n:null),title:o(x),style:{"max-width":"500px"},size:"100%",onClosed:j},{footer:t(()=>[l(d,{type:"primary",onClick:re},{default:t(()=>e[25]||(e[25]=[_("确定")])),_:1}),l(d,{onClick:e[11]||(e[11]=n=>y.value=!1)},{default:t(()=>e[26]||(e[26]=[_("取消")])),_:1})]),default:t(()=>[l(O,{"label-width":"80px"},{default:t(()=>[l(N,{label:"用户姓名"},{default:t(()=>[l(B,{disabled:"",placeholder:o(s).username},null,8,["placeholder"])]),_:1}),l(N,{label:"职位列表"},{default:t(()=>[l(K,{modelValue:o(q),"onUpdate:modelValue":e[9]||(e[9]=n=>U(q)?q.value=n:null),indeterminate:o($),onChange:oe},{default:t(()=>e[24]||(e[24]=[_(" Check all ")])),_:1},8,["modelValue","indeterminate"]),l(ge,{modelValue:o(b),"onUpdate:modelValue":e[10]||(e[10]=n=>U(b)?b.value=n:null),onChange:se},{default:t(()=>[(p(!0),X(he,null,Ee(o(V),n=>(p(),w(K,{key:n.id,value:n},{default:t(()=>[C("div",Je,Ve(n.roleName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])]}),_:1})])}}}),vl=Me(Ze,[["__scopeId","data-v-fcde76c5"]]);export{vl as default};