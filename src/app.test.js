import { registrarLitros,historialIngresos,estaciones } from './app.js';

describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible", () => {
      expect(registrarLitros(1000)).toEqual(1000);
    });
});

describe("Registrar llegada de combustible en historial", () => {
    it("deberia registrar la llegada del combustible en un historial", () => {
      expect(historialIngresos.length).toEqual(1);
    });
});

describe("Actualizar la cantidad de combustible de la estacion", () => {
    it("deberia actualizar los litros de combustible de la estacion", () => {
      expect(estaciones[0].combustible.gasolina).toEqual(1000);
    });
});