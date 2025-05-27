import {estacionesDB} from "../db.js";

export function sacarTicket(montoIngresado, estacionSeleccionada, idTicketSeleccionado) {
    let estacion = estacionesDB.find(e => e.nombre === estacionSeleccionada);
    let ticket = estacion.ticketsCombustible.find(t => t.idTicket === idTicketSeleccionado);
    if (ticket.cantidadIngresada < montoIngresado) {
        throw new Error("No hay suficiente combustible disponible");
    }
    ticket.cantidadIngresada -= montoIngresado;

    ticket.ticketsConductores.push({
        monto: montoIngresado,
    });
}