import{a as b,S as L,i as c}from"./assets/vendor-wqbdFd7k.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const u=async(s,e=1,o=40)=>await b({method:"get",url:"https://pixabay.com/api/",params:{page:e,per_page:o,key:"48819306-b63c1eb0b26be23d91021a657",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}});function g(s,e,o=!1){const i=s.map(({webformatURL:t,largeImageURL:a,tags:l,likes:h,views:f,comments:m,downloads:y})=>`<li class="gallery-item">
            <a class="gallery-link" href="${a}">
              <img
                class="gallery-image"
                src="${t}"
                alt="${l}"
              />
            </a>
            <div class="text-container">
                <p class="text"><span class="text-value">Likes</span> ${h}</p>
                <p class="text"><span class="text-value">Views</span> ${f}</p>
                <p class="text"><span class="text-value">Comments</span> ${m}</p>
                <p class="text"><span class="text-value">Downloads</span> ${y}</p>
            </div>
          </li>`).join("");o?e.insertAdjacentHTML("beforeend",i):e.innerHTML=i,v.refresh()}const r={form:document.querySelector(".submit-form"),galleryContainer:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadbtn:document.querySelector(".load-btn")},v=new L(".gallery a",{captionsData:"alt",captionDelay:250});let n=1,p=40,d="";r.form.addEventListener("submit",async s=>{if(s.preventDefault(),d=s.target.elements.searchInput.value.trim(),!d){c.error({position:"topRight",title:"Error",message:"Search query cannot be empty. Please enter a keyword!"});return}r.loader.classList.remove("hidden"),r.galleryContainer.innerHTML="",n=1;try{const e=await u(d,n,p);r.form.reset();const o=e.data.hits,i=e.data.totalHits;if(o.length===0){r.loadbtn.classList.add("hidden"),c.error({position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}g(o,r.galleryContainer),n+=1,i>p?r.loadbtn.classList.remove("hidden"):r.loadbtn.classList.add("hidden")}catch(e){c.error({position:"topRight",title:"Error",message:"An error occurred while fetching data. Please try again later!"}),console.log(e)}finally{r.loader.classList.add("hidden")}});r.loadbtn.addEventListener("click",async s=>{s.preventDefault(),r.loadbtn.classList.add("hidden"),r.loader.classList.remove("hidden");try{const e=await u(d,n,p),o=e.data.hits,i=e.data.totalHits;g(o,r.galleryContainer,!0),n+=1,x(),n*p>=i?(r.loadbtn.classList.add("hidden"),c.info({position:"topRight",title:"Info",message:"We're sorry, but you've reached the end of search results."})):r.loadbtn.classList.remove("hidden")}catch(e){c.error({position:"topRight",title:"Error",message:"An error occurred while fetching data. Please try again later!"}),console.log(e)}finally{r.loader.classList.add("hidden")}});function x(){const e=r.galleryContainer.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:e*3})}
//# sourceMappingURL=index.js.map
