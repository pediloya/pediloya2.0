import React from 'react'

import { useTheme } from '../StyleThemes/ThemeContext'

const NavbarThemeToggle = () => {
    const { toggle, handleThemeToggle } = useTheme()

    return (
        <button title={toggle ? 'Modo oscuro' : 'Modo claro'} onClick={() => handleThemeToggle()} className='toggleTheme'>
            <span className='material-icons'>{toggle ? 'dark_mode' : 'light_mode'}</span>

            <span>{toggle ? 'Modo oscuro' : 'Modo claro'}</span>
        </button>
    )
}

export default NavbarThemeToggle
