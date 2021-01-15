// ==========管理員管理============
Vue.component('back-admin', {
    data() {
        return {
            //撈出來的 管理員員工資料
            employees: '',
            lightbox: false,
            lightbox_admin_no: '',
            lightbox_status: '',
            lightbox_admin_name: '',
            lightbox_text: '',
            empName: '',
            empId: '',
            empPsw: '',
            error_text: '',
            lightbox_admin_add: false,
        };
    },
    props: [],

    template: `
  <div class="right-block_admin">
                <div class="right-block">
                    <div class="main">
                        <h2>管理員管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <div class="admin_edit_box">
                                    <label for="adminName">名稱</label>
                                    <input id="adminName" v-model="empName" type="text" placeholder="請輸入1~10字" />
                                </div>
                                <div class="admin_edit_box">
                                    <label for="adminId">帳號</label>
                                    <input id="adminId" v-model="empId" type="text" placeholder="請輸入英/數字(1~20字)" />
                                </div>
                                <div class="admin_edit_box">
                                    <label for="adminPsw">密碼</label>
                                    <input id="adminPsw" v-model="empPsw" type="text" placeholder="請輸入英/數字(1~20字)" />
                                </div>
                                <button type="button" id="add" name="button" class="admin-add-btn" @click="admin_add">
                                    新增管理員
                                </button>
                            </div>
                            <div class="content-list">
                                <table>
                                    <tr>
                                        <th>編號</th>
                                        <th>名稱</th>
                                        <th>帳號</th>
                                        <th>密碼</th>
                                        <th>狀態</th>
                                    </tr>
                                    <tr v-for="(value,key) in employees">
                                        <td>{{value.empNo}}</td>
                                        <td>{{value.empName}}</td>
                                        <td>{{value.empId}}</td>
                                        <td>{{value.empPsw}}</td>
                                        <td>
                                            <div class="button" @click="lightbox_show(value.empNo,value.empName,value.empStatus)">
                                                <input type="checkbox" v-model="value.ischecked" />
                                                <label ></label>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <div class="lightbox_black" v-if="lightbox">
                                    <div class="lightbox" >
                                        <div class="manager_lightbox_close" @click="lightbox = false"><img src="./img/close.png"></div>
                                        <div>確定要將  管理員 - <span>{{lightbox_admin_name}}</span>，<span>{{lightbox_text}}</span> 嗎??</div>
                                        <div @click="change_status(lightbox_admin_no,lightbox_status)">確定修改</div>
                                    </div>
                                </div>
                                <div class="lightbox_black" v-if="lightbox_admin_add">
                                    <div class="lightbox" >
                                        <div class="manager_lightbox_close" @click="lightbox_admin_add = false"><img src="./img/close.png"></div>
                                        <div>{{error_text}}</div>
                                        <div @click="lightbox_admin_add = false">確定</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`,
    methods: {
        //呼叫php程式，取回 管理員帳號 相關資料，並用json()轉回一般陣列
        get_emp: async function () {
            const res = await fetch('./php/back_admin.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.employees = res;
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
            const res = await fetch('./php/back_update_admin.php', {
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
            this.get_emp();
        },

        //點擊 新增管理員
        admin_add: async function () {
            //測試新增管理員名稱規則
            if (
                this.empName.replace(/[^\w\u4E00-\u9FA5]/g, '') &&
                this.empName.length >= 1 &&
                this.empName.length <= 10
            ) {
                console.log('成功');
            } else {
                console.log('失敗');
                this.lightbox_admin_add = true;
                this.error_text = '"名稱"請輸入1~10個字';
                return '';
            }
            //測試新增管理員帳號規則
            if (this.empId.replace(/[^\d|chun]/g, '') && this.empId.length >= 1 && this.empId.length <= 20) {
                console.log('成功');
            } else {
                console.log('失敗');
                this.lightbox_admin_add = true;
                this.error_text = '"帳號"請輸入英/數字(1~20字)';
                return '';
            }
            //測試新增管理員密碼規則
            if (this.empPsw.replace(/[^\d|chun]/g, '') && this.empPsw.length >= 1 && this.empPsw.length <= 20) {
                console.log('成功');
            } else {
                console.log('失敗');
                this.lightbox_admin_add = true;
                this.error_text = '"密碼"請輸入英/數字(1~20字)';
                return '';
            }
            console.log('111');

            const res = await fetch('./php/back_insert_admin.php', {
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
            this.lightbox_admin_add = true;
            this.error_text = '新增成功';
            // 新增成功後 把data內的植 都清空
            this.empName = '';
            this.empId = '';
            this.empPsw = '';

            this.get_emp();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_emp();
    },
});

// ==========會員管理============
Vue.component('back-member', {
    data() {
        return {
            //撈出來的 會員資料
            members: '',
            lightbox: false,
            lightbox_mem_no: '',
            lightbox_status: '',
            lightbox_mem_name: '',
            lightbox_text: '',
        };
    },

    props: [],
    template: `<div class="right-block_member">
  <div class="right-block">
      <div class="main">
          <h2>會員管理</h2>
          <div class="form-wrap">
              <div class="content-list">
                  <table>
                      <tr>
                          <th>編號</th>
                          <th>名稱</th>
                          <th>帳號</th>
                          <th>密碼</th>                          
                          <th>信箱</th>
                          <th>狀態</th>
                      </tr>
                      <tr v-for="(value,key) in members">
                          <td>{{value.memberNo}}</td>
                          <td>{{value.memName}}</td>
                          <td>{{value.memId}}</td>
                          <td>{{value.memPsw}}</td>                          
                          <td>{{value.memMail}}</td>
                          <td>
                            <div class="button" @click="lightbox_show(value.memberNo,value.memName,value.memStatus)">
                                <input type="checkbox" v-model="value.ischecked" />
                                <label ></label>
                            </div>
                          </td>
                      </tr>
                  </table>
                  <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close" @click="lightbox = false"><img src="./img/close.png"></div>
                            <div>確定要將  會員 - <span>{{lightbox_mem_name}}</span>，<span>{{lightbox_text}}</span> 嗎??</div>
                            <div @click="change_status(lightbox_mem_no,lightbox_status)">確定修改</div>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  </div>
</div>
`,
    methods: {
        //呼叫php程式，取回 會員帳號 相關資料，並用json()轉回一般陣列
        get_mem: async function () {
            const res = await fetch('./php/back_member.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.members = res;
        },
        // 點擊修改後，顯示燈箱 並帶入值
        lightbox_show: function (memberNo, memName, memStatus) {
            this.lightbox = true;
            this.lightbox_mem_no = memberNo;
            this.lightbox_mem_name = memName;

            if (memStatus == 0) {
                this.lightbox_status = 1;
                this.lightbox_text = '啟用';
            } else if (memStatus == 1) {
                this.lightbox_status = 0;
                this.lightbox_text = '停權';
            }
        },
        // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
        change_status: async function (memberNo, status) {
            const res = await fetch('./php/back_update_member.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberNo: memberNo,
                    memStatus: status,
                }),
            });
            //關閉燈箱
            this.lightbox = false;
            //完成後 重新撈取一次資料
            this.get_mem();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_mem();
    },
});

// ==========教師管理============
Vue.component('back-teacher', {
    data() {
        return {
            //撈出來的 教師員工資料
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
  <div class="right-block_teacher">
                <div class="right-block">
                    <div class="main">
                        <h2>教師管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <div class="admin_edit_box">
                                    <label for="adminName">名稱</label>
                                    <input id="adminName" v-model="empName" type="text" placeholder="請輸入1~10字" />
                                </div>
                                <div class="admin_edit_box">
                                    <label for="adminId">帳號</label>
                                    <input id="adminId" v-model="empId" type="text" placeholder="請輸入英/數字(1~20字)" />
                                </div>
                                <div class="admin_edit_box">
                                    <label for="adminPsw">密碼</label>
                                    <input id="adminPsw" v-model="empPsw" type="text" placeholder="請輸入英/數字(1~20字)" />
                                </div>
                                <button type="button" id="add" name="button" class="admin-add-btn" @click="teacher_add">
                                    新增教師
                                </button>
                            </div>
                            <div class="content-list">
                                <table>
                                    <tr>
                                        <th>員工編號</th>
                                        <th>教師編號</th>
                                        <th>名稱</th>
                                        <th>帳號</th>
                                        <th>密碼</th>
                                        <th>狀態</th>
                                    </tr>
                                    <tr v-for="(value,key) in teachers">
                                        <td>{{value.empNo}}</td>
                                        <td>{{value.teachNo}}</td>
                                        <td>{{value.empName}}</td>
                                        <td>{{value.empId}}</td>
                                        <td>{{value.empPsw}}</td>
                                        <td>
                                            <div class="button" @click="lightbox_show(value.empNo,value.empName,value.empStatus)">
                                                <input type="checkbox" v-model="value.ischecked" />
                                                <label ></label>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <div class="lightbox_black" v-if="lightbox">
                                    <div class="lightbox" >
                                        <div class="manager_lightbox_close" @click="lightbox = false"><img src="./img/close.png"></div>
                                        <div>確定要將  教師 - <span>{{lightbox_admin_name}}</span>，<span>{{lightbox_text}}</span> 嗎??</div>
                                        <div @click="change_status(lightbox_admin_no,lightbox_status)">確定修改</div>
                                    </div>
                                </div>
                                <div class="lightbox_black" v-if="lightbox_teacher_add">
                                    <div class="lightbox" >
                                        <div class="manager_lightbox_close" @click="lightbox_teacher_add = false"><img src="./img/close.png"></div>
                                        <div>{{error_text}}</div>
                                        <div @click="lightbox_teacher_add = false">確定</div>
                                    </div>
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
            const res = await fetch('./php/back_teacher.php', {}).then(function (data) {
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
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_teacher();
    },
});

// ==========課程管理============
Vue.component('back-course', {
    data() {
        return {
            //撈出來的 課程資料
            courses: '',
            lightbox: false,
            lightbox_course_no: '',
            lightbox_status: '',
            lightbox_course_name: '',
            lightbox_text: '',
            course_edit_lightbox: false,
            course_add_lightbox: false,
            courseNo: '',
        };
    },
    props: [],

    template: `
<div class="right-block_course">                
    <div class="right-block">
        <div class="main">
            <h2>課程管理</h2>
            <div class="form-wrap">
                <div class="add-bar">
                    <button type="button" id="add-show" name="button" class="add-btn" @click="course_add()">新增課程</button>
                </div>
                <div class="content-list">
                    <table>
                        <tr>
                            <th>課程編號</th>
                            <th>課程類別名稱</th>
                            <th>課程名稱</th>
                            <th>課程圖片</th>
                            <th>課程金額</th>
                            <th>上架狀態</th>
                            <th>編輯</th>
                        </tr>
                        <tr v-for="(value,key) in courses">
                            <td>{{value.courseNo}}</td>
                            <td>{{value.courTypeName}}</td>
                            <td>{{value.courseName}}</td>
                            <td class="item_img"><img :src="value.courseImg"/></td>
                            <td>{{value.coursePrice}}</td>
                            <td>
                                <div class="button" @click="lightbox_show(value.courseNo,value.courseName,value.courseStatus)">
                                    <input type="checkbox" v-model="value.ischecked" />
                                    <label ></label>
                                </div>
                            </td>
                            <td><button @click="course_edit(value.courseNo)">編輯</button></td>
                        </tr>
                    </table>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close" @click="lightbox = false"><img src="./img/close.png"></div>
                            <div>確定要將  課程 - <span>{{lightbox_course_name}}</span>，<span>{{lightbox_text}}</span> 嗎??</div>
                            <div @click="change_status(lightbox_course_no,lightbox_status)">確定修改</div>
                        </div>
                    </div>                  
                    <course_edit v-if="course_edit_lightbox" :courseNo="courseNo" @changelightbox="courseeditlightbox()"></course_edit>
                    <course_add v-if="course_add_lightbox"  @changelightbox="courseaddlightbox()"></course_add>                
                </div>
            </div>
        </div>
    </div>
</div>
  `,
    methods: {
        //呼叫php程式，取回 課程 相關資料，並用json()轉回一般陣列
        get_course: async function () {
            const res = await fetch('./php/back_course.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.courses = res;
        },
        // 點擊修改後，顯示燈箱 並帶入值
        lightbox_show: function (courseNo, courseName, courseStatus) {
            this.lightbox = true;
            this.lightbox_course_no = courseNo;
            this.lightbox_course_name = courseName;

            if (courseStatus == 0) {
                this.lightbox_status = 1;
                this.lightbox_text = '上架';
            } else if (courseStatus == 1) {
                this.lightbox_status = 0;
                this.lightbox_text = '下架';
            }
        },
        // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
        change_status: async function (courseNo, status) {
            const res = await fetch('./php/back_update_course.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseNo: courseNo,
                    courseStatus: status,
                }),
            });
            //關閉 狀態轉換燈箱
            this.lightbox = false;
            //完成後 重新撈取一次資料
            this.get_course();
        },
        //點擊"編輯" 開啟編輯課程燈箱
        course_edit(courseNo) {
            this.course_edit_lightbox = true;
            this.courseNo = courseNo;
        },
        //關閉"編輯課程"燈箱，同時重新渲染畫面
        courseeditlightbox() {
            this.course_edit_lightbox = false;
            this.get_course();
        },
        //點擊"新增" 開啟新增課程燈箱
        course_add() {
            this.course_add_lightbox = true;
        },
        //關閉"新增課程"燈箱，同時重新渲染畫面
        courseaddlightbox() {
            this.course_add_lightbox = false;
            this.get_course();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_course();
    },
    mounted() {},
});
//----------編輯課程(組件)----------
Vue.component('course_edit', {
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
//----------新增課程(組件)----------
Vue.component('course_add', {
    data() {
        return {
            lightbox_course_add: false,
            courseNo: '',
            courTypeNo: '',
            courseName: '',
            courseImg: '',
            courseDescription: '',
            coursePrice: '',
            error_text: '',
            error_text_des: '',
            error_text_price: '',
        };
    },
    props: [],

    template: `
<div class="lightbox_add_black">
    <div class="lightbox" >            
        <div class="manager_lightbox_close" @click="changelightbox"><img src="./img/close.png"></div>                            
        <div class="add-form">
            <h2 id="courseNameText">新增課程</h2>                                
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
            <div class="form_btn" @click="add_course_func(courTypeNo,
                courseName,
                courseImg,
                courseDescription,
                coursePrice)">確定新增
            </div>                                                
        </div>                                                                    
    </div>
</div>
    `,
    methods: {
        //關燈箱
        changelightbox(data) {
            this.$emit('changelightbox', data);
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

        //點擊 確認新增後將資料傳至DB
        add_course_func: async function (courTypeNo, courseName, courseImg, courseDescription, coursePrice) {
            console.log(courTypeNo, courseName, courseImg, courseDescription, coursePrice);

            //送出新增前 確認欄位 是否符合規定
            //課程名稱 中文(1~3字)
            if (courseName.replace(/[^\u4e00-\u9fa5]/g, '') && courseName.length >= 1 && courseName.length <= 3) {
                console.log('中文 成功');
            } else {
                this.error_text = '課程名稱，請輸入中文(1~3字)';
                return '';
            }

            //課程描述 中文(1~100字)
            if (
                courseDescription.replace(/[^\u4e00-\u9fa5]/g, '') &&
                courseDescription.length >= 1 &&
                courseDescription.length <= 100
            ) {
                console.log('中文 成功');
            } else {
                this.error_text_des = '課程描述，請輸入中文(1~100字)';
                return '';
            }

            //課程金額 數字
            if (coursePrice.replace(/\D/g, '')) {
                console.log('中文 成功');
            } else {
                this.error_text_price = '課程金額，請輸入數字';
                return '';
            }

            const res = await fetch('./php/back_insert_course.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courTypeNo: courTypeNo,
                    courseName: courseName,
                    courseImg: courseImg,
                    courseDescription: courseDescription,
                    coursePrice: coursePrice,
                }),
            }).then(function () {
                console.log('in');
            });
            console.log('完成');

            //關燈箱
            this.changelightbox();
            //完成後 重新撈取一次資料
            console.log('重撈');
        },
    },
});

// ==========留言檢舉管理============
Vue.component('back-comment', {
    data() {
        return {
            //撈出來的 留言檢舉(待審核)資料
            comments: '',
            lightbox: false,
            lightbox_repo_no: '',
            lightbox_status: '',
            lightbox_text: '',
        };
    },
    props: [],

    template: `
  <div class="right-block_comment">
                <div class="right-block">
                    <div class="main">
                        <h2>留言檢舉管理</h2>
                        <div class="form-wrap">
                            <div class="content-list">
                                <table>
                                    <tr>
                                        <th>檢舉編號</th>
                                        <th>被檢舉人帳號</th>
                                        <th>被檢舉人名稱</th>
                                        <th>留言內容</th>
                                        <th>檢舉原因</th>
                                        <th>檢舉日期</th>
                                        <th>審核</th>
                                    </tr>
                                    <tr v-for="(value,key) in comments">
                                        <td>{{value.repoNo}}</td>
                                        <td>{{value.memId}}</td>
                                        <td>{{value.memName}}</td>
                                        <td>{{value.commContent}}</td>
                                        <td>{{value.repoReason}}</td>
                                        <td>{{value.repoDate}}</td>
                                        <td>
                                            <select name="state" @change="changestaus($event,key)">
                                                <option value="0" selected disabled>未審核</option>                                                
                                                <option value="1">刪除</option>
                                                <option value="2">保留</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" id="edit" name="button" 
                                                    class="edit-btn" 
                                                    @click="lightbox_show(value.repoNo,value.repoStatus)">
                                                        確定
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                                <div class="lightbox_black" v-if="lightbox">
                                    <div class="lightbox" >
                                        <div class="manager_lightbox_close" @click="lightbox = false"><img src="./img/close.png"></div>
                                        <div>確定要將  留言檢舉號碼 - <span>{{lightbox_repo_no}}</span>號<span>{{lightbox_text}}</span> 嗎??</div>
                                        <div @click="change_status(lightbox_repo_no,lightbox_status)">確定修改</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `,
    methods: {
        //呼叫php程式，取回 檢舉留言 相關資料，並用json()轉回一般陣列
        get_comm: async function () {
            const res = await fetch('./php/back_comment.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.comments = res;
        },
        changestaus(event, key) {
            this.comments[key].repoStatus = event.currentTarget.value;
            console.log(this.comments[key].repoStatus);
        },
        // 點擊修改後，顯示燈箱 並帶入值
        lightbox_show: function (repoNo, repoStatus) {
            this.lightbox = true;
            this.lightbox_repo_no = repoNo;

            if (repoStatus == 0) {
                this.lightbox_status = 0;
                this.lightbox_text = '做什麼事';
            } else if (repoStatus == 1) {
                this.lightbox_status = 1;
                this.lightbox_text = '刪除';
            } else if (repoStatus == 2) {
                this.lightbox_status = 2;
                this.lightbox_text = '保留';
            }
        },
        // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
        change_status: async function (repoNo, status) {
            const res = await fetch('./php/back_update_comment.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repoNo: repoNo,
                    repoStatus: status,
                }),
            });
            //關閉燈箱
            this.lightbox = false;
            //完成後 重新撈取一次資料
            this.get_comm();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_comm();
    },
});

// ==========商城管理============
Vue.component('back-mall', {
    data() {
        return {
            //撈出來的 商品資料
            products: '',
            lightbox: false,
            lightbox_pro_no: '',
            lightbox_status: '',
            lightbox_pro_name: '',
            lightbox_text: '',
            pro_edit_lightbox: false,
            pro_add_lightbox: false,
            proNo: '',
            proType: '',
        };
    },
    props: [],

    template: `
<div class="right-block_mall">
    <div class="right-block">
        <div class="main">
            <h2>商城管理</h2>
            <div class="form-wrap">
                <div class="add-bar">
                    <button type="button" id="add-show" name="button" class="add-btn" @click="pro_add()">新增商品</button>
                </div>
                <div class="content-list">
                    <table>
                        <tr>
                            <th>商品編號</th>
                            <th>商品類別</th>
                            <th>使用課程</th>
                            <th>商品名稱</th>
                            <th>商品價格</th>
                            <th>商品圖片</th>
                            <th>上架狀態</th>
                            <th>編輯</th>
                        </tr>
                        <tr v-for="(value,key) in products" >
                            <td>{{value.proNo}}</td>
                            <td>{{changecourTypeNo(value.courTypeNo)}}</td>
                            <td>{{value.courseName}}</td>
                            <td>{{value.proName}}</td>
                            <td>{{value.proPrice}}</td>
                            <td class="item_img"><img :src="value.proImg" /></td>
                            <td>
                                <div
                                    class="button"
                                    @click="lightbox_show(value.proNo,value.proName,value.proStatus)"
                                >
                                    <input type="checkbox" v-model="value.ischecked" />
                                    <label></label>
                                </div>
                            </td>
                            <td><button @click="pro_edit(value.proNo)">編輯</button></td>
                        </tr>
                    </table>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox">
                            <div class="manager_lightbox_close" @click="lightbox = false">
                                <img src="./img/close.png" />
                            </div>
                            <div>
                                確定要將 商品 - <span>{{lightbox_pro_name}}</span>，<span
                                    >{{lightbox_text}}</span
                                >
                                嗎??
                            </div>
                            <div @click="change_status(lightbox_pro_no,lightbox_status)">確定修改</div>
                        </div>
                    </div>
                    <pro_edit v-if="pro_edit_lightbox" :proNo="proNo" @changelightbox="proeditlightbox()"></pro_edit>
                    <pro_add v-if="pro_add_lightbox"  @changelightbox="proaddlightbox()"></pro_add>                
                </div>
            </div>
        </div>
    </div>
</div>

  `,
    methods: {
        //呼叫php程式，取回 商品 相關資料，並用json()轉回一般陣列
        get_pro: async function () {
            const res = await fetch('./php/back_product.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.products = res;
        },
        // 點擊修改後，顯示燈箱 並帶入值
        lightbox_show: function (proNo, proName, proStatus) {
            this.lightbox = true;
            this.lightbox_pro_no = proNo;
            this.lightbox_pro_name = proName;

            if (proStatus == 0) {
                this.lightbox_status = 1;
                this.lightbox_text = '上架';
            } else if (proStatus == 1) {
                this.lightbox_status = 0;
                this.lightbox_text = '下架';
            }
        },
        changecourTypeNo(courTypeNo) {
            if (courTypeNo == 1) {
                return '攻擊型';
            } else if (courTypeNo == 2) {
                return '防禦型';
            } else if (courTypeNo == 3) {
                return '輔助型';
            }
        },
        // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
        change_status: async function (proNo, status) {
            const res = await fetch('./php/back_update_product.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    proNo: proNo,
                    proStatus: status,
                }),
            });
            //關閉燈箱
            this.lightbox = false;
            //完成後 重新撈取一次資料
            this.get_pro();
        },
        //點擊"編輯" 開啟編輯商品燈箱
        pro_edit(proNo) {
            this.pro_edit_lightbox = true;
            this.proNo = proNo;
        },
        //關閉"編輯商品"燈箱，同時重新渲染畫面
        proeditlightbox() {
            this.pro_edit_lightbox = false;
            this.get_pro();
        },
        //點擊"新增" 開啟新增商品燈箱
        pro_add() {
            this.pro_add_lightbox = true;
        },
        //關閉"新增商品"燈箱，同時重新渲染畫面
        proaddlightbox() {
            this.pro_add_lightbox = false;
            this.get_pro();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_pro();
    },

    mounted() {},
}),
    //----------編輯商品(組件)----------
    Vue.component('pro_edit', {
        data() {
            return {
                courses: '',
                courseNo: '',
                proName: '',
                proImg: '',
                proDescription: '',
                proPrice: '',
                error_text: '',
                error_text_des: '',
                error_text_price: '',
                updatecourseNo: '',
            };
        },
        props: ['proNo'],

        template: `
<div class="lightbox_add_black">
    <div class="lightbox">
        <div class="manager_lightbox_close" @click="changelightbox"><img src="./img/close.png" /></div>
        <div class="add-form">
            <h2 id="pNameText">編輯商品</h2>
            <div class="addcoursecon">
                <div class="acc_title">商品編號</div>
                <div class="acc_con">{{proNo}}</div>
            </div>
            <div class="addcoursecon">
                <div class="acc_title">選擇課程</div>
                <select name="courseNo" id="courseNo" class="acc_con" v-model="courseNo" >
                    <option v-for="(value,key) in courses">
                    {{value.courseNo}},
                    {{changecourTypeNo(value.courTypeNo)}},
                    {{value.courseName}}</option>
                </select>
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品名稱</div>
                <input type="text" id="proName" class="acc_con" v-model="proName"/>
                {{error_text}}
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品價格</div>
                <input type="text" required="required" id="proPrice" class="acc_con" v-model="proPrice"/>
                {{error_text_price}}
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品圖片</div>
                <!-- <img :src="proImg" alt="" > -->
                <input id="file" type="file" class="acc_con"  />
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品描述</div>
                <textarea type="text" id="proDescription" class="acc_con" v-model="proDescription"></textarea>
                {{error_text_des}}
            </div>
            <button type="sumbit" class="form_btn" 
                @click="edit_pro_func(courseNo,
                proName,
                proImg,
                proDescription,
                proPrice)">確定修改</button>
        </div>
    </div>
</div>
    `,
        methods: {
            get_pro: async function () {
                const res = await fetch('./php/back_pro_one.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        proNo: this.proNo,
                    }),
                }).then(function (data) {
                    return data.json();
                });
                this.courseNo = res[0].courseNo;
                this.proName = res[0].proName;
                this.proPrice = res[0].proPrice;
                this.proImg = res[0].proImg;
                this.proDescription = res[0].proDescription;
                this.proType = res[0].proType;
            },
            //呼叫php程式，取回 課程 相關資料，並用json()轉回一般陣列
            get_course: async function () {
                const res = await fetch('./php/back_course.php', {}).then(function (data) {
                    return data.json();
                });
                // 取回res值後，呼叫另一隻函式
                this.courses = res;
            },
            changecourTypeNo(courTypeNo) {
                if (courTypeNo == 1) {
                    return '攻擊型';
                } else if (courTypeNo == 2) {
                    return '防禦型';
                } else if (courTypeNo == 3) {
                    return '輔助型';
                }
            },
            //點擊 確認修改後將資料傳至DB
            edit_pro_func: async function (courseNo, proName, proImg, proDescription, proPrice) {
                console.log(courseNo, proName, proImg, proDescription, proPrice);

                //送出編輯前 確認欄位 是否符合規定
                //商品名稱 中文(1~6字)
                if (proName.replace(/[^\u4e00-\u9fa5]/g, '') && proName.length >= 1 && proName.length <= 6) {
                    console.log('商品名稱 成功');
                } else {
                    this.error_text = '商品名稱，請輸入中文(1~6字)';
                    return '';
                }

                //商品描述 (1~100字)
                if (
                    proDescription.replace(/[^\u4e00-\u9fa5]/g, '') &&
                    proDescription.length >= 1 &&
                    proDescription.length <= 100
                ) {
                    console.log('商品描述 成功');
                } else {
                    this.error_text_des = '商品描述，請輸入中文(1~100字)';
                    return '';
                }

                //商品金額 數字
                if (proPrice.replace(/\D/g, '')) {
                    console.log('商品金額 成功');
                } else {
                    this.error_text_price = '商品金額，請輸入數字';
                    return '';
                }

                const res = await fetch('./php/back_pro_update_one.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        proNo: this.proNo,
                        courseNo: this.updatecourseNo,
                        proName: proName,
                        proImg: proImg,
                        proDescription: proDescription,
                        proPrice: proPrice,
                    }),
                });
                //關燈箱
                this.changelightbox();
            },
            //關燈箱
            changelightbox() {
                this.$emit('changelightbox');
            },
        },
        created() {
            this.get_pro();
            this.get_course();
        },
        watch: {
            courseNo() {
                this.updatecourseNo = this.courseNo.split(',')[0];
            },
        },
    });
//----------新增商品(組件)----------
Vue.component('pro_add', {
    data() {
        return {
            courses: '',
            courseNo: '',
            proName: '',
            proImg: '',
            proDescription: '',
            proPrice: '',
            error_text: '',
            error_text_des: '',
            error_text_price: '',
            updatecourseNo: '',
        };
    },
    props: [],

    template: `
    <div class="lightbox_add_black">
    <div class="lightbox">
        <div class="manager_lightbox_close" @click="changelightbox"><img src="./img/close.png" /></div>
        <div class="add-form">
            <h2 id="pNameText">編輯商品</h2>
            <div class="addcoursecon">
                <div class="acc_title">商品編號</div>
                <div class="acc_con"></div>
            </div>
            <div class="addcoursecon">
                <div class="acc_title">選擇課程</div>
                <select name="courseNo" id="courseNo" class="acc_con" v-model="courseNo" >
                    <option v-for="(value,key) in courses">
                    {{value.courseNo}},
                    {{changecourTypeNo(value.courTypeNo)}},
                    {{value.courseName}}</option>
                </select>
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品名稱</div>
                <input type="text" id="proName" class="acc_con" v-model="proName"/>
                {{error_text}}
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品價格</div>
                <input type="text" required="required" id="proPrice" class="acc_con" v-model="proPrice"/>
                {{error_text_price}}
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品圖片</div>
                <!-- <img :src="proImg" alt="" > -->
                <input id="file" type="file" class="acc_con"  />
            </div>
            <div class="addcoursecon">
                <div class="acc_title">商品描述</div>
                <textarea type="text" id="proDescription" class="acc_con" v-model="proDescription"></textarea>
                {{error_text_des}}
            </div>
            <button type="sumbit" class="form_btn" 
                @click="add_pro_func(courseNo,
                proName,
                proImg,
                proDescription,
                proPrice)">確定新增</button>
        </div>
    </div>
</div>
        `,
    methods: {
        //呼叫php程式，取回 商品 相關資料，並用json()轉回一般陣列
        get_pro: async function () {
            const res = await fetch('./php/back_product.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.products = res;
        },
        //呼叫php程式，取回 課程 相關資料，並用json()轉回一般陣列
        get_course: async function () {
            const res = await fetch('./php/back_course.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.courses = res;
        },
        changecourTypeNo(courTypeNo) {
            if (courTypeNo == 1) {
                return '攻擊型';
            } else if (courTypeNo == 2) {
                return '防禦型';
            } else if (courTypeNo == 3) {
                return '輔助型';
            }
        },

        //關燈箱
        changelightbox() {
            this.$emit('changelightbox');
        },
        //點擊 確認新增後將資料傳至DB
        add_pro_func: async function (courseNo, proName, proImg, proDescription, proPrice) {
            console.log(courseNo, proName, proImg, proDescription, proPrice);

            //送出新增前 確認欄位 是否符合規定
            //商品名稱 中文(1~6字)
            if (proName.replace(/[^\u4e00-\u9fa5]/g, '') && proName.length >= 1 && proName.length <= 6) {
                console.log('商品名稱 成功');
            } else {
                this.error_text = '商品名稱，請輸入中文(1~6字)';
                return '';
            }

            //商品描述 (1~100字)
            if (
                proDescription.replace(/[^\u4e00-\u9fa5]/g, '') &&
                proDescription.length >= 1 &&
                proDescription.length <= 100
            ) {
                console.log('商品描述 成功');
            } else {
                this.error_text_des = '商品描述，請輸入中文(1~100字)';
                return '';
            }

            //商品金額 數字
            if (proPrice.replace(/\D/g, '')) {
                console.log('商品金額 成功');
            } else {
                this.error_text_price = '商品金額，請輸入數字';
                return '';
            }

            const res = await fetch('./php/back_insert_product.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseNo: this.updatecourseNo,
                    proName: proName,
                    proImg: proImg,
                    proDescription: proDescription,
                    proPrice: proPrice,
                }),
            }).then(function () {
                console.log('in');
            });
            console.log('完成');

            //關燈箱
            this.changelightbox();
            //完成後 重新撈取一次資料
            console.log('重撈');
            this.get_pro();
        },
    },
    created() {
        this.get_pro();
        this.get_course();
    },
    watch: {
        courseNo() {
            this.updatecourseNo = this.courseNo.split(',')[0];
        },
    },
});

// ==========遊戲管理============
Vue.component('back-game', {
    data() {
        return {
            //撈出來的 遊戲規則資料
            games: '',
            lightbox: false,
            lightbox_game_no: '',
            lightbox_status: '',
            lightbox_text: '',
        };
    },
    props: [],

    template: `
  <div class="right-block_game">
                <div class="right-block">
                    <div class="main">
                        <h2>小遊戲管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <input type="text" id="scoreMin" placeholder="得分下限" />
                                <input type="text" id="scoreMax" placeholder="得分上限" />
                                <input type="text" id="memGamePoint" placeholder="獲得點數" />
                                <button type="button" id="add" name="button" class="add-btn">新增</button>
                            </div>
                            <div class="content-list">
                                <table>
                                    <tr>
                                        <th>編號</th>
                                        <th>得分下限</th>
                                        <th>得分上限</th>
                                        <th>獲得點數</th>
                                        <th>啟用</th>
                                    </tr>
                                    <tr v-for="(value,key) in games">
                                        <td>{{value.gameruleNo}}</td>
                                        <td>{{value.scoreMin}}</td>
                                        <td>{{value.scoreMax}}</td>
                                        <td>{{value.scoreMin}}<=Point<={{value.scoreMax}}</td>
                                        <td>
                                            <div class="button" @click="lightbox_show(value.gameruleNo,value.gameStatus)">
                                                <input type="checkbox" v-model="value.ischecked" />
                                                <label ></label>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <div class="lightbox_black" v-if="lightbox">
                                    <div class="lightbox" >
                                        <div class="manager_lightbox_close" @click="lightbox = false"><img src="./img/close.png"></div>
                                        <div>確定要將  遊戲規則 - <span>{{lightbox_game_no}}號 </span><span>{{lightbox_text}}</span>嗎??</div>
                                        <div @click="change_status(lightbox_game_no,lightbox_status)">確定修改</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `,
    methods: {
        //呼叫php程式，取回 管理員帳號 相關資料，並用json()轉回一般陣列
        get_game: async function () {
            const res = await fetch('./php/back_game.php', {}).then(function (data) {
                return data.json();
            });
            // 取回res值後，呼叫另一隻函式
            this.games = res;
        },
        // 點擊修改後，顯示燈箱 並帶入值
        lightbox_show: function (gameruleNo, gameStatus) {
            this.lightbox = true;
            this.lightbox_game_no = gameruleNo;

            if (gameStatus == 0) {
                this.lightbox_status = 1;
                this.lightbox_text = '啟用';
            } else if (gameStatus == 1) {
                this.lightbox_status = 0;
                this.lightbox_text = '停用';
            }
        },
        // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
        change_status: async function (gameruleNo, status) {
            const res = await fetch('./php/back_update_gamerule.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameruleNo: gameruleNo,
                    gameStatus: status,
                }),
            });
            //關閉燈箱
            this.lightbox = false;
            //完成後 重新撈取一次資料
            this.get_game();
        },
    },
    // template 渲染前 會先去執行以下函式
    created() {
        this.get_game();
    },
});

new Vue({
    el: '#app',
    data: {
        content: 'back-admin',
    },
    methods: {},
});
