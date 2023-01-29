<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <div class="row mt-4">
          <div class="col-sm-6">
            <trip-filters
                :countriesFilter="countriesFilter"
                v-model:countries="filters.countries"
                v-model:min_price="filters.min_price"
                v-model:max_price="filters.max_price"
                v-model:date_start="filters.date_start"
                v-model:date_end="filters.date_end"
            ></trip-filters>
          </div>
          <div class="col-sm-3 mt-3 mt-sm-0">
            <trip-sort
                v-model:selectedOption="sorting.selectedOption"
                v-model:selectedOrder="sorting.selectedOrder"
                :options="sortOptions"
                :orders="sortOrders"
            >
            </trip-sort>
          </div>
          <trip-list :trips="trips">
          </trip-list>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
import TripFilters from "@/components/TripFilters";
import TripSort from "@/components/TripSort";
import TripList from "@/components/TripList";

export default {
  components: {TripList, TripSort, TripFilters},
  data() {
    return {
      trips: [
        {
          id: 0,
          name: "Італія-20",
          description: "ілоамтщуйкь",
          price: 400,
          duration: 20,
          date_start: "25-10-2022",
          date_end: "25-10-2022",
          country: "Італія",
          img: "https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg",
          free_places: 30
        },
        {
          id: 1,
          name: "Італія-10",
          description: "ілоамтщуйкь",
          price: 200,
          duration: 10,
          date_start: "10-10-2022",
          date_end: "10-10-2022",
          country: "Італія",
          img: "https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg",
          free_places: 30
        },
        {
          id: 2,
          name: "Італія-5",
          description: "ілоамтщуйкь",
          price: 100,
          duration: 5,
          date_start: "20-10-2022",
          date_end: "20-10-2022",
          country: "Італія",
          img: "https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg",
          free_places: 30
        },
      ],
      countriesFilter: [
        {en: 'ITALY', ukr: 'Італія'},
        {en: 'EGYPT', ukr: 'Єгипет'},
        {en: 'MALDIVES', ukr: 'Мальдіви'},
        {en: 'GERMANY', ukr: 'Німеччина'},
        {en: 'GREECE', ukr: 'Греція'},
        {en: 'TURKEY', ukr: 'Туреччина'},
      ],
      filters: {
        countries: [],
        min_price: null,
        max_price: null,
        date_start: '',
        date_end: '',
      },
      sortOptions: [
        {value: 'price', name: 'Ціна'},
        {value: 'date_start', name: 'Дата'}
      ],
      sortOrders: [
        {value: 'DESC', name: 'Спадання'},
        {value: 'ASC', name: 'Зростання'}
      ],
      sorting: {
        selectedOrder: '',
        selectedOption: ''
      },
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
