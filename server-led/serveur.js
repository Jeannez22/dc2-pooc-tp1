const express = require('express')
  const app = express()
  const port = 3000
//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");

// Déclaration des constantes GPIO  sleep  led 1 et led 2
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
const led1 = new Gpio(4, 'out');
const led2 = new Gpio(15, 'out');
const buzz = new Gpio(21,'out');

//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('views'))

// Allumer la led 1
  app.get('/on/1', (request, response) => {
 led1.writeSync(1);
  response.render('on');
})

// Allumer la led 2

app.get('/on/2', (request, response) => {
led2.writeSync(1);
response.render('on');
})

//Eteindre la led 1

app.get('/off/1', (request, response) => {
led1.writeSync(0);	
 response.render('off');
} )

// Eteindre la led 2
app.get('/off/2', (request, response) => {      
led2.writeSync(0);
 response.render('off');
} )

//Buzzer

app.get('/buzz/on', (request, response) => {      
buzz.writeSync(1);
 response.render('on');
} )

app.get('/buzz/off', (request, response) => {      
buzz.writeSync(0);
 response.render('off');
} )

  app.get('/hello/:name', (request, response) => {
    response.render('hello', {name: request.params.name});
})

app.get('/pooc', (request, response) => {
  //Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
  response.render('pooc');
})
  app.listen(port, (err) => {
    if (err) {
      return console.log('Erreur du serveur : ', err)
    }
    //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
})

process.on('SIGINT', () => {
  led1.unexport();
});
