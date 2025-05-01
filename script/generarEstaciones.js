let todasLasEstaciones = [];
let estacionFiltrada = '';
//let mostrarTiempos = false; 

// -------------------------------
// SPRINT 1.3: Ver estaciones con combustible disponible
// -------------------------------
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

        mostrarEstaciones();
    } catch (error) {
        console.error('Error al cargar estaciones:', error);
        // Datos de ejemplo si falla la carga
        todasLasEstaciones = [
            {
                id: 1,
                nombre: "Estación de Emergencia",
                ubicacion: "Calle Falsa 123",
                combustibles: {
                    gasolina: { disponible: true, litros: 1000, tiempoEspera: 45 },
                    diesel: { disponible: false, litros: 0, tiempoEspera: 0 }
                }
            }
        ];
    }
}
