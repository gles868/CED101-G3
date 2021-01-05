// 會員主要選單切換 我的課程|我的收藏|歷史訂單|個人資料 
$(document).ready(function(){
    $(".memMenuOut>button").click(function(){
        $(".menuCG").each(function(){
            $(this).css({
                display: "none",
            });
        });
        let id = $(this).attr('id');
        $(`.${id}`).css({
            display: "block",
        });
        $(".memMenuOut>button").each(function(){
            $(this).css({
                backgroundColor: "rgba(255, 255, 255, 0)",
                color: "white",
            });
        });
        $(this).css({
            backgroundColor: "white",
            color: "black",
        })
    });
});


//我的課程切換 查看課表時間|課程清單
$(document).ready(function(){
    $(".memMainAreaClass>div").click(function(){
        $(".courseCG").each(function(){
            $(this).css({
                display: 'none',
            });
        });
        let id = $(this).attr('id');
        $(`.${id}`).css({
            display: 'block',
        });

        $(".memMainAreaClass>div").each(function(){
            $(this).css({
                backgroundColor: "gray",
                color: "white",
                boxShadow:"none",
                
            });
        })
        $(this).css({
            backgroundColor: "white",
                color: "black",
                boxShadow: "0 0 0.2em white, 0 0 0.4em white, 0 0 0.3em white",
        })
    });
});

//查看課表時間fullcalendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialDate: '2021-01-01',
      editable: true,
      selectable: true,
      businessHours: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2020-09-01'
        },
        {
          title: 'Long Event',
          start: '2020-09-07',
          end: '2020-09-10'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2020-09-09T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2020-09-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2020-09-11',
          end: '2020-09-13'
        },
        {
          title: 'Meeting',
          start: '2020-09-12T10:30:00',
          end: '2020-09-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2020-09-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2020-09-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2020-09-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2020-09-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2020-09-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2020-09-28'
        }
      ]
    });

    calendar.render();
  });

  
//課程清單切換 已報名|已完課|上課中
$(document).ready(function () {
  $('#tab>ul>li').click(function () {
      $('.con').each(function () {
          $(this).css({
              display: 'none',
          });
      });
      let id = $(this).attr('id');
      $(`.${id}`).css({
          display: 'block',
      });

      $('#tab>ul>li').each(function () {
          $(this).css({
              textShadow: "none",
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0)',
          });
      });

      $(this).css({
          textShadow: "0 0 0.2em rgb(211, 211, 65), 0 0 0.4em rgb(214, 29, 183), 0 0 0.3em #5f93c4",
          color: 'white',
          backgroundColor: 'rgba(170, 170, 170, 0.5)',
      });
  });
});

//課程清單 -> 已報名 -> 取消報名
$(document).ready(function(){
    $(".courseCancel>button").click(function(){
        $(this).parent().parent(".CRD").remove()
    });
});

// 我的收藏切換 課程|商品
$(document).ready(function () {
    $('#memKeepTitle>ul>li').click(function () {
        $('.memcon').each(function () {
            $(this).css({
                display: 'none',
            });
        });
        let id = $(this).attr('id');
        $(`.${id}`).css({
            display: 'block',
        });
  
        $('#memKeepTitle>ul>li').each(function () {
            $(this).css({
                textShadow: "none",
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0)',
            });
        });
  
        $(this).css({
            textShadow: "0 0 0.2em rgb(211, 211, 65), 0 0 0.4em rgb(214, 29, 183), 0 0 0.3em #5f93c4",
            color: 'white',
            backgroundColor: 'rgba(170, 170, 170, 0.5)',
        });
    });
  });

  //我的收藏 -> 課程 -> 取消收藏
$(document).ready(function(){
    $(".MKC_cancel>button").click(function(){
        $(this).parent().parent().parent(".CRD").remove()
    });
});

//個人資料修改切換
$(document).ready(function(){
    $('#memInfoCG').click(function(){
        $('.MIF_Default').each(function(){
            $(this).css({
                display: "none",
            });
        });
        let id = $(this).attr('id');
        $(`.${id}`).css({
            display: 'block',
        });
    })
});

//評論本課點選icon切換
$(document).ready(function() {
    var input = $('input');
var button = $('#button-container');
input.focus(function() {
  button.addClass('show');
});
input.focusout(function() {
  if(!input.val()) {
       button.removeClass('show');
                  }
});
});
