import styles from '../CardReset.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareEnvelope,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod'
import { enviarCodigo } from '../../../services/emailService';
import { EmailDTO } from '../../../models/EmailDTO';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

type Props={
    step:number;
    setStep:(number:number)=>void;
    setEmail:(email:string)=>void;
}

const emailSchema = z.object({
    email:z.email({message:"Debes ingresar un correo valido"})
})

type Inputs=z.infer<typeof emailSchema>;


const CardReset01 = ({step,setStep,setEmail}:Props)=>{

    const [isDisable,setIsDisable] = useState(false);

    const{register,handleSubmit,formState:{errors}}=useForm<Inputs>({
        resolver:zodResolver(emailSchema)
    });
    
    const onSubmit = handleSubmit(async(data) =>{
        try{
            setIsDisable(true);
            const emailData:EmailDTO = {destinatario:data.email};
            const response = await enviarCodigo(emailData);
            if(response != null){
                //Enviar mensaje de exito
                toast.success("Correo enviado exitosamente");
                //Definir email para el diseño Card02
                setEmail(data.email);
                //Guardamos en el localstorage
                localStorage.setItem("email",data.email);
                //Activar el boton de envio
                setIsDisable(false);
                //Pasar al siguiente paso
                setStep(1);
            }
        }catch(error){
            if(error instanceof AxiosError && error.response){
                toast.error(error.response.data.message)
            }else{
                toast.error("Error interno del servidor")
            }
            setIsDisable(false);
        }
    });
    
    return(
        <>
            <div className={`${styles.card} ${step===0?styles.active:''}`}>
                <div className={styles.card__header}>
                    <div className={styles.card__nav}>
                        <div className={styles.card__nav__content}>
                            <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
                            <Link className={styles.btn_back} to='/'>Iniciar Sesión</Link>
                        </div>
                    </div>
                    <div className={styles.card__img}>
                        <FontAwesomeIcon icon={faSquareEnvelope} color='#10B981' size='5x'></FontAwesomeIcon>
                    </div>
                </div>
                <div className={styles.card__body}>
                    <h2>Recuperar Contraseña</h2>
                    <p>Ingresa el correo asociado con tu cuenta, y te enviaremos un correo con instrucciones para recuperar tu contraseña</p>
                    
                    <form className={`${styles.card__form}`} onSubmit={onSubmit}>
                        <div className={`${styles.form__group} ${errors.email && "form__group__error"}`}>
                            <label htmlFor="email">E-mail</label>
                            <input id='email' type="email" placeholder='Ingresa tu correo' autoComplete='email' {...register("email")}/>
                            {errors.email && <span className="error__message">{errors.email.message}</span>}
                        </div>
                        <input disabled={isDisable} type="submit" value="Enviar Correo" />
                    </form>
                </div>
            </div>
        </>
        
    )
}

export default CardReset01