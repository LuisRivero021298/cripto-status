<template>
  <main>
    <px-header />

    <router-view class="w-10/12 md:w-11/12 container px-5 sm:px-20 py-20 box-border"/>
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
