import React from 'react'
import { useDescargas } from '../Context/DescargasContext'
import { useAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Loading from './Loading'

const includesQ = (string, test) => {
    return string.includes(test)
}

const showDescarga = (descarga, userType, deleteFunction) => {
    return (
        <div key={descarga.id} className='col-lg-2'>
            <div key={descarga.url} className='descarga'>
                <span className='material-icons big'>
                    {includesQ(descarga.type, 'pdf') || includesQ(descarga.type, 'postscript')
                        ? 'picture_as_pdf'
                        : includesQ(descarga.type, 'png') ||
                          includesQ(descarga.type, 'jpg') ||
                          includesQ(descarga.type, 'jpeg') ||
                          includesQ(descarga.type, 'svg')
                        ? 'image'
                        : includesQ(descarga.type, 'powerpoint') || includesQ(descarga.type, 'presentation')
                        ? 'slideshow'
                        : includesQ(descarga.type, 'msword') || includesQ(descarga.type, 'document')
                        ? 'description'
                        : includesQ(descarga.type, 'compressed') ||
                          includesQ(descarga.type, 'zip') ||
                          includesQ(descarga.type, 'rar') ||
                          includesQ(descarga.type, 'tar')
                        ? 'folder'
                        : 'file_download'}
                </span>
                <div className='descargaInfo'>
                    <p>{descarga.name}</p>
                    <p>{descarga.description}</p>
                </div>
                <div className='d-flex justify-content-between buttons w-100'>
                    <a className='btn btn-primary' href={descarga.url} rel='noreferrer' target='_blank' download={true}>
                        {userType !== 'admin' && ' Descargar'} <span className='material-icons'>download</span>
                    </a>
                    {userType === 'admin' && (
                        <Button variant='outline-danger'>
                            <span className='material-icons' onClick={() => deleteFunction(descarga)}>
                                delete
                            </span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

const DescargasCard = ({ hasLink }) => {
    const { descargas, deleteFileAndData } = useDescargas()
    const { userType } = useAuth()

    return (
        <Card>
            <Card.Header>
                <span className='material-icons'>file_download</span> Descargas
            </Card.Header>
            <Card.Body>
                <div className='descargas'>
                    {!descargas.length ? (
                        <Loading />
                    ) : descargas[0].empty ? (
                        'No hay descargas cargadas'
                    ) : (
                        <div className='row'>
                            {descargas.map(descarga => showDescarga(descarga, userType, deleteFileAndData))}
                        </div>
                    )}
                </div>
                {hasLink && (
                    <Button className='mt-3' as={Link} to={userType === 'reparticion' ? '/descargables' : '/editar-descargables'}>
                        Ir a descargas
                    </Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default DescargasCard
