//选择联系人并去发送消息界面
//或者在联系人上右击去发送消息

export default{
    methods:{
        sendMsg(o){      

            this.$store.dispatch('setCurrent_talker',o)
            
            var arr=this.$store.state.talk_list.slice()
            console.log(arr)
            for(var i=0;i<arr.length;i++){
                if(arr[i].username==o.username){
                    arr.splice(i,1)
                }
            }  
            arr.unshift(o)
         
            var ipc=this.$electron.ipcRenderer
            ipc.send('insert-contact',arr)
            
            this.$store.dispatch('add_talk_list',arr)

            this.$emit('send')
            
        }
    }
}