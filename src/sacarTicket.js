import {estacionesDB, conductoresDB} from "../db.js";

export function sacarTicket(nombreConductor, placaIngresada, carnet, montoIngresado, estacionSeleccionada, idTicketSeleccionado) {
    let estacion = estacionesDB.find(e => e.nombre === estacionSeleccionada);
    let conductor = conductoresDB.find(c => c.nombre === nombreConductor);
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
    const idTicket = Math.floor(10000 + Math.random() * 90000).toString();
    ticket.ticketsConductores.push({
        idTicket,
        nombre: nombreConductor,
        ci: carnet,
        placa: placaIngresada,
        monto: montoIngresado,
        horaAtencion: horaAtencion
    });
    conductor.ticketsHistorial.push({
        idTicket,
        estacionDeCarga: estacionSeleccionada,
        fecha: new Date().toLocaleDateString(),
        montoCargado: montoIngresado,
        horaCarga: horaAtencion
    });
}