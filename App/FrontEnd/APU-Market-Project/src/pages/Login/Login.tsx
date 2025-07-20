import styles from './Login.module.css'
import logo from '../../assets/logos/logo_apu_market.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Login = ()=>{

    const[isVisible,setIsVisible] = useState(false);

    return(
        <>
            <div className="container">
                <div className={`${styles.login__container}`}>
                    <div className={`${styles.login__content}`}>
                        <div className={styles.login__header}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={styles.login__body}>
                            <form className={styles.form}>
                                <div className={styles.form__group}>
                                    <label className={styles.form__label} htmlFor="email">E-mail</label>
                                    <input type="email" name="email" id="email" placeholder='Ingresar tu correo'/>
                                </div>
                                <div className={styles.form__group}>
                                    <label className={styles.form__label} htmlFor="password">Contraseña</label>
                                    <div className={styles.form__input}>
                                        <input type={isVisible ? 'text' : 'password'} name="password" id="password" placeholder='Ingresar tu contraseña'/>
                                        <p className={styles.input__ico}>
                                            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} onClick={()=>setIsVisible(!isVisible)}></FontAwesomeIcon>
                                        </p>
                                    </div>
                                </div>
                                <input type="submit" value="Iniciar Sesión" />
                                <div className={styles.form__footer}>
                                    <div className={styles.form__checkbox}>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember">Recordar Cuenta</label>
                                    </div>
                                    <a href="#">¿Olvidaste tu cuenta?</a>
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