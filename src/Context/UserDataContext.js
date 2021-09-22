import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useFirestoreCollWhere, newDocument, updateDocument } from '../Hooks/useFirestore'

const UserDataContext = createContext()

const { Provider } = UserDataContext

export const useUserData = () => {
    return useContext(UserDataContext)
}

export const UserDataProvider = ({ children }) => {
    const { currentUser, userConfig /* , userType */ } = useAuth()

    const { docs: userDataDocs } = useFirestoreCollWhere('usuarios', 'userId', currentUser ? currentUser.uid : '')

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!currentUser) return
        if (userDataDocs[0]) setUserData(userDataDocs)
        if (userDataDocs[0] && loading) {
            setLoading(false)
        }
    }, [currentUser, userDataDocs, loading])

    const notificationsType = [
        { name: 'Pedidos de diseño', id: 'disenio', icon: 'edit', on: true },
        { name: 'Pedidos web GCBA', id: 'web', icon: 'computer', on: true },
        { name: 'Pedidos de publicación en Redes', id: 'redes', icon: 'facebook', on: true },
        { name: 'Pedido para Somos', id: 'somos', icon: 'email', on: true },
    ]

    const createData = (name, email) => {
        newDocument(
            'usuarios',
            {
                name,
                email,
                empty: false,
                ...userConfig,
                /* plataformNotifications: notificationsType, */
                emailNotifications: notificationsType,
            },
            currentUser.uid
        )
    }

    const updateData = (name, email, id) => {
        updateDocument('usuarios', { name, email }, id)
    }

    const updateNotifications = async (type, notifications, id) => {
        updateDocument('usuarios', { [type]: notifications }, id)
    }

    const value = { loading, userData, createData, updateData, updateNotifications }

    return <Provider value={value}>{children}</Provider>
}
