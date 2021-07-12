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
            this.$root.filteredGoods = this.$root.goods.filter(good => regExp.test(good.product_name))
        },
    },
});