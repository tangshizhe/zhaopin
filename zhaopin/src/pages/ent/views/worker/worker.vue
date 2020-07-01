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
      <slot name="main"></slot>
    </div>
    <div class="j-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Icon } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
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
.worker{
  .j-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    padding: 26px 12px 6px;  /* no */
    font-size: 17px;
    background-color: #fff;
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
    .header-left.hide,
    .header-right.hide {
      visibility: hidden;
    }

    .header-left {
      color: #5f5e64;
      color: #444;
      font-size: 20px;
    }
    .header-title {
      color: #171826;
    }
    .header-right {
      height: 100%;
      min-width: 20px;
      .van-icon-plus,.van-icon-search{
        font-size: .48rem;
        margin-left: .4rem;
      }
    }
  }
}

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
