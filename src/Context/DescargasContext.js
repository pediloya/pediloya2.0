import React, { createContext, useContext, useState, useEffect } from 'react'
import { useFirestoreColl } from '../Hooks/useFirestore'

import { projectStorage, projectFirestore, timestamp } from '../firebase'

const DescargasContext = createContext()

const { Provider } = DescargasContext

export const useDescargas = () => {
    return useContext(DescargasContext)
}

export const DescargasProvider = ({ children }) => {
    const { coll } = useFirestoreColl('descargas')
    const [descargas, setDescargas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (coll) setDescargas(coll)
        if (coll && loading) {
            setLoading(false)
        }
    }, [coll, loading])

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')

    const uploadFile = (file, data, collection) => {
        const storageRef = projectStorage.ref(`descargas/${file.name}`)
        const collectionRef = projectFirestore.collection(collection)

        storageRef.put(file).on(
            'state_changed',
            snap => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
                setProgress(percentage)
            },
            err => {
                setError(err)
            },
            async () => {
                const url = await storageRef.getDownloadURL()
                const createAt = timestamp()
                collectionRef
                    .add({
                        url,
                        createAt,
                        ...data,
                    })
                    .then(res => {
                        collectionRef.doc(res.id).update({
                            id: res.id,
                        })
                    })
                    .catch(err => console.log(err))
                setProgress(0)
            }
        )
    }

    const deleteFileAndData = data => {
        const storageRef = projectStorage.ref(`descargas/${data.fileName}`)
        const collectionRef = projectFirestore.collection('descargas')
        const docRef = collectionRef.doc(data.id)

        storageRef
            .delete()
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        return docRef
            .delete()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const value = { descargas, uploadFile, progress, error, deleteFileAndData }
    return <Provider value={value}>{children}</Provider>
}
