import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useTeamNotificationsContext } from '../Context/TeamNotificationsContext'
import { useCrearPedido } from '../Context/CrearPedidoContext'
import { useAutors } from '../Context/AutorsContext'
import { useTimeAhead } from '../Context/TimeAheadContext'
import { types } from '../Assets/data'
import CustomIcons from '../Assets/img/CustomIcons'
import CrearPedidoStepDayP from './DayPicker'
import CrearPedidoInnerAutor from './CrearPedidoInnerAutor'
import Loading from './Loading'

const CrearPedidoInnerDisenio = () => {
    const { teamMembers } = useTeamNotificationsContext()

    const [teamMemberEmails, setTeamMemberEmails] = useState([])

    useEffect(() => {
        if (!teamMembers) return
        teamMembers.map(indiv => {
            if (!indiv.disenio.on) return
            return setTeamMemberEmails(teamMemberEmails => [...teamMemberEmails, indiv.email])
        })
    }, [teamMembers])

    const { userName } = useAuth()

    const { timeAheaDisenio } = useTimeAhead()

    const { disenio: disenioType } = types

    const {
        uploading,
        error,
        secondSelect,
        handleSecondSelect,
        bindObservaciones,
        handleDay,
        dayPickedFormated,
        bindDisenioSpecs,
        bindDisenioText,
        bindDisenioImg,
        handleNewPedidoDisenio,
        toggle,
        setToggle,
    } = useCrearPedido()
    const { autorName, autorEmail, emailsToCopyArray, emailsToCopy, handleNewAutor } = useAutors()

    const [emailsToCopyGoogleForm, setEmailsToCopyGoogleForm] = useState([])
    const emailsToCopyGoogleFormRef = useRef()
    useEffect(() => {
        let allEmails = [autorEmail, ...emailsToCopyArray, emailsToCopy, ...teamMemberEmails].join()
        setEmailsToCopyGoogleForm(allEmails)
    }, [autorEmail, emailsToCopyArray, emailsToCopy, teamMemberEmails])

    const crearHandler = () => {
        if (emailsToCopyArray.length && !emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: emailsToCopyArray }
            handleNewAutor(autor)
            return handleNewPedidoDisenio(autor)
        }
        if (emailsToCopyArray.length && emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: [...emailsToCopyArray, emailsToCopy] }
            handleNewAutor(autor)
            return handleNewPedidoDisenio(autor)
        }
        let autor = { autorName, autorEmail, emailsToCopy: [emailsToCopy] }
        handleNewAutor(autor)
        return handleNewPedidoDisenio(autor)
    }

    let submitted = false
    const handleSubmit = () => {
        if (submitted) {
            return crearHandler()
        }
    }

    return (
        <>
            <iframe
                title='hidden_iframe'
                name='hidden_iframe'
                id='hidden_iframe'
                style={{ display: 'none' }}
                onLoad={() => handleSubmit()}
            />
            <Form
                action='https://docs.google.com/forms/u/0/d/e/1FAIpQLSdsHMQ3BAhoEiqBPaty-DGXY-IH2Owms6xrXxq3YHfL3cDkSQ/formResponse'
                method='POST'
                target='hidden_iframe'
                onSubmit={() => (submitted = true)}
            >
                <input style={{ display: 'none' }} type='text' name='entry.501714493' defaultValue={userName.toUpperCase()} />
                <input
                    style={{ display: 'none' }}
                    type='text'
                    name='entry.1222511702'
                    defaultValue={secondSelect ? secondSelect.name : null}
                />
                <h5>Detalles del pedido</h5>
                <p>Seleccioná el tipo de pieza</p>
                <div className='secondsStepInner' style={{ padding: '1rem' }}>
                    {disenioType.map(types => {
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
                        <Form.Group className='formGroup'>
                            <Form.Label>Especificaciones:</Form.Label>
                            <Form.Control
                                required
                                placeholder='Pieza para facebook, Mailing, Banner Web, Firma para mail, Flyer doble faz, Banner Roll Up, Libro, Revista, Diploma, etc...'
                                as='textarea'
                                style={{ height: '86px' }}
                                {...bindDisenioSpecs}
                                name='entry.1835372215'
                            />
                        </Form.Group>
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
                        <Form.Group className='formGroup'>
                            <Form.Label>{toggle ? 'Texto para la pieza:' : 'Enlace al texto para la pieza:'}</Form.Label>
                            <Form.Control
                                required
                                as={toggle ? 'textarea' : 'input'}
                                style={toggle ? { height: '120px' } : { height: '38px' }}
                                placeholder={toggle ? '' : 'https://drive.google.com/drive/my-drive'}
                                {...bindDisenioText}
                                name={toggle ? 'entry.1363177458' : 'entry.1613931701'}
                            />
                            {!toggle ? (
                                <small>
                                    Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)
                                </small>
                            ) : null}
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label>Imagenes de referencia:</Form.Label>
                            <Form.Control
                                placeholder='https://drive.google.com/drive/my-drive'
                                {...bindDisenioImg}
                                name='entry.1832041010'
                            />
                            <small>Subi las imagenes a GoogleDrive/DropBox y pega el enlace</small>
                            <br />
                            <small>Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)</small>
                        </Form.Group>
                        <hr />
                        <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                            <div>
                                <CrearPedidoStepDayP
                                    timeAhead={timeAheaDisenio.time}
                                    label={'Fecha estimada de entrega del original'}
                                    handleFunction={handleDay}
                                />
                            </div>
                            <div>
                                <CrearPedidoInnerAutor secondSelect={secondSelect} />
                            </div>
                        </div>
                        <input style={{ display: 'none' }} type='text' name='entry.1255300086' defaultValue={dayPickedFormated} />
                        <input style={{ display: 'none' }} type='text' name='entry.888631821' defaultValue={autorName} />
                        <input style={{ display: 'none' }} defaultValue={autorEmail} name='entry.1167985937' type='text' />
                        <input
                            style={{ display: 'none' }}
                            type='text'
                            value={emailsToCopyGoogleForm}
                            onChange={() => void 0}
                            ref={emailsToCopyGoogleFormRef}
                            name='entry.772927010'
                        />
                        <hr />
                        <Form.Group className='formGroup'>
                            <Form.Label>Observaciones:</Form.Label>
                            <Form.Control name='entry.1715429093' {...bindObservaciones} as='textarea' />
                        </Form.Group>
                        {error && (
                            <Form.Group className='formGroup'>
                                <Alert variant='danger'>{error}</Alert>
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Button disabled={uploading} type='submit'>
                                Crear
                            </Button>
                        </Form.Group>
                    </>
                )}
                {uploading && <Loading />}
            </Form>
        </>
    )
}

export default CrearPedidoInnerDisenio
