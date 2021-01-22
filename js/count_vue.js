Vue.component('my-count', {
    data() {
        return {
            count: 0,
        }
    },
    props: [],
    template: `
    <div class="num_icon">
        <div class="num_text">{{count}}</div>
    </div>
            `,

    methods: {
        //判斷 目前的購物車中 商品數量
        checked_count() {
            let storage = sessionStorage
            //判斷 目前有多少商品
            if (storage.getItem('count') == 0) {
                // console.log('沒切割')
            } else {
                console.log('切割')
                this.count = storage.getItem('count')
            }
            // console.log('有幾個')
        },
    },
    created() {},
    mounted() {
        this.checked_count()
    },
})
