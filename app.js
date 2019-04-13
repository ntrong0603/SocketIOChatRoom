const express = require("express");
const app = express();


//khai bao thu duoc phep truy cap
app.use(express.static("./public"));
var server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(3000);

app.set("view engine", "ejs");
app.set("views", "views");



// khi ket noi socket se tao 1 room voi ten la id cua client ket noi, 
// duoc phep tao moi va dat ten room
// khong co ham tao room, chi co ham join vao room. 
// neu room da co roi thi tu join vao, neu khong thi tao room
io.on("connection", function(socket){
    //console.log(socket.id + " vua moi ket noi");
    //console.log(socket.adapter.rooms);

    socket.on("taoRoom", function(data){
        socket.join(data);
        socket.nameRoom = data;
        var arrRoom = [];
        for (room in socket.adapter.rooms){
            arrRoom.push(room);
        }
        io.sockets.emit("send-room", arrRoom);
        socket.emit("sever-gui-room", data);
    });

    // gui nguoi trong room
    socket.on("chat", function(data){
        io.sockets.in(socket.nameRoom).emit("sv-chat", data);
    });
    socket.on("thoatRoom", function(data){
        socket.leave(data);
        console.log(socket.adapter.rooms);
    });
});

app.get("/", function(req, res){
    res.render("index");
})