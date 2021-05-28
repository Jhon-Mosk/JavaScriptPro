class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3 class="goods-item__title">${this.title}</h3><p class="goods-item__price">${this.price}</p><button class="buy-button" onclick="addToCart(event)">Купить</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class CartItem extends GoodsItem {
  render() {
    let item = `<div class="cart-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    document.querySelector('.cart-list').innerHTML += item;
  }
}

addToCart = (event) => {
  let title = event.srcElement.parentElement.querySelector(".goods-item__title").innerHTML
  let price = event.srcElement.parentElement.querySelector(".goods-item__price").innerHTML
  const item = new CartItem(title, price);
  item.render();
  result.sum(price);
}

const result = {
  price: 0,

  sum (price) {
    this.price += parseInt(price);    
    console.log(this.price)
    document.querySelector(".cart-sum").innerHTML = `Итого: ${this.price}`;
  }
};

const init = () => {  
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  }

window.onload = init