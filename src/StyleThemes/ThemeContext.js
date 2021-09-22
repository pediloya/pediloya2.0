import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

const { Provider } = ThemeContext

export const useTheme = () => {
    return useContext(ThemeContext)
}
const lightTheme = {
    '--black': 'hsl(0, 0%, 20%)',
    '--white': 'hsl(0, 0%, 100%)',
    '--grey': 'hsl(0, 0%, 85%)',
    '--primary-clr': 'hsl(47, 96%, 67%)',
    '--primary-clr-darken': 'hsl(47, 96%, 52%)',
    '--secondary-clr': 'hsl(190, 80%, 49%)',
    '--secondary-clr-darken': 'hsl(190, 80%, 39%)',
}

const darkTheme = {
    '--black': 'hsl(0, 0%, 85%)',
    '--white': 'hsl(0, 0%, 25%)',
    '--grey': 'hsl(0, 0%, 15%)',
    '--primary-clr': 'hsl(47, 96%, 67%)',
    '--primary-clr-darken': 'hsl(47, 96%, 52%)',
    '--secondary-clr': 'hsl(190, 80%, 49%)',
    '--secondary-clr-darken': 'hsl(190, 80%, 39%)',
}

export const ThemeProvider = ({ children }) => {
    const [currentMode, setCurrentMode] = useState('light')
    const [toggle, setToggle] = useState(true)

    const handleThemeToggle = () => {
        const newMode = currentMode === 'light' ? 'dark' : 'light'
        setToggle(toggle => !toggle)
        setCurrentMode(newMode)
        localStorage.setItem('mode', newMode)
    }

    useEffect(() => {
        if (localStorage.getItem('mode') === 'dark') {
            setCurrentMode('dark')
            setToggle(false)
        }
    }, [])

    useEffect(() => {
        const theme = currentMode === 'light' ? lightTheme : darkTheme
        Object.keys(theme).forEach(key => {
            const value = theme[key]
            document.documentElement.style.setProperty(key, value)
        })
    }, [currentMode])

    const value = { currentMode, toggle, handleThemeToggle }

    return <Provider value={value}>{children}</Provider>
}
