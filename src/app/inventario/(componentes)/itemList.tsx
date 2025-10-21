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

        <div className="flex flex-wrap justify-center gap-">
            {items.map((item, index) => (
                <ItemCard key={index} className="w-1/3 mx-2" item={item} />
            ))}
        </div>
   
  )
}
