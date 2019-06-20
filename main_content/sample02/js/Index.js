$(function(){
    var $navBar = $('.nav-bar');
    var $menu = $('.header-menu');

    $navBar.on('click', function(){
        if ($(this).hasClass('fa-bars')) {
            $(this).removeClass('fa-bars');
            $(this).addClass('fa-times');

            $menu.slideDown();
        } else {
            $(this).removeClass('fa-times');
            $(this).addClass('fa-bars');

            $menu.slideUp();
        }
    });

    $('.js-scguide-btn').on('click', function(){
        if ($(this).hasClass('mem-b')) {
            var $memberInfo = $(this).next().find('.members-info');
            var $memberList = $(this).next().find('.members-list');
            var scw = $memberList.width() / 10;
            $memberInfo.animate({scrollLeft : scw});
        } else if ($(this).hasClass('rev-b')) {
            var $reviewInfo = $(this).next().find('.review-info');
            var $reviewList = $(this).next().find('.review-list');
            var rcw = $reviewList.width() / 10;
            $reviewInfo.animate({scrollLeft : rcw});
        } else {
            return;
        }
        $(this).fadeOut();
    });

    
    // スクロールボタンが押さず、スクロールされたら
    $('.members-info').on('scroll', function() {
        if ($(this).scrollLeft() > 0) {
            $(this).parents('.container').prev('.js-scguide-btn').fadeOut();
        } else {
            $(this).parents('.container').prev('.js-scguide-btn').fadeIn();
        }
    });

    $('.review-info').on('scroll', function() {
        if ($(this).scrollLeft() > 0) {
            $(this).parents('.container').prev('.js-scguide-btn').fadeOut();
        } else {
            $(this).parents('.container').prev('.js-scguide-btn').fadeIn();
        }
    });
});