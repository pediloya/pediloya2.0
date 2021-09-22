import React from 'react'
import { Container } from 'react-bootstrap'

const NotFound = () => {
    return (
        <Container as='main' fluid className='min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='mainIntro'>
                <h1>Página no encontrada</h1>
                <h4>La página que buscás no existe o fue dada de baja.</h4>
                <h5>Revisá si la dirección que escribiste es la correcta</h5>
            </div>
        </Container>
    )
}

export default NotFound
