window.addEventListener('load', function () {
    let storage = sessionStorage;
    if (storage['total'] == null) {
        storage['total'] = '';
    }

    Vue.component('products', {
        data() {
            return {
                item_info: [],
                memberno: 5,
                orderdate: 2021 - 01 - 20,
                paymentmethod: 1,
                deliveryaddress: 111,
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
                this.split_num();
                this.split_smalltotal();
            },
            // addproorder: async function () {
            //     const res = await fetch('./php/pro_order.php', {
            //         method: 'POST',
            //         mode: 'same-origin',
            //         credentials: 'same-origin',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             total: this.prototal,
            //             memberno: this.memberno,
            //             orderdate: this.orderdate,
            //             paymentmethod: this.paymentmethod,
            //             deliveryaddress: this.deliveryaddress,
            //         }),
            //     });
            // },
            change(res) {
                this.items = res;
            },
            split_num() {
                let itemString = storage.getItem(this.itemno);
                console.log(itemString);
                let nums = itemString.split('|').pop();
                this.num = nums;
                // console.log(434353454354);
            },
            split_smalltotal() {
                let itemString = storage.getItem(this.itemno);
                console.log(22);
                let smalltotals = itemString.split('|')[1];
                this.smalltotal = smalltotals;
                // console.log(434353454354);
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
            split_total() {
                let totalString = storage.getItem('total');
                let total = totalString;
                this.prototal = total;
                // console.log(434353454354);
            },
            add_ordlist: async function () {
                let list = storage.getItem('addItemList').split(',');

                for (let i = 0; i < list.length; i++) {
                    console.log(list[i]);

                    // let itemString = storage.getItem('list[i]');
                    // console.log(itemString);

                    // let item = itemString.split('|')[0];
                    // let smalltotal = itemString.split('|')[1];
                    // let num = itemString.split('|').pop();
                    // this.item = item;
                    // this.smalltotal = smalltotal;
                    // this.num = num;
                    // console.log(item);
                    // console.log(smalltotal);
                    // console.log(num);
                    // const res = await fetch('./php/order_details.php', {
                    //     method: 'POST',
                    //     mode: 'same-origin',
                    //     credentials: 'same-origin',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({
                    //         proorder: 1,
                    //         item: this.item,
                    //         smalltotal: this.smalltotal,
                    //         num: this.num,
                    //     }),
                    // });
                }
            },
        },
        created() {
            this.split_products();

            this.split_total();
        },
    });
});
