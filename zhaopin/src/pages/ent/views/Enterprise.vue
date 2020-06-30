<template>
  <layout>
    <template v-slot:main>
      <div class="enterprise">
        <div class="van-list">
          <van-cell-group>
            <template  v-for="(item,index) in list">
              <van-cell class="van-item" v-if="item.admin_system" :key="index" is-link  @click="company(item.id)">
                <template slot="title">
                  <div class="van-item-left">
                    <div class="j-tag" :class="srcShow(item.auth_status).className">{{srcShow(item.auth_status).msg}}</div>
                    <span style="margin-left:8px">{{item.name}}</span>
                  </div>
                </template>
              </van-cell>
            </template>
          </van-cell-group>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="j-button-group">
        <button class="j-button-confirm" @click="addCompany()">新增企业</button>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions({
      enterPrise: 'home/enterPrise',
      selectent: 'home/selectent',
      getPhone: 'home/getPhone'
    })
  }
})
export default class extends Vue {
  protected enterPrise!: any
  protected selectent!: any
  protected getPhone!: any
  list = []
  imglink = ''
  sum = 0
  adminIndex = 0
  loading = false
  created () {
    // 通过首次使用接口查询是否绑定手机号、是否有认证企业
    const toat1 = Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.getPhone().then((item: any) => {
      console.log(item)
      if (item.data.phone === '') {
        this.$goAnotherPage('/phone/bindPhone', 'replace')
      } else {
        this.enterPrise().then((res: any) => {
          const data = res.data.data.ents
          console.log(data)
          if (data.length === 0) {
            this.$router.push('/entAuth?from=add')
          } else {
            data.forEach((li, i) => {
              console.log(li)
              if (li.admin_system === true) {
                this.sum++
                this.adminIndex = i
              }
            })
            console.log(this.sum)
            if (this.sum === 0) {
              this.$router.push('/entAuth')
            } else if (this.sum === 1) {
              // 选择企业
              this.selectent(`id=${data[this.adminIndex].id}`).then((res: any) => {
                console.log(res)
                if (res.status === 200) {
                  this.$router.replace('/entcontent?id=' + data[this.adminIndex].id)
                }
              })
            } else {
              this.list = data
            }
          }
        })
      }
      toat1.clear()
      this.loading = true
    })
  }

  tagStateMap = {
    0: {
      className: 'tag-fail',
      msg: '未认证'
    },
    1: {
      className: '',
      msg: '已认证'
    },
    '-1': {
      className: 'tag-danger',
      msg: '未通过'
    }
  }

  // 根据后端返回的值选择显示那个图片
  srcShow (status) {
    return this.tagStateMap[status]
  }

  company (id) {
    // 选择企业
    this.selectent(`id=${id}`).then((res: any) => {
      console.log(res)
      if (res.status === 200) {
        this.$router.push('/entcontent?id=' + id)
      }
    })
  }

  // 新增企业
  addCompany () {
    this.$router.push({ path: '/entAuth?from=add' })
  }
}
</script>
<style lang="scss" scoped>

.j-tag{
  display: flex;
  justify-content: center;
  align-items: center;
  height:22px;
  line-height: normal;
  padding: 0 8px;
  border: 1px solid #2ABED1;
  color: #2ABED1;
  border-radius:11px;
  font-size: 13px;
  white-space: nowrap;
}
.tag-danger {
  color:#FB483D;
  border-color: #FB483D;
}
.tag-fail {
  color:#C0C4CC;
  border-color: #C0C4CC;
}
.enterprise{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
}
.van-item{
  width: 100%;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  font-size: 16px;
  color: #171826;
  .van-cell__title{
    padding-left: 17px;
    .van-item-left{
      display:flex;
      align-items:center;
    }
    .van-icon-arrow{
      font-size:20px;
      color:#C0C4CC;
    }
  }
}

</style>
