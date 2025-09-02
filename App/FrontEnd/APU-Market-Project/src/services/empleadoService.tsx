import axios from "axios";

const API_REST = "http://localhost:8080/empleado";

const getEmpleados = async () =>{
    const response = await axios.get(API_REST);
    if(response.data){
        return response;
    }
}

const postEmpleado = async (bean:Empleado) =>{
    const response = await axios.post(API_REST,bean);
    if(response.data){
        return response;
    }
}

export {getEmpleados,postEmpleado}