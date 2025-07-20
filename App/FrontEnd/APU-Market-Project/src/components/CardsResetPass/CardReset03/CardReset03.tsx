import styles from '../CardReset.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash,faLock,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

type props={
    activo:number;
    setActivo:(number:number)=>void;
}


const CardReset03 = ({activo,setActivo}:props) =>{

    const[isVisible01,setIsVisible01] = useState(false);
    const[isVisible02,setIsVisible02] = useState(false);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }

    return(
        <>
            <div className={`${styles.card} ${activo===2?styles.active:''}`}>
                <div className={styles.card__header}>
                    <div className={styles.card__nav}>
                        <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
                        <a href="#" onClick={()=>setActivo(1)}>Verificar Codigo</a>
                    </div>
                    <div className={styles.card__img}>
                        <FontAwesomeIcon icon={faLock} color='#10B981' size={'5x'}></FontAwesomeIcon>
                    </div>
                </div>
                <div className={styles.card__body}>
                    <h2>Nueva Contraseña</h2>
                    
                    <form className={styles.card__form} onSubmit={(e)=>handleSubmit(e)}>
                        <div className={`${styles.form__group} ${styles.form__group__password}`}>
                            <label className={styles.form__label} htmlFor="password">Contraseña</label>
                            <div className={styles.form__input}>
                                <input type={isVisible01 ? 'text' : 'password'} name="password" id="password" placeholder='Ingresar tu contraseña'/>
                                <p className={styles.input__ico}>
                                    <FontAwesomeIcon icon={isVisible01 ? faEyeSlash : faEye} onClick={()=>setIsVisible01(!isVisible01)}></FontAwesomeIcon>
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.form__group} ${styles.form__group__password}`}>
                            <label className={styles.form__label} htmlFor="confirmPass">Confirmar Contraseña</label>
                            <div className={styles.form__input}>
                                <input type={isVisible02 ? 'text' : 'password'} name="confirmPass" id="confirmPass" placeholder='Ingresar tu contraseña'/>
                                <p className={styles.input__ico}>
                                    <FontAwesomeIcon icon={isVisible02 ? faEyeSlash : faEye} onClick={()=>setIsVisible02(!isVisible02)}></FontAwesomeIcon>
                                </p>
                            </div>
                        </div>
                        <input type="submit" value="Cambiar Contraseña" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default CardReset03;