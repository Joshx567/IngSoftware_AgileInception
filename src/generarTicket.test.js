import { registrarLitros, historialIngresos} from './registrarLitros.js';
import { generarTicket, historialTickets} from './generarTicket.js';
import {estacionesDB} from "../db.js";


describe("Generar tickets de combustible", () => {
  it("debería generar un ticket válido para una estación existente", () => {
    registrarLitros("Estación Principal",1000,'gnv','Carlos');
    const ticket = generarTicket("Estación Principal", 30,"gnv","Carlos","10:00"); 
    expect(ticket).toHaveProperty("idTicket");
    expect(ticket).toHaveProperty("nombreEstacion","Estación Principal");
    expect(ticket).toHaveProperty("direccionEstacion","Av. Libertador");
    expect(ticket).toHaveProperty("tipoCombustible","gnv");
    expect(ticket).toHaveProperty("cantidadIngresada", 30);
    console.log(ticket)
  });
  it("debería rechazar el ticket igual a cero de combustible", () => {
    try {
      generarTicket("Estación Principal", 0,"gnv","Carlos","10:00");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Cantidad ingresada invalida");
    }
  });
  it("debería rechazar el ticket para estación inexistente", () => {
    try {
      generarTicket("Estación S", 12,"Carlos","10:00");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("La estacion ingresada no existe");
    }
  });
  it("debería rechazar un ticket que supere el inventario actual", () => {
    try {
      generarTicket("Estación Sur", 11,"gasolina","Carlos","10:00");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Cantidad ingresada supera el stock disponible");
    }
  });
  it("debería rechazar el ticket fuera de horario de atención", () => {
    try {
      generarTicket("Estación Sur", 10,"gnv","Carlos","23:00");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("No se puede generar el ticket fuera del horario de atencion");
    }
  });
  //por si acaso
  it("debería rechazar un ticket para un combustible que no existe en", () => {
    try {
      generarTicket("Estación Sur", 1,"gasolina-especial","Carlos","10:00");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Tipo de combustible no disponible en esta estacion");
    }
  });
});

describe("Registrar ticket generado en un historial", () => {
  it("deberia registrar el ticket de combustible en un historial", () => {
  expect(historialTickets.length).toEqual(1);
  });
});

describe("Actualizar la cantidad de combustible de la estación después de generar un ticket", () => {
  it("debería actualizar los litros de combustible de la estación al generar un ticket", () => {
    const estacion = estacionesDB.find(e => e.nombre === "Estación Sur");
    generarTicket("Estación Sur", 10,"gnv","Carlos","10:00"); 
    expect(estacion.combustibles.gnv.litros).toEqual(40);
  });
});

describe("Verificar tickets de combustible registrados dentro de una estación", () => {
  it("deberia tener una lista de tickets de combustible totales para una estación", () => {
    const estacion = estacionesDB.find(e => e.nombre === "Estación Sur");
    expect(estacion.ticketsCombustible.length).toBe(1);
  });
});