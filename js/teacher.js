$(function(){
    $( "#scrollPage" ).fullpage({
        // 參數設定
        navigation: true, // 顯示導行列
        navigationPosition: "right", // 導行列位置
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],  // 指定每個 section 的頁內位置  // → http://127.0.0.1:5502/teacher.html#firstPage
        navigation: true,
    });
});
