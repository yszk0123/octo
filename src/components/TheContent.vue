<template>
  <simplebar class="the-content flex h-full relative-fixed">
    <TheNavbar/>
    <router-view :key="$route.fullPath" class="flex"></router-view>
  </simplebar>
</template>

<script>
import simplebar from 'simplebar-vue';

import TheNavbar from '@/components/TheNavbar';

export default {
  name: 'TheContent',
  components: {
    simplebar,
    TheNavbar,
  },
};
</script>

<style scoped>
.dark .the-content {
  background: url('~@/assets/octopus-transparent-dark.svg') center center no-repeat;
  background-size: 50% 50%;
}

.light .the-content {
  background: url('~@/assets/octopus-transparent-light.svg') center center no-repeat;
  background-size: 50% 50%;
}
</style>
