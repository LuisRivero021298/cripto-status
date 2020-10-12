<template>
  <button class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-2 border border-teal-500 hover:border-transparent rounded" @click="onClick" >
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
