let t;class e{subs;constructor(){this.subs=new Set}add(){t&&this.subs.add(t)}notify(){this.subs.forEach((t=>t&&t()))}}const n=t=>typeof t==="function";const s=t=>typeof t==="object"&&t!==null;const o=(t,e)=>{if(s(t))Object.keys(t).forEach((n=>{if(s(t[n]))e[n]=o(t[n],e[n]);else e[n]=t[n]}));else e=t;return e};const c=(t,e)=>c=>{const r=n(c)?c(t.data):c;if(s(r))o(r,t.data);else t.data=r;e.notify()};const r=t=>({get(e,n){t.add();if(s(e[n]))return new Proxy(e[n],r(t));return e[n]}});const i=t=>{const n=new e;const s=new Proxy({data:t},r(n));return[()=>s.data,c(s,n)]};const a=e=>{t=e;t();t=null};const d=t=>t;const l=t=>({current:t});const f=(t,e,n=0)=>{if(Array.isArray(e))e.forEach(((e,n)=>f(t,e,n)));else if(!t.childNodes[n])t.appendChild(e?.nodeType?e:document.createTextNode(e));else if(e!==t.childNodes[n].data)t.childNodes[n].data=e};const u=(t,e)=>{const{children:n}=e;if(typeof t==="function")return t(e);const s=t==="svg"?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t);Object.entries(e||{}).forEach((([t,e])=>{if(n)for(let t=0;t<s.children.length;t++)f(s,e,t);if(t.startsWith("on")&&t.toLowerCase()in window)s.addEventListener(t.toLowerCase().substring(2),e);else if(t.startsWith("data-"))s.setAttribute(t,e);else if(t==="children")return;else s.setAttribute(t,e)}));a((()=>{const t=Array.isArray(n)?n:[n];const e=t.map((t=>typeof t==="function"?t():t));f(s,e)}));return s};const h=u;const y=t=>t.children;const p=(t,e)=>{e.appendChild(t)};const w=(t,e)=>{p(t,e)};const b=(t,e)=>u(t,e);const E=b;export{y as Fragment,w as hydrate,u as jsx,h as jsxDEV,b as jsxs,E as jsxsDEV,p as render,d as useCallback,a as useEffect,l as useRef,i as useState};
