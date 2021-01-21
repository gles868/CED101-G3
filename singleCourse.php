<?php

        //取得課程資訊
        require_once "./php/connect_ced101g3.php";
        $sql = "select * from course where courseNo = ? ";
        $allcourse = $pdo->prepare($sql);
        $allcourse->bindValue(1, $_GET["courseNo"]);
        $allcourse->execute();
        $courseRow = $allcourse->fetch(PDO::FETCH_ASSOC);
        //取得教師資訊
        require_once "./php/connect_ced101g3.php";
        $sql = "SELECT * from course JOIN class on course.courseNo = class.courseNo
                            JOIN teacher on class.teachNo = teacher.teachNo
                            WHERE course.courseNo = ? ";
        $allteacher = $pdo->prepare($sql);
        $allteacher->bindValue(1, $_GET["courseNo"]);
        $allteacher->execute();
        $teacherRow = $allteacher->fetch(PDO::FETCH_ASSOC);
        //取得課程道具
        require_once "./php/connect_ced101g3.php";
        $sql = "SELECT c.courseNo, p.proImg, p.proName
                    from course c join product p on c.courseNo = p.courseNo
                    where c.courseNo = ?";
        $allproduct = $pdo->prepare($sql);
        $allproduct->bindValue(1, $_GET["courseNo"]);
        $allproduct->execute();
        $productRow = $allproduct->fetchAll(PDO::FETCH_ASSOC);

        $data = array();
        foreach ($productRow as $row) {
            $data[] = array(
                $row['proImg'],
                $row['proName'],
            );
        }
        //取得推薦課程
        require_once "./php/connect_ced101g3.php";
        $sql = "select c.courseNo, c.courseName, c.courseImg, c.coursePrice, t.courTypeName
                    from course c join coursetype t on c.courTypeNo = t.courTypeNo
                    order by rand() LIMIT 3";
        $allcard = $pdo->prepare($sql);
        // $allcard->bindValue(1, $_GET["courseNo"]);
        $allcard->execute();
        $cardRow = $allcard->fetchAll(PDO::FETCH_ASSOC);

        $cardData = array();
        foreach ($cardRow as $row) {
            $cardData[] = array(
                $row['courseName'],
                $row['courseImg'],
                $row['coursePrice'],
                $row['courTypeName'],
                $row['courseNo'],
            );
        }

?>




<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <link href="./css/singleCourse.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link href="./js/course/fullCalnedar/main.css" rel="stylesheet">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js'></script>

    <title>單一課程</title>
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



    <main class="main">

        <section class="course_info">
            <div class="course_card_block">
                <div id="app" class="center-content">
                    <div class="heart" @click="changeHeart" data-course="classRow.courseNo">
                        <div class="heart-inner" id=<?=$courseRow["courseNo"]?> @click="addFavourite"></div>
                    </div>
                </div>
                <img class="course_card" src="<?=$courseRow["courseImg"]?>" alt="" class="card">
                <img class="light" src="./img/course_cards/singel_class/light.png" alt="">
            </div>
            <div class="info_block">
                <p class="course_name">
                    <?=$courseRow["courseName"]?>
                </p>
                <p class="course_content">
                    <?=$courseRow["courseDescription"]?>
                </p>
                <img class="white_bg" src="./img/course_cards/white-bg01.png" alt="">
            </div>
        </section>

        <section class="calendar" id="app">
            <p class="calendar_title">請點擊課程報名</p>
            <div id='calendar'></div>
        </section>

        <section class="teacher_info">
            <div class="teacher_img_block">
                <img class="teacher_bg" src="./img/course_cards/teacher/teacher-bg.png" alt="">

                <img class="teacher_img" src="img/teacher/<?=$teacherRow["teachImg"]?>" alt="">
                <a href="./singleTeacher.html?teachNo=<?=$teacherRow["teachNo"]?>">
                    <p class="register">教師資訊</P>
                </a>
            </div>
            <div class="teacher_info_block">
                <img class="white_bg" src="./img/course_cards/white-bg01.png" alt="">
                <p class="teacher_name">
                    <?=$teacherRow["teachName"]?>
                </p>

                <p class="teacher_content">
                    <?=$teacherRow["teachDescription"]?>
                </p>
            </div>
        </section>

        <section class="accessory_container">
            <p class="title">課程所需道具</p>
            <div class="titleimg_block">
                <img class="white_title" src="./img/course_cards/title-white-line.png" alt="">
            </div>

            <div class="accessories_needed">
                
            <?php
                for($i = 0; $i < count($data); $i++){
            ?>
                <div class="single_accessory">

                    <?php
                    for($j =0; $j < 1; $j++){
                    ?>
                    <div class="accessory_block">
                    <a href="mall.html">
                    <img src="<?=$data[$i][$j]?>" alt="">
                    <p class="name"><?=$data[$i][$j+1]?></p>
                    </a>
                    </div>

                  <?php 
                  }
                  ?>

                </div>

                <?php  
                }
                ?> 
                <!-- <div class="single_accessory">
                    <div class="accessory_block">
                        <a href="mall.html">
                            <img src="img/props/p8.png" alt="">
                            <p class="name">大蜘蛛</p>
                        </a>
                    </div>

                </div>
                <div class="single_accessory">
                    <div class="accessory_block">
                        <a href="mall.html">
                            <img src="img/props/p8.png" alt="">
                            <p class="name">大蜘蛛</p>
                        </a>
                    </div>
                </div> -->

        </section>

        <section class="course_container">
            <p>其他課程</p>
            <div class="titleimg_block">
                <img class="white_title" src="./img/course_cards/title-white-line.png" alt="">
            </div>

            <div class="course_cards">

                <div class="card">
                    <p class="course_title">
                        <?=$cardData[0][0]?>
                    </p>

                    <div class="front">
                        <img class="front_card" src="<?=$cardData[0][1]?>" alt="">
                    </div>
                    <a href="singleCourse.php?courseNo=<?=$cardData[0][4]?>">
                        <div class="back">
                            <img class="back_card" src="./img/course_cards/card_back.png" alt="">
                            <p class="course_price">$
                                <?=$cardData[0][2]?>
                            </p>
                            <p class="course_class">屬性：
                                <?=$cardData[0][3]?>
                            </p>
                        </div>
                    </a>
                </div>

                <div class="card">
                    <p class="course_title">
                        <?=$cardData[1][0]?>
                    </p>

                    <div class="front">
                        <img class="front_card" src="<?=$cardData[1][1]?>" alt="">
                    </div>
                    <a href="singleCourse.php?courseNo=<?=$cardData[1][4]?>">
                        <div class="back">
                            <img class="back_card" src="./img/course_cards/card_back.png" alt="">
                            <p class="course_price">$
                                <?=$cardData[1][2]?>
                            </p>
                            <p class="course_class">屬性：
                                <?=$cardData[1][3]?>
                            </p>
                        </div>
                    </a>
                </div>

                <div class="card">
                    <p class="course_title">
                        <?=$cardData[2][0]?>
                    </p>
                    <div class="front">
                        <img class="front_card" src="<?=$cardData[2][1]?>" alt="">
                    </div>
                    <a href="singleCourse.php?courseNo=<?=$cardData[2][4]?>">
                        <div class="back">
                            <img class="back_card" src="./img/course_cards/card_back.png" alt="">
                            <p class="course_price">$
                                <?=$cardData[2][2]?>
                            </p>
                            <p class="course_class">屬性：
                                <?=$cardData[2][3]?>
                            </p>
                        </div>
                    </a>
                </div>

            </div>

        </section>

    </main>



    <footer>
        <p>copyright©2020 CED101_G3 麻瓜特訓班.All Rights Reserved</p>
    </footer>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js"></script>
    <script src="./js/course/fullCalnedar/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <script src="./js/course/singleCourse.js"></script>
    <!-- <script src="./js/login.js"></script> -->

    <script>
        let memNavInfo = new Vue({
            el: '#memInfo',
            data: {
                memData: {},
            },
        })
        let app = new Vue({
            el: '#app',
            data: {
                group_ord_no: "",
                info: "",
            },
            created() {
                //切割字串
                this.group_ord_no = window.location.search.split("=")[1];
                this.get_mar()
            },
            mounted() {
                // this.test();
            },

            methods: {
                click() {
                    alert('hi')
                },
                get_mar: async function () {

                    // this.group_ord_no = window.location.search.split("=")[1];


                    // console.log('send2', drinkno)
                    const res = await fetch('./php/loadCalendar.php', {
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
                            group_ord_no: this.group_ord_no,
                        }), // body data type must match "Content-Type" header
                    }).then(function (data) {
                        return data.json()
                    })
                    // 取回res值後，呼叫另一隻函式
                    this.info = res

                    this.test()

                },
                test() {

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
                        events: this.info
                    });

                    calendar.render();
                },
                addFavourite: function (e) {
                    let heartClass = e.target.parentNode.className;
                    // console.log(heartClass);
                    let courseNo = e.target.id;
                    // console.log(e.target.id);
                    let xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        let memData = JSON.parse(xhr.responseText);
                        console.log(memData);
                        if (memData.memberNo) {  // 如果有登入會員
                            e.target.parentNode.classList.toggle('loved');
                            if (heartClass == 'heart') {
                                // alert('已加入收藏');
                                $.ajax({
                                    method: 'GET',
                                    url: './php/course_addFavourite.php',
                                    type: 'json',
                                    data: `courseNo=${courseNo}`,
                                    success: function (lovedCourse) {
                                        console.log(lovedCourse);
                                    }
                                })

                            } else {
                                $.ajax({
                                    method: 'GET',
                                    url: './php/course_removeFavourite.php',
                                    data: `courseNo=${courseNo}`,
                                })
                            }

                        } else {
                            // 如果未登入，跳出提示燈箱
                            alert('請登入會員');
                        }
                    }
                    xhr.open('get', 'php/getLoginData.php', true);
                    xhr.send(null);

                },
            },
        })

        window.addEventListener('load', function () {
            //取出收藏課程
            function getlovedCourse() {
                $.ajax({
                    method: 'GET',
                    url: './php/getLovedCourse.php',
                    type: 'json',
                    success: function (lovedCourse_load) {
                        console.log(lovedCourse_load);
                    }
                })
            }

            getlovedCourse();

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



        //滾動header變色
        $(window).scroll(function () {
            if ($(this).scrollTop() > 60) {
                $("header").addClass("-active");
            } else {
                $("header").removeClass("-active");
            }
        });

    </script>
</body>

</html>