import React, { useContext, createContext, useState, useEffect } from 'react'
import { projectFirestore } from '../firebase'
import { useAuth } from './AuthContext'

const AsignPedidosContext = createContext()

const { Provider } = AsignPedidosContext

export const useAsignPedidosProvider = () => {
    return useContext(AsignPedidosContext)
}

export const AsignPedidosProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (!currentUser) return
        const unsub = projectFirestore
            .collection('usuarios')
            .where('admin', '==', true)
            .onSnapshot(snap => {
                let documents = []
                if (snap.empty) return setUsers([{ 'empty': true }])
                snap.forEach(doc => {
                    documents.push(doc.data())
                })
                setUsers(documents)
            })

        return () => {
            unsub()
        }
    }, [currentUser])

    const [valideUsers, setValidUsers] = useState([])
    console.log('AsignPedidosProvider => ', valideUsers)
    console.log('AsignPedidosProvider / users => ', users)
    useEffect(() => {
        console.log('AsignPedidosProvider => ', valideUsers)
        if (users.length === 0) return
        users.filter(user => {
            if (user.emailNotifications.find(noti => noti.on == true)) {
                setValidUsers(valideUsers => [...valideUsers, user])
            }
        })
    }, [users])

    const asignPedido = async (pedido, user) => {
        console.log('pedido => ', pedido)
        console.log('user => ', user)

        let data = {
            ...pedido,
            asignedTo: user,
        }

        const projectColection = projectFirestore.collection('pedidos')
        const projectDoc = projectColection.doc(pedido.id)

        return await projectDoc
            .update({
                ...data,
            })
            .then()
            .catch(err => console.log(err))
    }

    const value = { valideUsers, asignPedido }

    return <Provider value={value}>{children}</Provider>
}
