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
});

// ----------我的課程>課程清單(組件)----------
Vue.component('courseStatus', {
    data() {
        return {
            content: 'courseReg',
            //撈出來的 資料
        };
    },
    props: [],

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
            <li id="tab-content-2" @click="content='courseFinish'">
                <div>
                    <div class="courseFinish">
                        <h4>已完課</h4>
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
            <component :is="content"></component>
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
        };
    },
    props: [],

    template: `
    <!-- 已報名 -->
        <div class="tab-content-1 con">
            <div class="CRD">
                <div class="CRD_pic">
                    <img src="./img/course_cards/course_07.png" alt="" srcset="" />
                </div>
                <div class="CRD_Text">
                    <h4 class="CRD_TextTit">煉金術</h4>
                    <div class="CRD_TextCon">
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                    </div>
                </div>
                <div class="courseCancel">
                    <div class="membtn">取消報名</div>
                </div>
            </div>

            <div class="CRD">
                <div class="CRD_pic">
                    <img src="./img/course_cards/course_07.png" alt="" srcset="" />
                </div>
                <div class="CRD_Text">
                    <h4 class="CRD_TextTit">煉金術2</h4>
                    <div class="CRD_TextCon">
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                    </div>
                </div>
                <div class="courseCancel">
                    <div class="membtn">取消報名</div>
                </div>
            </div>

            <div class="CRD">
                <div class="CRD_pic">
                    <img src="./img/course_cards/course_07.png" alt="" srcset="" />
                </div>
                <div class="CRD_Text">
                    <h4 class="CRD_TextTit">煉金術3</h4>
                    <div class="CRD_TextCon">
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                        <h5>煉金術是一門很厲害的課</h5>
                    </div>
                </div>
                <div class="courseCancel">
                    <div class="membtn">取消報名</div>
                </div>
            </div>
        </div>
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ----------我的課程>課程清單>已完課(組件)----------
Vue.component('courseFinish', {
    data() {
        return {
            lightbox: false,
        };
    },
    props: ['course-img', 'course-name', 'course-description', 'regist-no'],
    template: `
        <div class="tab-content-2 con">
            <div class="CFD_Out">
                <div class="CFD_Top">
                    <div class="CRD_pic">
                        <img :src="courseImg" alt="" srcset="" />
                    </div>
                    <div class="CRD_Text">
                        <h4 class="CRD_TextTit">{{courseName}}</h4>
                        <div class="CRD_TextCon">
                            <h5>{{courseDescription}}</h5>
                        </div>
                    </div>
                </div>
                
                <div class="CFD_Bottom">
                    <div class="CFD_BottomComm">
                        <div class="CFD_commTitle">
                            <h4>評論本課</h4>
                            </div>
                            <div class="commText">
                                <form onsubmit="return false;">
                                    <star-rating v-model="rating"
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
            </div>
        </div>
    `,
    data() {
        return {
            rating: 0,
            commText: '',
        };
    },
    methods: {},
});
// ----------我的課程>課程清單>已完課lightbox(組件)----------
Vue.component('lightbox', {
    data() {
        return {
            rating: 0,
            commText: '',
        };
    },
    props: ['course-img', 'course-name', 'course-description', 'regist-no'],
    template: `

    `,
    methods: {
        setRating: function (rating) {
            this.rating = rating;
        },
        sendComm: function () {
            this.$emit('send-comm');
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {},
});

// 組件 - vue star rating
Vue.component('star-rating', VueStarRating.default);

// ----------我的課程>課程清單>上課中(組件)----------
Vue.component('courseIng', {
    data() {
        return {
            //撈出來的 資料
        };
    },
    props: [],

    template: `
    <!-- 上課中(當天) -->
        <div class="tab-content-3 con">
            <div class="CRD">
                <div class="CRD_pic">
                    <img src="./img/course_cards/course_03.png" alt="" srcset="" />
                </div>
                <div class="CRD_Text">
                    <h4 class="CRD_TextTit">詛咒術</h4>
                    <div class="CRD_TextCon">
                        <h5>詛咒術是一門攻擊型的課</h5>
                        <h5>詛咒術是一門攻擊型的課</h5>
                        <h5>詛咒術是一門攻擊型的課</h5>
                        <h5>詛咒術是一門攻擊型的課</h5>
                        <h5>詛咒術是一門攻擊型的課</h5>
                    </div>
                </div>
            </div>
        </div>
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ==========我的收藏============
Vue.component('mem-keep', {
    data() {
        return {
            content: 'memKeepCourse',
        };
    },
    props: [],

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
                <component :is="content"></component>
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
        };
    },
    props: [],

    template: `
    <div class="memKeepCourse memcon">
                    <div class="CRD">
                        <div class="CRD_pic">
                            <img src="./img/course_cards/course_07.png" alt="" srcset="" />
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">收藏煉金術1</h4>
                            <div class="CRD_TextCon">
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                            </div>
                        </div>
                        <div class="memKeepCourseBtn">
                            <a href="/registration.html"
                                ><div class="membtn">報名本課</div></a
                            >
                            <div class="MKC_cancel">
                                <div class="membtn">取消收藏</div>
                            </div>
                        </div>
                    </div>

                    <div class="CRD">
                        <div class="CRD_pic">
                            <img src="./img/course_cards/course_07.png" alt="" srcset="" />
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">收藏煉金術2</h4>
                            <div class="CRD_TextCon">
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                                <h5>煉金術是一門很厲害的課</h5>
                            </div>
                        </div>
                        <div class="memKeepCourseBtn">
                            <a href="/registration.html"
                                ><div class="membtn">報名本課</div></a
                            >
                            <div class="MKC_cancel">
                                <div class="membtn">取消收藏</div>
                            </div>
                        </div>
                    </div>
                </div>
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ----------我的收藏>商品(組件)----------
Vue.component('memKeepPro', {
    data() {
        return {
            //撈出來的 資料
        };
    },
    props: [],

    template: `
    <div class="memKeepPro memcon">
                    <div class="CRD">
                        <div class="MKP_pic">
                            <img src="./img/props/p13.png" alt="" srcset="" />
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">發光水波蛋蛋1</h4>
                            <div class="CRD_TextCon">
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                            </div>
                        </div>
                        <div class="memKeepCourseBtn">
                            <a href="/mall.html"
                                ><div class="membtn">直接購買</div></a
                            >
                            <div class="MKC_cancel">
                                <div class="membtn">取消收藏</div>
                            </div>
                        </div>
                    </div>

                    <div class="CRD">
                        <div class="MKP_pic">
                            <img src="./img/props/p13.png" alt="" srcset="" />
                        </div>
                        <div class="CRD_Text">
                            <h4 class="CRD_TextTit">發光水波蛋蛋2</h4>
                            <div class="CRD_TextCon">
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                                <h5>發光水波蛋蛋是很厲害的道具</h5>
                            </div>
                        </div>
                        <div class="memKeepCourseBtn">
                            <a href="/mall.html"
                                ><div class="membtn">直接購買</div></a
                            >
                            <div class="MKC_cancel">
                                <div class="membtn">取消收藏</div>
                            </div>
                        </div>
                    </div>
                </div>
  `,
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ==========歷史訂單============
Vue.component('mem-order', {
    data() {
        return {};
    },
    props: [],

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
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                <!-- 主選單內容先隱藏START     -->
                                <h4 class="MOL_Intextbox">
                                    <div class="orederNo">訂單編號</div>
                                    <div class="orderPay">付款方式</div>
                                    <div class="orderAddress">寄送地點</div>
                                    <div class="orderTotal">付款金額</div>
                                </h4>
                                <!-- 主選單內容先隱藏END     -->

                                <h4 class="MOL_Contentbox">
                                    <div class="orederNo">000001</div>
                                    <div class="orderPay">信用卡付款</div>
                                    <div class="orderAddress">魔幻森林菇菇區123號</div>
                                    <div class="orderTotal">$8787</div>
                                </h4>
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                        >
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
                                                        <img src="./img/props/p3.png" />
                                                    </div>
                                                </h5>
                                            </div>
                                            <div class="proNo">
                                                <div class="proTitle">商品編號</div>
                                                <h5 class="proContent">000123</h5>
                                            </div>
                                            <div class="proName">
                                                <div class="proTitle">商品名稱</div>
                                                <h5 class="proContent">魔力技能書</h5>
                                            </div>
                                            <div class="proNumber">
                                                <div class="proTitle">購買數量</div>
                                                <h5 class="proContent">1</h5>
                                            </div>
                                            <div class="proPrice">
                                                <div class="proTitle">單價</div>
                                                <h5 class="proContent">$8787</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                <!-- 主選單內容先隱藏START     -->
                                <h4 class="MOL_Intextbox">
                                    <div class="orederNo">訂單編號</div>
                                    <div class="orderPay">付款方式</div>
                                    <div class="orderAddress">寄送地點</div>
                                    <div class="orderTotal">付款金額</div>
                                </h4>
                                <!-- 主選單內容先隱藏END     -->

                                <h4 class="MOL_Contentbox">
                                    <div class="orederNo">000002</div>
                                    <div class="orderPay">信用卡付款</div>
                                    <div class="orderAddress">魔幻森林菇菇區123號</div>
                                    <div class="orderTotal">$8787</div>
                                </h4>
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                        >
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
                                                        <img src="./img/props/p3.png" />
                                                    </div>
                                                </h5>
                                            </div>
                                            <div class="proNo">
                                                <div class="proTitle">商品編號</div>
                                                <h5 class="proContent">000123</h5>
                                            </div>
                                            <div class="proName">
                                                <div class="proTitle">商品名稱</div>
                                                <h5 class="proContent">魔力技能書</h5>
                                            </div>
                                            <div class="proNumber">
                                                <div class="proTitle">購買數量</div>
                                                <h5 class="proContent">1</h5>
                                            </div>
                                            <div class="proPrice">
                                                <div class="proTitle">單價</div>
                                                <h5 class="proContent">$8787</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                            >
                                <!-- 主選單內容先隱藏START     -->
                                <h4 class="MOL_Intextbox">
                                    <div class="orederNo">訂單編號</div>
                                    <div class="orderPay">付款方式</div>
                                    <div class="orderAddress">寄送地點</div>
                                    <div class="orderTotal">付款金額</div>
                                </h4>
                                <!-- 主選單內容先隱藏END     -->

                                <h4 class="MOL_Contentbox">
                                    <div class="orederNo">000003</div>
                                    <div class="orderPay">信用卡付款</div>
                                    <div class="orderAddress">魔幻森林菇菇區123號</div>
                                    <div class="orderTotal">$8787</div>
                                </h4>
                            </button>
                        </h2>
                        <div
                            id="collapseThree"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                        >
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
                                                        <img src="./img/props/p3.png" />
                                                    </div>
                                                </h5>
                                            </div>
                                            <div class="proNo">
                                                <div class="proTitle">商品編號</div>
                                                <h5 class="proContent">000123</h5>
                                            </div>
                                            <div class="proName">
                                                <div class="proTitle">商品名稱</div>
                                                <h5 class="proContent">魔力技能書</h5>
                                            </div>
                                            <div class="proNumber">
                                                <div class="proTitle">購買數量</div>
                                                <h5 class="proContent">1</h5>
                                            </div>
                                            <div class="proPrice">
                                                <div class="proTitle">單價</div>
                                                <h5 class="proContent">$8787</h5>
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
    methods: {},
    // template 渲染前 會先去執行以下函式
    created() {},
});

// ==========個人資料============
Vue.component('mem-info', {
    data() {
        return {
            content: 'mem-info-default',
        };
    },
    props: ['memberno', 'memname', 'memid', 'mempsw', 'memname', 'memmail'],

    template: `
    <section class="memInfoOut menuCG">
        <div class="memContent">
            <div class="memInfo">
                <div class="memInfoLeft">
                    <div class="memheadBox">
                        <div class="memhead">
                            <img src="./img/wenhead.jpg" alt="" />
                        </div>
                        <div class="memheadCG">
                            <i class="fas fa-camera"></i>
                        </div>
                    </div>
                    <h5 class="memPoint">可折抵點數:100點</h5>
                </div>
                <div class="memInfoRight">
                    <div class="memInfoFormOut">
                        <div class="memInfoForm">
                            <div>
                                <component :memberno="memberno" :memmail="memmail" :memname="memname" :mempsw="mempsw" :memid="memid" :is="content" @change="change"></component>
                            </div>
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
            <div class="membtn"  id="memInfoCG" @click="change">
                修改資料
            </div>
        </div>
    </table>
</form>
    `,
    methods: {
        change() {
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
        };
    },
    props: ['memberno', 'memname', 'memid', 'mempsw', 'memname', 'memmail'],

    template: `
<form action="">
    <table>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員編號:</h5>
            <h5 class="MIF_Right">001</h5>
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員名稱:</h5>
            <input type="text" class="MIF_Right" placeholder="" />
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員帳號:</h5>
            <h5 class="MIF_Right">wenwen0487</h5>
        </div>

        <div class="MIF_Data">
            <h5 class="MIF_Left">會員密碼:</h5>
            <div class="MIF_Right">
                <input
                    type="text"
                    class="memPsw"
                    placeholder="請輸入舊密碼(6~20英數字)"
                />
                <input
                    type="text"
                    class="memPsw"
                    placeholder="請輸入新密碼(6~20英數字)"
                />
                <input type="text" class="memPsw" placeholder="請再次輸入新密碼" />
            </div>
        </div>
        <div class="MIF_Data">
            <h5 class="MIF_Left">會員信箱:</h5>
            <input type="text" class="MIF_Right" placeholder="" />
        </div>
        <div class="memInfoBtn">
            <div class="membtn" id="memInfoCG" @click="change">
                確認修改
            </div>
        </div>
    </table>
</form>
  `,
    methods: {
        change() {
            this.$emit('change', 'mem-info-default');
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {},
});

new Vue({
    el: '#app',
    data: {
        progress: '',
        content: 'mem-course',
        memberno: 5,
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
            this.courseTimes = res.courseTimes;
            this.memAvatar = res.memAvatar;
        },
        get_mem_coursetimes: async function () {
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
        //星星組件
        sendComm: function () {
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
    },
    created() {
        this.get_mem();
        this.get_mem_coursetimes();
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
