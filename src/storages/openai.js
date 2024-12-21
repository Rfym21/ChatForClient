import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useOpenaiStorage = defineStore('openai', () => {
  const config = reactive({
    baseUrl: localStorage.getItem("baseUrl") || "https://apir.me/v1",
    apiKey: localStorage.getItem("apiKey") || "sk-Rx7oQaTXkBkMmC7ds2DvCsXmDgFnMJ6WyPkKYvgs4gR4xifn",
  })

  const state = reactive({
    models: localStorage.getItem("models") ? JSON.parse(localStorage.getItem("models")) : [],
    prompt: localStorage.getItem("prompt") || "",
    max_tokens: localStorage.getItem("max_tokens") || 8192,
    temperature: localStorage.getItem("temperature") || 0.3,
    model: localStorage.getItem("model") || null,
  })

  const messages = reactive(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [
    {
      id: new Date().getTime(),
      title: "New Chat",
      messages: [
        {
          role: "assistant",
          content: "你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n"
        },
        {
          role: "assistant",
          content: "你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n"
        },
        {
          role: "assistant",
          content: "你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n"
        },
        {
          role: "assistant",
          content: "你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n"
        },
        {
          role: "assistant",
          content: "你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n你好，我是铠甲勇士！\n"
        }
      ]
    }
  ])

  const findMessages = (id) => {
    return messages.find(m => m.id == id)
  }

  const messageManager = reactive({
    messages,
    findMessages
  })

  return {
    config,
    state,
    messageManager
  }
})
