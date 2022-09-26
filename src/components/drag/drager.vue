<template>
    <el-button type="text" @click="handleOpenAside" style="margin: 10px;">
        <el-icon v-if="drawer2" :size="30" color="#000000">
            <Fold/>
        </el-icon>
        <el-icon v-else :size="30" color="#000000">
            <Expand/>
        </el-icon>
    </el-button>
    <el-drawer v-model="drawer2" :direction="direction">
        <template #title>
            <h4>{{ randomChickenSoup }}</h4>
        </template>
        <template #default>
            <el-scrollbar>
                <el-menu :default-openeds="['1']">
                    <el-menu-item index="1" @click="tempPassIndex(1)">
                        <template #title>
                            <el-icon>
                                <Position/>
                            </el-icon>
                            科协简介
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="tempPassIndex(2)">
                        <template #title>
                            <el-icon>
                                <Notebook/>
                            </el-icon>
                            博客文章
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3" @click="tempPassIndex(3)" v-if="userPermisson<2">
                        <template #title>
                            <el-icon>
                                <Avatar/>
                            </el-icon>
                            管理员教程
                        </template>
                    </el-menu-item>

                    <el-menu-item index="4" @click="tempPassIndex(4)" v-if="userPermisson<2">
                        <template #title>
                            <el-icon>
                                <FolderOpened/>
                            </el-icon>
                            编辑目录
                        </template>
                    </el-menu-item>
                    <el-menu-item index="5" @click="tempPassIndex(5)" v-if="userPermisson<3">
                        <template #title>
                            <el-icon>
                                <Document/>
                            </el-icon>
                            发布文章
                        </template>
                    </el-menu-item>
                    <el-menu-item index="6" @click="tempPassIndex(6)" v-if="userPermisson<3">
                        <template #title>
                            <el-icon>
                                <DataLine/>
                            </el-icon>
                            草稿箱
                        </template>
                    </el-menu-item>
                    <el-menu-item index="7" @click="tempPassIndex(7)" v-if="userPermisson<3">
                        <template #title>
                            <el-icon>
                                <Mug/>
                            </el-icon>
                            回收站
                        </template>
                    </el-menu-item>


                </el-menu>
            </el-scrollbar>
        </template>
    </el-drawer>
</template>

<script lang="ts">
import {ref} from 'vue'
import {defineComponent} from 'vue'


export default defineComponent({
    name: 'Drager',
    props: {
        userPermisson: Number,
    },
    data() {
        return {
            drawer2: false,
            nowIndex: 1,
            randomChickenSoup: "世界，因你而改变"
        }
    },
    emits: [
        "updateIndex"
    ],
    setup(props ,{emit}) {
        const drawer2 = ref(false)
        const direction = ref('ltr')
        const passIndex = (index: number) => {
            emit("updateIndex", index)
            drawer2.value = false
        }
        return {
            passIndex,
            direction,
        }
    },
    methods: {
        tempPassIndex(n:number){
            this.passIndex(n);
            this.drawer2=false;
        },
        handleOpenAside() {
            this.drawer2 = true;
            let items = ["世界，因你而改变", '生命中最主要的危险就是你采取了太多的防范。', '一个人最大的破产是绝望，最大的资产是希望。', '胜人者有力，自胜者强。', '人生在不断的追求，只有这样，生命才有激情。', '天平是轻重的衡量器，实践是是非的试金石。', '地球是运动的，一个人不会永远处在倒霉的位置。', '人生苦短，行走在人生路上，总会有许多得失和起落。', '很多爱不能重来，我就应释怀，输不起就不要输。', '世间的幸福，秘诀只有八个字：心怀感恩，自爱爱人。', '憎恨是灵魂的疯狂，邪恶的生长。', '生命太过短暂，今日放弃了明天不必须能得到。', '趁着年轻，当你爱上一个人的时候，尽管去爱吧。', '一切的成就，一切的财富，都始于一个意念', '有时候，顺其自然，你才会知道那些事是否值得拥有', '强者不是没有眼泪是含着眼泪努力奔跑。', '人生的路很漫长，终点在哪。', '未曾失败的人恐怕也未曾成功过。', '理想，能给天下不幸者以欢乐!', '鹰击天风壮，鹏飞海浪春。', '放下已经走远的人与事，放下早已尘封的是与非', '努力吧，世上没有比今天更年轻的你了', '活着，就要善待自己，别跑到别人的生命里当插曲。', '幸福其实很简单：有人爱;有事做;有所期待。', '跌下去是耻辱，站起来是尊严。', '生气会蒙蔽我们的判断力。', '木秀于林,风必摧之。(旧唐书', '让我们将事前的忧虑，换为事前的思考和计划吧!', '壮志饥餐胡虏肉，笑谈渴饮匈奴血。——《满江红》', '拼命的喝醉，只是为了给哭泣找一个借口。', '男人因为孤独而优秀，女人因为优秀而孤独', '天下兴亡，匹夫有责。——顾炎武', '时间不是让人忘了痛，而是让人习惯了痛。', '友谊之光像烛火，四周黑暗的时侯最为耀眼。', '没有天生的信心，只有不断培养的信心。', '不要装的太坚强，别人会把它当成伤害你的理由。', '志不强者智不达，言不信者行不果。——墨子', '任何业绩的质变都来自于量变的积累。', '金玉其外，败絮其中。明·刘基《卖柑者言》', '我再也不想见到你，是违心说的还是一时的气话呢。', '爱情是从告白开始的，分手是从眼泪结束的。', '每个说不想恋爱的人，心里都装着一个不可能的人。', '坚持不懈不是一个长跑，而是一个接着一个的短跑。', '江山代有才人出，各领风骚数百年。清·赵翼《论诗》', '横眉冷对千夫指，俯首甘为孺子牛。《自嘲》', '与其在等待中枯萎，不如在行动中绽放。'];

            this.randomChickenSoup = items[Math.floor(Math.random() * items.length)];
        }
    }
})
</script>