<script setup></script>
<template>
  <div class="aside">
    <div class="aside__top">
      <img src="@/assets/images/logo.png" alt="logo" />
      <span>Coursify</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/mixins' as m;
@use '../../assets/variables' as v;

.aside {
  background-color: v.$bg-aside-color;

  &__top {
    @include m.flex($gap: 10px);
    margin-bottom: 34px;

    & span {
      @include m.font($weight: 700, $size: 22px, $color: #5d6063);
    }
  }
}
</style>
