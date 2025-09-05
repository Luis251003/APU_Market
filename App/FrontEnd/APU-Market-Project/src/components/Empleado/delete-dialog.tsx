import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "../ui/alert-dialog"

interface Props{
  description?:string;
  open:boolean;
  setOpen:(open:boolean)=>void;
  onDelete: ()=>void;
}

export const DeleteDialog = ({description, open, setOpen, onDelete }: Props) => {

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="gap-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            ¿Seguro que deseas eliminar?
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-xl">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xl">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-xl"
            onClick={onDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};