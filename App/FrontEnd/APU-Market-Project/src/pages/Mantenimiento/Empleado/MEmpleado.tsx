import { PlusIcon } from 'lucide-react';
import { useEmpleado } from '@/hooks/useEmpleado';
import { DataTable } from '@/components/DataTable/data-table';
import { empleadoColumns } from '@/columns/empleado-columns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import empleadoSchema from '@/validations/empleadoSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {z} from "zod";
import { Input } from '@/components/ui/input';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

type Inputs = z.infer<typeof empleadoSchema>

const MEmpleado = () => {

    const{addEmpleado,empleados} = useEmpleado();
    const [open, setOpen] = useState(false);

    const form = useForm<Inputs>({
        resolver: zodResolver(empleadoSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            dni: "",
            telefono: ""
        }
    })

    async function onSubmit(values: Inputs){
        try{
            const data = await addEmpleado(values);
            if(data){
                //Imprimir mensaje de exito
                toast.success("Nuevo empleado registrado")
                //Desvancer el modal
                setOpen(!open);
                //Reiniciamos el formulario
                form.reset();
            }
        }catch(error){
            if(error instanceof AxiosError && error.response!=null){
                toast.error(error.response.data.message)
            }else{
                toast.error("Error de servidor")
            }
        }
    }  

    return (
        <div className='py-8'>
            <header className='flex justify-between'>
                <h1>Empleados</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button type='button' className='[&_svg]:size-6 bg-blue-500 hover:bg-blue-600 text-white py-6 px-6 rounded-md flex text-2xl'>
                            <PlusIcon size={18}/>
                            <span>Registrar</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-2xl'>Registrar Empleado</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>

                                <FormField control={form.control} name='nombre' render={({field}) => (
                                    <FormItem>
                                        <FormLabel className='text-xl font-semibold'>Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='md:text-xl py-6' placeholder="Ingresa tu nombre"></Input>
                                        </FormControl>
                                        <FormMessage className='text-lg'></FormMessage>
                                    </FormItem>
                                )}/>

                                <FormField control={form.control} name='apellido' render={({field}) => (
                                    <FormItem>
                                        <FormLabel className='text-xl font-semibold'>Apellido</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='md:text-xl py-6' placeholder='Ingresar tu apellido'></Input>
                                        </FormControl>
                                        <FormMessage className='text-lg'></FormMessage>
                                    </FormItem>
                                )}/>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name='dni' render={({field}) => (
                                        <FormItem>
                                            <FormLabel className='text-xl font-semibold'>DNI</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='md:text-xl py-6' placeholder='Ingresar tu DNI'></Input>
                                            </FormControl>
                                            <FormMessage className='text-lg'></FormMessage>
                                        </FormItem>
                                    )}/>

                                    <FormField control={form.control} name='telefono' render={({field}) => (
                                        <FormItem>
                                            <FormLabel className='text-xl font-semibold'>Teléfono</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='md:text-xl py-6' placeholder='Ingresar tu teléfono'></Input>
                                            </FormControl>
                                            <FormMessage className='text-lg'></FormMessage>
                                        </FormItem>
                                    )}/>
                                </div>
                                
                                <div className='flex justify-end gap-2'>
                                    <Button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white p-6 text-xl">
                                        Registrar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                
            </header>
            <main>
                {empleados ? <DataTable data={empleados} columns={empleadoColumns}></DataTable> : null}
            </main>
        </div>
    );
}

export default MEmpleado;