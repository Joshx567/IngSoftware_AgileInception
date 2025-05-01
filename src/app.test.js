import { registrarLitros, generarTicket, historialIngresos, estaciones } from './app.js';

describe("Registrar llegada de combustible", () => {
    it("deberia registrar la llegada del combustible gasolina", () => {
      expect(registrarLitros(1,1000,'gasolina','Carlos')).toEqual(1000);
    });
    it("deberia registrar la llegada del combustible gnv", () => {
      expect(registrarLitros(1,1000,'gnv','Carlos')).toEqual(1000);
    });
    it("deberia registrar la llegada del combustible diesel", () => {
      expect(registrarLitros(1,1000,'diesel','Carlos')).toEqual(1000);
    });
    it("debería rechazar el registro negativo de combustible", () => {
      try {
        registrarLitros(1, -100, "gasolina", "Carlos");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Cantidad ingresada invalida");
      }
    });
    it("debería rechazar el registro igual a cero de combustible", () => {
      try {
        registrarLitros(1, 0, "gnv", "Carlos");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Cantidad ingresada invalida");
      }
    });
    it("debería rechazar el registro de una estación inexistente", () => {
      try {
        registrarLitros(100, 12, "gasolina", "Carlos");
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
    it("debería actualizar los litros de combustible de la estación con ID 1", () => {
      const idEstacion = 1;
      const estacion = estaciones.find(e => e.id === idEstacion);
      expect(estacion.combustible.gasolina).toEqual(1000);
      expect(estacion.combustible.gnv).toEqual(1000);
      expect(estacion.combustible.diesel).toEqual(1000);
    });
});

describe("Generar tickets de combustible", () => {
  it("debería generar un ticket válido para una estación existente", () => {
    const ticket = generarTicket(1, 30,"gnv"); 
    expect(ticket).toHaveProperty("idTicket");
    expect(ticket).toHaveProperty("nombreEstacion","Estacion 1");
    expect(ticket).toHaveProperty("direccionEstacion","Av. Beijing");
    expect(ticket).toHaveProperty("tipoCombustible","gnv");
    expect(ticket).toHaveProperty("cantidadIngresada", 30);
    console.log(ticket)
  });
  it("debería rechazar el ticket igual a cero de combustible", () => {
    try {
      generarTicket(1, 0);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Cantidad ingresada invalida");
    }
  });
  it("debería rechazar el ticket para estación inexistente", () => {
    try {
      generarTicket(100, 12);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("La estacion ingresada no existe");
    }
  });
});