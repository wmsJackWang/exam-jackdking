"use strict";(self.webpackChunkexcalidraw=self.webpackChunkexcalidraw||[]).push([[528],{528:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var i=async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[{}],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;Array.isArray(t)||(t=[t]),t[0].fileName=t[0].fileName||"Untitled";const c=[];let l=null;if(e instanceof Blob&&e.type?l=e.type:e.headers&&e.headers.get("content-type")&&(l=e.headers.get("content-type")),t.forEach(((e,t)=>{c[t]={description:e.description||"",accept:{}},e.mimeTypes?(0===t&&l&&e.mimeTypes.push(l),e.mimeTypes.map((a=>{c[t].accept[a]=e.extensions||[]}))):l&&(c[t].accept[l]=e.extensions||[])})),a)try{await a.getFile()}catch(e){if(a=null,i)throw e}const s=a||await window.showSaveFilePicker({suggestedName:t[0].fileName,id:t[0].id,startIn:t[0].startIn,types:c,excludeAcceptAllOption:t[0].excludeAcceptAllOption||!1});!a&&n&&n();const r=await s.createWritable();if("stream"in e){const t=e.stream();return await t.pipeTo(r),s}return"body"in e?(await e.body.pipeTo(r),s):(await r.write(await e),await r.close(),s)}}}]);
//# sourceMappingURL=528.34f99115.chunk.js.map