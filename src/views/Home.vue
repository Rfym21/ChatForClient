<template>
  <!-- 顶栏部分 -->
  <div
    class="nav flex flex-nowrap fixed items-center px-3 w-full py-2 bg-opacity-30 bg-white z-10 top-0 rounded-b-lg border-b-2 border-gray-300" v-if="openaiConfig.state">
    <!-- <Button label="聊天列表" @click="NavVisible = true" size="small" class="mr-4 px-2 py-1 text-xs" severity="contrast"
        outlined /> -->
    <button class="w-12 h-8 rounded-lg hover:bg-gray-200 px-2" @click="NavVisible = true"><img
        src="../assets/ico/nav-left.png" alt="" class=" w-8 h-8"></button>

    <div class="text-xl font-bold flex-1 text-center">{{
      openaiConfig.state.model || '暂未选择模型' }}</div>

    <button class="w-12 h-8 rounded-lg hover:bg-gray-200 px-2 py-1" @click="openPosition('topright')"><img
        src="../assets/ico/nav-right.png" alt="" class="mx-auto my-auto w-6 h-6"></button>
    <!-- <Button :label="state.isConfig ? '登录' : '设置'" @click="openPosition('topright')" size="small"
        class="ml-2 px-2 py-1 text-xs" severity="contrast" outlined /> -->
  </div>
  <div class="header"></div>
  <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

  <!-- 中间信息渲染区域 -->
  <!-- <div class="chatWrap mx-2 overflow-hidden" ref="chatWrap">
    <ul>
      <li v-for="item of state.messageList[state.messagesIndex].messages.filter((v) => v.role != 'system')"
        :class="`flex group px-2 py-3 rounded-lg ${item.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`"
        v-if="state.messageList[state.messagesIndex]">
        <div :class="item.role === 'assistant' ? 'order-2 flex flex-col' : 'order-1 flex flex-col'">
          <div class="rounded-full border-2 inline-block w-8 h-8">
            <img src="../assets/ico/robot.png" class="w-8 mx-auto my-auto rounded-full shadow shadow-gray-900"
              v-if="item.role === 'assistant'">
            <img src="../assets/ico/user.png" class="w-8 mx-auto my-auto rounded-full shadow shadow-gray-900"
              v-if="item.role === 'user'">
          </div>
          <span class="mx-auto text-sm h-8">{{ item.role === 'assistant' ? 'Bot' : 'User' }}</span>
        </div>
        <div
          :class="`${item.role !== 'assistant' ? 'order-1 mr-2 ml-4' : 'order-2 ml-2 mr-4'} mt-12 rounded-lg overflow-hidden shadow border-gray-500 shadow-gray-300 p-1`">
          <MdPreview editorId="preview-only" :modelValue="item.content" />
        </div>
      </li>
    </ul>
  </div> -->
  <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

  <!-- 底栏部分 -->
  <div class="footer__box"></div>
  <div class="footer fixed bottom-1 p-3 bg-gray-100 rounded-2xl mb-1">

    <div class="flex">
      <input v-model="state.messageContent" class="input flex-1 rounded-2xl h-12 pl-8" type="text" placeholder="Message"
        @keydown.enter="sendMessage" :disabled="state.isTalking">
      <button class="btn ml-4 w-20 bg-black rounded-2xl h-12 text-white" @click="sendMessage"
        :disabled="state.isTalking">{{ state.isTalking ? '⬜️' : '发送' }}</button>
    </div>
  </div>
  <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

  <!-- 设置弹窗 -->
  <Dialog v-model:visible="visible" header="编辑信息" :position="position" :modal="true" :draggable="false">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">
      <h4 class="font-bold text-sm">API填写规范:</h4>
      <p class="text-sm">https://api.openai.com/v1/chat/completions</p>
      <p class="text-sm">https://api.openai.com/v1</p>
      <h4 class="font-bold text-sm">如果你拿到的接口是上面的样子,那么APIhost就填"https://api.openai.com"</h4>
    </span>

    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">API host</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="state.APIhost" />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="APIkey" class="font-semibold w-24">API key</label>
      <InputText id="APIkey" class="flex-auto" autocomplete="off" v-model="state.APIkey" />
    </div>

    <div class="flex items-center gap-4 mb-8">
      <label for="APIkey" class="font-semibold w-24">聊天模型</label>
      <Select v-model="openaiConfig.state.model" :options="openaiConfig.state.models" optionLabel="name" placeholder="选择一个模型"
        class="flex-auto" />
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="保存" @click="visible = false; saveSet()" class="bg-black"></Button>
    </div>
  </Dialog>
  <!-- ----------------------------------------------------------------------------------------------------------------------------------------- -->

  <!-- 侧边栏 -->

  <Drawer v-model:visible="NavVisible">
    <template #header>
      <div class="flex items-center gap-2">
        <Avatar image="@/assets/images/avatar.png" class="mr-2" size="xlarge" shape="circle" />
        <h1 class="font-bold text-3xl">如风雨沐丷</h1>
      </div>
    </template>

    <div class="w-full h-1/6 bg-white pb-5">
      <div class="w-full h-full bg-gray-100 rounded-lg p-2">
        <p class="text-sm font-bold">听说这里可以写签名！</p>
      </div>
    </div>

    <div class="container h-5/6 overflow-hidden rounded-lg py-2" ref="messagesManger">
      <ul>
        <li
          :class="`w-full flex item-center rounded-lg hover:bg-gray-100 px-2 py-2 my-2 cursor-pointer ${i === state.messagesIndex ? 'bg-gray-100' : ''}`"
          v-for="(item, i) in state.messageList" :key="i" @click.stop="state.messagesIndex = i">

          <p class="text-black text-sm font-bold flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis pl-2 mr-2 leading-8"
            v-if="!titleChangeStatus">{{ item.title
            }}</p>

          <input type="text"
            class="text-black text-sm font-bold flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis pl-2 rounded-lg mr-2"
            v-if="titleChangeStatus" v-model="item.title" @blur="titleChangeStatus = false">

          <span class="text-bold text-sm block w-8 h-8 px-1 py-1 mr-1 hover:bg-gray-200 rounded-lg"
            @click.stop="titleChangeStatus = true"><img src="../assets/ico/edit.png" alt=""></span>
          <span class="text-bold text-xl block w-8 h-8 px-1 py-1 hover:bg-rose-200 rounded-lg"
            @click.stop="deleteMessages(i)"><img src="../assets/ico/delete.png" alt="" class="w-6 h-6"></span>
        </li>
      </ul>
    </div>

    <template #footer>
      <div class="flex items-center gap-2">
        <Button label="新建聊天" class="flex-auto" severity="contrast" @click="newMessages"></Button>
        <Button label="清空记录" class="flex-auto" text severity="danger" @click.stop="ClearMessageHistory"></Button>
      </div>
    </template>
  </Drawer>

  <!--------------------------------------------------------------------------------------------------------------------------------------------- -->
</template>

<script setup>
import { ref, reactive, onMounted, onUpdated, watch, nextTick } from 'vue'
import debounce from '../libs/debounce.js'
// markdown 插件
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
// PrimeVue 组件库
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Drawer from 'primevue/drawer'
import Avatar from 'primevue/avatar'
// BScroll
import BScroll from '@better-scroll/core'
import { useOpenaiStorage } from '../storages/openai.js'

const openaiStore=useOpenaiStorage()
const openaiConfig=openaiStore.state

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 侧边栏滚动效果
let messagesManger = ref(null)
// 聊天窗口滚动效果
let chatWrap = ref(null)
// 设置侧边栏
const NavVisible = ref(false)
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const state = reactive({
  isTalking: false,
  messageContent: '',
  chatWrapBS: null,
  chatListWrapBS: null,
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* onUpdated(debounce(() => {

}, 1000)) */
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* watch(() => state.APIkey, () => {

}) */

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
watch(() => NavVisible.value, async (newVal) => {
  if (newVal) {
    nextTick(async () => {
      await iniTBScroll()
    })
  }
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
onMounted(async () => {
console.log(123);


})
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 发送消息
const sendMessage = async function () {
 
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 新建聊天
const newMessages = () => {

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 清空聊天记录
const ClearMessageHistory = () => {

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 设置弹窗
const position = ref('center')
const visible = ref(false);

const openPosition = (pos) => {
  position.value = pos
  visible.value = true
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 滚动到底部
const scrollBottom = (obj) => {
  if (obj !== null) {
    console.log("底部: =>", obj.maxScrollY, "当前: =>", obj.y, "耗时: =>", `${Math.abs((Math.abs(obj.maxScrollY) - Math.abs(obj.y)) / 2) < 4000 ? (Math.abs(Math.abs(obj.maxScrollY) - Math.abs(obj.y)) / 2) : 4000}ms`)
    obj.scrollTo(0, obj.maxScrollY, Math.abs(Math.abs(obj.maxScrollY) - Math.abs(obj.y)) / 2)
  }
}
//滚动到最上端
const scrollTop = (obj) => {
  if (obj !== null) {
    console.log("顶部: =>", obj.minScrollY, "当前: =>", obj.y, "耗时: =>", `${Math.abs((Math.abs(obj.maxScrollY) - Math.abs(obj.y)) / 2) < 4000 ? (Math.abs(Math.abs(obj.maxScrollY) - Math.abs(obj.y)) / 2) : 4000}ms`)
    obj.scrollTo(0, obj.minScrollY, Math.abs(obj.y / 2))
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 修改聊天标题
const titleChangeStatus = ref(false)
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 删除当前聊天
const deleteMessages = (i) => {
  nextTick(async () => {
    if (i === state.messageList.length - 1) {
      state.messagesIndex = state.messageList.length - 2
    }
    state.messageList.splice(i, 1)
  })
  nextTick(async () => {
    await iniTBScroll()
    scrollTop(state.chatListWrapBS)
  })
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 侧边栏滚动优化初始化
const iniTBScroll = () => {
  if (messagesManger.value === null) {
    return
  }

  if (state.chatListWrapBS !== null) {
    state.chatListWrapBS.destroy()
  }
  state.chatListWrapBS = new BScroll(messagesManger.value, {
    click: true,
  })
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 聊天界面滚动优化初始化
const ChatWrapBScroll = () => {

  if (chatWrap.value === null) {
    return
  }

  if (state.chatWrapBS !== null) {
    // console.log("刷新")
    state.chatWrapBS.refresh()
    // state.chatWrapBS.destroy()
  } else {
    // console.log("初始化")
    state.chatWrapBS = new BScroll(chatWrap.value, {
      click: true
    })
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


</script>

<style lang="css" scoped>
.input:focus {
  outline: none;
}

.nav {
  height: 5vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.chatWrap {
  margin-top: 5vh;
  height: 86vh;
  margin-bottom: 9vh;
}

.footer {
  width: 95%;
  height: 8vh;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>