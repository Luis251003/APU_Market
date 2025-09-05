import { PlusIcon } from 'lucide-react';
import { DataTable } from '@/components/DataTable/data-table';
import { empleadoColumns } from '@/columns/empleado-columns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { DeleteDialog } from '@/components/Empleado/delete-dialog';
import { EmployeeFormDialog } from '@/components/Empleado/employee-form-dialog';
import { useEmpleado } from '@/hooks/useEmpleado';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import empleadoSchema from '@/validations/empleadoSchema';
import z from 'zod';
import { handleApiError } from '@/utils/handleApiError';

type Inputs = z.infer<typeof empleadoSchema>

const MEmpleado = () => {

    const {addEmpleado, editEmpleado, deleteEmp, empleados} = useEmpleado();

    const [selectedEmployee,setSelectedEmployee] = useState<Empleado|null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const columns = empleadoColumns(onEdit,onViewDeleteModal);

    const form = useForm<Inputs>({
        resolver: zodResolver(empleadoSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            dni: "",
            telefono: ""
        }
    })

    const resetForm = () => form.reset({ nombre:"", apellido:"", dni:"", telefono:"" });

    function onAdd(){
        //Configuramos el empleado como null
        setSelectedEmployee(null)
        //Limpiamos el formulario
        resetForm();
    }

    async function onEdit(empleado:Empleado){
        //Abrimos el modal
        setOpenEditModal(true);
        //Actualizamos el formulario
        setSelectedEmployee(empleado);
        //Llenamos el formulario
        form.reset({
            nombre:empleado.nombre,
            apellido:empleado.apellido,
            dni:empleado.dni,
            telefono:empleado.telefono
        })
    }

    async function onDelete(){
        try{
            if(!selectedEmployee) return;
            const data = await deleteEmp(selectedEmployee);
            if(data){
                toast.success("El empleado ha sido eliminado")
            }
            setOpenDeleteModal(false);
        }catch(error){
            handleApiError(error);
        }
    }

    function onViewDeleteModal(bean:Empleado){
        //Abrimos el modal eliminar
        setOpenDeleteModal(true);
        //Actualizamos el empleado seleccionado
        setSelectedEmployee(bean);
    }

    return (
        <div className='py-8'>
            <header className='flex justify-between'>
                <h1>Empleados</h1>
                <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
                    <DialogTrigger asChild>
                        <Button type='button' onClick={()=>onAdd()} className='[&_svg]:size-6 bg-blue-500 hover:bg-blue-600 text-white py-6 px-6 rounded-md flex text-2xl'>
                            <PlusIcon size={18}/>
                            <span>Registrar</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-2xl'>{selectedEmployee ? "Actualizar":"Registrar"} Empleado</DialogTitle>
                        </DialogHeader>
                        <EmployeeFormDialog selectedEmployee={selectedEmployee} setOpenEditModal={setOpenEditModal} form={form} addEmpleado={addEmpleado} editEmpleado={editEmpleado}/>
                    </DialogContent>
                </Dialog>
                
            </header>
            <main>
                {empleados ? <DataTable data={empleados} columns={columns}></DataTable> : null}
            </main>
            <DeleteDialog onDelete={onDelete} description={`El empleado ${selectedEmployee?.nombre} será eliminado`} setOpen={setOpenDeleteModal} open={openDeleteModal}/>
        </div>
    );
}

export default MEmpleado;