document.addEventListener('DOMContentLoaded', function (){
    //função que carrega a lista de clientes ao entrar na pag
    loadRemedioList();

    //Add um listener do formulario para add clientes
    document.getElementById('formAdicionarRemedio').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarRemedio()
    })
})

function adicionarRemedio() {
    const id = document.getElementById('idRemedio').value
    const nome = document.getElementById('nomeRemedio').value
    const fornecedor = document.getElementById('fornecedorRemedio').value
    const quantidade = document.getElementById('qtdRemedio').value
    const preco = document.getElementById('precoRemedio').value
    console.log('ola')
    fetch('http://localhost:3000/api/remedios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            fornecedor: fornecedor,
            preco: preco,
            quantidade: quantidade
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadRemedioList()
    })
    .catch(error => console.error("Erro:", error))
}

function loadRemedioList() {
    fetch('http://localhost:3000/api/remedios')
        .then(response => response.json())
        .then(data => displayClientesList(data))
        .catch(error => console.error("Erro:", error))
}

function displayClientesList(data) {
    const listaClientes = document.getElementById('listaRemedios')
    listaClientes.innerHTML = ''

    data.forEach(cliente =>{
        const listItem = document.createElement('li')
        listItem.textContent = `ID: ${cliente.id} - Nome: ${cliente.nome} - Fornecedor: ${cliente.fornecedor} - Preco: ${cliente.quantidade} - Quantidade: ${cliente.quantidade}`
        listaClientes.appendChild(listItem)
    })
}