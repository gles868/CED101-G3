window.addEventListener('load', function () {
    // let cc = document.querySelector('.fav-1');
    const vm = new Vue();
    let storage = sessionStorage;
    if (storage['addItemList'] == null) {
        storage['addItemList'] = '';
        // storage['count'] = '';
    }
    if (storage['count'] == null) {
        storage['count'] = '0';
    }
    // storage['addItemList'] = [];

    Vue.component('lightbox', {
        data() {
            return {
                items: '',
                shop_price: '',
                memberno: '',
                fav: '',
            };
        },
        props: ['lightbox', 'itemno', 'count'],
        template: `
        <div class="product" v-if="lightbox">
        <div class="pro_complete_box">
            <div class="close" @click="closelightbox()"><img src="./img/close.png" /></div>
            <div class="pro_complete_left">
                <div class="pro_complete_photo">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="-3 -3 30 30" @click="add_favlist">
                  <g class="fav-1 fav-btn">
                      <path fill="#fff" fill-rule="nonzero" stroke="#7F7F7F" stroke-width="2" d="M10.371 19.7c.424.443.985.674 1.599.666a2.122 2.122 0 0 0 1.575-.67l6.853-7.133c1.982-2.073 1.982-5.453 0-7.528-1.957-2.047-5.112-2.047-7.074.006l-1.332 1.373-.717-.75-.604-.629c-1.957-2.047-5.112-2.047-7.068 0-1.983 2.075-1.983 5.453.002 7.53l6.766 7.135z"/>
                  </g>
                </svg>
                    <img :src="items.proImg" />
                </div>
                <div class="pro_complete_price_box">
                    <img src="./img/dollar.png" />
                    <div class="pro_complete_price">{{items.proPrice}}</div>
                </div>
                <div class="pro_type_box">
                  <img src="./img/kira.png" />
                  <div class="type_ani">{{items.proType}}</div>
                </div>                      
            </div>
            <div class="pro_complete_right">
                <div class="pro_complete_name_box">
                    <div class="pro_complete_name">{{items.proName}}</div>
                </div>
                <div class="pro_complete_content_box">
                    <div class="pro_complete_content1 content">
                    {{items.proDescription}}
                    </div>
                </div>
                <div class="addandbuy_box" @click="addToStorage(items.proNo,items.proPrice)">
                    <span id="props_p5" class="addButton">
                        加入購物車
                        <input
                            type="hidden"
                            
                        />
                    </span>
                    
                </div>
            </div>
        </div>
    </div>
      `,
        methods: {
            getMemDatafunc: async function () {
                await fetch('./php/check_mem.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({ drink_no: item.drink_no }),
                })
                    .then((res) => res.json())
                    .then((res) => (this.memberno = res.memberNo));
                console.log(this.memberno);
                //沒抓到會員資料導回首頁
            },

            // 關燈箱
            closelightbox: function () {
                this.$emit('closelightbox', false);
            },
            addToStorage(proNo, proPrice) {
                if (storage[proNo]) {
                    // console.log('000');
                    alert('已經加入購物車囉：)！');
                } else {
                    storage[proNo] = `${proNo}|${proPrice}|1`;
                    // storage['addItemList'] += `${proNo},`;
                    storage['addItemList'] += `${proNo}, `;
                    // this.count++;
                    this.count++;
                    console.log(this.count);
                    storage['count'] = this.count;

                    // alert(`${proName}`);
                    this.closelightbox();
                    this.$emit('change_num');
                }
            },

            // 撈燈箱裡的商品資訊
            get_data: async function (itemno) {
                // console.log(itemno);
                const res = await fetch('./php/lightbox.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json', // sent request
                        // Accept: 'application/json', // expected data sent back
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        itemno: itemno,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.change(res);
            },
            change(res) {
                this.items = res;
            },
            //
            add_favlist: async function () {
                if (this.memberno == undefined) {
                    alert('請先登入才可以收藏喔：)！');
                    return false;
                } else {
                    const res = await fetch('./php/mall_favlist.php', {
                        method: 'POST',
                        mode: 'same-origin',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            itemno: this.itemno,
                            memberno: this.memberno,
                        }),
                    });
                    const favs = document.querySelectorAll('.fav-btn');
                    for (let i = 0; i < favs.length; i++) {
                        let fav = favs[i];

                        fav.classList.toggle('clicked');
                    }
                    this.$emit('changeheart', this.heart);
                }
            },
            change(res) {
                this.items = res;
            },
            //
            get_favlist: async function (itemno) {
                // console.log(itemno);
                const res = await fetch('./php/pro_getfav.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json', // sent request
                        // Accept: 'application/json', // expected data sent back
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        itemno: itemno,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.changefav(res);
            },
            changefav(res) {
                this.fav = res;
            },

            // 愛心動畫
            // changeheart() {
            //     const favs = document.querySelectorAll('.fav-btn');
            //     for (let i = 0; i < favs.length; i++) {
            //         let fav = favs[i];
            //         fav.onclick = () => {
            //             fav.classList.toggle('clicked');
            //         };
            //     }
            //     this.$emit('changeheart', this.heart);
            // },
        },
        updated() {
            this.getMemDatafunc();
        },
        created() {
            this.getMemDatafunc();
            this.get_data(this.itemno);
            // this.changeheart();
            this.get_favlist(this.itemno);

            // console.log(this.itemno);
        },
        // 監聽lightbox裡面內容要更改
        // this.get_dara => 呼叫這個函數
        watch: {
            // getMemDatafuncs(this.memberNo) {
            //     this.getMemDatafunc();
            // },
            itemno() {
                this.get_data(this.itemno);
            },
            changeheart() {
                this.changeheart(this.this.heart);
            },
            get_favlist() {
                this.get_favlist(this.itemno);
            },
        },
    });

    Vue.component('products', {
        data() {
            return {
                lightbox: false,
                itemno: 0,
                items: [],
                nowPage: 1,
                pageItem: 9,
                pageShow: true,
                isActive: false,
                btnActiveFirst: true,
            };
        },
        props: ['type', 'alltype'],
        template: `
              <div class="allPro_box">
                <div class="pro_big_box1">
                    <div class="pro1_box box" v-for="(value,index) in onePartInf" @click="itemno = value.proNo,changeitemno(),changelightbox()">
                        <div class="pro_photo">
                            <img :src="value.proImg" />
                        </div>
                        <div class="pro_namebox">
                            <div class="pro_name">{{value.proName}}</div>
                        </div>
                        <div class="pro_pricebox">
                            <div class="pro_price">$ {{value.proPrice}}</div>
                        </div>
                    </div>
                    <div class="pagebutton" v-show='pageShow'>
                        <button class='fake' @click='changePage(1);changePageColor(1)' v-bind:class=' {btnActive:isActive===1,btnActiveFirst:btnActiveFirst}'>1</button>
                        <button class='fake' @click='changePage(2);changePageColor(2)' v-bind:class=' {btnActive:isActive===2}'>2</button>
                        <button class='fake' @click='changePage(3);changePageColor(3)' v-bind:class=' {btnActive:isActive===3}'>3</button>
                    </div>

                </div>
              </div>
              `,
        computed: {
            onePartInf() {
                let startP = (this.nowPage - 1) * this.pageItem;
                return this.items.slice(startP, startP + this.pageItem);
            },
            totalPage() {
                return Math.ceil(this.items.length / this.pageItem);
            },
        },
        mounted() {
            vm.$on('reNewPage', () => (this.nowPage = 1));
            vm.$on('reNewPage', () => (this.pageShow = false));
            vm.$on('pageBack', () => (this.pageShow = true));
        },
        methods: {
            changePage(x) {
                this.nowPage = x;
                // if (this.nowPage < 1) {
                //     this.nowPage = 1;
                // } else if (this.nowPage > this.totalPage) {
                //     this.nowPage = this.totalPage
                // }
            },
            changePageColor(id) {
                // let reClass = document.querySelectorAll('.fake');
                // reClass[0].classList.remove('btnActiveFirst');
                this.btnActiveFirst = false;
                this.isActive = id;
            },

            changeitemno: function () {
                // console.log('----');
                this.$emit('changeitemno', this.itemno);
            },
            changelightbox: function () {
                this.lightbox = true;
                this.$emit('changelightbox', this.lightbox);
            },
            // changeprice() {
            //     this.$emit('changeprice', this.price);
            // },

            get_data: async function (type_no) {
                // console.log(type_no);

                const res = await fetch('./php/pro_list.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json', // sent request
                        // Accept: 'application/json', // expected data sent back
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        type_no: type_no,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.change(res);
            },
            change(res) {
                this.items = res;
            },
            // 撈全部商品分類的全部商品
            get_allpro: async function () {
                const res = await fetch('./php/all.php', {}).then(function (
                    data
                ) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.items = res;
            },
        },
        created() {
            // console.log("----")
            // this.get_data(this.type);
            // console.log(this.type);
            this.get_allpro();
        },
        //監聽
        watch: {
            type() {
                this.get_data(this.type);
            },
            alltype() {
                this.get_allpro();
            },
        },
    });

    // 商品屬性
    Vue.component('type', {
        data() {
            return {};
        },
        props: [],
        template: `
                      <div class="list_box">
                          <div class="pro_all" @click="changealltype(),changecolor(0),pageBack(),changetype('')">
                          全部商品</div>
                          <div class="pro_att" @click="changetype('攻擊型'),changecolor(1),reNewPage()">
                          攻擊型</div>
                          <div class="pro_def" @click="changetype('防禦型'),changecolor(2),reNewPage()">
                          防禦型</div>
                          <div class="pro_ass" @click="changetype('輔助型'),changecolor(3),reNewPage()">
                          輔助型</div>
                      </div>`,
        methods: {
            changetype(data) {
                this.type = data;
                this.$emit('changetype', this.type);
            },
            reNewPage() {
                vm.$emit('reNewPage');
            },
            pageBack() {
                vm.$emit('pageBack');
            },
            changealltype() {
                // this.type = data;
                this.$emit('changealltype');
            },
            //類型 點擊後 切換顏色
            changecolor: function (num) {
                //改大家的顏色
                let test = document
                    .querySelectorAll('.list_box>div')
                    .forEach(function (e) {
                        e.style.color = '#863186';
                        e.style.backgroundColor = '#fff';
                    });

                //改變 被點到的人的顏色
                let item = document.querySelectorAll('.list_box>div')[num];
                item.style.color = '#fff';
                item.style.backgroundColor = '#863186';
            },
        },
    });

    new Vue({
        el: '#app2',
        data: {
            total: 0,
            type: '',
            alltype: 0,
            itemno: 3,
            lightbox: false,
            count: 0,
        },
        methods: {
            changeitemno: function (itemno) {
                this.itemno = itemno;
            },
            changelightbox: function (lightbox) {
                this.lightbox = lightbox;
            },
            closelightbox: function (lightbox) {
                this.lightbox = lightbox;
            },
            changetype: function (type) {
                this.type = type;
            },
            changealltype: function (alltype) {
                this.alltype += 1;
                // this.type = '';
            },
            change_num: function () {
                setTimeout(() => {
                    this.count = storage.getItem('count');
                }, 10);
            },
        },
        mounted() {
            this.count = storage.getItem('count');
            console.log(this.count);
        },
    });
});
