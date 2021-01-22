let copyHave = 'noHave';
const bus = new Vue();

function post_data() {
    return false;
}
//////////////////////////////////

window.addEventListener('load', function () {
    let storage = sessionStorage;
    if (storage['total'] == null) {
        storage['total'] = '';
    }

    Vue.component('products', {
        data() {
            return {
                item_info: [],
                // memberno: 5,
                // orderdate: 2021 - 01 - 20,
                // paymentmethod: 1,
                // deliveryaddress: 111,
                addItemList: storage['addItemList'],
                total: storage['total'],
                num: '',
                smalltotal: '',
            };
        },
        props: ['itemno'],
        template: `
      <div class="cartpro_a_box">
          <div class="crystalball_left_box" >
              <img :src="item_info.proImg" />
          </div>
          <div class="crystalball_right_box">
              <div class="crystalball_name_box">
                  <div class="crystalball_name">{{item_info.proName}}</div>
              </div>
              <div class="crystalball_text_box">
                  <div class="crystalball_text">
                  {{item_info.proDescription}}
                  </div>
              </div>
              <div class="crystalball_priceAmount_box">
              <div class="amount">
                  <div class="amount_input">
                      <div id="quantity"><span>數量：{{this.num}}</span></div>
                  </div>
                  </div>    
                  <div class="pro_complete_price_box">
                      <img src="./img/dollar.png" />
                      <div class="pro_complete_price">
                          {{this.smalltotal}}
                      </div>
                  </div>
              </div>
          </div>
      </div>     
              `,
        methods: {
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
                this.split_num();
                this.split_smalltotal();
            },

            change(res) {
                this.items = res;
            },
            split_num() {
                let itemString = storage.getItem(this.itemno);
                let nums = itemString.split('|').pop();
                this.num = nums;
            },
            split_smalltotal() {
                let itemString = storage.getItem(this.itemno);
                let smalltotals = itemString.split('|')[1];
                this.smalltotal = smalltotals;
            },
        },
        created() {
            this.get_data(this.itemno);
        },
    });

    //警示燈箱
    Vue.component('alert_lightbox', {
        data() {
            return {
                alertLightbox: false,
                alertText: '',
            };
        },
        methods: {
            closeAlertLightbox() {
                this.alertLightbox = false;
            },
        },
        mounted() {
            bus.$on('getAlert', (_alertText) => {
                this.alertText = _alertText;
                this.alertLightbox = true;
            });
        },
        template: `
            <div class="alertLightbox_black" v-if="alertLightbox">
                <div class="alertLightboxWrapper">
                    <div class="alertLightbox" >
                        <div>{{alertText}}</div>
                        <div @click="closeAlertLightbox">確定</div>
                    </div>
                </div>
            </div>
        `,
    });

    new Vue({
        el: '#app',
        data: {
            itemlist: '',
            proorder: 2,
            mem_info: '',
            // memberno: '',
            // memName: '',
            // orderdate: '2021-01-20',
            orderdate: '',
            paymentmethod: 1,
            deliveryaddress: '',
            // mem_address: '',

            //付款區
            deadLineDate:
                new Date().getFullYear() +
                '年' +
                (new Date().getMonth() + 1) +
                '月' +
                (new Date().getDate() + 1) +
                '號' +
                '23時59分',
            minCardYear: new Date().getFullYear(),
            CardForm: false,
            AtmForm: false,
            copyAtm: false,
            copyCard: false,
            isActive: false,
            textErr: false,
            BackTextErr: false,
            mailErr: false,
            className: '',
            classRows: [],
            payType: '',
            cardValue: '',
            cardNum: [],
            passArray: [],
            cardMonth: '',
            cardYear: '',
            CardBack: '',
            pay_mail: '',
            card1ErrMsg: '',
            card4ErrMsg: '',
            card5ErrMsg: '',
            totalprice: '',
            keyPressCount: 0,
            inputList: [
                { val: '', key: 1 },
                { val: '', key: 2 },
                { val: '', key: 3 },
                { val: '', key: 4 },
            ],
            link: {
                CardImgSrc:
                    'https://gitlab.com/loveabo103103/payment/raw/master/credit-card.svg',
                AtmImg:
                    'https://gitlab.com/loveabo103103/payment/raw/master/atm.svg',
                CloseImg: './img/close3.png',
            },

            AtmTrInfo: [
                { title: '銀行代碼', info: '013國泰世華銀行' },
                { title: '轉帳帳號', info: '0135000878787' },
                { title: '轉帳金額', info: '' },
                {
                    title: '繳款期限',
                    info:
                        new Date().getFullYear() +
                        '年' +
                        (new Date().getMonth() + 1) +
                        '月' +
                        (new Date().getDate() + 1) +
                        '號' +
                        '23時59分',
                },
            ],

            AtmTitle: ['銀行代碼:', '轉帳帳號:', '轉帳金額:', '繳款期限:'],

            AtmInf: ['013國泰世華銀行', '0135000878787'],

            CardPayType: {
                onePay: '一次付款',
                installment: '分三期付款',
            },
        },
        computed: {
            getPay() {
                return this.totalprice;
            },
        },
        created() {
            this.totalprice = parseInt(storage.getItem('total'));
            Object.assign(this.AtmTrInfo[2], {
                title: '轉帳金額',
                info: this.getPay,
            });
            this.split_products();
            this.split_total();
            this.get_meminfo();
        },
        mounted() {
            this.className = storage.getItem('className');
            this.orderdate =
                new Date().getFullYear() +
                '-' +
                '0' +
                (new Date().getMonth() + 1) +
                '-' +
                new Date().getDate();
        },
        methods: {
            //切商品
            split_products() {
                let itemString = storage.getItem('addItemList');
                let items = itemString
                    .substr(0, itemString.length - 2)
                    .split(', ');
                this.itemlist = items;
            },
            //切總額
            split_total() {
                let totalString = storage.getItem('total');
                let total = parseInt(totalString);
                this.prototal = total;
            },
            //撈會員資料
            get_meminfo: async function () {
                let that = this;
                console.log('撈取');
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    let res = JSON.parse(xhr.responseText);
                    // 將資料寫進 指定為memNavInfo的new Vue裡的data
                    // memNavInfo.memData = memData;
                    console.log(res);
                    that.mem_info = res;
                    console.log('撈取2');
                };
                xhr.open('get', 'php/getLoginData.php', true);
                xhr.send(null);
            },
            //建立訂單明細
            add_ordlist: async function () {
                let tempString = storage.getItem('addItemList');
                let list = tempString
                    .substr(0, tempString.length - 2)
                    .split(', ');
                // console.log(list);
                let ord_items = [];

                for (let i = 0; i < list.length; i++) {
                    let ord_item = new Object();
                    // console.log(i);
                    let itemString = storage.getItem(list[i]);
                    console.log(itemString);

                    let item = itemString.split('|')[0];
                    let smalltotal = itemString.split('|')[1];
                    let num = itemString.split('|').pop();
                    ord_item.item = item;
                    ord_item.smalltotal = smalltotal;
                    ord_item.num = num;
                    console.log(ord_item.item);
                    console.log(ord_item.smalltotal);
                    console.log(ord_item.num);
                    ord_items.push(ord_item);
                }
                const res = await fetch('./php/order_details.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ord_items: ord_items,
                        prototal: this.prototal,
                        memberno: this.mem_info.memberNo,
                        orderdate: this.orderdate,
                        paymentmethod: this.paymentmethod,
                        deliveryaddress: this.deliveryaddress,
                        disTotal: this.prototal,
                    }),
                });
                console.log(this.mem_info.memberNo);
            },

            // about付款
            copy_Atm() {
                if (copyHave == 'Have') {
                    this.copyCard = false;
                }
                this.AtmForm = false;
                this.copyAtm = true;
                copyHave = 'Have';
            },
            copy_Card() {
                if (copyHave == 'Have') {
                    this.copyAtm = false;
                }
                let chkObj = document.getElementsByName('payMethod');
                let selCount = 0;
                for (var i = 0; i < chkObj.length; i++) {
                    if (chkObj[i].checked == true) {
                        selCount++;
                    }
                }

                if (
                    selCount >= 1 &&
                    this.passArray.includes('t1') &&
                    this.passArray.includes('t2') &&
                    this.passArray.includes('t3') &&
                    this.passArray.includes('t4') &&
                    this.passArray.includes('backTextPass') &&
                    this.passArray.includes('mailTextPass') &&
                    this.textErr != true &&
                    this.BackTextErr != true &&
                    this.mailErr != true &&
                    this.cardMonth != '' &&
                    this.cardYear != ''
                ) {
                    // console.log(11)
                    this.CardForm = false;
                    this.copyCard = true;
                } else {
                    alert('請填寫正確表單');
                }
                copyHave = 'Have';
            },
            changeBg(id) {
                this.isActive = id;
            },
            autoTab(el, index) {
                console.log(el.target.value);
                let isText = /\d{4}/;
                if (!isText.test(el.target.value)) {
                    this.textErr = true;
                    this.card1ErrMsg = '請填寫4碼數字';
                } else {
                    this.textErr = false;
                }

                let dom = document.querySelectorAll('.border-input'),
                    currInput = dom[index],
                    nextInput = dom[index + 1],
                    lastInput = dom[index - 1];
                // console.log(el.target.getAttribute('maxlength'));
                if (
                    el.target.value.length ==
                        el.target.getAttribute('maxlength') &&
                    index < 4
                ) {
                    if (isText.test(el.target.value)) {
                        // this.cardNum.push(el.target.value)
                        if (
                            el.target.value.length ==
                                el.target.getAttribute('maxlength') &&
                            index < 3
                        ) {
                            nextInput.focus();
                        }
                    }
                }
                if (
                    el.target.value.length ==
                        el.target.getAttribute('maxlength') &&
                    index == 0
                ) {
                    if (isText.test(el.target.value)) {
                        this.cardNum[0] = el.target.value;

                        this.passArray.push('t1');
                    }
                }
                if (
                    el.target.value.length ==
                        el.target.getAttribute('maxlength') &&
                    index == 1
                ) {
                    if (isText.test(el.target.value)) {
                        this.cardNum[1] = el.target.value;

                        this.passArray.push('t2');
                    }
                }
                if (
                    el.target.value.length ==
                        el.target.getAttribute('maxlength') &&
                    index == 2
                ) {
                    if (isText.test(el.target.value)) {
                        this.cardNum[2] = el.target.value;

                        this.passArray.push('t3');
                    }
                }
                if (
                    el.target.value.length ==
                        el.target.getAttribute('maxlength') &&
                    index == 3
                ) {
                    if (isText.test(el.target.value)) {
                        this.cardNum[3] = el.target.value;

                        this.passArray.push('t4');
                    }
                }
            },
            testCardBack(el) {
                let BackText = /\d{3}/;
                if (!BackText.test(el.target.value)) {
                    this.BackTextErr = true;
                    this.card4ErrMsg = '請填寫數字';
                } else {
                    this.BackTextErr = false;
                    this.passArray.push('backTextPass');
                }
            },
            testMail(el) {
                let mailText = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!mailText.test(el.target.value)) {
                    this.mailErr = true;
                    this.card5ErrMsg =
                        '請填寫正確格式,不得含有特殊字元且需包含@';
                } else {
                    this.mailErr = false;
                    this.passArray.push('mailTextPass');
                }
            },
            // 按鈕動畫
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
        },
    });
});
