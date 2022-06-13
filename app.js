
const tela = document.getElementById('tela');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');


let novoNumero = true;
let operador;
let numeroAnterior;


const operacaoPendente = () => operador !=  undefined;


const calcular = () =>{
    if(operacaoPendente()){
        const numeroAtual = parseFloat(tela.textContent);
        novoNumero = true;
        if(operador == '+'){

            atualizarTela(numeroAnterior + numeroAtual);

        }else if(operador == '-'){

            atualizarTela(numeroAnterior - numeroAtual);
            
        }else if(operador == '*'){

            atualizarTela(numeroAnterior * numeroAtual);
            
        }else if(operador == '/'){

            atualizarTela(numeroAnterior / numeroAtual);
            
        } 
    }
}

const atualizarTela = (texto) => {
    if(novoNumero){
        tela.textContent = texto;
        novoNumero = false
    }else{
        tela.textContent += texto;
    }
   
}

const inserirNumero = (e) => atualizarTela(e.target.textContent);
numeros.forEach(numero => numero.addEventListener('click',inserirNumero));

const selecionarOperador = (e) =>{
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = e.target.textContent;
        numeroAnterior = parseFloat(tela.textContent);
        console.log(operador);
    }
}
operadores.forEach(operador => operador.addEventListener('click',selecionarOperador));


const ativarIgual = () =>{
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click',ativarIgual);


const limparTela = () =>{
    tela.textContent= '';
}
document.getElementById('limparTela').addEventListener('click',limparTela);


const limparCalculo = () =>{
    limparTela();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click',limparCalculo);


const removerUltimoNumero = () =>{
    tela.textContent = tela.textContent.slice(0,-1);
}
document.getElementById('backspace').addEventListener('click',removerUltimoNumero);


const inverterSinal = () =>{
    novoNumero = true;
    atualizarTela(tela.textContent * -1);
}
document.getElementById('inverter').addEventListener('click',inverterSinal);



const existeDecimal = () =>  tela.textContent.indexOf(',') !== -1;
const existeValor =  () =>  tela.textContent.length > 0;

const inserirDecimal = () =>{
    if(!existeDecimal()){
        if(existeValor()){
            atualizarTela('.');
        }else{
            atualizarTela('0.');
        }
    }
}
document.getElementById('decimal').addEventListener('click',inserirDecimal);



//ativacao por teclado

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '=' : 'operadorSomar',
    '-' : 'operadorSubtrair',
'Enter' : 'igual',
    ';' : 'operadorDividir',
    '[' : 'operadorMultiplicar',
'Backspace' : 'backspace',
    ',': 'Decimal'

}

const mapearTeclado = (e) =>{
    const tecla = e.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
   if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown',mapearTeclado);