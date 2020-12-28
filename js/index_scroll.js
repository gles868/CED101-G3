// 宣告一個scrollMagi的控制器
let controller = new ScrollMagic.Controller();

// 定義動畫
// let tl = gsap.timeline({ease: Power2.easeOut});
let tl1= gsap.timeline({ease: Power2.easeInOut});
let tl2= gsap.timeline({ease: Power2.easeInOut});
let scroll = gsap.timeline(); 

// 載入頁面時的動畫
// TweenMax.to( 選擇器, 時間(秒), {屬性}, 控制動畫插入點 )  
// *控制動畫插入點 -> 無設置：時間軸末尾 | 1：絕對時間，指定時間處 ...
tl1.from( '.lay01', { delay: 0.6, scale: 3, y: 50, duration: 1.2, autoAlpha: 0 }, 0.2)
.from( '.lay02', { delay: 0.6, scale: 3, y: 80, duration: 1.3, autoAlpha: 0 }, 0)
.from( '.lay03', { y: 200, autoAlpha: 0, duration: 1 }, 0)
.from( '.lay03-2', { y: 200, autoAlpha: 0, duration: 1 }, 0)
.from( '.lay04', { delay: 0, scale: 1.3, y: 60, duration: 2, autoAlpha: 1 }, 0)
.from( '.lay05', { delay: 0, scale: 1.3, y: 0, duration: 1.2, autoAlpha: 0.8 }, 0)
.from( '.lay06', { delay: 0, scale: 1.05, duration: 4 }, 0);

// 滾動時進行的動畫
scroll.to( '.lay01', { scale: 1.2, y: 175, autoAlpha: 1, duration: 3 } )
.to( '.lay02', { scale: 1.05, y: 150, autoAlpha: 1, duration: 3 }, 0 )
.to( '.lay03', { y: -80, autoAlpha: 1, duration: 3 }, 3 )
.to( '.lay03', { delay: 2, y: 0, autoAlpha: 0, duration: 6 }, 4 )
.to( '.lay03-2', { delay: 6, y: -80, autoAlpha: 1, duration: 3 }, 6 )
.to( '.lay03-2', { delay: 1, y: 0, autoAlpha: 0, duration: 6 }, 7 )
.to( '.lay04', { scale: 1.025, y: 5, autoAlpha: 1, duration: 1 }, 0 )
.to( '.moon', { delay: 10, scale: 0.8, x: 50, y: 100, duration: 3 }, 9 )
.to( '.lay05', { scale: 1.02, autoAlpha: 1, duration: 1 }, 0 )
.to( '.lay06', { scale: 1.02, autoAlpha: 1, duration: 1 }, 0 )
.to( '.lay01', { delay: 4, scale: 1.2, y: 375, autoAlpha: 1, duration: 3 }, 5 )
.to( '.lay02', { delay: 4, scale: 1.05, y: 350, autoAlpha: 1, duration: 3 }, 5 )
.to( '.lay04', { delay: 4, scale: 1.2, x: -150, autoAlpha: 1, duration: 3 }, 5 );
// .add('startFade')
// .to( '#pinSection', 0 , { autoAlpha: 0 }, 'startFade' )
// .to( '.lay01', 0 , { autoAlpha: 0 }, 'startFade' )
// .to( '.lay02', 0 , { autoAlpha: 0 }, 'startFade' )
// .to( '.lay03', 0 , { autoAlpha: 0 },  'startFade' )
// .to( '.lay04', 0 , { autoAlpha: 0 }, 'startFade' )
// .to( '.lay05', 0 , { autoAlpha: 0 }, 'startFade' )
// .to( '.moon', 0, {  autoAlpha: 0 })
// .to( '.lay06', 0 , { autoAlpha: 0 }, 'startFade' );

new ScrollMagic.Scene({
    triggerElement: "#triggerPoint",
    triggerHook: 0,  // 改藍指標 0~1  // 0:最上方 | 1:最下方，一到頁面就觸發
    duration: "500%"
})
.setPin("#pinSection")
.setTween(scroll)
.addIndicators()
.addTo(controller);

// parallax.js
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

// parallaxInstance = new Parallax( document.getElementById( "【物件】" ) , { 
//     // 參數設定
// });