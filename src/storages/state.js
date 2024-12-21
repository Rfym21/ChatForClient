import { defineStore } from 'pinia'
import { reactive } from 'vue'
import avatar from '../assets/images/avatar.png'
import { useOpenaiStorage } from './openai.js'

const messageManager = useOpenaiStorage().messageManager

export const useState = defineStore('state', () => {
  const state = reactive({
    messageContent: "",
    isTalking: false,
    NavVisible: false,
    SettingVisible: false,
    avatar: avatar,
    messageContentLength: 25,
    NavNotice: "听说这里可以写签名！",
    NavTitle: "如风雨沐丷",
    titleChangeStatus: false,
    messagesIndex: messageManager.messages[0].id,
    modelChangeVisible: false
  })
  return {
    state
  }
})  
