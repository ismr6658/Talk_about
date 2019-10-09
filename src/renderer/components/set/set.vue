<template>
    <div class='mai'> 
        <!-- <div class="item" @click='get' ><span>获取桌面资源</span> </div>
        <div class="item" @click='open' ><span>打开本地文件夹</span> </div>
        <div class="item" @click='clear_vuex' ><span>清除vuex</span> </div> -->
        <div class="item" @click='show_set' ><span>设置</span> </div>
        <!-- <div class="item" @click='clear' ><span>清除数据库</span> </div> -->
        <div class="item" @click='help' ><span>帮助</span> </div>
        <!-- <div class="item" @click='print' ><span>打印数据库</span> </div> -->
        <div class="item" @click='login_out' > <span>退出</span> </div>
    </div>
</template>
<script>
export default {
    props:[
        'show'
    ],
    methods:{
        show_set:function(){
           
            this.$win.openWin({
                width:550,
                height:470,
                windowConfig:{
                    router:'/set',
                    name:'set'
                }
            })
        },
        clear(){
            console.log('a')
            var ipc=this.$electron.ipcRenderer
            ipc.send('clear-all-data','all')
        },
        clear_vuex(){

        },
        print(){
            var ipc=this.$electron.ipcRenderer
            ipc.send('print-database','all')
        },
        open(){
            this.$electron.shell.showItemInFolder('D:\\vue\\log.png')
            // this.$electron.shell.openExternal('http://www.baidu.com')
        },
        get(){
            var cap=this.$electron.desktopCapturer
            cap.getSources({type:['window','screen']},(err,data)=>{
                console.log(err)
                console.log(data)
            })
        },
        help(){
            alert('请联系开发人员')
        },
        login_out(){
            var _this=this
            var send={
                action:'user.logout',
                username:_this.$store.state.user
            }

            _this.ajax(send,function(data){
                
            })

            var ipc=_this.$electron.ipcRenderer
            ipc.send('relogin')

        }
    }
}
</script>
<style lang="less" scoped>
    .mai{
        position:absolute;
        right:60px;
        top:65px;
        width:134px;
        z-index:20;
        .item{
            width:100%;
            height:36px;
            background:#2e89ef;
            color:#fff;
            display: flex;
            align-items: center;
            padding-left:30px;
            font-size:14px;
            cursor:pointer;
            &:hover{
                background:#4D9CF4;
            }
        }

    }
</style>
