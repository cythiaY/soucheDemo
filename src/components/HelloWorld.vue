<template>
  <div class="hello">
    <input type="text" v-model="inputValue" placeholder="校验手机号">
    <sob-button type="info" v-bury="'BURY_TEST_DONE'" @click.native="isPhone" mini>submit</sob-button>
    <div>手机号验证结果：{{result}}</div>
    <!-- 图片懒加载 -->
    <div v-for="n in 10" :key="n">
      <oss-image src="http://img.souche.com/dccde1d428a14343c9e007970b3e37cb.jpg" :action="action">
      </oss-image>
    </div>
  </div>
</template>

<script>
import RegexpUtils from '@souche-f2e/souche-util/lib/regexp'
import Http from '@souche-f2e/http-request'
export default {
  name: 'HelloWorld',
  data () {
    return {
      inputValue: '',
      result: false,
      action: {
        action: 'resize',
        w: 200
      }
    }
  },
  methods: {
    isPhone () {
      this.result = RegexpUtils.isPhone(this.inputValue)
      // http请求
      Http.ajax({
        url: '',
        type: 'get',
        data: {}
      }).then(res => {
        console.log('http:' + res)
        this.$bury('BURY_TEST_SUCCESS')// 请求成功后埋点（字符串）
      })
      // jsonp请求
      Http.jsonp('http://metadata.sqaproxy.souche.com/api/store/StoreDataApi/queryStoreData.jsonp', {
        pageSize: 20
      }).then(function (res) {
        console.log('jsonp' + res)
      }, function (err) {
        console.log('jsonpErr' + err)
      })
      // 获取地理位置
      this.$getPosition()
        .then(res => {
          console.log('position' + res)
        })
        .catch(err => {
          console.log('positionErr' + err)
        })
      // 微信分享
      this.$share({
        title: `分享标题`,
        content: '分享内容',
        url: location.href,
        image: 'https://s.gravatar.com/avatar/88ce765f15ea75a9e4d25fb8f4fb8c11?s=50&d=retro'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
img {
  width: auto;
}
</style>
