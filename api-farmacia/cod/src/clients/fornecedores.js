document.addEventListener('DOMContentLoaded', function (){
    //função que carrega a lista de clientes ao entrar na pag
    loadFornecedoresList();

    //Add um listener do formulario para add clientes
    document.getElementById('formAdicionarFornecedores').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarFornecedores()
    })
})

function adicionarFornecedores() {
    const id = document.getElementById('idFornecedor').value
    console.log(id)
    const nome = document.getElementById('nomeFornecedor').value
    console.log(nome)
    const telefone = document.getElementById('telefoneFornecedor').value
    console.log(telefone)
    const endereco = document.getElementById('enderecoFornecedor').value
    console.log(endereco)
    console.log('ola')
    fetch('http://localhost:3000/api/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            telefone: telefone,
            endereco: endereco
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadFornecedoresList()
    })
    .catch(error => console.error("Erro:", error))
}

function loadFornecedoresList() {
    fetch('http://localhost:3000/api/fornecedores')
        .then(response => response.json())
        .then(data => displayFornecedoresList(data))
        .catch(error => console.error("Erro:", error))
}

function displayFornecedoresList(data) {
    const listaFornecedores = document.getElementById('listaFornecedores')
    listaFornecedores.innerHTML = ''

    data.forEach(fornecedor =>{
        const listItem = document.createElement('li')
        listItem.textContent = `ID: ${fornecedor.id} - Nome: ${fornecedor.nome} - Endereco: ${fornecedor.enderco} - telefone: ${fornecedor.telefone}`
        listaFornecedores.appendChild(listItem)
    })
}