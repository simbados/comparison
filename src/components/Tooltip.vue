<script setup lang="ts">
  import { Placement } from '@/models/Placement'
  import { ref } from 'vue'

  defineProps<{
    placement: Placement,
    message: string
  }>()
  let showTooltip = ref(false);
  function toggleTooltip(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    showTooltip.value = !showTooltip.value;
  }
  function disableTooltip() {
    showTooltip.value = false;
  }
</script>

<template>
  <div class="tooltip">
    <span class="tooltip-icon" v-click-outside="disableTooltip" @click="toggleTooltip" @pointerenter="showTooltip = true" @pointerleave="showTooltip = false">
      <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ceccfd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
    </span>
    <div class="tooltip-message" :class="{'right': placement === Placement.RIGHT, 'left': placement === Placement.LEFT}">{{message}}</div>
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip-icon {
  cursor: pointer;
}
.right {
  left: 120%;
}
.left {
  right: 100%;
}
.tooltip-message {
  display: none;
  font-size: 0.8em;
  background-color: var(--vt-c-black-mute);
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 10px;
  position: absolute;
  padding: 0.5em 1em;
  top: -10%;
  width: 10em;
}
.tooltip:hover, tooltip:focus-visible {
  .tooltip-message {
    display: block;
  }
}
</style>