<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const inc = () => count.value++
</script>

<template>
  <div class="my-header">
    <p>Some header</p>
    <button @click="inc()" :disabled="count == 3">click</button>
    <p data-testid="counter">{{ count }}</p>
  </div>
</template>

<style scoped>
.my-header {
  border: 2px solid white;
  padding: 10px;
  height: 20vh;
  width: 30vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>