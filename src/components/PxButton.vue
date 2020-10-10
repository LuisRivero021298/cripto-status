<template>
  <button @click="onClick">
    <slot></slot>  
  </button>
</template>

<script>
  export default {
    name: 'PxButton', 
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  }
</script>
