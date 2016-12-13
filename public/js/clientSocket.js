 $(document).ready(function() {

     var socket = io();

     socket.on('respondPing', function(data) {
         var globalId = $('#userHref').text();
         var responder = data.userName;
         var receiver = data.userHref;
         var receiverProfile = /[^/]*$/.exec(receiver)[0];

         if (receiver === globalId) {
             alert(responder + ' has responded to your signal!');
             location.reload()
         }
     });

     function checkPing() {
         var signal = $('#signal').text();
         if (signal === "active") {
             $('body').addClass('animated');
             $('#home-sendPing').css('display', 'none');
             $('#home-screen').css('margin', '0 auto');

         };
         if (signal === "inactive") {
             $('body').removeClass('animated');
             $('home-sendPing').removeClass('dont-show');
             $('body').css('background', 'black');
         };

     };

     // socket.on('testing', function(msg) {
     //     $("#pingLog").effect("shake");
     //     $("<h4>" + msg + "</h4>").prependTo("#pingLog");
     // });

     // socket.on('sendPing', function(msg) {

     // });

 });
