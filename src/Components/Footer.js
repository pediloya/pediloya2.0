import React from 'react'
import { useAuth } from '../Context/AuthContext'

const Footer = () => {
    const { currentUser } = useAuth()
    return (
        <>
            {currentUser && (
                <footer>
                    <p className='mb-0'>Copyright© 2021. All right reserved.</p>
                    <p className='mb-0'>Ministerio de Gobierno - GCBA</p>
                    <p className='mb-0'>Powered by Google Firebase™</p>
                    <p className='mb-0'>Created with ReactJs</p>
                </footer>
            )}
        </>
    )
}

export default Footer
