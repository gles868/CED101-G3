$('#myForm').validator().on('submit', function (e) {
    if (e.isDefaultPrevented()) { // 未驗證通過 則不處理
        return;
    } else { // 通过后，送出表单
        $('#step2').hide()
        $('#step3').show()
        $('#end').show()
    }
    e.preventDefault(); // 防止原始 form 提交表单
})


$('#myForm5').validator().on('submit', function (e) {
    if (e.isDefaultPrevented()) { // 未驗證通過 則不處理
        return;
    } else { // 通过后，送出表单
        $('#step2').hide()
        $('#step3').show()
    }
    e.preventDefault(); // 防止原始 form 提交表单
})

let btn_light = document.querySelectorAll(`.btn-light`);

for (let i = 0; i < btn_light.length; i++) {
    btn_light[i].onclick = function () {
        for (let j = 0; j < btn_light.length; j++) {
            btn_light[j].classList.remove("btnActive");
        }
        this.classList.add("btnActive");
    }
}



$('#goS2').click(function () {
    if ($('.btn-light').eq(0).hasClass('btnActive')) {
        $('#step1').hide()
        $('#step2').show()
        $('#myForm').show()
        $('#mark').text('信用卡/金融卡')
        $('#myTitle').text('您的訂單已完成付款！')
    } else if ($('.btn-light').eq(1).hasClass('btnActive')) {
        $('#step1').hide()
        $('#step2').show()
        $('#myForm5').show()
        $('#mark').text('ATM 轉帳')
    } else {
        alert('請選擇付款方式！')
    }
})



let btn_info = document.querySelectorAll('.btn-info');

// for (i = 0; i < btn_info.length; i++) {
//     btn_info[i].onclick = function () {
//         for (j = 0; j < btn_info.length; j++) {
//             if (this.innerText == '返回首頁' || this.innerText == '去轉帳') {
//                 javascript: history.go(0)
//                 // alert(88);   會跳很多次要問一下
//             }
//         }

//     }
// }
for (i = 0; i < btn_info.length; i++) {
    btn_info[i].onclick = function () {
        if (this.innerText == '返回首頁' || this.innerText == '去轉帳') {
            javascript: history.go(0)
            // alert(88);   會跳很多次要問一下
        }
    }
}


