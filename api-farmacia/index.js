const express = require('express');
const server = express();
const dados = require('./data/dados.json');
server.use(express.json());
const fs = require('fs')

server.get('/', (req, res) => {
return res.json({mensagem: 'Nossa API está funcionando'});
});
server.listen(3000, () =>{
console.log("Servidor está funcionando!");
});

//Salvar os dados criados no arquivo 

function salvarDados (){
    fs.writeFileSync(__dirname + "/data/dados.json", JSON.stringify(dados, null, 2))
}

//Funções para o medicamento

// Criar um novo medicamento 

server.post('/medicamento', (req, res) =>{
    const novoMedicamento = req.body
    if(!novoMedicamento.id||!novoMedicamento.nome||!novoMedicamento.fornecedor||!novoMedicamento.preco || novoMedicamento.preco<0||!novoMedicamento.quantidade||!novoMedicamento.quantidade<0){
        return res.status(400).json({message: "Dados inválidos ou incompletos."})
    } else {
        dados.medicamento.push(novoMedicamento)
        salvarDados(dados)
        return res.status(200).json({message: "Medicamento salvo com sucesso"})
    }
})

// Função para atualizar o medicamento

server.put('/medicamento/:id', (req, res) => {
    //buscar e transformar o id do endpoint em int
    const medicamentoId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarMedicamento = req.body

    //encontrar o id no json que ja existe 
    idMedicamento = dados.medicamento.findIndex(u => u.id === medicamentoId)

    if(idMedicamento === -1){
        return res.status(400).json({message: "Medicamento não encontrado :/"})
    } else {
        //atualiza o nome
        dados.medicamento[idMedicamento].nome = atualizarMedicamento.nome || dados.medicamento[idMedicamento].nome

        //atualiza fabricante
        dados.medicamento[idMedicamento].fabricante = atualizarMedicamento.fabricante || dados.medicamento[idMedicamento].fabricante

        //atualiza preco
        dados.medicamento[idMedicamento].preco = atualizarMedicamento.preco || dados.medicamento[idMedicamento].preco

        //atualiza quantidade
        dados.medicamento[idMedicamento].quantidade = atualizarMedicamento.quantidade || dados.medicamento[idMedicamento].quantidade

        salvarDados(dados)
        res.json({message: "Medicamento alterado com sucesso"})
    }
})

//funcao para deletar o medicamento

server.delete('/medicamento/:id', (req, res) =>{
    const medicamentoId = parseInt(req.params.id)
    dados.medicamento = dados.medicamento.filter(u => u.id != medicamentoId)

    salvarDados(dados)
    res.json({message : "Medicamento deletado com sucesso"})
})

//funcao para pegar o medicamento
server.get('/medicamento', (req, res) =>{
    return res.json(dados.medicamento)
})

//Funções para o cliente

// Criar um novo cliente 

server.post('/cliente', (req, res) =>{
    const novoCliente = req.body
    if(!novoCliente.id||!novoCliente.nome||!novoCliente.endereco||!novoCliente.email || !novoCliente.telefone){
        return res.status(400).json({message: "Dados inválidos ou incompletos."})
    } else {
        dados.cliente.push(novoCliente)
        salvarDados(dados)
        return res.status(200).json({message: "Cliente salvo com sucesso"})
    }
})

// Função para atualizar o medicamento

server.put('/cliente/:id', (req, res) => {
    //buscar e transformar o id do endpoint em int
    const clienteId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarCliente = req.body

    //encontrar o id no json que ja existe 
    idCliente = dados.cliente.findIndex(u => u.id === clienteId)

    if(idCliente === -1){
        return res.status(400).json({message: "Cliente não encontrado :/"})
    } else {
        //atualiza o nome
        dados.cliente[idCliente].nome = atualizarCliente.nome || dados.cliente[idCliente].nome

        //atualiza endereco
        dados.cliente[idCliente].endereco = atualizarCliente.endereco || dados.cliente[idCliente].endereco

        //atualiza email
        dados.cliente[idCliente].email = atualizarCliente.email || dados.cliente[idCliente].email

        //atualiza telefone
        dados.cliente[idCliente].telefone = atualizarCliente.telefone || dados.cliente[idCliente].telefone

        salvarDados(dados)
        res.json({message: "Cliente alterado com sucesso"})
    }
})

//funcao para deletar o cliente

server.delete('/cliente/:id', (req, res) =>{
    const clienteId = parseInt(req.params.id)
    dados.cliente = dados.cliente.filter(u => u.id != clienteId)

    salvarDados(dados)
    res.json({message : "Cliente deletado com sucesso"})
})

//funcao para pegar o cliente
server.get('/clientes', (req, res) =>{
    return res.json(dados.cliente)
})

//Funções para o fornecedor

//Criar um novo fornecedor

server.post('/fornecedor', (req,res) => {
    const novoFornecedor = req.body

    if(!novoFornecedor.id || !novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.fornecedor.push(novoFornecedor)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})


//Atualizar um fornecedor

server.put('/fornecedor/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const fornecedorId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarFornecedor = req.body

    //encontrar o id no json que ja existe
    const idFornecedor = dados.fornecedor.findIndex(u => u.idFornecedor === fornecedorId)

    if(idFornecedor === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //Atualizar o fornecedor
        dados.fornecedor[idFornecedor].nome = atualizarFornecedor.nome || dados.fornecedor[idFornecedor].nome
        dados.fornecedor[idFornecedor].endereco = atualizarFornecedor.endereco || dados.fornecedor[idFornecedor].fabricante
        dados.fornecedor[idFornecedor].telefone = atualizarFornecedor.telefone || dados.fornecedor[idFornecedor].endereco
        
        salvarDados(dados)
        return res.json({mensagem:"Atualizado"})
    }
})

//Deletar fornecedor

server.delete("/fornecedor/:id",(req,res) => {

    const fornecedorId = parseInt(req.params.id)
    dados.fornecedor = dados.fornecedor.filter(u => u.id !== fornecedorId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})

})

//Get fornecedores

server.get('/fornecedor', (req, res) =>{
    return res.json(dados.fornecedor)
})

//Funções para as vendas

//Criar uma nova venda

server.post('/venda', (req,res) => {
    const novaVenda = req.body

    if(!novaVenda.id || !novaVenda.data || !novaVenda.idMedicamento || !novaVenda.idCliente ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.venda.push(novaVenda)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

//Atualizar a venda

server.put('/venda/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const vendaId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarVenda = req.body

    //encontrar o id no json que ja existe
    const idVenda = dados.venda.findIndex(u => u.idVenda === vendaId)

    if(idVenda === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //atualizar
        dados.venda[idVenda].nome = atualizarVenda.nome || dados.venda[idVenda].nome
        dados.venda[idVenda].endereco = atualizarVenda.endereco || dados.venda[idVenda].fabricante
        dados.venda[idVenda].telefone = atualizarVenda.telefone || dados.venda[idVenda].endereco
        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})
    }
})

//Deletar venda
server.delete("/venda/:id",(req,res) => {

    const vendaId = parseInt(req.params.id)
    dados.venda = dados.venda.filter(u => u.id !== vendaId)
    salvarCurso(dados)
    return res.status(200).json({mensagem:"Excluido"})
})

//get vendas

server.get('/venda', (req, res) =>{
    return res.json(dados.venda)
})