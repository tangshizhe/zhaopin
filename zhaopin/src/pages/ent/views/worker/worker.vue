<template>
  <div class="j-container worker">
    <div class="j-header">
      <span class="header-title">职位</span>
      <span class="header-right">
        <van-icon name="plus" />
        <van-icon name="search" />
      </span>
    </div>
    <div class="j-main">
      <slot name="main">
        <div class="screen">
          <div class="recommend">
            <span class="recommen active">推荐</span>
            <span class="recommen">附近</span>
            <span class="recommen">最新</span>
          </div>
          <div class="option">
            <span class="options address">郑州</span>
            <span class="options screens">筛选</span>
            <span class="options keyword">关键词</span>
          </div>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="z-list"
        >
          <li class="list-page" v-for="(item,index) in list" :key="index">
            <div class="position">
              <span class="pos-text">{{item.position}}</span>
              <span class="pos-salary">{{item.salary}}</span>
            </div>
            <div class="contidion">
              <span class="con-list" v-for="(example,i) in item.condition" :key="i">{{example}}</span>
            </div>
            <div class="com-detail">
              <span class="com-text common">{{item.companyName}}</span>
              <span class="financing common">{{item.financing}}</span>
              <span class="persons common">{{item.manyPerson}}</span>
            </div>
            <div class="manager">
              <div class="head-portrait">
                <img :src="item.image" alt="" class="headimg">
                <span class="personName">{{item.personCharge}}</span>
                <span></span>
                <span class="per-maneger">{{item.manager}}</span>
              </div>
              <span class="pos-address">{{item.address}}</span>
            </div>
          </li>
        </van-list>
    </van-pull-refresh>
      </slot>
    </div>
    <div class="j-footer">
      <slot name="footer">
          <keep-alive>
            <FooterGuideVue></FooterGuideVue>
          </keep-alive>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, Toast, CellGroup, Icon, DropdownMenu, DropdownItem, List, Loading, PullRefresh } from 'vant'
import { mapActions } from 'vuex'
import FooterGuideVue from '@/components/FooterGuide.vue'
import Mock from 'mockjs'
@Component({
  components: {
    FooterGuideVue,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Loading.name]: Loading,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
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
  count = 0
  isLoading = false
  loading = false
  finished = false
  lists = []
  list = [
    {
      position: '网络信息安全工程师助理',
      salary: '4-6K',
      address: '郑州',
      condition: ['经验不限', '本科以上', '系统管理员', '机房运维'],
      companyName: '阿里巴巴',
      financing: '未融资',
      manyPerson: '500-999人',
      image: '@/assets/logo.png',
      personCharge: '王五',
      manager: '人事经理'
    },
    {
      position: '网络信息安全工程师助理',
      salary: '4-6K',
      address: '郑州',
      condition: ['经验不限', '本科以上', '系统管理员', '机房运维'],
      companyName: '京东',
      financing: '未融资',
      manyPerson: '500-999人',
      image: '@/assets/logo.png',
      personCharge: '王五',
      manager: '人事经理'
    },
    {
      position: '网络信息安全工程师助理',
      salary: '4-6K',
      address: '郑州',
      condition: ['经验不限', '本科以上', '系统管理员', '机房运维'],
      companyName: '深圳腾讯计算机有限公司',
      financing: '未融资',
      manyPerson: '500-999人',
      image: '@/assets/logo.png',
      personCharge: '王五',
      manager: '人事经理'
    },
    {
      position: '网络信息安全工程师助理',
      salary: '4-6K',
      address: '郑州',
      condition: ['经验不限', '本科以上', '系统管理员', '机房运维'],
      companyName: '网易',
      financing: '未融资',
      manyPerson: '500-999人',
      image: '@/assets/logo.png',
      personCharge: '王五',
      manager: '人事经理'
    }
  ]

  imglink = ''
  sum = 0
  adminIndex = 0
  created () {
    // 通过首次使用接口查询是否绑定手机号、是否有认证企业
    this.indexpage().then((res: any) => {
      console.log(res)
    })
  }

  mounted () {
    this.onLoad()
    console.log(Mock.mock('@cparagraph()'))
    Mock.mock('@cparagraph()')
  }

  // 下拉刷新
  onRefresh () {
    setTimeout(() => {
      Toast('刷新成功')
      this.isLoading = false
      this.count++
    }, 1000)
  }

  onLoad () {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      // for (let i = 0; i < this.list.length; i++) {
      //   console.log(this.list.length + 1)
      //   // this.lists.push(this.list[i])
      //   // this.lists = this.list
      // }
      // // 加载状态结束
      // this.loading = false
      // // 数据全部加载完成
      // if (this.lists.length >= 5) {
      //   this.finished = true
      // }
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.worker{
  .j-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    padding: 26px 12px 6px;  /* no */
    font-size: 17px;
    background-color: #2abed1;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;  /* no */
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 65%, transparent 35%);
    }
    .header-left,
    .header-title,
    .header-right {
      display: flex;
      align-items: center;
    }
    .header-left {
      color: #5f5e64;
      color: #444;
      font-size: 20px;
    }
    .header-title {
      color: #fff;
    }
    .header-right {
      height: 100%;
      min-width: 20px;
      .van-icon-plus,.van-icon-search{
        font-size: .48rem;
        margin-left: .4rem;
        color: #fff;
      }
    }
  }
  .j-main{
    width: 100%;
    overflow: hidden;
    margin-bottom: 1.6rem;
    .screen{
      padding: 0 .32rem;
      display: flex;
      align-items: center;
      height: 1.2rem;
      background: #fff;
      box-shadow: 2px -5px 8px rgba(54, 147, 179, 0.051);
      .recommend{
        flex: 1;
        .recommen{
          font-size: .32rem;
          padding: .04rem .16rem;
          margin-right: .16rem;
        }
      }
      .option{
        flex: 1;
        .options{
          padding: .1rem .16rem;
          margin-right: .48rem;
          background: #F7F9FA;
          // border-radius: 0.16rem;
          font-size: .32rem;
        }
      }
    }
    .z-list{
      overflow: auto;
      width: 100%;
      height: auto;
      background: #fff;
      .list-page{
        width: 100%;
        padding: 0.36rem 0;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
        .position,.contidion,.com-detail,.manager{
          display: flex;
          padding: 0 .32rem;
        }
        .position{
          font-size: .4rem;
          justify-content: space-between;
          .pos-salary{
            color: #f66;
          }
        }
        .contidion{
          margin-top: .24rem;
          .con-list{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .08rem;
            padding: .1rem .16rem;
            background: #F7F9FA;
            font-size: .24rem;
            border-radius: .08rem;
          }
        }
        .com-detail{
          margin-top: .24rem;
          font-size: .28rem;
          .common{
            margin-right: 0.16rem;
          }
        }
        .manager{
          justify-content: space-between;
          margin-top: .16rem;
          font-size: .28rem;
          .headimg{
            width: .4rem;
            height: .4rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

</style>
