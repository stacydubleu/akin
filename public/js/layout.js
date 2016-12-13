$(document).ready(function(){

	checkPing();
	function checkPing(){
        var signal=$('#signal').text();
        console.log(signal);
        if(signal==="active"){
            $('body').addClass('animated');
            $('#home-sendPing').css('display', 'none');
            $('#home-screen').css('margin', '0 auto');

        };
        if(signal==="inactive"){
            $('body').removeClass('animated');
            $('home-sendPing').removeClass('dont-show');
            $('body').css('background', 'black');
        };

    };
});