const autenticacao = (req, res, next) => {
  const senha = req.query.senha_banco;
  if (!senha) {
    const mensagem = {
      status: 400,
      mensagem: "Esse recurso precisa da senha Geral do banco estilo query",
    };
    return mensagem;
  } else if (senha !== "Cubos123Bank") {
    const mensagem = {
      status: 400,
      mensagem: "Senha inválida",
    };
    return mensagem;
  } else {
    next();
  }
};

module.exports = autenticacao;
