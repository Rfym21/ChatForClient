import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useOpenaiStorage = defineStore('openai', () => {
  const config = reactive({
    baseUrl: localStorage.getItem("baseUrl") || "https://client.yikeapi.me/v1",
    apiKey: localStorage.getItem("apiKey") || "sk-rfym21-chatforclient",
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
        }
      ]
    }
  ])

  return {
    config,
    state,
    messages
  }
})
