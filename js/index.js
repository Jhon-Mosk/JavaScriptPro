const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }

  render() {
    return `<div class="goods-item" id="${this.id}"><h3 class="goods-item__title">${this.title}</h3><p class="goods-item__price">${this.price}</p><button class="buy-button" onclick="cart.addToCart(event)">Купить</button></div>`;
  }
}

deleteItem = () => {
  console.log("delete")
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }

  async fetchGoods() {
    let response = await fetch(`${API_URL}/catalogData.json`)
    if(response.ok) {
      let json = await response.json();
      this.goods = json;
      this.filteredGoods = json; 
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  filterGoods(value) {
    const regExp = new RegExp(value, 'i')
    this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
    this.render()
  }

  render() {
    let listHtml = '';    
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class CartItem extends GoodsItem {
  render() {
    let item = `<div class="cart-item"><h3>${this.title}</h3><p class="cart-item__price">${this.price}</p><button class="buy-button" onclick="cart.delProduct(event)">Удалить</button></div>`;
    document.querySelector('.cart-list').innerHTML += item;
  }
}

const cart = {

  findPrice(obg) {
    for (let i in obg.children) {
      if (obg.children[i].classList.contains("cart-item__price")) {
        return obg.children[i].innerHTML;
      }
    }
  },

  addToCart(event) {
    let title = event.srcElement.parentElement.querySelector(".goods-item__title").innerHTML
    let price = event.srcElement.parentElement.querySelector(".goods-item__price").innerHTML
    const item = new CartItem(title, price);
    item.render();
    result.sum(price);
  },

  delProduct(event) {
    event.target.parentElement.setAttribute("data-del", "true")
    let cartItem = document.querySelectorAll(".cart-item")
    let cartList = document.querySelector(".cart-list");
    cartList.innerHTML = "";
    for (let i of cartItem) {
      if (!i.hasAttribute("data-del")) {
        cartList.innerHTML += i.outerHTML;
      } else {
        result.sum(-cart.findPrice(i))  
      }
    }
  },

  displayCart() {
    document.querySelector(".cart").classList.toggle("cart_none");
  },
}

const result = {
  price: 0,

  sum(price) {
    this.price += parseInt(price);
    document.querySelector(".cart-sum").innerHTML = `Итого: ${this.price}`;
  }
};

const init = async () => {
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();

  const searchButton = document.querySelector('.search-button')
  const searchInput = document.querySelector('.goods-search')

  searchButton.addEventListener('click', () => {
    list.filterGoods(searchInput.value)
  })

  searchInput.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {
      list.filterGoods(searchInput.value)
    }
  })
}

window.onload = init