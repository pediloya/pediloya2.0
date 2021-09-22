import { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import emailjs from 'emailjs-com'
import { Card, Form, Button } from 'react-bootstrap'

const Suggestions = () => {
    const { userName } = useAuth()

    const serviceId = process.env.REACT_APP_API_YOUR_SERVICE_ID
    const templateId = process.env.REACT_APP_API_YOUR_TEMPLATE_ID
    const userId = process.env.REACT_APP_API_YOUR_USER_ID

    const [suggestionMessage, setSuggestionMessage] = useState('')

    const handleSuggestionMessage = value => {
        setSuggestionMessage(value)
    }

    const handleSubmitSuggestion = e => {
        let templateParams = {
            message: suggestionMessage,
            name: userName,
        }
        e.preventDefault()
        emailjs.send(serviceId, templateId, templateParams, userId).then(
            result => {
                console.log(result.text)
            },
            error => {
                console.log(error.text)
            }
        )
        setSuggestionMessage('')
    }

    return (
        <Card>
            <Card.Header>
                <span className='material-icons'>thumbs_up_down</span> Dejanos una sugerencia para la plataforma
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmitSuggestion}>
                    <Form.Group className='formGroup'>
                        <p className='mb-0'>¿Considerás que podemos mejorar algo de la plataforma?</p>
                        <p className='mb-0'>¿Encontraste un error o bug?</p>
                        <p>¡Avisanos!</p>
                        <Form.Label>Mensaje:</Form.Label>
                        <Form.Control
                            value={suggestionMessage}
                            onChange={e => handleSuggestionMessage(e.target.value)}
                            as='textarea'
                            style={{ height: '137px' }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit'>Enviar</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Suggestions
