var botaoSortear = document.getElementById("btn-sortear");
var botaoReiniciar = document.getElementById("btn-reiniciar");

var campoQuantidade = document.getElementById("quantidade");
var campoDe = document.getElementById("de");
var campoAte = document.getElementById("ate");

//Gera um número aleatório entre "De" e "Até"
function sortearNumero(de, ate){
    return Math.floor(Math.random() * (ate - de + 1) + ate);
}

//Altera o status do elemento especificado
//Deve ser usado apenas para os botões
function alterarDisabled(elemento){
    if(elemento.classList.contains("container__botao")){
        elemento.classList.add("container__botao-desabilitado");
        elemento.classList.remove("container__botao");
        elemento.setAttribute("disabled", true);
    }else{
        elemento.classList.add("container__botao");
        elemento.classList.remove("container__botao-desabilitado");
        elemento.removeAttribute("disabled", false);
    }
}


//Compara o valor entre De e Ate, para evitar o sorteio de números negativos e corrige o seus valores nos campos de entrada.
function corrigirCampos(deMenorValor, deMaiorValor){
    if(deMenorValor.value > deMaiorValor.value){
        let tempValue = deMenorValor.value;

        deMenorValor.value = deMaiorValor.value;
        deMaiorValor.value = tempValue;

        console.log("Menor: " + deMenorValor.value + " | Maior: " + deMaiorValor.value)
    }
}


//Realiza o sorteio de quantidade X de números aleatórios entre valores A e B.
function sortear(){
    corrigirCampos(campoDe, campoAte);

    alterarDisabled(botaoSortear);

    var quantidade = campoQuantidade.value;
    var de = campoDe.value;
    var ate = campoAte.value;

    console.log("Quantidade: " + quantidade + "| De:" + de + " | Até: " + ate );

    var sorteados = [];
    var numerosSorteados = "";

    //Verifica se há mais possibilidades de número do que a quantidade requisitada, e sorteia números diferentes.
    //Caso contrario, os números se repetem.
    if(ate-de > quantidade){
        for(let i = 0; i < quantidade; i++){
            let numero = sortearNumero(de, ate);

            if(sorteados.find((a,b) => a == numero) == undefined){
                sorteados.push(numero)
                numerosSorteados += numero + ",";
            }else{
                i--;
            }
        }
    }else{
        for(let i = 0; i < quantidade; i++){
            let numero = sortearNumero(de, ate);
            sorteados.push(numero);
            numerosSorteados += numero + ",";
        }
    }

    numerosSorteados = numerosSorteados.substring(0, numerosSorteados.length - 1);

    document.getElementById("resultado").innerText = "Números sorteados: " + numerosSorteados;

    alterarDisabled(botaoReiniciar);
}


//Retorna a interface ao seu estado inicial
function reiniciar(){
    console.log("Reiniciando")
    alterarDisabled(botaoSortear);
    alterarDisabled(botaoReiniciar);

    document.getElementById("resultado").innerText = "Números sorteados: nenhum até agora";

    campoQuantidade.value = "";
    campoDe.value = "";
    campoAte.value = "";
}