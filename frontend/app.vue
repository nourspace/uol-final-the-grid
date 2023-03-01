<template>
  <div>
    {{ nour }}
    <!--    <NuxtWelcome title="nono333" app-name="jeeeeu" />-->
    <!--    <my-header />-->
  </div>
  <div a="1" b="2" c="3" d="4"></div>
</template>

<script setup lang="ts">
import MyHeader from '~/components/MyHeader.vue'

let nour = 1
const aa = '22222'
console.log(aa + nour)
</script>
