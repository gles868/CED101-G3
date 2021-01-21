window.addEventListener("load", function () {

    let classRows;
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        app.classRows = JSON.parse(xhr.responseText);
        console.log(app.classRows);
    }
    xhr.open('get', 'php/getCourse.php', true);
    xhr.send(null);

    // let lovedCourse;
    // let xhc = new XMLHttpRequest();
    // xhc.onload = function () {
    //     app.lovedCourse = JSON.parse(xhc.responseText);
    //     console.log(app.lovedCourse);
    // }
    // xhc.open('get', 'getMemCourse.php', true);
    // xhc.send(null);


    //產生課程卡片
    //     let courseRows;
    //     function showCourse() {
    //         let result = '';
    //         let goBtn = document.querySelectorAll('.registration');
    //         for (let i = 0; i < courseRows.length; i++) {
    //             result += `
    // <div class="card">
    //     <p class="course_title">${courseRows[i].courseName}</p>
    //     <div class="center-content">
    //         <div class="heart">
    //             <div class="heart-inner"></div>
    //         </div>
    //     </div>
    //     <div class="front">
    //         <img class="front_card" src="${courseRows[i].courseImg}" alt="">
    //     </div>
    //     <div class="back">
    //         <a href="singleCourse.php?courseNo=${courseRows[i].courseNo}"><img class="back_card" src="./img/course_cards/card_back.png"
    //                 dalt=""></a>
    //         <p class="course_price">$ ${courseRows[i].coursePrice}</p>
    //         <p class="course_class">屬性： ${courseRows[i].courTypeName}</p>
    //         <a href="./registration.html">
    //             <p class="registration">立即報名</p>
    //         </a>
    //     </div>
    // </div>
    // `;
    //             // var goBtn = document.querySelectorAll('.registration');

    //         }
    //         document.getElementById("course_block").innerHTML = result;
    //     }

    //取出json陣列
    // function getCourse(courTypeName) {
    //     let xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //         courseRows = JSON.parse(xhr.responseText);
    //         showCourse();
    //         console.log(courseRows);
    //     }
    //     xhr.open("get", `getCourse.php?courTypeName=${courTypeName}`, false);
    //     xhr.send(null);
    //     console.log(courTypeName);
    // }

    // getCourse();

    //在按鈕上綁定click事件
    let courseTypeBtn = document.getElementsByClassName("courseType")
    for (let i = 0; i < courseTypeBtn.length; i++) {
        courseTypeBtn[i].addEventListener('click', function () {

            let courTypeName = this.innerText; //攻擊型 防禦型 輔助型
            console.log(courTypeName);
            getCourse(courTypeName);
        })
    }

<<<<<<< HEAD
=======
    //在課程類別按鈕上綁定click事件
    let priceBtn = document.getElementsByClassName("coursePrice")
    for (let i = 0; i < priceBtn.length; i++) {
        priceBtn[i].addEventListener('click', function () {
            let coursePrice = this;
            console.log(coursePrice);
            // getCourse(coursePrice);

        })
    }
>>>>>>> chu

    //slick輪播
    $('.sliderboard').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000
    });


<<<<<<< HEAD
    //愛心切換
    // $(".heart").click(function () {
    //     $(this).toggleClass("loved");
    // });
=======
    // slick輪播
    $('.sliderboard').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000
    });
>>>>>>> chu

    //蝙蝠浮動
    gsap.to('.img_bat', { y: 20, duration: 2, repeat: -1, yoyo: true });




});
