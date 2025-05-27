import {estacionesDB} from "../db.js";

export function sacarTicket(monto, estacionSeleccionada, idTicketSeleccionado) {
    let estacion = estacionesDB.find(e => e.nombre === estacionSeleccionada);
    let ticket = estacion.ticketsCombustible.find(t => t.idTicket === idTicketSeleccionado);
    return monto;
}