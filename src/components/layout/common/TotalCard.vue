<template>
  <div class="card" :style="background">
    <div class="card__left">
      <img :src="logo || defaultLogo" alt="Логотип карточки студентов" />
      <div class="card__leftInfo">
        <span>Total {{ title }}</span>
        <span>{{ formatAmount }}</span>
      </div>
    </div>

    <img
      class="card__more"
      src="../../../assets/images/details.png"
      alt="Подробнее"
      @click="moreInformation()"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import defaultLogo from '@/assets/images/logoStudentsCard.png'

const props = defineProps({
  logo: { type: String, default: null },
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  bgColor: { type: String, default: null },
})

const moreInformation = () => {
  console.log('click on dotted')
}

const formatAmount = computed(() => {
  if (!props.amount) return 0
  return props.amount.toLocaleString('en-EN')
})

const background = computed(() => {
  return { backgroundColor: props.bgColor || '#9e9a9a' }
})
</script>

<style lang="scss" scoped>
@use '../../../assets/mixins' as m;
@use '../../../assets/function' as f;

.card {
  @include m.flex();

  padding: f.rem(16);
  background-color: #fdbcec;
  border-radius: 7px;
  position: relative;
  width: 100%;

  &__left {
    @include m.flex($gap: f.rem(11), $justify: start);
    width: 100%;
  }

  &__more {
    position: absolute;
    top: var(--main-total-card-padding);
    right: var(--main-total-card-padding);
    cursor: pointer;
  }

  &__leftInfo span {
    display: block;
  }

  &__leftInfo span:nth-child(1) {
    @include m.font($size: 11px, $color: #997392);
    line-height: 14px;
  }

  &__leftInfo span:nth-child(2) {
    @include m.font($size: 22.6px, $color: #4f4652);
    line-height: 27px;
  }
}
</style>
