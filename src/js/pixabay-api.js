'use strict'

import axios from 'axios';

axios.defaults.baseURL  = 'https://pixabay.com/api/';
const API_KEY = '43978229-66aec4be0aecfd6358506c605';

export async function getImages(q, page, per_page) {
    const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
    });
    
    return await axios.get(`?${searchParams}`)
}