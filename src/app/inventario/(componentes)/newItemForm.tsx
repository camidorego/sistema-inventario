"use client";
import React, { useRef } from 'react'

type NewItemFormProps = {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    onSave: (data: any) => void;
    item?: {
        name: string;
        description: string;
        quantity: number;
        imgUrl: string;
    };
}
export default function NewItemForm(
    { 
        className,
        isOpen,
        onClose,
        onSave,
        item 
    }: NewItemFormProps
){
    const dialogRef = useRef<HTMLDivElement>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [imgUrl, setImgUrl] = React.useState("");

    React.useEffect(() => {
        setName(item?.name ?? "");
        setDescription(item?.description ?? "");
        setQuantity(String(item?.quantity) ?? "");
        setImgUrl(item?.imgUrl ?? "");
    }, [item]);

    if (!isOpen) return null;

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#10002b]/70"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog */}
            <div
                ref={dialogRef}
                className="relative z-10 w-full max-w-md rounded-xl bg-white p-5 shadow-xl"
            >
                <header className="mb-4">
                <h2 className="text-lg font-medium text-gray-900">Agrega un Item</h2>
                </header>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        onSave({ name, description, quantity: Number(quantity), imgUrl });
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Nombre del articulo
                        </label>
                        <input
                        type="text"
                        id="tnombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        />
                        {/* {error.title && <p className="mt-1 text-sm text-red-600">{error.title}</p>} */}
                    </div>

                    <div>
                        <label
                        htmlFor="descripcion"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Descripcion
                        </label>
                        <textarea
                        id="descripcion"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        />
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Cantidad */}
                    <div>
                        <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                        Cantidad
                        </label>
                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" id='cantidad' className="mt-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        />
                    </div>

                    {/* Imagen*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Imagen (opcional)
                        </label>
                        <div className="relative mt-1">
                        <input
                            type="text"
                            id="imgUrl"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            >
                            <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10zM8.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-4.5 6l2.5-3.21 1.5 1.93L13 6l4 5H5z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-[#6286c0] px-4 py-2 text-sm font-medium text-white hover:bg-[#6f85a7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b8c89]"
                        >
                        Cancelar
                        </button>
                        <button
                        type="submit"
                        className="rounded-md bg-[#2862be] px-4 py-2 text-sm font-medium text-white hover:bg-[#184080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2dbd]"
                        >
                        Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
