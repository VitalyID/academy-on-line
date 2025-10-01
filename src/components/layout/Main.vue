<template>
  <div class="wrap">
    <div class="container">
      <!-- <aside> -->
      <Aside />
      <!-- </aside> -->
      <main></main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Aside from './Aside.vue'
</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as m;
@use '../../assets/variables' as v;

main {
  width: 1220px;
  height: 100vh;
  background-color: v.$bg-main-color;
  padding: var(--main-padding);
}
</style>
