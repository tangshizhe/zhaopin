<template>
  <layout>
      <template v-slot:main>
        <div v-show='loading'>
          <!-- 入口为首次绑定手机号和公众号菜单跳转过来 -->
          <div v-if="phone === ''" class="bindPhone">
              <Phone type='bind' btnText="立即绑定" @childFn="parentFn"></Phone>
          </div>
          <!-- 入口为绑定完手机号再次进入 显示更换手机号 -->
          <div v-else class="changePhone">
              <van-cell title="手机号" :value="phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')" />
              <div class="change_btn">
                <van-button square block type="info" @click="goChange">更换手机号</van-button>
              </div>
          </div>
        </div>
      </template>
      <template v-slot:footer></template>
    </layout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form, Field, Button, Cell, Toast } from 'vant'
import Phone from '@/components/vant-form.vue'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    Phone
  },
  methods: {
    ...mapActions({
      getPhone: 'home/getPhone',
      bindPhone: 'home/bindPhone'
    })
  }
})
export default class extends Vue {
  protected getPhone!: any
  protected bindPhone!: any
  loading = false
  phone = ''
  fromType: any = ''

  created () {
    // 判断手机号绑定页面从哪个页面过来，从政务服务过来 则携带有参数from = gov
    const url = window.location.href
    const data: any = this.parseQueryString(url)
    console.log(data.from)
    if (data.from === 'gov') {
      this.fromType = 'gov'
    }
    if (data.from === 'ent') {
      this.fromType = 'ent'
    }
  }

  mounted () {
    this.getPhoneFn()
  }

  parseQueryString (url: any) {
    const index = url.lastIndexOf('?')
    const str = url.substring(index + 1)
    console.log(str)
    if (str) {
      const iterms = str.split('&')
      const data = {}
      for (let i = 0; i < iterms.length; i++) {
        const arr = iterms[i].split('=')
        data[arr[0]] = arr[1]
      }
      return data
    }
  }

  getPhoneFn () {
    // 查询是否已绑定手机号
    const toat1 = Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.getPhone().then((res: any) => {
      console.log(res)
      if (res.data) {
        toat1.clear()
        this.loading = true
        this.phone = res.data.phone
      }
    })
  }

  parentFn (res: any) {
    console.log(res)
    this.bindPhone(
      `code=${res.code}`
    ).then((res) => {
      if (res.data.status === -1) {
        Toast('短信验证码错误')
      } else if (res.data.status === 0) {
        Toast('手机号已被占用')
      } else if (res.data.status === 1) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this
        Toast.success({
          message: '绑定成功',
          onClose () {
            if (that.fromType === 'gov') {
              window.history.back()
            } else if (that.fromType === 'ent') {
              that.$goAnotherPage('/ent', 'replace')
            } else {
              that.getPhoneFn()
            }
          }
        })
      }
    })
  }

  goChange () {
    this.$router.push({ path: '/changePhone', query: { tel: this.phone } })
  }
}
</script>

<style lang="scss" scoped>
.van-cell{
    padding: 15px 16px;
}
.van-field__label{
    font-size: 15px;
}
.van-button--square{
    border-radius: 8px;
}
.van-button--info{
    color: #fff;
    background-color: #2ABED1;
    border: 0.02667rem solid #2ABED1;
}
.van-button__text{
    font-size: 18px;
}
.changePhone{
  .van-cell__title{
    font-size: 16px;
    line-height: 24px;
    color: #171826;
  }
  .van-cell__value{
    font-size: 14px;
    line-height: 20px;
    color: #9B9CA3;
  }
  .change_btn{
    padding: 32px 16px;
  }
}

</style>
