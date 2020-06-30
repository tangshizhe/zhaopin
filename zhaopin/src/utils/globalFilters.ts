import Vue from 'vue'

// 注册全局过滤器

// 金额大写，链接：https://juejin.im/post/5a2a7a5051882535cd4abfce
// upDigit(1682)
// result："人民币壹仟陆佰捌拾贰元整"
// upDigit(-1693)
// result："欠壹仟陆佰玖拾叁元整"
Vue.filter('upPrice', function (n) {
  const fraction = ['角', '分', '厘']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    // s = p + unit[0][i] + s;
  }
  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
})
