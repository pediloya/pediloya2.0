import React, { createContext, useContext, useState, useEffect } from 'react'
import { projectFirestore } from '../firebase'

const AllPedidosContext = createContext()
const { Provider } = AllPedidosContext

export const useAllPedidos = () => {
    return useContext(AllPedidosContext)
}

export const AllPedidosProvider = ({ children }) => {
    const collection = 'pedidos'

    const [pedidos, setPedidos] = useState([])
    useEffect(() => {
        if (!collection) return
        const unsub = projectFirestore
            .collection(collection)
            .orderBy('createAt', 'desc')
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
