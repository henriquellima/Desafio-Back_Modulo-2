const { format } = require("date-fns");
const { banco } = require("../bancodedados.js");
const bancodedados = require("../bancodedados.js");

const verificarBodyFull = (req, res) => {
  const cpf = req.body.cpf;
  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const data = req.body.data_nascimento;
  const email = req.body.email;
  const senha = req.body.senha;

  if (!cpf || !nome || !telefone || !data || !senha || !email) {
    const mensagem = {
      status: 400,
      mensagem: "Body da requisição não esta completo.",
    };
    return mensagem;
  }
};

const verificarBodyOne = (req, res) => {
  const cpf = req.body.cpf;
  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const data = req.body.data_nascimento;
  const email = req.body.email;
  const senha = req.body.senha;

  if (cpf || nome || telefone || data || senha || email) {
  } else {
    const mensagem = {
      status: 400,
      mensagem: "É necessario pelo menos 1 campo de alteração",
    };
    return mensagem;
  }
};

const verificarBodyValor = (req, res) => {
  const valor = req.body.valor;
  if (!valor) {
    const mensagem = {
      status: 400,
      mensagem: "O body precisa especificar o valor",
    };
    return mensagem;
  }
  if (valor <= 0) {
    const mensagem = {
      status: 404,
      mensagem: "O valor precisa ser maior que 0",
    };
    return mensagem;
  }
};
const verificarConta = (req, res) => {
  let numeroConta = String;
  if (req.params.numeroConta) {
    numeroConta = req.params.numeroConta;
  } else if (req.body.numero_conta) {
    numeroConta = req.body.numero_conta;
  } else if (req.query.numero_conta) {
    numeroConta = req.query.numero_conta;
  } else {
    numeroConta = req.body.numero_conta_origem;
  }
  if (!numeroConta) {
    const mensagem = {
      status: 400,
      mensagem: "O body precisa ter o numero da conta",
    };
    return mensagem;
  }
  const index = bancodedados.contas.findIndex((x) => x.numero === numeroConta);

  if (index === -1) {
    const mensagem = {
      status: 404,
      mensagem: "Verifique o numero da conta",
    };
    return mensagem;
  }
};

const verificarBodySenha = (req, res) => {
  const senha = req.body.senha;
  if (!senha) {
    const mensagem = {
      status: 400,
      mensagem: "O body precisa conter a senha da conta",
    };
    return mensagem;
  }
};

const verificacaoSaldoExtrato = (req, res) => {
  if (!req.query.numero_conta) {
    const mensagem = {
      status: 400,
      mensagem: "Query numero_conta obrigatorio",
    };
    return mensagem;
  }
  if (!req.query.senha) {
    const mensagem = {
      status: 400,
      mensagem: "Query senha obrigatória",
    };
    return mensagem;
  }
};

const verificacaoTransferencia = (req, res) => {
  if (!req.body.numero_conta_destino) {
    const mensagem = {
      status: 400,
      mensagem: "O body precisa conter a conta de destino",
    };
    return mensagem;
  } else if (!req.body.numero_conta_origem) {
    const mensagem = {
      status: 400,
      mensagem: "O body precisa conter a conta de origem",
    };
    return mensagem;
  }
};

const verificarAcharConta = (req, res) => {
  let numeroConta = String;
  if (req.params.numeroConta) {
    numeroConta = req.params.numeroConta;
  } else if (req.body.numero_conta) {
    numeroConta = req.body.numero_conta;
  } else if (req.query.numero_conta) {
    numeroConta = req.query.numero_conta;
  } else {
    numeroConta = req.body.numero_conta_origem;
  }
  const index = bancodedados.contas.findIndex((x) => x.numero === numeroConta);
  if (index === -1) {
    const mensagem = {
      status: 404,
      mensagem: "Verifique o numero da conta",
    };
    return mensagem;
  }
};

const acharConta = (req, res) => {
  let numeroConta = String;
  if (req.params.numeroConta) {
    numeroConta = req.params.numeroConta;
  } else if (req.body.numero_conta) {
    numeroConta = req.body.numero_conta;
  } else if (req.query.numero_conta) {
    numeroConta = req.query.numero_conta;
  } else {
    numeroConta = req.body.numero_conta_origem;
  }
  const index = bancodedados.contas.findIndex((x) => x.numero === numeroConta);

  return index;
};

const verificarContaDestino = (req, res) => {
  let numeroConta = String;
  if (req.body.numero_conta_destino) {
    numeroConta = req.body.numero_conta_destino;
  }
  const index = bancodedados.contas.findIndex((x) => x.numero === numeroConta);
  if (index === -1) {
    const mensagem = {
      status: 404,
      mensagem: "Verifique o numero da conta de destino",
    };
    return mensagem;
  }
};

const acharContaDestino = (req, res) => {
  const numeroConta = req.body.numero_conta_destino;
  const index = bancodedados.contas.findIndex((x) => x.numero === numeroConta);
  return index;
};

const verificarEmailCPF = (req, res) => {
  if (req.body.email) {
    const indexEmail = bancodedados.contas.findIndex(
      (x) => x.usuario.email === req.body.email
    );
    if (indexEmail !== -1) {
      const mensagem = {
        status: 400,
        mensagem: "Email já cadastrado",
      };
      return mensagem;
    }
  }
  if (req.body.cpf) {
    const indexCPF = bancodedados.contas.findIndex(
      (x) => x.usuario.cpf === req.body.cpf
    );
    if (indexCPF !== -1) {
      const mensagem = {
        status: 400,
        mensagem: "CPF ja cadastrado",
      };
      return mensagem;
    }
  }
};

const verificarSenha = (req, res) => {
  const index = acharConta(req, res);
  if (req.body.senha) {
    if (bancodedados.contas[index].usuario.senha !== req.body.senha) {
      const mensagem = {
        status: 400,
        mensagem: "Senha invalida",
      };
      return mensagem;
    }
  }

  if (req.query.senha) {
    if (bancodedados.contas[index].usuario.senha !== req.query.senha) {
      const mensagem = {
        status: 400,
        mensagem: "Senha invalida",
      };
      return mensagem;
    }
  }
};

const criarRegistro = (req, res) => {
  const date = new Date();
  const dataFormatada = format(date, "yyyy-MM-dd HH:mm:ss");

  if (req.body.numero_conta) {
    return {
      data: dataFormatada,
      numero_conta: req.body.numero_conta,
      valor: req.body.valor,
    };
  }
  return {
    data: dataFormatada,
    numero_conta_origem: req.body.numero_conta_origem,
    numero_conta_destino: req.body.numero_conta_destino,
    valor: req.body.valor,
  };
};

const verificarSaldo = (req, res) => {
  const index = acharConta(req, res);
  const valorSolicitado = Number(req.body.valor);
  const saldo = bancodedados.contas[index].saldo;

  if (valorSolicitado > saldo) {
    const mensagem = {
      status: 400,
      mensagem: "Saldo insuficiente",
    };
    return mensagem;
  }
};

module.exports = {
  verificarBodyFull,
  verificarAcharConta,
  verificarContaDestino,
  acharContaDestino,
  verificarBodyOne,
  verificarEmailCPF,
  verificarConta,
  verificarBodySenha,
  verificarSenha,
  verificarBodyValor,
  criarRegistro,
  verificacaoTransferencia,
  verificacaoSaldoExtrato,
  verificarSaldo,
  acharConta,
};
