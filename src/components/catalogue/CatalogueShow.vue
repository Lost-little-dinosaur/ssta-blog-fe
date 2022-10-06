<template>
    <el-row>
        <el-col :span="16">
            <div style="height: 30px;background-color:#f3f3f3;margin: 6px">
                <el-breadcrumb :separator-icon="ArrowRight" style="margin: 3px 15px">
                    <el-breadcrumb-item>
                        <el-button link size="large" style="margin-top: 3px" @click="jumpToCatalogue('')">
                            <div style="font-size: large">根目录</div>
                        </el-button>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-for="val in nowPath">
                        <el-button link size="large" style="margin-top: 3px" @click="jumpToCatalogue(val.catalogueID)">
                            <div style="font-size: large">{{ val.catalogueName }}</div>
                        </el-button>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-col>
        <el-col :span="1">
            <el-button :loading="false" style="margin-top: 5px" text bg type="primary"
                       @click="handleLoadNowPath('刷新')">刷新
            </el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%;height: 700px"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"/>
                <el-table-column label="名称" width="300">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                            <template #default>
                                <div>{{ scope.row.catalogueID }}</div>
                            </template>
                            <template #reference>
                                <div >
                                    <el-icon v-if="scope.row.elementType===0" style="margin-right: 10px;margin-top: 5px;" :size="20"><Folder/></el-icon>
                                    <el-icon v-if="scope.row.elementType===1" style="margin-right: 10px;margin-top: 5px;" :size="20"><Tickets /></el-icon>
                                    {{ scope.row.catalogueName }}
                                </div>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="创建者" width="200">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                            <template #default>
                                <div>{{ scope.row.description }}</div>
                            </template>
                            <template #reference>
                                {{ scope.row.createBy }}
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="最后修改者" width="200">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                            <template #default>
                                <div>{{ scope.row.description }}</div>
                            </template>
                            <template #reference>
                                {{ scope.row.lastModifier }}
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="最后修改时间" width="200">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                            <template #default>
                                <div>{{ scope.row.description }}</div>
                            </template>
                            <template #reference>
                                {{ scope.row.createOrUpdateAt }}
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="描述" width="500">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                            <template #default>
                                <div>{{ scope.row.description }}</div>
                            </template>
                            <template #reference>
                                {{ scope.row.description }}
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="400">
                    <template #default="scope">
                        <el-button size="small" @click="handleEnter(scope.$index, scope.row)" v-if="scope.row.elementType===0">进入</el-button>
                        <el-button size="small" type="warning" @click="handleRename(scope.$index, scope.row)">重命名
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script lang="tsx">
import type Node from 'element-plus/es/components/tree/src/model/node'
import {defineComponent, FunctionalComponent, ref, resolveDynamicComponent, unref} from "vue";
import {ArrowRight, Message} from '@element-plus/icons-vue'
import request from "@/utils/request";
import dayjs from 'dayjs'
import {
    ElButton,
    ElIcon,
    ElTag,
    ElTooltip,
    TableV2FixedDir,
    Column,
    ElCheckbox,
    ElMessage,
    ElNotification,
    CheckboxValueType, ElTable
} from 'element-plus'
import {Timer} from '@element-plus/icons-vue'

interface Catalogue {
    catalogueName: string,
    description: string,
    catalogueID: string,
    createBy: string,
    lastModifier: string,
    createOrUpdateAt: string,
    articleArr: string,
    sonArr: string,
}

interface eachPath {
    catalogueName: string,
    catalogueID: string,
}

export default defineComponent({
    components: {
        ElButton,
        ElIcon,
        ElTag,
        ElTooltip,
        ElCheckbox,
        Timer,
        ArrowRight,
        Message,
        dayjs
    },
    setup() {


        const multipleTableRef = ref<InstanceType<typeof ElTable>>()
        const multipleSelection = ref<Catalogue[]>([])
        const toggleSelection = (rows?: Catalogue[]) => {
            if (rows) {
                rows.forEach((row) => {
                    // TODO: improvement typing when refactor table
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    multipleTableRef.value!.toggleRowSelection(row, undefined)
                })
            } else {
                multipleTableRef.value!.clearSelection()
            }
        }
        const handleSelectionChange = (val: Catalogue[]) => {
            multipleSelection.value = val
        }
        const handleRename = (index: number, row: Catalogue) => {
            console.log(index, row)
        }
        const handleDelete = (index: number, row: Catalogue) => {
            console.log(index, row)
        }
        const transformPathArrToStr = (pathArr: eachPath[]) => {
            let pathStr = ''
            let pathIDStr = ''
            pathArr.forEach((item, index) => {
                if (index === 0) {
                    pathStr = item.catalogueName
                } else {
                    pathStr = pathIDStr + '/' + item.catalogueName
                }
            })
            pathArr.forEach((item, index) => {
                if (index === 0) {
                    pathIDStr = item.catalogueName
                } else {
                    pathIDStr = pathIDStr + '/' + item.catalogueName
                }
            })
            return pathStr + "//" + pathIDStr
        }
        const transformPathStrToArr = (pathStr: string) => {
            let pathArr: eachPath[] = []
            let pathIDArr: string[] = []
            let pathArrStr = pathStr.split("//")[0]
            let pathIDArrStr = pathStr.split("//")[1]
            pathArrStr.split("/").forEach((item) => {
                pathArr.push({
                    catalogueName: item,
                    catalogueID: ''
                })
            })
            pathIDArrStr.split("/").forEach((item) => {
                pathIDArr.push(item)
            })
            pathArr.forEach((item, index) => {
                item.catalogueID = pathIDArr[index]
            })
            return pathArr
        }
        return {
            ArrowRight,
            Message,
            handleDelete,
            multipleTableRef,
            multipleSelection,
            toggleSelection,
            handleSelectionChange,
            handleRename,
            transformPathArrToStr,
            transformPathStrToArr,
        }
    },
    methods: {
        handleEnter(index: number, row: Catalogue) {
            if (this.nowPath == null) {
                this.nowPath = [{
                    catalogueName: row.catalogueName,
                    catalogueID: row.catalogueID
                }]
            } else if (this.nowPath[0].catalogueID === "" && this.nowPath[0].catalogueName === "") {
                this.nowPath[0].catalogueID = row.catalogueID
                this.nowPath[0].catalogueName = row.catalogueName
            } else {
                this.nowPath.push({
                    catalogueName: row.catalogueName,
                    catalogueID: row.catalogueID
                })
            }
            localStorage.setItem('nowPath', JSON.stringify(this.nowPath));
            request({
                url: '/catalogues/list?catalogueID=' + row.catalogueID,
                method: 'get',
            }).then((res: any) => {
                if (res.data.code == 20000) {
                    this.tableData = []
                    if (res.data.data.sonArr) {
                        this.tableData = res.data.data.sonArr
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].elementType = 0
                        }
                    }
                    if (res.data.data.articleArr) {
                        res.data.data.articleArr.forEach((item: any) => {
                            this.tableData.push(
                                {
                                    "catalogueName": item.title,
                                    "description": item.description,
                                    "catalogueID": item.id,
                                    "createBy": item.createBy,
                                    "lastModifier": item.lastModifier,
                                    "createOrUpdateAt": item.createOrUpdateAt,
                                    "articleArr": null,
                                    "sonArr": null,
                                    'elementType': 1,
                                }
                            )
                        })
                    }
                    console.log(res.data)
                    console.log(this.tableData)
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
        },
        jumpToCatalogue(catalogueID: string) {
            let i = this.nowPath.length - 1;

            if (catalogueID === "") {
                localStorage.setItem('nowPath', JSON.stringify([{catalogueName: "", catalogueID: ""}]));
                this.nowPath = [{catalogueName: "", catalogueID: ""}];
            }else if(catalogueID===this.nowPath[this.nowPath.length-1].catalogueID){
                return
            } else {
                while (i >= 0) {
                    if (this.nowPath[i].catalogueID === catalogueID) {
                        localStorage.setItem('nowPath', JSON.stringify(this.nowPath));
                        break;
                    }
                    this.nowPath.splice(i, 1);
                    i--;
                }
            }
            request({
                url: '/catalogues/list?catalogueID=' + catalogueID,
                method: 'get',
            }).then((res: any) => {
                if (res.data.code == 20000) {
                    this.tableData = []
                    if (res.data.data.sonArr) {
                        this.tableData = res.data.data.sonArr
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].elementType = 0
                        }
                    }
                    if (res.data.data.articleArr) {
                        res.data.data.articleArr.forEach((item: any) => {
                            this.tableData.push(
                                {
                                    "catalogueName": item.title,
                                    "description": item.description,
                                    "catalogueID": item.id,
                                    "createBy": item.createBy,
                                    "lastModifier": item.lastModifier,
                                    "createOrUpdateAt": item.createOrUpdateAt,
                                    "articleArr": null,
                                    "sonArr": null,
                                    'elementType': 1,
                                }
                            )
                        })
                    }
                    console.log(res.data)
                    console.log(this.tableData)
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
        },
        handleLoadNowPath(msg: string) {
            let nowPath = JSON.parse(localStorage.getItem("nowPath") as string);
            let nowPathStr = "";
            if (nowPath) {
                nowPathStr = nowPath[nowPath.length - 1].catalogueID;
            }
            console.log(nowPathStr);
            console.log(nowPath)
            request({
                url: '/catalogues/list?catalogueID=' + nowPathStr,
                method: 'get',
            }).then((res: any) => {
                if (res.data.code == 20000) {
                    this.tableData = []
                    if (res.data.data.sonArr) {
                        this.tableData = res.data.data.sonArr
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].elementType = 0
                        }
                    }
                    if (res.data.data.articleArr) {
                        res.data.data.articleArr.forEach((item: any) => {
                            this.tableData.push(
                                {
                                    "catalogueName": item.title,
                                    "description": item.description,
                                    "catalogueID": item.id,
                                    "createBy": item.createBy,
                                    "lastModifier": item.lastModifier,
                                    "createOrUpdateAt": item.createOrUpdateAt,
                                    "articleArr": null,
                                    "sonArr": null,
                                    'elementType': 1,
                                }
                            )
                        })
                    }
                    ElMessage({
                        message: msg + '数据成功',
                        type: 'success',
                    })
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
    data() {
        return {
            nowPath: JSON.parse(localStorage.getItem("nowPath") as string),
            tableData: [{
                "catalogueName": "您网络未连接成功或者服务器出现问题",
                "description": "您网络未连接成功或者服务器出现问题",
                "catalogueID": "您网络未连接成功或者服务器出现问题",
                "createBy": "您网络未连接成功或者服务器出现问题",
                "lastModifier": "您网络未连接成功或者服务器出现问题",
                "createOrUpdateAt": "您网络未连接成功或者服务器出现问题",
                "articleArr": null,
                "sonArr": null,
                'elementType': 0,
            }]
        }
    },
    mounted() {
        this.handleLoadNowPath("获取");
    },
})
</script>

<style>
</style>
