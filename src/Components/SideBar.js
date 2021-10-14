import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import NavbarThemeToggle from './NavbarThemeToggle'
import OutsideClickHandler from 'react-outside-click-handler'

const links = {
    'admin': [
        { id: 'home', title: 'Inicio', icon: 'home', type: 'link', path: '/' },
        { id: 'pedidos', title: 'Ver pedidos', icon: 'pageview', type: 'link', path: '/pedidos' },
        { id: 'pedidosCerrados', title: 'Pedidos cerrados', icon: 'do_disturb', type: 'link', path: '/pedidos-cerrados' },
        { id: 'crearUsuario', title: 'Crear usuario', icon: 'person_add', type: 'link', path: '/crear-usuario' },
        { id: 'editarEquipo', title: 'Editar equipo', icon: 'groups', type: 'link', path: '/editar-equipo' },
        { id: 'editarDescargas', title: 'Editar Descargables', icon: 'file_upload', type: 'link', path: '/editar-descargables' },
        { id: 'cuenta', title: 'Cuenta', icon: 'account_circle', type: 'link', path: '/cuenta' },
    ],
    'user': [
        { id: 'home', title: 'Inicio', icon: 'home', type: 'link', path: '/' },
        { id: 'pedidos', title: 'Ver pedidos', icon: 'pageview', type: 'link', path: '/pedidos' },
        { id: 'pedidosCerrados', title: 'Pedidos cerrados', icon: 'do_disturb', type: 'link', path: '/pedidos-cerrados' },
        { id: 'crearPedidos', title: 'Crear Pedidos', icon: 'note_add', type: 'link', path: '/crear-pedidos' },
        { id: 'equipo', title: 'Equipo', icon: 'groups', type: 'link', path: '/equipo' },
        { id: 'descargas', title: 'Descargables', icon: 'file_download', type: 'link', path: '/descargables' },
        { id: 'cuenta', title: 'Cuenta', icon: 'account_circle', type: 'link', path: '/cuenta' },
    ],
}

const SideBar = () => {
    const { userType, logout } = useAuth()

    const [options, setOptions] = useState(null)
    const [collapsed, setCollapsed] = useState(true)

    useEffect(() => {
        if (userType === 'admin') {
            return setOptions(links.admin)
        }
        if (userType === 'reparticion') {
            return setOptions(links.user)
        }
    }, [userType])

    const handleToggleCollapse = () => {
        setCollapsed(collapsed => !collapsed)
    }

    const clickOutside = () => {
        setCollapsed(true)
    }

    return options ? (
        <OutsideClickHandler
            onOutsideClick={() => {
                clickOutside()
            }}
        >
            <div className={`sideBar ${collapsed ? 'collapsed' : ''}`}>
                <div className='sideBarTop'>
                    <button onClick={handleToggleCollapse} className='nav__toggle'>
                        <span className='hamburger'></span>
                    </button>
                    {options.map(option => {
                        return (
                            <Link key={option.id} to={option.path}>
                                <span className='material-icons'>{option.icon}</span>
                                {option.title}
                            </Link>
                        )
                    })}
                </div>
                <div className='sideBarBottom'>
                    <NavbarThemeToggle />
                    <button onClick={logout}>
                        <span className='material-icons'>logout</span>Cerrar sesión
                    </button>
                </div>
            </div>
        </OutsideClickHandler>
    ) : (
        'loading'
    )
}

export default SideBar
