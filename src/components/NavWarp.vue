<template>
  <!-- 侧边栏 -->
  <Drawer v-model:visible="state.NavVisible">
    <template #header>
      <div class="flex items-center gap-2">
        <Avatar :image="state.avatar" class="mr-2" size="xlarge" shape="circle" />
        <h1 class="font-bold text-3xl">{{ state.NavTitle }}</h1>
      </div>
    </template>

    <div class="w-full h-1/6 bg-white pb-5">
      <div class="w-full h-full bg-gray-100 rounded-lg p-4">
        <p class="text-sm font-bold">{{ state.NavNotice }}</p>
      </div>
    </div>

    <div class="w-full border-b-2 border-gray-300"></div>

    <div class="container h-5/6 overflow-hidden rounded-lg py-2" ref="state.chatListWrap">
      <ul>
        <li
          :class="`w-full flex item-center rounded-lg hover:bg-gray-100 px-2 py-2 my-2 cursor-pointer ${item.id === state.messagesIndex ? 'bg-gray-100' : ''}`"
          v-for="(item, i) in messages" :key="i" @click.stop="state.messagesIndex = item.id">

          <!-- 显示标题 -->
          <p class="text-black text-sm font-bold flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis pl-2 mr-2 leading-8"
            v-if="!state.titleChangeStatus">
            {{ item.title }}
          </p>

          <!-- 激活标题编辑状态 -->
          <input type="text"
            class="text-black text-sm font-bold flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis pl-2 rounded-lg mr-2"
            v-if="state.titleChangeStatus" v-model="item.title" @blur="state.titleChangeStatus = false">

          <!-- 编辑标题 -->
          <span class="text-bold text-sm block w-8 h-8 px-1 py-1 mr-1 hover:bg-gray-200 rounded-lg"
            @click.stop="state.titleChangeStatus = true"><img src="../assets/ico/edit.png" alt="">
          </span>
          <!-- 删除记录 -->
          <span class="text-bold text-xl block w-8 h-8 px-1 py-1 hover:bg-rose-200 rounded-lg"
            @click.stop="deleteMessages(item.id)"><img src="../assets/ico/delete.png" alt="" class="w-6 h-6">
          </span>

        </li>
      </ul>
    </div>

    <template #footer>
      <div class="flex items-center gap-2">
        <Button label="新建聊天" class="flex-auto" severity="contrast" @click="newMessages"></Button>
        <Button label="清空记录" class="flex-auto" text severity="danger" @click="ClearMessageHistory"></Button>
      </div>
    </template>
  </Drawer>

</template>

<script setup>
// PrimeVue 组件库
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Avatar from 'primevue/avatar'
import { useOpenaiStorage } from '../storages/openai.js'
import { useState } from '../storages/state.js'

const state = useState().state
const messages = useOpenaiStorage().messages


// 新建聊天
const newMessages = () => {

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 清空聊天记录
const ClearMessageHistory = () => {

}

// 删除聊天记录
const deleteMessages = (i) => {

}
</script>

<style lang="css" scoped></style>