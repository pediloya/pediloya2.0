import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import LinkGoogleAccount from './LinkGoogleAccount'
import VerifyEmail from './VerifyEmail'

const AccountData = ({ hasLink }) => {
    const { userName, userType } = useAuth()
    return (
        <Card className='w-100 mb-3'>
            <Card.Header>
                <span className='material-icons'>account_circle</span> Datos de la cuenta
            </Card.Header>
            <Card.Body>
                <p>
                    Nombre de la cuenta: <strong>{userName}</strong>
                </p>
                <p>
                    Tipo de usuario <strong>{userType === 'reparticion' ? 'Repartición' : 'Equipo de Comunicación'}</strong>
                </p>
                {hasLink && (
                    <Button as={Link} to='/cuenta'>
                        Ver perfil
                    </Button>
                )}
                {!hasLink && <LinkGoogleAccount />}
                {!hasLink && <VerifyEmail />}
            </Card.Body>
        </Card>
    )
}

export default AccountData
