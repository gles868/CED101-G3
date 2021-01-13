
window.addEventListener("load", function () {



    // 取出json陣列
    function getCourse(courTypeName) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            app.classRows = JSON.parse(xhr.responseText);
            // showCourse();
            console.log(app.classRows);
        }
        xhr.open("get", `getCourse.php?courTypeName=${courTypeName}`, false);
        xhr.send(null);
        console.log(courTypeName);
    }

    getCourse('');

    //在按鈕上綁定click事件
    let courseTypeBtn = document.getElementsByClassName("courseType")
    for (let i = 0; i < courseTypeBtn.length; i++) {
        courseTypeBtn[i].addEventListener('click', function () {

            let courTypeName = this.id; //攻擊型 防禦型 輔助型
            console.log(courTypeName);
            getCourse(courTypeName);
            // console.log(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling);
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


    // //愛心切換
    // $(".heart").click(function () {
    //     $(this).toggleClass("loved");
    // });

    //蝙蝠浮動
    gsap.to('.img_bat', { y: 20, duration: 2, repeat: -1, yoyo: true });

    //卡片翻轉

    // $('.card').flip({
    //     axis: 'y',
    //     speed: 650,
    //     trigger: 'hover'
    // });


});
