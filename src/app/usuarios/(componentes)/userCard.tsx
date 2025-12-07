
import { User, UserRole } from '@prisma/client';
import React from 'react'

const iconMap: Record<UserRole, string> = {
    'admin': '/images/users/admin.svg',
    'inventario': '/images/users/inventario.svg',
    'usuario': '/images/users/usuario.svg',
};

export default function UserCard(
    {user, className, handleEdit, handleDeleteClick}: {user: User; className?: string;  handleEdit?: (user: User) => void; handleDeleteClick?: (user: User) => void}
) {
    
    return (
        <article className={[
        "group rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-black/10",
        className,
      ].join(" ")}>
        <div className="flex justify-center mb-2">
            <img
            src={iconMap[user.role]}
            alt={user.role}
            width={60}
            height={100}
            className=""
            />
        </div>
        <h2 className="truncate text-neutral-700 font-semibold leading-tight">
            {user.name} ({user.username})
        </h2>
        <dl className="mt-1 space-y-1 text-sm">
            <div className="flex items-baseline gap-1">
                <dt className="shrink-0 text-[11px] uppercase tracking-wide text-neutral-500">
                Email:
                </dt>
                <dd className="truncate font-medium text-neutral-700">
                {user.email}
                </dd>
          </div>
          <div className="flex items-baseline gap-1">
                <dt className="shrink-0 text-[11px] uppercase tracking-wide text-neutral-500">
                Rol:
                </dt>
                <dd className="truncate font-medium text-neutral-700">
                {user.role}
                </dd>
          </div>
        </dl>
        <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3">
            <button
            type = "button"
            className={[
                "block rounded px-2 py-1 text-md font-normal transition-colors",
                "bg-[#dbb42c] text-white hover:bg-[#ffc600]",
            ].join(" ")}
            onClick={()=>{
                if(handleEdit) handleEdit(user)
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
                if(handleDeleteClick) handleDeleteClick(user)
            }}
            >
                Eliminar
            </button>
        </div>

        </article>
    )
}