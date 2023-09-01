const form = document.getElementById('form-atividade'); /*criação da variável FORM */
/*Colocando os emojis de reação a situação de aprovado ou não */
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji triste" />';
/*criação de 2 arrays para armazenar as notas e atividades do usuário */
const atividades = []; 
const notas = [];
/*criação do span para colorir a ação de Aprovado ou Reprovado*/
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

const notaMinima = parseFloat(prompt("Digite uma nota mínima:"));

/*adicionando uma regra para não sobrepor valores na tabela e sim adicionar*/
let linhas = '';

form.addEventListener('submit',function(e) { /*regra de validação do submit do form */
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();

});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    /*para não permitir que o usuário coloque a mesma atividade duas vezes*/
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else {
        /*adicionando um push que force a gravação dos dados dos usuários */
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    /*adicionando as informação de Nome e nota no corpo da tabela */
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; /*condicional se foi reprovado ou não ?=Verdadeiro :=Falso */
    linha += `</tr>`;

    /*adicionando uma regra para não sobrepor valores na tabela e sim adicionar*/
    linhas += linha;
    }    

    inputNomeAtividade.value='';
    inputNotaAtividade.value='';
}

function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody'); /*preenchendo a tabela com os dados*/
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); /*tofixed serve para limitar as casas decimais */
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;    
    }

    function calculaMediaFinal() {
        let somaDasNotas = 0;

        for (let i=0; i < notas.length; i++) { /*primeiro para fazer a média das notas é somar todas as notas inseridas pelo user */
            somaDasNotas += notas[i];
        }

        return somaDasNotas / notas.length; /*segundo passo dividir a soma acima pelo numero de notas inseridas, contadas pelo LENGTH */
    }
