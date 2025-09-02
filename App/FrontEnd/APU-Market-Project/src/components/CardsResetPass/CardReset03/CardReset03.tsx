import styles from '../CardReset.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash,faLock,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cambiarPassword } from '../../../services/emailService';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type props={
    step:number;
    setStep:(number:number)=>void;
}

const passwordSchema = z.object({
    password:z.string({error:"Debes ingresar un password"}).min(6,{error:"Debes ingresar minimo 6 caracteres"}),
    checkPassword:z.string({error:"Debes repetir el password"})
}).refine((data)=>data.password === data.checkPassword,{path:["checkPassword"],error:"Deben coincidir con el password"})

type Inputs=z.infer<typeof passwordSchema>

const CardReset03 = ({step,setStep}:props) =>{

    const[isVisible01,setIsVisible01] = useState(false);
    const[isVisible02,setIsVisible02] = useState(false);
    const navigate = useNavigate();

    const{register,handleSubmit,formState:{errors}} = useForm<Inputs>({
        resolver:zodResolver(passwordSchema)
    })

    const onSubmit = handleSubmit(async(data)=>{
        try{
            //Obtenemos el correo del localStorage
            const correo = localStorage.getItem("email");
            if(!correo)return;
            const bean:PasswordDTO = {email:correo,password:data.password}
            const response = await cambiarPassword(bean);
            if(response){
                console.log(response)
                //Mostramos mensaje de verificación
                toast.success(response.data);
                //Nos movemos a loggin
                navigate("/")
                
            }
        }catch(error){
            if(error instanceof AxiosError && error.response != null){
                toast.error(error.response.data.message);
            }else{
                toast.error("Error interno del servidor");
            }
        }
    })

    return(
        <>
            <div className={`${styles.card} ${step===2?styles.active:''}`}>
                <div className={styles.card__header}>
                    <div className={styles.card__nav}>
                        <div className={styles.card__nav__content}>
                            <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
                            <button className={styles.btn_back} onClick={()=>setStep(1)}>Verificar Codigo</button>
                        </div>
                    </div>
                    <div className={`${styles.card__img}`}>
                        <FontAwesomeIcon icon={faLock} color='#10B981' size={'5x'}></FontAwesomeIcon>
                    </div>
                </div>
                <div className={styles.card__body}>
                    <h2>Nueva Contraseña</h2>
                    <form className={styles.card__form} onSubmit={onSubmit}>
                        <div className={`${styles.form__group} ${styles.form__group__password} ${errors.password && "form__group__error"}`}>
                            <label className={styles.form__label} htmlFor="password">Contraseña</label>
                            <div className={styles.form__input}>
                                <input type={isVisible01 ? 'text' : 'password'} id="password" placeholder='Ingresar tu contraseña' {...register("password")}/>
                                <p className={styles.input__ico}>
                                    <FontAwesomeIcon icon={isVisible01 ? faEyeSlash : faEye} onClick={()=>setIsVisible01(!isVisible01)}></FontAwesomeIcon>
                                </p>
                            </div>
                            {errors.password && <span className="error__message">{errors.password.message}</span>}
                        </div>
                        <div className={`${styles.form__group} ${styles.form__group__password} ${errors.checkPassword && "form__group__error"}`}>
                            <label className={styles.form__label} htmlFor="confirmPass">Confirmar Contraseña</label>
                            <div className={styles.form__input}>
                                <input type={isVisible02 ? 'text' : 'password'} id="confirmPass" placeholder='Ingresar tu contraseña' {...register("checkPassword")}/>
                                <p className={styles.input__ico}>
                                    <FontAwesomeIcon icon={isVisible02 ? faEyeSlash : faEye} onClick={()=>setIsVisible02(!isVisible02)}></FontAwesomeIcon>
                                </p>
                            </div>
                            {errors.checkPassword && <span className="error__message">{errors.checkPassword.message}</span>}
                        </div>
                        <input type="submit" value="Cambiar Contraseña" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default CardReset03;