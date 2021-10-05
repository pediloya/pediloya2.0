import React, { createContext, useContext } from 'react'
import { projectFirestore, timestamp } from '../firebase'

const PedidosStateContext = createContext()

const { Provider } = PedidosStateContext

export const usePedidosState = () => {
    return useContext(PedidosStateContext)
}

export const PedidosStateProvider = ({ children }) => {
    const changeState = async (pedido, current) => {
        let data = {
            ...pedido,
            state: current === 'created' ? 'inProgress' : current === 'inProgress' ? 'finalized' : 'closed',
            stateChangeTimestamp: timestamp(),
        }
        const projectColection = projectFirestore.collection('pedidos')
        const projectDoc = projectColection.doc(pedido.id)

        return projectDoc
            .update({
                ...data,
            })
            .then()
            .catch(err => console.log(err))
    }

    const autoCloseState = async pedido => {
        let data = {
            ...pedido,
            state: 'closed',
        }

        const projectColection = projectFirestore.collection('pedidos')
        const projectDoc = projectColection.doc(pedido.id)

        return projectDoc
            .update({
                ...data,
            })
            .then()
            .catch(err => console.log(err))
    }

    const value = { changeState, autoCloseState }

    return <Provider value={value}>{children}</Provider>
}
