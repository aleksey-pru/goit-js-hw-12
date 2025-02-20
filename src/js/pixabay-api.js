import axios from "axios";
// import { page } from "../main";
// import { per_page } from "../main";
export const fetchSearch = async (search, page = 1, per_page = 40) => {
    return await axios({
    method: 'get',
    url: 'https://pixabay.com/api/',
    params : {
        page: page,
        per_page: per_page,
        key: '48819306-b63c1eb0b26be23d91021a657',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    }
});
};