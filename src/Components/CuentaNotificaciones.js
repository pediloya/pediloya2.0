import React, { useState, useEffect } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { useUserData } from '../Context/UserDataContext'

const CuentaNotificaciones = () => {
    const { loading, userData, updateNotifications } = useUserData()

    const [emailNotifications, setEmailNotifications] = useState(null)
    const [notificationsDone, setNotificationsDone] = useState(false)

    useEffect(() => {
        if (!userData.length) return
        if (userData[0].empty) return
        setEmailNotifications(userData[0].emailNotifications)
        setNotificationsDone(true)
    }, [userData])

    const handleEmailNotifyConfig = notifyId => {
        const elementsIndex = emailNotifications.findIndex(element => element.id === notifyId)
        let newArray = [...emailNotifications]
        newArray[elementsIndex] = { ...newArray[elementsIndex], on: !newArray[elementsIndex].on }
        setEmailNotifications(newArray)
    }

    const handleUpdateEmailNotifications = e => {
        e.preventDefault()
        updateNotifications('emailNotifications', emailNotifications, userData[0].id)
    }

    return loading ? null : userData[0].empty ? null : !notificationsDone ? null : (
        <Row>
            <Col>
                <Card className='mb-3'>
                    <Card.Header>
                        <span className='material-icons'>notifications</span> Notificaciones por email
                    </Card.Header>
                    <Card.Body>
                        <Form className='notificationsConfig' onSubmit={e => handleUpdateEmailNotifications(e)}>
                            {emailNotifications.map(notify => {
                                return (
                                    <Form.Group
                                        onClick={() => handleEmailNotifyConfig(notify.id)}
                                        key={notify.id}
                                        className='formGroup '
                                    >
                                        <Form.Label>
                                            <div className='notificationConfig'>
                                                <span className='material-icons'>{notify.icon}</span> {notify.name}
                                            </div>
                                            {notify.on ? (
                                                <span className='material-icons text-success'>toggle_on</span>
                                            ) : (
                                                <span className='material-icons text-danger'>toggle_off</span>
                                            )}
                                        </Form.Label>
                                    </Form.Group>
                                )
                            })}
                            <Form.Group>
                                <Button type='submit' onClick={e => e.preventDefault}>
                                    Guardar
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default CuentaNotificaciones
