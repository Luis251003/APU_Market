import { MenuDTO } from "@/models/MenuDTO";
import { LayoutDashboardIcon, SquarePenIcon,User2Icon } from "lucide-react";

const MENU_BASE: MenuDTO[] = [
    {
        id:"dashboard",
        label:"Dashboard",
        icon:LayoutDashboardIcon,
        path:"/dashboard",
        permiso:"VIEW_DASHBOARD"
    },{
        id: "mantenimiento",
        label: "Mantenimiento",
        icon: SquarePenIcon,
        permiso: null,
        children: [
        {
            id: "manage_empleado",
            label: "Empleado",
            path: "/mantenimiento/empleado",
            permiso: "MANAGE_EMPLOYEES",
            icon: User2Icon
        }
        ],
    }
]

export default MENU_BASE