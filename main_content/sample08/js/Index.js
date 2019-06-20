
'use strict';

{
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

    var textField = document.querySelector('input[name="s"]');

    textField.addEventListener('change', () => {
        getApiInfo(textField.value);
    });


    /**
     * Ajax
     * @param {string} query 検索文字
     */
    function getApiInfo(query)
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
        })
    }

    /**
     * Ajaxで受け取った情報を画面に反映
     * @param {json} data
     * data = {
        title : '本のタイトル',
        description : '本のディスクリプション',
        publisher : '出版社',
        thumbnail : 'サムネイル画像'
     }
     */
    function addPageInfoForBookList(data)
    {
        var $bookList = document.getElementById('js-book-list');

        // 検索した要素が残っている場合は削除する
        if (!!$bookList.innerHTML) {
            $bookList.innerHTML = '';
        }

        // APIの仕様上、10個までしか取得されないので10回のみ回す
        for(var i = 0; i < 10; i++) {
            // 本の中身を作る作業
            let bookitem = document.createElement('a');
            bookitem.classList.add('book-item');
            bookitem.setAttribute('href','javascript:void(0);');

            // 本のタイトル
            let booktitle = document.createElement('div');
            booktitle.classList.add('book-title');
            booktitle.textContent = data[i].title;

            // 本のサンプルイメージ
            let bookimg = document.createElement('div');
            bookimg.classList.add('book-img');

            // 取得したイメージをimgタグに反映
            let img = document.createElement("img");
            img.setAttribute('src', data[i].thumbnail);
            bookimg.appendChild(img);

            // 取得した全ての要素をbookitemに追加
            bookitem.appendChild(booktitle);
            bookitem.appendChild(bookimg);

            // 本のリストを作成
            var li = document.createElement("li");
            $bookList.appendChild(li).appendChild(bookitem);
        }
    }

    /**
     * Ajaxで受け取った情報を投稿画面に反映
     * @param {Array} data
     * data = {
        title : '本のタイトル',
        description : '本のディスクリプション',
        publisher : '出版社',
        thumbnail : 'サムネイル画像'
     }
     */
    function inputDataInfo(data)
    {
        var $bookList = $('.book-list li');
        var $selectedBookInfo = $('.selected-book-info');
        var bookInfo = [];

        $bookList.on('click', function() {
            var index = $bookList.index(this);
            bookInfo = data[index];

            $selectedBookInfo.fadeIn();

            // ユーザーが選んだ本の情報を画面パーツに埋め込む
            addPageInfoForReviewBook(bookInfo);

            // form送信用に値を埋め込む
            addPageInfoForPost(bookInfo);
        });
    }

    /**
     * ユーザーが選んだ本の情報を画面に表示する
     * @param {Array} bookInfo
     */
    function addPageInfoForReviewBook(bookInfo)
    {
        // 本のタイトル
        var title = document.querySelector('.js-item-title');
        title.textContent = bookInfo.title;

        // 本のディスクリプション
        var description = document.querySelector('.js-item-description');
        description.textContent = bookInfo.description;

        // 本のサムネイル画像
        var img = document.querySelector('.js-selected-item-img img')
        img.src = bookInfo.thumbnail;

        // 本の著書名
        var author = document.querySelector('.js-item-author');
        author.textContent = '著書名：' + bookInfo.authors;

        // 本の出版社
        var publisher = document.querySelector('.js-item-publisher');
        publisher.textContent = '出版社：' + bookInfo.publisher;

        return;
    }

    /**
     * 上記とやってることほぼ同じformに埋め込む用のメソッド
     * @param {Array} bookInfo
     */
    function addPageInfoForPost(bookInfo)
    {
        // 本のタイトル
        var title = document.getElementById('js-bktile');
        title.value = bookInfo.title;

        // 本のディスクリプション
        var description = document.getElementById('js-bkdesc');
        description.value = bookInfo.description;

        // 本のサムネイル画像
        var img = document.getElementById('js-img')
        img.value = bookInfo.thumbnail;

        // 本の価格
        var price = document.getElementById('js-price');
        price.value = bookInfo.price;

        // 本の著書名
        var author = document.getElementById('js-author');
        author.value = bookInfo.authors;

        // 本の出版社
        var publisher = document.getElementById('js-pub');
        publisher.value = bookInfo.publisher;

        // 本のリンク
        var amazonLink = document.getElementById('js-alink');
        var googleLink = document.getElementById('js-glink');
        amazonLink.value = bookInfo.amaLink;
        googleLink.value = bookInfo.gooLink;

        return;
    }
}

