import Vue from 'vue'

Vue.directive('my-url', function (el: any, binding) {
  // 点击事件的回调挂在在元素myClick属性上
  el.myClick && el.removeEventListener('click', el.myClick)
  el.addEventListener('click', el.myClick = function () {
    const before = process.env.BASE_URL.slice(0, -1)
    window.location.href = before + binding.value
  })
})
