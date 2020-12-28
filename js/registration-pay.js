let type = 'notHave';
$('#myForm').validator().on('submit', function (e) {
    if (e.isDefaultPrevented()) { // 未驗證通過 則不處理
        return;
    } else { // 通過後 送出表單
        $('#step2').hide();
        $('.card-inf').show();
        //信用卡號碼
        let card_num_1 = document.getElementById('card_num_1').value;
        let card_num_2 = document.getElementById('card_num_2').value;
        let card_num_3 = document.getElementById('card_num_3').value;
        let card_num_4 = document.getElementById('card_num_4').value;
        let cardNum = document.querySelector('.card-num');
        cardNum.innerText = card_num_1 + '-' + card_num_2 + '-' + card_num_3 + '-' + card_num_4;
        //有效年月
        let card_month = document.getElementById('card_month').value;
        let card_year = document.getElementById('card_year').value;
        let cardMonth = document.querySelector('.card-month');
        let cardYear = document.querySelector('.card-year');
        cardMonth.innerText = card_month + '/';
        cardYear.innerText = card_year;
        //背面卡號
        let card_back_num = document.getElementById('card_back_num').value;
        let cardBackNum = document.querySelector('.card-back-num');
        cardBackNum.innerText = card_back_num;
        //付款人信箱
        let pay_mail = document.querySelector('.pay_mail');
        let card_mail = pay_mail.getElementsByTagName('input')[0].value;
        let cardMail = document.querySelector('.card-email');
        cardMail.innerText = card_mail;
        type = 'Have';
    }
    e.preventDefault(); // 防止原始 form 提交表單
})



//付款選項換色
let btn_light = document.querySelectorAll(`.btn-light`);

for (let i = 0; i < btn_light.length; i++) {
    btn_light[i].onclick = function () {
        for (let j = 0; j < btn_light.length; j++) {
            btn_light[j].classList.remove("btnActive");
        }
        this.classList.add("btnActive");
    }
}

//選擇付款方式後 表單跳出
let btn_CARD = document.querySelector('.btn_CARD');
let btn_ATM = document.querySelector('.btn_ATM');
let creditCard = document.querySelector('.creditcard');
let ATM = document.querySelector('.ATM');
btn_CARD.onclick = function () {
    if (type == 'notHave') {
        creditCard.style.display = 'block';
    } else {
        alert('已選擇過');
    };
}
btn_ATM.onclick = function () {
    if (type == 'notHave') {
        ATM.style.display = 'block';
    } else {
        alert('已選擇過');
    };
}

//ATM確認後 印出ATM資訊
let goATM = document.getElementById('goATM');
let ATM_pay_from = document.getElementById('ATM_pay_from').innerText;
let ATM_inf = document.querySelector('.ATM_inf');
let ATM_pay = document.getElementById('ATM_pay');
goATM.onclick = function () {
    ATM.style.display = 'none';
    ATM_inf.style.display = 'block';
    ATM_pay.innerText = ATM_pay_from;
    type = 'Have';
}


//叉叉鍵 信用卡
let pay_close = document.querySelector('.pay_close');
pay_close.onclick = function () {
    creditCard.style.display = "none";
}
//叉叉鍵 ATM
let close_atm = document.querySelector('.close-atm');
close_atm.onclick = function () {
    ATM.style.display = "none";
}


//送出鍵
let allGO = document.getElementById('allGo');
let card_inf = document.querySelector('.card-inf');
allGO.onclick = function () {
    if (ATM_inf.style.display == 'none' && card_inf.style.display == 'none') {
        alert('未選擇付款方式');
    }
}

//ATM的繳款期限 動態更新
let ATM_deadline_from = document.getElementById('ATM_deadline_from');
let ATM_deadline = document.getElementById('ATM_deadline');
ATM_deadline_from.innerText = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + (new Date().getDate() + 1) + '號' + '23時59分';
ATM_deadline.innerText = ATM_deadline_from.innerText;