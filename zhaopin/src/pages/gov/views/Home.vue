<template>
  <layout>
    <template v-slot:main>
      <div class="home">
        <div class="location">
          <img src="@/assets/image/location_icon.png" alt="">
          <router-link to="/changeCity" class="city">
            <span>郑州</span>
            <img src="@/assets/image/down.png" alt="">
          </router-link>
        </div>
        <p class="name">金水区科技局</p>
        <div>
          <van-cell class="link-item" title="财政扶持资金" icon="location-o" is-link to="/firstUse">
            <template #icon>
              <img src="@/assets/image/fund_icon.png" alt="">
            </template>
          </van-cell>
          <van-cell class="link-item" title="数据填报入口" icon="location-o" is-link to="#" >
          <template #icon>
              <img src="@/assets/image/match_icon.png" alt="">
            </template>
          </van-cell>
        </div>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Cell } from 'vant'
export default {
  name: 'Home',
  components: {
    [Cell.name]: Cell
  }
}
</script>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
}
.location{
  display: flex;
  align-items: center;
  padding: 16px 18px;
  background: #fff;
  &>img{
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }
  .city{
    display: flex;
    align-items: center;
    span{
      font-size: 16px;
      line-height: 24px;
      color: #171826;
      margin-right: 8px;
    }
    img{
      width: 16px;
      height: 16px;
    }
  }
}
.name{
  padding: 8px 15px;
  font-size: 16px;
  line-height: 24px;
  color: #9B9CA3;
}
.link-item{
  padding: 15px 18px;
  line-height: 24px;
  font-size: 16px;
  color: #171826;
  img{
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
}
.van-cell:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 52px;
    border-bottom: 0.02667rem solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
.van-cell__right-icon{
  color: #C0C4CC;
}
</style>
