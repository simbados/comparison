<script setup lang="ts">

import { store } from '@/store/rootStore'
</script>

<template>
  <transition name="slide-in">
    <div v-if="store.errorMessage != ''" class="error-message-wrapper">
      <div class="error-message">
        {{store.errorMessage}}
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-in;
}
.slide-in-enter-from {
  transform: translateY(-4em);
}
.slide-in-leave-to {
  transform: translateY(-4em);
}
.error-message-wrapper {
  font-size: 1em;
  position: fixed;
  display: flex;
  top: 1em;
  place-content: center;
  right: 0;
  width: 100vw;
}
.error-message {
  width: 20em;
  background-color: #570202;
  text-align: center;
  box-shadow: inset 0 0 0.1em 0 #fff;
  border-radius: 5px;
  padding: 0.5em
}
</style>