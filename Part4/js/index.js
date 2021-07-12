const API_URL = "http://localhost:3000";

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
      <button type="button" class="buy-button" @click="addToCart()">Купить</button>
    </div>
  `,

  methods: {
    async addToCart() {
      try {
        await fetch(`${API_URL}/addToCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.good)
        });
      } catch (error) {
        app.errorWindow();
      }
      app.renderCart();
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
    async delItem(index) {
      let obj = {index: index}

      try {
        await fetch(`${API_URL}/delFromCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(obj)
        });
      } catch (error) {
        app.errorWindow();
      }
      app.renderCart(); 
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
      app.renderCart();
    },

    async clearStats() {
      try {
        await fetch(`${API_URL}/clearStats`);
      } catch (error) {
        app.errorWindow();
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