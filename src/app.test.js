import { registrarLitros,historialIngresos } from './app.js';

describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible", () => {
      expect(registrarLitros(2)).toEqual(2);
    });
});

describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible", () => {
      expect(historialIngresos.length).toEqual(1);
    });
});