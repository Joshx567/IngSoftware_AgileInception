let todasLasEstaciones = [];
let filtroActivo = '';

async function cargarEstacionesDesdeJSON() {
    try {
        const response = await fetch('../estaciones.json');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        todasLasEstaciones = await response.json();
        mostrarEstaciones();
    } catch (error) {
        console.error('Error al cargar estaciones:', error);
        todasLasEstaciones = [];
    }
}

function aplicarFiltroCombustible() {
    filtroActivo = document.getElementById('filtro-combustible').value;
    mostrarEstaciones();
}

function mostrarEstaciones() {
    const contenedor = document.getElementById('lista-estaciones-disponibles');
    contenedor.innerHTML = '';
    
    const estacionesFiltradas = filtroActivo ? 
        todasLasEstaciones.filter(e => e.combustibles[filtroActivo]?.disponible) :
        todasLasEstaciones;

    if (estacionesFiltradas.length === 0) {
        contenedor.innerHTML = '<em>No hay estaciones con este filtro.</em>';
        return;
    }

    estacionesFiltradas.forEach(estacion => {
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

window.addEventListener('DOMContentLoaded', () => {
    cargarEstacionesDesdeJSON();
    
    // Crear filtro dinámicamente
    const filtroHTML = `
        <select id="filtro-combustible" onchange="aplicarFiltroCombustible()">
            <option value="">Todos</option>
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diésel</option>
        </select>
    `;
    document.querySelector('.seccion-estaciones').insertAdjacentHTML('afterbegin', filtroHTML);
});