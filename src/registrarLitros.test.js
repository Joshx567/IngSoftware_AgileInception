import { registrarLitros, historialIngresos} from './registrarLitros.js';
import { generarTicket, historialTickets} from './generarTicket.js';

import {estacionesDB} from "../db.js";


describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible gasolina", () => {
      expect(registrarLitros("Estación Principal",1000,'gasolina','Carlos')).toEqual(1000);
    });
    it("deberia registrar la llegada del combustible gnv", () => {
      expect(registrarLitros("Estación Principal",1000,'gnv','Carlos')).toEqual(1000);
    });
    it("deberia registrar la llegada del combustible diesel", () => {
      expect(registrarLitros("Estación Principal",1000,'diesel','Carlos')).toEqual(1000);
    });
    it("debería rechazar el registro negativo de combustible", () => {
      try {
        registrarLitros("Estación Principal", -100, "gasolina", "Carlos");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Cantidad ingresada invalida");
      }
    });
    it("debería rechazar el registro igual a cero de combustible", () => {
      try {
        registrarLitros("Estación Principal", 0, "gnv", "Carlos");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Cantidad ingresada invalida");
      }
    });
    it("debería rechazar el registro de una estación inexistente", () => {
      try {
        registrarLitros("Estación A", 12, "gasolina", "Carlos");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("La estacion ingresada no existe");
      }
    });
});

describe("Registrar llegada de combustible en un historial", () => {
    it("deberia registrar la llegada del combustible en un historial", () => {
    expect(historialIngresos.length).toEqual(3);
    });
});

describe("Actualizar la cantidad de combustible de la estación", () => {
    it("debería actualizar los litros de combustible de la Estación Principal", () => {
      const estacion = estacionesDB.find(e => e.nombre === "Estación Principal");
      expect(estacion.combustibles.gasolina.litros).toEqual(1000);
      expect(estacion.combustibles.gnv.litros).toEqual(1000);
      expect(estacion.combustibles.diesel.litros).toEqual(1000);
    });
});

describe("Verificar la disponibilidad del combustible", () => {
  it("deberia regresar true si el combustible esta disponible", () => {
    const estacion = estacionesDB.find(e => e.nombre === "Estación Principal");
    expect(estacion.combustibles.gasolina.disponible).toBe(true);
    expect(estacion.combustibles.diesel.disponible).toBe(true);
    expect(estacion.combustibles.gnv.disponible).toBe(true);
  });
});