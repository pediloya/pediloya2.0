import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar as BSNavbar, Container } from 'react-bootstrap'
import LogoSVG from './LogoSVG'
import SideBar from '../Components/SideBar'
import { useAuth } from '../Context/AuthContext'

const Navbar = () => {
    const { currentUser } = useAuth()

    return (
        <BSNavbar fixed='top'>
            <div className='yellowLine'></div>
            <Container fluid>
                <BSNavbar.Brand as={Link} to='/'>
                    <LogoSVG width={'50px'} />
                    Ministerio de Gobierno
                </BSNavbar.Brand>
            </Container>
            {currentUser && <SideBar />}
        </BSNavbar>
    )
}

export default Navbar
