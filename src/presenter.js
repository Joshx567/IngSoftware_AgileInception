import { registrarLitros, historialIngresos} from './registrarLitros.js';
import { generarTicket, historialTickets} from './generarTicket.js';
import { estacionesDB} from "../db.js";

const usuario = 'Carlos López';
const registrarForm = document.querySelector("#registrar-litros-form");
const resultadoRegistrar = document.querySelector("#resultado-registrar");

const ticketForm = document.querySelector("#generar-ticket-form");
const resultadoTicket = document.querySelector("#resultado-ticket");

const formularioVerTickets = document.querySelector("#ver-tickets-form");
const tablaTickets = document.querySelector("#tabla-tickets");

const listaEstacionesDiv = document.getElementById('lista-estaciones-disponibles');
const selectorEstaciones = document.getElementById('selector-estaciones');
const selectorCombustible = document.getElementById('selector-combustible');
const detalleEstacionDiv = document.getElementById('detalle-estacion');

document.querySelectorAll('.topnav_2 a').forEach(link => {
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
function mostrarEstaciones(estaciones) {
  listaEstacionesDiv.innerHTML = ''; 
  detalleEstacionDiv = null; 

  estaciones.forEach(est => {
    const div = document.createElement('div');
    div.classList.add('item-estacion');
    div.style.border = '1px solid #ccc';
    div.style.marginBottom = '10px';
    div.style.padding = '8px';

    div.innerHTML = `
      <h4>${est.nombre}</h4>
      <p><strong>Ubicación:</strong> ${est.ubicacion}</p>
      <p><strong>Horario:</strong> ${est.horaApertura} - ${est.horaCierre}</p>
      <button data-id="${est.id}">Ver detalles</button>
    `;

    const detalleDiv = document.createElement('div');
    detalleDiv.style.display = 'none';
    detalleDiv.style.padding = '10px';
    detalleDiv.style.borderTop = '1px dashed #999';

    div.appendChild(detalleDiv);

    div.querySelector('button').addEventListener('click', () => {
      if (window.detalleEstacionDiv && window.detalleEstacionDiv !== detalleDiv) {
        window.detalleEstacionDiv.style.display = 'none';
      }

      const estaVisible = detalleDiv.style.display === 'block';
      detalleDiv.style.display = estaVisible ? 'none' : 'block';

      if (!estaVisible) {
        mostrarDetalleEstacion(est, detalleDiv);
        window.detalleEstacionDiv = detalleDiv;
      }
    });

    listaEstacionesDiv.appendChild(div);
  });
}

function mostrarEstaciones(estaciones) {
  listaEstacionesDiv.innerHTML = '';

  estaciones.forEach(est => {
    const div = document.createElement('div');
    div.classList.add('item-estacion');
    div.style.border = '1px solid #ccc';
    div.style.marginBottom = '10px';
    div.style.padding = '8px';

    div.innerHTML = `
      <h4>${est.nombre}</h4>
      <p><strong>Ubicación:</strong> ${est.ubicacion}</p>
      <p><strong>Horario:</strong> ${est.horaApertura} - ${est.horaCierre}</p>
      <button data-id="${est.id}">Ver detalles</button>
    `;

    div.querySelector('button').addEventListener('click', () => mostrarDetalleEstacion(est));
    listaEstacionesDiv.appendChild(div);
  });
}


function mostrarDetalleEstacion(est) {
  detalleEstacionDiv.innerHTML = `
    <h3>${est.nombre}</h3>
    <p><strong>Ubicación:</strong> ${est.ubicacion}</p>
    <p><strong>Horario:</strong> ${est.horaApertura} - ${est.horaCierre}</p>
    <h4>Combustibles:</h4>
    <ul>
      ${Object.entries(est.combustibles).map(([tipo, c]) => `
        <li>
          <strong>${tipo.toUpperCase()}</strong>: 
          ${c.disponible ? '<span style="color:green">Disponible</span>' : '<span style="color:red">No disponible</span>'}, 
          ${c.litros} litros, 
          Tiempo carga promedio: ${c.tiempoPromedioCarga} min
        </li>
      `).join('')}
    </ul>

    <h4>Tickets de Combustible:</h4>
    <ul>
      ${est.ticketsCombustible.length === 0 ? '<li>No hay tickets</li>' :
        est.ticketsCombustible.map(t => `
          <li>
            <strong>${t.tipoCombustible.toUpperCase()}</strong> - ${t.cantidadIngresada}L,
            Hora: ${t.hora},
            Fecha: ${t.fecha}
          </li>
        `).join('')}
    </ul>
  `;
}

function cargarSelectores(estaciones) {
  selectorEstaciones.innerHTML = `<option value="">Todas las estaciones</option>`;
  estaciones.forEach(est => {
    selectorEstaciones.innerHTML += `<option value="${est.id}">${est.nombre}</option>`;
  });
}

function aplicarFiltro() {
  const idEstacion = selectorEstaciones.value;
  const tipoCombustible = selectorCombustible.value;

  let resultado = [...estacionesDB];

  if (idEstacion) {
    resultado = resultado.filter(e => e.id == idEstacion);
  }

  if (tipoCombustible) {
    resultado = resultado.filter(e => e.combustibles[tipoCombustible]?.disponible);
  }

  mostrarEstaciones(resultado);
}

function limpiarFiltros() {
  selectorEstaciones.value = '';
  selectorCombustible.value = '';
  mostrarEstaciones(estacionesDB);
  detalleEstacionDiv.innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarEstaciones(estacionesDB);
  cargarSelectores(estacionesDB);

  document.querySelector('.filter-controls button').addEventListener('click', aplicarFiltro);
  document.querySelector('.filter-controls .secondary-btn').addEventListener('click', limpiarFiltros);
  const map = L.map('map').setView([-17.3895, -66.1568], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const lat = -17.393318;
  const lon = -66.154874;
  L.marker([lat, lon]).addTo(map)
    .bindPopup('<b>Estacuón Principal</b><br>Av. Heroínas esquina Lanza.')
    .openPopup();
});

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

