import React from 'react'
import UserCard from './userCard';
import { User } from '@prisma/client';

export default function UsersList(
    {users, className, handleEdit, handleDeleteClick}: {users: User[]; className?: string; handleEdit?: (user: User) => void; handleDeleteClick?: (user: User) => void}
) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((item, index) => (
            <UserCard key={index} user={item} className="w-full max-w-sm" handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} />
        ))}
    </div>
  )
}
