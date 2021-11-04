const express = require('express')
const request = require('request-promise-native')

const app = express()

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));

app.get('/alunos', async function(req, res){
    const result = await request.get('http://localhost:3000/api/v1/alunos');
    const alunos = JSON.parse(result).data;
    res.render('alunos', { alunos });
})

app.listen(3001, function() {
    console.log('Servidor iniciado na porta 3001')
})