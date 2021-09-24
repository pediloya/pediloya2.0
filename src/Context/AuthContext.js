import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { proyectAuth, googleProvider, linkWithRedirect, auth, signInWithRedirect, deleteUser } from '../firebase'
/* import { useHistory } from 'react-router' */

const AuthContext = createContext()

const { Provider } = AuthContext

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    /* CHECKS IF LOGED IN */
    useEffect(() => {
        const unsubscribe = proyectAuth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    /* SING UP FUNCTION */
    function signup(email, password) {
        return proyectAuth.createUserWithEmailAndPassword(email, password)
    }

    /* LOGIN FUNCTION */
    function login(email, password) {
        return proyectAuth.signInWithEmailAndPassword(email, password)
    }

    /* LOG OUT FUNCTION */
    function logout() {
        setLoading(true)
        return proyectAuth.signOut()
    }

    const [googleLinkError, setGoogleLinkError] = useState('')
    function connectGoogleAccount() {
        linkWithRedirect(currentUser, googleProvider)
            .then(msg => {
                console.log(msg)
            })
            .catch(err => {
                setGoogleLinkError('Esta cuenta ya está asociada a una cuenta de google')
                console.log(err)
            })
    }

    function signupWithGoogle() {
        signInWithRedirect(auth, googleProvider)
    }

    function deleteUserFution() {
        deleteUser(currentUser)
            .then(() => {
                // User deleted.
            })
            .catch(error => {
                // An error ocurred
                // ...
            })
    }

    /* UPDATE PASSWORD */
    const [updatePasswordError, setUpdatePasswordError] = useState('')
    const updatePassword = newPassword => {
        currentUser
            .updatePassword(newPassword)
            .then(() => {
                logout()
            })
            .catch(err => {
                console.log(err)
                setUpdatePasswordError(err.code)
            })
    }

    const [userType, setUserType] = useState('')
    const [userName, setUserName] = useState('')
    const [userConfig, setUserConfig] = useState({})

    const configs = useMemo(() => {
        return {
            adminConfig: { admin: true, creatUsers: true, seeRequest: 'all' },
            equipoConfig: { admin: false, creatUsers: false, seeRequest: 'all' },
            reparticionConfig: { admin: false, creatUsers: false, seeRequest: 'own' },
        }
    }, [])

    useEffect(() => {
        if (!currentUser) return

        let email = currentUser.email
        let prevType = email.split('@')[1]
        let type = email.split('@')[1].split('.')[1]

        let name = email.split('@')[0]
        let theConfig = `${type}Config`

        /* console.log('email => ', email)
        console.log('type => ', type)
        console.log('prevType => ', prevType)
        console.log('name => ', name)
        console.log('theConfig => ', theConfig) */

        if (prevType === 'gmail.com') {
            alert(
                'Solo es posible ingresar con Gmail si asociaste tu cuenta a una cuenta de Gmail, para esto ingresá primero con usuario y contraseña y asociá tu cuenta en el panel de Usuario'
            )
            deleteUserFution()

            return logout()
        }

        setUserName(name)
        setUserType(type)

        setUserConfig(configs[theConfig])
    }, [currentUser, setUserType, setUserConfig, setUserName, configs])

    const value = {
        loading,
        currentUser,
        userType,
        userName,
        userConfig,

        signup,
        login,
        logout,
        updatePassword,
        updatePasswordError,
        connectGoogleAccount,
        signupWithGoogle,
        googleLinkError,
        setGoogleLinkError,
    }

    return <Provider value={value}>{!loading && children}</Provider>
}
