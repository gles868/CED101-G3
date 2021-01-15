// ---- 取得資料
window.addEventListener('load', function(){
    let dataRows;
    
    let xhr = new XMLHttpRequest();
    // 資料有回傳時(readyStatus:4)就執行
    xhr.onload = function(){
        // 將json字串轉為js物件
        app.dataRows = JSON.parse(xhr.responseText);
    }
    xhr.open('get', 'singleTeacherData.php', true);
    xhr.send(null);
});

// 組件 - 評論+檢舉燈箱
Vue.component('comment-component', {
    props: ['mem-avatar', 'mem-name', 'comm-star', 'comm-content', 'regist-no'],
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
                                     :read-only="true">
                        </star-rating>
                        <div class="text">{{commContent}}</div>
                        <p>{{registNo}}</p>
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
// 組件 - vue star rating (塞進comment組件)
Vue.component('star-rating', VueStarRating.default);

// new Vue - 評論+燈箱
let app = new Vue({
    el: '.bg',  
    data: {
        dataRows: [],  // 接到的資料在父層
    },  
    methods: {
        showLightbox: function(i){
            let lightbox = document.querySelectorAll('.lightbox_wrapper');
            lightbox[i].style.display = '';  
            // ******* 每次點擊時判斷是否已登入 | 已檢舉 ********
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
                }else{
                    alert(xhr.status);
                }
            }
            url = './commentReport.php';
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

