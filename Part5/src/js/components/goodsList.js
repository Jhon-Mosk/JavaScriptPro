Vue.component('goods-list', {
    props: ['goods'],

    template: `
        <div class="goods-list">
            <goods-item v-bind:key="index" v-bind:id="item.id_product" v-for="(item, index) in goods" :good="item" v-if="goods.length != 0"></goods-item>
            <div class="goods-item" v-if="goods.length == 0">Нет данных</div>
        </div>
    `,
});