let todosLosTickets = [];
let usuarioActual = '';

const ticketsEJEMPLO = [
    {
        "nro": "12345",
        "usuario": "Juampi",
        "monto": 50.75,
        "hora": "08:30",
        "fecha": "2025-04-29"
    },
    {
        "nro": "23456",
        "usuario": "Mateo",
        "monto": 30,
        "hora": "10:15",
        "fecha": "2025-04-28"
    },
    {
        "nro": "34567",
        "usuario": "Chango",
        "monto": 70.25,
        "hora": "14:00",
        "fecha": "2025-04-27"
    }
];

function cargarTicketsDesdeJSON() {
    console.log('✅ generarTickets.js cargado correctamente');
    try {
        console.log('Tickets cargados:', ticketsEJEMPLO);

        // Añadimos solo los tickets que no están ya en todosLosTickets
        ticketsEJEMPLO.forEach(ticket => {
            if (!todosLosTickets.some(t => t.nro === ticket.nro)) {
                todosLosTickets.push(ticket);
            }
        });

        mostrarTickets();
        guardarTicketsEnStorage(); // Para que se conserven si recarga
    } catch (error) {
        console.error('Error al cargar tickets desde datos en línea:', error);
    }
}

function generarNumeroTicket() 
{
    return Math.floor(10000 + Math.random() * 90000).toString();
}

function crearTicket() {
    const usuario = document.getElementById('usuario').value.trim();
    const monto = parseFloat(document.getElementById('monto').value.trim());

    if (!usuario || isNaN(monto)) {
        alert('Completa todos los campos correctamente.');
        return;
    }

    usuarioActual = usuario;

    const ahora = new Date();
    const nuevoTicket = {
        nro: generarNumeroTicket(),
        usuario: usuario,
        monto: monto,
        hora: ahora.toTimeString().substring(0, 5),
        fecha: ahora.toISOString().substring(0, 10)
    };

    todosLosTickets.push(nuevoTicket);
    mostrarTickets();
}

function guardarTicketsEnStorage() {
    localStorage.setItem('tickets', JSON.stringify(todosLosTickets));
}

function mostrarTickets() {
    const mis = document.getElementById('lista-mis-tickets');
    const otros = document.getElementById('lista-otros-tickets');
    mis.innerHTML = '';
    otros.innerHTML = '';

    if (!usuarioActual) {
        mis.innerHTML = '<em>Debes ingresar tu nombre de usuario.</em>';
        otros.innerHTML = '<em>Esperando usuario...</em>';
        return;
    }

    const misTickets = todosLosTickets.filter(t => t.usuario === usuarioActual);
    const otrosTickets = todosLosTickets.filter(t => t.usuario !== usuarioActual);

    if (misTickets.length === 0) {
        mis.innerHTML = '<em>No tienes tickets registrados.</em>';
    } else {
        misTickets.forEach(ticket => {
            const div = document.createElement('div');
            div.className = 'ticket';
            div.innerHTML = `
                <strong>Nro:</strong> ${ticket.nro}<br>
                <strong>Usuario:</strong> ${ticket.usuario}<br>
                <strong>Monto:</strong> Bs ${ticket.monto}<br>
                <strong>Hora:</strong> ${ticket.hora}<br>
                <strong>Fecha:</strong> ${ticket.fecha}
            `;
            mis.appendChild(div);
        });
    }

    if (otrosTickets.length === 0) {
        otros.innerHTML = '<em>No hay otros tickets registrados.</em>';
    } else {
        otrosTickets.forEach(ticket => {
            const div = document.createElement('div');
            div.className = 'ticket';
            div.innerHTML = `
                <strong>Nro:</strong> ${ticket.nro}<br>
                <strong>Usuario:</strong> ${ticket.usuario}<br>
                <strong>Monto:</strong> Bs ${ticket.monto}<br>
                <strong>Hora:</strong> ${ticket.hora}<br>
                <strong>Fecha:</strong> ${ticket.fecha}
            `;
            otros.appendChild(div);
        });
    }
}

function cancelarTicket() {
    if (!usuarioActual) {
        alert('Primero debes ingresar tu nombre y crear un ticket.');
        return;
    }

    const misTickets = todosLosTickets.filter(t => t.usuario === usuarioActual);
    if (misTickets.length === 0) {
        alert('No tienes tickets activos.');
        return;
    }

    const confirmado = confirm('¿Estás seguro de cancelar tu ticket más reciente?');
    if (!confirmado) return;

    const ticketCancelado = misTickets[misTickets.length - 1];
    todosLosTickets = todosLosTickets.filter(t => t.nro !== ticketCancelado.nro);
    alert(`Ticket ${ticketCancelado.nro} cancelado.`);
    mostrarTickets();
}


// Ejecutar al iniciar
cargarTicketsDesdeJSON();
guardarTicketsEnStorage();