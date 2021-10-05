import React from 'react'
import { Switch } from 'react-router-dom'
import AuthRoute from '../../HOC/AuthRoute'
import Cuenta from './Cuenta'
import EditarEquipo from './EditarEquipo'
import Home from './Home'
import Pedidos from './Pedidos'
import EditarDescargas from './EditarDescargas'
import CrearUsuario from './CrearUsuario'
import Pedido from './Pedido'
import NotFound from '../NotFound'
import PedidosCerrados from './PedidosCerrados'

const Admin = () => {
    return (
        <Switch>
            <AuthRoute exact path='/' comp={Home} />
            <AuthRoute exact path='/pedidos' comp={Pedidos} />
            <AuthRoute exact path='/cuenta' comp={Cuenta} />
            <AuthRoute exact path='/crear-usuario' comp={CrearUsuario} />
            <AuthRoute exact path='/editar-equipo' comp={EditarEquipo} />
            <AuthRoute exact path='/editar-descargables' comp={EditarDescargas} />
            <AuthRoute exact path='/pedido/:id' comp={Pedido} />
            <AuthRoute exact path='/pedidos-cerrados' comp={PedidosCerrados} />
            <AuthRoute component={NotFound} />
        </Switch>
    )
}

export default Admin
