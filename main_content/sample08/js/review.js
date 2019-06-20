'use strict'

{
    /**
     * 一覧要素の取得
     */
    var $bookList = $('.book-list li');

    // 選択された要素番号を取得
    // APIから受け取ったJSONデータを添字を元に探索
    $bookList.on('click', function() {
        var index = $bookList.index(this);
    });


    var reviewTextInput = document.getElementsByClassName('review-input-text');
    
    var rText = document.querySelector('input[name="review-text"]');

    reviewTextInput[0].addEventListener('oninput', () => {
        var rTitle = document.querySelector('input[name="review-title"]');
        console.log('hoge');
        if (rTitle.value === '') {
            
        }
    });

}