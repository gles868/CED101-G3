window.addEventListener("load", function () {

    //產生課程卡片
    let courseRows;
    function showCourse() {
        let result = '';
        for (let i = 0; i < courseRows.length; i++) {
            result += `
<div class="card">
    <p class="course_title">${courseRows[i].courseName}</p>
    <div class="center-content">
        <div class="heart">
            <div class="heart-inner"></div>
        </div>
    </div>
    <div class="front">
        <img class="front_card" src="${courseRows[i].courseImg}" alt="">
    </div>
    <div class="back">
        <a href="singleCourse.php?courseNo=${courseRows[i].courseNo}"><img class="back_card" src="./img/course_cards/card_back.png"
                dalt=""></a>
        <p class="course_price">$ ${courseRows[i].coursePrice}</p>
        <p class="course_class">屬性： ${courseRows[i].courTypeName}</p>
        <a href="./registration.html">
            <p class="registration">立即報名</p>
        </a>
    </div>
</div>

`;
        }
        document.getElementById("course_block").innerHTML = result;
    }

    //取出json陣列

    // function getCourse(courTypeName) {
    //     $.ajax({
    //         url: `getCourse.php?courTypeName=${courTypeName}`,
    //         type: 'GET',
    //         dataType: "json",
    //         success(data) {
    //             courseRows = data;
    //             showCourse();
    //         },
    //     });
    // }
    let xhr = new XMLHttpRequest();
    function getCourse(courTypeName) {
        xhr.onload = function () {
            courseRows = JSON.parse(xhr.responseText);
            showCourse();
            console.log(courseRows);
        }
        xhr.open("get", `getCourse.php?courTypeName=${courTypeName}`, false);
        xhr.send(null);
        console.log(courTypeName);
    }

    getCourse('');

    //在按鈕上綁定click事件
    let courseTypeBtn = document.getElementsByClassName("courseType")
    for (let i = 0; i < courseTypeBtn.length; i++) {
        courseTypeBtn[i].addEventListener('click', function (e) {

            let courTypeName = this.innerText; //攻擊型 防禦型 輔助型
            console.log(courTypeName);
            getCourse(courTypeName);
            // console.log(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling);
        })
    }




    //slick輪播
    $('.sliderboard').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000
    });


    //愛心切換
    $(".heart").click(function () {
        $(this).toggleClass("loved");
    });

    //蝙蝠浮動
    gsap.to('.img_bat', { y: 20, duration: 2, repeat: -1, yoyo: true });

    //卡片翻轉

    $('.card').flip({
        axis: 'y',
        speed: 650,
        trigger: 'hover'
    });


});
