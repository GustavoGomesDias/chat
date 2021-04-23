const express = require("express");
const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

io.on("connection", socket => {
    socket.on("disconnect", () => {
        console.log("X desconectou: " + socket.id);
    });
    
    socket.on("msg", data => {
        // Socket é o usuário, io é o servidor inteiro

        // sokcet.broadcast.emit("showMsg", data) => faz quase a mesma coisa que io.emit, mas não exibe a mensagem pra quem enviou ela
        io.emit("showMsg", data);
        console.log(data);
    })
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

http.listen(3000, () => {
    console.log("App rodoando");
});