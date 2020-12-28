// 燈箱
$(document).ready(function () {
  $('.box').click(function () {
      $('.product').css({
          display: 'block',
      });
  });
  $('.close').click(function () {
      $('.product').css({
          display: 'none',
      });
  });
  $('.pro_all').click(function () {
      $('.allPro_box').css({
          display: 'flex',
      });
      $('.attPro_box').css({
          display: 'none',
      });
      $('.defPro_box').css({
          display: 'none',
      });
      $('.assPro_box').css({
          display: 'none',
      });
  });
  $('.pro_att').click(function () {
      $('.allPro_box').css({
          display: 'none',
      });
      $('.attPro_box').css({
          display: 'flex',
      });
      $('.defPro_box').css({
          display: 'none',
      });
      $('.assPro_box').css({
          display: 'none',
      });
  });
  $('.pro_def').click(function () {
      $('.allPro_box').css({
          display: 'none',
      });
      $('.attPro_box').css({
          display: 'none',
      });
      $('.defPro_box').css({
          display: 'flex',
      });
      $('.assPro_box').css({
          display: 'none',
      });
  });
  $('.pro_ass').click(function () {
      $('.allPro_box').css({
          display: 'none',
      });
      $('.attPro_box').css({
          display: 'none',
      });
      $('.defPro_box').css({
          display: 'none',
      });
      $('.assPro_box').css({
          display: 'flex',
      });
  });
});

// 數量
$total = 0 ;

$(function () {
  var t = $('#quantity');
  $('#addamount').click(function () {
      t.val(parseInt(t.val()) + 1);
      $('#min').removeAttr('disabled'); //當按加1時，解除$("#min")不可讀狀態
      setTotal();
  });
  $('#min').click(function () {
      if (parseInt(t.val()) > 1) {
          //判斷數量值大於1時才可以減少
          t.val(parseInt(t.val()) - 1);
      } else {
          $('#min').attr('disabled', 'disabled'); //當$("#min")為1時，$("#min")不可讀狀態
      }
      setTotal();
  });
  function setTotal() {
      $('#total').html((parseInt(t.val()) * 3.95).toFixed(2));
  }
  setTotal();
});

// 加入購物車

let storage = sessionStorage;
function doFirst(){
    if(storage['addItemList'] == null){
        storage['addItemList'] = '';
    }
   
    //幫每個Add Cart建事件聆聽功能
    let list = document.querySelectorAll('.addButton');  //list是陣列
    // for(let i = 0; i < list.length; i++){
    //     list[i].addEventListener('click',function(){
    //         let teddyInfo = document.querySelector(`#${this.id} input`).value;
    //         addItem(this.id, teddyInfo);
    //     });
    // }
    for(let i = 0; i < list.length; i++){
      list[i].addEventListener('click',function(){
          let magicInfo = document.querySelector(`#${this.id} input`).value;
          addItem(this.id, magicInfo);
      });
  }
}
function addItem(itemId, itemValue){
    

    //存入storage
    if(storage[itemId]){
        alert('已加入購物車');
        $total +=  parseInt($('#quantity').val());
        $('#quantity').val(1);
        $('.product').css({
            display: 'none',
        });
        console.log($total)
        $(".count").text($total)
        if($total > 0){
            $(".count").css({
                display: 'block',
            })
        }

    }else{
        storage[itemId] = itemValue;
        storage['addItemList'] += `${itemId}, `;
    }

    //計算購買數量和小計
    let itemString = storage.getItem('addItemList');
    let items = itemString.substr(0,itemString.length-2).split(', ');
    // console.log(items);  //["A1001", "A1006", "A1007", "A1003"]

    // for(let 自訂變數 in 陣列或物件){}
    // for(let key in obj){
    //     key值為: key
    //     value值為: obj[key]
    // }

    subtotal = 0;
    for(let key in items){  //use items[key]
        let itemInfo = storage.getItem(items[key]);
        let itemPrice = parseInt(itemInfo.split('|')[2]);

        subtotal += itemPrice;
    }
    
    document.getElementById('itemCount').innerText = items.length;
    document.getElementById('subtotal').innerText = subtotal;
}
window.addEventListener('load', doFirst);

// 愛心

$(".heart").click(function () {
    $(this).toggleClass("loved");
});