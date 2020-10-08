<template>
  <main>
    <px-header />

    <router-view class="w-11/12 container px-5 sm:px-20 py-20"/>
  </main>
</template>

<script>
import PxHeader from '@/components/PxHeader';

export default {
  name: 'App',
  components: {
    PxHeader
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
