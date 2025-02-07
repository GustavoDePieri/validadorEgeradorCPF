document.getElementById('validarBtn').addEventListener('click', validarCPF);
document.getElementById('gerarBtn').addEventListener('click', gerarCPF);

function validarCPF() {
    const cpf = document.getElementById('cpfInput').value.replace(/\D/g, '');
    const resultado = document.getElementById('resultado');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        resultado.textContent = "CPF inválido!";
        resultado.style.color = "red";
        return;
    }

    function calcularDigito(cpf, length) {
        let soma = 0;
        for (let i = 0; i < length; i++) {
            soma += parseInt(cpf.charAt(i)) * (length + 1 - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    const digito1 = calcularDigito(cpf, 9);
    const digito2 = calcularDigito(cpf, 10);

    if (parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2) {
        resultado.textContent = "CPF válido!";
        resultado.style.color = "green";
    } else {
        resultado.textContent = "CPF inválido!";
        resultado.style.color = "red";
    }
}

function gerarCPF() {
    function gerarNumerosAleatorios() {
        const numeros = [];
        for (let i = 0; i < 9; i++) {
            numeros.push(Math.floor(Math.random() * 10));
        }
        return numeros.join('');
    }

    function calcularDigito(cpf, length) {
        let soma = 0;
        for (let i = 0; i < length; i++) {
            soma += parseInt(cpf.charAt(i)) * (length + 1 - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    let cpf = gerarNumerosAleatorios();
    const digito1 = calcularDigito(cpf, 9);
    cpf += digito1;
    const digito2 = calcularDigito(cpf, 10);
    cpf += digito2;

    document.getElementById('cpfInput').value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    document.getElementById('resultado').textContent = "CPF gerado com sucesso!";
    document.getElementById('resultado').style.color = "blue";
}