import { Item } from '@prisma/client';
import React from 'react'


const item = {
    name: "Papel A4",
    descripcion: "Resma de papel tamaño A4, 500 hojas",
    quantity: 20,
    img: "/images/papel-a4.jpg"
}

export default function ItemCard(
    { item, className, handleEdit, handleDeleteClick }: { item: Item; className?: string; handleEdit?: (item: Item) => void; handleDeleteClick?: (item: Item) => void }
) {
  return (
    <article
        className={[
        "group rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-black/10","w-64",
        className,
      ].join(" ")}>
        <div className="flex justify-center mb-2 h-24">
            <img src={item.img || "/images/papel-a4.jpg"} alt={item.name} className="object-contain max-h-full" />
        </div>
        <h2 className="text-center text-neutral-700 font-semibold text-lg truncate">
            {item.name}
        </h2>
        <p className='mt-3 line-clamp-3 text-sm text-neutral-600'>
            {item.descripcion}
        </p>
        <span className='mt-3 line-clamp-3 text-sm text-neutral-600'>
            Cantidad: {item.quantity}
        </span>
        <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3">
            <button
            type = "button"
            className={[
                "block rounded px-2 py-1 text-md font-normal transition-colors",
                "bg-[#dbb42c] text-white hover:bg-[#ffc600]",
            ].join(" ")}
            onClick={() => {
                if (handleEdit) handleEdit(item);
            }}
            >
                Editar
            </button>
            <button
            type = "button"
            className={[
                "block rounded px-2 py-1 text-md font-normal transition-colors",
              "bg-[#bc4749] text-white hover:bg-red-800",
            ].join(" ")}
            onClick={()=>{
                if(handleDeleteClick) handleDeleteClick(item)
            }}
            >
                Eliminar
            </button>
        </div>
    </article>
  )
}
