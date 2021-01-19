Vue.component('back-teacher-data', {
    data(){
        return{
            teachers: '',
            lightbox: false,
            lightbox_admin_no: '',
            lightbox_status: '',
            lightbox_admin_name: '',
            lightbox_text: '',
            empName: '',
            empId: '',
            empPsw: '',
            error_text: '',
            lightbox_teacher_add: false,
        };
    },
    props: [],
    template: `
        <div class="right-block">
            <div class="main">
                <h2>個人資料管理</h2>
                <div class="form-wrap">
                    <div class="content-list">
                        <table class="form-list">
                            <tr>
                                <th>編號</th>
                                <th>帳號</th>
                                <th>密碼</th>
                                <th>姓名</th>
                                <th>編輯</th>
                            </tr>
                            <tr v-for="(teacher, key) in teachers">
                                <td>{{teacher.empNo}}</td>
                                <td>{{teacher.empId}}</td>
                                <td>{{teacher.empPsw}}</td>
                                <td>{{teacher.empName}}</td>
                                <td><button @click="editTeacherData(value.empNo)">編輯</button></td>
                            </tr>
                        </table>

                        <edit-teacher-component v-if="course_edit_lightbox" 
                                                :courseNo="courseNo" 
                                                @changelightbox="courseeditlightbox()">
                        </edit-teacher-component>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        // 呼叫php程式，取回 教師帳號 相關資料，並用json()轉回一般陣列
        getTeacherData: async function () {
            const res = await fetch('php/back_teacher_data.php', 
            {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.teachers = res;
        },
        // 點擊"編輯" 開啟編輯課程燈箱
        editTeacherData(empNo){
            this.editTeacherDataLightbox = true;
            this.empNo = empNo;
        },
        // 關閉"編輯課程"燈箱，同時重新渲染畫面
        closeTeacherDataLightbox(){
            this.editTeacherDataLightbox = false;
            this.getTeacherData();
        }
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.getTeacherData();
    },
})

// 組件 - 編輯教師資料
Vue.component('edit-teacher-component', {
    data() {
        return {
            courTypeNo: '',
            courTypeName: '',
            courseName: '',
            courseImg: '',
            courseDescription: '',
            coursePrice: '',
            error_text: '',
            error_text_des: '',
            error_text_price: '',
        };
    },
    props: ['courseNo'],

    template: `
<div class="lightbox_add_black">
    <div class="lightbox" >            
        <div class="manager_lightbox_close" @click="changelightbox"><img src="./img/close.png"></div>                            
        <div class="add-form">
            <h2 id="courseNameText">編輯課程</h2>                                
            <div class="addcoursecon">
                <div class="acc_title">課程編號</div>
                <div class="acc_con">{{courseNo}}</div>
            </div>
            <div class="addcoursecon">
                <div class="acc_title">課程類別編號</div>
                <select name="courseType" id="courTypeNo" class="acc_con" v-model="courTypeNo" @change="changetype()">
                    <option value="1">攻擊型</option>
                    <option value="2">防禦型</option>
                    <option value="3">輔助型</option>
                </select>
            </div>
            <div class="addcoursecon">
                <div class="acc_title">課程名稱</div>
                <input type="text" id="courseName" class="acc_con" v-model="courseName"/>
                {{error_text}}
            </div>
            <div class="addcoursecon">
                <div class="acc_title">課程圖片</div>
                <!-- <img :src="courseImg" alt="" > -->
                <input id="file" type="file" class="acc_con"  />
            </div>
            <div class="addcoursecon">
                <div class="acc_title">課程描述</div>
                <textarea type="text" id="courseDescription" class="acc_con" v-model="courseDescription"/></textarea>
                {{error_text_des}}
            </div>
            <div class="addcoursecon">
                <div class="acc_title">課程金額</div>
                <input type="text" required="required" id="coursePrice" class="acc_con" v-model="coursePrice"/>
                {{error_text_price}}
            </div>
            <div class="form_btn" @click="edit_course_func(courTypeNo,
                courseName,
                courseImg,
                courseDescription,
                coursePrice)">確定修改
            </div>                                                
        </div>                                                                    
    </div>
</div>
    `,
    methods: {
        get_course: async function () {
            const res = await fetch('./php/back_course_one.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseNo: this.courseNo,
                }),
            }).then(function (data) {
                return data.json();
            });
            this.courTypeNo = res[0].courTypeNo;
            this.courseName = res[0].courseName;
            this.courseImg = res[0].courseImg;
            this.courseDescription = res[0].courseDescription;
            this.coursePrice = res[0].coursePrice;
            this.changetype();
        },
        //關燈箱
        changelightbox() {
            this.$emit('changelightbox');
        },

        changetype() {
            // this.courses[this.edit_key].courTypeNo = event.currentTarget.value;

            if (this.courTypeNo == 1) {
                this.courTypeName = '攻擊型';
            } else if (this.courTypeNo == 2) {
                this.courTypeName = '防禦型';
            } else if (this.courTypeNo == 3) {
                this.courTypeName = '輔助型';
            }
        },
        changename(event) {
            this.courses[this.edit_key].courseName = event.currentTarget.value;
        },

        //點擊 確認修改後將資料傳至DB
        edit_course_func: async function (courTypeNo, courseName, courseImg, courseDescription, coursePrice) {
            console.log(courTypeNo, courseName, courseImg, courseDescription, coursePrice);

            //送出編輯前 確認欄位 是否符合規定
            //課程名稱 中文(1~3字)
            if (courseName.replace(/[^\u4e00-\u9fa5]/g, '') && courseName.length >= 1 && courseName.length <= 3) {
                console.log('課程名稱 成功');
            } else {
                this.error_text = '課程名稱，請輸入中文(1~3字)';
                return '';
            }

            //課程描述 (1~100字)
            if (
                courseDescription.replace(/[^\u4e00-\u9fa5]/g, '') &&
                courseDescription.length >= 1 &&
                courseDescription.length <= 100
            ) {
                console.log('課程描述 成功');
            } else {
                this.error_text_des = '課程描述，請輸入中文(1~100字)';
                return '';
            }

            //課程金額 數字
            if (coursePrice.replace(/\D/g, '')) {
                console.log('課程金額 成功');
            } else {
                this.error_text_price = '課程金額，請輸入數字';
                return '';
            }

            const res = await fetch('./php/back_course_update_one.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseNo: this.courseNo,
                    courTypeNo: courTypeNo,
                    courseName: courseName,
                    courseImg: courseImg,
                    courseDescription: courseDescription,
                    coursePrice: coursePrice,
                }),
            });
            //關燈箱
            this.changelightbox();
        },
    },
    created() {
        this.get_course();
    },
    watch: {},
});


Vue.component('back-teacher-course', {
    data(){
        return{
            teachers: '',
            lightbox: false,
            lightbox_admin_no: '',
            lightbox_status: '',
            lightbox_admin_name: '',
            lightbox_text: '',
            empName: '',
            empId: '',
            empPsw: '',
            error_text: '',
            lightbox_teacher_add: false,
        };
    },
    props: [],
    template: `
        <div class="right-block">
            <div class="tab_container">
            <div class="tab_list_block">
                <ul class="tab_list">
                <li><a href="#" data-target="tab1" class="tab -on">查看課表時間</a></li>
                <li><a href="#" data-target="tab2" class="tab">開課情況</a></li>
                </ul>
            </div>
            
            <div class="tab_contents">
                <div class="tab tab1 -on">
                <div class="calendar-wrap">
                    <div id='calendar'></div>
                </div>   
                </div>
                
                <div class="tab tab2">
                <div class="item">
                    <div class="pic">
                        <img src="img/course01.png">
                    </div>
                    <div class="txt">
                        <h3>課程名稱</h3>
                        <p>目前報名人數:3/5</p>
                    </div>
                </div>
                </div>
            </div>
                
            </div>
        </div>
    `,
    methods: {
        //呼叫php程式，取回 教師帳號 相關資料，並用json()轉回一般陣列
        get_teacher: async function () {
            const res = await fetch('./php/back_teacher_data.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.teachers = res;
        },
        // 將值寫入data中
        change_emp: function (data) {
            this.employees = data;
        },

        // 點擊修改後，顯示燈箱 並帶入值
        lightbox_show: function (empNo, empName, empStatus) {
            this.lightbox = true;
            this.lightbox_admin_no = empNo;
            this.lightbox_admin_name = empName;

            if (empStatus == 0) {
                this.lightbox_status = 1;
                this.lightbox_text = '啟用';
            } else if (empStatus == 1) {
                this.lightbox_status = 0;
                this.lightbox_text = '停權';
            }
        },
        // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
        change_status: async function (empNo, status) {
            const res = await fetch('./php/back_update_teacher.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empNo: empNo,
                    empStatus: status,
                }),
            });
            //關閉燈箱
            this.lightbox = false;
            //完成後 重新撈取一次資料
            this.get_teacher();
        },
        //點擊 新增教師
        teacher_add: async function () {
            //測試新增教師名稱規則
            if (
                this.empName.replace(/[^\w\u4E00-\u9FA5]/g, '') &&
                this.empName.length >= 1 &&
                this.empName.length <= 10
            ) {
                console.log('成功');
            } else {
                console.log('失敗');
                this.lightbox_teacher_add = true;
                this.error_text = '"名稱"請輸入1~10個字';
                return '';
            }
            //測試新增教師帳號規則
            if (this.empId.replace(/[^\d|chun]/g, '') && this.empId.length >= 1 && this.empId.length <= 20) {
                console.log('成功');
            } else {
                console.log('失敗');
                this.lightbox_teacher_add = true;
                this.error_text = '"帳號"請輸入英/數字(1~20字)';
                return '';
            }
            //測試新增教師密碼規則
            if (this.empPsw.replace(/[^\d|chun]/g, '') && this.empPsw.length >= 1 && this.empPsw.length <= 20) {
                console.log('成功');
            } else {
                console.log('失敗');
                this.lightbox_teacher_add = true;
                this.error_text = '"密碼"請輸入英/數字(1~20字)';
                return '';
            }
            console.log('111');

            const res = await fetch('./php/back_insert_teacher.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empName: this.empName,
                    empId: this.empId,
                    empPsw: this.empPsw,
                }),
            });

            console.log('000');
            //修改成功跳出 燈箱
            this.lightbox_teacher_add = true;
            this.error_text = '新增成功';
            // 新增成功後 把data內的植 都清空
            this.empName = '';
            this.empId = '';
            this.empPsw = '';
            this.get_teacher();
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_teacher();
        },
    },
})

new Vue({
    el: '#app',
    data: {
        content: 'back-teacher-course',
    },
    methods: {},
});
