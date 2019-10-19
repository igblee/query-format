!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.queryFormat=t():e.queryFormat=t()}(window,(function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=2)}([function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){module.exports=t(e)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==global?global:this,(function(global){"use strict";global=global||{};var _Base64=global.Base64,version="2.5.1",buffer;if(module.exports)try{buffer=eval("require('buffer').Buffer")}catch(e){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var t={},r=0,o=e.length;r<o;r++)t[e.charAt(r)]=r;return t}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2)return(t=e.charCodeAt(0))<128?e:t<2048?fromCharCode(192|t>>>6)+fromCharCode(128|63&t):fromCharCode(224|t>>>12&15)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t);var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|t>>>18&7)+fromCharCode(128|t>>>12&63)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(e){return e.replace(re_utob,cb_utob)},cb_encode=function(e){var t=[0,2,1][e.length%3],r=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0);return[b64chars.charAt(r>>>18),b64chars.charAt(r>>>12&63),t>=2?"=":b64chars.charAt(r>>>6&63),t>=1?"=":b64chars.charAt(63&r)].join("")},btoa=global.btoa?function(e){return global.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e)).toString("base64")}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e)).toString("base64")}:function(e){return btoa(utob(e))},encode=function(e,t){return t?_encode(String(e)).replace(/[+\/]/g,(function(e){return"+"==e?"-":"_"})).replace(/=/g,""):_encode(String(e))},encodeURI=function(e){return encode(e,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return fromCharCode(55296+(t>>>10))+fromCharCode(56320+(1023&t));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(e){return e.replace(re_btou,cb_btou)},cb_decode=function(e){var t=e.length,r=t%4,o=(t>0?b64tab[e.charAt(0)]<<18:0)|(t>1?b64tab[e.charAt(1)]<<12:0)|(t>2?b64tab[e.charAt(2)]<<6:0)|(t>3?b64tab[e.charAt(3)]:0),n=[fromCharCode(o>>>16),fromCharCode(o>>>8&255),fromCharCode(255&o)];return n.length-=[0,0,2,1][r],n.join("")},_atob=global.atob?function(e){return global.atob(e)}:function(e){return e.replace(/\S{1,4}/g,cb_decode)},atob=function(e){return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e,"base64")).toString()}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e,"base64")).toString()}:function(e){return btou(_atob(e))},decode=function(e){return _decode(String(e).replace(/[-_]/g,(function(e){return"-"==e?"+":"/"})).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum((function(){return decode(this)}))),Object.defineProperty(String.prototype,"toBase64",noEnum((function(e){return encode(this,e)}))),Object.defineProperty(String.prototype,"toBase64URI",noEnum((function(){return encode(this,!0)})))}}return global.Meteor&&(Base64=global.Base64),module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),{Base64:global.Base64}}))}).call(this,__webpack_require__(1))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";r.r(t);var o=r(0);const n=o.Base64.encode("TYPE_1"),c=o.Base64.encode("TYPE_2"),u=o.Base64.encode("TYPE_3"),f=o.Base64.encode("TYPE_4"),a=o.Base64.encode("TYPE_5"),i=o.Base64.encode("TYPE_6"),b=o.Base64.encode("TYPE_7"),l="_";function d(e){return Object.prototype.toString.call(e)}function s(e){if(Array.isArray(e))return e.map(s);if(e&&"object"==typeof e){const t={};for(const r in e)t[r]=s(e[r]);return t}return e}function _(e,t,r=null,o=null){const n=Object.prototype.toString.call(e);if("[object Object]"!==n&&"[object Null]"!==n&&"[object Array]"!==n)return t;try{return JSON.stringify(e,r,o)}catch(e){console.info(e)}return t}function h(e,t){if(!e)return t;try{return JSON.parse(e)}catch(e){console.info(e)}return t}function p(e,t,r){return t?r?o.Base64.encode(e):o.Base64.decode(e):e}r.d(t,"default",(function(){return g}));class g{constructor(e=!1){this.decodeQuery=t=>(function(e,t){if("[object Object]"!==d(e))throw new Error("the input must be object");const r=s(e),o={};return Object.keys(e).forEach(e=>{const d=p(r[e],t,!1),_=function(e){const t=s(e);return~t.indexOf(`${n}`)?"[object Undefined]":~t.indexOf(`${c}`)?"[object Null]":~t.indexOf(`${a}`)?"[object Array]":~t.indexOf(`${i}`)?"[object Object]":~t.indexOf(`${u}`)?"[object Number]":~t.indexOf(`${f}`)?"[object String]":"[object Other]"}(d);if("[object Undefined]"===_)o[e]=void 0;else if("[object Null]"===_)o[e]=null;else if("[object Array]"===_){const t=d.indexOf(a),r=h(d.slice(0,t-l.length),null);o[e]=r}else if("[object Object]"===_){const t=d.indexOf(i),r=h(d.slice(0,t-l.length),null);o[e]=r}else if("[object Number]"===_){const t=d.indexOf(u),r=parseFloat(d.slice(0,t-l.length));o[e]=r}else if("[object String]"===_){const t=d.indexOf(f),r=d.slice(0,t-l.length);o[e]=r}else{const t=d.indexOf(b),r=d.slice(0,t-l.length);o[e]=r}}),o})(t,e),this.encodeQuery=t=>(function(e,t){if("[object Object]"!==d(e))throw new Error("the input must be object");const r=s(e),o={};return Object.keys(e).forEach(e=>{const s=r[e],h=d(s);o[e]=p("[object Undefined]"===h?`${s}${l}${n}`:"[object Null]"===h?`${s}${l}${c}`:"[object Array]"===h?`${_(s,null)}${l}${a}`:"[object Object]"===h?`${_(s,null)}${l}${i}`:"[object Number]"===h?`${s}${l}${u}`:"[object String]"===h?`${s}${l}${f}`:`${s}${l}${b}`,t,!0)}),o})(t,e)}}}])}));
//# sourceMappingURL=main.js.map