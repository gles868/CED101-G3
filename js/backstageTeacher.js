// ======== 編輯教師個人資料 ========
Vue.component('back_teacher_data', {
    data() {
        return {
            //撈出來的 教師資料
            teachers: '',
            lightbox_teach_no: '',
            lightbox_status: '',
            lightbox_teach_name: '',
            lightbox_text: '',
            teacher_edit_lightbox: false,
            teachNo: '',
            teachName: '',
            empNo: '',
            empId: '',
            empPsw: '',
            teachDescription: '',
        };
    },
    props: [],
    template: `
        <div class="right-block_teacher_data">                
            <div class="right-block">
                <div class="main">
                    <h2>個人資料管理</h2>
                    <div class="form-wrap">
                        <div class="content-list">
                            <table class="form-list">
                                <tr>
                                    <th>員工編號</th>
                                    <th>教師編號</th>
                                    <th>帳號</th>
                                    <th>密碼</th>
                                    <th>教師名稱</th>
                                    <th>教師描述</th>
                                    <th>編輯</th>
                                </tr>
                                <tr>
                                    <td>{{teachers.empNo}}</td>
                                    <td>{{teachers.teachNo}}</td>
                                    <td>{{teachers.empId}}</td>
                                    <td>*****{{teachers.empPsw.substr(-3,3)}}</td>
                                    <td>{{teachers.teachName}}</td>
                                    <td>{{teachers.teachDescription}}</td>
                                    <td>
                                        <button @click="edit_teacher_data(teachers.teachNo, teachers.teachName, teachers.empNo, 
                                                                          teachers.empId, teachers.empPsw, teachers.teachDescription)">
                                            編輯
                                        </button>
                                    </td>
                                </tr>
                            </table>

                            <teacher_edit v-if="teacher_edit_lightbox" 
                                          :teachNo="teachNo" 
                                          :empNo="empNo"
                                          :empId="empId"
                                          :empPsw="empPsw"
                                          :teachName="teachName"
                                          :teachDescription="teachDescription"
                                          @changelightbox="teachereditlightbox()">
                            </teacher_edit>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        // 呼叫php程式，取回 教師 相關資料，並用json()轉回一般陣列
        get_teacher_data: async function () {
            const res = await fetch('php/backTeacher_data.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式

            if (res == '哭阿') {
                console.log('-----');
                location.href = 'backLogin.html';
            } else {
                console.log('00000');

                this.teachers = res;
            }
        },
        // 點擊"編輯" 開啟編輯教師燈箱
        edit_teacher_data(teachNo, teachName, empNo, empId, empPsw, teachDescription) {
            this.teacher_edit_lightbox = true;
            this.teachNo = teachNo;
            this.teachName = teachName;
            this.empNo = empNo;
            this.empId = empId;
            this.empPsw = empPsw;
            this.teachDescription = teachDescription;
        },
        // 關閉"編輯課程"燈箱，同時重新渲染畫面
        teachereditlightbox() {
            this.teacher_edit_lightbox = false;
            this.get_teacher_data();
        },
    },
    // template渲染前 先執行以下程式 撈出教師資料
    created() {
        this.get_teacher_data();
    },
});

// ====== 編輯教師個人資料 燈箱組件 ======
Vue.component('teacher_edit', {
    data() {
        return {
            // courTypeNo: '',
            // courTypeName: '',
            // courseName: '',
            // courseImg: '',
            // courseDescription: '',
            // coursePrice: '',
            error_text: '',
            // error_text_des: '',
            // error_text_price: '',
        };
    },
    props: ['teachNo', 'teachName', 'empNo', 'empId', 'empPsw', 'teachDescription'],

    template: `
        <div class="lightbox_add_black">
            <div class="lightbox">            
                <div class="manager_lightbox_close" @click="changelightbox"><img src="./img/close.png"></div>                            
                <div class="add-form">
                    <h2 id="courseNameText">編輯個人資料</h2>                                
                    <div class="addcoursecon">
                        <div class="acc_title">員工編號</div>
                        <div class="acc_con">{{empNo}}</div>
                    </div>
                    <div class="addcoursecon">
                        <div class="acc_title">教師編號</div>
                        <div class="acc_con">{{teachNo}}</div>
                    </div> 
                    <div class="addcoursecon">
                        <div class="acc_title">帳號</div>
                        <div class="acc_con">{{empId}}</div>
                    </div>
                    <div class="addcoursecon">
                        <div class="acc_title">密碼</div>
                        <div class="acc_con">{{empPsw}}</div>
                    </div>
                    <div class="addcoursecon">
                        <div class="acc_title">教師名稱</div>
                        <input type="text" id="teachName" class="acc_con" v-model="teachName"/>
                        {{error_text}}
                    </div> 
                    <div class="addcoursecon">
                        <div class="acc_title">教師描述</div>
                        <textarea id="teachDescription" class="acc_con" v-model="teachDescription"/>
                        {{error_text}}
                    </div> 
                    <div class="form_btn" @click="edit_teacher_func(teachName, teachDescription)">
                        確定修改
                    </div>                                                
                </div>                                                                    
            </div>
        </div>
    `,
    methods: {
        // 關燈箱
        changelightbox() {
            this.$emit('changelightbox');
        },
        // changename(event) {
        //     this.courses[this.edit_key].courseName = event.currentTarget.value;
        // },
        // 點擊 確認修改後將資料傳至DB
        edit_teacher_func: async function (teachName, teachDescription) {
            console.log(teachName);
            console.log(teachDescription);

            // 送出編輯前 確認欄位 是否符合規定
            // 教師名稱 中文1~10字
            if (teachName.replace(/[^\u4e00-\u9fa5]/g, '') && teachName.length >= 1 && teachName.length <= 10) {
                console.log('教師名稱 成功');
            } else {
                this.error_text = '教師名稱，請輸入中文(1~10字)';
                return '';
            }

            //教師描述 (1~100字)
            if (
                teachDescription.replace(/[^\u4e00-\u9fa5]/g, '') &&
                teachDescription.length >= 1 &&
                teachDescription.length <= 100
            ) {
                console.log('教師描述 成功');
            } else {
                this.error_text_des = '教師描述，請輸入中文(1~100字)';
                return '';
            }

            // 教師密碼 數字英文至少各一
            // if (empPsw.replace(/\D/g, '')) {  // not yet ***
            //     console.log('密碼 成功');
            // } else {
            //     this.error_text_psw = '密碼請輸入 至少各一位英數字';
            //     return '';
            // }

            const res = await fetch('php/backTeacher_data_update.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teachNo: this.teachNo,
                    empNo: this.empNo,
                    empId: this.empId,
                    empPsw: this.empPsw,
                    teachName: teachName,
                    teachDescription: teachDescription,
                }),
            });
            // 關燈箱
            this.changelightbox();
        },
    },
});

// ======== 課程清單 ========
Vue.component('course_list', {
    data() {
        return {
            classes: '',
            // courseNo: '',
            // courseName: '',
        };
    },
    props: ['teach-no'],

    template: `
        <div class="right-block">
            <div class="main">
                <h2>課程清單</h2>
                <div class="form-wrap">
                    <div v-for="(getclass, index) in classes">
                        <a :href="'singleCourse.php?courseNo=' + getclass.courseNo">
                            <div class="course-list">
                                <div class="img">
                                    <img :src="getclass.courseImg" alt="">
                                </div>
                                <div class="info">
                                    <table>
                                        <tr>
                                        <th>課程名稱</th>
                                            <th>班級編號</th>
                                            <th>授課時間</th>
                                            <th>報名截止日</th>
                                            <th>目前報名人數</th>
                                            <th>班級資訊</th>
                                        </tr>
                                        <tr>
                                            <td>{{getclass.courseName}}</td>
                                            <td>{{getclass.classNo}}</td>
                                            <td>{{getclass.courseStartDate}}</td>
                                            <td>{{getclass.endDate}}</td>
                                            <td>{{getclass.RegistNum}} / {{getclass.maxRegistNum}}人</td>
                                            <td>{{getclass.classDescription}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>`,
    methods: {
        get_teacher_class: async function () {
            const res = await fetch('php/backTeacher_get_classInfo.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teachNo: this.teachNo,
                }),
            }).then(function (data) {
                return data.json();
            });

            // 取回res值後，呼叫另一隻函式
            this.classes = res;
        },
    },
    created() {
        this.get_teacher_class();
    },
});

// ======== 查看課表時間 ========
Vue.component('course_date', {
    data() {
        return {
            //撈出來的 教師資料
            class: '',
        };
    },
    props: ['teach-no'],
    template: `
        <div class="right-block">
            <div class="main">
                <h2>查看課表時間</h2>
                <div class="courseDate courseCG">
                    <div id='calendar-container'>
                        <div id='calendar'></div>                    
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        async get_class() {
            const res = await fetch('php/backTeacher_get_class.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teachNo: this.teachNo,
                }),
            }).then(function (data) {
                return data.json();
            });

            // 取回res值後，呼叫另一隻函式
            this.class = res;
            this.calendar();
        },

        calendar() {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    // left: 'prev,next today',
                    // center: 'title',
                    // right: 'dayGridMonth',
                },
                initialDate: '2021-01-01',
                navLinks: true, // can click day/week names to navigate views
                editable: true,
                selectable: true,
                businessHours: true,
                dayMaxEvents: true, // allow "more" link when too many events
                aspectRatio: 2,
                events: this.class,
            });

            calendar.render();
        },
    },
    // template渲染前 先執行以下程式 撈出教師資料
    created() {
        this.get_class();
    },
});

new Vue({
    el: '#app',
    name: 'teacher',
    data: {
        content: 'back_teacher_data',
        teachNo: '',
        current: 0,
    },
});

new Vue({
    el: '#header',
    name: 'header',
    data: {
        teacher: '',
    },
    methods: {
        get_teacher_data: async function () {
            const res = await fetch('php/backTeacher_data.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.teacher = res;
        },
    },
    created() {
        this.get_teacher_data();
    },
});

window.addEventListener('load', function () {
    // 顯示使用者現在所在位置
    let li = document.querySelectorAll('#app .content-wrap > ul > li');
    for (let i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            for (let i = 0; i < li.length; i++) {
                li[i].classList.remove('active');
                this.classList.add('active');
            }
        };
    }
});
