window.addEventListener("load", function () {

    let classRows;
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        app.classRows = JSON.parse(xhr.responseText);
        console.log(app.classRows);
    }
    xhr.open('get', 'php/getCourse.php', true);
    xhr.send(null);
    
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


    //slick輪播
    $('.sliderboard').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000
    });


    //愛心切換
    // $(".heart").click(function () {
    //     $(this).toggleClass("loved");
    // });

    //蝙蝠浮動
    gsap.to('.img_bat', { y: 20, duration: 2, repeat: -1, yoyo: true });




});
