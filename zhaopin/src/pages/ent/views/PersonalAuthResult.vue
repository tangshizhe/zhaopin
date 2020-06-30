<template>
  <layout>
    <template v-slot:main>
      <!-- 认证成功 -->
      <div class="success" v-if="result == 'success'">
        <div class="personal">
          <div class="personal_info">
            <p class="pname">{{userInfo.userName}}</p>
            <span class="status">已认证</span>
          </div>
        </div>
        <div class="user_info">
            <van-cell title="身份证号" value="" size="large" :label="userInfo.userIdcode" />
        </div>
        <p class="note">您已于{{userInfo.date}}完成实名认证</p>
      </div>
      <!-- 认证失败 -->
      <div v-else class="error">
        <div class="error_icon">
          <van-icon name="clear" color="#FB483D" size="66" />
          <span>认证失败</span>
        </div>
        <div class="error_text"> 该人员已被认证，如有疑问，<br> 可联系客服人员。</div>
        <p class="contact">客服微信号：<a href="javaScript:;">jianyu360</a></p>
      </div>
    </template>
    <template v-slot:footer>
        <div class="j-button-group" v-if="result != 'success'">
          <button class="j-button-confirm" @click="afreshHandle">重新认证</button>
        </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, Icon } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  methods: {
    ...mapActions({
      personalResult: 'home/personalResult'
    })
  }
})
export default class extends Vue {
  protected personalResult!: any
  result: any
  userInfo = {}

  created () {
    this.result = String(this.$route.query.result)
    this.personalResult().then((res: any) => {
      console.log(res)
      if (res.data) {
        res.data.date = this.formatDate(new Date(parseInt(res.data.date) * 1000))
        this.userInfo = res.data
      }
    })
  }

  afreshHandle () {
    // Toast('重新认证')
    this.$router.replace({ path: '/personalAuth' })
    console.log('重新认证')
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
  .personal{
    position: relative;
    border: 1px solid #fff;
    background-color: #fff;
    &::after{
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid #ebedf0;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }
  .personal_info{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    padding: 24px 0;
    background: rgba(42, 190, 209, 0.08);
    border: 0.5px solid #2ABED1;
    border-radius: 12px;
    .pname{
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
