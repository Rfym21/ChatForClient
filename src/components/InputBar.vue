<template>
  <!-- 输入栏部分 -->
  <div
    class="footer fixed bottom-2 p-1 bg-gray-200 rounded-2xl h-[7vh] border-t-2 border left-0 right-0 mx-[4vw] focus:outline-none">
    <div class="flex items-center justify-center h-full">

      <textarea v-model="state.messageContent" class="input flex-1 rounded-2xl h-12 px-4 py-2 ml-2" type="text"
        placeholder="Message" @keydown.enter="sendMessage" :disabled="state.isTalking"></textarea>

      <button class="ml-2 mr-2 w-20 bg-black rounded-2xl h-12 text-white" @click="sendMessage"
        :disabled="state.isTalking">
        {{ state.isTalking ? '⬜️' : '发送' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useState } from '../storages/state.js'
import { useOpenaiStorage } from '../storages/openai.js'
const state = useState().state
const messageManager = useOpenaiStorage().messageManager
import BScrollManager from '../libs/BScroll@r.js'
import { chatStream, chatNoStream } from '../libs/openai.js'

const sendMessage = async () => {
  
  messageManager.findMessages(state.messagesIndex).messages.push({
    role: "user",
    content: state.messageContent
  })

  const result = await chatNoStream(messageManager.findMessages(state.messagesIndex).messages)
  
  messageManager.findMessages(state.messagesIndex).messages.push({
    role: "assistant",
    content: result
  })

  state.messageContent = ""
  BScrollManager.scrollToBottom('chatWrap')
}
</script>

<style lang="css" scoped></style>