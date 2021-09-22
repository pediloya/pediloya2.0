import React, { createContext, useContext, useEffect, useState } from 'react'
import { useFirestoreColl, newDocument, updateDocument, deleteDocument } from '../Hooks/useFirestore'

const EquipoContext = createContext()

const { Provider } = EquipoContext

export const useEquipo = () => {
    return useContext(EquipoContext)
}

export const EquipoProvider = ({ children }) => {
    const { coll } = useFirestoreColl('equipo')

    const [equipo, setEquipo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (coll) setEquipo(coll)
        if (coll && loading) {
            setLoading(false)
        }
    }, [coll, loading])

    const createMember = (data, userId) => {
        newDocument('equipo', data, userId)
    }

    const updateMember = (data, id) => {
        updateDocument('equipo', data, id)
    }

    const deleteMember = id => {
        deleteDocument('equipo', id)
    }

    const value = { equipo: equipo, createMember: createMember, updateMember, deleteMember }

    return <Provider value={value}>{children}</Provider>
}
