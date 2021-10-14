import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useCrearPedido } from '../Context/CrearPedidoContext'
import { useAutors } from '../Context/AutorsContext'
import { useTeamNotificationsContext } from '../Context/TeamNotificationsContext'
import { useTimeAhead } from '../Context/TimeAheadContext'
import { types } from '../Assets/data'
import CrearPedidoStepDayP from './DayPicker'
import CrearPedidoInnerAutor from '../Components/CrearPedidoInnerAutor'
import CustomIcons from '../Assets/img/CustomIcons'
import Loading from './Loading'

const CrearPedidoInnerRedes = () => {
    const { teamMembers } = useTeamNotificationsContext()

    const [teamMemberEmails, setTeamMemberEmails] = useState([])

    useEffect(() => {
        if (!teamMembers) return
        teamMembers.map(indiv => {
            if (!indiv.redes.on) return
            return setTeamMemberEmails(teamMemberEmails => [...teamMemberEmails, indiv.email])
        })
    }, [teamMembers])

    const { userName } = useAuth()
    const {
        uploading,
        error,
        handleDay,
        dayPickedFormated,
        secondSelect,
        handleSecondSelect,
        bindObservaciones,
        bindRedesText,
        bindRedesImg,
        toggle,
        setToggle,
        handleNewPedidoRedes,
    } = useCrearPedido()

    const { autorName, autorEmail, emailsToCopyArray, emailsToCopy, handleNewAutor } = useAutors()

    const { timeAheadRedes } = useTimeAhead()

    const { redes: redesType } = types

    const crearHandler = () => {
        if (emailsToCopyArray.length && !emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: emailsToCopyArray }
            handleNewAutor(autor)
            return handleNewPedidoRedes(autor)
        }
        if (emailsToCopyArray.length && emailsToCopy) {
            let autor = { autorName, autorEmail, emailsToCopy: [...emailsToCopyArray, emailsToCopy] }
            handleNewAutor(autor)
            return handleNewPedidoRedes(autor)
        }
        let autor = { autorName, autorEmail, emailsToCopy: [emailsToCopy] }
        handleNewAutor(autor)
        return handleNewPedidoRedes(autor)
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
                action='https://docs.google.com/forms/u/0/d/e/1FAIpQLSdodGlIvAt9gzqyjaWy3HLb71JS_aX-9tItUuhj5EuF9LBdvQ/formResponse'
                method='POST'
                target='hidden_iframe'
                onSubmit={() => (submitted = true)}
            >
                <input style={{ display: 'none' }} type='text' name='entry.46670146' defaultValue={userName.toUpperCase()} />
                <input
                    style={{ display: 'none' }}
                    type='text'
                    name='entry.94588554'
                    defaultValue={secondSelect ? secondSelect.name : null}
                />
                <h5>Detalles del pedido</h5>
                <p>Seleccioná donde se publicará</p>
                <div className='secondsStepInner' style={{ padding: '1rem' }}>
                    {redesType.map(types => {
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
                                    ? 'Hacé clic acá si preferís subir un documento a GoogleDrive o DropBox en lugar de completar el campos'
                                    : 'Hacé clic acá si preferís completar el campos en lugar de subir un documento a GoogleDrive o DropBox'}
                            </p>
                            <div className='toggle'>
                                <span className='material-icons'>{toggle ? 'toggle_on' : 'toggle_off'}</span>
                            </div>
                        </div>
                        <hr />
                        <Form.Group className='formGroup'>
                            <Form.Label>
                                {toggle ? 'Texto para la publicación:' : 'Enlace al texto para la publicación:'}
                            </Form.Label>
                            <Form.Control
                                as={toggle ? 'textarea' : 'input'}
                                style={{ height: toggle ? '116px' : '36px' }}
                                placeholder={!toggle ? 'https://drive.google.com/drive/my-drive' : null}
                                {...bindRedesText}
                                name={toggle ? 'entry.1127568324' : 'entry.802351799'}
                            />
                            <small>
                                {secondSelect?.id === 'twitter' || secondSelect?.id === 'ambas'
                                    ? 'Recordá que para twitter existe un limite de 280 caracteredes.'
                                    : ''}
                            </small>
                            {(secondSelect?.id === 'twitter' || secondSelect?.id === 'ambas') && toggle && (
                                <span> Caracteres: </span>
                            )}
                        </Form.Group>
                        <Form.Group className='formGroup'>
                            <Form.Label>Fotos o video:</Form.Label>
                            <Form.Control
                                {...bindRedesImg}
                                placeholder='https://drive.google.com/drive/my-drive'
                                name='entry.819190360'
                            />
                            <small>Subi las imagenes a GoogleDrive/DropBox y pega el enlace</small>
                        </Form.Group>

                        <hr />
                        <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                            <div>
                                <CrearPedidoStepDayP
                                    timeAhead={timeAheadRedes.time}
                                    label={'Fecha de publicación'}
                                    handleFunction={handleDay}
                                />
                            </div>
                            <div>
                                <CrearPedidoInnerAutor secondSelect={secondSelect} />
                            </div>
                        </div>
                        <input style={{ display: 'none' }} type='text' name='entry.202089936' defaultValue={dayPickedFormated} />
                        <input style={{ display: 'none' }} defaultValue={autorName} name='entry.744162503' type='text' />
                        <input style={{ display: 'none' }} defaultValue={autorEmail} name='entry.1872132768' type='text' />
                        <input
                            style={{ display: 'none' }}
                            type='text'
                            defaultValue={[...emailsToCopyArray, emailsToCopy, ...teamMemberEmails]}
                            name='entry.769180830'
                        />
                        <hr />
                        <Form.Group className='formGroup'>
                            <Form.Label>Observaciones:</Form.Label>
                            <Form.Control name='entry.1231824555' {...bindObservaciones} as='textarea' />
                        </Form.Group>
                        {error && (
                            <Form.Group className='formGroup'>
                                <Alert variant='danger'>{error}</Alert>
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Button disabled={uploading || submitted} type='submit'>
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

export default CrearPedidoInnerRedes
