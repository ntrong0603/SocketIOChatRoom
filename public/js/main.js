const socket = io("http://localhost:3000");

socket.on("send-room", function(data){
    $("#danhsachroom").html("");
    data.map(function(r){
        $("#danhsachroom").append("<h4 class ='roomOnline'>" + r + "</h4>"); 
    });
});
socket.on("sever-gui-room", function(data){
    $("#roomhientai").html(data);
});
socket.on("sv-chat", function(data){
    $("#right").append("<div>" + data + "</div>");
});

$(document).ready(function(){
    $("#taoRoom").click(function(){
        socket.emit("taoRoom", $("#txtRoom").val());
    });
    $("#thoatRoom").click(function(){
        socket.emit("thoatRoom", $("#txtRoom").val());
    });
    $("#chat").click(function(){
        socket.emit("chat", $("#txtMessgases").val());
    });
});