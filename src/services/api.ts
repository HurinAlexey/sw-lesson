import axios from 'axios'
import config from '@/config'


const apiService = axios.create({
    baseURL: `${config.baseUrl}/api`
})

apiService.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)
)

export default apiService