const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')
const { parse } = require('path')

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



//Função para deletar usuário

server.delete('/usuarios/:id', (req, res) =>{
    const usuarioId = parseInt(req.params.id)

    dados.users = dados.users.filter(u => u.id != usuarioId)

    salvarDados(dados)

    return res.status(200).json({mensagem: 'Usuário deletado com sucesso >:3'})
})

//Funçã para criar cursos

server.post('/cursos', (req, res) =>{
    const novoCurso = req.body

    if(!novoCurso.id||!novoCurso.nome_curso||!novoCurso.ch_curso||!novoCurso.professor){
        return res.status(400).json({mensagem: 'Dados incompletos, tente novamente :/'})
    } else {
        dados.cursos.push(novoCurso)
        salvarDados(dados)
        return res.status(201).json({mensagem: 'Curso cadastrado com sucesso :D'})
    }
})

//Função para editar cursos
server.put('/cursos/:id', (req, res) =>{
    // buscar e transformar o id do endpoint em inteiro
    const cursoId = parseInt(req.params.id)

    //receber o body escrito no postman 
    const atualizarCurso = req.body

    //encontrar o id no json que ja existe
    let idCurso = dados.cursos.findIndex(u => u.id === cursoId)

    if(idCurso === -1){
        return res.status(404).json({mensagem: "Curso não encontrado :/"})
    } else {
        //atualiza o nome
        dados.cursos[idCurso].nome_curso = atualizarCurso.nome_curso || dados.cursos[idCurso].nome_curso
        
        //atualiza o idade
        dados.cursos[idCurso].ch_curso = atualizarCurso.ch_curso || dados.cursos[idCurso].ch_curso

        //atualiza o curso
        dados.cursos[idCurso].professor = atualizarCurso.professor || dados.cursos[idCurso].professor

        salvarDados(dados)
        res.json({mensagem: "Curso atualizado com sucesso :3"})
    }

})



//Função para deletar cursos

server.delete('/cursos/:id', (req, res)=>{
    const cursoId = parseInt(req.params.id)
    dados.cursos = dados.cursos.filter(u => u.id != cursoId)

    salvarDados(dados)
    return res.status(200).json({mensagem: 'Curso deletado com sucesso'})
})


function salvarDados (){
    fs.writeFileSync(__dirname + "/data/dados.json", JSON.stringify(dados, null, 2))
}

//consumir dados da API == READ do CRUD
server.get('/usuarios', (req, res) =>{
    return res.json(dados.users)
})



//consumir dados da API == READ do CRUD
server.get('/cursos', (req, res) =>{
    return res.json(dados.cursos)
})
