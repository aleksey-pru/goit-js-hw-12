import { fetchSearch } from "./js/pixabay-api"; 
import { renderGallery } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.submit-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadbtn = document.querySelector('.load-btn');

export let page = 1;
export let per_page = 40; 
let search = '';

form.addEventListener('submit', async e => {
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
    loader.classList.remove('hidden');
    galleryContainer.innerHTML = '';
    page = 1;

    try {
        const response = await fetchSearch(search, page, per_page);
        form.reset();
        const imagesData = response.data.hits;
        if(imagesData.length === 0) {
            iziToast.error({
                position: 'topRight',
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });  
            return;      
    }
    renderGallery(imagesData, galleryContainer);
    page += 1;

    } catch (error) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later!',
        });
        console.log(error);
    } finally {
        loader.classList.add('hidden');
        loadbtn.classList.remove('hidden');
    }


})

loadbtn.addEventListener('click', async e => {
    e.preventDefault();
    loadbtn.classList.add('hidden');
    loader.classList.remove('hidden');
    try {
        const response = await fetchSearch(search, page, per_page);
        const imagesData = response.data.hits;
        const totalHits = response.data.totalHits;
        renderGallery(imagesData, galleryContainer, true);
        page += 1;
        const totalPages = page * per_page;
        if (totalPages >= totalHits) {
            loadbtn.classList.add('hidden');
            iziToast.info({
                position: 'topRight',
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch (error) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later!',
        });
        console.log(error);
    } finally {
        loader.classList.add('hidden');
        loadbtn.classList.remove('hidden');
    }

})
