import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

import { getImages } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";


const refs = {
    userRequest: document.querySelector('.form__input'),
    form: document.querySelector('.form'),
    resultsList: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    loadMoreBtn: document.querySelector('.load-more__btn'),
}

let inputValue = '';
let pageNumber = 1;
let perPage = 15;

function getData(inputValue,pageNumber,perPage) {
    return getImages(inputValue, pageNumber, perPage)
        .then(({ data }) => {
            if (data.hits.length === 0) {
                iziToast.info({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight",
                })
            }
        
            refs.resultsList.insertAdjacentHTML("beforeend", createMarkup(data.hits));
            lightbox.refresh();
            refs.loadMoreBtn.classList.remove('is-hidden');

            const totalPages = Math.ceil(data.totalHits / perPage);
            
            if (pageNumber >= totalPages) {
                iziToast.info({
                    message: 'We`re sorry, but you`ve reached the end of search results.',
                    position: "topRight"
                });
                refs.loadMoreBtn.classList.add('is-hidden');
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            refs.loader.classList.add('is-hidden')
        });
}


function submitHandler(event) {
    event.preventDefault();
    
    inputValue = refs.userRequest.value.trim();

    if (!inputValue) {
        return iziToast.warning({
            message: "That field can't be empty!",
            position: "topRight",
            backgroundColor: 'red',
        })
    }

    event.target.reset();
    refs.loader.classList.remove('is-hidden');
    pageNumber = 1;
    refs.resultsList.innerHTML = '';

    getData(inputValue, pageNumber, perPage);
}

async function increasePageNumber() {
    pageNumber += 1;

    refs.loader.classList.remove('is-hidden');
    refs.loadMoreBtn.classList.add('is-hidden');

    await getData(inputValue, pageNumber, perPage);
    smoothScoll();
}

function smoothScoll() {
    refs.lastGalleryItem = document.querySelector('.item-results:last-child');
    refs.lastGalleryItemHeight = refs.lastGalleryItem.getBoundingClientRect().height;
    
    window.scrollBy({
        top: refs.lastGalleryItemHeight * 2,
        left: 0,
        behavior: 'smooth',
    });
}

refs.form.addEventListener('submit', submitHandler);
refs.loadMoreBtn.addEventListener('click',increasePageNumber)