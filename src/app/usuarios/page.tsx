import React from 'react'
import Usuarios from './(componentes)/usuarios'

export default function UsuariosPage() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1 className="text-4xl font-bold text-center text-[#0F1108]">
                Gestion de Usuarios
            </h1>
            <Usuarios />
        </div>
    )
}
