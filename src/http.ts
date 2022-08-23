import axios,{AxiosRequestConfig,AxiosResponse} from 'axios';

//请求拦截
axios.interceptors.request.use((config:AxiosRequestConfig) => {
    //在请求发出之前进行一些操作
    return config;
})

//响应拦截
axios.interceptors.response.use((response:AxiosResponse<any>)=>{
    return response;
})

export default axios;