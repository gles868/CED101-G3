tl1 = new TimelineMax({ease: Power2.easeOut});
tl2 = new TimelineMax({paused:true});

tl1.from( '.lay01', 1 , { scale: 2, y: 100 } )
.from( '.lay02', 1 , { scale: 1.5, y: 80 }, 0 )
.from( '.lay03', 1 , { scale: 1.3, y: 60 }, 0 )
.from( '.lay04', 1 , { scale: 1.1, y: 0 }, 0 )
.from( '.lay05', 1 , { scale: 1.05 }, 0 )
.from( '.lay06', 1 , { y: 100, autoAlpha: 0 }, 0 );

tl2.to( '.lay01', 1 , { scale: 1.2, y: 75, autoAlpha: 1 } )
.to( '.lay02', 1 , { scale: 1.05, y: 50, autoAlpha: 1 }, 0 )
.to( '.lay03', 1 , { scale: 1.025, y: 5, autoAlpha: 1 }, 0 )
.to( '.lay04', 1 , { scale: 1.02, autoAlpha: 1 }, 0 )
.to( '.lay05', 1 , { scale: 1.02, autoAlpha: 1 }, 0 )
.to( '.lay06', 1 , { y: 50, autoAlpha: 0.5 }, 0 )
.add('startFade')
.to( '.stage', 1 , { autoAlpha: 0 }, 'startFade' )
.to( '.lay01', 1 , { scale: 1.4, y: 150, autoAlpha: 0 }, 'startFade' )
.to( '.lay02', 1 , { scale: 1, y: 270, autoAlpha: 0 }, 'startFade' )
.to( '.lay03', 1 , { scale: 1.1, y: 10, autoAlpha: 0 }, 'startFade' )
.to( '.lay04', 1 , { scale: 1.01, y: 20, autoAlpha: 0 }, 'startFade' )
.to( '.lay05', 1 , { scale: 1.01, autoAlpha: 0 }, 'startFade' )
.to( '.lay06', 1 , { y: 0, autoAlpha: 1 },  'startFade' );

$(window).scroll( function(){
    var st = $(this).scrollTop();  // 返回滾動條的垂直位置
    var sh = $('.two').outerHeight();  // 容器的高(含margin)
    console.log(st);
    console.log(sh);
    if( st < sh ){
        windowScroll = st/sh;
        if( windowScroll > 0 ){
            tl2.progress( windowScroll );  // progress(value) -> value: 0-1; 1 means complete 
        }				
    }
});

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