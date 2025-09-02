import { useRef} from "react";

type Props={
    keyInputs:string[],
    setKeyInputs:React.Dispatch<React.SetStateAction<string[]>>
}

const InputsCode = ({keyInputs,setKeyInputs}:Props)=>{

    const inputsRef = useRef<Array<HTMLInputElement>>([]);

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>,index:number)=>{
        const value = e.target.value.replace(/\D/g,'').slice(0,1)
        if(!value)return;

        //Registramos el digito
        setKeyInputs(prev =>
            prev.map((val,i)=> i === index ? value:val)
        )
        //Validamos que el indice sea menor a 4
        if(index<4){
            //Enfocamos el siguiente input
            inputsRef.current[index+1].focus();
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
            inputsRef.current[index-1].focus();
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
        const updated = [...keyInputs];

        for (let i = 0; i < pasted.length; i++) {
            updated[i] = pasted[i];
            const input = inputsRef.current[i];
            if (input) input.value = pasted[i];
        }

        setKeyInputs(updated);

        // Enfoca el siguiente input vacío
        const nextIndex = pasted.length < 5 ? pasted.length : 4;
        inputsRef.current[nextIndex]?.focus();
    };

    return(
        <>
            {keyInputs.map((val='',index)=>(
                <input 
                type='text' 
                id={`key-${index}`} 
                key={index} 
                onChange={(e)=>handleInput(e,index)} 
                value={val} 
                onPaste={(e)=>handlePaste(e)}
                onKeyDown={(e)=>handleKeyDown(e,index)}
                ref={(el)=>{if(el)inputsRef.current[index]=el}}
                inputMode='numeric'
                maxLength={1}></input>
            ))}
        </>
    )
}
export default InputsCode;