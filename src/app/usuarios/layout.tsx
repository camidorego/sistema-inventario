"use client"
import React from 'react'
import Sidebar from '../(componentes)/sidebar'

export default function UsuariosLayout(
    {children}: {children: React.ReactNode}
) {
    return (
        <Sidebar>{children}</Sidebar>
    )
}
