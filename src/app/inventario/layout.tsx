"use client";
import React from 'react'
import Sidebar from '../(componentes)/sidebar';

export default function InventoryDashboardLayout(
    { children, className }: { children?: React.ReactNode; className?: string }
){
  return (
    <Sidebar>{children}</Sidebar>
    )
}
