import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Button, Alert } from 'react-bootstrap'

const LinkGoogleAccount = () => {
    const { connectGoogleAccount, googleLinkError, setGoogleLinkError } = useAuth()

    useEffect(() => {
        setGoogleLinkError('')
    }, [])

    return (
        <>
            {googleLinkError && <Alert variant='danger'>{googleLinkError}</Alert>}
            <Button
                onClick={() => {
                    connectGoogleAccount()
                }}
            >
                Linkear cuenta con una cuenta de Gmail
            </Button>
        </>
    )
}

export default LinkGoogleAccount
