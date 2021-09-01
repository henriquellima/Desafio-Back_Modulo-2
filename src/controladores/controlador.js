const bancodedados = require("../bancodedados.js");

const {
  verificarBodyFull,
  verificarAcharConta,
  verificarContaDestino,
  acharContaDestino,
  verificarBodyOne,
  verificarEmailCPF,
  verificarBodyValor,
  verificarConta,
  verificarBodySenha,
  verificacaoTransferencia,
  criarRegistro,
  verificarSenha,
  verificacaoSaldoExtrato,
  verificarSaldo,
  acharConta,
} = require("../middleware/verificaçoes");

const autenticacao = require("../middleware/autenticacao");
const { banco } = require("../bancodedados.js");

const consultarContas = (req, res, next) => {
  const erro = autenticacao(req, res, next);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }
  return res.json(bancodedados.contas);
};

const criarConta = (req, res) => {
  const erro = verificarBodyFull(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }

  const erro1 = verificarEmailCPF(req, res);
  if (erro1) {
    res.status(erro1.status);
    res.json({ mensagem: `${erro1.mensagem}` });
    return;
  }

  const numeroConta =
    bancodedados.contas[bancodedados.contas.length - 1].numero;
  const conta = {
    numero: (Number(numeroConta) + 1).toString(),
    saldo: 0,
    usuario: req.body,
  };
  bancodedados.contas.push(conta);
  res.status(201);
  res.json(req.body);
};

const editarConta = (req, res) => {
  const erro = verificarBodyOne(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${status}` });
    return;
  }
  const erro2 = verificarConta(req, res);
  if (erro2) {
    res.status(erro2.status);
    res.json({ mensagem: `${erro2.mensagem}` });
    return;
  }

  const index = acharConta(req, res);

  const erro1 = verificarEmailCPF(req, res);

  if (erro1) {
    res.status(erro1.status);
    res.json({ mensagem: `${erro1.mensagem}` });
    return;
  }

  const conta = bancodedados.contas[index];
  if (req.body.nome) {
    conta.usuario.nome = req.body.nome;
  }
  if (req.body.email) {
    conta.usuario.email = req.body.email;
  }
  if (req.body.telefone) {
    conta.usuario.telefone = req.body.telefone;
  }
  if (req.body.cpf) {
    conta.usuario.cpf = req.body.cpf;
  }
  if (req.body.data_nascimento) {
    conta.usuario.data_nascimento = req.body.data_nascimento;
  }
  if (req.body.senha) {
    conta.usuario.senha = req.body.senha;
  }
  res.json({ mensagem: "Conta Editada" });
};

const deletarConta = (req, res) => {
  const erro = verificarConta(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }
  const index = acharConta(req, res);

  let saldo = bancodedados.contas[index].saldo;
  if (saldo === 0) {
    bancodedados.contas.splice(index, 1);
    res.json({ mensagem: "Conta deletada com sucesso" });
    return;
  } else {
    res.status(400);
    res.json({
      mensagem:
        "Sua conta precisa estar zerada para dar seguimento ao desligamento",
    });
    return;
  }
};

const depositar = (req, res) => {
  const erro = verificarBodyValor(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }

  const erro1 = verificarConta(req, res);
  if (erro1) {
    res.status(erro1.status);
    res.json({ mensagem: `${erro1.mensagem}` });
    return;
  }

  const index = acharConta(req, res);

  bancodedados.contas[index].saldo += Number(req.body.valor);
  const registro = criarRegistro(req, res);
  console.log(registro);
  bancodedados.depositos.push(registro);
  res.json({ mensagem: "Deposito concluido com sucesso" });
};

const sacar = (req, res) => {
  const erro = verificarBodySenha(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }
  const erro1 = verificarConta(req, res);
  if (erro1) {
    res.status(erro1.status);
    res.json({ mensagem: `${erro1.mensagem}` });
    return;
  }
  const erro2 = verificarBodyValor(req, res);
  if (erro2) {
    res.status(erro2.status);
    res.json({ mensagem: `${erro2.mensagem}` });
    return;
  }

  const index = acharConta;

  const erro4 = verificarSenha(req, res);
  if (erro4) {
    res.status(erro4.status);
    res.json({ mensagem: `${erro4.mensagem}` });
    return;
  }
  const erro5 = verificarSaldo(req, res);
  if (erro5) {
    res.status(erro5.status);
    res.json({ mensagem: `${erro5.mensagem}` });
    return;
  }
  bancodedados.contas[index].saldo -= Number(req.body.valor);
  const registro = criarRegistro(req, res);
  console.log(registro);
  bancodedados.saques.push(registro);
  res.json({ mensagem: "Saque concluido com sucesso" });
  return;
};

const transferir = (req, res) => {
  const erro = verificacaoTransferencia(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }

  const erro3 = verificarBodySenha(req, res);
  if (erro3) {
    res.status(erro3.status);
    res.json({ mensagem: `${erro3.mensagem}` });
    return;
  }
  const erro4 = verificarBodyValor(req, res);
  if (erro4) {
    res.status(erro4.status);
    res.json({ mensagem: `${erro4.mensagem}` });
    return;
  }
  const erro5 = verificarSenha(req, res);
  if (erro5) {
    res.status(erro5.status);
    res.json({ mensagem: `${erro5.mensagem}` });
    return;
  }
  const erro6 = verificarSaldo(req, res);
  if (erro6) {
    res.status(erro6.status);
    res.json({ mensagem: `${erro6.mensagem}` });
    return;
  }
  const erro7 = verificarContaDestino(req, res);
  if (erro7) {
    res.status(erro7.status);
    res.json({ mensagem: `${erro7.mensagem}` });
    return;
  }
  const erro8 = verificarAcharConta(req, res);
  if (erro8) {
    res.status(erro8.status);
    res.json({ mensagem: `${erro8.mensagem}` });
    return;
  }

  const contaOrigem = acharConta(req, res);
  const contaDestino = acharContaDestino(req, res);

  const erro1 = verificarSaldo(req, res);

  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }

  const erro2 = verificarConta(req, res);
  if (erro2) {
    res.status(erro2.status);
    res.json({ mensagem: `${erro2.mensagem}` });
    return;
  }

  bancodedados.contas[contaOrigem].saldo -= Number(req.body.valor);
  bancodedados.contas[contaDestino].saldo += Number(req.body.valor);

  const registro = criarRegistro(req, res);
  bancodedados.transferencias.push(registro);
  res.json({ mensagem: "Transferencia feita com sucesso" });
};

const saldo = (req, res) => {
  const erro = verificacaoSaldoExtrato(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }
  
  const erro3 = verificarConta(req, res);
  if (erro3) {
    res.status(erro3.status);
    res.json({ mensagem: `${erro3.mensagem}` });
    return;
  }

  const erro2 = verificarSenha(req, res);
  if (erro2) {
    res.status(erro2.status);
    res.json({ mensagem: `${erro2.mensagem}` });
    return;
  }



  const index = acharConta(req, res);

  res.json({ saldo: bancodedados.contas[index].saldo });
};

const extrato = (req, res) => {
  
  const erro = verificacaoSaldoExtrato(req, res);
  if (erro) {
    res.status(erro.status);
    res.json({ mensagem: `${erro.mensagem}` });
    return;
  }
  const erro2 = verificarAcharConta(req, res);
  if (erro2) {
    res.status(erro2.status);
    res.json({ mensagem: `${erro2.mensagem}` });
    return;
  }
  const erro1 = verificarSenha(req, res);
  if (erro1) {
    res.status(erro1.status);
    res.json({ mensagem: `${erro1.mensagem}` });
    return;
  }

  res.json({
    depositos: bancodedados.depositos.filter(
      (x) => x.numero_conta === req.query.numero_conta
    ),
    saques: bancodedados.saques.filter(
      (x) => x.numero_conta === req.query.numero_conta
    ),
    transferenciasEnviadas: bancodedados.transferencias.filter(
      (x) => x.numero_conta_origem === req.query.numero_conta
    ),
    transferenciasRecebidas: bancodedados.transferencias.filter(
      (x) => x.numero_conta_destino === req.query.numero_conta
    ),
  });
};

module.exports = {
  consultarContas,
  criarConta,
  editarConta,
  deletarConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
};
