const { app, BrowserWindow } = require('electron');
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadFile("html/index.html");

}
app.whenReady().then(createWindow);

function valor() {
    var numero = parseInt(document.getElementById("numero").value);

    if (numero == 10) {
        alert("Numero migual a 10");
    } else if (numero < 10) {
        alert("Numero menor que 10")
    } else {
        alert("Numero maior que 10")

    }
}
function soma() {
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var resultado = num1 + num2

    alert("A soma dos dois valores é: " + resultado)
}
function inverte() {

    var nomes = [
        document.getElementById("nome1").value,
        document.getElementById("nome2").value,
        document.getElementById("nome3").value,
        document.getElementById("nome4").value,
        document.getElementById("nome5").value
    ]

    nomes.reverse();

    document.getElementById("nome1").value = nomes[0];
    document.getElementById("nome2").value = nomes[1];
    document.getElementById("nome3").value = nomes[2];
    document.getElementById("nome4").value = nomes[3];
    document.getElementById("nome5").value = nomes[4];

}

function intercalarPalavras() {

    var palavra1 = document.getElementById("palavra1").value;
    var palavra2 = document.getElementById("palavra2").value;


    if (palavra1 === "" || palavra2 === "") {
        alert("Por favor, insira duas palavras.");
        return;
    }

    var resultado = "";
    var tamanhoMaximo = Math.max(palavra1.length, palavra2.length);
    for (var i = 0; i < tamanhoMaximo; i++) {
        if (i < palavra1.length) {
            resultado += palavra1[i];
        }
        if (i < palavra2.length) {
            resultado += palavra2[i];
        }
    }
}

var banners = ["imagens/img1.jpg", "imagens/img.jpg", "imagens/img3.jpg"];
var bannerAtual = 0;
var intervalo;

function trocaBanner() {
  bannerAtual = (bannerAtual + 1) % banners.length;
  document.getElementById('imgBanner').src = banners[bannerAtual];
}

function iniciarRotacao() {
  intervalo = setInterval(trocaBanner, 4000);
}

function pausarRotacao() {
  clearInterval(intervalo);
}
  
iniciarRotacao();

function pesquisarCEP() {
    var cep = $('#cepInput').val();
    $.getJSON('https://viacep.com.br/ws/' + cep + '/json/', function(data) {
      exibirResultado(data);
    });
  }
  
  function pesquisarCidade() {
    var uf = $('#ufInput').val().toUpperCase(); // Obtém a sigla do estado e converte para maiúsculas
    var cidade = $('#cidadeInput').val();
    var rua = $('#ruaInput').val(); // Adiciona um campo para a rua
    cidade = cidade.replace(/\s/g, '%20'); // Substitui os espaços por "%20"
    $.getJSON('https://viacep.com.br/ws/' + uf + '/' + cidade + '/' + rua + '/json/', function(data) {
      exibirResultado(data);
    });
  }
  
  
  
  function pesquisarCEPsIntervalo() {
    var cepInicial = parseInt($('#cepInicialInput').val()); // Converter para número inteiro
    var cepFinal = parseInt($('#cepFinalInput').val()); // Converter para número inteiro
    
    for (var i = cepInicial; i <= cepFinal; i++) {
      (function(cep) { // Usar uma IIFE para capturar o valor atual de 'cep'
        $.getJSON('https://viacep.com.br/ws/' + cep + '/json/', function(data) {
          exibirResultado(data);
        });
      })(i);
    }
  }
  
  
  function exibirResultado(data) {
    $('#resultado').append('<p><strong>CEP:</strong> ' + data.cep + '<br>' +
                          '<strong>Logradouro:</strong> ' + data.logradouro + '<br>' +
                          '<strong>Bairro:</strong> ' + data.bairro + '<br>' +
                          '<strong>Cidade:</strong> ' + data.localidade + '<br>' +
                          '<strong>Estado:</strong> ' + data.uf + '</p>');
  }