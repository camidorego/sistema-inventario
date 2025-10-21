import React from 'react'
import ItemList from './(componentes)/itemList';
import Productos from './(componentes)/productos';


export default function InventoryPage() {
  return (
    <div className="h-full">
      <h1 className="text-4xl font-bold text-center text-[#0F1108]">
        Sistema de Inventario y Solicitudes
      </h1>
      <Productos/>
    </div>
  )
}
