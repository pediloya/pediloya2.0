import React, { useEffect } from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import { useAutors } from '../Context/AutorsContext'
import OutsideClickHandler from 'react-outside-click-handler'

const CrearPedidoInnerAutor = ({ secondSelect }) => {
    const {
        nameToggle,
        setNameToggle,
        emailToggle,
        setEmailToggle,
        emailCopyToggle,
        setEmailCopyToggle,

        autorName,
        handleAutorName,
        resetAutorName,
        setAutorName,

        autorEmail,
        handleAutorEmail,
        resetAutorEmail,
        setAutorEmail,

        resetEmailsToCopy,
        emailsToCopy,
        setEmailsToCopy,
        handleEmailsToCopy,

        emailsToCopyArray,
        handleEmailsToCopyArray,
        deleteFromCopyArray,
        setEmailsToCopyArray,

        autors,
        deleteName,
        deleteEmail,
        deleteEmailCopy,
    } = useAutors()

    useEffect(() => {
        resetAutorName()
        resetAutorEmail()
        resetEmailsToCopy()
        setEmailsToCopyArray([])
    }, [secondSelect])

    return (
        <>
            <h5>Autor</h5>
            <p>Completá tus datos</p>
            <Row>
                <Form.Group as={Col} className='formGroup withSuggestions'>
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setNameToggle(false)
                        }}
                    >
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            required
                            value={autorName}
                            onClick={() => {
                                setNameToggle(false)
                                setEmailToggle(false)
                                setEmailCopyToggle(false)
                            }}
                            onChange={e => handleAutorName(e)}
                        />
                        <span
                            className='material-icons dropDown'
                            onClick={() => {
                                setNameToggle(emailToggle => !emailToggle)
                            }}
                        >
                            arrow_drop_down
                        </span>
                        <div className={`suggestions names ${nameToggle ? 'show' : ''}`}>
                            <p>Sugerencias:</p>
                            {!autors ? (
                                <small>
                                    <em>
                                        Se guardará la información que completes para que la puedas utilizar en un próximo pedido
                                    </em>
                                </small>
                            ) : (
                                autors &&
                                autors?.autorName.map((name, id) => {
                                    return (
                                        <div key={id} className='inputSuggestionWrapper'>
                                            <p
                                                className='inputSuggestion'
                                                onClick={() => {
                                                    setAutorName(name)
                                                    setNameToggle(false)
                                                }}
                                            >
                                                {name}
                                            </p>
                                            <span onClick={() => deleteName(name)} title='Eliminar' className='material-icons'>
                                                close
                                            </span>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </OutsideClickHandler>
                </Form.Group>
                <Form.Group as={Col} className='formGroup withSuggestions'>
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setEmailToggle(false)
                        }}
                    >
                        <Form.Label>Correo Electrónico:</Form.Label>
                        <Form.Control
                            type='email'
                            required
                            value={autorEmail}
                            onChange={e => handleAutorEmail(e)}
                            onClick={() => {
                                setNameToggle(false)
                                setEmailToggle(false)
                                setEmailCopyToggle(false)
                            }}
                        />
                        <span
                            className='material-icons dropDown'
                            onClick={() => {
                                setEmailToggle(emailToggle => !emailToggle)
                            }}
                        >
                            arrow_drop_down
                        </span>
                        <div className={`suggestions names ${emailToggle ? 'show' : ''}`}>
                            <p>Sugerencias:</p>
                            {!autors ? (
                                <small>
                                    <em>
                                        Se guardará la información que completes para que la puedas utilizar en un próximo pedido
                                    </em>
                                </small>
                            ) : (
                                autors &&
                                autors?.autorEmail.map((email, id) => {
                                    return (
                                        <div key={id} className='inputSuggestionWrapper'>
                                            <p
                                                className='inputSuggestion'
                                                onClick={() => {
                                                    setAutorEmail(email)
                                                    setEmailToggle(false)
                                                }}
                                            >
                                                {email}
                                            </p>
                                            <span onClick={() => deleteEmail(email)} title='Eliminar' className='material-icons'>
                                                close
                                            </span>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </OutsideClickHandler>
                </Form.Group>
            </Row>
            <Form.Group className='withSuggestions'>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setEmailCopyToggle(false)
                    }}
                >
                    <Form.Label>Email para copia:</Form.Label>
                    <Form.Control
                        value={emailsToCopy}
                        onChange={e => handleEmailsToCopy(e)}
                        onKeyDown={e => handleEmailsToCopyArray(e)}
                        onClick={() => {
                            setEmailCopyToggle(false)
                        }}
                    />
                    <span
                        className='material-icons dropDown'
                        onClick={() => {
                            setEmailCopyToggle(emailCopyToggle => !emailCopyToggle)
                        }}
                    >
                        arrow_drop_down
                    </span>
                    <div className={`suggestions names ${emailCopyToggle ? 'show' : ''}`}>
                        <p>Sugerencias:</p>
                        {!autors ? (
                            <small>
                                <em>Se guardará la información que completes para poder utilizarla en un próximo pedido</em>
                            </small>
                        ) : autors?.emailsToCopy.length === 0 ? (
                            <small>
                                <em>Se guardará la información que completes para poder utilizarla en un próximo pedido</em>
                            </small>
                        ) : (
                            autors &&
                            autors.emailsToCopy.map((email, id) => {
                                return (
                                    <div key={id} className='inputSuggestionWrapper'>
                                        <p
                                            className='inputSuggestion'
                                            onClick={() => {
                                                setEmailsToCopy(email)
                                                setEmailCopyToggle(false)
                                            }}
                                        >
                                            {email}
                                        </p>
                                        <span onClick={() => deleteEmailCopy(email)} title='Eliminar' className='material-icons'>
                                            close
                                        </span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <small>Utilizá una coma "," o presiona la barra espaciadora para sumar más de un correo</small>
                    <div className='emailsToCopyWrapper'>
                        {emailsToCopyArray.length
                            ? emailsToCopyArray?.map((email, id) => {
                                  return (
                                      <div className='emailsToCopyList' key={id}>
                                          <span>{email}</span>
                                          <span onClick={() => deleteFromCopyArray(id)} className='material-icons'>
                                              clear
                                          </span>
                                      </div>
                                  )
                              })
                            : null}
                    </div>
                </OutsideClickHandler>
            </Form.Group>
        </>
    )
}

export default CrearPedidoInnerAutor
