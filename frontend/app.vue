<template>
  <div>
    {{ nour }}
    <!--    <NuxtWelcome title="nono333" app-name="jeeeeu" />-->
    <my-header />
    <div>{{ count }}</div>
    <div style="accent-color: antiquewhite" aria-hidden="false"></div>
    <button @click.prevent="increment(1)">add 1</button>
    <button @click.prevent="increment(2)">add 2</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MyHeader from '~/components/MyHeader.vue'

import { useCounterStore } from '@/stores/counter'

const nour = 1
const aa = '22222'
console.log(aa + nour)

const store = useCounterStore()
const { increment } = store
const { count } = storeToRefs(store)
</script>
