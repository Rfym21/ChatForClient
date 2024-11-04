import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useOpenaiStorage = defineStore('openai', () => {
  const config = reactive({
    baseUrl: localStorage.getItem("baseUrl")  || "https://www.yikeapi.me/v1",
    apiKey: localStorage.getItem("apiKey")  || "sk-BxfnHW0AD29NrVD5ptSbWdRVq16mY3C2OQDNIX2tEpS5eWpb",
  })
  const state = reactive({
    models: [],
    prompt: "",
    maxTokens: 8192,
    temperature: 1,
    model: localStorage.getItem("model") || null,
  })
  const messageList = reactive([])

  return {
    config,
    state,
    messageList
  }
})
