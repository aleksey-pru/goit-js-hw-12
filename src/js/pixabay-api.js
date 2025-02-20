import axios from "axios";
export const fetchSearch = async (search) => {
    return await axios({
    method: 'get',
    url: 'https://pixabay.com/api/',
    params : {
        page: 1,
        per_page: 40,
        key: '48819306-b63c1eb0b26be23d91021a657',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    }
});
};