import React from 'react'
import { Link } from 'react-router-dom'
import { useAllPedidos } from '../../Context/AllPedidosContext'
import { Container, Row, Col } from 'react-bootstrap'
import PedidosPreview from '../../Components/PedidosPreview'
import AccountData from '../../Components/AccountData'
import DescargasCard from '../../Components/DescargasCard'

const Home = () => {
    const { pedidos } = useAllPedidos()

    return (
        <Container as='main' fluid className='home'>
            <div className='mainIntro'>
                <h1>Bienvenido a Pedilo YA 2.0</h1>
                <h4>Monitoreá los pedidos de todas las áreas en tiempo real</h4>
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
                    <Link to='/editar-descargables'>Cargá</Link> los manuales de marca y contenidos web de GCBA.
                </p>
                <p>
                    Edita la información del <Link to='/editar-equipo'>Equipo de Comunicación</Link> del Ministerio.{' '}
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
