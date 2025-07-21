import styles from '../CardReset.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareEnvelope,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

type Props={
    activo:number;
    setActivo:(number:number)=>void;
}

const CardReset01 = ({activo,setActivo}:Props)=>{

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setActivo(1);
    }

    return(
        <div className={`${styles.card} ${activo===0?styles.active:''}`}>
            <div className={styles.card__header}>
                <div className={styles.card__nav}>
                    <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
                    <Link to='/'>Iniciar Sesión</Link>
                </div>
                <div className={styles.card__img}>
                    <FontAwesomeIcon icon={faSquareEnvelope} color='#10B981' size='5x'></FontAwesomeIcon>
                </div>
            </div>
            <div className={styles.card__body}>
                <h2>Recuperar Contraseña</h2>
                <p>Ingresa el correo asociado con tu cuenta, y te enviaremos un correo con instrucciones para recuperar tu contraseña</p>
                
                <form className={styles.card__form} onSubmit={handleSubmit}>
                    <div className={styles.form__group}>
                        <label htmlFor="email">E-mail</label>
                        <input id='email' type="email" placeholder='Ingresa tu correo' required autoComplete='email'/>
                    </div>
                    <input type="submit" value="Enviar Correo" />
                </form>
            </div>
        </div>
    )
}

export default CardReset01