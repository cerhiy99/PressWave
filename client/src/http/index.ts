import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL
})


const authInterceptor = (config:any) => {
    config.headers.KEY = localStorage.getItem('KEY');
    return config
}

const $authHost=axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL
})

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}