import React from 'react'
import RequestList from './requestList'
import { solicitudesItems } from '@/app/constants/data'

export default function Solicitudes(
    {filter}: {filter?: string}
) {
  return (
    <div className="flex flex-col items-center justify-start gap-4 min-h-screen p-4">
        <RequestList requests={solicitudesItems} filter= {filter}/>
    </div>
  )
}
