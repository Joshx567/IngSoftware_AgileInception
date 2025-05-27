import { sacarTicket } from './sacarTicket.js';

import {estacionesDB} from "../db.js";

describe("Sacar un ticket para un turno de una estación", () => {
    it("deberia registrar el ticket", () => {  
    expect(sacarTicket(5,'Estación Norte',2)).toEqual(5);
    });
    it("deberia encontrar la estación seleccionada para el ticket", () => {  
    const estacion = estacionesDB.find(e => e.nombre === 'Estación Norte');
    expect(estacion.nombre).toEqual('Estación Norte');
    console.log(estacion);
    });
    it("deberia encontrar el ticket de combustible de la estacion", () => {  
    let estacion = estacionesDB.find(e => e.nombre === 'Estación Norte');
    const ticket = estacion.ticketsCombustible.find(t => t.idTicket === 2);
    expect(ticket.tipoCombustible).toEqual('diesel');
    });
    it("debería rechazar el ticket si el monto supera a la cantidad restante", () => {
        try {
          sacarTicket(500,"Estación Norte",2);
          console.log('Se pasó la validación');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe("No hay suficiente combustible disponible");
        }
      });
    it("deberia reducir la cantida disponible del ticket de combustible de la estacion", () => {  
    sacarTicket(5,'Estación Norte',2)
    let estacion = estacionesDB.find(e => e.nombre === 'Estación Norte');
    const ticket = estacion.ticketsCombustible.find(t => t.idTicket === 2);
    expect(ticket.cantidadIngresada).toEqual(190);
    });
});
