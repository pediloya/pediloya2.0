import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DescargasCard from '../../Components/DescargasCard'
import DescargasCrear from '../../Components/DescargasCrear'

const EditarDescargas = () => {
    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Editar Descargas</h1>
                <p>Administrá la página de descargas</p>
                <h4>Subí archivos que pueden ser de utilidad para los usuarios de la plataforma</h4>
            </div>
            <Row>
                <Col xl={8}>
                    <DescargasCard hasLink={false} />
                </Col>
                <Col xl={4}>
                    <DescargasCrear />
                </Col>
            </Row>
        </Container>
    )
}

export default EditarDescargas
