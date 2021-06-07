// const URL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
// const EMAIL = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

pattern = () => {
    let str = "'Дан большой текст', в котором aren't they're you'll she's для оформления прямой 'речи используются одинарные' кавычки. Придумать шаблон, который 'заменяет одинарные' кавычки на двойные.";
    let pattern1 = /'/g
    let pattern2 = /(?!\b)'/gi
    console.log(str.replace(pattern1, '"'))
    console.log(str.replace(pattern2, '"'))
}

checkValid = () => {
    checkList = {
        name: document.getElementById("name"),
        phone: document.getElementById("phone"),
        email: document.getElementById("email"),
    }

    regxList = {
        name: /[a-zA-zа-яА-Я]/gi,
        phone: /\+7\(\d{3}\)\d{3}-\d{4}/g,
        email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/g,
    }

    for (let i in checkList) {       
        markError(regxList[i], checkList[i])
    }
}

markError = (pattern, target) => {
    console.dir(target.id)
    target.classList.remove("error")
    if (!pattern.test(target.value)) {
        target.classList.add("error")
        target.value = ""
        target.placeholder = {  //магия
            name: "Имя содержит только буквы",
            phone: "Телефон имеет вид +7(000)000-0000",
            email: "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"
            }[target.id] || "Значение поля задано не верно"
        // if(target.id == "name") {
        //     target.placeholder = "Имя содержит только буквы"
        // } else if(target.id == "phone") {
        //     target.placeholder = "Телефон имеет вид +7(000)000-0000"
        // } else if(target.id == "email") {
        //     target.placeholder = "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"
        // } else {
        //     target.placeholder = "Значение поля задано не верно"
        // }
    }
}

checkKey = (event) => {
    if(event.keyCode === 13) {
        checkValid()
    }
}

const init = () => {
    pattern()
    document.getElementById("name").addEventListener("keydown", checkKey)
    document.getElementById("phone").addEventListener("keydown", checkKey)
    document.getElementById("email").addEventListener("keydown", checkKey)
    document.getElementById("button").addEventListener("click", checkValid)
}

window.onload = init