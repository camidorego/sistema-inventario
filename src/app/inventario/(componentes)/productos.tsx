"use client";
import React from 'react'
import ItemList from './itemList'
import { productosItems } from '@/app/constants/data'
import NewItemForm from './newItemfForm'
export default function Productos() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  return (
    <div className="flex flex-col items-center justify-start gap-4 min-h-screen p-4">
        <button
            type="button"
            className="w-lg h-20 rounded-xl bg-[#20519e] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#184080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2dbd]"
            onClick={() => setIsDialogOpen(true)}
        >
            Agregar Item
        </button>
         <NewItemForm isOpen={isDialogOpen} onClose={()=>setIsDialogOpen(false)} onSave={()=>{}} />
        <ItemList items={productosItems} />
    </div>

  )
}