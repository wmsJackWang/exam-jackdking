(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c0639fe"],{1276:function(e,t,i){"use strict";var o=i("d784"),s=i("44e7"),l=i("825a"),a=i("1d80"),n=i("4840"),r=i("8aa5"),c=i("50c4"),d=i("14c3"),u=i("9263"),f=i("d039"),h=[].push,p=Math.min,m=4294967295,g=!f((function(){return!RegExp(m,"y")}));o("split",2,(function(e,t,i){var o;return o="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,i){var o=String(a(this)),l=void 0===i?m:i>>>0;if(0===l)return[];if(void 0===e)return[o];if(!s(e))return t.call(o,e,l);var n,r,c,d=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,g=new RegExp(e.source,f+"g");while(n=u.call(g,o)){if(r=g.lastIndex,r>p&&(d.push(o.slice(p,n.index)),n.length>1&&n.index<o.length&&h.apply(d,n.slice(1)),c=n[0].length,p=r,d.length>=l))break;g.lastIndex===n.index&&g.lastIndex++}return p===o.length?!c&&g.test("")||d.push(""):d.push(o.slice(p)),d.length>l?d.slice(0,l):d}:"0".split(void 0,0).length?function(e,i){return void 0===e&&0===i?[]:t.call(this,e,i)}:t,[function(t,i){var s=a(this),l=void 0==t?void 0:t[e];return void 0!==l?l.call(t,s,i):o.call(String(s),t,i)},function(e,s){var a=i(o,e,this,s,o!==t);if(a.done)return a.value;var u=l(e),f=String(this),h=n(u,RegExp),v=u.unicode,b=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),y=new h(g?u:"^(?:"+u.source+")",b),F=void 0===s?m:s>>>0;if(0===F)return[];if(0===f.length)return null===d(y,f)?[f]:[];var k=0,I=0,x=[];while(I<f.length){y.lastIndex=g?I:0;var w,S=d(y,g?f:f.slice(I));if(null===S||(w=p(c(y.lastIndex+(g?0:I)),f.length))===k)I=r(f,I,v);else{if(x.push(f.slice(k,I)),x.length===F)return x;for(var C=1;C<=S.length-1;C++)if(x.push(S[C]),x.length===F)return x;I=k=w}}return x.push(f.slice(k)),x}]}),!g)},"16a4":function(e,t,i){e.exports=i.p+"static/img/fileImg.5cab4b3f.png"},"222a":function(e,t,i){},2571:function(e,t,i){"use strict";var o=i("a5e2"),s=i.n(o);s.a},"369c":function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-page-header",{staticClass:"pageHeader",attrs:{content:"当前所处："+e.currentLocationName},on:{back:e.goBack}}),o("el-divider"),o("el-row",{staticClass:"mb8",attrs:{gutter:10}},[o("el-col",{staticStyle:{float:"right"},attrs:{span:1.5}},[o("el-button",{attrs:{plain:"",icon:"el-icon-refresh",size:"mini"},on:{click:e.refreshGetList}},[e._v("刷新")])],1),o("el-col",{staticStyle:{float:"right"},attrs:{span:1.5}},[o("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-plus",size:"mini"},on:{click:e.addFolder}},[e._v("新建文件夹")])],1),o("el-col",{staticStyle:{float:"right"},attrs:{span:1.5}},[o("el-button",{attrs:{type:"success",plain:"",icon:"el-icon-upload",size:"mini"},on:{click:e.addFile}},[e._v("上传文件")])],1)],1),o("div",{staticStyle:{overflow:"hidden"}},[o("el-card",{directives:[{name:"loading",rawName:"v-loading",value:e.cardLoading,expression:"cardLoading"}],staticClass:"drawing_card",staticStyle:{height:"60vh"}},[0===e.folderList.length&&0===e.filesList.length?[o("el-empty",{staticStyle:{height:"60vh"},attrs:{description:"暂无文件，请创建一个文件夹吧"}})]:e._e(),e._l(e.folderList,(function(t,s){return o("div",[o("div",{staticClass:"folderContainer"},[o("div",{staticClass:"folderWrapper",on:{dblclick:function(i){return e.doubleClickFolder(s,t)},contextmenu:function(i){return i.preventDefault(),i.stopPropagation(),e.rightClickFolder(s,t,i)}}},[o("img",{staticStyle:{width:"100px",height:"90px","margin-top":"-13px"},attrs:{src:i("a0e7")},on:{contextmenu:function(i){return i.preventDefault(),i.stopPropagation(),e.rightClickFolder(s,t,i)}}}),o("div",{staticClass:"folderName"},[o("span",[e._v(e._s(t.folderName.length>10?t.folderName.substring(0,6)+"...":t.folderName))])])])])])})),e._l(e.filesList,(function(t,s){return o("div",[o("div",{staticClass:"folderContainer"},[o("div",{staticClass:"folderWrapper",on:{dblclick:function(i){return e.down(t.fileUrl)}}},[o("img",{staticStyle:{width:"100px",height:"90px","margin-top":"-13px"},attrs:{src:i("16a4")},on:{contextmenu:function(i){return i.preventDefault(),i.stopPropagation(),e.rightClickfile(s,t,i)}}}),o("div",{staticClass:"folderName"},[o("span",[e._v(e._s(t.fileName.length>10?t.fileName.substring(0,6)+"...":t.fileName))])])])])])}))],2)],1),o("div",{directives:[{name:"show",rawName:"v-show",value:e.folderShow,expression:"folderShow"}],staticClass:"add-folder-9",style:e.folderStyle},[o("div",{staticClass:"add-folder-1"},[o("div",{staticClass:"add-folder-2",on:{click:e.openFolder}},[e._v(" 打开文件夹 ")]),o("div",{staticStyle:{border:"2px solid rgba(18,17,42,.07)"}}),o("div",{staticClass:"add-folder-2",on:{click:e.moveFolder}},[e._v(" 移动 ")]),o("div",{staticStyle:{border:"2px solid rgba(18,17,42,.07)"}}),o("div",{staticClass:"add-folder-2",on:{click:e.updateFloder}},[e._v(" 重命名 ")]),o("div",{staticStyle:{border:"2px solid rgba(18,17,42,.07)"}}),o("div",{staticClass:"add-folder-6",on:{click:e.deleteFolder}},[e._v(" 删 除 ")])])]),o("div",{directives:[{name:"show",rawName:"v-show",value:e.fileShow,expression:"fileShow"}],staticClass:"add-folder-9",style:e.fileStyle},[o("div",{staticClass:"add-folder-1"},[o("div",{staticClass:"add-folder-2"},[o("a",{attrs:{href:e.clickFilePath,download:"1"}},[e._v("下载文件")])]),o("div",{staticStyle:{border:"2px solid rgba(18,17,42,.07)"}}),o("div",{staticClass:"add-folder-2",on:{click:e.moveFolder}},[e._v(" 移动 ")]),o("div",{staticStyle:{border:"2px solid rgba(18,17,42,.07)"}}),o("div",{staticClass:"add-folder-6",on:{click:e.deleteFileFun}},[e._v(" 删 除 ")])])]),o("AddFolder",{ref:"addFolder1",attrs:{currentLocationId:e.currentLocationId}}),o("MoveFolder",{ref:"moveFolder1",attrs:{moveData:e.moveData}})],1)},s=[],l=i("a5d1"),a=i("e14f"),n=i("d4d8"),r={name:"shareSpace",components:{AddFolder:l["a"],MoveFolder:a["a"]},data:function(){return{isCollapse:!0,historyFolderId:0,historyFolderName:"",currentLocationId:0,currentLocationName:"共享空间",moveData:{typeofFolder:0,clickFolderId:-1},cardLoading:!1,folderList:[],filesList:[],folderStyle:{left:"0px",top:"0px"},folderShow:!1,clickFolderId:-1,clickFolderName:"",fileStyle:{left:"0px",top:"0px"},fileShow:!1,clickFileId:-1,clickFileName:"",clickFilePath:"",queryParams:{folderId:0}}},methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)},a:function(){window.open("这里填服务器储存文件的地址啦~"+this.clickFileName)},goBack:function(){0===this.currentLocationId?this.$message({message:"已经不能再往后退啦！",type:"warning"}):(this.queryParams.folderId=this.historyFolderId,this.currentLocationId=this.historyFolderId,this.currentLocationName=null==this.historyFolderName?"文件管理空间":this.historyFolderName,this.historyFolderId=this.currentLocationId,this.historyFolderName=this.currentLocationName,this.getList())},getList:function(){var e=this;this.loading=!0,Object(n["i"])(this.queryParams).then((function(t){console.log(t),e.folderList=t.data.folders,e.filesList=t.data.sysFiles,e.historyFolderId=null==t.data.sysFolder?0:t.data.sysFolder.parentId,e.historyFolderName=null==t.data.sysFolder?"文件管理空间":t.data.sysFolder.parentName}))},refreshGetList:function(){this.queryParams.folderId=this.currentLocationId,this.getList(),this.$message({message:"已经成功获取最新数据啦！",type:"success"}),this.initClickId()},addFile:function(){this.$refs.addFolder1.open()},addFolder:function(){var e=this;this.$prompt("请输入新文件夹名称","创建文件夹",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(t){var i=t.value,o={folderName:i,parentId:e.currentLocationId};Object(n["b"])(o).then((function(t){if(200===t.code){e.$message({type:"success",message:"创建成功 "});var i=e;setTimeout((function(){i.refreshGetList()}),500)}else e.$message({type:"error",message:"创建失败 "})}))})).catch((function(){}))},updateFloder:function(){var e=this;this.folderShow=!1,this.$prompt("请输入文件夹的新名称","重命名",{confirmButtonText:"确定",cancelButtonText:"取消",inputValue:this.clickFolderName,inputErrorMessage:"输入不能为空",inputValidator:function(e){if(!e)return"输入不能为空"}}).then((function(t){var i=t.value,o={folderName:i,folderId:e.clickFolderId};Object(n["j"])(o).then((function(t){if(200===t.code){e.$message({type:"success",message:"修改成功 "});var i=e;setTimeout((function(){i.refreshGetList()}),500)}else e.$message({type:"error",message:"修改失败 "})}))}))},deleteFolder:function(){var e=this;this.folderShow=!1,this.$confirm("此操作将永久删除该文件夹，包括文件夹内的所有内容，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["d"])(e.clickFolderId).then((function(t){if(200===t.code){e.$message({type:"success",message:"删除成功 "});var i=e;setTimeout((function(){i.refreshGetList()}),1e3)}else e.$message({type:"error",message:"删除失败！ "})}))}))},openFolder:function(){this.folderShow=!1,this.queryParams.folderId=this.clickFolderId,this.currentLocationId=this.clickFolderId,this.currentLocationName=this.clickFolderName,this.getList()},doubleClickFolder:function(e,t){this.clickFolderId=t.folderId,this.clickFolderName=t.folderName,this.openFolder()},rightClickFolder:function(e,t,i){this.initClickId(),this.clickFolderId=t.folderId,this.clickFolderName=t.folderName,this.folderStyle.left=i.pageX-140+"px",this.folderStyle.top=i.pageY-70+"px",this.folderShow=!0,this.moveData.typeofFolder=1},rightClickfile:function(e,t,i){this.initClickId(),this.clickFileId=t.fileId,this.clickFileName=t.fileName,this.clickFilePath="https://huang-pu.oss-cn-guangzhou.aliyuncs.com/"+t.filePath,this.fileStyle.left=i.pageX-140+"px",this.fileStyle.top=i.pageY-70+"px",this.fileShow=!0,this.moveData.typeofFolder=2},deleteFileFun:function(){var e=this;this.fileShow=!1,this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["c"])(e.clickFileId).then((function(t){if(200===t.code){e.$message({type:"success",message:"删除成功 "});var i=e;setTimeout((function(){i.refreshGetList()}),1e3)}else e.$message({type:"error",message:"删除失败！ "})}))}))},moveFolder:function(){this.fileShow=!1,-1!==this.clickFolderId?this.moveData.clickFolderId=this.clickFolderId:this.moveData.clickFolderId=this.clickFileId,this.$refs.moveFolder1.open()},initClickId:function(){this.clickFileId=-1,this.clickFolderId=-1,this.fileShow=!1,this.folderShow=!1}},mounted:function(){var e=this;document.addEventListener("click",(function(t){if(e.folderShow||e.fileShow){var i=t.target;while(i&&i.parentNode){if("folderContainer"===i.parentNode.class)return;i=i.parentNode}e.folderShow=!1,e.fileShow=!1,e.clickFolderId=-1,e.clickFileId=-1}}))},created:function(){this.getList()}},c=r,d=(i("3a9e"),i("2571"),i("2877")),u=Object(d["a"])(c,o,s,!1,null,"bd44b796",null);t["default"]=u.exports},"3a9e":function(e,t,i){"use strict";var o=i("222a"),s=i.n(o);s.a},"44e7":function(e,t,i){var o=i("861d"),s=i("c6b6"),l=i("b622"),a=l("match");e.exports=function(e){var t;return o(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==s(e))}},"8de8":function(e,t,i){"use strict";var o=i("a665"),s=i.n(o);s.a},a0e7:function(e,t,i){e.exports=i.p+"static/img/folder.9fc6daf5.png"},a15b:function(e,t,i){"use strict";var o=i("23e7"),s=i("44ad"),l=i("fc6a"),a=i("a640"),n=[].join,r=s!=Object,c=a("join",",");o({target:"Array",proto:!0,forced:r||!c},{join:function(e){return n.call(l(this),void 0===e?",":e)}})},a5d1:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.dialogVisible?i("el-dialog",{attrs:{"modal-append-to-body":!1,"close-on-click-modal":!1,title:"上传文件",visible:e.dialogVisible,"show-close":!1,width:"400px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{data:e.dataObj,action:"这里填写文件上传到的服务器地址",drag:"",limit:1,"on-success":e.uploadSuccess,"on-error":e.uploadError,"on-exceed":e.handleExceed,"before-upload":e.beforeUpload,"auto-upload":!1}},[i("i",{staticClass:"el-icon-upload"}),i("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),i("em",[e._v("点击上传,当前目录只允许上传1个文件")])])]),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-button",{attrs:{icon:"el-icon-upload2",type:"success"},on:{click:e.submit}},[e._v("提交")]),i("el-button",{on:{click:e.close}},[e._v("取消")])],1)],1):e._e()},s=[],l=(i("a15b"),i("b0c0"),i("d3b7"),i("ac1f"),i("1276"),i("d4d8")),a={name:"AddFolder",props:["currentLocationId"],data:function(){return{dataObj:{},dialogVisible:!1,fileInfo:{fileName:"",filePath:"",fileSize:0,folderId:0}}},methods:{getUUID:function(){var e,t,i=32,o=16,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),l=[];if(o=o||s.length,i)for(e=0;e<i;e++)l[e]=s[0|Math.random()*o];else for(l[8]=l[13]=l[18]=l[23]="-",l[14]="4",e=0;e<36;e++)l[e]||(t=0|16*Math.random(),l[e]=s[19===e?3&t|8:t]);return l.join("")},open:function(){this.dialogVisible=!0},close:function(){this.dialogVisible=!1,this.$parent.refreshGetList()},handleExceed:function(){this.$message.error("当前目录只能上传一个文件!")},uploadSuccess:function(e){this.dialogVisible=!1,this.$parent.refreshGetList()},uploadError:function(){this.$message.error("服务器异常请重试!")},submit:function(){this.$refs.upload.submit()},beforeUpload:function(e){var t=this;return new Promise((function(i,o){Object(l["h"])().then((function(o){t.dataObj.policy=o.data.policy,t.dataObj.signature=o.data.signature,t.dataObj.ossaccessKeyId=o.data.accessid,t.dataObj.dir=o.data.dir,t.dataObj.host=o.data.host,t.dataObj.key=o.data.dir+t.getUUID()+e.name,console.log(t.dataObj),t.fileInfo.fileName=e.name,t.fileInfo.filePath=t.dataObj.key,t.fileInfo.fileSize=parseInt(e.size/2024),console.log(t.fileInfo),i(!0),t.fileInfo.folderId=t.currentLocationId,Object(l["a"])(t.fileInfo).then((function(e){200===e.code?t.$message({type:"success",message:"上传成功 "}):t.$message({type:"error",message:"上传失败 "})}))}))}))}}},n=a,r=i("2877"),c=Object(r["a"])(n,o,s,!1,null,"014cbff6",null);t["a"]=c.exports},a5e2:function(e,t,i){},a665:function(e,t,i){},e14f:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.dialogVisible?i("el-dialog",{staticClass:"moveFolderDialog",attrs:{"modal-append-to-body":!1,"close-on-click-modal":!1,title:"移动",visible:e.dialogVisible,"show-close":!1,width:"400px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-alert",{attrs:{title:"请选择要将当前文件（夹）移动到：",type:"info","show-icon":""}}),i("el-tree",{ref:"tree",attrs:{accordion:"",data:e.data,"node-key":"id","highlight-current":""},on:{"node-click":e.handleNodeClick}}),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-button",{attrs:{type:"success"},on:{click:e.submit}},[e._v("确定")]),i("el-button",{on:{click:e.close}},[e._v("取消")])],1)],1):e._e()},s=[],l=i("d4d8"),a={name:"MoveFolder",props:["moveData"],data:function(){return{dialogVisible:!1,data:[],defaultProps:{children:"children",label:"label"},clickDirectoryId:-1}},methods:{open:function(){var e=this;this.dialogVisible=!0,Object(l["e"])().then((function(t){console.log(t),e.data=t.data}))},close:function(){this.dialogVisible=!1},submit:function(){1===this.moveData.typeofFolder&&this.moveData.clickFolderId===this.clickDirectoryId?this.$message({type:"error",message:"移动失败！请勿把文件夹移动到它本身中！ "}):1===this.moveData.typeofFolder?this.moveFolderFun():2===this.moveData.typeofFolder&&this.moveFileFun()},moveFolderFun:function(){var e=this,t={folderId:this.moveData.clickFolderId,parentId:this.clickDirectoryId};Object(l["g"])(t).then((function(t){if(200===t.code){e.$message({type:"success",message:"修改成功 "});var i=e;e.dialogVisible=!1,setTimeout((function(){i.$parent.refreshGetList()}),500)}else e.$message({type:"error",message:"修改失败 "})}))},moveFileFun:function(){var e=this,t={fileId:this.moveData.clickFolderId,folderId:this.clickDirectoryId};Object(l["f"])(t).then((function(t){if(200===t.code){e.$message({type:"success",message:"修改成功 "});var i=e;e.dialogVisible=!1,setTimeout((function(){i.$parent.refreshGetList()}),500)}else e.$message({type:"error",message:"修改失败 "})}))},handleNodeClick:function(e){this.clickDirectoryId=e.id}}},n=a,r=(i("8de8"),i("2877")),c=Object(r["a"])(n,o,s,!1,null,null,null);t["a"]=c.exports}}]);