<template>
  <layout>
    <template v-slot:main>
      <div v-show='loading'>
        <div class="header">
          <div class="user">
            <div class="avatar">
              <img :src="person.headimageurl" alt />
            </div>
            <div class="userinfo">
              <div class="u_top">
                <span class="nickname">{{person.nickname}}</span>
                <span class="real">已实名认证</span>
              </div>
              <div class="phone">{{person.bondphone}}</div>
            </div>
          </div>
          <img @click="goAccount" class="setting" src="@/assets/image/setting.png" alt />
        </div>
        <div class="list">
          <div class="company">
            <van-cell title="我的企业" is-link to="enterprise">
              <template #icon>
                <img src="@/assets/image/company_black.png" alt="">
              </template>
            </van-cell>
          </div>
          <div class="options">
            <!-- <van-cell title="分享好友" is-link>
              <template #icon>
                <img src="@/assets/image/share.png" alt="">
              </template>
            </van-cell> -->
            <van-cell is-link url="https://mp.weixin.qq.com/s/AFbB-EdG8UidFDIrqH3UFg">
              <template #icon>
                <img src="@/assets/image/about.png" alt="">
              </template>
              <template #title>
                <span>剑鱼标讯</span>
                <van-tag>招投标大数据平台</van-tag>
              </template>
            </van-cell>
            <van-cell title="意见反馈" is-link @click="goFeedback">
              <template #icon>
                <img src="@/assets/image/opinion.png" alt="">
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer></template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, Icon, Tag, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  methods: {
    ...mapActions({
      getPhone: 'home/getPhone',
      userInfo: 'home/userInfo'
    })
  }
})
export default class extends Vue {
  protected getPhone!: any
  protected userInfo!: any
  loading = false
  person = {}
  phone = ''
  created () {
    // 通过首次使用接口查询是否绑定手机号、是否有认证企业
    const toastLoading = Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.getPhone().then((item: any) => {
      console.log(item)
      if (item.data.phone === '') {
        this.$goAnotherPage('/phone/bindPhone?from=ent', 'replace')
      } else {
        toastLoading.clear()
        this.userInfo().then((res: any) => {
          console.log(res)
          if (res.data.personalauth === 1) {
            toastLoading.clear()
            this.phone = res.data.bondphone
            res.data.bondphone = res.data.bondphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            this.person = res.data
            this.loading = true
          } else {
            this.$router.replace({ path: '/personalAuth?from=ent' })
          }
        })
      }
    })
  }

  goAccount () {
    this.$router.push({ path: '/account' })
  }

  goFeedback () {
    Toast('暂未开放...')
  }
}
</script>
<style lang="scss" >
.header {
  display: flex;
  justify-content: space-between;
  padding: 24px 16px;
  background: #fff;
  .user {
    display: flex;
  }
  .avatar {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .userinfo {
    display: flex;
    flex-direction: column;
  }
  .u_top {
    display: flex;
    align-items: center;
  }
  .nickname {
    margin-right: 8px;
    font-size: 20px;
    line-height: 29px;
    color: #33373c;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 140px;
  }
  .real {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 11px;
    border: 1px solid #2abed1;
    font-size: 13px;
    color: #2abed1;
  }
  .phone {
    margin-top: 4px;
    font-size: 13px;
    line-height: 18px;
    color: #64696f;
  }
  .setting{
    width: 24px;
    height: 24px;
  }
}
.list{
  padding: 0 16px;
  .company,.options{
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    .van-cell{
      padding: 14px 17px;
      border-radius: 8px;
    }
    img{
      width: 24px;
      height: 24px;
      margin-right: 11px;
    }
    .van-cell__title{
      font-size: 16px;
      line-height: 24px;
      color: #171826;
    }
    .van-cell:not(:last-child)::after{
      left: 52px;
    }
    .van-tag{
      margin-left: 10px;
      background: transparent;
      border: 0.5px solid rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      border-radius: 4px;
      font-size: 12px;
      color: #9B9CA3;
    }
  }
  .company{
    margin: 16px 0;
  }
}
</style>
