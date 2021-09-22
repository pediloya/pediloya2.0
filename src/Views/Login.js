import React, { useState, useEffect } from 'react'
import { Container, Alert, Card, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Login = () => {
    const { login, signupWithGoogle, currentUser } = useAuth()

    const history = useHistory()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [userType, setUserType] = useState('@pediloya.reparticion')
    const [storageCheck, setStorageCheck] = useState(false)
    const [defaultOptionValue, setDefatulOptionValue] = useState('@pediloya.reparticion')

    const options = [
        { type: 'Repartición', value: '@pediloya.reparticion' },
        { type: 'Equipo de Comunicación', value: '@pediloya.admin' },
    ]

    const handleUserTypeChange = e => {
        setUserType(e.target.value)
        setStorageCheck(false)
        localStorage.removeItem('userType')
    }

    const handleToLocalStorage = () => {
        if (!storageCheck) {
            setStorageCheck(!storageCheck)
            setDefatulOptionValue(userType)
            localStorage.setItem('userType', userType)
        } else {
            setStorageCheck(false)
            localStorage.removeItem('userType')
        }
    }

    useEffect(() => {
        const inLocalStorage = localStorage.getItem('userType')
        if (!inLocalStorage) return

        setDefatulOptionValue(inLocalStorage)
        setStorageCheck(true)
    }, [])

    useEffect(() => {
        if (!currentUser) return
        history.push('/')
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            const createdEmail = userName + userType
            await login(createdEmail, password)
            history.push('/')
        } catch {
            setError('Falló el inicio de sesión')
            setLoading(false)
        }
    }

    return (
        <Container as='main' className='login' fluid>
            <h1 className='mb-5 text-center'>Plataforma Interna del equipo de Comunicación del Ministerio de Gobierno</h1>
            <Card className='w-100' style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Card.Header>Ingresar</Card.Header>
                <Card.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Group className='formGroup'>
                            <Form.Label className='d-flex'>
                                <span className='material-icons account_circle mr-1'>account_circle</span>
                                Usuario
                            </Form.Label>
                            <Form.Control
                                type='text'
                                onChange={e => {
                                    setUserName(e.target.value)
                                }}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label className='d-flex'>
                                <span className='material-icons mr-1 lock'>lock</span>
                                Contraseña
                            </Form.Label>
                            <Form.Control
                                autoComplete='current-password'
                                type='password'
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label className='d-flex'>
                                <span className='material-icons mr-1 settings'>settings</span>
                                Tipo de usuario
                            </Form.Label>
                            {!storageCheck ? (
                                <Form.Control
                                    as='select'
                                    onChange={e => {
                                        handleUserTypeChange(e)
                                    }}
                                    defaultValue={defaultOptionValue}
                                    disabled={storageCheck}
                                >
                                    {!storageCheck ? (
                                        options.map(({ value, type }) => {
                                            return (
                                                <option key={value} value={value}>
                                                    {type}
                                                </option>
                                            )
                                        })
                                    ) : (
                                        <option>
                                            {options.map(({ value, type }) => {
                                                return value === defaultOptionValue && type
                                            })}
                                        </option>
                                    )}
                                </Form.Control>
                            ) : (
                                <p className='d-flex align-items-center' style={{ height: '38px', marginLeft: '17px' }}>
                                    {options.map(({ value, type }) => {
                                        return value === defaultOptionValue && type
                                    })}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className='formGroup' controlId='formBasicCheckbox'>
                            <Form.Check
                                checked={storageCheck}
                                onChange={handleToLocalStorage}
                                type='checkbox'
                                label='Recordar tipo de usuario'
                            />
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Button disabled={loading} className='w-100' type='submit' variant='primary'>
                                Vamos!
                            </Button>
                        </Form.Group>
                        <hr />
                        <p className='mb-1'>
                            ¡Si conectaste tu cuenta con una cuenta de google, te podes loguear con ese método!
                        </p>
                        <small className='mb-3 d-block'>Hacelo desde el panel de Usuario dentro de la plataforma</small>
                        <Button
                            disabled={loading}
                            className='w-100'
                            type='button'
                            variant='primary'
                            onClick={() => signupWithGoogle()}
                        >
                            Usar gmail
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login
