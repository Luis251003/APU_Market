import { deleteEmpleado, getEmpleados, postEmpleado, putEmpleado } from "@/services/empleadoService"
import { AxiosError } from "axios";
import { useEffect, useState } from "react"

export const useEmpleado = () =>{

    const [empleados,setEmpleados] = useState<Empleado[]>([]);
    const [isloading,setIsLoading] = useState<boolean>(true);
    const [error,setError] = useState<AxiosError|null>(null);

    const listEmpleados = async ()=>{
        try{
            const response = await getEmpleados();
            if(response?.data){
                setEmpleados(response.data);
            }else{
                setEmpleados([]);
            }
        }catch(error){
            if(error instanceof AxiosError){
                setError(error);
            }
        }finally{
            setIsLoading(false);
        }
    }

    const addEmpleado = async (values: Empleado) =>{
        try{
            const response = await postEmpleado(values);
            if(response){
                setEmpleados((prev)=>[...prev,response.data])
                return response.data;
            }            
        }catch(err){
            if(err instanceof AxiosError) setError(err);
            throw err;
        }
    }

    const editEmpleado = async (id:number,bean:Empleado)=>{
        try{
            const response = await putEmpleado(id,bean);
            if(response){
                setEmpleados((prev)=>
                    prev.map((e) => (e.id === id ? response.data : e))
                )
                return response.data;
            }
        }catch(err){
            if(err instanceof AxiosError) setError(err);
            throw err;
        }
    }

    const deleteEmp = async (bean:Empleado)=>{
        try{
            if(!bean.id) throw new Error("Empleado sin ID válido");
            const response = await deleteEmpleado(bean.id);
            if(response){
                setEmpleados((prev)=>
                    (prev ? prev.filter((e)=> e.id !== bean.id):[])
                )
                return response.data;
            }
        }catch(err){
            if(err instanceof AxiosError) setError(err);
            throw err;
        }
    }

    useEffect(()=>{
        listEmpleados();
    },[])

    return {addEmpleado,editEmpleado,deleteEmp,empleados,isloading,error};
}