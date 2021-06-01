class Humburger {
    constructor(size, stuffing) {
        this.topping = {
            price: 0,
            calorie: 0
        }

        this.size = size; 
        
        if (stuffing == "cheese") {
            this.stuffing = {
                price: 10,
                calorie: 20
            }            
        } else if (stuffing == "salad") {
            this.stuffing = {
                price: 20,
                calorie: 5
            }
        } else if (stuffing == "potato") {
            this.stuffing = {
                price: 15,
                calorie: 10
            }
        }

        if (this.size == "small") {
            this.bun = {
                price: 50,
                calorie: 20
            }            
        } else {
            this.bun = {
                price: 100,
                calorie: 40
            }            
        }
    }

    addTopping(topping) {  // Добавить добавку
        if (topping == "ketchup") {
            this.topping = {
                price: 15,
                calorie: 0
            }            
        } else if (topping == "mayonnaise") {
            this.topping = {
                price: 20,
                calorie: 5
            }            
        }
    }

    removeTopping(topping) { // Убрать добавку
        this.topping.price = 0;
        this.topping.calorie = 0;
    }

    getToppings(topping) { // Получить список добавок
        return this.topping
    }

    getToppingPrice() {  // Узнать цену добавок
        return this.topping.price
    }

    getToppingCalorie() {  // Узнать калорийность добавок
        return this.topping.calorie
    }

    getSize() {  // Узнать размер гамбургера
        return this.size
    }

    getBunPrice() {  // Узнать цену булочки
        return this.bun.price
    }

    getBunCalorie() {  // Узнать калорийность булочки
        return this.bun.calorie
    }

    getStuffing() { // Узнать начинку гамбургера }
        return this.stuffing
    }

    getStuffingPrice() {  // Узнать цену начинки
        return this.stuffing.price
    }

    getStuffingCalorie() {  // Узнать калорийность начинки
        return this.stuffing.calorie
    }

    calculatePrice() { // Узнать цену
        return this.getBunPrice() + this.getToppingPrice() + this.getStuffingPrice();
    } 

    calculateCalories() { // Узнать калорийность }
        return this.getBunCalorie() + this.getToppingCalorie() + this.getStuffingCalorie();
    }

}

function addBun() {    
    let size = event.target.alt;
    document.querySelector(`.${size}Burger`).innerHTML += '<div class="stuffing"><img class="stuffing__item" src="./img/cheese.jpg" alt="cheese"><img class="stuffing__item" src="./img/potato.jpg" alt="potato"><img class="stuffing__item" src="./img/salad.jpg" alt="salad"></div>';
    document.querySelector(`.${size}Burger-img`).classList.toggle("disable");
    let stuffingItems = document.getElementsByClassName("stuffing__item");
    for (let i in stuffingItems) {        
        stuffingItems[i].addEventListener("click", () => addStuffing(event, size));
        stuffingItems[i].setAttribute("data-type", `${stuffingItems[i].alt}`)
    }    
}

function addStuffing(event, size) {    ;
    let stuffing = event.target.dataset.type;
    event.target.classList.toggle("active");
    document.querySelector(`.${size}Burger`).innerHTML += '<div class="topping"><img class="topping__item" src="./img/ketchup.jpg" alt="ketchup"><img class="topping__item" src="./img/mayonnaise.jpg" alt="mayonnaise"><img class="topping__item" src="./img/none.jpg" alt="none"></div>'
    let toppingItems = document.getElementsByClassName("topping__item");
    for (let i in toppingItems) {
        toppingItems[i].addEventListener("click", () => addTopping(this.event, size, stuffing));
        toppingItems[i].setAttribute("data-type", `${toppingItems[i].alt}`)
    }
}

function addTopping(event, size, stuffing) {    
    let topping = event.target.dataset.type;
    event.target.classList.toggle("active");
    document.querySelector(`.${size}Burger`).innerHTML += '<button class="buy" type="button">Заказать</button>';
    document.querySelector(".buy").addEventListener("click", () => buy(size, stuffing, topping));;
}

function buy(size, stuffing, topping) {
    console.log(size, stuffing, topping);
    let humburger = new Humburger(size, stuffing);
    humburger.addTopping(topping);
    alert(`С вас: ${humburger.calculatePrice()} рублей`);    
    alert(`Калорийность: ${humburger.calculateCalories()} ккал`);    
    console.log(humburger.calculatePrice());
    console.log(humburger.calculateCalories())
}

const init = () => {    
    document.querySelector(".bigBurger-img").addEventListener("click", addBun);
    document.querySelector(".smallBurger-img").addEventListener("click", addBun);
    // let humburger = new Humburger("big", "cheese");
    // humburger.addTopping("mayonnaise");
    // humburger.removeTopping();
    // console.log(humburger.calculatePrice());
    // console.log(humburger.calculateCalories());
}

window.onload = init