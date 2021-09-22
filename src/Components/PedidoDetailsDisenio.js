import React from 'react'
import { isValidURL } from '../Assets/Regex'

const PedidoDetailsDisenio = ({ pedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan='2'>Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tipo de Pieza:</td>
                    <td>
                        {pedido.type === 'impresa'
                            ? 'Pieza Impresa'
                            : pedido.type === 'digital'
                            ? 'Pieza Digital'
                            : pedido.type === 'ambas'
                            ? 'Ambas'
                            : null}
                    </td>
                </tr>
                <tr>
                    <td>Fecha de entrega:</td>
                    <td>
                        <span className='bold'>{pedido.formatedDate}</span>
                    </td>
                </tr>
                <tr>
                    <td>Especificaciones:</td>
                    <td>{pedido.specs}</td>
                </tr>
                <tr>
                    <td>Texto para la pieza:</td>
                    <td>
                        {isValidURL(pedido.text) ? (
                            <a href={pedido.text} target='_blank' rel='noreferrer'>
                                {pedido.text}
                            </a>
                        ) : (
                            pedido.text
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Imágenes:</td>
                    <td>
                        <a href={pedido.img} target='_blank' rel='noreferrer'>
                            {pedido.img}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Observaciones:</td>
                    <td>{pedido.observaciones.toString()}</td>
                </tr>
            </tbody>
        </>
    )
}

export default PedidoDetailsDisenio
