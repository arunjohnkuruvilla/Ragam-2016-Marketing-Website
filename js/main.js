var app = angular.module('marketApp', ["ngRoute", "ngAnimate"]);

/**
 * Routes Configuration
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageController"})
        // About
        .when("/about", {templateUrl: "partials/about.html", controller: "AboutController"})
        // Sponsors
        .when("/previous_sponsors", {templateUrl: "partials/sponsors.html", controller: "SponsorController"})
        // Gallery
        .when("/gallery", {templateUrl: "partials/gallery.html", controller: "GalleryController"})
        // Contact Us
        .when("/contactus", {templateUrl: "partials/contact.html", controller: "ContactController"})
        // Pages
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "ErrorController"});
}]);

app.run(function ($rootScope, $location, $route, $timeout) {
    var loading = document.getElementById ( "loader" ) ;

    $rootScope.$on('$routeChangeStart', function () {
        console.log('$routeChangeStart');
        loading.style.visibility = "hidden";
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        if($location.path() == '/') {
            $('.navbar').addClass("display-none");
        }
        else {
            $('.navbar').removeClass("display-none");
        }
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.layout.loading = false;
    });
});

/**
 * Controller for About Page
 */
app.controller('AboutController', function() {

    console.log("Reached About Controller");                            //Remove in production

    loadNavigation();

});  
app.controller('testController', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");

    function mobilecheck() {
        var check = false;
        (function(a) {
            if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    var docElem = window.document.documentElement,
    // support transitions
    support = Modernizr.csstransitions,
    // transition end event name
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    docscroll = 0,
    // click event (if mobile use touchstart)
    clickevent = mobilecheck() ? 'touchstart' : 'click';

    function init() {
        var showMenu = document.getElementById( 'showMenu' ),
        perspectiveWrapper = document.getElementById( 'perspective' ),
        container = perspectiveWrapper.querySelector( '.page-container' ),
        contentWrapper = container.querySelector( '.wrapper' );

        showMenu.addEventListener( clickevent, function( ev ) {
            ev.stopPropagation();
            ev.preventDefault();
            docscroll = window.pageYOffset || docElem.scrollTop;
            // change top of contentWrapper
            contentWrapper.style.top = docscroll * -1 + 'px';
            // mac chrome issue:
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            // add modalview class
            classie.add( perspectiveWrapper, 'modalview' );
            // animate..
            setTimeout( function() { classie.add( perspectiveWrapper, 'animate' ); }, 25 );
        });

        container.addEventListener( clickevent, function( ev ) {
            if( classie.has( perspectiveWrapper, 'animate') ) {
                var onEndTransFn = function( ev ) {
                if( support && ( ev.target.className !== 'page-container' || ev.propertyName.indexOf( 'transform' ) == -1 ) ) return;
                    this.removeEventListener( transEndEventName, onEndTransFn );
                classie.remove( perspectiveWrapper, 'modalview' );
                // mac chrome issue:
                document.body.scrollTop = document.documentElement.scrollTop = docscroll;
                // change top of contentWrapper
                contentWrapper.style.top = '0px';
                };
                if( support ) {
                    perspectiveWrapper.addEventListener( transEndEventName, onEndTransFn );
                }
                else {
                    onEndTransFn.call();
                }
                classie.remove( perspectiveWrapper, 'animate' );
            }
        });

        perspectiveWrapper.addEventListener( clickevent, function( ev ) { return false; } );
    } 

    init();

});

/**
 * Controller for Sponsor Page
 */
app.controller('SponsorController', function() {
    console.log("Reached Sponsor Controller");                          //Remove in production
    
    loadNavigation();                                                   

    $('.sponsor-item').hover(function() {
            var $media = $(this).find('img');
            var height = $media.height();
            $media.stop().animate({ marginTop: -(height - 82) }, 1000);
        }, function() {
            var $media = $(this).find('img');
            $media.stop().animate({ marginTop: '0px' }, 1000);
    });
});

/**
 * Controller for Gallery Page
 */
app.controller('GalleryController', ['$scope','$http', function($scope, $http) {
    console.log("Reached Gallery Controller");                          //Remove in production
    $http
    .get('api/instagram.php')
    .then(function(response) {
        $scope.data = response.data.data;
        console.log(response);
    });
}]);

/**
 * Controller for Contact Page
 */
app.controller('ContactController', ['$scope', '$http', function($scope, $http) {
    console.log("Reached Contact Controller");                          //Remove in production
    
    loadMap();

    loadNavigation();

    $scope.submitQuery = function(form) {
        var status = [false, false, false, false];
        if($scope.formData.contact_name == null) {
            status[0] = true;
            $('#input1').effect("shake");
        }
        if($scope.formData.contact_email == null) {
            status[1] = true;
            $('#input2').effect("shake");
        }
        if($scope.formData.contact_message == null) {
            status[2] = true;
            $('#input4').effect("shake");
        }
        if($scope.formData.contact_spam == null) {
            status[3] = true;
            $('#input5').effect("shake");
        }

        if(status[0] == false && status[1] == false && status[3] == false && status[3] == false) {
            $http({
                method  : 'POST',
                url     : 'api/contact.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(response, status) {
                console.log(response);  
            });
        }

    }
}]);

function loadNavigation () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.navbar-brand-centered').fadeIn();

        } else {
            $('.navbar-brand-centered').fadeOut();
        }
    });
}
function loadMap() {
    var head = document.getElementsByTagName('head')[0];
    var insertBefore = head.insertBefore;

    head.insertBefore = function (newElement, referenceElement) {
        if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
            return;
        }
        insertBefore.call(head, newElement, referenceElement);
    };
    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(11.3214022,75.9369883),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        }
        var myLatLng = {lat: 11.3214022, lng: 75.9369883};
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
          });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
}

/**
 * Controller for Home Page
 */
app.controller('PageController', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");
    
    var SidebarMenuEffects = (function() {

        function hasParentClass( e, classname ) {
            if(e === document) return false;
            if( classie.has( e, classname ) ) {
                return true;
            }
            return e.parentNode && hasParentClass( e.parentNode, classname );
        }

        function mobilecheck() {
            var check = false;
            (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }

        function init() {

            var container = document.getElementById( 'st-container' ),
                buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > div' ) ),
                // event type (if mobile use touch events)
                eventtype = mobilecheck() ? 'touchstart' : 'click',
                resetMenu = function() {
                    classie.remove( container, 'st-menu-open' );
                },
                bodyClickFn = function(evt) {
                    if( !hasParentClass( evt.target, 'st-menu' ) ) {
                        resetMenu();
                        document.removeEventListener( eventtype, bodyClickFn );
                    }
                };

            buttons.forEach( function( el, i ) {
                var effect = el.getAttribute( 'data-effect' );

                el.addEventListener( eventtype, function( ev ) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.className = 'st-container'; // clear
                    classie.add( container, effect );
                    setTimeout( function() {
                        classie.add( container, 'st-menu-open' );
                    }, 25 );
                    document.addEventListener( eventtype, bodyClickFn );
                });
            } );
        }
        init();
    })();
    $('.audio-wrap').click(function() {

        var audioTag = document.getElementById("theme");
        if(audioTag.paused) {
            audioTag.play();
            $('#bars').addClass("is-on");
        }
        else {
            audioTag.pause();
            $('#bars').removeClass("is-on");
        }

    });
});

/**
 * Controller for Main
 */
app.controller("MainController", ['$scope', function($scope) {
    var loading = document.getElementById ( "loader" ) ;
    $scope.$on('$viewContentLoaded', function(){
        console.log("loader hidden");
        loading.style.visibility = "hidden"
    });
    document.getElementById("theme").volume = 0.2;
}]);

/**
 * Controller for 404 Page
 */
app.controller("ErrorController", [function() {
    alert("Error");
}]);

app.directive('typewrite', ['$timeout', function ($timeout) {
    function linkFunction (scope, iElement, iAttrs) {
        var timer = null,
            initialDelay = 90,
            typeDelay = 90,
            blinkCursor = true,
            entryCount = 4,
            auxStyle;
        var stringSet = ["A unified emotion", "A goal. A vision. A dream.", "Lets make it come alive", "Ragam 2016"];
        var j = 0;
   
        updateIt(iElement, 0, stringSet[0]);

        function updateIt(element, i, text){
            if (i <= text.length) {
                element.html(text.substring(0, i));
                i++;
                timer = $timeout(function() {
                    updateIt(iElement, i, text);

                }, typeDelay);
            }
            else {
                $timeout(function() {
                    j++;
                    if(j == entryCount) {
                        j = 0;
                    }
                    updateIt(iElement, 0, stringSet[j])
                }, 1000);
            }
        }
        scope.$on('$destroy', function() {
            if(timer) {
                $timeout.cancel(timer);
            }
        });
    }
    return {
        restrict: 'A',
        link: linkFunction,
        scope: false
    };
}]);