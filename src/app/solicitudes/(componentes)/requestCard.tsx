import React from 'react'
import { Request, RequestPriority, RequestStatus } from '@/app/types/base'

const PRIORITY_STYLES: Record<RequestPriority, string> = {
  baja: "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200",
  media: "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200",
  alta: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
};

const STATUS_STYLES: Record<RequestStatus, string> = {
  pendiente: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  aprobada: "bg-green-100 text-green-800 hover:bg-green-200",
  rechazada: "bg-red-100 text-red-800 hover:bg-red-200",
};

export default function RequestCard(
    {request, className}: {request:Request; className?: string}
) {
  return (
    <article
      className={[
        "group rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-black/10",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          
            <h3 className="truncate text-neutral-700 font-semibold leading-tight mb-3">
              #{request.id} - {request.requestType}
            </h3>
            <h2 className='truncate text-neutral-600 font-medium leading-tight'>
                Solicitante: {request.solicitante}
            </h2>

          <div className="mt-1 flex flex-wrap items-center gap-1 text-xs">
            <span
              className={[
                "inline-flex items-center rounded-full px-2 py-0.5",
                PRIORITY_STYLES[request.prioridad],
              ].join(" ")}
            >
              {request.prioridad.toUpperCase()}
            </span>
            <span
              className={[
                "inline-flex items-center rounded-full px-2 py-0.5",
                STATUS_STYLES[request.estado],
              ].join(" ")}
            >
              {request.estado.toUpperCase()}
            </span>
          </div>
        </div>
        {/* cuando el usuario es solicitante, el componente tiene botones de editar y eliminar (?) */}
        <div className='flex gap-2'> 
          {/* {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
              aria-label="Delete Task"
            >
              Delete
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(task.id)}
              className="rounded-lg border px-2 py-1 text-xs text-yellow-600 hover:bg-red-50"
              aria-label="Edit Task"
            >
              Edit
            </button>
          )} */}
        </div>
      </div>

      {/* Body */}
      {request.detalles && (
        <p className="mt-3 line-clamp-2 text-sm text-neutral-600">
          {request.detalles}
        </p>
      )}
      <dl className="mt-1 space-y-1 text-sm">
        {request.itemRequerido && (
          <div className="flex items-baseline gap-1">
            <dt className="shrink-0 text-[11px] uppercase tracking-wide text-neutral-500">
              Item solicitado:
            </dt>
            <dd className="truncate font-medium text-neutral-700">
              {request.itemRequerido.nombre}
            </dd>
          </div>
        )}
        {request.cantidad && (
          <div className="flex items-baseline gap-1">
            <dt className="shrink-0 text-[11px] uppercase tracking-wide text-neutral-500">
              Cantidad:
            </dt>
            <dd className="font-medium text-neutral-700">
              {request.cantidad}
            </dd>
          </div>
        )}
      </dl>
      {request.fechaSolicitud && (
        <p
          className={[
            "mt-3 text-sm font-medium",
            isPast(new Date(request.fechaSolicitud))
              ? "text-red-600"
              : "text-green-600",
          ].join(" ")}
        >
          Fecha solicitada: {formatDate(new Date(request.fechaSolicitud))}
        </p>
      )}
      {/* Footer */}
      {request.estado === 'pendiente' && (
      <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3">
        <button
            type="button"
            className={[
              "block rounded px-2 py-1 text-md font-normal transition-colors",
              "bg-[#bc4749] text-white hover:bg-red-800",
            ].join(" ")}
            // onClick={() =>
            //   onStatusChange?.(task.id)
            // }
            aria-label={"cambiar estado"}
        >
          Rechazar
        </button>
        <button
            type="button"
            className={[
              "block rounded px-2 py-1 text-md font-normal transition-colors",
              "bg-[#588157] text-white hover:bg-green-600",
            ].join(" ")}
            // onClick={() =>
            //   onStatusChange?.(task.id)
            // }
            aria-label={"cambiar estado"}
        >
          Aprobar
        </button>
      </div>
      )}
    </article>
  );
}

function isPast(d: Date) {
  const endOfDay = new Date(d);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < Date.now();
}

function formatDate(d: Date) {
  // dd/MM/yyyy
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
