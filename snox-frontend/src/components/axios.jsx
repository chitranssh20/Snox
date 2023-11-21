import axios from 'axios'
import Cookies from 'js-cookie'


const baseUrl = "http://127.0.0.1:8000/v1/";

const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 20000,
    })   
    
const token = null 

axiosInstance.interceptors.request.use((config) => {
    Cookies.get("JWT") != null && !undefined ? config.headers['Authorization'] = Cookies.get("JWT") : delete config.headers.Authorization
    return config
})
    
export default axiosInstance