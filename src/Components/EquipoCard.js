import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useEquipo } from '../Context/EquipoContext'
import { useAuth } from '../Context/AuthContext'
import Loading from './Loading'

const EquipoCard = ({ toggleSetter, memberSetter }) => {
    const { userType } = useAuth()
    const { equipo, deleteMember } = useEquipo()

    const handleEdit = member => {
        toggleSetter(true)
        memberSetter(member)
    }

    const handleDeleteMember = id => {
        deleteMember(id)
    }

    return (
        <Card className='mb-3'>
            <Card.Header>
                <span className='material-icons'>groups</span> Equipo de Comunicación del Ministerio de Gobierno
            </Card.Header>
            <Card.Body className='membsersCard'>
                {!equipo.length ? (
                    <Loading />
                ) : equipo[0].empty ? (
                    userType === 'admin' ? (
                        'No hay nadie cargado, empeza por cargar tus datos o los de un colega'
                    ) : (
                        'No hay miembros del equipo cargados'
                    )
                ) : (
                    <div className='members row'>
                        {equipo.map(member => {
                            return (
                                <div key={member.id} className='mb-3 col-md-4'>
                                    <div className='member'>
                                        <strong>{member.funcion}</strong>
                                        <p>
                                            <span className='material-icons bg'>person</span>
                                        </p>
                                        <p>{member.nombre}</p>
                                        <p className='hasIcon'>
                                            <span className='material-icons'>email</span> <span>Correo electrónico:</span>
                                            <a href={`mailto:${member.email}`}>{member.email}</a>
                                        </p>
                                        <p className='hasIcon'>
                                            <span className='material-icons'>call</span> <span>Tel:</span>
                                            <a href={`tel:${member.tel}`}>{member.tel}</a>
                                        </p>
                                        {userType === 'admin' && (
                                            <>
                                                <hr />
                                                <div className='memberButtons d-flex justify-content-between'>
                                                    <Button onClick={() => handleEdit(member)} variant='primary'>
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteMember(member.id)}
                                                        variant='outline-danger'
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default EquipoCard
