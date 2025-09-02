import styles from './Login.module.css'
import logo from '../../assets/logos/logo_apu_market.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import userSchema from '../../validations/userSchema'
import { login } from '../../services/usuarioService'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

type Inputs={
    email:string,
    password:string,
    remember:boolean
}

const Login = ()=>{

    const[isVisible,setIsVisible] = useState(false);
    const navigate = useNavigate();
    const{register,handleSubmit,formState:{errors}} = useForm<Inputs>({
        resolver:zodResolver(userSchema)
    });

    const onSubmit = handleSubmit(async(data)=>{
        try{
            const usuario:PasswordDTO={email:data.email,password:data.password}
            const response = await login(usuario);
            if(response?.data){
                const {roles,username} = response.data;
                const userDetails:UserDetails = {username:username,roles:roles};
                localStorage.setItem("USER_DETAILS",JSON.stringify(userDetails));
                toast.success("Ingreso exitoso")
                navigate("/dashboard")
            }
        }catch(error){
            if(error instanceof AxiosError && error.response != null){
                toast.error(error.response.data.error);
            }else{
                toast.error("Error interno del servidor");
            }
        }
        
    })

    return(
        <>
            <div className="container">
                <div className={`${styles.login__container}`}>
                    <div className={`${styles.login__content}`}>
                        <div className={styles.login__header}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={styles.login__body}>
                            <form className={styles.form} onSubmit={onSubmit}>
                                <div className={`${styles.form__group} ${errors.email && "form__group__error"}`}>
                                    <label className={styles.form__label} htmlFor="email">E-mail</label>
                                    <input type="email" id="email" placeholder='Ingresar tu correo' {...register("email")}/>
                                    {errors.email && <span className={"error__message"}>{errors.email.message}</span>}
                                </div>
                                <div className={`${styles.form__group} ${errors.password && "form__group__error"}`}>
                                    <label className={styles.form__label} htmlFor="password">Contraseña</label>
                                    <div className={styles.form__input}>
                                        <input type={isVisible ? 'text' : 'password'} id="password" placeholder='Ingresar tu contraseña' {...register("password")}/>
                                        <p className={styles.input__ico}>
                                            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} onClick={()=>setIsVisible(!isVisible)}></FontAwesomeIcon>
                                        </p>
                                    </div>
                                    {errors.password && <span className={"error__message"}>{errors.password.message}</span>}
                                </div>
                                <input type="submit" value="Iniciar Sesión" />
                                <div className={styles.form__footer}>
                                    <div className={styles.form__checkbox}>
                                        <input type="checkbox" id="remember" {...register("remember")}/>
                                        <label htmlFor="remember">Recordar Cuenta</label>
                                    </div>
                                    <Link to='../recovery'>¿Olvidaste tu cuenta?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;