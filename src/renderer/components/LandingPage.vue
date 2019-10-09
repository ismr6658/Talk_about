<template>
  <div class="out_shadow" :class="{ out_padding: !max }">
    <div
      id="wrapper"
      ref="holder"
      @click="
        show_set = false;
        infoDel = false;
      "
    >
      <dels v-if="infoDel"></dels>
      <div class="left">
        <img
          src="~@/assets/head.jpg"
          alt=""
          title="头像"
          @click.stop="
            show_set = false;
            infoDel = !infoDel;
          "
        />
        <div
          style="-webkit-app-region: no-drag;position:relative;height:100%;width:110px;"
        >
          <img
            src="~@/assets/sj.svg"
            class="triangle"
            :style="{ left: triLeft }"
          />
          <img
            src="~@/assets/xiaoxi2.png"
            v-show="!liao"
            class="clickPic"
            @click="
              act = 1;
              right = 1;
              triLeft = '6px';
              gong = false;
              tong = false;
              liao = true;
            "
          />
          <img src="~@/assets/liao.png" alt="" class="clickPic" v-show="liao" />
          <img
            src="~@/assets/tonxun.png"
            alt=""
            class="clickPic"
            v-show="!tong"
            style="left:43px"
            @click="
              act = 2;
              right = 0;
              triLeft = '46px';
              gong = false;
              tong = true;
              liao = false;
            "
          />
          <img
            src="~@/assets/lianxi2.png"
            alt=""
            class="clickPic"
            style="left:43px"
            v-show="tong"
          />
          <img
            src="~@/assets/gong.png"
            alt=""
            class="clickPic"
            style="left:81px"
            @click="
              act = 3;
              right = 0;
              triLeft = '84px';
              gong = true;
              tong = false;
              liao = false;
            "
            v-show="!gong"
          />
          <img
            src="~@/assets/gonggao2.png"
            alt=""
            class="clickPic"
            style="left:81px"
            v-show="gong"
          />
          <!--   <svg
            width="24"
            height="30"
            viewBox="0,0,1024,1024"
            @click="
              act = 1;
              right = 0;
              triLeft = '6px';
            "
          >
            <path
              d="M900.89 53.67H123.11A111.23 111.23 0 0 0 12 164.78v500a111.23 111.23 0 0 0 111.11 111.11h182.94L492.36 962.2a27.77 27.77 0 0 0 39.28 0l186.31-186.31h182.94A111.23 111.23 0 0 0 1012 664.78v-500A111.23 111.23 0 0 0 900.89 53.67z m55.56 611.11a55.62 55.62 0 0 1-55.56 55.56H706.44a27.76 27.76 0 0 0-19.64 8.14L512 903.28 337.2 728.47a27.76 27.76 0 0 0-19.64-8.14H123.11a55.62 55.62 0 0 1-55.56-55.56v-500a55.62 55.62 0 0 1 55.56-55.56h777.78a55.62 55.62 0 0 1 55.56 55.56z"
              p-id="5153"
              fill="#8c8c8c"
              :class="{ act: act == 1 }"
            ></path>
            <path
              d="M289.78 414.78m-55.56 0a55.56 55.56 0 1 0 111.12 0 55.56 55.56 0 1 0-111.12 0Z"
              p-id="5154"
              fill="#8c8c8c"
              :class="{ act: act == 1 }"
            ></path>
            <path
              d="M512 414.78m-55.56 0a55.56 55.56 0 1 0 111.12 0 55.56 55.56 0 1 0-111.12 0Z"
              p-id="5155"
              fill="#8c8c8c"
              :class="{ act: act == 1 }"
            ></path>
            <path
              d="M734.22 414.78m-55.56 0a55.56 55.56 0 1 0 111.12 0 55.56 55.56 0 1 0-111.12 0Z"
              p-id="5156"
              fill="#8c8c8c"
              :class="{ act: act == 1 }"
            ></path>
          </svg> 

          <svg
            viewBox="0 0 1024 1024"
            width="25"
            height="36"
            @click="
              act = 2;
              right = 0;
              triLeft = '46px';
            "
            style="padding-top: 7px;"
          >
            <path
              d="M116.948037 343.849302h115.494431c13.866822 0 25.148773-11.700483 25.148773-26.077935 0-14.381545-11.281951-26.083052-25.148773-26.083052H116.948037c-13.867846 0-25.15082 11.701506-25.15082 26.083052 0 14.377452 11.281951 26.077935 25.15082 26.077935zM116.948037 531.208481h115.494431c13.866822 0 25.148773-11.69946 25.148773-26.078959 0-6.965645-2.615571-13.514805-7.365758-18.439978-4.750187-4.925173-11.066033-7.640004-17.783015-7.640004H116.948037c-13.867846 0-25.15082 11.700483-25.15082 26.079982 0 14.379499 11.281951 26.078958 25.15082 26.078959zM257.591241 691.800016c0-6.969739-2.615571-13.520945-7.366781-18.445095-4.749164-4.926196-11.06501-7.641027-17.781992-7.641027H116.948037c-13.867846 0-25.15082 11.70253-25.15082 26.086122 0 14.377452 11.282974 26.073842 25.15082 26.073842h115.494431c13.866822 0.001023 25.148773-11.695367 25.148773-26.073842zM338.175581 718.26476l-3.39533 8.241709h56.053644l1.681292-3.171226c26.273387-49.514717 88.028892-85.744873 150.142555-88.105641h6.066159c2.289136 0 4.562922 0 6.782474 0.005117 62.145385 2.360767 123.900891 38.587853 150.178371 88.100524l1.681292 3.171226h56.056713l-3.396353-8.241709c-10.207479-24.774243-28.0171-49.005111-51.503001-70.068845-18.481933-16.575514-40.379663-31.149441-63.423495-42.22366 22.687722-14.728446 41.967834-34.592866 55.834656-57.547671 16.476253-27.269064 25.184589-58.594513 25.184589-90.589204 0-97.816816-79.580476-177.394223-177.395246-177.394223-97.820909 0-177.402409 79.579453-177.402409 177.394223 0 32.061207 8.743128 63.443961 25.285896 90.75191 13.928221 22.998807 33.288151 42.878576 56.062854 57.594743-22.958898 11.092639-44.763506 25.65224-63.158459 42.178634-23.408129 21.027919-41.160445 45.200458-51.336202 69.904093z m210.547297-386.233621c69.365834 0 125.799124 56.434314 125.799124 125.803217 0 69.365834-56.432267 125.798101-125.799124 125.798101-69.367881 0-125.803217-56.431244-125.803218-125.798101 0-69.368904 56.435337-125.803217 125.803218-125.803217z"
              fill="#8c8c8c"
              :class="{ act: act == 2 }"
              p-id="2113"
            ></path>
            <path
              d="M848.424 63.251h-599.407c-52.319 0-94.881 42.561-94.881 94.88v71.012h50.908v-60.41c0-35.955 19.006-54.962 54.966-54.962h578.356c35.955 0 54.96 19.006 54.96 54.962v672.747c0 35.96-19.003 54.968-54.96 54.968h-578.357c-35.959 0-54.966-19.006-54.966-54.968v-60.401h-50.908v69.968c0 52.32 42.562 94.883 94.881 94.883h599.408c52.319 0 94.883-42.563 94.883-94.883v-692.92c0-52.314-42.564-94.877-94.883-94.877z"
              fill="#8c8c8c"
              :class="{ act: act == 2 }"
              p-id="2114"
            ></path>
          </svg>

          <svg
            viewBox="0 0 1165 1024"
            width="27"
            height="30"
            @click="
              act = 3;
              right = 0;
              triLeft = '84px';
            "
          >
            <path
              d="M642.744 1013.924c-7.588 0-15.063-2.775-20.94-8.1L317.07 731.597h-176.23c-50.453 0-125.481-33.424-125.481-125.481V417.905c0-50.453 33.444-125.481 125.47-125.481H317L621.732 18.135c9.206-8.346 22.456-10.353 33.74-5.325a31.315 31.315 0 0 1 18.637 28.672v941.066c0 12.37-7.219 23.655-18.565 28.683a31.639 31.639 0 0 1-12.8 2.693z m-501.913-658.75c-59.73 0-62.73 52.255-62.73 62.74v188.212c0 59.658 52.264 62.74 62.73 62.74h188.21c7.783 0 15.248 2.878 20.952 8.1l261.376 235.131V111.923L350.075 347.075c-5.775 5.201-13.23 8.1-21.023 8.1H140.831zM799.58 323.8c-7.957 0-16.047-3.082-22.201-9.165-12.237-12.226-12.237-32.123 0-44.36l125.48-125.48c12.227-12.217 32.103-12.217 44.36 0 12.227 12.236 12.227 32.133 0 44.37l-125.47 125.47c-6.103 6.083-14.06 9.165-22.17 9.165zM987.8 543.375h-188.22c-17.245 0-31.366-14.039-31.366-31.365 0-17.316 14.121-31.365 31.365-31.365h188.222c17.377 0 31.365 14.06 31.365 31.365 0 17.326-13.988 31.365-31.365 31.365z m-62.74 345.068a31.582 31.582 0 0 1-22.2-9.165L777.38 753.798c-12.237-12.227-12.237-32.103 0-44.36 12.226-12.217 32.102-12.217 44.37 0l125.47 125.47c12.227 12.257 12.227 32.144 0 44.37-6.092 6.093-14.049 9.165-22.159 9.165z m0 0"
              fill="#8c8c8c"
              :class="{ act: act == 3 }"
              p-id="5977"
            ></path>
          </svg>-->
        </div>
        <img
          src="~@/assets/setting.svg"
          class="bott"
          @click.stop="
            show_set = !show_set;
            infoDel = false;
          "
        />
      </div>

      <set v-if="show_set" />

      <div class="top">
        <min-max @max="max = true" @min="max = false" />
      </div>

      <div class="mid" style="padding-top:10px">
        <!-- <div class="lef">
          <input type="text" v-model="search" placeholder="搜索" />
        </div> -->
        <contact v-show="act == 1" @up="open_dialog" ref="contact" />

        <people
          v-show="act == 2"
          @up="show_msg"
          @send="open_dialog"
          ref="people"
        />
      </div>

      <div class="right">
        <chat ref="chat" v-show="right == 1" />
        <msg v-show="right == 2" ref="msg" @send="open_dialog" />
      </div>
      <notice v-show="act == 3"></notice>
    </div>
  </div>
</template>

<script>
import minMax from "@/components/minMax/minMax"; //最大最小化窗口
import set from "@/components/set/set";
import contact from "@/components/contact"; //对话列表
import chat from "@/components/chat"; //对话框
import fs from "fs";
import msg from "@/components/msg"; //联系人信息
import people from "@/components/people"; //联系人列表
import notice from "@/components/notice"; //联系人列表
import dels from "@/components/LandingPage/info"; //本人头像信息
import { setTimeout } from "timers";

export default {
  components: {
    minMax,
    set,
    contact,
    chat,
    people,
    msg,
    notice,
    dels
  },
  data: function() {
    return {
      text: "",
      content: "",
      show_set: false,
      act: 1, //1显示消息列表；2显示联系人列表
      right: 0, //0都不显示；1显示聊天窗口；2显示联系人信息
      type: 1,
      search: "",
      max: false, //窗口是否是最大化状态
      emoji: [],
      triLeft: "6px",
      infoDel: false,
      liao: true,
      tong: false,
      gong: false
    };
  },
  methods: {
    show_msg: function() {
      //打开联系人信息窗口
      this.right = 2;
      this.$refs.msg.show();
    },
    open_dialog() {
      //打开发送消息窗口
      var _this = this;
      _this.triLeft = "6px";
      _this.right = 1;
      _this.act = 1;
      _this.liao = true;
      _this.tong = false;
      _this.$refs.chat.get_talker();
      _this.$refs.contact.set_act();
      _this.$refs.contact.update_list();

      // console.log('open_dialog')
    },
    readUTF(data) {
      if (data == "" || typeof data == "undefined")
        return "请输入十六进制unicode";
      data = data.split("\\u");
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i], 16).toString(10));
      }
      return str;
    }
  },
  created: function() {
    var _this = this;
    //加载表情
    var ipc_emoji = _this.$electron.ipcRenderer;
    ipc_emoji.send("get_emoji");
    ipc_emoji.on("get_emoji", (events, arg) => {
      console.log("arg");
      console.log(arg);
      _this.$store.dispatch("set_emoji", arg);
    });

    var send = {
      action: "emoji.initEmoji"
    };
    _this.ajax(send, function(data) {
      console.log(data);
      console.log("______EMOJI_______");
      _this.$store.dispatch("set_emoji", data.data.emoji);
      ipc_emoji.send("set_emoji", data.data.emoji);
    });
  },
  mounted: function() {
    var _this = this;

    //拖放 发送文件
    var holder = this.$refs.holder;
    holder.ondragover = function() {
      return false;
    };
    holder.ondragleave = holder.ondragend = function() {
      return false;
    };
    holder.ondrop = function(e) {
      e.preventDefault();
      var file = e.dataTransfer.files[0];
      if (_this.right == 1) {
        _this.$refs.chat.sendFile(file);
      }
      // _this.$refs.chat.append(file.path)
      // fs.readFile(file.path,'utf8',function(err,data){
      //   _this.$refs.chat.append(data)
      // })
      // _this.$electron.shell.openItem(file.path)

      // _this.$electron.shell.beep()
      return false;
    };

    //从主进程获取登录信息
    // var login=_this.$electron.remote.getGlobal('login')
    var ipc = _this.$electron.ipcRenderer;
    ipc.send("get-login", "login");
    ipc.on("get-login", (event, args) => {
      this.$store.dispatch("setUser", args.username);
      this.$store.dispatch("setToken", args.token);
      this.$store.dispatch("setMap", args.map);
      // console.log(this.$store.state.map);
      // console.log("map");

      //设置窗口名称
      this.$electron.remote.getCurrentWindow().setTitle(args.username);
    });

    //获取本地消息列表
    var ipc2 = _this.$electron.ipcRenderer;
    ipc2.send("find-chat", "find-chat");
    ipc2.on("find-chat", (event, args) => {
      console.log("聊天列表");
      console.log(args);
      _this.$store.dispatch("setMsg", args);
    });

    /* 监听托盘点击事件 */
    var bing = _this.$electron.ipcRenderer;
    bing.on("openWin", (event, args) => {
      console.log("谁发的消息？");
      console.log(args);
      var _this = this;
      this.$store.dispatch("setCurrent_talker", args);

      var arr = this.$store.state.talk_list.slice();
      console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].username == args.username) {
          arr.splice(i, 1);
        }
      }
      arr.unshift(args);

      var ipc = this.$electron.ipcRenderer;
      ipc.send("insert-contact", arr);

      this.$store.dispatch("add_talk_list", arr);

      _this.open_dialog();
    });

    //从系统托盘退出程序时，退出登录
    _this.$electron.ipcRenderer.on("login_out", function(event, args) {
      var send = {
        action: "user.logout",
        username: _this.$store.state.user
      };
      _this.ajax(send, function(data) {});
    });

    //最大化 不最大化监听
    _this.$electron.ipcRenderer.on("maximize", (event, args) => {
      _this.max = true;
    });
    _this.$electron.ipcRenderer.on("unmaximize", (event, args) => {
      _this.max = false;
    });

    //进程中的websocket

    var tio = {};
    tio.ws = {};

    /**
     * @param {*} ws_protocol wss or ws
     * @param {*} ip
     * @param {*} port
     * @param {*} paramStr 加在ws url后面的请求参数，形如：name=张三&id=12
     * @param {*} param 作为tio.ws对象的参数，由业务自己使用，框架不使用
     * @param {*} handler
     * @param {*} heartbeatTimeout 心跳时间 单位：毫秒
     * @param {*} reconnInterval 重连间隔时间 单位：毫秒
     * @param {*} binaryType 'blob' or 'arraybuffer';//arraybuffer是字节
     */
    tio.ws = function(
      ws_protocol,
      ip,
      port,
      paramStr,
      param,
      handler,
      heartbeatTimeout,
      reconnInterval,
      binaryType
    ) {
      this.ip = ip;
      this.port = port;
      this.url = ws_protocol + "://" + ip + ":" + port;
      this.binaryType = binaryType || "arraybuffer";

      if (paramStr) {
        this.url += "?" + paramStr;
        this.reconnUrl = this.url + "&";
      } else {
        this.reconnUrl = this.url + "?";
      }
      this.reconnUrl += "tiows_reconnect=true";
      this.param = param;

      this.handler = handler;
      this.heartbeatTimeout = heartbeatTimeout;
      this.reconnInterval = reconnInterval;

      this.lastInteractionTime = function() {
        if (arguments.length == 1) {
          this.lastInteractionTimeValue = arguments[0];
        }
        return this.lastInteractionTimeValue;
      };

      this.heartbeatSendInterval = heartbeatTimeout / 2;

      this.connect = function(isReconnect) {
        var _url = this.url;
        if (isReconnect) {
          _url = this.reconnUrl;
        }
        var ws = new WebSocket(_url);
        this.ws = ws;

        ws.binaryType = this.binaryType; // 'arraybuffer'; // 'blob' or 'arraybuffer';//arraybuffer是字节
        var self = this;
        ws.onopen = function(event) {
          self.handler.onopen.call(self.handler, event, ws);
          self.lastInteractionTime(new Date().getTime());

          self.pingIntervalId = setInterval(function() {
            self.ping(self);
          }, self.heartbeatSendInterval);
        };
        ws.onmessage = function(event) {
          self.handler.onmessage.call(self.handler, event, ws);
          self.lastInteractionTime(new Date().getTime());
        };
        ws.onclose = function(event) {
          clearInterval(self.pingIntervalId); // clear send heartbeat task

          try {
            self.handler.onclose.call(self.handler, event, ws);
          } catch (error) {}

          self.reconn(event);
        };
        ws.onerror = function(event) {
          self.handler.onerror.call(self.handler, event, ws);
        };

        return ws;
      };

      this.reconn = function(event) {
        var self = this;
        setTimeout(function() {
          var ws = self.connect(true);
          self.ws = ws;
        }, self.reconnInterval);
      };

      this.ping = function() {
        var iv = new Date().getTime() - this.lastInteractionTime(); // 已经多久没发消息了
        // 单位：秒
        if (this.heartbeatSendInterval + iv >= this.heartbeatTimeout) {
          this.handler.ping(this.ws);
        }
      };

      this.send = function(data) {
        this.ws.send(data);
      };
    };
    // *************************************************************************

    var DemoHandler = function() {
      this.onopen = function(event, ws) {
        // ws.send('hello 连上了哦')
        console.log("connected");
        var msg = {
          action: "user.bind",
          token: _this.$store.state.token,
          serial_id: "1234"
        };
        ws.send(JSON.stringify(msg));
      };

      /**
       * 收到服务器发来的消息
       * @param {*} event
       * @param {*} ws
       */
      this.onmessage = function(event, ws) {
        var data = event.data;
        data = JSON.parse(data);

        console.log(
          "********************服务器发过来的消息*******************"
        );
        console.log(data);

        if (data.length == 0) {
        } else if (data[0].action == "msg.receive") {
          _this.$electron.shell.beep();

          var from_user = {
            username: data[0].from_username,
            nickname: data[0].from_nickname
          };
          var ipcMsg = _this.$electron.ipcRenderer;
          ipcMsg.send("newMsg", from_user);
          var foo = true;
          var arr = _this.$store.state.talk_list;
          _.forEach(data, function(data_one) {
            var user = {
              username: data_one.from_username,
              nickname: data_one.from_nickname
            };
            var boo = _.some(arr, function(o) {
              return o.username == user.username;
            });
            if (!boo) {
              console.log("================get two msg");
              arr.unshift(user);
              var ipc5 = _this.$electron.ipcRenderer;
              ipc5.send("insert-contact", arr);
              _this.$store.dispatch("add_talk_list", arr);
              _this.$refs.contact.update_list();
            }

            var src = "";
            if (data_one.type !== "TEXT" && data_one.type !== "EMOJI") {
              console.log(data_one);
              _this.downLoad(data_one.url, data_one.msg, function(path, dir) {
                src = path;
                var msg = {
                  other: true,
                  text: data_one.msg,
                  user: data_one.from_username,
                  type: data_one.type,
                  size: dir,
                  url: src
                };
                _this.$store.dispatch("addMsg", msg);

                var ipc3 = _this.$electron.ipcRenderer;
                ipc3.send("insert-chat", _this.$store.state.msgs);
                _this.$refs.chat.get_talker();
              });
            } else {
              if (data_one.type == "TEXT") {
                var msg = {
                  other: true,
                  text: _this.readUTF(data_one.msg),
                  user: data_one.from_username,
                  type: data_one.type,
                  size: data_one.size,
                  url: src
                };
                _this.$store.dispatch("addMsg", msg);
              } else if (data_one.type == "EMOJI") {
                var msg = {
                  other: true,
                  text: data_one.msg,
                  user: data_one.from_username,
                  type: data_one.type,
                  size: data_one.size,
                  url: src
                };
                _this.$store.dispatch("addMsg", msg);
              }
            }
          });
          // console.log(_this.$refs.chat);

          _this.$refs.chat.get_talker();

          var ipc3 = _this.$electron.ipcRenderer;
          ipc3.send("insert-chat", _this.$store.state.msgs);
        }
      };

      //关闭时退出登录
      this.onclose = function(e, ws) {
        // error(e, ws)
        console.log("close");
        _this.alert.alert("已离线，请重新登录").then(function(o) {
          //  var send={
          //       action:'user.logout',
          //       username:_this.$store.state.user
          //   }
          //   _this.ajax(send,function(data){
          //   })
          var ipc = _this.$electron.ipcRenderer;
          ipc.send("relogin");
        });
      };

      this.onerror = function(e, ws) {
        // error(e, ws)
        console.log(ws);
      };

      /**
       * 发送心跳，本框架会自动定时调用该方法，请在该方法中发送心跳
       * @param {*} ws
       */
      this.ping = function(ws) {
        // log("发心跳了")
        ws.send("msg.heartbeat");
        // console.log('ping')
      };
    };

    var ws_protocol = "ws"; // ws 或 wss
    var ip = "144.123.27.238";
    //192.168.22.242   144.123.27.238
    var port = 9326;

    var heartbeatTimeout = 5000; // 心跳超时时间，单位：毫秒
    var reconnInterval = 1000; // 重连间隔时间，单位：毫秒

    var binaryType = "blob"; // 'blob' or 'arraybuffer';//arraybuffer是字节
    var handler = new DemoHandler();

    var tiows;

    function initWs() {
      // var queryString = _this.$store.state.token;
      var queryString = "";
      var param = {
        // token:_this.$store.state.token
      };
      tiows = new tio.ws(
        ws_protocol,
        ip,
        port,
        queryString,
        param,
        handler,
        heartbeatTimeout,
        reconnInterval,
        binaryType
      );
      tiows.connect();
    }

    initWs();
  }
};
</script>

<style scoped lang='less'>
.out_shadow {
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 800px;
  overflow: hidden;
}
.out_padding {
  padding: 6px;

  #wrapper {
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  }
}

#wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
}

.left {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 100px;
  background: #2e89ef;
  display: flex;
  color: white;
  align-items: center;
  z-index: 9;
  height: 60px;
  justify-content: space-between;
  cursor: pointer;
  -webkit-app-region: drag;
  padding-left: 20px;
  user-select: none;
  span {
    line-height: 40px;
  }

  img {
    width: 34px;
    height: 34px;
    border-radius: 4px;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
  .triangle {
    position: absolute;
    bottom: -6px;
    width: 20px;
    height: auto;
  }

  .bott {
    width: 14px;
    height: auto;
    position: relative;
    top: -13px;
    right: 10px;
    -webkit-app-region: no-drag;
    border-radius: 0;
    cursor: pointer;
    &:hover {
      background: rgba(255, 0, 0, 0.74);
    }
  }

  svg {
    -webkit-app-region: no-drag;
    margin: 0 5px;
    cursor: pointer;
  }
}

.top {
  position: absolute;
  left: 0;
  right: 0px;
  top: 0px;
  height: 60px;
  background: #f5f5f5;
  // -webkit-app-region: drag;
  user-select: none;
  background: #2e89ef;
}

.mid {
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0px;
  width: 250px;
  background: #e4e4e5;
  .lef {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 250px;
    height: 50px;
    background: #eeebe8;

    input {
      -webkit-app-region: no-drag;
      background: #dcd9d8;
      position: absolute;
      left: 12px;
      bottom: 12px;
      border-radius: 4px;
      width: 180px;
      height: 24px;
      border: none;
      padding: 0 10px;

      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}

.right {
  position: absolute;
  left: 250px;
  right: 0px;
  top: 60px;
  bottom: 0px;
}

.edit {
  border: 1px solid;
}

path.act {
  fill: #fff;
}
.clickPic {
  display: block;
  width: 26px !important;
  height: 28px !important;
  position: absolute;
  top: 14px;
  left: 2px;
}
</style>