     <?php
       require_once "./php/connectced101g3_test.php";
       session_start();
        $sql = "SELECT * FROM course JOIN class on course.courseNo = class.courseNo 
                JOIN coursetype ON course.courTypeNo = coursetype.courTypeNo
                JOIN teacher ON class.teachNo = teacher.teachNo
                WHERE class.classNo = ?";
        $allClass = $pdo->prepare($sql);
        $allClass->bindValue(1, $_GET["classNo"]);
        $allClass->execute();
        $classRow = $allClass->fetch(PDO::FETCH_ASSOC);
    ?>  



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="css/cart_pay.css" />
    <link rel="stylesheet" href="css/registration-pay.css" />
    <link rel="stylesheet" href="./css/btn.css" />
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script> -->
    <title>麻瓜特訓班 | 確認購買與選擇付款方式</title>
    <style>
        body {
            background: radial-gradient(100% 100% at bottom center,
                    #892570,
                    #75517d,
                    #3a6186);
            background: radial-gradient(100% 100% at top center,
                    #3a6186 10%,
                    #75517d 40%,
                    #892570 65%);
        }
    </style>
</head>

<body>
<header>
        <nav>
            <div class="menu_toggle">
                <input type="checkbox">
                <div class="logo">
                    <a href="index.html"><img src="./img/logo.png"></a>
                </div>
                <ul class="nav">
                    <li><a href="course.html">課程總覽</a></li>
                    <li><a href="teacher.html">教師總覽</a></li>
                    <li>
                        <a href="index.html"><img src="./img/logo.png"></a>
                    </li>
                    <li><a href="mall.html">商城</a></li>
                    <li><a href="game.html">小遊戲</a></li>
                </ul>
                <div class="ham">
                    <span></span> 
                    <span></span> 
                    <span></span>
                </div>
                <ul class="nav-right">
                    <li>
                        <a href="member.html">
                        <!-- <a :href="'member.html?memberNo=' + this.memData.memberNo"> -->
                            <i id="memIcon" class="fas fa-user-circle fa-lg"></i>
                            <div id="memInfo">
                                <div id="avatar">
                                    <img :src="'img/' + this.memData.memAvatar" alt="">
                                </div>
                            </div>
                        </a>
                        <span id="logout"></span>
                    </li>
                    <li><a href="cart.html"><i class="fas fa-shopping-cart fa-lg"></i></a></li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- 登入註冊燈箱 -->
    <div class="lightbox-bg"></div>
    <div class="container" id="container">
        <span class="close"><i class="fas fa-times fa-xs"></i></span>
        <!-- 註冊 -->
        <div class="form-container sign-up-container">
            <form id="signUpForm">
                <h2>會員註冊</h2>
                <input type="text" id="signUpName" placeholder="輸入姓名" />
                <input type="email" id="sigUpEmail" placeholder="輸入email" />
                <input type="text" id="signUpId" placeholder="輸入帳號" />
                <input type="password" id="signUpPsw" placeholder="輸入密碼(至少含各一位英數字)" />
                <input type="password" id="checkPsw" placeholder="確認密碼" name="checkPsw">
                <input type="button" id="signUpSubmit" value="註冊">

                <div class="notice"></div>
                <div class="notice"></div>
                <div class="notice"></div>
                <div class="notice"></div>
                <div class="notice"></div>
            </form>
        </div>      
        <!-- 登入 -->
        <div class="form-container sign-in-container">
            <form id="signInForm">
                <h2>會員登入</h2>
                <input type="text" name="memId" id="memId" placeholder="輸入帳號" />
                <input type="password" name="memPsw" id="memPsw" placeholder="輸入密碼" />
                <span id="forgetPsw">忘記密碼?</span>
                <input type="button" id="signInSubmit" value="登入">
                
                <div class="notice" style="top: 140px"></div>
                <div class="notice" style="top: 198px"></div>
            </form>
        </div>
        
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <button type="button" class="check" id="signIn">登入</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <button type="button" class="check" id="signUp">註冊</button>
                </div>
            </div>
        </div> 
    </div>
    
        <div class="moon"></div>
        <div class="confirm_title_box">
            <div class="confirm_title">確認資料</div>
        </div>
        <div class="confirm_data_box">
            <div class="confirm_data">
                <div class="name_box">
                    <div class="name_title title">姓名</div>
                    <div class="name data_text"><?=$_SESSION["memName"]?></div>
                </div>
                <div class="phone_box">
                    <div class="phone_title title">E-mail</div>
                    <div class="phone data_text"><?=$_SESSION["memMail"]?></div>
                </div>
                <!-- <div class="add_box">
                    <div class="add_title title">地址</div>
                    <div class="add data_text">魔幻森林菇菇區123號</div>
                </div> -->
                <!-- <div class="point_box">
                    <div class="point_title">折扣點數</div>
                    <div class="point data_text">0</div>
                </div> -->
            </div>
        </div>
        <div class="cartpro_box">
            <div class="cartpro_a_box">
                <div class="crystalball_left_box">
                <img src="<?=$classRow["courseImg"]?>" />
                </div>
                <div class="crystalball_right_box">
                    <div class="crystalball_name_box">
                        <div class="crystalball_name"><?=$classRow["courseName"]?></div>
                    </div>

                    <div class="crystalball_text_box">
                        <div class="crystalball_text">
                            <?=$classRow["courseDescription"]?>
                        </div>
                        <div class="crystalball_text">授課教師 : <?=$classRow["teachName"]?></div>
                        <div class="crystalball_text">屬性 : <?=$classRow["courTypeName"]?></div>
                        <div class="crystalball_text">開課時間 : <?=$classRow["courseStartDate"]?></div>
                    </div>
                    <div class="crystalball_priceAmount_box">
                        <!-- <div class="amount">數量：2</div> -->
                        <div class="pro_complete_price_box">
                            <img src="./img/dollar.png" />
                            <div class="pro_complete_price"><?=$classRow["coursePrice"]?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="deliver_box">
            <div class="deliver">
                <img src="./img/deliver.png" />
            </div>
        </div>
        <div class="total_box">
            <div class="total_photoandtext">
                <img src="./img/dollar.png" /><?=$classRow["coursePrice"]?>
            </div>
            <div class="total_text"></div>
        </div>

        <!-- 付款方式區塊 -->

        <div id="app">
        <div id="step1">
            <h4><span class="highlight">選擇付款方式</span></h4>
            <div class="allBtn pay-type" style="display: flex;">
                <div class="row justify-content-center">
                    <button type="button" class="btn-light btn_CARD" v-bind:class=' {btnActive:isActive===1}'
                        v-on:click.capture.stop='CardForm=!CardForm'>
                        <img v-bind:src="link.CardImgSrc" alt=""><br>
                        信用卡/金融卡
                    </button>
                </div>

                <div class="row justify-content-center mt-3">
                    <button type="button" class="btn-light btn_ATM" v-bind:class='{btnActive:isActive === 2}'
                        v-on:click.capture.stop='AtmForm=!AtmForm'>
                        <img v-bind:src="link.AtmImg" alt=""><br>
                        ATM 轉帳
                    </button>
                </div>
            </div>
        </div>





        <!-- Card原表單 -->
        <div class="creditcard" v-show='CardForm' onsubmit="return post_data()">
            <form id="myForm" class="allBtn" role="form" data-toggle="validator">
                <div class="pay_input form-group">
                    <input type="radio" id="pay1" name="payMethod" v-bind:value="CardPayType.onePay"
                        v-model.lazy='payType'>
                    <label for="pay1"></label>
                    {{CardPayType.onePay}}
                    <input class="ml-5" type="radio" id="pay2" name="payMethod" v-bind:value="CardPayType.installment"
                        v-model.lazy='payType'>
                    <label for="pay2"></label>
                    {{CardPayType.installment}}
                    <div class="help-block with-errors"></div>
                </div>
                <div class="pay_creditCard_number form-group">
                    <p>信用卡卡號 : </p>

                    <input type="text" v-for='(cardInput,index) in inputList' @keyup='autoTab($event,index)'
                        maxlength="4" data-error="請填寫四位數" minlength="4" pattern="[0-9]{4}" class="border-input">
                    －

                    <!-- <input type="text" v-model='cardNum2' id="card_num_2" maxlength="4" data-error="請填寫四位數" required
                            data-minlength="4" pattern="[0-9]{4}">
                        －
                        <input type="text" v-model='cardNum3' id="card_num_3" maxlength="4" required data-error="請填寫四位數"
                            data-minlength="4" pattern="[0-9]{4}">
                        －
                        <input type="text" v-model='cardNum4' id="card_num_4" maxlength="4" data-error="請填寫四位數" required
                            data-minlength="4" pattern="[0-9]{4}"> -->

                    <div class="help-block with-errors" v-show='textErr'>{{card1ErrMsg}}</div>
                </div>

                <div class="pay_creditCard_date form-group">
                    <p>有效月年 : </p>
                    <select name="month" v-model='cardMonth'>
                        <option value="" disabled selected>Month</option>
                        <option id="card_month" v-bind:value="num < 10 ? '0' + num : num" v-for='num in 12'
                            v-bind:key="num">
                            {{num < 10 ? '0' + num : num}}</option>
                    </select>
                    /
                    <select name="year" v-model='cardYear'>
                        <option value="" disabled selected>Year</option>
                        <option id="card_year" v-bind:value="$index + minCardYear" v-for='(n,$index) in 12'
                            v-bind:key="n">
                            {{$index + minCardYear}}</option>
                    </select>
                </div>
                <div class="pay_creditCard_last form-group">
                    <p>背面末三碼</p>
                    <input type="text" v-model='CardBack' id="card_back_num" data-error="請填寫三位數" minlength="3"
                        maxlength="3" pattern="[0-9]{3}" @keyup='testCardBack($event)'>
                    <img src="https://gitlab.com/loveabo103103/payment/raw/master/back-three.svg" alt="icon"
                        width="35.3px">
                    <div class="help-block with-errors" v-show='BackTextErr'>{{card4ErrMsg}}</div>

                </div>
                <div class="pay_mail form-group">
                    <p>填寫付款人信箱 : </p>
                    <input type="email" data-error="請填寫正確信箱地址" v-model='pay_mail' @keyup='testMail($event)'>
                    <div class="help-block with-errors" v-show='mailErr'>{{card5ErrMsg}}</div>
                </div>

                <button id="goS3" type="button" class="btn btn-info" @click='copy_Card();changeBg(1)'>確定</button>
            </form>

            <div class="pay_close" v-on:click='CardForm=!CardForm'>
                <img v-bind:src="link.CloseImg" alt="">
            </div>
        </div>
        <!-- Card原表單 -->



        <!-- ATM原表單 -->
        <div class="ATM" v-show='AtmForm'>
            <div id="myForm5" class="allBtn">
                <table class="table table-hover">
                    <tr v-for="(AtmTable,index) in AtmTitle">
                        <td>{{AtmTable}}</td>
                        <!-- <td>{{AtmTable.AtmCode}}</td> -->
                    </tr>
                </table>
                <button id="goATM" class="btn btn-info" @click="copy_Atm();changeBg(2)">確認</button>
            </div>
            <div class="close-atm" v-on:click='AtmForm=!AtmForm'>
                <img v-bind:src="link.CloseImg" alt="">
            </div>
        </div>
        <!-- ATM原表單 -->


        <!-- Card打印表單 -->
        <div class="card-inf" v-show='copyCard'>
            <div class="card-back-inf" style="display: flex;">
                <div class="card-back-title">
                    付款模式:
                </div>
                <div class="card-back-num">
                    {{payType}}
                </div>
            </div>
            <div class="card-num-inf" style="display: flex;">
                <div class="card-num-title">
                    信用卡卡號:
                </div>
                <div class="card-num">
                    <span v-for='card in cardNum'>{{card}}-</span>
                </div>
            </div>
            <div class="card-deadline" style="display: flex;">
                <div class="card-deadline-title">
                    有效年月:
                </div>
                <div class="card-month">
                    {{cardMonth}}
                </div>
                /
                <div class="card-year">
                    {{cardYear}}
                </div>
            </div>
            <div class="card-back-inf" style="display: flex;">
                <div class="card-back-title">
                    背面末三碼:
                </div>
                <div class="card-back-num">
                    {{CardBack}}
                </div>
            </div>
            <div class="card-email-inf" style="display: flex;">
                <div class="card-email-title">
                    付款人信箱:
                </div>
                <div class="card-email">
                    {{pay_mail}}
                </div>
            </div>
        </div>
        <!-- Card打印表單 -->



        <!-- ATM打印表單 -->
        <table class="ATM_inf" v-show='copyAtm'>
            <tr v-for="(item,index) in AtmTrInfo" :key="index">
                <td>{{item.title}} : </td>
                <td>{{item.info}}</td>
            </tr>
        </table>
        <!-- ATM打印表單 -->

    </div>

    <form action="./php/courseInsert.php" method="post" enctype="multipart/form-data">
    <input hidden type="text" name="memberNo" value="<?=$_SESSION["memberNo"]?>">
    <input hidden id="classNo" type="text" name="classNo" value="<?=$classRow["classNo"]?>">
    
    <div class="btn-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" class="star-svg">
            <path data-name="star-10"
                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                fill="#fd7865" />
            <path data-name="star-9"
                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                fill="#489ba9" />
            <path data-name="star-8"
                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                fill="#fd7865" />
            <path data-name="star-7"
                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                fill="#fcc14c" />
            <path data-name="star-6"
                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                fill="#489ba9" />
            <path data-name="star-5"
                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                fill="#fd7865" />
            <path data-name="star-4"
                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                fill="#fcc14c" />
            <path data-name="star-3"
                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                fill="#fd7865" />
            <path data-name="star-2"
                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                fill="#489ba9" />
            <path data-name="star-1"
                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                fill="#fcc14c" />
        </svg>
        <input class="Btn" type="button" value="送出" />
    </div>
    </form>
    <!-- <button id="allGo">送出</button> -->

    <footer>
        <p>copyright©2020 CED101_G3 麻瓜特訓班.All Rights Reserved</p>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    <script src="./js/button.js"></script>
    <script src="./js/login.js"></script>
    <script src="./vendors/jquery/jquery-3.5.1.min.js"></script>
    <script src="./js/cart_pay.js"></script>
    <!-- <script src="./js/registration-pay.js"></script> -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js'></script>

    <script>


        let memNavInfo = new Vue({
            el: '#memInfo',
            data: {
                memData: {},
            },
        })
        let storage = sessionStorage;
        let tom = document.querySelectorAll(".border-input");

        let copyHave = 'noHave';
        function post_data() {

            return false;
        }



        ; (function () {
            let classRows;
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                vm.classRows = JSON.parse(xhr.responseText);
                console.log(vm.classRows);
            }
            xhr.open('get', './php/getCourse.php', true);
            xhr.send(null);
            let vm = new Vue({
                el: '#app',
                data: {
                    deadLineDate: new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + (new Date().getDate() + 1) + '號' + '23時59分',
                    minCardYear: new Date().getFullYear(),
                    CardForm: false,
                    AtmForm: false,
                    copyAtm: false,
                    copyCard: false,
                    isActive: false,

                    textErr: false,
                    BackTextErr: false,
                    mailErr: false,

                    // classPrice='',
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
                    AtmPrice: '',
                    keyPressCount: 0,
                    inputList: [{ val: "", key: 1 }, { val: "", key: 2 }, { val: "", key: 3 }, { val: "", key: 4 }],
                    link: {
                        CardImgSrc: 'https://gitlab.com/loveabo103103/payment/raw/master/credit-card.svg',
                        AtmImg: 'https://gitlab.com/loveabo103103/payment/raw/master/atm.svg',
                        CloseImg: './img/close3.png',
                    },

                    AtmTrInfo: [
                        { title: '銀行代碼', info: '013國泰世華銀行' },
                        { title: '轉帳帳號', info: '0135000878787' },
                        { title: '轉帳金額', info: '' },
                        { title: '繳款期限', info: new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + (new Date().getDate() + 1) + '號' + '23時59分' }
                    ],

                    AtmTitle: ['銀行代碼:', '轉帳帳號:', '轉帳金額:', '繳款期限:',],

                    AtmInf: ['013國泰世華銀行', '0135000878787',],

                    CardPayType: {
                        onePay: '一次付款',
                        installment: '分三期付款',
                    },
                },
                computed: {
                    getPay() {
                        return this.AtmPrice;
                    },
                },
                created() {
                    this.AtmPrice = storage.getItem('classPrice');
                    Object.assign(this.AtmTrInfo[2], { title: '轉帳金額', info: this.getPay });
                },
                mounted() {
                    this.className = storage.getItem('className');
                },
                methods: {
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
                        let chkObj = document.getElementsByName("payMethod");
                        let selCount = 0;
                        for (var i = 0; i < chkObj.length; i++) {
                            if (chkObj[i].checked == true) {
                                selCount++;
                            }
                        }

                        if (selCount >= 1
                            && this.passArray.includes('t1')
                            && this.passArray.includes('t2')
                            && this.passArray.includes('t3')
                            && this.passArray.includes('t4')
                            && this.passArray.includes('backTextPass')
                            && this.passArray.includes('mailTextPass')
                            && this.textErr != true
                            && this.BackTextErr != true
                            && this.mailErr != true
                            && this.cardMonth != ''
                            && this.cardYear != '') {
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

                        let dom = document.querySelectorAll(".border-input"),
                            currInput = dom[index],
                            nextInput = dom[index + 1],
                            lastInput = dom[index - 1];
                        // console.log(el.target.getAttribute('maxlength'));
                        if (el.target.value.length == el.target.getAttribute('maxlength') && index < 4) {
                            if (isText.test(el.target.value)) {
                                // this.cardNum.push(el.target.value)
                                if (el.target.value.length == el.target.getAttribute('maxlength') && index < 3) {
                                    nextInput.focus();
                                }
                            }
                        }
                        if (el.target.value.length == el.target.getAttribute('maxlength') && index == 0) {
                            if (isText.test(el.target.value)) {
                                this.cardNum[0] = el.target.value

                                this.passArray.push('t1')
                            }
                        }
                        if (el.target.value.length == el.target.getAttribute('maxlength') && index == 1) {
                            if (isText.test(el.target.value)) {
                                this.cardNum[1] = el.target.value

                                this.passArray.push('t2')
                            }
                        }
                        if (el.target.value.length == el.target.getAttribute('maxlength') && index == 2) {
                            if (isText.test(el.target.value)) {
                                this.cardNum[2] = el.target.value

                                this.passArray.push('t3')
                            }
                        }
                        if (el.target.value.length == el.target.getAttribute('maxlength') && index == 3) {
                            if (isText.test(el.target.value)) {
                                this.cardNum[3] = el.target.value

                                this.passArray.push('t4')
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
                            this.card5ErrMsg = '請填寫正確格式,不得含有特殊字元且需包含@';
                        } else {
                            this.mailErr = false;
                            this.passArray.push('mailTextPass');
                        }
                    },
                },


            })
        })()

        window.addEventListener('scroll', function () {
            let getScrollTop = document.documentElement.scrollTop;
            let header = document.querySelector('header');

            if (getScrollTop > 60) {
                header.classList.add('-active');
            } else {
                header.classList.remove('-active');
            }
        });


window.addEventListener('load', function () {
    // =============== 存取DOM元素 ===============
    // 燈箱
    let memberLink = document.querySelector('.nav-right > li:nth-child(1) > a');
    let lightbox = document.querySelector('#container');
    let lightboxBg = document.querySelector('.lightbox-bg');
    let closeSpan = document.querySelector('.close');
    // 登入
    let memId = document.getElementById('memId');
    let memPsw = document.getElementById('memPsw');
    let signInInput = document.querySelectorAll('.sign-in-container input');
    let signInBtn = document.getElementById('signInSubmit');
    let checkNoticeSignIn = document.querySelectorAll('#signInForm > .notice');

    // 註冊
    let signUpName = document.getElementById('signUpName');
    let signUpEmail = document.getElementById('sigUpEmail');
    let signUpId = document.getElementById('signUpId');
    let signUpPsw = document.getElementById('signUpPsw');
    let pswAgain = document.getElementById('checkPsw');

    let signUpInput = document.querySelectorAll('.sign-up-container input');
    let signUpBtn = document.getElementById('signUpSubmit');
    let checkNotice = document.querySelectorAll('#signUpForm > .notice');

    // 登出
    let logout = document.getElementById('logout');

    // 導覽列
    let memIcon = document.getElementById('memIcon');
    let memInfo = document.getElementById('memInfo');

    // 登入註冊切換
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');


    // =============== 註冊事件聆聽 ===============

    // 載入會員資料
    getLoginData();

    // 燈箱
    closeSpan.addEventListener('click', closeLightbox);
    lightboxBg.addEventListener('click', closeLightbox);

    // 登入
    memId.addEventListener('blur', checkMemIdPsw);
    memPsw.addEventListener('blur', checkMemIdPsw);
    signInBtn.addEventListener('click', sendData);

    // 註冊
    signUpName.addEventListener('blur', checkName);
    signUpId.addEventListener('blur', checkId);
    signUpEmail.addEventListener('blur', checkEmail);
    signUpPsw.addEventListener('blur', checkPsw);
    pswAgain.addEventListener('blur', checkPswAgain);
    pswAgain.addEventListener('input', checkPswTheSame);
    signUpBtn.addEventListener('click', submitMemData);

    // 登出
    logout.addEventListener('click', getLogout);

    // 登入註冊切換
    signUpButton.addEventListener('click', () => { container.classList.add("right-panel-active"); });
    signInButton.addEventListener('click', () => { container.classList.remove("right-panel-active"); });


    // 欄位提示樣式
    function warnStyle(i) {
        signUpInput[i].style.border = '1px solid #f57c35';
        signUpInput[i].addEventListener('focus', function () {
            signUpInput[i].style.border = '0px';
            checkNotice[i].innerText = '';
        });
    }

    // 載入會員資料，更改header狀態
    function getLoginData() {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            let memData = JSON.parse(xhr.responseText);
            // 將資料寫進 指定為memNavInfo的new Vue裡的data
            memNavInfo.memData = memData;

            if (memNavInfo.memData.memberNo) {  // 如果有登入
                console.log(`已登入 會員編號: ${memNavInfo.memData.memberNo}`);

                let memIcon = document.getElementById('memIcon');
                let memInfo = document.getElementById('memInfo');
                let logout = document.getElementById('logout');

                memIcon.style.display = 'none';
                memInfo.style.display = 'block';
                logout.innerText = '登出';
                return false;

            } else {
                console.log('會員未登入');
                let memberLink = document.querySelector('.nav-right > li:nth-child(1) > a');
                console.log(memberLink);
                // 顯示燈箱
                memberLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    lightbox.style.display = 'block';
                    lightboxBg.style.display = 'block';
                    for (let i = 0; i < signInInput.length - 1; i++) {
                        signInInput[i].value = '';
                    }
                    for (let i = 0; i < signUpInput.length - 1; i++) {
                        signUpInput[i].value = '';
                    }
                });

                let memInfo = document.getElementById('memInfo');

                memIcon.style.display = 'block';
                memInfo.style.display = 'none';
                logout.innerText = '';
            }
        }
        xhr.open('get', 'php/getLoginData.php', true);
        xhr.send(null);
    }

    // 關燈箱
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxBg.style.display = 'none';
    }
    // =============== 登入 ===============
    // 確認欄位是否為空
    function checkMemIdPsw() {
        for (let i = 0; i < signInInput.length - 1; i++) {
            // 去除空格( \s空字串 \g全域匹配 ) 
            signInInput[i].value.replace(/\s+/g, '');
        }
        if (memId.value == '' || memId.value == undefined || memId.value == null) {
            checkNoticeSignIn[0].innerText = '尚未輸入帳號';
            signInInput[0].style.border = '1px solid #f57c35';
            signInInput[0].addEventListener('focus', function () {
                signInInput[0].style.border = '0px';
                checkNotice[0].innerText = '';
            });
            console.log(memId.value);
        } else if (memPsw.value == '' || memPsw.value == undefined || memPsw.value == null) {
            checkNoticeSignIn[1].innerText = '尚未輸入密碼';
            signInInput[1].style.border = '1px solid #f57c35';
            signInInput[1].addEventListener('focus', function () {
                signInInput[1].style.border = '0px';
                checkNotice[1].innerText = '';
            });
        }
    }
    // 送出登入資料
    function sendData() {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {  // 是否已有該會員
                if (xhr.responseText.indexOf('無此會員') == -1) {  // 登入成功
                    let membRow = JSON.parse(xhr.responseText);
                    alert(`hello${membRow.memName}, 你好：)`);
                    for (let i = 0; i < signInInput.length - 1; i++) {
                        signInInput[i].value = '';  // 清空欄位
                    }
                    // 關閉燈箱
                    lightbox.style.display = 'none';
                    lightboxBg.style.display = 'none';
                    // 載入會員資料
                    getLoginData();
                } else {
                    alert('帳密錯誤');
                }
            } else {
                alert(xhr.status);
                console.log(xhr.responsetext);
            }
        }
        let url = 'php/login.php';
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        let data_info = `memId=${memId.value}&memPsw=${memPsw.value}`;
        xhr.send(data_info);
    }
    // =============== 註冊 ===============
    for (let i = 0; i < signInInput.length - 1; i++) {
        signInInput[i].value.replace(/\s*/g, '');
    }
    // 檢測欄位為空-姓名
    function checkName() {
        if (signUpName.value == '' || signUpName.value == undefined || signUpName.value == null) {
            checkNotice[0].innerText = '尚未輸入姓名';
            warnStyle(0);
            return false;
        }
    }
    // 驗證mail
    function checkEmail() {
        let mailFormat = /^\w+\@\w+\.[A-Za-z]+$/;
        if (signUpEmail.value == '' || signUpEmail.value == undefined || signUpEmail.value == null) {
            checkNotice[1].innerText = '尚未輸入email';
            warnStyle(1);
            return false;
        } else if (signUpEmail.value.search(mailFormat) == -1) {
            checkNotice[1].innerText = '請輸入正確格式';
            warnStyle(1);
            return false;
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    let res = xhr.responseText;
                    if (res.indexOf('可以使用此email') == -1) {
                        checkNotice[1].innerHTML = `<i class="fas fa-exclamation"></i>${res}`;
                        warnStyle(1);
                    } else {
                        checkNotice[1].innerHTML = `
                        <i class="fas fa-check" style="color: #588ad6;"></i>
                        <span style="color: #588ad6;">${res}</span>
                    `;
                    }
                }
            }
            let url = `php/checkSignUpId.php?memMail=${signUpEmail.value}`;
            xhr.open('get', url, true);
            xhr.send(null);
        }
    }
    // 驗證帳號
    function checkId() {
        if (signUpId.value == '' || signUpId.value == undefined || signUpId.value == null) {
            checkNotice[2].innerText = '尚未輸入帳號';
            warnStyle(2);
            return false;
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    let res = xhr.responseText;
                    if (res.indexOf('可以使用此帳號') == -1) {
                        checkNotice[2].innerHTML = `<i class="fas fa-exclamation"></i>${res}`;
                        warnStyle(2);
                    } else {
                        checkNotice[2].innerHTML = `
                        <i class="fas fa-check" style="color: #588ad6;"></i>
                        <span style="color: #588ad6;">${res}</span>
                    `;
                    }
                }
            }
            let url = `php/checkSignUpId.php?memId=${signUpId.value}`;
            xhr.open('get', url, true);
            xhr.send(null);
        }
    }
    // 驗證密碼
    function checkPsw() {
        let pswFormat = /^(?=.*\d)(?=.*[a-z]).{1,30}$/;
        if (signUpPsw.value == '' || signUpPsw.value == undefined || signUpPsw.value == null) {
            checkNotice[3].innerText = '尚未輸入密碼';
            warnStyle(3);
            return false;
        } else if (signUpPsw.value.search(pswFormat) == -1) {
            checkNotice[3].innerText = '請至少包含各一位英數字';
            warnStyle(3);
            return false;
        }
    }
    // 確認密碼欄位為空
    function checkPswAgain() {
        if (pswAgain.value == '' || pswAgain.value == undefined || pswAgain.value == null) {
            checkNotice[4].innerText = '尚未輸入密碼';
            warnStyle(4);
            return false;
        }
    }
    // 確認密碼相同
    function checkPswTheSame() {
        if (pswAgain.value == signUpPsw.value) {
            checkNotice[4].innerHTML = `
            <i class="fas fa-check" style="color: #588ad6;"></i>
            <span style="color: #588ad6;">密碼輸入正確</span>
        `;
        } else {
            return false;
        }
    }
    // 送出資料
    function submitMemData() {
        let memData = {};  // 空物件，接要傳送的資料
        memData.memName = signUpName.value;
        memData.memMail = signUpEmail.value;
        memData.memId = signUpId.value;
        memData.memPsw = signUpPsw.value;

        if (signUpName.value == '' || signUpEmail.value == '' || signUpId.value == '' || signUpPsw.value == '' || pswAgain.value == '') {
            alert('尚有欄位未填寫');
            return false;
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    alert('註冊成功');
                    console.log(xhr.responseText);
                    for (let i = 0; i < signUpInput.length - 1; i++) {
                        signUpInput[i].value = '';
                        checkNotice[i].style.display = 'none';
                        signUpInput[i].style.border = '0px';
                    }
                } else {
                    alert(xhr.status);
                    console.log(xhr.responsetext);
                }
            }
            let url = 'php/getSignUpMemData.php';
            xhr.open('post', url, true);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            let data_info = `memId=${signUpId.value}&memPsw=${signUpPsw.value}&memName=${signUpName.value}&memMail=${signUpEmail.value}`;
            xhr.send(data_info);
        }
    }

    // =============== 登出 ===============
    function getLogout() {
        if (memNavInfo.memData.memberNo) {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    alert(xhr.responseText);
                    getLoginData();
                }
            }
            let url = 'php/logout.php';
            xhr.open('get', url, true);
            xhr.send(null);
        }
    }
});
    </script>

</body>

</html>