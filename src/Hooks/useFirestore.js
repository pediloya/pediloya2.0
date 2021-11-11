import { useState, useEffect } from 'react'
import { projectFirestore, timestamp } from '../firebase'
import { useAuth } from '../Context/AuthContext'

export const useFirestoreColl = collection => {
    const [coll, setColl] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) return
        const unsub = projectFirestore
            .collection(collection)
            .orderBy('createAt', 'desc')
            .onSnapshot(snap => {
                if (snap.empty) return setColl([{ 'empty': true }])
                let documents = []
                snap.forEach(doc => {
                    documents.push({ ...doc.data() })
                })
                setColl(documents)
            })

        return () => unsub()
    }, [collection, currentUser])

    return { coll }
}

export const useFirestoreDoc = (collection, document) => {
    const [docs, setDocs] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) return
        if (!document || !collection) return
        const unsub = projectFirestore
            .collection(collection)
            .doc(document)
            .onSnapshot(snap => {
                snap.data() === undefined ? setDocs([]) : setDocs(snap.data())
            })

        return () => unsub()
    }, [collection, document, currentUser])

    return { docs }
}

export const useFirestoreCollWhere = (collection, whereKey, whereValue) => {
    const [docs, setDocs] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) return
        if (!collection || !whereKey || !whereValue) return
        const unsub = projectFirestore
            .collection(collection)
            .where(whereKey, '==', whereValue)
            .orderBy('createAt', 'desc')
            .onSnapshot(snap => {
                let documents = []
                if (snap.empty) return setDocs([{ 'empty': true }])
                snap.forEach(doc => {
                    documents.push(doc.data())
                })
                setDocs(documents)
            })

        return () => unsub()
    }, [collection, whereValue, whereKey, currentUser])

    return { docs }
}

export const useFirestoreCollWhereNoOrder = (collection, whereKey, whereValue) => {
    const [docs, setDocs] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) return
        if (!collection || !whereKey || !whereValue) return
        const unsub = projectFirestore
            .collection(collection)
            .where(whereKey, '==', whereValue)
            .onSnapshot(snap => {
                let documents = []
                if (snap.empty) return setDocs([{ 'empty': true }])
                snap.forEach(doc => {
                    documents.push(doc.data())
                })
                setDocs(documents)
            })

        return () => unsub()
    }, [collection, whereValue, whereKey, currentUser])

    return { docs }
}

export const newDocument = async (collection, data, userId) => {
    const createAt = timestamp()

    const projectColection = projectFirestore.collection(collection)

    return projectColection
        .add({
            ...data,
            userId,
            createAt,
        })
        .then(res => {
            projectColection.doc(res.id).update({
                id: res.id,
            })
        })
        .catch(err => console.log(err))
}

export const newDocumentCustomId = async (collection, document, data, userId) => {
    const createAt = timestamp()

    const projectColection = projectFirestore.collection(collection)
    const projectDoc = projectColection.doc(document)
    return projectDoc
        .set({
            ...data,
            createAt,
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateDocument = async (collection, data, docId) => {
    const createAt = timestamp()

    const projectColection = projectFirestore.collection(collection)
    const projectDoc = projectColection.doc(docId)

    return projectDoc
        .update({
            ...data,
            createAt,
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

export const deleteDocument = async (collection, docId) => {
    const projectColection = projectFirestore.collection(collection)
    const projectDoc = projectColection.doc(docId)

    return projectDoc
        .delete()
        .then(() => {
            console.log('document deleted')
        })
        .catch(err => console.log(err))
}
