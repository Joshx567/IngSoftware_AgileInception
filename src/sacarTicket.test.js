import { sacarTicket } from './sacarTicket.js';

import {estacionesDB} from "../db.js";

describe("Sacar un ticket para un turno de una estación", () => {
    it("deberia registrar el ticket", () => {
    expect(sacarTicket()).toEqual(0);
    });
});