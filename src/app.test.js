import { registrarLitros } from './app.js';

describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible", () => {
      expect(registrarLitros(2)).toEqual(2);
    });
});