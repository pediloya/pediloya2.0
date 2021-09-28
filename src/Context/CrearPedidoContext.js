import React, { createContext, useContext, useState, useEffect } from 'react'
import { projectFirestore, timestamp } from '../firebase'
import { useAuth } from './AuthContext'
import { useHistory } from 'react-router'
import useInput from '../Hooks/useInput'
import useToggle from '../Hooks/useToggle'

const CrearPedidoContext = createContext()

const { Provider } = CrearPedidoContext

export const useCrearPedido = () => {
    return useContext(CrearPedidoContext)
}

export const CrearPedidoProvider = ({ children }) => {
    const { currentUser, userName } = useAuth()

    const [error, setError] = useState('')
    const [uploading, setUploading] = useState(false)

    const [pedidoType, setPedidoType] = useState(null)
    const [secondSelect, setSecondSelect] = useState(null)

    const [toggle, setToggle, resetToggle] = useToggle(true)

    /* ALL */
    const [observaciones, bindObservaciones, resetObservaciones] = useInput('')
    const [dayPicked, setDayPicked] = useState(null)
    const [dayPickedFormated, setDayPickedFormated] = useState(null)
    const handleDay = (day, formatedDay) => {
        setDayPicked(day)
        setDayPickedFormated(formatedDay)
    }

    /* diseño */
    const [disenioSpecs, bindDisenioSpecs, resetDisenioSpecs] = useInput('')
    const [disenioText, bindDisenioText, resetDisenioText] = useInput('')
    const [disenioImg, bindDisenioImg, resetDisenioImg] = useInput('')

    /* web (noticia y nuevo contenido) */
    const [webTitle, bindWebTitle, resetWebTitle] = useInput('')
    const [webDescription, bindWebDescription, resetWebDescription] = useInput('')
    const [webBody, bindWebBody, resetWebBody] = useInput('')
    const [webImg, bindWebImg, resetWebImg] = useInput('')
    const [webLink, bindWebLink, resetWebLink] = useInput('')
    /* web modificar */
    const [webLinkToModify, bindLinkToModify, resetLinkToModify] = useInput('')
    const [webChanges, bindWebChanges, resetWebChanges] = useInput('')

    /* redes */
    const [redesText, bindRedesText, resetRedesText] = useInput('')
    const [redesImg, bindRedesImg, resetRedesImg] = useInput('')

    /* somos */
    const [somosTitle, bindSomosTitle, resetSomosTitle] = useInput('')
    const [somosText, bindSomosText, resetSomosText] = useInput('')
    const [somosImg, bindSomosImg, resetSomosImg] = useInput('')

    const handlePedidoType = selected => {
        if (selected === pedidoType) {
            setSecondSelect(null)
            return setPedidoType(null)
        }
        setPedidoType(selected)
        setSecondSelect(null)
    }

    useEffect(() => {
        return () => {
            handlePedidoType(null)
        }
    }, [])

    const handleSecondSelect = selected => {
        if (selected === secondSelect) return setSecondSelect(null)
        setSecondSelect(selected)
    }
    /* reset toggle when pedido type change */
    useEffect(() => {
        resetToggle()
    }, [pedidoType])

    /* resets inputs when changing inner types of request */
    useEffect(() => {
        if (!pedidoType) return
        resetObservaciones()
        resetToggle()
        if (pedidoType.id === 'disenio') {
            setDayPicked(null)
            resetDisenioSpecs()
            resetDisenioText()
            return resetDisenioImg()
        }
        if (pedidoType.id === 'web') {
            setDayPicked(null)
            resetWebTitle()
            resetWebDescription()
            resetWebBody()
            resetWebImg()
            resetWebLink()
            resetLinkToModify()
            return resetWebChanges()
        }
        if (pedidoType.id === 'redes') {
            setDayPicked(null)
            resetRedesText()
            return resetRedesImg()
        }
        if (pedidoType.id === 'somos') {
            setDayPicked(null)
            resetSomosText()
            return resetSomosImg()
        }
    }, [secondSelect])

    /* reset inputs when toggle */
    useEffect(() => {
        if (!pedidoType) return
        if (pedidoType.id === 'disenio') return resetDisenioText()
        if (pedidoType.id === 'web') {
            resetWebTitle()
            resetWebDescription()
            resetWebBody()
            return resetWebLink()
        }
        if (pedidoType.id === 'redes') return resetRedesText()
        if (pedidoType.id === 'somos') {
            resetSomosText()
            return resetSomosTitle()
        }
    }, [toggle])

    /* error handeling when a day is pick */
    useEffect(() => {
        setError('')
    }, [dayPicked])

    const handleNewPedidoDisenio = async autor => {
        if (!dayPicked) return setError('Seleccioná una fecha')
        setUploading(true)
        const data = {
            pedido: 'disenio',
            area: userName,
            type: secondSelect.id,
            specs: disenioSpecs,
            text: disenioText,
            img: disenioImg,
            date: dayPicked,
            formatedDate: dayPickedFormated,
            observaciones,
            autor: autor,
            empty: false,
            state: 'created',
        }
        const userId = currentUser.uid
        try {
            setError('')
            newDocumentPedido('pedidos', data, userId)
        } catch {
            setError('error')
        }
        return
    }

    const handleNewPedidoWeb = async autor => {
        if (!dayPicked) return setError('Seleccioná una fecha')
        setUploading(true)
        if (webLinkToModify || webChanges) {
            /* modificar  */
            if (webChanges) {
                let data = {
                    pedido: 'web',
                    area: userName,
                    type: secondSelect.id,
                    webToModify: webLinkToModify,
                    changes: webChanges,
                    img: webImg,
                    date: dayPicked,
                    formatedDate: dayPickedFormated,
                    observaciones,
                    autor: autor,
                    state: 'created',
                }
                const userId = currentUser.uid
                try {
                    setError('')
                    newDocumentPedido('pedidos', data, userId)
                } catch {
                    setError('error')
                }
                return
            }
            if (webLink) {
                let data = {
                    pedido: 'web',
                    area: userName,
                    type: secondSelect.id,
                    webToModify: webLinkToModify,
                    changes: webLink,
                    img: webImg,
                    date: dayPicked,
                    fomartedDate: dayPickedFormated,
                    observaciones,
                    autor: autor,
                    state: 'created',
                }
                const userId = currentUser.uid
                try {
                    setError('')
                    newDocumentPedido('pedidos', data, userId)
                } catch {
                    setError('error')
                }
                return
            }
        }
        if (webLink) {
            /* noticia o nuevo contenido con link */
            let data = {
                area: userName,
                pedido: 'web',
                type: secondSelect.id,
                linkToContent: webLink,
                img: webImg,
                date: dayPicked,
                formatedDate: dayPickedFormated,
                observaciones,
                autor: autor,
                state: 'created',
            }
            const userId = currentUser.uid

            try {
                setError('')
                newDocumentPedido('pedidos', data, userId)
            } catch {
                setError('error')
            }
            return
        }
        let data = {
            /* noticia o nuevo contenido con campos */
            area: userName,
            pedido: 'web',
            type: secondSelect.id,
            title: webTitle,
            description: webDescription,
            body: webBody,
            img: webImg,
            date: dayPicked,
            formatedDate: dayPickedFormated,
            observaciones,
            autor: autor,
            state: 'created',
        }
        const userId = currentUser.uid
        try {
            setError('')
            newDocumentPedido('pedidos', data, userId)
        } catch {
            setError('error')
        }
        return
    }

    const handleNewPedidoRedes = async autor => {
        setUploading(true)
        const data = {
            pedido: 'redes',
            area: userName,
            type: secondSelect.id,
            text: redesText,
            img: redesImg,
            date: dayPicked,
            formatedDate: dayPickedFormated,
            observaciones,
            autor: autor,
            state: 'created',
        }
        const userId = currentUser.uid
        try {
            setError('')
            newDocumentPedido('pedidos', data, userId)
        } catch {
            setError('error')
        }
        return
    }

    const handleNewPedidoSomos = async autor => {
        setUploading(true)
        if (somosTitle) {
            const data = {
                pedido: 'somos',
                area: userName,
                type: secondSelect.id,
                title: somosTitle,
                text: somosText,
                img: somosImg,
                observaciones,
                autor: autor,
                state: 'created',
            }
            const userId = currentUser.uid

            try {
                setError('')
                newDocumentPedido('pedidos', data, userId)
            } catch {
                setError('error')
            }
            return
        }
        const data = {
            pedido: 'somos',
            area: userName,
            type: secondSelect.id,
            text: somosText,
            img: somosImg,
            observaciones,
            autor: autor,
            state: 'created',
        }
        const userId = currentUser.uid
        try {
            setError('')
            newDocumentPedido('pedidos', data, userId)
        } catch {
            setError('error')
        }
    }

    const history = useHistory()
    const [id, setId] = useState(null)
    const newDocumentPedido = async (collection, data, userId) => {
        const createAt = timestamp()

        const projectColection = projectFirestore.collection(collection)

        return projectColection
            .add({
                ...data,
                userId,
                createAt,
            })
            .then(res => {
                setId(res.id)
                projectColection.doc(res.id).update({
                    id: res.id,
                })
                setUploading(false)
                history.push(`/pedido/${res.id}`)
            })
            .catch(err => console.log(err))
    }

    const value = {
        uploading,

        handlePedidoType,
        pedidoType,
        secondSelect,
        handleSecondSelect,
        error,

        bindObservaciones,
        handleDay,
        dayPickedFormated,

        toggle,
        setToggle,

        bindDisenioSpecs,
        bindDisenioText,
        bindDisenioImg,
        handleNewPedidoDisenio,

        bindWebTitle,
        bindWebDescription,
        bindWebBody,
        bindWebImg,
        bindWebLink,
        bindLinkToModify,
        bindWebChanges,
        handleNewPedidoWeb,

        bindRedesText,
        bindRedesImg,
        handleNewPedidoRedes,

        bindSomosTitle,
        bindSomosText,
        bindSomosImg,
        handleNewPedidoSomos,
    }
    return <Provider value={value}>{children}</Provider>
}
