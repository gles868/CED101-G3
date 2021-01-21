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
                    <li><a href="member.html"><i class="fas fa-user-circle fa-lg"></i></a></li>
                    <li><a href="cart.html"><i class="fas fa-shopping-cart fa-lg"></i></a></li>
                </ul>
            </div>
        </nav>
    </header>



    <main class="main">

	 <section class="course_info">
            <div class="course_card_block">
                <img class="course_card" src="<?=$courseRow["courseImg"]?>" alt="" class="card">
                <img class="light" src="./img/course_cards/singel_class/light.png" alt="">
            </div>
            <div class="info_block">
                <p class="course_name"> <?=$courseRow["courseName"]?> </p>
                <p class="course_content"> <?=$courseRow["courseDescription"]?> </p>
                <img class="white_bg" src="./img/course_cards/white-bg01.png" alt="">
            </div>
        </section>

        <section class="calendar" id="app">
            <div id='calendar'></div>
        </section>


        <section class="teacher_info">
            <div class="teacher_img_block">
                <img class="teacher_bg" src="./img/course_cards/teacher/teacher-bg.png" alt="">

                <img class="teacher_img" src="img/teacher/<?=$teacherRow["teachImg"]?>" alt="">
                <a href="./teacher.html?teachNo=<?=$teacherRow["teachNo"]?>">
                    <p class="register">教師資訊</P>
                </a>
            </div>
            <div class="teacher_info_block">
                <img class="white_bg" src="./img/course_cards/white-bg01.png" alt="">
                <p class="teacher_name"> <?=$teacherRow["teachName"]?> </p>

                <p class="teacher_content"> <?=$teacherRow["teachDescription"]?></p>
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
                    <a href="mall.html">
                    <img src="<?=$data[$i][$j]?>" alt="">
                    <p class="name"><?=$data[$i][$j+1]?></p>
                    </a>

                  <?php 
                  }
                  ?>

                </div>

                <?php  
                }
                ?>


                <!-- <div class="single_accessory">
                    <img src="<?=$data[0][0]?>" alt="">
                    <p class="name"><?=$data[0][1]?></p>
                </div>
                <div class="single_accessory">
                    <img src="<?=$data[1][0]?>" alt="">
                    <p class="name"><?=$data[1][1]?></p>
                </div>

                <div class="single_accessory">
                    <img src="<?=$data[2][0]?>" alt="">
                    <p class="name"><?=$data[2][1]?></p>
                </div> -->

            </div>

        </section>

        <section class="course_container">
            <p>其他課程</p>
            <div class="titleimg_block">
                <img class="white_title" src="./img/course_cards/title-white-line.png" alt="">
            </div>

            <div class="course_cards">

                <div class="card">
                    <p class="course_title"><?=$cardData[0][0]?></p>

                    <div class="front">
                        <img class="front_card" src="<?=$cardData[0][1]?>" alt="">
                    </div>
                    <a href="singleCourse.php?courseNo=<?=$cardData[0][4]?>">
                    <div class="back">
                        <img class="back_card" src="./img/course_cards/card_back.png" alt="">
                        <p class="course_price">$<?=$cardData[0][2]?></p>
                        <p class="course_class">屬性：<?=$cardData[0][3]?></p>
                    </div>
                    </a>
                </div>

                <div class="card">
                    <p class="course_title"><?=$cardData[1][0]?></p>

                    <div class="front">
                        <img class="front_card" src="<?=$cardData[1][1]?>" alt="">
                    </div>
                    <a href="singleCourse.php?courseNo=<?=$cardData[1][4]?>">
                    <div class="back">
                        <img class="back_card" src="./img/course_cards/card_back.png" alt="">
                        <p class="course_price">$<?=$cardData[1][2]?></p>
                        <p class="course_class">屬性：<?=$cardData[1][3]?></p>
                    </div>
                    </a>
                </div>

                <div class="card">
                    <p class="course_title"><?=$cardData[2][0]?></p>
                    <div class="front">
                        <img class="front_card" src="<?=$cardData[2][1]?>" alt="">
                    </div>
                    <a href="singleCourse.php?courseNo=<?=$cardData[2][4]?>">
                    <div class="back">
                        <img class="back_card" src="./img/course_cards/card_back.png" alt="">
                        <p class="course_price">$<?=$cardData[2][2]?></p>
                        <p class="course_class">屬性：<?=$cardData[2][3]?></p>
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
    <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js'></script>

    <script>
    let app = new Vue({
            el: '#app',
            data:{
                group_ord_no:"",
                info:"",
            },
            created(){
                //切割字串
            this.group_ord_no = window.location.search.split("=")[1];
            this.get_mar()
            },
            mounted() {
                // this.test();
            },

            methods: {
                click (){
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
                test(){

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
            },
        })

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