"use client"
import React from 'react'
import UsersList from './usersList';
import { userMocks } from '@/app/constants/data';
import NewUserForm from './newUserForm';
import { User } from '@prisma/client';
import DeleteItem from '@/app/inventario/(componentes)/deleteItem';

export default function Usuarios() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

    async function loadUsers() {
        try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (res.ok) setUsers(data.data);
        } catch (error) {
        console.error("Error loading users:", error);
        }
    }

    React.useEffect(() => {
        loadUsers();
    }, []);

    // guardar usuario nuevo o editar existente
    async function handleSave(userData: Partial<User>) {
        try {
        if (selectedUser) {
            // editar
            const res = await fetch(`/api/users/${selectedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error updating user");

            setUsers((prev) =>
            prev.map((u) => (u.id === selectedUser.id ? data.data : u))
            );
        } else {
            // crear
            const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error creating user");

            setUsers((prev) => [data.data, ...prev]);
        }

        setIsDialogOpen(false);
        setSelectedUser(null);
        } catch (error: any) {
        console.error(error.message);
        }
    }

    // eliminar usuario
    async function handleDelete(id: number) {
        try {
        const res = await fetch(`/api/users/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error deleting user");

        setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (error: any) {
        console.error(error.message);
        }
    }

    // abrir formulario para editar
    function handleEdit(user: User) {
        setSelectedUser(user);
        setIsDialogOpen(true);
    }

    function handleDeleteClick(user: User) {
        setIsDeleteDialogOpen(true);
        setSelectedUser(user);
    }
    return (
        <div className="flex flex-col items-center justify-start gap-4 min-h-screen p-4">
                <button
                    type="button"
                    className="w-sm h-10 rounded-xl bg-[#20519e] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#184080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2dbd]"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Nuevo Usuario
                </button>
                <DeleteItem
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onDelete={async (id) => {
                        await handleDelete(id);
                        setIsDeleteDialogOpen(false);
                    }}
                    itemId={selectedUser?.id || 0}
                    message="¿Está seguro que quiere eliminar este usuario del sistema?"
                />
                <NewUserForm 
                    isOpen={isDialogOpen} 
                    onClose={()=>setIsDialogOpen(false)} 
                    onSave={handleSave}
                    user={
                        selectedUser
                        ? selectedUser
                        : undefined
                    }
                    />
                <UsersList users={users} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} />
        </div>
    )
}
