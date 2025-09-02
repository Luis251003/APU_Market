import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";

export const empleadoColumns: ColumnDef<Empleado>[] = [
    {
        accessorKey:"nombre",
        header:"Nombre",
    },{
        accessorKey:"apellido",
        header:"Apellido",
    },{
        accessorKey:"dni",
        header:"DNI",
    },{
        accessorKey:"telefono",
        header:"Telefono"
    },{
        id:"actions",
        header:"",
        cell:({row})=>{
            const empleado = row.original
            return(
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-10 w-14 p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log("Editar", empleado.id)} className="text-xl [&>svg]:size-5 px-4">
                            <Pencil className="mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Eliminar", empleado.id)} className="text-xl [&>svg]:size-5 px-4">
                            <Trash2 className="mr-2" /> Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]