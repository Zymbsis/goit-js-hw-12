import{a as O,i as S,S as R}from"./assets/vendor-483db976.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const f of t.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function i(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(s){if(s.ep)return;s.ep=!0;const t=i(s);fetch(s.href,t)}})();async function y(o,e){return(await O.get(o,{params:e})).data}const I="/goit-js-hw-12/assets/octagon-7962080a.svg",C="/goit-js-hw-12/assets/close_button-de5d3efc.svg";function k(o,e,i,c,s){c.innerHTML+=o.map(t=>`<li class='gallery-item'><a class='gallery-link' href=${t.largeImageURL}><img class='gallery-img' src=${t.webformatURL} width='360' height='200' alt=${t.tags}><span class="img-loader"></span></a><ul class='desc-wrapper'><li class='desc-text'><h3>Likes</h3><p>${t.likes}</p></li><li class='desc-text'><h3>Views</h3><p>${t.views}</p></li><li class='desc-text'><h3>Comments</h3><p>${t.comments}</p></li><li class='desc-text'><h3>Downloads</h3><p>${t.downloads}</p></li></ul></li>`).join(""),s&&(document.querySelectorAll(".gallery-item").forEach(t=>t.classList.add("light-theme")),document.querySelectorAll(".img-loader").forEach(t=>t.classList.add("img-loader-light-theme"))),e.classList.remove("is-visible"),i.refresh(),B()}function h(o,e,i){S.show({class:"my-iziToast",backgroundColor:"#EF4040",messageColor:"#fff",messageSize:16,messageLineHeight:"24",message:o,position:"topRight",iconUrl:I,progressBarColor:"#B51B1B;",close:!1,transitionIn:"bounceInLeft",transitionOut:"fadeOutRight",buttons:[[`<button type="button" style="background-color: #EF4040; padding-top: 15px; padding-bottom: 15px"><img src=${C}></button>`,function(c,s){c.hide({transitionOut:"fadeOutRight"},s)}]],onOpening:function(c,s){e.classList.remove("is-visible"),i.addEventListener("input",()=>{S.hide({transitionOut:"fadeOutRight"},s)},{once:!0})}})}function B(){document.querySelectorAll(".gallery-img").forEach(e=>e.addEventListener("load",()=>{e.nextSibling.classList.add("img-loader-hidden")}))}const m=document.querySelector(".form"),n=m.elements.text,p=document.querySelector(".gallery-container"),a=document.querySelector(".text-loader"),d=document.querySelector(".loader-button"),u=document.querySelector(".button-up"),r=document.querySelector(".checkbox"),L=document.querySelectorAll(".dark-theme"),x="light-theme",b="https://pixabay.com/api/",l={key:"42207525-2f984868f7881b9b68563ca8c",image_type:"photo",orientation:"horizontal",safesearch:!0,q:"",page:1,per_page:15};let v,g;const q=new R(".gallery-link");m.addEventListener("submit",async o=>{if(o.preventDefault(),d.removeEventListener("click",w),r.checked?a.classList.add("text-loader-light-theme","is-visible"):a.classList.add("is-visible"),p.innerHTML="",!n.value.trim())h("Search field can not be empty",a,n);else{a.classList.add("is-visible"),l.page=1,l.q=n.value;try{g=(await y(b,l)).hits;const e=(await y(b,l)).totalHits;g.length?(v=Math.ceil(e/l.per_page),k(g,a,q,p,r.checked),v>1&&(d.classList.add("is-visible"),d.addEventListener("click",w),l.page+=1)):h("Sorry, there are no images matching your search query. Please, try again!",a,n)}catch(e){h("Oops! Something went wrong. Try again!",a,n),console.log(e)}}m.reset()});async function w(o){d.classList.remove("is-visible"),r.checked?a.classList.add("text-loader-light-theme","is-visible"):a.classList.add("is-visible");try{g=(await y(b,l)).hits,k(g,a,q,p,r.checked),l.page+=1,l.page<v?d.classList.add("is-visible"):(d.removeEventListener("click",w),h("We're sorry, but you've reached the end of search results.",a,n)),A()}catch(e){h("Oops! Something went wrong. Try again!",a,n),console.log(e)}}function A(){const o=document.querySelector(".gallery-item").getBoundingClientRect().height,e=Math.ceil(o*2.5);window.scrollBy({top:e,behavior:"smooth"})}const P=new IntersectionObserver(o=>{o[0].intersectionRatio===0?(u.classList.add("is-visible"),u.addEventListener("click",E)):(u.classList.remove("is-visible"),u.removeEventListener("click",E))});P.observe(m);function E(){m.scrollIntoView({behavior:"smooth"})}r.addEventListener("change",T);window.addEventListener("load",$);function T(){localStorage.setItem(x,JSON.stringify(r.checked));const o=document.querySelectorAll(".gallery-item"),e=document.querySelectorAll(".img-loader");r.checked?(document.body.classList.add("body-light-theme"),L.forEach(i=>i.classList.add("light-theme")),o.forEach(i=>i.classList.add("light-theme")),e.forEach(i=>i.classList.add("img-loader-light-theme")),a.classList.add("text-loader-light-theme")):(document.body.classList.remove("body-light-theme"),L.forEach(i=>i.classList.remove("light-theme")),o.forEach(i=>i.classList.remove("light-theme")),e.forEach(i=>i.classList.remove("img-loader-light-theme")),a.classList.remove("text-loader-light-theme"))}function $(){r.checked=JSON.parse(localStorage.getItem(x)),r.checked&&(document.body.classList.add("body-light-theme"),L.forEach(o=>o.classList.add("light-theme")))}
//# sourceMappingURL=commonHelpers.js.map