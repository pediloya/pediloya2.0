import React, { useState, useEffect } from 'react'
import { Card, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { useUserData } from '../Context/UserDataContext'
import Loading from './Loading'

const CuentaNotificaciones = ({ hasToggle }) => {
    const { loading, userData, updateNotifications, updateNotifLoading, successMess } = useUserData()

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

    const [isToggle, setIsToggle] = useState(false)

    const toggle = () => {
        if (hasToggle) setIsToggle(isToggle => !isToggle)
    }

    return loading ? null : userData[0].empty ? null : !notificationsDone ? null : (
        <Row>
            <Col>
                <Card className={hasToggle ? 'w-100 mb-3 withToggle' : 'w-100 mb-3'}>
                    <Card.Header>
                        <div>
                            <span className='material-icons'>notifications</span> Notificaciones por email
                        </div>
                        {hasToggle && (
                            <div onClick={() => toggle()}>
                                <span className='material-icons'>{isToggle ? 'expand_less' : 'expand_more'}</span>
                            </div>
                        )}
                    </Card.Header>
                    <Card.Body className={isToggle ? 'show' : 'notShow'}>
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
                            {successMess && <Alert variant='success'>{successMess}</Alert>}
                            {updateNotifLoading && <Loading />}
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
