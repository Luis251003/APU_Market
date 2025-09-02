import { Outlet } from "react-router-dom"
import NavLayout from "../NavLayout/NavLayout"
import { SidebarProvider} from "../ui/sidebar"
import styles from './MainLayout.module.css'
import SidebarLayout from "../SidebarLayout/SidebarLayout"

const MainLayout = ()=>{

    return(
        <SidebarProvider defaultOpen={true} id="sidebar">
            <SidebarLayout/>
            <main className={styles.main}>
                <NavLayout/>
                <div className={`container`}>
                    <Outlet/>
                </div>
            </main>
        </SidebarProvider>
    )
}
export default MainLayout