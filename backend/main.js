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

app.post('/champs', function (req, res) {
    const minDificult = 3
    const medDificult = 6
    const maxDificult = 10
    const champs = req.body.champs
    const tag1 = req.query.tag1
    const tag2 = req.query.tag2
    
    var possibleChampsIzi = []
    var possibleChampsMed = []
    var possibleChampsHar = []
    
    champs.map((champ, index) => {
        if(champ.tag2 !== undefined){
            // if(champ.tag1===tag1 || champ.tag1===tag2 || champ.tag2===tag1 || champ.tag2===tag2){
            if(champ.tag1===tag1 || champ.tag1===tag2){
                if(champ.tag2===tag1 || champ.tag2===tag2){

                    if(minDificult - champ.dif >= 0){
                        possibleChampsIzi.push(champ)
                    }else if(medDificult - champ.dif >= 0){
                        possibleChampsMed.push(champ)
                    }else{
                        possibleChampsHar.push(champ)
                    }                 
                }
            }
        }else{
            if(champ.tag1===tag1 || champ.tag2===tag1){
                if(minDificult - champ.dif >= 0){
                    possibleChampsIzi.push(champ)
                }else if(medDificult - champ.dif >= 0){
                    possibleChampsMed.push(champ)
                }else{
                    possibleChampsHar.push(champ)
                } 
            }
        }
        
    })
    // console.log("izi")
    // console.log(possibleChampsIzi)
    // console.log("med")
    // console.log(possibleChampsMed)
    // console.log("hard")
    // console.log(possibleChampsHar)
    const champIzi = possibleChampsIzi[0].nome
    const champMed = possibleChampsMed[0].nome
    const champHar = possibleChampsHar[0].nome

    // console.log(champHar)

    
    res.send({"champIzi":champIzi, "champMed":champMed, "champHard":champHar})

})


app.listen(3001, function (){
    console.log('Servidor rodando na porta ...');
})