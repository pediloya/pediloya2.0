import React, { createContext, useContext, useState, useEffect } from 'react'
import { useFirestoreDoc, newDocumentCustomId, updateDocument } from '../Hooks/useFirestore'
import { useAuth } from './AuthContext'

const AutorsContext = createContext()

const { Provider } = AutorsContext

export const useAutors = () => {
    return useContext(AutorsContext)
}

export const AutorsProviders = ({ children }) => {
    const { currentUser } = useAuth()

    const [nameToggle, setNameToggle] = useState(false)
    const [emailToggle, setEmailToggle] = useState(false)
    const [emailCopyToggle, setEmailCopyToggle] = useState(false)

    const [autorName, setAutorName] = useState('')
    const [autorEmail, setAutorEmail] = useState('')

    const [emailsToCopy, setEmailsToCopy] = useState('')
    const [emailsToCopyArray, setEmailsToCopyArray] = useState([])

    const handleEmailsToCopy = e => {
        setEmailsToCopy(e.target.value)
    }
    const handleEmailsToCopyArray = e => {
        const { key } = e
        const trimmedInput = emailsToCopy.trim()
        const duplicate = emailsToCopyArray.includes(emailsToCopy)
        const empty = ''
        if (key === ',' || key === ' ') {
            if (duplicate || trimmedInput === empty) {
                e.preventDefault()
                return setEmailsToCopy('')
            }
            e.preventDefault()
            setEmailsToCopyArray(prevState => [...prevState, trimmedInput])
            setEmailsToCopy('')
        }
    }

    const deleteFromCopyArray = index => {
        setEmailsToCopyArray(prevState => prevState.filter((tag, i) => i !== index))
    }

    const resetEmailsToCopy = () => {
        setEmailsToCopy('')
    }

    const handleAutorName = e => {
        setAutorName(e.target.value)
    }
    const resetAutorName = () => {
        setAutorName('')
    }
    const handleAutorEmail = e => {
        setAutorEmail(e.target.value)
    }
    const resetAutorEmail = () => {
        setAutorEmail('')
    }

    const { docs } = useFirestoreDoc('autors', `${currentUser?.uid}-autors`)
    const [autors, setAutors] = useState(null)

    useEffect(() => {
        setAutors(docs)
    }, [docs])

    useEffect(() => {
        if (!currentUser) return
        if (docs.length === 0) {
            newDocumentCustomId(
                'autors',
                `${currentUser.uid}-autors`,
                {
                    autorName: [],
                    autorEmail: [],
                    emailsToCopy: [],
                    userId: currentUser.uid,
                },
                currentUser.uid
            )
        }
    }, [])

    const handleNewAutor = autor => {
        const { autorName, autorEmail, emailsToCopy } = autor
        if (autors) {
            let data = {
                autorName: autors?.autorName.includes(autorName) ? autors.autorName : [...autors.autorName, autorName],
                autorEmail: autors?.autorEmail.includes(autorEmail) ? autors.autorEmail : [...autors.autorEmail, autorEmail],
                emailsToCopy: [...autors?.emailsToCopy.filter(val => !emailsToCopy.includes(val)), ...emailsToCopy],
                userId: currentUser.uid,
            }
            return updateDocument('autors', data, `${currentUser.uid}-autors`)
        }
        let data = {
            autorName: [autorName],
            autorEmail: [autorEmail],
            emailsToCopy,
            userId: currentUser.uid,
        }
        newDocumentCustomId('autors', `${currentUser.uid}-autors`, data, currentUser.uid)
    }

    const deleteName = name => {
        let autorsName = autors.autorName
        let index = autorsName.indexOf(name)
        if (index > -1) autorsName.splice(index, 1)

        let data = {
            autorName: autorsName,
            autorEmail: autors.autorEmail,
            emailsToCopy: autors.emailsToCopy,
            userId: currentUser.uid,
        }

        return newDocumentCustomId('autors', `${currentUser.uid}-autors`, data, currentUser.uid)
    }
    const deleteEmail = email => {
        let autorsEmail = autors.autorEmail
        let index = autorsEmail.indexOf(email)
        if (index > -1) autorsEmail.splice(index, 1)

        let data = {
            autorName: autors.autorName,
            autorEmail: autorsEmail,
            emailsToCopy: autors.emailsToCopy,
            userId: currentUser.uid,
        }

        return newDocumentCustomId('autors', `${currentUser.uid}-autors`, data, currentUser.uid)
    }
    const deleteEmailCopy = emailCopy => {
        let autorsEmailCopy = autors.emailsToCopy
        let index = autorsEmailCopy.indexOf(emailCopy)
        if (index > -1) autorsEmailCopy.splice(index, 1)

        let data = {
            autorName: autors.autorName,
            autorEmail: autors.autorEmail,
            emailsToCopy: autorsEmailCopy,
            userId: currentUser.uid,
        }

        return newDocumentCustomId('autors', `${currentUser.uid}-autors`, data, currentUser.uid)
    }

    const value = {
        nameToggle,
        setNameToggle,
        emailToggle,
        setEmailToggle,
        emailCopyToggle,
        setEmailCopyToggle,

        autorName,
        setAutorName,
        autorEmail,
        setAutorEmail,

        handleAutorName,
        handleAutorEmail,
        resetAutorName,
        resetAutorEmail,

        emailsToCopyArray,
        emailsToCopy,

        resetEmailsToCopy,
        handleEmailsToCopy,
        handleEmailsToCopyArray,
        deleteFromCopyArray,
        setEmailsToCopy,
        setEmailsToCopyArray,

        autors,
        handleNewAutor,

        deleteName,
        deleteEmail,
        deleteEmailCopy,
    }

    return <Provider value={value}>{children}</Provider>
}
