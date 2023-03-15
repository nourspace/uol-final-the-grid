<script setup lang="ts"></script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Thank you for testing!</h3>
    <label>The Grid</label>
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
