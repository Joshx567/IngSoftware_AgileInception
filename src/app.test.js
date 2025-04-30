import { registrarLitros,historialIngresos,estaciones } from './app.js';

describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible", () => {
      expect(registrarLitros(1,1000,'gasolina','Carlos')).toEqual(1000);
    });
});

describe("Registrar llegada de combustible en historial", () => {
    it("deberia registrar la llegada del combustible en un historial", () => {
      expect(historialIngresos.length).toEqual(1);
    });
});

describe("Actualizar la cantidad de combustible de la estación", () => {
    it("debería actualizar los litros de combustible de la estación con ID 1", () => {
      const idEstacion = 1;
      const estacion = estaciones.find(e => e.id === idEstacion);
      expect(estacion.combustible.gasolina).toEqual(1000);
    });
});
  