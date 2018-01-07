$(document).ready(function($) {
    var screenHeight = $(window).height();
    var $showMessage = $("#show-message");
    var $scrollToTop = $('.scroll-to-top');    
    var $navbar = $('.navbar');

    //set height to home-box
	$(".home-box").height(screenHeight*0.8);
	$(".message-box").css({'marginTop':screenHeight*0.3});

	$("#alert>.close").click(function () {
	    $showMessage.removeClass("show-alert");
	    $showMessage.addClass("display-none");
    });
    
    //scroll buttom
    $(window).on('scroll', function(){        
        if ($(document).scrollTop() > 80){
            $navbar.addClass('shrink');
            $scrollToTop.fadeIn();
        }
        else{
            $navbar.removeClass('shrink');
            $scrollToTop.fadeOut();
        }
    });
});

//1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
// TimeoutSeg = tempo para o timeout da mensagem, time in seconds
function ShowMessage(kind, title, message, timeoutSeg) {
    var alert = $("#alert");
    var showAlert = $("#show-message");

    if (timeoutSeg == undefined) {
        timeoutSeg = 8;
    }

    var timeout = timeoutSeg * 1000;

    showAlert.slideDown(function () {
        setTimeout(function () {
            showAlert.slideUp(200);
        }, timeout);
    });

    alert.removeClass();
    alert.addClass("alert");

    if (kind == "Information") {
        alert.addClass("alert-info");
    } else if (kind == "Success") {
        alert.addClass("alert-success");
    } else if (kind == "Warning") {
        alert.addClass("alert-warning");
    } else if (kind == "Error") {
        alert.addClass("alert-danger");
    }

    if (title != null) {
        $("#kind").html(title)
        $("#show-message-title").html(message);
    }
}

//1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
//No timeout = 10 min to timeout the message.
function ShowMessageNoTimeOut(kind, title, detail) {
    var timeoutSeg = 600;
    ShowMessage(kind, title, detail, timeoutSeg);
}