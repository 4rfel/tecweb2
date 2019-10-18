const Express = require('express');
const app = Express();
const {login,  signup} = require('./db');
const cors = require('cors')

app.use(Express.json());
app.use(cors())

app.get('/', function (req, res) {
    res.send('Primeira requisição GET');
    });

app.post('/login', function (req, res) {

    const {usuario, senha} = req.body
    var qr;

    login({usuario, senha}, (result)=>{
        qr = result
    })

    // return res.status(401).send(qr)
    return res.send(qr)
    });

app.post('/signup', function (req, res) {

    const {usuario, senha} = req.body

    signup({usuario, senha}, ()=>{});
    return res.json()
})
        

app.listen(3001, function (){
    console.log('Servidor rodando na porta ...');
})