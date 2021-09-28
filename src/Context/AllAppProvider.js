import React from 'react'
import { ThemeProvider } from '../StyleThemes/ThemeContext'
import { AuthProvider } from './AuthContext'
import { UserDataProvider } from './UserDataContext'
import { EquipoProvider } from './EquipoContext'
import { DescargasProvider } from './DescargasContext'
import { AsignPedidosProvider } from './AsignPedidosContext'

const AllAppProvider = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <UserDataProvider>
                    <EquipoProvider>
                        <DescargasProvider>
                            <AsignPedidosProvider>{children}</AsignPedidosProvider>
                        </DescargasProvider>
                    </EquipoProvider>
                </UserDataProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default AllAppProvider
