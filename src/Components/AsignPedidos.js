import React from 'react'
import { useAsignPedidosProvider } from '../Context/AsignPedidosContext'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const AsignPedidos = ({ pedido }) => {
    const { valideUsers, asignPedido } = useAsignPedidosProvider()

    return (
        <DropdownButton title='Asignar pedido a' variant='primary' drop='down' id='dropdown-basic-button'>
            {valideUsers.map(valideUser => {
                return (
                    <Dropdown.Item
                        onClick={() =>
                            asignPedido(pedido, {
                                userName: valideUser.name,
                                userId: valideUser.id,
                                currentUserId: valideUser.userId,
                            })
                        }
                        key={valideUser.id}
                    >
                        {valideUser.name}
                    </Dropdown.Item>
                )
            })}
        </DropdownButton>
    )
}

export default AsignPedidos
