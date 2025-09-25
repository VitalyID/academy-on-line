<template>
  <div class="wrap">
    <div class="container">
      <Aside />
      <main class="main">
        <div class="main__total">
          <TotalCard
            v-for="card in fromEnumsTotalCard()"
            :logo="card.logo"
            :amount="card.amount"
            :title="card.title"
            :bg-color="card.bgColor"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BackgroundTotalCard, LogoTotalCard } from '@/types/enum/totalCard'
import type { CardConfig } from '@/types/interfaces/totalCardConfig'
import Aside from './Aside.vue'
import TotalCard from './common/TotalCard.vue'

function fromEnumsTotalCard(): CardConfig[] {
  const totalCardConfig = Object.entries(BackgroundTotalCard).map(([title, bgColor]) => {
    const logo = 'src/assets/images/' + LogoTotalCard[title as keyof typeof LogoTotalCard]
    console.log({ logo, amount: 0, title, bgColor })

    return { logo, amount: 0, title, bgColor }
  })
  return totalCardConfig
}
</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as m;
@use '../../assets/function' as f;
@use '../../assets/variables' as v;

.main {
  width: 1220px;
  height: 100vh;
  background-color: v.$bg-main-color;
  padding: var(--main-padding);

  &__total {
    @include m.flex($gap: 10px, $justify: start);
  }
}
</style>
