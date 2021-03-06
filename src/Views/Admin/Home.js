import React from 'react'
import { Link } from 'react-router-dom'
import { useAllPedidos } from '../../Context/AllPedidosContext'
import { Container, Row, Col } from 'react-bootstrap'
import PedidosPreview from '../../Components/PedidosPreview'
import AccountData from '../../Components/AccountData'
import DescargasCard from '../../Components/DescargasCard'
import CuentaNotificaciones from '../../Components/CuentaNotificaciones'
import CuentaUpdateData from '../../Components/CuentaUpdateData'
import CuentaTimeAhead from '../../Components/CuentaTimeAhead'
import CuentaUpdatePassword from '../../Components/CuentaUpdatePassword'

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
                <Col md={12}>
                    <h3 className='mb-4'>Accesos rápidos</h3>
                </Col>
                <Col lg={6} xl={4}>
                    <AccountData hasLink={true} />
                    <CuentaUpdatePassword hasToggle={true} />
                </Col>
                <Col lg={6} xl={4}>
                    <CuentaUpdateData hasToggle={true} />
                </Col>
                <Col lg={12} xl={4}>
                    <CuentaNotificaciones hasToggle={true} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home
