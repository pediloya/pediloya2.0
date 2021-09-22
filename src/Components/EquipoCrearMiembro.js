import React, { useState } from 'react'
import { Card, Form, Col, Row, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useEquipo } from '../Context/EquipoContext'

const EquipoCrearMiembro = () => {
    const { currentUser } = useAuth()
    const { createMember } = useEquipo()

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [funcion, setFuncion] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')

    const handleNameInput = e => {
        setName(e.target.value)
        setError('')
    }

    const handleFuncionInput = e => {
        setFuncion(e.target.value)
        setError('')
    }
    const handleTelInput = e => {
        setTel(e.target.value)
        setError('')
    }
    const handleEmailInput = e => {
        setEmail(e.target.value)
        setError('')
    }

    const handleCreateMember = e => {
        e.preventDefault()
        if (!name || !funcion || !tel || !email) return setError('Completá todos los datos del formulario')
        let data = {
            nombre: name,
            funcion,
            tel,
            email,
            userId: currentUser.uid,
        }
        createMember(data, currentUser.uid)
        setName('')
        setFuncion('')
        setTel('')
        setEmail('')
    }

    return (
        <Card>
            <Card.Header>
                <span className='material-icons'>group_add</span> Creá un nuevo miembro del equipo
            </Card.Header>
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={e => handleCreateMember(e)}>
                    <Row>
                        <Form.Group className='formGroup' as={Col}>
                            <Form.Label>Nombre y apellido</Form.Label>
                            <Form.Control type='text' onChange={e => handleNameInput(e)} value={name} />
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label>Función</Form.Label>
                            <Form.Control type='text' value={funcion} onChange={e => handleFuncionInput(e)} />
                        </Form.Group>
                        <Form.Group className='formGroup' as={Col} md={6}>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type='text' value={tel} onChange={e => handleTelInput(e)} />
                        </Form.Group>
                        <Form.Group className='formGroup' as={Col} md={6}>
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control type='email' value={email} onChange={e => handleEmailInput(e)} />
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit'>Crear</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EquipoCrearMiembro
