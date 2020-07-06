<template>
  <div class="login">
    <header class="app-header">
      <van-icon name="arrow-left" class="fanhui" @click="fanhui()"/>
      <div class="subreport_title"></div>
    </header>
    <div class="app-main">
		<div class="login-head">
			欢迎来到德莱联盟
		</div>
		<div class="infor-login" v-if="isshow">
			<div class="infor">
				<van-field v-model="tel" type="tel" class="phone" label="手机号" placeholder="请输入手机号" />
				<van-field v-model="password" class="password" type="password" label="密码" placeholder="请输入密码" />
			</div>
			<div class="submit">
				<van-button type="primary" class="tologin" block>立即登录</van-button>
			</div>
			<div class="forget-register">
				<span class="forget">忘记密码？</span>
				<span class="register" @click="nowReg()">立即注册</span>
			</div>
		</div>
		<div class="infor-register" v-if="!isshow">
			<div class="infor">
				<van-field v-model="tel" type="tel" class="phone" label="手机号" placeholder="请输入手机号" />
				<van-field v-model="password" class="password" type="password" label="密码" placeholder="请输入密码" />
			</div>
			<div class="submit">
				<van-button type="primary" class="tologin" block>立即注册</van-button>
			</div>
			<div class="tologin">
				<span class="register" @click="tologin()">已有账号，去登录</span>
			</div>
		</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Field } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Field.name]: Field
  },
  methods: {
    ...mapActions({
      indexpage: 'home/indexpage'
    })
  }
})
export default class extends Vue {
  protected indexpage!: any;
  tel= ''
  password= ''
  isshow= true
  fanhui () {
    history.go(-1)
  }

  nowReg () {
    this.isshow = false
  }

  tologin () {
    this.isshow = true
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .app-header {
	padding: .56rem .32rem .4rem;
    position: absolute;
    background: transparent;
    .fanhui {
		display: flex;
		align-items: center;
		width: 0.96rem;
		height: 0.96rem;
		font-size: 0.48rem;
		color: #fff;
    }
  }
  .app-main {
	width: 100%;
	.login-head{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5.6rem;
		background: url('../../../../assets/image/bg_info.png');
		background-size: 100% 100%;
		color: #fff;
	}
	.infor-login{
		.infor{
			margin-top: .8rem;
			padding: 0 .32rem;
			.van-cell{
				height: 1.32rem;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 .48rem;
			}
		}
		.submit{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 1.32rem;
			padding: 0 .48rem;
			margin-top: 1rem;
			.tologin{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 1.12rem;
				background: #2ABED1;
				color: #fff;
				font-size: .4rem;
				border-radius: .24rem;
			}
		}
		.forget-register{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 .48rem;
			margin-top: .36rem;
			height: .5rem;
			.forget,.register{
				font-size: .32rem;
				color: #2ABED1;
			}
		}
	}
	.infor-register{
		.infor{
			margin-top: .8rem;
			padding: 0 .32rem;
			.van-cell{
				height: 1.32rem;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 .48rem;
			}
		}
		.submit{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 1.32rem;
			padding: 0 .48rem;
			margin-top: 1rem;
			.tologin{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 1.12rem;
				background: #2ABED1;
				color: #fff;
				font-size: .4rem;
				border-radius: .24rem;
			}
		}
		.tologin{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 .48rem;
			margin-top: .36rem;
			height: .5rem;
			.register{
				font-size: .32rem;
				color: #2ABED1;
			}
		}
	}
  }
}
</style>
