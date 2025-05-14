export class DomHandler {
  static atualizarListaPaciente(pacientes) {
    const selectPaciente = document.getElementById("selectPaciente");
    selectPaciente.innerHTML = `<option value="">---Selecione um Paciente---</option>`;

    pacientes.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.nome;

      option.textContent = paciente.nome;

      selectPaciente.appendChild(option);
    });
  }

  static atualizarListaMedico(medicos) {
    const selectMedico = document.getElementById("selectMedico");
    selectMedico.innerHTML = `<option value="">---Selecione um Médico---</option>`;

    medicos.forEach((medico) => {
      const option = document.createElement("option");
      option.value = medico.nome;
      option.textContent = medico.nome;

      selectMedico.appendChild(option);
    });
  }

  static exibirConsulta(mensagem) {
    const listaConsulta = document.getElementById("listaConsultas");

    //verificar se ja existe consulta
    const consultas = Array.from(listaConsulta.getElementsByTagName("li"));
    const consultExists = consultas.some((li) => {
      return li.textContent.includes(mensagem);
    });

    if (consultExists) {
      alert("Essa consulta já foi agendada!");
      return; //interrompe pra n criar mais os elementos
    }

    const li = document.createElement("li");

    //criar o elemento da lista
    li.classList.add("consulta-item");
    li.textContent = mensagem;

    //criar botao cancelar
    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.classList.add("btn-cancelar");

    btnCancelar.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(btnCancelar);
    listaConsulta.appendChild(li);
  }
}
