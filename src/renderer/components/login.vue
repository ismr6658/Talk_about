<template>
  <div class="out_shadow">
    <div class="mai">
      <transition class="el-fade-in" mode="out-in">
        <div class="login" v-if="type" @keyup.enter="login">
          <div class="logoBox">
            <img src="~@/assets/top.png" alt="" class="logo" />
            <h1 class="title">海洋局IM</h1>
          </div>

          <mt-field
            label="账号"
            placeholder=""
            v-model="username"
            style="border-bottom:1px solid #ccc;margin-bottom:5px;min-height:40px;width:194px;font-size:14px;"
          ></mt-field>
          <mt-field
            label="密码"
            placeholder=""
            type="password"
            v-model="password"
            @keyup.enter="login"
            style="border-bottom:1px solid #ccc;margin-bottom:40px;min-height:40px;font-size:14px;width:194px;"
          ></mt-field>

          <mt-button
            type="primary"
            class="log"
            @click="login"
            style="width:194px;height:30px;background:rgba(46,137,239,1);border-radius:3px;color:#fff;text-align:center;line-height:30px;font-size:12px;"
            >登录</mt-button
          >

          <!-- <a
            class="register"
            @click="
              type = false;
              username = '';
              password = '';
              password_confirm = '';
            "
            >还没有账号？去注册</a
          > -->
        </div>
        <div class="login" v-if="!type">
          <img src="~@/assets/chat.png" alt="" class="logo" />
          <mt-field
            label="昵称"
            placeholder="Input nickname"
            v-model="name"
          ></mt-field>
          <mt-field
            label="账号"
            placeholder="Input username"
            v-model="username"
          ></mt-field>
          <mt-field
            label="密码"
            placeholder="Input password"
            type="password"
            v-model="password"
          ></mt-field>
          <mt-field
            label="确认密码"
            placeholder="Input password"
            type="password"
            v-model="password_confirm"
            @keyup.enter="register"
          ></mt-field>

          <mt-button type="primary" class="log" @click="register"
            >注册</mt-button
          >

          <a
            class="register"
            @click="
              type = true;
              username = '';
              password = '';
              password_confirm = '';
              name = '';
            "
            >已有账号？去登陆</a
          >
        </div>
      </transition>

      <div class="region"></div>
      <img src="~@/assets/关闭.svg" class="close" alt="" @click="close" />
    </div>
  </div>
</template>
<script>
import path from "path";
export default {
  data: function() {
    return {
      name: "",
      username: "",
      password: "",
      password_confirm: "",
      type: true
    };
  },
  methods: {
    login() {
      var _this = this;

      if (_this.username.trim() == "" || _this.password.trim() == "") {
        _this.$toast("请输入账号或密码");
        return false;
      }
      var send = {
        action: "user.login",
        username: _this.username,
        password: _this.password
      };

      _this.ajax(send, function(data) {
        // _this.$store.commit('setToken',data.token)
        // _this.$store.commit('setUser',_this.username)

        // _this.$win.openWin({
        //     width:860,
        //     height:640,
        //     windowConfig:{
        //         router:'/home',
        //         name:'home',
        //         animation:'fromLeft',
        //         data:{
        //             token:data.token,
        //             username:_this.username
        //         }
        //     }
        // })
        console.log(data)
        _this.$electron.remote.getCurrentWindow().close();

        var ipc = _this.$electron.ipcRenderer;
        ipc.send("login", {
          username: _this.username,
          token: data.token,
          map:data.map
        });
      });
    },
    close() {
      this.$electron.remote.getCurrentWindow().close();
    },
    register() {
      var _this = this;
      if (
        _this.name.trim() == "" ||
        _this.username.trim() == "" ||
        _this.password.trim() == "" ||
        this.password_confirm.trim() == ""
      ) {
        _this.$toast("请先填写注册信息");
        return false;
      } else if (_this.password !== _this.password_confirm) {
        _this.$toast("密码输入不一致");
        return false;
      }

      var send = {
        action: "user.register",
        username: _this.username,
        password: _this.password,
        nickname: _this.name,
        receive_type: "ALL",
        extra: "no"
      };

      _this.ajax(send, function(data) {
        _this.$toast("注册成功");
        _this.type = true;
        _this.username = "";
        _this.password = "";
        _this.password_confirm = "";
        _this.name = "";


        
      });
    }
  },
  mounted() {
    var _this = this;
    // _this.username='abc'
    // var appico=path.resolve(__dirname,'../assets/app.ico')
    // _this.$electron.clipboard.writeImage(appico,'selection')
    // var ipc4=_this.$electron.ipcRenderer
    // setTimeout(()=>{
    //         ipc4.send('create-tray')
    //         // _this.username=appico
    // },500)
  }
};
</script>
<style lang="less" scoped>
.out_shadow {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 6px;
}
.mai {
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
}
.login {
  width: 100%;
  height: 100%;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   padding: 30px 20px;
  //   justify-content: space-around;
}
.region {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  height: 60px;
  -webkit-app-region: drag;
}
.close {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 10000;
  -webkit-app-region: no-drag;
}
.logoBox {
  height: 108px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
}
.logo {
  width: 100%;
  height: 108px;
}
.log {
  width: 100%;
}
.register {
  color: #26a2ff;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
}
.title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  line-height: 108px;
  color: #fff;
}
.mint-field .mint-cell-title{
    width: 35px !important;
}
</style>