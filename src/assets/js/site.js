$(document).ready(function() {
	if ($(window).scrollTop()===0){
		$("#menu").removeClass("scrolled");
	}
	else{
		$("#menu").addClass("scrolled");    
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()===0){
			$("#menu").removeClass("scrolled");
		}
		else{
			$("#menu").addClass("scrolled");    
		}
	});

    /*============================================
	ScrollTo Links
	==============================================*/
	$("a.scrollto").click(function (e) {
	    $("html,body").scrollTo(this.hash, this.hash, { gap: { y: -80 } });
	    e.preventDefault();

	    if ($(".navbar-collapse").hasClass("in")) {
	        $(".navbar-collapse").removeClass("in").addClass("collapse");
	    }
	});

	$(".jumbotron").height($(window).height()+50);
	$(".message-box").css({'marginTop':$(window).height()*0.4});

	$("#alert>.close").click(function () {
	    $("#show-message").removeClass("section-alert");
	    $("#show-message").addClass("display-none");
    });
    
    // $("#click").click(function (){
    //     $('html, body').animate({
    //         scrollTop: $("body").offset().top
    //     }, 2000);
    // });

    $(window).on('scroll', function(){
        
        if ($document.scrollTop() > navHeight){
            
            /** Shrink navigation */
            $navbar.addClass('shrink');
            
            /** Scroll to top */
            $scrollToTop.fadeIn();
        }
        else{
            
            /** Shrink navigation */
            $navbar.removeClass('shrink');
            
            /** Scroll to top */
            $scrollToTop.fadeOut();
        }
    });
});


//1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
// TimeoutSeg = tempo para o timeout da mensagem, time in seconds
function ShowMessage(kind, title, detail, timeoutSeg) {
    if (timeoutSeg == undefined) {
        timeoutSeg = 8;
    }

    var timeout = timeoutSeg * 1000;

    $("#section-alert").slideDown(function () {
        setTimeout(function () {
            $("#section-alert").slideUp(200);
        }, timeout);
    });

    $("#alert").removeClass();
    $("#alert").addClass("alert");

    if (kind == "Information") {
        $("#alert").addClass("alert-info");
    } else if (kind == "Success") {
        $("#alert").addClass("alert-success");
    } else if (kind == "Warning") {
        $("#alert").addClass("alert-warning");
    } else if (kind == "Error") {
        $("#alert").addClass("alert-danger");
    }

    if (title != null) {
        $("#title").html(title);
    }
}

//1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
//No timeout = 10 min to timeout the message.
function ShowMessageNoTimeOut(kind, title, detail) {
    var timeoutSeg = 600;
    ShowMessage(kind, title, detail, timeoutSeg);
}