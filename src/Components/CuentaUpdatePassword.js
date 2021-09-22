import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'

const CuentaUpdatePassword = () => {
    const { updatePassword, updatePasswordError } = useAuth()

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [])

    const handleChangePassword = async e => {
        e.preventDefault()
        setLoading(true)
        if (password !== repeatedPassword) return setError('Las constraseñas deben coincidir')
        try {
            updatePassword(password)
            setLoading(false)
            setError('')
        } catch {
            setError(updatePasswordError)
        }
    }

    const handlePassword = e => {
        setPassword(e.target.value)
        setError('')
        setLoading(false)
    }
    const handleRepeatedPassword = e => {
        setRepeatedPassword(e.target.value)

        setError('')
        setLoading(false)
    }

    useEffect(() => {
        if (password !== repeatedPassword) return setError('Las constraseñas deben coincidir')
        if (password === repeatedPassword) return setError('')
        return
    }, [repeatedPassword, password])

    useEffect(() => {
        if (updatePasswordError === 'auth/weak-password') return setError('La contraseña debe tener al menos 6 caracteres')
        if (updatePasswordError === 'auth/requires-recent-login') return setError('Vuelve a loguearte para cambiar la contraseña')
        return
    }, [updatePasswordError])

    return (
        <Card className='w-100 mb-3'>
            <Card.Header>
                <span className='material-icons'>lock</span> Cambiar contraseña
            </Card.Header>
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={e => handleChangePassword(e)}>
                    <Form.Group className='formGroup'>
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control
                            autoComplete='new-password'
                            type='password'
                            value={password}
                            onChange={e => handlePassword(e)}
                        />
                    </Form.Group>
                    <Form.Group className='formGroup'>
                        <Form.Label>Repite la contraseña</Form.Label>
                        <Form.Control
                            autoComplete='new-password'
                            type='password'
                            value={repeatedPassword}
                            onChange={e => handleRepeatedPassword(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button disabled={loading || password !== repeatedPassword} type='submit' variant='primary'>
                            Cambiar
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CuentaUpdatePassword
