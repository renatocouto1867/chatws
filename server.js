const express = require('express');

//cria uma aplicação express
const app = express();

const httpServer = require('http').createServer(app);

//diz a minha aplicação express para usar a pasta public como sendo pública
app.use(express.static('public'));

const PORT =8080
httpServer.listen(PORT,()=> console.log('Servidor iniciado na porta ' + PORT));

app.get('/',(req,res)=> res.sendFile(__dirname + '/index.html'));
