import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $goAnotherPage: any;
  }
}

Vue.prototype.$goAnotherPage = function (router, type = 'href') {
  const before = process.env.BASE_URL.slice(0, -1)
  if (type === 'href') {
    window.location.href = before + router
  }
  if (type === 'replace') {
    window.location.replace(before + router)
  }
}

/*
* 时间格式化函数(将时间格式化为，2019年08月12日，2019-08-12，2019/08/12的形式)
*   pattern参数（想要什么格式的数据就传入什么格式的数据）
*     · 'yyyy-MM-dd'  ---> 输出如2019-09-20
*     · 'yyyy-MM-dd hh:mm'  --->  输出如2019-09-20 08:20
*     · 'yyyy-MM-dd hh:mm:ss'  --->  输出如2019-09-20 08:20:23
*     · 'yyyy/MM/dd'  --->  输出如2019/09/20
*     · 'yyyy年MM月dd日'  --->  输出如2019年09月20日
*     · 'yyyy年MM月dd日 hh时mm分'  --->  输出如2019年09月20日 08时20分
*     · 'yyyy年MM月dd日 hh时mm分ss秒'  --->  输出如2019年09月20日 08时20分23秒
*     · 'yyyy年MM月dd日 hh时mm分ss秒 EE'  --->  输出如2019年09月20日 08时20分23秒 周二
*     · 'yyyy年MM月dd日 hh时mm分ss秒 EEE'  --->  输出如2019年09月20日 08时20分23秒 星期二
*  参考: https://www.cnblogs.com/mr-wuxiansheng/p/6296646.html
*/

// Date.prototype.pattern = function (fmt) {
//   fmt = new Date(fmt)
//   const o = {
//     'y+': this.getFullYear(),
//     'M+': this.getMonth() + 1, // 月份
//     'd+': this.getDate(), // 日
//     'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
//     'H+': this.getHours(), // 小时
//     'm+': this.getMinutes(), // 分
//     's+': this.getSeconds(), // 秒
//     'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
//     S: this.getMilliseconds(), // 毫秒
//     'E+': this.getDay() // 周
//   }
//   const week = {
//     0: '日',
//     1: '一',
//     2: '二',
//     3: '三',
//     4: '四',
//     5: '五',
//     6: '六'
//   }
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
//   }
//   if (/(E+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[this.getDay() + ''])
//   }
//   for (const k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) {
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
//     }
//   }
//   return fmt
// }
