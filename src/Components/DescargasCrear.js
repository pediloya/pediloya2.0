import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap'
import { useDescargas } from '../Context/DescargasContext'

const DescargasCrear = () => {
    const { uploadFile, progress, error: uploadError } = useDescargas()

    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [uploadValue, setUploadValue] = useState('')
    const [error, setError] = useState('')

    const allowedTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/svg+xml',
        'application/postscript',
        'application/pdf',
        'application/msword',
        'application/x-7z-compressed',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar-compressed',
        'application/x-tar',
        'application/vnd.rar',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ]

    const handleName = e => {
        setName(e.target.value)
    }
    const handleDescription = e => {
        setDescription(e.target.value)
    }

    const onUploadChangeFunction = e => {
        let selected = e.target.files[0]
        let allowed = allowedTypes.includes(selected.type)
        if (!allowed && selected.type !== '' && !selected.name.includes('rar')) {
            setUploadValue('')
            setFile(null)
            return setError('Tipo de archivo no permitido')
        }
        if (selected.size > 25000000) {
            setUploadValue('')
            setFile(null)
            return setError('El archivo no puede superar los 25MB')
        }
        setUploadValue(selected.name)
        setFile(selected)
        setError('')
        if (selected.type === '') return setType('.rar')
        setType(selected.type)
    }
    const handleUploadDescarga = async e => {
        e.preventDefault()
        let data = {
            name,
            description,
            type,
            fileName: uploadValue,
            empty: false,
        }

        await uploadFile(file, data, 'descargas')
        if (uploadError) setError(uploadError)
        if (uploadError) return console.log(uploadError)
    }

    useEffect(() => {
        if (progress !== 100) return
        setFile(null)
        setName('')
        setType('')
        setDescription('')
        setUploadValue('')
    }, [progress])

    return (
        <Card>
            <Card.Header>
                <span className='material-icons'>add_circle</span> Subí una nueva opción de descarga
            </Card.Header>
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={e => handleUploadDescarga(e)}>
                    <Form.Group className='formGroup'>
                        <Form.Label>Nombre del archivo</Form.Label>
                        <Form.Control value={name} onChange={e => handleName(e)} type='text' />
                    </Form.Group>
                    <Form.Group className='formGroup'>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control value={description} onChange={e => handleDescription(e)} type='text' />
                    </Form.Group>
                    <Form.Group className='formGroup'>
                        <Form.Label>Archivo</Form.Label>
                        <div className='customUploadWrapper'>
                            <span className='customUpload'>{uploadValue ? uploadValue : 'No se cargó ningún archivo'}</span>
                            <Form.Control
                                className='form-file'
                                type='file'
                                onChange={e => onUploadChangeFunction(e)}
                                key={progress}
                            />
                        </div>
                        <ProgressBar className='my-3' now={Math.round(progress)} />
                        <small>
                            Archivos permitidos: .jpg / .jpeg / .png / .svg / .ai / .doc / .ppt / .pdf / .rar / .zip / .7z
                        </small>
                    </Form.Group>
                    <Form.Group className='formGroup'>
                        <Button className='btnWithIcon' type='submit'>
                            Subir <span className='material-icons'>file_upload</span>
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default DescargasCrear
