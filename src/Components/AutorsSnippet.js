import React from 'react'
import { Card } from 'react-bootstrap'
import { useAutors } from '../Context/AutorsContext'
import Loading from './Loading'

const AutorsSnippet = () => {
    const { autors } = useAutors()

    return (
        <Card>
            <Card.Header>
                <span className='material-icons'>people</span> Información de autores de pedidos
            </Card.Header>
            <Card.Body>
                {autors === null ? (
                    <Loading />
                ) : autors.length === 0 ? (
                    'No hay datos guardados'
                ) : (
                    <>
                        <p>
                            <strong>Nombres</strong>: {autors.autorName.map(name => name + ' ')}
                        </p>
                        <p>
                            <strong>Emails</strong>: {autors.autorEmail.map(email => email + ' ')}
                        </p>
                        <p>
                            <strong>Emails para copia</strong>:{' '}
                            {autors.emailsToCopy.length === 0 || autors.emailsToCopy[0] === ''
                                ? 'No hay emails para copia guardados'
                                : autors.emailsToCopy.map(emailToCopy => emailToCopy + ' ')}
                        </p>
                    </>
                )}
            </Card.Body>
        </Card>
    )
}

export default AutorsSnippet
