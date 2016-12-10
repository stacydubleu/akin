 $(document).ready(function() {

     try {
         var navHeight = document.querySelector('#nav-split').offsetHeight;
     } catch (e) {
         console.log('no nav split offset found');
     }

     document.querySelector(".container").style.paddingTop = navHeight + "px";

     $(document).ready(function() {
         try {
             var screen = $('body');
             screen.ripples({
                 resolution: 512,
                 dropRadius: 20, //px
                 perturbance: 0.04,
             });
         } catch (e) {
             $('.error').show().text(e);
         }
     });

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

         if (userLocation) {
             $.get('/googleGeocode', { userLocation: userLocation }).done(function(response) {

                 if (response.status === "OVER_QUERY_LIMIT") {
                     alert('over query limit');
                 } else if (response.status === "OK") {
                     var latLong = response.results[0].geometry.location;
                     postLocation(userLocation, latLong, userId);
                 } else {
                     alert('invalid or empty location!');
                 }
             });
         } else {
             alert('invalid or empty location!');
         }
     });

     function postLocation(userLocation, latLong, userId) {
         $.post("/postLocation", { userLocation: userLocation, userLat: latLong.lat, userLong: latLong.lng, userId: userId }, function(data) {
             window.location.replace('/');
         });
     }

     $(".postPing-btn").click(function() {
         $.post("/postPing", function(data) {
             var userName = data.userName;
             refresh();
         });
     });

     $("#getMap-btn").click(function() {
         $.get("/getMap");
     });

 });
