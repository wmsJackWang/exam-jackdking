function d(e){for(var t=arguments.length,o=Array(t>1?t-1:0),r=1;r<t;r++)o[r-1]=arguments[r];throw Error("[Immer] minified error nr: "+e+(o.length?" "+o.map(function(n){return"'"+n+"'"}).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function D(e){return!!e&&!!e[P]}function j(e){var t;return!!e&&(function(o){if(!o||typeof o!="object")return!1;var r=Object.getPrototypeOf(o);if(r===null)return!0;var n=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return n===Object||typeof n=="function"&&Function.toString.call(n)===be}(e)||Array.isArray(e)||!!e[x]||!!(!((t=e.constructor)===null||t===void 0)&&t[x])||K(e)||W(e))}function _(e,t,o){o===void 0&&(o=!1),A(e)===0?(o?Object.keys:Y)(e).forEach(function(r){o&&typeof r=="symbol"||t(r,e[r],e)}):e.forEach(function(r,n){return t(n,r,e)})}function A(e){var t=e[P];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:K(e)?2:W(e)?3:0}function N(e,t){return A(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function k(e,t){return A(e)===2?e.get(t):e[t]}function ce(e,t,o){var r=A(e);r===2?e.set(t,o):r===3?e.add(o):e[t]=o}function se(e,t){return e===t?e!==0||1/e==1/t:e!=e&&t!=t}function K(e){return ye&&e instanceof Map}function W(e){return de&&e instanceof Set}function S(e){return e.o||e.t}function J(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=me(e);delete t[P];for(var o=Y(t),r=0;r<o.length;r++){var n=o[r],u=t[n];u.writable===!1&&(u.writable=!0,u.configurable=!0),(u.get||u.set)&&(t[n]={configurable:!0,writable:!0,enumerable:u.enumerable,value:e[n]})}return Object.create(Object.getPrototypeOf(e),t)}function L(e,t){return t===void 0&&(t=!1),Q(e)||D(e)||!j(e)||(A(e)>1&&(e.set=e.add=e.clear=e.delete=le),Object.freeze(e),t&&_(e,function(o,r){return L(r,!0)},!0)),e}function le(){d(2)}function Q(e){return e==null||typeof e!="object"||Object.isFrozen(e)}function w(e){var t=G[e];return t||d(18,e),t}function pe(e,t){G[e]||(G[e]=t)}function te(){return M}function U(e,t){t&&(w("Patches"),e.u=[],e.s=[],e.v=t)}function F(e){X(e),e.p.forEach(ve),e.p=null}function X(e){e===M&&(M=e.l)}function re(e){return M={p:[],l:M,h:e,m:!0,_:0}}function ve(e){var t=e[P];t.i===0||t.i===1?t.j():t.g=!0}function $(e,t){t._=t.p.length;var o=t.p[0],r=e!==void 0&&e!==o;return t.h.O||w("ES5").S(t,e,r),r?(o[P].P&&(F(t),d(4)),j(e)&&(e=z(t,e),t.l||I(t,e)),t.u&&w("Patches").M(o[P].t,e,t.u,t.s)):e=z(t,o,[]),F(t),t.u&&t.v(t.u,t.s),e!==V?e:void 0}function z(e,t,o){if(Q(t))return t;var r=t[P];if(!r)return _(t,function(c,i){return oe(e,r,t,c,i,o)},!0),t;if(r.A!==e)return t;if(!r.P)return I(e,r.t,!0),r.t;if(!r.I){r.I=!0,r.A._--;var n=r.i===4||r.i===5?r.o=J(r.k):r.o,u=n,a=!1;r.i===3&&(u=new Set(n),n.clear(),a=!0),_(u,function(c,i){return oe(e,r,n,c,i,o,a)}),I(e,n,!1),o&&e.u&&w("Patches").N(r,o,e.u,e.s)}return r.o}function oe(e,t,o,r,n,u,a){if(D(n)){var c=z(e,n,u&&t&&t.i!==3&&!N(t.R,r)?u.concat(r):void 0);if(ce(o,r,c),!D(c))return;e.m=!1}else a&&o.add(n);if(j(n)&&!Q(n)){if(!e.h.D&&e._<1)return;z(e,n),t&&t.A.l||I(e,n)}}function I(e,t,o){o===void 0&&(o=!1),!e.l&&e.h.D&&e.m&&L(t,o)}function C(e,t){var o=e[P];return(o?S(o):e)[t]}function ne(e,t){if(t in e)for(var o=Object.getPrototypeOf(e);o;){var r=Object.getOwnPropertyDescriptor(o,t);if(r)return r;o=Object.getPrototypeOf(o)}}function q(e){e.P||(e.P=!0,e.l&&q(e.l))}function T(e){e.o||(e.o=J(e.t))}function B(e,t,o){var r=K(t)?w("MapSet").F(t,o):W(t)?w("MapSet").T(t,o):e.O?function(n,u){var a=Array.isArray(n),c={i:a?1:0,A:u?u.A:te(),P:!1,I:!1,R:{},l:u,t:n,k:null,o:null,j:null,C:!1},i=c,f=H;a&&(i=[c],f=E);var p=Proxy.revocable(i,f),l=p.revoke,h=p.proxy;return c.k=h,c.j=l,h}(t,o):w("ES5").J(t,o);return(o?o.A:te()).p.push(r),r}function he(e){return D(e)||d(22,e),function t(o){if(!j(o))return o;var r,n=o[P],u=A(o);if(n){if(!n.P&&(n.i<4||!w("ES5").K(n)))return n.t;n.I=!0,r=ue(o,u),n.I=!1}else r=ue(o,u);return _(r,function(a,c){n&&k(n.t,a)===c||ce(r,a,t(c))}),u===3?new Set(r):r}(e)}function ue(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return J(e)}function Pe(){function e(r){if(!j(r))return r;if(Array.isArray(r))return r.map(e);if(K(r))return new Map(Array.from(r.entries()).map(function(a){return[a[0],e(a[1])]}));if(W(r))return new Set(Array.from(r).map(e));var n=Object.create(Object.getPrototypeOf(r));for(var u in r)n[u]=e(r[u]);return N(r,x)&&(n[x]=r[x]),n}function t(r){return D(r)?e(r):r}var o="add";pe("Patches",{$:function(r,n){return n.forEach(function(u){for(var a=u.path,c=u.op,i=r,f=0;f<a.length-1;f++){var p=A(i),l=a[f];typeof l!="string"&&typeof l!="number"&&(l=""+l),p!==0&&p!==1||l!=="__proto__"&&l!=="constructor"||d(24),typeof i=="function"&&l==="prototype"&&d(24),typeof(i=k(i,l))!="object"&&d(15,a.join("/"))}var h=A(i),s=e(u.value),v=a[a.length-1];switch(c){case"replace":switch(h){case 2:return i.set(v,s);case 3:d(16);default:return i[v]=s}case o:switch(h){case 1:return v==="-"?i.push(s):i.splice(v,0,s);case 2:return i.set(v,s);case 3:return i.add(s);default:return i[v]=s}case"remove":switch(h){case 1:return i.splice(v,1);case 2:return i.delete(v);case 3:return i.delete(u.value);default:return delete i[v]}default:d(17,c)}}),r},N:function(r,n,u,a){switch(r.i){case 0:case 4:case 2:return function(c,i,f,p){var l=c.t,h=c.o;_(c.R,function(s,v){var y=k(l,s),b=k(h,s),m=v?N(l,s)?"replace":o:"remove";if(y!==b||m!=="replace"){var g=i.concat(s);f.push(m==="remove"?{op:m,path:g}:{op:m,path:g,value:b}),p.push(m===o?{op:"remove",path:g}:m==="remove"?{op:o,path:g,value:t(y)}:{op:"replace",path:g,value:t(y)})}})}(r,n,u,a);case 5:case 1:return function(c,i,f,p){var l=c.t,h=c.R,s=c.o;if(s.length<l.length){var v=[s,l];l=v[0],s=v[1];var y=[p,f];f=y[0],p=y[1]}for(var b=0;b<l.length;b++)if(h[b]&&s[b]!==l[b]){var m=i.concat([b]);f.push({op:"replace",path:m,value:t(s[b])}),p.push({op:"replace",path:m,value:t(l[b])})}for(var g=l.length;g<s.length;g++){var R=i.concat([g]);f.push({op:o,path:R,value:t(s[g])})}l.length<s.length&&p.push({op:"replace",path:i.concat(["length"]),value:l.length})}(r,n,u,a);case 3:return function(c,i,f,p){var l=c.t,h=c.o,s=0;l.forEach(function(v){if(!h.has(v)){var y=i.concat([s]);f.push({op:"remove",path:y,value:v}),p.unshift({op:o,path:y,value:v})}s++}),s=0,h.forEach(function(v){if(!l.has(v)){var y=i.concat([s]);f.push({op:o,path:y,value:v}),p.unshift({op:"remove",path:y,value:v})}s++})}(r,n,u,a)}},M:function(r,n,u,a){u.push({op:"replace",path:[],value:n===V?void 0:n}),a.push({op:"replace",path:[],value:r})}})}var ie,M,Z=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",ye=typeof Map<"u",de=typeof Set<"u",ae=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",V=Z?Symbol.for("immer-nothing"):((ie={})["immer-nothing"]=!0,ie),x=Z?Symbol.for("immer-draftable"):"__$immer_draftable",P=Z?Symbol.for("immer-state"):"__$immer_state",be=""+Object.prototype.constructor,Y=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,me=Object.getOwnPropertyDescriptors||function(e){var t={};return Y(e).forEach(function(o){t[o]=Object.getOwnPropertyDescriptor(e,o)}),t},G={},H={get:function(e,t){if(t===P)return e;var o=S(e);if(!N(o,t))return function(n,u,a){var c,i=ne(u,a);return i?"value"in i?i.value:(c=i.get)===null||c===void 0?void 0:c.call(n.k):void 0}(e,o,t);var r=o[t];return e.I||!j(r)?r:r===C(e.t,t)?(T(e),e.o[t]=B(e.A.h,r,e)):r},has:function(e,t){return t in S(e)},ownKeys:function(e){return Reflect.ownKeys(S(e))},set:function(e,t,o){var r=ne(S(e),t);if(r!=null&&r.set)return r.set.call(e.k,o),!0;if(!e.P){var n=C(S(e),t),u=n==null?void 0:n[P];if(u&&u.t===o)return e.o[t]=o,e.R[t]=!1,!0;if(se(o,n)&&(o!==void 0||N(e.t,t)))return!0;T(e),q(e)}return e.o[t]===o&&(o!==void 0||t in e.o)||Number.isNaN(o)&&Number.isNaN(e.o[t])||(e.o[t]=o,e.R[t]=!0),!0},deleteProperty:function(e,t){return C(e.t,t)!==void 0||t in e.t?(e.R[t]=!1,T(e),q(e)):delete e.R[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var o=S(e),r=Reflect.getOwnPropertyDescriptor(o,t);return r&&{writable:!0,configurable:e.i!==1||t!=="length",enumerable:r.enumerable,value:o[t]}},defineProperty:function(){d(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){d(12)}},E={};_(H,function(e,t){E[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),E.deleteProperty=function(e,t){return E.set.call(this,e,t,void 0)},E.set=function(e,t,o){return H.set.call(this,e[0],t,o,e[0])};var ge=function(){function e(o){var r=this;this.O=ae,this.D=!0,this.produce=function(n,u,a){if(typeof n=="function"&&typeof u!="function"){var c=u;u=n;var i=r;return function(y){var b=this;y===void 0&&(y=c);for(var m=arguments.length,g=Array(m>1?m-1:0),R=1;R<m;R++)g[R-1]=arguments[R];return i.produce(y,function(fe){var ee;return(ee=u).call.apply(ee,[b,fe].concat(g))})}}var f;if(typeof u!="function"&&d(6),a!==void 0&&typeof a!="function"&&d(7),j(n)){var p=re(r),l=B(r,n,void 0),h=!0;try{f=u(l),h=!1}finally{h?F(p):X(p)}return typeof Promise<"u"&&f instanceof Promise?f.then(function(y){return U(p,a),$(y,p)},function(y){throw F(p),y}):(U(p,a),$(f,p))}if(!n||typeof n!="object"){if((f=u(n))===void 0&&(f=n),f===V&&(f=void 0),r.D&&L(f,!0),a){var s=[],v=[];w("Patches").M(n,f,s,v),a(s,v)}return f}d(21,n)},this.produceWithPatches=function(n,u){if(typeof n=="function")return function(f){for(var p=arguments.length,l=Array(p>1?p-1:0),h=1;h<p;h++)l[h-1]=arguments[h];return r.produceWithPatches(f,function(s){return n.apply(void 0,[s].concat(l))})};var a,c,i=r.produce(n,u,function(f,p){a=f,c=p});return typeof Promise<"u"&&i instanceof Promise?i.then(function(f){return[f,a,c]}):[i,a,c]},typeof(o==null?void 0:o.useProxies)=="boolean"&&this.setUseProxies(o.useProxies),typeof(o==null?void 0:o.autoFreeze)=="boolean"&&this.setAutoFreeze(o.autoFreeze)}var t=e.prototype;return t.createDraft=function(o){j(o)||d(8),D(o)&&(o=he(o));var r=re(this),n=B(this,o,void 0);return n[P].C=!0,X(r),n},t.finishDraft=function(o,r){var n=o&&o[P],u=n.A;return U(u,r),$(void 0,u)},t.setAutoFreeze=function(o){this.D=o},t.setUseProxies=function(o){o&&!ae&&d(20),this.O=o},t.applyPatches=function(o,r){var n;for(n=r.length-1;n>=0;n--){var u=r[n];if(u.path.length===0&&u.op==="replace"){o=u.value;break}}n>-1&&(r=r.slice(n+1));var a=w("Patches").$;return D(o)?a(o,r):this.produce(o,function(c){return a(c,r)})},e}(),O=new ge,Oe=O.produce;O.produceWithPatches.bind(O);O.setAutoFreeze.bind(O);O.setUseProxies.bind(O);var we=O.applyPatches.bind(O);O.createDraft.bind(O);O.finishDraft.bind(O);export{Pe as T,Oe as f,we as p};