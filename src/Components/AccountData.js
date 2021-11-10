import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import LinkGoogleAccount from './LinkGoogleAccount'

const AccountData = ({ hasLink, hasToggle }) => {
    const { userName, userType } = useAuth()

    const [isToggle, setIsToggle] = useState(false)

    const toggle = () => {
        if (hasToggle) setIsToggle(isToggle => !isToggle)
    }

    return (
        <Card className={hasToggle ? 'w-100 mb-3 withToggle' : 'w-100 mb-3'}>
            <Card.Header>
                <div>
                    <span className='material-icons'>account_circle</span> Datos de la cuenta
                </div>
                {hasToggle && (
                    <div onClick={() => toggle()}>
                        <span className='material-icons'>{isToggle ? 'expand_less' : 'expand_more'}</span>
                    </div>
                )}
            </Card.Header>
            <Card.Body className={isToggle ? 'show' : 'notShow'}>
                <p>
                    Nombre de usuario: <strong>{userName}</strong>
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
            </Card.Body>
        </Card>
    )
}

export default AccountData
