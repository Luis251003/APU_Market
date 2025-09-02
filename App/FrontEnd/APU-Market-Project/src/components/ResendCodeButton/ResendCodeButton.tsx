import styles from './ResendCodeButton.module.css'

type Props={
    count:number
    isCounting:boolean;
    start:()=>void;
}

const ResendCodeButton = ({count,isCounting,start}:Props)=>{

    return(
        <div className={styles.container}>
            <button className={`${styles.btnResendCode} ${isCounting ? styles.btnResendCode_disable:''}`} disabled={isCounting} onClick={start}>
                {!isCounting ? 'Reenviar código' : `Reenviar código en ${count}s`}
            </button>
        </div>
    )
}
export default ResendCodeButton