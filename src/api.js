import axios from 'axios';

const api = axios.create({
    baseURL: 'https://avaliacao1-lp3.herokuapp.com/'
})

export default api;