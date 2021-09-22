import React from 'react'
import { Container } from 'react-bootstrap'

import DescargasCard from '../../Components/DescargasCard'

const Descargas = () => {
    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Descargas</h1>
                <p>Accedé a archivos que te pueden ser de utilidad</p>
            </div>
            <DescargasCard hasLink={false} />
        </Container>
    )
}

export default Descargas
