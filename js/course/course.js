
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
gsap.to('.img_bat', {y: 20, duration: 2, repeat: -1, yoyo: true});

//卡片翻轉
$(function () {
    $('.card').flip({
        axis: 'y',
        speed: 650,
        trigger: 'hover'

    });
});

