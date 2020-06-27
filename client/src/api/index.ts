import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/': 'http://localhost:9999';
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';
axios.interceptors.request.use((config) => {
    let access_token = sessionStorage.getItem('access_token');
    config.headers={
        Authorization: `Bearer ${access_token}`,
    };
    return config;
});
axios.interceptors.response.use(response => response.data, error => Promise.reject(error));
export default axios;