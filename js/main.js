if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.head.appendChild(msViewportStyle)
};
(function($) {

    $.fn.persiaNumber = function(settings) {
        if (typeof(settings) == 'string' && settings.length > 0)
            defaultSettings = settings;
        var range = 1728;
        if (settings == 'ar') {
            range = 1584;
        }
        window.persiaNumberedDOM = this;
        convert(this, range);
        $(document).ajaxComplete(function() {
            var thisObj = window.persiaNumberedDOM;
            convert(thisObj, range);
        });

        function convert(obj, range) {
            obj.find("*").andSelf().contents().each(function() {
                if (this.nodeType === 3 && this.parentNode.localName != "style" && this.parentNode.localName != "script") {
                    this.nodeValue = this.nodeValue.replace(this.nodeValue.match(/[0-9]*\.[0-9]+/), function(txt) {
                        return txt.replace(/\./, ',');
                    });
                    this.nodeValue = this.nodeValue.replace(/\d/g, function(v) {
                        return String.fromCharCode(v.charCodeAt(0) + range);
                    });
                }
            });
        }
    };
})(jQuery);
origParseInt = parseInt;
parseInt = function(str) {
    str = str && str.toString().replace(/[\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1728)
    }).replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1584)
    }).replace(/[\u066B]/g, '.');
    return origParseInt(str);
};
origParseFloat = parseFloat;
parseFloat = function(str) {
    str = str && str.toString().replace(/[\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1728)
    }).replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1584)
    }).replace(/[\u066B]/g, '.');
    return origParseFloat(str);
};;
var sliderAutoplayController = function(elm) {
    var self = $(elm)[0].wrapper;
    $(self).hover(function() {
        elm.stopAutoplay();
    }, function() {
        elm.startAutoplay();
    });
};
var scroll = $('.scrolling-content , .mrgoal-table').each(function(index, el) {
    new SimpleBar(el, {});
});
$(document).ready(function() {
    $('.persian-number').persiaNumber();
    var lazyLoad = $('.lazy-load').lazy({
        attribute: 'data-original',
        threshold: 0,
        chainable: false,
        visibleOnly: true,
        effect: 'fadeIn',
        effectTime: 300,
        afterLoad: function(elm) {
            $(elm).removeClass('lazy-load');
        }
    });
    $('.lazy-load').lazy();
    window.myLazyLoad = lazyLoad;
    var mainSlider = new Swiper('#main-slider', {
        effect: 'fade',
        centeredSlides: true,
        autoplay: 5000,
        spaceBetween: 30,
        preloadImages: false,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        loop: true,
        autoplayDisableOnInteraction: false,
        pagination: $('.main-slider').find('.control').find('.custom-bullet'),
        paginationClickable: true,
        paginationHide: false,
        nextButton: $('.main-slider').find('.control').find('.prev'),
        prevButton: $('.main-slider').find('.control').find('.next'),
        onLazyImageReady: function(swiper, slide, image) {
            $(image).removeClass('swiper-lazy');
        }


    });
    $('.tab-content-wrapper').pwstabs({
        onAfterChange: function() {
            myLazyLoad.update();
        }
    });
    var kioskSlider = new Swiper('#kiosk-slider', {
        loop: true,
        autoplay: 5000,
        preloadImages: false,
        spaceBetween: 10,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        pagination: $('#kiosk-slider').siblings('.custom-bullet'),

        onLazyImageReady: function(swiper, slide, image) {
            $(image).removeClass('swiper-lazy');
        }
    });

    sliderAutoplayController(mainSlider);
    sliderAutoplayController(kioskSlider);

    var menuNav = $("#menu-nav").flexmenu({
        triggerClick: true,
        responsiveWidth: 992,
        sidemenuPosition: "right",
        sidemenuSidebar: false,
        dropdownShowClass: "fx-slideInUp",
        dropdownHideClass: "fx-slideOutDown",
    });

    $(window).on('resize', function() {
        setTimeout(function() {
            scroll.map(function(index, elm) {
                elm.SimpleBar.recalculate();
            })
        }, 200)

    })
    $('.mobile-toggler .btn').click(function() {
        menuNav.flexmenu("toggle");
    })
    $('.body-overlay, .close-slide-panel, .search-overlay').on('click', function() {
        $('.body-overlay, .side-panel, .close-slide-panel, .search-overlay').removeClass('show');
        menuNav.flexmenu("close");
        $('body').removeClass('no-overflow');
    });


    $("#menu-nav").scrollToFixed();



    $('[data-side-panel]').each(function(e) {
        var $this = $(this);
        var panelId = $(this).attr('data-side-panel');
        $this.on('click', function(e) {
            $('#' + panelId + ',.body-overlay, .close-slide-panel').toggleClass('show');
            $('body').addClass('no-overflow');
        });
    });


    var modalConfig = {
        width: 767,
        padding: 40,
        zindex: 9999,
        radius: 5
    }


    $(window).on('resize', function() {
        myLazyLoad.loadAll()
    });
    $('.comments').comments({
        profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
        enableNavigation: false,
        enableUpvoting: false,
        spinnerIconURL: '../img/loader.svg',
        getComments: function(success, error) {
            var commentsArray = [{
                id: 1,
                created: '05-07-1396',
                content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد',
                fullname: 'محمد تقی اکبری',
                user_has_upvoted: false
            }, {
                id: 2,
                created: '05-05-1396',
                content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد',
                fullname: 'خانم محمودی',
            }];
            success(commentsArray);
        }
    });
});