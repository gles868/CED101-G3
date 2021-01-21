const bus = new Vue();

// ==========我的課程============
Vue.component('mem-course', {
    data() {
        return {
            content: 'courseDate',
        };
    },
    props: ['memberno'],

    template: `
    <!-- 我的課程開始 -->
    <section class="memClassOut menuCG">
        <div class="memContent">
            <div class="memMainAreaClass">
                <div id="courseDate" @click="content='courseDate'" style="background-color: white;box-shadow: 0 0 0.2em white, 0 0 0.4em white, 0 0 0.3em white">
                    <h3>查看課表時間</h3>
                </div>
                <div id="courseStatus" @click="content='courseStatus'" style="background-color: gray; color: white">
                    <h3>課程清單</h3>
                </div>
            </div>
            <div>
                <component :memberno="memberno" :is="content"></component>
            </div>
        </div>
    </section>
    <!-- 我的課程結束 -->
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ----------我的課程>查看課表時間(組件)----------
Vue.component('courseDate', {
    data() {
        return {
            //撈出來的 資料
            class: '',
        };
    },
    props: ['memberno'],

    template: `
    <div class="courseDate courseCG">
        <div id='calendar-container'>
            <div id='calendar'></div>                    
        </div>
    </div>
  `,
    methods: {
        async get_class() {
            const res = await fetch('./php/mem_get_class.php', {
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
                    memberno: this.memberno,
                }), // body data type must match "Content-Type" header
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.class = res;

            this.calendar();
        },

        calendar() {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    // left: 'prev,next today',
                    // center: 'title',
                    // right: 'dayGridMonth',
                },
                initialDate: '2021-01-01',
                navLinks: true, // can click day/week names to navigate views
                editable: true,
                selectable: true,
                businessHours: true,
                dayMaxEvents: true, // allow "more" link when too many events

                events: this.class,
            });

            calendar.render();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_class();
    },
    watch: {
        memberno() {
            this.get_class();
        },
    },
});

// ----------我的課程>課程清單(組件)----------
Vue.component('courseStatus', {
    data() {
        return {
            content: 'courseReg',
            comm_null: '',
            //撈出來的 資料
        };
    },
    props: ['memberno'],

    template: `
<div class="courseStatus courseCG">
    <div id="tab">
        <!-- 頁籤按鈕 -->
        <ul>
            <li id="tab-content-1" @click="content='courseReg'" style="text-shadow: 0 0 0.2em rgb(211, 211, 65), 0 0 0.4em rgb(214, 29, 183), 0 0 0.3em #5f93c4; background-color: rgba(170, 170, 170, 0.5)">
                <div>
                    <div class="courseReg">
                        <h4>已報名</h4>
                    </div>
                </div>
            </li>
            <li id="tab-content-2" @click="content='courseFinish'" >
                <div>
                    <div class="courseFinish">
                        <h4>待評論</h4>
                    </div>
                </div>
            </li>
            <li id="tab-content-3">
                <div>
                    <div class="courseIng" @click="content='courseIng'">
                        <h4>上課中</h4>
                    </div>
                </div>
            </li>
        </ul>
        <div>
            <component :is="content" :memberno="memberno"></component>
        </div>
    </div>
</div>
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ----------我的課程>課程清單>已報名(組件)----------
Vue.component('courseReg', {
    data() {
        return {
            //撈出來的 資料
            classes: '',
            comm_null: '',
        };
    },
    props: ['memberno'],

    template: `
    <!-- 已報名 -->
<div class="tab-content-1 con">
    <div class="CRD" v-for="(value,key) in classes">
        <div class="CRD_pic">
            <img :src="value.courseImg" />
        </div>
        <div class="CRD_Text">
            <h4 class="CRD_TextTit">{{value.courseName}}</h4>
            <div class="CRD_TextCon">
                <h5>上課時間:{{value.courseStartDate}}</h5>
                <h5>{{value.classDescription}}</h5>
            </div>
        </div>
        <div class="courseCancel">
            <div class="membtn" @click="regist_cancel(value.classNo,value.registNo)">取消報名</div>
        </div>
    </div>
    <div class="CRD_Text" v-if="comm_null">全部已報名課程都上完嚕!!記得去給老師評論唷:))</div>
</div>
  `,
    methods: {
        mem_get_regist: async function () {
            const res = await fetch('./php/mem_get_regist.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.classes = res;

            if (this.classes == '') {
                this.comm_null = true;
            }
        },
        regist_cancel: async function (classNo, registNo) {
            const res = await fetch('./php/mem_delete_regist.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                    classNo: classNo,
                    registNo: registNo,
                }),
            });

            //刪除成功跳出燈箱
            bus.$emit('getAlert', '您已成功取消報名:((');
            //重新渲染畫面
            this.mem_get_regist();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.mem_get_regist();
    },
});

// ----------我的課程>課程清單>已完課(組件)----------
Vue.component('courseFinish', {
    data() {
        return {
            lightbox: false,
            classes: '',
            comm_null: '',
        };
    },
    props: ['memberno'],
    template: `
        <div class="tab-content-2 con" >
            <div class="CRD" v-for="(value,key) in classes" >
                <div class="CRD_pic">
                    <img :src="value.courseImg"/>
                </div>
                <div class="CRD_Text">
                    <h4 class="CRD_TextTit">{{value.courseName}}</h4>
                    <div class="CRD_TextCon">
                        <h5>完課時間:{{value.courseStartDate}}</h5>
                        <h5>{{value.classDescription}}</h5>
                    </div>
                </div>
                <div class="courseCancel">
                    <div class="membtn" @click="comm_one(value.classNo,value.registNo)">評論本課</div>
                </div>
            </div>
            <div class="CRD_Text" v-if="comm_null">全部已完課課程已評論完畢:))</div>
            <lightbox_comm v-if="lightbox" classNo="classNo" :memberno="memberno" :registNo="registNo"
            @changelightbox="comm_calss()"></lightbox_comm>
        </div>
    `,
    methods: {
        get_mem_commcourse: async function () {
            const res = await fetch('./php/mem_get_comm_course.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.classes = res;

            if (this.classes == '') {
                this.comm_null = true;
            }
        },
        comm_one(classNo, registNo) {
            this.lightbox = true;
            this.classNo = classNo;
            this.registNo = registNo;
        },

        //關閉"評論課程"燈箱，同時重新渲染畫面
        comm_calss() {
            this.lightbox = false;
            // this.get_course();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_mem_commcourse();
    },
    mounted() {},
    watch: {},
});
// ----------我的課程>課程清單>已完課lightbox(組件)----------
Vue.component('lightbox_comm', {
    data() {
        return {
            rating: 0,
            commText: '',
            courseImg: '',
            courseName: '',
            courseStartDate: '',
            classDescription: '',
        };
    },
    props: ['memberno', 'classNo', 'registNo'],
    template: `
    <div class="lightbox_black">
                    <div class="lightbox">
                        <div class="manager_lightbox_close" @click="changelightbox"><img src="./img/close.png"></div>
                        <div class="CFD_commTitle">
                            <h4>評論本課</h4>
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">{{courseName}}</h4>
                            <div class="CRD_TextCon">
                                <h5>完課時間:{{courseStartDate}}</h5>
                                <h5>{{classDescription}}</h5>
                            </div>
                        </div>
                        <div class="commText">
                            <form onsubmit="return false;">
                                <star-rating class="stars" v-model="rating"
                                    text-class="custom-text"
                                    :star-size="20"
                                    @rating-selected ="setRating">
                                </star-rating>
                                <div id="input-container">
                                        <input type="text"
                                        v-model="commText"
                                        placeholder="評論老師/課程" 
                                        maxlength="100">
                                        </div>
                                        <div id="button-container">
                                            <button class="user"><i class="fa fa-user"></i></button>
                                            <button class="send" @click="sendComm">
                                                <i class="fas fa-paper-plane"></i>
                                                </button>
                                                </div>
                                    <input type="hidden" name="registNo" :value="registNo">
                                    <input type="hidden" name="commStar" :value="rating">
                                    <input type="hidden" name="commContent" :value="commText">
                            </form>
                        </div>
                    </div>
                </div>
    `,
    methods: {
        get_mem_regist: async function () {
            const res = await fetch('./php/mem_get_regist.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                    registNo: this.registNo,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.courseImg = res.courseImg;
            this.courseName = res.courseName;
            this.courseStartDate = res.courseStartDate;
            this.classDescription = res.classDescription;
        },

        //關燈箱
        changelightbox() {
            this.$emit('changelightbox');
            this.get_mem_regist();
        },

        setRating: function (rating) {
            this.rating = rating;
        },
        //星星組件
        sendComm: function () {
            console.log('00');
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    alert('成功送出評論');
                    console.log(xhr.responseText);
                    // console.log(this);
                    // let alreadyComment = JSON.parse(xhr.responseText);
                    if (xhr.responseText.indexOf('您已評分') !== -1) {
                        let commText = document.getElementsByClassName('commText')[0];
                        commText.firstChild.style.display = 'none';
                        commText.innerHTML = `
                            <h5 style="margin: 20px; text-align: 
                               center; color: white; 
                               text-shadow: 0 0 0.2em #87f, 0 0 0.4em #ff0018, 0 0 0.3em #ff00cc;">
                               已送出您的課程評論！
                            </h5>`;
                    } else {
                        alert('fail');
                    }
                } else {
                    alert(xhr.status);
                    console.log(xhr.responseText);
                }
            };
            url = 'php/memSendComm.php';
            xhr.open('post', url, true);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            let data_info = `commStar=${document.getElementsByName('commStar')[0].value}&commContent=${
                document.getElementsByName('commContent')[0].value
            }&registNo=${document.getElementsByName('registNo')[0].value}`;
            xhr.send(data_info);
        },
        // sendComm: function () {
        //     this.$emit('send-comm');
        // },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_mem_regist();
    },
});

// 組件 - vue star rating
Vue.component('star-rating', VueStarRating.default);

// ----------我的課程>課程清單>上課中(組件)----------
Vue.component('courseIng', {
    data() {
        return {
            //撈出來的 資料
            classes: '',
            comm_null: '',
        };
    },
    props: ['memberno'],

    template: `
    <!-- 上課中(當天) -->
<div class="tab-content-3 con">
    <div class="CRD" v-for="(value,key) in classes">
        <div class="CRD_pic">
            <img :src="value.courseImg" />
        </div>
        <div class="CRD_Text">
            <h4 class="CRD_TextTit">{{value.courseName}}</h4>
            <div class="CRD_TextCon">
                <h5>上課時間:{{value.courseStartDate}}</h5>
                <h5>{{value.classDescription}}</h5>
            </div>
        </div>
    </div>
    <div class="CRD_Text" v-if="comm_null">今天沒課唷!還不快去報名新課程!!</div>
</div>
  `,
    methods: {
        mem_get_coursing: async function () {
            const res = await fetch('./php/mem_get_coursing.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.classes = res;

            if (this.classes == '') {
                this.comm_null = true;
            }
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.mem_get_coursing();
    },
});

// ==========我的收藏============
Vue.component('mem-keep', {
    data() {
        return {
            content: 'memKeepCourse',
        };
    },
    props: ['memberno'],

    template: `
    <!-- 我的收藏開始 -->
    <section class="memKeepOut menuCG" >
        <div class="memContent">
            <div id="memKeepTitle">
                <ul>
                    <li id="memKeepCourse" @click="content='memKeepCourse'" style="background-color: rgba(170, 170, 170, 0.5); color: white;text-shadow: 0 0 0.2em rgb(211, 211, 65), 0 0 0.4em rgb(214, 29, 183), 0 0 0.3em #5f93c4; "><h4>課程</h4></li>
                    <li id="memKeepPro" @click="content='memKeepPro'" style="color: white"><h4>商品</h4></li>
                </ul>
            </div>
            <div class="memKeepContent">
                <component :memberno="memberno" :is="content"></component>
            </div>
        </div>
    </section>
    <!-- 我的收藏結束 -->
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ----------我的收藏>課程(組件)----------
Vue.component('memKeepCourse', {
    data() {
        return {
            //撈出來的 資料
            keepcourse: '',
        };
    },
    props: ['memberno'],

    template: `
    <div class="memKeepCourse memcon">
                    <div class="CRD" v-for="(value,key) in keepcourse">
                        <div class="CRD_pic">
                            <img :src="value.courseImg" />
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">{{value.courseName}}</h4>
                            <div class="CRD_TextCon">
                                <p>{{value.courseDescription}}</p>
                            </div>
                        </div>
                        <div class="memKeepCourseBtn">
                        <!-- <a href="/registration.html">
                                <div class="membtn">報名本課</div>
                            </a> -->
                            <div class="MKC_cancel">
                                <div class="membtn" @click="cancel_keep(value.courListNo)">取消收藏</div>
                            </div>
                        </div>
                    </div>
                </div>
  `,
    methods: {
        mem_get_keep_course: async function () {
            const res = await fetch('./php/mem_get_keep_course.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.keepcourse = res;
        },
        cancel_keep: async function (courListNo) {
            const res = await fetch('./php/mem_del_keep_course.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                    courListNo: courListNo,
                }),
            });
            this.mem_get_keep_course();
            bus.$emit('getAlert', '取消收藏嚕!!');
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.mem_get_keep_course();
    },
});

// ----------我的收藏>商品(組件)----------
Vue.component('memKeepPro', {
    data() {
        return {
            //撈出來的 資料
            keeppro: '',
        };
    },
    props: ['memberno'],

    template: `
    <div class="memKeepPro memcon">
                    <div class="CRD" v-for="(value,key) in keeppro" >
                        <div class="MKP_pic">
                            <img :src="value.proImg" />
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">{{value.proName}}</h4>
                            <div class="CRD_TextCon">
                                <p>{{value.proDescription}}</p>
                            </div>
                        </div>
                        <div class="memKeepCourseBtn">
                        <!-- <a href="/mall.html">
                                <div class="membtn">直接購買</div>
                            </a> -->
                            <div class="MKC_cancel">
                                <div class="membtn" @click="cancel_keep(value.proListNo)">取消收藏</div>
                            </div>
                        </div>
                    </div>
                </div>
  `,
    methods: {
        mem_get_keep_pro: async function () {
            const res = await fetch('./php/mem_get_keep_pro.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.keeppro = res;
        },
        cancel_keep: async function (proListNo) {
            const res = await fetch('./php/mem_del_keep_pro.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                    proListNo: proListNo,
                }),
            });
            this.mem_get_keep_pro();
            bus.$emit('getAlert', '取消收藏嚕!!');
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.mem_get_keep_pro();
    },
});

// ==========歷史訂單============
Vue.component('mem-order', {
    data() {
        return {
            orders: [],
            // itemList: '',
        };
    },
    props: ['memberno'],

    template: `
<!-- 歷史訂單開始 -->
    <section class="memOrderOut menuCG">
                <div class="memContent">
                    <div class="memOrder">
                        <div class="memOrederList">
                            <h4 class="MOL_textbox">
                                <div class="orederNo">訂單編號</div>
                                <div class="orderPay">付款方式</div>
                                <div class="orderAddress">寄送地點</div>
                                <div class="orderTotal">付款金額</div>
                                <div></div>
                            </h4>
                        </div>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item" v-for="(value,index) in orders" :key="value.proOrder">
                                <h2 class="accordion-header" id="headingOne" >
                                    <button
                                        class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne">

                                        <div >
                                            <!-- 主選單內容先隱藏START     -->
                                            <h4 class="MOL_Intextbox">
                                                <div class="orederNo">訂單編號</div>
                                                <div class="orderPay">付款方式</div>
                                                <div class="orderAddress">寄送地點</div>
                                                <div class="orderTotal">付款金額</div>
                                            </h4>
                                            <!-- 主選單內容先隱藏END     -->

                                            <h4 class="MOL_Contentbox">
                                                <div class="orederNo">{{value.proOrder}}</div>
                                                <div class="orderPay">{{value.paymentMethod}}</div>
                                                <div class="orderAddress">{{value.deliveryAddress}}</div>
                                                <div class="orderTotal"><span>$</span>{{value.disTotal}}</div>
                                            </h4>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseOne" v-for="(item,index) in value.itemList" :key="item.proOrderNo" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="memOrderContent">
                                            <div class="MOC_top">
                                                <h4 class="MOC_title">訂單明細</h4>
                                            </div>
                                            <div class="MOC_bottom">
                                                <div class="MOC_bottomContent">
                                                    <div class="proReview">
                                                        <div class="proTitle">商品預覽</div>
                                                        <h5 class="proContent">
                                                            <div class="proContentPic">
                                                                <img :src="item.proImg" />
                                                            </div>
                                                        </h5>
                                                    </div>
                                                    <div class="proNo">
                                                        <div class="proTitle">商品編號</div>
                                                        <h5 class="proContent">{{item.proNo}}</h5>
                                                    </div>
                                                    <div class="proName">
                                                        <div class="proTitle">商品名稱</div>
                                                        <h5 class="proContent">{{item.proName}}</h5>
                                                    </div>
                                                    <div class="proNumber">
                                                        <div class="proTitle">購買數量</div>
                                                        <h5 class="proContent">{{item.orderNumber}}</h5>
                                                    </div>
                                                    <div class="proPrice">
                                                        <div class="proTitle">單價</div>
                                                        <h5 class="proContent"><span>$</span>{{item.proPrice}}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    <!-- 歷史訂單結束 -->
  `,
    methods: {
        get_mem_order: async function () {
            const res = await fetch('./php/mem_get_order.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.orders = res;
        },
        changetype() {},
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_mem_order();
    },
});

// ==========個人資料============
Vue.component('mem-info', {
    data() {
        return {
            content: 'mem-info-default',
        };
    },
    props: ['memberno', 'memname', 'memid', 'mempsw', 'memname', 'memmail', 'memgamepoint'],

    template: `
    <section class="memInfoOut menuCG">
        <div class="memContent">
            <div class="memInfo">
                <div class="memInfoLeft">
                    <div class="memheadBox">
                        <div class="memhead">
                            <img src="./img/wenhead.jpg" @click="senddata" alt="" />
                        </div>
                        <div class="memheadCG">
                            <i class="fas fa-camera"></i>
                        </div>
                    </div>
                    <h5 class="memPoint">可折抵點數:{{memgamepoint}}點</h5>
                </div>
                <div class="memInfoRight">
                    <div class="memInfoFormOut">
                        <div class="memInfoForm">
                            <component :memberno="memberno" :memmail="memmail" :memname="memname" :mempsw="mempsw" :memid="memid" :is="content" @change="change" @send_info="senddata"></component>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,
    methods: {
        change(data) {
            this.content = data;
        },
        senddata() {
            this.test();
        },
        test() {
            this.$emit('sendup');
            console.log('sendup');
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {},
});
// ----------個人資料-預設(組件)----------
Vue.component('mem-info-default', {
    data() {
        return {};
    },
    props: ['memberno', 'memname', 'memid', 'mempsw', 'memname', 'memmail'],

    template: `
<form action="">
    <table>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員編號:</h5>
            <h5 class="MIF_Right">{{memberno}}</h5>
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員名稱:</h5>
            <h5 class="MIF_Right MIF_Default">{{memname}}</h5>
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員帳號:</h5>
            <h5 class="MIF_Right MIF_Default">{{memid}}</h5>
        </div>

        <div class="MIF_Data">
            <h5 class="MIF_Left">會員密碼:</h5>
            <h5 class="MIF_Right MIF_Default">{{mempsw}}</h5>            
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員信箱:</h5>
            <h5 class="MIF_Right MIF_Default">{{memmail}}</h5>
        </div>
        <div class="memInfoBtn">
            <div class="membtn"  @click="changemem">
                修改資料
            </div>
        </div>
    </table>
</form>
    `,
    methods: {
        changemem() {
            this.$emit('change', 'mem-info-edit');
        },
    },
    created() {},
});
// ----------個人資料>編輯(組件)----------
Vue.component('mem-info-edit', {
    data() {
        return {
            //撈出來的 資料
            old_psw: '',
            new_psw: '',
            new_psw2: '',
            memname_new: '',
            memid_new: '',
            memmail_new: '',
        };
    },
    props: ['memberno', 'memname', 'memid', 'mempsw', 'memmail'],

    template: `
<form action="">
    <table>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員編號:</h5>
            <h5 class="MIF_Right">{{memberno}}</h5>
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員名稱:</h5>
            <input type="text" class="MIF_Right" v-model="memname_new" />
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員帳號:</h5>
            <input type="text" class="MIF_Right" v-model="memid_new"  /> 
        </div>

        <div class="MIF_Data">
            <h5 class="MIF_Left">輸入舊密碼:</h5>            
            <input type="text" class="MIF_Right" placeholder="請輸入6~20英數字" v-model="old_psw"/> 
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">輸入新密碼:</h5>
            <input type="text" class="MIF_Right" placeholder="請輸入6~20英數字" v-model="new_psw" />
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">再次輸入新密碼:</h5>
            <input type="text" class="MIF_Right" placeholder="請再次輸入新密碼" v-model="new_psw2" />
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員信箱:</h5>
            <input type="text" class="MIF_Right" v-model="memmail_new" />
        </div>
        <div class="memInfoBtn">
            <div class="membtn"  @click="meminfo_edit(memname_new,memid,old_psw,new_psw,new_psw2,memmail_new)">
                確認修改
            </div>
        </div>
    </table>
</form>
  `,
    methods: {
        meminfo_edit: async function (memname_new, memid_new, old_psw, new_psw, new_psw2, memmail_new) {
            //會員名稱長度是否符合
            if ((this.memname_new.length > 10) | (this.memname_new.length < 1)) {
                bus.$emit('getAlert', '請輸入會員名稱(1~10字)');
                return;
            }
            //判斷 信箱規格是否正確
            let isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
            if (!isEmail.test(this.memmail_new) || this.memmail_new == '') {
                this.$refs.signerror.innerText = '請輸入正確信箱';
                return;
            }

            //判斷 舊密碼是否正確
            if (this.old_psw != this.old_psw) {
                bus.$emit('getAlert', '請輸入正確密碼');
                return;
            }
            //判斷 新密碼兩次是否一致
            if ((this.new_psw != '') | (this.new_psw2 != '')) {
                if (this.new_psw != this.new_psw2) {
                    bus.$emit('getAlert', '新密碼 兩次輸入不一致');
                    return;
                }
            }
            const res = await fetch('./php/mem_update_info.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                    memname_new: this.memname_new,
                    memid_new: this.memid_new,
                    new_psw: this.new_psw,
                    old_psw: this.old_psw,
                    memmail_new: this.memmail_new,
                }),
            }).then(function (data) {
                return data.text();
            });
            if (res == '修改成功~!!') {
                bus.$emit('getAlert', '修改成功');
                this.$emit('send_info');
                console.log('000');
            } else if (res == '修改失敗~!!') {
                bus.$emit('getAlert', '修改失敗');
            }

            //重新渲染畫面並 回到個人資料預設頁
            this.change();
        },
        change() {
            this.$emit('change', 'mem-info-default');
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.memname_new = this.memname;
        this.memid_new = this.memid;
        this.old_psw = this.mempsw;
        this.memmail_new = this.memmail;
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
        progress: '',
        content: 'mem-course',
        memberno: '',
        memId: '',
        memPsw: '',
        gradeNo: '',
        memName: '',
        memMail: '',
        memGamePoint: '',
        courseTimes: '',
        memAvatar: '',
        nameVal: '',
        memCourseRows: [],
        getMemData: '',
    },
    methods: {
        get_mem: async function () {
            const res = await fetch('./php/mem_get_one.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.memId = res.memId;
            this.memPsw = res.memPsw;
            this.gradeNo = res.gradeNo;
            this.memName = res.memName;
            this.memMail = res.memMail;
            this.memGamePoint = res.memGamePoint;
            // this.courseTimes = res.courseTimes;
            this.memAvatar = res.memAvatar;
        },
        receive_info() {
            console.log('receive_info');
            this.get_mem();
        },
        get_mem_coursetimes: async function () {
            console.log(this.memberno);
            const res = await fetch('./php/mem_get_coursetimes.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberno: this.memberno,
                }),
            }).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.courseTimes = res.courseTimes;
            this.progress = (res.courseTimes / 16) * 100;
        },
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
            await this.get_mem();
            await this.get_mem_coursetimes();
            //沒抓到會員資料導回首頁
            if (!this.getMemData) {
                // alert('a');
                // location.href = `./homepage.html`
            }
        },
    },
    created() {
        // this.get_mem();
        // this.get_mem_coursetimes();
        this.getMemDatafunc();
    },
    mounted() {
        $(document).ready(function () {
            $('.memMenuOut>div').click(function () {
                $('.memMenuOut>div').each(function () {
                    $(this).css({
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        color: 'white',
                    });
                });
                $(this).css({
                    backgroundColor: 'white',
                    color: 'black',
                });
            });
        });
    },
});
