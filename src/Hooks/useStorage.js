import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, timestamp } from '../firebase'

const useStorage = (start, collection, file, data) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')

    const uploadFile = (file, data, collection) => {
        const storageRef = projectStorage.ref(file.name)
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
                collectionRef.add({
                    url,
                    createAt,
                    ...data,
                })
                setUrl(url)
                setProgress(0)
            }
        )
    }

    useEffect(() => {
        if (!file) return
        const storageRef = projectStorage.ref(file.name)
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
                collectionRef.add({
                    url,
                    createAt,
                    ...data,
                })
                setUrl(url)
                setProgress(0)
            }
        )
    }, [start])

    return { progress, url, error }
}

export default useStorage
