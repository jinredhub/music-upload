import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-first-activity.firebaseio.com/-LYQMvCCcIhXxVdiPSvW'
});

export default instance;