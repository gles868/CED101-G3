<?php

        // 判斷是否有登入
        session_start();
        $lovedrow = array();
        require_once "./php/connect_ced101g3.php";
        if(isset($_SESSION["memberNo"])){
            $sql = "select * from course_list where memberNo = ?"; 
            $getlovedCourse = $pdo->prepare($sql);
            $getlovedCourse->bindValue(1, $_SESSION["memberNo"]);
            $getlovedCourse->execute();
            $lovedCourseRow = $getlovedCourse->fetchAll();(PDO::FETCH_ASSOC);

            for($k=0;$k<count($lovedCourseRow);$k++){
                array_push($lovedrow,$lovedCourseRow[$k]["courseNo"]);
                // echo $lovedCourseRow[$k]["courseNo"];
            }
        }else{
            $lovedrow = [];
        };
        //判斷是否有收藏
       require_once "./php/connect_ced101g3.php";
        $sql = "select * from course where courseNo = ? ";
        $allcourse = $pdo->prepare($sql);
        $allcourse->bindValue(1, $_GET["courseNo"]);
        $allcourse->execute();
        $courseRow = $allcourse->fetch(PDO::FETCH_ASSOC);
   
        if(in_array($_GET["courseNo"],$lovedrow)){
            $res = " loved";
        }else{
            $res = "";
        };


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
    <link rel="shortcut icon" href="img/favicon-logo.ico" type="image/x-icon">
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
                    <li id="cartlink">
                        <a href="cart.html"><i class="fas fa-shopping-cart fa-lg"></i></a>
                    </li>                </ul>
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
                <div class="notice"></div>
                <div class="notice"></div>
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



    <main class="main" id="app">
        <my-count></my-count>
        <section class="course_info">
            <div class="course_card_block">
                <div  class="center-content">
                    
                    <div class="heart<?=$res?>" @click="changeHeart" data-course="classRow.courseNo">
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

        <section class="calendar">
            <p class="calendar_title">請點擊課程報名 <i class="fas fa-arrow-circle-down"></i>
            </p>
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
                        </a>
                        <p class="name"><?=$data[$i][$j+1]?></p>
                  
                    </div>

                  <?php 
                  }
                  ?>

                </div>

                <?php  
                }
                ?> 

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
        <p>
            copyright©2021 CED101G3 麻瓜特訓班.All Rights Reserved
        </p>
        <p>
            本網站為緯育TibaMe_前端設計工程師班第63期學員專題成果作品 -
            <a href="">參考資源</a>
        </p>
        <p>
            <a href="https://tibamef2e.com"></a>
            為緯育TibaMe提供給[Web/APP前端設計工程師養成班]學員展示作品之平台，若有侵權疑慮，請私訊<a href="https://www.facebook.com/webindex/">［TibaMe-前端設計工程師養成班］</a>
        </p>
    </footer>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js"></script>
    <script src="./js/course/fullCalnedar/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <script src="./js/login.js"></script>
    <script src="./js/course/singleCourse.js"></script>


    <script>
        let memNavInfo = new Vue({
            el: '#memInfo',
            data: {
                memData: {},
            },
        })

        let storage = sessionStorage;
  if (storage['count'] == null) {
    storage['count'] = '0';
  }

  Vue.component('my-count', {
    data() {
      return {
        count: 0,
      };
    },
    props: [],
    template: `
    <div class="num_icon">
        <div class="num_text">{{count}}</div>
    </div>
            `,

    methods: {
      //判斷 目前的購物車中 商品數量
      checked_count() {
        let storage = sessionStorage;
        //判斷 目前有多少商品
        if (storage.getItem('count') == 0) {
          // console.log('沒切割')
        } else {
          console.log('切割');
          this.count = storage.getItem('count');
        }
        // console.log('有幾個')
      },
    },
    created() { },
    mounted() {
      this.checked_count();
    },
  });


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


        //滾動header變色
        window.addEventListener('scroll', function () {
                let getScrollTop = document.documentElement.scrollTop;
                let header = document.querySelector('header');
                let carticon = document.querySelector('.num_icon');
                if (getScrollTop > 10) {
                    header.classList.add('-active');
                    carticon.classList.add('-icon');
                } else {
                    header.classList.remove('-active');
                    carticon.classList.remove('-icon');
                }
            });

    </script>
</body>

</html>