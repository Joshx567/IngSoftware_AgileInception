import {estacionesDB} from "../db.js";

export function sacarTicket(monto, estacionSeleccionada, idTicketSeleccionado) {
    let estacion = estacionesDB.find(e => e.nombre === estacionSeleccionada);
    let ticket = estacion.ticketsCombustible.find(t => t.idTicket === idTicketSeleccionado);
    if (ticket.cantidadIngresada < monto) {
        throw new Error("No hay suficiente combustible disponible");
    }
    ticket.cantidadIngresada -= monto;
    return monto;
}