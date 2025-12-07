"use client";
import React from 'react'
import ItemList from './itemList'
import { productosItems } from '@/app/constants/data'
import NewItemForm from './newItemForm'
import { Item } from "@/app/types/base";
import DeleteItem from './deleteItem';

export default function Productos() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedItem, setselectedItem] = React.useState<Item | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setItems(json.data ?? []);
    } catch (e: any) {
      setError(e.message ?? "Error fetching items");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item: Item) {
    setselectedItem(item);
    setIsDialogOpen(true);
  }

  function handleDeleteClick(item: Item) {
    setselectedItem(item);
    setIsDeleteDialogOpen(true);
  }

  async function handleSave(newItem: {name:string; description:string; quantity?:number; imgUrl?:string}) {
    try {
      if (selectedItem) {
        // editar existente
        const res = await fetch(`/api/items/${selectedItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newItem.name,
            descripcion: newItem.description,
            quantity: newItem.quantity ?? 0,
            img: newItem.imgUrl ?? null,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al actualizar el item");

        // reemplazamos el item en la lista
        setItems((prev) => prev.map(i => i.id === selectedItem.id ? data.data : i));
      } else {
        // crear nuevo item
        const res = await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newItem.name,
            descripcion: newItem.description,
            quantity: newItem.quantity ?? 0,
            img: newItem.imgUrl ?? null,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al crear el item");

        // agregamos el nuevo item a la lista
        setItems((prev) => [data.data, ...prev]);
      }

      setIsDialogOpen(false);
      setselectedItem(null);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al eliminar el item");

      // eliminar de la lista en pantalla
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error eliminando item:", error.message);
    }
  }


  React.useEffect(() => {
    loadItems();
  }, []);

  React.useEffect(() => {
    console.log("Items loaded:", items);
  }, [items]);

  return (
    <div className="flex flex-col items-center justify-start gap-4 min-h-screen p-4">
        <button
            type="button"
            className="w-sm h-10 rounded-xl bg-[#20519e] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#184080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2dbd]"
            onClick={() => setIsDialogOpen(true)}
        >
            Agregar Item
        </button>
        <DeleteItem 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={async (id) => {
            await handleDelete(id);
            setIsDeleteDialogOpen(false);
          }}
          itemId={selectedItem?.id || 0}
        />
        <NewItemForm 
          isOpen={isDialogOpen} 
          onClose={() => {
            setIsDialogOpen(false);
            setselectedItem(null);
          }} 
          onSave={handleSave} 
          item={selectedItem ? {
              name: selectedItem.name,
              description: selectedItem.descripcion,
              quantity: selectedItem.quantity,
              imgUrl: selectedItem.img ?? "",
            } : undefined}
        />
        <ItemList items={items} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} />
    </div>

  )
}