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

    /**
     * サジェスト一覧を取得する
     */
    function getSuggestKeywordInfo()
    {
        $.ajax({
            url: '/top/book/suggest',
            type: 'POST',
            dataType: 'json',
            timeout: 5000,
        })
        .done( (data) => {
            // 何も取得できない場合は何もしない
            if (!data || data.length === 0) {
                alert('何も取得できませんでした。キーワードを変えてみてください');
                return;
            }
        })
        .fail( (data) => {
            alert('通信に失敗しました');
        });
    }

    /**
     * 文字を入力したら、推奨検索ワードを入力
     */
    function addSuggestList()
    {
        var searchForm = document.getElementById('js-top-search');
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var a = document.createElement('a');

        ul.classList.add('suggest-list');
        a.setAttribute('href', '#');
    }

});