import React, { createContext, useContext, useEffect, useState } from 'react'
import { projectFirestore } from '../firebase'

const TeamNotificationsContext = createContext()

const { Provider } = TeamNotificationsContext

export const useTeamNotificationsContext = () => {
    return useContext(TeamNotificationsContext)
}

export const TeamNotificationsProvider = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState([])

    useEffect(() => {
        const unsub = projectFirestore
            .collection('usuarios')
            .where('admin', '==', true)
            .onSnapshot(snap => {
                if (snap.empty) return setTeamMembers([{ 'empty': true }])
                let documents = []
                snap.forEach(doc => {
                    let email = doc.data().email
                    let notifications = doc.data().emailNotifications
                    let member = {
                        email,
                        disenio: notifications.find(noti => noti.id === 'disenio'),
                        somos: notifications.find(noti => noti.id === 'somos'),
                        redes: notifications.find(noti => noti.id === 'redes'),
                        web: notifications.find(noti => noti.id === 'web'),
                    }
                    documents.push({ ...member })
                })
                setTeamMembers(documents)
            })

        return () => unsub()
    }, [])

    const value = { teamMembers }

    return <Provider value={value}>{children}</Provider>
}
