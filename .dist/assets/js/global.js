function init_modal_optional(){$(".ajax_link").length>0&&$(".ajax_link").click(function(t){var n=$(this).attr("href");return $("#modal").html("").load(n),$("#modal").modal("show"),!1})}function init_btn_love(){$(".love-post-btn a").click(function(){var t=parseInt($(this).text());return $(this).html('<span><i class="fa fa-heart"></i> '+(t+1)+"</span>"),!1})}function init_plugins(){$("[data-toggle=tooltip]").tooltip(),$("#portfolio-grid").mixitup(),$("#navigation").autofix_anything({onlyInContainer:!0}),$(".image-popup").magnificPopup({type:"image",preloader:!0}),$(".popup-iframe").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1})}function init_back_to_top(){$("#backtotop").click(function(){return $("html,body").animate({scrollTop:$("#wrapper").offset().top},600,function(){}),!1})}function init_btn_open_content(){$("#open-content").click(function(){$(this).toggleClass("active"),$(this).hasClass("active")?($(".img-arrow, #main-content").fadeIn(),$('.navigation-list a[href="#about"]').tab("show"),$("html,body").animate({scrollTop:$("#main-content").offset().top},600,function(){})):$("html,body").animate({scrollTop:$("#wrapper").offset().top},600,function(){$(".img-arrow, #main-content").fadeOut(),$("#open-content").text("About Me")})})}function init_nav_event(){$(".navigation-list a").click(function(t){return $(this).tab("show"),$("#open-content").text($(this).text()),$("html,body").animate({scrollTop:$("#main-content").offset().top},600,function(){}),"contact"==$(this).data("menu")&&init_gmap(),location.hash=$(this).attr("href"),!1})}function init_active_nav(){$(".navigation-list li").click(function(){$(".navigation-list li").removeClass("active"),$(this).addClass("active")})}function init_text_wait(){$("#wait-page").fadeOut("slow",function(){$("#wrapper").fadeIn("slow")})}function init_check_hash(){if(window.location.hash){var t=["#about","#resume","#portfolio","#blog","#contact"];$.inArray(window.location.hash,t)>-1&&($('.navigation-list a[href="'+window.location.hash+'"]').tab("show"),$("#open-content").text($('.navigation-list a[href="'+window.location.hash+'"]').text()).addClass("active"),$(".img-arrow, #main-content").fadeIn(function(){$("html,body").animate({scrollTop:$("#main-content").offset().top},600,function(){})}),"#contact"==window.location.hash&&init_gmap())}}function theme_option(t){var n=$(t).data("css");return"default"==n?$(".them-option").remove():$("head").append('<link href="assets/css/theme-option/'+n+'.css" rel="stylesheet" class="them-option">'),$("#modal").modal("hide"),!1}function init_gmap(){$(".map-area #map").remove(),$(".map-area").append('<div id="map"></div>'),setTimeout(function(){$("#map").gmap3({action:"init",marker:{address:"54000 Nancy",options:{}},map:{options:{zoom:14}}})},2e3)}function _calculateAge(t){var n=Date.now()-t.getTime(),i=new Date(n);return Math.abs(i.getUTCFullYear()-1970)}$(document).ready(function(){init_check_hash(),init_text_wait(),init_active_nav(),init_back_to_top(),init_plugins(),init_btn_open_content(),init_nav_event(),init_btn_love(),init_modal_optional(),$(".my-age").html("("+_calculateAge(new Date("1990-03-08"))+" ans)")}),$(window).load(function(){$(".imgWrapper img").animate({opacity:"1.0"},1e3,function(){$(this).css("filter","none")})});