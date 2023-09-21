//servidor de borda

// app é a aplicação
const app = require("express")(); //express é a entrega
const server = require("http").createServer(app); //http sistema que nao é pago, utiliza-se create server para chamar o server a-cima App
const io = require("socket.io")(server, {cors: { origin: "http://localhost:5173" }, // cors criar server e fazer ligação com o react, localhost é do vitezão da massa
});   //argumento sempre dentro de chaves (é o que eu quero q ele faça)

const PORT = 3001; // variavel da porta, nao ira mudar

io.on("connection", (socket) => {   //entende evento para rolar as conexões, não coloca em chaves, pois não é um argumento | serviço que esta utilizando é o socket
  socket.on("set_username", (username) => {

    socket.data.username = username; //salvar o username e o id  |   userName(username, socket.id)
  
    //mostrar no sistema quem esta logado   |   console.log(`Bem-vindo ${username}!`);
    console.log(`Bem-vindo ${socket.data.username} seu id é ${socket.id}!`);
    
    //orientação objeto 
  });

  socket.on("message", (text) => { //utiliza-se callback para ações, aqui esta sendo usada para receber mensagem e mostrar no server a mensagem abaixo no console
    io.emit("receive_message", {
      text,
      authorID: socket.id,                      
      author: socket.data.username,
    });

    console.log(`Usuário ${socket.data.username} enviou uma mensagem!`);

  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.data.username} desconectado, motivo: ${reason}`); //socket é o escuta todos os dados, desconectar o usuário com motivo
  });
});

server.listen(PORT, () => {
  console.log("Server running..."); //ira listar as info quando algum usuario entrar pela porta
});
