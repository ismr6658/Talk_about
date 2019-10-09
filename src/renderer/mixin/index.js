//ajax请求 文件上传下载
import md5 from 'md5'
import fs from 'fs'
import jQ from 'jquery'

var request = require('request');
export default {
    methods: {
        //ajax请求
        ajax(o, fun) {
            var _this = this

            //加入公共参数
            o.partner_id = '20190115163409927999'
            o.nonce_str = '4qftbpt4nqj7aqsf1urdqjsd6t'

            //属性名排序
            var newkey = Object.keys(o).sort();
            var newObj = {};
            var ret = ''
            for (var i = 0; i < newkey.length; i++) {
                newObj[newkey[i]] = o[newkey[i]];
            }

            //生成签名
            for (var i = 0; i < newkey.length; i++) {
                ret += '&' + newkey[i] + '=' + newObj[newkey[i]]
            }
            ret = ret.substr(1)
            ret += '&key=4qftbpt4nqj7aqsf1urdqjsd6t'
            console.log(ret + 'RET')
            ret = md5(ret).toUpperCase()
            o.sign = ret

            //生成后台标准的数据格式
            var keys = Object.keys(o).sort()
            var str = ''
            for (var i = 0; i < keys.length; i++) {
                str += '&' + keys[i] + '=' + o[keys[i]]
            }
            str = str.substr(1)
            console.log(str)

            //发送ajax
            Load.open()
            _this.$axios.post(_this.URL, str)
                .then(function (data) {
                    Load.close()

                    data = data.data
                    console.log(data)
                    if (data.code == 0) {
                        _this.$toast(data.msg)
                    }
                    if (data.code == 1) {
                        fun(data)
                    }
                })
                .catch(function (err) {
                    Load.close()
                    _this.$toast(err)
                })


        },


        //ajax文件上传
        upLoad(a, fun) {
            var _this = this
            var o = {}
            //加入公共参数
            o.partner_id = '20190115163409927999'
            o.nonce_str = '4qftbpt4nqj7aqsf1urdqjsd6t'

            //属性名排序
            var newkey = Object.keys(o).sort();
            var newObj = {};
            var ret = ''
            for (var i = 0; i < newkey.length; i++) {
                newObj[newkey[i]] = o[newkey[i]];
            }

            //生成签名
            for (var i = 0; i < newkey.length; i++) {
                ret += '&' + newkey[i] + '=' + newObj[newkey[i]]
            }
            ret = ret.substr(1)
            ret += '&key=4qftbpt4nqj7aqsf1urdqjsd6t'
            ret = md5(ret).toUpperCase()
            o.sign = ret


            // fs.fstat(a,function(err,data){
            //     console.log(data)
            // })


            o.file = a

            //生成后台标准的数据格式
            // var keys=Object.keys(o).sort()
            // var str=''
            // for(var i=0;i<keys.length;i++){
            //     str+='&'+keys[i]+'='+o[keys[i]]
            // }
            // str=str.substr(1)
            var form = new FormData()
            var keys = Object.keys(o).sort()
            for (var i = 0; i < keys.length; i++) {
                form.append(keys[i], o[keys[i]])
            }

            console.log(form.get('file'))

            //发送ajax
            Load.open()
            /*   _this.$axios.post('http://192.168.22.242:8080/im/im/api/file/upload', fileStr, {
                  headers: { 'Content-Type': 'multipart/form-data' }
              })
                  .then(function (data) {
                      Load.close()
                      data = data.data
                      console.log(data)
                      if (data.code == 0) {
                          _this.$toast(data.msg)
                      }
                      if (data.code == 1) {
                          fun(data)
                      }
                  })
                  .catch(function (err) {
                      Load.close()
                      console.log(err)
                  }) */
            jQ.ajax({
                url: 'http://144.123.27.238:28080/im/im/api/file/upload',
                type: 'post',
                processData: false,
                contentType: false,
                data: form,
                dataType: 'json',
                success: function (data) {
                    Load.close()
                    //   data = data.data
                    console.log(data)
                    if (data.code == 0) {
                        _this.$toast(data.msg)
                    }
                    if (data.code == 1) {
                        fun(data)
                    }
                },
                error: function (err) {
                    Load.close()
                    console.log(err)
                }

            })


        },

        //ajax文件下载
        downLoad(a, name, fun) {
            var user = this.$store.state.user
            // console.log(a)
            console.log('下载地址')
            // console.log(name)





            var disk = window.localStorage.getItem('disk');

            if (disk == null) {
                if (fs.existsSync('D:')) {
                    window.localStorage.setItem('disk', 'D:')
                } else if (fs.existsSync('E:')) {
                    window.localStorage.setItem('disk', 'E:')
                } else if (fs.existsSync('F:')) {
                    window.localStorage.setItem('disk', 'F:')
                }
                disk = window.localStorage.getItem('disk');
            }


            fs.mkdir(disk + '\\IM', function (err) {
                fs.mkdir(disk + '\\IM\\' + user, function (err) {
                    var src = 'http://144.123.27.238:28080/im/im/api/file/download?url=' + a

                    var path = disk + '\\IM\\' + user + '\\' + name
                    var writesteam = fs.createWriteStream(path)
                    request(src).pipe(writesteam)
                    writesteam.on('finish', function () {
                        var size = 0;
                        fs.stat(disk + '\\IM\\' + user + '\\' + name, function (err, obj) {
                            console.log(obj)
                            if (!err) {
                                size = obj.size;
                                fun(path, size)
                            }
                        })


                    })
                })
            })




        },
        lastInfo() {
            /* 设置最后一条信息 */
            var _this = this
            var ipcFind = this.$electron.ipcRenderer;
            ipcFind.send("find-contact", "find-contact");
            ipcFind.on("find-contact-ret", (event, args) => {
                var list = args.list;
                var everyMsg = _this.$store.state.msgs.slice();
                for (var i = 0; i < list.length; i++) {
                    var newStr = "";
                    var item = list[i];
                    for (var j = 0; j < everyMsg.length; j++) {
                        if (item.username == everyMsg[j].user) {
                            newStr = everyMsg[j].text;
                        }
                    }
                    console.log(newStr);
                    item["lastTalk"] = newStr;
                }
                _this.$store.dispatch("add_talk_list", list);
            });
        }
    }
}