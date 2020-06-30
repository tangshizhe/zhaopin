<template>
  <div class="j-steps">
    <div
      class="j-step"
      v-for="(item,index) in stepList"
      :key="index"
      :active="item.lineActive"
      >
      <div class="step-left">
        <div class="step-title">{{ item.title }}</div>
        <div class="step-desc">{{ item.desc }}</div>
      </div>
      <router-link
        class="step-action j-button"
        :to="item.actionLink"
        tag="button"
        :disabled="item.buttonDisable"
        >
        {{ item.complete ? item.completeActionText : item.defaultActionText }}
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'steps',
  data () {
    return {
      // 最大不超过stepList.length
      maxLength: 1
    }
  },
  props: {
    // 当前的进度
    active: {
      type: Number,
      default: 0
    },
    // stepList是数据
    stepList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    this.maxLength = this.stepList.length
    // this.active最大为数组的长度
    this.active = this.active > this.maxLength ? this.maxLength : this.active
    this.calcuateWhichActive()
  },
  mounted () {
    // console.log(this.$refs.header)
  },
  methods: {
    calcuateWhichActive () {
      const activeIndex = this.active
      const nextIndex = this.active + 1
      this.stepList.forEach(function (item, index) {
        // 添加线段的高亮
        item.lineActive = index < activeIndex
        item.buttonDisable = !(index < nextIndex)
        item.complete = index < activeIndex
      })
    }
  }
}
</script>

<style lang="scss">
.j-steps {
  padding: 0 16px;
  .j-step {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    &[active] {
      &:before {
        background-color: #2ABED1;
      }
      .step-title {
        &:before {
          background-color: #2ABED1;
          transform: translate(0,-50%);
        }
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 9px;
      width: 1px;
      height: 100%;
      background-color: #C0C4CC;
    }
    .step-left {
      padding-left: 20px;
    }
    .step-title {
      position: relative;
      color: #2ABED1;
      font-size: 16px;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: -14px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #C0C4CC;
        transform: translate(0,-50%);
      }
    }
    .step-desc {
      font-size: 14px;
      color: #5F5E64;
    }
    .step-action {
      min-width: 61px;
      height: 26px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 4px;
    }
  }
}
</style>
