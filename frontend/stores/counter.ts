import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')

  const doubleCount = computed(() => count.value * 2)

  function increment(how = 1) {
    count.value += how
  }

  return { count, name, doubleCount, increment }
})
