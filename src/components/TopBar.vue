<template>
  <div class="nav flex flex-nowrap fixed items-center px-3 w-full h-[5vh] py-2 bg-opacity-30 bg-white z-10 top-0 rounded-b-lg border-b-2 border-gray-300">

    <button class="w-12 h-8 rounded-lg hover:bg-gray-200 px-2" @click="state.NavVisible = true">
      <img src="../assets/ico/nav-left.png" alt="" class=" w-8 h-8">
    </button>

    <div class="text-xl font-bold flex-1 text-center" @click="modelChangeFunction">
      {{ openaiStorage.state.model || '暂未选择模型' }}
      <modelChange></modelChange>
    </div>

    <button class="w-12 h-8 rounded-lg hover:bg-gray-200 px-2 py-1" @click="state.SettingVisible = true">
      <img src="../assets/ico/nav-right.png" alt="" class="mx-auto my-auto w-6 h-6">
    </button>

  </div>
</template>

<script setup>
import { useOpenaiStorage } from '../storages/openai.js'
import { useState } from '../storages/state.js'
import modelChange from './modelChange.vue'

const openaiStorage = useOpenaiStorage()
const state = useState().state

const modelChangeFunction = () => {
  state.modelChangeVisible = true
}

</script>

<style lang="css" scoped></style>