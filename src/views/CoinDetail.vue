<template>
  <div class="flex-col">
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ $filters.dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ $filters.dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ $filters.dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ $filters.dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ $filters.percentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "CoinDetail",
  data() {
    return {
      asset: {},
      history: []
    };
  },
  computed: {
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2)) 
      ); 
    },
    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2)) 
      );
    },
    avg() {
      let subTotal = 0;

      for(let i = 0; i < this.history.length; i++){
        subTotal += parseFloat(this.history[i].priceUsd);
      }
      return (subTotal / this.history.length); 
    },
  },
  async created() {
    const id = this.$route.params.id;
    this.getCoin(id);
    this.getAssetHistory(id);
  },
  methods: {
    async getCoin(id) {
      const { data } = await api.getAsset(id);
      this.asset = data;
    },
    async getAssetHistory(id){
      const { data } = await api.assetHistory(id); 
      this.history = data;
    }

  }
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
