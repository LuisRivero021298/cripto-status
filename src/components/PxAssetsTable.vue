<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th class="hidden md:table-cell">Precio</th>
        <th class="hidden lg:table-cell">Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="a in assets" 
      :key="a.id" 
      class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100">
        <td>
          <img class="w-8" :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`" :alt="a.name"/>
        </td>
        <td>
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link 
            :to="{ name: 'coin-detail', params: {id: a.id}}"
            class="hover:underline text-green-900" 
          >{{ a.name }}</router-link>
          <small class="ml-1 text-gray-500">{{ a.symbol }}</small>
        </td>
        <td class="hidden md:table-cell">{{ $filters.dollarFilter(a.priceUsd) }}</td>
        <td class="hidden lg:table-cell">{{ $filters.dollarFilter(a.marketCapUsd) }}</td>
        <td :class="changePercentColor(a)">
          {{ $filters.percentFilter(a.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PxAssetsTable",
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changePercentColor(a){
      return {
        'text-green-500' : a.changePercent24Hr > 0,
        'text-red-500' : a.changePercent24Hr < 0
      }
    }  
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
