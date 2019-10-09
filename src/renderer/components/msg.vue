<template>
  <div class="mai">
    <div class="cont">
      <div class="t1">
        <h3>{{ info.nickname }}</h3>
        <h5>山东 烟台</h5>
      </div>
      <div class="t2">
        <ul>
          <li>
            账号<span>{{ info.username }}</span>
          </li>
          <li>
            昵称<span>{{ info.nickname }}</span>
          </li>
          <li>
            电话<span>{{ info.tel }}</span>
          </li>
          <li>
            邮箱<span>{{ info.mail }}</span>
          </li>
          <li>
            备注<span>{{ info.msg }}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="t3">说明：{{ info.extra }}</div> -->
      <img src="~@/assets/head.jpg" alt="" />
      <el-button type="success" class="btn" @click="send">发消息</el-button>
    </div>
  </div>
</template>
<script>
import sendMsg from "../mixin/sendMsg.js";
export default {
  mixins: [sendMsg],
  data() {
    return {
      info: {
        username: "",
        nickname: "",
        extra: ""
      }
    };
  },
  methods: {
    show() {
      var _this = this;
      var info = this.$store.state.peopleInfo;
      _this.info = info;
      console.log(_this.info);
    },
    send() {
      var info = this.info;
      console.log(info);
      this.sendMsg(info);
    }
  },
  mounted() {
    this.show();
  }
};
</script>
<style lang="less" scoped>
.mai {
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  .cont {
    width: 408px;
    margin: 0 auto;
    margin-top: 30px;
    position: relative;
    .t1 {
      border-bottom: 1px solid #e0e0e0;
      h3 {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(17, 17, 17, 1);
        line-height: 20px;
        margin: 0;
      }
      h5 {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;
        margin: 20px 0 40px;
      }
    }
    .t2 {
      padding-top: 35px;
      padding-bottom: 35px;
      color: #999;
      border-bottom: 1px solid #e0e0e0;
      ul {
        padding: 0;
      }
      li {
        list-style: none;
        font-size: 14px;
        margin-bottom: 18px;
        span {
          margin-left: 50px;
          color: #111;
        }
      }
    }
    .t3 {
      margin-top: 2px;
      color: #bbbbbb;
    }
    img {
      width: 60px;
      height: 60px;
      display: block;
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .btn {
      display: block;
      margin: 36px auto 0;
      background: #2e89ef;
      height: 36px;
      border-color: #2e89ef;
      width: 138px;
      padding: 0;
    }
  }
}
</style>
