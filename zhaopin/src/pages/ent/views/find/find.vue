<template>
  <layout>
    <template v-slot:main>
      <ul class="post">
        <li class="post-list" v-for="(item,index) in 5" :key="index">
          <div class="list-infor">
            <div class="image-head">
              <img src="@/assets/image/avatar.png" alt="">
            </div>
            <div class="nickname">
              <span class="nickname-top">
                快步未来
              </span>
              <span class="nickname-bottom">
                人力资源主管 5年
              </span>
            </div>
          </div>
          <div class="list-main">
            <p class="main-text">
              pc端需要考虑浏览器兼容性，比如ie浏览器和Chrome浏览器,还有火狐浏览器,他们的浏览器内核都不一样,移动端基本都是webkit内核,不需要考虑兼容性，但是需要做移动适配。并且他们的开发单位也是不的, pc端一般就是px单位，移动端是vw vh或rem。
            </p>
            <span class="time">2小时前</span>
            <div class="main-option">
              <span class="thumbs-up">
                <van-icon name="good-job-o" />
                <span>点赞</span>
              </span>
              <span class="comment">
                <van-icon name="comment-o" />
                <span>评论</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <keep-alive>
        <FooterGuideVue></FooterGuideVue>
      </keep-alive>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup } from 'vant'
import { mapActions } from 'vuex'
import FooterGuideVue from '@/components/FooterGuide.vue'
@Component({
  components: {
    FooterGuideVue,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions({
      indexpage: 'home/indexpage'
    })
  }
})
export default class extends Vue {
  protected indexpage!: any
  list = []
  imglink = ''
  sum = 0
  adminIndex = 0
  loading = false
  created () {
    // 通过首次使用接口查询是否绑定手机号、是否有认证企业
    this.indexpage().then((res: any) => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
  .post{
    margin-bottom: 1.6rem;
    .post-list{
      display: flex;
      flex-direction: column;
      background: #fff;
      margin-bottom: .36rem;
      padding: .32rem .32rem 0;
      .list-infor{
        display: flex;
        margin-bottom: .24rem;
        .image-head{
          width: 1rem;
          height: 1rem;
          margin-right: .24rem;
        }
        .nickname{
          display: flex;
          flex-direction: column;
          justify-content: center;
          .nickname-top{
            font-size: .36rem;
          }
          .nickname-bottom{
            font-size: .28rem;
          }
        }
      }
      .list-main{
        .main-text{
          font-size: .40rem;
          text-indent: 2em;
        }
        .time{
          font-size: .28rem;
        }
        .main-option{
          box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.05), inset 0px 1px 0px rgba(0, 0, 0, 0.05);
          display: flex;
          margin-top: .24rem;
          height: 1rem;
          .thumbs-up,.comment{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .36rem;
            .van-icon{
              font-size: .4rem;
              margin-right: .24rem;
            }
          }
        }
      }
    }
  }
</style>
