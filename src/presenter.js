import { registrarLitros,generarTicket} from "./app.js";

const registrarForm = document.querySelector("#registrar-litros-form");
const resultadoRegistrar = document.querySelector("#resultado-registrar");

const ticketForm = document.querySelector("#generar-ticket-form");
const resultadoTicket = document.querySelector("#resultado-ticket");

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