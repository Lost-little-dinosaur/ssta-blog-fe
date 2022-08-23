<template>
    <el-form>
        <el-form-item>
            <el-row style="height:80px"> </el-row>
            <el-row class="demo-autocomplete text-center">
                <el-col :span="4">
                </el-col>
                <el-col :span="8" style="margin:0%">
                    标题
                </el-col>
                <el-col :span="12">
                    <el-autocomplete
                        v-model="state2"
                        placeholder="请输入标题"
                        @select="handleSelect"
                    />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row style="height:80px"> </el-row>
            <el-row class="demo-autocomplete text-center">
                <el-col :span="4">
                </el-col>
                <el-col :span="8" style="margin:0%">
                    描述
                </el-col>
                <el-col :span="12">
                    <el-autocomplete
                        v-model="state2"
                        placeholder="请输入标题"
                        @select="handleSelect"
                    />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row style="height:80px"> </el-row>
            <el-row class="demo-autocomplete text-center">
                <el-col :span="4">
                </el-col>
                <el-col :span="8" style="margin:0%">
                    封面
                </el-col>
                <el-col :span="12">
                    <el-autocomplete
                        v-model="state2"
                        placeholder="请输入标题"
                        @select="handleSelect"
                    />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
            <v-md-editor v-model="markdownText" height="400px"></v-md-editor>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
  //需要有下面这一段代码来导出组件
    import { ref } from 'vue';

    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    let markdownText="";
    export default {
        setup(){
            const markdownText = ref('# Hello Editor')
            return{
                markdownText
            }
        },
        data(){
            return{
                markdownText:"# hello world!"
            }
        }
    }
</script>
<!-- <script setup>
    import { ref } from 'vue'; 
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    const markdownText = ref('## Hello Editor');
</script> -->

<style>

</style>