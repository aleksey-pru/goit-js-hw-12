import { fetchSearch } from "./js/pixabay-api"; 
import { renderGallery } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form : document.querySelector('.submit-form'),
    galleryContainer : document.querySelector('.gallery'),
    loader : document.querySelector('.loader'),
    loadbtn : document.querySelector('.load-btn'),
}

export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
export let page = 1;
export let per_page = 40; 
let search = '';

refs.form.addEventListener('submit', async e => {
    e.preventDefault();
    search =  e.target.elements.searchInput.value.trim();
    if (!search) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'Search query cannot be empty. Please enter a keyword!',
        });
        return;
    }
    refs.loader.classList.remove('hidden');
    refs.galleryContainer.innerHTML = '';
    page = 1;

    try {
        const response = await fetchSearch(search, page, per_page);
        refs.form.reset();
        const imagesData = response.data.hits;
        const totalHits = response.data.totalHits;
        if(imagesData.length === 0) {
            refs.loadbtn.classList.add('hidden');  
            iziToast.error({
                position: 'topRight',
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });  
            return; 
    }
    renderGallery(imagesData, refs.galleryContainer);
    page += 1;
    if (totalHits > per_page) {
        refs.loadbtn.classList.remove('hidden');
    } else {
        refs.loadbtn.classList.add('hidden');
    }

    } catch (error) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later!',
        });
        console.log(error);
    } finally {
        refs.loader.classList.add('hidden');
    }


})

refs.loadbtn.addEventListener('click', async e => {
    e.preventDefault();
    refs.loadbtn.classList.add('hidden');
    refs.loader.classList.remove('hidden');
    try {
        const response = await fetchSearch(search, page, per_page);
        const imagesData = response.data.hits;
        const totalHits = response.data.totalHits;
        renderGallery(imagesData, refs.galleryContainer, true);
        page += 1;
        scrollPage();
        const totalPages = page * per_page;
        if (totalPages >= totalHits) {
            refs.loadbtn.classList.add('hidden');
            iziToast.info({
                position: 'topRight',
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            refs.loadbtn.classList.remove('hidden');
        }
        
    } catch (error) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later!',
        });
        console.log(error);
    } finally {
        refs.loader.classList.add('hidden');
    }

})

function scrollPage(){ 
    const info = refs.galleryContainer.firstElementChild.getBoundingClientRect();
    const height = info.height;
    scrollBy({
        'behavior': "smooth",
        'top': height * 3,
    })
}