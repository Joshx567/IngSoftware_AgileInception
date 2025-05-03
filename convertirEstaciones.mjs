import { estacionesDB } from './public/estaciones.js';
import { writeFile } from 'fs/promises';

async function guardarComoJSON() {
  try {
    const jsonData = JSON.stringify(estacionesDB, null, 2);
    await writeFile('estaciones.json', jsonData);
    console.log('Archivo estaciones.json creado');
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
}

guardarComoJSON();

import { estacionesDB } from './public/estaciones.js';
import { writeFile } from 'fs/promises';

async function actualizarJSON() {
  try {
    const json = JSON.stringify(estacionesDB, null, 2);
    await writeFile('estaciones.json', json);
    console.log('estaciones.json actualizado');
  } catch (e) {
    console.error('Error al actualizar estaciones.json:', e);
  }
}

actualizarJSON();
