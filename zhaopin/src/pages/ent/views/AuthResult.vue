<template>
  <layout>
    <template v-slot:main>
      <!-- 认证成功 -->
      <div class="success" v-if="result == '1'">
        <div class="company_info">
          <p class="cname">{{companyInfo.entName}}</p>
          <span class="status">已认证</span>
        </div>
        <div class="user_info">
            <van-cell title="统一社会信用代码" value="" size="large" :label="companyInfo.entUSCC" />
            <van-cell title="法人姓名" value="" size="large" :label="companyInfo.legalName" />
        </div>
        <p class="note">该企业于{{companyInfo.authtTime}}完成企业认证</p>
      </div>
      <!-- 认证失败 企业信息有误-->
      <div class="error" v-else-if="result == '-3'">
        <div class="error_icon">
          <van-icon name="clear" color="#FB483D" size="66" />
          <span>认证失败</span>
        </div>
        <div class="error_text"> 企业信息有误，无法完成认证<br>如有疑问，请联系客服人员</div>
        <p class="contact">客服微信号：<a href="#">jianyu360</a></p>
      </div>
      <!-- 认证失败 企业已被认证-->
      <div class="error" v-else-if="result == '-2'">
        <div class="error_icon">
          <van-icon name="clear" color="#FB483D" size="66" />
          <span>认证失败</span>
        </div>
        <div class="error_text"> 企业已被认证<br> 如有疑问，请联系客服人员</div>
        <p class="contact">客服微信号：<a href="#">jianyu360</a></p>
      </div>
    </template>
    <template v-slot:footer>
        <div class="j-button-group"  v-if="result == '-2' || result == '-3'">
          <button class="j-button-confirm" @click="afreshHandle">重新认证</button>
        </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, Icon, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  methods: {
    ...mapActions({
      authAgain: 'home/authAgain',
      authResult: 'home/authResult'
    })
  }
})
export default class extends Vue {
  protected authAgain!: any
  protected authResult!: any
  result = ''
  companyInfo: any = {}

  mounted () {
    console.log(this.$route.query.result, this.$route.query.name)
    this.result = String(this.$route.query.result)
    if (this.result === '1') {
      this.authResult(
        `entName=${String(this.$route.query.name)}`
      ).then((res: any) => {
        console.log(res)
        // res.data.authtTime = '2020-03-25 15:37:12'
        res.data.authtTime = this.formatDate(new Date(res.data.authtTime.replace(/-/g, '/')))
        this.companyInfo = res.data
      })
    }
  }

  afreshHandle () {
    console.log('重新认证')
    this.authAgain(`entName=${this.$route.query.name}`).then((res: any) => {
      if (res.data) {
        this.$router.replace({
          path: '/entAuth',
          query: { entName: res.data.entName, entUscc: res.data.entUSCC }
        })
      } else {
        Toast(res.error_msg)
      }
    })
  }

  // 时间格式转换
  formatDate (date) {
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '年' + m + '月' + d + '日'
  }
}
</script>
<style lang="scss" >
.success{
  .company_info{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    padding: 24px 0;
    background: rgba(42, 190, 209, 0.08);
    border: 0.5px solid #2ABED1;
    border-radius: 12px;
    .cname{
      font-size: 20px;
      line-height: 30px;
      color: #171826;
    }
    .status{
      display: inline-block;
      margin-top: 10px;
      padding: 2px 18px;
      background: rgba(42, 190, 209, 0.1);
      border-radius: 12px;
      font-size: 15px;
      line-height: 22px;
      color: #2ABED1;
    }
  }
  .user_info{
    .van-cell__title{
      span{
        font-size: 15px;
        line-height: 22px;
        color: #5F5E64;
      }
    }
    .van-cell__label{
      margin-top: 8px;
      font-size: 16px;
      line-height: 24px;
      color: #171826;
    }
  }
  .note{
    padding: 10px 16px;
    font-size: 15px;
    line-height: 22px;
    color: #9B9CA3;
  }
}
.error{
  height: 100%;
  padding-top: 86px;
  background: #fff;
  .error_icon{
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    span{
      margin-top: 14px;
      font-size: 18px;
      line-height: 26px;
      color: #FB483D;
    }
  }
  .error_text{
    margin-top: 16px;
    font-size: 13px;
    line-height: 20px;
    color: #5F5E64;
    text-align: center;
  }
  .contact{
    margin-top: 24px;
    font-size: 13px;
    line-height: 20px;
    color: #5F5E64;
    text-align: center;
    a{
      color: #2ABED1;
    }
  }
}
</style>
