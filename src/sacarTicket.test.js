import { sacarTicket } from './sacarTicket.js';

import {estacionesDB} from "../db.js";

describe("Sacar un ticket para un turno de una estación", () => {
    it("deberia registrar el ticket", () => {  
    expect(sacarTicket(5)).toEqual(5);
    });
    it("deberia encontrar la estación seleccionada para el ticket", () => {  
    let estacion = estacionesDB.find(e => e.nombre === 'Estación Norte');
    expect(estacion.nombre).toEqual('Estación Norte');
    console.log(estacion);
    });
});