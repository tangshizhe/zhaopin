<template>
  <layout>
    <template v-slot:main>
      <div class="instury">
        <van-cell class="van-item" title="所属行业" is-link :class="{actives: showinstury !== '未选择'}" :value="showinstury" @click="selectindustry"/>
      </div>
      <van-action-sheet  v-model="popupshow" close-icon='clear' title="选择所属行业">
        <div class="content">
            <li class='list-item' :class="{active: item.isShow}" v-for="(item,index) in buttonList" :key="index" @click="selected(index,item)" ref="chosebox">
              {{item.name}}
              <img class="check" v-if="item.isShow"  src="@/assets/image/check.png" alt="">
            </li>
        </div>
      <div class="confirm">
          <button class="confirm_button" @click="confirm()">确定</button>
      </div>
      </van-action-sheet>
    </template>
  </layout>
</template>

<script lang = "ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { Form, Field, ActionSheet, Button, Cell } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet
  },
  methods: {
    ...mapActions({
      entinfo: 'home/entinfo',
      industryclass: 'home/industryclass'
    })
  }
})
export default class extends Vue {
  protected entinfo!: any
  protected industryclass!: any
  isChecked = 0
  popupshow = false
  buttonList = [
    { name: '建筑工程', isShow: false }, { name: '行政办公', isShow: false }, { name: '医疗卫生', isShow: false }, { name: '服务采购', isShow: false }, { name: '机械设备', isShow: false }, { name: '水利水电', isShow: false },
    { name: '能源化工', isShow: false }, { name: '弱电安防', isShow: false }, { name: '信息技术', isShow: false }, { name: '交通工程', isShow: false }, { name: '市政设施', isShow: false }, { name: '农林牧渔', isShow: false },
    { name: '其他', isShow: false }
  ]

  isoption = false
  option = ''
  showinstury = '未选择'
  isSelect = false
  created () {
    this.entinfo().then((res: any) => {
      console.log(res.data.data)
      const data = res.data.data
      if (data.ent_industryclass === '') {
        this.showinstury = '未选择'
        this.isoption = false
      } else {
        this.showinstury = data.ent_industryclass
        this.isoption = true
      }
    })
  }

  // 行业回显
  selectindustry () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    that.popupshow = true
    that.entinfo().then((res: any) => {
      const data = res.data.data
      if (data.ent_industryclass === '') {
        that.showinstury = '未选择'
        that.isoption = false
      } else {
        that.showinstury = data.ent_industryclass
        that.isoption = true
        that.buttonList.forEach(function (listItem) {
          // listItem.isShow = i === index
          if (data.ent_industryclass === listItem.name) {
            listItem.isShow = true
            that.option = listItem.name
          } else {
            listItem.isShow = false
          }
        })
      }
    })
  }

  // 点击行业按钮选择行业
  selected (index) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    this.buttonList.forEach(function (listItem, i) {
      // listItem.isShow = i === index
      if (i === index) {
        listItem.isShow = true
        that.option = listItem.name
      } else {
        listItem.isShow = false
      }
    })
  }

  // 点击确定
  confirm () {
    this.showinstury = this.option
    this.industryclass(`industryclass=${this.option}`).then((res: any) => {
      console.log(res)
      this.popupshow = false
    })
  }
}
</script>
<style lang="scss" scoped>
.instury{
  width: 100%;
  height: 100%;
  background: #F5F6F7;
}
.actives{
  .van-cell__value{
    span{
      color: #2ABED1;
    }
  }
}
.van-item{
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  .van-cell__title{
    flex: 2;
    padding-left: 17px;
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
      font-size: 14px;
      color: #9B9CA3;
  }
}

// 底部弹框样式
.van-action-sheet{
  overflow-x: hidden;
}
.van-action-sheet__header{
    height: 64px;
    padding-left: 16px;
    color: #171826;
    font-size: 20px;
    text-align: left;
    line-height: 64px;
    .van-action-sheet__close{
      position: absolute;
      top: 0;
      right: 0;
      line-height: inherit;
    }
}
.content {
  height: 168px;
  padding: 0 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .list-item {
    position: relative;
    width: 78px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    border-radius: 4px;
    background: #F5F6F7;
  }
  .active{
    background: #E8FAFD;
  }
  .check{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 14px;
    height: 14px;
  }
}
.confirm{
  width: 100%;
  height: 66px;
  background: #fff;
  padding:0 16px 0 16px;
  .confirm_button{
    width: 343px;
    height: 46px;
    margin: 8px 0 12px 0;
    background: #2ABED1;
    border-radius: 8px;
    font-size: 18px;
    color: #F7F9FA;
    text-align: center;
    line-height: 26px;
  }
}
</style>
