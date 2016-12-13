 $(document).ready(function() {

     try {
         var navHeight = document.querySelector('#nav-split').offsetHeight;
     } catch (e) {
         console.log('no nav split offset found');
     }

     document.querySelector(".container").style.paddingTop = navHeight + "px";

     // refresh();
     //call refresh every 1.5 seconds
     // window.setInterval(refresh, 1500);

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
         var name = $('#globalName').text();

         if (userLocation) {
             $.get('/googleGeocode', { userLocation: userLocation }).done(function(response) {
                 if (response.status === "OVER_QUERY_LIMIT") {
                     alert('over query limit');
                 } else if (response.status === "OK") {
                     var latLong = response.results[0].geometry.location;
                     postLocation(name, userLocation, latLong, userId);
                 } else {
                     alert('invalid or empty location!');
                 }
             });
         } else {
             alert('invalid or empty location!');
         }
     });

     function postLocation(name, userLocation, latLong, userId) {
         $.post("/postLocation", { userName: name, userLocation: userLocation, userLat: latLong.lat, userLong: latLong.lng, userId: userId }, function(data) {
             window.location.replace('/');
         });
     }

     $(".postPing-btn").click(function() {
        // $('body').css('background', 'linear-gradient(135deg, #cae9ff, #2aaada 30%, #15b4b6, #67ffc4)');     
         $.post("/postPing", function(data) {
             var userName = data.userName;
             refresh();
         });
     });


     $("#getMap-btn").click(function() {
         $.get("/getMap");
     });

 });
