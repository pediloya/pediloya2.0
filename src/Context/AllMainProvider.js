import React from 'react'

import { PedidosProvider } from './PedidosContext'
import { AllPedidosProvider } from './AllPedidosContext'
import { PedidosStateProvider } from './PedidosStateContext'

const AllMainProvider = ({ children }) => {
    return (
        <PedidosProvider>
            <AllPedidosProvider>
                <PedidosStateProvider>{children}</PedidosStateProvider>
            </AllPedidosProvider>
        </PedidosProvider>
    )
}

export default AllMainProvider
