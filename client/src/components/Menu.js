import React from 'react'
import { Menubar } from 'primereact/menubar';
const Menu = () => {

    const items = [
        {
            label: 'Sistema de gestion de horarios',
        },     
        {
            label: 'Clientes',
            icon: 'pi pi-user'
        },
        {
            label: 'Libros',
            icon: 'pi pi-book'
        },
        {
            label: 'Ordenes',
            icon: 'pi pi-bookmark-fill'
        },           
    ];
    const start = <img alt="logo" src="https://comunicacioninstitucional.uabc.mx/sites/default/files/inline-images/escudo-actualizado-2022.png" height="40" className="mr-2"></img>;     
  return (
    <>
        <Menubar model={items} start={start}/>                              
    </>
  )
}

export default Menu