const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})

// salvar/inserir dados no JSON === Create do CRUD
server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body

    if(!novoUsuario.id || !novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.users.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo usuario cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/usuarios', (req, res) => {
    return res.json(dados.users)
})

// função para atualizar um usuario
server.put('/usuarios/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que já existe
    const idUsuario = dados.users.findIndex(u => u.id === usuarioId)

    if (idUsuario === -1) {
        return res.status(404).json({mensagem: "Usuário não encontrado :/"})
    } else {
        //atualiza o nome:
        dados.users[idUsuario].nome = atualizarUsuario.nome || dados.users[idUsuario].nome

        //atualiza a idade:
        dados.users[idUsuario].idade = atualizarUsuario.idade || dados.users[idUsuario].idade

        //atualiza o curso
        dados.users[idUsuario].curso = atualizarUsuario.curso || dados.users[idUsuario].curso

        salvarDados(dados)

        return res.json({mensagem: "Usuario atualizado com sucesso!"})
    }
})

//função para deletar usuario
server.delete("/usuarios/:id", (req, res) => {
    const usuarioId = parseInt(req.params.id)

    dados.users = dados.users.filter(u => u.id !== usuarioId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Usuário excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}