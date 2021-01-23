

window.addEventListener('load', function () {


  // 卡片翻轉
  $(function () {
    $('.card').flip({
      axis: 'y',
      speed: 650,
      trigger: 'hover'
    });
  });


  //動畫效果
  gsap.to('.teacher_img', { y: 30, duration: 2, ease: Power1.easeInOut, repeat: -1, yoyo: true });
  gsap.to('.light', { rotation: 360, duration: 10, ease: Power0.easeInOut, repeat: -1, zIndex: -5 });
  gsap.to('.course_card', { y: 10, duration: 2, ease: Power1.easeInOut, repeat: -1, yoyo: true, zIndex: 10 });
})