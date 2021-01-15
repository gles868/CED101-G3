$(document).ready(function(){
    // scrollPage
    $( "#scrollPage" ).fullpage({
        // 參數設定
        navigation: true, // 顯示導行列
        navigationPosition: "right", // 導行列位置
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],  // 定義導航的錨文字 // → http://127.0.0.1:5502/teacher.html#firstPage
    });
});

//---- 取得所有教師資料
window.addEventListener('load', function(){
    let dataRows;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        app.dataRows = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
    }
    xhr.open('get', 'teacherData.php', true);
    xhr.send(null);
});

Vue.component('teacher-component', {
    props: ['teach-no', 'teach-img', 'teach-name', 'teach-description'],
    template: `
        <div class="section 'section' + teachNo">
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
                            <div class="star" data-percent="80"></div>
                        </div>
                        <p>
                            {{teachDescription}}
                        </p>
                    </div>
                    <comment-component v-model="">
                    </comment-component>
                    <div class="more">
                        <a href="'singleTeacher.html?' + teachNo">more →</a>
                    </div>
                </div>
            </div>
        </div>
    `,
})

// 組件 - 評論
Vue.component('comment-component', {
    props: [],
    template: `
        <div class="comm_card">
            <div class="card">
                <div class="avatar">
                    <img src="img/teacher/member01.jpg" alt="" width="80px">
                </div>
                <p>挖洗白白</p>
            </div>
            <div class="comm">
                <star-rating v-model="commStar"
                             text-class="custom-text" 
                             :increment="0.5"
                             :star-size="20"
                             :read-only="true">
                </star-rating>
                <div class="text">ㄎㄎㄎㄎㄎㄎㄎ</div>
            </div>
        </div>
    `,
});

// 組件 - vue star rating
Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#scrollPage',
    data: {
        dataRows: [],
    },
})