import {API_URL} from './adress'

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
            let obj = {
                index: index
            }
            try {
                await fetch(`${API_URL}/delFromCart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(obj)
                });
            } catch (error) {
                this.$root.errorWindow();
            }
            this.$root.renderCart();
        },
    }
});