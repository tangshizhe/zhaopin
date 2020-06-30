<template>
  <layout>
    <template v-slot:main>
      <!-- 企业信息 -->
      <div v-if="step == 1" class="enterprise">
        <p class="title">企业信息</p>
        <div style="position:relative;height:54px;background:#fff;">
          <van-cell-group>
              <van-field v-model.trim="companyName" label="企业名称" placeholder="输入您的企业名称" @input='companyInput' @blur="getCreditCodeFn" clearable />
          </van-cell-group>
          <div class="company_list" v-show="isShowList">
            <ul>
              <li class='citem' v-for="(item,index) in companyList" :key="index" :data-name="item" @click="itemFn(item)">
                <img src="@/assets/image/search.png" alt="">
                <span :data-name="item" v-html="item"></span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p class="field-label">统一社会信用代码</p>
          <van-field v-model.trim="creditCode" placeholder="输入您企业的统一社会信用代码" :error-message="codeError" :formatter="formatter" maxlength="18" clearable @blur="checkCreitCode" />
        </div>
        <p class="title">证件信息</p>
        <div class="upload">
            <van-uploader v-model="fileList"  :max-count="1" :after-read="licenseUpload" >
                <span class="upload_text">上传营业执照</span>
            </van-uploader>
        </div>
        <p class="tip">营业执照上的所有信息均需清晰可见</p>
      </div>
      <!-- 法定代表人 -->
      <div  v-else-if="step == 2" class="represent">
        <p class="id_title">法定代表人认证</p>
        <p class="id_tip">请使用营业执照里法定代表人的身份证</p>
        <div class="front">
            <van-uploader v-model="idFront"  :max-count="1" :after-read="idCardFrontUpload">
                  <span class="upload_text">上传身份证正面</span>
            </van-uploader>
        </div>
        <div class="reverse">
            <van-uploader v-model="idReverse"  :max-count="1" :after-read="idCardReverseUpload">
                  <span class="upload_text">上传身份证反面</span>
            </van-uploader>
        </div>
        <van-cell-group>
          <van-field v-model="userName" label="真实姓名" placeholder="请输入法定代表人真实姓名" :error-message="userNameError"  @blur='checkUserNameError' @focus="getFocus($event)" />
          <van-field v-model="idCard" clearable label="身份证号" placeholder="请输入法定代表人身份证号" maxlength="18" :error-message="idCardError"  @blur='checkIdCardError' @focus="getFocus($event)" />
        </van-cell-group>
      </div>
    </template>
    <template v-slot:footer>
        <div class="j-button-group">
            <button v-if="step == 1" class="j-button-confirm" :disabled ="nextBtn" @click="nextHandle">下一步</button>
            <button v-else-if="step == 2" class="j-button-confirm" :disabled ="finishBtn" @click="finishHandle">立即提交</button>
        </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Field, CellGroup, Uploader, Button, Toast } from 'vant'
import { mapActions } from 'vuex'
@Component({
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Button.name]: Button
  },
  methods: {
    ...mapActions({
      association: 'home/association',
      getUscc: 'home/getUscc',
      imgUpload: 'home/imgUpload',
      companySubmit: 'home/companySubmit'
    })
  }
})
export default class extends Vue {
    protected association!: any
    protected getUscc!: any
    protected imgUpload!: any
    protected companySubmit!: any
    companyName = ''
    creditCode = ''
    userName = ''
    idCard = ''
    fileList: any = []
    idFront: any = []
    idReverse: any = []
    step = 1
    isShowList = false
    resultList = []
    companyList: Array<any> = []
    licenseStr = ''
    idFrontStr = ''
    idReverseStr = ''
    codeError = ''
    idCardError = ''
    userNameError = ''
    uTime: any
    from = ''
    // 计算属性 判断第一步按钮是否禁用
    get nextBtn (): any {
      if (this.companyName !== '' && this.creditCode.length === 18 && this.fileList.length > 0 && this.fileList[0].status === 'success') {
        return false
      } else {
        return true
      }
    }

    // 计算属性 判断立即提交按钮是否禁用
    get finishBtn (): any {
      const regName = /^[\u2E80-\u9FFF]+$/
      const idPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
      if (regName.test(this.userName) && idPatter.test(this.idCard) &&
        this.idFront.length > 0 &&
        this.idReverse.length > 0 &&
        this.idFront[0].status === 'success' &&
        this.idReverse[0].status === 'success'
      ) {
        return false
      } else {
        return true
      }
    }

    created () {
      console.log(this.creditCode.length, this.$route.query)
      if ((this.$route as any).query.entName) {
        this.companyName = String(this.$route.query.entName)
        if (this.companyName) {
          this.getUList(this.companyName)
        }
      }
      if ((this.$route as any).query.entUscc) {
        this.creditCode = String(this.$route.query.entUscc)
      }
      if ((this.$route as any).query.from) {
        this.from = String(this.$route.query.from)
      }
    }

    // 获取焦点弹出软键盘遮盖输入框
    getFocus (item) {
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        setTimeout(() => {
          item.target.scrollTop = document.body.scrollHeight
        }, 200)
      } else {
        setTimeout(() => {
          item.target.scrollIntoView({ block: 'center' })
        }, 200)
      }
    }

    // 公司名称联想
    companyInput () {
      this.association(`name=${this.companyName}`).then((res: any) => {
        console.log(res)
        if (res.data.list.length !== 0) {
          this.isShowList = true
          const result: Array<any> = []
          res.data.list.map((item: any) => {
            item = this.brightKeyword(item)
            result.push(item)
            return result
          })
          console.log(result)
          this.companyList = result
        } else {
          this.isShowList = false
        }
      })
    }

    // 关键词高亮
    brightKeyword (val) {
      const companyName = this.companyName
      if (val.indexOf(companyName) !== -1) {
        console.log(val.replace(companyName, `<font color='#2ABED1'>${companyName}</font>`))
        return val.replace(companyName, `<font color='#2ABED1'>${companyName}</font>`)
      } else {
        return val
      }
    }

    // 失去焦点查询企业社会信用代码
    getCreditCodeFn () {
      if (this.companyName !== '') {
        this.getUList(this.companyName)
      }
    }

    getUList (companyName: string) {
      clearTimeout(this.uTime)
      this.uTime = setTimeout(() => {
        this.getUscc(`entName=${companyName}`).then((res: any) => {
          console.log(res)
          this.creditCode = res.data
          this.isShowList = false
        })
      }, 300)
    }

    // 点击查询到的企业名称列表项
    itemFn (e) {
      this.companyName = e.replace(/<.*?>/ig, '')
      // console.log(this.companyName)
      this.getUList(this.companyName)
    }

    // 社会信用代码只能输入数字和字母
    formatter (value) {
      return value.replace(/[^\w./]/ig, '')
    }

    // 社会信用代码错误提示
    checkCreitCode () {
      if (/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/g.test(this.creditCode) || this.creditCode === '') {
        this.codeError = ''
      } else {
        this.codeError = '统一社会信用代码格式错误'
      }
    }

    // 姓名错误提示
    checkUserNameError () {
      const regName = /^[\u2E80-\u9FFF]+$/
      if (regName.test(this.userName) || this.userName === '') {
        this.userNameError = ''
      } else {
        this.userNameError = '姓名格式不正确'
      }
    }

    // 身份证号错误提示
    checkIdCardError () {
      const idPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
      if (idPatter.test(this.idCard) || this.idCard === '') {
        this.idCardError = ''
      } else {
        this.idCardError = '身份证号格式不正确'
      }
    }

    // 上传完成执行函数
    afterRead (file, name, callback) {
      console.log(file)
      if (file.file.size > 10485760) {
        Toast('图片不能大于10M')
      } else {
        file.status = 'uploading'
        file.message = '上传中...'
        const data = new FormData()
        data.append('type', name)
        data.append(name, file.file)
        this.imgUpload(data).then((res: any) => {
          console.log(res)
          if (res.error_msg !== '') {
            file.status = 'failed'
            file.message = res.error_msg
          } else {
            file.status = 'success'
            file.message = '上传成功'
            callback(res)
          }
        // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
          console.log(err)
          file.status = 'failed'
          file.message = '上传失败'
        })
      }
    }

    // 营业执照上传
    licenseUpload (file) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      console.log(file)
      this.afterRead(file, 'usccImg', function (data: any) {
        self.licenseStr = data.data
      })
    }

    // 身份证正面上传
    idCardFrontUpload (file) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.afterRead(file, 'idcardImgZ', function (data: any) {
        self.idFrontStr = data.data
      })
    }

    // 身份证反面上传
    idCardReverseUpload (file) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.afterRead(file, 'idcardImgF', function (data: any) {
        self.idReverseStr = data.data
      })
    }

    // 点击下一步执行函数
    nextHandle () {
      this.step = 2
    }

    // 点击提交执行函数
    finishHandle () {
      let isClick = true
      if (isClick) {
        isClick = false
        this.companySubmit(
          `entName=${this.companyName}&entUSCC=${this.creditCode}&licensePath=${this.licenseStr}&legalName=${this.userName}&legalIdcode=${this.idCard}&legalIdPicPathZ=${this.idFrontStr}&legalIdPicPathF=${this.idReverseStr}&add=${this.from}`
        ).then((res: any) => {
          console.log(res)
          if (res.error_msg !== '') {
            Toast(res.error_msg)
          } else {
            if (res.data.status === 1) {
              Toast('认证成功')
              this.$router.replace({
                path: '/authResult',
                query: { result: '1', name: this.companyName }
              })
            } else if (res.data.status === -1) {
              Toast('认证失败')
              if (res.data.reason === '企业已被认证') {
                this.$router.replace({
                  path: '/authResult',
                  query: { result: '-2', name: this.companyName }
                })
              } else {
                this.$router.replace({
                  path: '/authResult',
                  query: { result: '-3', name: this.companyName }
                })
              }
            }
          }
        }).catch((err) => {
          console.log(err)
        })
        setTimeout(function () {
          isClick = true
        }, 1000) // 一秒内不能重复点击
      }
    }
}
</script>
<style lang="scss" >
// 公共样式
.van-cell{
  padding: 15px 16px;
}
.van-field__label{
  font-size: 15px;
}
.field-label{
  font-size: 15px;
  background: #fff;
  padding: 15px 16px 0;
}
.van-field__control{
  font-size: 16px;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  margin-left: 16px;
}
.van-uploader__input{
  z-index: 1000;
}
@mixin uploadBtn($width){
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  width: $width;
  height: 32px;
  background: #2ABED1;
  color: #fff;
  font-size: 15px;
  line-height: 32px;
  border-radius: 16px;
  text-align: center;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 999;
}
// 企业信息
.enterprise{
  .title{
    padding: 8px 15px;
    font-size: 16px;
    line-height: 24px;
  }
  .company_list{
    position: absolute;
    // bottom: -108px;
    left: 16px;
    right: 16px;
    padding-left: 16px;
    background: #fff;
    height: auto;
    box-shadow: 0px 4px 16px rgba(8, 31, 38, 0.08);
    border-radius: 8px;
    z-index: 999;
    .citem{
      position: relative;
      display: flex;
      align-items: center;
      padding:15px 0 15px 0;
      color: #171826;
      font-size: 16px;
      line-height: 24px;
      &:after{
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        margin-left: 36px;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scale(.5);
        transform: scale(.5);
      }
      img{
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
    }
  }
  .upload{
    position: relative;
    width: 222px;
    height: 254px;
    margin: 16px auto;
    text-align: center;
    background: url(~@/assets/image/uploader.png) no-repeat center center;
    background-size: 100% 100%;
    .van-uploader{
      width: 190px;
      height: 230px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .van-uploader__wrapper{
        width: 100%;
        height: 100%;
      }
      .van-uploader__preview,.van-image,.van-uploader__preview-image{
        width: 100%;
        height: 100%;
        margin: 0;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .upload_text,.van-uploader__input-wrapper{
      @include uploadBtn(118px)
    }
  }
  .tip{
    margin-top: 16px;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    color: #9B9CA3;
  }
}
// 法定代表人信息
.represent{
  .front,.reverse{
    position: relative;
    width: 222px;
    height: 154px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    .van-uploader{
      width: 190px;
      height: 122px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .van-uploader__wrapper{
        width: 100%;
        height: 100%;
      }
      .van-uploader__preview,.van-image,.van-uploader__preview-image{
        width: 100%;
        height: 100%;
        margin: 0;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .upload_text,.van-uploader__input-wrapper{
      @include uploadBtn(133px)
    }
  }
  .front{
    margin: 0 auto 48px;
    background-image: url(~@/assets/image/idFront.png);
  }
  .reverse{
    margin: 0 auto 36px;
    background-image: url(~@/assets/image/idReverse.png);
  }
  .id_title{
    text-align: center;
    padding: 16px 16px 0;
    font-size: 15px;
    line-height: 22px;
  }
  .id_tip{
    padding: 8px 16px 16px;
    color: #2ABED1;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
}
</style>
