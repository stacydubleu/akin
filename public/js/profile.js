 $(document).ready(function() {

     //populate active notes
     var notes = [
         '/sounds/1.wav',
         '/sounds/2.wav',
         '/sounds/3.wav',
         '/sounds/4.wav',
         '/sounds/5.wav',
         '/sounds/6.wav',
         '/sounds/7.wav',
         '/sounds/8.wav',
         '/sounds/9.wav',
         '/sounds/10.wav',
         '/sounds/11.wav',
         '/sounds/12.wav',
         '/sounds/13.wav',
         '/sounds/14.wav',
         '/sounds/15.wav',
         '/sounds/16.wav',
         '/sounds/17.wav',
         '/sounds/18.wav',
         '/sounds/19.wav',
         '/sounds/20.wav',
         '/sounds/21.wav',
         '/sounds/22.wav',
         '/sounds/23.wav',
         '/sounds/24.wav',
         '/sounds/25.wav',
         '/sounds/26.wav',
         '/sounds/27.wav',
         '/sounds/28.wav',
         '/sounds/29.wav',
         '/sounds/30.wav',
         '/sounds/31.wav',
         '/sounds/32.wav',
         '/sounds/33.wav',
         '/sounds/34.wav'
     ];

     var sound = new Howl({
         src: ['/sounds/2.wav', '/sounds/2.wav'],
         volume: 0.5,
         onend: function() {
             console.log('Finished!');
         }
     });

     try {
         var navHeight = document.querySelector('#nav-split').offsetHeight;
     } catch (e) {
         console.log('no nav split offset found');
     }

     if ($('#signalStatus').text() === "Signal Status: inactive") {
         $('#signalClose').hide();
     }

     if ($('#signalStatus').text() === "Signal Status: active") {
         $('#signalOpen').hide();
     }

     var foo = document.getElementById('foo');
     var board = document.getElementById('board');

     var boardSort = new Sortable(board, {
         group: "words",
         animation: 150,
         store: {
             get: function(sortable) {
                 var order = localStorage.getItem(sortable.options.group);
                 return order ? order.split('|') : [];
             },
             set: function(sortable) {
                 var order = sortable.toArray();
                 localStorage.setItem(sortable.options.group, order.join('|'));
             }
         }
     });

     if (foo) {
         var fooSort = new Sortable(foo, {
             group: "words",
             animation: 150,
             store: {
                 get: function(sortable) {
                     var order = localStorage.getItem(sortable.options.group);
                     return order ? order.split('|') : [];
                 },
                 set: function(sortable) {
                     var order = sortable.toArray();
                     localStorage.setItem(sortable.options.group, order.join('|'));
                 }
             }
         });
     }

     document.querySelector(".container").style.paddingTop = navHeight + "px";

     $('#signalClose').click(function() {

         $('#signalStatus').removeClass('animated infinite fadeIn');

         $('#signalClose').hide();
         var userHref = $('#userHref').text();
         $.ajax({
             url: '/deleteSignal',
             method: 'DELETE',
             dataType: 'json',
             data: { userHref: userHref },
             error: logError,
             success: function() {
                 try {
                     $('#signalStatus').css('opacity', '.5');
                     $('#signalStatus').css('color', '#555');
                     $('#signalStatus').text('Signal Status: inactive');
                 } catch (error) {
                     logError(error);
                 }
             }
         });
     });

     $("#signalOpen").click(function() {
         $('#signalOpen').hide();
         $.post("/postPing", function(data) {
             var userName = data.userName;
             $('#signalStatus').css('opacity', '1');
             $('#signalStatus').css('color', '#0099ff');
             $('#signalStatus').text('Signal Status: active');
         });
     });

     $(".postPing-btn").click(function() {
         $.post("/postPing", function(data) {
             var userName = data.userName;
             $('#signalStatus').css('opacity', '1');
             $('#signalStatus').css('color', '#0099ff');
             $('#signalStatus').text('Signal Status: active');
         });
     });

     $("#getMap-btn").click(function() {
         $.get("/getMap");
     });

 });

 function logError(error) {
     console.log(error);
 }
