<template>
  <div class="flex-col">
    <px-bounce-loader v-if="isLoading" />
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
                v-model="coinConverterValue"
              />
            </label>
          </div>

          <span class="text-xl" v-show="coinConverter">{{ $filters.dollarFilter(coinConverter) }} USD</span>
        </div>
      </div>

      <div class="my-5" style="width: 100%">
        <line-chart
          v-if="history.length > 0"
          :chartdata="chartdata"
          :options="chartOptions"
          label="Example"
        ></line-chart>
      </div>

      <div>
        <h3 class="text-xl">Best offert change</h3>
        <table style="width: 90%; margin: 0 auto">
          <tr
            v-for="m in markets"
            class="border-b"
            :key="`${m.exchangeId}-${m.priceUsd}`"
          >
            <td>
              <b>{{ m.exchangeId }}</b>
            </td>
            <td>{{ $filters.dollarFilter(m.priceUsd) }}</td>
            <td>{{ m.baseSymbol }}/ {{ m.quoteSymbol }}</td>
            <td>
              <px-button
                v-show="!m.url"
                class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
                @click="getUrl(m)"
              >
                <span>Get Link</span>
              </px-button>
              <a
                v-show="m.url"
                class="hover:underline text-green-600"
                target="_blanck"
                :href="m.url"
                >{{ m.url }}</a
              >
            </td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import api from "@/api";
import LineChart from "@/components/LineChart";
import PxButton from "@/components/PxButton";
import PxBounceLoader from "@/components/PxBounceLoader";

export default {
  name: "CoinDetail",
  components: {
    LineChart,
    PxButton,
    PxBounceLoader,
  },
  data() {
    return {
      isLoading: false,
      coinConverterValue: 0,
      asset: {},
      history: [],
      markets: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    coinConverter() {
      if (this.coinConverterValue === 0){
        return '';
      }
      return this.coinConverterValue * this.asset.priceUsd; 
    },
    chartdata() {
      const data = [];
      this.history.map((h) => {
        data.push({
          date: h.date,
          priceUsd: parseFloat(h.priceUsd).toFixed(2),
        });
      });
      return data;
    },
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      let subTotal = 0;

      for (let i = 0; i < this.history.length; i++) {
        subTotal += parseFloat(this.history[i].priceUsd);
      }
      return subTotal / this.history.length;
    },
  },
  async created() {
    this.isLoading = true;
    const id = this.$route.params.id;
    this.getCoin(id);
    this.getAssetHistory(id);
    this.getListExchange(id);
  },
  methods: {
    async getCoin(id) {
      try {
        const { data } = await api.getAsset(id);
        this.asset = data;
        this.isLoading = false;
      } catch (err) {
        console.error(err);
      }
    },
    async getAssetHistory(id) {
      try {
        const { data } = await api.assetHistory(id);
        this.history = data;
      } catch (err) {
        console.error(err);
      }
    },
    async getListExchange(id) {
      try {
        const { data } = await api.getMarkets(id);
        this.markets = data;
      } catch (err) {
        console.error(err);
      }
    },
    async getUrl(exchange) {
      try {
        const { data } = await api.getExchange(exchange.exchangeId);
        exchange.url = data.exchangeUrl;
        return exchange;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
