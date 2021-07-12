import {API_URL} from './adress'

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
                this.$root.errorWindow();
            }
            this.$root.renderCart();
        }
    },
});