export enum SolicitudFinalizacionEstado {
    Solucionado = 'solucionado',
    Cancelado = 'cancelado'
}

export const SolicitudFinalizacionEstadoMapping: Record<SolicitudFinalizacionEstado, string> = {
    [SolicitudFinalizacionEstado.Solucionado]: "Solucionado",
    [SolicitudFinalizacionEstado.Cancelado]: "Cancelado",
}