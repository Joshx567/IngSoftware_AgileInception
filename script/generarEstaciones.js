// generarEstaciones.js - SPRINT 1.3
let todasLasEstaciones = [];

async function cargarEstacionesDesdeJSON() {
    try {
        const response = await fetch('../estaciones.json');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        todasLasEstaciones = await response.json();
        mostrarEstaciones();
    } catch (error) {
        console.error('Error al cargar estaciones:', error);
        todasLasEstaciones = []; // Datos vacíos si falla
    }
}

function mostrarEstaciones() {
    const contenedor = document.getElementById('lista-estaciones-disponibles');
    contenedor.innerHTML = '';
    
    if (todasLasEstaciones.length === 0) {
        contenedor.innerHTML = '<em>No hay estaciones cargadas.</em>';
        return;
    }

    todasLasEstaciones.forEach(estacion => {
        const div = document.createElement('div');
        div.className = 'estacion';
        div.innerHTML = `
            <strong>${estacion.nombre}</strong><br>
            <em>${estacion.ubicacion}</em><br>
            Gasolina: ${estacion.combustibles.gasolina.disponible ? '✅' : '❌'}<br>
            Diésel: ${estacion.combustibles.diesel.disponible ? '✅' : '❌'}
        `;
        contenedor.appendChild(div);
    });
}

window.addEventListener('DOMContentLoaded', cargarEstacionesDesdeJSON);