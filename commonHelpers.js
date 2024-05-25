import{a as u,S as g,i as d}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();u.defaults.baseURL="https://pixabay.com/api/";const y="43978229-66aec4be0aecfd6358506c605";async function L(o,r,a){const i=new URLSearchParams({key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:a,page:r});return await u.get(`?${i}`)}function b(o){return o.map(({largeImageURL:a,webformatURL:i,tags:e,likes:s,views:l,comments:p,downloads:h})=>`<li class="item-results">
          <a href="${a}" class="gallery-link">
            <img src="${i}" alt="${e}" class="gallery-img"/>
          </a>
          <div class="wrap-info">
            <ul class="list-info">
              <li class="item-info">
                <p class="headline-info">Likes</p>
                <p class="text-info">${s}</p>
              </li>
              <li class="item-info">
                <p class="headline-info">Views</p>
                <p class="text-info">${l}</p>
              </li>
              <li class="item-info">
                <p class="headline-info">Comments</p>
                <p class="text-info">${p}</p>
              </li>
              <li class="item-info">
                <p class="headline-info">Downloads</p>
                <p class="text-info">${h}</p>
              </li>
            </ul>
          </div>
        </li>`).join("")}const v=new g(".gallery-link",{captionsData:"alt",captionDelay:250}),t={userRequest:document.querySelector(".form__input"),form:document.querySelector(".form"),resultsList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more__btn")};let n="",c=1,f=15;function m(o,r,a){return L(o,r,a).then(({data:i})=>{i.hits.length===0&&d.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.resultsList.insertAdjacentHTML("beforeend",b(i.hits)),v.refresh(),t.loadMoreBtn.classList.remove("is-hidden");const e=Math.ceil(i.totalHits/a);r>=e&&(d.info({message:"We`re sorry, but you`ve reached the end of search results.",position:"topRight"}),t.loadMoreBtn.classList.add("is-hidden"))}).catch(i=>console.log(i)).finally(()=>{t.loader.classList.add("is-hidden")})}function S(o){if(o.preventDefault(),n=t.userRequest.value.trim(),!n)return d.warning({message:"That field can't be empty!",position:"topRight",backgroundColor:"red"});o.target.reset(),t.loader.classList.remove("is-hidden"),c=1,t.resultsList.innerHTML="",m(n,c,f)}async function w(){c+=1,t.loader.classList.remove("is-hidden"),t.loadMoreBtn.classList.add("is-hidden"),await m(n,c,f),q()}function q(){t.lastGalleryItem=document.querySelector(".item-results:last-child"),t.lastGalleryItemHeight=t.lastGalleryItem.getBoundingClientRect().height,window.scrollBy({top:t.lastGalleryItemHeight*2,left:0,behavior:"smooth"})}t.form.addEventListener("submit",S);t.loadMoreBtn.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
