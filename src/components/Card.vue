<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  margin-inline: auto;
  padding: 1em 1.5em;
  margin-bottom: 2em;
  background-color: #23262d;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  width: fit-content;
}
@media screen and (max-width: 728px) {
  .card {
    width: 90vw;
    margin-inline: auto;
  }
  @media screen and (orientation: landscape) and (max-width: 728px) {
    .card {
      margin-bottom: 0;
    }
  }
}
</style>