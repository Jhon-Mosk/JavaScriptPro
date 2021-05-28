let button = document.getElementById('burger');

let closeButton = document.getElementById('close-burger');

let navigation = document.getElementById('menu');

let overlay = document.getElementById('overlay');

button.addEventListener('click', function () {
        navigation.classList.toggle('display-block');
        overlay.classList.toggle('display-block');
    })

closeButton.addEventListener('click', function () {
        navigation.classList.toggle('display-block-none');
        overlay.classList.toggle('display-block-none');
    });