let todasLasEstaciones = [];

async function cargarEstacionesDesdeJSON() {
    try {
        const response = await fetch('../estaciones.json');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        const estaciones = await response.json();

        console.log('Estaciones cargadas:', estaciones);

        estaciones.forEach(estacion => {
            if (!todasLasEstaciones.some(e => e.id === estacion.id)) {
                todasLasEstaciones.push(estacion);
            }
        });

        mostrarSelectorEstaciones();
    } catch (error) {
        console.error('Error al cargar estaciones:', error);
        // Datos de ejemplo
        todasLasEstaciones = [
            {
                id: 1,
                nombre: "Estación Principal",
                ubicacion: "Av. Libertador 123",
                horario: "06:00 - 22:00",
                combustibles: {
                    gasolina: { disponible: true, litros: 2500, tiempoEspera: 5 },
                    diesel: { disponible: true, litros: 1800, tiempoEspera: 8 }
                }
            },
            {
                id: 2,
                nombre: "Estación Norte",
                ubicacion: "Av. Principal 456",
                horario: "05:00 - 23:00",
                combustibles: {
                    gasolina: { disponible: false, litros: 0, tiempoEspera: 0 },
                    diesel: { disponible: true, litros: 3200, tiempoEspera: 3 }
                }
            }
        ];
        mostrarSelectorEstaciones();
    }
}

function mostrarSelectorEstaciones() {
    const selector = document.getElementById('selector-estaciones');
    const detalleContainer = document.getElementById('detalle-estacion');
    
    // Limpiar y crear selector
    selector.innerHTML = '<option value="">Seleccione una estación</option>';
    
    todasLasEstaciones.forEach(estacion => {
        const option = document.createElement('option');
        option.value = estacion.id;
        option.textContent = estacion.nombre;
        selector.appendChild(option);
    });
    
    // Event listener para cambio de selección
    selector.addEventListener('change', (e) => {
        const idEstacion = parseInt(e.target.value);
        if (idEstacion) {
            const estacionSeleccionada = todasLasEstaciones.find(e => e.id === idEstacion);
            mostrarDetalleEstacion(estacionSeleccionada);
        } else {
            detalleContainer.innerHTML = '';
        }
    });
}

function mostrarDetalleEstacion(estacion) {
    const detalleContainer = document.getElementById('detalle-estacion');
    
    detalleContainer.innerHTML = `
        <div class="detalle-estacion" style="margin-top:20px; padding:15px; border:1px solid #ddd; border-radius:8px; background:#f8f9fa">
            <h3 style="margin-top:0; color:#2c3e50">${estacion.nombre}</h3>
            <p><strong>Ubicación:</strong> ${estacion.ubicacion}</p>
            <p><strong>Horario:</strong> ${estacion.horario || 'No especificado'}</p>
            
            <h4 style="margin-bottom:5px;">Disponibilidad de combustibles:</h4>
            <ul style="margin-top:5px;">
                <li><strong>Gasolina:</strong> 
                    ${estacion.combustibles.gasolina.disponible ? 
                        `✅ Disponible (${estacion.combustibles.gasolina.litros} litros, ${estacion.combustibles.gasolina.tiempoEspera} min espera)` : 
                        '❌ No disponible'}
                </li>
                <li><strong>Diésel:</strong> 
                    ${estacion.combustibles.diesel.disponible ? 
                        `✅ Disponible (${estacion.combustibles.diesel.litros} litros, ${estacion.combustibles.diesel.tiempoEspera} min espera)` : 
                        '❌ No disponible'}
                </li>
            </ul>
        </div>
    `;
}

// Inicialización
window.addEventListener('DOMContentLoaded', cargarEstacionesDesdeJSON);