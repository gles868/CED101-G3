window.addEventListener('load', function () {
    let storage = sessionStorage;

    Vue.component('products', {
        data() {
            return {
                item_info: [],
            };
        },
        props: ['itemno'],
        template: `
        <div class="cartpro_a_box">
            <div class="crystalball_left_box">
                <img :src="item_info[0].proImg" />
            </div>
            <div class="crystalball_right_box">
                <div class="crystalball_name_box">
                    <div class="crystalball_name">{{item_info[0].proName}}</div>
                </div>
                <div class="crystalball_text_box">
                    <div class="crystalball_text">
                    {{item_info[0].proDescription}}
                    </div>
                </div>
                <div class="crystalball_priceAmount_box">
                        <div class="amount">
                        數量：{{num}}
                        </div>
                    <div class="pro_complete_price_box">
                        <img src="./img/dollar.png" />
                        <div class="pro_complete_price">
                            {{proPrice}}
                        </div>
                    </div>
                </div>
            </div>
        </div>     
                `,
        methods: {
            get_data: async function (itemno) {
                // console.log(itemno);

                const res = await fetch('./php/lightbox.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        itemno: itemno,
                    }),
                }).then(function (data) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.item_info = res;
            },
        },
        created() {
            this.get_data(this.itemno);
        },
    });
    new Vue({
        el: '#app',
        data: { itemlist: '' },
        methods: {
            split_products() {
                let itemString = storage.getItem('addItemList');
                let items = itemString
                    .substr(0, itemString.length - 2)
                    .split(', ');
                this.itemlist = items;
                // console.log(434353454354);
            },
        },
    });
});
