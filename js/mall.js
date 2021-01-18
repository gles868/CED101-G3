window.addEventListener('load', function () {
    const vm = new Vue();
    let storage = sessionStorage;
    // if (storage['addItemList'] == null) {
    //     storage['addItemList'] = '';
    // }
    storage['addItemList'] = [];

    Vue.component('lightbox', {
        data() {
            return {
                items: '',
                shop_price: '',
                count: '',
            };
        },
        props: ['lightbox', 'itemno'],
        template: `
      <div class="product" v-if="lightbox">
              <div class="pro_complete_box">
                  <div class="close" @click="closelightbox()"><img src="./img/close.png" /></div>
                  <div class="pro_complete_left">
                      <div class="pro_complete_photo">
                          <div class="heart">
                              <div class="heart-inner"></div>
                          </div>
                          <img :src="items[0].proImg" />
                      </div>
                      <div class="pro_complete_price_box">
                          <img src="./img/dollar.png" />
                          <div class="pro_complete_price">{{items[0].proPrice}}</div>
                      </div>
                      <div class="pro_type_box">
                        <img src="./img/kira.png" />
                        <div class="type_ani">{{items[0].proType}}</div>
                      </div>                      
                  </div>
                  <div class="pro_complete_right">
                      <div class="pro_complete_name_box">
                          <div class="pro_complete_name">{{items[0].proName}}</div>
                      </div>
                      <div class="pro_complete_content_box">
                          <div class="pro_complete_content1 content">
                          {{items[0].proDescription}}
                          </div>
                      </div>
                      <div class="addandbuy_box" @click="addToStorage(items[0].proNo,items[0].proName,items[0].proDescription,items[0].proImg,items[0].proPrice,items[0].proType),change_num()">
                          <span id="props_p5" class="addButton">
                              加入購物車
                              <input
                                  type="hidden"
                                  
                              />
                          </span>
                          <span id="buy_p5" class="buyButton">
                              直接購買
                              <input
                                  type="hidden"
                                  value="crystalball|p5.png|3394"
                              />
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      `,
        methods: {
            closelightbox: function () {
                this.$emit('closelightbox', false);
            },
            addToStorage(
                proNo,
                proName,
                proDescription,
                proImg,
                proPrice,
                proType
            ) {
                if (storage[proNo]) {
                    // console.log('000');
                    alert('You have checked.');
                } else {
                    storage[
                        proNo
                    ] = `${proNo}|${proName}|${proDescription}|${proImg}|${proPrice}|${proType}`;
                    // storage['addItemList'] += `${proNo},`;
                    storage['addItemList'] += `${proNo}, `;
                    // alert(`${proName}`);
                    this.closelightbox();
                }
            },
            change_num() {
                this.count++;
                console.log(11);
                this.$emit('change_num', this.count);
            },
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
        },
        created() {
            // console.log("----")
            this.get_data(this.itemno);

            // console.log(this.itemno);
        },
        // 監聽lightbox裡面內容要更改
        // this.get_dara => 呼叫這個函數
        watch: {
            itemno() {
                this.get_data(this.itemno);
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
                        <button @click='changePage(1)'>1</button>
                        <button @click='changePage(2)'>2</button>
                        <button @click='changePage(3)'>3</button>
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

                const res = await fetch('./php/test.php', {
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
                          <div class="pro_all" @click="changealltype(),changecolor(0),pageBack()">
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
        el: '#app',
        data: {
            total: 0,
            type: '', //預設攻擊型
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
            // +=1是為了讓她動
            changealltype: function (alltype) {
                this.alltype += 1;
            },
            change_num: function (count) {
                this.count = count;
            },
        },
    });
});
