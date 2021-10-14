import React from 'react'
/* import { useAuth } from '../../Context/AuthContext' */
import { Container /* , Card */, Row, Col } from 'react-bootstrap'

import CuentaNotificaciones from '../../Components/CuentaNotificaciones'
import CuentaUpdateData from '../../Components/CuentaUpdateData'
import CuentaUpdatePassword from '../../Components/CuentaUpdatePassword'
import AccountData from '../../Components/AccountData'
import CuentaTimeAhead from '../../Components/CuentaTimeAhead'

const Cuenta = () => {
    return (
        <Container fluid as='main' className='cuenta'>
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
                    <CuentaNotificaciones />
                    <CuentaTimeAhead />
                </Col>
            </Row>
        </Container>
    )
}

export default Cuenta
