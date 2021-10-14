import React from 'react'
import { Switch } from 'react-router-dom'
import AuthRoute from '../../HOC/AuthRoute'
import { CrearPedidoProvider } from '../../Context/CrearPedidoContext'
import { AutorsProviders } from '../../Context/AutorsContext'

import Cuenta from './Cuenta'
import Home from './Home'
import Descargas from './Descargas'
import Equipo from './Equipo'
import CrearPedido from './CrearPedido'
import Pedidos from './Pedidos'
import Pedido from './Pedido'
import PedidosCerrados from './PedidosCerrados'
import NotFound from '../NotFound'

const User = () => {
    return (
        <CrearPedidoProvider>
            <AutorsProviders>
                <Switch>
                    <AuthRoute exact path='/' comp={Home} />
                    <AuthRoute exact path='/pedidos' comp={Pedidos} />
                    <AuthRoute exact path='/crear-pedidos' comp={CrearPedido} />
                    <AuthRoute exact path='/cuenta' comp={Cuenta} />
                    <AuthRoute exact path='/equipo' comp={Equipo} />
                    <AuthRoute exact path='/descargables' comp={Descargas} />
                    <AuthRoute exact path='/pedido/:id' comp={Pedido} />
                    <AuthRoute exact path='/pedidos-cerrados' comp={PedidosCerrados} />
                    <AuthRoute component={NotFound} />
                </Switch>
            </AutorsProviders>
        </CrearPedidoProvider>
    )
}

export default User
