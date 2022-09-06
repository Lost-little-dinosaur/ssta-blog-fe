<template>
    <!-- Form -->
    <el-button plain @click="dialogFormVisible = true" type="primary" size="large" style="margin:8px">
        登录
    </el-button>

    <el-dialog v-model="dialogFormVisible" title="欢迎登录科协博客！">
        <el-form :model="form" size="large">
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.info" autocomplete="off" placeholder="请填写您注册的电话"/>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off" type="password" placeholder="请填写您的密码"/>
            </el-form-item>
            <!-- <el-form-item label="验证码" :label-width="formLabelWidth">
                <el-input v-model="form.verifyCode" autocomplete="off" style="width: 100px;"/>
            </el-form-item> -->
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="handleLogin">
                登录
            </el-button>
        </span>
    </template>
    </el-dialog>
</template>

<script lang="ts">
    import { reactive, ref } from 'vue'
    import request from '@/utils/request';
    import { ElNotification } from 'element-plus'
    import { method } from 'lodash';
    export default {
        data(){
            return{
                form:reactive({
                    info: 'admin',
                    password: '123456',
                    // verifyCode:"",
                }),
                dialogFormVisible:false,
                formLabelWidth:'140px',
            }
        },
        methods:{
            handleLogin(){
                request({
                    url: '/user/login/general',
                    method: 'post',
                    data: this.form
                }).then(res => {
                    localStorage.setItem('jwtToken', JSON.stringify(res.data.data.token));
                    ElNotification({
                        title: 'Success',
                        message: "登录成功！",
                        type: 'success',
                    })
                    this.dialogFormVisible = false;
                }).catch(err => {
                    
                    ElNotification({
                        title: 'Error',
                        message: err.message,
                        type: 'error',
                    })
                })
            },
        }
    }
    
</script>
<style scoped>
    .el-button--text {
        margin-right: 15px;
    }
    .el-input {
        width: 300px;
    }
    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .el-form-item{
        margin:50px;
    }
</style>