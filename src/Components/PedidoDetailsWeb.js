import React from 'react'
import { isValidURL } from '../Assets/Regex'

const PedidoDetailsWeb = ({ pedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan='2'>Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tipo de pedido:</td>
                    <td>
                        {pedido.type === 'noticia'
                            ? 'Noticia web'
                            : pedido.type === 'crear'
                            ? 'Crear contenido'
                            : pedido.type === 'modificar' && 'Modificar contenido'}
                    </td>
                </tr>
                <tr>
                    <td>
                        Fecha de{' '}
                        {pedido.type === 'noticia' || 'crear' ? 'publicación' : pedido.type === 'modificar' && 'modificación'}:
                    </td>
                    <td>
                        <span className='bold'>{pedido.fomatedDate || pedido.formatedDate}</span>
                    </td>
                </tr>
                {pedido.type === 'noticia' ? (
                    pedido.title ? (
                        <>
                            <tr>
                                <td>Titulo:</td>
                                <td>{pedido.title}</td>
                            </tr>
                            <tr>
                                <td>Descripción:</td>
                                <td>{pedido.description}</td>
                            </tr>
                            <tr>
                                <td>Cuerpo:</td>
                                <td>{pedido.body}</td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Enlace al contenido:</td>
                            <td>{pedido.linkToContent}</td>
                        </tr>
                    )
                ) : pedido.type === 'crear' ? (
                    pedido.title ? (
                        <>
                            <tr>
                                <td>Titulo:</td>
                                <td>{pedido.title}</td>
                            </tr>
                            <tr>
                                <td>Descripción:</td>
                                <td>{pedido.description}</td>
                            </tr>
                            <tr>
                                <td>Cuerpo:</td>
                                <td>{pedido.body}</td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Enlace al contenido:</td>
                            <td>
                                <a href={pedido.linkToContent} target='_blank' rel='noreferrer'>
                                    {pedido.linkToContent}
                                </a>
                            </td>
                        </tr>
                    )
                ) : (
                    <>
                        <tr>
                            <td>Web a modificar:</td>
                            <td>
                                <a href={pedido.webToModify} target='_blank' rel='noreferrer'>
                                    {pedido.webToModify}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Cambios a realizar:</td>
                            <td>{isValidURL(pedido.changes) ? <a href={pedido.changes}>{pedido.changes}</a> : pedido.changes}</td>
                        </tr>
                    </>
                )}

                <tr>
                    <td>Imágenes:</td>
                    <td>
                        <a href={pedido.img} target='_blank' rel='noreferrer'>
                            {pedido.img}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Observaciones</td>
                    <td>{pedido.observaciones}</td>
                </tr>
            </tbody>
        </>
    )
}

export default PedidoDetailsWeb
