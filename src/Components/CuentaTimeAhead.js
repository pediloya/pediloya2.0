import React, { useState, useEffect } from 'react'
import { useTimeAhead } from '../Context/TimeAheadContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import Loading from './Loading'

const CuentaTimeAhead = () => {
    const { timeAheadWeb, timeAheadRedes, timeAheaDisenio, changeTimeAhead, loading, successMess } = useTimeAhead()

    const [disenioCheck, setDisenioCheck] = useState(0)
    const [webCheck, setWebCheck] = useState(0)
    const [redesCheck, setRedesCheck] = useState(0)

    const [error, setError] = useState('')

    let checkListDisenio = [
        { id: 'disenio-0', class: 'disenio', name: 'Diseño', value: 0 },
        { id: 'disenio-5', class: 'disenio', name: 'Diseño', value: 5 },
        { id: 'disenio-10', class: 'disenio', name: 'Diseño', value: 10 },
        { id: 'disenio-15', class: 'disenio', name: 'Diseño', value: 15 },
    ]
    let checkListWeb = [
        { id: 'web-0', class: 'web', name: 'Web', value: 0 },
        { id: 'web-5', class: 'web', name: 'Web', value: 5 },
        { id: 'web-10', class: 'web', name: 'Web', value: 10 },
        { id: 'web-15', class: 'web', name: 'Web', value: 15 },
    ]
    let checkListRedes = [
        { id: 'redes-0', class: 'redes', name: 'Redes', value: 0 },
        { id: 'redes-5', class: 'redes', name: 'Redes', value: 5 },
        { id: 'redes-10', class: 'redes', name: 'Redes', value: 10 },
        { id: 'redes-15', class: 'redes', name: 'Redes', value: 15 },
    ]

    useEffect(() => {
        if (!timeAheaDisenio.time) return
        setDisenioCheck(timeAheaDisenio.time)
    }, [timeAheaDisenio])

    useEffect(() => {
        if (!timeAheadWeb.time) return
        setWebCheck(timeAheadWeb.time)
    }, [timeAheadWeb])

    useEffect(() => {
        if (!timeAheadRedes.time) return
        setRedesCheck(timeAheadRedes.time)
    }, [timeAheadRedes])

    const disenioChangeHandler = e => {
        setError('')
        setDisenioCheck(parseInt(e.target.value))
    }
    const webChangeHandler = e => {
        setError('')
        setWebCheck(parseInt(e.target.value))
    }
    const redesChangeHandler = e => {
        setError('')
        setRedesCheck(parseInt(e.target.value))
    }
    const handleSaveTimeAhead = e => {
        e.preventDefault()
        if (timeAheadWeb.time === webCheck && timeAheadRedes.time === redesCheck && timeAheaDisenio.time === disenioCheck)
            return setError('No realizaste ningún cambio, primero cambiá el lapso de algún tipo de pedido para guardar el cambio')
        let data = {
            disenio: { time: disenioCheck },
            web: { time: webCheck },
            redes: { time: redesCheck },
        }
        changeTimeAhead(data)
    }

    return (
        <Card className='timeAhead'>
            <Card.Header>
                <span className='material-icons'>hourglass_full</span>Controlá el lapso de tiempo para cada tipo de pedido
            </Card.Header>
            <Card.Body>
                <div className='timeAheadHeadRow'>
                    <p>Tipo de pedido</p>
                    <p>0 días</p>
                    <p>5 días</p>
                    <p>10 días</p>
                    <p>15 días</p>
                </div>
                <Form onSubmit={e => handleSaveTimeAhead(e)}>
                    <Form.Group>
                        <Form.Label>Diseño</Form.Label>
                        {checkListDisenio.map(check => {
                            return (
                                <Form.Check
                                    type='radio'
                                    key={check.id}
                                    name={check.class}
                                    className={check.id}
                                    value={check.value}
                                    onChange={e => disenioChangeHandler(e)}
                                    checked={check.value === disenioCheck}
                                />
                            )
                        })}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Web</Form.Label>
                        {checkListWeb.map(check => {
                            return (
                                <Form.Check
                                    type='radio'
                                    key={check.id}
                                    name={check.class}
                                    className={check.id}
                                    value={check.value}
                                    onChange={e => webChangeHandler(e)}
                                    checked={check.value === webCheck}
                                />
                            )
                        })}
                    </Form.Group>
                    <Form.Group className='formGroup'>
                        <Form.Label>Redes</Form.Label>
                        {checkListRedes.map(check => {
                            return (
                                <Form.Check
                                    type='radio'
                                    key={check.id}
                                    name={check.class}
                                    className={check.id}
                                    value={check.value}
                                    onChange={e => redesChangeHandler(e)}
                                    checked={check.value === redesCheck}
                                />
                            )
                        })}
                    </Form.Group>
                    {loading && <Loading />}
                    {successMess && <Alert variant='success'>{successMess}</Alert>}
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Button type='submit'>Guardar</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CuentaTimeAhead
