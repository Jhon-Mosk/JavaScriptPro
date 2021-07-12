const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',

  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    cartItems: [],
    total: 0,
  },

  methods: {
    async fetchGoods() {
      try {
        let response = await fetch(`${API_URL}/catalogData.json`);
        this.goods = await response.json();
        this.filteredGoods = this.goods;
      } catch (error) {
        alert("Ошибка HTTP: " + error.status);
      }
    },

    filterGoods() {
      const regExp = new RegExp(this.searchLine, 'i')
      this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
    },

    addToCart(event) {
      const {
        parentElement
      } = event.srcElement

      const item = {
        product_name: parentElement.querySelector(".goods-item__title").innerHTML,
        price: parentElement.querySelector(".goods-item__price").innerHTML,
        id_product: parentElement.id,
        delete: false,
      }

      this.cartItems.push(item)

      this.total += +item.price
    },

    delItem(index) {
      this.total -= this.cartItems[index].price;
      this.cartItems.splice(index, 1);
    },
  },

  async mounted() {
    await this.fetchGoods();

    const searchButton = document.querySelector('.search-button')
    const searchInput = document.querySelector('.goods-search')

    searchButton.addEventListener('click', () => {
      this.filterGoods(searchInput.value)
    })

    searchInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.filterGoods(searchInput.value)
      }
    })
  }
});