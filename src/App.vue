<template>
  <main>
    <px-header />
    <router-view class="w-10/12 md:w-11/12 container px-5 py-10 box-border flex justify-center"/>
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
