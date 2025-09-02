import axios from "axios"
import { EmailDTO } from "../models/EmailDTO";
import { CodigoDTO } from "../models/CodigoDTO";

const API_REST="http://localhost:8080/public";

const enviarCodigo = async (bean:EmailDTO) =>{
    const response = await axios.post(`${API_REST}/enviarCodigo`,bean);
    if(response.data){
        return response;
    }
}

const validarCodigo = async (bean:CodigoDTO) => {
    const response = await axios.post(`${API_REST}/verificar`,bean)
    if(response.data){
        return response;
    }
}

const cambiarPassword = async(bean:PasswordDTO)=>{
    const response = await axios.post(`${API_REST}/passwordReset`,bean)
    if(response.data){
        return response;
    }
}

export {enviarCodigo,validarCodigo,cambiarPassword}