import React, { createContext, useContext, useState, useEffect } from 'react'
import { projectFirestore } from '../firebase'
import { useAuth } from './AuthContext'

const PedidosContext = createContext()
const { Provider } = PedidosContext

export const usePedidos = () => {
    return useContext(PedidosContext)
}

export const PedidosProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const collection = 'pedidos'

    const [pedidos, setPedidos] = useState([])
    useEffect(() => {
        if (!currentUser || !collection) return
        const unsub = projectFirestore
            .collection(collection)
            .orderBy('createAt', 'desc')
            .where('userId', '==', currentUser.uid)
            .onSnapshot(snap => {
                if (snap.empty) return setPedidos([{ 'empty': true }])
                let documents = []
                snap.forEach(doc => {
                    documents.push({ ...doc.data() })
                })
                setPedidos(documents)
            })

        return () => unsub()
    }, [collection])

    const value = { pedidos: pedidos }

    return <Provider value={value}>{children}</Provider>
}
