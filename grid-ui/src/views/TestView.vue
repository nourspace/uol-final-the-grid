<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import MyHeader from '@/components/MyHeader.vue'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { increment } = store
</script>

<template>
  <div class="test">
    <h1>This is test page</h1>
    <v-btn @click.prevent="increment()">Click for 1</v-btn>
    <v-btn @click.prevent="increment(2)">Click for 2</v-btn>
    <v-tabs>
      <v-tab>counter: {{ count }}</v-tab>
      <v-tab>double: {{ doubleCount }}</v-tab>
    </v-tabs>
    <MyHeader />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .test {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
