import React from 'react'
import { Container, Card } from 'react-bootstrap'
import CrearUsuarioForm from '../../Components/CrearUsuarioForm'

const CrearUsuario = () => {
    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Crear usuario</h1>
                <p>
                    Podés crear usuarios para un <strong>área</strong>, para un integrante del{' '}
                    <strong>equipo de Comunicación</strong> o usuarios
                    <strong> Administradores</strong>.
                </p>
            </div>
            <Card className='w-100' style={{ maxWidth: '550px', margin: '0 auto' }}>
                <Card.Header>
                    <span className='material-icons'>person_add</span> Crear usuario
                </Card.Header>
                <Card.Body>
                    <CrearUsuarioForm />
                </Card.Body>
            </Card>
        </Container>
    )
}

export default CrearUsuario
