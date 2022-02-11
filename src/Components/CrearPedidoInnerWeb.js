import React, { useState, useEffect } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useCrearPedido } from '../Context/CrearPedidoContext'
import { useAutors } from '../Context/AutorsContext'
import { useTeamNotificationsContext } from '../Context/TeamNotificationsContext'
import { useTimeAhead } from '../Context/TimeAheadContext'
import { types } from '../Assets/data'
import CrearPedidoStepDayP from './DayPicker'
import CrearPedidoInnerAutor from './CrearPedidoInnerAutor'
import CustomIcons from '../Assets/img/CustomIcons'
import Loading from './Loading'
import { useRef } from 'react'

const CrearPedidoInnerWeb = () => {
    const { userName } = useAuth()

    const {
        uploading,
        error,
        secondSelect,
        handleSecondSelect,
        bindObservaciones,
        handleDay,
        dayPickedFormated,
        bindWebTitle,
        bindWebDescription,
        bindWebBody,
        bindWebImg,
        bindWebLink,
        bindLinkToModify,
        bindWebChanges,
        handleNewPedidoWeb,
        toggle,
        setToggle,
    } = useCrearPedido()

    const { autorName, autorEmail, emailsToCopyArray, emailsToCopy, handleNewAutor } = useAutors()

    const { web: webType } = types

    const { timeAheadWeb } = useTimeAhead()

    const { teamMembers } = useTeamNotificationsContext()

    const crearHandler = () => {
        if (emailsToCopyArray.length && !emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: emailsToCopyArray }
            handleNewAutor(autor)
            return handleNewPedidoWeb(autor)
        }
        if (emailsToCopyArray.length && emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: [...emailsToCopyArray, emailsToCopy] }
            handleNewAutor(autor)
            return handleNewPedidoWeb(autor)
        }
        let autor = { autorName, autorEmail, emailsToCopy: [emailsToCopy] }

        handleNewAutor(autor)
        return handleNewPedidoWeb(autor)
    }

    const [teamMemberEmails, setTeamMemberEmails] = useState([])

    useEffect(() => {
        if (!teamMembers) return
        teamMembers.map(indiv => {
            if (!indiv.web.on) return
            return setTeamMemberEmails(teamMemberEmails => [...teamMemberEmails, indiv.email])
        })
    }, [teamMembers])

    const [emailsToCopyGoogleForm, setEmailsToCopyGoogleForm] = useState('')
    const emailsToCopyGoogleFormRef = useRef('')
    useEffect(() => {
        let allEmails = [autorEmail, ...emailsToCopyArray, emailsToCopy, ...teamMemberEmails].join()
        setEmailsToCopyGoogleForm(allEmails)
    }, [autorEmail, emailsToCopyArray, emailsToCopy, teamMemberEmails])

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
                action='https://docs.google.com/forms/u/0/d/e/1FAIpQLSejJZ9OrpcZQK7TED4eYyCd3ZmKo4butT6PezUd4-0mlIUCeA/formResponse'
                method='POST'
                onSubmit={() => {
                    submitted = true
                }}
                target='hidden_iframe'
            >
                <input style={{ display: 'none' }} type='text' name='entry.1077437764' defaultValue={userName.toUpperCase()} />
                <input
                    style={{ display: 'none' }}
                    type='text'
                    name='entry.2105596475'
                    defaultValue={secondSelect ? secondSelect.name : null}
                />
                <h5>Detalles del pedido</h5>
                <p>Seleccioná el solicitud</p>
                <div className='secondsStepInner' style={{ padding: '1rem' }}>
                    {webType.map(types => {
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
                                    ? 'Hacé clic acá si preferís subir un documento a GoogleDrive o DropBox en lugar de completar los campos'
                                    : 'Hacé clic acá si preferís completar los campos en lugar de subir un documento a GoogleDrive o DropBox'}
                            </p>
                            <div className='toggle'>
                                <span className='material-icons'>{toggle ? 'toggle_on' : 'toggle_off'}</span>
                            </div>
                        </div>
                        <hr />
                    </>
                )}
                {(secondSelect?.id === 'noticia' || secondSelect?.id === 'crear') && (
                    <>
                        {toggle ? (
                            <>
                                <Form.Group className='formGroup'>
                                    <Form.Label>Titulo:</Form.Label>
                                    <Form.Control name='entry.735352216' type='text' {...bindWebTitle} />
                                </Form.Group>
                                <Form.Group className='formGroup'>
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control name='entry.1930164017' {...bindWebDescription} as='textarea' />
                                </Form.Group>
                                <Form.Group className='formGroup'>
                                    <Form.Label>Cuerpo:</Form.Label>
                                    <Form.Control
                                        name='entry.2050237352'
                                        {...bindWebBody}
                                        as='textarea'
                                        style={{ height: '160px' }}
                                    />
                                </Form.Group>
                            </>
                        ) : (
                            <Form.Group className='formGroup'>
                                <Form.Label>Pega el enlace del documento:</Form.Label>
                                <Form.Control
                                    type='text'
                                    {...bindWebLink}
                                    placeholder='https://drive.google.com/drive/my-drive'
                                    name='entry.1036245016'
                                />
                                <small>
                                    Recordá que tanto las páginas como las noticias web deben contar con un titulo, una
                                    descripción y un cuerpo{' '}
                                </small>
                                <br />
                                <small>
                                    Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)
                                </small>
                            </Form.Group>
                        )}
                        <Form.Group className='formGroup'>
                            <Form.Label>Fotos:</Form.Label>
                            <Form.Control
                                name='entry.219220247'
                                type='text'
                                {...bindWebImg}
                                placeholder='https://drive.google.com/drive/my-drive'
                            />
                            <small>Subi las imagenes a GoogleDrive/DropBox y pega el enlace</small>
                            <br />
                            <small>Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)</small>
                        </Form.Group>
                    </>
                )}
                {secondSelect?.id === 'modificar' && (
                    <>
                        <Form.Group className='formGroup'>
                            <Form.Label>Enlace a la página a modificar:</Form.Label>
                            <Form.Control
                                name='entry.1182041502'
                                type='text'
                                {...bindLinkToModify}
                                placeholder='www.buenosaires.gob.ar/gobierno/...'
                            />

                            <small>Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)</small>
                        </Form.Group>
                        {toggle ? (
                            <Form.Group className='formGroup'>
                                <Form.Label>Cambios a realizar:</Form.Label>
                                <Form.Control
                                    name='entry.1589307612'
                                    {...bindWebChanges}
                                    as='textarea'
                                    style={{ height: '160px' }}
                                />
                            </Form.Group>
                        ) : (
                            <Form.Group className='formGroup'>
                                <Form.Label>Pega el enlace del documento:</Form.Label>
                                <Form.Control
                                    type='text'
                                    {...bindWebLink}
                                    placeholder='https://drive.google.com/drive/my-drive'
                                    name='entry.1036245016'
                                />
                                <small>
                                    Recordá que tanto las páginas como las noticias web deben contar con un titulo, una
                                    descripción y un cuerpo{' '}
                                </small>
                                <br />
                                <small>
                                    Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)
                                </small>
                            </Form.Group>
                        )}
                        <Form.Group className='formGroup'>
                            <Form.Label>Fotos:</Form.Label>
                            <Form.Control
                                name='entry.219220247'
                                type='text'
                                {...bindWebImg}
                                placeholder='https://drive.google.com/drive/my-drive'
                            />
                            <small>Subí las imagenes a GoogleDrive/DropBox y pega el enlace</small>
                            <br />
                            <small>Para ingresar más de un enlace hacelo separandolos con un coma (,) o punto y coma (;)</small>
                        </Form.Group>
                    </>
                )}
                {secondSelect && (
                    <>
                        <hr />
                        <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                            <div>
                                <CrearPedidoStepDayP
                                    timeAhead={timeAheadWeb.time}
                                    label={'Fecha de publicación'}
                                    handleFunction={handleDay}
                                />
                            </div>
                            <div>
                                <CrearPedidoInnerAutor secondSelect={secondSelect} />
                            </div>
                        </div>
                        <input style={{ display: 'none' }} type='text' name='entry.1448077462' defaultValue={dayPickedFormated} />
                        <input style={{ display: 'none' }} defaultValue={autorName} name='entry.320120026' type='text' />
                        <input style={{ display: 'none' }} defaultValue={autorEmail} name='entry.649866536' type='text' />
                        <input
                            style={{ display: 'none' }}
                            type='text'
                            value={emailsToCopyGoogleForm}
                            name='entry.1447671109'
                            onChange={() => void 0}
                            ref={emailsToCopyGoogleFormRef}
                        />
                        <hr />
                        <Form.Group className='formGroup'>
                            <Form.Label>Observaciones:</Form.Label>
                            <Form.Control name='entry.225857255' type='text' {...bindObservaciones} as='textarea' />
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

export default CrearPedidoInnerWeb
