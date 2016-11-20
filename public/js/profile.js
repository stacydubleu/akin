 $(document).ready(function() {

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
 });

 function logError(error) {
     console.log(error);
 }
