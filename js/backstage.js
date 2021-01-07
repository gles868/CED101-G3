// ==========管理員管理============
Vue.component('back-admin', {
  template: `
  <div class="right-block_admin">
                <div class="right-block">
                    <div class="main">
                        <h2>管理員管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <input type="text" id="adminName" placeholder="名稱" />
                                <input type="text" id="adminId" placeholder="帳號" />
                                <input type="password" id="adminPwd" placeholder="密碼" />
                                <button type="button" id="add" name="button" class="add-btn">新增</button>
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
                                    <tr>
                                        <td>1</td>
                                        <td>王大明</td>
                                        <td>a123456</td>
                                        <td>a123456</td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`,
});

// ==========會員管理============
Vue.component('back-member',{
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
                      <tr>
                          <td>1</td>
                          <td>王大明</td>
                          <td>a123456</td>
                          <td>psw1234</td>                          
                          <td>aaa0487@gmail.com</td>
                          <td>
                              <label class="button">
                                  <input type="checkbox" class="switch ios" />
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <td>2</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <label class="button">
                                  <input type="checkbox" class="switch ios" />
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <td>3</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <label class="button">
                                  <input type="checkbox" class="switch ios" />
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <td>4</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <label class="button">
                                  <input type="checkbox" class="switch ios" />
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <td>5</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <label class="button">
                                  <input type="checkbox" class="switch ios" />
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <td>6</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <label class="button">
                                  <input type="checkbox" class="switch ios" />
                              </label>
                          </td>
                      </tr>
                  </table>
              </div>
          </div>
      </div>
  </div>
</div>`

})

// ==========教師管理============
Vue.component('back-teacher',{
  template: `
  <div class="right-block_teacher">
                <div class="right-block">
                    <div class="main">
                        <h2>教師管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <input type="text" id="teacherName" placeholder="名稱" />
                                <input type="text" id="teacherId" placeholder="帳號" />
                                <input type="password" id="teacherPwd" placeholder="密碼" />
                                <button type="button" id="add" name="button" class="add-btn">新增</button>
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
                                    <tr>
                                        <td>1</td>
                                        <td>王大明老師</td>
                                        <td>a123456</td>
                                        <td>pswteacher</td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `
})

// ==========課程管理============
Vue.component('back-course',{
  template: `
  <div class="right-block_course">
                <!-- 新增課程燈箱 -->
                <div class="add-modal-wrapper" id="add-modal">
                    <div class="modal">
                        <div class="close-modal">
                            <i class="fa fa-2x fa-times"></i>
                        </div>
                        <div id="add-form">
                            <h2 id="courseNameText"></h2>
                            <div class="addcoursecon">
                                <div class="acc_title">課程編號</div>
                                <input type="text" id="courseNo" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">課程類別編號</div>
                                <select name="courseType" id="courTypeNo" class="acc_con">
                                    <option value="0" selected>攻擊型</option>
                                    <option value="1">防禦型</option>
                                    <option value="2">輔助型</option>
                                  </select>
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">課程名稱</div>
                                <input type="text" id="courseName" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">課程圖片</div>
                                <input id="file" type="file" accept="image/*" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">課程描述</div>
                                <textarea type="text" id="courseDescription" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">課程金額</div>
                                <input type="text" id="coursePrice" class="acc_con" />
                            </div>
                            <button type="sumbit" id="submit-btn">確認</button>
                        </div>
                    </div>
                </div>
                <!-- 課程管理主要區域 -->
                <div class="right-block">
                    <div class="main">
                        <h2>課程管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <button type="button" id="add-show" name="button" class="add-btn">新增課程</button>
                            </div>
                            <div class="content-list">
                                <table>
                                    <tr>
                                        <th>課程編號</th>
                                        <th>課程類別名稱</th>
                                        <th>課程名稱</th>
                                        <th>課程圖片</th>
                                        <th>課程描述</th>
                                        <th>課程金額</th>
                                        <th>狀態</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>攻擊型</td>
                                        <td>飛行術</td>
                                        <td>飛行術圖片</td>
                                        <td>飛行術描述在這邊</td>
                                        <td>$7000</td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <!-- <label class="button">
                                            <input type="checkbox" class="switch ios" />
                                        </label> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <!-- <label class="button">
                                            <input type="checkbox" class="switch ios" />
                                        </label> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <!-- <label class="button">
                                            <input type="checkbox" class="switch ios" />
                                        </label> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <!-- <label class="button">
                                            <input type="checkbox" class="switch ios" />
                                        </label> -->
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `,
  mounted() {
    // light box
    $(function () {
      $('#add-show').click(function () {
          $('#add-modal').fadeIn();

          //按下新增按鈕後顯示輸入資料
          var result1 = $('#courseName').val();
          $('#courseNameText').text(result1);

          var result2 = $('#coursePrice').val();
          $('#coursePriceText').text(result2);

          var result3 = $('#teachNo').val();
          $('#teachNoText').text(result3);

          var result4 = $('#classNo').val();
          $('#classNoText').text(result4);

          var result5 = $('#courseStartDate').val();
          $('#courseStartDateText').text(result5);

          var result6 = $('#minRegistNum').val();
          $('#minRegistNumText').text(result6);

          var result7 = $('#maxRegistNum').val();
          $('#maxRegistNumText').text(result7);
      });

      $('.close-modal').click(function () {
          $('#add-modal').fadeOut();
      });

      $('#submit-btn').click(function () {
          $('#add-modal').fadeOut();
      });
  });
  },

})

// ==========留言檢舉管理============
Vue.component('back-comment',{
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
                                    <tr>
                                        <td>1</td>
                                        <td>a123456</td>
                                        <td>王大明</td>
                                        <td>大推哈利老師</td>
                                        <td>言論內容不當</td>
                                        <td>2021/01/07</td>
                                        <td>
                                            <select name="state">
                                                <option value="1" selected>保留</option>
                                                <option value="2">刪除</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" id="edit" name="button" class="edit-btn">確定</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <select name="state">
                                                <option value="1" selected>保留</option>
                                                <option value="2">刪除</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" id="edit" name="button" class="edit-btn">確定</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <select name="state">
                                                <option value="1" selected>保留</option>
                                                <option value="2">刪除</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" id="edit" name="button" class="edit-btn">確定</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <select name="state">
                                                <option value="1" selected>保留</option>
                                                <option value="2">刪除</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" id="edit" name="button" class="edit-btn">確定</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `
})

// ==========商城管理============
Vue.component('back-mall',{
  template: `
  <div class="right-block_mall">
                <!-- 新增商品燈箱 -->
                <div class="add-modal-wrapper" id="add-modal">
                    <div class="modal">
                        <div class="close-modal">
                            <i class="fa fa-2x fa-times"></i>
                        </div>
                        <div id="add-form">
                            <h2 id="pNameText"></h2>
                            <div class="addcoursecon">
                                <div class="acc_title">商品編號</div>
                                <input type="text" id="proNo" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">課程編號</div>
                                <select name="courseNo" id="courseNo" class="acc_con">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">商品名稱</div>
                                <input type="text" id="proName" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">商品價格</div>
                                <input type="text" id="proPrice" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">商品圖片</div>
                                <input id="file" type="file" accept="image/*" class="acc_con" />
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">商品描述</div>
                                <textarea type="text" id="proDescription" class="acc_con"></textarea>
                            </div>
                            <div class="addcoursecon">
                                <div class="acc_title">商品類別</div>
                                <select name="proType" id="proType" class="acc_con">
                                    <option value="1">攻擊型</option>
                                    <option value="2">防禦型</option>
                                    <option value="3">輔助型</option>
                                </select>
                            </div>
                            <button type="sumbit" id="submit-btn">確認</button>
                        </div>
                    </div>
                </div>
                <!-- 商城管理主要內容 -->
                <div class="right-block">
                    <div class="main">
                        <h2>商城管理</h2>
                        <div class="form-wrap">
                            <div class="add-bar">
                                <button type="button" id="add-show" name="button" class="add-btn">新增商品</button>
                            </div>
                            <div class="content-list">
                                <table>
                                    <tr>
                                        <th>商品編號</th>
                                        <th>使用課程</th>
                                        <th>商品名稱</th>
                                        <th>商品價格</th>
                                        <th>商品圖片</th>
                                        <th>商品描述</th>
                                        <th>商品類別</th>
                                        <th>上架狀態</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>預言學</td>
                                        <td>水晶球</td>
                                        <td>$5000</td>
                                        <td class="prodImg"><img src="./img/p5.png" /></td>
                                        <td>這是一顆神奇的魔法水晶球描述</td>
                                        <td>輔助型</td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `,
  mounted() {
      //顯示選取檔案之圖片
      $('#file').change(function () {
        var file = $('#file')[0].files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#demoImg').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    });

    // light box
    $(function () {
        $('#add-show').click(function () {
            $('#add-modal').fadeIn();

            //按下新增按鈕後顯示輸入資料
            var result1 = $('#pName').val();
            $('#pNameText').text(result1);

            var result2 = $('#price').val();
            $('#priceText').text(result2);

            var result3 = $('#qty').val();
            $('#qtyText').text(result3);

            var result4 = $('#state').find('option:selected').text();
            $('#stateText').text(result4);
        });

        $('.close-modal').click(function () {
            $('#add-modal').fadeOut();
        });

        $('#submit-btn').click(function () {
            $('#add-modal').fadeOut();
        });
    });
  },
}),

// ==========遊戲管理============
Vue.component('back-game',{
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
                                    <tr>
                                        <td>1</td>
                                        <td>50</td>
                                        <td>300</td>
                                        <td>50<=point<=300</td>
                                        <td>
                                            <label class="button">
                                                <input type="checkbox" class="switch ios" />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <!-- <label class="button">
                                            <input type="checkbox" class="switch ios" />
                                        </label> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <!-- <label class="button">
                                            <input type="checkbox" class="switch ios" />
                                        </label> -->
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `
})

new Vue({
  el: '#app',
  data: {
      content: 'back-admin',
  },
});