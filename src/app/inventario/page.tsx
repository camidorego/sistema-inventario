import React from 'react'
import ItemList from './(componentes)/itemList';

type Item = {
    nombre: string;
    descripcion: string;
    cantidad: number;

    img: string;
}

const items: Item[] = [
    {
        nombre: "Papel A4",
        descripcion: "Resma de papel tamaño A4, 500 hojas",
        cantidad: 20,
        img: "./images/papel-a4.jpg"
    },
    {
        nombre: "Papel A4",
        descripcion: "Resma de papel tamaño A4, 500 hojas",
        cantidad: 20,
        img: "./images/papel-a4.jpg"
    },
];

export default function InventoryPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center text-[#0F1108]">
        Sistema de Inventario y Solicitudes
      </h1>
      <ItemList items={items}/>
    </div>
  )
}
