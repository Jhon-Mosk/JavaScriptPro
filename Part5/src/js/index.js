import {API_URL} from './components/adress'
import './components/searchWrap'
import './components/goodsList'
import './components/goodsItem'
import './components/cartList'
import './components/cartItem'
import './components/error'

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
        let response = await fetch(`${API_URL}/catalogData`);
        this.goods = await response.json();
        this.filteredGoods = this.goods;
      } catch (error) {
        this.errorWindow();
      }
    },

    async renderCart() {
      try {
        let response = await fetch(`${API_URL}/cartData`);

        this.cartItems = await response.json();

        this.totalValue();
      } catch (error) {
        this.errorWindow();
      }
    },

    async totalValue() {
      try {
        let response = await fetch(`${API_URL}/totalValue`);
        let totalValue = await response.json()
        this.total = totalValue.total;
      } catch (error) {
        this.errorWindow();
      }
    },

    async clearCart() {
      try {
        await fetch(`${API_URL}/clearCart`);
      } catch (error) {
        app.errorWindow();
      }
      this.renderCart();
    },

    async clearStats() {
      try {
        await fetch(`${API_URL}/clearStats`);
      } catch (error) {
        this.errorWindow();
      }
    },

    errorWindow() {
      const modal = document.querySelector(".modal").classList;

        modal.add("active")
        document.querySelector(".close").addEventListener('click', () => {
          modal.toggle("active")
        })
    },
  },

  async mounted() {
    await this.fetchGoods();
  }
});