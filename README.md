01.19麻煩大家幫引入以下：

  <b>(1) 在自己頁面的html，`<body>`結束前引入login.js<br></b>
  <pre><script src="js/login.js"></script></pre>
  
<br>
  <b>(2)  在自己頁面的html，`<body>`結束前引入`<script>`</b> → 滾動導覽列加背景色(顏色暫定) & 接會員資料的new vue
  
```    
    <script>
        // scroll更改header背景色
        window.addEventListener('scroll', function(){
            let getScrollTop = document.documentElement.scrollTop;
            let header = document.querySelector('header');
            
            if(getScrollTop > 60){
                header.classList.add('-active');
            }else{
                header.classList.remove('-active');
            }
        });
        
        // 專門給header接會員照片資料 | 判斷是否登入的new Vue
        // 必須給new Vue一個名稱(memNavInfo)，才能接到php回傳的會員資料
        let memNavInfo = new Vue({
            el: '#memInfo',
            data: {
                memData: {},
            },
        })
    </script>
 ```
<br>
  
  <b>(3) 在自己頁面的html，把舊的`<header></header>`內容全部覆蓋為：</b>
  ```html
    <header>
        <nav>
            <div class="menu_toggle">
                <input type="checkbox">
                <div class="logo">
                    <a href="index.html"><img src="./img/logo.png"></a>
                </div>
                <ul class="nav">
                    <li><a href="course.html">課程總覽</a></li>
                    <li><a href="teacher.html">教師總覽</a></li>
                    <li>
                        <a href="index.html"><img src="./img/logo.png"></a>
                    </li>
                    <li><a href="mall.html">商城</a></li>
                    <li><a href="game.html">小遊戲</a></li>
                </ul>
                <div class="ham">
                    <span></span> 
                    <span></span> 
                    <span></span>
                </div>
                <ul class="nav-right">
                    <li>
                        <a href="member.html">
                        <!-- <a :href="'member.html?memberNo=' + this.memData.memberNo"> -->
                            <i id="memIcon" class="fas fa-user-circle fa-lg"></i>
                            <div id="memInfo">
                                <div id="avatar">
                                    <img :src="'img/' + this.memData.memAvatar" alt="">
                                </div>
                            </div>
                        </a>
                        <span id="logout"></span>
                    </li>
                    <li><a href="cart.html"><i class="fas fa-shopping-cart fa-lg"></i></a></li>
                </ul>
            </div>
        </nav>
    </header>
   ```
   
<br>

   <b>(4) 在自己頁面的html，`<header></header>`下方貼這段：</b> → 登入註冊燈箱
   
   ```html
   <!-- 登入註冊燈箱 -->
    <div class="lightbox-bg"></div>
    <div class="container" id="container">
        <span class="close"><i class="fas fa-times fa-xs"></i></span>
        <!-- 註冊 -->
        <div class="form-container sign-up-container">
            <form id="signUpForm">
                <h2>會員註冊</h2>
                <input type="text" id="signUpName" placeholder="輸入姓名" />
                <input type="email" id="sigUpEmail" placeholder="輸入email" />
                <input type="text" id="signUpId" placeholder="輸入帳號" />
                <input type="password" id="signUpPsw" placeholder="輸入密碼(至少含各一位英數字)" />
                <input type="password" id="checkPsw" placeholder="確認密碼" name="checkPsw">
                <input type="button" id="signUpSubmit" value="註冊">

                <div class="notice"></div>
                <div class="notice"></div>
                <div class="notice"></div>
                <div class="notice"></div>
                <div class="notice"></div>
            </form>
        </div>      
        <!-- 登入 -->
        <div class="form-container sign-in-container">
            <form id="signInForm">
                <h2>會員登入</h2>
                <input type="text" name="memId" id="memId" placeholder="輸入帳號" />
                <input type="password" name="memPsw" id="memPsw" placeholder="輸入密碼" />
                <span id="forgetPsw">忘記密碼?</span>
                <input type="button" id="signInSubmit" value="登入">
                
                <div class="notice" style="top: 140px"></div>
                <div class="notice" style="top: 198px"></div>
            </form>
        </div>
        
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <button type="button" class="check" id="signIn">登入</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <button type="button" class="check" id="signUp">註冊</button>
                </div>
            </div>
        </div> 
    </div>
  ```
  
<br>

  <b>(6) 在自己的導覽列標籤`<a>`，新增`class="active"`，</b>
  
```html
---- [ex] 教師總覽頁 ----

<li><a class="active" href="teacher.html">教師總覽</a></li>
```

  
<br>

<b>(5) 記得要在`<head>`引入vue</b>
  
```html
    <!-- Vue -->
    <script src="./js/vue.js"></script>
```

