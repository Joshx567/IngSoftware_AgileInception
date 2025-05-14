import {estacionesDB} from '../db.js';
export const historialTickets = [];

export function generarTicket(nombreEstacion, cantidad, tipoCombustible, operario, horaTicket) {
  const estacion = estacionesDB.find(e => e.nombre === nombreEstacion);
  if (!estacion) {
    throw new Error("La estacion ingresada no existe");
  }

  if (cantidad <= 0) {
    throw new Error("Cantidad ingresada invalida");
  }

  const combustible = estacion.combustibles?.[tipoCombustible];
  if (!combustible) {
    throw new Error("Tipo de combustible no disponible en esta estacion");
  }

  if (cantidad > combustible.litros) {
    throw new Error("Cantidad ingresada supera el stock disponible");
  }

  const [horaTick, minTick] = horaTicket.split(":").map(Number);
  const horaActual = horaTick * 60 + minTick;

  const [horaA, minA] = estacion.horaApertura.split(":").map(Number);
  const [horaC, minC] = estacion.horaCierre.split(":").map(Number);
  const horaApertura = horaA * 60 + minA;
  const horaCierre = horaC * 60 + minC;

  if (horaActual < horaApertura || horaActual > horaCierre) {
    throw new Error("No se puede generar el ticket fuera del horario de atencion");
  }

  const idTicket = Math.floor(10000 + Math.random() * 90000).toString();

  const ticket = {
    idTicket,
    idEstacion: estacion.id,
    nombreEstacion: estacion.nombre,
    direccionEstacion: estacion.ubicacion,
    tipoCombustible,
    cantidadIngresada: cantidad,
    operario,
    fecha: new Date().toLocaleDateString(),
    hora: horaTicket,
    estado: "activo",
    ticketsConductores:[]
  };
  combustible.litros -= cantidad;
  estacion.ticketsCombustible.push(ticket);
  historialTickets.push(ticket);
  return ticket;
}

