import axios from 'axios';

const api = axios.create({
    baseURL: 'https://listatarefas-backend.herokuapp.com'
})

export default api;