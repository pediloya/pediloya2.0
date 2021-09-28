import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navbar from './Static/Navbar'
import Main from './Views/Main'
import Footer from './Components/Footer'
import AllAppProvider from './Context/AllAppProvider'

import { UserDataProvider } from './Context/UserDataContext'

const App = () => {
    return (
        <AllAppProvider>
            <Router basename={'/pediloya2.0'}>
                <UserDataProvider>
                    <Navbar />
                    <Main />
                    <Footer />
                </UserDataProvider>
            </Router>
        </AllAppProvider>
    )
}

export default App
