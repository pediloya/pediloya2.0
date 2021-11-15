import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useCrearPedido } from '../Context/CrearPedidoContext'
import { useAutors } from '../Context/AutorsContext'
import { useTeamNotificationsContext } from '../Context/TeamNotificationsContext'
import { types } from '../Assets/data'
import CustomIcons from '../Assets/img/CustomIcons'
import CrearPedidoInnerAutor from '../Components/CrearPedidoInnerAutor'
import Loading from './Loading'

const CrearPedidoInnerSomos = () => {
    const { teamMembers } = useTeamNotificationsContext()

    const [teamMemberEmails, setTeamMemberEmails] = useState([])

    useEffect(() => {
        if (!teamMembers) return
        /* console.log(teamMembers) */
        teamMembers.map(indiv => {
            if (!indiv.somos.on) return
            setTeamMemberEmails(teamMemberEmails => [...teamMemberEmails, indiv.email])
        })
    }, [teamMembers])

    const { userName } = useAuth()
    const {
        uploading,
        secondSelect,
        handleSecondSelect,
        bindSomosTitle,
        bindSomosText,
        bindSomosImg,
        bindObservaciones,
        toggle,
        setToggle,
        handleNewPedidoSomos,
    } = useCrearPedido()
    const { autorName, autorEmail, emailsToCopyArray, emailsToCopy, handleNewAutor } = useAutors()

    const { somos: somosType } = types

    const [emailsToCopyGoogleForm, setEmailsToCopyGoogleForm] = useState([])
    useEffect(() => {
        setEmailsToCopyGoogleForm([autorEmail, ...emailsToCopyArray, emailsToCopy, ...teamMemberEmails])
    }, [autorEmail, emailsToCopyArray, emailsToCopy, teamMemberEmails])

    let submitted = false
    const handleSubmit = e => {
        if (submitted) {
            return crearHandler(e)
        }
    }

    const crearHandler = e => {
        /* e.preventDefault() */
        if (emailsToCopyArray.length && !emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: emailsToCopyArray }
            handleNewAutor(autor)
            return handleNewPedidoSomos(autor)
        }
        if (emailsToCopyArray.length && emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: [...emailsToCopyArray, emailsToCopy] }
            handleNewAutor(autor)
            return handleNewPedidoSomos(autor)
        }
        let autor = { autorName, autorEmail, emailsToCopy: [emailsToCopy] }
        handleNewAutor(autor)
        return handleNewPedidoSomos(autor)
    }

    return (
        <>
            <iframe name='hidden_iframe' id='hidden_iframe' style={{ display: 'none' }} onLoad={() => handleSubmit()} />
            <Form
                action='https://docs.google.com/forms/u/0/d/e/1FAIpQLSdLY68GQsH43cKLC8M_CSRafqdYJ8KynvkkDxL6GvH3I4feTA/formResponse'
                method='POST'
                onSubmit={() => (submitted = true)}
                target='hidden_iframe'
                className='formSomos'
            >
                <input style={{ display: 'none' }} type='text' name='entry.1191510258' defaultValue={userName.toUpperCase()} />
                <input
                    style={{ display: 'none' }}
                    type='text'
                    name='entry.653104358'
                    defaultValue={secondSelect ? secondSelect.name : null}
                />
                <h5>Detalles del pedido</h5>
                <p>Seleccioná la sección del Somos</p>
                <div className='secondsStepInner' style={{ padding: '1rem' }}>
                    {somosType.map(types => {
                        return (
                            <div
                                onClick={() => handleSecondSelect(types)}
                                className={`secondStep ${types.id === secondSelect?.id ? 'active' : ''}`}
                                key={types.id}
                            >
                                {types.iconType === 'material' ? (
                                    <span className='material-icons'>{types.icon}</span>
                                ) : (
                                    <>
                                        <CustomIcons icon={types.id} />
                                    </>
                                )}
                                <p>{types.name}</p>
                            </div>
                        )
                    })}
                </div>
                {secondSelect && (
                    <>
                        <hr />
                        <div className='toggleWrapper' onClick={() => setToggle()}>
                            <p>
                                {toggle
                                    ? 'Hacé clic acá si preferís subir un documento a GoogleDrive o DropBox en lugar de completar el campo'
                                    : 'Hacé clic acá si preferís completar el campo en lugar de subir un documento a GoogleDrive o DropBox'}
                            </p>
                            <div className='toggle'>
                                <span className='material-icons'>{toggle ? 'toggle_on' : 'toggle_off'}</span>
                            </div>
                        </div>
                        <hr />

                        {toggle && (
                            <Form.Group className='formGroup'>
                                <Form.Label>Titulo: </Form.Label>
                                <Form.Control name='entry.2068313159' {...bindSomosTitle} type='text' />
                            </Form.Group>
                        )}
                        <Form.Group className='formGroup'>
                            <Form.Label>
                                {toggle ? 'Texto para la noticia:' : 'Link al documento en GoogleDrive/DropBox:'}
                            </Form.Label>
                            <Form.Control
                                {...bindSomosText}
                                placeholder={!toggle ? 'https://drive.google.com/drive/my-drive' : null}
                                as={toggle ? 'textarea' : 'input'}
                                style={toggle ? { height: '120px' } : { height: '38px' }}
                                name={!toggle ? 'entry.773539176' : 'entry.1308838814'}
                            />
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label>Fotos o video:</Form.Label>
                            <Form.Control
                                name='entry.1771714475'
                                {...bindSomosImg}
                                placeholder='https://drive.google.com/drive/my-drive'
                            />
                            <small>Subi las imagenes a GoogleDrive/DropBox y pega el enlace</small>
                            <br />
                            <small>Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)</small>
                        </Form.Group>

                        <hr />
                        <Form.Group className='formGroup'>
                            <CrearPedidoInnerAutor secondSelect={secondSelect} />
                        </Form.Group>
                        <input style={{ display: 'none' }} defaultValue={autorName} name='entry.547838011' type='text' />
                        <input style={{ display: 'none' }} defaultValue={autorEmail} name='entry.1045104532' type='text' />
                        <input
                            style={{ display: 'none' }}
                            type='text'
                            defaultValue={emailsToCopyGoogleForm}
                            name='entry.1253816459'
                        />
                        <hr />
                        <Form.Group className='formGroup'>
                            <Form.Label>Observaciones:</Form.Label>
                            <Form.Control name='entry.992272211' {...bindObservaciones} as='textarea' />
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={uploading} type='submit'>
                                Crear
                            </Button>
                        </Form.Group>
                        {uploading && <Loading />}
                    </>
                )}
            </Form>
        </>
    )
}

export default CrearPedidoInnerSomos
