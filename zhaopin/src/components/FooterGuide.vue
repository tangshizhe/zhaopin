<template>
    <div class="footer_guide">
        <!--职位-->
        <span class="guide_item" :class="{on: '/worker' === $route.path}" @click="goto('/worker')">
            <span class="item_icon">
                <i class="iconfont iconshop"></i>
            </span>
            <span class="item_text">职位</span>
        </span>
        <!--发现-->
        <span class="guide_item" :class="{on: '/find' === $route.path}" @click="goto('/find')">
            <span class="item_icon">
                <i class="iconfont iconshop"></i>
            </span>
            <span class="item_text">发现</span>
        </span>
        <!-- 消息 -->
        <span class="guide_item" :class="{on: '/message' === $route.path}" @click="goto('/message')">
            <span class="item_icon">
                <i class="iconfont iconshop"></i>
            </span>
            <span class="item_text">消息</span>
        </span>
        <!-- 我的 -->
        <span class="guide_item" :class="{on: '/mine' === $route.path}" @click="goto('/mine')">
            <span class="item_icon">
                <i class="iconfont iconshop"></i>
            </span>
            <span class="item_text">我的</span>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FooterGuide',
  methods: {
    goto (path) {
      this.$router.replace(path)
    }
  }
})
</script>

<style lang="scss">

</style>
