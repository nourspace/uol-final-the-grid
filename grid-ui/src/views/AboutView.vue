<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import MyHeader from '@/components/MyHeader.vue'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { increment } = store
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click.prevent="increment()">Click for 1</button>
    <button @click.prevent="increment(2)">Click for 2</button>
    <p>counter: {{ count }}</p>
    <p>double: {{ doubleCount }}</p>
    <MyHeader />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
