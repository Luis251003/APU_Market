import { useEffect, useRef, useState } from 'react';
import CardReset01 from '../../components/CardsResetPass/CardReset01/CardReset01';
import CardReset02 from '../../components/CardsResetPass/CardReset02/CardReset02';
import CardReset03 from '../../components/CardsResetPass/CardReset03/CardReset03';
import styles from './ResetPass.module.css'

const ResetPass = ()=>{
    const [activo,setActivo] = useState<number>(0);
    const carruselRef = useRef<HTMLDivElement | null>();

    useEffect(()=>{
        const width = (1 - activo) * 33.3;
        if(carruselRef.current){
            carruselRef.current.style.transform= `translateX(${width}%)`;
        }
        
    },[activo])

    return(
        <div className={`${styles.cards__container}`}>
            <div className={styles.carrusel} ref={(el)=>carruselRef.current=el}>
                <div className={styles.card__container}>
                    <CardReset01 activo={activo} setActivo={setActivo}></CardReset01>
                </div>
                <div className={styles.card__container}>
                    <CardReset02 activo={activo} setActivo={setActivo}></CardReset02>
                </div>
                <div className={styles.card__container}>
                    <CardReset03 activo={activo} setActivo={setActivo}></CardReset03>
                </div>
            </div>
        </div>
    );
}

export default ResetPass;