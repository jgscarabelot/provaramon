const fs = require('fs');
const {v4: uuidv4} = require('uuid');

function registrarLog(nome){
    const id = uuidv4();
    const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const mensagem = `${id} - ${dataHora} - ${nome}\n`;
    fs.appendFileSync('logs.txt', mensagem);
    return id;
}

function buscarLogPorId(id){
    const conteudo = fs.readFileSync('logs.txt', 'utf-8');
    const linhas = conteudo.split('\n');
    return linhas.find((linha) => linha.startsWith(id));
}

module.exports = {registrarLog, buscarLogPorId}

const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());


app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('Ta funcionando');
});

app.post('/logs', (req, res) => {
    const {nome} = req.body;

    if (!nome) {
        return res.status(400).json({erro: 'Por favor o seu nome'});
    }

    const id = registrarLog(nome);
    res.status(201).json({mensagem: 'O Log foi registrado', id});
});

const fs = require('fs');


app.get('/logs/:id', (req, res) => {
    const idProcurado = req.params.id;

    const conteudo = fs.readFileSync('logs.txt', 'utf-8');
    const linhas = conteudo.split('\n');
    const logEncontrado = linhas.find(linha => linha.startsWith(idProcurado));

    if (logEncontrado) {
        res.status(200).json({log: logEncontrado});
    }else {
        res.status(404).json({erro: 'Não encontrado'});
    }
});