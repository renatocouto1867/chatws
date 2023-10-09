window.addEventListener("load", () => {
    const socket = io(); //
    console.log('Conectado no servidor de websocket');

    document.getElementById('form').addEventListener('submit', (evt) => {
        const msg = document.getElementById('msg').value;

        console.log("Enviado Mensagem " + msg); // só para teste

        if (socket.login) {
            socket.emit('chatmsg', msg)//cria um rotulo para a mensagem
        }
        else {
            socket.emit('login', msg)
            socket.login = msg

            document.getElementById('msg').addEventListener('keydown', () => {
                socket.emit('status', `${socket.login} está digitando...`)
            })

            document.getElementById('msg').addEventListener('keyup', () => {
                socket.emit('status', ``)
            })
        }

        evt.preventDefault();
    })

    socket.on('chatmsg', msg => document.getElementById('mensagens').innerHTML += `<li>${msg}</li>`)
    socket.on('status', msg => document.getElementById('status').innerHTML = msg)
})