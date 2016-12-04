 $(document).ready(function() {

     refresh();

     //call refresh every 1.5 seconds
     window.setInterval(refresh, 1500);

     //refresh active signals log box
     function refresh() {

         var activeUrl;

         $.get("/getActive", function(data) {
             activeUrl = data;
         }).then(function() {
             $('#activeLog').empty();
             for (var i = 0; i < activeUrl.length; i++) {
                 var tempName = activeUrl[i].userName;
                 var tempId = activeUrl[i].userId;
                 var linkId = /[^/]*$/.exec(tempId)[0];
                 $("<a style='font-size:20px' href='/profile/" + linkId + "'>" + tempName + "</a>").appendTo("#activeLog");
             }
         });
     }

     $("#locationSubmit-btn").click(function() {
         var userLocation = $('#searchTextField').val();
         var userId = $('#userId').text();

         if (location) {
             $.post("/postLocation", { userLocation: userLocation, userId: userId }, function(data) {
                 console.log(data);
                 window.location.replace('/');
             });
         } else {
             alert('invalid or empty location!');
         }
     });

     $("#postPing-btn").click(function() {
         $.post("/postPing", function(data) {
             var userName = data.userName;
             refresh();
         });
     });

     $("#getMap-btn").click(function() {
         $.get("/getMap");
     });

 });
