let todasLasEstaciones = [];
let filtroCombustible = '';
let filtroEstacionId = '';
async function cargarEstacionesDesdeJSON() {
    try {
        const response = await fetch('../estaciones.json');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        
        todasLasEstaciones = await response.json();
        console.log('Estaciones cargadas:', todasLasEstaciones);
        
        // Añadir tipo a cada combustible
        todasLasEstaciones.forEach(estacion => {
            if (estacion.combustibles.gasolina) estacion.combustibles.gasolina.tipo = 'gasolina';
            if (estacion.combustibles.diesel) estacion.combustibles.diesel.tipo = 'diesel';
            if (estacion.combustibles.gnv) estacion.combustibles.gnv.tipo = 'gnv';
        });
        
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
                tiempoBaseEspera: 5,
                combustibles: {
                    gasolina: { 
                        disponible: true, 
                        litros: 2500, 
                        tiempoEspera: 5,
                        tipo: "gasolina"
                    },
                    diesel: { 
                        disponible: true, 
                        litros: 1800, 
                        tiempoEspera: 8,
                        tipo: "diesel"
                    },
                    gnv: { 
                        disponible: false,
                        tipo: "gnv"
                    }
                }
            },
            {
                id: 2,
                nombre: "Estación Norte",
                ubicacion: "Av. Principal 456",
                horario: "05:00 - 23:00",
                tiempoBaseEspera: 7,
                combustibles: {
                    gasolina: { 
                        disponible: false,
                        tipo: "gasolina"
                    },
                    diesel: { 
                        disponible: true, 
                        litros: 3200, 
                        tiempoEspera: 3,
                        tipo: "diesel"
                    },
                    gnv: { 
                        disponible: true, 
                        litros: 1500, 
                        tiempoEspera: 10,
                        tipo: "gnv"
                    }
                }
            },
            {
                id: 3,
                nombre: "Estación GNV",
                ubicacion: "Av. Industrial 789",
                horario: "24 horas",
                tiempoBaseEspera: 3,
                combustibles: {
                    gasolina: { 
                        disponible: false,
                        tipo: "gasolina"
                    },
                    diesel: { 
                        disponible: false,
                        tipo: "diesel"
                    },
                    gnv: { 
                        disponible: true, 
                        litros: 3000, 
                        tiempoEspera: 5,
                        tipo: "gnv"
                    }
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
    filtroCombustible = document.getElementById('selector-combustible').value;
    filtroEstacionId = document.getElementById('selector-estaciones').value;
    mostrarEstacionesFiltradas();
}

function limpiarFiltro() {
    filtroCombustible = '';
    filtroEstacionId = '';
    document.getElementById('selector-combustible').value = '';
    document.getElementById('selector-estaciones').value = '';
    mostrarEstacionesFiltradas();
}

function filtrarEstaciones() {
    return todasLasEstaciones.filter(estacion => {
        // Filtro por estación seleccionada
        if (filtroEstacionId && estacion.id != filtroEstacionId) return false;
        
        // Filtro por combustible seleccionado
        if (filtroCombustible) {
            const comb = estacion.combustibles[filtroCombustible];
            if (!comb || !comb.disponible) return false;
        }
        
        return true;
    });
}

function mostrarEstacionesFiltradas() {
    const contenedor = document.getElementById('lista-estaciones-disponibles');
    contenedor.innerHTML = '';
    
    const estacionesFiltradas = filtrarEstaciones();
    
    if (estacionesFiltradas.length === 0) {
        let mensaje = 'No hay estaciones disponibles';
        if (filtroEstacionId && filtroCombustible) {
            mensaje = `La estación seleccionada no tiene ${filtroCombustible} disponible`;
        } else if (filtroCombustible) {
            mensaje = `No hay estaciones con ${filtroCombustible} disponible`;
        } else if (filtroEstacionId) {
            mensaje = 'Estación no disponible';
        }
        
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
                    ${mostrarCombustibleFiltrado(estacion, 'gasolina')}
                    ${mostrarCombustibleFiltrado(estacion, 'diesel')}
                    ${mostrarCombustibleFiltrado(estacion, 'gnv')}
                </ul>
            </div>
        `;
        divEstacion.addEventListener('click', () => mostrarDetalleEstacion(estacion));
        contenedor.appendChild(divEstacion);
    });
}

function mostrarCombustibleFiltrado(estacion, tipoCombustible) {
    const comb = estacion.combustibles[tipoCombustible];
    
    // Si hay filtro de combustible y no es este tipo, no mostrar
    if (filtroCombustible && filtroCombustible !== tipoCombustible) return '';
    
    if (comb && comb.disponible) {
        return `<li>${tipoCombustible.toUpperCase()}: ✅ (${comb.litros || 'N/A'}L, ${comb.tiempoEspera || 'N/A'}min)</li>`;
    } else if (!filtroCombustible) { // Solo mostrar no disponible si no hay filtro
        return `<li>${tipoCombustible.toUpperCase()}: ❌ No disponible</li>`;
    }
    return '';
}

function mostrarSelectorEstaciones() {
    const selector = document.getElementById('selector-estaciones');
    selector.innerHTML = '<option value="">Todas las estaciones</option>';
    
    todasLasEstaciones.forEach(estacion => {
        const option = document.createElement('option');
        option.value = estacion.id;
        option.textContent = estacion.nombre;
        selector.appendChild(option);
    });
    
    selector.addEventListener('change', aplicarFiltro);
}

function mostrarDetalleEstacion(estacion) {
    const detalleContainer = document.getElementById('detalle-estacion');
    const ticketsEstacion = obtenerTicketsPorEstacion(estacion.id);
    const tiempoEsperaEstimado = calcularTiempoEspera(estacion, ticketsEstacion);
    
    detalleContainer.innerHTML = `
        <div class="detalle-estacion">
            <h3>${estacion.nombre}</h3>
            <p><strong>Ubicación:</strong> ${estacion.ubicacion}</p>
            <p><strong>Horario:</strong> ${estacion.horario || 'No especificado'}</p>
            
            <div class="tiempo-espera">
                <p><strong>Tiempo de espera estimado:</strong></p>
                <p><span class="resaltado">${tiempoEsperaEstimado} minutos</span> (basado en ${ticketsEstacion.length} reservas activas)</p>
            </div>
            
            <h4>Disponibilidad de combustibles:</h4>
            <ul>
                ${mostrarDetalleCombustible(estacion, 'gasolina', ticketsEstacion)}
                ${mostrarDetalleCombustible(estacion, 'diesel', ticketsEstacion)}
                ${mostrarDetalleCombustible(estacion, 'gnv', ticketsEstacion)}
            </ul>
        </div>
    `;
}

function mostrarDetalleCombustible(estacion, tipo, tickets) {
    const comb = estacion.combustibles[tipo];
    if (!comb) return '';
    
    if (comb.disponible) {
        const tiempo = calcularTiempoPorCombustible(comb, tickets);
        return `
            <li>
                <strong>${tipo.toUpperCase()}:</strong> 
                ✅ Disponible (${comb.litros || 'N/A'}L, ${tiempo} min estimados)
            </li>
        `;
    }
    return `
        <li>
            <strong>${tipo.toUpperCase()}:</strong> ❌ No disponible
        </li>
    `;
}

function obtenerTicketsPorEstacion(estacionId) {
    // Simulación de datos de tickets
    const ticketsSimulados = [
        { id: 1, estacionId: 1, combustible: 'gasolina', tiempoAtencion: 5 },
        { id: 2, estacionId: 1, combustible: 'diesel', tiempoAtencion: 7 },
        { id: 3, estacionId: 2, combustible: 'diesel', tiempoAtencion: 6 },
        { id: 4, estacionId: 2, combustible: 'gnv', tiempoAtencion: 8 },
        { id: 5, estacionId: 3, combustible: 'gnv', tiempoAtencion: 4 }
    ];
    
    return ticketsSimulados.filter(t => t.estacionId == estacionId);
}

function calcularTiempoEspera(estacion, tickets) {
    const tiempoBase = estacion.tiempoBaseEspera || 5;
    if (tickets.length === 0) return tiempoBase;
    
    const tiempoTotal = tickets.reduce((sum, ticket) => sum + ticket.tiempoAtencion, 0);
    const promedio = tiempoTotal / tickets.length;
    
    return Math.round(tiempoBase + (promedio * tickets.length * 0.3));
}

function calcularTiempoPorCombustible(combustible, tickets) {
    const ticketsCombustible = tickets.filter(t => t.combustible === combustible.tipo);
    if (ticketsCombustible.length === 0) return combustible.tiempoEspera || 5;
    
    const tiempoTotal = ticketsCombustible.reduce((sum, ticket) => sum + ticket.tiempoAtencion, 0);
    const promedio = tiempoTotal / ticketsCombustible.length;
    
    return Math.round((combustible.tiempoEspera || 5) + (promedio * ticketsCombustible.length * 0.3));
}

window.addEventListener('DOMContentLoaded', cargarEstacionesDesdeJSON);