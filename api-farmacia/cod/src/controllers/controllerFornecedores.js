const express = require('express')
const server = express()
const dadosFornecedores = require('./data/dadosFornecedores.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body

    if(!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosFornecedores.Cliente.push(novoFornecedor)
        salvarDados(dadosFornecedores)
        return res.status(201).json({mensagem: "Novo fornecedor cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/fornecedores', (req, res) => {
    return res.json(dadosFornecedores.Fornecedor)
})

// função para atualizar um usuario
server.put('/fornecedores/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const fornecedorId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarFornecedor = req.body

    //encontrar o id no json que já existe
    const idFornecedor = dadosFornecedores.Fornecedor.findIndex(u => u.id === fornecedorId)

    if (idFornecedor === -1) {
        return res.status(404).json({mensagem: "Fornecedor não encontrado :/"})
    } else {
        //atualiza o nome:
        dadosFornecedores.fornecedores[idFornecedor].nome = atualizarFornecedor.nome || dadosFornecedores.fornecedores[idFornecedor].nome

        //atualiza a idade:
        dadosFornecedores.fornecedores[idFornecedor].endereco = atualizarFornecedor.endereco || dadosFornecedores.fornecedores[idFornecedor].endereco

        //atualiza o curso
        dadosFornecedores.fornecedores[idFornecedor].telefone = atualizarFornecedor.telefone || dadosFornecedores.fornecedores[idFornecedor].telefone

        salvarDados(dadosFornecedores)

        return res.json({mensagem: "Fornecedor atualizado com sucesso!"})
    }
})

//função para deletar usuario
server.delete("/fornecedores/:id", (req, res) => {
    const fornecedorId = parseInt(req.params.id)

    dadosFornecedores.Fornecedor = dadosFornecedores.Fornecedor.filter(u => u.id !== fornecedorId)

    salvarDados(dadosFornecedores)

    return res.status(200).json({mensagem: "Fornecedor excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosFornecedores.json', JSON.stringify(dadosFornecedores, null, 2))
}

module.exports = {server, salvarDados}