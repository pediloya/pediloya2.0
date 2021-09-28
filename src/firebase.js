import firebase from 'firebase/compat/app'
import { getAuth, linkWithRedirect, GoogleAuthProvider, signInWithRedirect, deleteUser, unlink } from 'firebase/auth'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const apiKey = process.env.REACT_APP_API_KEY
const authDomain = process.env.REACT_APP_AUTH_DOMAIN
const projectId = process.env.REACT_APP_PROJECT_ID
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID
const appId = process.env.REACT_APP_APP_ID

const config = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
}

firebase.initializeApp(config)

const proyectAuth = firebase.auth()
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {
    proyectAuth,
    projectStorage,
    projectFirestore,
    timestamp,
    auth,
    linkWithRedirect,
    googleProvider,
    signInWithRedirect,
    deleteUser,
    unlink,
}
