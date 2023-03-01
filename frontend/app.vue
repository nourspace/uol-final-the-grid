<template>
  <div>
    {{ nour }}
    <!--    <NuxtWelcome title="nono333" app-name="jeeeeu" />-->
    <my-header />
    <div style="accent-color: antiquewhite" aria-hidden="false"></div>
  </div>
</template>

<script setup lang="ts">
import MyHeader from '~/components/MyHeader.vue'

const nour = 1
const aa = '22222'
console.log(aa + nour.push)


</script>
