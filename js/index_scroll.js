// 宣告一個scrollMagi的控制器
let controller = new ScrollMagic.Controller();

// 定義動畫
let animate = new TimelineMax({ease: Power2.easeOut});
let scroll = new TimelineMax(); 

// 載入頁面時的動畫 -> 倒退動作
// TweenMax.to( 選擇器, 時間(秒), {屬性}, 控制動畫插入點 )  
// *控制動畫插入點 -> 無設置：時間軸末尾 | 1：絕對時間，指定時間處 ...
animate.from('.lay01', 1.2, {scale: 4, y: 50})
.from('.lay02', 1, {scale: 3, y: 80}, 0)
.from('.lay03', 1, {y: 200, autoAlpha: 0}, 0)
.from('.lay04', 1, {scale: 1.3, y: 60}, 0)
.from('.lay05', 1, {scale: 1.1, y: 0}, 0)
.from('.lay06', 4, {scale: 1.05}, 0);

// 滾動時進行的動畫
scroll.to( '.lay01', 3 , { scale: 1.2, y: 75, autoAlpha: 1 } )
.to( '.lay02', 3 , { scale: 1.05, y: 50, autoAlpha: 1 }, 0 )
.to( '.lay03', 2 , { y: -80, autoAlpha: 1 }, 3 )
.to( '.lay04', 1 , { scale: 1.025, y: 5, autoAlpha: 1 }, 0 )
.to( '.lay05', 1 , { scale: 1.02, autoAlpha: 1 }, 0 )
.to( '.lay06', 1 , { scale: 1.02, autoAlpha: 1 }, 0 )
.add('startFade')
.to( '#pinSection', 1 , { autoAlpha: 0 }, 'startFade' )
.to( '.lay01', 1 , { scale: 1.4, y: 150, autoAlpha: 0 }, 'startFade' )
.to( '.lay02', 1 , { scale: 1, y: 270, autoAlpha: 0 }, 'startFade' )
.to( '.lay03', 2 , { y: 300, autoAlpha: 1 },  'startFade' )
.to( '.lay04', 1 , { scale: 1.1, y: 10, autoAlpha: 0 }, 'startFade' )
.to( '.lay05', 1 , { scale: 1.01, y: 20, autoAlpha: 0 }, 'startFade' )
.to( '.lay06', 1 , { scale: 1.01, autoAlpha: 0 }, 'startFade' );

new ScrollMagic.Scene({
    triggerElement: "#triggerPoint",
    triggerHook: 0,  // 改藍指標 0~1  // 0:最上方 | 1:最下方，一到頁面就觸發
    duration: "600%"
})
.setPin("#pinSection")
.setTween(scroll)
.addIndicators()
.addTo(controller);