'use strict';

{
    var addCommentBtn = document.getElementById('js-add-comment');
    var overlay = $('#js-overlay');
    var reviewModal = $('#js-modal-review');

    // コメント追加ボタンをタップする
    addCommentBtn.addEventListener('click', () => {
        reviewModal.fadeIn();
        overlay.fadeIn();
    });

    overlay.on('click', () => {
        reviewModal.fadeOut();
        overlay.fadeOut();
    });

    function addCommentInfo()
    {
        $.ajax({
            url: '/api/books-list?s=' + query,
            type: 'GET',
            dataType: 'json',
            timeout: 5000,
        })
        .done( (data) => {
            // 何も取得できない場合は何もしない
            if (!data || data.length === 0) {
                alert('何も取得できませんでした。キーワードを変えてみてください');
                return;
            }
            // 検索結果をページ内に表示する
            addPageInfoForBookList(data);
            // 検索結果の内容をレビュー投稿に反映させる
            inputDataInfo(data);
        })
        .fail( (data) => {
            alert('通信に失敗しました');
        });
    }
  
}
    
    
