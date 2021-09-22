import React, { useState } from 'react'
import { Form, Card, Button, Row, Col, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useUserData } from '../Context/UserDataContext'
import Loading from './Loading'

const CuentaUpdateData = () => {
    const { userType } = useAuth()
    const { loading, userData, createData, updateData } = useUserData()

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [edit, setEdit] = useState(false)

    const handleUpdateUserData = async e => {
        e.preventDefault()

        let completeName = `${name} ${surname}`

        if (!name || !email) return setError('Completá todos los campos para continuar')

        if (userData[0].empty) return createData(completeName, email)

        updateData(completeName, email, userData[0].id)
        /* reset states */
        setEdit(false)
        setName('')
        setSurname('')
        setEmail('')
    }

    const handleName = e => {
        setName(e.target.value)
    }
    const handleSurname = e => {
        setSurname(e.target.value)
    }
    const handleEmail = e => {
        setEmail(e.target.value)
    }

    return (
        <>
            <Card className='w-100 mb-3'>
                <Card.Header>
                    <span className='material-icons'>manage_accounts</span> Información adicional
                </Card.Header>
                <Card.Body>
                    {loading ? (
                        <Loading />
                    ) : userData[0].empty || edit ? (
                        <Form onSubmit={e => handleUpdateUserData(e)}>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <p>
                                {edit
                                    ? 'Modificá la información de tu usuario'
                                    : 'No se encontró la información, completa el formulario para configurar tu usuario'}
                            </p>
                            <Row>
                                {userType === 'admin' ? (
                                    <>
                                        <Form.Group as={Col} className='formGroup'>
                                            <Form.Label>Nombre: </Form.Label>
                                            <Form.Control value={name} onChange={e => handleName(e)} />
                                        </Form.Group>
                                        <Form.Group as={Col} className='formGroup'>
                                            <Form.Label>Apellido: </Form.Label>
                                            <Form.Control value={surname} onChange={e => handleSurname(e)} />
                                        </Form.Group>
                                    </>
                                ) : (
                                    <Form.Group as={Col} className='formGroup'>
                                        <Form.Label>Nombre completo del área: </Form.Label>
                                        <Form.Control value={name} onChange={e => handleName(e)} />
                                    </Form.Group>
                                )}
                            </Row>
                            <Form.Group className='formGroup'>
                                <Form.Label>{`Email ${userType === 'reparticion' ? 'de respaldo' : ''}: `}</Form.Label>
                                <Form.Control value={email} onChange={e => handleEmail(e)} />
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-between'>
                                <Button className='' type='submit'>
                                    Enviar
                                </Button>
                                {edit && (
                                    <Button variant='danger' onClick={() => setEdit(edit => !edit)}>
                                        Cancelar
                                    </Button>
                                )}
                            </Form.Group>
                        </Form>
                    ) : (
                        <>
                            <p>
                                Nombre {userType === 'reparticion' ? 'completo del área' : ''}:{' '}
                                <strong>{userData[0].name}</strong>
                            </p>
                            <p>
                                Email: <strong>{userData[0].email}</strong>
                            </p>
                            <Button
                                onClick={() => {
                                    setEdit(true)
                                }}
                            >
                                Editar
                            </Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
    )
}

export default CuentaUpdateData
