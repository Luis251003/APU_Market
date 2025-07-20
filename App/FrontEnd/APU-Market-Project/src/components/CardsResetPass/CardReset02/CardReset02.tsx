import styles from '../CardReset.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

type Props={
    activo:number;
    setActivo:(number:number)=>void;
}

const CardReset02 = ({activo,setActivo}:Props) =>{

    const [keyInputs,setKeyInputs] = useState<string[]>(['','','','',''])
    const inputsRef = useRef<Array<HTMLInputElement>>([]);

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>,index:number)=>{
        const value = e.target.value
        const regex = /^[\d]$/
        const id = index;
        //Validamos que sea un digito
        if(!regex.test(value)){
            return;
        }
        //Registramos el digito
        setKeyInputs(prev =>
            prev.map((val,i)=> i === id ? value:val)
        )
        //Validamos que el indice sea menor a 4
        if(index<4){
            //Enfocamos el siguiente input
            const inputAfter = inputsRef.current[index+1];
            inputAfter.focus();
        }
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>,index:number)=>{
        
        //Validamos que sea backspace
        if(e.key!=='Backspace')return;

        //Eliminamos el valor
        setKeyInputs(prev=>
            prev.map((val,i)=> i===index ? '':val)
        )
        
        //Validamos que el indice sea mayor a 0
        if(index>0){
            const inputBefore = inputsRef.current[index-1];
            inputBefore.focus();
        }
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setActivo(2);
    }

    return(
        <div className={`${styles.card} ${activo===1?styles.active:''}`}>
            <div className={styles.card__header}>
                <div className={styles.card__nav}>
                    <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
                    <a href="#" onClick={()=>setActivo(0)}>Recuperar Contraseña</a>
                </div>
                <div className={styles.card__img}>
                    <FontAwesomeIcon icon={faKey} color='#10B981' size='5x'></FontAwesomeIcon>
                </div>
            </div>
            <div className={styles.card__body}>
                <h2>Verificar Codigo</h2>
                <p>Ingresa el codigo de seguridad de 5 digitos que hemos enviado a <span>xxxx@gmail.com</span></p>
                
                <form className={styles.card__form} onSubmit={handleSubmit}>
                    <div className={styles.form__group__key}>
                        {keyInputs.map((val='',index)=>(
                            <input 
                            type='text' 
                            id={`key-${index}`} 
                            key={index} 
                            onChange={(e)=>handleInput(e,index)} 
                            value={val} 
                            onKeyDown={(e)=>handleKeyDown(e,index)}
                            ref={(el)=>{if(el)inputsRef.current[index]=el}}
                            inputMode='numeric'
                            maxLength={1}></input>
                        ))}
                    </div>
                    <input type="submit" value="Confirmar Clave" />
                </form>
                <p className={styles.keyDeadline}><span>05:00</span><a href="#">Reenviar Código de Seguridad</a></p>
                
            </div>
        </div>
    )
}

export default CardReset02