<template>
  <div class="chatWrap mx-2 overflow-hidden" ref="state.chatWrap">
    <ul>
      <!-- 顶部预留 -->
      <div class="h-[5vh]"></div>

      <li v-for="item of messages.filter(m => m.id == state.messagesIndex)[0].messages.filter((v) => v.role != 'system')"
        :class="`flex group px-2 py-3 rounded-lg ${item.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`"
        v-if="messages.filter(m => m.id == state.messagesIndex)[0].messages.filter((v) => v.role != 'system').length > 0">

        <div :class="item.role === 'assistant' ? 'order-2 flex flex-col' : 'order-1 flex flex-col'">
          <div class="rounded-full border-2 inline-block w-8 h-8">
            <img src="../assets/ico/robot.png" class="w-8 mx-auto my-auto rounded-full shadow shadow-gray-900"
              v-if="item.role === 'assistant'">
            <img src="../assets/ico/user.png" class="w-8 mx-auto my-auto rounded-full shadow shadow-gray-900"
              v-if="item.role === 'user'">
          </div>
          <span class="mx-auto text-sm h-8">{{ item.role === 'assistant' ? 'Bot' : 'User' }}</span>
        </div>

        <!-- 内容 -->
        <div
          :class="`${item.role !== 'assistant' ? 'order-1 mr-2 ml-4' : 'order-2 ml-2 mr-4'} mt-12 rounded-lg overflow-hidden shadow border-gray-500 shadow-gray-300 p-1`">
          <MdPreview editorId="preview-only" :modelValue="item.content" />
        </div>

      </li>
      <!-- 底部预留 -->
      <div class="h-[7vh]"></div>
    </ul>
  </div>
</template>

<script setup>
// markdown 插件
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { useState } from '../storages/state.js'
import { useOpenaiStorage } from '../storages/openai.js'

const state = useState().state
const messages = useOpenaiStorage().messages

// console.log(state.messagesIndex)
// console.log(messages)
// console.log(messages.filter(m => m.id == state.messagesIndex)[0].messages.filter((v) => v.role != 'system'))
</script>

<style lang="css" scoped>
:deep(.md-editor-preview-wrapper){
  padding: 5px 10px;
  margin: 0;
}
</style>