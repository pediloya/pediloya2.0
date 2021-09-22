import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import EquipoCard from '../../Components/EquipoCard'
import Suggestions from '../../Components/Suggestions'

const Equipo = () => {
    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Equipo</h1>
                <p>Conocé al equipo de Comunicación del Ministerio de Gobierno</p>
            </div>
            <Row>
                <Col xl={8}>
                    <EquipoCard />
                </Col>
                <Col xl={4}>
                    <Suggestions />
                </Col>
            </Row>
        </Container>
    )
}

export default Equipo
