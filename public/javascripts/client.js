$(function(){
  var socket = io.connect();

  //接続確認
  socket.on('connect',function(){
    console.log('connected.');
    socket.on('count', function(data){
      $('#count').text(data);
    });

    //メッセージを受信
    socket.on('msg push', function(msg){
      $('#img').attr("src", msg.text);
      $('#imgtitle').html(msg.text);
      $('#list').prepend($("<dt>" + new Date() + "</dt><p>" + msg.name + ":" + msg.text + "</p><hr>"));
    });

  });

  //メッセージを送信
  $('#comment_form').on('submit',function(){
    var name = $('#name').val();
    var text = $('#text').val();
    if(text && name){

      socket.emit('msg post',{name: name, text: text});
      $('#text').val('');
    };
  });

  socket.on("roomList", function(roomList){
    $("#list-box").text("");
    if(roomList){
      Object.keys(roomList).forEach(function(rname){
        console.log(rname + "," + roomList[rname] + "人");
        $("#list-box").append("ルーム『"+ rname + "』に" + roomList[rname] +"人います<br>");
      });
    }
  });


//サーバーに入るルーム名を送信
  $('#room_form').on('submit', function(){
    var name = $("#enter").val();
    socket.emit("enter", name);
  });


});
