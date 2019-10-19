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

app.get('/champs', function (req, res) {
    const minDificultRange = [0,1,2,3]
    const mediunDificultRange = [4,5,6,7]
    const maxDificultRange = [8,9,10]
    const champs = req.query.champs
    const type1 = req.query.type1
    const type2 = req.query.type2
    res.send({"champIzi":"izi", "champMed":"med", "champHard":"hard"})

})

app.listen(3001, function (){
    console.log('Servidor rodando na porta ...');
})