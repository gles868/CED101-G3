$(document).ready(function(){
    $( "#scrollPage" ).fullpage({
        // 參數設定
        navigation: true, // 顯示導行列
        navigationPosition: "right", // 導行列位置
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],  // 定義導航的錨文字 // → http://127.0.0.1:5502/teacher.html#firstPage
        // navigationTooltips: ['A老師', 'B老師', 'C老師', 'D老師', 'E老師', 'F老師'],
        // showActiveTooltip: true,
    });
});

// $(document).on('click', '.report', function(){  //使用$(document).on()的原因是如果id為submit的按鈕是一開始沒有載入、透過ajax互動後才產生的DOM，那用$().click會抓不到，需以$(document).on()才行
//     var name = $('#reportReason').val();
//     $.ajax({
//         url :'../../php/report.php',
//         method: 'POST',
//         data: {
//           name: name
//         },
//     //    success:function(res){
//     //     }
//     })
// })