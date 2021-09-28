import React, { useState } from 'react'
import { usePedidosState } from '../Context/PedidosStateContext'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'

const PedidosDetailsState = ({ pedido }) => {
    const { changeState } = usePedidosState()

    const [show, setShow] = useState(false)

    const showAction = () => {
        setShow(show => !show)
    }

    return (
        <>
            <p className='mb-3'>
                Estado del pedido:{' '}
                <span
                    className={
                        pedido.state === 'created'
                            ? 'created'
                            : pedido.state === 'inProgress'
                            ? 'inProgress'
                            : pedido.state === 'finalized'
                            ? 'finalized'
                            : pedido.state === 'closed' && 'closed'
                    }
                >
                    {pedido.state === 'created'
                        ? 'Creado'
                        : pedido.state === 'inProgress'
                        ? 'En curso'
                        : pedido.state === 'finalized'
                        ? 'Finalizado'
                        : pedido.state === 'closed' && 'Cerrado'}
                </span>
            </p>
            <div className='stateChange'>
                <Button onClick={() => showAction()} variant='secondary' className='mb-3'>
                    Más información sobre los estados
                </Button>
                <div style={{ display: show ? 'block' : 'none' }} className='stateChangeInfo'>
                    <p className='mb-0'>
                        <small>
                            El equipo de comunicación podrá cambiar el estado de "Creado" a "En curso" y una vez finalizado lo
                            cambiará a "Finalizado".
                        </small>
                    </p>
                    <p className='mb-0'>
                        <small>
                            Si considerás que el trabajo está listo podrás cambiarle el estado a "Cerrado", esto hará que se deje
                            de visualizar en esta página.
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

            <DropdownButton variant='primary' drop='down' id='dropdown-basic-button' title='Cambiar estado'>
                {pedido.state === 'created' && (
                    <Dropdown.Item
                        onClick={() => {
                            changeState(pedido, pedido.state)
                        }}
                    >
                        En curso
                    </Dropdown.Item>
                )}
                {pedido.state === 'inProgress' && (
                    <Dropdown.Item
                        onClick={() => {
                            changeState(pedido, pedido.state)
                        }}
                    >
                        Finalizado
                    </Dropdown.Item>
                )}
                {pedido.state === 'finalized' && (
                    <Dropdown.Item
                        onClick={() => {
                            changeState(pedido, pedido.state)
                        }}
                    >
                        Cerrado
                    </Dropdown.Item>
                )}
            </DropdownButton>
        </>
    )
}

export default PedidosDetailsState
