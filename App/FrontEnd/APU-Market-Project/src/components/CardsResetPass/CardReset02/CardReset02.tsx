import styles from '../CardReset.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import ResendCodeButton from '../../ResendCodeButton/ResendCodeButton'
import InputsCode from '../../InputsCode/InputsCode'
import { useCountDown } from '../../../hooks/useCountDown'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { validarCodigo } from '../../../services/emailService'
import { CodigoDTO } from '../../../models/CodigoDTO'
import { toast } from 'sonner'

type Props={
    step:number;
    setStep:(number:number)=>void;
    email:null|string;
}

const CardReset02 = ({step,setStep,email}:Props) =>{

    const {count,isCounting,start,reset} = useCountDown({duration:60});
    const [keyInputs,setKeyInputs] = useState<string[]>(['','','','',''])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        //Prevenir funciones default
        e.preventDefault();
        try{
            //Obtenemos el codigo
            const codigo:CodigoDTO = {codigo:keyInputs.join('')};
            //Validamos el codigo
            const response = await validarCodigo(codigo);
            if(response){
                //Mostramos el mensaje
                toast.success(response.data.message);
                //Formatear el formulario
                reset();
                //Pasar al siguiente paso
                setStep(2);
            }
        }catch(error){
            if(error instanceof AxiosError && error.response != null){
                toast.error(error.response.data.message)
            }else{
                toast.error('Error interno del servidor')
            }
        }
    }

    return(
        <div className={`${styles.card} ${step===1?styles.active:''}`}>
            <div className={styles.card__header}>
                <div className={`${styles.card__nav} ${isCounting ? styles.card__nav_disable:''}`}>
                    <div className={styles.card__nav__content}>
                        <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
                        <button className={`${styles.btn_back} ${isCounting ? styles.btn_back_disable:''}`} onClick={()=>setStep(0)} disabled={isCounting}>Recuperar Contraseña</button>
                    </div>
                </div>
                <div className={styles.card__img}>
                    <FontAwesomeIcon icon={faKey} color='#10B981' size='5x'></FontAwesomeIcon>
                </div>
            </div>
            <div className={styles.card__body}>
                <h2>Verificar Codigo</h2>
                <p>Ingresa el codigo de seguridad de 5 digitos que hemos enviado a <span className={styles.span__email}>{email && email}</span></p>
                
                <form className={styles.card__form} onSubmit={handleSubmit}>
                    <div className={styles.form__group__key}>
                        <InputsCode keyInputs={keyInputs} setKeyInputs={setKeyInputs}/>
                    </div>
                    <input type="submit" value="Confirmar Clave" />
                </form>
                <ResendCodeButton count={count} isCounting={isCounting} start={start}/>
            </div>
        </div>
    )
}

export default CardReset02