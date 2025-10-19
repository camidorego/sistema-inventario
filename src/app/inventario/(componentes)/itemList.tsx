import React from 'react'
import ItemCard from './itemCard';

type Item = {
    nombre: string;
    descripcion: string;
    cantidad: number;
    img: string;
}

export default function temList(
    { items, className }: { items: Item[]; className?: string }
){
  return (
    <section aria-labelledby="tasks-title" className="mt-8">
        <div className="flex flex-wrap items-start justify-start gap-4">
            {items.map((item, index) => (
                <ItemCard key={index} className="w-1/3 mx-2" item={item} />
            ))}
        </div>
    </section>
  )
}
