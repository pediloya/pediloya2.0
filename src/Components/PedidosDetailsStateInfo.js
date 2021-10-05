import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Button } from 'react-bootstrap'

const PedidosDetailsStateInfo = () => {
    const { userType } = useAuth()

    const [show, setShow] = useState(false)

    const showAction = () => {
        setShow(show => !show)
    }

    return (
        <div className='stateChange'>
            <Button onClick={() => showAction()} variant='secondary' className='mb-3'>
                Más información sobre los estados
            </Button>
            <div style={{ display: show ? 'block' : 'none' }} className='stateChangeInfo'>
                <p className='mb-0'>
                    <small>
                        {userType === 'reparticion'
                            ? 'El equipo de comunicación podrá cambiar el estado de "Creado" a "En curso" y una vez finalizado lo cambiará a "Finalizado".'
                            : 'Como parte del equipo de comunicación podrás cambiar el estado de "Creado" a "En curso" si ya lo vas a empezar y una vez que lo finalices a "Finalizado".'}
                    </small>
                </p>
                <p className='mb-0'>
                    <small>
                        {userType === 'reparticion'
                            ? 'Si considerás que el trabajo está listo podrás cambiarle el estado a "Cerrado", esto hará que se deje de visualizar en esta página.'
                            : 'Si la repartición que realizó el pedido esta conforme con el mismo cambiará el estado a "Cerrado"'}
                    </small>
                </p>
                <p className='mb-0'>
                    <small>De esta forma evitamos que se acumulen muchos pedidos.</small>
                </p>
                <p>
                    <small>
                        *El pedido cambiará su estado a "Cerrado" autómaticamente luego de 7 días de haber sido "Finalizado".
                    </small>
                </p>
            </div>
        </div>
    )
}

export default PedidosDetailsStateInfo
