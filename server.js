const { log } = require('console');
const express = require('express');

//cria uma aplicação express
const app = express();

const httpServer = require('http').createServer(app);

const serverSocket = require('socket.io')(httpServer);

//diz a minha aplicação express para usar a pasta public como sendo pública
app.use(express.static('public'));


// posso inclusive cria um caminho virtual exemplo /paginas/ola
//app.get('/**',(req,res)=> res.sendFile(__dirname + '/index.js')); so quando for direcionar a uma requisição diferente da raiz ** endereço
app.get('/ola',(req,res)=> res.send("Ola Mundo"));

const PORT =8080

serverSocket.on('connect', socket=>{
    console.log('Cliente conectado' + socket.id);
    //ao chegar uma mensagem tipo chatmsg do cliente faça
    socket.on('chatmsg', (msg) =>{
        console.log(`Mesagem, recebida do cliente ${socket.id}`);
        serverSocket.emit('cahtmsg',msg);
    })
})

httpServer.listen(PORT,()=> console.log('Servidor iniciado na porta ' + PORT));
