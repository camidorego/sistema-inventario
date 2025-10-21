"use client"
import React from 'react'
import UsersList from './usersList';
import { userMocks } from '@/app/constants/data';

export default function Usuarios() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    return (
        <div className="flex flex-col items-center justify-start gap-4 min-h-screen p-4">
                <button
                    type="button"
                    className="w-sm h-10 rounded-xl bg-[#20519e] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#184080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2dbd]"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Nuevo Usuario
                </button>
                <UsersList users={userMocks} />
        </div>
    )
}
