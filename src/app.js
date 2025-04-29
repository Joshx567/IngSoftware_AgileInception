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
    nombre: "Carlos Gomez",
    ticketActivo: null
  },
  {
    ci: 2,
    nombre: "Julieta Vallejo",
    ticketActivo: null
  }
];

export const operadores = [
  {
    id: 201,
    nombre: "Carlos Rivero",
    estacionId: 1
  },
  {
    id: 202,
    nombre: "Camila Orellana",
    estacionId: 2
  }
];

export const historialTickets = [];

export const historialIngresos = [];
export function registrarLitros(cantidad) {
  estaciones[0].combustible.gasolina = cantidad;
  let cantidadIngresada = cantidad;
  historialIngresos.push({
    cantidadIngresada
  });
  return cantidadIngresada;
}

