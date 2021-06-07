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

class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    let response = await fetch(`${API_URL}/catalogData.json`)
    if(response.ok) {
      let json = await response.json();
      this.goods = json; 
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  render() {
    let listHtml = '';    
    this.goods.forEach(good => {
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
    console.log(title)
    console.log(price)
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
}

window.onload = init