import{a as x,i as L,S as q}from"./assets/vendor-483db976.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const a={key:"42207525-2f984868f7881b9b68563ca8c",image_type:"photo",orientation:"horizontal",safesearch:!0,q:"",page:1,per_page:15};async function y(){return(await x.get("https://pixabay.com/api/",{params:a})).data}const E="/goit-js-hw-12/assets/octagon-7962080a.svg",R="/goit-js-hw-12/assets/close_button-de5d3efc.svg";function S(s,t,c,n){t.classList.remove("is-visible"),n.innerHTML+=s.map(e=>`<li class='gallery-item'><a class='gallery-link' href=${e.largeImageURL}><img class='gallery-img' src=${e.webformatURL} width='360' height='200' alt=${e.tags}><span class="img-loader"></span></a><ul class='desc-wrapper'><li class='desc-text'><h3>Likes</h3><p>${e.likes}</p></li><li class='desc-text'><h3>Views</h3><p>${e.views}</p></li><li class='desc-text'><h3>Comments</h3><p>${e.comments}</p></li><li class='desc-text'><h3>Downloads</h3><p>${e.downloads}</p></li></ul></li>`).join(""),c.refresh(),I()}function d(s,t,c){L.show({class:"my-iziToast",backgroundColor:"#EF4040",messageColor:"#fff",messageSize:16,messageLineHeight:"24",message:s,position:"topRight",iconUrl:E,progressBarColor:"#B51B1B;",close:!1,transitionIn:"bounceInLeft",transitionOut:"fadeOutRight",buttons:[[`<button type="button" style="background-color: #EF4040; padding-top: 15px; padding-bottom: 15px"><img src=${R}></button>`,function(n,e){n.hide({transitionOut:"fadeOutRight"},e)}]],onOpening:function(n,e){t.classList.remove("is-visible"),c.addEventListener("input",()=>{L.hide({transitionOut:"fadeOutRight"},e)},{once:!0})}})}function I(){document.querySelectorAll(".gallery-img").forEach(t=>t.addEventListener("load",()=>{t.nextSibling.classList.add("img-loader-hidden")}))}const m=document.querySelector(".form"),r=m.elements.text,f=document.querySelector(".gallery-container"),i=document.querySelector(".loader"),l=document.querySelector(".loader-button"),h=document.querySelector(".button-up");let b,u;const O=new q(".gallery-link");m.addEventListener("submit",async s=>{if(s.preventDefault(),l.removeEventListener("click",v),l.classList.remove("is-visible"),f.innerHTML="",!r.value.trim())d("Search field can not be empty",i,r);else{i.classList.add("is-visible"),a.page=1,a.q=r.value;try{u=(await y()).hits;const t=(await y()).totalHits;u.length?(b=Math.ceil(t/a.per_page),S(u,i,O,f),b>1&&(l.classList.add("is-visible"),l.addEventListener("click",v),a.page+=1)):d("Sorry, there are no images matching your search query. Please, try again!",i,r)}catch(t){d("Oops! Something went wrong. Try again!",i,r),console.log(t)}}m.reset()});async function v(s){l.classList.remove("is-visible"),i.classList.add("is-visible");try{u=(await y()).hits,S(u,i,O,f),a.page+=1,a.page<b?l.classList.add("is-visible"):(l.removeEventListener("click",v),d("We're sorry, but you've reached the end of search results.",i,r)),B()}catch(t){d("Oops! Something went wrong. Try again!",i,r),console.log(t)}}function B(){const s=document.querySelector(".gallery-item").getBoundingClientRect().height,t=Math.ceil(s*2.5);window.scrollBy({top:t,behavior:"smooth"})}const C=new IntersectionObserver(s=>{s[0].intersectionRatio===0?(h.classList.add("is-visible"),h.addEventListener("click",w)):(h.classList.remove("is-visible"),h.removeEventListener("click",w))});C.observe(m);function w(){m.scrollIntoView({behavior:"smooth"})}const k="light-theme",g=document.querySelector(".checkbox");g.addEventListener("change",()=>{localStorage.setItem(k,JSON.stringify(g.checked)),g.checked?document.body.classList.add("body-light"):document.body.classList.remove("body-light")});window.addEventListener("load",()=>{g.checked=JSON.parse(localStorage.getItem(k)),g.checked?document.body.classList.add("body-light"):document.body.classList.remove("body-light")});
//# sourceMappingURL=commonHelpers.js.map
