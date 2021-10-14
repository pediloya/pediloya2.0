import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { usePedidosState } from '../Context/PedidosStateContext'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import PedidosDetailsStateInfo from '../Components/PedidosDetailsStateInfo'

const PedidosDetailsState = ({ pedido }) => {
    const { userType } = useAuth()

    const { changeState, autoCloseState } = usePedidosState()

    useEffect(() => {
        if (!pedido.stateChangeTimestamp) return
        let stateChange = pedido.stateChangeTimestamp.seconds * 1000
        let now = new Date().getTime()
        let diff = now - stateChange
        let days = Math.floor(diff / (24 * 60 * 60 * 1000))
        if (days < 8) return
        if (pedido.state === 'finalized') autoCloseState(pedido)
    }, [])

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
            <PedidosDetailsStateInfo />
            {pedido.state !== 'closed' && (
                <DropdownButton variant='primary' drop='down' id='dropdown-basic-button' title='Cambiar estado'>
                    {pedido.state === 'created' && (
                        <Dropdown.Item
                            disabled={userType === 'reparticion'}
                            onClick={() => {
                                changeState(pedido, pedido.state)
                            }}
                        >
                            En curso
                        </Dropdown.Item>
                    )}
                    {pedido.state === 'inProgress' && (
                        <Dropdown.Item
                            disabled={userType === 'reparticion'}
                            onClick={() => {
                                changeState(pedido, pedido.state)
                            }}
                        >
                            Finalizado
                        </Dropdown.Item>
                    )}
                    {pedido.state === 'finalized' && (
                        <Dropdown.Item
                            disabled={userType === 'admin'}
                            onClick={() => {
                                changeState(pedido, pedido.state)
                            }}
                        >
                            Cerrado
                        </Dropdown.Item>
                    )}
                </DropdownButton>
            )}
        </>
    )
}

export default PedidosDetailsState
