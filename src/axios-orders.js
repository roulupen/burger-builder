import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-2b17a.firebaseio.com/'
});

export default instance;