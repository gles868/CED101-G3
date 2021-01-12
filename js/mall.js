window.addEventListener('load', function () {
    let storage = sessionStorage;
    if (storage['addItemList'] == null) {
        storage['addItemList'] = '';
    }

    Vue.component('lightbox', {
        data() {
            return {
                items: [
                    {
                        item_no: 1,
                        item_name: '貝爾法師帽',
                        item_note:
                            '戴上貝爾法師帽，就可以增加自己的防禦，可以減少敵人對自己的傷害。',
                        item_price: 4000,
                        item_img: './img/props/p1.png',
                    },
                    {
                        item_no: 2,
                        item_name: '愛的寶石',
                        item_note:
                            '施煉金術的時候，愛的寶石是最好不過的材料了，愛的寶石光澤令人陶醉。',
                        item_price: 1314,
                        item_img: './img/props/p2.png',
                    },
                    {
                        item_no: 3,
                        item_name: '魔力技能書',
                        item_note:
                            '閱讀完魔法技能書，可以讓你的學習速度兩倍提升！',
                        item_price: 8117,
                        item_img: './img/props/p3.png',
                    },
                    {
                        item_no: 4,
                        item_name: '魔法能量水',
                        item_note:
                            '學習魔法是一條辛苦的道路，會消耗許多能量，所以一定要有魔法能量水！',
                        item_price: 3333,
                        item_img: './img/props/p4.png',
                    },
                    {
                        item_no: 5,
                        item_name: '閃亮水晶球',
                        item_note:
                            '學習詛咒術的時候，必須要有閃亮水晶球，才能夠看到敵人的狀態來施詛咒術，是身為一位魔法師不可缺少的。',
                        item_price: 3394,
                        item_img: './img/props/p5.png',
                    },
                    {
                        item_no: 6,
                        item_name: '魔物眼球',
                        item_note:
                            '施召喚術的時候，一定要搭配魔物眼球，不然魔物是不會理你的。',
                        item_price: 5650,
                        item_img: './img/props/p6.png',
                    },
                    {
                        item_no: 7,
                        item_name: '星火卷軸',
                        item_note:
                            '施光箭術的時候要先看過星火卷軸的內容，不然很容易造成整個魔法界的火災。',
                        item_price: 4000,
                        item_img: './img/props/p7.png',
                    },
                    {
                        item_no: 8,
                        item_name: '蜘蛛寶寶',
                        item_note:
                            '施毒藥術的時候一定要有蜘蛛寶寶，蜘蛛寶寶是魔法界中最毒的寶寶了。',
                        item_price: 3394,
                        item_img: './img/props/p8.png',
                    },
                    {
                        item_no: 9,
                        item_name: '時間寶石',
                        item_note:
                            '施變形術的時候一定要把當下的時間加快，不然時間趕不上變化的話就尷尬了。',
                        item_price: 9999,
                        item_img: './img/props/p9.png',
                    },
                ],
                count: 1,
            };
        },
        props: ['lightbox', 'itemno'],
        template: `
      <div class="product" v-if="lightbox">
              <div class="pro_complete_box">
                  <div class="close" @click="closelightbox(),count = 1 "><img src="./img/close.png" /></div>
                  <div class="pro_complete_left">
                      <div class="pro_complete_photo">
                          <div class="heart">
                              <div class="heart-inner"></div>
                          </div>
                          <img :src="items[itemno - 1].item_img" />
                      </div>
                      <div class="pro_complete_price_box">
                          <img src="/img/dollar.png" />
                          <div class="pro_complete_price">{{items[itemno - 1].item_price}}</div>
                      </div>
                      <div class="pro_complete_amount_box">
                          <div class="pro_complete_text">數量</div>
                          <div class="amount_input">
                            <input @click="min" id="min" class="butDec" type="button" value="-"/>
                            <div id="quantity"><span>{{count}}</span></div>
                            <input @click="add" type="button" id="addamount" class="butDec" value="+"/>
                          
                          </div>
                      </div>
                  </div>
                  <div class="pro_complete_right">
                      <div class="pro_complete_name_box">
                          <div class="pro_complete_name">{{items[itemno - 1].item_name}}</div>
                      </div>
                      <div class="pro_complete_content_box">
                          <div class="pro_complete_content1 content">
                          {{items[itemno - 1].item_note}}
                          </div>
                      </div>
                      <div class="addandbuy_box" @click="addToStorage(items[itemno - 1].item_name)">
                          <span id="props_p5" class="addButton">
                              加入購物車
                              <input
                                  type="hidden"
                                  value="crystalball|p5.png|3394"
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
            min() {
                if (this.count > 1) {
                    this.count -= 1;
                }
            },
            add: function () {
                this.count += 1;
            },
            addToStorage(itemno) {
                alert(`${itemno}`);
                if (storage[itemno]) {
                    alert('You have checked.');
                } else {
                    storage['addItemList'] += `${itemno}, `;
                }

                console.log(222);
            },
        },
    });

    Vue.component('products', {
        data() {
            return {
                lightbox: false,
                itemno: 0,
                // items: [
                //   { item_no: 1, item_name: "貝爾法師帽", item_note: "戴上貝爾法師帽，就可以增加自己的防禦，可以減少敵人對自己的傷害。", item_price: 4000, item_img: "./img/props/p1.png" },
                //   { item_no: 2, item_name: "愛的寶石", item_note: "施煉金術的時候，愛的寶石是最好不過的材料了，愛的寶石光澤令人陶醉。", item_price: 1314, item_img: "./img/props/p2.png" },
                //   { item_no: 3, item_name: "魔力技能書", item_note: "閱讀完魔法技能書，可以讓你的學習速度兩倍提升！", item_price: 8117, item_img: "./img/props/p3.png" },
                //   { item_no: 4, item_name: "魔法能量水", item_note: "學習魔法是一條辛苦的道路，會消耗許多能量，所以一定要有魔法能量水！", item_price: 3333, item_img: "./img/props/p4.png" },
                //   { item_no: 5, item_name: "閃亮水晶球", item_note: "學習詛咒術的時候，必須要有閃亮水晶球，才能夠看到敵人的狀態來施詛咒術，是身為一位魔法師不可缺少的。", item_price: 3394, item_img: "./img/props/p5.png" },
                //   { item_no: 6, item_name: "魔物眼球", item_note: "施召喚術的時候，一定要搭配魔物眼球，不然魔物是不會理你的。", item_price: 5650, item_img: "./img/props/p6.png" },
                //   { item_no: 7, item_name: "星火卷軸", item_note: "施光箭術的時候要先看過星火卷軸的內容，不然很容易造成整個魔法界的火災。", item_price: 4000, item_img: "./img/props/p7.png" },
                //   { item_no: 8, item_name: "蜘蛛寶寶", item_note: "施毒藥術的時候一定要有蜘蛛寶寶，蜘蛛寶寶是魔法界中最毒的寶寶了。", item_price: 3394, item_img: "./img/props/p8.png" },
                //   { item_no: 9, item_name: "時間寶石", item_note: "施變形術的時候一定要把當下的時間加快，不然時間趕不上變化的話就尷尬了。", item_price: 9999, item_img: "./img/props/p9.png" },
                // ]
                items: '',
            };
        },
        props: [],
        template: `
              <div class="allPro_box" >
                <div class="pro_big_box1">
                    <div class="pro1_box box" v-for="(value,index) in items" @click="itemno = value.item_no,changeitemno(),changelightbox()">
                        <div class="pro_photo">
                            <img :src="value.item_img" />
                        </div>
                        <div class="pro_namebox">
                            <div class="pro_name">{{value.item_name}}</div>
                        </div>
                        <div class="pro_pricebox">
                            <div class="pro_price">$ {{value.item_price}}</div>
                        </div>
                    </div>
                </div>
              </div>`,
        methods: {
            changeitemno: function () {
                console.log('----');
                this.$emit('changeitemno', this.itemno);
            },
            changelightbox: function () {
                this.lightbox = true;
                this.$emit('changelightbox', this.lightbox);
            },
            get_data: async function () {
                // console.log("----")
                const res = await fetch('./php/mall.php', {}).then(function (
                    data
                ) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.items = res;
                // this.get_type(res)
            },
        },
        mounted() {
            // console.log("----")
        },
        created() {
            // console.log("----")

            this.get_data(this.type);
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
                          <div class="pro_all" id="proAll">全部商品</div>
                          <div class="pro_att" id="proAtt">攻擊型</div>
                          <div class="pro_def" id="proDef">防禦型</div>
                          <div class="pro_ass" id="proAss">輔助型</div>
                      </div>`,
        methods: {},
    });

    new Vue({
        el: '#app',
        data: {
            total: 0,
            type: 1,
            itemno: 0,
            lightbox: false,
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
        },
    });
});
