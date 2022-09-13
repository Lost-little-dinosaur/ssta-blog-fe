<template>
    <!-- Form -->
    <el-button plain @click="dialogFormVisible = true" type="success" size="large" style="margin:8px">
        注册
    </el-button>

    <el-dialog v-model="dialogFormVisible" title="欢迎注册科协博客！">
        <el-form :model="form" size="large">
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off" placeholder="请填写您要注册的电话"/>
            </el-form-item>
            <el-form-item label="图形验证码" :label-width="formLabelWidth" id="form-picture">
                <el-input v-model="captcha.code" autocomplete="off" style="width: 80px;"/>
                <img :src=captcha.raw style="height:40px; margin-left: 30px;">
                <el-link type="primary" @click="getCaptcha()" style=" margin-left: 10px;">看不清，换一张</el-link>
            </el-form-item>
            <el-form-item label="短信验证码" :label-width="formLabelWidth">
                <el-input v-model="form.verifyCode" autocomplete="off" style="width: 80px;"/>
                <el-button type="primary" v-if="cacheTime>0" disabled style="margin-left: 30px;">
                    重新发送({{ cacheTime }})
                </el-button>
                <el-button type="primary" v-if="cacheTime==0" @click="sendShortMsg" style=" margin-left: 30px;">
                    发送短信验证码
                </el-button>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off" type="password" placeholder="请填写您的密码"/>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input v-model="form.confirmPassword" autocomplete="off" type="password" placeholder="确认您的密码"/>
            </el-form-item>
            <el-form-item label="学号" :label-width="formLabelWidth">
                <el-input v-model="form.studentID" autocomplete="off" placeholder="如果您是杭电学生，请填写学号"/>
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
                注册
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import {reactive, ref} from 'vue'
import request from '@/utils/request';
import {ElNotification} from 'element-plus'
import {method} from 'lodash';
import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            captcha: {
                id: "",
                raw: "",
                code: "",
            },
            cacheTime: 0,
            form: {
                phone: "18367195231",
                verifyCode: "",
                password: "",
                confirmPassword: "",
                studentID: "",
            },
            dialogFormVisible: false,
            formLabelWidth: '140px',
        }
    },
    methods: {
        getCaptcha() {
            request({
                url: '/base/captcha',
                method: 'get',
            }).then(res => {
                this.captcha.id = res.data.data.id;
                this.captcha.raw = res.data.data.raw;
                // console.log(this.captcha);
            }).catch(err => {
                ElNotification({
                    title: 'Error',
                    message: err.message,
                    type: 'error',
                })
            })
        },
        sendShortMsg() {
            this.getCaptcha();
            request({
                url: '/user/register/code',
                method: 'post',
                data: {
                    phone: this.form.phone,
                    captchaId: this.captcha.id,
                    captchaValue: this.captcha.code,
                }
            }).then(res => {
                // console.log(res);
                ElNotification({
                    title: 'Success',
                    message: "已成功向" + this.form.phone + "发送短信验证码",
                    type: 'success',
                })
            }).catch(err => {
                // console.log(err);
                if (err.response.data.code < 40300 && err.response.data.code >= 40200) {
                    ElNotification({
                        title: 'Error',
                        message: err.response.data.message,
                        type: 'error',
                    })
                } else {
                    ElNotification({
                        title: 'Error',
                        message: err.message,
                        type: 'error',
                    })
                }
            })
        }
    },
    mounted() {
        this.getCaptcha();
    },
})

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

.el-form-item {
    margin: 50px;
}

</style>