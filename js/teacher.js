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
                                <img :src="'img/teacher/' + memAvatar" alt="" width="80px">
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
                    <div class="more">
                        <a :href="'singleTeacher.html?teachNo=' + teachNo">more →</a>
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
})