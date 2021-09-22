import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { usePedidos } from '../../Context/PedidosContext'
import PedidosPreview from '../../Components/PedidosPreview'
import DescargasCard from '../../Components/DescargasCard'
import AccountData from '../../Components/AccountData'

const Home = () => {
    const { pedidos } = usePedidos()

    return (
        <Container fluid as='main' className='home'>
            <div className='mainIntro'>
                <h1>Bienvenido a Pedilo YA 2.0</h1>
                <h4>Creá y monitoreá los pedidos de tu área en tiempo real</h4>
            </div>
            <PedidosPreview pedidos={pedidos} />
            <div className='homeQuote'>
                <hr />
                <h5>¡Estamos mejorando la dinamica de nuestra comunicación!</h5>
                <p>
                    A través de esta plataforma pedí diseños, publicaciones en redes, noticias web y hacenos llegar tus novedades
                    para Somos.
                </p>
                <p>
                    <Link to='/descargables'>Consulta</Link> los manuales de marca y contenidos web de GCBA.
                </p>
                <p>
                    Y conocé al <Link to='/equipo'>Equipo de Comunicación</Link> del Ministerio.{' '}
                </p>
                <hr />
            </div>
            <Row>
                <Col md={5}>
                    <AccountData hasLink={true} />
                </Col>
                <Col md={4}>
                    <DescargasCard hasLink={true} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home
