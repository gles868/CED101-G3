// 燈箱
let memIcon = document.querySelector('.nav-right > li:nth-child(1) > a');
let lightbox = document.querySelector('#container');
let lightboxBg = document.querySelector('.lightbox-bg');
let closeSpan = document.querySelector('.close');
// 登入
let memId = document.getElementById('memId');
let memPsw = document.getElementById('memPsw');
let signInInput = document.querySelectorAll('.sign-in-container input');
let signInBtn = document.getElementById('signInSubmit');
let checkNoticeSignIn = document.querySelectorAll('#signInForm > .notice');

// 註冊
let signUpName = document.getElementById('signUpName');
let signUpEmail = document.getElementById('sigUpEmail');
let signUpId = document.getElementById('signUpId');
let signUpPsw = document.getElementById('signUpPsw');
let pswAgain = document.getElementById('checkPsw');

let signUpInput = document.querySelectorAll('.sign-up-container input');
let signUpBtn = document.getElementById('signUpSubmit');
let checkNotice = document.querySelectorAll('#signUpForm > .notice');

// --- 提示樣式
function warnStyle(i){
    signUpInput[i].style.border = '1px solid #f57c35';
    signUpInput[i].addEventListener('focus', function(){
        signUpInput[i].style.border = '0px';
        checkNotice[i].innerText = '';
    });
}

// 是否為會員 => 跳燈箱或會員中心
function getDataShowLightbox(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let memData = JSON.parse(xhr.responseText);
        console.log(memData.memberNo);
        if(memData.memberNo){  // 如果有資料
            console.log('here');
            // ------------導覽列要顯示會員名稱
            // ------------顯示登出
        }else{
            // 顯示燈箱
            memIcon.addEventListener('click', function(e){
                e.preventDefault();
                lightbox.style.display = 'block';
                lightboxBg.style.display = 'block';
            });
        }
    }
    xhr.open('get', 'php/getLoginData.php', true);
    xhr.send(null);
}
// 關燈箱
function closeLightbox(){
    lightbox.style.display = 'none';
    lightboxBg.style.display = 'none';
}
// 登入
function checkMemIdPsw(){
    for(let i = 0; i < signInInput.length-1; i++){
        // 去除空格( \s空字串 \g全域匹配 ) 
        signInInput[i].value.replace(/\s+/g, '');
    }
    // 欄位是否為空
    if(memId.value == '' || memId.value == undefined || memId.value == null){
        checkNoticeSignIn[0].innerText = '尚未輸入帳號';
        signInInput[0].style.border = '1px solid #f57c35';
        signInInput[0].addEventListener('focus', function(){
            signInInput[0].style.border = '0px';
            checkNotice[0].innerText = '';
        });
        console.log(memId.value);
    }else if(memPsw.value == '' || memPsw.value == undefined || memPsw.value == null){
        checkNoticeSignIn[1].innerText = '尚未輸入密碼';
        signInInput[1].style.border = '1px solid #f57c35';
        signInInput[1].addEventListener('focus', function(){
            signInInput[1].style.border = '0px';
            checkNotice[1].innerText = '';
        });
    }
}
function sendData(){
    // 是否已有該會員
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){  // 請求送出，並且執行成功
            if(xhr.responseText.indexOf('無此會員') == -1){  // 登入成功
                let membRow = JSON.parse(xhr.responseText);
                alert(`hello${membRow.memName}, 你好：)`);
                for(let i = 0; i < signInInput.length-1; i++){
                    signInInput[i].value = '';  // 清空欄位
                }
                // 關閉燈箱
                lightbox.style.display = 'none';
                lightboxBg.style.display = 'none';
                // 載入會員資料
                getDataShowLightbox();
            }else{
                alert('帳密錯誤');
            }
        }else{
            alert(xhr.status);
            console.log(xhr.responsetext);
        }
    }
    let url = 'php/login.php';
    xhr.open('post', url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    let data_info = `memId=${memId.value}&memPsw=${memPsw.value}`;
    xhr.send(data_info);
}
// 註冊
for(let i = 0; i < signInInput.length-1; i++){ 
    signInInput[i].value.replace(/\s*/g, '');
}
// 檢測欄位為空-姓名
function checkName(){
    if(signUpName.value == '' || signUpName.value == undefined || signUpName.value == null){
        checkNotice[0].innerText = '尚未輸入姓名';
        warnStyle(0);
    }
}
// for(let i = 0; i < signUpInput.length-1; i++){
//     signUpInput[i].addEventListener('blur', function(){
//         if(signUpInput[i].value == '' || signUpInput[i].value == undefined || signUpInput[i].value == null){
//             warnStyle(i);
//             switch(signUpInput[i]){
//                 case signUpInput[0]:
//                     checkNotice[0].innerText = '尚未輸入姓名';
//                     break;
//             }
//         }
//     }); 
// }

// 驗證mail
function checkEmail(){
    let mailFormat = /^\w+\@\w+\.[A-Za-z]+$/;
    if(signUpEmail.value == '' || signUpEmail.value == undefined || signUpEmail.value == null){
        checkNotice[1].innerText = '尚未輸入email';
        warnStyle(1);
    }else if(signUpEmail.value.search(mailFormat) == -1){
        checkNotice[1].innerText = '請輸入正確格式';
        warnStyle(1);
    }else{
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                let res = xhr.responseText;
                if(res.indexOf('可以使用此email') == -1 ){
                    checkNotice[1].innerHTML = `<i class="fas fa-exclamation"></i>${res}`;
                    warnStyle(1);
                }else{
                    checkNotice[1].innerHTML = `
                        <i class="fas fa-check" style="color: #588ad6;"></i>
                        <span style="color: #588ad6;">${res}</span>
                    `;
                }
            }
        }
        let url = `php/checkSignUpId.php?memMail=${signUpEmail.value}`;
        xhr.open('get', url, true);
        xhr.send(null);
    }
}
// 驗證帳號
function checkId(){
    if(signUpId.value == '' || signUpId.value == undefined || signUpId.value == null){
        checkNotice[2].innerText = '尚未輸入帳號';
        warnStyle(2);
    }else{
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                let res = xhr.responseText;
                if(res.indexOf('可以使用此帳號') == -1 ){
                    checkNotice[2].innerHTML = `<i class="fas fa-exclamation"></i>${res}`;
                    warnStyle(2);
                }else{
                    checkNotice[2].innerHTML = `
                        <i class="fas fa-check" style="color: #588ad6;"></i>
                        <span style="color: #588ad6;">${res}</span>
                    `;
                }
            }
        }
        let url = `php/checkSignUpId.php?memId=${signUpId.value}`;
        xhr.open('get', url, true);
        xhr.send(null);
    }
}
// 驗證密碼
function checkPsw(){
    let pswFormat = /^(?=.*\d)(?=.*[a-z]).{6,12}$/;
    if(signUpPsw.value == '' || signUpPsw.value == undefined || signUpPsw.value == null){
        checkNotice[3].innerText = '尚未輸入密碼';
        warnStyle(3);
    }else if(signUpPsw.value.search(pswFormat) == -1){
        checkNotice[3].innerText = '請至少包含各一位英數字';
        warnStyle(3);
    }
}
// 確認密碼欄位為空
function checkPswAgain(){
    if(pswAgain.value == '' || pswAgain.value == undefined || pswAgain.value == null){
        checkNotice[4].innerText = '尚未輸入密碼';
        warnStyle(4);
    }
}
// 確認密碼相同
function checkPswTheSame(){
    if(pswAgain.value == signUpPsw.value){
        console.log('欸');
        checkNotice[4].innerHTML = `
            <i class="fas fa-check" style="color: #588ad6;"></i>
            <span style="color: #588ad6;">密碼輸入正確</span>
        `;
    }
}

// 送出資料
function submitMemData(){
    let memData = {};  // 空物件，接要傳送的資料
    memData.memName = signUpName.value;
    memData.memMail = signUpEmail.value;
    memData.memId = signUpId.value;
    memData.memPsw = signUpPsw.value;

    let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){  // 請求送出，並且執行成功
                alert('註冊成功');
                console.log(xhr.responseText);
            }else{
                alert(xhr.status);
                console.log(xhr.responsetext);
            }
        }
        let url = 'php/getSignUpMemData.php';
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        let data_info = `memId=${signUpId.value}&memPsw=${signUpPsw.value}&memName=${signUpName.value}&memMail=${signUpEmail.value}`;
        xhr.send(data_info);
}


// 登入註冊切換
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => { container.classList.add("right-panel-active"); });
signInButton.addEventListener('click', () => { container.classList.remove("right-panel-active"); });


window.addEventListener('load', function(){
    getDataShowLightbox();  // 取得session會員資料

    memId.addEventListener('blur', checkMemIdPsw);
    memPsw.addEventListener('blur', checkMemIdPsw);
    signInBtn.addEventListener('click', sendData);
    closeSpan.addEventListener('click', closeLightbox);
    lightboxBg.addEventListener('click', closeLightbox);
    
    signUpName.addEventListener('blur', checkName);
    signUpId.addEventListener('blur', checkId);
    signUpEmail.addEventListener('blur', checkEmail);
    signUpPsw.addEventListener('blur', checkPsw);
    pswAgain.addEventListener('blur', checkPswAgain);
    pswAgain.addEventListener('input', checkPswTheSame);
    
    signUpBtn.addEventListener('click', submitMemData);
});
