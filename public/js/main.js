const socket = io("http://localhost:3000");


$(document).ready(function(){
    $("#taoRoom").click(function(){
        socket.emit("taoRoom", $("#txtRoom").val());
    });
    $("#thoatRoom").click(function(){
        socket.emit("thoatRoom", $("#txtRoom").val());
    });
});