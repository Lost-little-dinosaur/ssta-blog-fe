<template>
    <div class="layout-container-demo">
        <el-container>
            <el-aside width="200px" style="background-color:#bfc8d0">
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
                        <el-menu-item index="3" @click="nowIndex=3">
                            <template #title>
                                <el-icon><Avatar /></el-icon>管理员教程
                            </template>
                        </el-menu-item>
                        
                        <el-menu-item index="4" @click="nowIndex=4">
                            <template #title>
                                <el-icon><FolderOpened /></el-icon>编辑目录
                            </template>
                        </el-menu-item>
                        <el-menu-item index="5" @click="nowIndex=5">
                            <template #title>
                                <el-icon><Document /></el-icon>发布文章
                            </template>
                        </el-menu-item>
                        <el-menu-item index="6" @click="nowIndex=6">
                            <template #title>
                                <el-icon><DataLine /></el-icon>草稿箱
                            </template>
                        </el-menu-item>
                        <el-menu-item index="7" @click="nowIndex=7">
                            <template #title>
                                <el-icon><Mug /></el-icon>回收站
                            </template>
                        </el-menu-item>
                        

                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header style="background-color:#98a5b2;">
                    Header
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

<script lang="ts" >
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue';
import Edit from "../components/articles/Edit.vue"

let nowIndex=0;
const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))//支持从TS传数据到Vue
//暂时无法从函数中改变值
// function altIndex(index: number) {
//     nowIndex=index;
//     console.log(nowIndex);
// };

export default{
    components:{
        Edit,
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
            nowIndex:5
        };
    },
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
