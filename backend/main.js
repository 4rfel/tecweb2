const Express = require('express');
const app = Express();
const {login,  signup} = require('./db');
const cors = require('cors')

app.use(Express.json());
app.use(cors())


async function someFunction() {
    // Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate');

    // Instantiates a client
    const translate = new Translate("tecweb2-256818");

    // The text to translate
    const text = 'Hello, world!';

    // The target language
    const target = 'fr';

    // Translates some text into French
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
}

someFunction();

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
    const i1 = Math.floor(Math.random() * possibleChampsIzi.length);
    const i2 = Math.floor(Math.random() * possibleChampsMed.length);
    const i3 = Math.floor(Math.random() * possibleChampsHar.length);

    const champIzi = possibleChampsIzi[i1].nome
    const champMed = possibleChampsMed[i2].nome
    const champHar = possibleChampsHar[i3].nome
    const champIziTitle = possibleChampsIzi[i1].title
    const champMedTitle = possibleChampsMed[i2].title
    const champHarTitle = possibleChampsHar[i3].title
    const champIziBlurb = possibleChampsIzi[i1].blurb
    const champMedBlurb = possibleChampsMed[i2].blurb
    const champHarBlurb = possibleChampsHar[i3].blurb

    
    res.send({"champIzi":champIzi, "champMed":champMed, "champHard":champHar,
     "champIziTitle":champIziTitle, "champMedTitle":champMedTitle, "champHarTitle":champHarTitle,
     "champIziBlurb":champIziBlurb, "champMedBlurb":champMedBlurb, "champHarBlurb":champHarBlurb})

})


app.listen(3001, function (){
    console.log('Servidor rodando na porta ...');
})