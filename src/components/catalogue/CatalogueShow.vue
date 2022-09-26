<template>
    <el-row>
        <el-col :span="16">
            <div style="height: 30px;background-color:#f3f3f3;margin: 6px">
                <el-breadcrumb :separator-icon="ArrowRight" style="margin: 3px 15px">
                    <el-breadcrumb-item>
                        <el-button link size="large" style="margin-top: 3px">
                            <div style="font-size: large">根目录</div>
                        </el-button>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <el-button link size="large" style="margin-top: 3px">
                            <div style="font-size: large">test</div>
                        </el-button>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-col>
        <el-col :span="1">
            <el-button :loading="false" style="margin-top: 5px" text bg type="primary">刷新</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
                <el-table :data="tableData" height="250" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import {ref} from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import {defineComponent} from "vue";
import {ArrowRight, Message} from '@element-plus/icons-vue'
import request from "@/utils/request";
import {ElNotification} from "element-plus";

export default defineComponent({
    setup() {
        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-08',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-06',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-07',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]
        return {
            tableData,
            ArrowRight
        }
    },
    methods: {
        handleLoadNowPath() {
            let nowPath = JSON.parse(localStorage.getItem("nowPath") as string);
            if (nowPath == null) {
                request({
                    url: '/catalogues/list',
                    method: 'get',
                }).then((res: any) => {
                    if (res.data.code == 20000) {

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
        }
    },
    data(){
        return{
            nowPath:JSON.parse(localStorage.getItem("nowPath") as string),
        }
    }
})
</script>

<style>
</style>
