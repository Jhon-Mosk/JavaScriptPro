const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('search-wrap', {
  data: function () {
    return {
      searchLine: ''
    }
  },

  template: `
    <div class="search-wrap">
      <input type="text" class="goods-search" @keydown.enter="filterGoods" v-model="searchLine"></input>
      <button class="search-button" type="button" @click="filterGoods">Искать</button>
    </div>
  `,

  methods: {
    filterGoods() {
      const regExp = new RegExp(this.searchLine, 'i')
      app.filteredGoods = app.goods.filter(good => regExp.test(good.product_name))
    },
  },
});

Vue.component('goods-list', {
  props: ['goods'],

  template: `
    <div class="goods-list">
      <goods-item v-bind:key="index" v-bind:id="item.id_product" v-for="(item, index) in goods" :good="item" v-if="goods.length != 0"></goods-item>
      <div class="goods-item" v-if="goods.length == 0">Нет данных</div>
    </div>
  `,
});

Vue.component('goods-item', {
  props: ['good'],

  template: `
    <div class="goods-item">
      <h3 class="goods-item__title">{{ good.product_name }}</h3>
      <p class="goods-item__price">{{ good.price }}</p>
      <button type="button" class="buy-button" @click="addToCart($event)">Купить</button>
    </div>
  `,

  methods: {
    addToCart(event) {
      const {
        parentElement
      } = event.srcElement

      const item = {
        product_name: parentElement.querySelector(".goods-item__title").innerHTML,
        price: parentElement.querySelector(".goods-item__price").innerHTML,
        id_product: parentElement.id,
      }

      app.cartItems.push(item)

      app.total += +item.price
    }
  },
});

Vue.component('cart-list', {
  props: ['cartItems'],

  template: `
    <div class="cart-list">
      <cart-item v-bind:key="index" v-bind:id="item.id_product" v-bind:data-index="index" v-for="(item, index) in cartItems" :item="item" :index="index"></cart-item>
    </div>
  `,
});

Vue.component('cart-item', {
  props: ['item', 'index'],

  template: `
    <div class="cart-item">
      <h3 class="cart-item__title">{{ item.product_name }}</h3>
      <p class="cart-item__price">{{ item.price }}</p>
      <button type="button" class="del-button" @click=delItem(index)>Удалить</button>
    </div>
`,

  methods: {
    delItem(index) {
      app.total -= app.cartItems[index].price;
      app.cartItems.splice(index, 1);
    },
  }
});

Vue.component('error', {
  template: `
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">ERROR</h3>
            <a href="#" title="Close" class="close">×</a>
          </div>
          <div class="modal-body">    
            <p>Ошибка загрузки</p>
          </div>
        </div>
      </div>
    </div>
  `
});

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
        const modal = document.querySelector(".modal").classList;

        modal.add("active")
        document.querySelector(".close").addEventListener('click', () => {
          modal.toggle("active")
        })
      }
    },
  },

  async mounted() {
    await this.fetchGoods();
  }
});