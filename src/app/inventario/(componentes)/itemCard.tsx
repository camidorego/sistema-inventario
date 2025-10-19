import React from 'react'


const item = {
    nombre: "Papel A4",
    descripcion: "Resma de papel tamaño A4, 500 hojas",
    cantidad: 20,
    img: "/images/papel-a4.jpg"
}

type Item = {
    nombre: string;
    descripcion: string;
    cantidad: number;
    img: string;
}

export default function ItemCard(
    { item, className }: { item: Item; className?: string }
) {
  return (
    <article
        className={[
        "group rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-black/10",
        className,
      ].join(" ")}>
        <div className="flex justify-center mb-2">
            <img
            src={item.img}
            alt={item.nombre}
            width={60}
            height={100}
            className=""
            />
        </div>
        <h2 className="truncate text-neutral-700 font-semibold leading-tight">
            {item.nombre}
        </h2>
        <p className='mt-3 line-clamp-3 text-sm text-neutral-600'>
            {item.descripcion}
        </p>
        <span className='mt-3 line-clamp-3 text-sm text-neutral-600'>
            Cantidad: {item.cantidad}
        </span>
    </article>
  )
}
