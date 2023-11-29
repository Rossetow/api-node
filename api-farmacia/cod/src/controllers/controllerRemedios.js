const express = require('express')
const server = express()
const dadosRemedios = require('./data/dadosRemedios.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/remedios', (req, res) => {
    const novoRemedio = req.body

    if(!novoRemedio.nome || !novoRemedio.fornecedor || !novoRemedio.preco || !novoRemedio.quantidade) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosRemedios.Remedio.push(novoRemedio)
        salvarDados(dadosRemedios)
        return res.status(201).json({mensagem: "Novo remédio cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/remedios', (req, res) => {
    return res.json(dadosRemedios.Remedio)
})

// função para atualizar um remredio
server.put('/remedios/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const remedioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarRemedio = req.body

    //encontrar o id no json que já existe
    const idRemedio = dadosRemedios.Remedio.findIndex(u => u.id === idRemedio)

    if (idRemedio === -1) {
        return res.status(404).json({mensagem: "Remédio não encontrado :/"})
    } else {
        //atualiza o nome:
        dadosRemedios.remedios[idRemedio].nome = atualizarRemedio.nome || dadosRemedios.remedios[idRemedio].nome

        //atualiza a fornecedor:
        dadosRemedios.remedios[idRemedio].fornecedor = atualizarRemedio.fornecedor || dadosRemedios.remedios[idRemedio].fornecedor

        //atualiza o preco
        dadosRemedios.remedios[idRemedio].preco = atualizarRemedio.preco || dadosRemedios.remedios[idRemedio].preco

        dadosRemedios.remedios[idRemedio].quantidade = atualizarRemedio.quantidade || dadosRemedios.remedios[idRemedio].quantidade

        salvarDados(dadosRemedios)

        return res.json({mensagem: "Usuario atualizado com sucesso!"})
    }
})

//função para deletar remedio
server.delete("/remedios/:id", (req, res) => {
    const remedioId = parseInt(req.params.id)

    dadosRemedios.Remedio = dadosRemedios.Remedio.filter(u => u.id !== remedioId)

    salvarDados(dadosRemedios)

    return res.status(200).json({mensagem: "Remédio excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosRemedios.json', JSON.stringify(dadosRemedios, null, 2))
}

module.exports = {server, salvarDados}