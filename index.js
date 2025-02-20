import{a as f,S as y,i as n}from"./assets/vendor-wqbdFd7k.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h=async a=>await f({method:"get",url:"https://pixabay.com/api/",params:{page:1,per_page:40,key:"48819306-b63c1eb0b26be23d91021a657",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}});function b(a,r){const s=a.map(({webformatURL:e,largeImageURL:t,tags:i,likes:u,views:d,comments:m,downloads:g})=>`<li class="gallery-item">
            <a class="gallery-link" href="${t}">
              <img
                class="gallery-image"
                src="${e}"
                alt="${i}"
              />
            </a>
            <div class="text-container">
                <p class="text"><span class="text-value">Likes</span> ${u}</p>
                <p class="text"><span class="text-value">Views</span> ${d}</p>
                <p class="text"><span class="text-value">Comments</span> ${m}</p>
                <p class="text"><span class="text-value">Downloads</span> ${g}</p>
            </div>
          </li>`).join("");r.innerHTML=s,new y(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const l=document.querySelector(".submit-form"),c=document.querySelector(".gallery"),p=document.querySelector(".loader");l.addEventListener("submit",async a=>{a.preventDefault();const r=a.target.elements.searchInput.value.trim();if(!r){n.error({position:"topRight",title:"Error",message:"Search query cannot be empty. Please enter a keyword!"});return}p.classList.remove("hidden"),c.innerHTML="";try{const s=await h(r);l.reset();const o=s.data.hits;if(o.length===0){n.error({position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}b(o,c)}catch(s){n.error({position:"topRight",title:"Error",message:"An error occurred while fetching data. Please try again later!"}),console.log(s)}finally{p.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
