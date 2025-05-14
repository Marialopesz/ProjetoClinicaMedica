import { Pessoa } from "./Pessoa.js";

export class Medico extends Pessoa {
  constructor(nome, idade, cpf, especialidade) {
    super(nome, idade, cpf);
    this.especialidade = especialidade;
  }

  agendarConsulta(paciente, data) {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            `Consulta Marcada com o médico: ${this.nome} para o paciente: ${paciente.nome} no dia ${data}`
          ),
        1000
      );
    });
  }
}
