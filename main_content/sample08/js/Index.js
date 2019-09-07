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

    var $bookList = $('.book-list li');

    $bookList.on('click', () => {
        
    });

});