<template>
  <div class="changeCity">
    <p class="title">当前城市</p>
    <div class="location">
      <img src="@/assets/image/location_icon.png" alt="">
      <span>郑州</span>
    </div>
    <p class="title">选择已上线的城市</p>
    <div>
      <van-cell class="link-item" title="郑州"  @click="goBack"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'

@Component({
  components: {
    [Cell.name]: Cell
  }
})
export default class extends Vue {
  goBack () {
    this.$router.back()
  }
}
</script>
<style lang="scss" scoped>
  .title{
    padding: 8px 15px;
    font-size: 16px;
    line-height: 24px;
    color: #9B9CA3;
  }
  .location{
    display: flex;
    align-items: center;
    padding: 16px 18px;
    background: #fff;
    font-size: 16px;
    line-height: 24px;
    color: #171826;
    img{
      width: 24px;
      height: 24px;
      margin-right: 15px;
    }
  }
  .link-item{
    padding: 15px 16px;
    line-height: 24px;
    font-size: 16px;
    color: #171826;
  }
  .van-cell__right-icon{
    color: #C0C4CC;
  }
</style>
