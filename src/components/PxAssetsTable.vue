<template>
  <table>
    <thead>
      <tr class="bg-white border-b-2 border-gray-200">
        <th></th>
        <th :class="{ up: sortOrder === 1, down: sortOrder === -1}">
          <span @click="changeOrder" class="underline cursor-pointer">Ranking</span>
        </th>
        <th>Nombre</th>
        <th class="">Precio</th>
        <th class="hidden lg:table-cell">Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="input__search"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="a in arrFilters" 
      :key="a.id" 
      class="border-b border-gray-200 hover:bg-gray-100">
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
        <td class="">{{ $filters.dollarFilter(a.priceUsd) }}</td>
        <td class="hidden lg:table-cell">{{ $filters.dollarFilter(a.marketCapUsd) }}</td>
        <td :class="changePercentColor(a)">
          {{ $filters.percentFilter(a.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button @click="showDetails(a.id)">
            <span>Detail</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from './PxButton';

export default {
  name: "PxAssetsTable",
  data(){
    return {
      filter: '',
      sortOrder: 1
    }
  },
  components: {
    PxButton
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    arrFilters() { 
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets.filter( a => 
          a.name.toLowerCase().includes(this.filter.toLowerCase()) || 
          a.symbol.toLowerCase().includes(this.filter.toLowerCase())
      ).sort((a, b) => {
        if (parseInt(a.rank) > parseInt(b.rank)) {
          return this.sortOrder
        }  
        return altOrder
      });
    }        
  },
  methods: {
    changePercentColor(a) {
      return {
        'text-teal-500' : a.changePercent24Hr > 0,
        'text-red-500' : a.changePercent24Hr < 0
      }
    },
    showDetails(id) {
      this.$router.push({ name: 'coin-detail', params: { id }}) 
    },
    changeOrder() {
      this.sortOrder = (this.sortOrder === 1) ? -1 :  1;
      console.log(this.sortOrder);
    }  
  }
};
</script>

<style scoped>
.input__search {
  @apply bg-gray-100 border-gray-400 py-2 px-4 block w-full appearance-none leading-normal;
}
.input__search:focus {
  @apply outline-none border-b;
}
table {
  width: 100%;
}
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
