$(function () {
    // hamburger icon 的切換
    $("button.hamburger").on("click", function () {
      $(this).toggleClass("is-active");
    });
});

$(function () {
    // 點擊按鈕，選單縮放
    $("button.hamburger").on("click", function () {
      $("ul.left-block").slideToggle();
    });
});