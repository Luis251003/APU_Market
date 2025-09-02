import { useSidebar } from '../ui/sidebar'
import styles from './NavLayout.module.css'
import { BellIcon,SearchIcon,SettingsIcon } from "lucide-react"


const NavLayout = ()=>{
    const{state} = useSidebar();
    return(
        <div className={styles.nav} style={state === "expanded" ? {paddingLeft:"25rem"} : {paddingLeft:"5rem"}}>
            <div className={`${styles.nav__content} container`}>
                <div className={styles.nav__ruta__container}>
                    <span>Mantenimiento / Empleado</span>
                </div>
                <div className={styles.nav__input__container}>
                    <div className={styles.nav__input__content}>
                        <SearchIcon className={styles.icon__search}/>
                        <input type="text" placeholder='Buscar' id='search' name='search'/>
                    </div>
                </div>
                <div className={styles.nav__buttons__container}>
                    <button type='button'>
                        <BellIcon className={styles.icon__button}/>
                    </button>
                    <button type='button'>
                        <SettingsIcon className={styles.icon__button}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default NavLayout;