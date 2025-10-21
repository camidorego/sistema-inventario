import { Item, Request } from '../types/base';


export const productosItems: Item[] = [
    {   
        nombre: "Papel A4",
        descripcion: "Resma de papel tamaño A4, 500 hojas",
        cantidad: 20,
        img: "./images/papel-a4.jpg"
    },
    {
        nombre: "Papel Oficio",
        descripcion: "Resma de papel tamaño Oficio, 500 hojas",
        cantidad: 30,
        img: "./images/papel-a4.jpg"
    },
];

export const solicitudesItems: Request[] = [
    {
        id: 1,
        solicitante: "Juan Perez",
        requestType: "Impresion",
        detalles: "Necesito imprimir documentos para la reunión del lunes.",
        cantidad: 100,
        itemRequerido: productosItems[0],
        estado: 'pendiente',
        fechaSolicitud: "2025-06-15",
        prioridad: 'media'
    },
    {
        id: 2,
        solicitante: "Maria Gomez",
        requestType: "Impresion",
        detalles: "Impresión de folletos para el evento de la empresa.",
        cantidad: 200,
        itemRequerido: productosItems[1],
        estado: 'aprobada',
        fechaSolicitud: "2025-12-14",
        prioridad: 'alta'
    },
];