Vue.component('cart-list', {
    props: ['cartItems'],

    template: `
        <div class="cart-list">
            <cart-item v-bind:key="index" v-bind:id="item.id_product" v-bind:data-index="index" v-for="(item, index) in cartItems" :item="item" :index="index"></cart-item>
        </div>
    `,
});