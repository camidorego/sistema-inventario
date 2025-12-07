import React from 'react'
import ItemCard from './itemCard';
import { Item } from '@prisma/client';

export default function temList(
    { items, className, handleEdit, handleDeleteClick }: { items: Item[]; className?: string; handleEdit?: (item: Item) => void; handleDeleteClick?: (item: Item) => void }
){
  return (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map((item, index) => (
            <ItemCard key={index} className="sm:w-1/2 md:w-1/3 mx-2" item={item} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick}/>
        ))}
    </div>
  )
}
