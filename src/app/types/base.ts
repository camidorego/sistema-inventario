export type Item = {
    id: number;
    name: string;
    descripcion: string;
    quantity: number;
    img: string;
}

export type RequestPriority = 'baja' | 'media' | 'alta';
export type RequestStatus = 'pendiente' | 'aprobada' | 'rechazada';

export type Request = {
    id: number;
    solicitante: string;
    requestType: "Impresion";
    detalles: string;
    quantity: number;
    itemRequerido: Item;
    estado: RequestStatus;
    prioridad: RequestPriority;
    fechaSolicitud: string;
}

export type UserRole = 'admin' | 'inventario' | 'usuario';
export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    role: UserRole;
}