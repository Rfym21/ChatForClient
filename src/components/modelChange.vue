<template>
  <div class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-100" v-if="state.modelChangeVisible">
    
    <button class="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-md text-nowrap z-101" @click.stop="closeModelChange"> <span>关闭面板</span> </button>


  </div>
</template>

<script setup>
import { useState } from '../storages/state.js'

const state = useState().state

const closeModelChange = () => {
  state.modelChangeVisible = false
}

</script>

<style lang="css" scoped></style>