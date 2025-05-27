import {estacionesDB} from "../db.js";

export function sacarTicket(nombreConductor, placaIngresada, carnet, montoIngresado, estacionSeleccionada, idTicketSeleccionado) {
    let estacion = estacionesDB.find(e => e.nombre === estacionSeleccionada);
    let ticket = estacion.ticketsCombustible.find(t => t.idTicket === idTicketSeleccionado);
    if (ticket.cantidadIngresada < montoIngresado) {
        throw new Error("No hay suficiente combustible disponible");
    }
    ticket.cantidadIngresada -= montoIngresado;
    const conductores = ticket.ticketsConductores.length;
    const [hora, minutos, segundos] = ticket.hora.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hora);
    baseDate.setMinutes(minutos + conductores * 10);
    baseDate.setSeconds(segundos);
    const horaAtencion = baseDate.toTimeString().split(' ')[0];
    ticket.ticketsConductores.push({
        nombre: nombreConductor,
        ci: carnet,
        placa: placaIngresada,
        monto: montoIngresado,
        horaAtencion: horaAtencion
    });
}