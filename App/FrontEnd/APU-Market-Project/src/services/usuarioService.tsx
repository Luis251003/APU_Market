import axios from "axios";

const API_REST="http://localhost:8080";

const checkAuth = async ()=>{
    const response = await axios.get(`${API_REST}/public/auth/check`)
    if(response.data){
        return response;
    }
}

const login = async (bean:PasswordDTO)=>{
    const response = await axios.post(`${API_REST}/login`,bean,{withCredentials:true})
    if(response.data){
        return response;
    }
}

const logout = async ()=>{
    const response = await axios.post(`${API_REST}/usuario/logout`,null,{withCredentials:true})
    if(response.data){
        return response;
    }
}

const getPermisos = async (username:string)=>{
    const response = await axios.get(`${API_REST}/usuario/permisos/${username}`,{withCredentials:true})
    if(response.data){
        console.log(response.data)
        return response;
    }
}
export {checkAuth,login,logout,getPermisos}