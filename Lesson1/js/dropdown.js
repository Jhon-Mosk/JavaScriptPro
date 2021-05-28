function dropdownFunction(n) {
    document.getElementById("dropdownMenu"+n).classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropdown__btn')) {

        var dropdowns = document.getElementsByClassName("dropdown__content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}