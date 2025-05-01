export const estaciones = [
  {
    id: 1,
    nombre: "Estacion 1",
    nombre: "Av. Beijing",
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
    nombre: "Av. America",
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
  estacion.combustible.gasolina = cantidad;
  let cantidadIngresada = cantidad;
  estacion.combustible[tipoCombustible] += cantidadIngresada;
  historialIngresos.push({
    idEstacion,
    tipoCombustible,
    cantidadIngresada,
    operario,
    fecha:new Date(),
    hora: new Date().toLocaleTimeString()
  });
  return cantidadIngresada;
}


