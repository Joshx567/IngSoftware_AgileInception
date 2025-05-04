import { registrarLitros,generarTicket} from "./app.js";
import { estacionesDB} from "../estaciones.js";

const registrarForm = document.querySelector("#registrar-litros-form");
const resultadoRegistrar = document.querySelector("#resultado-registrar");

const ticketForm = document.querySelector("#generar-ticket-form");
const resultadoTicket = document.querySelector("#resultado-ticket");

const formularioVerTickets = document.querySelector("#ver-tickets-form");
const tablaTickets = document.querySelector("#tabla-tickets");

registrarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const estacionId = Number(document.querySelector("#estacion-id").value);
  const tipo = document.querySelector("#tipo-combustible").value;
  const cantidad = Number(document.querySelector("#cantidad-litros").value);
  const operario = document.querySelector("#usuario-operario").value;
  try {
    registrarLitros(estacionId,cantidad,  tipo, operario);
    resultadoRegistrar.innerHTML = `<p> Se registraron ${cantidad} litros de ${tipo} en la estación ${estacionId}</p>`;
  } catch (err) {
    resultadoRegistrar.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
});

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const estacionId = Number(document.querySelector("#ticket-estacion-id").value);
  const tipo = document.querySelector("#ticket-tipo-combustible").value;
  const cantidad = Number(document.querySelector("#ticket-cantidad").value);
  const hora = document.querySelector("#hora-ticket").value;
  const operario = document.querySelector("#usuario-operario-t").value;

  try {
    const ticket = generarTicket(estacionId,cantidad, tipo,operario,hora );
    resultadoTicket.innerHTML = `<p>🎟️ Ticket generado con ID ${ticket.idTicket} para ${cantidad} litros a las ${hora}</p>`;
  } catch (err) {
    resultadoTicket.innerHTML = `<p style="color:red"> ${err.message}</p>`;
  }
});

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

  if (estacionSeleccionada && estacionSeleccionada.tickets.length > 0) {
    mostrarTickets(estacionSeleccionada.tickets);
  } else {
    tablaTickets.innerHTML = "<tr><td colspan='5'>No hay tickets para esta estación.</td></tr>";
  }
});

function mostrarTickets(tickets) {
  tablaTickets.innerHTML = "";
  const encabezado = document.createElement("tr");
  encabezado.innerHTML = `
    <th>ID Ticket</th>
    <th>Tipo de Combustible</th>
    <th>Cantidad (Litros)</th>
    <th>Operario</th>
    <th>Fecha</th>
    <th>Hora</th>
  `;
  tablaTickets.appendChild(encabezado);
  tickets.forEach(ticket => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${ticket.idTicket}</td>
      <td>${ticket.tipoCombustible}</td>
      <td>${ticket.cantidadIngresada}</td>
      <td>${ticket.operario}</td>
      <td>${ticket.fecha}</td>
      <td>${ticket.hora}</td>
    `;
    tablaTickets.appendChild(fila);
  });
}