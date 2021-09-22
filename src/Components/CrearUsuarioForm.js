import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../Context/AuthContext'
import { Alert, Form, Button } from 'react-bootstrap'

const CrearUsuarioForm = () => {
    const { signup } = useAuth()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [userType, setUserType] = useState('@pediloya.reparticion')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        if (userName.indexOf(' ') >= 0) {
            return setError('El nombre de usuario no puede contener espacios')
        }
        if (password !== repeatedPassword) {
            return setError('Las contraseñas deben coincidir')
        }
        let emailFromUserName = userName + userType
        try {
            setError('')
            setLoading(true)
            await signup(emailFromUserName, password)
            history.push('/')
        } catch {
            setError('Ocurrio un error, vuelva a intentarlo en unos minutos')
            setLoading(false)
        }
    }

    const handleUserNameInput = e => {
        setUserName(e.target.value)
        setError('')
    }
    const handlePassInput = e => {
        setPassword(e.target.value)
        setError('')
    }
    const handleRepeatedPassInput = e => {
        setRepeatedPassword(e.target.value)
    }
    const handleUserType = e => {
        setUserType(e.target.value)
        setError('')
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email' className='formGroup'>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control value={userName} onChange={e => handleUserNameInput(e)} type='text' required />
                    <small>El nombre de usuario no debe contener espacios</small>
                </Form.Group>
                <Form.Group id='password' className='formGroup'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control value={password} onChange={e => handlePassInput(e)} type='password' required />
                </Form.Group>
                <Form.Group id='password_confirm' className='formGroup'>
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control value={repeatedPassword} onChange={e => handleRepeatedPassInput(e)} type='password' required />
                </Form.Group>
                <Form.Group className='formGroup'>
                    <Form.Label className='d-flex'>
                        <span className='material-icons mr-1 settings'>settings</span>
                        Tipo de usuario
                    </Form.Label>
                    <Form.Control onChange={e => handleUserType(e)} as='select'>
                        <option value='@pediloya.reparticion'>Repartición</option>
                        <option value='@pediloya.equipo'>Equipo de Comunicación</option>
                        <option value='@pediloya.admin'>Admin</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='formGroup'>
                    <Button disabled={loading} className='w-100' type='submit'>
                        Crear
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default CrearUsuarioForm
