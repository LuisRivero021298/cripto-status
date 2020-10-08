<template>
  <div class="flex-col items-center">
    <h1 class="text-gray-700 text-4xl md:text-6xl uppercase">Error 404 - Página no encontrada</h1>
    <router-link
      class="mt-5 text-xl text-green-600 hover:underline"
      to="/"
    >Volver a la página de Inicio</router-link>
  </div>
</template>

<script>
	export default {
		name: 'Error404'
	}
</script>
