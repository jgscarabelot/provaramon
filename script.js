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
    console.log(`Rodando em http:localhost:${port}`);
});