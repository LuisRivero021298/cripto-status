<template>
  <div>
    <px-assets-table :assets="assets" />
  </div>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable";
import api from "@/api";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
  },
  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },
  async created() {
    this.isLoading = true;
    try {
      const { data } = await api.getAssets();
      this.assets = data; 
    } catch (err) {
      console.log(err); 
    } 
    this.isLoading = false;
  },
};
</script>
