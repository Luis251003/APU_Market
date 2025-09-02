import { useEffect, useRef, useState } from 'react';
import CardReset01 from '../../components/CardsResetPass/CardReset01/CardReset01';
import CardReset02 from '../../components/CardsResetPass/CardReset02/CardReset02';
import CardReset03 from '../../components/CardsResetPass/CardReset03/CardReset03';
import styles from './ResetPass.module.css'

const ResetPass = ()=>{
    const [step,setStep] = useState<number>(0);
    const carruselRef = useRef<HTMLDivElement>(null);
    const [email,setEmail] = useState<string|null>(null);

    useEffect(()=>{
        const width = (1 - step) * 33.3;
        if(carruselRef.current){
            carruselRef.current.style.transform= `translateX(${width}%)`;
        }
    },[step])

    return(
        <div className={`${styles.cards__container}`}>
            <div className={styles.carrusel} ref={carruselRef}>
                <div className={styles.card__container}>
                    <CardReset01 step={step} setStep={setStep} setEmail={setEmail}></CardReset01>
                </div>
                <div className={styles.card__container}>
                    <CardReset02 step={step} setStep={setStep} email={email}></CardReset02>
                </div>
                <div className={styles.card__container}>
                    <CardReset03 step={step} setStep={setStep}></CardReset03>
                </div>
            </div>
        </div>
    );
}

export default ResetPass;