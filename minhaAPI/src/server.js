const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')

// Função para utilizar o servidor
server.use(express.json())

// Mensagem no terminal para indicar o funcionamento do server
server.listen(3000, () => {
    console.log('O servidor está funcionando')
})

// salvar/inserir dados no json == create do CRUD
server.post('/usuarios', (req, res) =>{
    const novoUsuario = req.body

    if(!novoUsuario.id || !novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso){
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente!"})
    } else {
        dados.users.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem:"Novo usuário cadastrado com sucesso"})
    }


})


// Função para atualizar o usuário

server.put('/usuarios/:id', (req, res) =>{
    // buscar e transformar o id do endpoint em inteiro
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman 
    const atualizarUsuario = req.body

    //encontrar o id no json que ja existe
    idUsuario = dados.users.findIndex(u => u.id === usuarioId)

    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Usuário não encontrado :/"})
    } else {
        //atualiza o nome
        dados.users[idUsuario].nome = atualizarUsuario.nome || dados.users[idUsuario].nome

        //atualiza o idade
        dados.users[idUsuario].idade = atualizarUsuario.idade || dados.users[idUsuario].idade

        //atualiza o curso
        dados.users[idUsuario].curso = atualizarUsuario.curso || dados.users[idUsuario].curso

        salvarDados(dados)
        res.json({mensagem: "Usuário atualizado com sucesso :3"})
    }
})

function salvarDados (){
    fs.writeFileSync(__dirname + "/data/dados.json", JSON.stringify(dados, null, 2))
}

//consumir dados da API == READ do CRUD
server.get('/usuarios', (req, res) =>{
    return res.json(dados.users)
})

