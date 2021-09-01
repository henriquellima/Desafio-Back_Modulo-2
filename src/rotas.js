const express = require("express");

const rotas = express();
const {
  consultarContas,
  criarConta,
  editarConta,
  deletarConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato
} = require("./controladores/controlador");

rotas.use(express.json());

rotas.get("/contas", consultarContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", editarConta);
rotas.delete("/contas/:numeroConta", deletarConta);
rotas.post("/transacoes/depositar", depositar);
rotas.post("/contas/transacoes/sacar", sacar)
rotas.post("/transacoes/transferir", transferir)
rotas.get("/conta/saldo", saldo)
rotas.get("/contas/extrato", extrato)

module.exports = rotas;
