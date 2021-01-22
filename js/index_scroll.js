// ============== scroll magic ===============
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
// .addIndicators()  // 標記
.addTo(controller);

// ============== parallax.js ===============
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

// parallaxInstance = new Parallax( document.getElementById( "【物件】" ) , { 
//     // 參數設定
// });

// ============== 取得資料 ===============
window.addEventListener('load', function(){
    let dataRows;     
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        app.dataRows = JSON.parse(xhr.responseText);
        console.log(app.dataRows);
    }
    url = 'php/getIndexData.php';
    xhr.open('get', url, true);
    xhr.send(null);
});


let memNavInfo = new Vue({
    el: '#memInfo',
    data: {
        memData: {},
    },
})

Vue.component('teacher-component', {
    props: ['teach-no', 'teach-img', 'teach-name', 'teach-description', 'comm-avg', 'course-name'],
    template: `
        <div>
            <a href="'singleTeacher.html?teachNo=' + teachNo">
                <div class="teacher-big1" >
                    <div class="teacher">
                        <div class="shadow"></div>
                        <img :src="'img/teacher/' + teachImg" alt="">
                    </div>
                    <div class="tea-box">
                        <img src="./img/index/[teachers]card-04.png" alt="">
                    </div>
                    <div class="inf-all">
                        <div class="tea-name">{{teachName}}</div>
                        <div class="tea-inf">{{teachDescription}}</div>
                        <star-rating v-model="commAvg"
                                    text-class="custom-text"
                                    :increment="0.1"
                                    :star-size="20"
                                    :glow="2"
                                    :padding="2"
                                    :read-only="true">
                        </star-rating>
                        <ul class="tea-list">
                            <li>{{courseName}}</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    `,
    methods: {
        showLightbox(){
            // 此子組件發出emit事件至父層的自定義事件(show-box)
            this.$emit('show-box');
        },
        closeLightbox(){
            this.$emit('close-box');
        },
        sendReport(){
            this.$emit('send-report');
        },
    },
})

// 組件 - vue star rating
Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',
    data: {
        dataRows: '',
        rating: 0,
    },
    methods: {
        btnani() {
            let wrapper = document.querySelectorAll('.btn-wrapper');
            let stars = [
                ...document.querySelectorAll('[data-name^="star"]'),
            ]; //解構賦值抓陣列
            let Btn = document.querySelectorAll('.Btn');

            TweenMax.set(stars, { autoAlpha: 0, x: 0, y: 0 });
            TweenMax.set(stars, { autoAlpha: 0, x: 0, y: 0 });
            TweenMax.set(Btn[0], { scale: 1, transformOrigin: '50% 50%' });
            TweenMax.set(Btn[1], { scale: 1, transformOrigin: '50% 50%' });

            function setAnimation() {
                let bling = new TimelineMax({});

                // animate stars in circle
                stars.map((star, i) => {
                    let angle = (i / (stars.length / 2)) * Math.PI;
                    let x = 25 * Math.cos(angle);
                    let y = 15 * Math.sin(angle);
                    let timing = (i % 3) * 0.15;
                    bling.to(
                        star,
                        0.5,
                        {
                            autoAlpha: 1,
                            scale: 0.8,
                            x: x,
                            y: y,
                            ease: Back.easeOut.config(1.5),
                        },
                        timing
                    ); //動畫開始
                    bling.to(star, 0.3, { autoAlpha: 0 }, timing + 0.2); //動畫結束 autoAlpha可改1看看
                    //autoAlpha是opacity和visibility這2個css屬性的結合
                    //scale大小倍率
                });

                bling.to(
                    Btn[0],
                    0.4,
                    {
                        scale: 0.9,
                        yoyo: true,
                        repeat: 1,
                        ease: Circ.easeInOut,
                    },
                    0
                ); //按鈕本身的動畫
                //yoyo設為true 動畫將會往返執行
                //repeat:-1 動畫會一直做動
                bling.to(
                    Btn[1],
                    0.4,
                    {
                        scale: 0.9,
                        yoyo: true,
                        repeat: 1,
                        ease: Circ.easeInOut,
                    },
                    0
                );

                return bling;
            }

            let master = new TimelineMax({ paused: true });
            master.add(setAnimation());

            Btn[0].addEventListener('mouseover', () => {
                master.play(0);
            });
            Btn[1].addEventListener('mouseover', () => {
                master.play(0);
            });
        },
    },
})


// ======= scroll更改header背景色 =======
window.addEventListener('scroll', function(){
    let getScrollTop = document.documentElement.scrollTop;
    let header = document.querySelector('header');
    
    if(getScrollTop > 4000){
        header.classList.add('-active');
    }else{
        header.classList.remove('-active');
    }
});

