import usePermisos from "@/hooks/usePermisos"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, useSidebar } from "../ui/sidebar"
import MENU_BASE from "@/constants/MenuData";
import { MenuDTO } from "@/models/MenuDTO";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronRightIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AppSidebar = ()=>{

    const{permisos}=usePermisos();
    const{state}=useSidebar();

    const tienePermiso = (menu?: MenuDTO | null) => {
        if(!menu) return false;
        if(!menu.permiso) return true;
        return permisos.includes(menu.permiso);
    };

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className="text-lg">Menú</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>  
                        {MENU_BASE.filter(tienePermiso).map(item => {
                            if(!item.children){
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton asChild className="[&>svg]:size-6">
                                                        <Link
                                                            to={item.path!}
                                                            className="flex items-center 
                                                                group-data-[state=expanded]:gap-2
                                                                group-data-[state=expanded]:justify-start
                                                                group-data-[state=collapsed]:justify-center
                                                                w-full"
                                                        >
                                                            <item.icon className="transition-all group-data-[state=expanded]:mr-2 group-data-[state=collapsed]:mr-0" />
                                                            <span className="text-xl hidden group-data-[state=expanded]:inline">
                                                                {item.label}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                {state === "collapsed" && (
                                                    <TooltipContent side="right">
                                                        <span className="text-xl">{item.label}</span>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </SidebarMenuItem>
                                )
                                
                            }else{
                                return (
                                    <Collapsible defaultOpen className="group/collapsible" key={item.id}>
                                        <SidebarMenuItem key={item.id}>
                                        {state === "collapsed" ? (
                                            // Si está colapsado → usar Popover
                                            <Popover>
                                            <PopoverTrigger asChild>
                                                <SidebarMenuButton asChild className="[&>svg]:size-6">
                                                <div className="flex items-center justify-center w-full">
                                                    <item.icon className="transition-all" />
                                                </div>
                                                </SidebarMenuButton>
                                            </PopoverTrigger>
                                            <PopoverContent side="right" className="p-2 w-auto">
                                                <div className="flex flex-col gap-1">
                                                <div className="font-semibold mb-1">{item.label}</div>
                                                {item.children.filter(tienePermiso).map(children => (
                                                    <Link
                                                    key={children.id}
                                                    to={children.path!}
                                                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-accent text-sm"
                                                    >
                                                    <span className="text-xl">{children.label}</span>
                                                    </Link>
                                                ))}
                                                </div>
                                            </PopoverContent>
                                            </Popover>
                                        ) : (
                                            // Si está expandido → Collapsible normal
                                            <>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton asChild className="[&>svg]:size-6">
                                                <div className="flex items-center group-data-[state=expanded]:gap-2 group-data-[state=expanded]:justify-start w-full">
                                                    <item.icon className="transition-all group-data-[state=expanded]:mr-2" />
                                                    <span className="text-xl">{item.label}</span>
                                                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </div>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {item.children.filter(tienePermiso).map(children => (
                                                <SidebarMenuSub key={children.id}>
                                                    <SidebarMenuSubItem className="[&>svg]:size-6">
                                                    <Link to={children.path!} className="flex items-center gap-2">
                                                        <span className="text-xl">{children.label}</span>
                                                    </Link>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                                ))}
                                            </CollapsibleContent>
                                            </>
                                        )}
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            }
                            
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}
export default AppSidebar