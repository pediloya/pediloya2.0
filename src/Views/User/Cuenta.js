import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import AccountData from '../../Components/AccountData'
import CuentaUpdatePassword from '../../Components/CuentaUpdatePassword'
import CuentaUpdateData from '../../Components/CuentaUpdateData'

const Cuenta = () => {
    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Cuenta</h1>
                <h4>Configurá tu usuario</h4>
            </div>
            <Row>
                <Col lg={5}>
                    <AccountData hasLink={false} />
                    <CuentaUpdatePassword />
                </Col>
                <Col lg={7}>
                    <CuentaUpdateData />
                </Col>
            </Row>
        </Container>
    )
}

export default Cuenta
