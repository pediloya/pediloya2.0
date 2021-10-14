import React from 'react'
import { ThemeProvider } from '../StyleThemes/ThemeContext'
import { AuthProvider } from './AuthContext'
import { UserDataProvider } from './UserDataContext'
import { EquipoProvider } from './EquipoContext'
import { DescargasProvider } from './DescargasContext'
import { AsignPedidosProvider } from './AsignPedidosContext'
import { TimeAheadProvider } from './TimeAheadContext'

const AllAppProvider = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <UserDataProvider>
                    <EquipoProvider>
                        <DescargasProvider>
                            <AsignPedidosProvider>
                                <TimeAheadProvider>{children}</TimeAheadProvider>
                            </AsignPedidosProvider>
                        </DescargasProvider>
                    </EquipoProvider>
                </UserDataProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default AllAppProvider
