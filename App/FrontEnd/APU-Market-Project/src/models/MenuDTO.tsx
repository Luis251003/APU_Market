import { LucideIcon } from "lucide-react";

export interface MenuDTO{
    id:string,
    label:string,
    icon:LucideIcon,
    path?:string,
    permiso?:string|null,
    children?:MenuDTO[]
}