 $(document).ready(function() {

     console.log('main.js loaded');

     refresh();

     window.setInterval(refresh, 1500);

     function refresh() {

         var activeUrl;

         $.get("/getActive", function(data) {
             activeUrl = data;
         }).then(function() {
             $('#activeLog').empty();
             for (var i = 0; i < activeUrl.length; i++) {
                 console.log(activeUrl[i]);
                 var tempName = activeUrl[i].userName;
                 var tempId = activeUrl[i].userId;
                 var linkId = tempId.substr(-22);

                 $("<a style='font-size:20px' href='/profile/" + linkId + "'>" + tempName + "</a>").appendTo("#activeLog");
             }

         });
     }

     $("#postPing-btn").click(function() {
         $.post("/postPing", function(data) {
             var userName = data.userName;
         });
     });

     $("#getMap-btn").click(function() {
         $.get("/getMap");
     });


 });
