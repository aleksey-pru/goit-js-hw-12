import { fetchSearch } from "./js/pixabay-api"; 
import { renderGallery } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.submit-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const search =  e.target.elements.searchInput.value.trim();
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

    try {
        const response = await fetchSearch(search);
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
    } catch (error) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later!',
        });
        console.log(error);
    } finally {
        loader.classList.add('hidden');
    }

})


