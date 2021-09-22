import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Button } from 'react-bootstrap'

const LinkGoogleAccount = () => {
    const { connectGoogleAccount } = useAuth()

    return (
        <Button
            onClick={() => {
                connectGoogleAccount()
            }}
        >
            Linkear cuenta con una cuenta de Gmail
        </Button>
    )
}

export default LinkGoogleAccount
