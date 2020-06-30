<template>
  <layout>
      <template v-slot:main>
        <div v-show='loading'>
          <!-- 入口为首次绑定邮箱和公众号菜单跳转过来 -->
          <div v-if="email === ''" class="bindPhone">
              <Email type='bind' btnText="设置" @childFn="parentFn"></Email>
          </div>
          <!-- 入口为绑定完邮箱再次进入 显示更换企业邮箱 -->
          <div v-else class="changePhone">
              <van-cell title="企业邮箱" :value="email" />
              <div class="change_btn">
                <van-button square block type="info" @click="goChange">更换企业邮箱</van-button>
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
import Email from '@/components/vant-form_email.vue'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    Email
  },
  methods: {
    ...mapActions({
      entinfo: 'home/entinfo',
      mailbind: 'home/mailbind'
    })
  }
})
export default class extends Vue {
  protected entinfo!: any
  protected mailbind!: any
  loading = true
  email = ''

  mounted () {
    this.getEmailFn()
  }

  getEmailFn () {
    // 查询是否已绑定邮箱
    const toat1 = Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.entinfo().then((res: any) => {
      console.log(res)
      if (res.data.ent_mail) {
        toat1.clear()
        this.loading = true
        this.email = res.data.ent_mail
      }
    })
  }

  parentFn (res: any) {
    console.log(res)
    this.mailbind(
      `code=${res.code}`
    ).then((res) => {
      if (res.data.status === -1) {
        Toast('邮箱验证码错误')
      } else if (res.data.status === 0) {
        Toast('手机号已被占用')
      } else if (res.data.status === 1) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this
        Toast.success({
          message: '绑定成功',
          onClose () {
            that.getEmailFn()
          }
        })
      }
    })
  }

  goChange () {
    this.$router.push({ path: '/changeEmail', query: { email: this.email } })
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
