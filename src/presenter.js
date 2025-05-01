import { registrarLitros} from "./app.js";

const registrarForm = document.querySelector("#registrar-litros-form");
const resultadoRegistrar = document.querySelector("#resultado-registrar");

registrarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const estacionId = Number(document.querySelector("#estacion-id").value);
  const tipo = document.querySelector("#tipo-combustible").value;
  const cantidad = Number(document.querySelector("#cantidad-litros").value);
  const usuario = document.querySelector("#usuario-operario").value;
  try {
    registrarLitros(estacionId,cantidad,  tipo, usuario);
    resultadoRegistrar.innerHTML = `<p> Se registraron ${cantidad} litros de ${tipo} en la estación ${estacionId}</p>`;
  } catch (err) {
    resultadoRegistrar.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
});


