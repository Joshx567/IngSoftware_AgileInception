import { estacionesDB, conductoresDB } from "../db.js";
import { sacarTicket } from "./sacarTicket.js";

const usuarioActual = "Carlos"; // fijo

// --- Referencias DOM ---
const sectionSacarTicket = document.getElementById("section-sacar-ticket");
const sectionMisTickets = document.getElementById("section-mis-tickets");
const sectionEstaciones = document.getElementById("section-estaciones");

const navLinks = document.querySelectorAll("nav.topnav_2 a");

const selectStation = document.getElementById("select-station");
const selectFuelTicket = document.getElementById("select-fuel-ticket");
const inputAmount = document.getElementById("input-amount");
const inputLicensePlate = document.getElementById("input-license-plate");
const inputIdCard = document.getElementById("input-id-card");

const btnGetTicket = document.getElementById("btn-get-ticket");

const myLatestTicketDiv = document.getElementById("my-latest-ticket");
const allOtherTicketsDiv = document.getElementById("all-other-tickets");
const btnCancelLatestTicket = document.getElementById("btn-cancel-latest-ticket");

// --- Funciones ---

// Cambiar visibilidad de secciones
function mostrarSeccion(target) {
  sectionSacarTicket.style.display = "none";
  sectionMisTickets.style.display = "none";
  sectionEstaciones.style.display = "none";

  if (target === "sacar-ticket") sectionSacarTicket.style.display = "block";
  else if (target === "mis-tickets") {
    sectionMisTickets.style.display = "block";
    cargarMisTickets();
  } else if (target === "estaciones") {
    sectionEstaciones.style.display = "block";
  }
}

function cargarEstacionesYTickets() {
  selectStation.innerHTML = "";

  estacionesDB.forEach(estacion => {
    if (estacion.ticketsCombustible.length >= 0) {
      const optEstacion = document.createElement("option");
      optEstacion.value = estacion.nombre;
      optEstacion.textContent = estacion.nombre;
      selectStation.appendChild(optEstacion);
    }
  });

  cargarTicketsPorEstacion();
}

function cargarTicketsPorEstacion() {
  const nombreEstacion = selectStation.value;
  selectFuelTicket.innerHTML = "";

  if (!nombreEstacion) return;

  const estacion = estacionesDB.find(e => e.nombre === nombreEstacion);
  if (!estacion) return;

  estacion.ticketsCombustible.forEach(ticket => {
    if (ticket.estado === "activo" && ticket.cantidadIngresada > 0) {
      const optTicket = document.createElement("option");
      optTicket.value = ticket.idTicket;
      optTicket.textContent = `${ticket.tipoCombustible} - ${ticket.cantidadIngresada} litros disponibles`;
      selectFuelTicket.appendChild(optTicket);
    }
  });
}

function cargarMisTickets() {
  const conductor = conductoresDB.find(c => c.nombre === usuarioActual);
  if (!conductor) {
    myLatestTicketDiv.textContent = "No se encontró conductor.";
    allOtherTicketsDiv.textContent = "";
    return;
  }

  const historial = conductor.ticketsHistorial;

  if (historial.length === 0) {
    myLatestTicketDiv.textContent = "No tienes tickets.";
    allOtherTicketsDiv.textContent = "";
    btnCancelLatestTicket.disabled = true;
    return;
  }

  btnCancelLatestTicket.disabled = false;
  const ultimosDos = historial.slice(-1).reverse(); 
  const pasados = historial.slice(0, historial.length - 1);

  const crearTicketHTML = (ticket) => {
    const div = document.createElement("div");
    div.className = "ticket-card";
    div.innerHTML = `
      <strong>Ticket #${ticket.idTicket}</strong><br>
      <span><strong>Estación:</strong> ${ticket.estacionDeCarga}</span><br>
      <span><strong>Fecha:</strong> ${ticket.fecha}</span><br>
      <span><strong>Cantidad:</strong> ${ticket.montoCargado} litros</span><br>
      <span><strong>Hora:</strong> ${ticket.horaCarga}</span>
    `;
    return div;
  };

  myLatestTicketDiv.innerHTML = "";
  ultimosDos.forEach(ticket => {
    myLatestTicketDiv.appendChild(crearTicketHTML(ticket));
  });

  allOtherTicketsDiv.innerHTML = "";
  if (pasados.length === 0) {
    allOtherTicketsDiv.textContent = "No hay tickets pasados.";
  } else {
    pasados.forEach(ticket => {
      allOtherTicketsDiv.appendChild(crearTicketHTML(ticket));
    });
  }
}

async function manejarSacarTicket() {
  try {
    const nombreConductor = usuarioActual;
    const placaIngresada = inputLicensePlate.value.trim();
    const carnet = inputIdCard.value.trim();
    const montoIngresado = Number(inputAmount.value);
    console.log(selectStation.value);
    console.log(selectFuelTicket.value);
    
    const estacionSeleccionada = selectStation.value;
    const idTicketSeleccionado = selectFuelTicket.value;

    if (!placaIngresada || !carnet || !montoIngresado || !estacionSeleccionada || !idTicketSeleccionado) {
      alert("Por favor completa todos los campos.");
      return;
    }
    console.log('asdasd');

    sacarTicket(nombreConductor, placaIngresada, carnet, montoIngresado, estacionSeleccionada, idTicketSeleccionado);

    alert("Ticket sacado correctamente!");

    inputAmount.value = "";
    inputLicensePlate.value = "";
    inputIdCard.value = "";
    console.log('asdasd');

    cargarMisTickets();
    cargarEstacionesYTickets(); 
  } catch (error) {
    alert("Error al sacar ticket: " + error.message);
  }
}

function cancelarUltimoTicket() {
  const conductor = conductoresDB.find(c => c.nombre === usuarioActual);
  if (!conductor || conductor.ticketsHistorial.length === 0) {
    alert("No tienes tickets para cancelar.");
    return;
  }

  const ultimoTicket = conductor.ticketsHistorial.pop();
  const estacion = estacionesDB.find(e => e.nombre === ultimoTicket.estacionDeCarga);
  if (estacion) {
    const ticket = estacion.ticketsCombustible.find(t => t.idTicket === ultimoTicket.idTicket);
    if (ticket) {
      ticket.cantidadIngresada += ultimoTicket.montoCargado;
      ticket.ticketsConductores = ticket.ticketsConductores.filter(tc => tc.idTicket !== ultimoTicket.idTicket);
    }
  }

  alert(`Se canceló el ticket ${ultimoTicket.idTicket}`);
  cargarMisTickets();
  cargarEstacionesYTickets();
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.dataset.target;
    mostrarSeccion(target);
  });
});

selectStation.addEventListener("change", cargarTicketsPorEstacion);
btnGetTicket.addEventListener("click", manejarSacarTicket);
btnCancelLatestTicket.addEventListener("click", cancelarUltimoTicket);

function init() {
  mostrarSeccion("sacar-ticket");
  cargarEstacionesYTickets();
  cargarMisTickets();
  initMap();
}


init();
