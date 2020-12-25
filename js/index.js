// $(function () { // wait for document ready
    // 創建一個scrollMagic的控制器
    var controller = new ScrollMagic.Controller();

    // define movement of panels
    var tl1 = new TimelineMax({ease: Power2.easeOut});  // 過渡效果的速度曲線（緩動效果）
    var tl2 = new TimelineMax({paused: true});  // true:停止動畫時間軸，以滾動取代動畫的執行  // 如果設置為true，時間軸將在創建時立即暫停

    // 載入頁面時的動畫 -> 倒退動作
    tl1.from( '.lay01', 1 , { scale: 6, y: 100 } )
    .from( '.lay02', 1 , { scale: 3, y: 80 }, 0 )
    .from( '.lay03', 2 , { y: 100, autoAlpha: 0 }, 0 )
    .from( '.lay04', 1 , { scale: 1.3, y: 60 }, 0 )
    .from( '.lay05', 1 , { scale: 1.1, y: 0 }, 0 )
    .from( '.lay06', 4 , { scale: 1.05 }, 0 );

    // 滾動時進行的動畫
    tl2.to( '.lay01', 1 , { scale: 1.2, y: 75, autoAlpha: 1 } )
    .to( '.lay02', 1 , { scale: 1.05, y: 50, autoAlpha: 1 }, 0 )
    .to( '.lay03', 1 , { y: 50, autoAlpha: 0.5 }, 0 )
    .to( '.lay04', 1 , { scale: 1.025, y: 5, autoAlpha: 1 }, 0 )
    .to( '.lay05', 1 , { scale: 1.02, autoAlpha: 1 }, 0 )
    .to( '.lay06', 1 , { scale: 1.02, autoAlpha: 1 }, 0 )
    .add('startFade')
    .to( '#pinContainer', 1 , { autoAlpha: 0 }, 'startFade' )
    .to( '.lay01', 1 , { scale: 1.4, y: 150, autoAlpha: 0 }, 'startFade' )
    .to( '.lay02', 1 , { scale: 1, y: 270, autoAlpha: 0 }, 'startFade' )
    .to( '.lay03', 1 , { y: 0, autoAlpha: 1 },  'startFade' )
    .to( '.lay04', 1 , { scale: 1.1, y: 10, autoAlpha: 0 }, 'startFade' )
    .to( '.lay05', 1 , { scale: 1.01, y: 20, autoAlpha: 0 }, 'startFade' )
    .to( '.lay06', 1 , { scale: 1.01, autoAlpha: 0 }, 'startFade' );

    // create scene to pin and link animation
    // new ScrollMagic.Scene({
    //     triggerElement: "#aa",
    //     triggerHook: 0.5,
    //     duration: "500%"
    // })
    // .setPin("#pinContainer")
    // .setTween(tl2)
    // .addIndicators() // add indicators (requires plugin)
    // .addTo(controller);

    $(window).scroll( function(){
        var st = $(this).scrollTop();
        var sh = $('#pinContainer').outerHeight();
        if( st < sh ){
          windowScroll = st/sh;
          if( windowScroll > 0 ){
            tl2.progress( windowScroll );
          }				
        }
    });

// });


// $(function () { // wait for document ready
//     // 創建一個scrollMagic的控制器
//     var controller = new ScrollMagic.Controller();

//     // define movement of panels
//     // 創建一個TimelineMax的物件
//     var wipeAnimation = new TimelineMax()
//         .fromTo("section.first.two", 1, {x: "100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
//         // .fromTo("section.first.two", 1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
//         // .fromTo("section.panel.bordeaux", 1, {y: "-100%"}, {y: "0%", ease: Linear.easeNone}); // in from top

//     // create scene to pin and link animation
//     new ScrollMagic.Scene({
//             triggerElement: "#pinContainer",  // 觸發點
//             triggerHook: "onLeave",
//             duration: "1500px",  // 動畫執行的範圍(單位px | %) -- end  // 執行範圍內，動畫跟著卷軸進行；沒有duration時，直接播放完成
//             // reverse: false,
//         })
//         .setClassToggle(".first.two", "-on")  // 動態塞css進來 - setClassToggle('選到物件', '要放的屬性')
//         .setPin("#pinContainer")
//         .setTween(wipeAnimation)
//         .addIndicators() 
//         .addTo(controller);  // assign the scene to the controller
// });

// jQuery(function() { 
//     var controller = new ScrollMagic.Controller(); 
//     var tween = TweenMax.to('#boxAnim', 1, {
//         className: '+=animate'
//     }); 
//     var scene = new ScrollMagic.Scene({
//         triggerElement: '#trigger', 
//         duration: 300, 
//         triggerHook: 0
//     }) 
//     .setTween(tween) 
//     .addTo(controller); 
    
//     var height = $(window).outerHeight(); 
//     $('.height').append(height); 
// }); 