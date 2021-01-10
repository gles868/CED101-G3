
//卡片翻轉
$(function () {
  $('.card').flip({
      axis: 'y',
      speed: 650,
      trigger: 'hover'
  });
});

//愛心
$(".heart").click(function () {
  $(this).toggleClass("loved");
});


//動畫效果
gsap.to('.teacher_img', {y: 30, duration: 2,  ease: Power1.easeInOut,repeat: -1, yoyo: true});
gsap.to('.light', {rotation: 360, duration: 10,ease: Power0.easeInOut,repeat: -1, zIndex: -5});
gsap.to('.course_card', {y: 10, duration: 2, ease: Power1.easeInOut,repeat: -1, yoyo: true, zIndex: 10});




//fullCanlendar

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
      },
      initialDate: '2020-12-01',
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      selectable: true,
      events: [
        
      ]
    });

    calendar.render();
  });