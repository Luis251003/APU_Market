import { useEffect, useRef, useState } from "react";

type CountDownOptions ={
    duration:number;
    onEnd?:()=>void;
}

export function useCountDown({duration,onEnd}:CountDownOptions){
    const [count,setCount] = useState(0);
    const [isCounting,setIsCounting] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const start = ()=>{
        setCount(duration);
        setIsCounting(true);
    }

    const reset = ()=>{
        setCount(0);
        setIsCounting(false);
    }

    useEffect(()=>{
        if(!isCounting) return;
        timerRef.current = setTimeout(()=>{
            setCount((prev)=>{
                if(prev<=1){
                    setIsCounting(false);
                    onEnd?.();
                    return 0;
                }
                return prev - 1;
            })
            return ()=>{
                if(timerRef.current) clearTimeout(timerRef.current);
            }
        },1000)
    },[count,isCounting])

    return {count,isCounting,start,reset}
}