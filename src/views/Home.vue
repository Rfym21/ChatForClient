<template>
  <!-- 顶栏部分 -->
  <TopBar />
  <!-- 中间信息渲染区域 -->
  <ChatWarp />
  <!-- 输入栏 -->
  <InputBar />
  <!-- 侧边栏 -->
  <NavWarp />
  <!-- 设置 -->
  <SettingWarp />
</template>

<script setup>
import { ref, reactive, onMounted, onUpdated, watch, nextTick } from 'vue'
import debounce from '../libs/debounce.js'
import InputBar from '../components/InputBar.vue'
import TopBar from '../components/TopBar.vue'
import NavWarp from '../components/NavWarp.vue'
import ChatWarp from '../components/ChatWarp.vue'
import SettingWarp from '../components/SettingWarp.vue'


// BScroll
import { useOpenaiStorage } from '../storages/openai.js'
import { useState } from '../storages/state.js'

const openaiStore = useOpenaiStorage()
const openaiConfig = openaiStore.state
const state = useState().state

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
onMounted(async () => {
})
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 发送消息
const sendMessage = async function () {

}

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
// 侧边栏滚动优化初始化
/* const iniTBScroll = () => {
  if (messagesManger.value === null) {
    return
  }

  if (state.chatListWrapBS !== null) {
    state.chatListWrapBS.destroy()
  }
  state.chatListWrapBS = new BScroll(messagesManger.value, {
    click: true,
  })
} */
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* // 聊天界面滚动优化初始化
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
} */
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


</script>

<style lang="css" scoped></style>