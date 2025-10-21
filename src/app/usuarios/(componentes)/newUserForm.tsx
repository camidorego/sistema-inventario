"use client";
import React, { useRef } from 'react'

type NewUserFormProps = {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    onSave: (data: any) => void;
}
export default function NewItemForm(
    { 
        className,
        isOpen,
        onClose,
        onSave 
    }: NewUserFormProps
){
    const dialogRef = useRef<HTMLDivElement>(null);
    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [role, setRole] = React.useState(0);
    const [email, setEmail] = React.useState("");

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
                <h2 className="text-lg font-medium text-gray-900">Nuevo usuario</h2>
                </header>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        onSave({ name, username, email, role });
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Nombre y apellido
                        </label>
                        <input
                        type="text"
                        id="nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        />
                        {/* {error.title && <p className="mt-1 text-sm text-red-600">{error.title}</p>} */}
                    </div>
                    <div>
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Correo electrónico
                        </label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        />
                        {/* {error.title && <p className="mt-1 text-sm text-red-600">{error.title}</p>} */}
                    </div>

                    

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Cantidad */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                        </label>
                        <input 
                        type="text" 
                        id='username' 
                        className="mt-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-[#6f2dbd] focus:ring-[#6f2dbd] sm:text-sm text-black px-2 py-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>

                    {/* Rol*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Rol
                        </label>
                        <div className="relative mt-1">
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(parseInt(e.target.value))}
                            className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 shadow-sm focus:border-[#6f2dbd] focus:outline-none focus:ring-[#6f2dbd] sm:text-sm"
                        >
                            <option value={0}>Usuario</option>
                            <option value={2}>Inventario</option>
                            <option value={1}>Administrador</option>
                        </select>
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
