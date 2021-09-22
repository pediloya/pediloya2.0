import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { ThemeProvider } from './StyleThemes/ThemeContext'

import Navbar from './Static/Navbar'
import Main from './Views/Main'
import Footer from './Components/Footer'
import { AuthProvider } from './Context/AuthContext'
import { UserDataProvider } from './Context/UserDataContext'
import { EquipoProvider } from './Context/EquipoContext'
import { DescargasProvider } from './Context/DescargasContext'

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <EquipoProvider>
                    <DescargasProvider>
                        <Router basename={'/pediloya2.6'}>
                            <UserDataProvider>
                                <Navbar />
                                <Main />
                                <Footer />
                            </UserDataProvider>
                        </Router>
                    </DescargasProvider>
                </EquipoProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
