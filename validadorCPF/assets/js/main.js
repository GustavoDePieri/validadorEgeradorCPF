function ValidaCPF(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function () {
      return cpfEnviado.replace(/\D+/g, ''); // Remove caracteres não numéricos
    }
  });
}
// Função para pegar o CPF e mostrar o resultado
function validarCPF() {
  const cpfUsuario = document.getElementById('cpf').value; // Pega o valor do input CPF
  const cpf = new ValidaCPF(cpfUsuario);


  const validado = cpf.valida();
  if (validado === true) {
    document.getElementById('cpf').value = '';
    resultado.innerText = 'CPF válido!';
    resultado.className = 'valido'; // Aplica classe "valido"
    resultado.style.display = 'block'; // Mostra a mensagem
  } else {
    document.getElementById('cpf').value = '';
    resultado.innerText = 'CPF Inválido!';
    resultado.className = 'invalido'; // Aplica classe "invalido"
    resultado.style.display = 'block'; // Mostra a mensagem
  }
}

ValidaCPF.prototype.valida = function () {
  if (!this.cpfLimpo || this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);

  const novoCpf = cpfParcial + digito1 + digito2;

  if (novoCpf === this.cpfLimpo) return true;
  return false;
};

ValidaCPF.prototype.criaDigito = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial);

  let regressivo = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
};

ValidaCPF.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
};
function formatarCPF(cpf) {
  // Remove caracteres que não sejam números
  cpf = cpf.replace(/\D/g, '');

  // Adiciona os pontos e o traço conforme o formato do CPF
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
}

document.getElementById('cpf').addEventListener('input', function (event) {
  let valor = this.value;
  this.value = formatarCPF(valor);
});

document.getElementById('cpf').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') { // Verifica se a tecla pressionada foi "Enter"
    event.preventDefault(); // Evita comportamento padrão (caso seja em um formulário)
    validarCPF(); // Chama a função de validação
    this.value = '';
  }
});
////////////////////////////////////////////////////////////////////////////////////////////
function geraNumeros() {
  const arrayCPF = [];
  for (i = 0; i < 9; i++) {
    const digitos = Math.floor(Math.random() * 10);
    arrayCPF.push(digitos);
  }
  const numerosGerados = arrayCPF.toString();
  return numerosGerados;
}

function GeraCPF(cpfGerado) {
  Object.defineProperty(this, 'cpfGerado', {
    enumerable: true,
    get: function () {
      return cpfGerado.replace(/\D+/g, ''); // Remove caracteres não numéricos
    }
  });
}

GeraCPF.prototype.criaCPF = function () {
  const cpfGerado = geraNumeros();
  const cpf2 = new GeraCPF(cpfGerado);
  cpf2.geraCPFCompleto()
}

GeraCPF.prototype.geraCPFCompleto = function () {
  const cpfParcial = this.cpfGerado;
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);
  const novoCpf = cpfParcial + digito1 + digito2;
  
  return resultadoCpfGerado.innerText = formatarCPF(novoCpf);
};

GeraCPF.prototype.criaDigito = function (cpf) {
  const cpfArray = Array.from(cpf);

  let regressivo = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
};

