import React, { useState, useEffect, createContext, useContext } from 'react'
import { projectFirestore } from '../firebase'
import { useAuth } from './AuthContext'

const TimeAheadContext = createContext()

const { Provider } = TimeAheadContext

export const useTimeAhead = () => {
    return useContext(TimeAheadContext)
}

export const TimeAheadProvider = ({ children }) => {
    const { currentUser } = useAuth()

    const [timeAheadWeb, setTimeAheadWeb] = useState(0)
    const [timeAheadRedes, setTimeAheadRedes] = useState(0)
    const [timeAheaDisenio, setTimeAheaDisenio] = useState(0)
    const [timeaheadId, setTimeaheadId] = useState('')

    useEffect(() => {
        if (!currentUser) return

        const unsub = projectFirestore.collection('timeahead').onSnapshot(snap => {
            snap.forEach(doc => {
                setTimeaheadId(doc.id)
                setTimeAheadWeb(doc.data().web)
                setTimeAheadRedes(doc.data().redes)
                setTimeAheaDisenio(doc.data().disenio)
            })
        })

        return () => unsub()
    }, [])

    const changeTimeAhead = data => {
        /* console.log(data) */
        const projectColection = projectFirestore.collection('timeahead')
        const projectDoc = projectColection.doc(timeaheadId)

        console.log(data)

        return projectDoc
            .update({
                ...data,
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const value = { timeAheadWeb, timeAheadRedes, timeAheaDisenio, changeTimeAhead }

    return <Provider value={value}>{children}</Provider>
}
