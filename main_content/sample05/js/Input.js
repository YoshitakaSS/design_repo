'use strict';
{
    setUserBirthdayYearList();
    

    // 郵便番号の値が数字7桁かどうかチェックする
    function checkPostCode(code) {
        var reg = new RegExp(/^[0-9]{7}$/);
        return reg.test(code);
    }

    // ユーザー情報の誕生年を生成する
    function setUserBirthdayYearList() {
        var userBirthdayYear = document.querySelector('.user-birthday-year');
        var userBirthdayMonth = document.querySelector('.user-birthday-month');
        var userBirthdayDay = document.querySelector('.user-birthday-day');

        // 1930年代から2050年代までoption要素を生成
        for(var i = 1930; i <= 2050; i++) {
            createElementsForOptions(userBirthdayYear, i);
        }

        // 1月から12月までのoption要素を生成
        for(var j = 1; j <= 12; j++ ) {
            createElementsForOptions(userBirthdayMonth, j);
        }
    
        // 1日から31日までのoption要素を生成
        // ※デフォルトでは1月が選択されているで31
        for(var k = 1; k <= 31; k++ ) {
            createElementsForOptions(userBirthdayDay, k);
        }

        // 日付の数は月によって変わるので動的に変えるようにする
        userBirthdayMonth.addEventListener('change', () => {
            var days = createDaysForOptions(userBirthdayMonth);

            // 前回までで生成されたoptionを消去
            removeDaysElementsForOptions();
            // 月に応じた月の日付けoption要素を生成
            for(var l = 1; l <= days; l++ ) {
                createElementsForOptions(userBirthdayDay, l);
            }
        });
    }

    /**
     * 月が変わったら日のoption要素の値を変える
     *
     * @param int el userBirthdayMonth
     */
    function createDaysForOptions(el) {
        var indexKey = el.selectedIndex;
        const mouth = {
            1 : 31, 2 : 29, 3 : 31, 4 : 30,
            5 : 31, 6 : 30, 7 : 31, 8 : 31, 
            9 : 30, 10 : 31, 11 : 30, 12 : 31,
        }

        // 要素がずれるので+1をする
        return mouth[indexKey + 1];
    }

    /**
     * selectボックスのoption要素を生成する
     * @param int el element
     * @param int val value
     */
    function createElementsForOptions(el, val) {
        var op = document.createElement('option');
        op.value = val;
        op.text = val;
        el.appendChild(op);
    }
    
    function removeDaysElementsForOptions() {
        var birthday = document.getElementsByClassName('user-birthday-day');
        return birthday[0].innerHTML = '';
    }

    // 郵便番号の値チェック
    document.querySelector('input[name="postal-code"]').addEventListener('change', () => {
        var postalCode = document.querySelector('input[name="postal-code"]').value;
        var aletText = document.querySelector('.alert-txt')
        
        // もし「-」や「半角スペース」があった場合は入力し直させる
        if (!checkPostCode(postalCode)) {
            aletText.classList.add('active');
            aletText.textContent = '郵便番号を正しい値で入力してください';
            return;
        } else {
            aletText.classList.remove('active');
        }
    });

    // セレクトボックスの値がきちんと選択されたか判断する
    var selectAddress = document.getElementsByClassName('user-address-select');

    // 都道府県
    selectAddress[0].addEventListener('change', () => {
        var todoufuken = document.querySelector('select[name="geoapi-prefectures"]');
        var todofukenVal = todoufuken.value;

        // 気に食わないからあとで直す
        if (todofukenVal == '都道府県を選択してください') {
            todoufuken.nextElementSibling.textContent = '都道府県を選択してください';
            todoufuken.nextElementSibling.classList.add('active');
            return;
        } else {
            todoufuken.nextElementSibling.textContent = '';
            todoufuken.nextElementSibling.classList.remove('active');
        }

    });

    // 市区郡
    selectAddress[1].addEventListener('change', () => {
        var shikugun = document.querySelector('select[name="geoapi-cities"]');
        var shikugunVal = shikugun.value;

        if (shikugunVal == '市区町村を選択してください') {
            shikugun.nextElementSibling.textContent = '市区町村を選択してください';
            shikugun.nextElementSibling.classList.add('active');
            return;
        } else {
            shikugun.nextElementSibling.textContent = '';
            shikugun.nextElementSibling.classList.remove('active');
        }
    });

    selectAddress[2].addEventListener('change', () => {
        // 町村
        var chowson = document.querySelector('select[name="geoapi-towns"]');
        var chowsonVal = chowson.value;

        if (chowsonVal == '町域を選択してください') {
            chowson.nextElementSibling.textContent = '町域を選択してください';
            chowson.nextElementSibling.classList.add('active');
            return;
        } else {
            chowson.nextElementSibling.textContent = '';
            chowson.nextElementSibling.classList.remove('active');
        }
    });
}