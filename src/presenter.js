import { registrarLitros, historialIngresos} from './registrarLitros.js';
import { generarTicket, historialTickets} from './generarTicket.js';
import { estacionesDB} from "../db.js";

const registrarForm = document.querySelector("#registrar-litros-form");
const resultadoRegistrar = document.querySelector("#resultado-registrar");

const ticketForm = document.querySelector("#generar-ticket-form");
const resultadoTicket = document.querySelector("#resultado-ticket");

const formularioVerTickets = document.querySelector("#ver-tickets-form");
const tablaTickets = document.querySelector("#tabla-tickets");

registrarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombreEstacion = document.querySelector("#select-nombre-estacion").value;
  const tipo = document.querySelector("#tipo-combustible").value;
  const cantidad = Number(document.querySelector("#cantidad-litros").value);
  const operario = document.querySelector("#usuario-operario").value;
  try {
    registrarLitros(nombreEstacion,cantidad,  tipo, operario);
    resultadoRegistrar.innerHTML = `<p> Se registraron ${cantidad} litros de ${tipo} en la estación ${nombreEstacion}</p>`;
  } catch (err) {
    resultadoRegistrar.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
});

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombreEstacion = document.querySelector("#select-nombre-estacion-ticket").value;
  const tipo = document.querySelector("#ticket-tipo-combustible").value;
  const cantidad = Number(document.querySelector("#ticket-cantidad").value);
  const hora = document.querySelector("#hora-ticket").value;
  const operario = document.querySelector("#usuario-operario-t").value;

  try {
    const ticket = generarTicket(nombreEstacion,cantidad, tipo,operario,hora );
    resultadoTicket.innerHTML = `<p>🎟️ Ticket generado con ID ${ticket.idTicket} para ${cantidad} litros a las ${hora}</p>`;
  } catch (err) {
    resultadoTicket.innerHTML = `<p style="color:red"> ${err.message}</p>`;
  }
});

function cargarOpcionesEstaciones() {
  const selects = [
    document.querySelector("#select-nombre-estacion"),
    document.querySelector("#select-nombre-estacion-ticket")
  ];

  selects.forEach(select => {
    select.innerHTML = '<option value="">Selecciona una estación</option>';

    estacionesDB.forEach(estacion => {
      const option = document.createElement("option");
      option.value = estacion.nombre;
      option.textContent = estacion.nombre;
      select.appendChild(option);
    });
  });
}

window.addEventListener("DOMContentLoaded", cargarOpcionesEstaciones);

document.addEventListener('DOMContentLoaded', () => {
  const selectEstacion = document.querySelector("#estacion-ticket-id");

  estacionesDB.forEach(estacion => {
    const option = document.createElement("option");
    option.value = estacion.id;
    option.textContent = estacion.nombre;
    selectEstacion.appendChild(option);
  });
});

formularioVerTickets.addEventListener("submit", (event) => {
  event.preventDefault();

  const estacionId = Number(document.querySelector("#estacion-ticket-id").value);
  const estacionSeleccionada = estacionesDB.find(estacion => estacion.id === estacionId);
  const detalleConductores = document.getElementById("detalle-conductores");
  detalleConductores.style.display = "none";

  if (estacionSeleccionada && estacionSeleccionada.ticketsCombustible.length > 0) {
    mostrarTickets(estacionSeleccionada.ticketsCombustible);
  } else {
    tablaTickets.innerHTML = "<tr><td colspan='5'>No hay tickets para esta estación.</td></tr>";
  }
});

function mostrarTickets(ticketsCombustible) {
  tablaTickets.innerHTML = "";
  const encabezado = document.createElement("tr");
  encabezado.innerHTML = `
    <th>ID Ticket</th>
    <th>Tipo de Combustible</th>
    <th>Cantidad (Litros)</th>
    <th>Operario</th>
    <th>Fecha</th>
    <th>Hora</th>
    <th>Conductores</th>
  `;
  tablaTickets.appendChild(encabezado);

  ticketsCombustible.forEach((ticket, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${ticket.idTicket}</td>
      <td>${ticket.tipoCombustible}</td>
      <td>${ticket.cantidadIngresada}</td>
      <td>${ticket.operario}</td>
      <td>${ticket.fecha}</td>
      <td>${ticket.hora}</td>
      <td><button data-ticket-index="${index}" class="ver-conductores-btn"> 👥 Ver</button></td>
    `;
    tablaTickets.appendChild(fila);
  });

  const botones = document.querySelectorAll(".ver-conductores-btn");
  botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const ticketIndex = e.target.getAttribute("data-ticket-index");
      mostrarConductores(ticketsCombustible[ticketIndex]);
    });
  });
}

function mostrarConductores(ticketsCombustible) {
  const tablaConductores = document.querySelector("#tabla-conductores tbody");
  const detalleConductores = document.getElementById("detalle-conductores");
  tablaConductores.innerHTML = "";
  detalleConductores.style.display = "block";
  if (!ticketsCombustible.ticketsConductores || ticketsCombustible.ticketsConductores.length === 0) {
    tablaConductores.innerHTML = "<tr><td colspan='5'>Este ticket no tiene conductores registrados.</td></tr>";
    return;
  }

  ticketsCombustible.ticketsConductores.forEach(conductor => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${conductor.ci}</td>
      <td>${conductor.nombre}</td>
      <td>${conductor.placa}</td>
      <td>${conductor.monto}</td>
      <td>${conductor.horaAtencion}</td>
    `;
    tablaConductores.appendChild(fila);
  });
}

document.querySelectorAll('.topnav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('section[id^="section-"]').forEach(sec => {
            sec.style.display = 'none';
        });
        const target = this.getAttribute('data-target');
        const sectionToShow = document.getElementById('section-' + target);
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }
    });
});

