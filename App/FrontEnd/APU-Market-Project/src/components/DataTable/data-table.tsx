import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"

interface DataTableProps<TData,TValue>{
    columns:ColumnDef<TData,TValue>[]
    data:TData[]
}

export function DataTable<TData,TValue>({columns,data}:DataTableProps<TData,TValue>){

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return(
        <div className="mt-10">
            <Table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <TableHeader className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup)=>(
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header)=>{
                                return (
                                    <TableHead key={header.id} className="px-4 py-2 text-left text-xl font-medium text-gray-600">
                                        {header.isPlaceholder ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>   
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="border-t hover:bg-gray-50 transition-colors"
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="px-4 py-2 text-xl text-gray-800">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
            {/* Controles de paginación */}
            <div className="flex items-center justify-center mt-10 gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="text-xl"
                >
                    Anterior
                </Button>

                <span className="text-muted-foreground text-xl">
                    Página{" "}
                    <strong >
                    {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </strong>
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="text-xl"
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}