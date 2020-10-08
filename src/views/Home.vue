<template>
	<px-assets-table :assets="assets"/>
</template>

<script>
import PxAssetsTable from '@/components/PxAssetsTable';
import api from '@/api';

export default {
	name: 'Home',
	components: {
    PxAssetsTable
	},
  data(){
    return {
      assets: []
    }
  },

  async created() {
    const {data} = await api.getAssets();
    this.assets = data; 
  }
}
</script>
