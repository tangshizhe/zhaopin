<template>
  <div class="j-container" :class="{'transparent-header': transparentHeader}">
    <div class="j-header" v-if="!weixinBrower" ref="header">
      <van-icon class="header-left" :class="{ hide: hideBackIcon }" name="arrow-left" @click="goBack" />
      <span class="header-title">{{ headerOptions.title }}</span>
      <span class="header-right" @click="actionRight">{{ headerOptions.actionText }}</span>
    </div>
    <div class="j-main">
      <slot name="main"></slot>
    </div>
    <div class="j-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)

// @ is an alias to /src
export default {
  name: 'layout',
  data () {
    return {
      weixinBrower: false,
      headerOptions: {
        title: '',
        actionText: ''
      }
    }
  },
  props: {
    transparentHeader: {
      type: Boolean,
      default: false
    },
    hideBackIcon: {
      type: Boolean,
      default: false
    },
    gobackCallback: Function,
    actionCallback: Function
  },
  created () {
    this.weixinBrower = this.isWeixinBrower()
    this.initHeaderInfo()
  },
  mounted () {
    // console.log(this.$refs.header)
  },
  methods: {
    initHeaderInfo: function () {
      this.headerOptions.title = this.$route.meta.title
      this.headerOptions.actionText = this.$route.meta.actionText
    },
    goBack () {
      this.gobackCallback && this.gobackCallback()
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    actionRight: function () {
      this.actionCallback && this.actionCallback()
    },
    isWeixinBrower: function () {
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    }
  }
}
</script>

<style lang="scss">
// 已经正确引入使用amfe-flexible，直接使用px即可自动转换为rem
// 现在，375px下，1rem=37.5px
// 在375的设计图下，只需设计图原尺寸即可
// 头部样式start -----------
.j-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &.transparent-header {
    .j-header {
      position: absolute;
      width: 100%;
      background-color: transparent;
      font-size: 0;
      &:after {
        height: 0;
      }
      .header-left {
        color: #fff;
      }
    }
  }
}

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
    font-size: 15px;
  }
}

.j-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
}
.j-footer {
  box-shadow: 0px -2px 8px rgba(54, 147, 179, 0.051);  /* no */
}
</style>
