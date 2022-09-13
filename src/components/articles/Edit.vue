<template>
    <el-form :model="articleForm">
        <el-form-item>
            <el-row style="height:80px"></el-row>
            <el-row class="demo-autocomplete text-center" style="width: 100%;">

                <el-col :span="1" style="margin:0%">
                    标题
                </el-col>
                <el-col :span="6">
                    <el-input
                        v-model="articleForm.title"
                        size="large"
                        placeholder="请输入标题"
                        clearable
                    />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row style="height:80px"></el-row>
            <el-row class="demo-autocomplete text-center" style="width: 100%;">

                <el-col :span="1" style="margin:0%">
                    位置
                </el-col>
                <el-col :span="6">
                    <el-input
                        v-model="articleForm.location"
                        size="large"
                        placeholder="请到对应目录下复制目录ID"
                        clearable
                    />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row style="height:80px"></el-row>
            <el-row class="demo-autocomplete text-center" style="width: 100%;">

                <el-col :span="1" style="margin:0%">
                    描述
                </el-col>
                <el-col :span="6">
                    <el-input
                        v-model="articleForm.description"
                        size="large"
                        placeholder="请输入文章描述"
                        clearable
                    />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row style="height:80px"></el-row>
            <el-row class="demo-autocomplete text-center" style="width: 100%;">

                <el-col :span="1" style="margin:0%">
                    封面
                </el-col>
                <el-col :span="6">
                    <el-upload action="#" list-type="picture-card"
                               :auto-upload="false"
                               :drag="true"
                               :before-upload="beforeUpload(file)"
                               :on-progress="handleUpload(file)"
                               class="upload-demo">
                        <el-icon>
                            <Plus/>
                        </el-icon>

                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                                <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <el-icon><zoom-in/></el-icon>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleDownload(file)"
                            >
                                <el-icon><Download/></el-icon>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <el-icon><Delete/></el-icon>
                            </span>
                            </span>
                            </div>
                        </template>
                    </el-upload>

                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="articleForm.cover" alt="Preview Image"/>
                    </el-dialog>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
            <v-md-editor v-model="articleForm.content" height="400px"></v-md-editor>
        </el-form-item>
        <el-form-item>
            <el-row class="demo-autocomplete text-center" style="width: 100%;">

                <el-col :span="18" style="margin:0%">
                </el-col>
                <el-col :span="3">
                    <el-button type="info" size="large" @click="handleAddDraft">存入草稿箱</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" size="large" @click="handlePublishArticle">发布文章</el-button>
                </el-col>
            </el-row>
        </el-form-item>

    </el-form>
</template>

<script lang="ts">
//需要有下面这一段代码来导出组件
import {ref} from 'vue'
import {Delete, Download, Plus, UploadFilled, ZoomIn} from '@element-plus/icons-vue'
import request from "../..//utils/request";
import {defineComponent} from 'vue'

import type {UploadFile} from 'element-plus'
// //引入oss
// import OSS from "ali-oss";
export default defineComponent({
    setup() {
        return {}
    },
    data() {
        return {
            file: UploadFilled,
            disabled: false,
            dialogVisible: false,
            articleForm: {
                title: "",
                location: "",
                description: "",
                cover: "",
                content: "# Hello World!"
            },
        }
    },
    methods: {
        beforeUpload(file: UploadFile) {
            // console.log(1)
        },
        handleUpload(file: UploadFile) {
            // console.log(2)
        },
        handleRemove(file: UploadFile) {
            console.log(file)
        },
        handlePictureCardPreview(file: UploadFile) {
            console.log(file)
            this.articleForm.cover = String(file.url)
            this.dialogVisible = true
            console.log(this.articleForm.cover)
        },
        handleDownload(file: UploadFile) {
            console.log(file)
        },
        handleAddDraft() {
            console.log("Draft");
            console.log(this.articleForm);
        },
        handlePublishArticle() {
            console.log("Article");
            console.log(this.articleForm);
            request({
                method: 'get',
                url: '/',//也可以对接口的具体代码进行封装
            }).then(res => {
                console.log(res);
                alert("更新Token成功！")
            }).catch(error => {
                alert("登录出现错误出现错误，请检查账号密码是否正确或者网络是否已连接！")
            })

            // localStorage.removeItem("userJson");
        }
    },
})
</script>
<!-- <script setup>
    import { ref } from 'vue'; 
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    const markdownText = ref('## Hello Editor');
</script> -->
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.el-form-item__content {
    line-height: 80px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>