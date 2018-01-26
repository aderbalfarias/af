$(document).ready(function($) {
    var $document = $(document);
    var $window = $(window);
    var $body = $('body');
    var $htmlBody = $('html, body');
    var $showMessage = $('#showMessage');
    var $scrollToTop = $('.scroll-to-top');    
    var $navbar = $('.navbar');
    var $navbarCollapse = $('.navbar-collapse');
    var $pageScrollClicked = $('a[class*=page-scroll]');
    var screenHeight = $window.height();    
    var sHeight = 100;
    var navHeight = 62.800;
    var widthScreenLg = 992;

    //set height to home-box
	$(".home-box").height(screenHeight*0.8);
	$(".message-box").css({'marginTop':screenHeight*0.3});

	$("#alert>.close").click(function () {
	    $showMessage.removeClass("show-alert");
	    $showMessage.addClass("display-none");
    });
    
    //scroll buttom
    $window.on('scroll', function(){        
        if ($document.scrollTop() > sHeight){
            $navbar.addClass('shrink');
            $navbar.removeClass('nav-lg-none');
            $scrollToTop.fadeIn();
        }
        else{
            $navbar.removeClass('shrink');
            $navbar.addClass('nav-lg-none');
            $scrollToTop.fadeOut();
        }
    });

    $window.on('load', function(){
        $body.scrollspy({    
            target: '#navigation'
        });
    });

    $window.on('resize', function() {
        $body.scrollspy('refresh');
    });
    
    $pageScrollClicked.on('click', function(e) {
        var target = $(this).attr('href');
        PageScroll(target);
        e.preventDefault();
    });    
    
    function PageScroll(target){        
        var plusNavHeight = $window.width() > widthScreenLg 
            ? $navbar.hasClass("shrink") 
                ? 0 
                : navHeight
            : 0;
            
        $htmlBody.stop().animate({
            scrollTop: $(target).offset().top + plusNavHeight
        }, 2000);   //}, 2000, 'easeInOutExpo');
        
        //Retract the navigation after clicking on a item of the menu.
        $navbarCollapse.collapse('hide');
    };

    //1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
    // TimeoutSeg = tempo para o timeout da mensagem, time in seconds
    function ShowMessage(kind, title, message, timeoutSeg) {
        var alert = $("#alert");
        var showAlert = $("#showMessage");

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
            $("#showMessageTitle").html(message);
        }

        $body.scrollspy('refresh');
    }

    //1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
    //No timeout = 10 min to timeout the message.
    function ShowMessageNoTimeOut(kind, title, detail) {
        var timeoutSeg = 600;
        ShowMessage(kind, title, detail, timeoutSeg);
    }
});

