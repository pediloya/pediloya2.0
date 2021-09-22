import React from 'react'
import { sendEmailVerification } from '../firebase'
import { useAuth } from '../Context/AuthContext'
import { Button } from 'react-bootstrap'

const VerifyEmail = () => {
    const { currentUser } = useAuth()

    const sendVerification = () => {
        sendEmailVerification(currentUser).then(() => {
            // Email verification sent!
            // ...
        })
    }

    return (
        <div className='mt-3 mb-3'>
            <p>Para verificar tu cuenta primero linkeala con un correo de gmail</p>
            <Button
                onClick={() => {
                    sendVerification()
                }}
            >
                Verificar cuenta
            </Button>
        </div>
    )
}

export default VerifyEmail
