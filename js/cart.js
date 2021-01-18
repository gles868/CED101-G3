window.addEventListener('load', function () {
    let storage = sessionStorage;

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
                        <img :src="item_info[0].proImg" />
                    </div>
                    <div class="crystalball_right_box">
                        <div class="crystalball_name_box">
                            <div class="crystalball_name">{{item_info[0].proName}}</div>
                        </div>
                        <div class="close"><img src="./img/close.png" @click="deleteproduct(item_info[0].proNo)"></div>
                        <div class="crystalball_text_box">
                            <div class="crystalball_text">
                            {{item_info[0].proDescription}}
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
                                <div class="pro_complete_price" >{{num * item_info[0].proPrice}}</div>
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
                this.$emit('min_price', this.item_info[0].proPrice);
            },
            add() {
                this.num += 1;
                this.$emit('add_price', this.item_info[0].proPrice);
            },

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

                this.add();
            },
            deleteproduct(itemno) {
                this.$emit('deleteproduct', itemno);
            },
        },
        created() {
            this.get_data(this.itemno);
        },
        // watch: {
        //     num() {
        //         this.add_price();
        //     },
        // },
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
        },
        // computed:{
        //     master.add(
        // },
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
                // console.log(434353454354);
            },
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

                // this.total_price = price;
                // alert(count);total_price
                // this.count * this.total_price;
            },
            min_price(price) {
                console.log('min');
                this.total_price -= parseInt(price);

                // this.total_price;

                // this.total_price = price;
                // alert(count);total_price
                // this.count * this.total_price;
            },

            deleteproduct(itemno) {
                // 2.清除storage的資料
                storage.removeItem(itemno);
                storage['addItemList'] = storage['addItemList'].replace(
                    `${itemno}, `,
                    ''
                );
                console.log(111);
                this.split_products();
                window.location.href = './cart.html';
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
                        const x = 25 * Math.cos(angle);
                        const y = 15 * Math.sin(angle);
                        const timing = (i % 3) * 0.15;
                        bling.to(
                            star,
                            0.5,
                            {
                                autoAlpha: 1,
                                scale: 0.8,
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
            addToStorage(total_price) {
                storage['addItemList'] += `${this.total_price}|`;
                storage.setItem('font', document.getElementById('font').value);
            },
        },
        created() {
            this.split_products();
            this.changeStatus();
        },
    });
});
