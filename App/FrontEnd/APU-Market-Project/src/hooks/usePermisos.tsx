import { getPermisos } from "@/services/usuarioService";
import { useEffect, useState } from "react"

const usePermisos = ()=>{
    const[permisos,setPermisos] = useState<string[]>([]);
    const[loading,setLoading] = useState(true);

    const fetchPermisos = async ()=>{
        try{
            //Obtenemos los permisos
            const userDetails = localStorage.getItem("USER_DETAILS");
            if (userDetails) {
                const username = JSON.parse(userDetails).username;
                const response = await getPermisos(username);
                if (response?.data) {
                    setPermisos(response.data);
                }

            }
        }catch (error) {
            console.error("Error cargando permisos", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPermisos();
    },[])
    return {permisos,loading}
}
export default usePermisos