import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const orignalRequest = error.config;
        if(
            error.response?.status === 401 && !originalRequest._retry
        ){
            originalRequest._retry = true;
            try{
                await axios.post("http://localhost:8080/refresh",
                {},
                {withCredentials:true}
                );
                return api(originalRequest);
            }catch(e){
                window.location.href = "/login"
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
)

export default api;