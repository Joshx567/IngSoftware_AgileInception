import {estacionesDB} from '../db.js';
export const historialIngresos = [];

export function registrarLitros(nombreEstacion, cantidad, tipoCombustible, operario) {
  const estacion = estacionesDB.find(e => e.nombre === nombreEstacion);
  if (!estacion){
    throw new Error("La estacion ingresada no existe");
  }
  if (cantidad <= 0){
    throw new Error("Cantidad ingresada invalida");
  }
  const cantidadIngresada = cantidad;
  if (tipoCombustible === "gasolina") {
    estacion.combustibles.gasolina.litros += cantidadIngresada;
    estacion.combustibles.gasolina.disponible = true;
  } else if (tipoCombustible === "diesel") {
    estacion.combustibles.diesel.litros += cantidadIngresada;
    estacion.combustibles.diesel.disponible = true;
  } else if (tipoCombustible === "gnv") {
    estacion.combustibles.gnv.litros += cantidadIngresada;
    estacion.combustibles.gnv.disponible = true;
  } 
  historialIngresos.push({
    idEstacion: estacion.id,
    nombreEstacion,
    tipoCombustible,
    cantidadIngresada,
    operario,
    fecha:new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  });
  return cantidadIngresada;
}