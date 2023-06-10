(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e18d908"],{"007d":function(e,t,n){"use strict";n.r(t);var o=n("22b4"),r=n("2da7");Object(o["a"])(r["a"])},"0b10":function(e,t,n){"use strict";var o=n("764f"),r=n.n(o);r.a},"0d75":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"chart",attrs:{id:"chart"}})},r=[],i=(n("4160"),n("c975"),n("b0c0"),n("159b"),n("6b75"));function a(e){if(Array.isArray(e))return Object(i["a"])(e)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function c(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}var s=n("06c5");function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e){return a(e)||c(e)||Object(s["a"])(e)||l()}n("96cf");var u=n("1da1"),f=n("3eba");n("23ee"),n("007d"),n("627c");var m={name:"Charts",props:{chartList:{type:Object,required:!0}},watch:{chartList:{immediate:!0,deep:!0,handler:function(e){var t=this;console.log("handler echarts:"+JSON.stringify(e)),this.$nextTick((function(){t.formatData(e||[],!0);var n=0;e.seriesData.forEach((function(e){console.log("item:"+JSON.stringify(e)),n<e.id&&(n=e.id)})),t.maxId=n,console.log("maxId:"+t.maxId)}))}}},data:function(){return{maxId:void 0,myChart:void 0,seriesData:[],seriesLinks:[],categories:["mysql"],lastClickId:"",colors:["#a3d2ca","#056676","#ea2c62","#16a596","#03c4a1","#f5a25d","#8CD282","#32e0c4","#00FAE1","#f05454"]}},methods:{doubleClickNode:function(e,t){console.log("maxId:"+t+"  调用父类方法NodeClick:"+JSON.stringify(e)),this.$parent.doubleClickGraphNode(e,t)},clickNode:function(e,t){console.log("maxId:"+t+"  调用父类方法NodeClick:"+JSON.stringify(e)),this.$parent.clickGraphNode(e,t)},contextMenuClick:function(e,t,n){console.log("maxId:"+t+"  contextmenuGraphNode:"+JSON.stringify(e)),this.$parent.contextMenuGraphNode(e,t,n)},nodeClick:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:console.log("maxId:"+t.maxId+"点了节点:"+JSON.stringify(e.data),"clicked"),t.clickNode(e.data,t.maxId);case 2:case"end":return n.stop()}}),n)})))()},nodeDoubleClick:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:console.log("maxId:"+t.maxId+"双击了节点:"+JSON.stringify(e.data),"clicked"),t.doubleClickNode(e.data,t.maxId);case 2:case"end":return n.stop()}}),n)})))()},nodeContextMenuClick:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:console.log("maxId:"+t.maxId+"双击了节点:"+JSON.stringify(e.data),"clicked"),console.log("event:"+JSON.stringify(e.event.offsetX)),t.contextMenuClick(e.data,t.maxId,e.event);case 3:case"end":return n.stop()}}),n)})))()},initCharts:function(){var e=this;this.myChart||(this.myChart=f.init(document.getElementById("chart")),this.myChart.on("click",(function(t){console.log("params:"),"node"===t.dataType&&e.nodeClick(t)})),this.myChart.on("dblclick",(function(t){console.log("dblclick"),"node"===t.dataType&&e.nodeDoubleClick(t)})),document.oncontextmenu=function(){return!1},this.myChart.off("contextmenu"),this.myChart.on("contextmenu",(function(t){console.log("dblclick"),"node"===t.dataType&&e.nodeContextMenuClick(t)})));var t={animationDurationUpdate:100,animationEasingUpdate:"quinticInOut",tooltip:{formatter:function(e){return e.data.content}},toolbox:{show:!0,feature:{mark:{show:!0},saveAsImage:{show:!0}}},series:[{type:"graph",layout:"force",legendHoverLink:!0,hoverAnimation:!0,focusNodeAdjacency:!0,edgeLabel:{position:"middle",normal:{show:!0,textStyle:{fontSize:12},position:"middle",formatter:function(e){return e.data.name}}},edgeSymbol:["","arrow"],force:{edgeLength:100,repulsion:300},roam:!0,draggable:!1,itemStyle:{normal:{color:"#00FAE1",cursor:"pointer",label:{show:!0,position:[-10,-15],textStyle:{color:"#545454",fontStyle:"normal",fontWeight:"bold",fontFamily:"sans-serif",fontSize:12}},nodeStyle:{brushType:"both",borderColor:"rgba(255,215,0,0.4)",borderWidth:1}},emphasis:{shadowColor:"#00FAE1",shadowOffsetX:0,shadowOffsetY:0,shadowBlur:40}},lineStyle:{width:2},label:{fontSize:18},symbolSize:24,links:this.seriesLinks,data:this.seriesData,categories:this.categories,cursor:"pointer"}]};this.myChart.setOption(t)},formatData:function(e){var t,n,o=this,r=(arguments.length>1&&void 0!==arguments[1]&&arguments[1],this),i=e.seriesData;this.seriesData=[],this.seriesLinks=[];var a=0,c=[],s=[];i.forEach((function(e,t){e.categary&&-1===s.indexOf(e.categary)&&(a=Math.floor(Math.random()*r.colors.length),s.push(e.categary),o.categories.push({name:e.categary})),e.itemStyle={color:r.colors[a],borderColor:"#ffffff"},c.push(e)})),(t=this.seriesData).push.apply(t,c),(n=this.seriesLinks).push.apply(n,d(e.linksData)),this.initCharts()}},beforeDestroy:function(){}},g=m,h=(n("29f0"),n("2877")),p=Object(h["a"])(g,o,r,!1,null,"57f49bdc",null);t["a"]=p.exports},"23ee":function(e,t,n){"use strict";n.r(t);var o=n("22b4"),r=n("efb0");Object(o["a"])(r["a"])},"29f0":function(e,t,n){"use strict";var o=n("51d1"),r=n.n(o);r.a},"38e3":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-contain",staticStyle:{"margin-top":"10px",height:"100%",width:"100%"}},[e.showMenu?n("div",{ref:"popMenu",staticClass:"position-absolute popup-menu flex flex-col"},e._l(e.menuData,(function(t){return n("div",{key:t.key,staticClass:"popup-menu-item pointer flex flex-center-cz padding-left-m",attrs:{"data-id":t.id},on:{click:e.itemClick}},[e._v(e._s(t.name)+" ")])})),0):e._e(),n("Charts",{directives:[{name:"loading",rawName:"v-loading",value:e.formLoading,expression:"formLoading"},{name:"show",rawName:"v-show",value:2===e.type,expression:"type === 2"}],ref:"charts",attrs:{chartList:e.searchList}}),n("el-dialog",{attrs:{visible:e.createDialogVisible},on:{"update:visible":function(t){e.createDialogVisible=t}}},[n("el-form",{ref:"createKnowledgeForm",attrs:{model:e.createKnowledgeForm,rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"知识："}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.createKnowledgeForm.konwledgeType,callback:function(t){e.$set(e.createKnowledgeForm,"konwledgeType",t)},expression:"createKnowledgeForm.konwledgeType"}},e._l(e.knowledgeTypeEnum,(function(e){return n("el-option",{key:e.key,attrs:{label:e.value,value:e.key}})})),1)],1),n("el-form-item",{attrs:{label:"简略内容"}},[n("el-input",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"简略内容"},model:{value:e.createKnowledgeForm.shortText,callback:function(t){e.$set(e.createKnowledgeForm,"shortText",t)},expression:"createKnowledgeForm.shortText"}})],1),n("el-form-item",{attrs:{label:"全部内容"}},[n("el-input",{ref:"myQuillEditor",attrs:{type:"textarea",rows:"10"},model:{value:e.createKnowledgeForm.content,callback:function(t){e.$set(e.createKnowledgeForm,"content",t)},expression:"createKnowledgeForm.content"}})],1),n("el-form-item",[n("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){return e.confirmCreate("createKnowledgeForm")}}},[e._v("确定")])],1)],1)],1),n("el-dialog",{attrs:{visible:e.updateDialogVisible},on:{"update:visible":function(t){e.updateDialogVisible=t}}},[n("el-form",{ref:"updateKnowledgeForm",attrs:{model:e.createKnowledgeForm,rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"知识："}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.createKnowledgeForm.konwledgeType,callback:function(t){e.$set(e.createKnowledgeForm,"konwledgeType",t)},expression:"createKnowledgeForm.konwledgeType"}},e._l(e.knowledgeTypeEnum,(function(e){return n("el-option",{key:e.key,attrs:{label:e.value,value:e.key}})})),1)],1),n("el-form-item",{attrs:{label:"简略内容"}},[n("el-input",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"简略内容"},model:{value:e.createKnowledgeForm.shortText,callback:function(t){e.$set(e.createKnowledgeForm,"shortText",t)},expression:"createKnowledgeForm.shortText"}})],1),n("el-form-item",{attrs:{label:"全部内容"}},[n("el-input",{ref:"myQuillEditor",attrs:{type:"textarea",rows:"10"},model:{value:e.createKnowledgeForm.content,callback:function(t){e.$set(e.createKnowledgeForm,"content",t)},expression:"createKnowledgeForm.content"}})],1),n("el-form-item",[n("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){return e.confirmUpdate()}}},[e._v("确定")])],1)],1)],1)],1)},r=[],i=(n("b0c0"),n("5530")),a=n("0d75"),c=n("2f62"),s=n("57d8"),l={components:{Charts:a["a"]},data:function(){return{showMenu:!1,clientX:"",clientY:"",menuData:[{id:"rename",name:"重命名",key:"1"},{id:"remove",name:"移动",key:"2"},{id:"delete",name:"删除",key:"3"}],createKnowledgeForm:{id:void 0,konwledgeType:void 0,infotextcontentid:void 0,shortText:void 0,content:void 0,parentKonwledgeId:void 0},createDialogVisible:!1,updateDialogVisible:!1,formLoading:!1,nodeQueryParam:{graphDeep:30,knowledgeIds:[]},type:2,maxId:void 0,queryParam:{pageIndex:1,pageSize:10},listLoading:!1,tableData:[],total:0,qAnswerLoading:!1,selectItem:{questionType:0,questionItem:null,answerItem:null},rules:{},searchList:{seriesData:[],linksData:[]}}},created:function(){var e=this.$route.query.id;this.nodeQueryParam.knowledgeIds.push(e);var t=this;this.nodeQueryParam.knowledgeIds&&0!==this.nodeQueryParam.knowledgeIds.length&&(t.formLoading=!0,s["a"].knowledgeGraph(this.nodeQueryParam).then((function(e){console.log("re:"+JSON.stringify(e));var n=e.response;t.searchList.seriesData=n.nodes,t.searchList.linksData=n.links,t.formLoading=!1})))},computed:Object(i["a"])({},Object(c["e"])("enumItem",{knowledgeTypeEnum:function(e){return e.knowledge.knowledgeTypeEnum}})),methods:{show:function(e){console.log("父组件传过来的event",e);var t=e.offsetX,n=e.offsetY,o=150,r=30*this.menuData.length+20;console.log("x:"+t+"y:"+n),this.clientX=parseFloat(t)-10+"px",this.clientY=parseFloat(n)+10+"px";var i=document.documentElement.clientWidth,a=document.documentElement.clientHeight;parseFloat(t)+o>i&&(this.clientX=parseFloat(i)-o-50+"px"),parseFloat(n)+r>a&&(this.clientY=parseFloat(a)-r-50+"px"),console.log("1x:"+this.clientX+"  1y:"+this.clientY),this.showMenu=!0,document.addEventListener("click",this.closeMenu,!1)},closeMenu:function(){console.log("销毁监听事件。"),document.removeEventListener("click",this.closeMenu,!1),this.showMenu=!1},itemClick:function(e){var t=e.target.getAttribute("data-id");alert(t),console.log("x: "+e.offsetX+"  y:"+e.offsetY)},handleUpdate:function(e){this.updateDialogVisible=!0,console.log("row:"+JSON.stringify(e)),this.createKnowledgeForm=Object.assign({},e);var t=Object.assign({},e);this.createKnowledgeForm.id=t.id,this.createKnowledgeForm.shortText=t.name,this.createKnowledgeForm.konwledgeType=t.knowledgeType,this.createKnowledgeForm.content=t.content,console.log("knowledgeForm:"+JSON.stringify(this.knowledgeForm))},handleCreate:function(){var e=this;this.createDialogVisible=!0,this.$nextTick((function(){e.$refs["createKnowledgeForm"].clearValidate()}))},confirmUpdate:function(){var e=this;console.log("createKnowledgeForm:"+JSON.stringify(this.createKnowledgeForm)),this.$refs["updateKnowledgeForm"].validate((function(t){t&&s["a"].update(e.createKnowledgeForm).then((function(t){e.updateDialogVisible=!1,e.$notify.success({title:"成功",message:"更新成功"}),e.$router.go(0)})).catch((function(t){e.$notify.error({title:"更新失败",message:t.data.errmsg})}))}))},confirmCreate:function(){var e=this;this.$refs["createKnowledgeForm"].validate((function(t){t&&s["a"].create(e.createKnowledgeForm).then((function(t){e.createDialogVisible=!1,e.$notify.success({title:"成功",message:"创建成功"});var n=t.response;e.searchList.seriesData.push({id:n,name:e.createKnowledgeForm.shortText,content:e.createKnowledgeForm.content,symbolSize:20}),e.searchList.linksData.push({source:""+e.createKnowledgeForm.parentKonwledgeId,target:""+n,name:e.createKnowledgeForm.konwledgeType})})).catch((function(t){e.$notify.error({title:"创建失败",message:t.data.errmsg})}))}))},contextMenuGraphNode:function(e,t,n){console.log("Execute contextmenuGraphNode:"+JSON.stringify(e)+"maxId:"+t+"this.maxId:"+this.maxId),console.log("x:"+n.offsetX+"y:"+n.offsetY),this.handleUpdate(e)},doubleClickGraphNode:function(e,t){var n=this;console.log("Execute NodeDbClick:"+JSON.stringify(e)+"maxId:"+t+"this.maxId:"+this.maxId),this.createDialogVisible=!0,this.$nextTick((function(){n.$refs["createKnowledgeForm"].clearValidate()})),this.createKnowledgeForm.parentKonwledgeId=e.id},clickGraphNode:function(e,t){console.log("Execute NodeClick:"+JSON.stringify(e)+"maxId:"+t+"this.maxId:"+this.maxId)},sleep:function(e){var t=(new Date).getTime();while(1)if((new Date).getTime()-t>e)break;console.log("休眠后："+(new Date).getTime())}}},d=l,u=(n("0b10"),n("2877")),f=Object(u["a"])(d,o,r,!1,null,null,null);t["default"]=f.exports},"3eba":function(e,t,n){"use strict";n.r(t);var o=n("aa74");n.d(t,"version",(function(){return o["cb"]})),n.d(t,"dependencies",(function(){return o["l"]})),n.d(t,"PRIORITY",(function(){return o["g"]})),n.d(t,"init",(function(){return o["B"]})),n.d(t,"connect",(function(){return o["j"]})),n.d(t,"disConnect",(function(){return o["m"]})),n.d(t,"disconnect",(function(){return o["n"]})),n.d(t,"dispose",(function(){return o["o"]})),n.d(t,"getInstanceByDom",(function(){return o["w"]})),n.d(t,"getInstanceById",(function(){return o["x"]})),n.d(t,"registerTheme",(function(){return o["R"]})),n.d(t,"registerPreprocessor",(function(){return o["P"]})),n.d(t,"registerProcessor",(function(){return o["Q"]})),n.d(t,"registerPostInit",(function(){return o["N"]})),n.d(t,"registerPostUpdate",(function(){return o["O"]})),n.d(t,"registerUpdateLifecycle",(function(){return o["T"]})),n.d(t,"registerAction",(function(){return o["H"]})),n.d(t,"registerCoordinateSystem",(function(){return o["I"]})),n.d(t,"getCoordinateSystemDimensions",(function(){return o["v"]})),n.d(t,"registerLocale",(function(){return o["L"]})),n.d(t,"registerLayout",(function(){return o["J"]})),n.d(t,"registerVisual",(function(){return o["U"]})),n.d(t,"registerLoading",(function(){return o["K"]})),n.d(t,"setCanvasCreator",(function(){return o["V"]})),n.d(t,"registerMap",(function(){return o["M"]})),n.d(t,"getMap",(function(){return o["y"]})),n.d(t,"registerTransform",(function(){return o["S"]})),n.d(t,"dataTool",(function(){return o["k"]})),n.d(t,"zrender",(function(){return o["eb"]})),n.d(t,"matrix",(function(){return o["D"]})),n.d(t,"vector",(function(){return o["bb"]})),n.d(t,"zrUtil",(function(){return o["db"]})),n.d(t,"color",(function(){return o["i"]})),n.d(t,"throttle",(function(){return o["X"]})),n.d(t,"helper",(function(){return o["A"]})),n.d(t,"use",(function(){return o["Z"]})),n.d(t,"setPlatformAPI",(function(){return o["W"]})),n.d(t,"parseGeoJSON",(function(){return o["F"]})),n.d(t,"parseGeoJson",(function(){return o["G"]})),n.d(t,"number",(function(){return o["E"]})),n.d(t,"time",(function(){return o["Y"]})),n.d(t,"graphic",(function(){return o["z"]})),n.d(t,"format",(function(){return o["u"]})),n.d(t,"util",(function(){return o["ab"]})),n.d(t,"env",(function(){return o["p"]})),n.d(t,"List",(function(){return o["e"]})),n.d(t,"Model",(function(){return o["f"]})),n.d(t,"Axis",(function(){return o["a"]})),n.d(t,"ComponentModel",(function(){return o["c"]})),n.d(t,"ComponentView",(function(){return o["d"]})),n.d(t,"SeriesModel",(function(){return o["h"]})),n.d(t,"ChartView",(function(){return o["b"]})),n.d(t,"innerDrawElementOnCanvas",(function(){return o["C"]})),n.d(t,"extendComponentModel",(function(){return o["r"]})),n.d(t,"extendComponentView",(function(){return o["s"]})),n.d(t,"extendSeriesModel",(function(){return o["t"]})),n.d(t,"extendChartView",(function(){return o["q"]}));var r=n("22b4"),i=n("1be7"),a=n("f95e"),c=n("5e81"),s=n("ee29");Object(r["a"])([a["a"],c["a"]]),t["default"]={init:function(){return i["l"].apply(null,arguments)}},Object(r["a"])(s["a"])},"51d1":function(e,t,n){},"57d8":function(e,t,n){"use strict";var o=n("b775");t["a"]={select:function(e){return Object(o["a"])("/api/student/exam/paper/select/"+e)},pageList:function(e){return Object(o["a"])("/api/student/konwledge/pageListV2",e)},update:function(e){return Object(o["a"])("/api/student/konwledge/update",e)},create:function(e){return Object(o["a"])("/api/student/konwledge/add",e)},knowledgeGraph:function(e){return Object(o["a"])("/api/student/konwledge/knowledgeGraph",e)}}},"627c":function(e,t,n){"use strict";n.r(t);var o=n("22b4"),r=n("9394");Object(o["a"])(r["a"])},"764f":function(e,t,n){}}]);