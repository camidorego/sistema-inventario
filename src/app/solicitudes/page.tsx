import React from 'react'
import Solicitudes from './(componentes)/solicitudes';

type FilterOption = "Todas" | "Pendientes"
const map = (s?:string): FilterOption => {
    if(s === "pendientes") {
        return "Pendientes";
    } else {
        return "Todas";
    }
}

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
            <Solicitudes filter={filter} />
        </div>
    )
}