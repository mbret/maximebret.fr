angular.module('mbret', [
    //'ui.bootstrap',
    'ui.router',
    'sticky',
    'ngAnimate',
]);

angular.module('mbret')

    .constant('$', $)

    .config(function($stateProvider, $urlRouterProvider, $injector) {

        $urlRouterProvider
            .when('', '/resume');

        $stateProvider

            .state('board', {
                url: '/board',
                abstract: true,
                controller: 'BoardController',
                templateUrl: 'app/views/board.html'
            })

            .state('board.about', {
                url: '/about',
                controller: 'BoardAboutController',
                templateUrl: 'app/views/board-content-about-me.html',
            })

            .state('board.career', {
                url: '/career',
                controller: 'BoardAboutController',
                templateUrl: 'app/views/board-content-career.html'
            })

            .state('board.contact', {
                url: '/contact',
                controller: 'BoardAboutController',
                templateUrl: 'app/views/board-content-contact.html'
            });
    })

    .run(function($rootScope, $, $anchorScroll, $location){

        $('#wait-page').fadeOut("slow", function() {
            $('#wrapper').fadeIn("slow");
        });

        $('.imgWrapper img').animate({opacity: '1.0'}, 1000, function() {
            $(this).css('filter', 'none');
        });

        //(function init_check_hash() {
        //    if (window.location.hash) {
        //        var pages = ["#about", "#resume", "#portfolio", "#blog", "#contact"];
        //        if ($.inArray(window.location.hash, pages) > -1) {
        //            $('.navigation-list a[href="' + window.location.hash + '"]').tab('show');
        //            $('#open-content').text($('.navigation-list a[href="' + window.location.hash + '"]').text()).addClass('active');
        //            $('.img-arrow, #main-content').fadeIn(function() {
        //                $("html,body").animate({
        //                    scrollTop: $('#main-content').offset().top
        //                }, 600, function() {
        //                });
        //            });
        //            if (window.location.hash == "#contact") {
        //                init_gmap();
        //            }
        //        }
        //    }
        //})();

        (function init_active_nav() {
            $('.navigation-list li').click(function() {
                $('.navigation-list li').removeClass('active');
                $(this).addClass('active');
            });
        })();

        (function init_plugins() {
            $('[data-toggle=tooltip]').tooltip();
            $('#portfolio-grid').mixitup();
            //$("#navigation").autofix_anything({
            //    onlyInContainer: true
            //});
            $('.image-popup').magnificPopup({type: 'image', preloader: true});
            $('.popup-iframe').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        })();

        (function init_btn_open_content() {
        //    $('#open-content').click(function() {
        //        $(this).toggleClass('active');
        //
        //        if ($(this).hasClass('active')) {
        //            $('.img-arrow, #main-content').fadeIn();
        //            $('.navigation-list a[href="#about"]').tab('show')
        //            $("html,body").animate({
        //                scrollTop: $('#main-content').offset().top
        //            }, 600, function() {
        //            });
        //        } else {
        //            $("html,body").animate({
        //                scrollTop: $('#wrapper').offset().top
        //            }, 600, function() {
        //                $('.img-arrow, #main-content').fadeOut();
        //                $('#open-content').text('About Me');
        //            });
        //        }
        //    });
        })();

        (function init_nav_event() {
                //$('.navigation-list a').click(function(e) {
                //    $(this).tab('show');
                //    $('#open-content').text($(this).text());
                //    $("html,body").animate({
                //        scrollTop: $('#main-content').offset().top
                //    }, 600, function() {
                //    });
                //    if ($(this).data('menu') == "contact") {
                //        init_gmap();
                //    }
                //    location.hash = $(this).attr('href');
                //    return false;
                //});
            }
        )();

        (function init_btn_love() {
            $('.love-post-btn a').click(function() {
                var current_like = parseInt($(this).text());
                $(this).html('<span><i class="fa fa-heart"></i> ' + (current_like + 1) + '</span>');
                return false;
            });
        })();

        (function init_modal_optional() {
            if ($('.ajax_link').length > 0) {
                $('.ajax_link').click(function(e) {
                    var html = $(this).attr("href");
                    $('#modal').html("").load(html);
                    $('#modal').modal('show');
                    return false;
                });
            }
        })();

        function init_gmap() {
            $('.map-area #map').remove();
            $('.map-area').append('<div id="map"></div>');
            setTimeout(function() {
                $('#map').gmap3({
                    action: 'init',
                    marker: {
                        address: "Université Nancy 2 Pôle Lorrain de Gestion 13 Rue Michel Ney 54000 Nancy",
                        options: {
                            //icon: new google.maps.MarkerImage("./assets/images/marker.png")
                        }
                    },
                    map: {
                        options: {
                            zoom: 14
                        }
                    }
                });
            }, 2000);
        }

    })

    .directive('topOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function(e) {
                    e.preventDefault();
                    $("body").animate({scrollTop: 0}, "slow");
                });
            }
        }
    })

    .directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            scope: {
                scrollTo: "@"
            },
            link: function(scope, $elm, attrs) {
                var idToScroll = scope.scrollTo;
                $elm.on('click', function() {
                    var $target;
                    if (idToScroll) {
                        $target = $(idToScroll);
                    } else {
                        $target = $elm;
                    }
                    $("body").animate({scrollTop: $target.offset().top}, "slow");
                });
            }
        }
    })

    .controller('BoardController', function($scope){
        $scope.test = 'sdfsdfsdf';

        /**
         * fade in content
         * scroll down
         */
        $scope.openContent = function(){
            $('#open-content').toggleClass('active');

            if ($('#open-content').hasClass('active')) {
                $('.img-arrow, #main-content').fadeIn();
                $('.navigation-list a[href="#about"]').tab('show');
                $("html,body").animate({
                    scrollTop: $('#main-content').offset().top
                }, 600, function() {
                });
            } else {
                $("html,body").animate({
                    scrollTop: $('#wrapper').offset().top
                }, 600, function() {
                    $('.img-arrow, #main-content').fadeOut();
                    $('#open-content').text('About Me');
                });
            }
        };
    })

    .controller('BoardAboutController', function($scope){

    });