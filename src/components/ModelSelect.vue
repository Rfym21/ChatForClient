<template>
  <div>

  </div>
</template>

<script setup>
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useState } from '../storages/state.js'
import { useOpenaiConfig } from '../storages/openaiConfig.js'

const state = useState().state
const openaiConfig = useOpenaiConfig()
</script>

<style lang="css" scoped>

</style>