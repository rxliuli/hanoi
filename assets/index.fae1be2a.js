const f=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}};f();var a={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#39;","`":"&#96;"},h=new RegExp(Object.keys(a).join("|"),"g");function m(n){return n===void 0&&(n=""),String(n).replace(h,function(e){return a[e]})}function u(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return n.raw.reduce(function(o,r,i){var s=e[i-1];return Array.isArray(s)?s=s.join(""):n.raw[i-1]&&n.raw[i-1].endsWith("$")?o=o.slice(0,-1):s=m(s),o+s+r})}class g{constructor(e){this.state=e}check(e,t){return this.state[e].length!==0&&(this.state[t].length===0||this.get(e)<this.get(t))}move(e,t){if(!this.check(e,t))throw new Error(`invalid move ${JSON.stringify(this.state)} ${e} ${t}`);this.state[t].unshift(this.state[e].shift())}get(e){return this.state[e][0]}}const p=document.querySelector("#app");let l=new g({a:[1,2,3,4],b:[],c:[]});p.innerHTML=u`<div>
  <h1>汉诺塔</h1>
  <main></main>
</div>`;function y(n){return u`${["a","b","c"].map(e=>u`<ul class="list ${e}" data-operator="${e}">
      ${n[e].map(t=>u`<li style="width: ${(100+t*20).toString()}px">
            ${t.toString()}
          </li>`)}
    </ul>`)}`}let c=null;function v(n){c=n,document.querySelector(`.${n}`).classList.add("selected")}function $(){!c||(document.querySelector(`.${c}`).classList.remove("selected"),c=null)}function d(){document.querySelector("main").innerHTML=y(l.state),document.querySelectorAll(".list").forEach(n=>n.addEventListener("click",e=>{const o=e.currentTarget.dataset.operator;if(console.log("move: ",c,o),!c){if(!l.get(o)){console.log("\u65E0\u6CD5\u9009\u4E2D");return}v(o);return}if(!l.check(c,o)){console.warn("\u65E0\u6CD5\u79FB\u52A8"),$();return}l.move(c,o),c=null,d()}))}d();