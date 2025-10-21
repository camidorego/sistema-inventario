import { User } from '@/app/types/base';
import React from 'react'
import UserCard from './userCard';

export default function UsersList(
    {users, className}: {users: User[]; className?: string}
) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((item, index) => (
            <UserCard key={index} user={item} className="w-full max-w-sm"/>
        ))}
    </div>
  )
}
