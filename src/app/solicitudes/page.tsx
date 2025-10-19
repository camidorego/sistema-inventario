import React from 'react'

type FilterOption = "Todas" | "Pendientes"
const map = (s?:string): FilterOption => {
    if(s === "pendientes") {
        return "Pendientes";
    } else {
        return "Todas";
    }
}

type PriorityOption = "Alta" | "Media" | "Baja";

type Request = {
    id: number;
    titulo: string;
    descripcion: string;
    estado: "Pendiente" | "Finalizada";
    prioridad?: PriorityOption
}

const requests: Request[] = [
    {
        id: 1,
        titulo: "Solicitud de Impresion de firma digital",
        descripcion: "Necesito 5 resmas de papel tamaño A4 para la oficina.",
        estado: "Finalizada",
        prioridad: "Alta"
    },
    {
        id: 2,
        titulo: "Solicitud de Tóner",
        descripcion: "Requiero un tóner para la impresora HP LaserJet.",
        estado: "Finalizada",
        prioridad: "Media"
    },
];

function mapTitle(filter: FilterOption): string {
    if(filter === "Pendientes") {
        return "Solicitudes Pendientes";
    } else {
        return "Todas las Solicitudes";
    }
}

export default async function RequestPage(
    { searchParams }: { searchParams: Promise<{ filter?: string }>; }
) {
    const sp = await searchParams;
    const filter = map(sp?.filter);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1 className="text-4xl font-bold text-center text-[#0F1108]">
                {mapTitle(filter)}
            </h1>
        </div>
    )
}