'use strict'

{
    var reviewTextInput = document.getElementsByClassName('review-input-text');
    
    var rText = document.querySelector('input[name="review-text"]');

    reviewTextInput[0].addEventListener('oninput', () => {
        var rTitle = document.querySelector('input[name="review-title"]');
        console.log('hoge');
        if (rTitle.value === '') {
            
        }
    });

}