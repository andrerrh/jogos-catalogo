import axios from 'axios';

const api = axios.create({
    baseURL: 'https://catalogo-games.herokuapp.com'
})

export default api;