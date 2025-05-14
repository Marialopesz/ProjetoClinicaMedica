import { Medico } from "./Medico.js";
import { Paciente } from "./Paciente.js";
import { DomHandler } from "./DOMhandler.js";

let medicos = [];
let pacientes = [];

async function carregarDados() {
  try {
    const responseMedico = await fetch("./data/medicos.json");
    const medicosData = await responseMedico.json();

    medicos = medicosData.map(
      (medico) =>
        new Medico(medico.nome, medico.idade, medico.cpf, medico.especialidade)
    );

    const responsePaciente = await fetch("./data/pacientes.json");
    const pacienteData = await responsePaciente.json();

    pacientes = pacienteData.map(
      ({ nome, idade, cpf }) => new Paciente(nome, idade, cpf) //mesma coisa que o de cima porem usando a destruturacao
    );

    DomHandler.atualizarListaPaciente(pacientes);
    DomHandler.atualizarListaMedico(medicos);
  } catch (err) {
    console.error("Erro ao carregar os dados", err);
  }
}

//função p/formatar data

function formatarData(data) {
  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

//função para agendar e exibir consultas na tela
function agendarConsulta() {
  const pacienteSelecionado = document.getElementById("selectPaciente").value;
  const medicoSelecionado = document.getElementById("selectMedico").value;
  const dataSelecionada = document.getElementById("inputData").value;

  if (!pacienteSelecionado || !medicoSelecionado || !dataSelecionada) {
    alert("Por favor preencha todos os campos!");
  }

  const paciente = pacientes.find((p) => p.nome === pacienteSelecionado);
  const medico = medicos.find((m) => m.nome === medicoSelecionado);

  if (paciente && medico) {
    medico
      .agendarConsulta(paciente, formatarData(dataSelecionada))
      .then((mensagem) => {
        DomHandler.exibirConsulta(mensagem);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDados();

  document
    .getElementById("btnAgendar")
    .addEventListener("click", agendarConsulta);
});
