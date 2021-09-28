import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { useAuth } from '../Context/AuthContext'
import AllMainProvider from '../Context/AllMainProvider'

import Login from './Login'
import NotFound from './NotFound'

import CustomSwitch from '../HOC/CustomSwitch'
import Admin from '../Views/Admin/Admin'
import User from '../Views/User/User'

const Main = () => {
    const { loading, userType } = useAuth()

    return loading ? (
        'loading'
    ) : (
        <Switch>
            <Route exact path='/login' component={Login} />
            {userType ? (
                <AllMainProvider>
                    <CustomSwitch test={userType}>
                        <Admin switchValue='admin' />
                        <User switchValue='reparticion' />
                    </CustomSwitch>
                </AllMainProvider>
            ) : (
                <Redirect to='/login' />
            )}
            <Route component={NotFound} />
        </Switch>
    )
}

export default Main
