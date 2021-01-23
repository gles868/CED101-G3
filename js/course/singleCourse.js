

window.addEventListener('load', function () {
  let storage = sessionStorage;
  if (storage['count'] == null) {
    storage['count'] = '0';
  }

  Vue.component('my-count', {
    data() {
      return {
        count: 0,
      };
    },
    props: [],
    template: `
    <div class="num_icon">
        <div class="num_text">{{count}}</div>
    </div>
            `,

    methods: {
      //判斷 目前的購物車中 商品數量
      checked_count() {
        let storage = sessionStorage;
        //判斷 目前有多少商品
        if (storage.getItem('count') == 0) {
          // console.log('沒切割')
        } else {
          console.log('切割');
          this.count = storage.getItem('count');
        }
        // console.log('有幾個')
      },
    },
    created() { },
    mounted() {
      this.checked_count();
    },
  });


  //卡片翻轉
  // $(function () {
  //   $('.card').flip({
  //     axis: 'y',
  //     speed: 650,
  //     trigger: 'hover'
  //   });
  // });


  //動畫效果
  gsap.to('.teacher_img', { y: 30, duration: 2, ease: Power1.easeInOut, repeat: -1, yoyo: true });
  gsap.to('.light', { rotation: 360, duration: 10, ease: Power0.easeInOut, repeat: -1, zIndex: -5 });
  gsap.to('.course_card', { y: 10, duration: 2, ease: Power1.easeInOut, repeat: -1, yoyo: true, zIndex: 10 });
})