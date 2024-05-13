/*! For license information please see storage.dc0febeb.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkexcalidraw=self.webpackChunkexcalidraw||[]).push([[851],{2384:(e,t,r)=>{r.r(t);var n=r(5637),o=r(9388),i=r(9971),a=r(826),s="firebasestorage.googleapis.com",u="storageBucket",c=function(e){function t(r,n){var o=e.call(this,l(r),"Firebase Storage: "+n+" ("+l(r)+")")||this;return o.customData={serverResponse:null},Object.setPrototypeOf(o,t.prototype),o}return(0,o.ZT)(t,e),t.prototype._codeEquals=function(e){return l(e)===this.code},Object.defineProperty(t.prototype,"message",{get:function(){return this.customData.serverResponse?this.message+"\n"+this.customData.serverResponse:this.message},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(e){this.customData.serverResponse=e},enumerable:!1,configurable:!0}),t}(i.ZR);function l(e){return"storage/"+e}function h(){return new c("unknown","An unknown error occurred, please check the error payload for server response.")}function f(){return new c("canceled","User canceled the upload/download.")}function p(){return new c("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function d(e){return new c("invalid-argument",e)}function _(){return new c("app-deleted","The Firebase app was deleted.")}function g(e){return new c("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function v(e,t){return new c("invalid-format","String does not match format '"+e+"': "+t)}function m(e){throw new c("internal-error","Internal error: "+e)}var b={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},y=function(e,t){this.data=e,this.contentType=t||null};function w(e,t){switch(e){case b.RAW:return new y(R(t));case b.BASE64:case b.BASE64URL:return new y(k(e,t));case b.DATA_URL:return new y(function(e){var t=new T(e);return t.base64?k(b.BASE64,t.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(r){throw v(b.DATA_URL,"Malformed data URL.")}return R(t)}(t.rest)}(t),new T(t).contentType)}throw h()}function R(e){for(var t=[],r=0;r<e.length;r++){var n=e.charCodeAt(r);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|63&n);else if(55296===(64512&n))if(r<e.length-1&&56320===(64512&e.charCodeAt(r+1)))n=65536|(1023&n)<<10|1023&e.charCodeAt(++r),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n);else t.push(239,191,189);else 56320===(64512&n)?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function k(e,t){switch(e){case b.BASE64:var r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw v(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break;case b.BASE64URL:var o=-1!==t.indexOf("+"),i=-1!==t.indexOf("/");if(o||i)throw v(e,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}var a;try{a=atob(t)}catch(c){throw v(e,"Invalid character found")}for(var s=new Uint8Array(a.length),u=0;u<a.length;u++)s[u]=a.charCodeAt(u);return s}var T=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw v(b.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=t[1]||null;null!=r&&(this.base64=(n=r,o=";base64",n.length>=o.length&&n.substring(n.length-o.length)===o),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1);var n,o};var x,O={STATE_CHANGED:"state_changed"},P={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function U(e){switch(e){case"running":case"pausing":case"canceling":return P.RUNNING;case"paused":return P.PAUSED;case"success":return P.SUCCESS;case"canceled":return P.CANCELED;default:return P.ERROR}}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(x||(x={}));var S=function(){function e(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=x.NO_ERROR,this.sendPromise_=new Promise((function(t){e.xhr_.addEventListener("abort",(function(){e.errorCode_=x.ABORT,t(e)})),e.xhr_.addEventListener("error",(function(){e.errorCode_=x.NETWORK_ERROR,t(e)})),e.xhr_.addEventListener("load",(function(){t(e)}))}))}return e.prototype.send=function(e,t,r,n){if(this.sent_)throw m("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==n)for(var o in n)n.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,n[o].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},e.prototype.getErrorCode=function(){if(!this.sent_)throw m("cannot .getErrorCode() before sending");return this.errorCode_},e.prototype.getStatus=function(){if(!this.sent_)throw m("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},e.prototype.getResponseText=function(){if(!this.sent_)throw m("cannot .getResponseText() before sending");return this.xhr_.responseText},e.prototype.abort=function(){this.xhr_.abort()},e.prototype.getResponseHeader=function(e){return this.xhr_.getResponseHeader(e)},e.prototype.addUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)},e.prototype.removeUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)},e}(),C=function(){function e(){}return e.prototype.createXhrIo=function(){return new S},e}(),E=function(){function e(e,t){this.bucket=e,this.path_=t}return Object.defineProperty(e.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!1,configurable:!0}),e.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},e.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},e.makeFromBucketSpec=function(t){var r;try{r=e.makeFromUrl(t)}catch(n){return new e(t,"")}if(""===r.path)return r;throw new c("invalid-default-bucket","Invalid default bucket '"+t+"'.")},e.makeFromUrl=function(t){var r=null,n="([A-Za-z0-9.\\-_]+)";var o=new RegExp("^gs://"+n+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}for(var a=s.replace(/[.]/g,"\\."),u=[{regex:o,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+a+"/v[A-Za-z0-9_]+/b/"+n+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp("^https?://(?:storage.googleapis.com|storage.cloud.google.com)/"+n+"/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:i}],l=0;l<u.length;l++){var h=u[l],f=h.regex.exec(t);if(f){var p=f[h.indices.bucket],d=f[h.indices.path];d||(d=""),r=new e(p,d),h.postModify(r);break}}if(null==r)throw function(e){return new c("invalid-url","Invalid URL '"+e+"'.")}(t);return r},e}(),A=function(){function e(e){this.promise_=Promise.reject(e)}return e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){},e}();function I(e){return"string"===typeof e||e instanceof String}function j(e){return q()&&e instanceof Blob}function q(){return"undefined"!==typeof Blob}function L(e,t,r,n){if(n<t)throw d("Invalid value for '"+e+"'. Expected "+t+" or greater.");if(n>r)throw d("Invalid value for '"+e+"'. Expected "+r+" or less.")}function N(e){return"https://"+s+"/v0"+e}function B(e){var t=encodeURIComponent,r="?";for(var n in e){if(e.hasOwnProperty(n))r=r+(t(n)+"="+t(e[n]))+"&"}return r=r.slice(0,-1)}var M=function(){function e(e,t,r,n,o,i,a,s,u,c,l){var h=this;this.pendingXhr_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=o.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=a,this.errorCallback_=s,this.progressCallback_=c,this.timeout_=u,this.pool_=l,this.promise_=new Promise((function(e,t){h.resolve_=e,h.reject_=t,h.start_()}))}return e.prototype.start_=function(){var e=this;function t(t,r){var n,o=e.resolve_,i=e.reject_,a=r.xhr;if(r.wasSuccessCode)try{var s=e.callback_(a,a.getResponseText());void 0!==s?o(s):o()}catch(u){i(u)}else null!==a?((n=h()).serverResponse=a.getResponseText(),e.errorCallback_?i(e.errorCallback_(a,n)):i(n)):r.canceled?i(n=e.appDelete_?_():f()):i(n=new c("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}this.canceled_?t(0,new D(!1,null,!0)):this.backoffId_=function(e,t,r){var n=1,i=null,a=!1,s=0;function u(){return 2===s}var c=!1;function l(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];c||(c=!0,t.apply(null,e))}function h(t){i=setTimeout((function(){i=null,e(f,u())}),t)}function f(e){for(var t,r=[],i=1;i<arguments.length;i++)r[i-1]=arguments[i];c||(e||u()||a?l.call.apply(l,(0,o.ev)([null,e],r)):(n<64&&(n*=2),1===s?(s=2,t=0):t=1e3*(n+Math.random()),h(t)))}var p=!1;function d(e){p||(p=!0,c||(null!==i?(e||(s=2),clearTimeout(i),h(0)):e||(s=1)))}return h(0),setTimeout((function(){a=!0,d(!0)}),r),d}((function(t,r){if(r)t(!1,new D(!1,null,!0));else{var n=e.pool_.createXhrIo();e.pendingXhr_=n,null!==e.progressCallback_&&n.addUploadProgressListener(o),n.send(e.url_,e.method_,e.body_,e.headers_).then((function(r){null!==e.progressCallback_&&r.removeUploadProgressListener(o),e.pendingXhr_=null;var n=r.getErrorCode()===x.NO_ERROR,i=r.getStatus();if(n&&!e.isRetryStatusCode_(i)){var a=-1!==e.successCodes_.indexOf(i);t(!0,new D(a,r))}else{var s=r.getErrorCode()===x.ABORT;t(!1,new D(!1,null,s))}}))}function o(t){var r=t.loaded,n=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(r,n)}}),t,this.timeout_)},e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()},e.prototype.isRetryStatusCode_=function(e){var t=e>=500&&e<600,r=-1!==[408,429].indexOf(e),n=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||n},e}(),D=function(e,t,r){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!r};function z(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function H(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=z();if(void 0!==r){for(var n=new r,o=0;o<e.length;o++)n.append(e[o]);return n.getBlob()}if(q())return new Blob(e);throw new c("unsupported-environment","This browser doesn't seem to support creating Blobs")}var F=function(){function e(e,t){var r=0,n="";j(e)?(this.data_=e,r=e.size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}return e.prototype.size=function(){return this.size_},e.prototype.type=function(){return this.type_},e.prototype.slice=function(t,r){if(j(this.data_)){var n=function(e,t,r){return e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice?e.slice(t,r):null}(this.data_,t,r);return null===n?null:new e(n)}return new e(new Uint8Array(this.data_.buffer,t,r-t),!0)},e.getBlob=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(q()){var n=t.map((function(t){return t instanceof e?t.data_:t}));return new e(H.apply(null,n))}var o=t.map((function(e){return I(e)?w(b.RAW,e).data:e.data_})),i=0;o.forEach((function(e){i+=e.byteLength}));var a=new Uint8Array(i),s=0;return o.forEach((function(e){for(var t=0;t<e.length;t++)a[s++]=e[t]})),new e(a,!0)},e.prototype.uploadData=function(){return this.data_},e}();function G(e){var t,r;try{t=JSON.parse(e)}catch(n){return null}return"object"!==typeof(r=t)||Array.isArray(r)?null:t}function X(e){var t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function J(e,t){return t}var W=function(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||J},V=null;function Z(){if(V)return V;var e=[];e.push(new W("bucket")),e.push(new W("generation")),e.push(new W("metageneration")),e.push(new W("name","fullPath",!0));var t=new W("name");t.xform=function(e,t){return function(e){return!I(e)||e.length<2?e:X(e)}(t)},e.push(t);var r=new W("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new W("timeCreated")),e.push(new W("updated")),e.push(new W("md5Hash",null,!0)),e.push(new W("cacheControl",null,!0)),e.push(new W("contentDisposition",null,!0)),e.push(new W("contentEncoding",null,!0)),e.push(new W("contentLanguage",null,!0)),e.push(new W("contentType",null,!0)),e.push(new W("metadata","customMetadata",!0)),V=e}function K(e,t,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var a=r[i];n[a.local]=a.xform(n,t[a.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){var r=e.bucket,n=e.fullPath,o=new E(r,n);return t._makeStorageReference(o)}})}(n,e),n}function $(e,t,r){var n=G(t);return null===n?null:K(e,n,r)}function Y(e,t){for(var r={},n=t.length,o=0;o<n;o++){var i=t[o];i.writable&&(r[i.server]=e[i.local])}return JSON.stringify(r)}var Q="prefixes",ee="items";function te(e,t,r){var n=G(r);return null===n?null:function(e,t,r){var n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r[Q])for(var o=0,i=r[Q];o<i.length;o++){var a=i[o].replace(/\/$/,""),s=e._makeStorageReference(new E(t,a));n.prefixes.push(s)}if(r[ee])for(var u=0,c=r[ee];u<c.length;u++){var l=c[u];s=e._makeStorageReference(new E(t,l.name)),n.items.push(s)}return n}(e,t,n)}var re=function(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};function ne(e){if(!e)throw h()}function oe(e,t){return function(r,n){var o=$(e,n,t);return ne(null!==o),o}}function ie(e,t){return function(r,n){var o=$(e,n,t);return ne(null!==o),function(e,t){var r=G(t);if(null===r)return null;if(!I(r.downloadTokens))return null;var n=r.downloadTokens;if(0===n.length)return null;var o=encodeURIComponent;return n.split(",").map((function(t){var r=e.bucket,n=e.fullPath;return N("/b/"+o(r)+"/o/"+o(n))+B({alt:"media",token:t})}))[0]}(o,n)}}function ae(e){return function(t,r){var n,o,i;return 401===t.getStatus()?n=new c("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(i=e.bucket,n=new c("quota-exceeded","Quota for bucket '"+i+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(o=e.path,n=new c("unauthorized","User does not have permission to access '"+o+"'.")):n=r,n.serverResponse=r.serverResponse,n}}function se(e){var t=ae(e);return function(r,n){var o,i=t(r,n);return 404===r.getStatus()&&(o=e.path,i=new c("object-not-found","Object '"+o+"' does not exist.")),i.serverResponse=n.serverResponse,i}}function ue(e,t,r){var n=N(t.fullServerUrl()),o=e.maxOperationRetryTime,i=new re(n,"GET",oe(e,r),o);return i.errorHandler=se(t),i}function ce(e,t,r,n,o){var i={};t.isRoot?i.prefix="":i.prefix=t.path+"/",r&&r.length>0&&(i.delimiter=r),n&&(i.pageToken=n),o&&(i.maxResults=o);var a=N(t.bucketOnlyServerUrl()),s=e.maxOperationRetryTime,u=new re(a,"GET",function(e,t){return function(r,n){var o=te(e,t,n);return ne(null!==o),o}}(e,t.bucket),s);return u.urlParams=i,u.errorHandler=ae(t),u}function le(e,t,r){var n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),n.contentType||(n.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),n}var he=function(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null};function fe(e,t){var r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(n){ne(!1)}return ne(!!r&&-1!==(t||["active"]).indexOf(r)),r}var pe=262144;function de(e,t,r,n,o,i,a,s){var u=new he(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw new c("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var l=u.total-u.current,h=l;o>0&&(h=Math.min(h,o));var f=u.current,d=f+h,_={"X-Goog-Upload-Command":h===l?"upload, finalize":"upload","X-Goog-Upload-Offset":u.current},g=n.slice(f,d);if(null===g)throw p();var v=t.maxUploadRetryTime,m=new re(r,"POST",(function(e,r){var o,a=fe(e,["active","final"]),s=u.current+h,c=n.size();return o="final"===a?oe(t,i)(e,r):null,new he(s,c,"final"===a,o)}),v);return m.headers=_,m.body=g.uploadData(),m.progressCallback=s||null,m.errorHandler=ae(e),m}var _e=function(e,t,r){if("function"===typeof e||null!=t||null!=r)this.next=e,this.error=t,this.complete=r;else{var n=e;this.next=n.next,this.error=n.error,this.complete=n.complete}};function ge(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];Promise.resolve().then((function(){return e.apply(void 0,t)}))}}var ve=function(){function e(e,t,r){var n=this;void 0===r&&(r=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=Z(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=function(e){n._request=void 0,n._chunkMultiplier=1,e._codeEquals("canceled")?(n._needToFetchStatus=!0,n.completeTransitions_()):(n._error=e,n._transition("error"))},this._metadataErrorHandler=function(e){n._request=void 0,e._codeEquals("canceled")?n.completeTransitions_():(n._error=e,n._transition("error"))},this._promise=new Promise((function(e,t){n._resolve=e,n._reject=t,n._start()})),this._promise.then(null,(function(){}))}return e.prototype._makeProgressCallback=function(){var e=this,t=this._transferred;return function(r){return e._updateProgress(t+r)}},e.prototype._shouldDoResumable=function(e){return e.size()>262144},e.prototype._start=function(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},e.prototype._resolveToken=function(e){var t=this;this._ref.storage._getAuthToken().then((function(r){switch(t._state){case"running":e(r);break;case"canceling":t._transition("canceled");break;case"pausing":t._transition("paused")}}))},e.prototype._createResumable=function(){var e=this;this._resolveToken((function(t){var r=function(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a=le(t,n,o),s={name:a.fullPath},u=N(i),c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},l=Y(a,r),h=e.maxUploadRetryTime,f=new re(u,"POST",(function(e){var t;fe(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(r){ne(!1)}return ne(I(t)),t}),h);return f.urlParams=s,f.headers=c,f.body=l,f.errorHandler=ae(t),f}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),n=e._ref.storage._makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._uploadUrl=t,e._needToFetchStatus=!1,e.completeTransitions_()}),e._errorHandler)}))},e.prototype._fetchStatus=function(){var e=this,t=this._uploadUrl;this._resolveToken((function(r){var n=function(e,t,r,n){var o=e.maxUploadRetryTime,i=new re(r,"POST",(function(e){var t=fe(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(i){ne(!1)}r||ne(!1);var o=Number(r);return ne(!isNaN(o)),new he(o,n.size(),"final"===t)}),o);return i.headers={"X-Goog-Upload-Command":"query"},i.errorHandler=ae(t),i}(e._ref.storage,e._ref._location,t,e._blob),o=e._ref.storage._makeRequest(n,r);e._request=o,o.getPromise().then((function(t){e._request=void 0,e._updateProgress(t.current),e._needToFetchStatus=!1,t.finalized&&(e._needToFetchMetadata=!0),e.completeTransitions_()}),e._errorHandler)}))},e.prototype._continueUpload=function(){var e=this,t=pe*this._chunkMultiplier,r=new he(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((function(o){var i;try{i=de(e._ref._location,e._ref.storage,n,e._blob,t,e._mappings,r,e._makeProgressCallback())}catch(s){return e._error=s,void e._transition("error")}var a=e._ref.storage._makeRequest(i,o);e._request=a,a.getPromise().then((function(t){e._increaseMultiplier(),e._request=void 0,e._updateProgress(t.current),t.finalized?(e._metadata=t.metadata,e._transition("success")):e.completeTransitions_()}),e._errorHandler)}))},e.prototype._increaseMultiplier=function(){pe*this._chunkMultiplier<33554432&&(this._chunkMultiplier*=2)},e.prototype._fetchMetadata=function(){var e=this;this._resolveToken((function(t){var r=ue(e._ref.storage,e._ref._location,e._mappings),n=e._ref.storage._makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._transition("success")}),e._metadataErrorHandler)}))},e.prototype._oneShotUpload=function(){var e=this;this._resolveToken((function(t){var r=function(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},s=function(){for(var e="",t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+s;var u=le(t,n,o),c="--"+s+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+Y(u,r)+"\r\n--"+s+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",l="\r\n--"+s+"--",h=F.getBlob(c,n,l);if(null===h)throw p();var f={name:u.fullPath},d=N(i),_=e.maxUploadRetryTime,g=new re(d,"POST",oe(e,r),_);return g.urlParams=f,g.headers=a,g.body=h.uploadData(),g.errorHandler=ae(t),g}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),n=e._ref.storage._makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._updateProgress(e._blob.size()),e._transition("success")}),e._errorHandler)}))},e.prototype._updateProgress=function(e){var t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()},e.prototype._transition=function(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request&&this._request.cancel();break;case"running":var t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=f(),this._state=e,this._notifyObservers()}},e.prototype.completeTransitions_=function(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}},Object.defineProperty(e.prototype,"snapshot",{get:function(){var e=U(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}},enumerable:!1,configurable:!0}),e.prototype.on=function(e,t,r,n){var o=this,i=new _e(t,r,n);return this._addObserver(i),function(){o._removeObserver(i)}},e.prototype.then=function(e,t){return this._promise.then(e,t)},e.prototype.catch=function(e){return this.then(null,e)},e.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},e.prototype._removeObserver=function(e){var t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)},e.prototype._notifyObservers=function(){var e=this;this._finishPromise(),this._observers.slice().forEach((function(t){e._notifyObserver(t)}))},e.prototype._finishPromise=function(){if(void 0!==this._resolve){var e=!0;switch(U(this._state)){case P.SUCCESS:ge(this._resolve.bind(null,this.snapshot))();break;case P.CANCELED:case P.ERROR:ge(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}},e.prototype._notifyObserver=function(e){switch(U(this._state)){case P.RUNNING:case P.PAUSED:e.next&&ge(e.next.bind(e,this.snapshot))();break;case P.SUCCESS:e.complete&&ge(e.complete.bind(e))();break;case P.CANCELED:case P.ERROR:default:e.error&&ge(e.error.bind(e,this._error))()}},e.prototype.resume=function(){var e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e},e.prototype.pause=function(){var e="running"===this._state;return e&&this._transition("pausing"),e},e.prototype.cancel=function(){var e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e},e}(),me=function(){function e(e,t){this._service=e,this._location=t instanceof E?t:E.makeFromUrl(t)}return e.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},e.prototype._newRef=function(t,r){return new e(t,r)},Object.defineProperty(e.prototype,"root",{get:function(){var e=new E(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return X(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=function(e){if(0===e.length)return null;var t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===t)return null;var r=new E(this._location.bucket,t);return new e(this._service,r)},enumerable:!1,configurable:!0}),e.prototype._throwIfRoot=function(e){if(""===this._location.path)throw g(e)},e}();function be(e){var t={prefixes:[],items:[]};return ye(e,t).then((function(){return t}))}function ye(e,t,r){return(0,o.mG)(this,void 0,void 0,(function(){var n,i,a;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return[4,we(e,{pageToken:r})];case 1:return n=o.sent(),(i=t.prefixes).push.apply(i,n.prefixes),(a=t.items).push.apply(a,n.items),null==n.nextPageToken?[3,3]:[4,ye(e,t,n.nextPageToken)];case 2:o.sent(),o.label=3;case 3:return[2]}}))}))}function we(e,t){return(0,o.mG)(this,void 0,void 0,(function(){var r,n,i;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return null!=t&&"number"===typeof t.maxResults&&L("options.maxResults",1,1e3,t.maxResults),[4,e.storage._getAuthToken()];case 1:return r=o.sent(),n=t||{},i=ce(e.storage,e._location,"/",n.pageToken,n.maxResults),[2,e.storage._makeRequest(i,r).getPromise()]}}))}))}function Re(e,t){return(0,o.mG)(this,void 0,void 0,(function(){var r,n;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return e._throwIfRoot("updateMetadata"),[4,e.storage._getAuthToken()];case 1:return r=o.sent(),n=function(e,t,r,n){var o=N(t.fullServerUrl()),i=Y(r,n),a=e.maxOperationRetryTime,s=new re(o,"PATCH",oe(e,n),a);return s.headers={"Content-Type":"application/json; charset=utf-8"},s.body=i,s.errorHandler=se(t),s}(e.storage,e._location,t,Z()),[2,e.storage._makeRequest(n,r).getPromise()]}}))}))}function ke(e){return(0,o.mG)(this,void 0,void 0,(function(){var t,r;return(0,o.Jh)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getDownloadURL"),[4,e.storage._getAuthToken()];case 1:return t=n.sent(),r=function(e,t,r){var n=N(t.fullServerUrl()),o=e.maxOperationRetryTime,i=new re(n,"GET",ie(e,r),o);return i.errorHandler=se(t),i}(e.storage,e._location,Z()),[2,e.storage._makeRequest(r,t).getPromise().then((function(e){if(null===e)throw new c("no-download-url","The given file does not have any download URLs.");return e}))]}}))}))}function Te(e){return(0,o.mG)(this,void 0,void 0,(function(){var t,r;return(0,o.Jh)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("deleteObject"),[4,e.storage._getAuthToken()];case 1:return t=n.sent(),r=function(e,t){var r=N(t.fullServerUrl()),n=e.maxOperationRetryTime,o=new re(r,"DELETE",(function(e,t){}),n);return o.successCodes=[200,204],o.errorHandler=se(t),o}(e.storage,e._location),[2,e.storage._makeRequest(r,t).getPromise()]}}))}))}function xe(e,t){var r=function(e,t){var r=t.split("/").filter((function(e){return e.length>0})).join("/");return 0===e.length?r:e+"/"+r}(e._location.path,t),n=new E(e._location.bucket,r);return new me(e.storage,n)}function Oe(e){return/^[A-Za-z]+:\/\//.test(e)}function Pe(e,t){if(e instanceof Se){var r=e;if(null==r._bucket)throw new c("no-default-bucket","No default bucket found. Did you set the '"+u+"' property when initializing the app?");var n=new me(r,r._bucket);return null!=t?Pe(n,t):n}if(void 0!==t){if(t.includes(".."))throw d('`path` param cannot contain ".."');return xe(e,t)}return e}function Ue(e,t){if(t&&Oe(t)){if(e instanceof Se)return new me(e,t);throw d("To use ref(service, url), the first argument must be a Storage instance.")}return Pe(e,t)}var Se=function(){function e(e,t,r,n,o){this.app=e,this._authProvider=t,this._pool=r,this._url=n,this._firebaseVersion=o,this._bucket=null,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=n?E.makeFromBucketSpec(n):function(e){var t=null===e||void 0===e?void 0:e[u];return null==t?null:E.makeFromBucketSpec(t)}(this.app.options)}return Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(e){L("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(e){L("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e},enumerable:!1,configurable:!0}),e.prototype._getAuthToken=function(){return(0,o.mG)(this,void 0,void 0,(function(){var e,t;return(0,o.Jh)(this,(function(r){switch(r.label){case 0:return(e=this._authProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:if(null!==(t=r.sent()))return[2,t.accessToken];r.label=2;case 2:return[2,null]}}))}))},e.prototype._delete=function(){return this._deleted=!0,this._requests.forEach((function(e){return e.cancel()})),this._requests.clear(),Promise.resolve()},e.prototype._makeStorageReference=function(e){return new me(this,e)},e.prototype._makeRequest=function(e,t){var r=this;if(this._deleted)return new A(_());var n=function(e,t,r,n,o){var i=B(e.urlParams),a=e.url+i,s=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(s,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(s,r),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!==t&&void 0!==t?t:"AppManager")}(s,o),new M(a,e.method,s,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,n)}(e,this._appId,t,this._pool,this._firebaseVersion);return this._requests.add(n),n.getPromise().then((function(){return r._requests.delete(n)}),(function(){return r._requests.delete(n)})),n},e}();function Ce(e,t,r){return function(e,t,r){return e._throwIfRoot("uploadBytesResumable"),new ve(e,new F(t),r)}(e=(0,i.m9)(e),t,r)}function Ee(e){return function(e){return(0,o.mG)(this,void 0,void 0,(function(){var t,r;return(0,o.Jh)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getMetadata"),[4,e.storage._getAuthToken()];case 1:return t=n.sent(),r=ue(e.storage,e._location,Z()),[2,e.storage._makeRequest(r,t).getPromise()]}}))}))}(e=(0,i.m9)(e))}function Ae(e,t){return Ue(e=(0,i.m9)(e),t)}var Ie=function(){function e(e,t,r){this._delegate=e,this.task=t,this.ref=r}return Object.defineProperty(e.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),e}(),je=function(){function e(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}return Object.defineProperty(e.prototype,"snapshot",{get:function(){return new Ie(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),e.prototype.then=function(e,t){var r=this;return this._delegate.then((function(t){if(e)return e(new Ie(t,r,r._ref))}),t)},e.prototype.on=function(e,t,r,n){var o=this,i=void 0;return t&&(i="function"===typeof t?function(e){return t(new Ie(e,o,o._ref))}:{next:t.next?function(e){return t.next(new Ie(e,o,o._ref))}:void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,i,r||void 0,n||void 0)},e}(),qe=function(){function e(e,t){this._delegate=e,this._service=t}return Object.defineProperty(e.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map((function(t){return new Le(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){var e=this;return this._delegate.items.map((function(t){return new Le(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),e}(),Le=function(){function e(e,t){this._delegate=e,this.storage=t}return Object.defineProperty(e.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return this._delegate.toString()},e.prototype.child=function(t){var r=function(e,t){return xe(e,t)}(this._delegate,t);return new e(r,this.storage)},Object.defineProperty(e.prototype,"root",{get:function(){return new e(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=this._delegate.parent;return null==t?null:new e(t,this.storage)},enumerable:!1,configurable:!0}),e.prototype.put=function(e,t){return this._throwIfRoot("put"),new je(Ce(this._delegate,e,t),this)},e.prototype.putString=function(e,t,r){void 0===t&&(t=b.RAW),this._throwIfRoot("putString");var n=w(t,e),i=(0,o.pi)({},r);return null==i.contentType&&null!=n.contentType&&(i.contentType=n.contentType),new je(new ve(this._delegate,new F(n.data,!0),i),this)},e.prototype.listAll=function(){var e=this;return function(e){return be(e=(0,i.m9)(e))}(this._delegate).then((function(t){return new qe(t,e.storage)}))},e.prototype.list=function(e){var t=this;return function(e,t){return we(e=(0,i.m9)(e),t)}(this._delegate,e||void 0).then((function(e){return new qe(e,t.storage)}))},e.prototype.getMetadata=function(){return Ee(this._delegate)},e.prototype.updateMetadata=function(e){return function(e,t){return Re(e=(0,i.m9)(e),t)}(this._delegate,e)},e.prototype.getDownloadURL=function(){return function(e){return ke(e=(0,i.m9)(e))}(this._delegate)},e.prototype.delete=function(){return this._throwIfRoot("delete"),function(e){return Te(e=(0,i.m9)(e))}(this._delegate)},e.prototype._throwIfRoot=function(e){if(""===this._delegate._location.path)throw g(e)},e}(),Ne=function(){function e(e,t){var r=this;this.app=e,this._delegate=t,this.INTERNAL={delete:function(){return r._delegate._delete()}}}return Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),e.prototype.ref=function(e){if(Oe(e))throw d("ref() expected a child path but got a URL, use refFromURL instead.");return new Le(Ae(this._delegate,e),this)},e.prototype.refFromURL=function(e){if(!Oe(e))throw d("refFromURL() expected a full URL but got a child path, use ref() instead.");try{E.makeFromUrl(e)}catch(t){throw d("refFromUrl() expected a valid full URL but got an invalid one.")}return new Le(Ae(this._delegate,e),this)},e.prototype.setMaxUploadRetryTime=function(e){this._delegate.maxUploadRetryTime=e},e.prototype.setMaxOperationRetryTime=function(e){this._delegate.maxOperationRetryTime=e},e}();function Be(e,t){var r=t.instanceIdentifier,o=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal");return new Ne(o,new Se(o,i,new C,r,n.Z.SDK_VERSION))}!function(e){var t={TaskState:P,TaskEvent:O,StringFormat:b,Storage:Se,Reference:Le};e.INTERNAL.registerComponent(new a.wA("storage",Be,"PUBLIC").setServiceProps(t).setMultipleInstances(!0)),e.registerVersion("@firebase/storage","0.4.7")}(n.Z)}}]);
//# sourceMappingURL=storage.dc0febeb.chunk.js.map