import { defineStore } from 'pinia'
import { reactive } from 'vue'
import avatar from '../assets/images/avatar.png'
import { useOpenaiStorage } from './openai.js'

const messages = useOpenaiStorage().messages

export const useState = defineStore('state', () => {
  const state = reactive({
    messageContent: "",
    isTalking: false,
    NavVisible: false,
    SettingVisible: false,
    chatWrapBS: null,
    chatListWrapBS: null,
    avatar: avatar,
    chatWrap: null,
    messagesManger: null,
    messageContentLength: 25,
    NavNotice: "听说这里可以写签名！",
    NavTitle: "如风雨沐丷",
    titleChangeStatus: false,
    messagesIndex: messages[0].id
  })
  return {
    state
  }
})  
