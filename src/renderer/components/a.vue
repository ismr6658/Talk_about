<template>
    <div class='main'>
        <div class="top">

        </div>
        <min-max/>
        <img src="~@/assets/head.jpg" alt="">
    </div>
</template>

<script>

import minMax from '@/components/minMax/minMax'

export default {
    components:{
        minMax
    },
    mounted:function(){
        this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
    }
}
</script>
<style lang="less" scoped>
    .main{
        width:100%;
        height:100%;
        overflow:hidden;
        display:flex;
        align-items: center;
        justify-content: center;
        padding-top:40px;
    }
    .top{
        position:absolute;
        left:0px;
        right:0px;
        top:0px;
        height:40px;
        background:#eeebe8;
        -webkit-app-region:drag;
    }
    img{
        width:100%;
    }
</style>
