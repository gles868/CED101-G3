window.addEventListener('load', function(){
    // scrollPage
    // $( "#scrollPage" ).fullpage({
    //     // 參數設定
    //     navigation: true, // 顯示導行列
    //     navigationPosition: "right", // 導行列位置
    //     anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],  // 定義導航的錨文字 // → http://127.0.0.1:5502/teacher.html#firstPage
    // });

});
// 取得所有教師資料
let dataRows;
let xhr = new XMLHttpRequest();
xhr.onload = function(){
    app.dataRows = JSON.parse(xhr.responseText);
    console.log(app.dataRows);
}
xhr.open('get', './php/teacherData.php', true);
xhr.send(null);

Vue.component('teacher-component', {
    props: ['teach-no', 'teach-img', 'teach-name', 'comm-star-avg', 'teach-description', 
            'mem-avatar', 'mem-name', 'comm-star', 'comm-content'],
    template: `
        <div class="section">
            <div class="container">
                <div class="tr">
                    <div class="img">
                        <div class="shadow"></div>
                        <img :src="'img/teacher/' + teachImg" alt="">
                    </div>
                </div>
                <div class="wrapper">
                    <div class="intro">  
                        <div class="title">
                            <h3>{{teachName}}</h3>
                            <star-rating v-model="commStarAvg"
                                        text-class="custom-text"
                                        :increment="0.1" 
                                        :star-size="32"
                                        :glow="3"
                                        :padding="3"
                                        :read-only="true">
                            </star-rating>
                        </div>
                        <p>
                            {{teachDescription}}
                        </p>
                    </div>
                    <div class="comm_card">
                        <div class="card">
                            <div class="avatar">
                                <img :src="memAvatar" alt="" width="80px">
                            </div>
                            <p>{{memName}}</p>
                        </div>
                        <div class="comm">
                            <star-rating v-model="commStar"
                                            text-class="custom-text" 
                                            :star-size="20"
                                            :glow="2"
                                            :padding="2"
                                            :read-only="true">
                            </star-rating>
                            <div class="text">{{commContent}}</div>
                        </div>
                    </div>

                    <div class="btn-wrapper" @mouseover="btnani">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 65 65"
                            class="star-svg">
                            <path
                                data-name="star-10"
                                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                                fill="#D0104C"
                            />
                            <path
                                data-name="star-9"
                                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                                fill="#489ba9"
                            />
                            <path
                                data-name="star-8"
                                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                                fill="#D0104C"
                            />
                            <path
                                data-name="star-7"
                                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                                fill="#F05E1C"
                            />
                            <path
                                data-name="star-6"
                                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                                fill="#489ba9"
                            />
                            <path
                                data-name="star-5"
                                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                                fill="#D0104C"
                            />
                            <path
                                data-name="star-4"
                                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                                fill="#F05E1C"
                            />
                            <path
                                data-name="star-3"
                                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                                fill="#D0104C"
                            />
                            <path
                                data-name="star-2"
                                d="M32.32 35.25c-.34 0-.21-1.14-1-2s-1.95-.8-1.94-1.13 1.14-.21 2-1 .8-2 1.13-1.94.21 1.14 1 2 2 .8 1.94 1.13-1.14.21-2 1-.8 1.95-1.13 1.94z"
                                fill="#489ba9"
                            />
                            <path
                                data-name="star-1"
                                d="M32.34 34.24c-.22 0-.14-.76-.68-1.34s-1.31-.53-1.3-.76.76-.14 1.34-.68.53-1.31.76-1.3.14.76.68 1.34 1.31.53 1.3.76-.76.14-1.34.68-.53 1.31-.76 1.3z"
                                fill="#F05E1C"
                            />
                        </svg>
                        <button class="Btn"><a :href="'singleTeacher.html?teachNo=' + teachNo">more</a></button>
                    </div>

                </div>
            </div>
        </div>
    `,
});

// 組件 - vue star rating
Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',
    data: {
        dataRows: [],
        options: {
            afterLoad: this.afterLoad,
            navigation: true, // 顯示導行列
            navigationPosition: "right", // 導行列位置
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],  // 定義導航的錨文字
        }
    },
    methods: {
        btnani() {
            let wrapper = document.querySelectorAll('.btn-wrapper');
            let stars = [
                ...document.querySelectorAll('[data-name^="star"]'),
            ]; //解構賦值抓陣列
            let Btn = document.querySelectorAll('.Btn');

            TweenMax.set(stars, { autoAlpha: 0, x: 0, y: 0 });
            TweenMax.set(Btn[0], { scale: 1, transformOrigin: '50% 50%' });
            TweenMax.set(Btn[1], { scale: 1, transformOrigin: '50% 50%' });
            TweenMax.set(Btn[2], { scale: 1, transformOrigin: '50% 50%' });
            TweenMax.set(Btn[3], { scale: 1, transformOrigin: '50% 50%' });
            TweenMax.set(Btn[4], { scale: 1, transformOrigin: '50% 50%' });
            TweenMax.set(Btn[5], { scale: 1, transformOrigin: '50% 50%' });

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
                bling.to(
                    Btn[2],
                    0.4,
                    {
                        scale: 0.9,
                        yoyo: true,
                        repeat: 1,
                        ease: Circ.easeInOut,
                    },
                    0
                );
                bling.to(
                    Btn[3],
                    0.4,
                    {
                        scale: 0.9,
                        yoyo: true,
                        repeat: 1,
                        ease: Circ.easeInOut,
                    },
                    0
                );
                bling.to(
                    Btn[4],
                    0.4,
                    {
                        scale: 0.9,
                        yoyo: true,
                        repeat: 1,
                        ease: Circ.easeInOut,
                    },
                    0
                );
                bling.to(
                    Btn[5],
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
            Btn[2].addEventListener('mouseover', () => {
                master.play(0);
            });
            Btn[3].addEventListener('mouseover', () => {
                master.play(0);
            });
            Btn[4].addEventListener('mouseover', () => {
                master.play(0);
            });
            Btn[5].addEventListener('mouseover', () => {
                master.play(0);
            });
        },
    },
})