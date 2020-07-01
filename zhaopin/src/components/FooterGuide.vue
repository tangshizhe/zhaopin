<template>
    <div class="footer_guide">
        <!--职位-->
        <span class="guide_item" :class="{on: '/worker' === $route.path}" @click="goto('/worker')">
            <span class="item_icon">
                <van-icon name="credit-pay" />
            </span>
            <span class="item_text">职位</span>
        </span>
        <!--发现-->
        <span class="guide_item" :class="{on: '/find' === $route.path}" @click="goto('/find')">
            <span class="item_icon">
                <van-icon name="browsing-history-o" />
            </span>
            <span class="item_text">发现</span>
        </span>
        <!-- 消息 -->
        <span class="guide_item" :class="{on: '/message' === $route.path}" @click="goto('/message')">
            <span class="item_icon">
                <van-icon name="chat-o" />
            </span>
            <span class="item_text">消息</span>
        </span>
        <!-- 我的 -->
        <span class="guide_item" :class="{on: '/mine' === $route.path}" @click="goto('/mine')">
            <span class="item_icon">
                <van-icon name="contact" />
            </span>
            <span class="item_text">我的</span>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
@Component({
  components: {
    [Icon.name]: Icon
  },
  methods: {
    goto (path) {
      this.$router.replace(path)
    }
  }
})
export default class extends Vue {}
</script>

<style lang="scss">

</style>
