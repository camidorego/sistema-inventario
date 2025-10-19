"use client";
import React from 'react'
import Sidebar from '../(componentes)/sidebar';

export default function RequestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <Sidebar>{children}</Sidebar>
    )
}