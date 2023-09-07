//o status = "" é feito para que ele fique padronizado recebendo vazio para que fique sem nenhum valor inicial
const criarItem = (tarefa, status,indice) => {
    const item = document.createElement("label");
    item.classList.add("todo__item")
    //aqui é usado o template string que é isso=>  ``
    item.innerHTML = `
<input type="checkbox" ${status} data-indice=${indice}>
<div>${tarefa}</div>
<input type="button" value="X" data-indice=${indice}> 
`

document.getElementById("todoList").appendChild(item)


    //no caso na parte de cima ele ira pegar um elemento(no caos é o todolist e ira adicionar um filho a ele 
    // ou seja o todo list é o pai e o filho a ser adicionado é o item que no caso se refere aquele código que será usado para adicionar o label )
}
const limparTarefas = () => {
    const todoList = document.getElementById("todoList")
    while (todoList.firstChild) {//enquanto existir o primeiro filho ele ira remover a ultima criança
        todoList.removeChild(todoList.lastChild)//no caso ele remove até que a ultima seja tambem a primeira ou seja para que não haja um bug de ter repetidos crianças iguais
    }
    

}
//abixo a gente criou o banco de dados que ira armazenas as tarefas e os status no caso usando um array de objetos

//abaixo foi criado um atualizador de tela onde quando for mudado a algo no banco de dados ele será atualizado
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];//aqui ele fala o seguinte se não tem o todoList então ele ira ira adicionar um array vazio,isso é feito para que não de erro no sistema, e tambem como ele ira pegar os dados do local storage que estará em string é necessário modofica-lo para json( objeto) é por isso que se usa o json.parse()
const setBanco = (banco) =>localStorage.setItem("todoList",JSON.stringify(banco));
const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco() // no caso aqui ele está pegando os dados armazenados no local storage e enviando para banco que assim atualiza a tela apresentando tudo que está no banco para que ele envie para a tela
    banco.forEach((item,indice) => criarItem(item.tarefa, item.status, indice));//(no caso pega um item,manda para o criar item, manda o item porem so quero a tarefa do item) tem que se estudar o for each paar ter realmente noção do que se da para fazer
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === "Enter"){
        const banco = getBanco();
        banco.push({ "tarefa": texto, "status": "" })//no caso o methodo push sempre adicionara por ultimo no array no caso ele será o ultimo item
        setBanco(banco)
        atualizarTela();
        evento.target.value = ""
    }
    }

const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1 )//é utilizado o splice para que ele remova um elemento do array e retorne esse array novo, no caso ele vai pegar a posição do "indice" e apartir dessa posição ira retirar o numero 1, que no caso é ele mesmo
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) =>{
const banco = getBanco()
banco[indice].status = banco[indice].status === "" ?"checked":"";
setBanco(banco)
atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === "button"){
        const indice = elemento.dataset.indice; // data set é a propriedade do elemento para pegar o valor de data-indice
        removerItem(indice)
    }else if(elemento.type === "checkbox"){
        const indice = elemento.dataset.indice;
        atualizarItem(indice)
    }
}

document.getElementById("newItem").addEventListener("keypress", inserirItem)
document.getElementById("todoList").addEventListener("click", clickItem);
atualizarTela();