import { sacarTicket } from './sacarTicket.js';

import {estacionesDB} from "../db.js";

describe("Sacar un ticket para un turno de una estación", () => {
    it("deberia registrar el ticket", () => {  
    expect(sacarTicket(5,'Estación Norte')).toEqual(5);
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
});