let todosLosTickets = [];
let usuarioActual = '';

async function cargarTicketsDesdeJSON() {
    try {
        const response = await fetch('../tickets.json');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        const tickets = await response.json();

        console.log('Tickets cargados:', tickets);

        // Añadimos solo los tickets que no están ya en todosLosTickets
        tickets.forEach(ticket => {
            if (!todosLosTickets.some(t => t.nro === ticket.nro)) {
                todosLosTickets.push(ticket);
            }
        });

        mostrarTickets();
    } catch (error) {
        console.error('Error al cargar tickets:', error);
    }
}

window.addEventListener('DOMContentLoaded', cargarTicketsDesdeJSON);

function generarNumeroTicket() {
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
