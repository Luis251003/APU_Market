import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "../ui/sidebar";
import logo from '@/assets/logos/logo_apu_market_black.png'
import styles from './SidebarLayout.module.css'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { BellIcon, ChevronsUpDownIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import AppSidebar from "../AppSidebar/AppSidebar";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { logout } from "@/services/usuarioService";
import { useNavigate } from "react-router-dom";

const SidebarLayout = () =>{
    const {state} = useSidebar()
    const navigate = useNavigate();

    const handleLogOut = async ()=>{
        try{
            const response = await logout();
            console.log(response)
            if(response && response.data !== null){
                toast.info(response.data.title)
                navigate("/")
            }
        }catch(error){
            if(error instanceof AxiosError && error !== null){
                toast.error(error.message);
            }
        }
    }
    return(
        <Sidebar collapsible="icon" side="left" variant="sidebar">
            <SidebarHeader className={`${styles.sidebar__header}`}>
                <div className={`${styles.sidebar__header__content} ${state !== "collapsed" ? '':styles.hidden}`}>
                    <div className={`${styles.sidebar__logo__container} ${state !== "collapsed" ? '':styles.hidden}`}>
                        <div className={styles.header__logo}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={styles.header__info}>
                            <h2>APU Market</h2>
                        </div>
                    </div>
                    <SidebarTrigger className={styles.header__button}/>
                </div>
            </SidebarHeader>
            <AppSidebar/>
            <SidebarFooter className="p-2 border-t flex items-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuContent side="right" align="end">
                                {/* Perfil */}
                                <DropdownMenuLabel>
                                    <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                        <AvatarFallback>LC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-xl font-medium">Luis Cabrera</p>
                                        <p className="text-base text-gray-500 truncate">
                                        luis.cabrera@email.com
                                        </p>
                                    </div>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                {/* Notificaciones */}
                                <DropdownMenuItem className="[&>svg]:size-6">
                                    <BellIcon className="mr-2 h-6 w-6" />
                                    <span className="text-lg">Notificaciones</span>
                                </DropdownMenuItem>

                                {/* Configuración */}
                                <DropdownMenuItem className="[&>svg]:size-6">
                                    <SettingsIcon className="mr-2 h-6 w-6" />
                                    <span className="text-lg">Configuración</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                {/* Cerrar sesión */}
                                <DropdownMenuItem className="text-red-600 [&>svg]:size-6" onClick={handleLogOut}>
                                    <LogOutIcon className="mr-2 h-6 w-6" />
                                    <span className="text-lg">Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            <DropdownMenuTrigger asChild>

                                <SidebarMenuButton className={`h-auto [&>svg]:size-6 max-h-16`}>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                        <AvatarFallback>LC</AvatarFallback>
                                    </Avatar>

                                    {/* Datos usuario */}
                                    <div
                                    className={`ml-2 overflow-hidden transition-all duration-300 ${
                                        state !== "collapsed" ? "opacity-100 w-[140px]" : "opacity-0 w-0"
                                    }`}
                                    >
                                    <p className="text-xl font-medium">Luis Cabrera</p>
                                    <p className="text-lg text-gray-500 truncate">
                                        luis.cabrera@email.com
                                    </p>
                                    </div>

                                    {/* Icono al final */}
                                    <ChevronsUpDownIcon className={`ml-auto overflow-hidden transition-all duration-300 ${
                                        state !== "collapsed" ? "opacity-100 w-[140px]" : "opacity-0 w-0"
                                    }`}/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
export default SidebarLayout;