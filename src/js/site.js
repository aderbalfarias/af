$(document).ready(function ($) {
    var $document = $(document);
    var $window = $(window);
    var $body = $("body");
    var $htmlBody = $("html, body");
    var $showMessage = $("#showMessage");
    var $scrollToTop = $(".scroll-to-top");
    var $navbar = $(".navbar");
    var $navbarCollapse = $(".navbar-collapse");
    var $pageScrollClicked = $("a[class*=page-scroll]");
    var $contactForm = $("#contactForm");
    var screenHeight = $window.height();
    var sHeightTop = 100;
    var sHeightEnd = 700;
    var navHeight = 62.800;
    var widthScreenLg = 992;
    var oneThousand = 1000;
    
    $(".home-box").height(screenHeight * 0.8);
    $(".message-box").css({ "marginTop": screenHeight * 0.3 });

    $("#alert>.close").click(function () {
        $showMessage.removeClass("show-alert");
        $showMessage.addClass("display-none");
    });

    $window.on("scroll", function () {
        if ($document.scrollTop() > sHeightTop) {
            $navbar.addClass("shrink");
            $navbar.removeClass("nav-lg-none");
        }
        else {
            $navbar.removeClass("shrink");
            $navbar.addClass("nav-lg-none");
        }
        if ($document.scrollTop() > sHeightEnd) {
            $scrollToTop.fadeIn();
        }
        else {
            $scrollToTop.fadeOut();
        }
    });

    $window.on("load", function () {
        $body.scrollspy({
            target: "#navigation"
        });
    });

    $window.on("resize", function () {
        $body.scrollspy("refresh");
    });

    $pageScrollClicked.on("click", function (e) {
        var target = $(this).attr("href");
        PageScroll(target);
        e.preventDefault();
    });

    function PageScroll(target) {
        var plusNavHeight = $window.width() > widthScreenLg
            ? $navbar.hasClass("shrink")
                ? 0
                : navHeight
            : 0;

        $htmlBody.stop().animate({
            scrollTop: $(target).offset().top + plusNavHeight
        }, oneThousand, "swing");

        //Retract the navigation after clicking on a item of the menu.
        $navbarCollapse.collapse("hide");
    };

    $contactForm.validate();    
    $("#sendEmail").on('click', function(e){
        if ($contactForm.valid()) {
            var formJson = {};
            $.map($contactForm.serializeArray(), function(n, i){
                formJson[n['name']] = n['value'];
            });

            $.ajax({
                url: "/api/email/afcontatosend",
                type: "post",
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                data: JSON.stringify(formJson),
                success: function(data) {
                    if (data === true) {                    
                        $.ShowMessage("Success", "Email Sent", "Your email has sent successfully", 5);
                        $contactForm.find('input[type="text"], input[type="email"], textarea').val("");
                    } else {
                        $.ShowMessage("Error", "Email Sent", "Happened a problem trying to send email", 5);
                    }                
                },
                error: function() {
                    $.ShowMessage("Error", "Something Wrong", "Happened an unexpected problem", 5);
                }
            });
        } else {
            $.ShowMessage("Warning", "Verify the Form", "You are missing something", 5);
        }      

        e.preventDefault();
    });
  
    //1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
    // TimeoutSeg = tempo para o timeout da mensagem, time in seconds
    $.ShowMessage = function (kind, title, message, timeoutSeg) {
        var alertId = $("#alert");
        var showAlert = $("#showMessage");

        if (timeoutSeg == undefined) {
            timeoutSeg = 8;
        }

        var timeout = timeoutSeg * oneThousand;

        showAlert.slideDown(function () {
            setTimeout(function () {
                showAlert.slideUp(200);
            }, timeout);
        });

        alertId.removeClass();
        alertId.addClass("alert");

        if (kind == "Information") {
            alertId.addClass("alert-info");
        } else if (kind == "Success") {
            alertId.addClass("alert-success");
        } else if (kind == "Warning") {
            alertId.addClass("alert-warning");
        } else if (kind == "Error") {
            alertId.addClass("alert-danger");
        }

        if (title != null) {
            $("#kind").html(title)
            $("#showMessageTitle").html(message);
        }

        $body.scrollspy("refresh");
    };

    //1: Success/Sucesso, 2: Info/Informação, 3: Warnnig/Aviso, 4: Error/Erro
    //No timeout = 10 min to timeout the message.
    $.ShowMessageNoTimeOut = function (kind, title, detail) {
        var timeoutSeg = 600;
        ShowMessage(kind, title, detail, timeoutSeg);
    }

    var phrases = [
        "Full Stack Developer",
        "Software Engineer",
        "Senior .Net Developer",
    ];

    var objTs = new TextScramble(document.querySelector("#textProfession"));
    var counter = 0;
    var next = function () {
        objTs.setText(phrases[counter]).then(function () {
            setTimeout(next, 2000);
        });
        counter = (counter + 1) % phrases.length;
    };
    next();

    var x = $.post("https://aderbalfarias.com/api/email/test");
});





    