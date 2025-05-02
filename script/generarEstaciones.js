let todasLasEstaciones = [];
let filtroCombustible = '';

async function cargarEstacionesDesdeJSON() {
    try {
        const response = await fetch('../estaciones.json');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        
        todasLasEstaciones = await response.json();
        console.log('Estaciones cargadas:', todasLasEstaciones);
        
        inicializarInterfaz();
    } catch (error) {
        console.error('Error al cargar estaciones:', error);
        // Datos de ejemplo con GNV
        todasLasEstaciones = [
            {
                id: 1,
                nombre: "Estación Principal",
                ubicacion: "Av. Libertador 123",
                horario: "06:00 - 22:00",
                combustibles: {
                    gasolina: { disponible: true, litros: 2500, tiempoEspera: 5 },
                    diesel: { disponible: true, litros: 1800, tiempoEspera: 8 },
                    gnv: { disponible: false }
                }
            },
            {
                id: 2,
                nombre: "Estación Norte",
                ubicacion: "Av. Principal 456",
                horario: "05:00 - 23:00",
                combustibles: {
                    gasolina: { disponible: false },
                    diesel: { disponible: true, litros: 3200, tiempoEspera: 3 },
                    gnv: { disponible: true, litros: 1500, tiempoEspera: 10 }
                }
            },
            {
                id: 3,
                nombre: "Estación GNV",
                ubicacion: "Av. Industrial 789",
                horario: "24 horas",
                combustibles: {
                    gasolina: { disponible: false },
                    diesel: { disponible: false },
                    gnv: { disponible: true, litros: 3000, tiempoEspera: 5 }
                }
            }
        ];
        inicializarInterfaz();
    }
}

function inicializarInterfaz() {
    mostrarSelectorEstaciones();
    mostrarEstacionesFiltradas();
}

function aplicarFiltro() {
    const selector = document.getElementById('selector-combustible');
    filtroCombustible = selector.value;
    mostrarEstacionesFiltradas();
}

function limpiarFiltro() {
    filtroCombustible = '';
    document.getElementById('selector-combustible').value = '';
    mostrarEstacionesFiltradas();
}

function filtrarEstaciones() {
    if (!filtroCombustible) return todasLasEstaciones;
    
    return todasLasEstaciones.filter(estacion => {
        const comb = estacion.combustibles[filtroCombustible];
        return comb && comb.disponible === true;
    });
}

function mostrarEstacionesFiltradas() {
    const contenedor = document.getElementById('lista-estaciones-disponibles');
    contenedor.innerHTML = '';
    
    const estacionesFiltradas = filtrarEstaciones();
    
    if (estacionesFiltradas.length === 0) {
        const mensaje = filtroCombustible 
            ? `No hay estaciones con ${filtroCombustible} disponible`
            : 'No hay estaciones disponibles';
        
        contenedor.innerHTML = `
            <div id="mensaje-no-estaciones">
                ${mensaje}
            </div>
        `;
        return;
    }

    estacionesFiltradas.forEach(estacion => {
        const divEstacion = document.createElement('div');
        divEstacion.className = 'estacion';
        divEstacion.innerHTML = `
            <h3>${estacion.nombre}</h3>
            <p><strong>Ubicación:</strong> ${estacion.ubicacion}</p>
            <p><strong>Horario:</strong> ${estacion.horario || 'No especificado'}</p>
            <div>
                <p><strong>Combustibles disponibles:</strong></p>
                <ul>
                    ${estacion.combustibles.gasolina.disponible ? 
                        `<li>Gasolina: ✅ (${estacion.combustibles.gasolina.litros || 'N/A'}L, ${estacion.combustibles.gasolina.tiempoEspera || 'N/A'}min)</li>` : ''}
                    ${estacion.combustibles.diesel.disponible ? 
                        `<li>Diésel: ✅ (${estacion.combustibles.diesel.litros || 'N/A'}L, ${estacion.combustibles.diesel.tiempoEspera || 'N/A'}min)</li>` : ''}
                    ${estacion.combustibles.gnv?.disponible ? 
                        `<li>GNV: ✅ (${estacion.combustibles.gnv.litros || 'N/A'}L, ${estacion.combustibles.gnv.tiempoEspera || 'N/A'}min)</li>` : ''}
                </ul>
            </div>
        `;
        divEstacion.addEventListener('click', () => mostrarDetalleEstacion(estacion));
        contenedor.appendChild(divEstacion);
    });
}

function mostrarSelectorEstaciones() {
    const selector = document.getElementById('selector-estaciones');
    selector.innerHTML = '<option value="">Seleccione una estación</option>';
    
    todasLasEstaciones.forEach(estacion => {
        const option = document.createElement('option');
        option.value = estacion.id;
        option.textContent = estacion.nombre;
        selector.appendChild(option);
    });
    
    selector.addEventListener('change', (e) => {
        const idEstacion = parseInt(e.target.value);
        if (idEstacion) {
            const estacion = todasLasEstaciones.find(e => e.id === idEstacion);
            mostrarDetalleEstacion(estacion);
        } else {
            document.getElementById('detalle-estacion').innerHTML = '';
        }
    });
}

function mostrarDetalleEstacion(estacion) {
    const detalleContainer = document.getElementById('detalle-estacion');
    
    detalleContainer.innerHTML = `
        <div class="detalle-estacion">
            <h3>${estacion.nombre}</h3>
            <p><strong>Ubicación:</strong> ${estacion.ubicacion}</p>
            <p><strong>Horario:</strong> ${estacion.horario || 'No especificado'}</p>
            <h4>Disponibilidad de combustibles:</h4>
            <ul>
                <li><strong>Gasolina:</strong> 
                    ${estacion.combustibles.gasolina.disponible ? 
                        `✅ Disponible (${estacion.combustibles.gasolina.litros || 'N/A'}L, ${estacion.combustibles.gasolina.tiempoEspera || 'N/A'}min)` : 
                        '❌ No disponible'}
                </li>
                <li><strong>Diésel:</strong> 
                    ${estacion.combustibles.diesel.disponible ? 
                        `✅ Disponible (${estacion.combustibles.diesel.litros || 'N/A'}L, ${estacion.combustibles.diesel.tiempoEspera || 'N/A'}min)` : 
                        '❌ No disponible'}
                </li>
                <li><strong>GNV:</strong> 
                    ${estacion.combustibles.gnv?.disponible ? 
                        `✅ Disponible (${estacion.combustibles.gnv.litros || 'N/A'}L, ${estacion.combustibles.gnv.tiempoEspera || 'N/A'}min)` : 
                        '❌ No disponible'}
                </li>
            </ul>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', cargarEstacionesDesdeJSON);