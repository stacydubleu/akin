 $(document).ready(function() {

     console.log('main.js loaded');

     $("#login-button").click(function() {

     });

     $("#register-button").click(function() {

     });

     $("#postPing-btn").click(function() {
         $.post("/postPing");
     });

     $("#getMap-btn").click(function() {
         $.get("/getMap");
     });


 });
