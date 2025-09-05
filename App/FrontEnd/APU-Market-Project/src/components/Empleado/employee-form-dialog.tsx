import { UseFormReturn } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import empleadoSchema from "@/validations/empleadoSchema"
import z from "zod"
import { toast } from "sonner"
import { handleApiError } from "@/utils/handleApiError"

type Inputs = z.infer<typeof empleadoSchema>

interface Props{
    selectedEmployee:Empleado|null;
    form:UseFormReturn<{
        nombre: string;
        apellido: string;
        dni: string;
        telefono: string;
    }, any, {
        nombre: string;
        apellido: string;
        dni: string;
        telefono: string;
    }>;
    setOpenEditModal:React.Dispatch<React.SetStateAction<boolean>>;
    addEmpleado:(values: Empleado) => Promise<any>;
    editEmpleado:(id: number, bean: Empleado) => Promise<any>;
}

const fields = [
  { name: "nombre", label: "Nombre", placeholder: "Ingresa tu nombre" },
  { name: "apellido", label: "Apellido", placeholder: "Ingresa tu apellido" },
  { name: "dni", label: "DNI", placeholder: "Ingresa tu DNI" },
  { name: "telefono", label: "Teléfono", placeholder: "Ingresa tu teléfono" },
];

export const EmployeeFormDialog = ({selectedEmployee,form,setOpenEditModal,addEmpleado,editEmpleado}:Props)=>{

    async function onSubmit(values: Inputs){
        try{
            let data;
            if(selectedEmployee && selectedEmployee.id){
                data = await editEmpleado(selectedEmployee.id,values);
                //Imprimir mensaje de exito
                toast.success("Empleado actualizado")
            }else{
                data = await addEmpleado(values);
                //Imprimir mensaje de exito
                toast.success("Nuevo empleado registrado")
            }
            if(data){
                //Desvancer el modal
                setOpenEditModal(false);
                //Reiniciamos el formulario
                form.reset({
                    nombre:"",
                    apellido:"",
                    dni:"",
                    telefono:""
                });
            }
        }catch(error){
            handleApiError(error);
        }
    }  

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                
                {fields.map((f)=> (
                    <FormField key={f.name} control={form.control} name={f.name as keyof Inputs} render={({field}) => (
                        <FormItem>
                            <FormLabel className='text-xl font-semibold'>{f.label}</FormLabel>
                            <FormControl>
                                <Input {...field} className='md:text-xl py-6' placeholder={f.placeholder}></Input>
                            </FormControl>
                            <FormMessage className='text-lg'></FormMessage>
                        </FormItem>
                    )}/>
                ))}
                
                <div className='flex justify-end gap-2'>
                    <Button type='submit' className={`${selectedEmployee ? "bg-green-500 hover:bg-green-600":"bg-blue-500 hover:bg-blue-600"}  text-white p-6 text-xl`}>
                        {selectedEmployee ? "Actualizar":"Registrar"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}