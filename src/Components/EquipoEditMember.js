import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { useEquipo } from '../Context/EquipoContext'

const EquipoEditMember = ({ memberSelected, toggleSetter }) => {
    const { updateMember } = useEquipo()

    const [name, setName] = useState('')
    const [funcion, setFuncion] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')

    const handleNameInput = e => {
        setName(e.target.value)
    }
    const handleFuncionInput = e => {
        setFuncion(e.target.value)
    }
    const handleTelInput = e => {
        setTel(e.target.value)
    }
    const handleEmailInput = e => {
        setEmail(e.target.value)
    }

    useEffect(() => {
        setName(memberSelected.nombre)
        setFuncion(memberSelected.funcion)
        setTel(memberSelected.tel)
        setEmail(memberSelected.email)
    }, [memberSelected])

    const handleSubmitChangeMember = e => {
        e.preventDefault()
        let data = {
            nombre: name,
            funcion,
            tel,
            email,
        }
        updateMember(data, memberSelected.id)
        toggleSetter(false)
    }

    return (
        <Card className='mb-3'>
            <Card.Header>
                <span className='material-icons'>manage_accounts</span>Edita la información
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Form.Group as={Col} className='formGroup'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control value={name} onChange={e => handleNameInput(e)} />
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label>Función</Form.Label>
                            <Form.Control value={funcion} onChange={e => handleFuncionInput(e)} />
                        </Form.Group>
                        <Form.Group as={Col} className='formGroup'>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control value={tel} onChange={e => handleTelInput(e)} />
                        </Form.Group>
                        <Form.Group as={Col} className='formGroup'>
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control value={email} onChange={e => handleEmailInput(e)} />
                        </Form.Group>
                        <Form.Group className='d-flex justify-content-between'>
                            <Button type='submit' onClick={e => handleSubmitChangeMember(e)} variant='primary'>
                                Guardar
                            </Button>
                            <Button type='button' onClick={() => toggleSetter(false)} variant='outline-danger'>
                                Cancelar
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EquipoEditMember
