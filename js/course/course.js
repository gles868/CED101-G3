
window.addEventListener("load", function () {



    function getCourse(courTypeName) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            app.classRows = JSON.parse(xhr.responseText);
            console.log(app.classRows);
        }
        xhr.open("get", `getCourse.php?courTypeName=${courTypeName}`, false);
        xhr.send(null);
        console.log(courTypeName);
    }

    getCourse('');

    //在課程類別按鈕上綁定click事件
    let courseTypeBtn = document.getElementsByClassName("courseType")
    for (let i = 0; i < courseTypeBtn.length; i++) {
        courseTypeBtn[i].addEventListener('click', function () {

            let courTypeName = this.id; //攻擊型 防禦型 輔助型
            console.log(courTypeName);
            getCourse(courTypeName);
        })
    }

    //在課程類別按鈕上綁定click事件
    let priceBtn = document.getElementsByClassName("coursePrice")
    for (let i = 0; i < priceBtn.length; i++) {
        priceBtn[i].addEventListener('click', function () {
            let coursePrice = this.id;
            console.log(coursePrice);
            getCourse(coursePrice);

        })
    }



    // // slick輪播
    // $('.sliderboard').slick({
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     autoplay: true,
    //     autoplaySpeed: 3000
    // });


    //蝙蝠浮動
    gsap.to('.img_bat', { y: 20, duration: 2, repeat: -1, yoyo: true });


});
