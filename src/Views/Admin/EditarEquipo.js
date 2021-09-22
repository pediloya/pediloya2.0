import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import EquipoCard from '../../Components/EquipoCard'
import EquipoCrearMiembro from '../../Components/EquipoCrearMiembro'
import EquipoEditMember from '../../Components/EquipoEditMember'

const EditarEquipo = () => {
    const [toggleEdit, setToggleEdit] = useState(false)
    const [memberSelected, setMemberSelected] = useState(null)

    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Editar Equipo</h1>
                <p>Creá o edita la información de contacto del equipo de Comunicación del Ministerio</p>
                <h4>Esta información será visible dentro de la plataforma para todos los usuarios</h4>
            </div>
            <Row>
                <Col xl={8}>
                    <EquipoCard toggleValue={toggleEdit} toggleSetter={setToggleEdit} memberSetter={setMemberSelected} />
                </Col>
                <Col xl={4}>
                    {toggleEdit ? (
                        <EquipoEditMember toggleSetter={setToggleEdit} memberSelected={memberSelected} />
                    ) : (
                        <EquipoCrearMiembro />
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default EditarEquipo
