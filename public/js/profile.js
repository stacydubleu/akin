 $(document).ready(function() {

     try {
         var navHeight = document.querySelector('#nav-split').offsetHeight;
     } catch (e) {
         console.log('no nav split offset found');
     }

     document.querySelector(".container").style.paddingTop = navHeight + "px";
     
     $('#clearButton').click(function() {

         var userHref = $('#userHref').text();

         $.ajax({
             url: '/deleteSignal',
             method: 'DELETE',
             dataType: 'json',
             data: { userHref: userHref },
             error: logError,
             success: function() {
                 try {
                     $('#signalStatus').css('color', 'red');
                     $('#signalStatus').text('Current Signal Status: inactive');
                 } catch (error) {
                     logError(error);
                 }
             }
         });
     });

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

 function logError(error) {
     console.log(error);
 }
