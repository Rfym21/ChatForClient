<template>
  <div class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50" v-if="state.SettingVisible"
    @click="state.SettingVisible = false">

    <main class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 bg-white rounded-lg shadow-lg p-4"
      @click.stop="">

      <div class="flex flex-nowrap justify-center items-center mb-4">
        <!-- 虚线 -->
        <div class="w-1/2 border border-slate-500 border-dashed ml-2"></div>
        <h1 class="text-2xl font-bold text-center py-2 px-6 my-4">Setting</h1>
        <div class="w-1/2 border border-slate-500 border-dashed mr-2"></div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-bold mb-2 text-left">baseURL</h3>
        <div class="flex flex-nowrap justify-center items-center">
          <input type="text" class="flex-1 p-2 mr-4 border border-slate-500 rounded-md"
            placeholder="https://api.openai.com/v1" v-model="openaiConfig.baseUrl" />
          <button class="bg-black text-white px-4 py-2 rounded-md text-nowrap" @click="saveBaseUrl">保存</button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-bold mb-2 text-left">apiKey</h3>
        <div class="flex flex-nowrap justify-center items-center">
          <input :type="keyVisible ? 'text' : 'password'" class="flex-1 p-2 mr-4 border border-slate-500 rounded-md"
            placeholder="sk-proj-..." v-model="openaiConfig.apiKey" />
          <button class=" bg-red-500 text-white px-4 py-2 rounded-md mr-2 text-nowrap"
            @click="keyVisible = !keyVisible">{{
              keyVisible ? '隐藏' : '显示' }}</button>
          <button class="bg-black text-white px-4 py-2 rounded-md text-nowrap" @click="saveApiKey">保存</button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-bold mb-2 text-left">Prompt</h3>
        <div class="flex flex-nowrap justify-center items-center">
          <textarea name="prompt" id="prompt" class="flex-1 p-2 mr-4 border border-slate-500 rounded-md"
            placeholder="你是一只小黄鸭" @change="openaiState.prompt = $event.target.value">{{ openaiState.prompt }}</textarea>
          <button class="bg-black text-white px-4 py-2 rounded-md text-nowrap" @click="savePrompt">保存</button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-bold mb-2 text-left">Temperature</h3>
        <div class="flex flex-nowrap justify-center items-center">
          <input class="w-full mr-4" type="range" min="0" max="100" :value="openaiState.temperature * 100"
            @input="openaiState.temperature = $event.target.value / 100" />
          <input class="text-black py-2 rounded-md mr-4 w-10" :value="openaiState.temperature" type="text"
            @change="openaiState.temperature = $event.target.value" />
          <button class="bg-black text-white px-4 py-2 rounded-md text-nowrap" @click="saveTemperature">保存</button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-bold mb-2 text-left">Max_tokens</h3>
        <div class="flex flex-nowrap justify-center items-center">
          <input class="w-full mr-4" type="range" min="0" max="128000" :value="openaiState.max_tokens"
            @input="openaiState.max_tokens = $event.target.value" />
          <input class="text-black py-2 rounded-md mr-4 w-14" :value="openaiState.max_tokens" type="text"
            @change="openaiState.max_tokens = $event.target.value" />
          <button class="bg-black text-white px-4 py-2 rounded-md text-nowrap" @click="saveMaxTokens">保存</button>
        </div>
      </div>

      <div class="mb-4 mt-10">
        <button class="w-full bg-black text-white px-4 py-2 rounded-md text-nowrap"
          @click="state.SettingVisible = false">关闭设置</button>
      </div>

    </main>

  </div>
</template>

<script setup>
import { useState } from '../storages/state.js'
import { useOpenaiStorage } from '../storages/openai.js'
import { ref } from 'vue'

const state = useState().state
const openaiState = useOpenaiStorage().state
const openaiConfig = useOpenaiStorage().config
const keyVisible = ref(false)

const saveBaseUrl = () => {
  if (openaiConfig.baseUrl && openaiConfig.baseUrl.trim() !== "") {
    localStorage.setItem("baseUrl", openaiConfig.baseUrl)
  } else {
    openaiConfig.baseUrl = "https://client.yikeapi.me/v1"
    localStorage.setItem("baseUrl", "https://client.yikeapi.me/v1")
  }
}

const saveApiKey = () => {
  if (openaiConfig.apiKey && openaiConfig.apiKey.trim() !== "") {
    localStorage.setItem("apiKey", openaiConfig.apiKey)
  } else {
    openaiConfig.apiKey = "sk-rfym21-chatforclient"
    localStorage.setItem("apiKey", "sk-rfym21-chatforclient")
  }
}

const savePrompt = () => {
  if (openaiState.prompt && openaiState.prompt.trim() !== "") {
    localStorage.setItem("prompt", openaiState.prompt)
  } else {
    openaiState.prompt = ""
    localStorage.setItem("prompt", "")
  }
}

const saveTemperature = () => {
  openaiState.temperature=Number(openaiState.temperature)
  if (typeof openaiState.temperature === 'number' && !isNaN(openaiState.temperature) && openaiState.temperature >= 0 && openaiState.temperature <= 1) {
    localStorage.setItem("temperature", openaiState.temperature)
  } else {
    openaiState.temperature = 0.3
    localStorage.setItem("temperature", 0.3)
  }
}

const saveMaxTokens = () => {
  openaiState.max_tokens=Number(openaiState.max_tokens)
  if (typeof openaiState.max_tokens === 'number' && !isNaN(openaiState.max_tokens) && openaiState.max_tokens >= 0 && openaiState.max_tokens <= 128000) {
    localStorage.setItem("max_tokens", openaiState.max_tokens)
  } else {
    openaiState.max_tokens = 8192
    localStorage.setItem("max_tokens", 8192)
  }
}

setInterval(()=>{console.log(openaiState.max_tokens)},1000)
</script>

<style lang="css" scoped></style>