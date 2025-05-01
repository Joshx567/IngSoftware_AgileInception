export const estaciones = [
  {
    id: 1,
    nombre: "Estacion 1",
    direccion: "Av. Beijing",
    horaApertura: "06:00",  
    horaCierre: "22:00",
    combustible: {
      gasolina: 0,
      diesel: 0,
      gnv: 0
    },
    tickets: [], 
  },
  {
    id: 2,
    nombre: "Estacion 2",
    direccion: "Av. America",
    horaApertura: "08:00",  
    horaCierre: "19:00",
    combustible: {
      gasolina: 10,
      diesel: 2000,
      gnv: 500
    },
    tickets: [],
  },
  {
    id: 3,
    nombre: "Estacion 2",
    direccion: "Av. Circunvalacion",
    horaApertura: "08:00",  
    horaCierre: "13:00",
    combustible: {
      gasolina: 10,
      diesel: 2000,
      gnv: 500
    },
    tickets: [],
  }
];

export const conductores = [
  {
    ci: 1,
    nombre: "Carlos",
    ticketActivo: null
  },
  {
    ci: 2,
    nombre: "Julieta",
    ticketActivo: null
  }
];

export const operadores = [
  {
    id: 201,
    nombre: "Carlos",
    estacionId: 1
  },
  {
    id: 202,
    nombre: "Camila",
    estacionId: 2
  }
];

export const historialTickets = [];

export const historialIngresos = [];

export function registrarLitros(idEstacion, cantidad, tipoCombustible, operario) {
  const estacion = estaciones.find(e => e.id === idEstacion);
  if (!estacion){
    throw new Error("La estacion ingresada no existe");
  }
  if (cantidad <= 0){
    throw new Error("Cantidad ingresada invalida");
  }
  const cantidadIngresada = cantidad;
  if (tipoCombustible === "gasolina") {
    estacion.combustible.gasolina += cantidadIngresada;
  } else if (tipoCombustible === "diesel") {
    estacion.combustible.diesel += cantidadIngresada;
  } else if (tipoCombustible === "gnv") {
    estacion.combustible.gnv += cantidadIngresada;
  } 
  historialIngresos.push({
    idEstacion,
    tipoCombustible,
    cantidadIngresada,
    operario,
    fecha:new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  });
  return cantidadIngresada;
}


export function generarTicket(idEstacion, cantidad, tipoCombustible, operario) {
  const estacion = estaciones.find(e => e.id === idEstacion);
  if (!estacion){
    throw new Error("La estacion ingresada no existe");
  }
  const cantidadIngresada = cantidad;
  if (cantidadIngresada <= 0){
    throw new Error("Cantidad ingresada invalida");
  }
  const combustibleDisponible = estacion.combustible?.[tipoCombustible];
  if (combustibleDisponible === undefined) {
    throw new Error("Tipo de combustible no disponible en esta estacion");
  }
  if (cantidadIngresada > combustibleDisponible) {
    throw new Error("Cantidad ingresada supera el stock disponible");
  }

  const now = new Date();
  const horaActual = now.getHours() * 60 + now.getMinutes();
  const [horaA, minA] = estacion.horaApertura.split(":").map(Number);
  const [horaC, minC] = estacion.horaCierre.split(":").map(Number);
  const horaApertura = horaA * 60 + minA;
  const horaCierre = horaC * 60 + minC;
  const idTicket = Math.floor(10000 + Math.random() * 90000).toString();

  if (horaActual < horaApertura || horaActual > horaCierre) {
    throw new Error("No se puede generar el ticket fuera del horario de atencion");
  }
  
  const ticket = {
    idTicket,
    idEstacion,
    nombreEstacion: estacion.nombre,
    direccionEstacion: estacion.direccion,
    tipoCombustible,
    cantidadIngresada,
    operario,
    fecha:new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  }
  estacion.combustible[tipoCombustible] -= cantidad;
  historialTickets.push({
    ticket
  });
  return ticket;
}
