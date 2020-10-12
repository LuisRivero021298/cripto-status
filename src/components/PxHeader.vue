<template>
	<header class="shadow w-screen">
    <nav>
      <nav class="main-header">
        <div class="header-content">
          <router-link :to="{ name: 'home' }" class="flex"> 
            <px-icon class="mr-2" />
            <span class="font-semibold text-xl tracking-tight">CriptoStatus</span>
          </router-link>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import PxIcon from '@/components/PxIcon';

	export default {
    name: 'PxHeader',
    components: {
      PxIcon
    }	
	}
</script>

<style scoped>
  .main-header {
    @apply flex items-center justify-center flex-wrap bg-teal-400 p-6;
  }
  .header-content {
    @apply flex items-center flex-shrink-0 text-white mr-6;
  }
</style>
