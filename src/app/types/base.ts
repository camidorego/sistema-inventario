export type Item = {
    nombre: string;
    descripcion: string;
    cantidad: number;
    img: string;
}

export type RequestPriority = 'baja' | 'media' | 'alta';
export type RequestStatus = 'pendiente' | 'aprobada' | 'rechazada';

export type Request = {
    id: number;
    solicitante: string;
    requestType: "Impresion";
    detalles: string;
    cantidad: number;
    itemRequerido: Item;
    estado: RequestStatus;
    prioridad: RequestPriority;
    fechaSolicitud: string;
}