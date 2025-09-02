import { checkAuth } from "@/services/usuarioService";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

axios.defaults.withCredentials = true;

const PrivateRoute = ({ children }: PrivateRouteProps)=>{
    const[isAuth,setIsAuth] = useState<boolean | null>(null);
    const executedRef = useRef(false);

    const handleCheckAuth = async () => {
        try{
            const response =  await checkAuth();
            if(response?.data){
                setIsAuth(true);
            }
        }catch(error){
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    setIsAuth(false);
                    toast.error("Acceso Restringido")
                } else {
                    toast.error(error.message || "Error en la autenticación");
                }
            } else {
                toast.error("Error del sistema");
            }
        }
    }

    useEffect(()=>{
        if (!executedRef.current) {
            executedRef.current = true;
            handleCheckAuth();
        }
    },[])

    if (isAuth === null) {
        return <div>Cargando autenticación...</div>;
    }

    return isAuth ? children : <Navigate to="/" />;
}
export default PrivateRoute;