<template>
    <div class="layout-container-demo">
        <el-container>
            <el-aside width="200px" style="background-color:#bfc8d0" v-if="asideVisible">
                <el-scrollbar>
                    <el-menu :default-openeds="['1']">
                        <el-menu-item index="1" @click="nowIndex=1">
                            <template #title>
                                <el-icon><Position /></el-icon>科协简介
                            </template>
                        </el-menu-item>
                        <el-menu-item index="2" @click="nowIndex=2">
                            <template #title>
                                <el-icon><Notebook /></el-icon>博客文章
                            </template>
                        </el-menu-item>
                        <el-menu-item index="3" @click="nowIndex=3"  v-if="userInfo.Permission<2">
                            <template #title>
                                <el-icon><Avatar /></el-icon>管理员教程
                            </template>
                        </el-menu-item>
                        
                        <el-menu-item index="4" @click="nowIndex=4" v-if="userInfo.Permission<2">
                            <template #title>
                                <el-icon><FolderOpened /></el-icon>编辑目录
                            </template>
                        </el-menu-item>
                        <el-menu-item index="5" @click="nowIndex=5" v-if="userInfo.Permission<3">
                            <template #title>
                                <el-icon><Document /></el-icon>发布文章
                            </template>
                        </el-menu-item>
                        <el-menu-item index="6" @click="nowIndex=6" v-if="userInfo.Permission<3">
                            <template #title>
                                <el-icon><DataLine /></el-icon>草稿箱
                            </template>
                        </el-menu-item>
                        <el-menu-item index="7" @click="nowIndex=7" v-if="userInfo.Permission<3">
                            <template #title>
                                <el-icon><Mug /></el-icon>回收站
                            </template>
                        </el-menu-item>
                        

                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header style="background-color:#98a5b2;">
                    <el-row>
                        <el-col :span="1">
                            <el-button type="text" @click="changeAside" style="margin: 10px;">
                                <el-icon v-if="asideVisible" :size="30" color="#000000"><Fold /></el-icon>
                                <el-icon v-else :size="30" color="#000000"><Expand /></el-icon>
                            </el-button>
                        </el-col>
                        <el-col :span="17" v-if="userInfo.Permission==5"></el-col>
                        <el-col :span="6" v-if="userInfo.Permission==5">
                            <Login />
                            <Register />
                        </el-col>
                        <el-col :span="16" v-if="userInfo.Permission!=5"></el-col>
                        <el-col :span="6" v-if="userInfo.Permission!=5">
                            <el-dropdown>
                                <span style="font-size:medium;margin: 10px;line-height: 50px;">
                                    欢迎，{{userInfo.NickName+"\n"}}
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-avatar :size="50" :src=userInfo.Avatar style="margin-top:3px">
                                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
                            </el-avatar>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main>
                    <el-scrollbar style="background-color:#d4dadd;">
                        <div style="background-color:#ffffff;margin: 20px;">
                            <el-row>
                                <el-col :span="1">
                                    
                                </el-col>
                                <el-col :span="21">
                                    <Edit v-if="nowIndex==5" />
                                </el-col>
                            </el-row>
                        </div>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script  lang="ts" >
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import Edit from "../components/articles/Edit.vue"
import Login from "../components/Authority/Login.vue"
import Register from "../components/Authority/Register.vue"
import request from "../utils/request";
import { userInfo } from 'os';

//暂时无法从函数中改变值
// function altIndex(index: number) {
//     nowIndex=index;
//     console.log(nowIndex);
// };

export default{
    components:{
        Register,
        Edit,
        Login,
    },
    mounted(){
        this.checkLogin();
    },
    setup(){
        return {
            nowIndex:0,
            // altIndex,
            // checkIndex,
        };
    },
    data(){
        return {
            asideVisible:true,
            nowIndex:5,
            userInfo:{
                Avatar:"",
                Email:    "",
                StudentID:"",
                Signature:"",
                RealName: "",
                NickName: "",
                Phone:    "",
                Sex: "",     
                Permission:5,
            },
        };
    },
    methods:{
        loginOut(){
            localStorage.removeItem("jwtToken");
            this.userInfo.Permission = 5;
            this.userInfo.Avatar="";
            this.userInfo.NickName="";
            //TODO 后端接口
        },
        checkLogin(){
            var jwtToken = JSON.parse(String(localStorage.getItem('jwtToken')));
            if (jwtToken == null) {
                ElMessage({
                    message: "您未登录，登录或注册后可享受更多功能！",
                    type: 'warning',
                });
                this.userInfo.Permission = 5;
            }else{//获取用户基本信息
                request({
                    url: '/user/info',
                    method: 'get',
                    headers: {
                        'Authorization': jwtToken
                    },
                }).then((res: any) => {
                    if (res.data.code == 20000) {
                        this.userInfo.Permission = Number(res.data.data.permission);
                        this.userInfo.Avatar=res.data.data.avatar
                        this.userInfo.NickName=res.data.data.nickName
                    } else {
                        ElNotification({
                            title: 'Error',
                            message: res.data.msg,
                            type: 'error',
                        })
                        Message.error(res.data.msg);
                    }
                }).catch((err: any) => {
                    ElNotification({
                        title: 'Error',
                        message: err.message,
                        type: 'error',
                    })
                    Message.error(err);
                });
            }
        },
        changeAside(){
            this.asideVisible=!this.asideVisible;
            // console.log(this.asideVisible);
        },
    }
};

</script>

<style scoped>
.layout-container-demo .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
    border-right: none;
}
.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>
