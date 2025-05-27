import {estacionesDB} from "../db.js";

export function sacarTicket(monto, estacionSeleccionada) {
    const estacion = estacionesDB.find(e => e.nombre === estacionSeleccionada);
    return monto;
}