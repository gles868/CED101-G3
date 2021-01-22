window.addEventListener('load', function () {
    const vm = new Vue();
    let storage = sessionStorage;
    if (storage['total'] == null) {
        storage['total'] = '';
    }

    Vue.component('products', {
        data() {
            return {
                item_info: [],
                num: 0,
                addItemList: storage['addItemList'],
                // total_price: 0,
            };
        },
        props: ['itemno'],
        template: `
        
                <div class="cartpro_a_box">
                    <div class="crystalball_left_box">
                        <img :src="item_info.proImg" />
                    </div>
                    <div class="crystalball_right_box">
                        <div class="crystalball_name_box">
                            <div class="crystalball_name">{{item_info.proName}}</div>
                        </div>
                        <div class="delete"><img src="./img/close.png" @click="deleteproduct(item_info.proNo),cartcount()"></div>
                        <div class="crystalball_text_box">
                            <div class="crystalball_text">
                            {{item_info.proDescription}}
                            </div>
                        </div>

                        <div class="crystalball_priceAmount_box">
                        
                        <div class="amount">
                        <div class="amount_input">
                            <input @click="min" id="min" class="butDec" type="button" value="-"/>
                            <div id="quantity"><span>{{num}}</span></div>
                            <input @click="add" type="button" id="addamount" class="butDec" value="+"/>
                        </div>
                    </div>
                            <div class="pro_complete_price_box">
                                <img src="./img/dollar.png" />
                                <div class="pro_complete_price" >{{num * item_info.proPrice}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                `,

        methods: {
            min() {
                if (this.num <= 1) {
                    return '';
                }
                this.num--;
                this.$emit('min_price', this.item_info.proPrice);
                storage[this.item_info.proNo] = `${this.item_info.proNo}|${
                    this.num * this.item_info.proPrice
                }|${this.num}`;
            },
            add() {
                this.num += 1;
                this.$emit('add_price', this.item_info.proPrice);
                storage[this.item_info.proNo] = `${this.item_info.proNo}|${
                    this.num * this.item_info.proPrice
                }|${this.num}`;
            },

            get_data: async function (itemno) {
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

                this.add();
            },
            deleteproduct(itemno) {
                this.$emit('deleteproduct', itemno);
            },
            // delete_count(count) {
            //     this.count--;
            //     console.log(111);
            //     // storage.removeItem('count');
            //     if (storage['count']) {
            //         // console.log('000');
            //         storage.setItem('count', `${this.count}`);
            //         // storage['total'] += `${this.total_price} `;
            //     } else {
            //         storage['count'] -= `${this.count} `;
            //     }
            // },
            cartcount() {
                vm.$emit('count');
            },
            // showcart: function (i) {
            //     let xhr = new XMLHttpRequest();
            //     xhr.onload = function () {
            //         let memData = JSON.parse(xhr.responseText);
            //         if (memData.memberNo) {
            //             // 如果有登入會員
            //             console.log(11111);
            //         } else {
            //             // 如果未登入，跳出提示燈箱
            //             alert('請登入會員');
            //         }
            //     };
            //     xhr.open('get', 'php/getLoginData.php', true);
            //     xhr.send(null);
            // },
        },
        created() {
            this.get_data(this.itemno);
        },
        watch: {
            // num() {
            //     this.add_price();
            // },
        },
    });

    new Vue({
        el: '#app',
        data: {
            itemlist: '',
            total_price: 0,
            space_box: false,
            deliver_box: true,
            total_box: true,
            Btn: true,
            count: 0,
        },
        methods: {
            //切割storage帶的商品編號
            split_products() {
                let itemString = storage.getItem('addItemList');
                if (itemString == '') {
                    return;
                }
                let items = itemString
                    .substr(0, itemString.length - 2)
                    .split(', ');
                this.itemlist = items;
            },

            // 切割購物車數量(count)
            split_count() {
                let countString = storage.getItem('count');
                let count = countString;
                this.count = count;
                // console.log(434353454354);
            },
            // 刪除購物車內容後 count 變化

            // change_num() {
            //     this.count--;
            //     console.log(11);
            //     this.$emit('change_num', this.count);
            //     // storage['count'] += 1;
            //     if (storage['count']) {
            //         // console.log('000');
            //         storage.setItem('count', `${this.count}`);
            //         // storage['total'] += `${this.total_price} `;
            //     } else {
            //         storage['count'] += `${this.count} `;
            //     }
            // },
            changeStatus() {
                if (this.itemlist == '') {
                    this.space_box = true;
                    this.itemlist = false;
                    this.deliver_box = false;
                    this.total_box = false;
                    this.Btn = false;
                    console.log(35235435);
                }
            },
            add_price(price) {
                console.log('add');

                this.total_price += parseInt(price);
            },
            min_price(price) {
                console.log('min');
                this.total_price -= parseInt(price);
            },

            deleteproduct(itemno) {
                // 清除storage的資料
                storage.removeItem(itemno);
                this.count = this.count - 1;
                storage['count'] = this.count;
                storage['addItemList'] = storage['addItemList'].replace(
                    `${itemno}, `,
                    ''
                );

                // storage.removeItem(count);
                console.log(111);
                this.split_products();
                // window.location.href = './cart.html';
                history.go(0);
            },

            btnani() {
                const wrapper = document.querySelector('.btn-wrapper');
                const stars = [
                    ...document.querySelectorAll('[data-name^="star"]'),
                ]; //解構賦值抓陣列
                const Btn = document.querySelector('.Btn');

                TweenMax.set(stars, { autoAlpha: 0, x: 0, y: 0 });
                TweenMax.set(Btn, { scale: 1, transformOrigin: '50% 50%' });

                function setAnimation() {
                    const bling = new TimelineMax({});

                    // animate stars in circle
                    stars.map((star, i) => {
                        const angle = (i / (stars.length / 2)) * Math.PI;
                        const x = 30 * Math.cos(angle);
                        const y = 20 * Math.sin(angle);
                        const timing = (i % 3) * 0.15;
                        bling.to(
                            star,
                            0.5,
                            {
                                autoAlpha: 1,
                                scale: 0.9,
                                x: x,
                                y: y,
                                ease: Back.easeOut.config(1.5),
                            },
                            timing
                        ); //動畫開始
                        bling.to(star, 0.3, { autoAlpha: 0 }, timing + 0.2); //動畫結束 autoAlpha可改1看看
                        //autoAlpha是opacity和visibility這2個css屬性的結合
                        //scale大小倍率
                    });

                    bling.to(
                        Btn,
                        0.4,
                        {
                            scale: 0.9,
                            yoyo: true,
                            repeat: 1,
                            ease: Circ.easeInOut,
                        },
                        0
                    ); //按鈕本身的動畫
                    //yoyo設為true 動畫將會往返執行
                    //repeat:-1 動畫會一直做動

                    return bling;
                }

                const master = new TimelineMax({ paused: true });
                master.add(setAnimation());

                Btn.addEventListener('mouseover', () => {
                    master.play(0);
                });
            },
            // addToStorage(total_price) {
            //     storage['addItemList'] += `${this.total_price}|`;
            //     storage.setItem('font', document.getElementById('font').value);
            // },
            addToStorage(total_price) {
                // storage['total'] += `${this.total_price} `;
                if (storage['total']) {
                    // console.log('000');
                    storage.setItem('total', `${this.total_price}`);
                    // storage['total'] += `${this.total_price} `;
                } else {
                    storage['total'] += `${this.total_price} `;
                }
            },
        },
        created() {
            this.split_products();
            this.changeStatus();
            this.split_count();
        },
        mounted() {
            vm.$on('cartcount', () => (this.count -= 1));
        },
    });
});
