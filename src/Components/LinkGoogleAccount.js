import React, { useState, useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Button, Alert } from 'react-bootstrap'
import GoogleIcon from '../Assets/img/GoogleIcons'

const LinkGoogleAccount = () => {
    const { currentUser, connectGoogleAccount, googleLinkError, setGoogleLinkError, unLinkFromGoogle, unlinkSuccess } = useAuth()

    const [isLinked, setIsLinked] = useState(false)
    const [linkedAccount, setLinkedAccount] = useState('')

    useEffect(() => {
        if (!currentUser) return

        currentUser.providerData.forEach(prov => {
            if (!prov.providerId === 'google.com') return
            if (prov.providerId === 'google.com') {
                setLinkedAccount(prov.email)
                return setIsLinked(true)
            }
        })

        return () => {
            setIsLinked(false)
            setLinkedAccount('')
        }
    }, [currentUser, unlinkSuccess])

    useEffect(() => {
        setGoogleLinkError('')
    }, [])

    return (
        <div className='linkButtonWrapper'>
            <hr />
            {!isLinked ? (
                <>
                    <p>Vinculá tu cuenta con gmail para acceder a la plataforma más rápido</p>
                    <div className='isNotLinked'>
                        {googleLinkError && <Alert variant='danger'>{googleLinkError}</Alert>}
                        <Button
                            variant='secondary'
                            onClick={() => {
                                connectGoogleAccount()
                            }}
                        >
                            <GoogleIcon />
                            Gmail
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p className='mb-1'>
                        Ya hay un cuenta vinculada: <strong>{linkedAccount}</strong>
                    </p>
                    <p className='mb-1'>Desvincular:</p>
                    <Button
                        variant='outline-danger'
                        onClick={() => {
                            unLinkFromGoogle()
                        }}
                    >
                        <GoogleIcon />
                        Gmail
                    </Button>
                </>
            )}
        </div>
    )
}

export default LinkGoogleAccount
