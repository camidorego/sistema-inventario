import React, { useMemo } from 'react'
import { Request } from "@/app/types/base";
import RequestCard from './requestCard';

export default function RequestList(
    {requests, className, filter}: {requests: Request[], className?: string, filter?: string  }
) {

  const formatFilter = (filter==="Pendientes") ? 'pendiente' : undefined;
  
  const filteredRequests = useMemo(() => {
    if (!formatFilter) return requests;
    return requests.filter(request => request.estado === formatFilter);
  }, [filter, requests]);
  console.log(filter, formatFilter, filteredRequests);

  return (
    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((item, index) => (
            <RequestCard key={index} request={item} className="w-full max-w-sm"/>
        ))}
    </div>
  )
}
