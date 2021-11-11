import React from 'react'
import { isMoreThanOneUrl, isValidURL } from '../Assets/Regex'

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
                        <span className='bold'>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</span>
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
                            <td>
                                {isMoreThanOneUrl(pedido.linkToContent) ? (
                                    pedido.linkToContent.split(/[,;]+/).map(url => {
                                        return (
                                            <a href={url} target='_blank' rel='noreferrer'>
                                                {url}
                                            </a>
                                        )
                                    })
                                ) : (
                                    <a href={pedido.linkToContent} target='_blank' rel='noreferrer'>
                                        {pedido.linkToContent}
                                    </a>
                                )}
                            </td>
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
                                {isMoreThanOneUrl(pedido.linkToContent) ? (
                                    pedido.linkToContent.split(/[,;]+/).map(url => {
                                        return (
                                            <a href={url} target='_blank' rel='noreferrer'>
                                                {url}
                                            </a>
                                        )
                                    })
                                ) : (
                                    <a href={pedido.linkToContent} target='_blank' rel='noreferrer'>
                                        {pedido.linkToContent}
                                    </a>
                                )}
                            </td>
                        </tr>
                    )
                ) : (
                    <>
                        <tr>
                            <td>Web a modificar:</td>
                            <td>
                                {isMoreThanOneUrl(pedido.webToModify) ? (
                                    pedido.webToModify.split(/[,;]+/).map(url => {
                                        return (
                                            <a href={url} target='_blank' rel='noreferrer'>
                                                {url}
                                            </a>
                                        )
                                    })
                                ) : (
                                    <a href={pedido.webToModify} target='_blank' rel='noreferrer'>
                                        {pedido.webToModify}
                                    </a>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Cambios a realizar:</td>
                            <td>
                                {isValidURL(pedido.changes) ? (
                                    isMoreThanOneUrl(pedido.changes) ? (
                                        pedido.changes.split(/[,;]+/).map(url => {
                                            return (
                                                <a href={url} target='_blank' rel='noreferrer'>
                                                    {url}
                                                </a>
                                            )
                                        })
                                    ) : (
                                        <a href={pedido.changes}>{pedido.changes}</a>
                                    )
                                ) : (
                                    pedido.changes
                                )}
                            </td>
                        </tr>
                    </>
                )}

                <tr>
                    <td>Imágenes:</td>
                    <td>
                        {isMoreThanOneUrl(pedido.img) ? (
                            pedido.img.split(/[,;]+/).map(url => {
                                return (
                                    <a href={url} target='_blank' rel='noreferrer'>
                                        {url}
                                    </a>
                                )
                            })
                        ) : (
                            <a href={pedido.img} target='_blank' rel='noreferrer'>
                                {pedido.img}
                            </a>
                        )}
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
