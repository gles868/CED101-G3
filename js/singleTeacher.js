// ---- 取得頁面資料
window.addEventListener('load', function(){  
    getAllData();
});

function getAllData(){
    let dataRows;
    let getTeachNo = location.href.split('?')[1];
    
    let xhr = new XMLHttpRequest();
    // 資料有回傳時(readyStatus:4)就執行
    xhr.onload = function(){
        // 將json字串轉為js物件
        app.dataRows = JSON.parse(xhr.responseText);
    }
    url = `php/singleTeacherData.php?${getTeachNo}`;
    xhr.open('get', url, true);
    xhr.send(null);
}

// 組件 - 教師
Vue.component('teacher-component', {
    props: ['data-rows', 'rating'],
    template: `
        <div class="container">
            <div class="tr">
                <div class="img">
                    <div class="shadow"></div>
                    <img :src="'img/teacher/' + dataRows.teachImg" alt="">
                </div>
            </div>
            <div class="wrapper">
                <div class="intro">
                    <h3>{{dataRows.teachName}}</h3>
                    <star-rating v-model="dataRows.commStarAvg"
                                 text-class="custom-text"
                                 :increment="0.1"
                                 :star-size="32"
                                 :glow="3"
                                 :padding="3"
                                 :read-only="true">
                    </star-rating>
                    <p>
                        {{dataRows.teachDescription}}
                    </p>
                </div>
            </div>
        </div>
    `,
})

// 組件 - 課程
Vue.component('course-component', {
    props: ['course-no', 'course-name', 'cour-type-name', 'course-price'],
    template: `
        <a :href="'singleCourse.php?courseNo=' + courseNo">
            <div class="card">
                <div class="title">
                    <h3>{{courseName}}</h3>
                </div>
                <div class="info">
                    <p>屬性: {{courTypeName}}</p>
                    <p>價錢: $ {{coursePrice}}</p>
                </div>
                <img src="./img/course_cards/card_back.png" alt="">
                <div class="shadow"></div>
            </div>
        </a>
    `,
})

// 組件 - 評論+檢舉燈箱
Vue.component('comment-component', {
    props: ['mem-avatar', 'mem-name', 'comm-star', 'comm-content', 'regist-no', 'rating'],
    template: `
        <div class="comment_wrapper">
            <div class="container">
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
                    <div class="report">
                        <div class="report_btn" @click="showLightbox">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lightbox_wrapper" style="display: none;">
                <div class="lightbox">
                    <span class="close" @click="closeLightbox">x</span>
                    <div class="lightbox_text">
                        <h4>
                            <i class="fas fa-exclamation-triangle"></i>
                            檢舉本則留言
                        </h4>
                        <p>請選擇檢舉原因：</p>
                        <form>
                            <select name="reportReason">
                                <option value="0">內容不當</option>
                                <option value="1">與網站無關</option>
                                <option value="2">其他</option>
                            </select><br>
                            <p>{{registNo}}</p>
                            <input type="hidden" name="registNo" :value="registNo">  
                            <input type="button" value="送出" @click="sendReport">
                        </form>
                    </div>
                </div>
                <div class="lightbox_container" @click="closeLightbox"></div>
            </div>
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

// new Vue
let app = new Vue({
    el: '.bg',  
    data: {
        dataRows: [],  // 接到的資料在父層
        rating: 0,
        memData: {},
    },  
    methods: {
        showLightbox: function(i){
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                let memData = JSON.parse(xhr.responseText); 
                if(memData.memberNo){  // 如果有登入會員
                    // 判斷會員是否已檢舉，傳回memberNo, registNo看是否有皆符合的檢舉編號
                    let xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.responseText.indexOf('已檢舉') != -1){  // 如果回傳'已檢舉'
                            alert('您已檢舉');
                        }else{
                            // 跳燈箱
                            let lightbox = document.querySelectorAll('.lightbox_wrapper');
                            lightbox[i].style.display = ''; 
                        }
                    }
                    let registNo = document.getElementsByName('registNo')[i].value;
                    console.log(registNo);
                    url = `php/memRepoData.php?registNo=${registNo}`;
                    xhr.open('get', url, true);
                    xhr.send(null);
                    
                }else{
                    // 如果未登入，跳出提示燈箱
                    alert('請登入會員');
                }
            }
            xhr.open('get', 'php/getLoginData.php', true);
            xhr.send(null);   
        },        
        closeLightbox: function(i){
            let lightbox = document.querySelectorAll('.lightbox_wrapper');
            lightbox[i].style.display = 'none'; 
        },
        sendReport: function(i){
            // 送出檢舉
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){  // 成功獲得response
                    alert('檢舉成功');
                    console.log(xhr.responseText);
                    let lightbox_wrapper = document.querySelectorAll('.lightbox_wrapper');
                    lightbox_wrapper[i].style.display = 'none';
                    // 重新載入評論資料
                    getAllData();
                }else{
                    alert(xhr.status);
                }
            }
            url = 'php/commentReport.php';
            xhr.open('post', url, true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            let data_info = `reportReason=${document.getElementsByName('reportReason')[i].value}&registNo=${document.getElementsByName('registNo')[i].value}`;
            xhr.send(data_info);
        },
    },
})

// $(document).ready(function(){
//     // ---- 顯示更多評論
//     $('.container .comm_card').slice(0, 4).addClass('shown');
//     $('.container .comm_card').not('.shown').hide();
//     $('.btn-purple').click(function(){
//         $('.container .comm_card').not('.shown').toggle();
//     });
// });

