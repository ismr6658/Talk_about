<template>
  <div class="mai">
    <div class="name">{{ talker.nickname }}</div>
    <!--  聊天内容-->
    <div class="content" ref="content">
      <div class="cont" ref="cont">
        <div
          class="item "
          v-for="(li, index) in dat"
          :class="{
            other: li.other,
            file: li.type == 'FILE',
            img: li.type == 'IMG',
            img: li.type == 'VIDEO',
            img: li.type == 'EMOJI'
          }"
          :key="index"
        >
          <img src="~@/assets/head.jpg" alt="" class="head" />

          <span class="text" v-html="li.text" v-if="li.type == 'TEXT'"></span>

          <div class="content" v-if="li.type == 'FILE'" @click="open(li)">
            <div class="t1">{{ li.text }}</div>
            <div class="t2">{{ li.size | fSize }}</div>
            <img src="~@/assets/file.png" class="i1" alt="" />
          </div>

          <div v-if="li.type == 'IMG'" @dblclick="open_video(li)">
            <img :src="li.url" alt="" style="width:100%;max-width:300px;" />
          </div>

          <div
            class="content"
            v-if="li.type == 'VIDEO'"
            @click="open_video(li)"
          >
            <video :src="li.url" controls style="width:100%"></video>
          </div>

          <div class="content" v-if="li.type == 'EMOJI'">
            <img :src="emoji[li.text]" alt="" style="width:30px" />
          </div>
        </div>
      </div>
    </div>
    <div class="emoji" v-if="show_emoji">
      <emoji class="div" @send="send_emoji" />
    </div>
    <!-- 输入框 -->
    <div class="inp" @keyup.enter="send">
      <div class="action">
        <label for="">
          <svg
            viewBox="0 0 1024 1024"
            width="16"
            height="16"
            @click.stop="show_emoji = true"
          >
            <path
              d="M506.282667 803.925333c1.002667 0 2.069333-0.042667 3.114667-0.042667 170.261333-2.005333 238.528-150.869333 239.189333-152.341333L274.112 651.306667C276.949333 657.6 346.069333 803.925333 506.282667 803.925333z"
              p-id="6336"
              fill="#777777"
            ></path>
            <path
              d="M326.805333 478.506667c27.029333 0 48.789333-21.866667 48.789333-48.810667s-21.781333-48.789333-48.789333-48.789333c-26.922667-0.042667-48.746667 21.824-48.746667 48.789333C278.058667 456.618667 299.84 478.506667 326.805333 478.506667z"
              p-id="6337"
              fill="#777777"
            ></path>
            <path
              d="M697.749333 429.717333m-48.810667 0a2.288 2.288 0 1 0 97.621333 0 2.288 2.288 0 1 0-97.621333 0Z"
              p-id="6338"
              fill="#777777"
            ></path>
            <path
              d="M512 0C229.696 0 0 229.696 0 512c0 282.325333 229.696 512 512 512 282.325333 0 512-229.674667 512-512C1024 229.696 794.325333 0 512 0zM512 981.098667C253.333333 981.098667 42.88 770.666667 42.88 512S253.333333 42.88 512 42.88 981.077333 253.333333 981.077333 512 770.666667 981.098667 512 981.098667z"
              p-id="6339"
              fill="#777777"
            ></path>
          </svg>
        </label>
        <label for="file">
          <svg viewBox="0 0 1024 1024" width="16" height="16">
            <path
              d="M1023.45728 780.8V414.06976 229.79072c0-22.76352-1.63328-44.0064-21.0432-60.01664-17.50016-14.44352-38.42048-12.74368-59.39712-12.74368H493.66016l22.10304 12.68224-72.34048-101.12512c-16.72192-23.38304-67.34848-13.54752-92.0576-13.54752H80.03072c-33.01888 0-33.01888 51.2 0 51.2h340.66944l-22.10304-12.68224 54.912 76.76416c12.416 17.3568 22.0928 37.90336 45.8496 37.90336h465.98144c10.28608 0 6.91712 16.74752 6.91712 23.4752V780.8c0 33.01376 51.2 33.01376 51.2 0z"
              p-id="2074"
              fill="#777777"
            ></path>
            <path
              d="M948.05504 852.48H72.79616c-14.17728 0-7.04-65.4592-7.04-74.56768V316.23168 169.11872c0-6.93248-5.86752-61.36832 5.12-62.47936 32.52736-3.28192 32.8448-54.51264 0-51.2-63.34976 6.38976-56.32 64.36864-56.32 110.81216v642.4832c0 41.26208 0.06144 94.9504 57.73312 94.9504h875.76576c33.01376-0.00512 33.01376-51.20512 0-51.20512z"
              p-id="2075"
              fill="#777777"
            ></path>
            <path
              d="M63.58016 394.24h908.78976c33.01376 0 33.01376-51.2 0-51.2H63.58528c-33.01888 0-33.01888 51.2-0.00512 51.2z"
              p-id="2076"
              fill="#777777"
            ></path>
          </svg>
        </label>

        <!-- <svg viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M1006.267608 768.753619c0-6.582299-2.750812-12.476896-7.073516-16.7996V201.005739c0-92.348678-75.057861-167.406539-167.406539-167.406539H345.090374c-4.912164-6.484056-12.575139-10.708517-21.220547-10.708517s-16.406627 4.224461-21.220548 10.708517H175.325996c-92.348678 0-167.406539 75.057861-167.406539 167.406539v609.010055c-4.617434 4.322704-7.662975 10.413787-7.662975 17.192573s2.947298 12.968112 7.662975 17.192573v13.066356c0 44.99542 17.585546 87.141784 49.416367 118.677875 31.241361 30.848388 72.503536 47.844474 116.12355 47.844474h658.328179c44.504203 0.491216 86.355838-16.50487 117.990172-47.844474 31.929064-31.536091 49.416367-73.682456 49.416367-118.677875v-72.01232c4.420947-4.224461 7.073516-10.2173 7.073516-16.701357zM323.771583 232.640073c64.251101 0 116.516523 52.265422 116.516523 116.516523S388.022685 465.673119 323.771583 465.673119s-116.516523-52.265422-116.516523-116.516523 52.363665-116.516523 116.516523-116.516523zM175.325996 65.430021H302.452793c1.571892 2.063109 3.340271 3.929731 5.501623 5.501623v130.663554c-74.370158 7.957705-132.431933 71.029887-132.431933 147.463155 0 81.836647 66.510697 148.347344 148.347344 148.347343s148.347344-66.510697 148.347343-148.347343c0-76.433267-58.061775-139.505449-132.431933-147.463155v-130.663554c2.063109-1.571892 3.929731-3.438515 5.501623-5.501623h486.598937c74.763132 0 135.575718 60.812587 135.575718 135.575718v529.825976L865.877969 629.346413 743.17212 752.052263 502.083126 510.963268 259.225752 753.722398l-92.250434-92.250434L39.750278 788.795247V201.005739c0-74.763132 60.812587-135.575718 135.575718-135.575718z m752.052263 888.119197c-25.543251 25.248521-59.338938 39.00258-95.394219 38.609606H173.655861c-35.367579 0-68.672049-13.655815-93.92057-38.609606-25.837981-25.543251-39.985013-59.633667-39.985013-95.983679v-13.066355c4.617434-4.322704 7.662975-10.413787 7.662976-17.192573 0-0.29473-0.098243-0.58946-0.098244-0.88419l119.758551-119.758551 92.250435 92.250434 242.75913-242.75913 241.187237 241.187238 122.70585-122.705849 93.33111 93.33111c0 0.29473-0.098243 0.58946-0.098243 0.88419 0 7.073516 3.242028 13.361085 8.154191 17.683789V857.663782c0 36.251768-14.245275 70.342184-39.985012 95.885436z"
            fill="#666666"
            p-id="5458"
          ></path>
        </svg> -->

        <input
          type="file"
          name="file"
          id="file"
          @change="sendFile('file')"
          style="display:none"
        />
      </div>

      <!-- <quill-editor class='bubble' ref="edit"  ></quill-editor> -->
      <textarea class="text" v-model="content"></textarea>

      <div class="send" @click="send">
        <span>发送(S)</span>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import emoji from "./emoji/emoji.vue";
import { setTimeout } from "timers";
export default {
  components: { emoji },
  data() {
    return {
      name: "Nicole",
      talker: "",
      dat: [],
      content: "",
      show_emoji: false,
      emoji: {}
    };
  },
  filters: {
    fSize(val) {
      if (val == '' || val == null || val == undefined || val == NaN) {
        return '未知';
      }
      var _this = this;
      val = val / 1024;

      if (val > 1) {
        return val.toFixed(2) + " M";
      } else {
        return val * 1024 + " K";
      }
    }
  },
  methods: {
    readUTF(data) {
      /* UTF转unicode */
      if (data == "" || typeof data == "undefined")
        return "请输入十六进制unicode";
      data = data.split("\\u");
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i], 16).toString(10));
      }
      return str;
    },
    file_name(o) {
      //获取文件名
      var ret = "";
      var arr = o.split("\\");
      ret = arr[arr.length - 1];
      return ret;
    },
    is_img(o) {
      //判断文件类型
      var ret = "";
      var arr = o.split(".");
      ret = arr[arr.length - 1];
      if (ret == "jpg" || ret == "png" || ret == "gif") {
        return "IMG";
      } else if (ret == "mp4") {
        return "VIDEO";
      } else {
        return "FILE";
      }
    },
    send() {
      //发送文字消息
      var _this = this;
      var text = _this.content;

      if (text.trim() == "") {
        _this.$toast("发送内容不能为空");
        return false;
      } else {
        // text=text.replace(/<p>/g,'')
        // text=text.replace(/<\/p>/g,'')

        var item = {
          other: false,
          user: _this.talker.username,
          text: text,
          type: "TEXT"
        };
        _this.$store.dispatch("addMsg", item);
        _this.dat.push(item);
        _this.content = "";
        setTimeout(function() {
          _this.$refs.content.scrollTop = parseFloat(
            window.getComputedStyle(_this.$refs.cont).height.replace(/px/, "")
          );
        }, 20);

        var ipc = _this.$electron.ipcRenderer;
        ipc.send("insert-chat", _this.$store.state.msgs);

        var send = {
          action: "msg.send",
          username: _this.$store.state.user,
          to_username: _this.talker.username,
          msg: _this.UnicodeToUtf8(text),
          msg_type: "TEXT"
          // online:false
        };
        _this.ajax(send, function(data) {});

        _this.lastInfo();
      }
    },
    UnicodeToUtf8(data, isGetBytes) {
      if (data == "" || typeof data == "undefined") return "请输入汉字";
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += "\\u" + data.charCodeAt(i).toString(16);
      }
      return str;
    },
    send_emoji(o) {
      //发送表情
      console.log("send_emoji");
      var _this = this;
      // text=text.replace(/<p>/g,'')
      // text=text.replace(/<\/p>/g,'')

      var item = {
        other: false,
        user: _this.talker.username,
        text: o,
        type: "EMOJI"
      };
      _this.$store.dispatch("addMsg", item);
      _this.dat.push(item);
      _this.content = "";
      setTimeout(function() {
        _this.$refs.content.scrollTop = parseFloat(
          window.getComputedStyle(_this.$refs.cont).height.replace(/px/, "")
        );
      }, 20);

      var ipc = _this.$electron.ipcRenderer;
      ipc.send("insert-chat", _this.$store.state.msgs);

      var send = {
        action: "msg.send",
        username: _this.$store.state.user,
        to_username: _this.talker.username,
        msg: o,
        msg_type: "EMOJI"
        // online:false
      };
      console.log(send);
      _this.ajax(send, function(data) {});
      _this.lastInfo();
    },
    get_talker() {
      //获取当前聊天对象
      var _this = this;
      this.talker = this.$store.state.current_talker;
      var list = this.$store.state.msgs;
      var arr = [];
      _.forEach(list, o => {
        if (_this.talker.username == o.user) {
          arr.push(o);
        }
      });

      _this.dat = arr;
      setTimeout(function() {
        _this.$refs.content.scrollTop = parseFloat(
          window.getComputedStyle(_this.$refs.cont).height.replace(/px/, "")
        );
      }, 20);

      _this.content = "";
    },
    sendFile(o) {
      //发送文件 拖放发送文件
      var _this = this;
      var file = null;
      if (o !== "file") {
        file = o;
      } else {
        file = document.getElementById("file").files[0];
      }
      // console.log(file.path + "文件路径");
      // console.log(file.size)
      if(file.size > 104857600){
         _this.$toast("发送的文件不能大于100M");
         return false;
      }
      var filename = _this.file_name(file.path);
      _this.upLoad(file, function(data) {
        var send = {
          action: "msg.send",
          username: _this.$store.state.user,
          to_username: _this.talker.username,
          msg: _this.UnicodeToUtf8(filename),
          msg_type: _this.is_img(file.path),
          url: data.url,
          size: file.size
        };

        // console.log(send);

        var msg = {
          other: false,
          user: _this.talker.username,
          text: filename,
          type: _this.is_img(file.path),
          url: file.path,
          size: file.size
        };

        _this.$store.dispatch("addMsg", msg);
        _this.dat.push(msg);
        setTimeout(function() {
          _this.$refs.content.scrollTop = parseFloat(
            window.getComputedStyle(_this.$refs.cont).height.replace(/px/, "")
          );
        }, 20);
        // console.log(_this.dat);

        _this.ajax(send, function(dat) {
          // console.log(dat);
          if (dat.code == 1) {
            document.getElementById("file").value = "";
          }
        });
      });
    },
    open(o) {
      //在文件夹打开聊天文件
      this.$electron.shell.showItemInFolder(o.url);
      // console.log(o.url);
    },
    open_video(o) {
      //以默认方式打开聊天文件
      this.$electron.shell.openItem(o.url);
    }
  },
  mounted: function() {
    var _this = this;
    this.get_talker();

    var list = _this.$store.state.emoji;
    var obj = {};
    _.forEach(list, function(dat) {
      obj[dat.emoji_id] = dat.emoji_img;
    });
    _this.emoji = obj;
    // console.log(_this.emoji);

    document.onclick = function() {
      _this.show_emoji = false;
    };
  }
};
</script>
<style lang="less" scoped>
.mai {
  width: 100%;
  height: 100%;
  padding-bottom: 150px;
  position: relative;

  .name {
    position: absolute;
    left: 0;
    top: 0px;
    font-size: 20px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ccc;
    padding-left: 30px;
    background: #f5f5f5;
    z-index: 10;
  }
}

.content {
  padding-top: 60px;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #dddddd;
    display: none;
  }
  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }

  .item {
    margin-bottom: 8px;
    height: auto;
    position: relative;
    min-height: 36px;
    text-align: right;
    padding-left: 180px;
    padding-right: 78px;

    .head {
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 3px;
      top: 0px;
      right: 30px;
      user-select: none;
    }

    .text {
      display: inline-block;
      background: #2e89ef;
      padding: 8px;
      border-radius: 3px;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      color: #fff;
      word-break: break-all;
      // overflow: hidden;
      max-width: 100%;
      position: relative;

      .img {
        border: 1px solid;
      }
    }
    .text:after {
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      border-left: 6px solid #2e89ef;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      position: absolute;
      right: -5px;
      top: 13px;
      z-index: 9;
    }
  }
  .item.file {
    overflow: hidden;
    .content {
      width: 220px;
      height: 70px;
      background: white;
      // box-shadow: 0px 0px 1px 1px #dddddd;
      border: 1px solid #e0e0e0;
      float: right;
      position: relative;
      cursor: pointer;
      border-radius: 4px;
      .t1 {
        color: #111111;
        font-size: 13px;
        position: absolute;
        left: 10px;
        top: 15px;
        right: 40px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .t2 {
        color: #cccccc;
        font-size: 12px;
        position: absolute;
        left: 10px;
        top: 35px;
      }
      .i1 {
        position: absolute;
        width: 30px;
        height: 40px;
        top: 15px;
        right: 0px;
      }
    }
  }
  .item.img {
    overflow: hidden;
    .content {
      padding-top: 0px;
      width: 220px;
      height: auto;
      cursor: pointer;
      float: right;
      img {
        width: 100%;
        border-radius: 3px;
      }
    }
  }

  .other {
    padding-right: 220px;
    padding-left: 78px;
    text-align: left;

    .head {
      left: 30px;
    }

    .text {
      background: #fff;
      // box-shadow: 0px 0px 1px 1px #dddddd;
      border: 1px solid #e0e0e0;
      color: #111;
    }
    .text:after {
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      border-left: 6px solid #fff;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      // border-right: 6px solid #e0e0e0;
      position: absolute;
      transform: rotate(180deg);
      right: 0;
      left: -5px;
      top: 13px;
    }
    .text::before {
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      border-left: 6px solid #e0e0e0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      position: absolute;
      transform: rotate(180deg);
      right: 0;
      left: -6px;
      top: 13px;
    }
    .content {
      float: left !important;
    }
  }
}

.inp {
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 145px;
  border-top: 1px solid #eae9e9;
  overflow-y: scroll;
  padding-top: 30px;
  .action {
    background: white;
    // border:1px solid;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    svg {
      cursor: pointer;
      margin: 0 8px;
    }
    svg:hover {
      path {
        fill: #000000;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    color: transparent;
  }

  .send {
    width: 68px;
    height: 26px;
    border: 1px solid #eae9e9;
    position: absolute;
    bottom: 10px;
    right: 14px;
    color: #333333;
    background: #f5f5f5;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    z-index: 51;
    user-select: none;

    &:hover {
      border: none;
      background: #2e89ef;
      color: #fff;
    }
  }

  .text {
    width: 100%;
    min-height: 100%;
    display: block;
    border: none;
    padding: 10px;
    resize: none;
    &:focus {
      border: none;
      box-shadow: none;
      outline: none;
    }
  }
}

.emoji {
  height: 0px;
  position: relative;
  .div {
    position: absolute;
    z-index: 505;
    left: -120px;
    bottom: 10px;
  }
}
</style>