 $(document).ready(function() {

     var socket = io();

     socket.on('testing', function(msg) {
         $("#pingLog").effect("shake");
         $("<h4>" + msg + "</h4>").prependTo("#pingLog");
     });

     socket.on('sendPing', function(msg) {
     	
     });

 });
