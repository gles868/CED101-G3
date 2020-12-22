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
          });
      })
      $(this).css({
          backgroundColor: "white",
              color: "black",
      })
  });
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
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0)',
        });
    });

    $(this).css({
        color: 'black',
        backgroundColor: 'white',
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
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0)',
          });
      });

      $(this).css({
          color: 'black',
          backgroundColor: 'white',
      });
  });
});

//我的收藏 -> 課程 -> 取消收藏
$(document).ready(function(){
  $(".MKC_cancel>button").click(function(){
      $(this).parent().parent().parent(".CRD").remove()
  });
});

//個人資料切換