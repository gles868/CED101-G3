const wrapper = document.querySelector('.btn-wrapper');
const stars = [...document.querySelectorAll('[data-name^="star"]')];  //解構賦值抓陣列
const Btn = document.querySelector('.Btn');

TweenMax.set(stars, { autoAlpha: 0, x: 0, y: 0 });
TweenMax.set(Btn, { scale: 1, transformOrigin: '50% 50%' });

function setAnimation() {
    const bling = new TimelineMax({});

    // animate stars in circle
    stars.map((star, i) => {
        const angle = (i / (stars.length / 2)) * Math.PI;
        const x = 25 * Math.cos(angle);
        const y = 15 * Math.sin(angle);
        const timing = i % 3 * 0.15;
        bling.to(star, .5, { autoAlpha: 1, scale: 0.8, x: x, y: y, ease: Back.easeOut.config(1.5) }, timing);//動畫開始
        bling.to(star, .3, { autoAlpha: 0 }, timing + .2);   //動畫結束 autoAlpha可改1看看
        //autoAlpha是opacity和visibility這2個css屬性的結合
        //scale大小倍率

    });

    bling.to(Btn, .4, { scale: 0.9, yoyo: true, repeat: 1, ease: Circ.easeInOut }, 0);  //按鈕本身的動畫
    //yoyo設為true 動畫將會往返執行
    //repeat:-1 動畫會一直做動

    return bling;
}

const master = new TimelineMax({ paused: true });
master.add(setAnimation());

// animate on click
Btn.addEventListener('mouseover', () => {
    master.play(0);
});

