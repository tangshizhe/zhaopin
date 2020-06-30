<template>
  <layout>
    <template v-slot:main>
      <div class="enterprise">
        <div class="van-list">
          <van-cell-group>
            <van-cell class="van-item" title="" is-link  @click="tomanage(enterprisename, enterpriseid)"  value="管理">
              <template slot="title">
                <div class="van-item-left">
                  <img src = '@/assets/image/company.png' alt="" style="width:24px;height:24px;margin-right:12px">
                  <span>{{enterprisename}}</span>
                </div>
              </template>
            </van-cell>
            <div class="business">企业管理</div>
            <van-cell class="van-item" title="企业认证" is-link :value="isAuthentication" @click="goAuth"/>
          </van-cell-group>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="j-button-group">
        <button class="j-button-confirm" @click="addCompany">新增企业</button>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup } from 'vant'
import { mapActions } from 'vuex'

@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions({
      enterPrise: 'home/enterPrise'
    })
  }
})
export default class extends Vue {
  protected enterPrise!: any
  enterprisename = ''
  enterpriseid = ''
  isAuthentication = '去认证'
  created () {
    // 通过首次使用接口查询是否绑定手机号、是否有认证企业
    this.enterPrise().then((res: any) => {
      const list = res.data.data.ents
      const pid = this.$route.query.id
      this.enterpriseid = pid + ''
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === pid) {
          this.enterprisename = list[i].name
          if (list[i].auth_status === -1 || list[i].auth_status === 0) {
            this.isAuthentication = '去认证'
          } else if (list[i].auth_status === 1) {
            this.isAuthentication = '已认证'
          }
        }
      }
    })
  }

  // 点击管理
  tomanage (name, id) {
    this.$router.push({
      path: '/management', query: { id: id, name: name }
    })
  }

  // 去认证或认证结果
  goAuth () {
    if (this.isAuthentication === '去认证') {
      this.$router.push({
        path: '/entAuth', query: { entName: this.enterprisename, entUscc: '' }
      })
    } else {
      this.$router.push({
        path: '/authResult', query: { result: '1', name: this.enterprisename }
      })
    }
  }

  // 新增企业
  addCompany () {
    this.$router.push({ path: '/entAuth?from=add' })
  }
}
</script>
<style lang="scss" scoped>
.enterprise{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
  .van-item{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 16px;
    .van-cell__title{
      flex: 1;
      .van-item-left{
        display:flex;
        align-items:center;
        span{
          font-size: 16px;
          color: #171826;
        }
      }
      span{
          font-size: 16px;
          color: #171826;
      }
      .van-icon-arrow{
        font-size:20px;
        color:#C0C4CC;
      }
    };
    .van-cell__value{
        flex: none;
        padding-left: 16px;
        font-size: 14px;
        color: #2ABED1;
    }
  }
  .business{
    width: 100%;
    height: 40px;
    background: #F5F6F7;
    line-height: 40px;
    padding-left: 16px;
    font-size: 16px;
    color: #9B9CA3;
  }
}
</style>
